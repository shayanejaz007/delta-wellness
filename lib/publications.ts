/**
 * PUBLICATIONS AND MODELS
 * ----------------------------------------------------------------------------
 * Bibliographic metadata is transcribed from the papers themselves. Where a
 * field is unknown it is omitted rather than guessed — there are no inferred
 * DOIs, no reconstructed page ranges, no assumed peer-review status.
 */

export type PublicationKind =
  | 'Journal article'
  | 'Perspective'
  | 'Conference presentation'
  | 'Referenced work'

export type Publication = {
  slug: string
  title: string
  authors: string[]
  year?: string
  venue: string
  volume?: string
  pages?: string
  issn?: string
  publisher?: string
  kind: PublicationKind
  topics: string[]
  /** Summary written from the source, in our own words. */
  summary: string
  /** Where the reader can obtain the original. */
  access: string
  url?: string
  /** True only where the document itself states the classification. */
  classificationNote?: string
}

export const publications: Publication[] = [
  {
    slug: 'six-dimensional-biomechanics-psychomechanics',
    title:
      'Biomechanics and Psychomechanics of Movement in Dance, Sport, and Health Programs from the Point of View of Logic of Six Dimensional Coordinate System',
    authors: ['Marina Lobova'],
    year: '2018',
    venue: 'Brain, Body, Cognition',
    volume: '8(1)',
    pages: '105–123',
    issn: '2643-5683',
    publisher: 'Nova Science Publishers',
    kind: 'Journal article',
    topics: ['Biomechanics', 'Psychomechanics', 'Six-dimensional geometry'],
    summary:
      'Applies the logic of a six-dimensional coordinate system to human movement in dance, sport and rehabilitation, analysing recorded movements with biomedical equipment. The paper builds on G. Shipov’s Descartes’ Mechanics and proposes an eight-level architecture of control running from basic gait through to time perception.',
    access:
      'Published by Nova Science Publishers. Copy supplied by the author; request the original from the publisher.',
  },
  {
    slug: 'assessment-of-mental-states',
    title:
      'State of Art Method and Advanced Computerized Technology For Assessment of Mental States',
    authors: ['Marina Lobova'],
    venue: 'Functional Neurology, Rehabilitation, and Ergonomics',
    volume: 'Vol. 7, No. 4',
    pages: '40–47',
    kind: 'Perspective',
    topics: ['Neural signalling', 'Mental states', 'Cognition'],
    summary:
      'Sets out a reference frame the author calls the PSY-cone and describes eight neural signatures observed across a scan of thirty subjects. Reports spectral ranges the author associates with retarded, optimum and hyper signalling, and discusses individual assessments.',
    access:
      'Published in Functional Neurology, Rehabilitation, and Ergonomics. Copy supplied by the author; request the original from the publisher.',
    classificationNote:
      'The article is labelled “PERSPECTIVE” by the journal. It is presented here under that classification.',
  },
  {
    slug: 'movement-and-cognition-2018',
    title:
      'Biomechanics and psychomechanics of movement in dance, sport and health programs from the point of view of logic of six dimensional coordinate system',
    authors: ['Marina Lobova'],
    year: '2018',
    venue:
      'The 2018 International Conference on Movement and Cognition, Joseph B. Martin Conference Center',
    kind: 'Conference presentation',
    topics: ['Biomechanics', 'Psychomechanics'],
    summary:
      'Scheduled in the Pechet hall on Friday 27 July 2018 as part of session ME50, which Marina Lobova was invited to chair. The conference ran 27–29 July 2018. The author was unable to travel and did not attend; the work was accepted onto the programme and subsequently published.',
    access: 'See the published conference programme.',
    classificationNote:
      'This is a programme listing, not a peer-reviewed paper, and not a record of attendance. The author did not present in person. The Joseph B. Martin Conference Center is the venue; the listing does not indicate institutional affiliation or endorsement.',
  },
  {
    slug: 'mechanics-of-living-systems',
    title:
      'Mechanics of Living Systems: Biomechanics, Psychomechanics and Mechanics of Time',
    authors: ['Marina Lobova', 'Gerry Leisman'],
    year: '2018',
    venue: 'Brain, Body, Cognition',
    kind: 'Journal article',
    topics: ['Biomechanics', 'Psychomechanics', 'Mechanics of time'],
    summary:
      'The conference paper as subsequently published, with Gerry Leisman as second author. Extends the six-dimensional treatment of movement to the mechanics of living systems and the treatment of time.',
    access: 'Indexed on Semantic Scholar.',
    url: 'https://www.semanticscholar.org/paper/Mechanics-of-Living-Systems-(-Biomechanics-%2C-and-of-Lobova-Leisman/3cc2595e3871588bdcd1994bc1f6bf5da374bc5e',
  },
  {
    slug: 'covid-19-physics-of-life',
    title:
      'Unusual Phenomena Caused by COVID-19 from the Point of View of Physics of Life',
    authors: ['Marina Lobova'],
    year: '2019',
    venue: 'Brain, Body, Cognition',
    volume: '9(4)',
    pages: '627–634',
    issn: '2643-5683',
    publisher: 'Nova Science Publishers',
    kind: 'Journal article',
    topics: ['Physics of life', 'Chronobiology'],
    summary:
      'Applies the author’s physics-of-life framework, together with a chronobiological approach, to the molecular dynamics of COVID-19 and to what the author anticipates as its effects on human health. The author states the paper was written before the pandemic.',
    access: 'Published by Nova Science Publishers.',
    url: 'https://novapublishers.com/shop/covid-19-new-aspects-unusual-phenomena-caused-by-covid-19-from-the-point-of-view-of-physics-of-life/',
    classificationNote:
      'The paper sets out a theoretical analysis. It is not a clinical study, and reports no trial, cohort or patient outcome data.',
  },
]

/** Works cited by the papers above. Included so readers can follow the lineage. */
export const referencedWorks = [
  {
    author: 'G. Shipov',
    title:
      'Descartes’ Mechanics — Fourth Generalization of Newton’s Mechanics',
    detail:
      '7th International Conference Computing Anticipatory Systems, HEC-ULg, Liège, Belgium, 2005, p. 36',
  },
  {
    author: 'G. Shipov, V. Sayakanit',
    title: 'Foundation of the mechanics of orientable point',
    detail: '2009',
    url: 'http://shipov-vacuum.com/wp-content/uploads/2011/09/Foundation-of-the-mechanics2.pdf',
  },
  {
    author: 'G. Shipov',
    title:
      'Vacuum 4: Universal Theory of Relativity and a theory of Physical vacuum',
    detail: '31 August 2009',
    url: 'http://shipov.com/files/170909_vacuum4.pdf',
  },
  {
    author: 'M. A. Lobova',
    title: 'Shipov’s vacuum equations and a new scientific paradigm',
    detail: '2 December 2010, p. 4',
    url: 'http://shipov.com/files/21-phys-vac-e.pdf',
  },
  {
    author: 'M. Carmeli',
    title: 'First letter of Moshe Carmeli',
    detail: '20 April 2005',
    url: 'http://www.shipov.com/news.html',
  },
  {
    author: 'A. Einstein',
    title: 'In: Louis de Broglie, physicien et penseur',
    detail: 'Paris, 1953, pp. 4–14',
  },
  {
    author: 'Ya. Kushelev',
    title: 'Interleukin 34 picotechnological model',
    detail: 'Rotating image',
  },
]

/**
 * The eight neural signatures, transcribed from
 * "State of Art Method and Advanced Computerized Technology
 * For Assessment of Mental States", pp. 42–43.
 * Descriptions follow the source wording closely and are not extended.
 */
export const neuralPathways = [
  {
    id: 'NS-1',
    name: 'Innate immune',
    color: '#4FA8E8',
    description:
      'Related to innate immune signalling, maintaining balanced living forces or life power acquired at the moment of birth.',
  },
  {
    id: 'NS-2',
    name: 'Awareness',
    color: '#6FBF73',
    description:
      'Adaptive immune system, alertness or awareness for life; associated with an ability to learn and adapt to the external environment.',
  },
  {
    id: 'NS-3',
    name: 'Info-sensory',
    color: '#E8A33D',
    description:
      'Associated with the somatosensory system and how people perceive the world through the principal senses, including sensorial processing, imagination and creativity.',
  },
  {
    id: 'NS-4',
    name: 'Intuitive',
    color: '#3F5FA8',
    description:
      'Associated with intuitive perception — described in the source as acquiring knowledge without inference or the use of reason.',
  },
  {
    id: 'NS-5',
    name: 'Decision making',
    color: '#7A5AA8',
    description: 'Choice or decision making.',
  },
  {
    id: 'NS-6',
    name: 'Self / ego',
    color: '#D9544D',
    description:
      'Ego and self-esteem, related to characteristics associated with self-perception and self-management.',
  },
  {
    id: 'NS-7',
    name: 'Subconscious',
    color: '#B08FD9',
    description:
      'Subconscious reactions — subtle sensations which most people are not aware of, cannot control or even understand.',
  },
  {
    id: 'NS-8',
    name: 'Chronobiological',
    color: '#C2A08A',
    description:
      'Chronobiological neural signals, described as synchronising and harmonising living time with body and mind functions.',
  },
]

/**
 * Spectral ranges as reported in the same paper, p. 42.
 * Presented as the author's reported observations, not as diagnostic criteria.
 */
export const spectralRanges = {
  retarded: { max: 83, label: 'Reported as retarded or deficient signalling' },
  optimum: { min: 84, max: 92, label: 'Reported as optimum healthy regulation' },
  equilibrium: { min: 87, max: 89, label: 'Described as equilibrium states' },
  hyper: { min: 92, label: 'Reported as stressed or hyper signalling' },
}

/**
 * The eight-level control architecture from
 * "Biomechanics and Psychomechanics of Movement...", pp. 109–116.
 * This is a genuine ordered hierarchy in the source, so it is numbered.
 */
export const controlLevels = [
  {
    n: '01',
    title: 'Basic Motion',
    subtitle: 'Three-body system',
    body: 'Local motion group M₁. The source describes locomotion beginning with an internal impact that pushes off one leg and creates angular momentum in that spatial plane.',
  },
  {
    n: '02',
    title: 'Compound Motor System',
    subtitle: 'Two local groups',
    body: 'Centres M₁ and M₂ move in synchronised contralateral movements, forming a unified group with a new reinforced centre.',
  },
  {
    n: '03',
    title: 'Wave-Like Motion',
    subtitle: 'Precession and nutation',
    body: 'Described as a natural phenomenon observed from celestial mechanics through to the spin mechanics of the smallest elements, and as a characteristic of the human motion system.',
  },
  {
    n: '04',
    title: 'Executive Level',
    subtitle: 'Motor cortex',
    body: 'The region of the cerebral cortex involved in control and execution of voluntary movements, described in the source via the cortical homunculus.',
  },
  {
    n: '05',
    title: 'Info-Sensory',
    subtitle: 'Somatosensory control',
    body: 'Acquiring real information about space — position, pressure, vibration, safety — through organs with bilateral symmetries and unified centres.',
  },
  {
    n: '06',
    title: 'Strategic Level',
    subtitle: 'Voluntary activity',
    body: 'The practical ability to plan activities, motivate, evaluate and decide. The source notes this level’s influence over levels one to five.',
  },
  {
    n: '07',
    title: 'Master of Self versus Non-Self',
    subtitle: 'Unconscious',
    body: 'Associated with intuitive perception, living awareness, instinctive adaptation and automatic reactions.',
  },
  {
    n: '08',
    title: 'Time',
    subtitle: 'Perception in three temporal dimensions',
    body: 'Time flow perceived as “always now”, with relativity of perception observed as retardation or acceleration across present, past and future.',
  },
]
