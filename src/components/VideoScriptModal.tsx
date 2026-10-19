import React, { useState } from 'react';
import { X, Copy, Check, Volume2, Video, FileText, Sparkles, User, GraduationCap, Briefcase, Award } from 'lucide-react';
import { speakEnglish } from '../utils/speech';

interface VideoScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoScriptModal: React.FC<VideoScriptModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('Deiby Olaya');
  const [age, setAge] = useState('25');
  const [city, setCity] = useState('Ibagué');
  const [adjective1, setAdjective1] = useState('organized');
  const [adjective2, setAdjective2] = useState('honest');
  const [adjective3, setAdjective3] = useState('motivated');
  const [hobby, setHobby] = useState('play sports');
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const scriptParagraph = `Hello, dear recruiter. My full name is ${fullName || '[Your Full Name]'}. I am ${age || '[Age]'} years old, and I live in ${city || '[City]'}. I am a responsible person. Three words that describe me are ${adjective1 || 'organized'}, ${adjective2 || 'honest'}, and ${adjective3 || 'motivated'}. In my free time, I ${hobby || 'play sports'}.

I study Accounting and Financial Information Management at SENA. I am currently learning about accounting and finance. I learn how to prepare invoices and organize financial documents. I understand basic accounting concepts, and my training helps me develop accounting skills.

I have experience in academic accounting activities. I practice accounting activities in class, prepare accounting reports, organize financial documents, and check invoices and accounting records. I use Excel to organize information.

Regarding my skills, I can use Excel, organize financial documents, prepare accounting reports, and calculate expenses. I am good at organizing information, and I pay attention to detail. Thank you for your time and consideration!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptParagraph);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleListen = () => {
    if (isSpeaking) {
      if (typeof window !== 'undefined') window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakEnglish(scriptParagraph, () => setIsSpeaking(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Guion Completo para el Video de Postulación</h2>
              <p className="text-xs text-slate-300">
                SENA · Programa de Gestión Contable y de Información Financiera
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Instructions banner */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-900 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-950">
                Personaliza tus datos para tu video de evaluación en inglés
              </p>
              <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                Este guion une de manera coherente las 4 secciones aprendidas en el Módulo 2. Modifica los campos a continuación con tu nombre, edad, ciudad y cualidades reales para generar tu guion listo para grabar.
              </p>
            </div>
          </div>

          {/* Form customization fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" /> Tu Nombre Completo
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. Deiby Olaya"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tu Edad (Años)</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. 25"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tu Ciudad de Residencia</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. Ibagué, Bogotá, Medellín"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Cualidad 1 (Adjetivo)</label>
              <input
                type="text"
                value={adjective1}
                onChange={(e) => setAdjective1(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. organized"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Cualidad 2 (Adjetivo)</label>
              <input
                type="text"
                value={adjective2}
                onChange={(e) => setAdjective2(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. honest"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Cualidad 3 (Adjetivo)</label>
              <input
                type="text"
                value={adjective3}
                onChange={(e) => setAdjective3(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. motivated"
              />
            </div>
          </div>

          {/* Script preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Guion en Inglés para el Video (1–2 minutos)
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleListen}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    isSpeaking
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  {isSpeaking ? 'Detener Audio' : 'Escuchar Pronunciación'}
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? '¡Copiado!' : 'Copiar Guion'}
                </button>
              </div>
            </div>

            <div className="p-5 bg-slate-900 text-slate-100 font-mono text-sm leading-relaxed rounded-xl border border-slate-800 shadow-inner whitespace-pre-wrap select-all">
              {scriptParagraph}
            </div>
          </div>

          {/* Tips for video recording */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600" /> Postura y Cámara
              </p>
              <p className="text-slate-600 leading-normal">
                Ubica la cámara al nivel de tus ojos, viste ropa profesional adecuada para el sector financiero y mantén contacto visual.
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-600" /> Claridad y Ritmo
              </p>
              <p className="text-slate-600 leading-normal">
                Habla despacio y vocaliza bien. Recuerda decir "I study at SENA" y "I am ... years old" con confianza.
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" /> Énfasis en Habilidades
              </p>
              <p className="text-slate-600 leading-normal">
                Enfatiza tu dominio de Excel y tu atención al detalle ("I can use Excel", "I pay attention to detail").
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors cursor-pointer"
          >
            Cerrar Guion
          </button>
        </div>
      </div>
    </div>
  );
};
