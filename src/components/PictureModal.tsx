import React, { useState } from 'react';
import { X, Upload, Camera, RefreshCw, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { USER_PROFILE } from '../data/resumeData';

interface PictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatarUrl: string;
  onSaveAvatarUrl: (url: string) => void;
  darkMode: boolean;
}

export const PictureModal: React.FC<PictureModalProps> = ({
  isOpen,
  onClose,
  currentAvatarUrl,
  onSaveAvatarUrl,
  darkMode,
}) => {
  const [customUrl, setCustomUrl] = useState(currentAvatarUrl);
  const [preview, setPreview] = useState(currentAvatarUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setCustomUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSaveAvatarUrl(preview);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleResetDefault = () => {
    setPreview(USER_PROFILE.avatarUrl);
    setCustomUrl(USER_PROFILE.avatarUrl);
    onSaveAvatarUrl(USER_PROFILE.avatarUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-md rounded-2xl border p-6 sm:p-8 space-y-6 shadow-2xl transition-all ${
          darkMode ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-white text-black border-neutral-200'
        }`}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-60">
            <Camera className="w-4 h-4" />
            <span>Profile Photo Manager</span>
          </div>
          <h3 className="text-2xl font-bold font-sans">Customize Profile Picture</h3>
        </div>

        {/* Current Preview */}
        <div className="flex flex-col items-center justify-center space-y-3 py-2">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-current bg-neutral-900 shadow-xl group">
            <img
              src={preview}
              alt="Avatar Preview"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
          <p className="text-xs font-mono opacity-60">High-Contrast Black & White Avatar</p>
        </div>

        {/* Upload File Input */}
        <div className="space-y-3">
          <label className="block text-xs font-mono uppercase tracking-wider opacity-70">
            Option 1: Upload Image File
          </label>
          <label
            className={`flex items-center justify-center gap-2 w-full p-4 rounded-xl border border-dashed cursor-pointer font-mono text-xs uppercase tracking-wider transition-colors ${
              darkMode
                ? 'border-neutral-700 bg-neutral-900 hover:bg-neutral-800'
                : 'border-neutral-300 bg-neutral-100 hover:bg-neutral-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            Choose Photo File...
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Custom URL Input */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider opacity-70">
            Option 2: Image URL
          </label>
          <input
            type="url"
            value={customUrl}
            onChange={(e) => {
              setCustomUrl(e.target.value);
              setPreview(e.target.value);
            }}
            placeholder="https://..."
            className={`w-full px-4 py-2.5 text-xs font-mono rounded-xl border focus:outline-none ${
              darkMode
                ? 'bg-neutral-900 border-neutral-800 text-white focus:border-white'
                : 'bg-white border-neutral-300 text-black focus:border-black'
            }`}
          />
        </div>

        {/* Controls */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            onClick={handleResetDefault}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono opacity-60 hover:opacity-100 cursor-pointer"
            title="Reset to GitHub Avatar"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Default
          </button>

          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 text-xs font-mono uppercase font-bold rounded-xl border transition-all cursor-pointer ${
              savedSuccess
                ? 'bg-emerald-500 text-black border-emerald-500'
                : darkMode
                ? 'bg-white text-black border-white hover:bg-neutral-200'
                : 'bg-black text-white border-black hover:bg-neutral-800'
            }`}
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            {savedSuccess ? 'Saved Photo!' : 'Apply Picture'}
          </button>
        </div>

      </div>
    </div>
  );
};
