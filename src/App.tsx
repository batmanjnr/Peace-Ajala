import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { PictureModal } from './components/PictureModal';
import { USER_PROFILE } from './data/resumeData';
import { EnrichedProject } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return false; // Default to clean white background
  });

  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    const saved = localStorage.getItem('portfolio_avatar');
    if (!saved || saved.includes('avatars.githubusercontent.com')) {
      return USER_PROFILE.avatarUrl;
    }
    return saved;
  });

  const [selectedProject, setSelectedProject] = useState<EnrichedProject | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [repoCount, setRepoCount] = useState(29);

  useEffect(() => {
    localStorage.setItem('portfolio_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleSaveAvatar = (url: string) => {
    setAvatarUrl(url);
    localStorage.setItem('portfolio_avatar', url);
  };

  return (
    <div
      className={`min-h-screen font-sans selection:bg-white selection:text-black transition-colors duration-300 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPictureModal={() => setIsPictureModalOpen(true)}
        avatarUrl={avatarUrl}
      />

      {/* Hero Section */}
      <Hero
        darkMode={darkMode}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPictureModal={() => setIsPictureModalOpen(true)}
        avatarUrl={avatarUrl}
        repoCount={repoCount}
      />

      {/* Projects Section */}
      <Projects
        darkMode={darkMode}
        onSelectProject={(project) => setSelectedProject(project)}
        onUpdateRepoCount={(count) => setRepoCount(count)}
      />

      {/* About & Experience Section */}
      <About darkMode={darkMode} />

      {/* Skills Section */}
      <Skills darkMode={darkMode} />

      {/* Contact Section */}
      <Contact darkMode={darkMode} />

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        darkMode={darkMode}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        darkMode={darkMode}
      />

      <PictureModal
        isOpen={isPictureModalOpen}
        onClose={() => setIsPictureModalOpen(false)}
        currentAvatarUrl={avatarUrl}
        onSaveAvatarUrl={handleSaveAvatar}
        darkMode={darkMode}
      />
    </div>
  );
}
