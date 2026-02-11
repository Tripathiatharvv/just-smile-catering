"use client";
import { useState } from "react";
import { Search, Trash2, Mail, Phone, Calendar } from "lucide-react";
const initialLeads = [
    { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", subject: "Wedding Catering", message: "Looking for catering for 500 pax wedding in Dec.", date: "2024-01-28", status: "New" },
    { id: 2, name: "Priya Patel", email: "priya@corp.com", phone: "+91 98989 89898", subject: "Corporate Lunch", message: "Daily lunch service for 50 employees.", date: "2024-01-27", status: "Contacted" },
];
export default function LeadsPage() {
    const [leads, setLeads] = useState(initialLeads);
    const [search, setSearch] = useState("");
    const filteredLeads = leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()));
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif text-[#1a1a1a]">Leads Management</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#D4A24C]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-6 font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Name/Contact</th>
                            <th className="p-6 font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject/Message</th>
                            <th className="p-6 font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="p-6 font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="p-6 font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-6">
                                    <div className="font-semibold text-[#1a1a1a]">{lead.name}</div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1"><Mail size={12} /> {lead.email}</div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1"><Phone size={12} /> {lead.phone}</div>
                                </td>
                                <td className="p-6 max-w-xs">
                                    <div className="font-medium text-[#1a1a1a] mb-1">{lead.subject}</div>
                                    <p className="text-sm text-gray-500 line-clamp-2">{lead.message}</p>
                                </td>
                                <td className="p-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-2"><Calendar size={14} /> {lead.date}</div>
                                </td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${lead.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
