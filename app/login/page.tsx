"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3F0] to-[#E6E2DD] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-[#D4A574] p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-sm opacity-90 mt-1">
            Secure access to content management
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-gray-700 font-medium flex items-center">
                <Mail size={16} className="mr-2" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-gray-700 font-medium flex items-center">
                <Lock size={16} className="mr-2" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A574] focus:border-transparent pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-[#D4A574]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-50 text-red-700 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 bg-[#D4A574] text-white font-medium rounded-lg transition-all hover:bg-[#C08A5A] flex items-center justify-center ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        
        <div className="px-8 pb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-[#D4A574]">
            <ArrowLeft size={16} className="mr-2" /> Back to website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}