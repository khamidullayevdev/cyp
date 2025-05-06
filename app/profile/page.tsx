"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import { Card, CardBody, CardFooter, Image } from '@heroui/react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [templateIds, setTemplateIds] = useState<number[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!token) {
        router.replace('/login');
        return;
      }

      await supabase.auth.setSession({
        access_token: token,
        refresh_token: localStorage.getItem('refresh_token') || '', // optional
      });

      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data.user || !data.user.email_confirmed_at) {
        router.replace('/login');
        return;
      }
      setUser(data.user);
      setLoading(false);
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    if (!user) return;
    const fetchTemplateIds = async () => {
      const { data, error } = await supabase
        .rpc('get_template_ids_by_user_id', { user_id: user.id });

      if (!error && data) {
        setTemplateIds(data.map((row: any) => row.template_id));
      }
    };
    fetchTemplateIds();
  }, [user]);

  useEffect(() => {
    if (!user || templateIds.length === 0) {
      setTemplates([]);
      setTemplatesLoading(false);
      return;
    }
    setTemplatesLoading(true);
    const fetchTemplates = async () => {
      const templatePromises = templateIds.map((id: number) =>
        supabase.rpc('get_template_by_id', { template_id: id }).then(res => res.data?.[0])
      );
      const templatesData = await Promise.all(templatePromises);
      setTemplates(templatesData.filter(Boolean));
      setTemplatesLoading(false);
    };
    fetchTemplates();
  }, [user, templateIds]);

  if (loading || templatesLoading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-gray-700 dark:text-gray-200">Loading...</div>;
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-start pt-12 transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white text-center">Welcome {user.user_metadata?.full_name || 'username'}</h1>
      <p className="text-lg text-gray-500 dark:text-gray-300 mb-8 text-center">{user.email}</p>
      <div className="w-full bg-gray-100 dark:bg-[#0f121a] rounded-xl p-8 shadow-md flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Your portfolios:</h2>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 mt-6">
          {templates.map((item, index) => (
            <Card
              key={`${item.id}-${index}`}
              isPressable
              shadow="sm"
              onPress={() => {
                router.push(`/template/${item.name}?id=${item.id}`);
              }}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item.name}
                  className="w-full object-cover h-[240px]"
                  radius="lg"
                  shadow="sm"
                  src={`${item.img}`}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.name}</b>
                <p className="text-default-500 capitalize">
                  {item.price == 'free' ? 'Free' : `${item.price}$`}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
        {!templates &&
          <div className="flex items-center gap-4">
            <span className="bg-yellow-700/80 text-yellow-100 px-3 py-1 rounded font-medium">You don&apos;t have portfolio let&apos;s create it</span>
            <Link href="/templates" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">CREATE PORTFOLIO</Link>
          </div>
        }
      </div>
    </div>
  );
}
