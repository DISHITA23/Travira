import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Receipt, Users, TrendingUp, LogOut, Menu, X } from 'lucide-react';
import { logout, getCurrentUser } from '../components/services/auth';
import Navbar from '../components/Navbar';
import TripDashboard from '../components/TripDashboard';
import ExpenseTracker from '../components/ExpenseTracker';
import MapView from '../components/MapView';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('trips');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const tabs = [
        { id: 'trips', label: 'My Trips', icon: MapPin },
        { id: 'expenses', label: 'Expenses', icon: Receipt },
        { id: 'map', label: 'Live Map', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp }
    ];

    const stats = [
        { icon: MapPin, label: 'Active Trips', value: '5', color: 'blue' },
        { icon: Users, label: 'Team Members', value: '24', color: 'green' },
        { icon: Receipt, label: 'Total Expenses', value: '₹45,230', color: 'purple' },
        { icon: TrendingUp, label: 'Savings', value: '₹8,500', color: 'orange' }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navbar */}
            <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="md:hidden text-white"
                        >
                            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Travira</h1>
                            <p className="text-xs text-gray-300">Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-white hidden md:block">Welcome, {user?.name || 'User'}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`
                    fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white/5 backdrop-blur-md border-r border-white/10 z-30
                    transition-transform duration-300 w-64
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
                    <div className="p-6 space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                        ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white'
                                        : 'text-gray-300 hover:bg-white/10'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span className="font-semibold">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <stat.icon className={`w-10 h-10 text-${stat.color}-400 mb-3`} />
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'trips' && <TripDashboard />}
                        {activeTab === 'expenses' && <ExpenseTracker />}
                        {activeTab === 'map' && <MapView />}
                        {activeTab === 'analytics' && (
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                                <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-2">Analytics Coming Soon</h3>
                                <p className="text-gray-400">AI-powered insights and trip analytics will be available here</p>
                            </div>
                        )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;