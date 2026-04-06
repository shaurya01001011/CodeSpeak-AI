import { Code2, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  voiceFeedback: boolean;
  onToggleVoice: () => void;
}

export function Header({ voiceFeedback, onToggleVoice }: HeaderProps) {
  return (
    <header className="w-full bg-[#0f0f1a] border-b border-purple-500/20 px-6 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            CodeSpeak AI
          </h1>
        </div>

        <button
          onClick={onToggleVoice}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-all"
          aria-label={voiceFeedback ? "Disable voice feedback" : "Enable voice feedback"}
        >
          {voiceFeedback ? (
            <>
              <Volume2 className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-purple-400">Voice: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400">Voice: OFF</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
