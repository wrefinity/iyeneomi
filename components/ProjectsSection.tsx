"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getProjects } from "@/lib/firestore"
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  title: string;
  desc: string;
  stack: string;
  image: string;
  video?: string;
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

// Character limit for truncated description
const MAX_DESC_LENGTH = 120;

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

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

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const openVideoModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const toggleProjectExpansion = (index: number) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const truncateDescription = (desc: string, maxLength: number) => {
    if (desc.length <= maxLength) return desc;
    return desc.slice(0, maxLength).trim() + '...';
  };

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
            projects.map((project, index) => {
              const isExpanded = expandedProjects.has(index);
              const needsTruncation = project.desc.length > MAX_DESC_LENGTH;
              const displayDesc = isExpanded 
                ? project.desc 
                : truncateDescription(project.desc, MAX_DESC_LENGTH);

              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-[#F5F3F0] rounded-lg shadow hover:shadow-lg p-4 flex flex-col transition-shadow duration-300"
                >
                  <div className="h-40 w-full rounded-md overflow-hidden mb-4 relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.video && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <button
                          onClick={() => openVideoModal(project.video!)}
                          className="text-white bg-black bg-opacity-50 rounded-full p-4"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </button>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-black mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed text-justify flex-grow mb-2">
                    {displayDesc}
                  </p>

                  {needsTruncation && (
                    <button
                      onClick={() => toggleProjectExpansion(index)}
                      className="text-[#D4A574] text-sm font-medium flex items-center mb-3 hover:underline self-start"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp size={16} className="mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} className="mr-1" />
                          Show More
                        </>
                      )}
                    </button>
                  )}

                  <div className="mt-auto">
                    <span className="text-[#D4A574] font-medium text-sm">
                      {project.stack}
                    </span>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No projects found</p>
            </div>
          )}
        </div>

        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative">
              <button
                onClick={closeVideoModal}
                className="absolute -top-8 -right-8 text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full max-w-3xl h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}