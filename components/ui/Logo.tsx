/**
 * DELTA WELLNESS wordmark.
 *
 * Drawn as SVG text rather than shipped as a raster file: it stays crisp at
 * any size, inherits the site's own typeface, weighs a fraction of a JPEG, and
 * remains readable to screen readers and to search engines through <title>.
 *
 * The supplied artwork sets DELTA in a light near-black and WELLNESS in a
 * gradient running violet to teal, over a hairline rule. The violet is new to
 * the palette — it appears only here, in the mark itself, so it reads as brand
 * identity rather than as a third accent colour competing with the teal and
 * gold used across the pages.
 *
 * The gradient id is suffixed by `variant` because two instances of this mark
 * on one page (header and footer) would otherwise declare duplicate ids, and
 * the second gradient would be ignored.
 */
export default function Logo({
  className = '',
  variant = 'default',
  showRule = true,
}: {
  className?: string
  /** Distinguishes gradient ids when the mark appears more than once. */
  variant?: string
  showRule?: boolean
}) {
  const gradientId = `dw-mark-${variant}`

  return (
    <svg
      viewBox="0 0 300 96"
      role="img"
      aria-labelledby={`${gradientId}-title`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={`${gradientId}-title`}>Delta Wellness</title>

      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7B5EA7" />
          <stop offset="45%" stopColor="#5C6FA8" />
          <stop offset="100%" stopColor="#2E8C93" />
        </linearGradient>
      </defs>

      <text
        x="150"
        y="34"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fontSize="30"
        fontWeight="300"
        letterSpacing="9"
      >
        DELTA
      </text>

      <text
        x="150"
        y="70"
        textAnchor="middle"
        fill={`url(#${gradientId})`}
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fontSize="30"
        fontWeight="600"
        letterSpacing="7"
      >
        WELLNESS
      </text>

      {showRule && (
        <line
          x1="105"
          y1="84"
          x2="195"
          y2="84"
          stroke="#2E8C93"
          strokeWidth="1.5"
        />
      )}
    </svg>
  )
}
