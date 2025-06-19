"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const projectData = [
  {
    title: "AI-Based Patient Risk Prediction",
    desc: "Designed a ClinicalBERT-powered model to predict patient deterioration using historical electronic health records. Integrated explainable AI and achieved 87% accuracy on real-world hospital data.",
    stack: "Python • ClinicalBERT • Flask",
    image: "/ml4.jpeg", // Replace with actual image
  },
  {
    title: "Power BI Dashboard for Rental Analytics",
    desc: "Developed an executive-level dashboard for Farmach Ltd to optimize rental pricing. Leveraged SQL and Power BI to reveal patterns in revenue and seasonality, improving forecast accuracy by 15%.",
    stack: "SQL • Power BI • Data Modeling",
    image: "/ml2.jpeg", // Replace with actual image
  },
  {
    title: "Student Performance Tracker",
    desc: "Built a lightweight analytics tool for teachers to monitor student progress using Excel + Python. Helped increase class performance by 20% with data-driven feedback and interactive visualizations.",
    stack: "Excel • Python • Education Analytics",
    image: "/ml5.webp", // Replace with actual image
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Image */}
        <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden">
          <img
            src="/ml3.jpeg"
            alt="AI/ML Engineering Work"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Projects Header */}
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-black">Projects</h2>

          <div className="max-w-2xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-8 text-justify">
              From understanding your requirements, designing a blueprint and delivering
              the final product. I do everything that falls in between these lines.
            </p>

            {/* View Projects Button */}
            <div className="flex justify-center">
              <button className="group flex items-center space-x-4">
                <ArrowRight
                  size={32}
                  className="text-[#D4A574] group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-[#F5F3F0] rounded-lg shadow hover:shadow-lg p-4 flex flex-col transition-shadow duration-300"
            >
              {/* Project Image */}
              <div className="h-40 w-full rounded-md overflow-hidden mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-black mb-2">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 text-sm leading-relaxed text-justify flex-grow">
                {project.desc}
              </p>

              {/* Stack */}
              <div className="mt-4">
                <span className="text-[#D4A574] font-medium text-sm">
                  {project.stack}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
