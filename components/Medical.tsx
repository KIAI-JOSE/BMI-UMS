import React from 'react';
import { Stethoscope, Heart, Activity, FileText, Plus, Search, AlertCircle, Clock } from 'lucide-react';

const Medical: React.FC = () => {
  const records = [
    { id: 'MED-101', student: 'Aaron Keitany', condition: 'General Checkup', blood: 'O+', date: '2024-05-20', nurse: 'Sr. Mary' },
    { id: 'MED-102', student: 'Beatrice Wanjiku', condition: 'Asthma Attack', blood: 'A-', date: '2024-05-18', nurse: 'Dr. John', urgent: true },
    { id: 'MED-103', student: 'Caleb Rotich', condition: 'Flu / Fever', blood: 'B+', date: '2024-05-15', nurse: 'Sr. Mary' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Campus Health Center</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage student medical records and clinic visits</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#4B0082] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm">
          <Plus size={18} /> New Medical Visit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
           <div className="p-3 bg-red-50 text-red-500 rounded-xl"><Heart size={24} /></div>
           <div><p className="text-xs text-gray-500 uppercase font-bold">Total Consultations</p><p className="text-2xl font-bold">1,245</p></div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
           <div className="p-3 bg-blue-50 text-blue-500 rounded-xl"><Activity size={24} /></div>
           <div><p className="text-xs text-gray-500 uppercase font-bold">Medical Insurance Active</p><p className="text-2xl font-bold">94%</p></div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
           <div className="p-3 bg-purple-50 text-purple-500 rounded-xl"><Stethoscope size={24} /></div>
           <div><p className="text-xs text-gray-500 uppercase font-bold">Emergency Staff On-Duty</p><p className="text-2xl font-bold">4</p></div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-700/30">
          <h3 className="font-bold text-gray-900 dark:text-white">Recent Clinic Visits</h3>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search by Student ID..." className="pl-9 pr-4 py-2 text-xs border border-gray-200 dark:border-gray-600 rounded-lg outline-none bg-white dark:bg-gray-800" />
          </div>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-700">
           {records.map((rec) => (
             <div key={rec.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-full ${rec.urgent ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-purple-100 text-purple-600'}`}>
                      {rec.urgent ? <AlertCircle size={20} /> : <FileText size={20} />}
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{rec.student}</h4>
                      <p className="text-xs text-gray-500">{rec.condition}</p>
                   </div>
                </div>
                <div className="flex items-center gap-12 text-sm">
                   <div className="text-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Blood Type</p>
                      <p className="font-bold text-red-600">{rec.blood}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Date / Time</p>
                      <p className="font-medium text-gray-600 dark:text-gray-300">{rec.date}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Medical;