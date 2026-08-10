export default function SectionLabel({
  children,
  extent = '34%',
}: {
  children: React.ReactNode
  extent?: string
}) {
  return (
    <div className="mb-8">
      <div
        className="band-rule mb-4"
        style={{ ['--band-extent' as string]: extent }}
      />
      <span className="eyebrow">{children}</span>
    </div>
  )
}
