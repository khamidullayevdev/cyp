"use client";
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

const features = [
  {
    title: 'Easy Create (Without coding)',
    desc: 'Just write about yourself, practice, services, projects etc',
  },
  {
    title: 'Good Prices',
    desc: 'We have just three subscribes free, 10$, 20%'
  },
  {
    title: 'Good Templates',
    desc: 'Good portfolio templates for subscribes, free = simple',
  },
];

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (password !== confirmPassword) {
      setError("Parollar mos emas!");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: 'https://cyp-roan.vercel.app/login',
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  // Email tasdiqlangandan keyin localStorage ga token saqlash uchun
  React.useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        localStorage.setItem('access_token', session.access_token);
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex items-center">
      <div className="w-full flex flex-col md:flex-row gap-8 px-4 py-12">
        {/* Chap blok */}
        <div className="flex-1 flex flex-col justify-center md:items-start items-center text-white">
          <h1 className="text-4xl dark:text-white text-black font-bold mb-8 text-center md:text-left">CYP</h1>
          <div className="flex flex-col gap-8 w-full max-w-md">
            {features.map((f, i) => (   
              <div key={i} className="flex items-start gap-4">
                <span className="mt-1 text-blue-500 text-2xl">✔️</span>
                <div>
                  <h2 className="dark:text-white text-black font-bold text-2xl mb-1">{f.title}</h2>
                  <p className="text-base dark:text-gray-300 text-black">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* O'ng blok */}
        <div className="flex-1 flex justify-center">
          <div className=" rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold dark:text-white text-black mb-6">Register</h2>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-600 rounded-md py-2 mb-6 transition" disabled>
              <FcGoogle className="text-2xl" />
              Continue with google
            </button>
            <div className="flex items-center gap-2 mb-6">
              <hr className="flex-1 border-gray-700" />
              <span className="text-gray-400">or</span>
              <hr className="flex-1 border-gray-700" />
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor='fullName' className="text-black dark:text-gray-300 text-sm mb-1 block">Username</label>
                <input className="w-full bg-transparent rounded-md border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-blue-500" name='fullName' placeholder="John Doe" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor='email' className="text-black dark:text-gray-300 text-sm mb-1 block">Email</label>
                <input className="w-full bg-transparent rounded-md border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-blue-500" name='email' placeholder="name@company.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <label htmlFor='password' className="text-black dark:text-gray-300 text-sm mb-1 block">Password</label>
                <input className="w-full bg-transparent rounded-md border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-blue-500" name='password' placeholder="......." type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div>
                <label htmlFor='confirmPassword' className="text-black dark:text-gray-300 text-sm mb-1 block">Confirm Password</label>
                <input className="w-full bg-transparent rounded-md border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-blue-500" name='confirmPassword' placeholder="......." type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 mt-2 transition" disabled={loading}>{loading ? 'Loading...' : 'Create An Account'}</button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">A confirmation message has been sent to your email. Please confirm your email!</p>}
            <p className="text-gray-400 text-sm mt-4 text-center">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}