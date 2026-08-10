import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.').max(120),
  email: z.string().trim().email('Enter a valid email address.').max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  subject: z.string().trim().min(2, 'Enter a subject.').max(160),
  message: z
    .string()
    .trim()
    .min(20, 'Please give us at least a couple of sentences.')
    .max(4000),
  // Honeypot: a real person never fills this in.
  company: z.string().max(0).optional().or(z.literal('')),
})

/**
 * In-memory rate limiting. Adequate for a single instance; on a multi-instance
 * or serverless deployment replace the Map with a shared store (Upstash Redis,
 * Vercel KV) so the window is enforced globally.
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 4
const hits = new Map<string, number[]>()

function rateLimited(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) return true
  recent.push(now)
  hits.set(key, recent)
  return false
}

function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || 'unknown'
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      (({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }) as Record<string, string>)[c],
  )
}

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: 'Too many messages from this address. Try again shortly.' },
      { status: 429 },
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'We could not read that submission.' },
      { status: 400 },
    )
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Some fields need attention.',
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  // Honeypot tripped: accept silently so bots learn nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true })
  }

  const { name, email, phone, subject, message } = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  // Address the auto-acknowledgement is sent from. Falls back to the same
  // sender as the enquiry when no dedicated no-reply mailbox is configured.
  const noReply = process.env.CONTACT_NOREPLY_EMAIL ?? from

  if (!apiKey || !to || !from) {
    console.error(
      'Contact form is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.',
    )
    return NextResponse.json(
      {
        error:
          'The contact form is not available right now. Please try again later.',
      },
      { status: 503 },
    )
  }

  const resend = new Resend(apiKey)

  const plain = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Subject: ${subject}`,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n')

  const acknowledgement = `Dear ${name},

Thank you for contacting Delta Wellness. We have received your message and a
member of the team will respond as soon as possible.

For your records, this is what you sent:

Subject: ${subject}

${message}

This mailbox is not monitored, so please do not reply to this message. If you
need to add anything, use the contact form on the site.

Delta Wellness
${process.env.NEXT_PUBLIC_SITE_URL ?? ''}`

  // The enquiry itself. This one must succeed, so it is sent first and its
  // failure is what the visitor is told about.
  try {
    const { error } = await resend.emails.send({
      // `from` must be an address on a domain verified in Resend, otherwise
      // the send is rejected. The visitor's address goes in replyTo, never
      // in from — putting it there fails SPF/DKIM and lands in spam.
      from: `Delta Wellness <${from}>`,
      to: [to],
      replyTo: email,
      subject: `[Delta Wellness] ${subject}`,
      text: plain,
      html: `
        <h2>New enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    })

    if (error) throw new Error(error.message)
  } catch (err) {
    console.error('Contact delivery failed:', err)
    return NextResponse.json(
      { error: 'We could not send that message. Please try again.' },
      { status: 502 },
    )
  }

  /**
   * Acknowledgement to the visitor. Sent after the enquiry and with its own
   * catch: if this fails (bad address, full mailbox) the enquiry has still
   * reached us, so the visitor should not be told their message failed.
   *
   * `Auto-Submitted` and `X-Auto-Response-Suppress` mark this as machine
   * generated, which stops well-behaved autoresponders on the other end from
   * replying to it and starting a loop.
   */
  try {
    const { error } = await resend.emails.send({
      from: `Delta Wellness <${noReply}>`,
      to: [email],
      subject: 'Thank you for contacting Delta Wellness',
      text: acknowledgement,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#0f1b2d">
          <p>Dear ${escapeHtml(name)},</p>
          <p>
            Thank you for contacting Delta Wellness. We have received your
            message and a member of the team will respond as soon as possible.
          </p>
          <p style="margin-top:24px;font-size:13px;color:#5b6675">
            For your records, this is what you sent:
          </p>
          <div style="border-left:3px solid #0e6e85;padding:4px 0 4px 16px;margin:8px 0 24px">
            <p style="margin:0 0 8px"><strong>${escapeHtml(subject)}</strong></p>
            <p style="margin:0;white-space:pre-wrap;color:#3d4757">${escapeHtml(message)}</p>
          </div>
          <p style="font-size:13px;color:#5b6675">
            This mailbox is not monitored, so please do not reply to this
            message. If you need to add anything, use the contact form on the
            site.
          </p>
          <p style="font-size:13px;color:#5b6675">Delta Wellness</p>
        </div>
      `,
      headers: {
        'Auto-Submitted': 'auto-replied',
        'X-Auto-Response-Suppress': 'All',
      },
    })

    if (error) throw new Error(error.message)
  } catch (err) {
    console.error('Acknowledgement to visitor failed (enquiry was delivered):', err)
  }

  return NextResponse.json({ ok: true })
}
