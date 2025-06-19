"use client";

import { Download, ArrowRight, Award, Briefcase, GraduationCap } from 'lucide-react';

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
    "SQL", "Python", "Excel", "Power BI", "Tableau", "Data Cleaning",
    "Scikit-learn", "ClinicalBERT", "Logistic Regression", "Model Evaluation",
    "PowerPoint", "Data Storytelling", "Dashboards", "GitHub", "Jupyter", "Flask"
  ];

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
    <section id="cv" className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-[#D4A574] font-medium mb-4 tracking-wide">
            PROFESSIONAL BACKGROUND
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Curriculum Vitae
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8">
            A comprehensive overview of my professional journey in data analytics, AI, 
            education, and healthcare with 7+ years of multidisciplinary experience.
          </p>
          
          <button 
            onClick={handleDownloadCV}
            className="group flex items-center space-x-4 bg-[#D4A574] text-white px-8 py-4 rounded-none hover:bg-[#C19660] transition-colors mx-auto"
          >
            <Download size={20} />
            <span className="font-medium">Download CV</span>
            <ArrowRight 
              size={20} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Experience */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Briefcase className="text-[#D4A574]" size={24} />
                <h3 className="text-2xl font-bold text-black">Professional Experience</h3>
              </div>
              
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-2 border-[#D4A574] pl-6 pb-6">
                    <div className="bg-[#F5F3F0] p-6 rounded-lg">
                      <h4 className="text-xl font-bold text-black mb-2">{exp.title}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <span className="text-[#D4A574] font-medium">{exp.company}</span>
                        <span className="text-gray-600 text-sm">{exp.period}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <GraduationCap className="text-[#D4A574]" size={24} />
                <h3 className="text-2xl font-bold text-black">Education</h3>
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-[#D4A574] pl-6 pb-6">
                    <div className="bg-[#F5F3F0] p-6 rounded-lg">
                      <h4 className="text-xl font-bold text-black mb-2">{edu.degree}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <span className="text-[#D4A574] font-medium">{edu.institution}</span>
                        <span className="text-gray-600 text-sm">{edu.period}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills & Achievements */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Award className="text-[#D4A574]" size={24} />
                <h3 className="text-2xl font-bold text-black">Core Skills</h3>
              </div>
              
              <div className="space-y-4">
    {[
      { name: 'JavaScript', proficiency: 90 },
      { name: 'Python', proficiency: 85 },
      { name: 'SQL', proficiency: 88 },
      { name: 'Power BI', proficiency: 80 },
      { name: 'Excel', proficiency: 85 },
      { name: 'Tableau', proficiency: 75 },
      { name: 'Flask', proficiency: 70 },
      { name: 'Scikit-learn', proficiency: 78 },
      { name: 'Data Cleaning', proficiency: 90 },
      { name: 'GitHub', proficiency: 85 }
    ].map((skill, index) => (
      <div
        key={index}
        className="bg-[#1E1E1E] text-white p-4 rounded-lg shadow-sm"
      >
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-semibold">{skill.name}</h4>
          <span className="text-sm text-[#D4A574] font-medium">{skill.proficiency}%</span>
        </div>
        <div className="w-full bg-gray-700 h-2 rounded-full">
          <div
            className="bg-[#D4A574] h-2 rounded-full transition-all duration-500"
            style={{ width: `${skill.proficiency}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-black mb-6">Key Achievements</h3>
              <div className="bg-[#F5F3F0] p-6 rounded-lg space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#D4A574] rounded-full mt-2"></div>
                  <p className="text-gray-700">MSc in AI & Data Analytics with Distinction</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#D4A574] rounded-full mt-2"></div>
                  <p className="text-gray-700">+15% revenue accuracy through SQL optimization</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#D4A574] rounded-full mt-2"></div>
                  <p className="text-gray-700">20% improvement in student performance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#D4A574] rounded-full mt-2"></div>
                  <p className="text-gray-700">40% reduction in admin effort through automation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#D4A574] rounded-full mt-2"></div>
                  <p className="text-gray-700">7+ years multidisciplinary experience</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-black mb-6">Career Objective</h3>
              <div className="bg-[#F5F3F0] p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  To leverage my data, AI, and educational expertise in a forward-thinking organization—delivering predictive insight, operational efficiency, and inclusive digital transformation across sectors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}