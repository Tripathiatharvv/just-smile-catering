"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
    Plus,
    Edit2,
    Trash2,
    ChevronDown,
    ChevronRight,
    Save,
    X,
    Loader2,
    MoreVertical,
} from "lucide-react";
import { toast } from "sonner";
type Dish = {
    id: string;
    name: string;
    description: string;
    dietary: string[];
    spice_level?: number;
    sort_order: number;
};
type SubCategory = {
    id: string;
    name: string;
    menu_items: Dish[];
    sort_order: number;
};
type Cuisine = {
    id: string;
    name: string;
    tagline: string;
    icon_name: string;
    menu_subcategories: SubCategory[];
    sort_order: number;
};
export default function MenuManagerPage() {
    const [menuData, setMenuData] = useState<Cuisine[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"cuisine" | "subcategory" | "dish">("cuisine");
    const [editingItem, setEditingItem] = useState<any>(null);
    const [parentId, setParentId] = useState<string | null>(null); 
    useEffect(() => {
        fetchMenu();
    }, []);
    const fetchMenu = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("menu_cuisines")
                .select(`
          *,
          menu_subcategories (
            *,
            menu_items (*)
          )
        `)
                .order("sort_order", { ascending: true });
            if (error) throw error;
            if (data) {
                const sortedData = data.map((cuisine: any) => ({
                    ...cuisine,
                    menu_subcategories: cuisine.menu_subcategories
                        .sort((a: any, b: any) => a.sort_order - b.sort_order)
                        .map((sub: any) => ({
                            ...sub,
                            menu_items: sub.menu_items.sort((a: any, b: any) => a.sort_order - b.sort_order),
                        })),
                }));
                setMenuData(sortedData);
            }
        } catch (error) {
            console.error("Error fetching menu:", error);
            toast.error("Failed to load menu");
        } finally {
            setLoading(false);
        }
    };
    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const handleDelete = async (type: "cuisine" | "subcategory" | "dish", id: string) => {
        if (!confirm("Are you sure? This action cannot be undone.")) return;
        try {
            const table =
                type === "cuisine"
                    ? "menu_cuisines"
                    : type === "subcategory"
                        ? "menu_subcategories"
                        : "menu_items";
            const { error } = await supabase.from(table).delete().eq("id", id);
            if (error) throw error;
            toast.success(`${type} deleted successfully`);
            fetchMenu();
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete item");
        }
    };
    const openModal = (
        type: "cuisine" | "subcategory" | "dish",
        item: any = null,
        parent: string | null = null
    ) => {
        setModalType(type);
        setEditingItem(item);
        setParentId(parent);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setParentId(null);
    };
    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-[#1a1a1a]">Menu Manager</h1>
                    <p className="text-gray-500 mt-1">Manage cuisines, categories, and dishes</p>
                </div>
                <button
                    onClick={() => openModal("cuisine")}
                    className="flex items-center gap-2 bg-[#D4A24C] text-white px-4 py-2 rounded-lg hover:bg-[#b88b3b] transition-colors shadow-sm"
                >
                    <Plus size={18} /> Add Cuisine
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-[#D4A24C]" size={40} />
                </div>
            ) : (
                <div className="space-y-4">
                    {menuData.map((cuisine) => (
                        <div
                            key={cuisine.id}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                        >
                            <div className="flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => toggleExpand(cuisine.id)}
                                        className="p-1 hover:bg-gray-200 rounded text-gray-500"
                                    >
                                        {expanded[cuisine.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                    </button>
                                    <div>
                                        <h3 className="font-medium text-lg text-gray-900">{cuisine.name}</h3>
                                        <p className="text-xs text-gray-500">{cuisine.tagline}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openModal("subcategory", null, cuisine.id)}
                                        className="p-2 text-[#D4A24C] hover:bg-[#D4A24C]/10 rounded-lg text-sm flex items-center gap-1"
                                    >
                                        <Plus size={14} /> Subcategory
                                    </button>
                                    <button
                                        onClick={() => openModal("cuisine", cuisine)}
                                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete("cuisine", cuisine.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            {expanded[cuisine.id] && (
                                <div className="p-4 pt-0 border-t border-gray-100">
                                    {cuisine.menu_subcategories.length === 0 ? (
                                        <div className="text-center py-4 text-gray-400 text-sm italic">
                                            No subcategories yet.
                                        </div>
                                    ) : (
                                        <div className="space-y-3 mt-4">
                                            {cuisine.menu_subcategories.map((sub) => (
                                                <div
                                                    key={sub.id}
                                                    className="pl-4 border-l-2 border-gray-100 ml-2"
                                                >
                                                    <div className="flex items-center justify-between py-2 group">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => toggleExpand(sub.id)}
                                                                className="p-1 hover:bg-gray-100 rounded text-gray-400"
                                                            >
                                                                {expanded[sub.id] ? (
                                                                    <ChevronDown size={14} />
                                                                ) : (
                                                                    <ChevronRight size={14} />
                                                                )}
                                                            </button>
                                                            <span className="font-medium text-gray-700">{sub.name}</span>
                                                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                                                {sub.menu_items.length} items
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => openModal("dish", null, sub.id)}
                                                                className="p-1.5 text-[#D4A24C] hover:bg-[#D4A24C]/10 rounded text-xs flex items-center gap-1"
                                                            >
                                                                <Plus size={12} /> Item
                                                            </button>
                                                            <button
                                                                onClick={() => openModal("subcategory", sub)}
                                                                className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded"
                                                            >
                                                                <Edit2 size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete("subcategory", sub.id)}
                                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {expanded[sub.id] && (
                                                        <div className="ml-6 space-y-2 mt-1">
                                                            {sub.menu_items.map((dish) => (
                                                                <div
                                                                    key={dish.id}
                                                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group border border-transparent hover:border-gray-100"
                                                                >
                                                                    <div>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-sm font-medium text-gray-800">
                                                                                {dish.name}
                                                                            </span>
                                                                            <div className="flex gap-1">
                                                                                {dish.dietary.map((d) => (
                                                                                    <span
                                                                                        key={d}
                                                                                        className={`w-2 h-2 rounded-full ${d === "veg"
                                                                                                ? "bg-green-500"
                                                                                                : d === "non-veg"
                                                                                                    ? "bg-red-500"
                                                                                                    : "bg-green-400"
                                                                                            }`}
                                                                                        title={d}
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 truncate max-w-md">
                                                                            {dish.description}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <button
                                                                            onClick={() => openModal("dish", dish, sub.id)}
                                                                            className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded"
                                                                        >
                                                                            <Edit2 size={14} />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDelete("dish", dish.id)}
                                                                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                                                        >
                                                                            <Trash2 size={14} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {sub.menu_items.length === 0 && (
                                                                <div className="text-xs text-gray-400 italic py-1">
                                                                    No items yet.
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <MenuForm
                            type={modalType}
                            item={editingItem}
                            parentId={parentId}
                            onClose={closeModal}
                            onSuccess={() => {
                                fetchMenu();
                                closeModal();
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
function MenuForm({
    type,
    item,
    parentId,
    onClose,
    onSuccess,
}: {
    type: "cuisine" | "subcategory" | "dish";
    item?: any;
    parentId?: string | null;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        name: "",
        tagline: "",
        icon_name: "Flame",
        description: "",
        price: "",
        dietary: "veg", 
        spice_level: 0,
        ...item,
    });
    useEffect(() => {
        if (item && type === "dish") {
            setFormData({
                ...item,
                dietary: item.dietary && item.dietary.length > 0 ? item.dietary[0] : "veg",
            });
        }
    }, [item, type]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (type === "cuisine") {
                const payload = {
                    name: formData.name,
                    tagline: formData.tagline,
                    icon_name: formData.icon_name,
                };
                if (item) {
                    await supabase.from("menu_cuisines").update(payload).eq("id", item.id);
                } else {
                    await supabase.from("menu_cuisines").insert([payload]);
                }
            } else if (type === "subcategory") {
                const payload = {
                    name: formData.name,
                    cuisine_id: parentId, 
                };
                if (item) {
                    await supabase.from("menu_subcategories").update({ name: formData.name }).eq("id", item.id);
                } else {
                    await supabase.from("menu_subcategories").insert([payload]);
                }
            } else if (type === "dish") {
                const payload = {
                    name: formData.name,
                    description: formData.description,
                    dietary: [formData.dietary], 
                    spice_level: parseInt(formData.spice_level) || null,
                    subcategory_id: parentId, 
                };
                if (item) {
                    const { subcategory_id, ...updatePayload } = payload;
                    await supabase.from("menu_items").update(updatePayload).eq("id", item.id);
                } else {
                    await supabase.from("menu_items").insert([payload]);
                }
            }
            toast.success("Saved successfully");
            onSuccess();
        } catch (error) {
            console.error("Save error:", error);
            toast.error("Failed to save");
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-serif text-xl border-b-0">
                    {item ? "Edit" : "Add"}{" "}
                    {type === "cuisine"
                        ? "Cuisine"
                        : type === "subcategory"
                            ? "Subcategory"
                            : "Dish"}
                </h3>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-900"
                >
                    <X size={20} />
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                {type === "cuisine" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tagline
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
                                value={formData.tagline}
                                onChange={(e) =>
                                    setFormData({ ...formData, tagline: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Icon Name (Lucide)
                            </label>
                            <select
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
                                value={formData.icon_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, icon_name: e.target.value })
                                }
                            >
                                <option value="Flame">Flame</option>
                                <option value="Crown">Crown</option>
                                <option value="Soup">Soup</option>
                                <option value="Wine">Wine</option>
                                <option value="Globe">Globe</option>
                                <option value="Leaf">Leaf</option>
                                <option value="Coffee">Coffee</option>
                                <option value="IceCream">IceCream</option>
                                <option value="GlassWater">GlassWater</option>
                            </select>
                        </div>
                    </>
                )}
                {type === "dish" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
                                rows={3}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Dietary
                                </label>
                                <select
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
                                    value={formData.dietary}
                                    onChange={(e) =>
                                        setFormData({ ...formData, dietary: e.target.value })
                                    }
                                >
                                    <option value="veg">Vegetarian</option>
                                    <option value="non-veg">Non-Vegetarian</option>
                                    <option value="vegan">Vegan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Spice Level (0-3)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="3"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
                                    value={formData.spice_level || 0}
                                    onChange={(e) =>
                                        setFormData({ ...formData, spice_level: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="p-4 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Save
                </button>
            </div>
        </form>
    );
}
