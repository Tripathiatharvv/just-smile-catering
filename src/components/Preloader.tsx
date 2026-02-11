"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat } from "lucide-react";
export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => setIsLoading(false), 2000);
        };
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex flex-col items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative w-24 h-24 mb-6">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-4 border-[#FFD447]/20 border-t-[#FFD447]"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ChefHat size={40} className="text-[#FFD447]" />
                            </div>
                        </div>
                        <h2 className="font-serif text-3xl text-white mb-2">
                            Just Smile
                            <span className="text-[#FFD447]">.</span>
                        </h2>
                        <p className="font-sans text-white/60 tracking-widest text-sm uppercase">
                            Preparing Excellence
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
