"use client";
import { motion } from "framer-motion";
import Image from "next/image";
interface PageHeroProps {
    title: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
}
export function PageHero({ title, subtitle, imageSrc, imageAlt }: PageHeroProps) {
    return (
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
            <div className="absolute inset-0 z-0 opacity-40">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    priority
                    className="object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1a1a1a] z-0" />
            <div className="relative z-10 text-center px-4 pt-20">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-5xl md:text-7xl text-white mb-6"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-sans text-xl text-white/80 max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>
            </div>
        </section>
    );
}
