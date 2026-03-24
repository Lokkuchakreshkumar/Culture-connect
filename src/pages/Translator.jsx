import { useState, useEffect, useRef } from 'react';

const Translator = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en'); // Default Source is English
    const [targetLang, setTargetLang] = useState('random'); // Default Target is Random
    const recognitionRef = useRef(null);

    const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

    const sourceLangRef = useRef(sourceLang);
    const targetLangRef = useRef(targetLang);
    const isVoiceEnabledRef = useRef(isVoiceEnabled);

    useEffect(() => {
        sourceLangRef.current = sourceLang;
    }, [sourceLang]);

    useEffect(() => {
        targetLangRef.current = targetLang;
    }, [targetLang]);

    useEffect(() => {
        isVoiceEnabledRef.current = isVoiceEnabled;
    }, [isVoiceEnabled]);

    const languages = [
        { code: 'en', ttsCode: 'en-US', name: 'English' },
        { code: 'es', ttsCode: 'es-ES', name: 'Spanish' },
        { code: 'fr', ttsCode: 'fr-FR', name: 'French' },
        { code: 'de', ttsCode: 'de-DE', name: 'German' },
        { code: 'it', ttsCode: 'it-IT', name: 'Italian' },
        { code: 'hi', ttsCode: 'hi-IN', name: 'Hindi' },
        { code: 'ja', ttsCode: 'ja-JP', name: 'Japanese' },
        { code: 'ko', ttsCode: 'ko-KR', name: 'Korean' },
        { code: 'zh-CN', ttsCode: 'zh-CN', name: 'Chinese (Simplified)' },
        { code: 'ar', ttsCode: 'ar-SA', name: 'Arabic' },
        { code: 'ru', ttsCode: 'ru-RU', name: 'Russian' },
        { code: 'te', ttsCode: 'te-IN', name: 'Telugu' },
        { code: 'ta', ttsCode: 'ta-IN', name: 'Tamil' },
        { code: 'ml', ttsCode: 'ml-IN', name: 'Malayalam' },
        { code: 'pt', ttsCode: 'pt-BR', name: 'Portuguese' },
        { code: 'nl', ttsCode: 'nl-NL', name: 'Dutch' }
    ];

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            // The language will be set right before start()

            recognitionRef.current.onresult = (event) => {
                let currentTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcriptPiece = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        currentTranscript += transcriptPiece + ' ';
                        let currentLang = targetLangRef.current;
                        let displayLangName = '';
                        
                        const voiceEnabled = isVoiceEnabledRef.current;

                        if (currentLang === 'random') {
                            const randLang = languages[Math.floor(Math.random() * languages.length)];
                            currentLang = randLang.code;
                            displayLangName = randLang.name;
                        }
                        
                        // Translate the final recognized sentence
                        translateText(transcriptPiece, sourceLangRef.current, currentLang).then((translatedPiece) => {
                            if (translatedPiece) {
                                const prefix = targetLangRef.current === 'random' ? `[${displayLangName}] ` : '';
                                setTranslatedText((prev) => prev + prefix + translatedPiece + ' ');
                                // Voice Output
                                if (voiceEnabled) {
                                    const langObj = languages.find(l => l.code === currentLang);
                                    speakText(translatedPiece, langObj ? langObj.ttsCode : currentLang);
                                }
                            }
                        });
                    }
                }
                if (currentTranscript) {
                    setTranscript((prev) => prev + currentTranscript);
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                if (event.error !== 'no-speech') {
                    setIsListening(false);
                }
            };

            recognitionRef.current.onend = () => {
                // If the user wants to keep listening, it can auto-restart, but standard behavior usually requires user intent to restart
                if (isListening) {
                   setIsListening(false);
                }
            };
        } else {
            console.error("Speech Recognition API not supported in this browser.");
            alert("Speech Recognition API not supported in your browser.");
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // We keep this function outside useEffect or use targetLang properly
    // Wait, targetLang used in translateText might capture stale state if we define it in useEffect.
    // So we pass targetLang to translateText which is fine.

    const translateText = async (text, sl, tl) => {
        if (!text.trim()) return null;
        try {
            // Updated Google Translate API URL
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
            const response = await fetch(url);
            const data = await response.json();
            const translatedPiece = data[0].map(item => item[0]).join('');
            return translatedPiece;
        } catch (error) {
            console.error("Translation error:", error);
            return null;
        }
    };

    const speakText = (text, langCode) => {
        if (!text) return;
        try {
            // First try Google Translate's MP3 TTS directly
            // Google TTS for Chinese uses zh-CN, zh-TW, not just 'zh'
            let ttsLang = langCode;
            if (langCode === 'zh-CN') ttsLang = 'zh-CN';
            else if (langCode === 'zh-TW') ttsLang = 'zh-TW';
            else ttsLang = langCode.split('-')[0]; // base lang like 'hi' for 'hi-IN'

            // Avoid breaking surrogate pairs which throws URIError in encodeURIComponent
            const safeText = Array.from(text).slice(0, 200).join('');

            // client=gtx is much more stable and widely supported for all languages
            const audioUrl = `https://translate.googleapis.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(safeText)}&tl=${ttsLang}&client=gtx`;
            const audio = new window.Audio(audioUrl);
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error("[TTS] Audio .play() blocked/failed, falling back:", e);
                    fallbackTTS(safeText, langCode);
                });
            }
        } catch (err) {
            console.error("[TTS] Fallback trigger:", err);
            // safeText might not be defined if error happened earlier, just fallback with the original text (or sliced manually)
            fallbackTTS(text, langCode);
        }
    };

    const fallbackTTS = (text, langCode) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = langCode;

            const voices = window.speechSynthesis.getVoices();
            // Try to find exact match
            let voice = voices.find(v => v.lang.replace('_', '-') === langCode);
            // Try to find base language match
            if (!voice) {
                voice = voices.find(v => v.lang.split('-')[0] === langCode.split('-')[0]);
            }
            
            // If still no voice, fallback to any available Google URI voice if available (Chrome)
            if (!voice) {
               voice = voices.find(v => v.name.includes('Google') && v.lang.startsWith(langCode.split('-')[0]));
            }

            if (voice) {
                utterance.voice = voice;
            }

            utterance.rate = 0.95;
            window.speechSynthesis.speak(utterance);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            try {
                // Audio context warm-up to unlock TTS features in strict browsers
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
                }
                const silentAudio = new window.Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
                silentAudio.play().catch(() => {});
                
                // Set the correct speech recognition language based on sourceLang
                if (recognitionRef.current) {
                    const sourceLangObj = languages.find(l => l.code === sourceLang);
                    recognitionRef.current.lang = sourceLangObj ? sourceLangObj.ttsCode : 'en-US';
                }

                recognitionRef.current?.start();
                setIsListening(true);
            } catch (e) {
                console.error("Could not start listening", e);
            }
        }
    };

    const clearText = () => {
        setTranscript('');
        setTranslatedText('');
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-bg-primary">
            <div className="container mx-auto max-w-5xl">
                <div className="mb-10 text-center animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
                        Voice Translator
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Speak in English and seamlessly translate your voice into any selected language in real-time.
                    </p>
                </div>

                <div className="bg-bg-primary border border-black/10 rounded-2xl p-6 md:p-10 shadow-lg transition-transform duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                            <div className="flex flex-col w-full md:w-auto">
                                <label className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Source Speech</label>
                                <select
                                    value={sourceLang}
                                    onChange={(e) => setSourceLang(e.target.value)}
                                    className="w-full md:w-48 px-4 py-3 border border-black/20 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary transition-colors bg-bg-secondary appearance-none cursor-pointer"
                                    disabled={isListening}
                                >
                                    {languages.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center justify-center pt-8 hidden md:flex">
                                <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>

                            <div className="flex flex-col w-full md:w-auto">
                                <label className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wider">Translate To</label>
                                <select
                                    value={targetLang}
                                    onChange={(e) => setTargetLang(e.target.value)}
                                    className="w-full md:w-48 px-4 py-3 border border-black/20 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary transition-colors bg-bg-secondary appearance-none cursor-pointer"
                                >
                                    <option value="random">🎲 Random Language</option>
                                    {languages.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0 items-center justify-between md:justify-end">
                            {/* Voice Setting Toggle */}
                            <label className="flex items-center cursor-pointer gap-2 mr-4">
                                <div className="relative">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only" 
                                        checked={isVoiceEnabled}
                                        onChange={() => setIsVoiceEnabled(!isVoiceEnabled)}
                                    />
                                    <div className={`block w-10 h-6 rounded-full transition-colors ${isVoiceEnabled ? 'bg-accent-teal' : 'bg-gray-300'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isVoiceEnabled ? 'transform translate-x-4' : ''}`}></div>
                                </div>
                                <span className="text-sm font-semibold text-text-muted">TTS Voice Out</span>
                            </label>

                            <button
                                onClick={clearText}
                                className="flex-1 md:flex-none px-6 py-3 border border-text-primary text-text-primary rounded-lg font-medium hover:bg-bg-secondary transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Clear
                            </button>
                            <button
                                onClick={toggleListening}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                                    isListening 
                                    ? 'bg-accent-terra hover:bg-red-800 animate-pulse' 
                                    : 'bg-text-primary hover:bg-text-secondary'
                                }`}
                            >
                                {isListening ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                        Listening...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                        Start Listening
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Original Speech */}
                        <div className="flex flex-col h-[400px]">
                            <h2 className="text-xl font-serif font-bold text-text-primary mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
                                {languages.find(l => l.code === sourceLang)?.name} Speech
                            </h2>
                            <div className="flex-1 p-6 bg-bg-secondary border border-black/10 rounded-xl overflow-y-auto whitespace-pre-wrap text-text-primary text-lg leading-relaxed shadow-inner font-sans scroll-smooth">
                                {transcript ? (
                                    <span>{transcript}</span>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-text-muted italic opacity-50">
                                        Your speech will appear here...
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Translated Speech */}
                        <div className="flex flex-col h-[400px]">
                            <h2 className="text-xl font-serif font-bold text-text-primary mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-teal"></span>
                                Translated {targetLang !== 'random' && `(${languages.find(l => l.code === targetLang)?.name})`}
                            </h2>
                            <div className="flex-1 p-6 bg-bg-secondary border border-black/10 rounded-xl overflow-y-auto whitespace-pre-wrap text-text-primary text-lg leading-relaxed shadow-inner font-sans scroll-smooth">
                                {translatedText ? (
                                    <span>{translatedText}</span>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-text-muted italic opacity-50">
                                        Translation will appear here...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Translator;
