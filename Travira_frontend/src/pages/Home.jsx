import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, Receipt, TrendingUp, Users, Shield, Database,
    Code, Cpu, Map, MessageCircle, X, Send, Menu, ArrowRight,
    CheckCircle, Zap, Clock, DollarSign
} from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1000,
                    system: `You are a helpful assistant for the Smart Travel Tracking and Expense Management System by Team CodeSphere. Answer questions about features, technology, and help users understand the platform.`,
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
                })
            });
            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.content[0].text }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting. Please try again.' }]);
        }
        setLoading(false);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                />
                <motion.div
                    className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
                    transition={{ duration: 12, repeat: Infinity, delay: 4 }}
                />
            </div>

            {/* Navbar */}
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300
                    ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo + Brand */}
                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-600 rounded-xl
                            flex items-center justify-center shadow-lg">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>

                        <div className="leading-tight">
                            <h1 className="text-l pb-2 font-bold tracking-wide">Smart Travel Tracking & <br />Expense Management</h1>
                            <p className="text-xs text-gray-300">CodeSphere</p>
                        </div>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#home" className="text-gray-300 hover:text-blue-400 transition">Home</a>
                        <a href="#features" className="text-gray-300 hover:text-blue-400 transition">Features</a>
                        <a href="#tech" className="text-gray-300 hover:text-blue-400 transition">Technology</a>
                        <a href="#impact" className="text-gray-300 hover:text-blue-400 transition">Impact</a>

                        <button
                            onClick={() => navigate('/login')}
                            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20
                                transition-all border border-white/10"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => navigate('/register')}
                            className="px-6 py-2.5 rounded-full bg-linear-to-r from-blue-500 to-purple-600
                                hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <Menu className="w-7 h-7 text-white" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        className="md:hidden px-6 pt-4 pb-6 border-t border-white/10 bg-slate-900/95 backdrop-blur-xl"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                    >
                        <div className="flex flex-col gap-4 text-lg text-gray-200">
                            <a href="#home" className="hover:text-blue-400">Home</a>
                            <a href="#features" className="hover:text-blue-400">Features</a>
                            <a href="#tech" className="hover:text-blue-400">Technology</a>
                            <a href="#impact" className="hover:text-blue-400">Impact</a>

                            <button onClick={() => navigate('/login')}
                                className="text-left hover:text-blue-400">
                                Login
                            </button>

                            <button onClick={() => navigate('/register')}
                                className="text-left text-blue-400">
                                Get Started
                            </button>
                        </div>
                    </motion.div>
                )}
            </nav>


            {/* Hero Section */}
            <section id="home" className="relative pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center"
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.div
                            className="inline-block  backdrop-blur-sm rounded-full px-6 py-2 mb-6 "
                            variants={fadeInUp}
                        >
                            {/* <span className="text-blue-300 font-semibold">🏆 AI + Maps + FinTech Integration</span> */}
                        </motion.div>

                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight"
                            variants={fadeInUp}
                        >
                            Travira
                            {/* Smart Travel Tracking<br />& Expense Management */}
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                            variants={fadeInUp}
                        >
                            Track your trips in real-time, manage expenses with AI-powered OCR, and split costs automatically. All in one seamless platform.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            variants={fadeInUp}
                        >
                            <button
                                onClick={() => navigate('/register')}
                                className="bg-linear-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                            >
                                Start Free Trial <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
                            >
                                View Demo
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
                            variants={fadeInUp}
                        >
                            {[
                                { icon: Users, label: 'Found UI Easy', value: '90%' },
                                { icon: MapPin, label: 'Said OCR is Fast & Accurate', value: '85%' },
                                { icon: Receipt, label: 'Felt Cost Splitting is Easier', value: '80%' },
                                { icon: Clock, label: 'Satisfaction', value: '4.5/5' }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                    <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="py-20 px-6 bg-black/20">
                <motion.div
                    className="max-w-6xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="bg-linear-to-br from-red-500/10 to-orange-500/10 rounded-3xl p-12 border border-red-500/20 backdrop-blur-sm">
                        <h2 className="text-4xl font-bold mb-6 text-center">The Problem We Solve</h2>
                        <p className="text-xl text-gray-200 leading-relaxed text-center max-w-4xl mx-auto">
                            Group travel management is <span className="text-red-400 font-semibold">chaotic and error-prone</span>.
                            Multiple apps for tracking, manual expense recording, confusing cost splits, and zero transparency lead to
                            frustration and conflicts. <span className="text-blue-400 font-semibold">We provide the unified solution</span>
                            with real-time tracking, AI-powered automation, and transparent settlements.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl font-bold text-center mb-4">Powerful Features</h2>
                        <p className="text-xl text-gray-300 text-center mb-16">Everything you need for seamless trip management</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: MapPin,
                                title: 'Real-Time GPS Tracking',
                                description: 'Track all trip members\' live locations on an interactive map with Google Maps integration.',
                                color: 'from-blue-500 to-cyan-500'
                            },
                            {
                                icon: Receipt,
                                title: 'Smart OCR Scanning',
                                description: 'Upload receipts and automatically extract expense details using Tesseract.js OCR technology.',
                                color: 'from-purple-500 to-pink-500'
                            },
                            {
                                icon: TrendingUp,
                                title: 'AI Trip Analytics',
                                description: 'Get AI-generated summaries, insights, and detailed analytics about your trips using NLP.',
                                color: 'from-green-500 to-emerald-500'
                            },
                            {
                                icon: DollarSign,
                                title: 'Auto Cost Splitting',
                                description: 'Automatically calculate each member\'s share and suggest settlements with full transparency.',
                                color: 'from-orange-500 to-red-500'
                            },
                            {
                                icon: Shield,
                                title: 'Admin Verification',
                                description: 'Admins can verify trips, approve expenses, and generate downloadable PDF reports.',
                                color: 'from-indigo-500 to-purple-500'
                            },
                            {
                                icon: Zap,
                                title: 'Lightning Fast',
                                description: 'Built with modern tech stack for instant updates and real-time synchronization.',
                                color: 'from-yellow-500 to-orange-500'
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/10 group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className={`bg-linear-to-br ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section id="tech" className="py-20 px-6 bg-black/20">
                <div className="max-w-7xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl font-bold text-center mb-4">Technology Stack</h2>
                        <p className="text-xl text-gray-300 text-center mb-16">
                            Built with cutting-edge technologies
                        </p>
                    </motion.div>

                    {/* COLOR MAP FIX */}
                    {/*
            Instead of dynamic tailwind classes (which don't work),
            we map each category to explicit classes.
        */}
                    {(() => {
                        const techCategories = [
                            {
                                title: "Frontend",
                                colors: {
                                    bg: "bg-blue-500/10",
                                    border: "border-blue-500/20",
                                    text: "text-blue-300"
                                },
                                items: ["React", "Material UI", "Tailwind CSS", "Framer Motion"]
                            },
                            {
                                title: "Backend",
                                colors: {
                                    bg: "bg-purple-500/10",
                                    border: "border-purple-500/20",
                                    text: "text-purple-300"
                                },
                                items: ["Spring Boot", "Spring Security", "JWT Authentication"]
                            },
                            {
                                title: "Database",
                                colors: {
                                    bg: "bg-green-500/10",
                                    border: "border-green-500/20",
                                    text: "text-green-300"
                                },
                                items: ["PostgreSQL", "MongoDB", "Hibernate ORM"]
                            },
                            {
                                title: "AI & Maps",
                                colors: {
                                    bg: "bg-orange-500/10",
                                    border: "border-orange-500/20",
                                    text: "text-orange-300"
                                },
                                items: ["Tesseract.js OCR", "Python NLP", "Google Maps API", "Leaflet"]
                            }
                        ];

                        return (
                            <div className="grid md:grid-cols-2 gap-8">
                                {techCategories.map((category, idx) => (
                                    <motion.div
                                        key={idx}
                                        className={`${category.colors.bg} ${category.colors.border}
                                backdrop-blur-sm rounded-2xl p-8 border`}
                                        initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <h3
                                            className={`text-2xl font-bold mb-4 ${category.colors.text}`}
                                        >
                                            {category.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-3">
                                            {category.items.map((item, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-white/10 px-4 py-2 rounded-full text-sm border border-white/20"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            </section>


            {/* Expected Impact */}
            <section id="impact" className="py-20 px-6">
                <motion.div
                    className="max-w-6xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-linear-to-br from-green-500/10 to-blue-500/10 rounded-3xl p-12 border border-green-500/20 backdrop-blur-sm">
                        <h2 className="text-4xl font-bold mb-6 text-center">Expected Impact</h2>
                        <p className="text-xl text-gray-200 leading-relaxed text-center mb-8">
                            This system will <span className="text-green-400 font-semibold">simplify group travel management</span>,
                            reduce manual errors, and save significant time in expense division.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            {[
                                { value: '0+', label: 'Travel Companies', icon: MapPin },
                                { value: '0+', label: 'Corporate Teams', icon: Users },
                                { value: '0+', label: 'Educational Institutions', icon: Shield }
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    className="text-center bg-white/5 rounded-2xl p-6"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <stat.icon className="w-12 h-12 mx-auto mb-4 text-green-400" />
                                    <div className="text-4xl font-bold text-green-400 mb-2">{stat.value}</div>
                                    <div className="text-gray-300">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-linear-to-r from-blue-600 to-purple-600">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Travel Management?</h2>
                    <p className="text-xl mb-8 text-blue-100">Join thousands of users who have simplified their group travel experience.</p>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2"
                    >
                        Get Started Free <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-black/40 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-bold text-xl">Travira</span>
                            </div>
                            <p className="text-gray-400 text-sm">Smart Travel Tracking & Expense Management System</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Product</h4>
                            <div className="space-y-2 text-gray-400 text-sm">
                                <div>Features</div>
                                <div>Pricing</div>
                                <div>Demo</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Company</h4>
                            <div className="space-y-2 text-gray-400 text-sm">
                                <div>About</div>
                                <div>Team</div>
                                <div>Contact</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Legal</h4>
                            <div className="space-y-2 text-gray-400 text-sm">
                                <div>Privacy</div>
                                <div>Terms</div>
                                <div>Security</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
                        <p>© 2025  Team CodeSphere - SOA-ITER, Bhubaneswar. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Chatbot Button */}
            <motion.button
                onClick={() => setChatOpen(!chatOpen)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {chatOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
            </motion.button>

            {/* Chatbot Window */}
            {chatOpen && (
                <motion.div
                    className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col z-50"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                >
                    <div className="bg-linear-to-r from-blue-500 to-purple-600 p-4 flex items-center gap-3 rounded-t-2xl">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold">Travel Assistant</h3>
                            <p className="text-xs text-white/80">Ask me anything!</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 mt-8">
                                <p className="mb-4">👋 Hi! How can I help you today?</p>
                                <div className="text-sm space-y-2">
                                    <div className="bg-white/5 p-2 rounded-lg">What are the main features?</div>
                                    <div className="bg-white/5 p-2 rounded-lg">How does OCR scanning work?</div>
                                    <div className="bg-white/5 p-2 rounded-lg">Tell me about pricing</div>
                                </div>
                            </div>
                        )}
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl p-3 ${msg.role === 'user'
                                    ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white'
                                    : 'bg-white/10 text-gray-100'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 rounded-2xl p-3">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-white/10">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Type your message..."
                                className="flex-1 bg-white/10 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="bg-linear-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Home;