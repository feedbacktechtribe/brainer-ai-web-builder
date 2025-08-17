import React, { useState, useCallback, useEffect } from 'react';
import { Step } from './types';
import type { WebsiteOptions } from './types';
import { WEBSITE_TYPES, WEBSITE_STYLES, COLOR_PALETTES, FONT_OPTIONS } from './constants';
import { generateVisualDescription, generateWebsiteCode } from './services/geminiService';

import OptionCard from './components/OptionCard';
import StepIndicator from './components/StepIndicator';
import ColorPicker from './components/ColorPicker';
import Loader from './components/Loader';
import CodeBlock from './components/CodeBlock';
import { ArrowLeft, Sparkles, Wand, KeyIcon } from './components/icons/ActionIcons';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [localApiKeyInput, setLocalApiKeyInput] = useState('');
  const [step, setStep] = useState<Step>(Step.TYPE);
  const [options, setOptions] = useState<WebsiteOptions>({
    type: '',
    style: '',
    colors: COLOR_PALETTES[0].colors,
    font: FONT_OPTIONS[0],
    theme: 'light',
  });
  const [description, setDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini-api-key');
    if (storedKey) {
        setApiKey(storedKey);
    }
  }, []);
  
  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localApiKeyInput.trim()) {
        const key = localApiKeyInput.trim();
        localStorage.setItem('gemini-api-key', key);
        setApiKey(key);
    }
  };

  const handleResetKey = () => {
    localStorage.removeItem('gemini-api-key');
    setApiKey(null);
    setLocalApiKeyInput('');
    setStep(Step.TYPE); // Reset to first step
  };

  const handleUpdateOptions = <K extends keyof WebsiteOptions>(key: K, value: WebsiteOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleNextStep = () => {
    setError(null);
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setError(null);
    if(step === Step.DONE) {
        setStep(Step.BRANDING)
        return;
    }
    setStep(prev => prev - 1);
  };

  const handleGenerateDescription = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const desc = await generateVisualDescription(options);
      setDescription(desc);
      setStep(Step.DESCRIPTION_CONFIRM);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
       if (errorMessage.includes('API Key')) {
          handleResetKey(); // If key is invalid, force user to re-enter
      }
      setStep(Step.BRANDING); // Go back to the last step on error
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const handleGenerateCode = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const code = await generateWebsiteCode(options, description);
      setGeneratedCode(code);
      setStep(Step.DONE);
    } catch (e) {
       const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
       if (errorMessage.includes('API Key')) {
          handleResetKey(); // If key is invalid, force user to re-enter
      }
      setStep(Step.DESCRIPTION_CONFIRM); // Go back
    } finally {
      setIsLoading(false);
    }
  }, [options, description]);

  if (!apiKey) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <header className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Brainer AI Website Builder</span>
              </h1>
              <p className="text-lg text-gray-400 mt-2">Create a stunning website in minutes. No code required.</p>
            </header>
            <main className="w-full max-w-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-black/20">
                <div className="flex flex-col items-center">
                    <KeyIcon />
                    <h2 className="text-2xl font-bold mt-4 mb-2">Enter Your API Key</h2>
                    <p className="text-gray-400 mb-6">
                        Brainer AI Website Builder requires a Google Gemini API key to generate websites. Your key is stored securely in your browser's local storage.
                    </p>
                     <a 
                        href="https://aistudio.google.com/app/apikey" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline mb-6"
                    >
                        Get your API key from Google AI Studio
                    </a>
                </div>
                <form onSubmit={handleKeySubmit} className="space-y-4">
                    <input
                        type="password"
                        value={localApiKeyInput}
                        onChange={(e) => setLocalApiKeyInput(e.target.value)}
                        placeholder="Enter your Google Gemini API key here"
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
                        aria-label="Google Gemini API Key"
                    />
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                        disabled={!localApiKeyInput.trim()}
                    >
                        Save & Start Building
                    </button>
                </form>
            </main>
        </div>
    );
  }

  const renderStep = () => {
    if (isLoading) return <Loader message={step === Step.DESCRIPTION_GENERATION ? "Generating wireframe description..." : "Building your website... This may take a moment."} />;
    
    switch (step) {
      case Step.TYPE:
        return (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">What type of website do you want to build?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {WEBSITE_TYPES.map(({ name, icon: Icon }) => (
                <OptionCard key={name} label={name} icon={<Icon />} onClick={() => { handleUpdateOptions('type', name); handleNextStep(); }} />
              ))}
            </div>
          </div>
        );

      case Step.STYLE:
        return (
          <div>
            <h2 className="text-3xl font-bold text-center mb-2">Choose a style for your <span className="text-cyan-400">{options.type}</span> website.</h2>
            <p className="text-center text-gray-400 mb-8">This will define the overall look and feel.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {WEBSITE_STYLES.map(style => (
                 <button key={style} onClick={() => { handleUpdateOptions('style', style); handleNextStep(); }} className="p-4 bg-gray-800 rounded-lg text-center font-semibold hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-105">
                  {style}
                </button>
              ))}
            </div>
          </div>
        );

      case Step.BRANDING:
        return (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Customize your brand identity.</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Brand Colors</h3>
                <ColorPicker palettes={COLOR_PALETTES} selected={options.colors} onSelect={(colors) => handleUpdateOptions('colors', colors)} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Font</h3>
                <select value={options.font} onChange={(e) => handleUpdateOptions('font', e.target.value)} className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  {FONT_OPTIONS.map(font => <option key={font} value={font}>{font}</option>)}
                </select>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Theme</h3>
                <div className="flex gap-4">
                  {(['light', 'dark'] as const).map(theme => (
                    <button key={theme} onClick={() => handleUpdateOptions('theme', theme)} className={`w-full p-3 rounded-lg capitalize font-semibold transition-colors ${options.theme === theme ? 'bg-cyan-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => { setStep(Step.DESCRIPTION_GENERATION); handleGenerateDescription(); }} className="w-full mt-6 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                <Wand /> Generate Description
              </button>
            </div>
          </div>
        );

      case Step.DESCRIPTION_CONFIRM:
        return (
          <div>
            <h2 className="text-3xl font-bold text-center mb-4">Here's the plan for your website:</h2>
             <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
                <p className="text-gray-300 leading-relaxed">{description}</p>
             </div>
             <p className="text-center text-gray-400 mb-8">Does this sound good? We can generate the full website based on this.</p>
             <div className="flex gap-4">
                <button onClick={handlePrevStep} className="w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                  <ArrowLeft /> Go Back
                </button>
                <button onClick={() => { setStep(Step.CODE_GENERATION); handleGenerateCode(); }} className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                    <Sparkles /> Yes, Build It!
                </button>
             </div>
          </div>
        )

      case Step.DONE:
        return (
          <div>
             <h2 className="text-3xl font-bold text-center mb-4">Your <span className="text-cyan-400">{options.type}</span> Website is Ready!</h2>
             <p className="text-center text-gray-400 mb-6">Copy the code below into an <code className="bg-gray-700 text-sm p-1 rounded">index.html</code> file and open it in your browser.</p>
             <CodeBlock code={generatedCode} />
             <button onClick={handlePrevStep} className="w-full mt-6 bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <Wand /> Start a New Project
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const showBackButton = step > Step.TYPE && step < Step.DESCRIPTION_GENERATION;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl mx-auto relative">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Brainer AI Website Builder</span>
          </h1>
          <p className="text-lg text-gray-400 mt-2">Create a stunning website in minutes. No code required.</p>
        </header>

         <button 
            onClick={handleResetKey}
            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-colors"
            title="Reset API Key"
            aria-label="Reset API Key"
        >
            <KeyIcon />
        </button>


        <main className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-black/20">
            {step < Step.DESCRIPTION_GENERATION && <StepIndicator currentStep={step} />}
            {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">{error}</div>}
            <div className="relative">
                {showBackButton && (
                    <button onClick={handlePrevStep} className="absolute -top-4 -left-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                )}
                {renderStep()}
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;