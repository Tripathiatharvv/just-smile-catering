"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                if (error.message.includes("Invalid login credentials")) {
                    // Check if user is the specific admin we want to seed
                    if (email === "curiousmugnoida@gmail.com" && password === "JustSmile98@$$") {
                        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                            email,
                            password
                        });
                        if (signUpError) throw signUpError;
                        toast.success("Admin account created & logged in!");
                        router.push("/admin/dashboard");
                        return;
                    }
                }
                throw error;
            }
            if (data.session) {
                toast.success("Login successful");
                router.push("/admin/dashboard");
            }
        } catch (error: any) {
            console.error("Login error:", error);
            toast.error(error.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[#D4A24C]/10 rounded-full flex items-center justify-center border border-[#D4A24C]/20">
                        <Lock className="text-[#D4A24C] w-8 h-8" />
                    </div>
                </div>
                <h2 className="text-2xl font-serif text-center mb-2 text-gray-900">
                    Admin Access
                </h2>
                <p className="text-center text-sm text-gray-500 mb-8">
                    Sign in to manage your dashboard
                </p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/20 transition-all outline-none font-sans"
                                placeholder="admin@example.com"
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/20 transition-all outline-none font-sans"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-[#1a1a1a] hover:bg-black text-white rounded-xl font-medium transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Authenticating...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
