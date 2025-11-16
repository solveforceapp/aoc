import type { ModalKey, FieldProgram } from '../types';

export interface LogosScore {
  version: '1.0.0';
  id: string;
  name: string;
  steps: ModalKey[];
}

export interface LogosValidationResult {
  ok: boolean;
  errors: string[];
}

const UENOMIC_CLOSURE_KEYS: ModalKey[] = [
  'UNIFIED_FIELD',
  'STRUCTURAL_COHERENCE',
  'LOGOS_ATTUNEMENT',
];

export const validateLogosScore = (
  data: unknown,
  validModalKeys: ModalKey[]
): LogosValidationResult => {
  const errors: string[] = [];
  const keys = new Set(validModalKeys);

  if (typeof data !== 'object' || data === null) {
    return { ok: false, errors: ['Score must be a JSON object'] };
  }

  const score = data as Partial<LogosScore>;

  if (score.version !== '1.0.0') {
    errors.push('version must be "1.0.0"');
  }
  if (!score.id || typeof score.id !== 'string') {
    errors.push('id must be a non-empty string');
  }
  if (!score.name || typeof score.name !== 'string') {
    errors.push('name must be a non-empty string');
  }
  if (!Array.isArray(score.steps) || score.steps.length === 0) {
    errors.push('steps must be a non-empty array');
  } else {
    // Encodenomics: all steps must be valid modal keys
    score.steps.forEach((step, idx) => {
      if (!keys.has(step as ModalKey)) {
        errors.push(`steps[${idx}] = "${String(step)}" is not a valid ModalKey`);
      }
    });

    // Optional Encodenomics: no duplicate steps (strict uniqueness per score)
    const seen = new Set<string>();
    score.steps.forEach((step, idx) => {
      const s = String(step);
      if (seen.has(s)) {
        errors.push(`steps[${idx}] = "${s}" is duplicated in score (Encodenomic uniqueness violated)`);
      }
      seen.add(s);
    });

    // Condonomics: Uenomic closure requirement
    const last = score.steps[score.steps.length - 1] as ModalKey;
    if (!UENOMIC_CLOSURE_KEYS.includes(last)) {
      errors.push(
        `last step "${last}" does not satisfy Uenomic closure; expected one of: ${UENOMIC_CLOSURE_KEYS.join(
          ', '
        )}`
      );
    }
  }

  return { ok: errors.length === 0, errors };
};

export const importLogosScore = (
  json: string,
  validModalKeys: ModalKey[]
): { program: FieldProgram | null; errors: string[] } => {
  try {
    const parsed = JSON.parse(json);
    const result = validateLogosScore(parsed, validModalKeys);
    if (!result.ok) {
      return { program: null, errors: result.errors };
    }
    const score = parsed as LogosScore;

    const program: FieldProgram = {
      id: score.id,
      name: score.name,
      steps: score.steps,
      createdAt: Date.now(),
    };

    return { program, errors: [] };
  } catch {
    return { program: null, errors: ['Invalid JSON'] };
  }
};
