import React from 'react';
import { FileSpreadsheet, Calendar, Clock, GraduationCap, CheckCircle, AlertTriangle, Search, Plus } from 'lucide-react';

const Exams: React.FC = () => {
  const upcomingExams = [
    { id: 'EX-901', course: 'Systematic Theology I', date: '2024-06-12', time: '09:00 AM', venue: 'Main Hall', proctor: 'Dr. Kiptoo' },
    { id: 'EX-902', course: 'Intro to Web Dev', date: '2024-06-14', time: '02:00 PM', venue: 'Lab 204', proctor: 'Prof. Mwangi' },
    { id: 'EX-903', course: 'Counseling Ethics', date: '2024-06-15', time: '11:00 AM', venue: 'Room 12B', proctor: 'Rev. Omolo' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Exams & Grading</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage institutional assessments and grade reports</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Generate GPA Report
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#4B0082] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm">
            <Plus size={18} /> Create Exam Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Exam Schedule */}
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Calendar size={16} /> Upcoming Examination Calendar</h3>
           <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-wrap gap-6 items-center justify-between group hover:border-purple-200 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-purple-50 dark:bg-gray-700 rounded-xl flex flex-col items-center justify-center text-[#4B0082] dark:text-purple-300">
                         <span className="text-[10px] font-bold uppercase">{exam.date.split('-')[1]} / {exam.date.split('-')[2]}</span>
                         <span className="text-lg font-bold">Jun</span>
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-900 dark:text-white">{exam.course}</h4>
                         <p className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {exam.time} • <MapPin size={12} className="inline ml-1" /> {exam.venue}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Invigilator</p>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{exam.proctor}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Grade Entry Quick Stats */}
        <div className="space-y-6">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><CheckCircle size={16} /> Grading Progress</h3>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
              <div className="space-y-2">
                 <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Semester 1 Results Entry</span>
                    <span className="font-bold text-[#4B0082] dark:text-purple-300">85%</span>
                 </div>
                 <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#4B0082]" style={{ width: '85%' }}></div>
                 </div>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded-xl text-xs text-red-800 dark:text-red-200 flex gap-3">
                 <AlertTriangle size={24} className="flex-shrink-0" />
                 <div>
                    <p className="font-bold mb-1">Pending Submissions</p>
                    <p>4 lecturers have not yet uploaded their final course grades for the current term.</p>
                 </div>
              </div>

              <button className="w-full py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition-all">
                 Review Transcript Templates
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const MapPin = ({ size, className }: { size: number, className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default Exams;