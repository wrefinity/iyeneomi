"use client";

import ClientOnly from '@/components/ClientOnly';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
// import BlogSection from '@/components/BlogSection';
import CVSection from '@/components/CVSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <ClientOnly>
        <HeroSection />
      </ClientOnly>
      <AboutSection />
      <ProjectsSection />
      {/* <BlogSection /> */}
      <CVSection />
      <ContactSection />
      <ClientOnly>
        <Footer />
      </ClientOnly>
    </main>
  );
}