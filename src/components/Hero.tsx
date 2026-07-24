import React from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, FileText, Code2, Sparkles, MapPin, Phone, Camera } from 'lucide-react';
import { USER_PROFILE } from '../data/resumeData';

interface HeroProps {
  darkMode: boolean;
  onOpenResume: () => void;
  onOpenPictureModal: () => void;
  avatarUrl: string;
  repoCount: number;
}
import pic from '../assets/images/pic.jpg'

export const Hero: React.FC<HeroProps> = ({
  darkMode,
  onOpenResume,
  onOpenPictureModal,
  avatarUrl,
  repoCount,
}) => {
  return (
    <section
      id="top"
      className={`relative pt-24 pb-12 flex flex-col justify-center transition-colors duration-300 ${
        darkMode
          ? 'bg-black text-white bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px]'
          : 'bg-white text-black bg-[radial-gradient(#00000010_1px,transparent_1px)] [background-size:20px_20px]'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center flex flex-col items-center">
        <div className="space-y-6 flex flex-col items-center max-w-2xl">
          
          {/* Profile Picture Avatar Circle */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-current bg-neutral-900 shadow-2xl transition-transform duration-300 hover:scale-105">
                <img
                  src={pic || avatarUrl || USER_PROFILE.avatarUrl}
                  alt={USER_PROFILE.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-black rounded-full shadow-md" title="Active & Available" />
            </div>
          </div>

          {/* Name & Title */}
          <div className="space-y-1.5 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans leading-tight">
              {USER_PROFILE.fullName}
            </h1>
            <p className="text-sm sm:text-base font-mono opacity-80 font-normal">
              {USER_PROFILE.title}
            </p>
          </div>

          {/* Concise Bio */}
          <p className="text-xs sm:text-sm md:text-base opacity-75 max-w-xl leading-relaxed font-sans font-normal mx-auto">
            {USER_PROFILE.bio}
          </p>

          {/* Location & Contact Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] sm:text-xs font-mono opacity-70">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {USER_PROFILE.location}
            </span>
            <span>•</span>
            <a
              href={`mailto:${USER_PROFILE.email}`}
              className="flex items-center gap-1 hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              {USER_PROFILE.email}
            </a>
            <span>•</span>
            <a
              href={`tel:${USER_PROFILE.phone}`}
              className="flex items-center gap-1 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              {USER_PROFILE.phone}
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#projects"
              className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-bold rounded-lg transition-all cursor-pointer ${
                darkMode
                  ? 'bg-white text-black hover:bg-neutral-200 shadow-sm'
                  : 'bg-black text-white hover:bg-neutral-800 shadow-sm'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              View {repoCount || '29'} Repos
            </a>

            <button
              onClick={onOpenResume}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold rounded-lg border transition-all cursor-pointer ${
                darkMode
                  ? 'border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-white'
                  : 'border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-black'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Resume PDF
            </button>

            <a
              href={USER_PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-neutral-800 hover:border-current transition-colors opacity-80 hover:opacity-100 text-xs"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={USER_PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-neutral-800 hover:border-current transition-colors opacity-80 hover:opacity-100 text-xs"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Metrics Ticker Bar */}
        <div
          className={`mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl border ${
            darkMode
              ? 'bg-neutral-950/80 border-neutral-800/80 text-white'
              : 'bg-neutral-50/90 border-neutral-200 text-black'
          }`}
        >
          <div className="p-2 font-mono">
            <div className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans">{repoCount || 29}</div>
            <div className="text-[10px] opacity-60 uppercase tracking-wider mt-0.5">Repositories</div>
          </div>
          <div className="p-2 font-mono">
            <div className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans">3+</div>
            <div className="text-[10px] opacity-60 uppercase tracking-wider mt-0.5">Trainings</div>
          </div>
          <div className="p-2 font-mono">
            <div className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans">10+</div>
            <div className="text-[10px] opacity-60 uppercase tracking-wider mt-0.5">Tech Skills</div>
          </div>
          <div className="p-2 font-mono">
            <div className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans">B.Sc.</div>
            <div className="text-[10px] opacity-60 uppercase tracking-wider mt-0.5">CS at LAUTECH</div>
          </div>
        </div>

      </div>
    </section>
  );
};
