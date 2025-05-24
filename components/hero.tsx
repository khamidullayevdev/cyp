'use client'

import { Button } from '@heroui/button'
import { Image } from '@heroui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
// import { CheckIcon, LightningIcon, PaintIcon, CodeIcon } from '@heroui/icons'

const Hero = () => {
    const router = useRouter()
    
    return (
        <section className="flex min-h-[70vh] items-center flex-col lg:flex-row justify-between gap-[20px]">
            
            <div className="flex flex-col max-w-[100%] lg:max-w-[500px] xl:max-w-[700px] gap-[25px]">
                <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] xl:text-[3.5rem] leading-[1] font-[600]">
                    Build <span className="text-[#df2ef7]">beautiful</span> portfolios with zero design and coding skills.
                </h1>

                <p className="dark:text-gray-400 text-gray-700 text-[1rem] leading-[1.75rem]">Create customizable, responsive portfolios in minutes — no experience required.</p>

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