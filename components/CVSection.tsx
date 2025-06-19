"use client";

import { motion, useInView } from 'framer-motion';
import { Download, ArrowRight, Award, Briefcase, GraduationCap, Star, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CVSection() {
  const experiences = [
    {
      title: "Data Analyst – Strategy & Financial Analytics",
      company: "Farmach Ltd, UK",
      period: "Sept 2023 – Present",
      description: "Built SQL models for rental pricing optimization (+15% revenue accuracy). Developed Power BI dashboards for real-time executive decision-making."
    },
    {
      title: "Support Worker – SEND & Healthcare",
      company: "Voyage Care, UK",
      period: "Mar 2024 – Present",
      description: "Deliver personal and educational development for individuals with learning disabilities. Track goals using Excel and maintain records with the Nourish system."
    },
    {
      title: "Private IT & Functional Skills Tutor",
      company: "Self-Employed, UK",
      period: "Sept 2023 – Present",
      description: "Prepare learners for Functional Skills, BTEC, and GCSE ICT exams. Create inclusive teaching resources using Word and PowerPoint."
    },
    {
      title: "Mathematics Teacher (KS3/4)",
      company: "Transcorp Power Staff School, Nigeria",
      period: "Sept 2021 – Jul 2023",
      description: "Taught Maths across KS3/KS4; introduced technology for visual learning. Increased overall student performance by 20% through interactive methods."
    },
    {
      title: "Healthcare Assistant",
      company: "Tobis Clinic, Nigeria",
      period: "May 2022 – Jul 2023",
      description: "Supported elderly care, monitored vitals, and upheld hygiene practices. Maintained patient records and performed frontline care duties."
    }
  ];

  const education = [
    {
      degree: "Master of Science in Artificial Intelligence & Data Analytics",
      institution: "University (with Distinction)",
      period: "2022 - 2024",
      description: "Specialized in healthcare prediction, loan modeling, and AI-integrated Electronic Patient Record (EPR) systems."
    },
    {
      degree: "Bachelor's Degree",
      institution: "University",
      period: "2015 - 2019",
      description: "Foundation in mathematics, computer science, and analytical thinking."
    }
  ];

  const skills = [
    { name: 'SQL', proficiency: 90 },
    { name: 'Python', proficiency: 85 },
    { name: 'Excel', proficiency: 88 },
    { name: 'Power BI', proficiency: 80 },
    { name: 'Tableau', proficiency: 75 },
    { name: 'Data Cleaning', proficiency: 92 },
    { name: 'Scikit-learn', proficiency: 78 },
    { name: 'ClinicalBERT', proficiency: 70 },
    { name: 'Logistic Regression', proficiency: 82 },
    { name: 'Model Evaluation', proficiency: 85 },
    { name: 'PowerPoint', proficiency: 80 },
    { name: 'Data Storytelling', proficiency: 87 },
    { name: 'Dashboards', proficiency: 83 },
    { name: 'GitHub', proficiency: 85 },
    { name: 'Jupyter', proficiency: 90 },
    { name: 'Flask', proficiency: 75 }
  ];

  const achievements = [
    "MSc in AI & Data Analytics with Distinction",
    "+15% revenue accuracy through SQL optimization",
    "20% improvement in student performance",
    "40% reduction in admin effort through automation",
    "7+ years multidisciplinary experience"
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animatedSkills, setAnimatedSkills] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAnimatedSkills(true);
    }
  }, [isInView]);

  const handleDownloadCV = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Iyeneomi_Ogoina_CV_2025.docx';
    link.download = 'Iyeneomi_Ogoina_CV_2025.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="cv" className="bg-gradient-to-br from-[#F5F3F0] to-[#E6E2DD] py-20 px-4 md:px-8 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4A574] bg-opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#D4A574] bg-opacity-5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-[#D4A574] font-medium mb-4 tracking-wide">
              PROFESSIONAL BACKGROUND
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Curriculum Vitae
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8">
              A comprehensive overview of my professional journey in data analytics, AI, 
              education, and healthcare with 7+ years of multidisciplinary experience.
            </p>
          </motion.div>
          
          <motion.button 
            onClick={handleDownloadCV}
            className="group flex items-center space-x-4 bg-[#D4A574] text-white px-8 py-4 rounded-full hover:bg-[#C19660] transition-all duration-300 mx-auto shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Download size={20} className="transition-transform group-hover:-translate-y-1" />
            <span className="font-medium">Download CV</span>
            <ArrowRight 
              size={20} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Experience & Education */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-[#D4A574] p-2 rounded-full">
                  <Briefcase className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-black">Professional Experience</h3>
              </div>
              
              <div className="space-y-8 relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#D4A574] bg-opacity-30 ml-3.5"></div>
                
                {experiences.map((exp, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                  >
                    <div className="relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#D4A574] flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <div className="ml-6 flex-1 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#F5F3F0]">
                      <h4 className="text-xl font-bold text-black mb-2">{exp.title}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <span className="text-[#D4A574] font-medium flex items-center">
                          <ChevronRight size={16} className="mr-1" /> {exp.company}
                        </span>
                        <span className="text-gray-600 text-sm bg-[#F5F3F0] px-3 py-1 rounded-full">{exp.period}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-[#D4A574] p-2 rounded-full">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-black">Education</h3>
              </div>
              
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 + (index * 0.1) }}
                  >
                    <div className="relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#D4A574] flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <div className="ml-6 flex-1 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#F5F3F0]">
                      <h4 className="text-xl font-bold text-black mb-2">{edu.degree}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <span className="text-[#D4A574] font-medium flex items-center">
                          <ChevronRight size={16} className="mr-1" /> {edu.institution}
                        </span>
                        <span className="text-gray-600 text-sm bg-[#F5F3F0] px-3 py-1 rounded-full">{edu.period}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Skills & Achievements */}
          <div className="space-y-12">
            {/* Skills Section */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-[#D4A574] p-2 rounded-full">
                  <Award className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-black">Core Skills</h3>
              </div>
              
              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-800">{skill.name}</h4>
                      <span className="text-sm text-[#D4A574] font-bold">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#D4A574] to-[#C08A5A]"
                        initial={{ width: 0 }}
                        animate={animatedSkills ? { width: `${skill.proficiency}%` } : { width: 0 }}
                        transition={{ 
                          duration: 1, 
                          delay: index * 0.1,
                          ease: "easeOut" 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.2 }}
            >
              <div className="bg-gradient-to-br from-[#D4A574] to-[#C08A5A] p-0.5 rounded-2xl shadow-lg">
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-black mb-6 flex items-center">
                    <Star className="text-[#D4A574] mr-2" size={24} />
                    Key Achievements
                  </h3>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 2.4 + (index * 0.1) }}
                      >
                        <div className="w-2 h-2 bg-[#D4A574] rounded-full mt-2"></div>
                        <p className="text-gray-700">{achievement}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Career Objective */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.8 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-md border border-[#F5F3F0]">
                <h3 className="text-2xl font-bold text-black mb-6">Career Objective</h3>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#D4A574] rounded-full"></div>
                  <p className="text-gray-700 leading-relaxed pl-6 italic">
                    To leverage my data, AI, and educational expertise in a forward-thinking organization—delivering predictive insight, operational efficiency, and inclusive digital transformation across sectors.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}