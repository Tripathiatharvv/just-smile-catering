"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, UtensilsCrossed, Users } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const corporateFeatures = [
  {
    title: "Culinary Mastery",
    description: "Our chefs craft menus that are not just meals, but conversation starters. From nutritional balance to exquisite presentation, we redefine corporate dining.",
    icon: UtensilsCrossed,
    image: getCloudinaryUrl("https://res.cloudinary.com/dl4mlw1dl/image/upload/v1769016563/Gemini_Generated_Image_sbsyngsbsyngsbsy_htcdch.png", { width: 1200, format: "auto", quality: "auto" }),
    stat: "500+ Daily Meals"
  },
  {
    title: "Premium Service",
    description: "White-glove service that mirrors the professionalism of your own team. Our staff is trained in elite hospitality standards to ensure seamless execution.",
    icon: Star,
    image: getCloudinaryUrl("https://res.cloudinary.com/dl4mlw1dl/image/upload/v1769016706/Gemini_Generated_Image_l7pcqsl7pcqsl7pc_b0dejq.png", { width: 1200, format: "auto", quality: "auto" }),
    stat: "5-Star Rated"
  },
  {
    title: "Quality Assurance",
    description: "We source only the finest, freshest ingredients with rigorous quality checks. Hygiene and safety are our non-negotiable pillars of operation.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200",
    stat: "100% Fresh"
  },
  {
    title: "Dedicated Teams",
    description: "A specialized workforce for every aspect of your event or daily operations. We integrate perfectly with your company culture.",
    icon: Users,
    image: getCloudinaryUrl("https://res.cloudinary.com/dl4mlw1dl/image/upload/v1769014745/WhatsApp_Image_2026-01-20_at_9.01.47_PM_rko4mw.jpg", { width: 1200, format: "auto", quality: "auto" }),
    stat: "5+ Experts"
  }
];

export function CorporateCateringSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-[#050505] relative w-full font-sans">

      {/* Mobile/Tablet View (Stacked) */}
      <div className="lg:hidden px-4 py-20">
        <div className="text-center mb-16">
          <span className="text-[#D4A24C] uppercase tracking-widest text-sm font-semibold">Corporate Excellence</span>
          <h2 className="text-4xl text-white font-serif mt-4">Elevating Business Dining</h2>
        </div>
        <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
          {corporateFeatures.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="relative h-[400px] w-full rounded-[2rem] overflow-hidden mb-8 shadow-2xl">
                <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-2 mb-2 text-[#D4A24C]">
                    <feature.icon size={20} />
                    <span className="text-sm font-bold uppercase">{feature.stat}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl text-white font-serif mb-4">{feature.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
            </div>
          ))}

          {/* Mobile CTA */}
          <div className="bg-[#D4A24C] rounded-[2rem] p-10 text-center mt-20 md:mt-0 md:col-span-2 md:flex md:items-center md:justify-between md:text-left">
            <h2 className="text-3xl text-[#1a1a1a] font-serif mb-6 md:mb-0">Ready to Transform Your Workplace?</h2>
            <a href="/contact" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-bold whitespace-nowrap">
              Get a Quote <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Desktop View (Sticky Scroll) */}
      <div ref={containerRef} className="hidden lg:flex min-h-[400vh] relative">

        {/* Left Side: Sticky Visuals */}
        <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center bg-[#050505] overflow-hidden">
          <div className="relative w-[40vw] h-[70vh] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
            {corporateFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  scale: activeCard === index ? 1 : 1.1,
                  zIndex: activeCard === index ? 10 : 0
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image src={feature.image} alt={feature.title} fill className="object-cover" priority={index === 0} />
                <div className="absolute inset-0 bg-black/20" />

                {/* Floating Stat Badge */}
                <div className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                  <p className="text-[#D4A24C] text-sm uppercase tracking-widest font-bold mb-1">Impact</p>
                  <p className="text-white text-2xl font-serif">{feature.stat}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4A24C]/10 rounded-full blur-[120px]" />
          </div>
        </div>

        {/* Right Side: Scrollable Content */}
        <div className="w-1/2 relative z-10">
          {corporateFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              setActiveCard={setActiveCard}
            />
          ))}

          {/* Final CTA Card */}
          <div className="h-screen flex items-center justify-center p-20">
            <div className="w-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-[3rem] p-16 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#D4A24C]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />

              <h2 className="text-5xl md:text-6xl text-white font-serif mb-8 relative z-10">
                Partner with <br /> <span className="text-[#D4A24C] italic">Excellence</span>
              </h2>
              <p className="text-gray-400 text-xl mb-12 max-w-lg mx-auto relative z-10">
                Join the industry leaders who trust us with their corporate hospitality needs.
              </p>
              <a href="/contact" className="relative z-10 px-10 py-5 bg-[#D4A24C] text-[#1a1a1a] font-bold text-lg rounded-full inline-flex items-center gap-2 hover:scale-105 transition-transform">
                Start Your Journey <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function FeatureCard({ feature, index, setActiveCard }: { feature: any, index: number, setActiveCard: (i: number) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveCard(index);
    }
  }, [isInView, index, setActiveCard]);

  return (
    <div ref={ref} className="h-screen flex items-center p-20">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="max-w-xl"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center mb-8 text-[#D4A24C]">
          <feature.icon size={32} />
        </div>
        <h2 className="text-5xl md:text-6xl text-white font-serif mb-8 leading-tight">
          {feature.title}
        </h2>
        <p className="text-gray-400 text-xl leading-relaxed">
          {feature.description}
        </p>
      </motion.div>
    </div>
  );
}