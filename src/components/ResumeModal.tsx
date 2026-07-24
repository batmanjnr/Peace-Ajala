import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { USER_PROFILE, EXPERIENCE_LIST, SKILL_CATEGORIES } from '../data/resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, darkMode }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const fullResumeText = `
${USER_PROFILE.fullName}
${USER_PROFILE.location} | ${USER_PROFILE.phone} | ${USER_PROFILE.email}
GitHub: ${USER_PROFILE.github} | LinkedIn: ${USER_PROFILE.linkedin}

PROFESSIONAL SUMMARY
${USER_PROFILE.bio}

TECHNICAL SKILLS
- Languages: HTML, CSS, JavaScript, TypeScript
- Frontend: React.js, Next.js, React Native, Bootstrap, Tailwind CSS
- Backend & Databases: Node.js, Express, MongoDB
- Tools & Services: Git, Firebase

EXPERIENCE & TRAINING
${EXPERIENCE_LIST.map(e => `${e.organization} — ${e.role} (${e.period})\n${e.description}\n${e.highlights.map(h => `• ${h}`).join('\n')}`).join('\n\n')}

EDUCATION
${USER_PROFILE.education.institution} — ${USER_PROFILE.education.degree} (${USER_PROFILE.education.status})
    `.trim();

    navigator.clipboard.writeText(fullResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white print:text-black">
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border p-6 sm:p-10 shadow-2xl transition-all print:max-h-none print:shadow-none print:border-none print:p-0 ${
          darkMode ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-white text-black border-neutral-200'
        }`}
      >
        {/* Top Controls Bar (Hidden when printing) */}
        <div className="sticky top-0 z-20 flex items-center justify-between pb-4 mb-6 border-b border-neutral-800/80 bg-inherit print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest opacity-60">
              Curriculum Vitae / Resume
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase font-semibold rounded-lg border transition-all cursor-pointer ${
                darkMode ? 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800' : 'bg-neutral-100 border-neutral-300 hover:bg-neutral-200'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Text'}
            </button>

            <button
              onClick={handlePrint}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase font-bold rounded-lg border transition-all cursor-pointer ${
                darkMode ? 'bg-white text-black border-white hover:bg-neutral-200' : 'bg-black text-white border-black hover:bg-neutral-800'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              Print / PDF
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-neutral-800 hover:bg-neutral-800 transition-colors ml-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="space-y-8 font-sans text-sm">
          
          {/* Header */}
          <div className="text-center space-y-2 pb-6 border-b border-neutral-800/60">
            <h1 className="text-3xl font-extrabold tracking-tight font-sans">
              {USER_PROFILE.fullName}
            </h1>
            <p className="text-xs font-mono opacity-80">
              {USER_PROFILE.location} | {USER_PROFILE.phone} | {USER_PROFILE.email}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-mono opacity-80 pt-1">
              <a href={USER_PROFILE.github} target="_blank" rel="noreferrer" className="underline">
                GitHub: batmanjnr
              </a>
              <span>•</span>
              <a href={USER_PROFILE.linkedin} target="_blank" rel="noreferrer" className="underline">
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold opacity-60 border-b border-neutral-800/40 pb-1">
              Professional Summary
            </h2>
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              {USER_PROFILE.bio}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold opacity-60 border-b border-neutral-800/40 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono opacity-80">
              {SKILL_CATEGORIES.map((cat, i) => (
                <div key={i}>
                  <strong className="opacity-100 font-bold">{cat.title}:</strong>{' '}
                  {cat.skills.map(s => s.name).join(', ')}
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold opacity-60 border-b border-neutral-800/40 pb-1">
              Experience & Practical Training
            </h2>
            <div className="space-y-4">
              {EXPERIENCE_LIST.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-center justify-between font-bold text-sm">
                    <span>{exp.organization} — {exp.role}</span>
                    <span className="font-mono text-xs opacity-60 font-normal">{exp.period}</span>
                  </div>
                  <p className="text-xs opacity-80">{exp.description}</p>
                  <ul className="list-disc list-inside text-xs opacity-75 space-y-0.5 pt-1">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2 pt-2">
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold opacity-60 border-b border-neutral-800/40 pb-1">
              Education
            </h2>
            <div className="flex items-center justify-between text-xs font-bold">
              <span>{USER_PROFILE.education.institution} — {USER_PROFILE.education.degree}</span>
              <span className="font-mono opacity-60 font-normal">{USER_PROFILE.education.status}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
