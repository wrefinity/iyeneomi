"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getProjects } from "@/lib/firestore"
import { Skeleton } from "@/components/ui/skeleton"; // Add your skeleton component

interface Project {
  title: string;
  desc: string;
  stack: string;
  image: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData: Project[] = await getProjects()
        setProjects(projectsData);
      } catch (err) {
        setError("Failed to load projects");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Image */}
        <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden">
          <img
            src="/mlp.jpg"
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
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div 
                key={index} 
                className="bg-[#F5F3F0] rounded-lg shadow p-4 flex flex-col"
              >
                <Skeleton className="h-40 w-full rounded-md mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-500">{error}</p>
              <p className="text-gray-600 mt-2">Please try again later</p>
            </div>
          ) : projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-[#F5F3F0] rounded-lg shadow hover:shadow-lg p-4 flex flex-col transition-shadow duration-300"
              >
                <div className="h-40 w-full rounded-md overflow-hidden mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-black mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-700 text-sm leading-relaxed text-justify flex-grow">
                  {project.desc}
                </p>

                <div className="mt-4">
                  <span className="text-[#D4A574] font-medium text-sm">
                    {project.stack}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No projects found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}