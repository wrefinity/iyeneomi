"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Linkedin, Github, Youtube, Lock, LockOpen } from 'lucide-react';
import { motion, AnimatePresence, stagger, useAnimate } from 'framer-motion';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scope, animate] = useAnimate();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    
    return () => unsubscribe();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate navigation items on mount
  useEffect(() => {
    if (scope.current) {
      animate(
        "li",
        { opacity: 1, y: 0 },
        { delay: stagger(0.1, { startDelay: 0.5 }) }
      );
    }
  }, [animate, scope]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'blog', label: 'BLOG' },
    { id: 'cv', label: 'CV' },
    { id: 'contact', label: 'CONTACT' },
  ];

  // Social links
  const socialLinks = [
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/" },
    { icon: <Github size={20} />, href: "https://github.com/" },
    { icon: <Youtube size={20} />, href: "https://youtube.com/" },
  ];

  return (
    <motion.header
      className={`py-6 px-4 md:px-8 fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F5F3F0] backdrop-blur-md bg-opacity-90 shadow-md' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 15 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo with animation */}
        <motion.div 
          className="flex items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.2
          }}
          whileHover={{ rotate: 5, scale: 1.05 }}
          whileTap={{ rotate: -5 }}
        >
          <Link href="/">
            <motion.div
              className="relative"
              whileHover={{ rotate: [0, -5, 0, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574] to-[#FFD700] rounded-full opacity-0 hover:opacity-80 transition-opacity duration-300 blur-sm" />
              <Image
                  src="/ibologo.png"
                  alt="Iyeneomi Blessing Ogoina Logo"
                  width={48}
                  height={48}
                  className="transition-all duration-300 hover:rotate-3"
                />
            </motion.div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <motion.ul 
            ref={scope}
            className="flex space-x-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                className="relative"
              >
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-2 py-1 text-black font-medium overflow-hidden group"
                  whileHover={{ color: '#D4A574' }}
                  transition={{ duration: 0.3 }}
                >
                  {item.label}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A574]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute top-0 right-0 w-0 h-0.5 bg-[#D4A574]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                </motion.button>
              </motion.li>
            ))}
            
            {/* Admin Login Link */}
            {/* <motion.li
              initial={{ opacity: 0, y: -20 }}
              className="relative"
            >
              <Link 
                href={isAdmin ? "/admin/dashboard" : "/login"}
                className="relative px-2 py-1 text-black font-medium overflow-hidden group flex items-center"
              >
                {isAdmin ? (
                  <>
                    <LockOpen size={18} className="mr-1" />
                    <span>ADMIN</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} className="mr-1" />
                    <span>LOGIN</span>
                  </>
                )}
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A574]"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute top-0 right-0 w-0 h-0.5 bg-[#D4A574]"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              </Link>
            </motion.li> */}
          </motion.ul>
        </nav>

        {/* Social Links with floating animation */}
        <motion.div 
          className="hidden md:flex items-center space-x-4 ml-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          {socialLinks.map((social, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                y: [0, -5, 0, -3, 0],
                rotate: [0, 5, -5, 0],
                scale: 1.2,
                transition: { 
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse" 
                } 
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href={social.href} target="_blank">
                <motion.div
                  className="p-2 rounded-full bg-white bg-opacity-20 shadow-sm hover:shadow-md transition-all"
                  whileHover={{ 
                    backgroundColor: 'rgba(212, 165, 116, 0.2)',
                    rotate: 360,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {social.icon}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? (
            <X size={24} className="text-[#D4A574]" />
          ) : (
            <Menu size={24} className="text-black" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pt-4 border-t border-gray-200"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: { 
                height: { duration: 0.3 },
                opacity: { duration: 0.2, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { 
                height: { duration: 0.3 },
                opacity: { duration: 0.1 }
              }
            }}
          >
            <nav className="flex flex-col space-y-4 pb-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-black hover:text-[#D4A574] transition-colors font-medium text-left py-2 px-4 rounded-lg hover:bg-[#F5F3F0]"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  whileHover={{ 
                    x: 10,
                    backgroundColor: 'rgba(245, 243, 240, 0.5)',
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              {/* Admin Login Link for Mobile */}
              <motion.button
                onClick={() => window.location.href = isAdmin ? "/admin/dashboard" : "/login"}
                className="text-black hover:text-[#D4A574] transition-colors font-medium text-left py-2 px-4 rounded-lg hover:bg-[#F5F3F0] flex items-center"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                whileHover={{ 
                  x: 10,
                  backgroundColor: 'rgba(245, 243, 240, 0.5)',
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {isAdmin ? (
                  <>
                    <LockOpen size={18} className="mr-2" />
                    <span>Admin Dashboard</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} className="mr-2" />
                    <span>Admin Login</span>
                  </>
                )}
              </motion.button>
              
              <motion.div 
                className="flex space-x-4 pt-2 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
              >
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      y: [0, -5, 0, -3, 0],
                      scale: 1.2,
                      transition: { 
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse" 
                      } 
                    }}
                  >
                    <Link href={social.href} target="_blank">
                      <div className="p-2 rounded-full bg-white bg-opacity-20 shadow-sm">
                        {social.icon}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}