/**
 * PEOPLE
 * ----------------------------------------------------------------------------
 * Two separate registers, deliberately kept apart:
 *
 *   `leadership`  — people holding a role at Delta Wellness.
 *   `lineage`     — researchers whose work the publications cite. These are
 *                   NOT staff, NOT affiliated, and NOT endorsers. They are
 *                   credited because their work underpins the research, and
 *                   removing their names would be poor scholarship.
 *
 * Conflating the two would misrepresent people who have no connection to this
 * organisation, so the page renders them in visibly different registers.
 */

export type Leader = {
  name: string
  role: string
  /** 'documented' = affiliation appears in the supplied papers.
   *  'asserted'   = role supplied by the organisation, not in any document.
   *  'pending'    = position exists, occupant not yet verifiable. */
  status: 'documented' | 'asserted' | 'pending'
  affiliation?: string
  bio?: string[]
  /** Only fields the supplied documents actually establish. */
  facts?: { label: string; value: string }[]
  publicationSlugs?: string[]
  photo?: string
}

export const leadership: Leader[] = [
  {
    name: 'Marina Lobova',
    role: 'Chief Medical Officer',
    status: 'asserted',
    affiliation: 'Brain Power Institute, Bangkok, Thailand',
    bio: [
      'Marina Alexandrovna Lobova is the author of the research presented on this site. Both published papers list her affiliation as the Brain Power Institute in Bangkok, and she chaired session ME50 at the 2018 International Conference on Movement and Cognition.',
      'Her academic career began in 1974 at Moscow State University. Her supplied professional biography records advisory roles in foreign affairs at MSU and the USSR Ministry of Foreign Affairs, work on Singapore\u2019s education development programme (1981\u20131984), and an advisory role with the Presidential Commission on Advanced Technologies (2001\u20132005).',
      'Her work applies the logic of a six-dimensional coordinate system to human movement, and sets out a reference frame for describing neural signalling across eight functional pathways.',
    ],
    facts: [
      { label: 'Affiliation', value: 'Brain Power Institute, Bangkok' },
      { label: 'Academic career', value: 'Moscow State University, from 1974' },
      { label: 'Academician', value: 'Russian Academy of Natural Sciences \u00b7 since 2003' },
      { label: 'Fellow', value: 'American Academy of Anti-Aging Medicine' },
      { label: 'Published papers', value: 'Two, plus one conference presentation' },
      { label: 'Conference role', value: 'Chair, session ME50, 2018' },
    ],
    publicationSlugs: [
      'six-dimensional-biomechanics-psychomechanics',
      'assessment-of-mental-states',
      'movement-and-cognition-2018',
    ],
  },
  {
    name: 'Feisal Abdul Rauf',
    role: 'Chief Executive Officer',
    status: 'asserted',
    bio: [
      'Imam Feisal Abdul Rauf is chief executive officer of Delta Wellness. He is an Egyptian-American Sufi imam, author and advocate of interfaith dialogue, and served as imam of Masjid al-Farah in Tribeca, New York City, from 1983 to 2009.',
      'At his request, this profile is limited to his office and his published work. No portrait is published and his other professional affiliations are not listed.',
    ],
    facts: [
      { label: 'Office', value: 'Chief Executive Officer' },
      { label: 'Prior office', value: 'Imam, Masjid al-Farah, New York \u00b7 1983\u20132009' },
      { label: 'Recognition', value: 'Time 100, 2011 \u00b7 Huffington Game Changer Award, 2010' },
      { label: 'Also', value: 'Foreign Policy Top 100 Global Thinkers, 2010' },
    ],
  },
]

/**
 * Researchers cited by the publications. Credited, not claimed.
 * Every entry here is traceable to a reference in the source papers.
 */
export const lineage = [
  {
    name: 'Gennady Shipov',
    contribution:
      'Theory of Physical Vacuum (1990) and Descartes’ Mechanics, presented at the University of Liège in 2005. The six-dimensional coordinate logic applied in the 2018 paper builds directly on this work.',
    citedIn: 'Brain, Body, Cognition 2018, references [3]–[7]',
    url: 'http://shipov.com/',
  },
  {
    name: 'Moshe Carmeli',
    contribution:
      'Professor of Einstein studies at Ben Gurion University and former President of the Physical Society of Israel. His 2005 letter assessing Shipov’s work is quoted in the 2018 paper.',
    citedIn: 'Brain, Body, Cognition 2018, reference [2]',
    url: 'http://www.shipov.com/news.html',
  },
  {
    name: 'Yaroslav Kushelev',
    contribution:
      'Picotechnological model of interleukin-34, reproduced and discussed in the 2018 paper’s treatment of the executive control level.',
    citedIn: 'Brain, Body, Cognition 2018, reference [9]',
  },
  {
    name: 'Albert Einstein',
    contribution:
      'Cited for the proposal that a geometric theory encompassing gravity and electromagnetism requires enlarging the number of degrees of freedom — the starting point for the paper’s argument.',
    citedIn: 'Brain, Body, Cognition 2018, reference [1]',
  },
]
