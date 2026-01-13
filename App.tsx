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
import { Student, StaffMember, Transaction, Course } from './types';

// Mock Data Generators
const generateInitialStudents = (): Student[] => {
  const students: Student[] = [
    { 
      id: 'BMI-2022-001', firstName: 'Aaron', lastName: 'Keitany', email: 'aaron.k@bmi.edu', phone: '+254 712 345 678',
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
  // --- SCHOOL OF THEOLOGY: DIPLOMA & UNDERGRADUATE ---
  { 
    id: 'CRS-THEO-099', 
    name: 'Diploma in Christian Ministry and Theology', 
    code: 'DIP-CMT-101', 
    faculty: 'Theology', 
    department: 'Biblical Studies', 
    level: 'Diploma', 
    credits: 4, 
    status: 'Published', 
    description: 'A comprehensive foundational program designed to equip students with essential biblical knowledge and practical ministry skills for effective service in the church.',
    syllabus: 'Module 1: Old Testament Foundations. Module 2: New Testament Survey. Module 3: Basic Christian Doctrine. Module 4: Principles of Pastoral Ministry. Module 5: Homiletics and Public Speaking. Module 6: Evangelism and Missions. Module 7: Christian Leadership and Ethics.'
  },
  { 
    id: 'CRS-THEO-101', 
    name: 'Introduction to Biblical Interpretation', 
    code: 'THEO101', 
    faculty: 'Theology', 
    department: 'Biblical Studies', 
    level: 'Undergraduate', 
    credits: 3, 
    status: 'Published', 
    description: 'Foundational principles of Hermeneutics for effective bible study.',
    syllabus: 'Module 1: History of Interpretation. Module 2: Literary Context & Genre. Module 3: Historical-Cultural Background. Module 4: The Role of the Holy Spirit. Module 5: Practical Exegesis.'
  },
  { 
    id: 'CRS-THEO-102', 
    name: 'Old Testament Survey', 
    code: 'THEO102', 
    faculty: 'Theology', 
    department: 'Biblical Studies', 
    level: 'Undergraduate', 
    credits: 4, 
    status: 'Published', 
    description: 'A comprehensive survey of the books of the Old Testament.',
    syllabus: 'Module 1: The Pentateuch. Module 2: Historical Books. Module 3: Poetic & Wisdom Literature. Module 4: Major & Minor Prophets.'
  },
  { 
    id: 'CRS-THEO-103', 
    name: 'New Testament Survey', 
    code: 'THEO103', 
    faculty: 'Theology', 
    department: 'Biblical Studies', 
    level: 'Undergraduate', 
    credits: 4, 
    status: 'Published', 
    description: 'A survey of the historical background and content of the New Testament.',
    syllabus: 'Module 1: The Gospels & Acts. Module 2: Pauline Epistles. Module 3: General Epistles. Module 4: The Book of Revelation.'
  },
  { 
    id: 'CRS-PHIL-201', 
    name: 'Introduction to Christian Philosophy', 
    code: 'PHIL201', 
    faculty: 'Theology', 
    department: 'Philosophy & Ethics', 
    level: 'Undergraduate', 
    credits: 3, 
    status: 'Published', 
    description: 'Survey of major philosophical movements and their relationship to Christian thought.',
    syllabus: 'Unit 1: Ancient Philosophy (Plato/Aristotle). Unit 2: Medieval Synthesis (Augustine/Aquinas). Unit 3: Modernity & Faith. Unit 4: Contemporary Moral Issues.'
  },
  { 
    id: 'CRS-APOL-301', 
    name: 'Classical Christian Apologetics', 
    code: 'APOL301', 
    faculty: 'Theology', 
    department: 'Philosophy & Ethics', 
    level: 'Undergraduate', 
    credits: 3, 
    status: 'Published', 
    description: 'Development of skills to defend the core truth claims of the Christian faith.',
    syllabus: 'Module 1: The Existence of God. Module 2: The Reliability of Scripture. Module 3: The Resurrection of Jesus. Module 4: Addressing Objections.'
  },
  
  // --- SCHOOL OF THEOLOGY: MASTER'S LEVEL ---
  { 
    id: 'CRS-THEO-501', 
    name: 'M.A. in Systematic Theology: Advanced Dogmatics', 
    code: 'THEO501', 
    faculty: 'Theology', 
    department: 'Biblical Studies', 
    level: 'Postgraduate', 
    credits: 4, 
    status: 'Published', 
    description: 'Advanced inquiry into the internal consistency and biblical foundations of Christian doctrine.',
    syllabus: 'Module 1: Prolegomena & Bibliology. Module 2: Theology Proper. Module 3: Christology. Module 4: Pneumatology. Module 5: Soteriology.'
  },
  { 
    id: 'CRS-THEO-510', 
    name: 'M.A. in Christian Apologetics: Philosophical Defense', 
    code: 'APOL510', 
    faculty: 'Theology', 
    department: 'Philosophy & Ethics', 
    level: 'Postgraduate', 
    credits: 4, 
    status: 'Published', 
    description: 'Equipping students with philosophical tools to defend the Christian faith against modern secular critiques.',
    syllabus: 'Module 1: History of Apologetics. Module 2: Cosmological and Teleological Arguments. Module 3: The Problem of Evil. Module 4: Engaging Postmodernism.'
  },
  { 
    id: 'CRS-THEO-520', 
    name: 'M.A. in Christian Education: Curriculum Development', 
    code: 'CE520', 
    faculty: 'Theology', 
    department: 'Education', 
    level: 'Postgraduate', 
    credits: 3, 
    status: 'Published', 
    description: 'Designing instructional materials for faith-based educational settings.',
    syllabus: 'Module 1: Foundations of Education. Module 2: Learning Theories. Module 3: Instructional Design. Module 4: Assessment & Evaluation.'
  },
  { 
    id: 'CRS-MIN-550', 
    name: 'Master of Divinity: Pastoral Care & Counseling', 
    code: 'MDIV550', 
    faculty: 'Theology', 
    department: 'Ministry', 
    level: 'Postgraduate', 
    credits: 4, 
    status: 'Published', 
    description: 'Practical training for clinical and congregational counseling.',
    syllabus: 'Unit 1: The Theology of Counseling. Unit 2: Counseling Skills & Ethics. Unit 3: Crisis Intervention. Unit 4: Marriage & Family Dynamics.'
  },

  // --- SCHOOL OF THEOLOGY: DOCTORAL & PH.D LEVEL ---
  { 
    id: 'CRS-THEO-801', 
    name: 'Ph.D. in Systematic Theology: Dissertation Research', 
    code: 'PHDT801', 
    faculty: 'Theology', 
    department: 'Biblical Studies', 
    level: 'Postgraduate', 
    credits: 12, 
    status: 'Published', 
    description: 'Original research and dissertation writing in a specialized area of dogmatic theology.',
    syllabus: 'Phase 1: Research Methodology. Phase 2: Comprehensive Exams. Phase 3: Dissertation Proposal. Phase 4: Dissertation Defense.'
  },
  { 
    id: 'CRS-THEO-810', 
    name: 'Ph.D. in Christian Apologetics: Existential Critiques', 
    code: 'PHDA810', 
    faculty: 'Theology', 
    department: 'Philosophy & Ethics', 
    level: 'Postgraduate', 
    credits: 9, 
    status: 'Published', 
    description: 'Engaging with existentialism and nihilism from a rigorous Christian philosophical framework.',
    syllabus: 'Module 1: Kierkegaard. Module 2: Nietzsche & Nihilism. Module 3: Sartre & Secularism. Module 4: Christian Existential Responses.'
  },
  { 
    id: 'CRS-THEO-820', 
    name: 'Ph.D. in Christian Education: Sociological Foundations', 
    code: 'PHDE820', 
    faculty: 'Theology', 
    department: 'Education', 
    level: 'Postgraduate', 
    credits: 9, 
    status: 'Published', 
    description: 'Exploring the impact of societal structures on faith transmission in educational institutions.',
    syllabus: 'Module 1: Sociology of Religion. Module 2: The Family as Educational Agent. Module 3: Secularization in Schools. Module 4: Institutional Leadership.'
  },
  { 
    id: 'CRS-DMIN-701', 
    name: 'Doctor of Ministry (D.Min): Strategic Leadership', 
    code: 'DMIN701', 
    faculty: 'Theology', 
    department: 'Ministry', 
    level: 'Postgraduate', 
    credits: 6, 
    status: 'Published', 
    description: 'Professional doctorate focusing on the integration of theology and the practice of ministry leadership.',
    syllabus: 'Seminar 1: Contemporary Ministry Context. Seminar 2: Spiritual Formation for Leaders. Seminar 3: Institutional Growth Strategies.'
  },

  // --- DEPARTMENT OF ICT & OTHER TRACKS ---
  { 
    id: 'CRS-ICT-001', 
    name: 'Introduction to Computational Thinking', 
    code: 'CS101', 
    faculty: 'ICT', 
    department: 'Computer Science', 
    level: 'Undergraduate', 
    credits: 4, 
    status: 'Published', 
    description: 'Foundational problem solving via algorithmic processes and Python programming.',
    syllabus: 'Module 1: Abstraction & Patterns. Module 2: Basic Programming. Module 3: Algorithmic Efficiency. Module 4: Debugging.'
  },
  { 
    id: 'CRS-ICT-002', 
    name: 'Full-Stack Software Architecture', 
    code: 'CS302', 
    faculty: 'ICT', 
    department: 'Computer Science', 
    level: 'Undergraduate', 
    credits: 4, 
    status: 'Published', 
    description: 'Designing scalable applications using React, Node.js, and cloud-native microservices.',
    syllabus: 'Module 1: Frontend (React). Module 2: Backend (Node/Express). Module 3: Databases (SQL/NoSQL). Module 4: Cloud Deployment.'
  },
  { 
    id: 'CRS-BUS-001', 
    name: 'Strategic Financial Management', 
    code: 'MBA101', 
    faculty: 'Business', 
    department: 'Finance', 
    level: 'Postgraduate', 
    credits: 4, 
    status: 'Published', 
    description: 'High-level analysis of corporate finance and investment strategies.',
    syllabus: 'Module 1: Financial Statements. Module 2: Risk Models. Module 3: Capital Budgeting. Module 4: Corporate Governance.'
  },
  { 
    id: 'CRS-EDU-505', 
    name: 'M.A. in Educational Leadership', 
    code: 'EDUL505', 
    faculty: 'Education', 
    department: 'Pedagogy', 
    level: 'Postgraduate', 
    credits: 4, 
    status: 'Published', 
    description: 'Leading school transformation and faculty development.',
    syllabus: 'Module 1: Policy Analysis. Module 2: Talent Management. Module 3: Organizational Change.'
  },
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
  const [eventsCount, setEventsCount] = useState(12);

  // Auto-save effects
  useEffect(() => {
    localStorage.setItem('bmi_data_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('bmi_data_staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('bmi_data_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('bmi_data_courses', JSON.stringify(courses));
  }, [courses]);

  // Derived Values
  const totalStudents = students.length;
  const applicantCount = students.filter(s => s.status === 'Applicant').length;
  const totalRevenue = transactions.reduce((acc, curr) => curr.status === 'Paid' ? acc + curr.amt : acc, 0);

  const [logo, setLogo] = useState<string>(() => {
    try {
      return localStorage.getItem('bmi_logo') || "https://i.ibb.co/Gv2vPdJC/BMI-PNG.png";
    } catch (e) {
      return "https://i.ibb.co/Gv2vPdJC/BMI-PNG.png";
    }
  });

  const [theme, setTheme] = useState<string>(() => {
    try {
      const savedGeneral = localStorage.getItem('bmi_settings_general');
      return savedGeneral ? JSON.parse(savedGeneral).theme || 'light' : 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const handleChangeView = (view: string) => {
    if (view === 'ai') {
      setIsAIModalOpen(true);
    } else {
      setCurrentView(view);
    }
  };

  const handleLogoUpdate = (newLogo: string) => {
    setLogo(newLogo);
    localStorage.setItem('bmi_logo', newLogo);
  };

  const handleThemeUpdate = (newTheme: string) => {
    setTheme(newTheme);
    const savedGeneral = localStorage.getItem('bmi_settings_general');
    const general = savedGeneral ? JSON.parse(savedGeneral) : {};
    general.theme = newTheme;
    localStorage.setItem('bmi_settings_general', JSON.stringify(general));
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} logo={logo} />;
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        onChangeView={handleChangeView} 
        onLogout={handleLogout}
        logo={logo}
      />

      <main className="flex-1 ml-64 h-screen overflow-y-auto relative bg-[#F8F9FA] dark:bg-gray-950">
        {currentView === 'dashboard' && (
          <Dashboard 
            userName="Admin" 
            theme={theme} 
            onNavigate={handleChangeView}
            stats={{
              students: totalStudents,
              admissions: applicantCount,
              tuition: totalRevenue,
              events: eventsCount
            }}
            onAddStudent={(name) => {
               const [first, last] = name.split(' ');
               const newStud: Student = {
                 id: `BMI-2024-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
                 firstName: first || 'New',
                 lastName: last || 'Student',
                 email: `${first?.toLowerCase() || 'new'}.${last?.toLowerCase() || 'student'}@bmi.edu`,
                 phone: '+254 700 000 000',
                 faculty: 'Undeclared',
                 department: 'Undeclared',
                 careerPath: 'Freshman',
                 admissionYear: '2024',
                 enrollmentTerm: 'Fall 2024',
                 status: 'Active',
                 standing: 'Good',
                 gpa: 4.0,
                 avatarColor: 'bg-indigo-500',
                 photoZoom: 1.0
               };
               setStudents(prev => [newStud, ...prev]);
            }}
            onAddTransaction={(amt) => {
               const newTx: Transaction = {
                 ref: `TRX-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
                 name: 'Institutional Payment',
                 desc: 'Dashboard Quick Entry',
                 date: new Date().toISOString().split('T')[0],
                 amt: amt,
                 status: 'Paid'
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
        {currentView === 'library' && <Library />}
        {currentView === 'hostels' && <Hostels />}
        {currentView === 'medical' && <Medical />}
        {currentView === 'inventory' && <Inventory />}
        {currentView === 'alumni' && <Alumni />}
        {currentView === 'sms' && <Communications />}
        {currentView === 'visitors' && <Visitors />}
        {currentView === 'reports' && <Reports />}
        
        <button 
          onClick={() => setIsAIModalOpen(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-[#4B0082] to-[#6A0DAD] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-30 group border-2 border-[#FFD700]/30"
        >
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