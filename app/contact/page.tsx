import { redirect } from 'next/navigation'

/**
 * The contact page became the consultation page. Redirecting rather than
 * deleting keeps old links, cards and any indexed URLs working.
 */
export default function ContactPage() {
  redirect('/consultation')
}
