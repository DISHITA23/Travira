import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const MapView = () => {
    // Placeholder for map - you can integrate Google Maps or Leaflet here
    const members
        = [
            { id: 1, name: 'John Doe', lat: 20.2961, lng: 85.8245, status: 'active' },
            { id: 2, name: 'Sarah Smith', lat: 20.3012, lng: 85.8312, status: 'active' },
            { id: 3, name: 'Mike Johnson', lat: 20.2890, lng: 85.8189, status: 'inactive' }
        ];
    return (
        <div className="py-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Navigation className="w-6 h-6" />
                        Live Location Tracking
                    </h3>
                    <button className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-all">
                        Refresh
                    </button>
                </div>
                {/* Map Placeholder */}
                <div className="bg-slate-800 rounded-xl h-96 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <p className="text-gray-400">Map will be displayed here</p>
                            <p className="text-gray-500 text-sm mt-2">Integrate Google Maps or Leaflet</p>
                        </div>
                    </div>
                </div>

                {/* Members List */}
                <div className="space-y-3">
                    <h4 className="font-semibold text-white mb-3">Trip Members</h4>
                    {members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-white font-semibold">{member.name}</div>
                                    <div className="text-gray-400 text-sm">Lat: {member.lat}, Lng: {member.lng}</div>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${member.status === 'active'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-gray-500/20 text-gray-400'
                                }`}>
                                {member.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default MapView;