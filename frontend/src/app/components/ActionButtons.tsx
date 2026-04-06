import { Sparkles, Play, BookOpen, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ActionButtonsProps {
  onGenerate: () => void;
  onRun: () => void;
  onExplain: () => void;
  onReadAloud: () => void;
  disabled?: boolean;
}

export function ActionButtons({ onGenerate, onRun, onExplain, onReadAloud, disabled }: ActionButtonsProps) {
  const buttons = [
    { label: 'Generate Code', icon: Sparkles, onClick: onGenerate, color: 'purple' },
    { label: 'Run Code', icon: Play, onClick: onRun, color: 'green' },
    { label: 'Explain Code', icon: BookOpen, onClick: onExplain, color: 'blue' },
    { label: 'Read Aloud', icon: Volume2, onClick: onReadAloud, color: 'pink' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {buttons.map((button) => {
        const Icon = button.icon;
        const colorClasses = {
          purple: 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-purple-500/30',
          green: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/30',
          blue: 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-blue-500/30',
          pink: 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-pink-500/30',
        };

        return (
          <motion.button
            key={button.label}
            onClick={button.onClick}
            disabled={disabled}
            className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${colorClasses[button.color as keyof typeof colorClasses]}`}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            aria-label={button.label}
          >
            <Icon className="w-5 h-5 text-white" />
            <span className="text-white">{button.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
