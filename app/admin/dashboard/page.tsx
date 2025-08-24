"use client";

import { useState, useEffect } from 'react';
import Image  from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LogOut, PlusCircle, X, UploadCloud, Trash2, Database, Award, Briefcase, GraduationCap,
  Image as PhotoIcon
} from 'lucide-react';

import {
  addProject, addSkill, getProjects, getSkills, deleteProject, deleteSkill,
  addExperience, addEducation, getExperiences, getEducation, deleteExperience, deleteEducation,
  getHeroImage, setHeroImage as setHeroImageInFirestore,
  addBlog, getBlogs, deleteBlog,
  deleteHeroImage
} from '@/lib/firestore';
import { CldUploadWidget } from 'next-cloudinary';

export default function AdminDashboard() {
  // State for all sections
  const [activeTab, setActiveTab] = useState('projects');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Form states
  const [newProject, setNewProject] = useState({
    title: '', desc: '', stack: '', image: '', video: ''
  });
  const [newSkill, setNewSkill] = useState({
    name: '', proficiency: 85
  });
  const [newExperience, setNewExperience] = useState({
    title: '', company: '', period: '', description: ''
  });
  const [newEducation, setNewEducation] = useState({
    degree: '', institution: '', period: '', description: ''
  });
  const [heroImage, setHeroImage] = useState('');
  const [newBlog, setNewBlog] = useState({ title: '', content: '', image: '', date: '' });
  
  // Data states
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    // Check authentication
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        fetchData();
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [
        projectsData, 
        skillsData, 
        experiencesData, 
        educationData,
        heroImageData,
        blogsData
      ] = await Promise.all([
        getProjects(),
        getSkills(),
        getExperiences(),
        getEducation(),
        getHeroImage(),
        getBlogs()
      ]);
      
      setProjects(projectsData);
      setSkills(skillsData);
      setExperiences(experiencesData);
      setEducation(educationData);
      setHeroImage(heroImageData);
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setUploadError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Handler functions for each content type
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setSuccessMessage('');
    setUploadError('');

    try {
      await addProject(newProject);
      setSuccessMessage('Project added successfully!');
      setNewProject({ title: '', desc: '', stack: '', image: '', video: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding project:', error);
      setUploadError('Failed to add project. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setSuccessMessage('');
    setUploadError('');

    try {
      await addSkill(newSkill);
      setSuccessMessage('Skill added successfully!');
      setNewSkill({ name: '', proficiency: 85 });
      fetchData();
    } catch (error) {
      console.error('Error adding skill:', error);
      setUploadError('Failed to add skill. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setSuccessMessage('');
    setUploadError('');

    try {
      await addExperience(newExperience);
      setSuccessMessage('Experience added successfully!');
      setNewExperience({ title: '', company: '', period: '', description: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding experience:', error);
      setUploadError('Failed to add experience. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEducationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setSuccessMessage('');
    setUploadError('');

    try {
      await addEducation(newEducation);
      setSuccessMessage('Education added successfully!');
      setNewEducation({ degree: '', institution: '', period: '', description: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding education:', error);
      setUploadError('Failed to add education. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleHeroImageSubmit = async () => {
    setIsUploading(true);
    setSuccessMessage('');
    setUploadError('');

    try {
      await setHeroImageInFirestore(heroImage);
      setSuccessMessage('Hero image updated successfully!');
    } catch (error) {
      console.error('Error updating hero image:', error);
      setUploadError('Failed to update hero image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setSuccessMessage('');
    setUploadError('');

    try {
      await addBlog({ ...newBlog, date: new Date().toISOString() });
      
      setSuccessMessage('Blog post added successfully!');
      setNewBlog({ title: '', content: '', image: '', date: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding blog post:', error);
      setUploadError('Failed to add blog post. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Delete handlers
  const handleDelete = async (type: string, id: string) => {
    const typeNames: Record<string, string> = {
      project: 'project',
      skill: 'skill',
      experience: 'experience',
      education: 'education',
      blog: 'blog',
      hero: 'hero image'
    };
    
    if (!confirm(`Are you sure you want to delete this ${typeNames[type]}?`)) return;
    
    try {
      setIsUploading(true);
      
      switch(type) {
        case 'project':
          await deleteProject(id);
          break;
        case 'skill':
          await deleteSkill(id);
          break;
        case 'experience':
          await deleteExperience(id);
          break;
        case 'education':
          await deleteEducation(id);
          break;
        case 'blog':
          await deleteBlog(id);
          break;
        case 'hero':
          await deleteHeroImage();
          break;
      }
      
      setSuccessMessage(`${typeNames[type].charAt(0).toUpperCase() + typeNames[type].slice(1)} deleted successfully!`);
      fetchData();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      setUploadError(`Failed to delete ${typeNames[type]}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Tab navigation component
  const TabButton = ({ 
    name, 
    icon: Icon, 
    label 
  }: {
    name: string;
    icon: React.ElementType;
    label: string;
  }) => (
    <button
      className={`px-6 py-3 font-medium relative flex items-center ${
        activeTab === name
          ? 'text-[#D4A574]'
          : 'text-gray-600 hover:text-gray-900'
      }`}
      onClick={() => setActiveTab(name)}
    >
      <Icon className="mr-2" size={18} />
      {label}
      {activeTab === name && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4A574]"
          layoutId="tabIndicator"
        />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#1E1E1E] flex items-center">
            <Database className="text-[#D4A574] mr-2" size={20} />
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <TabButton name="projects" icon={Award} label="Projects" />
          <TabButton name="skills" icon={Award} label="Skills" />
          <TabButton name="experiences" icon={Briefcase} label="Experiences" />
          <TabButton name="education" icon={GraduationCap} label="Education" />
          <TabButton name="hero" icon={PhotoIcon} label="Hero" />
          <TabButton name="blogs" icon={Briefcase} label="Blogs" />
        </div>

        {/* Messages */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-3 bg-green-50 text-green-700 rounded-lg"
          >
            {successMessage}
          </motion.div>
        )}
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-3 bg-red-50 text-red-700 rounded-lg"
          >
            {uploadError}
          </motion.div>
        )}

        {/* Projects Section */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Add Project Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <PlusCircle className="text-[#D4A574] mr-2" size={20} />
                Add New Project
              </h2>

              <form onSubmit={handleProjectSubmit} className="space-y-6">
                {/* Project form fields */}
                <div>
                  <label className="block text-gray-700 mb-2">Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    placeholder="AI-Based Patient Risk Prediction"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newProject.desc}
                    onChange={(e) => setNewProject({ ...newProject, desc: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent min-h-[120px]"
                    placeholder="Designed a ClinicalBERT-powered model to predict patient deterioration..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Technology Stack</label>
                  <input
                    type="text"
                    value={newProject.stack}
                    onChange={(e) => setNewProject({ ...newProject, stack: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    placeholder="Python • ClinicalBERT • Flask"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Project Media</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Image</label>
                      {newProject.image ? (
                        <div className="relative">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                            <div className="relative h-40 w-full">
                              <Image
                                src={newProject.image}
                                alt="Project preview"
                                fill
                                className="rounded-lg object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => setNewProject(prevState => ({ ...prevState, image: '' }))}
                              className="text-red-600 hover:text-red-800 flex items-center mt-3"
                            >
                              <X size={16} className="mr-1" /> Remove image
                            </button>
                          </div>
                        </div>
                      ) : (
                        <CldUploadWidget
                          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                          onSuccess={(result: any) => {
                            setNewProject(prevState => ({ ...prevState, image: result.info.secure_url }));
                          }}
                          options={{
                            sources: ['local', 'url', 'camera'],
                            multiple: false,
                            cropping: true,
                            croppingAspectRatio: 1.77,
                            resourceType: 'image'
                          }}
                        >
                          {({ open }) => (
                            <div
                              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#D4A574] transition-colors"
                              onClick={() => open()}
                            >
                              <div className="flex flex-col items-center">
                                <UploadCloud className="text-gray-400 mb-3" size={32} />
                                <p className="text-gray-600 mb-1">Click to upload an image</p>
                                <p className="text-gray-500 text-sm">Supports JPG, PNG, WEBP</p>
                              </div>
                            </div>
                          )}
                        </CldUploadWidget>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Video</label>
                      {newProject.video ? (
                        <div className="relative">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                            <div className="relative h-40 w-full">
                              <video
                                src={newProject.video}
                                controls
                                className="rounded-lg object-cover w-full h-full"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => setNewProject(prevState => ({ ...prevState, video: '' }))}
                              className="text-red-600 hover:text-red-800 flex items-center mt-3"
                            >
                              <X size={16} className="mr-1" /> Remove video
                            </button>
                          </div>
                        </div>
                      ) : (
                        <CldUploadWidget
                          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                          onSuccess={(result: any) => {
                            setNewProject(prevState => ({ ...prevState, video: result.info.secure_url }));
                          }}
                          options={{
                            sources: ['local', 'url', 'camera'],
                            multiple: false,
                            resourceType: 'video'
                          }}
                        >
                          {({ open }) => (
                            <div
                              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#D4A574] transition-colors"
                              onClick={() => open()}
                            >
                              <div className="flex flex-col items-center">
                                <UploadCloud className="text-gray-400 mb-3" size={32} />
                                <p className="text-gray-600 mb-1">Click to upload a video</p>
                                <p className="text-gray-500 text-sm">Supports MP4, MOV, etc.</p>
                              </div>
                            </div>
                          )}
                        </CldUploadWidget>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-3 px-6 bg-[#D4A574] text-white font-medium rounded-lg transition-all hover:bg-[#C08A5A] flex items-center justify-center ${
                    isUploading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? (
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  ) : (
                    'Add Project'
                  )}
                </button>
              </form>
            </div>

            
                         {/* Projects Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Database className="text-[#D4A574] mr-2" size={20} />
                Existing Projects ({projects.length})
              </h2>

              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-t-2 border-[#D4A574] rounded-full animate-spin"></div>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No projects found. Add your first project!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {project.image ? (
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={project.image}
                                    alt={project.title}
                                  />
                                ) : project.video ? (
                                  <video
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={project.video}
                                  />
                                ) : (
                                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center">
                                    <PhotoIcon className="text-gray-400" size={16} />
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                  {project.title}
                                </div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {project.stack}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              
                              onClick={() => handleDelete('project', project.id)}
                              className="text-red-600 hover:text-red-900 flex items-center justify-end w-full"
                              disabled={isUploading}
                            >
                              <Trash2 size={18} className="mr-1" />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </motion.div>
        )}

        {/* Skills Section */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Add Skill Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <PlusCircle className="text-[#D4A574] mr-2" size={20} />
                Add New Skill
              </h2>

             
              <form onSubmit={handleSkillSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Skill Name</label>
                  <input
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    placeholder="Python"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Proficiency: {newSkill.proficiency}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newSkill.proficiency}
                    onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4A574]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-3 px-6 bg-[#D4A574] text-white font-medium rounded-lg transition-all hover:bg-[#C08A5A] flex items-center justify-center ${
                    isUploading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? (
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  ) : (
                    'Add Skill'
                  )}
                </button>
              </form>
            </div>

     

                   {/* Skills Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Database className="text-[#D4A574] mr-2" size={20} />
                Existing Skills ({skills.length})
              </h2>

              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-t-2 border-[#D4A574] rounded-full animate-spin"></div>
                </div>
              ) : skills.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No skills found. Add your first skill!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Skill
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Proficiency
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {skills.map((skill) => (
                        <tr key={skill.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {skill.name}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-[#D4A574] h-2 rounded-full" 
                                  style={{ width: `${skill.proficiency}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-sm text-gray-500 w-10">
                                {skill.proficiency}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDelete('skill', skill.id)}
                              className="text-red-600 hover:text-red-900 flex items-center justify-end w-full"
                              disabled={isUploading}
                            >
                              <Trash2 size={18} className="mr-1" />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

           

        {/* Experiences Section */}
        {activeTab === 'experiences' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Add Experience Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <PlusCircle className="text-[#D4A574] mr-2" size={20} />
                Add New Experience
              </h2>

              <form onSubmit={handleExperienceSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={newExperience.title}
                    onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    placeholder="Data Analyst – Strategy & Financial Analytics"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    placeholder="Farmach Ltd, UK"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Period</label>
                  <input
                    type="text"
                    value={newExperience.period}
                    onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    placeholder="Sept 2023 – Present"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent min-h-[120px]"
                    placeholder="Built SQL models for rental pricing optimization..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-3 px-6 bg-[#D4A574] text-white font-medium rounded-lg transition-all hover:bg-[#C08A5A] flex items-center justify-center ${
                    isUploading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? (
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  ) : (
                    'Add Experience'
                  )}
                </button>
              </form>
            </div>

            {/* Experiences Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Database className="text-[#D4A574] mr-2" size={20} />
                Existing Experiences ({experiences.length})
              </h2>

              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-t-2 border-[#D4A574] rounded-full animate-spin"></div>
                </div>
              ) : experiences.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No experiences found. Add your first experience!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {experiences.map((exp) => (
                        <tr key={exp.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{exp.title}</h4>
                              <div className="text-sm text-gray-500">
                                {exp.company} | {exp.period}
                              </div>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {exp.description}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDelete('experience', exp.id)}
                              className="text-red-600 hover:text-red-900 flex items-center justify-end w-full"
                              disabled={isUploading}
                            >
                              <Trash2 size={18} className="mr-1" />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Education Section */}
        {activeTab === 'education' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Add Education Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <PlusCircle className="text-[#D4A574] mr-2" size={20} />
                Add New Education
              </h2>

              <form onSubmit={handleEducationSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    placeholder="Master of Science in Artificial Intelligence & Data Analytics"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Institution</label>
                  <input
                    type="text"
                    value={newEducation.institution}
                    onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    placeholder="University (with Distinction)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Period</label>
                  <input
                    type="text"
                    value={newEducation.period}
                    onChange={(e) => setNewEducation({ ...newEducation, period: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    placeholder="2022 - 2024"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newEducation.description}
                    onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent min-h-[120px]"
                    placeholder="Specialized in healthcare prediction, loan modeling..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-3 px-6 bg-[#D4A574] text-white font-medium rounded-lg transition-all hover:bg-[#C08A5A] flex items-center justify-center ${
                    isUploading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? (
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  ) : (
                    'Add Education'
                  )}
                </button>
              </form>
            </div>

            {/* Education Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Database className="text-[#D4A574] mr-2" size={20} />
                Existing Education ({education.length})
              </h2>

              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-t-2 border-[#D4A574] rounded-full animate-spin"></div>
                </div>
              ) : education.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No education entries found. Add your first education!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Education
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {education.map((edu) => (
                        <tr key={edu.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{edu.degree}</h4>
                              <div className="text-sm text-gray-500">
                                {edu.institution} | {edu.period}
                              </div>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {edu.description}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDelete('education', edu.id)}
                              className="text-red-600 hover:text-red-900 flex items-center justify-end w-full"
                              disabled={isUploading}
                            >
                              <Trash2 size={18} className="mr-1" />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Hero Section */}
        {activeTab === 'hero' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <PhotoIcon className="text-[#D4A574] mr-2" size={20} />
                Manage Hero Image
              </h2>

              <div>
                <label className="block text-gray-700 mb-2">Hero Image</label>
                {heroImage ? (
                  <div className="relative">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                      <div className="relative h-40 w-full">
                        <Image
                          src={heroImage}
                          alt="Hero preview"
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setHeroImage('')}
                        className="text-red-600 hover:text-red-800 flex items-center mt-3"
                      >
                        <X size={16} className="mr-1" /> Remove image
                      </button>
                    </div>
                  </div>
                ) : (
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={(result: any) => {
                      setHeroImage(result.info.secure_url);
                    }}
                    options={{
                      sources: ['local', 'url', 'camera'],
                      multiple: false,
                      cropping: true,
                      croppingAspectRatio: 1.77,
                      resourceType: 'image'
                    }}
                  >
                    {({ open }) => (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#D4A574] transition-colors"
                        onClick={() => open()}
                      >
                        <div className="flex flex-col items-center">
                          <UploadCloud className="text-gray-400 mb-3" size={32} />
                          <p className="text-gray-600 mb-1">Click to upload an image</p>
                          <p className="text-gray-500 text-sm">Supports JPG, PNG, WEBP</p>
                        </div>
                      </div>
                    )}
                  </CldUploadWidget>
                )}
              </div>

              <button
                onClick={handleHeroImageSubmit}
                disabled={isUploading || !heroImage}
                className={`w-full mt-6 py-3 px-6 bg-[#D4A574] text-white font-medium rounded-lg transition-all hover:bg-[#C08A5A] flex items-center justify-center ${
                  isUploading || !heroImage ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? (
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                ) : (
                  'Save Hero Image'
                )}
              </button>
              <button
                onClick={() => handleDelete('hero', 'heroImage')}
                disabled={isUploading || !heroImage}
                className={`w-full mt-2 py-3 px-6 bg-red-600 text-white font-medium rounded-lg transition-all hover:bg-red-800 flex items-center justify-center ${
                  isUploading || !heroImage ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? (
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                ) : (
                  'Delete Hero Image'
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Blogs Section */}
        {activeTab === 'blogs' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Add Blog Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <PlusCircle className="text-[#D4A574] mr-2" size={20} />
                Add New Blog Post
              </h2>

              <form onSubmit={handleBlogSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Blog Title</label>
                  <input
                    type="text"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                    placeholder="My First Blog Post"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Content</label>
                  <textarea
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent min-h-[120px]"
                    placeholder="This is my first blog post..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Blog Image</label>
                  {newBlog.image ? (
                    <div className="relative">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                        <div className="relative h-40 w-full">
                          <Image
                            src={newBlog.image}
                            alt="Blog preview"
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewBlog({ ...newBlog, image: '' })}
                          className="text-red-600 hover:text-red-800 flex items-center mt-3"
                        >
                          <X size={16} className="mr-1" /> Remove image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <CldUploadWidget
                      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                      onSuccess={(result: any) => {
                        setNewBlog(prevState => ({ ...prevState, image: result.info.secure_url }));
                      }}
                      options={{
                        sources: ['local', 'url', 'camera'],
                        multiple: false,
                        cropping: true,
                        croppingAspectRatio: 1.77,
                        resourceType: 'image'
                      }}
                    >
                      {({ open }) => (
                        <div
                          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#D4A574] transition-colors"
                          onClick={() => open()}
                        >
                          <div className="flex flex-col items-center">
                            <UploadCloud className="text-gray-400 mb-3" size={32} />
                            <p className="text-gray-600 mb-1">Click to upload an image</p>
                            <p className="text-gray-500 text-sm">Supports JPG, PNG, WEBP</p>
                          </div>
                        </div>
                      )}
                    </CldUploadWidget>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-3 px-6 bg-[#D4A574] text-white font-medium rounded-lg transition-all hover:bg-[#C08A5A] flex items-center justify-center ${
                    isUploading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? (
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  ) : (
                    'Add Blog Post'
                  )}
                </button>
              </form>
            </div>

            {/* Blogs Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Database className="text-[#D4A574] mr-2" size={20} />
                Existing Blog Posts ({blogs.length})
              </h2>

              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-t-2 border-[#D4A574] rounded-full animate-spin"></div>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No blog posts found. Add your first blog post!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Blog Post
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {blog.image ? (
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={blog.image}
                                    alt={blog.title}
                                  />
                                ) : (
                                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center">
                                    <PhotoIcon className="text-gray-400" size={16} />
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                  {blog.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDelete('blog', blog.id)}
                              className="text-red-600 hover:text-red-900 flex items-center justify-end w-full"
                              disabled={isUploading}
                            >
                              <Trash2 size={18} className="mr-1" />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}