"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Link from 'next/link';
import { X } from 'lucide-react'; 
import { Card, CardBody, CardFooter, Image } from '@heroui/react';
import Loading from '@/components/loading';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [templateIds, setTemplateIds] = useState<{ template_id: string, portfolio_id: string }[]>([]);
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
        setTemplateIds(data.map((row: any) => ({
          template_id: row.template_id,
          portfolio_id: row.portfolio_id // yoki row.id
        })));
        console.log(data)
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
      const templatePromises = templateIds.map((item) =>
        supabase.rpc('get_template_by_id', { template_id: item.template_id })
        .then(res => {return { ...res.data?.[0], portfolio_id: item.portfolio_id }})
      );
      const templatesData = await Promise.all(templatePromises);
      setTemplates(templatesData.filter(Boolean));
      setTemplatesLoading(false);
    };
    fetchTemplates();
  }, [user, templateIds]);

  const handleDelete = async (portfolioId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this portfolio?');
    if (!confirmDelete) return;
  
    const { error } = await supabase.rpc('delete_portfolio_by_user_and_id', {
      p_user_id: user.id,
      p_portfolio_id: portfolioId,
    });
  
    if (error) {
      alert('Error deleting portfolio: ' + error.message);
      return;
    }
  
    // O‘chirilgan portfolioni templates dan ham olib tashlash
    setTemplates(prev => prev.filter(t => t.portfolio_id !== portfolioId));
  };

  if (loading || templatesLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-start pt-12 transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white text-center">Welcome {user.user_metadata?.full_name || 'username'}</h1>
      <p className="text-lg text-gray-500 dark:text-gray-300 mb-8 text-center">{user.email}</p>
      <div className="w-full bg-gray-100 dark:bg-[#0f121a] rounded-xl p-8 shadow-md flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Your portfolios:</h2>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 mt-6">
        {templates.map((item, index) => (
          <div className="relative" key={`${item.id}-${index}`}>
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item.portfolio_id)}
              className="absolute top-2 right-2 z-[10] bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
              title="Delete Portfolio"
            >
              <X size={16} />
            </button>

            <Card
              className='z-[1]'
              isPressable
              shadow="sm"
              onPress={() => {
                router.push(`/portfolio?template_name=${item.name}&pId=${item.portfolio_id}`);
              }}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item.dtext}
                  className="w-full object-cover h-[240px]"
                  radius="lg"
                  shadow="sm"
                  src={`${item.img}`}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.dtext}</b>
                <p className="text-default-500 capitalize">
                  {item.price === 'free' ? 'Free' : `${item.price}$`}
                </p>
              </CardFooter>
            </Card>
          </div>
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
