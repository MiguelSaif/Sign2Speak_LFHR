import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  Github,
  Mail,
  Phone
} from "lucide-react";
import React from "react";
import { Separator } from "../../../../components/ui/separator";

export const FooterNavigationSection = (): JSX.Element => {
  const navigationColumns = [
    {
      topic: "Product",
      pages: ["Features", "Pricing", "API", "Documentation"],
    },
    {
      topic: "Company",
      pages: ["About Us", "Careers", "Press", "Contact"],
    },
    {
      topic: "Resources",
      pages: ["Blog", "Help Center", "Community", "Tutorials"],
    },
    {
      topic: "Legal",
      pages: ["Privacy Policy", "Terms of Service", "Accessibility", "Cookies"],
    },
  ];

  const socialIcons = [
    { Icon: FacebookIcon, alt: "Facebook", href: "#" },
    { Icon: LinkedinIcon, alt: "LinkedIn", href: "#" },
    { Icon: YoutubeIcon, alt: "YouTube", href: "#" },
    { Icon: InstagramIcon, alt: "Instagram", href: "#" },
    { Icon: Github, alt: "GitHub", href: "#" },
  ];

  const contactInfo = [
    { Icon: Mail, text: "hello@sign2speak.com", href: "mailto:hello@sign2speak.com" },
    { Icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
  ];

  return (
    <footer className="w-full bg-gray-900 text-white py-16 mt-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              Sign 2 Speak
            </h2>
            <p className="font-body-text text-gray-300 mb-6 leading-relaxed">
              Breaking communication barriers with AI-powered sign language translation. 
              Empowering the deaf and hard of hearing community through innovative technology.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <item.Icon className="w-5 h-5" />
                  <span className="font-small-text">{item.text}</span>
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label={item.alt}
                >
                  <item.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {navigationColumns.map((column, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="font-heading font-semibold text-white text-lg mb-4">
                  {column.topic}
                </h3>
                <div className="space-y-3">
                  {column.pages.map((page, pageIndex) => (
                    <a
                      key={pageIndex}
                      href="#"
                      className="font-small-text text-gray-400 hover:text-white transition-colors duration-200 block"
                    >
                      {page}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-12 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-small-text text-gray-400">
            © 2025 Sign 2 Speak. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="font-small-text">Powered by</span>
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Gemini 2.5
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};