// lib/firestore.ts
import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc 
} from 'firebase/firestore';

// Add a new project
export const addProject = async (project: {
  title: string;
  desc: string;
  stack: string;
  image: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), project);
    return docRef.id;
  } catch (error) {
    console.error('Error adding project: ', error);
    throw error;
  }
};

// Get all projects
export const getProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Project[];
  } catch (error) {
    console.error('Error getting projects: ', error);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'projects', id));
  } catch (error) {
    console.error('Error deleting project: ', error);
    throw error;
  }
};

// Add a new skill
export const addSkill = async (skill: {
  name: string;
  proficiency: number;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'skills'), skill);
    return docRef.id;
  } catch (error) {
    console.error('Error adding skill: ', error);
    throw error;
  }
};

// Get all skills
export const getSkills = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'skills'));
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as Skill[];
  } catch (error) {
    console.error('Error getting skills: ', error);
    throw error;
  }
};

// Delete a skill
export const deleteSkill = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'skills', id));
  } catch (error) {
    console.error('Error deleting skill: ', error);
    throw error;
  }
};

// Define types for Firestore data
interface Project {
  id: string;
  title: string;
  desc: string;
  stack: string;
  image: string;
}

interface Skill {
  id: string;
  name: string;
  proficiency: number;
}

// Add experience
export const addExperience = async (experience: {
  title: string;
  company: string;
  period: string;
  description: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'experiences'), experience);
    return docRef.id;
  } catch (error) {
    console.error('Error adding experience: ', error);
    throw error;
  }
};

// Add education
export const addEducation = async (education: {
  degree: string;
  institution: string;
  period: string;
  description: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'education'), education);
    return docRef.id;
  } catch (error) {
    console.error('Error adding education: ', error);
    throw error;
  }
};

// Get all experiences
export const getExperiences = async () => {
  const querySnapshot = await getDocs(collection(db, 'experiences'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get all education
export const getEducation = async () => {
  const querySnapshot = await getDocs(collection(db, 'education'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Delete an experience
export const deleteExperience = async (id: string) => {
  await deleteDoc(doc(db, 'experiences', id));
};

// Delete an education entry
export const deleteEducation = async (id: string) => {
  await deleteDoc(doc(db, 'education', id));
};