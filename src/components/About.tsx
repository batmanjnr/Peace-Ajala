import React from 'react';
import { User, GraduationCap, Briefcase, Award, MapPin, CheckCircle2 } from 'lucide-react';
import { USER_PROFILE, EXPERIENCE_LIST } from '../data/resumeData';

interface AboutProps {
  darkMode: boolean;
}

export const About: React.FC<AboutProps> = ({ darkMode }) => {
  return (
    <section
      id="about"
      className={`py-16 border-t transition-colors duration-300 ${
        darkMode ? 'bg-black text-white border-neutral-900' : 'bg-white text-black border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Bio & Academic Background (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            <div
              className={`p-5 rounded-xl border ${
                darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <h3 className="text-sm font-bold font-sans mb-2">Background</h3>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-sans font-normal mb-3">
                Computer Science undergraduate at <strong>Ladoke Akintola University Of Technology Nigeria</strong>. Focused on full-stack web engineering, Python &amp; FastAPI backend services, and mobile app development using React, Next.js, Node.js, Express, Python, FastAPI, MongoDB, and React Native.
              </p>
              <p className="text-xs opacity-75 leading-relaxed font-sans">
                Experience and training across INTRAVENT TECHNOLOGY, LEGIT HUB INNOVATION, SQI College of ICT, and backend engineering, developing full-stack web platforms, mobile apps, and scalable RESTful APIs.
              </p>
            </div>

            {/* Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs mb-0.5">Full-Stack & Backend</div>
                  <div className="text-[11px] opacity-70">React & Next.js frontends with FastAPI, Python & Node backends.</div>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs mb-0.5">React Native Mobile</div>
                  <div className="text-[11px] opacity-70">Cross-platform iOS/Android apps with Expo Go.</div>
                </div>
              </div>
            </div>

          </div>

          {/* Experience & Training Timeline (5 cols) */}
          <div className="lg:col-span-5 space-y-4" id="experience">
            <h3 className="text-base font-bold font-sans flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Experience & Training
            </h3>

            <div className="relative border-l border-neutral-800 pl-4 ml-1 space-y-5">
              {EXPERIENCE_LIST.map((exp) => (
                <div key={exp.id} className="relative group">
                  <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-current bg-black" />
                  
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono opacity-50 block uppercase tracking-wider">
                      {exp.period}
                    </span>
                    <h4 className="font-bold text-xs font-sans">{exp.role}</h4>
                    <p className="text-[11px] font-mono opacity-80">{exp.organization}</p>
                  </div>

                  <p className="text-[11px] opacity-70 mt-1 font-sans leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
