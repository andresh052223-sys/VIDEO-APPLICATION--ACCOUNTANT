export type CategoryType = 'noun' | 'adjective' | 'verb';

export type TokenType =
  | 'pronoun'
  | 'verb'
  | 'adjective'
  | 'noun'
  | 'preposition'
  | 'article'
  | 'adverb'
  | 'other';

export interface TokenItem {
  text: string;
  type: TokenType;
}

export interface VocabularyItem {
  id: number;
  english: string;
  spanish: string;
  category: CategoryType;
  categoryLabelEs: string;
  categoryLabelEn: string;
  iconName: string;
  pronunciationIpa?: string;
  usageTipEs?: string;
  isMultiword?: boolean;
}

export interface GrammarPairItem {
  id: number;
  sectionId: 'personal' | 'academic' | 'experience' | 'skills';
  pairIndex: number; // 1 to 6
  spanish: string;
  english: string;
  grammarFocus: string;
  grammarRuleEs: string;
  apprenticeTipEs: string;
  iconName: string;
  tokens?: TokenItem[]; // Backwards-compatibility alias for englishTokens
  englishTokens: TokenItem[];
  spanishTokens: TokenItem[];
}

export type SlideKind =
  | 'vocab_spanish'
  | 'vocab_bilingual'
  | 'grammar_spanish'
  | 'grammar_bilingual';

export interface SlideData {
  id: string; // e.g. "m1-v1-a", "m1-v1-b", "m2-sec1-p1-a"
  module: 1 | 2;
  sectionId?: 'personal' | 'academic' | 'experience' | 'skills';
  sectionTitle?: string;
  slideNumberInScope: number; // 1 to 100 in Module 1, or 1 to 12 in section, or 1 to 48 in Module 2
  totalInScope: number;
  kind: SlideKind;
  vocabItem?: VocabularyItem;
  grammarItem?: GrammarPairItem;
}

export interface SectionMeta {
  id: 'personal' | 'academic' | 'experience' | 'skills';
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  slideCount: number; // 12
  pairCount: number; // 6
  iconName: string;
  colorAccent: string;
}
