import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { TranslationSection } from "./sections/TranslationSection";
import { FeedbackFormSection } from "./sections/FeedbackFormSection";
import { FooterNavigationSection } from "./sections/FooterNavigationSection";

export const ContactsPage = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col">
          {/* Hero Section with Bold Title */}
          <HeroSection />
          
          {/* Translation Interface */}
          <TranslationSection />

          {/* Feedback section */}
          <div className="px-8 py-16">
            <h2 className="font-heading font-bold text-gray-900 text-4xl tracking-tight leading-tight mb-8 text-center">
              Share Your Experience
            </h2>
            <div className="max-w-2xl mx-auto">
              <FeedbackFormSection />
            </div>
          </div>

          {/* Footer navigation */}
          <FooterNavigationSection />
        </div>
      </div>
    </div>
  );
};