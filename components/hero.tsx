'use client'

import { Button } from '@heroui/button'
import { Image } from '@heroui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
// import { CheckIcon, LightningIcon, PaintIcon, CodeIcon } from '@heroui/icons'

const Hero = () => {
    const router = useRouter()
    
    return (
        <section className="flex min-h-[70vh] items-center flex-col md:flex-row justify-between gap-[20px]">
            
            <div className="flex flex-col mx-w-[600px] lg:max-w-[700px] gap-[25px]">
                <h1 className="text-[3.5rem] leading-[1] font-[600]">
                    Make <span className="text-[#df2ef7]">beautiful</span> websites regardless of your design experience.
                </h1>

                <p className="dark:text-gray-400 text-gray-700 text-[1rem] leading-[1.75rem]">Beautiful, fast and modern React UI library for building accessible and customizable web applications.</p>

                <div>
                    <Button onPress={() => router.push('/templates')} className="px-[30px]" color="primary" radius="full" size="lg" variant="shadow">
                        Get Started
                    </Button>
                </div>

            </div>

            <div className='flex-grow-[1]'>
                <Image
                    isBlurred
                    alt="Hero Photo"
                    className='dark:block hidden'
                    src="/C.png"
                />
                <Image
                    isBlurred
                    alt="Hero Photo"
                    className='dark:hidden block'
                    src="/C-black.png"
                />
            </div>


        </section>
    )
}

export default Hero