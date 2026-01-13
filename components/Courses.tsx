import React, { useState, useMemo } from 'react';
import { 
  Library, 
  GraduationCap, 
  BookOpen, 
  Users, 
  BarChart3, 
  Layers,
  ArrowRight,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  FileText,
  X,
  Award,
  ChevronRight,
  BookMarked,
  ShieldCheck
} from 'lucide-react';
import { Course } from '../types';
import CourseModal from './CourseModal';

interface CoursesProps {
  theme: string;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const Courses: React.FC<CoursesProps> = ({ theme, courses, setCourses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('All Faculty');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [viewingSyllabus, setViewingSyllabus] = useState<Course | null>(null);

  const faculties = ['All Faculty', 'Theology', 'ICT', 'Business', 'Education'];

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = `${c.name} ${c.code} ${c.department}`.toLowerCase().includes(q);
      const matchesFaculty = facultyFilter === 'All Faculty' || c.faculty === facultyFilter;
      return matchesSearch && matchesFaculty;
    });
  }, [courses, searchTerm, facultyFilter]);

  const departments = useMemo(() => {
    return [
      { name: 'School of Theology', faculty: 'Theology', head: 'Dr. Samuel Kiptoo', color: 'border-l-purple-500' },
      { name: 'Dept. of ICT', faculty: 'ICT', head: 'Prof. Alice Mwangi', color: 'border-l-blue-500' },
      { name: 'School of Business', faculty: 'Business', head: 'Dr. Jane Okumu', color: 'border-l-emerald-500' },
      { name: 'Education Dept.', faculty: 'Education', head: 'Prof. Peter Kamau', color: 'border-l-amber-500' },
    ].map(dept => ({
      ...dept,
      coursesCount: courses.filter(c => c.faculty === dept.faculty).length,
      studentsCount: courses.filter(c => c.faculty === dept.faculty).length * 120 // Mock student multiplier
    }));
  }, [courses]);

  const handleSaveCourse = (courseData: Partial<Course>) => {
    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...courseData } as Course : c));
    } else {
      const newCourse: Course = {
        id: `CRS-${Math.floor(Math.random() * 9000) + 1000}`,
        name: courseData.name || 'Untitled Course',
        code: courseData.code || 'CODE000',
        faculty: courseData.faculty || 'General',
        department: courseData.department || 'Undeclared',
        level: courseData.level || 'Undergraduate',
        credits: courseData.credits || 3,
        status: courseData.status || 'Draft',
        description: courseData.description || '',
        syllabus: courseData.syllabus || ''
      };
      setCourses(prev => [newCourse, ...prev]);
    }
    setEditingCourse(null);
  };

  const deleteCourse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this academic entry from the registry?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const openEdit = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  // Helper to structure the syllabus text into a professional numbered list
  const renderStructuredSyllabus = (text: string | undefined) => {
    if (!text) return <p className="text-sm font-medium text-gray-400 italic">No curriculum data documented.</p>;
    
    // Split by Module/Unit/Week/Phase/Seminar markers OR by newline OR by period if it looks like a list
    const parts = text.split(/(?=\n)|(?=Module \d+:|Unit \d+:|Week \d+:|Phase \d+:|Seminar \d+:)/g)
                     .filter(p => p.trim().length > 0);

    // If regex split didn't find multiple parts, try a secondary split by period for long sentences
    const items = parts.length <= 1 
      ? text.split('. ').filter(p => p.trim().length > 0)
      : parts;

    return (
      <div className="space-y-4">
        {items.map((item, i) => {
          // Extract the body by removing common prefixes
          const body = item.replace(/^(Module|Unit|Week|Phase|Seminar|Phase) \d+:?\s*/i, '').trim()
                          .replace(/^\d+\.\s*/, '').trim();
          
          if (!body) return null;

          return (
            <div key={i} className="flex items-start gap-5 group">
               <div className="flex-shrink-0 w-10 h-10 rounded-none bg-gray-900 dark:bg-gray-700 flex items-center justify-center text-[#FFD700] text-sm font-black border-l-4 border-[#4B0082] group-hover:bg-[#4B0082] transition-colors shadow-sm">
                  {String(i + 1).padStart(2, '0')}
               </div>
               <div className="flex-1 pt-1 border-b border-gray-100 dark:border-gray-700 pb-4 group-last:border-0">
                  <h6 className="text-[9px] font-black uppercase text-[#4B0082] dark:text-purple-300 tracking-widest mb-1 opacity-70">Curriculum Node {i + 1}</h6>
                  <p className="text-sm text-gray-800 dark:text-gray-100 font-bold leading-relaxed">{body}</p>
               </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 dark:border-gray-800 pb-8">
        <div>
           <div className="flex items-center gap-4 mb-2">
             <div className="w-3 h-12 bg-[#FFD700] rounded-none"></div>
             <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white tracking-tight uppercase">Academic Registry</h2>
          </div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-7 uppercase tracking-widest">BMI Institutional Curriculum Catalog • {courses.length} Modules Active</p>
        </div>
        <button 
          onClick={() => { setEditingCourse(null); setIsModalOpen(true); }}
          className="flex items-center gap-3 px-8 py-4 bg-[#4B0082] text-white rounded-none shadow-xl hover:bg-black transition-all font-black text-xs uppercase tracking-[0.2em] border border-[#FFD700]/30"
        >
          <Plus size={18} className="text-[#FFD700]" /> Create New Course
        </button>
      </div>

      {/* Grid of Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept, i) => (
          <div key={i} className={`bg-white dark:bg-gray-800 p-6 rounded-none shadow-sm border border-gray-100 dark:border-gray-700 border-l-4 ${dept.color} group hover:shadow-xl transition-all cursor-pointer relative overflow-hidden`}>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-none text-[#4B0082] dark:text-purple-300">
                <Library size={24} />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dept. Head</span>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate">{dept.head}</p>
              </div>
            </div>

            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight leading-tight">{dept.name}</h3>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-50 dark:border-gray-700 pt-4">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-purple-400" />
                <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400"><span className="text-gray-900 dark:text-white">{dept.coursesCount}</span> Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-blue-400" />
                <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400"><span className="text-gray-900 dark:text-white">{dept.studentsCount}</span> Enrolled</span>
              </div>
            </div>
            
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#4B0082]/5 rounded-full -mr-8 -mb-8 transition-transform group-hover:scale-150"></div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Code, Title, or Department..." 
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-none shadow-sm outline-none focus:ring-1 focus:ring-[#4B0082] transition-all dark:text-white font-semibold text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-white dark:bg-gray-800 p-1 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 border-r border-gray-100 dark:border-gray-700">
               <Filter size={14} className="text-[#4B0082]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Filter Domain</span>
            </div>
            <select 
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
              className="px-6 py-2 bg-transparent text-xs font-black uppercase tracking-widest outline-none cursor-pointer dark:text-white"
            >
              {faculties.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Course Listing */}
      <div className="bg-white dark:bg-gray-800 rounded-none shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
             <BookMarked size={16} className="text-[#FFD700]" />
             <h3 className="font-black text-xs uppercase tracking-[0.25em]">Institutional Curriculum Catalog</h3>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">BMI Audit Node v5.2</span>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-700 overflow-x-auto no-scrollbar">
          {filteredCourses.length > 0 ? filteredCourses.map((course, idx) => (
            <div key={idx} className="p-6 flex flex-wrap gap-8 items-center justify-between hover:bg-purple-50/20 dark:hover:bg-gray-700/20 transition-all group min-w-[1000px]">
               <div className="flex items-center gap-6 w-[450px]">
                  <div className="w-16 h-16 rounded-none bg-purple-50 dark:bg-gray-700 flex flex-col items-center justify-center text-[#4B0082] dark:text-purple-300 border border-[#4B0082]/10 font-black shadow-inner">
                     <span className="text-[9px] tracking-[0.2em] uppercase opacity-60">CRD</span>
                     <span className="text-2xl">{course.credits}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight text-lg leading-tight group-hover:text-[#4B0082] transition-colors">{course.name}</h4>
                    <div className="flex items-center gap-3 mt-2">
                       <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-0.5 font-mono font-bold text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600">{course.code}</span>
                       <span className="text-[10px] text-[#4B0082] dark:text-purple-300 font-black tracking-widest uppercase">{course.department}</span>
                    </div>
                  </div>
               </div>

               <div className="flex items-center gap-16 text-sm flex-1 justify-center">
                  <div className="text-center">
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1 opacity-60">Academic Level</p>
                     <p className="font-bold text-gray-700 dark:text-gray-300 uppercase text-[11px] tracking-widest">{course.level}</p>
                  </div>
                  <div className="w-40 text-center">
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1 opacity-60">Protocol Status</p>
                     <span className={`px-4 py-1 text-[9px] font-black uppercase tracking-widest border inline-block ${
                       course.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                       course.status === 'Draft' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                       'bg-red-50 text-red-700 border-red-200'
                     }`}>
                        {course.status}
                     </span>
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  <div className="flex gap-1 pr-4 border-r border-gray-100 dark:border-gray-700">
                    <button 
                      onClick={(e) => openEdit(course, e)}
                      className="p-3 text-gray-400 hover:text-[#4B0082] hover:bg-gray-50 dark:hover:bg-gray-700 transition-all rounded-none" title="Modify Registry"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={(e) => deleteCourse(course.id, e)}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all rounded-none" title="Decommission"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <button 
                    onClick={() => setViewingSyllabus(course)}
                    className="flex items-center gap-3 px-8 py-3.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.25em] hover:bg-[#4B0082] hover:shadow-lg transition-all"
                  >
                    View Syllabus <ChevronRight size={14} className="text-[#FFD700]" />
                  </button>
               </div>
            </div>
          )) : (
            <div className="py-24 text-center text-gray-400 font-black uppercase tracking-[0.4em] text-sm italic bg-gray-50/20">
              Zero (0) Curricular Records Identified in Registry Search
            </div>
          )}
        </div>
      </div>

      {/* Structured Syllabus Quick View Overlay */}
      {viewingSyllabus && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#1a0033]/90 backdrop-blur-2xl p-4 md:p-8">
           <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-none shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border-t-[6px] border-[#4B0082] overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
              
              {/* Header */}
              <div className="p-8 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                 <div className="flex items-center gap-6">
                    <div className="p-3 bg-[#4B0082] text-[#FFD700] shadow-xl">
                      <FileText size={28} />
                    </div>
                    <div>
                       <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-[#4B0082] dark:text-[#FFD700] uppercase tracking-[0.4em]">Official Syllabus</span>
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                       </div>
                       <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mt-1">{viewingSyllabus.code}: Curriculum Breakdown</h3>
                    </div>
                 </div>
                 <button onClick={() => setViewingSyllabus(null)} className="p-3 bg-gray-50 dark:bg-gray-800 hover:bg-red-500 transition-all text-gray-400 hover:text-white"><X size={24} /></button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar bg-[#FAFAFA] dark:bg-gray-800/50">
                 
                 {/* Summary Section */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 border-b border-gray-100 dark:border-gray-700">
                    <div className="space-y-4">
                       <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase leading-tight">{viewingSyllabus.name}</h4>
                       <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em]">{viewingSyllabus.level} Level • Faculty of {viewingSyllabus.faculty}</p>
                       <div className="flex gap-3">
                          <div className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 text-[10px] font-black uppercase text-gray-500">{viewingSyllabus.credits} Credits</div>
                          <div className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 text-[10px] font-black uppercase text-emerald-600">Institutional Certified</div>
                       </div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-6 border border-gray-100 dark:border-gray-600 shadow-sm italic">
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Executive Summary</p>
                       <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{viewingSyllabus.description || "Historical summary unavailable for this curriculum node."}</p>
                    </div>
                 </div>

                 {/* Modules Section */}
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#4B0082] dark:text-purple-300">Respective Module Specification:</h5>
                       <div className="flex items-center gap-2">
                          <ShieldCheck size={14} className="text-emerald-500" />
                          <span className="text-[9px] font-bold text-gray-400 uppercase">Verified Curriculum Node</span>
                       </div>
                    </div>
                    
                    <div className="bg-gray-100/50 dark:bg-gray-900/30 p-8 border-l-4 border-gray-900 dark:border-[#FFD700] shadow-inner">
                       {renderStructuredSyllabus(viewingSyllabus.syllabus)}
                    </div>
                 </div>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-900">
                 <div className="flex items-center gap-2">
                    <Award size={18} className="text-[#FFD700]" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Academic Node Verified • {new Date().getFullYear()}</p>
                 </div>
                 <div className="flex gap-4">
                    <button onClick={() => setViewingSyllabus(null)} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">Close</button>
                    <button onClick={() => { setViewingSyllabus(null); window.print(); }} className="px-10 py-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#4B0082] transition-all shadow-xl">Confirm & Archive</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      <CourseModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingCourse(null); }}
        onSave={handleSaveCourse}
        editData={editingCourse}
      />
    </div>
  );
};

export default Courses;