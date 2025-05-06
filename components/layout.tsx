'use client'

import React from 'react'
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { Providers } from '@/app/providers';

const LayoutComponent = ({children,}: {children: React.ReactNode;}) => {
    const pathname = usePathname();
    const isTemplatePage = pathname.startsWith("/template/");

      return (
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
                {!isTemplatePage && <Navbar />}
                {!isTemplatePage ? (
                    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                    {children}
                    </main>
                ) : (
                    <>{children}</>
                )}
                {!isTemplatePage && <Footer />}
            </div>
        </Providers>
    )
}

export default LayoutComponent