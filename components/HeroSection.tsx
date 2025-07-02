'use client';

import { motion, useAnimation } from 'framer-motion';
import { Mail, Linkedin, ArrowDown, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

export default function HeroSection() {
  const controls = useAnimation();
  
  useEffect(() => {
    // Sequence animations on load
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0 });
      await controls.start({ 
        scale: [1, 1.05, 1],
        transition: { 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        } 
      });
    };
    sequence();
  }, [controls]);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center px-4 md:px-8 relative overflow-hidden pt-20 bg-gradient-to-br from-[#F5F3F0] to-[#E6E2DD]"
    >
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#D4A574] bg-opacity-30"
          style={{
            width: Math.random() * 20 + 5,
            height: Math.random() * 20 + 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: [0, -30],
            x: [0, Math.random() > 0.5 ? 20 : -20]
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-r from-[#E6E2DD] to-[#D4A574] rounded-l-full transform translate-x-1/4"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: 1, 
          opacity: 0.7,
          transition: { 
            duration: 1.5, 
            ease: "easeOut" 
          }
        }}
      />
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 py-12">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="overflow-hidden">
            <motion.p 
              className="text-sm text-[#D4A574] font-medium mb-2 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              HELLO, MY NAME IS
            </motion.p>
          </div>
          
          <div className="overflow-hidden">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", damping: 12 }}
            >
              Iyeneomi Blessing Ogoina
            </motion.h1>
          </div>
          
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xl md:text-2xl text-gray-700 mt-2 inline-block relative">
                <span className="relative z-10">
                  Data Analyst | AI Graduate | Maths & IT Educator
                </span>
                {/* <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-[#D4A574]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                /> */}
              </p>
            </motion.div>
          </div>

          <div className="space-y-4 pt-4">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="relative">
                <Mail size={20} className="text-[#D4A574] relative z-10" />
                <motion.div 
                  className="absolute -inset-2 bg-[#D4A574] rounded-full opacity-0"
                  animate={{ 
                    opacity: [0, 0.2, 0],
                    scale: [1, 1.8, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: 1
                  }}
                />
              </div>
              <span className="text-gray-700">iyonline30@gmail.com</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="relative">
                <Linkedin size={20} className="text-[#D4A574] relative z-10" />
                <motion.div 
                  className="absolute -inset-2 bg-[#D4A574] rounded-full opacity-0"
                  animate={{ 
                    opacity: [0, 0.2, 0],
                    scale: [1, 1.8, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: 1.2
                  }}
                />
              </div>
              <a 
                href="https://linkedin.com/in/iyeneomi-ogoina-085381124" 
                className="text-gray-700 hover:text-[#D4A574] transition-colors relative group"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lets Connect
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A574] group-hover:w-full transition-all duration-300"></span>
              </a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <motion.button
              className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4A574] to-[#C08A5A] text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                background: "linear-gradient(45deg, #C08A5A, #D4A574)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                View My Work 
                <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%", opacity: 0.15 }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Right Content - Profile Image */}
        <motion.div 
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }
          }}
        >
          <div className="relative">
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#D4A574] opacity-20"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div 
              className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-[#D4A574] opacity-10"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Profile image container */}
            <motion.div 
              className="w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl relative"
              animate={controls}
              whileHover={{ 
                rotate: [0, -2, 0, 2, 0],
                transition: { duration: 0.5 }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-30 z-10" />
              
              <img
                src="/iye.jpg"
                alt="Iyeneomi Blessing Ogoina"
                className="w-full h-full object-cover"
              />
              
              {/* Floating badge */}
              <motion.div 
                className="absolute bottom-6 right-6 bg-white rounded-full px-4 py-2 shadow-lg flex items-center space-x-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <Sparkles className="text-[#D4A574]" size={16} />
                <span className="text-sm font-medium text-gray-800">Available</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0]
        }}
        transition={{ 
          delay: 2,
          duration: 1.5,
          repeat: Infinity
        }}
      >
        <div className="text-sm text-gray-600 mb-2">Scroll down</div>
        <div className="w-1 h-8 bg-[#D4A574] rounded-full">
          <motion.div 
            className="w-1 h-4 bg-white rounded-full"
            animate={{ 
              y: [0, 14, 0]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}