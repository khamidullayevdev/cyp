"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!token) {
        router.replace('/login');
        return;
      }
      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data.user || !data.user.email_confirmed_at) {
        router.replace('/login');
        return;
      }
      setUser(data.user);
      setLoading(false);
    };
    checkUser();
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-gray-700 dark:text-gray-200">Loading...</div>;
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-start pt-12 transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white text-center">Welcome {user.user_metadata?.full_name || 'username'}</h1>
      <p className="text-lg text-gray-500 dark:text-gray-300 mb-8 text-center">{user.email}</p>
      <div className="w-full max-w-4xl bg-gray-100 dark:bg-[#232b3e] rounded-xl p-8 shadow-md flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Your portfolios:</h2>
        <div className="flex items-center gap-4">
          <span className="bg-yellow-700/80 text-yellow-100 px-3 py-1 rounded font-medium">You don't have portfolio let's create it</span>
          <Link href="/templates" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">CREATE PORTFOLIO</Link>
        </div>
      </div>
    </div>
  );
}
