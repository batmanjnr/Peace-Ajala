import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Copy, Check, MessageSquare } from 'lucide-react';
import { USER_PROFILE } from '../data/resumeData';

interface ContactProps {
  darkMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSent(true);

    const mailtoUrl = `mailto:${USER_PROFILE.email}?subject=${encodeURIComponent(
      formData.subject || `Portfolio Contact from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1000);
  };

  return (
    <section
      id="contact"
      className={`py-16 border-t transition-colors duration-300 ${
        darkMode ? 'bg-black text-white border-neutral-900' : 'bg-white text-black border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="space-y-1.5 mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase opacity-60">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-sans">
            Get In Touch
          </h2>
          <p className="text-xs sm:text-sm opacity-75 font-sans">
            Available for junior developer roles and project collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          
          {/* Email Card */}
          <div
            className={`p-4 rounded-xl border transition-colors ${
              darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Email
              </span>
              <button
                onClick={() => handleCopy(USER_PROFILE.email, 'email')}
                className="p-1 rounded border border-neutral-800 text-[10px] font-mono flex items-center gap-1 hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedEmail ? 'Copied' : 'Copy'}
              </button>
            </div>
            <a
              href={`mailto:${USER_PROFILE.email}`}
              className="text-xs sm:text-sm font-bold font-mono hover:underline break-all"
            >
              {USER_PROFILE.email}
            </a>
          </div>

          {/* Phone Card */}
          <div
            className={`p-4 rounded-xl border transition-colors ${
              darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                Phone
              </span>
              <button
                onClick={() => handleCopy(USER_PROFILE.phone, 'phone')}
                className="p-1 rounded border border-neutral-800 text-[10px] font-mono flex items-center gap-1 hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Copy phone number"
              >
                {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedPhone ? 'Copied' : 'Copy'}
              </button>
            </div>
            <a
              href={`tel:${USER_PROFILE.phone}`}
              className="text-xs sm:text-sm font-bold font-mono hover:underline"
            >
              {USER_PROFILE.phone}
            </a>
          </div>

          {/* Location & Social Links */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
              darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono opacity-80">
              <MapPin className="w-3.5 h-3.5" />
              <span>{USER_PROFILE.location}</span>
            </div>

            <div className="pt-2 border-t border-neutral-800/60 flex items-center gap-3">
              <a
                href={USER_PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase font-semibold rounded-lg border border-neutral-800 hover:border-current transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a
                href={USER_PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase font-semibold rounded-lg border border-neutral-800 hover:border-current transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
