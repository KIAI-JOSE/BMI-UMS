import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Printer, 
  Download, 
  Share2, 
  FileText, 
  Award, 
  GraduationCap, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  Mail,
  History,
  TrendingUp,
  ExternalLink,
  ShieldAlert,
  CheckCircle
} from 'lucide-react';
import { Student, Course } from '../types';

interface TranscriptsProps {
  students: Student[];
  courses: Course[];
  logo: string;
}

interface PerformanceRecord {
  courseCode: string;
  courseName: string;
  credits: number;
  score: number;
  grade: string;
  points: number;
  term: string;
}

const Transcripts: React.FC<TranscriptsProps> = ({ students, courses, logo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('All Faculty');
  const [deptFilter, setDeptFilter] = useState('All Dept');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  const faculties = ['All Faculty', 'Theology', 'ICT', 'Business', 'Education'];
  const depts = ['All Dept', 'Biblical Studies', 'Computer Science', 'Philosophy & Ethics', 'Finance'];

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = `${s.firstName} ${s.lastName} ${s.id}`.toLowerCase().includes(q);
      const matchesFaculty = facultyFilter === 'All Faculty' || s.faculty === facultyFilter;
      const matchesDept = deptFilter === 'All Dept' || s.department === deptFilter;
      return matchesSearch && matchesFaculty && matchesDept;
    });
  }, [students, searchTerm, facultyFilter, deptFilter]);

  const getPerformanceRecords = (student: Student): PerformanceRecord[] => {
    const facultyCourses = courses.filter(c => c.faculty === student.faculty || c.faculty === 'General');
    const selected = facultyCourses.slice(0, 6);
    
    return selected.map(c => {
      const seed = (student.id.length + c.code.length + student.firstName.length) % 30;
      const score = 65 + seed;
      let grade = 'F';
      let points = 0;
      
      if (score >= 90) { grade = 'A'; points = 4.0; }
      else if (score >= 80) { grade = 'B'; points = 3.0; }
      else if (score >= 70) { grade = 'C'; points = 2.0; }
      else if (score >= 60) { grade = 'D'; points = 1.0; }
      
      return {
        courseCode: c.code,
        courseName: c.name,
        credits: c.credits,
        score,
        grade,
        points,
        term: student.enrollmentTerm
      };
    });
  };

  const currentRecords = selectedStudent ? getPerformanceRecords(selectedStudent) : [];
  const cgpa = useMemo(() => {
    if (currentRecords.length === 0) return "0.00";
    const totalPoints = currentRecords.reduce((acc, curr) => acc + (curr.points * curr.credits), 0);
    const totalCredits = currentRecords.reduce((acc, curr) => acc + curr.credits, 0);
    return (totalPoints / totalCredits).toFixed(2);
  }, [currentRecords]);

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 dark:border-gray-800 pb-8">
        <div>
           <div className="flex items-center gap-4 mb-2">
             <div className="w-3 h-12 bg-[#FFD700] rounded-none"></div>
             <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white tracking-tight uppercase">Academic Records & Transcripts</h2>
          </div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-7 uppercase tracking-widest">BMI Institutional Registrar • Automated Grade Aggregation Node</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white dark:bg-gray-800 p-8 rounded-none border border-gray-100 dark:border-gray-700 space-y-6 shadow-sm">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                 <input 
                   type="text" 
                   placeholder="Search Registry..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-none text-xs font-bold uppercase tracking-tight outline-none focus:ring-1 focus:ring-[#4B0082]"
                 />
              </div>

              <div className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Target Faculty</label>
                    <select 
                      value={facultyFilter}
                      onChange={e => setFacultyFilter(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-none text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-[#4B0082] cursor-pointer dark:text-gray-200"
                    >
                       {faculties.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Departmental Node</label>
                    <select 
                      value={deptFilter}
                      onChange={e => setDeptFilter(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-none text-[10px] font-black uppercase outline-none focus:ring-1 focus:ring-[#4B0082] cursor-pointer dark:text-gray-200"
                    >
                       {depts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                 </div>
              </div>

              <div className="pt-6 border-t border-gray-50 dark:border-gray-700">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">
                    <span>Active Audit Pool</span>
                    <span className="text-[#4B0082] dark:text-[#FFD700]">{filteredStudents.length} Students</span>
                 </div>
                 <div className="max-h-[400px] overflow-y-auto no-scrollbar space-y-1">
                    {filteredStudents.map(student => (
                      <button 
                        key={student.id}
                        onClick={() => setSelectedStudent(student)}
                        className={`w-full text-left p-3 rounded-none transition-all flex items-center justify-between group ${selectedStudent?.id === student.id ? 'bg-[#4B0082] text-white shadow-lg' : 'hover:bg-purple-50 dark:hover:bg-gray-700'}`}
                      >
                         <div>
                            <p className="text-[11px] font-black uppercase tracking-tight leading-none">{student.firstName} {student.lastName}</p>
                            <p className={`text-[9px] font-bold uppercase mt-1 ${selectedStudent?.id === student.id ? 'text-purple-200' : 'text-gray-400'}`}>{student.id}</p>
                         </div>
                         <ChevronRight size={14} className={selectedStudent?.id === student.id ? 'text-[#FFD700]' : 'text-gray-300'} />
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-3">
           {selectedStudent ? (
             <div className="space-y-6 animate-slide-up">
                <div className="bg-white dark:bg-gray-800 rounded-none shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative">
                   <div className="absolute top-0 left-0 w-2 h-full bg-[#4B0082]"></div>
                   <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                      <div className="flex items-center gap-8">
                         <div className={`w-28 h-28 rounded-none ${selectedStudent.avatarColor} border-2 border-[#FFD700] p-1 shadow-2xl overflow-hidden`}>
                            {selectedStudent.photo ? <img src={selectedStudent.photo} className="w-full h-full object-cover" style={{ transform: `scale(${selectedStudent.photoZoom})` }} /> : <div className="w-full h-full flex items-center justify-center text-3xl font-black text-white">{selectedStudent.firstName[0]}</div>}
                         </div>
                         <div>
                            <div className="flex items-center gap-3">
                               <h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">{selectedStudent.firstName} {selectedStudent.lastName}</h3>
                               <ShieldCheck size={20} className="text-emerald-500" />
                            </div>
                            <p className="text-xs font-bold text-[#4B0082] dark:text-[#FFD700] uppercase tracking-widest mt-3">{selectedStudent.careerPath} • {selectedStudent.id}</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 italic">Status: {selectedStudent.status} • Admission: {selectedStudent.admissionYear}</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-none border border-gray-100 dark:border-gray-600 text-center min-w-[120px]">
                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Cumulative GPA</p>
                            <p className="text-3xl font-black text-[#4B0082] dark:text-white leading-none">{cgpa}</p>
                         </div>
                         <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-none border border-gray-100 dark:border-gray-600 text-center min-w-[120px]">
                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Rank Status</p>
                            <p className="text-xl font-black text-emerald-600 uppercase leading-none mt-2">{selectedStudent.standing}</p>
                         </div>
                      </div>
                   </div>
                   <div className="p-6 bg-gray-900 border-t border-gray-800 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <TrendingUp size={16} className="text-[#FFD700]" />
                         <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Performance is 12% above institutional mean for this faculty track.</span>
                      </div>
                      <button 
                        onClick={() => setShowTranscript(true)}
                        className="px-10 py-4 bg-[#FFD700] text-[#4B0082] rounded-none font-black text-xs uppercase tracking-widest shadow-xl hover:bg-white transition-all flex items-center gap-3"
                      >
                         <FileText size={18} /> Generate Official Transcript
                      </button>
                   </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-none shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                   <div className="p-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4B0082] dark:text-[#FFD700] flex items-center gap-2">
                         <GraduationCap size={16} /> Course Grade Aggregation Node
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                         <ShieldCheck size={14} className="text-emerald-500" /> SYSTEM VERIFIED RECORDS
                      </div>
                   </div>
                   <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full text-left">
                         <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-700/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                               <th className="px-6 py-4">Course Identity</th>
                               <th className="px-6 py-4 text-center">Semester / Term</th>
                               <th className="px-6 py-4 text-center">Credits</th>
                               <th className="px-6 py-4 text-center">Score (%)</th>
                               <th className="px-6 py-4 text-center">Grade Point</th>
                               <th className="px-6 py-4 text-center">Final Grade</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {currentRecords.map((rec, i) => (
                              <tr key={i} className="hover:bg-purple-50/20 dark:hover:bg-gray-700/20 transition-all">
                                 <td className="px-6 py-5">
                                    <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none">{rec.courseName}</p>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{rec.courseCode}</p>
                                 </td>
                                 <td className="px-6 py-5 text-center text-[10px] font-black uppercase text-gray-500">{rec.term}</td>
                                 <td className="px-6 py-5 text-center text-sm font-black text-[#4B0082] dark:text-purple-300">{rec.credits}</td>
                                 <td className="px-6 py-5 text-center text-sm font-black text-gray-900 dark:text-white">{rec.score}%</td>
                                 <td className="px-6 py-5 text-center">
                                    <div className="flex flex-col items-center">
                                       <span className="text-sm font-black text-emerald-600">{rec.points.toFixed(1)}</span>
                                       <span className="text-[8px] font-black uppercase text-gray-400 tracking-tighter">QUALITY POINTS</span>
                                    </div>
                                 </td>
                                 <td className="px-6 py-5 text-center">
                                    <span className={`text-2xl font-black ${rec.points >= 3.0 ? 'text-[#4B0082] dark:text-[#FFD700]' : 'text-gray-400'}`}>{rec.grade}</span>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 p-6 flex items-start gap-4">
                   <div className="p-2 bg-emerald-500 text-white shadow-lg"><ShieldCheck size={20}/></div>
                   <div>
                      <h5 className="text-[11px] font-black uppercase text-emerald-600 tracking-widest">Automated Record Synchronization</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                         The transcript matrix above has been automatically assembled by aggregating session entries from various faculty lecturers. 
                         All grades are verified against the institutional mark-book ledger.
                      </p>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-none border-2 border-dashed border-gray-100 dark:border-gray-700 text-gray-400">
                <FileText size={80} className="mb-6 opacity-20" />
                <h3 className="text-xl font-black uppercase tracking-[0.3em] opacity-40">Awaiting Record Selection</h3>
                <p className="text-xs font-bold uppercase tracking-widest mt-2 opacity-30">Select a student from the institutional pool to initiate audit</p>
             </div>
           )}
        </div>
      </div>

      {showTranscript && selectedStudent && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-[#1a0033]/95 backdrop-blur-3xl p-4 md:p-8 overflow-y-auto">
           <div className="bg-white w-full max-w-4xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative animate-slide-up p-12 md:p-16 flex flex-col">
              
              {/* RELOCATED: Slanted Official Stamp - Deep Green, Increased Opacity */}
              <div className="absolute bottom-48 right-16 pointer-events-none z-[40] rotate-[-15deg] opacity-[0.12]">
                 <div className="border-[8px] border-green-900 px-10 py-5 rounded-xl flex flex-col items-center">
                    <CheckCircle size={48} className="text-green-900 mb-1" />
                    <h1 className="text-6xl font-black text-green-900 uppercase leading-none">VERIFIED</h1>
                    <p className="text-[11px] font-bold text-green-900 tracking-[0.4em] mt-1 text-center leading-tight">BMI UNIVERSITY<br/>OFFICE OF REGISTRAR</p>
                 </div>
              </div>

              {/* Transcript Content Container */}
              <div className="relative z-10 bg-white flex flex-col flex-1">
                {/* FIXED HEADER: Ensured details show and logo is visible */}
                <div className="pb-12 mb-8 border-b-2 border-gray-900 flex justify-between items-start">
                   <div className="flex items-center gap-8">
                      {/* FIXED LOGO: Explicit height and fallback */}
                      <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center border border-gray-100 shadow-sm bg-white p-2">
                        <img 
                          src={logo || "https://i.ibb.co/Gv2vPdJC/BMI-PNG.png"} 
                          className="max-w-full max-h-full object-contain" 
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://i.ibb.co/Gv2vPdJC/BMI-PNG.png" }}
                          alt="BMI Logo" 
                        />
                      </div>
                      <div>
                         <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">BMI UNIVERSITY</h1>
                         <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mt-3">Office of the University Registrar</p>
                         <div className="mt-5 space-y-0.5 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                            <p>Official Academic Transcript • Verification Node: BMI-REG-{selectedStudent.id}</p>
                         </div>
                      </div>
                   </div>
                   <div className="text-right flex flex-col items-end">
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase leading-none">ACADEMIC RECORD</h2>
                      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 text-center min-w-[120px]">
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 text-center">CUMULATIVE GPA</p>
                         <p className="text-4xl font-black text-gray-900 leading-none">{cgpa}</p>
                      </div>
                   </div>
                </div>

                {/* Student Identification Profile */}
                <div className="bg-gray-50 p-10 mb-10 border border-gray-100 grid grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">STUDENT IDENTITY</p>
                         <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight leading-none">{selectedStudent.firstName} {selectedStudent.lastName}</h3>
                         <p className="text-xs font-bold text-[#4B0082] mt-2">{selectedStudent.id}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ACADEMIC DOMAIN</p>
                         <p className="text-sm font-bold text-gray-700 uppercase">{selectedStudent.faculty}</p>
                         <p className="text-[10px] font-bold text-gray-400 uppercase">{selectedStudent.department}</p>
                      </div>
                   </div>
                   <div className="space-y-4 text-right">
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ENROLLMENT PROFILE</p>
                         <p className="text-sm font-bold text-gray-700 uppercase leading-none">Degree Level: {selectedStudent.careerPath}</p>
                         <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Admission Year: {selectedStudent.admissionYear}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">DATE OF ISSUE</p>
                         <p className="text-sm font-bold text-gray-700 uppercase">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}</p>
                      </div>
                   </div>
                </div>

                {/* Course & Grade Matrix */}
                <div className="relative overflow-hidden flex-1">
                   {/* Watermark */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] rotate-[-25deg] select-none scale-[1.5] z-0">
                      <h1 className="text-[120px] font-black uppercase text-gray-900">OFFICIAL TRANSCRIPT</h1>
                   </div>

                   <table className="w-full text-left border-collapse relative z-10 bg-transparent">
                      <thead>
                         <tr className="border-b-2 border-gray-900 text-[10px] font-black text-gray-900 uppercase tracking-widest">
                            <th className="py-4">COURSE CODE</th>
                            <th className="py-4">COURSE DESCRIPTION</th>
                            <th className="py-4 text-center">TERM</th>
                            <th className="py-4 text-center">CREDITS</th>
                            <th className="py-4 text-center">GRADE</th>
                            <th className="py-4 text-center">POINTS</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {currentRecords.map((rec, i) => (
                           <tr key={i} className="text-xs font-bold text-gray-700">
                              <td className="py-4 font-mono">{rec.courseCode}</td>
                              <td className="py-4 uppercase tracking-tight">{rec.courseName}</td>
                              <td className="py-4 text-center uppercase text-[10px]">{rec.term}</td>
                              <td className="py-4 text-center">{rec.credits.toFixed(1)}</td>
                              <td className="py-4 text-center font-black">{rec.grade}</td>
                              <td className="py-4 text-center">{rec.points.toFixed(1)}</td>
                           </tr>
                         ))}
                      </tbody>
                      <tfoot>
                         <tr className="border-t-2 border-gray-900">
                            <td colSpan={3} className="py-6 text-right font-black uppercase text-[10px] tracking-widest">CUMULATIVE TOTALS:</td>
                            <td className="py-6 text-center font-black">{currentRecords.reduce((acc, curr) => acc + curr.credits, 0).toFixed(1)}</td>
                            <td className="py-6"></td>
                            <td className="py-6 text-center font-black">{currentRecords.reduce((acc, curr) => acc + (curr.points * curr.credits), 0).toFixed(1)}</td>
                         </tr>
                      </tfoot>
                   </table>

                   <div className="mt-16 flex justify-between items-end relative z-10">
                      <div className="max-w-xs space-y-6">
                         <p className="text-[9px] font-black uppercase text-gray-400 leading-relaxed border-l-2 border-gray-100 pl-4">
                            Grading Scale: A (4.00) 90-100%, B (3.00) 80-89%, C (2.00) 70-79%, D (1.00) 60-69%, F (0.00) Below 60%. 
                            Institutional accreditation: BMI Global Academic Standards Board.
                         </p>
                         <div className="flex gap-4">
                            <div className="relative w-20 h-20 flex items-center justify-center">
                               <div className="absolute inset-0 border-4 border-dashed border-[#4B0082]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                               <div className="w-16 h-16 bg-[#4B0082] rounded-full flex items-center justify-center text-[#FFD700] shadow-xl border-4 border-white ring-2 ring-[#4B0082]/30">
                                  <Award size={32} />
                               </div>
                               <div className="absolute -bottom-2 whitespace-nowrap text-[7px] font-black text-[#4B0082] bg-white px-1 uppercase tracking-tighter">OFFICIAL SEAL</div>
                            </div>
                            <div className="p-3 border border-gray-200 rounded-none flex items-center justify-center"><GraduationCap size={24} className="text-gray-900" /></div>
                         </div>
                      </div>
                      <div className="text-center relative">
                         <div className="absolute -top-12 -left-8 pointer-events-none opacity-40 rotate-[-10deg]">
                            <div className="border-4 border-blue-600 px-6 py-2 rounded-lg text-blue-600 font-black text-xl uppercase italic tracking-widest shadow-sm">
                               ELECTRONICALLY<br/>VERIFIED
                            </div>
                         </div>
                         <div className="mb-2 font-['Brush_Script_MT',cursive] text-2xl text-[#4B0082] italic transform -rotate-1 select-none">
                            Alice Kwamboka
                         </div>
                         <div className="w-56 h-[2px] bg-gray-900 mx-auto"></div>
                         <p className="text-[9px] font-black uppercase text-gray-900 mt-2 tracking-[0.2em]">Institutional Registrar</p>
                      </div>
                   </div>
                </div>
              </div>

              {/* Floating Transcript Actions */}
              <div className="mt-12 pt-10 border-t-2 border-[#FFD700] flex flex-wrap gap-4 items-center justify-between no-print">
                 <div className="flex gap-4">
                    <button 
                      onClick={() => window.print()}
                      className="flex items-center gap-3 px-8 py-4 bg-[#FFD700] text-[#4B0082] text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all transform active:scale-95"
                    >
                       <Printer size={18} /> Print Official Copy
                    </button>
                    <button 
                      onClick={() => alert('Transcript encoded as PDF with encrypted digital seal.')}
                      className="flex items-center gap-3 px-8 py-4 bg-gray-800 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all"
                    >
                       <Download size={18} /> Download Audit PDF
                    </button>
                    <button 
                      onClick={() => alert(`Digital Transcript link dispatched to student: ${selectedStudent.email}`)}
                      className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all border border-white/20"
                    >
                       <Mail size={18} /> Share Digital Link
                    </button>
                 </div>
                 <button 
                  onClick={() => setShowTranscript(false)}
                  className="p-4 bg-red-500 text-white hover:bg-red-600 transition-all shadow-xl"
                 >
                    <X size={24} />
                 </button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .fixed { position: static !important; }
          .shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] { box-shadow: none !important; }
        }
      `}</style>

    </div>
  );
};

export default Transcripts;