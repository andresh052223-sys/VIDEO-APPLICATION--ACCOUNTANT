import React, { useState } from 'react';
import {
  RotateCcw,
  Home,
  ArrowRight,
  CheckCircle,
  Volume2,
  BookOpen,
  Sparkles,
  FileText,
  Search,
} from 'lucide-react';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { GRAMMAR_PAIRS, GRAMMAR_SECTIONS } from '../data/grammar';
import { speakEnglish } from '../utils/speech';
import { GrammarHighlighter, GrammarLegend } from './GrammarHighlighter';

interface RecapScreenProps {
  module: 1 | 2;
  sectionId?: 'personal' | 'academic' | 'experience' | 'skills';
  onRestart: () => void;
  onGoHome: () => void;
  onNextModule?: () => void;
  onOpenScriptModal?: () => void;
}

export const RecapScreen: React.FC<RecapScreenProps> = ({
  module,
  sectionId,
  onRestart,
  onGoHome,
  onNextModule,
  onOpenScriptModal,
}) => {
  const [activeSpeakingId, setActiveSpeakingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [vocabTab, setVocabTab] = useState<'all' | 'noun' | 'adjective' | 'verb'>('all');

  const handlePlayAudio = (id: number, text: string) => {
    setActiveSpeakingId(id);
    speakEnglish(text, () => setActiveSpeakingId(null));
  };

  const filteredVocab = VOCABULARY_LIST.filter((item) => {
    const matchesTab = vocabTab === 'all' || item.category === vocabTab;
    const matchesSearch =
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.spanish.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const filteredGrammar = GRAMMAR_PAIRS.filter((item) => {
    if (sectionId && item.sectionId !== sectionId) return false;
    const matchesSearch =
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.spanish.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {module === 1
            ? '¡Felicitaciones! Has completado el Módulo 1'
            : sectionId
            ? `¡Sección Completada: ${GRAMMAR_SECTIONS.find((s) => s.id === sectionId)?.titleEs}!`
            : '¡Felicitaciones! Has completado el Módulo 2'}
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
          {module === 1
            ? 'Has repasado las 50 palabras y expresiones clave de contabilidad y perfil profesional en sus 100 diapositivas.'
            : 'Has practicado las estructuras gramaticales esenciales para tu video de postulación profesional.'}
        </p>

        {/* Quick Action Navigation Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar Módulo
          </button>
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Menú Principal
          </button>
          {module === 1 && onNextModule && (
            <button
              onClick={onNextModule}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              Continuar al Módulo 2
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {module === 2 && onOpenScriptModal && (
            <button
              onClick={onOpenScriptModal}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Ver Guion Completo de Video
            </button>
          )}
        </div>
      </div>

      {/* Recap Content Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              {module === 1 ? 'Banco de Vocabulario Aprendido (50 Palabras)' : 'Estructuras Gramaticales Estudiadas'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Haz clic en el icono de audio para escuchar la pronunciación en inglés
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar término o frase..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Vocab filter tabs if module 1 */}
            {module === 1 && (
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setVocabTab('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    vocabTab === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Todos (50)
                </button>
                <button
                  onClick={() => setVocabTab('noun')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    vocabTab === 'noun' ? 'bg-white text-sky-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sustantivos (20)
                </button>
                <button
                  onClick={() => setVocabTab('adjective')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    vocabTab === 'adjective' ? 'bg-white text-rose-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Adjetivos (15)
                </button>
                <button
                  onClick={() => setVocabTab('verb')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    vocabTab === 'verb' ? 'bg-white text-emerald-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Verbos (15)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Grid List */}
        {module === 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
            {filteredVocab.map((item) => {
              const categoryColor =
                item.category === 'noun'
                  ? 'border-sky-200 hover:border-sky-300 bg-sky-50/40'
                  : item.category === 'adjective'
                  ? 'border-rose-200 hover:border-rose-300 bg-rose-50/40'
                  : 'border-emerald-200 hover:border-emerald-300 bg-emerald-50/40';

              const badgeColor =
                item.category === 'noun'
                  ? 'text-sky-700 bg-sky-100/80'
                  : item.category === 'adjective'
                  ? 'text-rose-700 bg-rose-100/80'
                  : 'text-emerald-700 bg-emerald-100/80';

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border ${categoryColor} transition-all`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-400">#{item.id}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${badgeColor}`}>
                        {item.categoryLabelEs}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm truncate">{item.english}</div>
                    <div className="text-xs text-slate-600 truncate">{item.spanish}</div>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(item.id, item.english)}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                      activeSpeakingId === item.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 hover:text-blue-600 border-slate-200 hover:bg-slate-50'
                    }`}
                    title="Escuchar pronunciación"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 pt-4">
            <GrammarLegend compact={true} />
            {filteredGrammar.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-700 bg-slate-900 text-slate-100 shadow-md space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.sectionId.toUpperCase()} · Par {item.pairIndex}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{item.grammarFocus}</span>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(item.id, item.english)}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                      activeSpeakingId === item.id
                        ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400/30'
                        : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-700'
                    }`}
                    title="Escuchar frase en inglés"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Spanish & English in equal large size with color coding */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <div className="space-y-1.5 text-center">
                    <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">🇪🇸 Español</span>
                    <GrammarHighlighter tokens={item.spanishTokens} size="large" />
                  </div>
                  <div className="space-y-1.5 text-center border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-3">
                    <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">🇬🇧 English</span>
                    <GrammarHighlighter tokens={item.englishTokens} size="large" />
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                  💡 <span className="font-semibold text-white">Regla:</span> {item.grammarRuleEs}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
