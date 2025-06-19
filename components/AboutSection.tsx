"use client";

import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const scrollToCV = () => {
    const element = document.getElementById('cv');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-[#D4A574] font-medium mb-4 tracking-wide">
                About me
              </p>
              <p className="text-sm md:text-base text-gray-800 text-justify leading-relaxed mb-6">
  Multidisciplinary professional with 7+ years of experience in education, healthcare, and data analytics.{' '}
  <span className="text-[#D4A574] font-medium">
    Completed MSc in Artificial Intelligence & Data Analytics with distinction.
  </span>
</p>

            </div>

            <div className="space-y-6  ">
              <h3 className="text-2xl font-bold text-[#D4A574]">
                I Love Building Technical Solutions that Make an Impact.
              </h3>
              
              <div className="flex justify-end">
                <button 
                  onClick={scrollToCV}
                  className="group flex items-center space-x-4 bg-[#D4A574] text-white px-8 py-4 rounded-none hover:bg-[#C19660] transition-colors"
                >
                  <span className="font-medium">Check My CV</span>
                  <ArrowRight 
                    size={20} 
                    className="group-hover:translate-x-1 transition-transform" 
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed text-justify">

            <p>
              My journey into data analytics and AI began with a passion for understanding how technology can extract valuable insights from complex datasets. Through my diverse experience in education and healthcare, I discovered the transformative power of data-driven decision making.
            </p>

            <p>
              I specialize in{' '}
              <span className="font-semibold text-black">data analytics & BI</span> using{' '}
              <span className="font-semibold text-black">SQL, Python, Excel, Power BI</span>, and{' '}
              <span className="font-semibold text-black">predictive modeling</span> with tools like{' '}
              <span className="font-semibold text-black">Scikit-learn and ClinicalBERT</span>. My expertise extends to{' '}
              <span className="font-semibold text-black">education & training</span> in mathematics and IT.
            </p>

            <p>
              With hands-on experience in healthcare prediction, loan modeling, and AI-integrated Electronic Patient Record (EPR) systems, I combine strong technical proficiency with effective instructional delivery and inclusive learning support.
            </p>

            <p>
              My goal is to leverage data, AI, and educational expertise in forward-thinking organizations—delivering predictive insights, operational efficiency, and inclusive digital transformation.{' '}
              <span className="text-[#D4A574] font-medium">Let's connect!</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}