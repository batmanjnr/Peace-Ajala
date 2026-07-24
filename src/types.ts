export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}

export interface EnrichedProject {
  id: string | number;
  name: string;
  displayName: string;
  description: string;
  longDescription?: string;
  category: 'Full-Stack' | 'Frontend' | 'Mobile' | 'Backend' | 'Tool' | 'Other';
  tags: string[];
  githubUrl: string;
  liveUrl?: string | null;
  featured: boolean;
  language?: string | null;
  stars?: number;
  updatedAt?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  category: 'Training' | 'Work' | 'Education';
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level?: string; percentage?: number; color?: string }[];
}

export interface UserProfile {
  name: string;
  fullName: string;
  title: string;
  subtitle: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  githubUsername: string;
  avatarUrl: string;
  education: {
    institution: string;
    degree: string;
    status: string;
  };
}
