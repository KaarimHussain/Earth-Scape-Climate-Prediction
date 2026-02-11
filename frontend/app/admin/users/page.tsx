"use client";

import { useState, useEffect } from "react";
import AdminNavbar from "@/components/admin-navbar";
import { Users, Search, Plus, Trash2, Edit2, X, Check, Loader2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface User {
    _id: string;
    username: string;
    email: string;
    provider: string;
    createdAt: string;
}

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Form States
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            if (res.status === 401) router.push("/admin/login");
            const data = await res.json();
            if (Array.isArray(data)) setUsers(data);
        } catch (err) {
            console.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setUsers([data, ...users]);
                setIsAddModalOpen(false);
                setFormData({ username: "", email: "", password: "" });
            } else {
                setError(data.message || "Failed to create user");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteUser = async () => {
        if (!userToDelete) return;
        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/admin/users/${userToDelete._id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setUsers(users.filter(u => u._id !== userToDelete._id));
                setIsDeleteModalOpen(false);
                setUserToDelete(null);
            } else {
                alert("Failed to delete user");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary font-sans selection:bg-emerald-500/30">
            <AdminNavbar />

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/05 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/05 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div className="w-full md:w-auto">
                        <h1 className="text-4xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 mb-3 tracking-tight font-serif italic">
                            User Management
                        </h1>
                        <p className="text-white/60 text-lg font-light">
                            Manage user accounts and permissions.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20"
                            />
                        </div>

                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-white text-black px-6 py-3 rounded-xl font-medium text-sm hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg shadow-white/5"
                        >
                            <Plus className="w-4 h-4" />
                            Add User
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-[2rem] bg-[#0F0F0F]/60 backdrop-blur-xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 text-white/40 text-xs uppercase tracking-widest font-medium">
                                    <th className="p-6">User</th>
                                    <th className="p-6">Provider</th>
                                    <th className="p-6">Joined</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="p-12 text-center text-white/40">
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Loading users...
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-12 text-center text-white/40">
                                            No users found matching "{searchTerm}"
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className="group hover:bg-white/5 transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center text-white font-bold text-sm">
                                                        {user.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white">{user.username}</div>
                                                        <div className="text-sm text-white/40">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${user.provider === 'email'
                                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                        : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                                    }`}>
                                                    {user.provider}
                                                </span>
                                            </td>
                                            <td className="p-6 text-white/60 text-sm font-mono">
                                                {format(new Date(user.createdAt), "MMM d, yyyy")}
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => {
                                                            setUserToDelete(user);
                                                            setIsDeleteModalOpen(true);
                                                        }}
                                                        className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-8 w-full max-w-md relative"
                        >
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-medium text-white mb-6">Create Account</h2>

                            <form onSubmit={handleAddUser} className="space-y-4">
                                <div>
                                    <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Username</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                        placeholder="johndoe"
                                        value={formData.username}
                                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-white text-black font-bold py-3.5 rounded-xl mt-4 hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? "Creating..." : "Create User"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && userToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-8 w-full max-w-sm relative"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-400">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-medium text-white mb-2">Delete User?</h2>
                                <p className="text-white/60 text-sm mb-6">
                                    Are you sure you want to delete <span className="text-white font-medium">{userToDelete.username}</span>? This action cannot be undone.
                                </p>

                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={() => setIsDeleteModalOpen(false)}
                                        className="flex-1 bg-white/5 text-white py-3 rounded-xl hover:bg-white/10 transition-colors font-medium text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteUser}
                                        disabled={isSubmitting}
                                        className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors font-medium text-sm disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
