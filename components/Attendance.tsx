import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  Users, 
  BookOpen,
  Search,
  Filter,
  Save,
  ShieldCheck
} from 'lucide-react';

interface AttendanceProps {
  theme: string;
}

const Attendance: React.FC<AttendanceProps> = ({ theme }) => {
  const [selectedCourse, setSelectedCourse] = useState('Certificate in Theology');
  
  const dummyStudents = [
    { id: 'BMI-001', name: 'Aaron Keitany', status: 'present', lastSeen: '09:05 AM' },
    { id: 'BMI-002', name: 'Beatrice Wanjiku', status: 'absent', lastSeen: '-' },
    { id: 'BMI-003', name: 'Caleb Rotich', status: 'late', lastSeen: '09:45 AM' },
    { id: 'BMI-004', name: 'Dorcas Mutua', status: 'present', lastSeen: '08:55 AM' },
    { id: 'BMI-005', name: 'Ezekiel Omari', status: 'present', lastSeen: '09:00 AM' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Daily Attendance</h2>
          <p className="text-gray-500 dark:text-gray-400">Mark student presence for active sessions</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-purple-50 dark:bg-gray-800 px-4 py-2 rounded-xl text-[#4B0082] dark:text-purple-300 font-bold text-sm border border-purple-100 dark:border-gray-700">
            <Calendar size={18} className="text-[#FFD700]" />
            {new Date().toDateString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Course Selector Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Ongoing Classes</h3>
          <div className="space-y-2">
            {['Certificate in Theology', 'Diploma in ICT', 'Bachelors in Education', 'Masters in Divinity'].map((course) => (
              <button 
                key={course}
                onClick={() => setSelectedCourse(course)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 border ${
                  selectedCourse === course 
                    ? 'bg-[#4B0082] text-white border-[#4B0082] shadow-lg' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:border-purple-200'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${selectedCourse === course ? 'bg-white/20' : 'bg-purple-50 dark:bg-gray-700 text-[#4B0082] dark:text-purple-300'}`}>
                  <BookOpen size={16} />
                </div>
                <span className="text-sm font-semibold truncate">{course}</span>
              </button>
            ))}
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900 rounded-xl text-xs text-amber-800 dark:text-amber-200">
            <div className="flex gap-2 items-center font-bold mb-1">
              <Clock size={14} /> Session Timeline
            </div>
            <p>09:00 AM - 12:00 PM</p>
            <p className="mt-1 opacity-70">Marking will lock automatically after 12:00 PM.</p>
          </div>
        </div>

        {/* Attendance Register */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50 dark:bg-gray-700/30">
             <div className="flex items-center gap-4">
                <Users className="text-[#4B0082] dark:text-[#FFD700]" />
                <div>
                   <h3 className="font-bold text-gray-900 dark:text-white">{selectedCourse}</h3>
                   <p className="text-xs text-gray-500">48 Students Enrolled</p>
                </div>
             </div>
             <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#4B0082] text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-2 hover:bg-[#3b0066] transition-colors">
                  <Save size={14} /> Commit Changes
                </button>
             </div>
          </div>

          <div className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search by name in this class..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none text-sm dark:text-white" />
            </div>

            <div className="space-y-3">
              {dummyStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border border-gray-50 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-gray-600 flex items-center justify-center font-bold text-[#4B0082] dark:text-purple-300">
                        {(student.name || '?').charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{student.name || ''}</p>
                        <p className="text-[10px] text-gray-500 font-mono tracking-wider">{student.id}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-6">
                      <div className="hidden md:block text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">In Time</p>
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{student.lastSeen}</p>
                      </div>

                      <div className="flex bg-gray-100 dark:bg-gray-600 rounded-lg p-1 gap-1">
                        <button className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${student.status === 'present' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-500 hover:text-green-600'}`}>
                          <CheckCircle2 size={12} /> Present
                        </button>
                        <button className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${student.status === 'absent' ? 'bg-red-500 text-white shadow-sm' : 'text-gray-500 hover:text-red-600'}`}>
                          <XCircle size={12} /> Absent
                        </button>
                        <button className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${student.status === 'late' ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-500 hover:text-amber-600'}`}>
                          <Clock size={12} /> Late
                        </button>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;