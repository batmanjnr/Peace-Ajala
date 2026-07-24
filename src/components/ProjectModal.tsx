import React from 'react';
import { X, Github, ExternalLink, Star, Code2, Check, Sparkles } from 'lucide-react';
import { EnrichedProject } from '../types';

interface ProjectModalProps {
  project: EnrichedProject | null;
  onClose: () => void;
  darkMode: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, darkMode }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 sm:p-8 space-y-6 shadow-2xl transition-all ${
          darkMode ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-white text-black border-neutral-200'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 pr-8">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border border-current opacity-70">
              {project.category}
            </span>
            {project.language && (
              <span className="text-[10px] font-mono opacity-60">• {project.language}</span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-sans tracking-tight">
            {project.displayName}
          </h3>
        </div>

        {/* Description */}
        <div className="space-y-3 text-xs sm:text-sm opacity-80 leading-relaxed font-sans">
          <p>{project.longDescription || project.description}</p>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">Technologies Used</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 text-[10px] font-mono rounded-md border ${
                  darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase font-bold rounded-xl border transition-all ${
                darkMode ? 'bg-white text-black border-white hover:bg-neutral-200' : 'bg-black text-white border-black hover:bg-neutral-800'
              }`}
            >
              <Github className="w-4 h-4" />
              View Source Code
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase font-semibold rounded-xl border border-emerald-500 text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Launch App
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono opacity-60 hover:opacity-100 uppercase tracking-wider"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
