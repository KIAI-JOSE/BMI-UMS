import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Calendar, 
  Clock, 
  GraduationCap, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Plus, 
  MapPin, 
  ChevronRight, 
  Printer, 
  Download, 
  Filter, 
  FileText,
  ShieldCheck,
  UserCheck,
  Trophy
} from 'lucide-react';

interface ExamRecord {
  id: string;
  course: string;
  code: string;
  date: string;
  time: string;
  venue: string;
  proctor: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Papers Processing';
}

interface GradeRecord {
  id: string;
  student: string;
  studentId: string;
  course: string;
  midterm: number;
  final: number;
  total: number;
  grade: string;
  gpa: number;
  status: 'Verified' | 'Pending Review' | 'Flagged';
}

const Exams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'grading'>('schedule');
  const [searchTerm, setSearchTerm] = useState('');

  const upcomingExams: ExamRecord[] = [
    { id: 'EX-901', course: 'Systematic Theology I', code: 'THEO101', date: '2024-06-12', time: '09:00 AM', venue: 'Main Hall', proctor: 'Dr. Kiptoo', status: 'Scheduled' },
    { id: 'EX-902', course: 'Introduction to Web Dev', code: 'CS101', date: '2024-06-14', time: '02:00 PM', venue: 'Lab 204', proctor: 'Prof. Mwangi', status: 'Papers Processing' },
    { id: 'EX-903', course: 'Counseling Ethics', code: 'MDIV550', date: '2024-06-15', time: '11:00 AM', venue: 'Room 12B', proctor: 'Rev. Omolo', status: 'Scheduled' },
    { id: 'EX-904', course: 'Biblical Hermeneutics', code: 'THEO200', date: '2024-06-18', time: '08:30 AM', venue: 'Bethlehem Hall', proctor: 'Dr. Jane Okumu', status: 'Scheduled' },
  ];

  const rawGradeData = [
    { id: 'GR-001', student: 'Aaron Keitany', studentId: 'BMI-2022-001', course: 'Systematic Theology I', midterm: 88, final: 92, status: 'Verified' },
    { id: 'GR-002', student: 'Beatrice Wanjiku', studentId: 'BMI-2023-012', course: 'Intro to ICT', midterm: 75, final: 82, status: 'Verified' },
    { id: 'GR-003', student: 'Caleb Rotich', studentId: 'BMI-2023-045', course: 'Biblical Greek', midterm: 92, final: 95, status: 'Verified' },
    { id: 'GR-004', student: 'Diana Waweru', studentId: 'BMI-2022-088', course: 'Strategic Business', midterm: 62, final: 55, status: 'Flagged' },
    { id: 'GR-005', student: 'Edward Lowasa', studentId: 'BMI-2023-102', course: 'Systematic Theology I', midterm: 78, final: 81, status: 'Pending Review' },
    { id: 'GR-006', student: 'Faith Chepkirui', studentId: 'BMI-2023-055', course: 'Education Pedagogy', midterm: 85, final: 88, status: 'Verified' },
  ];

  const calculateGradeDetails = (midterm: number, final: number) => {
    const total = Math.round((midterm + final) / 2);
    let grade = 'F';
    let gpa = 0.0;

    if (total >= 90) { grade = 'A'; gpa = 4.0; }
    else if (total >= 80) { grade = 'B'; gpa = 3.0; }
    else if (total >= 70) { grade = 'C'; gpa = 2.0; }
    else if (total >= 60) { grade = 'D'; gpa = 1.0; }
    else { grade = 'F'; gpa = 0.0; }

    return { total, grade, gpa };
  };

  const gradeReviewData: GradeRecord[] = useMemo(() => {
    return rawGradeData.map(item => {
      const { total, grade, gpa } = calculateGradeDetails(item.midterm, item.final);
      return {
        ...item,
        total,
        grade,
        gpa,
        status: item.status as GradeRecord['status']
      };
    });
  }, []);

  const filteredExams = upcomingExams.filter(ex => ex.course.toLowerCase().includes(searchTerm.toLowerCase()) || ex.code.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredGrades = gradeReviewData.filter(g => g.student.toLowerCase().includes(searchTerm.toLowerCase()) || g.studentId.toLowerCase().includes(searchTerm.toLowerCase()));

  const metrics = useMemo(() => {
    if (gradeReviewData.length === 0) return { institutionalGpa: "0.00", completionRate: "0.0", honorsPool: 0 };
    
    const totalGpa = gradeReviewData.reduce((acc, curr) => acc + curr.gpa, 0);
    const passes = gradeReviewData.filter(g => g.total >= 50).length;
    const honors = gradeReviewData.filter(g => g.total >= 80).length;

    return {
      institutionalGpa: (totalGpa / gradeReviewData.length).toFixed(2),
      completionRate: ((passes / gradeReviewData.length) * 100).toFixed(1),
      honorsPool: honors
    };
  }, [gradeReviewData]);

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 dark:border-gray-800 pb-8">
        <div>
           <div className="flex items-center gap-4 mb-2">
             <div className="w-3 h-12 bg-[#FFD700] rounded-none"></div>
             <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white tracking-tight uppercase">Assessment & Academic Standards</h2>
          </div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-7 uppercase tracking-widest">BMI Institutional Oversight • Examination Registry & Grading Ledger</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex bg-white dark:bg-gray-800 p-1 rounded-none shadow-sm border border-gray-100 dark:border-gray-700">
             <button onClick={() => setActiveTab('schedule')} className={`px-6 py-2.5 rounded-none text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'schedule' ? 'bg-[#4B0082] text-white shadow-lg' : 'text-gray-400 hover:text-[#4B0082]'}`}>
                Exam Schedule
             </button>
             <button onClick={() => setActiveTab('grading')} className={`px-6 py-2.5 rounded-none text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'grading' ? 'bg-[#4B0082] text-white shadow-lg' : 'text-gray-400 hover:text-[#4B0082]'}`}>
                Grade Review
             </button>
           </div>
           <button className="flex items-center gap-2 px-8 py-4 bg-[#4B0082] text-white rounded-none shadow-xl hover:bg-black transition-all font-black text-xs uppercase tracking-widest border border-[#FFD700]/30">
            <Plus size={18} className="text-[#FFD700]" /> {activeTab === 'schedule' ? 'Schedule Exam' : 'Enter Grades'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-none border border-gray-100 dark:border-gray-700 space-y-6">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Filter Registry..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-none text-xs font-bold uppercase tracking-tight outline-none focus:ring-1 focus:ring-[#4B0082]"
                />
             </div>
             
             <div className="space-y-4 pt-4">
                <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Performance Metrics</h4>
                <div className="space-y-3">
                   <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Institutional GPA</span>
                      <span className="text-sm font-black text-[#4B0082] dark:text-[#FFD700]">{metrics.institutionalGpa}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Completion Rate</span>
                      <span className="text-sm font-black text-emerald-600">{metrics.completionRate}%</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Honors Pool</span>
                      <span className="text-sm font-black text-blue-600">{metrics.honorsPool} Students</span>
                   </div>
                </div>
             </div>

             <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <button className="w-full py-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#4B0082] transition-all flex items-center justify-center gap-2 shadow-lg">
                   <Download size={14} /> Export Global Audit
                </button>
                <button className="w-full mt-2 py-4 border-2 border-gray-900 text-gray-900 dark:text-white text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                   <Printer size={14} /> Print Master Ledger
                </button>
             </div>
          </div>

          <div className="bg-[#4B0082] p-8 rounded-none border-l-4 border-[#FFD700] text-white shadow-xl relative overflow-hidden">
             <Trophy size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12" />
             <div className="relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#FFD700] mb-2">Chancellor's List</h4>
                <p className="text-xs font-medium leading-relaxed opacity-80">
                   The next honors convocation is scheduled for July 12th. Grades must be finalized and verified by the Dean before the close of business this Friday.
                </p>
                <button className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:underline">
                   View Requirements <ChevronRight size={12} />
                </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'schedule' ? (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-none shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <Calendar size={16} className="text-[#FFD700]" /> Scheduled Assessment Sessions
                   </h3>
                   <span className="text-[9px] font-bold text-gray-400 uppercase">Q2 Academic Cycle</span>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-gray-700">
                  {filteredExams.map((exam) => (
                    <div key={exam.id} className="p-6 flex flex-wrap gap-8 items-center justify-between hover:bg-purple-50/20 dark:hover:bg-gray-700/20 transition-all group">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 border-l-4 border-[#4B0082] flex flex-col items-center justify-center shadow-inner">
                             <span className="text-[10px] font-black text-[#4B0082] dark:text-purple-300">{exam.date.split('-')[1]}/{exam.date.split('-')[2]}</span>
                             <span className="text-lg font-black text-gray-900 dark:text-white">JUN</span>
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight text-lg leading-none">{exam.course}</h4>
                            <div className="flex items-center gap-3 mt-2">
                               <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-0.5 font-bold text-gray-500 uppercase tracking-tighter border border-gray-200 dark:border-gray-600">{exam.code}</span>
                               <span className="text-xs font-bold text-gray-400 flex items-center gap-1 uppercase tracking-widest"><MapPin size={12} /> {exam.venue}</span>
                            </div>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-12">
                          <div className="text-center">
                             <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Time Control</p>
                             <p className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1 uppercase"><Clock size={12} /> {exam.time}</p>
                          </div>
                          <div className="text-center w-32">
                             <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Status</p>
                             <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest border inline-block ${
                               exam.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                               exam.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                               'bg-amber-50 text-amber-700 border-amber-200'
                             }`}>
                                {exam.status}
                             </span>
                          </div>
                          <button className="p-3 text-gray-300 hover:text-[#4B0082] transition-colors"><ChevronRight size={20}/></button>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-none shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <GraduationCap size={16} className="text-[#FFD700]" /> Institutional Grade Review Console
                   </h3>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold">
                         <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                         Verified
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold">
                         <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                         Flagged
                      </div>
                   </div>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700/30 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                        <th className="px-6 py-4">Student Identity</th>
                        <th className="px-6 py-4">Module Code</th>
                        <th className="px-6 py-4 text-center">Midterm (%)</th>
                        <th className="px-6 py-4 text-center">Final (%)</th>
                        <th className="px-6 py-4 text-center">Calculated Total (%)</th>
                        <th className="px-6 py-4 text-center">Letter Grade</th>
                        <th className="px-6 py-4 text-center">Status</th>
                        <th className="px-6 py-4 text-right">Commit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                      {filteredGrades.map((grade) => (
                        <tr key={grade.id} className="hover:bg-purple-50/20 dark:hover:bg-gray-700/20 transition-all group">
                          <td className="px-6 py-5">
                            <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none">{grade.student}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{grade.studentId}</p>
                          </td>
                          <td className="px-6 py-5">
                             <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-[#4B0082] dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 border border-purple-100 dark:border-purple-800 uppercase tracking-tighter">
                                  {grade.course.split(' ').map(w => w[0]).join('')}
                                </span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate max-w-[120px]">{grade.course}</span>
                             </div>
                          </td>
                          <td className="px-6 py-5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">{grade.midterm}</td>
                          <td className="px-6 py-5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">{grade.final}</td>
                          <td className="px-6 py-5 text-center text-sm font-black text-gray-900 dark:text-white">{grade.total}%</td>
                          <td className="px-6 py-5 text-center">
                             <span className={`text-lg font-black ${grade.total >= 90 ? 'text-emerald-600' : grade.total < 60 ? 'text-red-600' : 'text-[#4B0082] dark:text-[#FFD700]'}`}>
                                {grade.grade}
                             </span>
                          </td>
                          <td className="px-6 py-5 text-center">
                             <div className="flex justify-center">
                                {grade.status === 'Verified' ? <ShieldCheck size={18} className="text-emerald-500" /> : grade.status === 'Flagged' ? <AlertTriangle size={18} className="text-red-500" /> : <Clock size={18} className="text-amber-500" />}
                             </div>
                          </td>
                          <td className="px-6 py-5 text-right">
                             <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-gray-400 hover:text-blue-500"><FileText size={16}/></button>
                                <button className="p-2 text-gray-400 hover:text-emerald-500"><UserCheck size={16}/></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 flex items-start gap-4">
                 <div className="p-2 bg-red-500 text-white shadow-lg"><ShieldCheck size={20}/></div>
                 <div>
                    <h5 className="text-[11px] font-black uppercase text-red-600 tracking-widest">Administrative Protocol: Grade Finalization</h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                       Once a grade is marked as "Verified," it is committed to the immutable student transcript database. 
                       Further modifications require a formal appeal process authorized by the Faculty Board.
                    </p>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Grading System Section */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-none border border-gray-100 dark:border-gray-700">
         <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-6">Grading System Specification</h4>
         <div className="grid grid-cols-5 gap-2 opacity-80">
            <div className="flex justify-between px-2 border-r border-gray-100 dark:border-gray-700"><span>A (70-100%)</span></div>
            <div className="flex justify-between px-2 border-r border-gray-100 dark:border-gray-700"><span>B (60-69%)</span></div>
            <div className="flex justify-between px-2 border-r border-gray-100 dark:border-gray-700"><span>C (50-59%)</span></div>
            <div className="flex justify-between px-2 border-r border-gray-100 dark:border-gray-700"><span>D (40-49%)</span></div>
            <div className="flex justify-between px-2 text-red-600 font-bold"><span>F ({"<"}40%)</span></div>
         </div>
      </div>
    </div>
  );
};

export default Exams;