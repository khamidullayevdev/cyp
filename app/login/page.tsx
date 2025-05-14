"use client"

import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { Checkbox } from '@heroui/react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

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

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else if (data.session) {
      setSession(data.session);
      localStorage.setItem('access_token', data.session.access_token);
      router.push('/profile');
    } else {
      setError('Incorrect email or password.');
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // redirectTo: 'http://localhost:3000/profile', // ixtiyoriy, kerak bo'lsa
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      localStorage.setItem('access_token', session.access_token);
      router.push('/profile');
    }
  }, [session, router]);

  return (
    <div className="flex items-center">
      <div className="w-full flex flex-col md:flex-row gap-8 px-4 py-12">
        {/* Chap blok */}
        <div className="flex-1 flex flex-col justify-center md:items-start items-center text-white">
          <h1 className="text-4xl font-bold mb-8 text-black dark:text-white text-center md:text-left">CYP</h1>
          <div className="flex flex-col gap-8 w-full max-w-md">
            {features.map((f, i) => (   
              <div key={i} className="flex items-start gap-4">
                <span className="mt-1 text-blue-500 text-2xl">✔️</span>
                <div>
                  <h2 className="font-bold dark:text-white text-black text-2xl mb-1">{f.title}</h2>
                  <p className="text-base dark:text-gray-300 text-black">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* O'ng blok */}
        <div className="flex-1 flex justify-center">
          <div className=" rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold dark:text-white text-black mb-6">Log in</h2>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-600 rounded-md py-2 mb-6 transition"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
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
                <label htmlFor="email" className="text-black dark:text-gray-300 text-sm mb-1 block">Your email</label>
                <input className="w-full bg-transparent rounded-md border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-blue-500" name='email' placeholder="name@company.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="password" className="text-black dark:text-gray-300 text-sm mb-1 block">Password</label>
                <input className="w-full bg-transparent rounded-md border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-blue-500" name='password' placeholder="......." type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>

              <div className='flex w-full justify-between items-center'>
                <Checkbox>Remember me</Checkbox>

                <Link href={'/forgot-password'} className='text-primary'>Forgot password</Link>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 mt-2 transition" disabled={loading}>{loading ? 'Yuklanmoqda...' : 'Log in'}</button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <p className="text-gray-400 text-sm mt-4 text-center">
             Don&apos;t have an account yet?{' '}
              <Link href="/signup" className="text-blue-400 hover:underline">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}