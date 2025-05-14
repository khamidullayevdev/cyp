'use client'

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter, useSearchParams } from 'next/navigation'
import Loading from '@/components/loading'

type Project = {
  image: string;
  name: string;
  category: string;
  desc: string;
  imageFile: File | null;
};

const Browny = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('pId');
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!portfolioId) return;
      // portfolios_standard dan portfolio_id bo'yicha ma'lumotlarni olish
      const { data, error } = await supabase
        .from('portfolios_standard')
        .select(`*, portfolios(*), templates(*)`)
        .eq('portfolio_id', portfolioId)
        .single();
      if (!error && data && data.portfolios) {
        setPortfolio({ ...data.portfolios, template: data.templates });
      }
      setLoading(false);
    };
    fetchPortfolio();
  }, [portfolioId]);

  if (loading) return <Loading />;
  if (!portfolio) return <div>Portfolio not found</div>;

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden bg-gradient-to-b from-purple-100 to-white">
       <nav className="w-full py-[40px] text-black sticky top-0 z-10 backdrop-blur">
        <div className="container mx-auto flex justify-between items-center px-4">
          <span className="font-bold text-[20px]">Chetan.</span>
          
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6 text-[16px] font-medium">
            <li><a href="#work" className="hover:text-[#b539c5] transition-colors">Work</a></li>
            <li><a href="#about" className="hover:text-[#b539c5] transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-[#b539c5] transition-colors">Contact</a></li>
          </ul>
          {/* Burger icon */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span className={`block w-7 h-1 bg-black rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-7 h-1 bg-black rounded my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-7 h-1 bg-black rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        {/* Mobile menu */}
        <div
          className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex justify-between items-center px-6 py-6 border-b">
            <span className="font-bold text-[20px]">Chetan.</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <ul className="flex flex-col space-y-6 text-[18px] font-medium px-8 pt-8">
            <li><a href="#work" className="hover:text-[#b539c5] transition-colors" onClick={() => setMenuOpen(false)}>Work</a></li>
            <li><a href="#about" className="hover:text-[#b539c5] transition-colors" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#contact" className="hover:text-[#b539c5] transition-colors" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed h-[100vh] w-[100vw] top-0 left-0 bg-black/30 z-[9] md:hidden"
            onClick={() => setMenuOpen(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setMenuOpen(false)}
          />
        )}
      </nav>
      
      <section className="container mx-auto px-4 py-20 text-black flex flex-col justify-center min-h-[60vh]">
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold mb-6 flex items-center gap-2">
          Hello <span className="text-8xl">👋</span>
        </h1>
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-medium mb-4 max-w-[60rem]">{portfolio.name}</h2>
        <h3 className="text-lg sm:text-xl md:text-2xl mb-6 max-w-[60rem]">{portfolio.job_position}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-10">
          {portfolio.contact && Array.isArray(portfolio.contact) && portfolio.contact.map((link: any, idx: number) => (
            <a key={idx} href={link.url || '#'} className="hover:underline" target="_blank" rel="noopener noreferrer">{link.title || link.contact_type}</a>
          ))}
        </div>
        <div className="text-lg font-medium mb-10">Work.</div>
        
        {/* Projects grid */}
        <div className="w-full flex items-center justify-around flex-wrap gap-10 max-w-6xl mx-auto">
          {portfolio.projects && Array.isArray(portfolio.projects) && portfolio.projects.map((project: any, idx: number) => (
            <div key={idx} className="rounded-xl w-[540px] p-0 flex flex-col">
              <div className="relative group">
                <Image 
                  width={420} 
                  height={320} 
                  src={project.image || ''} 
                  alt={project.name || project.project_name} 
                  className="rounded-xl w-full h-80 object-cover"
                />
              </div>
              <div className="py-6">
                <h4 className="text-3xl font-semibold mb-2">{project.name || project.project_name}</h4>
                <h5 className="text-gray-500 text-md mb-2">{project.category}</h5>
                <p className="text-gray-500 text-md mt-2">{project.desc || project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

       {/* about me */}
       <section className="w-full py-20">
         <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-10 px-4">
           {/* Chap qism - matn */}
           <div className="flex-1 max-w-xl">
             <div className="uppercase text-[#d48fa6] tracking-widest text-sm mb-2">Peaches</div>
             <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">ABOUT <span className="text-black">ME</span></h2>
             <p className="text-gray-500 text-sm sm:text-lg mb-8">{portfolio.about}</p>
             <div className="border-b border-[#f3b6c2] w-24 mb-2"></div>
           </div>
           {/* O'ng qism - rasm */}
           <div className="flex-1 max-w-xl flex justify-center">
             <img
               src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
               alt="About Me"
               className="rounded-lg object-cover w-full max-w-md h-[400px] shadow-lg"
             />
           </div>
         </div>
       </section>
       {/* education section */}
       <section className="w-full py-16">
         <div className="container mx-auto px-4">
           <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold text-black text-center mb-8 leading-tight">Education</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-0 sm:gap-4 max-w-[74rem] mx-auto">
             {portfolio.education && Array.isArray(portfolio.education) && portfolio.education.map((edu: any, idx: number) => (
               <div
                 key={idx}
                 className={`p-3 sm:p-7 shadow-lg min-h-[250px] bg-gradient-to-br from-purple-200 to-purple-100 rounded-3xl text-white flex flex-col gap-4 ${
                   idx === 0 ? 'rotate-[-5deg]' :
                   idx === 1 ? 'rotate-[10deg]' :
                   idx === 2 ? 'rotate-[5deg]' :
                   idx === 3 ? 'rotate-[-5deg]' : ''
                 }`}
               >
                 <h4 className="text-[18px] bg-white text-black rounded-xl p-3 font-semibold w-full mb-2">{edu.title || edu.date}</h4>
                 <p className="text-[14px] sm:text-[15px] text-white bg-transparent w-full min-h-[108px]">{edu.desc || edu.description}</p>
               </div>
             ))}
           </div>
         </div>
       </section>
       <section>
         <div className="container mx-auto px-4 pt-20 text-black flex flex-col items-center justify-center">
           <h2 className="text-4xl sm:text-7xl md:text-8xl font-bold text-center mb-8 leading-tight">LET&apos;S WORK<br />TOGETHER</h2>
           <a
             href={portfolio.schedule_url}
             target="_blank"
             rel="noopener noreferrer"
             className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-[17px] sm:text-lg mb-10 hover:bg-[#b539c5] transition-colors"
           >
             Schedule a call
           </a>
         </div>
       </section>
       <footer className='text-center py-4'>
         <p className='text-black'>© 2025 CYP</p>
       </footer>
    </div>
  )
}

export default Browny