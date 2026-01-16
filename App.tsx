import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Staff from './components/Staff';
import Attendance from './components/Attendance';
import Finance from './components/Finance';
import Courses from './components/Courses';
import Exams from './components/Exams';
import Transcripts from './components/Transcripts';
import Library from './components/Library';
import Hostels from './components/Hostels';
import Medical from './components/Medical';
import Inventory from './components/Inventory';
import Alumni from './components/Alumni';
import Communications from './components/Communications';
import Visitors from './components/Visitors';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Login from './components/Login';
import AIModal from './components/AIModal';
import { Student, StaffMember, Transaction, Course, LibraryItem } from './types';

const initialCourses: Course[] = [
    { id: 'CRS-101', name: 'BA in Biblical Studies', code: 'BIB-100', faculty: 'Theology', department: 'Biblical Studies', level: 'Undergraduate', credits: 120, status: 'Published', description: 'Comprehensive study of Old and New Testaments.', syllabus: 'Year 1: OT Survey. Year 2: NT Survey.' },
    { id: 'CRS-102', name: 'BA in Christian Education', code: 'CED-100', faculty: 'Education', department: 'Christian Education', level: 'Undergraduate', credits: 120, status: 'Published', description: 'Training for educational ministry in church and parachurch.', syllabus: 'Foundations of Education, Curriculum Design.' },
    { id: 'CRS-103', name: 'BA in Ministry & Leadership', code: 'MIN-100', faculty: 'Theology', department: 'Ministry', level: 'Undergraduate', credits: 120, status: 'Published', description: 'Equipping for pastoral and organizational leadership.', syllabus: 'Leadership Principles, Pastoral Care.' },
    { id: 'CRS-104', name: 'BA in Theological Studies', code: 'THEO-100', faculty: 'Theology', department: 'Systematic Theology', level: 'Undergraduate', credits: 120, status: 'Published', description: 'In-depth exploration of theological doctrines.', syllabus: 'Systematic Theology I-IV.' },
    { id: 'CRS-105', name: 'BA in Worship Leadership', code: 'WOR-100', faculty: 'Theology', department: 'Worship Arts', level: 'Undergraduate', credits: 120, status: 'Published', description: 'Theology and practice of corporate worship.', syllabus: 'Worship History, Music Theory.' },
    { id: 'CRS-201', name: 'Masters of Divinity', code: 'MDIV-500', faculty: 'Theology', department: 'Divinity', level: 'Postgraduate', credits: 90, status: 'Published', description: 'Professional degree for pastoral ministry.', syllabus: 'Hermeneutics, Homiletics, Counseling.' },
    { id: 'CRS-202', name: 'MA in Christian Counseling', code: 'COUN-500', faculty: 'Theology', department: 'Counseling', level: 'Postgraduate', credits: 60, status: 'Published', description: 'Integration of psychology and theology.', syllabus: 'Psychopathology, Marriage & Family.' },
    { id: 'CRS-203', name: 'MA in Theological Studies', code: 'THEO-500', faculty: 'Theology', department: 'Theology', level: 'Postgraduate', credits: 60, status: 'Published', description: 'Advanced theological research.', syllabus: 'Advanced Systematics, Ethics.' },
    { id: 'CRS-204', name: 'MA in Christian Education', code: 'CED-500', faculty: 'Education', department: 'Christian Education', level: 'Postgraduate', credits: 60, status: 'Published', description: 'Advanced educational theory and practice.', syllabus: 'Admin of Ed Programs, Teaching Methods.' },
    { id: 'CRS-205', name: 'MA in Christian Apologetics', code: 'APOL-500', faculty: 'Theology', department: 'Apologetics', level: 'Postgraduate', credits: 60, status: 'Published', description: 'Defense of the Christian faith.', syllabus: 'Phil of Religion, Cults & World Religions.' },
    { id: 'CRS-206', name: 'MA in Christian Leadership', code: 'LEAD-500', faculty: 'Theology', department: 'Leadership', level: 'Postgraduate', credits: 60, status: 'Published', description: 'Strategic leadership in Christian organizations.', syllabus: 'Organizational Change, Conflict Resolution.' },
    { id: 'CRS-301', name: 'Doctor of Ministry (Dmin)', code: 'DMIN-800', faculty: 'Theology', department: 'Ministry', level: 'Postgraduate', credits: 45, status: 'Published', description: 'Advanced professional practice in ministry.', syllabus: 'Project Design, Applied Theology.' },
    { id: 'CRS-302', name: 'Doctor of Christian Education', code: 'DED-800', faculty: 'Education', department: 'Christian Education', level: 'Postgraduate', credits: 45, status: 'Published', description: 'Terminal degree in educational ministry.', syllabus: 'Ed Research, Theory Development.' },
];

const initialStudents: Student[] = [
  { id: 'BMI-2022-001', firstName: 'Aaron', lastName: 'Keitany', gender: 'Male', email: 'a.keitany@bmi.edu', phone: '+254 700 123 456', faculty: 'Theology', department: 'Biblical Studies', careerPath: 'BA in Biblical Studies', academicLevel: 'Degree', admissionYear: '2022', enrollmentTerm: 'Fall 2024', status: 'Active', standing: 'Good', gpa: 3.4, avatarColor: 'bg-blue-600', photoZoom: 1 },
  { id: 'BMI-2023-012', firstName: 'Beatrice', lastName: 'Wanjiku', gender: 'Female', email: 'b.wanjiku@bmi.edu', phone: '+254 711 987 654', faculty: 'ICT', department: 'Computer Science', careerPath: 'BSc Computer Science', academicLevel: 'Degree', admissionYear: '2023', enrollmentTerm: 'Fall 2024', status: 'Active', standing: 'Honor Roll', gpa: 3.8, avatarColor: 'bg-purple-600', photoZoom: 1 },
  { id: 'BMI-2023-045', firstName: 'Caleb', lastName: 'Rotich', gender: 'Male', email: 'c.rotich@bmi.edu', phone: '+254 722 555 444', faculty: 'Theology', department: 'Ministry', careerPath: 'BA in Ministry', academicLevel: 'Degree', admissionYear: '2023', enrollmentTerm: 'Fall 2024', status: 'Active', standing: 'Good', gpa: 3.2, avatarColor: 'bg-emerald-600', photoZoom: 1 },
  { id: 'BMI-2024-088', firstName: 'Diana', lastName: 'Waweru', gender: 'Female', email: 'd.waweru@bmi.edu', phone: '+254 733 111 222', faculty: 'Business', department: 'Management', careerPath: 'BBA Management', academicLevel: 'Degree', admissionYear: '2024', enrollmentTerm: 'Fall 2024', status: 'Applicant', standing: 'Good', gpa: 0.0, avatarColor: 'bg-amber-600', photoZoom: 1 },
];

const initialStaff: StaffMember[] = [
  { id: 'STF-001', name: 'Dr. Samuel Kiptoo', role: 'Dean', department: 'School of Theology', email: 's.kiptoo@bmi.edu', phone: '+254 700 000 001', status: 'Full-time', category: 'Academic', specialization: 'Systematic Theology', office: 'Admin Block A', officeHours: 'Mon-Wed 10-12', avatarColor: 'bg-indigo-700', joinDate: '2015-01-10' },
  { id: 'STF-002', name: 'Prof. Alice Mwangi', role: 'HOD', department: 'Dept. of ICT', email: 'a.mwangi@bmi.edu', phone: '+254 700 000 002', status: 'Full-time', category: 'Academic', specialization: 'Computer Science', office: 'Tech Hub 2', officeHours: 'Tue-Thu 2-4', avatarColor: 'bg-blue-700', joinDate: '2018-05-20' },
  { id: 'STF-003', name: 'Mrs. Grace Omondi', role: 'Registrar', department: 'Administration', email: 'registrar@bmi.edu', phone: '+254 700 000 003', status: 'Full-time', category: 'Management', specialization: 'Ed Admin', office: 'Admin Block B', officeHours: 'Mon-Fri 8-5', avatarColor: 'bg-purple-700', joinDate: '2010-03-15' },
];

const initialTransactions: Transaction[] = [
  { ref: 'TRX-9901', name: 'Aaron Keitany', desc: 'Tuition Payment', amt: 1500, status: 'Paid', date: '2024-05-01' },
  { ref: 'TRX-9902', name: 'Beatrice Wanjiku', desc: 'Tuition Payment', amt: 2500, status: 'Paid', date: '2024-05-02' },
  { ref: 'TRX-9903', name: 'Dr. Samuel Kiptoo', desc: 'Salary Disbursement', amt: 3500, status: 'Paid', date: '2024-04-30' },
  { ref: 'TRX-9904', name: 'Caleb Rotich', desc: 'Library Fine', amt: 15, status: 'Pending', date: '2024-05-15' },
];

const initialLibrary: LibraryItem[] = [
  { id: 'LIB-101', title: 'Systematic Theology', author: 'Wayne Grudem', category: 'Theology', type: 'PDF', status: 'Digital', year: '2020', description: 'Standard text for theology.', downloadUrl: '' },
  { id: 'LIB-102', title: 'Introduction to Algorithms', author: 'Cormen et al.', category: 'ICT', type: 'Hardcopy', status: 'Available', year: '2018', description: 'Core CS textbook.', downloadUrl: '' },
  { id: 'LIB-103', title: 'Principles of Management', author: 'Peter Drucker', category: 'Business', type: 'E-Book', status: 'Digital', year: '2015', description: 'Management essentials.', downloadUrl: '' },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [logo, setLogo] = useState('https://i.ibb.co/Gv2vPdJC/BMI-PNG.png');

  // Data States
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('bmi_data_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });
  
  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('bmi_data_staff');
    return saved ? JSON.parse(saved) : initialStaff;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('bmi_data_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('bmi_data_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [library, setLibrary] = useState<LibraryItem[]>(() => {
    const saved = localStorage.getItem('bmi_data_library');
    return saved ? JSON.parse(saved) : initialLibrary;
  });

  // Persistence
  useEffect(() => { localStorage.setItem('bmi_data_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('bmi_data_staff', JSON.stringify(staff)); }, [staff]);
  useEffect(() => { localStorage.setItem('bmi_data_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('bmi_data_courses', JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem('bmi_data_library', JSON.stringify(library)); }, [library]);

  // Derived Stats
  const totalRevenue = transactions.filter(t => t.status === 'Paid' && !t.desc.includes('Salary')).reduce((acc, curr) => acc + curr.amt, 0);
  const dashboardStats = {
    students: students.length,
    admissions: students.filter(s => s.status === 'Applicant').length,
    tuition: totalRevenue,
    events: 4
  };

  const handleAddStudent = (studentData: Partial<Student>) => {
    const newStudent: Student = {
        ...studentData as Student,
        id: `BMI-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
        admissionYear: new Date().getFullYear().toString(),
        enrollmentTerm: 'Fall 2024',
        status: 'Active',
        standing: 'Good',
        gpa: 0.0,
        avatarColor: 'bg-indigo-600',
        photoZoom: 1
    };
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleAddTransaction = (amt: number) => {
    // This is a placeholder, usually transactions are added via Finance component
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} logo={logo} />;
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark' : ''} bg-[#F8F9FA] dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      <Sidebar 
        currentView={currentView} 
        onChangeView={(view) => { setCurrentView(view); if (view === 'ai') setIsAiOpen(true); }} 
        onLogout={() => setIsAuthenticated(false)}
        logo={logo}
      />
      
      <main className="flex-1 ml-64 relative">
        {currentView === 'dashboard' && (
          <Dashboard 
            userName="Administrator" 
            theme={theme} 
            onNavigate={setCurrentView}
            stats={dashboardStats}
            onAddStudent={handleAddStudent}
            onAddTransaction={handleAddTransaction}
          />
        )}
        {currentView === 'students' && <Students students={students} setStudents={setStudents} />}
        {currentView === 'staff' && <Staff staff={staff} setStaff={setStaff} />}
        {currentView === 'attendance' && <Attendance theme={theme} students={students} />}
        {currentView === 'finance' && <Finance theme={theme} students={students} staff={staff} transactions={transactions} setTransactions={setTransactions} totalRevenue={totalRevenue} />}
        {currentView === 'courses' && <Courses theme={theme} courses={courses} setCourses={setCourses} />}
        {currentView === 'exams' && <Exams />}
        {currentView === 'transcripts' && <Transcripts students={students} courses={courses} logo={logo} />}
        {currentView === 'library' && <Library library={library} setLibrary={setLibrary} courses={courses} />}
        {currentView === 'hostels' && <Hostels students={students} />}
        {currentView === 'medical' && <Medical students={students} />}
        {currentView === 'inventory' && <Inventory />}
        {currentView === 'alumni' && <Alumni students={students} />}
        {currentView === 'sms' && <Communications students={students} staff={staff} />}
        {currentView === 'visitors' && <Visitors />}
        {currentView === 'reports' && <Reports />}
        {currentView === 'settings' && <Settings currentLogo={logo} onUpdateLogo={setLogo} currentTheme={theme} onUpdateTheme={setTheme} />}
      </main>

      <AIModal isOpen={isAiOpen} onClose={() => { setIsAiOpen(false); setCurrentView('dashboard'); }} />
    </div>
  );
};

export default App;