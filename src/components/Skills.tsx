import React from 'react';
import { Terminal, Cpu, Code2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/resumeData';

interface SkillsProps {
  darkMode: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ darkMode }) => {

  return (
    <section
      id="skills"
      className={`py-16 border-t transition-colors duration-300 ${
        darkMode ? 'bg-black text-white border-neutral-900' : 'bg-white text-black border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Header */}
        <div className="mb-8">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase opacity-60">
              <Cpu className="w-3.5 h-3.5" />
              <span>Language & Tech Proficiency</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-sans">
              Tech Stack Tube Gauge
            </h2>
          </div>
        </div>

        {/* Skill Category Tube Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border transition-all duration-300 ${
                darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-neutral-800/60">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-lg border ${
                      darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-200 text-black'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold font-sans tracking-tight">{cat.title}</h3>
                </div>
                <span className="text-[10px] font-mono opacity-50 uppercase tracking-wider">
                  {cat.skills.length} Technologies
                </span>
              </div>

              {/* Tubes List */}
              <div className="space-y-4">
                {cat.skills.map((skill, i) => {
                  const pct = skill.percentage || 80;

                  return (
                    <div key={i} className="space-y-1.5">
                      
                      {/* Name, Level, and Percentage */}
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-1.5">
                          <Code2 className="w-3 h-3 opacity-50" />
                          <span className="font-semibold">{skill.name}</span>
                          {skill.level && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded border border-current opacity-40 uppercase">
                              {skill.level}
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-xs font-mono tracking-tight opacity-90">
                          {pct}%
                        </span>
                      </div>

                      {/* 3D Glass Tube Meter Bar */}
                      <div
                        className={`relative h-4 w-full rounded-full p-[2px] border overflow-hidden transition-colors ${
                          darkMode
                            ? 'bg-neutral-900/90 border-neutral-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]'
                            : 'bg-neutral-100 border-neutral-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]'
                        }`}
                      >
                        {/* Glass shine line overlay */}
                        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none z-10" />

                        {/* Liquid Fill Tube - Solid Black in Light Mode */}
                        <div
                          className="h-full rounded-full bg-black dark:bg-black relative transition-all duration-1000 shadow-sm"
                          style={{ width: `${pct}%` }}
                        >
                          {/* Inner glossy highlight line inside liquid */}
                          <div className="absolute inset-x-0 top-0 h-[40%] bg-black rounded-t-full" />
                          
                          {/* Tube liquid bubble effect right end */}
                          <div className="absolute right-0 top-0 bottom-0 w-2 bg-black rounded-r-full blur-[0.5px]" />
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

