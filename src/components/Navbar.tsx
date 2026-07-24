import React from 'react';
import { USER_PROFILE } from '../data/resumeData';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode?: (val: boolean) => void;
  onOpenResume?: () => void;
  onOpenPictureModal?: () => void;
  avatarUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode }) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-md border-b ${
        darkMode
          ? 'bg-black/90 border-neutral-800 text-white'
          : 'bg-white/90 border-neutral-200 text-black'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <a
            href="#top"
            className="font-extrabold tracking-tight text-xl sm:text-2xl text-center hover:opacity-80 transition-opacity font-sans"
          >
            {USER_PROFILE.fullName}
          </a>
        </div>
      </div>
    </header>
  );
};
