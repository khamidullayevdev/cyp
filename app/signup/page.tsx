import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

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
  return (
    <div className="flex items-center">
      <div className="w-full flex flex-col md:flex-row gap-8 px-4 py-12">
        {/* Chap blok */}
        <div className="flex-1 flex flex-col justify-center md:items-start items-center text-white">
          <h1 className="text-4xl dark:text-white text-black font-bold mb-8 text-center md:text-left">CYP</h1>
          <div className="flex flex-col gap-8 w-full max-w-md">
            {features.map((f, i) => (   
              <div key={i} className="flex items-start gap-4">
                <span className="mt-1 text-blue-500 text-2xl">✔️</span>
                <div>
                  <h2 className="dark:text-white text-black font-bold text-2xl mb-1">{f.title}</h2>
                  <p className="text-base dark:text-gray-300 text-black">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* O'ng blok */}
        <div className="flex-1 flex justify-center">
          <div className=" rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold dark:text-white text-black mb-6">Register</h2>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-600 rounded-md py-2 mb-6 transition">
              <FcGoogle className="text-2xl" />
              Continue with google
            </button>
            <div className="flex items-center gap-2 mb-6">
              <hr className="flex-1 border-gray-700" />
              <span className="text-gray-400">or</span>
              <hr className="flex-1 border-gray-700" />
            </div>
            <form className="flex flex-col gap-4">
              <div>
                <label className="text-black dark:text-gray-300 text-sm mb-1 block">User name</label>
                <input type="text" placeholder="John Doe" className="w-full rounded-md border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-black dark:text-gray-300 text-sm mb-1 block">Your email</label>
                <input type="email" placeholder="name@company.com" className="w-full rounded-md border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-black dark:text-gray-300 text-sm mb-1 block">Password</label>
                <input type="password" placeholder="......." className="w-full rounded-md border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-black dark:text-gray-300 text-sm mb-1 block">Confirm password</label>
                <input type="password" placeholder="......." className="w-full rounded-md border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 mt-2 transition">Create an account</button>
            </form>
            <p className="text-gray-400 text-sm mt-4 text-center">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}