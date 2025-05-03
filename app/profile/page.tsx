"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>
      <p><b>Username:</b> {user.user_metadata?.full_name || 'Nomaʼlum'}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
}
