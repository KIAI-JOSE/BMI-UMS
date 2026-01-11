
import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Plus, 
  Search, 
  Filter, 
  ShieldCheck, 
  GraduationCap, 
  MoreVertical, 
  Edit, 
  Trash2, 
  X, 
  CheckCircle,
  Users,
  Building2,
  Clock,
  LayoutGrid,
  List,
  ChevronRight,
  Download,
  Award,
  Upload,
  User
} from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: 'Full-time' | 'Contract' | 'Part-time' | 'On Leave';
  category: 'Academic' | 'Administrative' | 'Management';
  specialization: string;
  avatarColor: string;
  joinDate: string;
  office: string;
  officeHours: string;
  photo?: string;
}

const initialStaff: StaffMember[] = [
  { id: 'STF-001', name: 'Dr. Samuel Kiptoo', role: 'Dean, School of Theology', department: 'School of Theology', email: 's.kiptoo@bmi.edu', phone: '+254 712 345 678', status: 'Full-time', category: 'Academic', specialization: 'Biblical Hermeneutics', avatarColor: 'bg-indigo-600', joinDate: '2015-08-12', office: 'Admin Block, Rm 12', officeHours: 'Mon-Wed, 10am-12pm', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 'STF-002', name: 'Prof. Alice Mwangi', role: 'Lead Lecturer', department: 'Dept. of ICT', email: 'a.mwangi@bmi.edu', phone: '+254 722 987 654', status: 'Full-time', category: 'Academic', specialization: 'Cyber Security', avatarColor: 'bg-blue-600', joinDate: '2018-01-15', office: 'Tech Hub, Rm 04', officeHours: 'Tue-Thu, 2pm-4pm', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { id: 'STF-003', name: 'Rev. James Omolo', role: 'University Chaplain', department: 'Student Affairs', email: 'j.omolo@bmi.edu', phone: '+254 733 111 222', status: 'Full-time', category: 'Administrative', specialization: 'Pastoral Care', avatarColor: 'bg-emerald-600', joinDate: '2010-03-20', office: 'Chapel Office', officeHours: 'Daily, 8am-5pm', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { id: 'STF-004', name: 'Mary Wambui', role: 'Registrar, Academic Affairs', department: 'Administration', email: 'm.wambui@bmi.edu', phone: '+254 700 444 555', status: 'Full-time', category: 'Management', specialization: 'Educational Admin', avatarColor: 'bg-amber-600', joinDate: '2020-11-05', office: 'Registrar Bldg, Rm 01', officeHours: 'By Appointment', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: 'STF-005', name: 'Dr. Jane Okumu', role: 'Senior Lecturer', department: 'School of Business', email: 'j.okumu@bmi.edu', phone: '+254 744 555 666', status: 'Full-time', category: 'Academic', specialization: 'Macroeconomics', avatarColor: 'bg-purple-600', joinDate: '2017-05-14', office: 'Business Wing, Rm 22', officeHours: 'Fri, 9am-1pm', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
];

const departments = ['All Departments', 'School of Theology', 'Dept. of ICT', 'School of Business', 'Education Dept.', 'Administration', 'Student Affairs'];

const Staff: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [activeTab, setActiveTab] = useState<'All' | 'Academic' | 'Administrative' | 'Management'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newStaff, setNewStaff] = useState({
    name: '', role: '', department: 'School of Theology', email: '', phone: '', status: 'Full-time', category: 'Academic', specialization: '', office: '', officeHours: ''
  });

  const filteredStaff = useMemo(() => {
    return staff.filter(member => {
      const matchesSearch = (member.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (member.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (member.specialization || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = deptFilter === 'All Departments' || member.department === deptFilter;
      const matchesTab = activeTab === 'All' || member.category === activeTab;
      return matchesSearch && matchesDept && matchesTab;
    });
  }, [staff, searchTerm, deptFilter, activeTab]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size < 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else if (file) {
      alert("Image must be under 2MB");
    }
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) return;

    const member: StaffMember = {
      ...newStaff,
      id: `STF-${Math.floor(Math.random() * 900) + 100}`,
      avatarColor: 'bg-indigo-600',
      joinDate: new Date().toISOString().split('T')[0],
      status: newStaff.status as StaffMember['status'],
      category: newStaff.category as StaffMember['category'],
      photo: imagePreview || undefined
    };

    setStaff([member, ...staff]);
    setIsModalOpen(false);
    setImagePreview(null);
    setNewStaff({ name: '', role: '', department: 'School of Theology', email: '', phone: '', status: 'Full-time', category: 'Academic', specialization: '', office: '', officeHours: '' });
  };

  const deleteStaff = (id: string) => {
    if (window.confirm('Are you sure you want to remove this staff member from the institutional records?')) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in pb-20">
      {/* Professional Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-8 bg-[#4B0082] rounded-full"></div>
             <h2 className="text-3xl font-extrabold text-[#2E004F] dark:text-white tracking-tight">University Directory</h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">BMI University Institutional Human Capital & Academic Faculty Management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 hover:text-[#4B0082] transition-all shadow-sm">
             <Download size={20} />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#4B0082] text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all font-bold text-sm"
          >
            <Plus size={18} className="text-[#FFD700]" /> Register Staff
          </button>
        </div>
      </div>

      {/* KPI Ribbons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Personnel', val: staff.length, icon: Users, col: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Faculty Members', val: staff.filter(s => s.category === 'Academic').length, icon: GraduationCap, col: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Administrative', val: staff.filter(s => s.category === 'Administrative').length, icon: Briefcase, col: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Research Awards', val: 12, icon: Award, col: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-transform hover:scale-[1.02]">
             <div className={`p-2.5 rounded-xl ${item.bg} dark:bg-gray-700 ${item.col}`}>
                <item.icon size={22} />
             </div>
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{item.val}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Control Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col p-2">
         {/* Tabs & View Modes */}
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-2">
            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl w-full md:w-auto">
              {['All', 'Academic', 'Administrative', 'Management'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 md:px-6 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === tab 
                      ? 'bg-white dark:bg-gray-600 text-[#4B0082] dark:text-[#FFD700] shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
               <button 
                 onClick={() => setViewMode('grid')}
                 className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 text-[#4B0082] dark:text-[#FFD700] shadow-sm' : 'text-gray-400'}`}
               >
                 <LayoutGrid size={18} />
               </button>
               <button 
                 onClick={() => setViewMode('table')}
                 className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white dark:bg-gray-600 text-[#4B0082] dark:text-[#FFD700] shadow-sm' : 'text-gray-400'}`}
               >
                 <List size={18} />
               </button>
            </div>
         </div>

         {/* Filtering */}
         <div className="p-4 flex flex-col md:flex-row gap-4 border-t border-gray-100 dark:border-gray-700">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search institutional database..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none text-sm dark:text-white focus:ring-2 focus:ring-[#4B0082]/20" 
              />
            </div>
            <select 
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-bold outline-none dark:text-white cursor-pointer"
            >
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
         </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member) => (
            <div key={member.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden group hover:border-purple-300 transition-all hover:shadow-xl">
               <div className={`h-2 w-full ${member.avatarColor}`}></div>
               <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                     <div className={`w-16 h-16 rounded-2xl ${member.avatarColor} flex items-center justify-center text-white font-bold text-2xl shadow-md border-4 border-white dark:border-gray-700 -mt-12 overflow-hidden bg-white`}>
                        {member.photo ? (
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          (member.name || '?').charAt(0)
                        )}
                     </div>
                     <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                       member.status === 'Full-time' ? 'bg-green-100 text-green-700' : 
                       member.status === 'On Leave' ? 'bg-amber-100 text-amber-700' : 
                       'bg-blue-100 text-blue-700'
                     }`}>
                       {member.status}
                     </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                       {member.name}
                       {member.category === 'Academic' && <CheckCircle size={14} className="text-[#4B0082]" />}
                    </h3>
                    <p className="text-xs text-[#4B0082] dark:text-purple-300 font-bold uppercase tracking-wide mt-0.5 line-clamp-1">{member.role}</p>
                    <p className="text-[10px] text-gray-400 font-mono mt-1">{member.department} • {member.id}</p>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-3 group/info">
                      <Mail size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-300 truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-3 group/info">
                      <MapPin size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{member.office}</span>
                    </div>
                    <div className="flex items-center gap-3 group/info">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-[10px] text-gray-500 font-medium">Office Hrs: {member.officeHours}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                     <button onClick={() => deleteStaff(member.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                     </button>
                     <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl text-[10px] font-bold text-gray-600 dark:text-gray-300 hover:bg-[#4B0082] hover:text-white transition-all">
                        View Profile <ChevronRight size={12} />
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-gray-50 dark:bg-gray-700/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                    <th className="px-6 py-4">Full Name</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Specialization</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Office</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                 {filteredStaff.map((member) => (
                   <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors text-sm">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${member.avatarColor} flex items-center justify-center text-white text-xs font-bold overflow-hidden bg-white`}>
                              {member.photo ? (
                                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                              ) : (
                                (member.name || '?').charAt(0)
                              )}
                            </div>
                            <div>
                               <p className="font-bold text-gray-900 dark:text-white">{member.name}</p>
                               <p className="text-[10px] text-gray-400 font-mono">{member.id}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">{member.department}</td>
                      <td className="px-6 py-4">
                         <span className="bg-purple-50 dark:bg-purple-900/20 text-[#4B0082] dark:text-purple-300 px-2 py-0.5 rounded text-[10px] font-bold">{member.specialization}</span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">{member.email}</td>
                      <td className="px-6 py-4 text-xs text-gray-500">{member.office}</td>
                      <td className="px-6 py-4 text-right">
                         <button className="p-2 text-gray-300 hover:text-[#4B0082] transition-colors"><Edit size={16} /></button>
                         <button onClick={() => deleteStaff(member.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors ml-1"><Trash2 size={16} /></button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-[#4B0082] text-white">
              <div>
                <h2 className="text-xl font-bold">New Institutional Registration</h2>
                <p className="text-xs text-purple-200">Official HR entry for BMI University Human Capital</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <form onSubmit={handleAddStaff} className="p-8 overflow-y-auto space-y-6">
               <div className="flex flex-col md:flex-row gap-8 items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group bg-gray-50 dark:bg-gray-700">
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <User size={32} className="text-gray-300" />
                        <span className="text-[10px] mt-2 font-bold text-gray-400">Add Photo</span>
                      </>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload size={20} className="text-white" />
                    </div>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleImageUpload} accept="image/*" />
                  </div>
                </div>
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Legal Name</label>
                    <input 
                      required
                      type="text" 
                      value={newStaff.name}
                      onChange={e => setNewStaff({...newStaff, name: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/20 dark:text-white"
                      placeholder="Full Official Names"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Academic Category</label>
                    <select 
                      value={newStaff.category}
                      onChange={e => setNewStaff({...newStaff, category: e.target.value as any})}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/20 dark:text-white"
                    >
                      <option value="Academic">Academic Faculty</option>
                      <option value="Administrative">Administrative Staff</option>
                      <option value="Management">Institutional Management</option>
                    </select>
                  </div>
                </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Primary Department</label>
                    <select 
                      value={newStaff.department}
                      onChange={e => setNewStaff({...newStaff, department: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/20 dark:text-white"
                    >
                      {departments.slice(1).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Official Role</label>
                    <input 
                      required
                      type="text" 
                      value={newStaff.role}
                      onChange={e => setNewStaff({...newStaff, role: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/20 dark:text-white"
                      placeholder="e.g. Senior Lecturer"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={newStaff.email}
                      onChange={e => setNewStaff({...newStaff, email: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/20 dark:text-white"
                      placeholder="name@bmi.edu"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Contact Phone</label>
                    <input 
                      type="text" 
                      value={newStaff.phone}
                      onChange={e => setNewStaff({...newStaff, phone: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/20 dark:text-white"
                      placeholder="+254..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Office Location</label>
                    <input 
                      type="text" 
                      value={newStaff.office}
                      onChange={e => setNewStaff({...newStaff, office: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/20 dark:text-white"
                      placeholder="Block, Room Number"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Office Hours</label>
                    <input 
                      type="text" 
                      value={newStaff.officeHours}
                      onChange={e => setNewStaff({...newStaff, officeHours: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/20 dark:text-white"
                      placeholder="e.g. Mon-Wed, 10am-12pm"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Academic Specialization / Core Skills</label>
                    <input 
                      type="text" 
                      value={newStaff.specialization}
                      onChange={e => setNewStaff({...newStaff, specialization: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/20 dark:text-white"
                      placeholder="e.g. Distributed Systems & Cloud Infrastructure"
                    />
                  </div>
               </div>

               <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)} 
                    className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-2 bg-[#4B0082] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    Confirm Registration
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
