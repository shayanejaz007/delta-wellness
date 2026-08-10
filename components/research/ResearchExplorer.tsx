'use client'

import { useMemo, useState } from 'react'
import { publications } from '@/lib/publications'
import ResearchCard from './ResearchCard'

/**
 * Filters are generated from the records themselves. If a facet has no data it
 * does not render — there are no empty dropdowns implying a larger library than
 * exists.
 */
export default function ResearchExplorer() {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('all')
  const [kind, setKind] = useState('all')

  const topics = useMemo(
    () => Array.from(new Set(publications.flatMap((p) => p.topics))).sort(),
    [],
  )
  const kinds = useMemo(
    () => Array.from(new Set(publications.map((p) => p.kind))).sort(),
    [],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return publications.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.authors.join(' ').toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q)
      const matchesTopic = topic === 'all' || p.topics.includes(topic)
      const matchesKind = kind === 'all' || p.kind === kind
      return matchesQuery && matchesTopic && matchesKind
    })
  }, [query, topic, kind])

  return (
    <div>
      <div className="glass-card mb-12 grid gap-4 p-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] sm:p-6">
        <div>
          <label htmlFor="research-search" className="eyebrow mb-2 block">
            Search
          </label>
          <input
            id="research-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Title, author, journal…"
            className="w-full field px-4 py-3 text-sm text-ink placeholder:text-body/70"
          />
        </div>

        <div>
          <label htmlFor="research-topic" className="eyebrow mb-2 block">
            Topic
          </label>
          <select
            id="research-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="field text-sm"
          >
            <option value="all">All topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="research-kind" className="eyebrow mb-2 block">
            Type
          </label>
          <select
            id="research-kind"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className="field text-sm"
          >
            <option value="all">All types</option>
            {kinds.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p aria-live="polite" className="eyebrow mb-6">
        {results.length} of {publications.length} records
      </p>

      {results.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="mb-2 font-display text-2xl">No records match</p>
          <p className="text-sm text-body">
            Clear the search or widen the filters to see the full library.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((paper) => (
            <li key={paper.slug}>
              <ResearchCard publication={paper} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
