"use client";

import Link from 'next/link';
import { Mail, Linkedin } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="bg-[#F5F3F0] min-h-screen flex items-center px-4 md:px-8 relative overflow-hidden pt-20">
      {/* Curved background element */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[#E6E2DD] rounded-l-full transform translate-x-1/4"></div>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          <div>
            <p className="text-sm text-[#D4A574] font-medium mb-2 tracking-wide">
              HELLO, MY NAME IS
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight">
              Iyeneomi Blessing Ogoina
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mt-2">
              Data Analyst | AI Graduate | Maths & IT Educator
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail size={20} className="text-[#D4A574]" />
              <span className="text-gray-700">iyonline30@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Linkedin size={20} className="text-[#D4A574]" />
              <Link href="https://linkedin.com/in/iyeneomi-ogoina-085381124" className="text-gray-700 hover:text-[#D4A574] transition-colors">
                Let's Connect
              </Link>
            </div>
          </div>
        </div>

        {/* Right Content - Profile Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                 src="../naom.jpeg"
                alt="Iyeneomi Blessing Ogoina"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

