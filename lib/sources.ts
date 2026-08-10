/**
 * SOURCE TRACEABILITY REGISTRY
 * ----------------------------------------------------------------------------
 * Every substantive statement rendered on this site resolves to an entry here.
 * An entry may only be added if the wording can be traced to a specific page or
 * section of a supplied document. If a claim has no entry, it does not ship.
 *
 * Rules enforced by review (see CONTENT-AUDIT.md):
 *  - Quotes are reproduced verbatim and kept short. Never lengthened, never
 *    paraphrased into stronger language.
 *  - Hedged language in the original stays hedged here ("may", "suggests",
 *    "could be associated with"). Never upgraded to "proven" or "clinical".
 *  - No regulatory status of any kind appears in this registry, because none
 *    appears in any supplied document.
 */

export type Evidence = {
  /** Stable key used by components to look the record up. */
  id: string
  /** Verbatim excerpt from the source. Kept short. */
  quote: string
  /** Who said it. */
  attribution: string
  /** Where it was published. */
  publication: string
  /** Document filename or URL the excerpt came from. */
  sourceDocument: string
  /** Page or section within that document. */
  sourceLocation: string
  /** Link to the original, where one exists publicly. */
  sourceUrl?: string
}

export const evidence: Record<string, Evidence> = {
  consciousnessChallenge: {
    id: 'consciousnessChallenge',
    quote:
      'Understanding states of consciousness is a major scientific challenge of our times',
    attribution: 'Marina Lobova',
    publication:
      'Functional Neurology, Rehabilitation, and Ergonomics, Vol. 7, No. 4',
    sourceDocument: 'State of Art Method and Advanced Computerized Technology For Assessment of Mental States',
    sourceLocation: 'Abstract, p. 40',
  },

  motionPrimeCharacteristic: {
    id: 'motionPrimeCharacteristic',
    quote: 'Motion is one of the prime characteristics of live systems',
    attribution: 'Marina Lobova',
    publication: 'Brain, Body, Cognition, 2018;8(1):105–123',
    sourceDocument:
      'Biomechanics and Psychomechanics of Movement in Dance, Sport, and Health Programs',
    sourceLocation: 'Abstract, p. 105',
  },

  methodBasis: {
    id: 'methodBasis',
    quote: 'based upon best of MRIT, Doppler Effect of sound waves',
    attribution: 'Marina Lobova',
    publication:
      'Functional Neurology, Rehabilitation, and Ergonomics, Vol. 7, No. 4',
    sourceDocument: 'State of Art Method and Advanced Computerized Technology For Assessment of Mental States',
    sourceLocation: 'Conclusion, p. 46',
  },

  fisherInformation: {
    id: 'fisherInformation',
    quote:
      'The database of that Ψ-wave function is expressed through Fisher information.',
    attribution: 'Marina Lobova',
    publication:
      'Functional Neurology, Rehabilitation, and Ergonomics, Vol. 7, No. 4',
    sourceDocument: 'State of Art Method and Advanced Computerized Technology For Assessment of Mental States',
    sourceLocation: 'p. 41',
  },

  carmeliOnShipov: {
    id: 'carmeliOnShipov',
    quote: 'I find the work of Dr. Shipov quite original and creative.',
    attribution: 'Moshe Carmeli, Ben Gurion University',
    publication: 'Letter dated 20 April 2005, quoted in Brain, Body, Cognition',
    sourceDocument:
      'Biomechanics and Psychomechanics of Movement in Dance, Sport, and Health Programs',
    sourceLocation: 'Introduction, p. 106; reference [2]',
    sourceUrl: 'http://www.shipov.com/news.html',
  },

  biomechanicsTarget: {
    id: 'biomechanicsTarget',
    quote:
      'The ultimate target in biomechanics is to achieve understanding on regulative and control systems.',
    attribution: 'Marina Lobova',
    publication: 'Brain, Body, Cognition, 2018;8(1):105–123',
    sourceDocument:
      'Biomechanics and Psychomechanics of Movement in Dance, Sport, and Health Programs',
    sourceLocation: 'Introduction, p. 106',
  },

  interactiveCausality: {
    id: 'interactiveCausality',
    quote:
      'Interactive causality principle is one of the fundamental principles in conservation of information in the living system.',
    attribution: 'Marina Lobova',
    publication: 'Brain, Body, Cognition, 2018;8(1):105–123',
    sourceDocument:
      'Biomechanics and Psychomechanics of Movement in Dance, Sport, and Health Programs',
    sourceLocation: 'p. 117',
  },

  dataLimits: {
    id: 'dataLimits',
    quote:
      'the present data cannot describe all what could be sensed or perceived by human mind and consciousness',
    attribution: 'Marina Lobova',
    publication:
      'Functional Neurology, Rehabilitation, and Ergonomics, Vol. 7, No. 4',
    sourceDocument: 'State of Art Method and Advanced Computerized Technology For Assessment of Mental States',
    sourceLocation: 'p. 46',
  },

  lobovaBiography: {
    id: 'lobovaBiography',
    quote:
      'A distinguished academic whose career began in 1974 at Moscow State University.',
    attribution: 'Professional biography, supplied by the subject',
    publication: 'Delta Wellness document file',
    sourceDocument: 'Dr. Marina A. Lobova — professional biography',
    sourceLocation: 'Opening paragraph',
  },

  metaGenesisNatureMarine: {
    id: 'metaGenesisNatureMarine',
    quote:
      'Meta Genesis is presented as a quantum-biocomputing framework built on foundational research in physics, neuroscience and psychology.',
    attribution: 'Nature Marine',
    publication: 'naturemarine.vip',
    sourceDocument: 'Nature Marine — Meta Genesis product page',
    sourceLocation: 'Programme overview',
    sourceUrl: 'https://naturemarine.vip/',
  },
}

export function getEvidence(id: keyof typeof evidence): Evidence {
  const record = evidence[id]
  if (!record) throw new Error(`No source record for "${String(id)}".`)
  return record
}