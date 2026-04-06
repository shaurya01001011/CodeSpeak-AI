import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
  ];

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#131320] border border-purple-500/20 rounded-xl">
      <Languages className="w-5 h-5 text-purple-400" />
      <label className="text-purple-400 text-sm">Language:</label>
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-[#0a0a0f] text-gray-300 border border-purple-500/30 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
