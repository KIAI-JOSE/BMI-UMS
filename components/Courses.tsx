import React, { useState, useMemo } from 'react';
import { 
  BookMarked, 
  GraduationCap, 
  Layers, 
  BookOpen, 
  Hash, 
  Search, 
  Plus, 
  Edit, 
  Trash2
} from 'lucide-react';
import { Course } from '../types';
import CourseModal from './CourseModal';

interface CoursesProps {
  theme: string;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const Courses: React.FC<CoursesProps> = ({ theme, courses, setCourses }) => {
  const [activeLevel, setActiveLevel] = useState<string>('Undergraduate');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesLevel = activeLevel === 'All' || course.level === activeLevel;
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            course.code.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [courses, activeLevel, searchTerm]);

  const handleSave = (courseData: Partial<Course>) => {
    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...courseData } as Course : c));
    } else {
      const newCourse: Course = {
        ...courseData as Course,
        id: `CRS-${Math.floor(Math.random() * 9000) + 1000}`
      };
      setCourses(prev => [newCourse, ...prev]);
    }
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const openModal = (course?: Course) => {
    setEditingCourse(course || null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 dark:border-gray-800 pb-8">
        <div>
           <div className="flex items-center gap-4 mb-2">
             <div className="w-3 h-12 bg-[#FFD700] rounded-none"></div>
             <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white tracking-tight uppercase">Academic Curriculum</h2>
          </div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-7 uppercase tracking-widest">BMI Institutional Course Catalog & Syllabus Management</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-8 py-4 bg-[#4B0082] text-white rounded-none shadow-xl hover:bg-black transition-all font-black text-xs uppercase tracking-widest border border-[#FFD700]/30"
        >
          <Plus size={18} className="text-[#FFD700]" /> New Course
        </button>
      </div>

      {/* Level Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 px-1">
         {[
           { id: 'Diploma', label: 'Diploma Courses', color: 'bg-blue-600', icon: BookMarked },
           { id: 'Undergraduate', label: 'Degree Programs', color: 'bg-[#6D28D9]', icon: GraduationCap },
           { id: 'Masters', label: 'Masters Programs', color: 'bg-[#EA580C]', icon: Layers },
           { id: 'PhD', label: 'Doctoral Programs', color: 'bg-[#059669]', icon: BookOpen },
           { id: 'Certificate', label: 'Certificates', color: 'bg-[#0891B2]', icon: Hash }
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveLevel(tab.id)}
             className={`flex-1 min-w-[160px] px-6 py-4 rounded-lg text-white shadow-md transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 ${
               tab.color
             } ${activeLevel === tab.id ? 'ring-4 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900 ring-gray-300 dark:ring-gray-600 scale-[1.02] font-black shadow-xl' : 'opacity-85 hover:opacity-100 font-bold'}`}
           >
             <tab.icon size={20} className="text-white/90" />
             <span className="text-xs uppercase tracking-widest">{tab.label}</span>
           </button>
         ))}
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 flex flex-col md:flex-row gap-4 items-center shadow-sm">
         <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Courses by Name or Code..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-none outline-none font-bold text-sm dark:text-white focus:ring-1 focus:ring-[#4B0082]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-none shadow-sm hover:shadow-xl hover:border-[#4B0082] transition-all group flex flex-col">
             <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-[#4B0082] dark:text-purple-300 text-[10px] font-black uppercase tracking-widest border border-purple-100 dark:border-purple-800 rounded-none">
                   {course.code}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => openModal(course)} className="p-2 text-gray-300 hover:text-[#4B0082] transition-colors"><Edit size={16}/></button>
                   <button onClick={() => handleDelete(course.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                </div>
             </div>
             <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight leading-snug mb-2">{course.name}</h3>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{course.faculty} • {course.department}</p>
             <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center text-xs font-bold text-gray-500">
                <span>{course.credits} Credits</span>
                <span className={`px-2 py-0.5 border ${course.status === 'Published' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' : 'border-gray-200 text-gray-500 bg-gray-50'}`}>
                   {course.status}
                </span>
             </div>
          </div>
        ))}
      </div>

      <CourseModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingCourse(null); }}
        onSave={handleSave}
        editData={editingCourse}
      />
    </div>
  );
};

export default Courses;