import React from "react";
import { Card } from "../../../../components/ui/card";
import { HandHeart, Zap, Globe, Users } from "lucide-react";

export const HeroSection = (): JSX.Element => {
  const features = [
    {
      icon: HandHeart,
      title: "Sign Language Recognition",
      description: "Advanced AI-powered sign language detection"
    },
    {
      icon: Zap,
      title: "Real-time Translation",
      description: "Instant translation powered by Gemini 2.5"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Translate to over 100 languages"
    },
    {
      icon: Users,
      title: "Accessibility First",
      description: "Designed for the deaf and hard of hearing community"
    }
  ];

  return (
    <section className="relative px-8 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl mx-8"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-xl"></div>
      
      {/* Header Logos */}
      <div className="absolute top-6 right-8 flex items-start gap-3 z-20">
        <a 
          href="https://bolt.new" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-105 transition-transform duration-200"
        >
          <img 
            src="/black_circle_360x360.png" 
            alt="Bolt Logo" 
            className="h-12 w-12 opacity-90 hover:opacity-100 transition-opacity duration-200"
          />
        </a>
        <img 
          src="/logotext_poweredby_360w (1).png" 
          alt="Powered by Bolt" 
          className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200 mt-2"
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          {/* Main Title with Dynamic Design */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-4 mb-2">
              {/* Sign - Smaller with dynamic bold shape */}
              <h1 className="font-title font-black text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight leading-none transform -skew-x-6 shadow-lg">
                Sign
              </h1>
              
              {/* Number 2 - Large and prominent */}
              <span className="font-title font-black text-8xl md:text-[10rem] lg:text-[12rem] text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-blue-400 to-purple-600 tracking-tight leading-none drop-shadow-2xl">
                2
              </span>
              
              {/* Speak - Matching Sign style */}
              <h1 className="font-title font-black text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight leading-none transform skew-x-6 shadow-lg">
                Speak
              </h1>
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="font-subheading text-2xl md:text-3xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Breaking barriers through AI-powered sign language translation
          </p>
          
          {/* Description */}
          <p className="font-body-text text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Experience seamless communication with our cutting-edge translation technology powered by Google's experimental Gemini 2.5 model.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-gray-900">
                  {feature.title}
                </h3>
                <p className="font-small-text text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};