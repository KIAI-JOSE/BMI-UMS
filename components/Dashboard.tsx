
import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Wallet, 
  Calendar, 
  UserCheck, 
  Send, 
  MoreHorizontal,
  X,
  Check,
  Loader2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import StatCard from './StatCard';
import StudentRegistrationModal from './StudentRegistrationModal';

interface DashboardProps {
  userName: string;
  theme: string;
  onNavigate: (view: string) => void;
}

const ageData = [
  { name: 'Under 18', value: 460 },
  { name: '18-22', value: 2400 }, // College age peak
  { name: '23-30', value: 540 },
  { name: 'Over 30', value: 150 },
];

const Dashboard: React.FC<DashboardProps> = ({ userName, theme, onNavigate }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const isDark = theme === 'dark';

  // State for dynamic stats
  const [stats, setStats] = useState({
    students: 3547,
    admissions: 128,
    tuition: 1370000,
    events: 12
  });

  // Action States
  const [activeModal, setActiveModal] = useState<'attendance' | 'transaction' | 'sms' | null>(null);
  const [isStudentRegistrationOpen, setIsStudentRegistrationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{show: boolean, msg: string}>({ show: false, msg: '' });
  
  // Form States
  const [formData, setFormData] = useState({
    studentName: '',
    transactionAmount: '',
    smsMessage: '',
    attendanceCourse: 'CS101'
  });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setFormData({ studentName: '', transactionAmount: '', smsMessage: '', attendanceCourse: 'CS101' });
    setIsLoading(false);
  };

  const handleStudentEnrolled = (name: string) => {
    setStats(prev => ({ ...prev, students: prev.students + 1, admissions: prev.admissions + 1 }));
    showToast(`Institutional Record for "${name}" committed to registry.`);
  };

  const handleAction = (type: string) => {
    setIsLoading(true);
    setTimeout(() => {
      if (type === 'transaction') {
        const amount = parseFloat(formData.transactionAmount) || 0;
        setStats(prev => ({ ...prev, tuition: prev.tuition + amount }));
        showToast(`Transaction of $${amount.toLocaleString()} recorded.`);
      } else if (type === 'attendance') {
        showToast(`Attendance marked for ${formData.attendanceCourse}.`);
      } else if (type === 'sms') {
        showToast(`Broadcast sent to ${stats.students.toLocaleString()} active students.`);
      }
      handleCloseModal();
    }, 1000);
  };

  // Helper to format currency nicely
  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
    return `$${val}`;
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20 relative">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white tracking-tight">Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of institutional performance</p>
        </div>
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-purple-100 dark:border-gray-700 flex items-center gap-2 text-sm text-[#4B0082] dark:text-purple-300 font-medium">
           <Calendar size={16} className="text-[#FFD700]" />
           {currentDate}
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-gradient-to-r from-purple-50 to-white dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl shadow-sm border border-purple-100 dark:border-gray-700 flex flex-wrap gap-4 items-center transition-colors">
        <span className="text-xs font-bold text-[#4B0082] dark:text-gray-400 uppercase tracking-wider mr-2">Quick Actions:</span>
        <button 
            onClick={() => setIsStudentRegistrationOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 hover:bg-[#4B0082] dark:hover:bg-[#4B0082] text-[#4B0082] dark:text-gray-200 hover:text-[#FFD700] rounded-xl transition-all shadow-sm border border-purple-100 dark:border-gray-600 hover:border-[#4B0082] text-sm font-semibold group"
        >
            <UserPlus size={18} className="text-[#FFD700] group-hover:text-[#FFD700]" /> Add Student
        </button>
        <button 
            onClick={() => setActiveModal('attendance')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 hover:bg-[#4B0082] dark:hover:bg-[#4B0082] text-[#4B0082] dark:text-gray-200 hover:text-[#FFD700] rounded-xl transition-all shadow-sm border border-purple-100 dark:border-gray-600 hover:border-[#4B0082] text-sm font-semibold group"
        >
            <UserCheck size={18} className="text-[#FFD700] group-hover:text-[#FFD700]" /> Mark Attendance
        </button>
        <button 
            onClick={() => setActiveModal('transaction')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 hover:bg-[#4B0082] dark:hover:bg-[#4B0082] text-[#4B0082] dark:text-gray-200 hover:text-[#FFD700] rounded-xl transition-all shadow-sm border border-purple-100 dark:border-gray-600 hover:border-[#4B0082] text-sm font-semibold group"
        >
            <Wallet size={18} className="text-[#FFD700] group-hover:text-[#FFD700]" /> Add Transaction
        </button>
        <button 
            onClick={() => setActiveModal('sms')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 hover:bg-[#4B0082] dark:hover:bg-[#4B0082] text-[#4B0082] dark:text-gray-200 hover:text-[#FFD700] rounded-xl transition-all shadow-sm border border-purple-100 dark:border-gray-600 hover:border-[#4B0082] text-sm font-semibold group"
        >
            <Send size={18} className="text-[#FFD700] group-hover:text-[#FFD700]" /> SMS Broadcast
        </button>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={() => onNavigate('students')} className="cursor-pointer">
          <StatCard 
            title="Total Students" 
            value={stats.students.toLocaleString()} 
            subText="Active Enrollments" 
            color="purple" 
            icon={<Users size={24} className="text-[#4B0082]" />} 
          />
        </div>
        <div onClick={() => onNavigate('students')} className="cursor-pointer">
          <StatCard 
            title="New Admissions" 
            value={stats.admissions.toString()} 
            subText="Last 30 days" 
            color="amber" 
            icon={<UserPlus size={24} className="text-[#FFD700]" />} 
          />
        </div>
        <div onClick={() => onNavigate('finance')} className="cursor-pointer">
          <StatCard 
            title="Tuition Collection" 
            value={formatCurrency(stats.tuition)} 
            subText="Current Semester" 
            color="emerald" 
            icon={<Wallet size={24} className="text-emerald-700 dark:text-emerald-400" />} 
          />
        </div>
        <div onClick={() => onNavigate('attendance')} className="cursor-pointer">
          <StatCard 
            title="Upcoming Events" 
            value={stats.events.toString()} 
            subText="This Month" 
            color="blue" 
            icon={<Calendar size={24} className="text-blue-700 dark:text-blue-400" />} 
          />
        </div>
      </div>

      {/* Charts & Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Demographics (Span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 transition-colors">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#4B0082] dark:text-white">Student Demographics</h3>
            <button className="text-gray-400 hover:text-[#4B0082] dark:hover:text-white"><MoreHorizontal size={20} /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Gender Dist - Custom Progress Bars */}
            <div>
               <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-6">Gender Distribution</h4>
               <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Male</span>
                        <span className="font-bold text-[#4B0082] dark:text-purple-300">46%</span>
                    </div>
                    <div className="h-4 bg-purple-50 dark:bg-gray-700 rounded-full overflow-hidden border border-purple-100 dark:border-gray-600">
                        <div className="h-full bg-gradient-to-r from-[#4B0082] to-[#6A0DAD] rounded-full shadow-lg" style={{ width: '46%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Female</span>
                        <span className="font-bold text-[#FFD700]">54%</span>
                    </div>
                    <div className="h-4 bg-yellow-50 dark:bg-gray-700 rounded-full overflow-hidden border border-yellow-100 dark:border-gray-600">
                        <div className="h-full bg-gradient-to-r from-[#FFD700] to-[#FDB931] rounded-full shadow-lg" style={{ width: '54%' }}></div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Age Dist - Recharts */}
            <div className="h-56">
                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Age Distribution</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageData} layout="vertical" barSize={16}>
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={80} 
                          tick={{fontSize: 12, fontWeight: 500, fill: isDark ? '#9CA3AF' : '#4B5563'}} 
                        />
                        <Tooltip 
                            cursor={{fill: 'transparent'}} 
                            contentStyle={{ 
                              borderRadius: '8px', 
                              border: 'none', 
                              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                              backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                              color: isDark ? '#F3F4F6' : '#1F2937'
                            }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {ageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 1 ? '#FFD700' : '#4B0082'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Events / Birthdays */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 transition-colors">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-[#4B0082] dark:text-white">Events</h3>
                <span onClick={() => onNavigate('attendance')} className="text-xs text-[#FFD700] font-bold cursor-pointer hover:underline uppercase tracking-wide">View All</span>
             </div>

             <div className="space-y-6">
                {[
                    { name: 'Graduation Day', date: 'May 15', type: 'Academic', color: 'bg-gradient-to-br from-[#FFD700] to-[#FDB931] text-[#4B0082]' },
                    { name: 'Dr. Sarah Smith', date: 'May 18', type: 'Guest Lecture', color: 'bg-purple-100 dark:bg-purple-900/40 text-[#4B0082] dark:text-purple-200' },
                    { name: 'Mid-Term Exams', date: 'May 24', type: 'Exam', color: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' },
                    { name: 'Campus Job Fair', date: 'May 28', type: 'Career', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' }
                ].map((event, idx) => (
                    <div key={idx} className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors -mx-2">
                        <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 shadow-sm ${event.color}`}>
                            <span className="text-[10px] font-bold uppercase opacity-80">{event.date.split(' ')[0]}</span>
                            <span className="text-xl font-bold leading-none">{event.date.split(' ')[1]}</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm group-hover:text-[#4B0082] dark:group-hover:text-white transition-colors">{event.name}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{event.type}</span>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </div>

      {/* High Fidelity Student Registration Modal */}
      <StudentRegistrationModal 
        isOpen={isStudentRegistrationOpen} 
        onClose={() => setIsStudentRegistrationOpen(false)} 
        onSuccess={handleStudentEnrolled}
      />

      {/* Dynamic Action Modal (Attendance, Transaction, SMS) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                    <h3 className="text-xl font-bold text-[#4B0082] dark:text-white">
                        {activeModal === 'attendance' && 'Mark Attendance'}
                        {activeModal === 'transaction' && 'Record Transaction'}
                        {activeModal === 'sms' && 'Broadcast SMS'}
                    </h3>
                    <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    {/* Attendance Form */}
                    {activeModal === 'attendance' && (
                         <>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Select Course</label>
                                <select 
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4B0082] outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.attendanceCourse}
                                    onChange={e => setFormData({...formData, attendanceCourse: e.target.value})}
                                >
                                    <option value="CS101">CS101 - Intro to Computer Science</option>
                                    <option value="ENG202">ENG202 - Advanced Literature</option>
                                    <option value="MTH301">MTH301 - Calculus III</option>
                                    <option value="PHY101">PHY101 - General Physics</option>
                                </select>
                            </div>
                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-800 dark:text-yellow-200 border border-yellow-100 dark:border-yellow-900">
                                <p>Date: {currentDate}</p>
                                <p>This will mark all registered students as "Present" by default.</p>
                            </div>
                         </>
                    )}

                    {/* Transaction Form */}
                    {activeModal === 'transaction' && (
                        <>
                             <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Amount ($)</label>
                                <input 
                                    autoFocus
                                    type="number" 
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4B0082] outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="0.00"
                                    value={formData.transactionAmount}
                                    onChange={e => setFormData({...formData, transactionAmount: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Transaction Type</label>
                                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4B0082] outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <option>Tuition Payment</option>
                                    <option>Library Fine</option>
                                    <option>Dormitory Fee</option>
                                    <option>Cafeteria Credit</option>
                                </select>
                            </div>
                        </>
                    )}

                    {/* SMS Form */}
                    {activeModal === 'sms' && (
                         <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Broadcast Message</label>
                            <textarea 
                                autoFocus
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4B0082] outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white h-32 resize-none"
                                placeholder="Type your message here..."
                                value={formData.smsMessage}
                                onChange={e => setFormData({...formData, smsMessage: e.target.value})}
                            ></textarea>
                            <p className="text-xs text-gray-500 text-right">0/160 characters</p>
                        </div>
                    )}
                </div>
                <div className="p-6 pt-0 flex justify-end gap-3">
                    <button 
                        onClick={handleCloseModal}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => handleAction(activeModal)}
                        disabled={isLoading}
                        className="px-6 py-2 bg-[#4B0082] hover:bg-[#3b0066] text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading && <Loader2 size={16} className="animate-spin" />}
                        {activeModal === 'attendance' && 'Save Attendance'}
                        {activeModal === 'transaction' && 'Process Payment'}
                        {activeModal === 'sms' && 'Send Broadcast'}
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Success Toast */}
      {toast.show && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[60] animate-fade-in">
             <div className="bg-[#4B0082] text-white dark:bg-white dark:text-[#4B0082] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 dark:border-[#4B0082]/20">
               <div className="bg-white/20 dark:bg-[#4B0082]/10 p-1 rounded-full">
                  <Check size={16} className="text-white dark:text-[#4B0082]" />
               </div>
               <span className="font-bold text-sm">{toast.msg}</span>
             </div>
          </div>
      )}

    </div>
  );
};

export default Dashboard;
