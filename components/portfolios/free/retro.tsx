'use client'

import navLogo from '../../../app/template/Retro/assets/logo.png';
import homeImg from '../../../app/template/Retro/assets/cosmonaft.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Retro() {
  const searchParams = useSearchParams();
  const pId = searchParams.get('pId');
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!pId) return;
      const { data, error } = await supabase.rpc('get_portfolio_by_id', { p_id: pId });
      if (!error && data && data[0]) {
        setPortfolio(data[0]);
      }
    };
    fetchPortfolio();
  }, [pId]);

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='bg-gray-100'>
        <section className="pt-10 md:pt-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <nav className="flex items-center justify-between mb-40">
              <Image src={navLogo} alt="Logo" />
            </nav>

            <div className="text-center w-full">
              <div className="flex justify-center mb-16">
                <div className='w-[400px] h-[400px] rounded-[50%] bg-slate-400'>
                  <Image className='w-full h-full object-cover rounded-[50%] scale-75' src={homeImg} alt="Home" />
                </div>
              </div>

              <h1 className='font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8'>{portfolio.name}</h1>
              <h2 className='font-normal text-gray-900 text-4xl md:text-7xl leading-none mb-8'>{portfolio.position || portfolio.job_position}</h2>
              <p className='font-normal text-gray-600 text-md md:text-xl sm:mb-0 mb-4'>{portfolio.about}</p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Education</h1>
            <p className="font-normal text-gray-500 text-xs md:text-base mb-20">Below is a summary of the places I studied</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.education && portfolio.education.map((edu: any, index: number) => (
                <div key={index} className="bg-gray-50 px-8 min-h-[300px] py-10 rounded-md">
                  <h3 className='font-medium text-gray-700 text-lg mb-4'>{edu.date}</h3>
                  <p className='font-normal text-gray-500 text-md'>{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Skills</h1>
            <p className="font-normal text-gray-500 text-xs md:text-base mb-20">Below is a summary of my skills</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.skills && portfolio.skills.map((skill: any, index: number) => (
                <div key={index} className="bg-gray-50 px-8 py-10 rounded-md min-h-[300px]">
                  <h4 className='font-medium text-gray-700 text-lg mb-4'>{skill.skill_name}</h4>
                  <p className='font-normal text-gray-500 text-md mb-4'>{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Contact</h1>
            <p className="font-normal text-gray-500 text-xs md:text-base mb-20">Below is my contact information</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
              {portfolio.contact && portfolio.contact.map((contact: any, index: number) => (
                <div key={index} className="bg-gray-50 px-8 py-10 rounded-md">
                  <h5 className='font-medium text-gray-700 text-lg mb-4'>{contact.contact_type}</h5>
                  <p className='font-normal text-gray-500 text-md mb-4'>{contact.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Projects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.projects && portfolio.projects.map((project: any, index: number) => (
                <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                  <div className='bg-slate-200 rounded-t-lg py-2 px-6'>
                    <h6 className='font-medium text-gray-700 text-lg'>{project.project_name}</h6>
                  </div>
                  <div className='p-6'>
                    <p className='bg-transparent outline-none mb-3 font-normal text-gray-700 w-full resize-none'>{project.description}</p>
                    <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-500 focus:ring-4 focus:outline-none">
                      Live demo
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className='text-center py-4 bg-black'>
          <p>© 2025 CYP</p>
        </footer>
      </div>
    </>
  );
}