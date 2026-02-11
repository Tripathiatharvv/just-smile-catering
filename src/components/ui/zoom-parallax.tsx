"use client";
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
interface ImageType {
    src: string;
    alt?: string;
}
interface ZoomParallaxProps {
    images: ImageType[];
}
export function ZoomParallax({ images }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });
    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
    const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];
    const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
    return (
        <div ref={container} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen overflow-hidden bg-[#020202]">
                {images.map(({ src, alt }, index) => {
                    const scale = scales[index % scales.length];
                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
                        >
                            <div className="relative h-[25vh] w-[25vw] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={src || '/placeholder.svg'}
                                    alt={alt || `Parallax image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </div>
                        </motion.div>
                    );
                })}
                {}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.5, 0]) }}
                        className="text-center"
                    >
                        <h2 className="font-serif text-5xl md:text-7xl text-white mb-4 shadow-black drop-shadow-2xl">
                            Corporate <span className="text-[#CAA845] italic">Excellence</span>
                        </h2>
                        <p className="text-white/80 font-sans text-lg md:text-xl max-w-xl mx-auto drop-shadow-md">
                            Elevating business dining with precision, taste, and impeccable service.
                        </p>
                    </motion.div>
                </div>
                {}
                <motion.div
                    style={{ opacity }}
                    className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                >
                    <div className="bg-black/40 backdrop-blur-md p-12 rounded-[3rem] border border-white/10 text-center pointer-events-auto">
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
                            Experience <span className="text-[#CAA845] italic">Perfection</span>
                        </h2>
                        <a href="/contact" className="inline-block px-8 py-4 bg-[#CAA845] text-[#1a1a1a] rounded-full font-sans font-bold hover:scale-105 transition-transform">
                            Partner With Us
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
