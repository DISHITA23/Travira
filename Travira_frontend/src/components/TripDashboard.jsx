import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Calendar, Users, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { getTrips, createTrip } from '../components/services/api';

const TripDashboard = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTrip, setNewTrip] = useState({
        name: '',
        destination: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {
        try {
            setLoading(true);
            const data = await getTrips();
            setTrips(data || []);
        } catch (error) {
            console.error('Failed to load trips:', error);
            setTrips([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTrip = async (e) => {
        e.preventDefault();
        try {
            await createTrip(newTrip);
            setShowCreateModal(false);
            setNewTrip({ name: '', destination: '', startDate: '', endDate: '' });
            loadTrips();
        } catch (error) {
            console.error('Failed to create trip:', error);
            alert('Failed to create trip. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">My Trips</h2>
                    <p className="text-gray-400">Manage all your travel adventures</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Create Trip
                </button>
            </div>

            {/* Trips Grid */}
            {trips.length === 0 ? (
                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                    <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No trips yet</h3>
                    <p className="text-gray-400 mb-4">Create your first trip to get started</p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Create Trip
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip, idx) => (
                        <motion.div
                            key={trip.id}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{trip.name}</h3>
                                    <p className="text-gray-400 text-sm flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {trip.destination}
                                    </p>
                                </div>
                                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                                    Active
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Calendar className="w-4 h-4" />
                                    {trip.startDate} - {trip.endDate}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Users className="w-4 h-4" />
                                    {trip.memberCount || 1} members
                                </div>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="flex-1 bg-blue-500/20 text-blue-400 py-2 rounded-lg hover:bg-blue-500/30 transition-all flex items-center justify-center gap-1">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition-all flex items-center justify-center gap-1">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Create Trip Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <motion.div
                        className="bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-white/20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Create New Trip</h3>
                        <form onSubmit={handleCreateTrip} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm">Trip Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newTrip.name}
                                    onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Weekend Getaway"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm">Destination</label>
                                <input
                                    type="text"
                                    required
                                    value={newTrip.destination}
                                    onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Goa, India"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 mb-2 text-sm">Start Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={newTrip.startDate}
                                        onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2 text-sm">End Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={newTrip.endDate}
                                        onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 bg-white/10 text-white py-3 rounded-xl hover:bg-white/20 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all"
                                >
                                    Create Trip
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default TripDashboard;