import { Mic, MicOff } from 'lucide-react';
import { motion } from 'motion/react';

interface VoiceInputProps {
  isListening: boolean;
  onToggleListening: () => void;
}

export function VoiceInput({ isListening, onToggleListening }: VoiceInputProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        onClick={onToggleListening}
        className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all ${
          isListening
            ? 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/50'
            : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-purple-500/80 hover:to-indigo-600/80'
        }`}
        whileTap={{ scale: 0.95 }}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        {isListening && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-purple-400/50"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-purple-400/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
          </>
        )}
        {isListening ? (
          <Mic className="w-12 h-12 text-white relative z-10" />
        ) : (
          <MicOff className="w-12 h-12 text-gray-300 relative z-10" />
        )}
      </motion.button>

      <div className="text-center">
        <p className="text-xl text-purple-400">
          {isListening ? 'Listening...' : 'Start Speaking'}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {isListening ? 'Click to stop' : 'Click the microphone to begin'}
        </p>
      </div>
    </div>
  );
}
