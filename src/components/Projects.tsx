import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Github,
  ExternalLink,
  Star,
  GitFork,
  Code2,
  Layers,
  Sparkles,
  ArrowUpRight,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CURATED_PROJECTS, USER_PROFILE } from '../data/resumeData';
import { EnrichedProject, GitHubRepo } from '../types';

interface ProjectsProps {
  darkMode: boolean;
  onSelectProject: (project: EnrichedProject) => void;
  onUpdateRepoCount: (count: number) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  darkMode,
  onSelectProject,
  onUpdateRepoCount,
}) => {
  const [projects, setProjects] = useState<EnrichedProject[]>(CURATED_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');
  const [syncTime, setSyncTime] = useState<string>('');
  const sliderRef = useRef<HTMLDivElement>(null);

  const fetchGitHubRepos = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/users/${USER_PROFILE.githubUsername}/repos?sort=updated&per_page=100`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      );
      if (res.ok) {
        const repos: GitHubRepo[] = await res.json();
        onUpdateRepoCount(repos.length);
        setSyncTime(new Date().toLocaleTimeString());

        // Merge live GitHub repos with curated metadata
        const merged: EnrichedProject[] = repos.map((repo) => {
          const curatedMatch = CURATED_PROJECTS.find(
            (c) => c.name.toLowerCase() === repo.name.toLowerCase()
          );

          if (curatedMatch) {
            return {
              ...curatedMatch,
              stars: repo.stargazers_count,
              updatedAt: new Date(repo.updated_at).toLocaleDateString(),
              liveUrl: repo.homepage || curatedMatch.liveUrl,
              description: repo.description || curatedMatch.description,
            };
          }

          let category: EnrichedProject['category'] = 'Other';
          const nameLower = repo.name.toLowerCase();
          if (nameLower.includes('backend') || nameLower.includes('api')) category = 'Backend';
          else if (nameLower.includes('calc') || nameLower.includes('tool') || nameLower.includes('solve')) category = 'Tool';
          else if (repo.language === 'TypeScript' || repo.language === 'JavaScript' || repo.language === 'HTML') category = 'Frontend';

          return {
            id: repo.id,
            name: repo.name,
            displayName: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
            description: repo.description || 'GitHub public repository built by Ajala Peace Olaoluwa.',
            category,
            tags: [repo.language || 'Code', 'GitHub'],
            githubUrl: repo.html_url,
            liveUrl: repo.homepage || null,
            featured: repo.stargazers_count > 0 || !!repo.homepage,
            language: repo.language,
            stars: repo.stargazers_count,
            updatedAt: new Date(repo.updated_at).toLocaleDateString(),
          };
        });

        setProjects(merged);
      }
    } catch (err) {
      console.warn('GitHub API fetch fallback to curated list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  // Scroll Slider Handlers
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // Filter logic
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.language && p.language.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeCategory === 'All') return true;
    if (activeCategory === 'Featured') return p.featured || !!p.liveUrl;
    if (activeCategory === 'Full-Stack') return p.category === 'Full-Stack';
    if (activeCategory === 'Frontend') return p.category === 'Frontend';
    if (activeCategory === 'Backend & APIs') return p.category === 'Backend';
    if (activeCategory === 'Tools & Utilities') return p.category === 'Tool';

    return true;
  });

  // Sort logic
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'stars') return (b.stars || 0) - (a.stars || 0);
    if (sortBy === 'name') return a.displayName.localeCompare(b.displayName);
    return 0;
  });

  const categories = ['All', 'Featured', 'Full-Stack', 'Frontend', 'Backend & APIs', 'Tools & Utilities'];

  return (
    <section
      id="projects"
      className={`py-16 border-t transition-colors duration-300 ${
        darkMode ? 'bg-black text-white border-neutral-900' : 'bg-white text-black border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase opacity-60">
              <Code2 className="w-3.5 h-3.5" />
              <span>Portfolio Codebase</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-sans">
              Projects & Repositories ({sortedProjects.length})
            </h2>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-1 bg-neutral-900/40 p-1 rounded-xl border border-neutral-800">
              <button
                onClick={scrollLeft}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  darkMode
                    ? 'border-neutral-800 bg-neutral-950 text-white hover:bg-neutral-800'
                    : 'border-neutral-300 bg-white text-black hover:bg-neutral-100'
                }`}
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  darkMode
                    ? 'border-neutral-800 bg-neutral-950 text-white hover:bg-neutral-800'
                    : 'border-neutral-300 bg-white text-black hover:bg-neutral-100'
                }`}
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-50" />
            <input
              type="text"
              placeholder="Search repositories (React, TypeScript, Node...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 text-xs font-sans rounded-lg border focus:outline-none transition-colors ${
                darkMode
                  ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500 focus:border-white'
                  : 'bg-white border-neutral-300 text-black placeholder-neutral-400 focus:border-black'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono opacity-50 hover:opacity-100"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Project Cards HORIZONTAL SLIDER Container */}
        {sortedProjects.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-xl p-6 opacity-60 font-mono text-xs">
            No projects found matching "{searchQuery}". Try clearing filters.
          </div>
        ) : (
          <div className="relative group/slider">
            
            {/* Scroll indicator banner */}
            <div className="flex items-center justify-between text-[10px] font-mono opacity-50 mb-2 px-1">
              <span>Scroll horizontally right to left →</span>
              <span>{sortedProjects.length} items</span>
            </div>

            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 no-scrollbar scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {sortedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className={`w-[280px] sm:w-[320px] shrink-0 snap-start rounded-xl border p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                    darkMode
                      ? 'bg-neutral-950 border-neutral-800 text-white hover:border-neutral-500'
                      : 'bg-white border-neutral-200 text-black hover:border-neutral-900 shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    
                    {/* Top Bar: Language & Live status badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider font-semibold rounded border border-current opacity-70">
                        {proj.language || 'Project'}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {proj.liveUrl && (
                          <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            Live
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold tracking-tight font-sans line-clamp-1">
                        {proj.displayName}
                      </h3>
                      <p className="text-xs opacity-70 line-clamp-2 leading-snug font-sans font-normal">
                        {proj.description}
                      </p>
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                            darkMode
                              ? 'bg-neutral-900 text-neutral-300 border-neutral-800'
                              : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Footer Buttons & Actions */}
                  <div className="pt-4 mt-4 border-t border-neutral-800/50 flex items-center justify-between text-xs">
                    
                    {/* Left Links */}
                    <div className="flex items-center gap-2">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded border border-neutral-800 hover:border-current transition-colors text-[10px] font-mono flex items-center gap-1 opacity-80 hover:opacity-100"
                        title="View GitHub Repository"
                      >
                        <Github className="w-3 h-3" />
                        Repo
                      </a>

                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`p-1.5 rounded border transition-colors text-[10px] font-mono flex items-center gap-1 font-semibold ${
                            darkMode
                              ? 'bg-white text-black border-white hover:bg-neutral-200'
                              : 'bg-black text-white border-black hover:bg-neutral-800'
                          }`}
                          title="Launch Live App Demo"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Demo
                        </a>
                      )}
                    </div>

                    {/* Modal Trigger */}
                    <button
                      onClick={() => onSelectProject(proj)}
                      className="text-[10px] font-mono opacity-60 hover:opacity-100 flex items-center gap-0.5 cursor-pointer"
                    >
                      Details
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
