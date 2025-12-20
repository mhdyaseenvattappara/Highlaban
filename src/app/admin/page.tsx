'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Save, Eye, EyeOff, ChevronUp, ChevronDown, Plus, Trash2,
    Layout, ShoppingBag, Settings, Image as ImageIcon,
    Search, Bell, Menu, X, Upload, MoreHorizontal,
    BarChart3, Calendar, CheckCircle2, AlertCircle,
    MapPin, Mail as MailIcon, Trash, Edit3, PlusCircle, Phone as PhoneIcon, User, Users, Shield, LogOut
} from 'lucide-react';

// --- Types ---

interface SectionConfig {
    id: string;
    type: string;
    isVisible: boolean;
    content?: any;
}

interface PageConfig {
    sections: SectionConfig[];
}

interface Product {
    name: string;
    price: number;
    tag?: string;
    tagline?: string;
    description: string;
    isNew?: boolean;
    image?: string;
}

interface Message {
    id: string;
    name: string;
    phone: string;
    subject: string;
    message: string;
    date: string;
    read: boolean;
}

interface Location {
    city: string;
    address: string;
    status: string;
    statusColor: string;
    isComingSoon?: boolean;
}

interface UserData {
    id: string;
    name: string;
    username: string;
    role: 'user' | 'admin' | 'super_admin';
    image?: string;
    password?: string;
}

// --- Components ---

const LoadingSpinner = () => (
    <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
);

// --- Main Page Component ---

export default function AdminDashboard() {
    // Auth State
    // Auth State
    const [user, setUser] = useState<UserData | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showProfile, setShowProfile] = useState(false);

    // Dashboard State
    const [activeTab, setActiveTab] = useState<'dashboard' | 'layout' | 'products' | 'locations' | 'inbox' | 'users'>('dashboard');
    const [config, setConfig] = useState<PageConfig | null>(null);
    const [products, setProducts] = useState<{ products: Product[] } | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);

    // UI State
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Editing State (for Layout Tab)
    const [editSectionId, setEditSectionId] = useState<string | null>(null);
    // User Modal State
    const [showUserModal, setShowUserModal] = useState(false);

    // Helpers
    const fileInputRef = useRef<HTMLInputElement>(null);
    const pendingUploadRef = useRef<{
        type: 'product' | 'content' | 'profile',
        id?: string, // section id
        index?: number, // product index or array index
        key?: string, // content key
        subKey?: string // array item key
    } | null>(null);

    // --- Effects ---

    useEffect(() => {
        if (!user) return;
        loadData();
    }, [user]);

    // --- Actions ---

    const loadData = async () => {
        setLoading(true);
        try {
            const responses = await Promise.all([
                fetch('/api/admin/config'),
                fetch('/api/admin/products'),
                fetch('/api/admin/messages'),
                fetch('/api/admin/locations'),
                user?.role === 'super_admin' ? fetch('/api/admin/users') : Promise.resolve(null)
            ]);

            const [configRes, productsRes, messagesRes, locationsRes, userRes] = responses;

            setConfig(await configRes.json());
            setProducts(await productsRes.json());

            const msgs = await messagesRes.json();
            setMessages(Array.isArray(msgs) ? msgs : []);

            const locs = await locationsRes.json();
            setLocations(Array.isArray(locs) ? locs : []);

            if (userRes) {
                const usersData = await userRes.json();
                setUsers(Array.isArray(usersData) ? usersData : []);
            }
        } catch (err) {
            console.error('Failed to load data', err);
            showMessage('error', 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (data.success) {
                setUser(data.user);
                showMessage('success', `Welcome back, ${data.user.name}`);
            } else {
                showMessage('error', data.error || 'Invalid credentials');
            }
        } catch (err) {
            showMessage('error', 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const triggerImageUpload = (params: typeof pendingUploadRef.current) => {
        pendingUploadRef.current = params;
        fileInputRef.current?.click();
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !pendingUploadRef.current) return;

        const target = pendingUploadRef.current;
        setUploading('uploading'); // Simple loading state

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
            const data = await res.json();

            if (data.success) {
                if (target.type === 'product' && products && target.index !== undefined) {
                    const newProducts = [...products.products];
                    newProducts[target.index].image = data.url;
                    setProducts({ products: newProducts });
                } else if (target.type === 'content' && config && target.id) {
                    const newConfig = { ...config };
                    const sectionIdx = newConfig.sections.findIndex(s => s.id === target.id);
                    if (sectionIdx === -1) throw new Error("Section not found");

                    if (target.key && target.index !== undefined && target.subKey) {
                        // Array item update
                        newConfig.sections[sectionIdx].content[target.key][target.index][target.subKey] = data.url;
                    } else if (target.key) {
                        // Direct field update
                        newConfig.sections[sectionIdx].content[target.key] = data.url;
                    }
                    setConfig(newConfig);
                } else if (target.type === 'profile') {
                    // Profile Image Update
                    setUser({ ...user, image: data.url });
                }
                showMessage('success', 'Image uploaded successfully');
            } else {
                throw new Error(data.error);
            }
        } catch (err) {
            console.error(err);
            showMessage('error', 'Upload failed');
        } finally {
            setUploading(null);
            pendingUploadRef.current = null;
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const saveChanges = async () => {
        setSaving(true);
        try {
            await Promise.all([
                fetch('/api/admin/config', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(config),
                }),
                fetch('/api/admin/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(products),
                }),
                fetch('/api/admin/locations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(locations),
                })
            ]);
            showMessage('success', 'Changes synced to live site');
        } catch (err) {
            console.error(err);
            showMessage('error', 'Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    // --- Renderers ---

    // 1. Text Field Renderer
    const renderField = (label: string, value: any, onChange: (val: any) => void, isTextArea = false) => (
        <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
            {isTextArea ? (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all min-h-[80px]"
                />
            ) : (
                <input
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
            )}
        </div>
    );

    // 2. Image Renderer
    const renderImageField = (label: string, value: string, onUpload: () => void) => (
        <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 relative group cursor-pointer" onClick={onUpload}>
                    {value ? (
                        <div className="w-full h-full p-2 bg-white flex items-center justify-center">
                            <img src={value} className="max-w-full max-h-full object-contain" />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <ImageIcon size={20} />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Upload size={16} />
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-xs text-slate-500 truncate mb-2">{value ? 'Image set' : 'No image selected'}</p>
                    <button
                        onClick={onUpload}
                        className="text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all"
                    >
                        Upload New
                    </button>
                </div>
            </div>
        </div>
    );

    // --- Views ---

    if (!user) return (
        <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center p-6 font-sans text-slate-800">
            <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                <div className="mb-10 text-center">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl">
                        <BarChart3 size={32} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight mb-2">HighLaban OS</h1>
                    <p className="text-slate-400 text-sm font-medium">Authenticity Management System</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="admin"
                                className="w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl text-lg font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all tracking-widest"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Access Key</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl text-lg font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-center tracking-widest"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95">
                        Initialize
                    </button>
                </form>
            </div>
        </div>
    );

    if (loading) return (
        <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <LoadingSpinner />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syncing Data...</p>
            </div>
        </div>
    );

    // Filter Products
    const filteredProducts = products?.products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="min-h-screen bg-[#F3F3F3] font-sans text-slate-900 flex flex-col md:flex-row overflow-hidden">
            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />

            {/* --- SIDEBAR --- */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:w-24 lg:w-72 md:shrink-0 flex flex-col py-8 px-4 lg:px-6`}>
                <div className="flex items-center gap-4 mb-12 px-2">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg overflow-hidden">
                        <img src="/uploads/logo.png" alt="HighLaban" className="w-full h-full object-cover" />
                    </div>
                    <div className="md:hidden lg:block">
                        <h2 className="font-bold text-lg tracking-tight">HighLaban</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Admin</p>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="md:hidden ml-auto text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { id: 'dashboard', icon: BarChart3, label: 'Overview' },
                        { id: 'layout', icon: Layout, label: 'Visual Layout' },
                        { id: 'products', icon: ShoppingBag, label: 'Products' },
                        { id: 'locations', icon: MapPin, label: 'Locations' },
                        { id: 'inbox', icon: MailIcon, label: 'Inbox' },
                        ...(user.role === 'super_admin' ? [{ id: 'users', icon: Users, label: 'Users' }] : [])
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id as any); setMobileMenuOpen(false); }}
                            className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all group relative
                                ${activeTab === item.id ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} />
                            <span className="font-bold text-sm md:hidden lg:block">{item.label}</span>
                            {activeTab === item.id && (
                                <span className="absolute right-3 w-1.5 h-1.5 bg-blue-500 rounded-full md:hidden lg:block" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-slate-50">
                    <button onClick={() => setUser(null)} className="flex items-center gap-4 p-3 text-red-400 hover:bg-red-50 rounded-2xl w-full transition-all">
                        <LogOut size={20} />
                        <span className="font-bold text-sm md:hidden lg:block">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {mobileMenuOpen && <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />}

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">

                {/* Header */}
                <header className="h-20 px-6 md:px-10 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-100 md:bg-transparent md:border-none shrink-0 z-30 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-xl bg-white border border-slate-100 text-slate-500">
                            <Menu size={20} />
                        </button>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="relative group hidden sm:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-64 pl-12 pr-4 py-3 bg-white rounded-full border-none shadow-sm text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300"
                            />
                        </div>

                        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

                        <div className="flex items-center gap-3">
                            <button
                                onClick={saveChanges}
                                disabled={saving}
                                className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2"
                            >
                                {saving ? <LoadingSpinner /> : <Save size={16} />}
                                <span className="hidden sm:inline">Save Changes</span>
                            </button>
                            <div
                                className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => setShowProfile(true)}
                            >
                                <img src={user.image} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
                    <AnimatePresence mode="wait">

                        {/* --- TAB: DASHBOARD --- */}
                        {activeTab === 'dashboard' && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6 max-w-7xl mx-auto"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Active Sections', val: config?.sections.filter(s => s.isVisible).length || 0, icon: Layout, color: 'text-violet-600' },
                                        { label: 'Total Products', val: products?.products.length || 0, icon: ShoppingBag, color: 'text-blue-600' },
                                        { label: 'System Status', val: 'Online', icon: CheckCircle2, color: 'text-emerald-500' },
                                        { label: 'Pending Updates', val: 0, icon: AlertCircle, color: 'text-amber-500' },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-slate-50">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                                                    <stat.icon size={24} />
                                                </div>
                                                <button className="p-2 text-slate-300 hover:text-slate-600"><MoreHorizontal size={18} /></button>
                                            </div>
                                            <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.val}</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 bg-white rounded-[40px] p-8 shadow-sm h-min">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
                                            <button className="text-xs font-bold text-blue-500 uppercase tracking-widest hover:text-blue-600">View All</button>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <p className="text-sm font-medium text-slate-600">System validated and ready for updates.</p>
                                                <span className="ml-auto text-xs font-bold text-slate-400">NOW</span>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                <p className="text-sm font-medium text-slate-600">Product list synced successfully.</p>
                                                <span className="ml-auto text-xs font-bold text-slate-400">2h ago</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-[40px] p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                                        <div className="relative z-10">
                                            <h3 className="text-2xl font-bold mb-2">Live Preview</h3>
                                            <p className="text-slate-400 text-sm font-medium">Check your changes in real-time environment.</p>
                                        </div>
                                        <div className="relative z-10">
                                            <a href="/" target="_blank" className="inline-flex items-center justify-center w-full py-4 bg-white text-slate-900 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                                                Open Website
                                            </a>
                                        </div>
                                        {/* Decorative blob */}
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-[60px]" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* --- TAB: LAYOUT --- */}
                        {activeTab === 'layout' && config && (
                            <motion.div
                                key="layout"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-4xl mx-auto space-y-4 pb-20"
                            >
                                <div className="bg-white p-6 rounded-[32px] shadow-sm mb-6 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">Section Manager</h2>
                                        <p className="text-sm text-slate-400 font-medium">Drag to reorder, click to edit.</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const id = prompt('Enter new section ID:');
                                            if (id) setConfig({ ...config, sections: [...config.sections, { id, type: id.charAt(0).toUpperCase() + id.slice(1), isVisible: true, content: {} }] });
                                        }}
                                        className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-all shadow-lg"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>

                                {config.sections.map((section, index) => (
                                    <div key={section.id} className="group">
                                        <div className={`bg-white rounded-[24px] shadow-sm border border-transparent hover:border-slate-100 transition-all overflow-hidden ${editSectionId === section.id ? 'ring-2 ring-blue-500/10' : ''}`}>
                                            {/* Header Row */}
                                            <div className="p-4 flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-400">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-slate-800 capitalize">{section.id}</h3>
                                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                                        {Object.keys(section.content || {}).length} Fields
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            if (confirm(`Are you sure you want to delete the "${section.id}" section?`)) {
                                                                const newSections = config.sections.filter(s => s.id !== section.id);
                                                                setConfig({ ...config, sections: newSections });
                                                            }
                                                        }}
                                                        className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                                        title="Delete Section"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>

                                                    <button onClick={() => {
                                                        const newSections = [...config.sections];
                                                        newSections[index].isVisible = !newSections[index].isVisible;
                                                        setConfig({ ...config, sections: newSections });
                                                    }} className={`p-2 rounded-xl transition-all ${section.isVisible ? 'text-blue-500 bg-blue-50' : 'text-slate-300 bg-slate-50'}`}>
                                                        {section.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                                    </button>

                                                    <div className="flex flex-col gap-1">
                                                        <button
                                                            disabled={index === 0}
                                                            onClick={() => {
                                                                const newSections = [...config.sections];
                                                                [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
                                                                setConfig({ ...config, sections: newSections });
                                                            }}
                                                            className="text-slate-300 hover:text-slate-600 disabled:opacity-30"
                                                        >
                                                            <ChevronUp size={14} />
                                                        </button>
                                                        <button
                                                            disabled={index === config.sections.length - 1}
                                                            onClick={() => {
                                                                const newSections = [...config.sections];
                                                                [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
                                                                setConfig({ ...config, sections: newSections });
                                                            }}
                                                            className="text-slate-300 hover:text-slate-600 disabled:opacity-30"
                                                        >
                                                            <ChevronDown size={14} />
                                                        </button>
                                                    </div>

                                                    {section.id.toLowerCase() !== 'locations' && (
                                                        <button
                                                            onClick={() => setEditSectionId(editSectionId === section.id ? null : section.id)}
                                                            className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${editSectionId === section.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                                        >
                                                            {editSectionId === section.id ? 'Done' : 'Edit'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Edit Panel */}
                                            <AnimatePresence>
                                                {editSectionId === section.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="border-t border-slate-50 bg-slate-50/50"
                                                    >
                                                        <div className="p-6 space-y-6">
                                                            {Object.keys(section.content || {}).map(key => {
                                                                const val = section.content[key];
                                                                const isArray = Array.isArray(val);
                                                                const isImage = key.toLowerCase().includes('image') || key.toLowerCase().includes('icon');

                                                                if (isArray) {
                                                                    // Array Editor (e.g. Features list)
                                                                    return (
                                                                        <div key={key} className="space-y-3">
                                                                            <div className="flex items-center justify-between">
                                                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                                                    <div className="w-1 h-1 bg-blue-500 rounded-full" />
                                                                                    {key} List
                                                                                </label>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        const newConfig = { ...config };
                                                                                        if (val.length > 0 && typeof val[0] === 'string') {
                                                                                            newConfig.sections[index].content[key].push("New Item");
                                                                                        } else {
                                                                                            const template = val.length > 0 ? { ...val[0] } : {};
                                                                                            Object.keys(template).forEach(k => template[k] = "New Item");
                                                                                            newConfig.sections[index].content[key].push(template);
                                                                                        }
                                                                                        setConfig(newConfig);
                                                                                    }}
                                                                                    className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:text-blue-600"
                                                                                >
                                                                                    + Add Item
                                                                                </button>
                                                                            </div>
                                                                            <div className="space-y-4">
                                                                                {val.map((item: any, idx: number) => {
                                                                                    // Handle String Array (Simple List)
                                                                                    if (typeof item === 'string') {
                                                                                        return (
                                                                                            <div key={idx} className="flex gap-2">
                                                                                                <input
                                                                                                    value={item}
                                                                                                    onChange={(e) => {
                                                                                                        const newConfig = { ...config };
                                                                                                        newConfig.sections[index].content[key][idx] = e.target.value;
                                                                                                        setConfig(newConfig);
                                                                                                    }}
                                                                                                    className="flex-1 bg-white border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none"
                                                                                                />
                                                                                                <button
                                                                                                    onClick={() => {
                                                                                                        const newConfig = { ...config };
                                                                                                        newConfig.sections[index].content[key].splice(idx, 1);
                                                                                                        setConfig(newConfig);
                                                                                                    }}
                                                                                                    className="p-3 text-slate-300 hover:text-red-500 bg-white border border-slate-200 rounded-xl"
                                                                                                >
                                                                                                    <Trash2 size={16} />
                                                                                                </button>
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                    // Handle Object Array (Complex List)
                                                                                    return (
                                                                                        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 relative group/item">
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    const newConfig = { ...config };
                                                                                                    newConfig.sections[index].content[key].splice(idx, 1);
                                                                                                    setConfig(newConfig);
                                                                                                }}
                                                                                                className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all"
                                                                                            >
                                                                                                <Trash2 size={14} />
                                                                                            </button>

                                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                                {Object.keys(item).map(subKey => {
                                                                                                    const isSubImage = subKey.toLowerCase().includes('image') || subKey.toLowerCase().includes('icon');
                                                                                                    if (isSubImage) {
                                                                                                        return (
                                                                                                            <div key={subKey}>
                                                                                                                {renderImageField(subKey, item[subKey], () =>
                                                                                                                    triggerImageUpload({ type: 'content', id: section.id, key, index: idx, subKey })
                                                                                                                )}
                                                                                                            </div>
                                                                                                        );
                                                                                                    }
                                                                                                    return (
                                                                                                        <div key={subKey}>
                                                                                                            {renderField(subKey, item[subKey], (newVal) => {
                                                                                                                const newConfig = { ...config };
                                                                                                                newConfig.sections[index].content[key][idx][subKey] = newVal;
                                                                                                                setConfig(newConfig);
                                                                                                            })}
                                                                                                        </div>
                                                                                                    );
                                                                                                })}
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }

                                                                // String/Image Field
                                                                if (isImage) {
                                                                    return (
                                                                        <div key={key}>
                                                                            {renderImageField(key, val, () =>
                                                                                triggerImageUpload({ type: 'content', id: section.id, key })
                                                                            )}
                                                                        </div>
                                                                    );
                                                                }

                                                                return (
                                                                    <div key={key}>
                                                                        {renderField(key, val, (newVal) => {
                                                                            const newConfig = { ...config };
                                                                            newConfig.sections[index].content[key] = newVal;
                                                                            setConfig(newConfig);
                                                                        }, val.length > 50)}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* --- TAB: PRODUCTS --- */}
                        {activeTab === 'products' && products && (
                            <motion.div
                                key="products"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-6 max-w-7xl mx-auto pb-20"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-slate-800">Products Catalog</h2>
                                    <button
                                        onClick={() => {
                                            const newProduct: Product = {
                                                name: "New Dessert",
                                                price: 0,
                                                description: "Delicious chocolate dessert...",
                                                tagline: "Sweet Treat"
                                            };
                                            setProducts({ products: [...products.products, newProduct] });
                                            // Ideally scroll to bottom
                                            setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
                                        }}
                                        className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
                                    >
                                        <Plus size={16} />
                                        Add Product
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredProducts.map((product, idx) => (
                                        <div key={idx} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-transparent hover:border-slate-50 flex flex-col">
                                            {/* Image Area */}
                                            <div className="h-48 bg-slate-50 relative group overflow-hidden p-4">
                                                {product.image ? (
                                                    <img src={product.image} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <ImageIcon size={32} />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => triggerImageUpload({ type: 'product', index: idx })}
                                                        className="bg-white text-slate-900 p-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                                                    >
                                                        Change Image
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Content Area */}
                                            <div className="p-6 space-y-4 flex-1 flex flex-col">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-start">
                                                        <input
                                                            value={product.name}
                                                            onChange={(e) => {
                                                                const newProducts = [...products.products];
                                                                const realIdx = products.products.findIndex(p => p === product);
                                                                newProducts[realIdx].name = e.target.value;
                                                                setProducts({ products: newProducts });
                                                            }}
                                                            className="text-lg font-bold text-slate-800 bg-transparent focus:bg-slate-50 focus:px-2 -ml-2 rounded-lg outline-none w-full"
                                                            placeholder="Product Name"
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                if (confirm("Delete this product?")) {
                                                                    const newProducts = products.products.filter(p => p !== product);
                                                                    setProducts({ products: newProducts });
                                                                }
                                                            }}
                                                            className="text-slate-300 hover:text-red-500 p-1"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <input
                                                        value={product.tagline || ''}
                                                        onChange={(e) => {
                                                            const newProducts = [...products.products];
                                                            const realIdx = products.products.findIndex(p => p === product);
                                                            newProducts[realIdx].tagline = e.target.value;
                                                            setProducts({ products: newProducts });
                                                        }}
                                                        className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-transparent w-full outline-none"
                                                        placeholder="TAGLINE OR CATEGORY"
                                                    />
                                                </div>

                                                <textarea
                                                    value={product.description}
                                                    onChange={(e) => {
                                                        const newProducts = [...products.products];
                                                        const realIdx = products.products.findIndex(p => p === product);
                                                        newProducts[realIdx].description = e.target.value;
                                                        setProducts({ products: newProducts });
                                                    }}
                                                    className="w-full bg-slate-50/50 p-3 rounded-xl text-xs font-medium text-slate-600 outline-none resize-none h-20"
                                                    placeholder="Product description..."
                                                />

                                                <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                                                    <div>
                                                        <label className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Price (₹)</label>
                                                        <input
                                                            type="number"
                                                            value={product.price}
                                                            onChange={(e) => {
                                                                const newProducts = [...products.products];
                                                                const realIdx = products.products.findIndex(p => p === product);
                                                                newProducts[realIdx].price = Number(e.target.value);
                                                                setProducts({ products: newProducts });
                                                            }}
                                                            className="w-full bg-slate-50 rounded-lg p-2 font-bold text-slate-800 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Badge</label>
                                                        <input
                                                            value={product.tag || ''}
                                                            onChange={(e) => {
                                                                const newProducts = [...products.products];
                                                                const realIdx = products.products.findIndex(p => p === product);
                                                                newProducts[realIdx].tag = e.target.value;
                                                                setProducts({ products: newProducts });
                                                            }}
                                                            className="w-full bg-slate-50 rounded-lg p-2 font-bold text-slate-800 outline-none"
                                                            placeholder="e.g. New"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* --- TAB: LOCATIONS --- */}
                        {activeTab === 'locations' && locations && (
                            <motion.div
                                key="locations"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-6 max-w-7xl mx-auto pb-20"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-slate-800">Locations Manager</h2>
                                    <button
                                        onClick={() => {
                                            const newLocation: Location = {
                                                city: "New Location",
                                                address: "Address Details",
                                                status: "Coming Soon",
                                                statusColor: "text-orange-500",
                                                isComingSoon: true
                                            };
                                            setLocations([...locations, newLocation]);
                                            setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
                                        }}
                                        className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
                                    >
                                        <Plus size={16} />
                                        Add Location
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    {locations.map((loc, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-slate-50 relative group">
                                            <button
                                                onClick={() => {
                                                    if (confirm("Delete this location?")) {
                                                        const newLocs = locations.filter((_, i) => i !== idx);
                                                        setLocations(newLocs);
                                                    }
                                                }}
                                                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                                    <MapPin size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-800">Location #{idx + 1}</h3>
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{loc.status}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">City name</label>
                                                    <input
                                                        value={loc.city}
                                                        onChange={(e) => {
                                                            const newLocs = [...locations];
                                                            newLocs[idx].city = e.target.value;
                                                            setLocations(newLocs);
                                                        }}
                                                        className="w-full bg-slate-50 rounded-xl p-3 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Full Address</label>
                                                    <textarea
                                                        value={loc.address}
                                                        onChange={(e) => {
                                                            const newLocs = [...locations];
                                                            newLocs[idx].address = e.target.value;
                                                            setLocations(newLocs);
                                                        }}
                                                        className="w-full bg-slate-50 rounded-xl p-3 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/20 resize-none h-24"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Status Label</label>
                                                        <select
                                                            value={loc.status}
                                                            onChange={(e) => {
                                                                const newLocs = [...locations];
                                                                newLocs[idx].status = e.target.value;
                                                                // Auto-set color based on status
                                                                if (e.target.value === 'Open Now') {
                                                                    newLocs[idx].statusColor = 'text-green-600';
                                                                    newLocs[idx].isComingSoon = false;
                                                                } else {
                                                                    newLocs[idx].statusColor = 'text-orange-500';
                                                                    newLocs[idx].isComingSoon = true;
                                                                }
                                                                setLocations(newLocs);
                                                            }}
                                                            className="w-full bg-slate-50 rounded-xl p-3 text-sm font-bold text-slate-800 outline-none"
                                                        >
                                                            <option>Open Now</option>
                                                            <option>Coming Soon</option>
                                                            <option>Closed</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Color Class</label>
                                                        <input
                                                            value={loc.statusColor}
                                                            onChange={(e) => {
                                                                const newLocs = [...locations];
                                                                newLocs[idx].statusColor = e.target.value;
                                                                setLocations(newLocs);
                                                            }}
                                                            className="w-full bg-slate-50 rounded-xl p-3 text-sm font-medium text-slate-600 outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* --- TAB: INBOX --- */}

                        {activeTab === 'inbox' && (
                            <motion.div
                                key="inbox"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="max-w-4xl mx-auto space-y-6 pb-20"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-slate-800">Inbox</h2>
                                    {messages.length > 0 && (
                                        <button
                                            onClick={() => {
                                                if (confirm("Are you sure you want to delete all messages?")) {
                                                    fetch('/api/admin/messages?all=true', { method: 'DELETE' })
                                                        .then(res => res.json())
                                                        .then(data => {
                                                            if (data.success) {
                                                                setMessages([]);
                                                                showMessage('success', 'Inbox cleared');
                                                            }
                                                        });
                                                }
                                            }}
                                            className="text-xs font-bold text-red-500 uppercase tracking-widest hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {messages.length === 0 ? (
                                        <div className="bg-white rounded-[32px] p-12 text-center shadow-sm">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                                <MailIcon size={32} />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800 mb-1">No Messages</h3>
                                            <p className="text-slate-400 font-medium text-sm">Your inbox is empty.</p>
                                        </div>
                                    ) : (
                                        messages.map((msg) => (
                                            <motion.div
                                                key={msg.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="bg-white p-6 rounded-[32px] shadow-sm border border-transparent hover:border-blue-100 transition-all group relative"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${msg.read ? 'bg-slate-200 text-slate-500' : 'bg-blue-500'}`}>
                                                            {msg.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-slate-800">{msg.name}</h3>
                                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{msg.subject}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full w-fit">
                                                        {new Date(msg.date).toLocaleDateString()} • {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>

                                                <div className="pl-14 space-y-4">
                                                    <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl">
                                                        {msg.message}
                                                    </p>
                                                    <div className="flex items-center gap-4">
                                                        <a
                                                            href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-xs font-bold text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-green-200"
                                                        >
                                                            <PhoneIcon size={14} />
                                                            Reply on WhatsApp
                                                        </a>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm("Delete this message?")) {
                                                                    fetch(`/api/admin/messages?id=${msg.id}`, { method: 'DELETE' })
                                                                        .then(res => res.json())
                                                                        .then(data => {
                                                                            if (data.success) {
                                                                                setMessages(messages.filter(m => m.id !== msg.id));
                                                                                showMessage('success', 'Message deleted');
                                                                            }
                                                                        });
                                                                }
                                                            }}
                                                            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 px-4 py-2 rounded-xl uppercase tracking-widest transition-all"
                                                        >
                                                            <Trash2 size={14} />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* --- TAB: USERS --- */}
                        {activeTab === 'users' && user.role === 'super_admin' && (
                            <motion.div
                                key="users"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-6 max-w-7xl mx-auto pb-20"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
                                    <button
                                        onClick={() => setShowUserModal(true)}
                                        className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-lg"
                                    >
                                        <Plus size={16} />
                                        Add User
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {users.map((u) => (
                                        <div key={u.id} className="bg-white p-6 rounded-[32px] shadow-sm flex items-center gap-4 relative group">
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Delete user ${u.name}?`)) {
                                                        fetch(`/api/admin/users?id=${u.id}`, { method: 'DELETE' }).then(res => res.json()).then(data => {
                                                            if (data.success) {
                                                                setUsers(users.filter(usr => usr.id !== u.id));
                                                                showMessage('success', 'User deleted');
                                                            } else {
                                                                showMessage('error', data.error);
                                                            }
                                                        });
                                                    }
                                                }}
                                                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 hidden group-hover:block"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                            <img src={u.image} alt={u.name} className="w-16 h-16 rounded-2xl bg-slate-100 object-cover" />
                                            <div>
                                                <h3 className="font-bold text-slate-800">{u.name}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-full ${u.role === 'super_admin' ? 'bg-purple-100 text-purple-600' : u.role === 'admin' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                                        {u.role.replace('_', ' ')}
                                                    </span>
                                                    {u.role !== 'super_admin' && (
                                                        <button
                                                            onClick={() => {
                                                                const newRole = u.role === 'user' ? 'admin' : 'super_admin';
                                                                if (confirm(`Promote ${u.name} to ${newRole}?`)) {
                                                                    fetch('/api/admin/users', {
                                                                        method: 'PUT',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify({ id: u.id, role: newRole })
                                                                    }).then(res => res.json()).then(data => {
                                                                        if (data.success) {
                                                                            setUsers(users.map(usr => usr.id === u.id ? { ...usr, role: newRole } : usr));
                                                                            showMessage('success', 'User promoted');
                                                                        }
                                                                    });
                                                                }
                                                            }}
                                                            className="text-[10px] font-bold text-blue-500 uppercase hover:underline"
                                                        >
                                                            Promote
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}


                    </AnimatePresence>
                </div>
            </main>

            {/* Profile Modal - Editable */}
            <AnimatePresence>
                {showProfile && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setShowProfile(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[32px] p-8 w-full max-w-md relative z-10 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-slate-800">Edit Profile</h3>
                                <button onClick={() => setShowProfile(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
                            </div>

                            <div className="flex flex-col items-center gap-4 mb-8">
                                <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden relative group cursor-pointer" onClick={() => triggerImageUpload({ type: 'profile', id: 'profile', key: 'image' })}>
                                    <img src={user?.image} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                                        <Edit3 size={24} />
                                    </div>
                                </div>
                                <div className="text-center w-full">
                                    <input
                                        value={user?.name || ''}
                                        onChange={e => setUser({ ...user!, name: e.target.value })}
                                        className="font-bold text-lg text-center w-full bg-transparent border-b border-transparent hover:border-slate-200 focus:border-blue-500 outline-none pb-1"
                                    />
                                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">{user?.role.replace('_', ' ')}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Username</label>
                                    <input
                                        value={user?.username || ''}
                                        onChange={e => setUser({ ...user!, username: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New Password (Optional)</label>
                                    <input
                                        type="password"
                                        placeholder="Change password..."
                                        onChange={e => {
                                            const val = e.target.value;
                                            if (val) setUser({ ...user!, password: val });
                                        }}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={async () => {
                                    if (!user) return;
                                    const res = await fetch('/api/admin/users', {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(user)
                                    });
                                    const data = await res.json();
                                    if (data.success) {
                                        showMessage('success', 'Profile updated');
                                        setShowProfile(false);
                                    } else {
                                        showMessage('error', 'Failed to update');
                                    }
                                }}
                                className="w-full py-4 mt-8 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                            >
                                Save Changes
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Add User Modal */}
            <AnimatePresence>
                {showUserModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setShowUserModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[32px] p-8 w-full max-w-md relative z-10 shadow-2xl"
                        >
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Add New User</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                fetch('/api/admin/users', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(Object.fromEntries(formData))
                                }).then(res => res.json()).then(data => {
                                    if (data.success) {
                                        setUsers([...users, data.user]);
                                        showMessage('success', 'User added');
                                        setShowUserModal(false);
                                    } else {
                                        showMessage('error', data.error || 'Failed to add user');
                                    }
                                });
                            }} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</label>
                                    <input name="name" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Username</label>
                                    <input name="username" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="johndoe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                                    <input name="password" type="password" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</label>
                                    <select name="role" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none">
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="super_admin">Super Admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full py-4 mt-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-black transition-all">
                                    Create User
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 ${message.type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-500 text-white'}`}
                    >
                        {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                        <span className="font-bold text-sm uppercase tracking-wide">{message.text}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

