"use client";  



export default function Footer() {
  return (
    <footer className="bg-[#F5F3F0] py-8 px-4 md:px-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
<div className="flex items-center">
  
    <img
      src="../naomilogo.png"
      alt="Logo"
      className="h-10 w-auto object-contain"
    />
  
</div>

        {/* Copyright */}
        <div className="text-sm text-gray-600">
           Copyright © 2025 Iyeneomi Blessing Ogoina
        </div>

        {/* Scroll to top button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-[#D4A574] transition-colors"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}