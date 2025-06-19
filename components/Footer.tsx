"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUp, Mail, Linkedin, Github, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/iyeneomi-ogoina-085381124", label: "LinkedIn" },
    { icon: <Github size={18} />, href: "https://github.com/", label: "GitHub" },
    { icon: <Youtube size={18} />, href: "https://youtube.com/", label: "YouTube" },
    { icon: <Mail size={18} />, href: "mailto:iyonline30@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-gradient-to-t from-[#F5F3F0] to-[#E6E2DD] py-12 px-4 md:px-8 border-t border-[#D4A574] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4A574] bg-opacity-5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-60 h-60 bg-[#D4A574] bg-opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Left - Brand Info */}
          <div className="space-y-6">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-12 h-12">
                <Image
                  src="/ibologo.png"
                  alt="Iyeneomi Blessing Ogoina Logo"
                  layout="fill"
                  objectFit="contain"
                  className="transition-all duration-300 hover:rotate-3"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-black">Iyeneomi Blessing Ogoina</h3>
                <p className="text-gray-600">Data Analyst | AI Graduate | Educator</p>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-gray-700 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Transforming data into actionable insights and empowering others through education and technology.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 group"
                  whileHover={{ 
                    y: -5,
                    backgroundColor: '#D4A574',
                    color: 'white'
                  }}
                  whileTap={{ scale: 0.9 }}
                  title={social.label}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                  >
                    {social.icon}
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          {/* Right - Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-lg font-bold text-black mb-4">Navigation</h3>
              <ul className="space-y-3">
                {['Home', 'Projects', 'Blog', 'CV', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-gray-700 hover:text-[#D4A574] transition-colors flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-lg font-bold text-black mb-4">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:iyonline30@gmail.com" 
                    className="text-gray-700 hover:text-[#D4A574] transition-colors flex items-center"
                  >
                    <Mail size={16} className="mr-2" /> iyonline30@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+1234567890" 
                    className="text-gray-700 hover:text-[#D4A574] transition-colors flex items-center"
                  >
                    <span className="ml-0.5 mr-2">📱</span> +44 123 456 7890
                  </a>
                </li>
                <li className="text-gray-700 flex items-start">
                  <span className="mr-2 mt-0.5">📍</span> United Kingdom
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
        
        <div className="border-t border-[#D4A574] border-opacity-30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="text-sm text-gray-600 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Copyright © {currentYear} Iyeneomi Blessing Ogoina. All rights reserved.
          </motion.div>
          
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-[#D4A574] transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-[#D4A574] transition-colors"
            >
              Terms of Service
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#D4A574] text-white flex items-center justify-center rounded-full shadow-lg z-50"
        whileHover={{ 
          scale: 1.1,
          backgroundColor: '#C08A5A',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        aria-label="Scroll to top"
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ 
            duration: 1, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          <ArrowUp size={20} />
        </motion.div>
      </motion.button>
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-full bg-[#D4A574] bg-opacity-20"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 30}%`,
          }}
          animate={{ 
            y: [0, -20, 0],
            x: [0, Math.random() > 0.5 ? 10 : -10, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 3 + Math.random() * 3, 
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </footer>
  );
}