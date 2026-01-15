
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import AIModal from './components/AIModal';
import Students from './components/Students';
import Finance from './components/Finance';
import Attendance from './components/Attendance';
import Courses from './components/Courses';
import Staff from './components/Staff';
import Library from './components/Library';
import Hostels from './components/Hostels';
import Exams from './components/Exams';
import Transcripts from './components/Transcripts';
import Communications from './components/Communications';
import Medical from './components/Medical';
import Inventory from './components/Inventory';
import Alumni from './components/Alumni';
import Visitors from './components/Visitors';
import Reports from './components/Reports';
import { Bot } from 'lucide-react';
import { Student, StaffMember, Transaction, Course, LibraryItem } from './types';

// Mock Data Generators
const generateInitialStudents = (): Student[] => {
  const students: Student[] = [
    { 
      id: 'BMI-2022-001', firstName: 'Aaron', lastName: 'Keitany', gender: 'Male', email: 'aaron.k@bmi.edu', phone: '+254 712 345 678',
      faculty: 'Theology', department: 'Biblical Studies', careerPath: 'Systematic Hermeneutics', admissionYear: '2022',
      enrollmentTerm: 'Fall 2022', status: 'Active', standing: 'Honor Roll', gpa: 3.85, avatarColor: 'bg-indigo-600', photoZoom: 1.1
    }
  ];
  
  const firstNames = [
    "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "William", "Elizabeth",
    "James", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Christopher", "Karen", "Daniel",
    "Nancy", "Matthew", "Lisa", "Anthony", "Betty", "Donald", "Margaret", "Mark", "Sandra", "Paul",
    "Ashley", "Steven", "Kimberly", "Andrew", "Emily", "Kenneth", "Donna", "Joshua", "Michelle", "Kevin",
    "Dorothy", "Brian", "Carol", "George", "Amanda", "Edward", "Melissa", "Ronald", "Deborah", "Stephanie"
  ];
  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"
  ];

  for (let i = 1; i <= 50; i++) {
    const fName = firstNames[(i - 1) % firstNames.length];
    const lName = lastNames[(i - 1) % lastNames.length];
    students.push({
      id: `BMI-2023-${i.toString().padStart(3, '0')}`,
      firstName: fName,
      lastName: lName,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@bmi.edu`,
      phone: `+1 555-000-${1000 + i}`,
      faculty: i % 2 === 0 ? 'Theology' : 'ICT',
      department: i % 2 === 0 ? 'Biblical Studies' : 'Computer Science',
      careerPath: i % 3 === 0 ? 'Senior Scholar' : 'Junior Student',
      admissionYear: '2023',
      enrollmentTerm: 'Fall 2023',
      status: i % 5 === 0 ? 'Applicant' : 'Active',
      standing: i % 10 === 0 ? 'Honor Roll' : 'Good',
      gpa: 2.5 + (i % 15) / 10,
      avatarColor: i % 2 === 0 ? 'bg-purple-600' : 'bg-blue-600',
      photoZoom: 1.0
    });
  }
  return students;
};

const generateInitialStaff = (): StaffMember[] => {
  const staff: StaffMember[] = [
    { id: 'STF-001', name: 'Dr. Samuel Kiptoo', role: 'Dean, School of Theology', department: 'School of Theology', email: 's.kiptoo@bmi.edu', phone: '+254 712 345 678', status: 'Full-time', category: 'Academic', specialization: 'Biblical Hermeneutics', avatarColor: 'bg-indigo-600', joinDate: '2015-08-12', office: 'Admin Block, Rm 12', officeHours: 'Mon-Wed, 10am-12pm' },
    { id: 'STF-002', name: 'Prof. Alice Mwangi', role: 'Lead Lecturer', department: 'Dept. of ICT', email: 'a.mwangi@bmi.edu', phone: '+254 722 987 654', status: 'Full-time', category: 'Academic', specialization: 'Cyber Security', avatarColor: 'bg-blue-600', joinDate: '2018-01-15', office: 'Tech Hub, Rm 04', officeHours: 'Tue-Thu, 2pm-4pm' },
  ];
  
  const staffNames = ["James Kimani", "Sarah Omari", "Peter Ndungu", "Lucy Wambui", "David Ochieng", "Grace Muthoni", "Kevin Korir", "Beatrice Atieno", "Silas Kipruto", "Nancy Wanjiru", "Brian Otieno", "Faith Chepkirui", "Mark Simiyu", "Diana Waweru", "Paul Kibet", "Catherine Njeri", "Dennis Mwangi", "Mercy Chelagat", "Victor Langat", "Alice Kwamboka"];
  const roles = ["Assistant Lecturer", "Administrator", "Faculty Coordinator", "Lab Assistant", "Librarian", "Finance Officer"];
  const depts = ["School of Theology", "Dept. of ICT", "School of Business", "Education Dept."];

  for (let i = 1; i <= 20; i++) {
    staff.push({
      id: `STF-${(100 + i).toString()}`,
      name: staffNames[i - 1] || `Employee ${i}`,
      role: roles[i % roles.length],
      department: depts[i % depts.length],
      email: `staff${i}@bmi.edu`,
      phone: `+254 7${(10000000 + i).toString().slice(-8)}`,
      status: 'Full-time',
      category: i % 3 === 0 ? 'Administrative' : 'Academic',
      specialization: 'General Studies',
      avatarColor: i % 2 === 0 ? 'bg-blue-500' : 'bg-indigo-500',
      joinDate: '2021-01-01',
      office: `Office ${i}`,
      officeHours: '9am - 5pm'
    });
  }
  return staff;
};

const initialTransactions: Transaction[] = [
  { ref: 'TRX-9001', name: 'Aaron Keitany', desc: 'Tuition Fee - Sem 1', date: '2024-05-10', amt: 3200, status: 'Paid' },
  { ref: 'TRX-9002', name: 'Mary Johnson', desc: 'Library Fine', date: '2024-05-12', amt: 25, status: 'Pending' },
  { ref: 'TRX-9003', name: 'Robert Williams', desc: 'Hostel Deposit', date: '2024-05-14', amt: 500, status: 'Paid' },
];

const initialCourses: Course[] = [
  // --- SCHOOL OF THEOLOGY ---
  { id: 'CRS-THEO-099', name: 'Diploma in Christian Ministry and Theology', code: 'DIP-CMT-101', faculty: 'Theology', department: 'Biblical Studies', level: 'Diploma', credits: 4, status: 'Published', description: 'Foundational program for church ministry.', syllabus: 'Syllabus content...' },
  { id: 'CRS-THEO-101', name: 'Introduction to Biblical Interpretation', code: 'THEO101', faculty: 'Theology', department: 'Biblical Studies', level: 'Undergraduate', credits: 3, status: 'Published', description: 'Hermeneutics principles.', syllabus: 'Syllabus content...' },
  { id: 'CRS-THEO-501', name: 'M.A. in Systematic Theology', code: 'THEO501', faculty: 'Theology', department: 'Biblical Studies', level: 'Postgraduate', credits: 4, status: 'Published', description: 'Advanced dogmatics.', syllabus: 'Syllabus content...' },
  
  // --- DEPARTMENT OF ICT ---
  { id: 'CRS-ICT-001', name: 'Introduction to Computational Thinking', code: 'CS101', faculty: 'ICT', department: 'Computer Science', level: 'Undergraduate', credits: 4, status: 'Published', description: 'Problem solving via Python.', syllabus: 'Syllabus content...' },
  { id: 'CRS-ICT-002', name: 'Full-Stack Software Architecture', code: 'CS302', faculty: 'ICT', department: 'Computer Science', level: 'Undergraduate', credits: 4, status: 'Published', description: 'React, Node.js, and Cloud.', syllabus: 'Syllabus content...' },
  
  // --- SCHOOL OF BUSINESS ---
  { id: 'CRS-BUS-001', name: 'Strategic Financial Management', code: 'MBA101', faculty: 'Business', department: 'Finance', level: 'Postgraduate', credits: 4, status: 'Published', description: 'Corporate finance strategy.', syllabus: 'Syllabus content...' },
  
  // --- EDUCATION DEPARTMENT ---
  { id: 'CRS-EDU-505', name: 'M.A. in Educational Leadership', code: 'EDUL505', faculty: 'Education', department: 'Pedagogy', level: 'Postgraduate', credits: 4, status: 'Published', description: 'Leading school transformation.', syllabus: 'Syllabus content...' },
];

const generateInitialLibrary = (): LibraryItem[] => [
  // Theology
  { id: 'LIB-THEO-001', title: 'Systematic Theology: An Introduction', author: 'Wayne Grudem', category: 'Theology', type: 'Hardcopy', status: 'Available', location: 'Stack A-12', year: '1994', isbn: '978-0310286707', description: 'Comprehensive guide to Christian doctrine.', downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'LIB-THEO-002', title: 'The Cost of Discipleship', author: 'Dietrich Bonhoeffer', category: 'Theology', type: 'PDF', status: 'Digital', location: 'Cloud Node 1', year: '1937', description: 'Theological classic on grace and obedience.', downloadUrl: 'https://archive.org/download/thecostofdiscipl0000bonh/thecostofdiscipl0000bonh.pdf' },
  { id: 'LIB-THEO-003', title: 'Hermeneutics: Principles and Processes', author: 'Henry Virkler', category: 'Theology', type: 'E-Book', status: 'Digital', location: 'Cloud Node 1', year: '2007', description: 'Textbook for THEO101.', downloadUrl: 'https://ia800204.us.archive.org/30/items/PrinciplesOfBiblicalInterpretation/PrinciplesOfBiblicalInterpretation.pdf' },
  
  // ICT
  { id: 'LIB-ICT-001', title: 'Clean Code Concepts: Python Edition', author: 'Robert C. Martin (Adapted)', category: 'ICT', type: 'PDF', status: 'Digital', location: 'Tech Repository', year: '2008', description: 'Foundational principles for writing maintainable code.', downloadUrl: 'https://www.tutorialspoint.com/python/python_tutorial.pdf' },
  { id: 'LIB-ICT-002', title: 'JavaScript Essentials for Developers', author: 'BMI ICT Faculty', category: 'ICT', type: 'E-Book', status: 'Digital', location: 'Cloud Node 2', year: '2023', description: 'Modern JS mechanics for full-stack architecture.', downloadUrl: 'https://www.tutorialspoint.com/javascript/javascript_tutorial.pdf' },
  { id: 'LIB-ICT-003', title: 'Cyber Security Strategy Framework', author: 'NIST', category: 'ICT', type: 'Hardcopy', status: 'Borrowed', location: 'Stack C-04', year: '2021', description: 'Resource for CS302 cybersecurity module.', downloadUrl: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf' },
  
  // Business
  { id: 'LIB-BUS-001', title: 'The Intelligent Investor', author: 'Benjamin Graham', category: 'Business', type: 'Hardcopy', status: 'Available', location: 'Stack B-02', year: '1949', description: 'Definitive book on value investing.', downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'LIB-BUS-002', title: 'Strategic Management: Concepts and Cases', author: 'Fred David', category: 'Business', type: 'PDF', status: 'Digital', location: 'Admin Vault', year: '2016', description: 'Core textbook for MBA101.', downloadUrl: 'https://archive.org/download/StrategicManagementConceptsAndCases/Strategic-Management-Concepts-and-Cases.pdf' },
  
  // Education
  { id: 'LIB-EDU-001', title: 'Pedagogy: Educational Theory', author: 'BMI Education Faculty', category: 'Education', type: 'PDF', status: 'Digital', location: 'Education Archive', year: '2024', description: 'Critical theory on education.', downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 'LIB-EDU-002', title: 'Educational Leadership Handbook', author: 'Institutional Review', category: 'Education', type: 'Hardcopy', status: 'Available', location: 'Stack E-01', year: '2009', description: 'Management in education settings.', downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  
  // Persistence Initialization
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('bmi_data_students');
    return saved ? JSON.parse(saved) : generateInitialStudents();
  });
  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('bmi_data_staff');
    return saved ? JSON.parse(saved) : generateInitialStaff();
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
    const data = saved ? JSON.parse(saved) : generateInitialLibrary();
    // Ensure all items have a usable URL for this session
    return data.map((item: any) => ({
      ...item,
      downloadUrl: item.downloadUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }));
  });
  const [eventsCount, setEventsCount] = useState(12);

  // Auto-save effects
  useEffect(() => { localStorage.setItem('bmi_data_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('bmi_data_staff', JSON.stringify(staff)); }, [staff]);
  useEffect(() => { localStorage.setItem('bmi_data_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('bmi_data_courses', JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem('bmi_data_library', JSON.stringify(library)); }, [library]);

  const totalStudents = students.length;
  const applicantCount = students.filter(s => s.status === 'Applicant').length;
  const totalRevenue = transactions.reduce((acc, curr) => curr.status === 'Paid' ? acc + curr.amt : acc, 0);

  const [logo, setLogo] = useState<string>(() => {
    try { return localStorage.getItem('bmi_logo') || "https://i.ibb.co/Gv2vPdJC/BMI-PNG.png"; } catch (e) { return "https://i.ibb.co/Gv2vPdJC/BMI-PNG.png"; }
  });

  const [theme, setTheme] = useState<string>(() => {
    try {
      const savedGeneral = localStorage.getItem('bmi_settings_general');
      return savedGeneral ? JSON.parse(savedGeneral).theme || 'light' : 'light';
    } catch (e) { return 'light'; }
  });

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => { setIsAuthenticated(false); setCurrentView('dashboard'); };
  const handleChangeView = (view: string) => { if (view === 'ai') { setIsAIModalOpen(true); } else { setCurrentView(view); } };
  const handleLogoUpdate = (newLogo: string) => { setLogo(newLogo); localStorage.setItem('bmi_logo', newLogo); };
  const handleThemeUpdate = (newTheme: string) => {
    setTheme(newTheme);
    const savedGeneral = localStorage.getItem('bmi_settings_general');
    const general = savedGeneral ? JSON.parse(savedGeneral) : {};
    general.theme = newTheme;
    localStorage.setItem('bmi_settings_general', JSON.stringify(general));
  };

  if (!isAuthenticated) return <Login onLogin={handleLogin} logo={logo} />;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <Sidebar currentView={currentView} onChangeView={handleChangeView} onLogout={handleLogout} logo={logo} />
      <main className="flex-1 ml-64 h-screen overflow-y-auto relative bg-[#F8F9FA] dark:bg-gray-950">
        {currentView === 'dashboard' && (
          <Dashboard userName="Admin" theme={theme} onNavigate={handleChangeView} stats={{ students: totalStudents, admissions: applicantCount, tuition: totalRevenue, events: eventsCount }} onAddStudent={(name) => {
               const [first, last] = name.split(' ');
               const newStud: Student = {
                 id: `BMI-2024-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
                 firstName: first || 'New', lastName: last || 'Student', gender: 'Male', email: `${first?.toLowerCase() || 'new'}.${last?.toLowerCase() || 'student'}@bmi.edu`, phone: '+254 700 000 000', faculty: 'Undeclared', department: 'Undeclared', careerPath: 'Freshman', admissionYear: '2024', enrollmentTerm: 'Fall 2024', status: 'Active', standing: 'Good', gpa: 4.0, avatarColor: 'bg-indigo-500', photoZoom: 1.0
               };
               setStudents(prev => [newStud, ...prev]);
            }} onAddTransaction={(amt) => {
               const newTx: Transaction = {
                 ref: `TRX-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`, name: 'Institutional Payment', desc: 'Dashboard Quick Entry', date: new Date().toISOString().split('T')[0], amt: amt, status: 'Paid'
               };
               setTransactions(prev => [newTx, ...prev]);
            }}
          />
        )}
        {currentView === 'settings' && <Settings currentLogo={logo} onUpdateLogo={handleLogoUpdate} currentTheme={theme} onUpdateTheme={handleThemeUpdate} />}
        {currentView === 'students' && <Students theme={theme} students={students} setStudents={setStudents} totalCount={totalStudents} />}
        {currentView === 'staff' && <Staff staff={staff} setStaff={setStaff} />}
        {currentView === 'finance' && <Finance theme={theme} students={students} staff={staff} transactions={transactions} setTransactions={setTransactions} totalRevenue={totalRevenue} />}
        {currentView === 'attendance' && <Attendance theme={theme} students={students} />}
        {currentView === 'courses' && <Courses theme={theme} courses={courses} setCourses={setCourses} />}
        {currentView === 'exams' && <Exams />}
        {currentView === 'transcripts' && <Transcripts students={students} courses={courses} logo={logo} />}
        {currentView === 'library' && <Library library={library} setLibrary={setLibrary} courses={courses} />}
        {currentView === 'hostels' && <Hostels students={students} />}
        {currentView === 'medical' && <Medical />}
        {currentView === 'inventory' && <Inventory />}
        {currentView === 'alumni' && <Alumni />}
        {currentView === 'visitors' && <Visitors />}
        {currentView === 'reports' && <Reports />}
        
        <button onClick={() => setIsAIModalOpen(true)} className="fixed bottom-8 right-8 bg-gradient-to-r from-[#4B0082] to-[#6A0DAD] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-30 group border-2 border-[#FFD700]/30">
          <Bot size={28} />
          <span className="absolute right-full mr-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap top-1/2 -translate-y-1/2 pointer-events-none">
            BMI AI Advisor
          </span>
        </button>
      </main>
      <AIModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </div>
  );
};

export default App;
