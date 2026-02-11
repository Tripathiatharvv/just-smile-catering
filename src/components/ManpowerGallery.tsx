"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Sparkles } from "lucide-react";
const galleryImages = [
    "https://res.cloudinary.com/dl4mlw1dl/image/upload/v1769776055/PHOTO-2026-01-23-22-55-09_2_wmca5c.jpg",
    "https://res.cloudinary.com/dl4mlw1dl/image/upload/v1769776055/PHOTO-2026-01-23-22-55-07_2_srv6mx.jpg",
    "https://res.cloudinary.com/dl4mlw1dl/image/upload/v1769776055/PHOTO-2026-01-23-22-55-09_3_a9o03d.jpg"
];
const videoUrl = "https://res.cloudinary.com/dl4mlw1dl/video/upload/v1769776102/VIDEO-2026-01-23-22-55-10_2_pyftrw.mp4";
export function ManpowerGallery() {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A24C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5A1F1F]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <Sparkles className="text-[#D4A24C]" size={20} />
                        <span className="font-sans text-[#5A1F1F] font-semibold tracking-wider text-sm uppercase">
                            Our Manpower in Action
                        </span>
                        <Sparkles className="text-[#D4A24C]" size={20} />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl md:text-5xl text-[#1a1a1a]"
                    >
                        Professionalism <span className="text-[#FFD447] italic">Visualized</span>
                    </motion.h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative lg:row-span-2 rounded-3xl overflow-hidden shadow-2xl bg-black aspect-[3/4] lg:aspect-auto h-full"
                    >
                        <video
                            src={videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-8 left-8 text-white p-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/30">
                                <Play size={20} fill="currentColor" className="ml-1" />
                            </div>
                            <h3 className="font-serif text-2xl mb-2">Excellence in Motion</h3>
                            <p className="font-sans text-white/80 text-sm">Dedicated staff delivering premium service.</p>
                        </div>
                    </motion.div>
                    {}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 h-full content-between">
                        {galleryImages.map((src, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
                                className={`relative rounded-2xl overflow-hidden shadow-lg group ${index === 2 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
                            >
                                <Image
                                    src={src}
                                    alt={`Hospitality Manpower ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-[#5A1F1F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
