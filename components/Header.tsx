'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Linkedin, Github, Youtube  } from 'lucide-react';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#F5F3F0] py-6 px-4 md:px-8 fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
       {/* Logo */}
<div className="flex items-center">
  <Link href="/">
    <img
      src="../naomilogo.png"
      alt="Logo"
      className="h-10 w-auto object-contain"
    />
  </Link>
</div>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-black hover:text-[#D4A574] transition-colors font-medium"
          >
            HOME
          </button>
          <button 
            onClick={() => scrollToSection('projects')} 
            className="text-black hover:text-[#D4A574] transition-colors font-medium"
          >
            PROJECTS
          </button>
          <button 
            onClick={() => scrollToSection('blog')} 
            className="text-black hover:text-[#D4A574] transition-colors font-medium"
          >
            BLOG
          </button>
          <button 
            onClick={() => scrollToSection('cv')} 
            className="text-black hover:text-[#D4A574] transition-colors font-medium"
          >
            CV
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="text-black hover:text-[#D4A574] transition-colors font-medium"
          >
            CONTACT
          </button>
        </nav>

       {/* Social Links */}
<div className="hidden md:flex items-center space-x-3 ml-6">
  <Link href="https://www.linkedin.com/" target="_blank">
    <Linkedin className="h-5 w-5 text-gray-600 hover:text-orange-400 cursor-pointer transition-colors" />
  </Link>
  <Link href="https://github.com/" target="_blank">
    <Github className="h-5 w-5 text-gray-600 hover:text-orange-400 cursor-pointer transition-colors" />
  </Link>
  <Link href="https://youtube.com/" target="_blank">
    <Youtube className="h-5 w-5 text-gray-600 hover:text-orange-400 cursor-pointer transition-colors" />
  </Link>
</div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <nav className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-black hover:text-[#D4A574] transition-colors font-medium text-left"
            >
              HOME
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="text-black hover:text-[#D4A574] transition-colors font-medium text-left"
            >
              PROJECTS
            </button>
            <button 
              onClick={() => scrollToSection('blog')} 
              className="text-black hover:text-[#D4A574] transition-colors font-medium text-left"
            >
              BLOG
            </button>
            <button 
              onClick={() => scrollToSection('cv')} 
              className="text-black hover:text-[#D4A574] transition-colors font-medium text-left"
            >
              CV
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-black hover:text-[#D4A574] transition-colors font-medium text-left"
            >
              CONTACT
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}