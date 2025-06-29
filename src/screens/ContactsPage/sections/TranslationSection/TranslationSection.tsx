import React, { useState, useRef, useCallback } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { 
  Camera, 
  Square, 
  Play, 
  Volume2, 
  Download, 
  Copy, 
  Languages,
  Sparkles,
  Upload,
  Video
} from "lucide-react";
import { VideoUpload } from "../../../../components/VideoUpload";

export const TranslationSection = (): JSX.Element => {
  const [isRecording, setIsRecording] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera');
  const videoRef = useRef<HTMLVideoElement>(null);

  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", 
    "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Russian"
  ];

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setIsRecording(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setIsProcessing(true);
        setTimeout(() => {
          setTranslatedText("Hello, how are you today? I hope you're having a wonderful day!");
          setIsProcessing(false);
        }, 2000);
      }, 3000);
      
    } catch (error) {
      console.error("Error accessing camera:", error);
      // Fallback to lower resolution if 720p fails
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 },
          audio: false 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          videoRef.current.play();
        }
        
        setIsRecording(true);
      } catch (fallbackError) {
        console.error("Error accessing camera with fallback:", fallbackError);
      }
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsRecording(false);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="font-small-text font-semibold text-purple-400 uppercase tracking-wide">
              Powered by Gemini 2.5
            </span>
          </div>
          <h2 className="font-heading font-bold text-4xl text-white mb-4">
            Real-time Sign Language Translation
          </h2>
          <p className="font-body-text text-lg text-gray-300 max-w-2xl mx-auto">
            Use your camera for live translation or upload video files for processing with our advanced AI technology.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 p-1 rounded-lg border border-gray-700">
            <button
              onClick={() => setActiveTab('camera')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'camera'
                  ? 'bg-gray-700 text-blue-400 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Camera className="w-4 h-4 inline mr-2" />
              Live Camera
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'upload'
                  ? 'bg-gray-700 text-blue-400 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload Footage
            </button>
          </div>
        </div>

        {activeTab === 'camera' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Input Section */}
            <Card className="overflow-hidden bg-gray-800 shadow-xl border border-gray-700">
              <CardContent className="p-0">
                <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  
                  {!isRecording && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                      <div className="text-center text-gray-400">
                        <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="font-body-text text-lg">720p Camera feed will appear here</p>
                        <p className="font-small-text text-sm text-gray-500 mt-2">HD quality for better recognition</p>
                      </div>
                    </div>
                  )}

                  {/* Recording Indicator */}
                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="font-small-text text-sm font-medium">Recording HD</span>
                    </div>
                  )}

                  {/* Processing Indicator */}
                  {isProcessing && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span className="font-small-text">Processing with Gemini 2.5...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="p-6 bg-gray-800">
                  <div className="flex items-center justify-center gap-4">
                    {!isRecording ? (
                      <Button
                        onClick={startRecording}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Start HD Translation
                      </Button>
                    ) : (
                      <Button
                        onClick={stopRecording}
                        variant="destructive"
                        className="px-8 py-3 rounded-xl font-medium"
                      >
                        <Square className="w-5 h-5 mr-2" />
                        Stop Recording
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Translation Output Section */}
            <Card className="bg-gray-800 shadow-xl border border-gray-700">
              <CardContent className="p-6">
                <div className="mb-6">
                  <label className="block font-small-text font-medium text-gray-300 mb-2">
                    Translate to:
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-600 rounded-lg font-body-text focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block font-small-text font-medium text-gray-300 mb-2">
                    Translation:
                  </label>
                  <div className="min-h-[200px] p-4 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600">
                    {translatedText ? (
                      <p className="font-body-text text-gray-100 leading-relaxed">
                        {translatedText}
                      </p>
                    ) : (
                      <p className="font-body-text text-gray-400 italic">
                        Translation will appear here...
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {translatedText && (
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={speakText}
                      variant="outline"
                      className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Volume2 className="w-4 h-4" />
                      Speak
                    </Button>
                    
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Video Upload Section */
          <div className="max-w-4xl mx-auto">
            <VideoUpload />
          </div>
        )}

        {/* Features Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <Languages className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-lg text-white mb-2">
              100+ Languages
            </h3>
            <p className="font-small-text text-gray-300">
              Translate to over 100 languages with high accuracy
            </p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-lg text-white mb-2">
              AI-Powered
            </h3>
            <p className="font-small-text text-gray-300">
              Advanced machine learning with Gemini 2.5 technology
            </p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <Camera className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-lg text-white mb-2">
              HD Processing
            </h3>
            <p className="font-small-text text-gray-300">
              720p HD video for enhanced sign recognition accuracy
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <Video className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <h3 className="font-heading font-semibold text-lg text-white mb-2">
              Upload Footage
            </h3>
            <p className="font-small-text text-gray-300">
              Upload MP4, 3GP files for batch processing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};