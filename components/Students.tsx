import React, { useState, useMemo } from 'react';
import { 
  X, 
  Users, 
  Edit, 
  Trash2, 
  LayoutGrid, 
  List,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import StudentRegistrationModal from './StudentRegistrationModal';
import { Student } from '../types';

interface StudentsProps {
  theme: string;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  totalCount: number;
}

const Students: React.FC<StudentsProps> = ({ theme, students, setStudents, totalCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [facultyFilter, setFacultyFilter] = useState('All Faculty');
  const [standingFilter, setStandingFilter] = useState('All Standings');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const faculties = ['All Faculty', 'Theology', 'ICT', 'Business', 'Education', 'General', 'Undeclared'];
  const statuses = ['All Status', 'Active', 'Applicant', 'On Leave', 'Graduated', 'Suspended'];
  const standings = ['All Standings', 'Honor Roll', 'Good', 'Probation', 'Warning'];

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = `${s.firstName} ${s.lastName} ${s.id} ${s.department} ${s.faculty}`.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All Status' || s.status === statusFilter;
      const matchesFaculty = facultyFilter === 'All Faculty' || s.faculty === facultyFilter;
      const matchesStanding = standingFilter === 'All Standings' || s.standing === standingFilter;
      
      return matchesSearch && matchesStatus && matchesFaculty && matchesStanding;
    });
  }, [students, searchTerm, statusFilter, facultyFilter, standingFilter]);

  const StatusChip = ({ status }: { status: string }) => {
    const colors: any = {
      Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      Applicant: 'bg-blue-50 text-blue-700 border-blue-100',
      'Honor Roll': 'bg-purple-50 text-purple-700 border-purple-100',
      Good: 'bg-gray-50 text-gray-700 border-gray-100',
      Probation: 'bg-red-50 text-red-700 border-red-100',
      Suspended: 'bg-red-100 text-red-800 border-red-200',
      'On Leave': 'bg-amber-50 text-amber-700 border-amber-100',
      Graduated: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    };
    return (
      <span className={`px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-widest border ${colors[status] || 'bg-gray-50'}`}>
        {status}
      </span>
    );
  };

  const handleAdmissionCommitted = (studentData: Partial<Student>) => {
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...studentData } : s));
    } else {
      const newStud: Student = {
        id: `BMI-2024-${Math.floor(Math.random() * 999)}`,
        firstName: studentData.firstName || 'New',
        lastName: studentData.lastName || 'Student',
        // FIX: Added required gender property to satisfy Student type requirement
        gender: studentData.gender || 'Male',
        email: studentData.email || `${studentData.firstName?.toLowerCase()}@bmi.edu`,
        phone: studentData.phone || '+254...',
        faculty: studentData.faculty || 'General',
        department: studentData.department || 'Undeclared',
        careerPath: studentData.careerPath || 'Freshman',
        admissionYear: '2024',
        enrollmentTerm: studentData.enrollmentTerm || 'Fall 2024',
        status: studentData.status || 'Active',
        standing: 'Good',
        gpa: 4.0,
        avatarColor: 'bg-blue-500',
        photo: studentData.photo,
        photoZoom: studentData.photoZoom || 1.0
      };
      setStudents([newStud, ...students]);
    }
    setEditingStudent(null);
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (student: Student, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingStudent(student);
    setIsAddModalOpen(true);
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 dark:border-gray-800 pb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
             <div className="w-3 h-12 bg-[#FFD700] rounded-none"></div>
             <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white tracking-tight uppercase">Master Registry</h2>
          </div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-7 uppercase tracking-widest">BMI University Admission Records Node • Total: {totalCount.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white dark:bg-gray-800 p-1 rounded-none shadow-sm border border-gray-100 dark:border-gray-700">
             <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-none transition-all ${viewMode === 'grid' ? 'bg-[#4B0082] text-white shadow-lg' : 'text-gray-400 hover:text-[#4B0082]'}`}><LayoutGrid size={20} /></button>
             <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-none transition-all ${viewMode === 'list' ? 'bg-[#4B0082] text-white shadow-lg' : 'text-gray-400 hover:text-[#4B0082]'}`}><List size={20} /></button>
          </div>
          <button onClick={openAddModal} className="flex items-center gap-2 px-8 py-4 bg-[#4B0082] text-white rounded-none shadow-lg hover:bg-black transition-all font-bold text-xs uppercase tracking-widest border border-[#FFD700]/30">
            <Plus size={20} className="text-[#FFD700]" /> Digitise Application
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID, Name, Faculty or Department..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-none shadow-sm outline-none focus:ring-1 focus:ring-[#4B0082] transition-all dark:text-white font-semibold text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-none border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mr-2">
            <Filter size={16} className="text-[#4B0082] dark:text-[#FFD700]" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Filters:</span>
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 px-4 py-2 rounded-none text-xs font-bold uppercase tracking-widest border border-gray-200 dark:border-gray-600 outline-none focus:border-[#4B0082] cursor-pointer dark:text-gray-200"
          >
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select 
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 px-4 py-2 rounded-none text-xs font-bold uppercase tracking-widest border border-gray-200 dark:border-gray-600 outline-none focus:border-[#4B0082] cursor-pointer dark:text-gray-200"
          >
            {faculties.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          <select 
            value={standingFilter}
            onChange={(e) => setStandingFilter(e.target.value)}
            className="bg-white dark:bg-gray-700 px-4 py-2 rounded-none text-xs font-bold uppercase tracking-widest border border-gray-200 dark:border-gray-600 outline-none focus:border-[#4B0082] cursor-pointer dark:text-gray-200"
          >
            {standings.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {(statusFilter !== 'All Status' || facultyFilter !== 'All Faculty' || standingFilter !== 'All Standings' || searchTerm) && (
            <button 
              onClick={() => { setStatusFilter('All Status'); setFacultyFilter('All Faculty'); setStandingFilter('All Standings'); setSearchTerm(''); }}
              className="text-xs font-bold uppercase tracking-widest text-[#4B0082] dark:text-[#FFD700] hover:underline px-2"
            >
              Reset
            </button>
          )}
          
          <div className="ml-auto px-5 py-2.5 bg-white dark:bg-gray-800 border-2 border-[#4B0082] dark:border-[#FFD700] text-[#4B0082] dark:text-[#FFD700] text-[11px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(75,0,130,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,215,0,1)] flex items-center gap-3">
            <span className="w-2 h-2 bg-[#4B0082] dark:bg-[#FFD700] animate-pulse"></span>
            {filteredStudents.length} Institutional Records Identified
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-none border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                  <th className="px-6 py-4 w-20">Profile</th>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Faculty</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Career</th>
                  <th className="px-6 py-4">Term</th>
                  <th className="px-6 py-4">GPA</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    onClick={() => setSelectedStudent(student)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className={`w-10 h-10 rounded-none ${student.avatarColor} border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-center overflow-hidden`}>
                         {student.photo ? <img src={student.photo} className="w-full h-full object-cover" style={{ transform: `scale(${student.photoZoom})` }} alt="Profile" /> : <span className="text-white font-bold">{student.firstName.charAt(0)}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-[#4B0082] dark:text-purple-300">{student.id}</td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white uppercase text-sm">{student.firstName} {student.lastName}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">{student.faculty}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{student.department}</td>
                    <td className="px-6 py-4 text-xs font-bold text-[#4B0082] dark:text-purple-300 uppercase tracking-tight">{student.careerPath}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500">{student.enrollmentTerm}</td>
                    <td className="px-6 py-4 font-bold text-emerald-600 text-sm">{student.gpa.toFixed(2)}</td>
                    <td className="px-6 py-4"><StatusChip status={student.status} /></td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => openEditModal(student, e)} className="p-2 text-gray-300 hover:text-[#4B0082]"><Edit size={16}/></button>
                          <button className="p-2 text-gray-300 hover:text-red-500" onClick={(e) => { e.stopPropagation(); if(window.confirm('Delete record?')) setStudents(students.filter(s => s.id !== student.id)); }}><Trash2 size={16}/></button>
                       </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={10} className="px-6 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-sm italic">
                      No Records Matching Query
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudents.length > 0 ? filteredStudents.map((student) => (
            <div key={student.id} onClick={() => setSelectedStudent(student)} className="bg-white dark:bg-gray-800 rounded-none p-10 border border-gray-100 dark:border-gray-700 group hover:border-[#FFD700] transition-all cursor-pointer shadow-sm hover:shadow-xl relative overflow-hidden">
               <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                 <button onClick={(e) => openEditModal(student, e)} className="p-2 bg-white/80 dark:bg-gray-800/80 rounded shadow-sm text-gray-600 hover:text-[#4B0082]"><Edit size={14}/></button>
                 <button onClick={(e) => { e.stopPropagation(); if(window.confirm('Delete record?')) setStudents(students.filter(s => s.id !== student.id)); }} className="p-2 bg-white/80 dark:bg-gray-800/80 rounded shadow-sm text-gray-600 hover:text-red-500"><Trash2 size={14}/></button>
               </div>
               <div className="flex justify-between items-start mb-8">
                  <div className={`w-24 h-24 rounded-none ${student.avatarColor} flex items-center justify-center text-white text-3xl font-bold shadow-lg border-2 border-white dark:border-gray-800 overflow-hidden`}>
                     {student.photo ? <img src={student.photo} className="w-full h-full object-cover" style={{ transform: `scale(${student.photoZoom})` }} alt="Profile" /> : student.firstName.charAt(0)}
                  </div>
                  <div className="flex flex-col items-end gap-2.5">
                    <StatusChip status={student.status} />
                    <StatusChip status={student.standing} />
                  </div>
               </div>
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-1">{student.firstName} {student.lastName}</h3>
               <p className="text-xs text-[#4B0082] dark:text-purple-300 font-bold uppercase tracking-widest">{student.department}</p>
               <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1 italic">{student.careerPath}</p>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-sm italic">
              No Records Matching Query
            </div>
          )}
        </div>
      )}

      <StudentRegistrationModal 
        isOpen={isAddModalOpen} 
        onClose={() => { setIsAddModalOpen(false); setEditingStudent(null); }} 
        onSuccess={handleAdmissionCommitted}
        editData={editingStudent}
      />

      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a0033]/95 backdrop-blur-3xl p-4 md:p-8">
           <div className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[90vh] rounded-none shadow-2xl overflow-hidden flex flex-col border border-[#FFD700]/30 animate-slide-up">
              <div className="p-12 md:p-16 bg-gray-900 text-white relative overflow-hidden">
                 <div className="absolute -right-24 -bottom-24 opacity-5 rotate-12 scale-150"><Users size={500}/></div>
                 <div className="flex flex-col md:flex-row items-center md:items-end gap-12 relative z-10">
                    <div className="w-40 h-40 rounded-none bg-white p-2.5 overflow-hidden shadow-2xl border-2 border-[#FFD700] ring-8 ring-white/10">
                        {selectedStudent.photo ? <img src={selectedStudent.photo} className="w-full h-full object-cover" style={{ transform: `scale(${selectedStudent.photoZoom})` }} alt="Profile" /> : <div className={`w-full h-full flex items-center justify-center font-bold text-6xl ${selectedStudent.avatarColor}`}>{selectedStudent.firstName.charAt(0)}</div>}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                       <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                          <h2 className="text-4xl font-bold uppercase tracking-tight leading-none drop-shadow-lg">{selectedStudent.firstName} {selectedStudent.lastName}</h2>
                          <StatusChip status={selectedStudent.status} />
                       </div>
                       <p className="text-[#FFD700] font-bold text-lg uppercase tracking-widest opacity-90">{selectedStudent.careerPath}</p>
                    </div>
                    <button onClick={() => setSelectedStudent(null)} className="absolute top-0 right-0 p-5 bg-white/10 hover:bg-white/20 transition-all"><X size={32} /></button>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-16 md:p-20 space-y-12 no-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-none border border-gray-100 dark:border-gray-700 text-center shadow-sm">
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Academic Index</p>
                       <p className="text-3xl font-bold text-[#4B0082] dark:text-[#FFD700]">{selectedStudent.gpa.toFixed(2)}</p>
                       <p className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-widest">{selectedStudent.standing}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-none border border-gray-100 dark:border-gray-700 text-center shadow-sm">
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Admit Lifecycle</p>
                       <p className="text-xl font-bold text-emerald-600 uppercase leading-tight">{selectedStudent.enrollmentTerm}</p>
                       <p className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-widest">Year: {selectedStudent.admissionYear}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-none border border-gray-100 dark:border-gray-700 text-center shadow-sm">
                       <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Institutional Node</p>
                       <p className="text-xl font-bold text-blue-600 uppercase truncate">{selectedStudent.faculty}</p>
                       <p className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-widest">{selectedStudent.department}</p>
                    </div>
                 </div>
              </div>

              <div className="p-12 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                 <button onClick={() => { if(window.confirm('Delete record?')) setStudents(students.filter(s => s.id !== selectedStudent.id)); setSelectedStudent(null); }} className="text-xs font-bold text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors">Archive Record</button>
                 <div className="flex gap-5">
                    <button onClick={(e) => { openEditModal(selectedStudent, e as any); setSelectedStudent(null); }} className="px-10 py-5 bg-white dark:bg-gray-700 border border-[#4B0082] rounded-none text-xs font-bold uppercase tracking-widest text-[#4B0082] hover:bg-gray-100 transition-all">Edit Record</button>
                    <button className="px-14 py-5 bg-[#4B0082] text-white rounded-none shadow-xl font-bold uppercase tracking-widest text-xs border border-[#FFD700]/30 hover:bg-black transition-all">Broadcast Transcript</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Students;