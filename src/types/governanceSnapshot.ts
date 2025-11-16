export interface GovernanceSnapshot {
  version: '1.0.0';
  sessionId: string;
  timestamp: string; // ISO 8601
  description?: string;

  // Expressed as weights from 0 to 1, should sum ~1.0
  intentWeights: {
    Uenomics?: number;
    Axionomics?: number;
    Appronomics?: number;
    Regeneronomics?: number;
    Medianomics?: number;
    Crescenomics?: number;
    Diminomics?: number;
  };

  // Optional: which programs are planned/allowed in this session
  plannedPrograms?: string[]; // FieldProgram ids
  forbiddenPrograms?: string[];

  // Optional: session notes after the fact
  reflections?: string;
}
