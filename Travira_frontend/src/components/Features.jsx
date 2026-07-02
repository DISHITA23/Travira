import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Receipt, TrendingUp, DollarSign, Shield, Zap } from 'lucide-react';

const Features = () => {
    const features = [
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
    ];

    return (
        <section id="features" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl font-bold text-center mb-4 text-white">Powerful Features</h2>
                    <p className="text-xl text-gray-300 text-center mb-16">Everything you need for seamless trip management</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
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
    );
};

export default Features;