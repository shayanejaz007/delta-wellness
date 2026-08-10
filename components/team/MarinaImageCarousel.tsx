'use client'

import Image from 'next/image'
import { useState } from 'react'

type MarinaImage = {
  src: string
  alt: string
  fit?: 'cover' | 'contain'
  position?: string
}

const images: MarinaImage[] = [
  {
    src: '/team/dr-marina-lobova-red.jpg',
    alt: 'Portrait of Dr. Marina Lobova',
    fit: 'cover',
    position: 'center',
  },
  {
    src: '/team/dr-marina-lobova-group.jpg',
    alt: 'Dr. Marina Lobova pictured at a group meeting',
    fit: 'contain',
    position: 'center',
  },
  {
    src: '/team/dr-marina-lobova-yellow.jpg',
    alt: 'Dr. Marina Lobova in a yellow top',
    fit: 'cover',
    position: 'center',
  },
]

export default function MarinaImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length)
  }

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-[var(--line)] bg-paper2"
      aria-label="Dr. Marina Lobova photo gallery"
    >
      <Image
        key={activeImage.src}
        src={activeImage.src}
        alt={activeImage.alt}
        fill
        sizes="(min-width: 1024px) 32vw, 100vw"
        className={activeImage.fit === 'contain' ? 'object-contain' : 'object-cover'}
        style={{ objectPosition: activeImage.position ?? 'center' }}
        priority={activeIndex === 0}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

      <button
        type="button"
        onClick={showPrevious}
        aria-label="Show previous photo of Dr. Marina Lobova"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 sm:h-11 sm:w-11"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={showNext}
        aria-label="Show next photo of Dr. Marina Lobova"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:h-11 sm:w-11"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3 py-2 backdrop-blur-sm"
        aria-label={`Photo ${activeIndex + 1} of ${images.length}`}
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show photo ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/90'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
