import React from 'react';
import { 
  Library, 
  GraduationCap, 
  BookOpen, 
  Users, 
  BarChart3, 
  Layers,
  ArrowRight,
  Plus
} from 'lucide-react';

interface CoursesProps {
  theme: string;
}

const Courses: React.FC<CoursesProps> = ({ theme }) => {
  const departments = [
    { name: 'School of Theology', head: 'Dr. Samuel Kiptoo', courses: 8, students: 450, color: 'border-l-purple-500' },
    { name: 'Dept. of ICT', head: 'Prof. Alice Mwangi', courses: 5, students: 890, color: 'border-l-blue-500' },
    { name: 'School of Business', head: 'Dr. Jane Okumu', courses: 12, students: 1200, color: 'border-l-emerald-500' },
    { name: 'Education Dept.', head: 'Prof. Peter Kamau', courses: 6, students: 1007, color: 'border-l-amber-500' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Academic Registry</h2>
          <p className="text-gray-500 dark:text-gray-400">Curriculum catalog and departmental structure</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#4B0082] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm">
          <Plus size={18} /> Create New Course
        </button>
      </div>

      {/* Grid of Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept, i) => (
          <div key={i} className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 border-l-4 ${dept.color} group hover:shadow-md transition-all cursor-pointer`}>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-[#4B0082] dark:text-purple-300">
                <Library size={24} />
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Department Head</span>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{dept.head}</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{dept.name}</h3>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-50 dark:border-gray-700 pt-4">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-purple-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400"><span className="font-bold text-gray-900 dark:text-white">{dept.courses}</span> Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400"><span className="font-bold text-gray-900 dark:text-white">{dept.students}</span> Enrolled</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
               <span className="text-xs font-bold text-[#4B0082] dark:text-[#FFD700] uppercase tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
                  Manage Catalog <ArrowRight size={14} />
               </span>
            </div>
          </div>
        ))}
      </div>

      {/* Course Listing */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30">
          <h3 className="font-bold text-gray-900 dark:text-white">Recent Curriculum Updates</h3>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-700">
          {[
            { name: 'Bachelor of Theology', id: 'BTH-101', level: 'Undergraduate', credits: 120, status: 'Published' },
            { name: 'Masters in Biblical Studies', id: 'MBS-502', level: 'Postgraduate', credits: 45, status: 'Draft' },
            { name: 'Diploma in Christian Counseling', id: 'DCC-089', level: 'Diploma', credits: 60, status: 'Published' }
          ].map((course, idx) => (
            <div key={idx} className="p-6 flex flex-wrap gap-4 items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-gray-700 flex items-center justify-center text-[#4B0082] dark:text-purple-300">
                     <Layers size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{course.name}</h4>
                    <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">{course.id}</p>
                  </div>
               </div>

               <div className="flex items-center gap-12 text-sm">
                  <div className="hidden md:block">
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Academic Level</p>
                     <p className="font-semibold text-gray-700 dark:text-gray-300">{course.level}</p>
                  </div>
                  <div className="hidden md:block">
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Credit Hours</p>
                     <p className="font-semibold text-gray-700 dark:text-gray-300">{course.credits} Credits</p>
                  </div>
                  <div>
                     <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {course.status}
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

export default Courses;