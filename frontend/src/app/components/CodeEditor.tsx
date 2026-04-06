import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeEditorProps {
  code: string;
}

export function CodeEditor({ code }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 bg-[#0f0f1a] border-b border-purple-500/20 rounded-t-xl">
        <label className="text-purple-400">Generated Code</label>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-all text-sm"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400">Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="flex-1 bg-[#0a0a0f] rounded-b-xl overflow-hidden">
        <pre className="h-full p-4 overflow-auto font-mono text-sm">
          <code className="text-gray-300">
            {code || '// Your generated code will appear here...'}
          </code>
        </pre>
      </div>
    </div>
  );
}
