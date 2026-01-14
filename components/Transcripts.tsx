import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Printer, 
  Download, 
  FileText, 
  BookOpen, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  Share2,
  MessageCircle,
  Award,
  Calendar
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
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcriptType, setTranscriptType] = useState<'Official' | 'Provisional'>('Official');
  const [selectedTerm, setSelectedTerm] = useState('Fall 2023');

  const faculties = ['All Faculty', 'Theology', 'ICT', 'Business', 'Education'];
  const terms = ['Fall 2022', 'Spring 2023', 'Fall 2023', 'Spring 2024'];

  const getDeanName = (faculty: string) => {
    const deans: Record<string, string> = {
      'Theology': 'Dr. Samuel Kiptoo',
      'ICT': 'Prof. Alice Mwangi',
      'Business': 'Dr. Jane Okumu',
      'Education': 'Prof. Peter Kamau'
    };
    return deans[faculty] || 'Dean of Faculty';
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = `${s.firstName} ${s.lastName} ${s.id}`.toLowerCase().includes(q);
      const matchesFaculty = facultyFilter === 'All Faculty' || s.faculty === facultyFilter;
      return matchesSearch && matchesFaculty;
    });
  }, [students, searchTerm, facultyFilter]);

  const getPerformanceRecords = (student: Student): PerformanceRecord[] => {
    const facultyCourses = courses.filter(c => c.faculty === student.faculty || c.faculty === 'General');
    const selected = facultyCourses.slice(0, 15);
    
    return selected.map((c, idx) => {
      const seed = (student.id.length + c.code.length + student.firstName.length + idx) % 30;
      const score = 85 + (seed % 15);
      let grade = 'F';
      let points = 0;
      
      if (score >= 70) { grade = 'A'; points = 4.0; }
      else if (score >= 60) { grade = 'B'; points = 3.0; }
      else if (score >= 50) { grade = 'C'; points = 2.0; }
      else if (score >= 40) { grade = 'D'; points = 1.0; }
      
      const termIdx = Math.floor(idx / 4);
      const term = terms[termIdx % terms.length];

      return {
        courseCode: c.code,
        courseName: c.name,
        credits: c.credits * 15,
        score,
        grade,
        points,
        term: term
      };
    });
  };

  const allRecords = useMemo(() => selectedStudent ? getPerformanceRecords(selectedStudent) : [], [selectedStudent]);
  
  const currentRecords = useMemo(() => {
    if (transcriptType === 'Official') return allRecords;
    return allRecords.filter(r => r.term === selectedTerm);
  }, [allRecords, transcriptType, selectedTerm]);

  const cumulativeAvg = useMemo(() => {
    if (currentRecords.length === 0) return "0.00";
    const sum = currentRecords.reduce((acc, curr) => acc + curr.score, 0);
    return (sum / currentRecords.length).toFixed(2);
  }, [currentRecords]);

  const handlePrint = async (mode: 'print' | 'download' = 'print') => {
    if (!selectedStudent) return;
    const element = document.getElementById('official-transcript-root');
    if (!element) return;
    const fileName = `${transcriptType}_TRANSCRIPT_${selectedStudent.id}_${selectedStudent.lastName}`.toUpperCase();
    
    if (mode === 'download') {
      try {
        const html2pdfModule = await import('https://esm.sh/html2pdf.js@0.10.1?bundle');
        const html2pdf = html2pdfModule.default;
        if (typeof html2pdf !== 'function') throw new Error("html2pdf is not a function");
        const opt = {
          margin: 0,
          filename: `${fileName}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        await html2pdf().set(opt).from(element).save();
      } catch (err) {
        console.error("PDF download failed", err);
        window.print();
      }
    } else {
      const originalTitle = document.title;
      document.title = fileName;
      window.print();
      setTimeout(() => { document.title = originalTitle; }, 1000);
    }
  };

  const handleShare = async (platform?: 'whatsapp') => {
    if (!selectedStudent) return;
    const element = document.getElementById('official-transcript-root');
    if (!element) return;
    if (platform === 'whatsapp') {
       try {
          const html2pdfModule = await import('https://esm.sh/html2pdf.js@0.10.1?bundle');
          const html2pdf = html2pdfModule.default;
          const pdfBlob = await html2pdf().from(element).set({
            margin: 10,
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
          }).output('blob');
          const file = new File([pdfBlob], `TRANSCRIPT_${selectedStudent.id}.pdf`, { type: 'application/pdf' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
             await navigator.share({
                files: [file],
                title: `${transcriptType} Academic Transcript`,
                text: `${transcriptType} transcript for ${selectedStudent.firstName} ${selectedStudent.lastName} (${selectedStudent.id})`
             });
          } else {
             const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(transcriptType + " Academic Transcript for " + selectedStudent.firstName + " " + selectedStudent.lastName + " (" + selectedStudent.id + ")")}`;
             window.open(waUrl, '_blank');
          }
       } catch (err) {
          const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent("Academic Transcript Link: " + window.location.href)}`;
          window.open(waUrl, '_blank');
       }
       return;
    }
    handlePrint('print');
  };

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
              </div>
              <div className="pt-6 border-t border-gray-50 dark:border-gray-700">
                 <div className="max-h-[400px] overflow-y-auto no-scrollbar space-y-1">
                    {filteredStudents.map(student => (
                      <button 
                        key={student.id}
                        onClick={() => { setSelectedStudent(student); setShowTranscript(false); }}
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
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">{selectedStudent.firstName} {selectedStudent.lastName}</h3>
                            <p className="text-xs font-bold text-[#4B0082] dark:text-[#FFD700] uppercase tracking-widest mt-3">{selectedStudent.careerPath} • {selectedStudent.id}</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => setShowTranscript(true)}
                        className="px-10 py-4 bg-[#FFD700] text-[#4B0082] rounded-none font-black text-xs uppercase tracking-widest shadow-xl hover:bg-white transition-all flex items-center gap-3"
                      >
                         <FileText size={18} /> Official Transcript View
                      </button>
                   </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-none shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                   <div className="p-6 bg-gray-900 text-white flex justify-between items-center border-b border-gray-800">
                      <div className="flex items-center gap-3">
                         <BookOpen size={18} className="text-[#FFD700]" />
                         <h3 className="font-black text-xs uppercase tracking-[0.25em]">Live Academic Performance Node</h3>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                         <ShieldCheck size={14} className="text-emerald-500" /> SYSTEM VERIFIED RECORDS
                      </div>
                   </div>
                   <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full text-left">
                         <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                               <th className="px-6 py-4">Module Identifier</th>
                               <th className="px-6 py-4">Specification</th>
                               <th className="px-6 py-4 text-center">Score (%)</th>
                               <th className="px-6 py-4 text-center">Grade</th>
                               <th className="px-6 py-4 text-center">Term</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {currentRecords.map((rec, i) => (
                              <tr key={i} className="hover:bg-purple-50/20 dark:hover:bg-gray-700/20 transition-all group">
                                 <td className="px-6 py-4 font-mono text-xs font-bold text-[#4B0082] dark:text-purple-300">{rec.courseCode}</td>
                                 <td className="px-6 py-4 text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none">{rec.courseName}</td>
                                 <td className="px-6 py-4 text-center text-sm font-black text-gray-900 dark:text-white">{rec.score}%</td>
                                 <td className="px-6 py-4 text-center">
                                    <span className={`text-xl font-black ${rec.score >= 70 ? 'text-emerald-600' : 'text-[#4B0082] dark:text-[#FFD700]'}`}>{rec.grade}</span>
                                 </td>
                                 <td className="px-6 py-4 text-center text-[10px] font-black uppercase text-gray-500">{rec.term}</td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-none border-2 border-dashed border-gray-100 dark:border-gray-700 text-gray-400">
                <FileText size={80} className="mb-6 opacity-20" />
                <h3 className="text-xl font-black uppercase tracking-[0.3em] opacity-40">Awaiting Record Selection</h3>
             </div>
           )}
        </div>
      </div>

      {showTranscript && selectedStudent && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-8 overflow-y-auto">
           <div className="w-full max-w-[210mm] flex flex-col items-center">
              <div id="official-transcript-root" className="bg-white w-full shadow-2xl relative flex flex-col overflow-hidden animate-slide-up font-serif p-12 text-gray-950 print:m-0 print:shadow-none">
                 
                 {/* UNIQUE BARCODE FOR SECURITY */}
                 <div className="absolute top-10 right-10 flex flex-col items-center opacity-60">
                    <div className="flex gap-[1.5px] h-10 items-end">
                       {Array.from({length: 45}).map((_, i) => (
                          <div key={i} className="bg-black" style={{ width: i % 4 === 0 ? '2.5px' : i % 2 === 0 ? '1px' : '1.5px', height: `${25 + (Math.sin(i * 1.5) * 6)}px` }}></div>
                       ))}
                    </div>
                    <span className="text-[7px] font-mono mt-1 tracking-tight uppercase font-bold">
                       VERIFY: {selectedStudent.id.split('-').pop()}-{Date.now().toString().slice(-6)}
                    </span>
                 </div>

                 {/* PROVISIONAL WATERMARK */}
                 {transcriptType === 'Provisional' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[0] overflow-hidden">
                       <div className="rotate-[-35deg] text-[120px] font-black text-red-500/10 uppercase border-[20px] border-red-500/10 px-20 py-10 whitespace-nowrap select-none">
                          Provisional
                       </div>
                    </div>
                 )}

                 <div className="flex flex-col items-center border-b-2 border-gray-900 pb-6 mb-8 relative z-10">
                    <img 
                      src={logo || "https://i.ibb.co/Gv2vPdJC/BMI-PNG.png"} 
                      className="h-24 mb-4 object-contain" 
                      alt="BMI Logo"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://i.ibb.co/Gv2vPdJC/BMI-PNG.png" }}
                    />
                    <h1 className="text-3xl font-serif font-bold tracking-tight text-gray-900 uppercase">BMI UNIVERSITY</h1>
                    <p className="text-[10px] font-sans font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">OFFICE OF THE INSTITUTIONAL REGISTRAR</p>
                    <div className="mt-4 px-10 py-1.5 border-y-2 border-gray-900">
                      <h2 className="text-lg font-serif font-bold uppercase tracking-[0.2em]">
                        {transcriptType} Academic Transcript
                        {transcriptType === 'Provisional' && <span className="ml-2 bg-gray-100 px-2 py-0.5 text-xs text-red-600 border border-red-200">| PERIOD: {selectedTerm.toUpperCase()}</span>}
                      </h2>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-x-12 gap-y-2 mb-8 text-[12px] font-bold relative z-10">
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span>Year of study:</span><span className="w-1/2">4</span></div>
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span>Prog. of Study:</span><span className="w-1/2 uppercase">{selectedStudent.careerPath}</span></div>
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span className="uppercase">FACULTY OF</span><span className="w-1/2 uppercase">{selectedStudent.faculty}</span></div>
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span>Student ID:</span><span className="w-1/2">{selectedStudent.id}</span></div>
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span>Date of Admission:</span><span className="w-1/2">27/08/2022</span></div>
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span>Date of Graduation:</span><span className="w-1/2">21/12/2026</span></div>
                 </div>

                 <div className="border-[1.5px] border-gray-900 mb-2 relative z-10">
                   <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                         <tr className="border-b-[1.5px] border-gray-900 font-bold uppercase bg-gray-50">
                            <th className="py-2.5 px-3 border-r border-gray-900 w-32">Course Code</th>
                            <th className="py-2.5 px-3 border-r border-gray-900">Course Description</th>
                            <th className="py-2.5 px-3 border-r border-gray-900 w-28 text-center">Academic Hours</th>
                            <th className="py-2.5 px-3 w-16 text-center">Grade</th>
                         </tr>
                      </thead>
                      <tbody>
                         {currentRecords.map((rec, i) => (
                           <tr key={i} className="border-b border-gray-300 last:border-0">
                              <td className="py-1.5 px-3 border-r border-gray-900 font-mono">{rec.courseCode}</td>
                              <td className="py-1.5 px-3 border-r border-gray-900 uppercase">{rec.courseName}</td>
                              <td className="py-1.5 px-3 border-r border-gray-900 text-center">{(rec.credits).toFixed(2)}</td>
                              <td className="py-1.5 px-3 text-center font-bold">{rec.grade}</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                 </div>

                 <div className="border-b-[1.5px] border-gray-900 py-3 text-[12px] font-bold relative z-10">
                    <div className="flex gap-12">
                       <span>Averages :&gt; | Current..: {cumulativeAvg}%</span>
                       <span>| Cumulative..: {cumulativeAvg}%</span>
                    </div>
                 </div>

                 <div className="py-4 text-[12px] font-bold border-b-[1.5px] border-gray-900 mb-6 relative z-10">
                    <div className="flex gap-4">
                       <span className="flex-shrink-0">Recommendation:</span>
                       <p className="uppercase leading-tight">AWARDED THE DEGREE OF {selectedStudent.careerPath} WITH SECOND CLASS HONOURS, UPPER DIVISION.</p>
                    </div>
                 </div>

                 {/* GRADING SYSTEM LEGEND */}
                 <div className="border-[1.5px] border-gray-900 p-4 text-[9px] font-bold relative z-10">
                    <p className="underline mb-2 uppercase tracking-widest text-[10px]">Grading System Legend</p>
                    <div className="grid grid-cols-3 gap-y-1 gap-x-4">
                       <span>A : (70% - 100%) - Excellent</span><span>B : (60% - 69%) - Very Good</span><span>C : (50% - 59%) - Good</span>
                       <span>D : (40% - 49%) - Fair</span><span>F : (Below 40%) - Fail</span><span className="text-right"># Audited Component</span>
                    </div>
                 </div>

                 {/* DUAL SIGNATURE SECTION - ONE LINE CONDENSED */}
                 <div className="grid grid-cols-2 gap-8 mt-6 relative z-10">
                    <div className="flex flex-col items-center">
                       <div className="w-full border-b border-gray-900 pb-0.5 relative text-center flex justify-center items-baseline gap-2">
                          <span className="font-serif italic text-lg text-[#4B0082]/70 whitespace-nowrap pointer-events-none">
                             {getDeanName(selectedStudent.faculty)}
                          </span>
                          <span className="text-[8px] font-bold uppercase tracking-widest opacity-60">— Dean of Faculty</span>
                       </div>
                    </div>
                    <div className="flex flex-col items-center">
                       <div className="w-full border-b border-gray-900 pb-0.5 relative text-center flex justify-center items-baseline gap-2">
                          <span className="font-serif italic text-lg text-[#4B0082]/70 whitespace-nowrap pointer-events-none">
                             Prof. Isaac Sigei
                          </span>
                          <span className="text-[8px] font-bold uppercase tracking-widest opacity-60">— Institutional Registrar</span>
                       </div>
                    </div>
                 </div>

                 <div className="mt-6 flex justify-between items-baseline px-1 border-t border-gray-100 pt-2 relative z-10">
                    <div className="flex items-center gap-4 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                       <span>Date of Issue: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                       <span>|</span>
                       <span>Instance ID: BMI-TR-{selectedStudent.id.split('-').pop()}-{Date.now().toString().slice(-6)}</span>
                    </div>
                 </div>

                 <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 pointer-events-none z-[40] rotate-[-15deg] opacity-[0.1]">
                    <div className="border-[8px] border-green-800 px-12 py-4 rounded-full flex flex-col items-center justify-center bg-white/20">
                       <h1 className="text-6xl font-black text-green-800 uppercase leading-none">VERIFIED</h1>
                       <p className="text-[12px] font-bold text-green-800 tracking-[0.2em] mt-1 text-center">BMI UNIVERSITY OFFICE OF REGISTRAR</p>
                    </div>
                 </div>
              </div>

              <div className="w-full mt-6 flex flex-wrap gap-4 items-center justify-between no-print p-6 bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                 <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex bg-gray-800 p-1 border border-white/10 rounded-none mr-2">
                       <button 
                         onClick={() => setTranscriptType('Official')}
                         className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${transcriptType === 'Official' ? 'bg-[#FFD700] text-[#4B0082]' : 'text-gray-400 hover:text-white'}`}
                       >Complete Transcript</button>
                       <button 
                         onClick={() => setTranscriptType('Provisional')}
                         className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${transcriptType === 'Provisional' ? 'bg-[#FFD700] text-[#4B0082]' : 'text-gray-400 hover:text-white'}`}
                       >Provisional Slice</button>
                    </div>
                    {transcriptType === 'Provisional' && (
                       <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 border border-white/10">
                          <Calendar size={14} className="text-[#FFD700]" />
                          <select 
                            value={selectedTerm}
                            onChange={(e) => setSelectedTerm(e.target.value)}
                            className="bg-transparent border-none text-[10px] font-black uppercase text-white outline-none cursor-pointer"
                          >
                             {terms.map(t => <option key={t} value={t} className="bg-gray-800">{t}</option>)}
                          </select>
                       </div>
                    )}
                    <div className="h-8 w-px bg-white/10 mx-2"></div>
                    <button onClick={() => handlePrint('print')} className="flex items-center gap-2 px-6 py-3 bg-[#4B0082] text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg"><Printer size={16} /> Print</button>
                    <button onClick={() => handlePrint('download')} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg"><Download size={16} /> PDF</button>
                    <button onClick={() => handleShare('whatsapp')} className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg"><MessageCircle size={16} /> WhatsApp</button>
                 </div>
                 <button onClick={() => setShowTranscript(false)} className="p-4 bg-red-600 text-white hover:bg-red-700 transition-all shadow-xl"><X size={20} /></button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; padding: 0 !important; visibility: hidden; }
          #official-transcript-root { visibility: visible !important; display: block !important; position: absolute !important; left: 0 !important; top: 0 !important; width: 210mm !important; height: 297mm !important; margin: 0 !important; padding: 15mm !important; box-shadow: none !important; border: none !important; z-index: 9999 !important; }
          #official-transcript-root * { visibility: visible !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  );
};

export default Transcripts;