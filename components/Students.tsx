
import React, { useState, useMemo } from 'react';
import { 
  X, 
  GraduationCap, 
  Users, 
  Edit, 
  Trash2, 
  LayoutGrid, 
  List,
  CheckCircle2,
  Heart,
  Plus
} from 'lucide-react';
import StudentRegistrationModal from './StudentRegistrationModal';

interface Student {
  id: string; // Admission Number
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  email: string;
  phone: string;
  ssn?: string;
  birthdate: string;
  gender: string;
  maritalStatus: string;
  citizenStatus: string;
  religion: string;
  ethnicity: string[];
  
  // Institutional Hierarchy
  faculty: string;
  department: string;
  careerPath: string; 
  admissionYear: string;
  enrollmentTerm: string;
  status: 'Active' | 'Applicant' | 'On Leave' | 'Graduated' | 'Suspended';
  
  // Academic Metrics
  gpa: number;
  standing: 'Honor Roll' | 'Good' | 'Probation' | 'Warning';
  advisor: string;
  
  // Parents/Family
  fatherName: string;
  motherName: string;
  
  // Logistics
  hostel: string;
  room: string;
  
  // Media
  photo?: string;
  photoZoom: number;
  avatarColor: string;
}

const initialStudents: Student[] = [
  { 
    id: 'BMI-2022-001', 
    firstName: 'Aaron', 
    lastName: 'Keitany', 
    email: 'aaron.k@bmi.edu', 
    phone: '+254 712 345 678',
    faculty: 'Theology',
    department: 'Biblical Studies',
    careerPath: 'Systematic Hermeneutics',
    admissionYear: '2022',
    enrollmentTerm: 'Fall 2022',
    status: 'Active', 
    standing: 'Honor Roll',
    gpa: 3.85, 
    advisor: 'Dr. Samuel Kiptoo',
    birthdate: '2003-05-14',
    gender: 'Male',
    maritalStatus: 'Single',
    citizenStatus: 'Non-U.S.',
    religion: 'Christian',
    ethnicity: ['Black/African American'],
    fatherName: 'David Keitany',
    motherName: 'Sarah Keitany',
    hostel: 'Bethlehem Hall',
    room: 'A-212',
    avatarColor: 'bg-indigo-600',
    photoZoom: 1.1
  }
];

const Students: React.FC<{ theme: string }> = ({ theme }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const q = searchTerm.toLowerCase();
      return `${s.firstName} ${s.lastName} ${s.id} ${s.department} ${s.faculty}`.toLowerCase().includes(q);
    });
  }, [students, searchTerm]);

  const StatusChip = ({ status }: { status: string }) => {
    const colors: any = {
      Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      Applicant: 'bg-blue-50 text-blue-700 border-blue-100',
      'Honor Roll': 'bg-purple-50 text-purple-700 border-purple-100',
      Good: 'bg-gray-50 text-gray-700 border-gray-100',
      Probation: 'bg-red-50 text-red-700 border-red-100',
    };
    return (
      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${colors[status] || 'bg-gray-50'}`}>
        {status}
      </span>
    );
  };

  const handleAdmissionCommitted = (name: string) => {
    alert(`Institutional Record for ${name} committed to Global Admissions Ledger`);
    // In a real app we'd add the student to the list here
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 dark:border-gray-800 pb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
             <div className="w-3 h-12 bg-gradient-to-b from-[#FFD700] to-[#FDB931] rounded-full shadow-lg"></div>
             <h2 className="text-4xl font-black text-[#2E004F] dark:text-white tracking-tighter uppercase italic">Institutional Master Registry</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium ml-7 uppercase tracking-widest text-[10px]">BMI University • Admission Records Control Node</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white dark:bg-gray-800 p-1.5 rounded-2xl shadow-inner border border-gray-100 dark:border-gray-700">
             <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-[#4B0082] text-white shadow-lg' : 'text-gray-400 hover:text-[#4B0082]'}`}><LayoutGrid size={20} /></button>
             <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-[#4B0082] text-white shadow-lg' : 'text-gray-400 hover:text-[#4B0082]'}`}><List size={20} /></button>
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-8 py-4 bg-[#4B0082] text-white rounded-2xl shadow-xl hover:-translate-y-1 transition-all font-black text-xs uppercase tracking-widest border border-[#FFD700]/30">
            <Plus size={20} className="text-[#FFD700]" /> Digitise Application
          </button>
        </div>
      </div>

      {/* Main Registry View */}
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 dark:border-gray-700">
                  <th className="px-6 py-6 w-20">Profile</th>
                  <th className="px-6 py-6">Admit ID</th>
                  <th className="px-6 py-6">Full Name</th>
                  <th className="px-6 py-6">Faculty</th>
                  <th className="px-6 py-6">Department</th>
                  <th className="px-6 py-6">Career Path</th>
                  <th className="px-6 py-6">Year/Term</th>
                  <th className="px-6 py-6">GPA Index</th>
                  <th className="px-6 py-6">Status</th>
                  <th className="px-6 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    onClick={() => setSelectedStudent(student)}
                    className="hover:bg-purple-50/30 dark:hover:bg-gray-700/30 transition-all cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className={`w-12 h-12 rounded-xl ${student.avatarColor} border-2 border-white dark:border-gray-700 shadow-md flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform`}>
                         {student.photo ? <img src={student.photo} className="w-full h-full object-cover" style={{ transform: `scale(${student.photoZoom})` }} alt="Student Profile" /> : <span className="text-white font-black">{student.firstName.charAt(0)}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] font-bold text-[#4B0082] dark:text-purple-300">{student.id}</td>
                    <td className="px-6 py-4 font-black text-gray-900 dark:text-white uppercase tracking-tight text-sm leading-tight">{student.firstName} {student.lastName}</td>
                    <td className="px-6 py-4 text-[11px] font-black text-gray-600 dark:text-gray-300 uppercase italic tracking-wider">{student.faculty}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">{student.department}</td>
                    <td className="px-6 py-4 text-[11px] font-black text-[#4B0082] dark:text-purple-300 uppercase italic tracking-tighter">{student.careerPath}</td>
                    <td className="px-6 py-4 text-[11px] font-black text-gray-500">{student.enrollmentTerm}</td>
                    <td className="px-6 py-4 font-black text-emerald-600">{student.gpa.toFixed(2)}</td>
                    <td className="px-6 py-4"><StatusChip status={student.status} /></td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-300 hover:text-[#4B0082]"><Edit size={16}/></button>
                          <button className="p-2 text-gray-300 hover:text-red-500" onClick={(e) => { e.stopPropagation(); if(window.confirm('Delete student record?')) setStudents(students.filter(s => s.id !== student.id)); }}><Trash2 size={16}/></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudents.map((student) => (
            <div key={student.id} onClick={() => setSelectedStudent(student)} className="bg-white dark:bg-gray-800 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-700 group hover:border-[#FFD700] transition-all cursor-pointer shadow-sm hover:shadow-2xl relative overflow-hidden">
               <div className="flex justify-between items-start mb-8">
                  <div className={`w-24 h-24 rounded-[2.5rem] ${student.avatarColor} flex items-center justify-center text-white text-3xl font-black shadow-2xl border-4 border-white dark:border-gray-800 overflow-hidden`}>
                     {student.photo ? <img src={student.photo} className="w-full h-full object-cover" style={{ transform: `scale(${student.photoZoom})` }} alt="Profile" /> : student.firstName.charAt(0)}
                  </div>
                  <div className="flex flex-col items-end gap-2.5">
                    <StatusChip status={student.status} />
                    <StatusChip status={student.standing} />
                  </div>
               </div>
               <h3 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-1.5 italic leading-none">{student.firstName} {student.lastName}</h3>
               <p className="text-sm text-[#4B0082] dark:text-purple-300 font-black uppercase tracking-[0.2em]">{student.department}</p>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">{student.careerPath}</p>
            </div>
          ))}
        </div>
      )}

      {/* Official BMI Admission Application Portal */}
      <StudentRegistrationModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={handleAdmissionCommitted}
      />

      {/* Selected Student Master Record View */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a0033]/95 backdrop-blur-3xl p-4 md:p-8">
           <div className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[90vh] rounded-[4.5rem] shadow-2xl overflow-hidden flex flex-col border-4 border-[#FFD700]/30 animate-slide-up">
              <div className="p-12 md:p-16 bg-gradient-to-br from-[#4B0082] via-[#320064] to-[#1a0033] text-white relative overflow-hidden">
                 <div className="absolute -right-24 -bottom-24 opacity-5 rotate-12 scale-150"><Users size={500}/></div>
                 <div className="flex flex-col md:flex-row items-center md:items-end gap-12 relative z-10">
                    <div className="w-40 h-40 rounded-[3rem] bg-white p-2.5 overflow-hidden shadow-2xl border-4 border-[#FFD700]/60 ring-8 ring-white/10">
                        {selectedStudent.photo ? <img src={selectedStudent.photo} className="w-full h-full object-cover rounded-[2.5rem]" style={{ transform: `scale(${selectedStudent.photoZoom})` }} alt="Selected Profile" /> : <div className={`w-full h-full flex items-center justify-center font-black text-6xl ${selectedStudent.avatarColor}`}>{selectedStudent.firstName.charAt(0)}</div>}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                       <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                          <h2 className="text-5xl font-black uppercase tracking-tighter italic leading-none drop-shadow-2xl">{selectedStudent.firstName} {selectedStudent.lastName}</h2>
                          <StatusChip status={selectedStudent.status} />
                       </div>
                       <p className="text-[#FFD700] font-black text-xl uppercase tracking-[0.3em] opacity-90">{selectedStudent.careerPath}</p>
                    </div>
                    <button onClick={() => setSelectedStudent(null)} className="absolute top-0 right-0 p-5 bg-white/10 hover:bg-white/20 rounded-[2.5rem] transition-all"><X size={32} /></button>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-16 md:p-20 space-y-12 no-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-50/80 p-8 rounded-[3rem] border border-gray-100 text-center">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Academic Index</p>
                       <p className="text-3xl font-black text-[#4B0082] italic">{selectedStudent.gpa.toFixed(2)}</p>
                       <p className="text-[9px] font-black text-gray-500 mt-2 uppercase tracking-widest">{selectedStudent.standing}</p>
                    </div>
                    <div className="bg-gray-50/80 p-8 rounded-[3rem] border border-gray-100 text-center">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Admit Lifecycle</p>
                       <p className="text-xl font-black text-emerald-600 uppercase italic leading-tight">{selectedStudent.enrollmentTerm}</p>
                       <p className="text-[9px] font-black text-gray-500 mt-2 uppercase tracking-widest">Year of Admit: {selectedStudent.admissionYear}</p>
                    </div>
                    <div className="bg-gray-50/80 p-8 rounded-[3rem] border border-gray-100 text-center">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Institutional Node</p>
                       <p className="text-xl font-black text-blue-600 uppercase italic truncate">{selectedStudent.faculty}</p>
                       <p className="text-[9px] font-black text-gray-500 mt-2 uppercase tracking-widest">{selectedStudent.department}</p>
                    </div>
                 </div>
              </div>

              <div className="p-12 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                 <button onClick={() => { if(window.confirm('Erase Record?')) setStudents(students.filter(s => s.id !== selectedStudent.id)); setSelectedStudent(null); }} className="text-[10px] font-black text-red-400 uppercase tracking-[0.4em] hover:text-red-700 transition-colors">Archive Institutional Record</button>
                 <div className="flex gap-5">
                    <button className="px-10 py-5 bg-white border-2 border-gray-100 rounded-[2.5rem] text-xs font-black uppercase tracking-[0.2em] text-gray-600 hover:bg-gray-50 transition-all shadow-sm">Export Record Node</button>
                    <button className="px-14 py-5 bg-[#4B0082] text-white rounded-[2.5rem] shadow-xl font-black uppercase tracking-[0.2em] text-xs border border-[#FFD700]/30 hover:scale-105 transition-all">Broadcast Transcript</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Students;
