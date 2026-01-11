import React from 'react';
import { Award, Briefcase, GraduationCap, Mail, MapPin, Search, Filter, Share2 } from 'lucide-react';

const Alumni: React.FC = () => {
  const alumni = [
    { name: 'Dr. Jane Okumu', class: '2018', course: 'Bachelors in Education', occupation: 'High School Principal', location: 'Nairobi, Kenya', achievements: 'Best Teacher 2022' },
    { name: 'Eng. Kevin Omondi', class: '2019', course: 'Diploma in ICT', occupation: 'Senior Developer at Safaricom', location: 'London, UK', achievements: 'Tech Innovator Award' },
    { name: 'Rev. Peter Kamau', class: '2015', course: 'Bachelor of Theology', occupation: 'Senior Pastor', location: 'Houston, USA', achievements: 'Global Ministry Award' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Alumni Registry</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage BMI University graduates and success stories</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <Share2 size={18} /> Network Directory
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#4B0082] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm">
            <Award size={18} /> Highlight Achievement
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Search by name, class year, or occupation..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none dark:text-white" />
        </div>
        <select className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm outline-none dark:text-white appearance-none cursor-pointer">
          <option>Filter by Graduation Year</option>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
          <option>Older</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumni.map((member, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 group hover:shadow-md transition-all">
             <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-[#4B0082] text-[#FFD700] rounded-xl flex items-center justify-center font-bold text-xl border-2 border-[#FFD700]/20 shadow-lg">
                   {(member.name || '?').charAt(0)}
                </div>
                <span className="px-2 py-1 bg-purple-50 text-[#4B0082] text-[10px] font-bold rounded-lg uppercase tracking-widest">Class of {member.class}</span>
             </div>
             
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{member.name || ''}</h3>
             <p className="text-xs text-[#4B0082] dark:text-purple-300 font-bold mb-4">{member.course}</p>
             
             <div className="space-y-3 pt-4 border-t border-gray-50 dark:border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                   <Briefcase size={14} className="text-[#FFD700]" /> {member.occupation}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                   <MapPin size={14} className="text-[#FFD700]" /> {member.location}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                   <Award size={14} /> {member.achievements}
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alumni;