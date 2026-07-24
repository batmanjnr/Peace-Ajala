import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { USER_PROFILE } from '../data/resumeData';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`py-12 border-t transition-colors duration-300 font-mono text-xs ${
        darkMode ? 'bg-black text-white border-neutral-900' : 'bg-white text-black border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="space-y-1 text-center md:text-left">
          <p className="font-bold text-sm">{USER_PROFILE.fullName}</p>
          <p className="opacity-60">Full-Stack & Mobile Developer • Ladoke Akintola University Of Technology Nigeria CS Undergraduate</p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-6 opacity-80">
          <a href={USER_PROFILE.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a href={USER_PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a href={`mailto:${USER_PROFILE.email}`} className="hover:underline flex items-center gap-1">
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>

        {/* Right: Scroll to top */}
        <div className="flex items-center gap-4">
          <span className="opacity-50">© {new Date().getFullYear()} All Rights Reserved</span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
