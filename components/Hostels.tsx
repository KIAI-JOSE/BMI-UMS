import React from 'react';
import { Home, Users, Bed, ShieldCheck, MapPin, Plus, ArrowRight } from 'lucide-react';

const Hostels: React.FC = () => {
  const halls = [
    { name: 'Bethlehem Hall', type: 'Male', capacity: 250, occupied: 240, status: 'Near Capacity' },
    { name: 'Eden Residence', type: 'Female', capacity: 300, occupied: 150, status: 'Available' },
    { name: 'Zion Wing', type: 'Male', capacity: 100, occupied: 98, status: 'Full' },
    { name: 'Grace Hall', type: 'Female', capacity: 200, occupied: 180, status: 'Available' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Hostels & Housing</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage student residential services</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#4B0082] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm">
          <Plus size={18} /> New Room Allocation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {halls.map((hall, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 group hover:border-purple-300 transition-all">
            <div className="flex justify-between items-start mb-6">
               <div className={`p-3 rounded-xl ${hall.type === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                  <Home size={24} />
               </div>
               <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                 hall.status === 'Full' ? 'bg-red-50 text-red-600' : 
                 hall.status === 'Near Capacity' ? 'bg-amber-50 text-amber-600' : 
                 'bg-green-50 text-green-600'
               }`}>
                 {hall.status}
               </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{hall.name}</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 mb-4"><MapPin size={12} /> South Campus</p>

            <div className="space-y-3">
               <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Occupancy</span>
                  <span className="font-bold">{Math.round((hall.occupied / hall.capacity) * 100)}%</span>
               </div>
               <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${hall.type === 'Male' ? 'bg-blue-500' : 'bg-pink-500'}`} style={{ width: `${(hall.occupied / hall.capacity) * 100}%` }}></div>
               </div>
               <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                  <span>{hall.occupied} Occupied</span>
                  <span>{hall.capacity} Total</span>
               </div>
            </div>

            <button className="w-full mt-6 py-2 border border-gray-100 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
              Manage Wing <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hostels;