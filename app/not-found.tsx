import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-32">
      <p className="eyebrow mb-6">404</p>
      <h1 className="mb-8 text-[clamp(2.5rem,6vw,4.5rem)]">Page not found</h1>
      <p className="mb-10 measure text-body">
        That address does not exist. The research library is the best place to
        start.
      </p>
      <Link
        href="/research"
        className="inline-block w-fit border border-transparent px-8 py-4 text-sm text-accent "
      >
        Go to research
      </Link>
    </div>
  )
}
