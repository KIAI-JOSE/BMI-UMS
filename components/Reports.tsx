import React from 'react';
import { FileBarChart, TrendingUp, Users, Wallet, Calendar, Download, Filter, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reports: React.FC = () => {
  const enrollmentData = [
    { name: 'Theology', val: 450 },
    { name: 'ICT', val: 890 },
    { name: 'Business', val: 1200 },
    { name: 'Education', val: 1007 },
  ];

  const COLORS = ['#4B0082', '#FFD700', '#6A0DAD', '#FDB931'];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Strategic Analytics</h2>
          <p className="text-gray-500 dark:text-gray-400">Institutional KPI monitoring and reporting</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#4B0082] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm">
          <Download size={18} /> Export Performance Audit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
               <h3 className="font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2"><Target size={20} className="text-[#4B0082]" /> Departmental Enrollment Reach</h3>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={enrollmentData}>
                       <XAxis dataKey="name" tick={{fontSize: 10, fill: '#999'}} axisLine={false} tickLine={false} />
                       <YAxis hide />
                       <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                       <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                          {enrollmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                       </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="bg-gradient-to-br from-[#4B0082] to-[#6A0DAD] p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70">Projected Revenue Q3</p>
                  <p className="text-3xl font-bold mt-1">$1.85M</p>
                  <TrendingUp className="absolute bottom-4 right-4 opacity-20" size={64} />
               </div>
               <div className="bg-gradient-to-br from-[#FFD700] to-[#FDB931] p-6 rounded-2xl text-[#4B0082] shadow-xl relative overflow-hidden">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70">Student Retention Rate</p>
                  <p className="text-3xl font-bold mt-1">98.4%</p>
                  <Users className="absolute bottom-4 right-4 opacity-20" size={64} />
               </div>
            </div>
         </div>

         <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6">Financial Allocation</h3>
            <div className="h-64 flex justify-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={enrollmentData} dataKey="val" innerRadius={60} outerRadius={80} paddingAngle={5}>
                       {enrollmentData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-8">
               {enrollmentData.map((dept, i) => (
                 <div key={i} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                       <span className="font-semibold text-gray-600 dark:text-gray-400">{dept.name}</span>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{Math.round((dept.val / 3547) * 100)}%</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Reports;