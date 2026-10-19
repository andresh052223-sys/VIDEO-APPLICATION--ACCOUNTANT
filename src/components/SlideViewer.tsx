import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  List,
  Sparkles,
  HelpCircle,
  X,
  BookOpen,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { SlideData } from '../types/presentation';
import { DynamicIcon } from './DynamicIcon';
import { GrammarHighlighter, GrammarLegend } from './GrammarHighlighter';
import { speakEnglish } from '../utils/speech';

interface SlideViewerProps {
  slides: SlideData[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onGoHome: () => void;
  onRestart: () => void;
  moduleTitle: string;
  scopeLabel: string;
  onFinishModule: () => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  slides,
  currentIndex,
  onNavigate,
  onGoHome,
  onRestart,
  moduleTitle,
  scopeLabel,
  onFinishModule,
}) => {
  const currentSlide = slides[currentIndex];
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSlideDrawerOpen, setIsSlideDrawerOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalSlides - 1;

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen failed:', err);
      });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Slide navigation handlers
  const handleNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onFinishModule();
    }
  }, [currentIndex, totalSlides, onNavigate, onFinishModule]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  // Keyboard navigation: ArrowLeft, ArrowRight, Spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input is focused
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape' && isSlideDrawerOpen) {
        setIsSlideDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isSlideDrawerOpen]);

  // Play audio for current slide
  const handleAudio = () => {
    let textToSpeak = '';
    if (currentSlide.kind === 'vocab_bilingual' && currentSlide.vocabItem) {
      textToSpeak = currentSlide.vocabItem.english;
    } else if (currentSlide.kind === 'grammar_bilingual' && currentSlide.grammarItem) {
      textToSpeak = currentSlide.grammarItem.english;
    }

    if (!textToSpeak) return;

    setIsPlayingAudio(true);
    speakEnglish(textToSpeak, () => setIsPlayingAudio(false));
  };

  // Category styling
  const getCategoryStyles = (category?: string) => {
    switch (category) {
      case 'noun':
        return {
          badge: 'bg-sky-100 text-sky-800 border-sky-300',
          accent: 'text-sky-600',
          border: 'border-sky-300',
          subtleBg: 'bg-sky-50/50',
          label: 'SUSTANTIVO',
        };
      case 'adjective':
        return {
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          accent: 'text-rose-600',
          border: 'border-rose-300',
          subtleBg: 'bg-rose-50/50',
          label: 'ADJETIVO',
        };
      case 'verb':
        return {
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          accent: 'text-emerald-600',
          border: 'border-emerald-300',
          subtleBg: 'bg-emerald-50/50',
          label: 'VERBO / EXPRESIÓN VERBAL',
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-800 border-slate-300',
          accent: 'text-slate-600',
          border: 'border-slate-300',
          subtleBg: 'bg-slate-50',
          label: 'ESTRUCTURA GRAMATICAL',
        };
    }
  };

  const categoryStyles = getCategoryStyles(
    currentSlide.vocabItem?.category || (currentSlide.module === 2 ? 'grammar' : undefined)
  );

  const progressPercent = Math.round(((currentIndex + 1) / totalSlides) * 100);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col justify-between w-full h-full min-h-screen bg-slate-950 text-slate-100 select-none ${
        isFullscreen ? 'p-4 md:p-8' : 'p-3 md:p-6'
      }`}
    >
      {/* ========================================================
          TOP NAVIGATION BAR: BREADCRUMBS, CONTROLS, ACTIONS
      ======================================================== */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between pb-3 border-b border-slate-800/80 gap-3">
        {/* Left: Breadcrumb / Progress Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onGoHome}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer shrink-0"
            title="Volver al Menú Principal"
          >
            <Home className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm font-bold text-blue-400 uppercase tracking-wider truncate">
                {moduleTitle}
              </span>
              <span className="text-slate-600 hidden sm:inline">/</span>
              <span className="text-xs md:text-sm font-medium text-slate-300 hidden sm:inline truncate">
                {scopeLabel}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Diapositiva <span className="font-bold text-white">{currentSlide.slideNumberInScope}</span> de {currentSlide.totalInScope}
              {currentSlide.kind.includes('spanish') ? ' · (Solo Español)' : ' · (Bilingüe)'}
            </p>
          </div>
        </div>

        {/* Right: Quick Tools (Slide List Drawer, Fullscreen, Restart) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsSlideDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors cursor-pointer"
            title="Ver índice de diapositivas"
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Índice</span>
          </button>

          <button
            onClick={onRestart}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            title="Reiniciar desde la primera diapositiva"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa para proyector'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ========================================================
          MAIN 16:9 PRESENTATION CANVAS
      ======================================================== */}
      <main className="flex-1 flex items-center justify-center my-auto py-4 md:py-6">
        <div
          className={`relative w-full max-w-6xl aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border-2 ${categoryStyles.border} shadow-2xl flex flex-col justify-between overflow-hidden p-6 md:p-12 transition-all duration-300`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Top Badge Header */}
          <div className="flex items-center justify-between z-10 w-full">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs md:text-sm font-extrabold uppercase tracking-wider border shadow-2xs ${categoryStyles.badge}`}
              >
                {currentSlide.module === 1
                  ? currentSlide.vocabItem?.categoryLabelEs
                  : currentSlide.sectionTitle || 'ESTRUCTURA GRAMATICAL'}
              </span>

              {currentSlide.module === 1 && currentSlide.vocabItem?.id && (
                <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full">
                  Item #{currentSlide.vocabItem.id} de 50
                </span>
              )}

              {currentSlide.module === 2 && currentSlide.grammarItem && (
                <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full">
                  Par {currentSlide.grammarItem.pairIndex} de 6
                </span>
              )}
            </div>
          </div>

          {/* ========================================================
              SLIDE CONTENT DISPLAY
          ======================================================== */}
          <div className="flex-1 flex flex-col items-center justify-center text-center my-auto z-10 py-4 px-2">
            {/* MODULE 1: VOCABULARY SLIDES */}
            {currentSlide.module === 1 && currentSlide.vocabItem && (
              <>
                {currentSlide.kind === 'vocab_spanish' ? (
                  /* Slide A: Spanish Only */
                  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                    <p className="text-sm md:text-base font-semibold text-slate-400 uppercase tracking-widest">
                      Palabra en Español
                    </p>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight drop-shadow-md">
                      {currentSlide.vocabItem.spanish.toUpperCase()}
                    </h2>
                  </div>
                ) : (
                  /* Slide B: Spanish + English Bilingual */
                  <div className="space-y-4 md:space-y-6 animate-in fade-in zoom-in-95 duration-200 w-full max-w-4xl">
                    {/* Spanish anchor */}
                    <div className="inline-block">
                      <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-slate-400 mr-2">
                        Español:
                      </span>
                      <span className="text-2xl md:text-3xl font-bold text-slate-300">
                        {currentSlide.vocabItem.spanish}
                      </span>
                    </div>

                    {/* Prominent English Word */}
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-emerald-400 tracking-tight drop-shadow-lg">
                        {currentSlide.vocabItem.english.toUpperCase()}
                      </h2>

                      {/* Pronunciation Speaker Button */}
                      <button
                        onClick={handleAudio}
                        className={`p-3 md:p-4 rounded-2xl border transition-all cursor-pointer shadow-lg ${
                          isPlayingAudio
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 scale-110 ring-4 ring-emerald-500/30'
                            : 'bg-slate-800/90 text-emerald-300 hover:text-white border-slate-700 hover:bg-slate-700 hover:scale-105'
                        }`}
                        title="Escuchar pronunciación (Inglés)"
                      >
                        <Volume2 className="w-7 h-7 md:w-9 md:h-9" />
                      </button>
                    </div>

                    {/* Phonetic & Usage Tip */}
                    <div className="flex flex-col items-center gap-2 pt-2">
                      {currentSlide.vocabItem.pronunciationIpa && (
                        <span className="font-mono text-base md:text-lg text-slate-400 bg-slate-800/80 px-4 py-1 rounded-lg border border-slate-700">
                          {currentSlide.vocabItem.pronunciationIpa}
                        </span>
                      )}
                      {currentSlide.vocabItem.usageTipEs && (
                        <p className="text-sm md:text-base text-slate-300 max-w-2xl bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800/80">
                          💡 <span className="font-semibold text-slate-200">Uso profesional:</span>{' '}
                          {currentSlide.vocabItem.usageTipEs}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* MODULE 2: GRAMMAR STRUCTURES SLIDES */}
            {currentSlide.module === 2 && currentSlide.grammarItem && (
              <>
                {currentSlide.kind === 'grammar_spanish' ? (
                  /* Slide A: Spanish Only Sentence in Extra Large with Grammatical Colors (Clean) */
                  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200 w-full max-w-5xl my-auto">
                    {/* Extra large Spanish sentence with grammatical color highlights */}
                    <div className="py-6">
                      <GrammarHighlighter
                        tokens={currentSlide.grammarItem.spanishTokens}
                        size="extra-large"
                      />
                    </div>
                  </div>
                ) : (
                  /* Slide B: Spanish + English Bilingual with EQUAL SIZE & SYNCHRONIZED COLORS (Clean) */
                  <div className="space-y-4 md:space-y-5 animate-in fade-in zoom-in-95 duration-200 w-full max-w-5xl my-auto">
                    {/* Row 1: ESPAÑOL (Extra Large & Color Coded) */}
                    <div className="p-4 md:p-6 rounded-2xl bg-slate-900/90 border-2 border-slate-800 shadow-lg text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
                          🇪🇸 Español
                        </span>
                      </div>
                      <GrammarHighlighter
                        tokens={currentSlide.grammarItem.spanishTokens}
                        size="extra-large"
                      />
                    </div>

                    {/* Row 2: ENGLISH (EQUAL EXTRA LARGE SIZE & SYNCHRONIZED COLOR CODED) */}
                    <div className="p-4 md:p-6 rounded-2xl bg-slate-900/90 border-2 border-indigo-500/50 shadow-xl text-center space-y-2 relative">
                      <div className="flex items-center justify-center gap-3">
                        <span className="px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40">
                          🇬🇧 English
                        </span>
                        {/* Audio Pronunciation Button */}
                        <button
                          onClick={handleAudio}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            isPlayingAudio
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 scale-105 ring-2 ring-emerald-500/40'
                              : 'bg-slate-800 text-blue-300 hover:text-white border-slate-700 hover:bg-slate-700'
                          }`}
                          title="Escuchar pronunciación de la frase en inglés"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>{isPlayingAudio ? 'Reproduciendo...' : 'Escuchar Audio'}</span>
                        </button>
                      </div>

                      <GrammarHighlighter
                        tokens={currentSlide.grammarItem.englishTokens}
                        size="extra-large"
                      />
                    </div>

                    {/* Grammar Rule & Apprentice Advice */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-left">
                      <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                        <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">
                          Enfoque Gramatical
                        </span>
                        <p className="text-xs md:text-sm font-semibold text-slate-200">
                          {currentSlide.grammarItem.grammarFocus}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {currentSlide.grammarItem.grammarRuleEs}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                          Consejo para el Aprendiz SENA
                        </span>
                        <p className="text-xs md:text-sm text-slate-200">
                          {currentSlide.grammarItem.apprenticeTipEs}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* ========================================================
          BOTTOM INTERACTIVE CONTROLS & PROGRESS BAR
      ======================================================== */}
      <footer className="w-full max-w-7xl mx-auto pt-3 border-t border-slate-800/80">
        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
          <div
            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={isFirstSlide}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm md:text-base font-bold transition-all cursor-pointer ${
              isFirstSlide
                ? 'opacity-40 bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 active:scale-95 shadow-md'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Anterior</span>
          </button>

          {/* Slide Indicator Badge */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-300 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
            <span>Diapositiva</span>
            <span className="text-white font-mono font-bold text-base">{currentSlide.slideNumberInScope}</span>
            <span className="text-slate-500">de</span>
            <span className="text-white font-mono font-bold text-base">{currentSlide.totalInScope}</span>
          </div>

          {/* Next Button / Finish */}
          <button
            onClick={handleNext}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm md:text-base font-bold transition-all cursor-pointer active:scale-95 shadow-lg ${
              isLastSlide
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25 ring-2 ring-blue-400/30'
            }`}
          >
            <span>{isLastSlide ? 'Ver Resumen Final' : 'Siguiente'}</span>
            {isLastSlide ? <CheckCircle className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </footer>

      {/* ========================================================
          DRAWER / SLIDE SELECTOR MODAL (FOR INSTRUCTOR NAVIGATION)
      ======================================================== */}
      {isSlideDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <List className="w-4 h-4 text-blue-400" />
                Índice de Diapositivas ({totalSlides} en total)
              </h3>
              <button
                onClick={() => setIsSlideDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {slides.map((slide, idx) => {
                const isSelected = idx === currentIndex;
                const label =
                  slide.vocabItem
                    ? slide.kind === 'vocab_spanish'
                      ? `${slide.vocabItem.spanish} (ES)`
                      : `${slide.vocabItem.english} (EN)`
                    : slide.grammarItem
                    ? slide.kind === 'grammar_spanish'
                      ? `Par ${slide.grammarItem.pairIndex} (ES)`
                      : `Par ${slide.grammarItem.pairIndex} (EN)`
                    : `Slide ${idx + 1}`;

                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      onNavigate(idx);
                      setIsSlideDrawerOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer truncate ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 mb-0.5 font-mono">
                      #{slide.slideNumberInScope}
                    </div>
                    <div className="truncate font-semibold">{label}</div>
                  </button>
                );
              })}
            </div>

            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsSlideDrawerOpen(false)}
                className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg cursor-pointer"
              >
                Cerrar Índice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
