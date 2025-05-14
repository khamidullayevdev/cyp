'use client'

import Image from 'next/image'
import React, { useState, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

type Project = {
  image: string;
  name: string;
  category: string;
  desc: string;
  imageFile: File | null;
};

const Browny = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroTitle, setHeroTitle] = useState('I am Chetan Verma - curious designer and devloper')
  const [heroDesc, setHeroDesc] = useState('based in New Delhi, India.')
  const [projects, setProjects] = useState<Project[]>([
    {
      image: 'https://images.unsplash.com/photo-1746958582395-bfd72cadf799?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: `Project One's Test`,
      category: 'Photoshop',
      desc: 'Project One description',
      imageFile: null
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1746420145979-f53c38fa829c?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Project Two',
      category: 'NextJS + Typescript',
      desc: 'Project Two description',
      imageFile: null
    },
    {
      image: 'https://images.unsplash.com/photo-1745827214444-87a9894fc6b7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Project Three',
      category: 'HTML, CSS, JS',
      desc: 'Project Three description',
      imageFile: null
    },
    {
      image: 'https://images.unsplash.com/photo-1726607102396-548750ce07f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Project Four',
      category: 'HTML, CSS, JS',
      desc: 'Project Three description',
      imageFile: null
    },
    {
      image: 'https://images.unsplash.com/photo-1746513420182-56a5a1f50034?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Project Five',
      category: 'HTML, CSS, JS',
      desc: 'Project Three description',
      imageFile: null
    },
    {
      image: 'https://images.unsplash.com/photo-1746748693880-5fc7266d4f72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Project Six',
      category: 'HTML, CSS, JS',
      desc: 'Project Three description',
      imageFile: null
    },
  ])
  const [visibleProjects, setVisibleProjects] = useState(2)
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])
  
  const [aboutMeText, setAboutMeText] = useState('If you are an entrepreneur, you know that your success cannot depend on the opinions of others. Like the wind, opinions change. Like the weather, opinions change frequently. To succeed at any endeavor, you must stay the course, no matter what the cost.')
  const [scheduleUrl, setScheduleUrl] = useState('https://schedule a call.com')
  const [socialLinks, setSocialLinks] = useState([
    { title: 'Github', url: 'https://github.com' },
    { title: 'Linkedin', url: 'https://linkedin.com' },
    { title: 'Twitter', url: 'https://twitter.com' },
    { title: 'Email', url: 'mailto:email@example.com' },
  ])
  const [educations, setEducations] = useState([
    { title: 'Lorem ipsum 2013-2015', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" },
    { title: 'Hello World 2015-2017', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" },
    { title: 'CYP 2017-2018', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" },
    { title: 'Tokyo 2019-2020', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" },
  ])

  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLoadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 2, projects.length))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedProjects = [...projects]
        updatedProjects[index] = {
          ...updatedProjects[index],
          image: reader.result as string,
          imageFile: file
        }
        setProjects(updatedProjects)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = (index: number) => {
    const input = fileInputRefs.current[index];
    if (input) input.click();
  }

  const prepareDataForBackend = () => {
    const formData = new FormData()
    
    // Add other data
    formData.append('heroTitle', heroTitle)
    formData.append('heroDesc', heroDesc)
    formData.append('aboutMeText', aboutMeText)
    formData.append('scheduleUrl', scheduleUrl)
    formData.append('socialLinks', JSON.stringify(socialLinks))
    formData.append('educations', JSON.stringify(educations))
    
    // Add projects with images
    projects.forEach((project, index) => {
      formData.append(`projects[${index}][name]`, project.name)
      formData.append(`projects[${index}][category]`, project.category)
      formData.append(`projects[${index}][desc]`, project.desc)
      if (project.imageFile) {
        formData.append(`projects[${index}][image]`, project.imageFile)
      } else {
        formData.append(`projects[${index}][imageUrl]`, project.image)
      }
    })
    
    return formData
  }

  const handleRemoveVisible = (idx: number) => {
    if (visibleProjects > 1) {
      setVisibleProjects(prev => prev - 1)
    }
  }

  const handleCreatePortfolio = async () => {
    setError(null)
    setSuccess(null)
    setLoading(true)
    const access_token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    if (!access_token) {
      router.push('/login')
      return
    }
    // 1. Userni olish
    const { data: { user }, error: userError } = await supabase.auth.getUser(access_token)
    if (userError || !user) {
      router.push('/login')
      return
    }
    // 2. portfolios_standard jadvalidan userning portfoliolari sonini tekshirish
    const { data: existing, error: existError } = await supabase
      .from('portfolios_standard')
      .select('id')
      .eq('user_id', user.id)
    if (existError) {
      alert('Serverda xatolik.');
      setLoading(false)
      return
    }
    if (existing && existing.length >= 1) {
      alert('Your limit is full. You can only create one portfolio.');
      setLoading(false)
      return
    }
    // 3. portfolios jadvaliga yangi portfolio qo'shish
    const { data: newPortfolio, error: portfolioError } = await supabase
      .from('portfolios')
      .insert({
        user_id: user.id,
        template_id: 'f277f271-8aef-486b-ad63-24209c62bdee', // Browny template id
        name: heroTitle,
        about: aboutMeText,
        education: educations,
        skills: [
          { skill_name: 'Skill 1', description: '' },
          { skill_name: 'Skill 2', description: '' },
          { skill_name: 'Skill 3', description: '' },
        ],
        contact: socialLinks,
        projects: projects,
        job_position: '',
      })
      .select()
      .single()
    if (portfolioError || !newPortfolio) {
      alert('Portfolio creation failed. ' + (portfolioError?.message || ''));
      setLoading(false)
      return
    }
    // 4. portfolios_standard jadvaliga yozuv qo'shish
    const { error: stdError } = await supabase
      .from('portfolios_standard')
      .insert({
        user_id: user.id,
        template_id: 'f277f271-8aef-486b-ad63-24209c62bdee',
        portfolio_id: newPortfolio.id,
      })
    if (stdError) {
      alert('Failed to add to standard portfolios. ' + (stdError?.message || ''));
      setLoading(false)
      return
    }
    alert('Portfolio created successfully!');
    setLoading(false)
  }

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden bg-gradient-to-b from-purple-100 to-white">
      <button
        className="bg-[#b539c5] fixed top-10 left-[50%] translate-x-[-50%] z-[9999999999999999] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#a028b0] transition"
        onClick={handleCreatePortfolio}
        disabled={loading}
      >
        {loading ? 'Yaratilmoqda...' : 'Create Portfolio'}
      </button>
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
        <textarea
          value={heroTitle}
          onChange={e => setHeroTitle(e.target.value)}
          className="text-3xl sm:text-5xl md:text-7xl font-medium mb-4 max-w-[60rem] bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#b539c5] w-full resize-none"
          rows={2}
        />
        <textarea
          value={heroDesc}
          onChange={e => setHeroDesc(e.target.value)}
          className="text-lg sm:text-xl md:text-2xl mb-6 max-w-[60rem] bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#b539c5] w-full resize-none"
          rows={2}
        />
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-10">
          {socialLinks.map((link, idx) => (
            <a key={idx} href={link.url} className="hover:underline" target="_blank" rel="noopener noreferrer">{link.title}</a>
          ))}
        </div>
        <div className="text-lg font-medium mb-10">Work.</div>
        
        {/* Projects grid */}
        <div className="w-full flex items-center justify-around flex-wrap gap-10 max-w-6xl mx-auto">
          {projects.slice(0, visibleProjects).map((project, idx) => (
            <div key={idx} className="rounded-xl w-[540px] p-0 flex flex-col">
              <div className="relative group">
                <Image 
                  width={420} 
                  height={320} 
                  src={project.image} 
                  alt={project.name} 
                  className="rounded-xl w-full h-80 object-cover"
                />
                <button 
                  onClick={() => triggerFileInput(idx)}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity rounded-xl"
                >
                  Upload Image
                </button>
                <button
                  onClick={() => handleRemoveVisible(idx)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center z-20"
                  title="Yopish"
                >
                  &minus;
                </button>
                <input
                  type="file"
                  ref={el => { fileInputRefs.current[idx] = el }}
                  onChange={(e) => handleImageUpload(e, idx)}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="py-6">
                <textarea
                  value={project.name}
                  onChange={e => {
                    const newProjects = [...projects]
                    newProjects[idx].name = e.target.value
                    setProjects(newProjects)
                  }}
                  className="text-3xl font-semibold mb-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#b539c5] w-full resize-none"
                  rows={2}
                />
                <textarea
                  value={project.category}
                  onChange={e => {
                    const newProjects = [...projects]
                    newProjects[idx].category = e.target.value
                    setProjects(newProjects)
                  }}
                  className="text-gray-500 text-md mb-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#b539c5] w-full resize-none"
                  rows={2}
                />
                <textarea
                  value={project.desc}
                  onChange={e => {
                    const newProjects = [...projects]
                    newProjects[idx].desc = e.target.value
                    setProjects(newProjects)
                  }}
                  className="text-gray-500 text-md bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#b539c5] w-full resize-none mt-2"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
        
        {visibleProjects < projects.length && visibleProjects < 6 && (
          <div className="w-full flex justify-center mt-10">
            <button 
              onClick={handleLoadMore}
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b539c5] transition-colors"
            >
              + Load More Projects
            </button>
          </div>
        )}
      </section>

       {/* about me */}
       <section className="w-full py-20">
         <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-10 px-4">
           {/* Chap qism - matn */}
           <div className="flex-1 max-w-xl">
             <div className="uppercase text-[#d48fa6] tracking-widest text-sm mb-2">Peaches</div>
             <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">ABOUT <span className="text-black">ME</span></h2>
             <textarea
               value={aboutMeText}
               onChange={e => setAboutMeText(e.target.value)}
               className="text-gray-500 text-sm sm:text-lg mb-8 bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#b539c5] w-full resize-none"
               rows={4}
             />
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
             {educations.map((edu, idx) => (
               <div
                 key={idx}
                 className={`p-3 sm:p-7 shadow-lg min-h-[250px] bg-gradient-to-br from-purple-200 to-purple-100 rounded-3xl text-white flex flex-col gap-4 ${
                   idx === 0 ? 'rotate-[-5deg]' :
                   idx === 1 ? 'rotate-[10deg]' :
                   idx === 2 ? 'rotate-[5deg]' :
                   idx === 3 ? 'rotate-[-5deg]' : ''
                 }`}
               >
                 <input
                   type="text"
                   value={edu.title}
                   onChange={e => {
                     setEducations(prev => prev.map((item, i) => i === idx ? { ...item, title: e.target.value } : item));
                   }}
                   className="text-[18px] bg-white focus:outline-none text-black rounded-xl p-3 font-semibold w-full mb-2"
                 />
                 <textarea
                   value={edu.desc}
                   onChange={e => {
                     setEducations(prev => prev.map((item, i) => i === idx ? { ...item, desc: e.target.value } : item));
                   }}
                   className="text-[14px] sm:text-[15px] text-white focus:outline-none bg-transparent w-full resize-y min-h-[108px]"
                   rows={2}
                 />
               </div>
             ))}
           </div>
         </div>
       </section>
       <section>
         <div className="container mx-auto px-4 py-20 text-black flex flex-col items-center justify-center">
           <h2 className="text-4xl sm:text-7xl md:text-8xl font-bold text-center mb-8 leading-tight">LET&apos;S WORK<br />TOGETHER</h2>
           <input
             type="text"
             value={scheduleUrl}
             onChange={e => setScheduleUrl(e.target.value)}
             className="mb-4 px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-[#b539c5] w-full max-w-md text-lg text-center bg-transparent"
             placeholder="Schedule uchun URL kiriting"
           />
           <a
             href={scheduleUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-[17px] sm:text-lg mb-10 hover:bg-[#b539c5] transition-colors"
           >
             Schedule a call
           </a>
           <div className="flex flex-wrap gap-4 sm:gap-8 justify-center text-[17px] sm:text-lg text-black w-full mt-4">
             {socialLinks.map((link, idx) => (
               <a key={idx} href={link.url} className="hover:underline" target="_blank" rel="noopener noreferrer">{link.title}</a>
             ))}
           </div>
         </div>
       </section>
       {/* Social links inputlar */}
       <section className="w-full text-black py-8">
         <div className="container mx-auto px-4">
           <h3 className="text-2xl font-bold mb-4">Social media settings</h3>
           <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
             {socialLinks.map((link, idx) => (
               <div key={idx} className="flex flex-col gap-2">
                 <input
                   type="text"
                   value={link.title}
                   onChange={e => {
                     setSocialLinks(prev => prev.map((l, i) => i === idx ? { ...l, title: e.target.value } : l));
                   }}
                   className="px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-[#b539c5] bg-transparent text-base font-semibold"
                 />
                 <input
                   type="text"
                   value={link.url}
                   onChange={e => {
                     setSocialLinks(prev => prev.map((l, i) => i === idx ? { ...l, url: e.target.value } : l));
                   }}
                   className="px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-[#b539c5] bg-transparent text-base"
                 />
               </div>
             ))}
           </div>
         </div>
       </section>
       {error && <div className="text-red-500 text-center mt-4">{error}</div>}
       {success && <div className="text-green-600 text-center mt-4">{success}</div>}
       <footer className='text-center py-4'>
         <p className='text-black'>© 2025 CYP</p>
       </footer>
    </div>
  )
}

export default Browny