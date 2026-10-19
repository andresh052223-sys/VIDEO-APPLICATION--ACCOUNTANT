import React, { useState } from 'react';
import {
  BookOpen,
  FileSpreadsheet,
  GraduationCap,
  Play,
  RotateCcw,
  Video,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Calculator,
  User,
  Briefcase,
  Award,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { GRAMMAR_SECTIONS } from '../data/grammar';
import { DynamicIcon } from './DynamicIcon';

interface HomeScreenProps {
  onStartModule1: () => void;
  onResumeModule1: () => void;
  module1Progress: number; // 0 to 100
  onStartModule2: (sectionId?: 'personal' | 'academic' | 'experience' | 'skills') => void;
  onResumeModule2: () => void;
  module2Progress: number; // 0 to 48
  sectionProgress: Record<string, number>; // sectionId -> current slide index (0 to 12)
  onOpenScriptModal: () => void;
  onResetAllProgress: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartModule1,
  onResumeModule1,
  module1Progress,
  onStartModule2,
  onResumeModule2,
  module2Progress,
  sectionProgress,
  onOpenScriptModal,
  onResetAllProgress,
}) => {
  const [selectedSection, setSelectedSection] = useState<'all' | 'personal' | 'academic' | 'experience' | 'skills'>('all');

  const m1Percentage = Math.round((module1Progress / 100) * 100);
  const m2Percentage = Math.round((module2Progress / 48) * 100);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        {/* ========================================================
            HERO HEADER & SENA BRANDING
        ======================================================== */}
        <header className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SENA · Gestión Contable y de Información Financiera
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            English for Accounting Video Application
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Presentación interactiva proyectable de <span className="text-white font-bold">148 diapositivas</span> diseñada para preparar a los aprendices SENA en la grabación de su video de postulación laboral en inglés.
          </p>

          {/* Quick Script Banner Action */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenScriptModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 transition-all cursor-pointer active:scale-95"
            >
              <Video className="w-4 h-4" />
              Generador de Guion para Video
            </button>
            {(module1Progress > 0 || module2Progress > 0) && (
              <button
                onClick={onResetAllProgress}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
                title="Reiniciar todo el progreso registrado"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar Progreso
              </button>
            )}
          </div>
        </header>

        {/* ========================================================
            MAIN TWO MODULE CARDS
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CARD 1: MODULE 1 */}
          <div className="group relative bg-slate-900/90 rounded-3xl border-2 border-slate-700/80 hover:border-blue-500/80 p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:shadow-blue-500/10">
            <div>
              {/* Badge & Meta */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  MÓDULO 1
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  50 palabras · 100 diapositivas
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-blue-300 transition-colors">
                Accounting & Professional Vocabulary
              </h2>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Vocabulario técnico esencial organizado en parejas de diapositivas: primero en español para activar el pensamiento y luego en inglés con pronunciación, categoría gramatical e icono.
              </p>

              {/* Category Breakdown */}
              <div className="grid grid-cols-3 gap-2 my-5 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-800/50">
                  <span className="block font-bold text-sky-300 text-sm">20 Nouns</span>
                  <span className="text-[11px] text-sky-400/80">Sustantivos</span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/50">
                  <span className="block font-bold text-rose-300 text-sm">15 Adjectives</span>
                  <span className="text-[11px] text-rose-400/80">Adjetivos</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
                  <span className="block font-bold text-emerald-300 text-sm">15 Verbs</span>
                  <span className="text-[11px] text-emerald-400/80">Verbos y Frases</span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Progreso de la sesión:</span>
                  <span className="text-blue-400 font-mono">
                    {module1Progress > 0 ? `Diapositiva ${module1Progress} de 100 (${m1Percentage}%)` : 'Sin iniciar (0%)'}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${m1Percentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              {module1Progress > 0 && module1Progress < 100 ? (
                <button
                  onClick={onResumeModule1}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Continuar (Slide {module1Progress})
                </button>
              ) : null}
              <button
                onClick={onStartModule1}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  module1Progress > 0 && module1Progress < 100
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                {module1Progress >= 100 ? 'Repetir Módulo 1' : 'Iniciar Módulo 1 (Slide 1)'}
              </button>
            </div>
          </div>

          {/* CARD 2: MODULE 2 */}
          <div className="group relative bg-slate-900/90 rounded-3xl border-2 border-slate-700/80 hover:border-indigo-500/80 p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:shadow-indigo-500/10">
            <div>
              {/* Badge & Meta */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  MÓDULO 2
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  4 secciones · 48 diapositivas
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                Grammar Structures for Job Video
              </h2>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Estructuras gramaticales reales adaptadas a las guías de postulación del SENA: oraciones en presente simple, verbo to be, can + verbo base, e identificación por colores.
              </p>

              {/* 4 Interactive Section Cards Inside Module 2 */}
              <div className="grid grid-cols-2 gap-2.5 my-4">
                {GRAMMAR_SECTIONS.map((sec) => {
                  const secProgress = sectionProgress[sec.id] || 0;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => onStartModule2(sec.id)}
                      className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-indigo-400 text-left transition-all cursor-pointer group/sec"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <DynamicIcon name={sec.iconName} className="w-4 h-4 text-indigo-400" />
                        <span className="text-[10px] font-mono text-slate-400">
                          {secProgress > 0 ? `${secProgress}/12` : '12 slides'}
                        </span>
                      </div>
                      <div className="font-bold text-xs text-slate-200 group-hover/sec:text-white truncate">
                        {sec.titleEn}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {sec.titleEs}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Progress Indicator */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Progreso global del módulo:</span>
                  <span className="text-indigo-400 font-mono">
                    {module2Progress > 0 ? `Diapositiva ${module2Progress} de 48 (${m2Percentage}%)` : 'Sin iniciar (0%)'}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${m2Percentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              {module2Progress > 0 && module2Progress < 48 ? (
                <button
                  onClick={onResumeModule2}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Continuar (Slide {module2Progress})
                </button>
              ) : null}
              <button
                onClick={() => onStartModule2(undefined)}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  module2Progress > 0 && module2Progress < 48
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                {module2Progress >= 48 ? 'Repetir Módulo 2' : 'Iniciar Todo el Módulo 2 (48 Slides)'}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            INSTRUCTIONAL GUIDE / TIPS FOR SENA APPRENTICES
        ======================================================== */}
        <section className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 text-xs text-slate-400">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Recomendaciones Pedagógicas para la Clase y el Video
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-3xl">
                Al usar la presentación en el aula, el instructor proyecta primero la diapositiva en español para que los aprendices evoquen la palabra u oración en inglés. Al presionar "Siguiente", se revela la traducción en inglés con audio para verificar la pronunciación y analizar la regla gramatical.
              </p>
            </div>
            <button
              onClick={onOpenScriptModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-colors cursor-pointer shrink-0"
            >
              Abrir Guion Modelo
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-4 border-t border-slate-800/60 mt-8">
        SENA · Centro de Comercio y Servicios · Programa de Formación: Gestión Contable y de Información Financiera · 148 Diapositivas Educativas
      </footer>
    </div>
  );
};
