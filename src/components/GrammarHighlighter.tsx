import React from 'react';
import { TokenItem, TokenType } from '../types/presentation';

interface GrammarHighlighterProps {
  tokens: TokenItem[];
  className?: string;
  size?: 'normal' | 'large' | 'extra-large';
}

export const TOKEN_STYLES: Record<TokenType, {
  textClass: string;
  bgClass: string;
  borderClass: string;
  labelEs: string;
  dotColor: string;
}> = {
  verb: {
    textClass: 'text-emerald-300',
    bgClass: 'bg-emerald-950/70',
    borderClass: 'border-emerald-500/70',
    labelEs: 'Verbo',
    dotColor: 'bg-emerald-400',
  },
  noun: {
    textClass: 'text-sky-300',
    bgClass: 'bg-sky-950/70',
    borderClass: 'border-sky-500/70',
    labelEs: 'Sustantivo',
    dotColor: 'bg-sky-400',
  },
  adjective: {
    textClass: 'text-rose-300',
    bgClass: 'bg-rose-950/70',
    borderClass: 'border-rose-500/70',
    labelEs: 'Adjetivo',
    dotColor: 'bg-rose-400',
  },
  pronoun: {
    textClass: 'text-cyan-300',
    bgClass: 'bg-cyan-950/70',
    borderClass: 'border-cyan-500/70',
    labelEs: 'Pronombre / Sujeto',
    dotColor: 'bg-cyan-400',
  },
  preposition: {
    textClass: 'text-amber-300',
    bgClass: 'bg-amber-950/70',
    borderClass: 'border-amber-500/70',
    labelEs: 'Preposición',
    dotColor: 'bg-amber-400',
  },
  article: {
    textClass: 'text-yellow-300',
    bgClass: 'bg-yellow-950/70',
    borderClass: 'border-yellow-500/70',
    labelEs: 'Artículo',
    dotColor: 'bg-yellow-400',
  },
  adverb: {
    textClass: 'text-purple-300',
    bgClass: 'bg-purple-950/70',
    borderClass: 'border-purple-500/70',
    labelEs: 'Adverbio',
    dotColor: 'bg-purple-400',
  },
  other: {
    textClass: 'text-slate-100',
    bgClass: 'bg-transparent',
    borderClass: 'border-transparent',
    labelEs: 'Conector / Otro',
    dotColor: 'bg-slate-400',
  },
};

export const GrammarHighlighter: React.FC<GrammarHighlighterProps> = ({
  tokens,
  className = '',
  size = 'extra-large',
}) => {
  const sizeClasses =
    size === 'extra-large'
      ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight'
      : size === 'large'
      ? 'text-xl sm:text-2xl md:text-3xl leading-snug'
      : 'text-base sm:text-lg leading-normal';

  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-2.5 ${sizeClasses} ${className}`}>
      {tokens.map((token, idx) => {
        const style = TOKEN_STYLES[token.type] || TOKEN_STYLES.other;
        const isHighlighted = token.type !== 'other';

        return (
          <span
            key={idx}
            className={`inline-block font-extrabold tracking-tight transition-transform duration-150 ${
              isHighlighted
                ? `px-2.5 sm:px-3 py-1 rounded-xl border-2 ${style.borderClass} ${style.bgClass} ${style.textClass} shadow-md`
                : `${style.textClass}`
            }`}
            title={`${token.text}: ${style.labelEs}`}
          >
            {token.text}
          </span>
        );
      })}
    </div>
  );
};

export const GrammarLegend: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const legendItems: Array<{ type: TokenType; label: string }> = [
    { type: 'verb', label: 'Verbos (Verde)' },
    { type: 'noun', label: 'Sustantivos (Azul claro)' },
    { type: 'adjective', label: 'Adjetivos (Rosa)' },
    { type: 'pronoun', label: 'Pronombres (Turquesa)' },
    { type: 'preposition', label: 'Preposiciones (Naranja)' },
    { type: 'article', label: 'Artículos (Amarillo)' },
    { type: 'adverb', label: 'Adverbios (Púrpura)' },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 text-xs ${compact ? 'py-1' : 'py-2.5'}`}>
      <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider mr-1">
        Colores Gramaticales (Ambos Idiomas):
      </span>
      {legendItems.map((item) => {
        const style = TOKEN_STYLES[item.type];
        return (
          <span
            key={item.type}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${style.borderClass} ${style.bgClass} ${style.textClass}`}
          >
            <span className={`w-2 h-2 rounded-full ${style.dotColor}`} />
            {item.label}
          </span>
        );
      })}
    </div>
  );
};
