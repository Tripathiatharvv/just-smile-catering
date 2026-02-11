"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, Users, UtensilsCrossed, Loader2 } from 'lucide-react';
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session && pathname !== "/admin") {
                router.push("/admin");
            }
            setLoading(false);
        };
        checkSession();
    }, [router, pathname]);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-[#D4A24C]" size={32} />
            </div>
        );
    }
    if (pathname === "/admin") {
        return <>{children}</>;
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar - Sticky on desktop */}
            <aside className="w-full md:w-64 bg-[#1a1a1a] text-white flex-shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <div className="font-serif text-xl text-[#FFD447]">Admin Panel</div>
                </div>
                {/* Mobile Navigation could go here if needed, keeping simple for now */}
                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${pathname === "/admin/dashboard" ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <LayoutDashboard size={18} className={pathname === "/admin/dashboard" ? "text-[#D4A24C]" : ""} />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/leads"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${pathname === "/admin/leads" ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <Users size={18} className={pathname === "/admin/leads" ? "text-[#D4A24C]" : ""} />
                        Leads
                    </Link>
                    <Link
                        href="/admin/menu"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${pathname === "/admin/menu" ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <UtensilsCrossed size={18} className={pathname === "/admin/menu" ? "text-[#D4A24C]" : ""} />
                        Menu Manager
                    </Link>
                </nav>
            </aside>
            {/* Main Content - Grows with content */}
            <main className="flex-1 p-4 md:p-8 min-h-screen">
                {children}
            </main>
        </div>
    );
}
