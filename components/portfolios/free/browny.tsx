'use client'

import Image from 'next/image'
import React, { useState } from 'react'

const Browny = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-purple-100 to-white">
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
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-medium mb-6 max-w-[60rem]">
          I am Chetan Verma - curious designer and devloper<br />
          based in New Delhi, India.
        </h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-10">
          <a href="https://github.com" className="hover:underline">Github</a>
          <a href="https://linkedin.com" className="hover:underline">LinkedIn</a>
          <a href="https://twitter.com" className="hover:underline">Twitter</a>
          <a href="mailto:email@example.com" className="hover:underline">Email</a>
        </div>
        <div className="text-lg font-medium mb-10">Work.</div>
        {/* Projects grid */}
        <div className="w-full flex items-center justify-around flex-wrap gap-10 max-w-6xl mx-auto">
          <div className="w-[420px] md:w-[540px] flex flex-col">
            <Image  width={420} height={320} src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Project One" className="mb-2 rounded-xl w-full h-80 object-cover" />
            <div>
              <h3 className="text-3xl font-semibold">Project One&apos;s Test</h3>
              <p className="text-gray-500 text-md">Web Design</p>
            </div>
          </div>
          <div className="w-[420px] md:w-[540px] flex flex-col">
            <Image  width={420} height={320} src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Project Two" className="mb-2 rounded-xl w-full h-80 object-cover" />
            <div>
              <h3 className="text-3xl font-semibold">Project Two</h3>
              <p className="text-gray-500 text-md">Web Development</p>
            </div>
          </div>
          <div className="w-[420px] md:w-[540px] flex flex-col">
            <Image  width={420} height={320} src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Project Two" className="mb-2 rounded-xl w-full h-80 object-cover" />
            <div>
              <h3 className="text-3xl font-semibold">Project Two</h3>
              <p className="text-gray-500 text-md">Web Development</p>
            </div>
          </div>
        </div>
      </section>

      {/* about me */}

      <section className="w-full py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-10 px-4">
          {/* Chap qism - matn */}
          <div className="flex-1 max-w-xl">
            <div className="uppercase text-[#d48fa6] tracking-widest text-sm mb-2">Peaches</div>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">ABOUT <span className="text-black">ME</span></h2>
            <p className="text-gray-500 text-lg mb-8">If you are an entrepreneur, you know that your success cannot depend on the opinions of others. Like the wind, opinions change. Like the weather, opinions change frequently. To succeed at any endeavor, you must stay the course, no matter what the cost.</p>
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

      <section>
        <div className="container mx-auto px-4 py-20 text-black flex flex-col items-center justify-center">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold text-center mb-8 leading-tight">LET&apos;S WORK<br />TOGETHER</h2>
          <a href="https://calendly.com" className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-lg mb-10 hover:bg-[#b539c5] transition-colors">Schedule a call</a>
          <div className="flex flex-wrap gap-8 justify-center text-lg text-black w-full mt-4">
            <a href="https://github.com" className="hover:underline">Github</a>
            <a href="https://linkedin.com" className="hover:underline">LinkedIn</a>
            <a href="https://twitter.com" className="hover:underline">Twitter</a>
            <a href="mailto:email@example.com" className="hover:underline">Email</a>
          </div>
        </div>
      </section>

      <footer className='text-center py-4'>
        <p className='text-black'>© 2025 CYP</p>
      </footer>
    </div>
  )
}

export default Browny