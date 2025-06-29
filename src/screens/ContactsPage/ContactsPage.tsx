import React from "react";
import { HeroSection } from "./sections/HeroSection";
import { TranslationSection } from "./sections/TranslationSection";
import { FooterNavigationSection } from "./sections/FooterNavigationSection";

export const ContactsPage = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col">
          {/* Hero Section with Bold Title */}
          <HeroSection />
          
          {/* Translation Interface */}
          <TranslationSection />

          {/* Footer navigation */}
          <FooterNavigationSection />
        </div>
      </div>
    </div>
  );
};