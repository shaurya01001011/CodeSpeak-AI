import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { VoiceInput } from './components/VoiceInput';
import { CodeEditor } from './components/CodeEditor';
import { ActionButtons } from './components/ActionButtons';
import { OutputPanel } from './components/OutputPanel';
import { ErrorPanel } from './components/ErrorPanel';
import { LanguageSelector } from './components/LanguageSelector';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [transcript, setTranscript] = useState('');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  // 🎤 REAL VOICE INPUT
  const handleToggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError("❌ Use Google Chrome for voice input");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      setTranscript(speechText);
    };

    recognition.onerror = () => {
      setError("❌ Voice recognition error");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // 🧠 GENERATE CODE
  const handleGenerate = async () => {
    setError('');
    setOutput('');

    try {
      const response = await fetch("http://localhost:9090/generate", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: transcript || "hello world"
      });

      const data = await response.text();
      setCode(data);

      if (voiceFeedback) {
        setOutput("> Code generated successfully!\n> Ready to run.");
      }

    } catch (err) {
      setError("❌ Failed to connect to backend");
    }
  };

  // ⚡ RUN CODE
  const handleRun = async () => {
    setError('');

    if (!code) {
      setError('No code to execute.');
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/run", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: code
      });

      const data = await response.text();
      setOutput(data);

    } catch (err) {
      setError("❌ Error running code");
    }
  };

  // 🧠 EXPLAIN CODE + 🔊 SPEAK
  const handleExplain = async () => {
    setError('');

    if (!code) {
      setError('No code to explain.');
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/explain", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: code
      });

      const explanation = await response.text();
      setOutput(explanation);

      // 🔊 SPEAK EXPLANATION
      const speech = new SpeechSynthesisUtterance(explanation);
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);

    } catch (err) {
      setError("❌ Failed to explain code");
    }
  };

  // 🔊 READ OUTPUT AGAIN
  const handleReadAloud = () => {
    if (!output) {
      setError('Nothing to read');
      return;
    }

    const speech = new SpeechSynthesisUtterance(output);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0f] dark">
      <Header voiceFeedback={voiceFeedback} onToggleVoice={() => setVoiceFeedback(!voiceFeedback)} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1400px] mx-auto space-y-6">

            {/* 🎤 Voice Input */}
            <div className="bg-[#131320] border border-purple-500/20 rounded-xl p-8 flex flex-col items-center">
              <VoiceInput isListening={isListening} onToggleListening={handleToggleListening} />
            </div>

            {/* 📝 Transcript */}
            {transcript && (
              <div className="bg-[#131320] border border-purple-500/20 rounded-xl p-6">
                <label className="text-purple-400 mb-3 block">Your Speech Input</label>
                <p className="text-gray-300 text-lg">{transcript}</p>
              </div>
            )}

            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />

            {/* 🔘 Buttons */}
            <ActionButtons
              onGenerate={handleGenerate}
              onRun={handleRun}
              onExplain={handleExplain}
              onReadAloud={handleReadAloud}
              disabled={false}
            />

            {/* ❌ Errors */}
            <ErrorPanel error={error} />

            {/* 💻 Code + Output */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#131320] border border-purple-500/20 rounded-xl overflow-hidden h-[400px]">
                <CodeEditor code={code} />
              </div>

              <div className="bg-[#131320] border border-purple-500/20 rounded-xl overflow-hidden h-[400px]">
                <OutputPanel output={output} />
              </div>
            </div>

            {/* ℹ️ Info */}
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-purple-400 mb-2">Welcome to CodeSpeak AI</h3>
              <p className="text-gray-400 text-sm">
                Speak → Generate → Run → Explain → Listen 🔊
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}