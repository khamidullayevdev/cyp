'use client'

import Image from 'next/image';
import navLogo from './assets/logo.png'
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';

type Education = {
  date: string;
  description: string;
};

type Skill = {
  skill_name: string;
  description: string;
};

type Contact = {
  contact_type: "Email" | "Phone" | "Telegram"; // yoki string bo'lishi mumkin
  description: string;
};

type Project = {
  project_name: string;
  project_link: string;
  description: string;
};

type PortfolioData = {
  name: string;
  position: string;
  about: string;
  education: Education[];
  skills: Skill[];
  contact: Contact[];
  projects: Project[];
};

export default function Retro() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    name: "",
    position: "",
    about: "",
    education: [
      { date: "", description: "" },
      { date: "", description: "" },
      { date: "", description: "" },
    ],
    skills: [
      { skill_name: "", description: "" },
      { skill_name: "", description: "" },
      { skill_name: "", description: "" },
    ],
    contact: [
      { contact_type: "Email", description: "" },
      { contact_type: "Phone", description: "" },
      { contact_type: "Telegram", description: "" },
    ],
    projects: [
      { project_name: "", project_link: "", description: "" },
      { project_name: "", project_link: "", description: "" },
      { project_name: "", project_link: "", description: "" },
    ],
  });
  
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUserId(data.user.id);
      else setUserId(null);
    };
    getUser();
  }, []);

  // General inputlar uchun
  function handleGeneralChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) {
    setPortfolioData(prev => ({
      ...prev,
      [key]: e.target.value,
    }));
  }

  // Massiv (education, skills, contact, projects) uchun
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: "education" | "skills" | "contact" | "projects",
    index: number,
    field: string
  ) {
    setPortfolioData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: e.target.value } : item
      ),
    }));
  }
  
  const handleSubmit = async () => {
    // 1. Access tokenni localStorage dan o'qish
    const accessToken = localStorage.getItem('access_token'); // yoki sizning Supabase instance nomi bo'yicha
    if (!accessToken) {
      router.push('/login');
      return;
    }

    // 2. Supabase orqali userni tekshirish
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error || !data?.user) {
      router.push('/login');
      return;
    }

    // 3. User mavjud bo'lsa, portfolio yaratish
    try {
      const { error: insertError } = await supabase
        .from('portfolios')
        .insert([
          {
            user_id: data.user.id,
            template_id: id,
            name: portfolioData.name,
            position: portfolioData.position,
            about: portfolioData.about,
            education: portfolioData.education,
            skills: portfolioData.skills,
            contact: portfolioData.contact,
            projects: portfolioData.projects,
          },
        ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      alert('Portfolio created successfully!');
    } catch (err) {
      console.error(err);
      alert('Error creating portfolio');
    }
  };

  return (
    <>
      <div className='bg-gray-100 !font-montserrat'>
        <button onClick={handleSubmit} className=" bg-gray-800 fixed z-50 left-[50%] translate-x-[-50%] top-[5%] border focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 ">Create Portfolio</button>
        <section className="pt-10 md:pt-16">
          <div className="w-[100%] max-w-[1200px] mx-auto px-[50px]">
            <nav className="flex items-center justify-between mb-40">
              <Image src={navLogo} alt="Logo" />
            </nav>

            <div className="text-center w-full">
              <div className="flex justify-center mb-16">
                <div className='w-[400px] h-[400px] rounded-[50%] bg-slate-400'>
                  {/* <img className='w-full h-full object-cover rounded-[50%] scale-75' src={homeImg} alt="Home" /> */}
                </div>
              </div>

              <input
                className='font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8 bg-[transparent] text-center border-none outline-none'
                placeholder="Your Name"
                type="text"
                value={portfolioData.name}
                onChange={(e) => handleGeneralChange(e, "name")}
              />

              <input
                type="text"
                className='font-normal text-gray-900 text-4xl md:text-7xl leading-none mb-8 bg-[transparent] border-none outline-none text-center w-full'
                placeholder='Junior Frontend Dev'
                value={portfolioData.position}
                onChange={(e) => handleGeneralChange(e, "position")}
              />

              <textarea
                rows={3}
                maxLength={100}
                className='font-normal text-gray-600 resize-none text-md md:text-xl sm:mb-0 mb-4 bg-[transparent] border-none outline-none w-full text-center'
                placeholder='About yourself'
                value={portfolioData.about}
                onChange={(e) => handleGeneralChange(e, "about")}
              ></textarea>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Education</h1>
            <p className="font-normal text-gray-500 text-xs md:text-base mb-20">Below is a summary of the places I studied</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.education.map((edu, index) => (
                <div key={index} className="bg-gray-50 px-8 py-10 rounded-md">
                  <input
                    type="text"
                    placeholder='e.g: 2015 - 2016'
                    className='font-medium text-gray-700 text-lg mb-4 bg-transparent outline-none'
                    value={edu.date}
                    onChange={(e) => handleInputChange(e, "education", index, "date")}
                  />
                  <textarea
                    maxLength={160}
                    rows={5}
                    placeholder='description'
                    className='resize-none w-full font-normal text-gray-500 text-md bg-transparent outline-none'
                    value={edu.description}
                    onChange={(e) => handleInputChange(e, "education", index, "description")}
                  />
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
              {portfolioData.skills.map((skill, index) => (
                <div key={index} className="bg-gray-50 px-8 py-10 rounded-md">
                  <input
                    type="text"
                    placeholder='skill name'
                    className='font-medium text-gray-700 text-lg mb-4 bg-transparent outline-none'
                    value={skill.skill_name}
                    onChange={(e) => handleInputChange(e, "skills", index, "skill_name")}
                  />
                  <textarea
                    maxLength={160}
                    rows={5}
                    placeholder='description'
                    className='font-normal text-gray-500 text-md mb-4 bg-transparent outline-none resize-none w-full'
                    value={skill.description}
                    onChange={(e) => handleInputChange(e, "skills", index, "description")}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Contact</h1>
            <p className="font-normal text-gray-500 text-xs md:text-base mb-20">Below is my contact information</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.contact.map((contact, index) => (
                <div key={index} className="bg-gray-50 px-8 py-10 rounded-md">
                  <input
                    type="text"
                    placeholder={`Example: ${contact.contact_type}`}
                    className='font-medium text-gray-700 text-lg mb-4 bg-transparent outline-none'
                    value={contact.contact_type}
                    onChange={(e) => handleInputChange(e, "contact", index, "contact_type")}
                  />
                  <textarea
                    rows={5}
                    maxLength={160}
                    className='w-full resize-none font-normal text-gray-500 text-md mb-4 bg-transparent outline-none'
                    placeholder='description'
                    value={contact.description}
                    onChange={(e) => handleInputChange(e, "contact", index, "description")}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Projects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                  <div className='bg-slate-200 rounded-t-lg p-6'>
                    <input
                      type="text"
                      className='font-medium text-gray-700 text-lg mb-4 bg-transparent outline-none'
                      placeholder='project name'
                      value={project.project_name}
                      onChange={(e) => handleInputChange(e, "projects", index, "project_name")}
                    />
                    <input
                      type="text"
                      placeholder='link'
                      className='bg-transparent outline-none text-black'
                      value={project.project_link}
                      onChange={(e) => handleInputChange(e, "projects", index, "project_link")}
                    />
                  </div>
                  <div className='p-6'>
                    <textarea
                      rows={5}
                      maxLength={160}
                      placeholder='description'
                      className='bg-transparent outline-none mb-3 font-normal text-gray-700 w-full resize-none'
                      value={project.description}
                      onChange={(e) => handleInputChange(e, "projects", index, "description")}
                    />
                    <button type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-400 rounded-lg hover:bg-slate-500 focus:ring-4 focus:outline-none">
                      Live demo
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className='text-center py-4 bg-black'>
          <p>© 2024 CYOP. All Rights Reserved.</p>
        </footer>
      </div>
    </>
  );
}