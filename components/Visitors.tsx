import React from 'react';
import { ShieldCheck, User, Clock, Calendar, LogIn, LogOut, Search, Plus } from 'lucide-react';

const Visitors: React.FC = () => {
  const visitors = [
    { id: 'VIS-001', name: 'John Doe', purpose: 'Vendor - Food Supplies', in: '08:45 AM', out: '10:15 AM', status: 'Exited' },
    { id: 'VIS-002', name: 'Sarah Wilson', purpose: 'Parent Meeting', in: '11:00 AM', out: '--', status: 'On-Site' },
    { id: 'VIS-003', name: 'James Kimani', purpose: 'Interview', in: '02:00 PM', out: '--', status: 'On-Site' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Visitor Management</h2>
          <p className="text-gray-500 dark:text-gray-400">Track and secure campus entry/exit for guests</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#4B0082] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm">
          <Plus size={18} /> Register Guest Entry
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 bg-gray-50 dark:bg-gray-700/30 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
           <div className="flex gap-6">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                 <span className="text-xs font-bold text-gray-600 dark:text-gray-300">2 Active Guests</span>
              </div>
           </div>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search by Guest Name..." className="pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-lg outline-none bg-white dark:bg-gray-800" />
           </div>
        </div>

        <div className="divide-y divide-gray-50 dark:divide-gray-700">
           {visitors.map((vis) => (
             <div key={vis.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-[#4B0082] dark:text-purple-300">
                      <User size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{vis.name}</h4>
                      <p className="text-xs text-gray-500">{vis.purpose}</p>
                   </div>
                </div>
                
                <div className="flex items-center gap-12">
                   <div className="flex items-center gap-6">
                      <div><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Entry</p><p className="text-xs font-bold text-green-600">{vis.in}</p></div>
                      <div><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Exit</p><p className="text-xs font-bold text-red-600">{vis.out}</p></div>
                   </div>
                   <div className="text-right w-24">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${vis.status === 'On-Site' ? 'bg-green-100 text-green-700 shadow-sm' : 'bg-gray-100 text-gray-500'}`}>
                         {vis.status}
                      </span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Visitors;