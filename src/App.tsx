/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { generateModule1Slides, VOCABULARY_LIST } from './data/vocabulary';
import { generateModule2Slides, GRAMMAR_SECTIONS } from './data/grammar';
import { SlideData } from './types/presentation';
import { HomeScreen } from './components/HomeScreen';
import { SlideViewer } from './components/SlideViewer';
import { RecapScreen } from './components/RecapScreen';
import { VideoScriptModal } from './components/VideoScriptModal';

type AppView = 'home' | 'presentation' | 'recap';

interface SavedProgress {
  module1Index: number; // 0 to 99
  module2Index: number; // 0 to 47
  sectionIndices: Record<string, number>;
}

const STORAGE_KEY = 'sena_accounting_english_progress_v1';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [activeModule, setActiveModule] = useState<1 | 2>(1);
  const [activeSectionId, setActiveSectionId] = useState<
    'personal' | 'academic' | 'experience' | 'skills' | undefined
  >(undefined);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);

  // Persistent progress
  const [progress, setProgress] = useState<SavedProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return {
      module1Index: 0,
      module2Index: 0,
      sectionIndices: {
        personal: 0,
        academic: 0,
        experience: 0,
        skills: 0,
      },
    };
  });

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore
    }
  }, [progress]);

  // Compute slides array for current presentation context
  const currentSlides: SlideData[] = useMemo(() => {
    if (activeModule === 1) {
      return generateModule1Slides();
    } else {
      return generateModule2Slides(activeSectionId);
    }
  }, [activeModule, activeSectionId]);

  // Update progress tracking whenever activeSlideIndex changes
  useEffect(() => {
    if (view === 'presentation') {
      setProgress((prev) => {
        const next = { ...prev };
        if (activeModule === 1) {
          next.module1Index = Math.max(prev.module1Index, activeSlideIndex + 1);
        } else if (activeModule === 2) {
          if (!activeSectionId) {
            next.module2Index = Math.max(prev.module2Index, activeSlideIndex + 1);
          } else {
            next.sectionIndices = {
              ...prev.sectionIndices,
              [activeSectionId]: Math.max(prev.sectionIndices[activeSectionId] || 0, activeSlideIndex + 1),
            };
          }
        }
        return next;
      });
    }
  }, [view, activeModule, activeSectionId, activeSlideIndex]);

  // Handlers for Module 1
  const handleStartModule1 = () => {
    setActiveModule(1);
    setActiveSectionId(undefined);
    setActiveSlideIndex(0);
    setView('presentation');
  };

  const handleResumeModule1 = () => {
    setActiveModule(1);
    setActiveSectionId(undefined);
    const resumeIndex = Math.min(Math.max(0, progress.module1Index - 1), 99);
    setActiveSlideIndex(resumeIndex);
    setView('presentation');
  };

  // Handlers for Module 2
  const handleStartModule2 = (sectionId?: 'personal' | 'academic' | 'experience' | 'skills') => {
    setActiveModule(2);
    setActiveSectionId(sectionId);
    setActiveSlideIndex(0);
    setView('presentation');
  };

  const handleResumeModule2 = () => {
    setActiveModule(2);
    setActiveSectionId(undefined);
    const resumeIndex = Math.min(Math.max(0, progress.module2Index - 1), 47);
    setActiveSlideIndex(resumeIndex);
    setView('presentation');
  };

  // Navigation handlers within SlideViewer
  const handleSlideNavigate = (newIndex: number) => {
    setActiveSlideIndex(newIndex);
  };

  const handleGoHome = () => {
    setView('home');
  };

  const handleRestartCurrent = () => {
    setActiveSlideIndex(0);
  };

  const handleFinishModule = () => {
    setView('recap');
  };

  const handleResetAllProgress = () => {
    const emptyProgress: SavedProgress = {
      module1Index: 0,
      module2Index: 0,
      sectionIndices: {
        personal: 0,
        academic: 0,
        experience: 0,
        skills: 0,
      },
    };
    setProgress(emptyProgress);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  // Scope title labels
  const scopeLabel = useMemo(() => {
    if (activeModule === 1) {
      return '50 Vocablos Contables (100 Diapositivas)';
    }
    if (activeSectionId) {
      const sec = GRAMMAR_SECTIONS.find((s) => s.id === activeSectionId);
      return sec ? `${sec.titleEn} (12 Diapositivas)` : '12 Diapositivas';
    }
    return '4 Secciones de Estructuras (48 Diapositivas)';
  }, [activeModule, activeSectionId]);

  const moduleTitle = activeModule === 1 ? 'Módulo 1: Vocabulario' : 'Módulo 2: Gramática';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {view === 'home' && (
        <HomeScreen
          onStartModule1={handleStartModule1}
          onResumeModule1={handleResumeModule1}
          module1Progress={progress.module1Index}
          onStartModule2={handleStartModule2}
          onResumeModule2={handleResumeModule2}
          module2Progress={progress.module2Index}
          sectionProgress={progress.sectionIndices}
          onOpenScriptModal={() => setIsScriptModalOpen(true)}
          onResetAllProgress={handleResetAllProgress}
        />
      )}

      {view === 'presentation' && (
        <SlideViewer
          slides={currentSlides}
          currentIndex={activeSlideIndex}
          onNavigate={handleSlideNavigate}
          onGoHome={handleGoHome}
          onRestart={handleRestartCurrent}
          moduleTitle={moduleTitle}
          scopeLabel={scopeLabel}
          onFinishModule={handleFinishModule}
        />
      )}

      {view === 'recap' && (
        <div className="min-h-screen bg-slate-900 py-6">
          <RecapScreen
            module={activeModule}
            sectionId={activeSectionId}
            onRestart={() => {
              setActiveSlideIndex(0);
              setView('presentation');
            }}
            onGoHome={handleGoHome}
            onNextModule={
              activeModule === 1
                ? () => {
                    handleStartModule2(undefined);
                  }
                : undefined
            }
            onOpenScriptModal={() => setIsScriptModalOpen(true)}
          />
        </div>
      )}

      {/* Video Script Guide Modal */}
      <VideoScriptModal
        isOpen={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
      />
    </div>
  );
}
