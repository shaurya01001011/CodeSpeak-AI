import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ErrorPanelProps {
  error: string;
}

export function ErrorPanel({ error }: ErrorPanelProps) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-red-400 mb-1">Error</h4>
              <p className="text-red-300 text-sm">{error}</p>
              <p className="text-red-400/70 text-xs mt-2">
                Please check your code and try again. If you need help, use the "Explain Code" feature.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
