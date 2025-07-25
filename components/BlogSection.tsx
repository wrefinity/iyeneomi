"use client";

import { Calendar, ArrowRight } from 'lucide-react';

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "Leveraging AI in Healthcare: Electronic Patient Record Systems",
      excerpt: "Exploring how artificial intelligence can transform healthcare through intelligent EPR systems and predictive analytics.",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "/ml6.jpeg"
    },
    {
      id: 2,
      title: "Data Analytics in Education: Improving Student Outcomes",
      excerpt: "How data-driven approaches can enhance learning experiences and boost academic performance in mathematics education.",
      date: "2024-01-08",
      readTime: "6 min read",
      image: "/ml4.jpeg"
    },
    {
      id: 3,
      title: "Financial Analytics: SQL Models for Business Optimization",
      excerpt: "Building effective SQL models for rental pricing optimization and real-time business intelligence dashboards.",
      date: "2023-12-20",
      readTime: "10 min read",
      image: "/ml5.webp"
    }
  ];

  return (
    <section id="blog" className="bg-[#F5F3F0] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-[#D4A574] font-medium mb-4 tracking-wide">
            INSIGHTS & THOUGHTS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Blog
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Sharing knowledge and insights from my journey in data analytics, AI, education, 
            and healthcare - covering technical deep-dives and practical applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-black leading-tight group-hover:text-[#D4A574] transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center space-x-2 text-[#D4A574] font-medium group-hover:space-x-3 transition-all">
                  <span>Read More</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="group flex items-center space-x-4 bg-[#D4A574] text-white px-8 py-4 rounded-none hover:bg-[#C19660] transition-colors mx-auto">
            <span className="font-medium">View All Posts</span>
            <ArrowRight 
              size={20} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </button>
        </div>
      </div>
    </section>
  );
}