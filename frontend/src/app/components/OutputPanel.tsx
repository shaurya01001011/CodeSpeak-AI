import { Terminal } from 'lucide-react';

interface OutputPanelProps {
  output: string;
}

export function OutputPanel({ output }: OutputPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0f0f1a] border-b border-purple-500/20 rounded-t-xl">
        <Terminal className="w-5 h-5 text-purple-400" />
        <label className="text-purple-400">Output</label>
      </div>

      <div className="flex-1 bg-[#0a0a0f] rounded-b-xl overflow-hidden">
        <pre className="h-full p-4 overflow-auto font-mono text-sm">
          <code className="text-green-400">
            {output || '> Ready to execute code...'}
          </code>
        </pre>
      </div>
    </div>
  );
}
