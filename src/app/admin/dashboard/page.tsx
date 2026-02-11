"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut, Trash2, Mail, Phone, Calendar, User, TrendingUp, Eye, MousePointer } from "lucide-react";
import { format } from "date-fns";
type Lead = {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    service_type: string;
    status: string;
};
export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [stats, setStats] = useState({
        totalViews: 0,
        todayViews: 0,
        totalLeads: 0,
    });
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        fetchDashboardData();
    }, []);
    const fetchDashboardData = async () => {
        try {
            const { data: leadsData, error: leadsError } = await supabase
                .from("leads")
                .select("*")
                .order("created_at", { ascending: false });
            if (leadsError) throw leadsError;
            setLeads(leadsData || []);
            const { count: totalViews, error: viewsError } = await supabase
                .from("analytics_events")
                .select("*", { count: 'exact', head: true })
                .eq('event_name', 'page_view');
            const { count: todayViews } = await supabase
                .from("analytics_events")
                .select("*", { count: 'exact', head: true })
                .eq('event_name', 'page_view')
                .gte('created_at', new Date().toISOString().split('T')[0]);
            if (!viewsError) {
                setStats({
                    totalViews: totalViews || 0,
                    todayViews: todayViews || 0,
                    totalLeads: leadsData?.length || 0,
                })
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };
    const deleteLead = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;
        try {
            const { error } = await supabase.from("leads").delete().eq("id", id);
            if (error) throw error;
            toast.success("Lead deleted");
            fetchDashboardData();
        } catch (error) {
            toast.error("Failed to delete lead");
        }
    };
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin");
    };
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D4A24C]"></div>
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back, Admin</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                        <Eye size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Page Views</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.totalViews}</h3>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <TrendingUp size={12} /> Live Data
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                        <MousePointer size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Views Today</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.todayViews}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                        <User size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Leads</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.totalLeads}</h3>
                    </div>
                </div>
            </div>
            {/* Recent Leads Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Service</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Message</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                        {format(new Date(lead.created_at), "MMM d, yyyy")}
                                        <div className="text-xs text-gray-400">{format(new Date(lead.created_at), "HH:mm")}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{lead.name}</div>
                                        <div className="text-xs text-gray-500 flex flex-col gap-0.5 mt-1">
                                            <span className="flex items-center gap-1"><Mail size={10} /> {lead.email}</span>
                                            <span className="flex items-center gap-1"><Phone size={10} /> {lead.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D4A24C]/10 text-[#8c6b32]">
                                            {lead.service_type || "General"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                                        <div className="line-clamp-2" title={lead.message}>
                                            {lead.message}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => deleteLead(lead.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"
                                            title="Delete Lead"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {leads.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        No leads found yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
