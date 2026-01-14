import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Wallet, 
  Calendar, 
  UserCheck, 
  Send, 
  X, 
  Check, 
  Loader2, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Bell 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from './StatCard';
import StudentRegistrationModal from './StudentRegistrationModal';
import { Student } from '../types';

interface DashboardProps {
  userName: string;
  theme: string;
  onNavigate: (view: string) => void;
  stats: {
    students: number;
    admissions: number;
    tuition: number;
    events: number;
  };
  onAddStudent: (name: string) => void;
  onAddTransaction: (amt: number) => void;
}

const revenueTrend = [
  { month: 'Jan', revenue: 120000 },
  { month: 'Feb', revenue: 145000 },
  { month: 'Mar', revenue: 210000 },
  { month: 'Apr', revenue: 190000 },
  { month: 'May', revenue: 250000 },
  { month: 'Jun', revenue: 389000 },
];

const Dashboard: React.FC<DashboardProps> = ({ userName, theme, onNavigate, stats, onAddStudent, onAddTransaction }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const [activeModal, setActiveModal] = useState<'attendance' | 'transaction' | 'sms' | null>(null);
  const [isStudentRegistrationOpen, setIsStudentRegistrationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{show: boolean, msg: string}>({ show: false, msg: '' });
  
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

  const handleStudentEnrolled = (studentData: Partial<Student>) => {
    const fullName = `${studentData.firstName || ''} ${studentData.lastName || ''}`.trim();
    onAddStudent(fullName);
    showToast(`Institutional Record committed to registry.`);
  };

  const handleAction = (type: string) => {
    setIsLoading(true);
    setTimeout(() => {
      if (type === 'transaction') {
        const amount = parseFloat(formData.transactionAmount) || 0;
        onAddTransaction(amount);
        showToast(`Transaction of $${amount.toLocaleString()} recorded.`);
      } else if (type === 'attendance') {
        showToast(`Attendance marked for ${formData.attendanceCourse}.`);
      } else if (type === 'sms') {
        showToast(`Broadcast sent to ${stats.students.toLocaleString()} students.`);
      }
      handleCloseModal();
    }, 1000);
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
    return `$${val}`;
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20 relative">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <div className="w-1.5 h-8 bg-[#4B0082] rounded-none"></div>
             <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white tracking-tight uppercase">Executive Control Center</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest text-xs ml-4">BMI University Oversight • {userName}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-none shadow-lg border-b-2 border-[#FFD700] flex items-center gap-3 text-xs text-[#4B0082] dark:text-purple-300 font-bold uppercase tracking-widest">
             <Calendar size={18} className="text-[#FFD700]" />
             {currentDate}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-none shadow-xl border border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 items-center transition-all overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#4B0082]"></div>
        <div className="flex items-center gap-2 mr-4">
          <Award size={20} className="text-[#FFD700]" />
          <span className="text-xs font-bold text-[#4B0082] dark:text-gray-400 uppercase tracking-widest">Institutional Actions:</span>
        </div>
        
        <button onClick={() => setIsStudentRegistrationOpen(true)} className="flex items-center gap-2 px-5 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-[#4B0082] text-[#4B0082] dark:text-gray-200 hover:text-white rounded-none transition-all shadow-sm font-bold text-xs uppercase tracking-widest border border-gray-200 dark:border-gray-600">
            <UserPlus size={18} className="text-[#FFD700]" /> Add Student
        </button>
        <button onClick={() => setActiveModal('attendance')} className="flex items-center gap-2 px-5 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-[#4B0082] text-[#4B0082] dark:text-gray-200 hover:text-white rounded-none transition-all shadow-sm font-bold text-xs uppercase tracking-widest border border-gray-200 dark:border-gray-600">
            <UserCheck size={18} className="text-[#FFD700]" /> Attendance
        </button>
        <button onClick={() => setActiveModal('transaction')} className="flex items-center gap-2 px-5 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-[#4B0082] text-[#4B0082] dark:text-gray-200 hover:text-white rounded-none transition-all shadow-sm font-bold text-xs uppercase tracking-widest border border-gray-200 dark:border-gray-600">
            <Wallet size={18} className="text-[#FFD700]" /> Transaction
        </button>
        <button onClick={() => setActiveModal('sms')} className="flex items-center gap-2 px-5 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-[#4B0082] text-[#4B0082] dark:text-gray-200 hover:text-white rounded-none transition-all shadow-sm font-bold text-xs uppercase tracking-widest border border-gray-200 dark:border-gray-600">
            <Send size={18} className="text-[#FFD700]" /> Broadcast
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div onClick={() => onNavigate('students')} className="cursor-pointer">
          <StatCard title="Global Student Pool" value={stats.students.toLocaleString()} subText="Verified Enrollments" color="purple" icon={<Users size={24} className="text-[#4B0082]" />} />
        </div>
        <div onClick={() => onNavigate('students')} className="cursor-pointer">
          <StatCard title="Intake Velocity" value={stats.admissions.toString()} subText="Last 30 cycles" color="amber" icon={<TrendingUp size={24} className="text-[#FFD700]" />} />
        </div>
        <div onClick={() => onNavigate('finance')} className="cursor-pointer">
          <StatCard title="Capital Accumulation" value={formatCurrency(stats.tuition)} subText="Revenue Realized" color="emerald" icon={<Wallet size={24} className="text-emerald-700" />} />
        </div>
        <div onClick={() => onNavigate('attendance')} className="cursor-pointer">
          <StatCard title="Campus Velocity" value={stats.events.toString()} subText="Scheduled Milestones" color="blue" icon={<Calendar size={24} className="text-blue-700" />} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-none shadow-xl border border-gray-100 dark:border-gray-700 p-10 transition-all overflow-hidden relative">
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-[#4B0082] dark:text-white uppercase tracking-tight">Financial Trend Analysis</h3>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">Institutional Revenue Projection</p>
            </div>
            <div className="flex gap-2">
               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-none flex items-center gap-2 font-bold text-xs uppercase">
                 <TrendingUp size={14} /> +24.8% growth
               </div>
            </div>
          </div>

          <div className="h-72 min-h-[280px] relative z-10">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={revenueTrend}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4B0082" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4B0082" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{fontSize: 11, fontWeight: 600, fill: '#9CA3AF'}} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '0', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4B0082" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-none shadow-xl border border-gray-100 dark:border-gray-700 p-10 transition-all relative overflow-hidden">
             <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FFD700]/20 text-[#4B0082]">
                    <Bell size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-[#4B0082] dark:text-white uppercase tracking-tight">Institutional Bulletin</h3>
                </div>
             </div>

             <div className="space-y-6 relative z-10">
                {[
                    { title: 'Strategic Vision 2030', desc: 'Expanding ICT Infrastructure by 40%', icon: BookOpen, tag: 'Strategy', color: 'text-blue-600 bg-blue-50' },
                    { title: 'New Faculty Induction', desc: '5 specialized Theology researchers joined.', icon: Award, tag: 'Academic', color: 'text-[#4B0082] bg-purple-50' },
                    { title: 'Campus Security Audit', desc: 'Biometric gate integration completed.', icon: UserCheck, tag: 'Security', color: 'text-emerald-600 bg-emerald-50' }
                ].map((item, idx) => (
                    <div key={idx} className="group cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-none transition-all border border-transparent hover:border-gray-100">
                        <div className="flex items-center gap-4">
                           <div className={`p-3 rounded-none ${item.color}`}>
                              <item.icon size={20} />
                           </div>
                           <div className="flex-1">
                              <span className="text-xs font-bold uppercase tracking-widest opacity-60 italic">{item.tag}</span>
                              <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm leading-tight group-hover:text-[#4B0082] transition-colors">{item.title}</h4>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.desc}</p>
                           </div>
                        </div>
                    </div>
                ))}
             </div>
             
             <button className="w-full mt-10 py-4 bg-gray-50 dark:bg-gray-700 rounded-none text-xs font-bold uppercase tracking-widest text-[#4B0082] dark:text-purple-300 hover:bg-[#4B0082] hover:text-white transition-all shadow-inner">
               Access Archives
             </button>
        </div>
      </div>

      <StudentRegistrationModal 
        isOpen={isStudentRegistrationOpen} 
        onClose={() => setIsStudentRegistrationOpen(false)} 
        onSuccess={handleStudentEnrolled}
      />

      {activeModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#1a0033]/90 backdrop-blur-3xl p-4">
            <div className="bg-white dark:bg-gray-900 rounded-none shadow-2xl w-full max-w-md overflow-hidden transform transition-all border-2 border-[#FFD700]/20">
                <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-900 text-white">
                    <h3 className="text-xl font-bold uppercase tracking-tight">
                        {activeModal === 'attendance' && 'Mark Attendance'}
                        {activeModal === 'transaction' && 'Record Payment'}
                        {activeModal === 'sms' && 'Global Broadcast'}
                    </h3>
                    <button onClick={handleCloseModal} className="p-2 hover:bg-red-500 hover:text-white transition-all text-gray-400">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    {activeModal === 'attendance' && (
                         <div className="space-y-4">
                            <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Target Academic Module</label>
                            <select 
                                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 rounded-none outline-none font-bold text-sm"
                                value={formData.attendanceCourse}
                                onChange={e => setFormData({...formData, attendanceCourse: e.target.value})}
                            >
                                <option value="CS101">CS101 - Computer Science</option>
                                <option value="THEO200">THEO200 - Biblical Hermeneutics</option>
                                <option value="EDU500">EDU500 - Pedagogy 101</option>
                            </select>
                         </div>
                    )}
                    {activeModal === 'transaction' && (
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Financial Magnitude ($)</label>
                            <input 
                                autoFocus
                                type="number" 
                                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 rounded-none outline-none font-bold text-2xl text-[#4B0082]"
                                placeholder="0.00"
                                value={formData.transactionAmount}
                                onChange={e => setFormData({...formData, transactionAmount: e.target.value})}
                            />
                        </div>
                    )}
                    {activeModal === 'sms' && (
                         <div className="space-y-4">
                            <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Dispatch Narrative</label>
                            <textarea 
                                autoFocus
                                className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 rounded-none outline-none h-40 resize-none font-medium text-sm"
                                placeholder="Official institutional message..."
                                value={formData.smsMessage}
                                onChange={e => setFormData({...formData, smsMessage: e.target.value})}
                            ></textarea>
                        </div>
                    )}
                </div>
                <div className="p-8 pt-0 flex flex-col gap-3">
                    <button 
                        onClick={() => handleAction(activeModal)}
                        disabled={isLoading}
                        className="w-full py-5 bg-[#4B0082] text-white rounded-none shadow-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all border border-[#FFD700]/30 disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Award size={18} className="text-[#FFD700]" />}
                        {activeModal === 'attendance' && 'Commit Attendance Registry'}
                        {activeModal === 'transaction' && 'Authorize Capital Entry'}
                        {activeModal === 'sms' && 'Dispatch Global Broadcast'}
                    </button>
                    <button onClick={handleCloseModal} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors py-2">
                        Abort Protocol
                    </button>
                </div>
            </div>
        </div>
      )}

      {toast.show && (
          <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-[120]">
             <div className="bg-[#4B0082] text-white px-10 py-5 rounded-none shadow-2xl flex items-center gap-4 border border-[#FFD700] backdrop-blur-xl">
               <Check size={24} className="text-[#FFD700]" />
               <span className="font-bold text-sm uppercase tracking-widest">{toast.msg}</span>
             </div>
          </div>
      )}

    </div>
  );
};

export default Dashboard;