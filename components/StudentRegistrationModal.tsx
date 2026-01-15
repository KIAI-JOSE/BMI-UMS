
import React, { useState, useEffect } from 'react';
import { X, User, GraduationCap, Heart, Upload } from 'lucide-react';
import { Student } from '../types';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (studentData: Partial<Student>) => void;
  editData?: Student | null;
}

const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({ isOpen, onClose, onSuccess, editData }) => {
  const [tempPhoto, setTempPhoto] = useState<string | null>(null);
  const [tempZoom, setTempZoom] = useState(1);
  const [isAdjustingPhoto, setIsAdjustingPhoto] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male' as Student['gender'],
    email: '',
    faculty: 'General',
    department: 'Undeclared',
    enrollmentTerm: 'Fall 2024',
    status: 'Active' as Student['status'],
    phone: '+254...',
    careerPath: 'Freshman'
  });

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setFormData({
          firstName: editData.firstName,
          lastName: editData.lastName,
          gender: editData.gender,
          email: editData.email,
          faculty: editData.faculty,
          department: editData.department,
          enrollmentTerm: editData.enrollmentTerm,
          status: editData.status,
          phone: editData.phone,
          careerPath: editData.careerPath
        });
        setTempPhoto(editData.photo || null);
        setTempZoom(editData.photoZoom || 1);
      } else {
        setFormData({
          firstName: '',
          lastName: '',
          gender: 'Male',
          email: '',
          faculty: 'General',
          department: 'Undeclared',
          enrollmentTerm: 'Fall 2024',
          status: 'Active',
          phone: '+254...',
          careerPath: 'Freshman'
        });
        setTempPhoto(null);
        setTempZoom(1);
      }
    }
  }, [isOpen, editData]);

  if (!isOpen) return null;

  const handleCommit = () => {
    if (onSuccess) {
      onSuccess({
        ...formData,
        photo: tempPhoto || undefined,
        photoZoom: tempZoom
      });
    }
    onClose();
  };

  const FormSectionTitle = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
      <div className="p-2 bg-[#4B0082] text-white rounded-none">
        <Icon size={14} />
      </div>
      <h3 className="text-xs font-bold text-[#4B0082] dark:text-[#FFD700] uppercase tracking-widest">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1a0033]/90 backdrop-blur-3xl p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-[85vw] h-[95vh] rounded-none shadow-2xl flex flex-col overflow-hidden animate-slide-up border border-[#FFD700]/30">
        
        <div className="p-4 md:p-6 bg-white dark:bg-gray-800 text-[#4B0082] flex flex-col md:flex-row justify-between items-center relative overflow-hidden border-b-2 border-[#4B0082]">
           <div className="flex items-center gap-4">
              <img src="https://i.ibb.co/Gv2vPdJC/BMI-PNG.png" className="w-16 h-16 object-contain" alt="BMI Logo" />
              <div>
                  <h1 className="text-3xl font-bold tracking-tighter leading-none">BMI</h1>
                  <h2 className="text-sm font-bold tracking-widest uppercase">University</h2>
              </div>
           </div>
           <div className="text-center md:text-right mt-4 md:mt-0 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">{editData ? 'Update Institutional Record' : 'Application for Admission'}</h3>
              <div className="flex gap-4 text-xs font-semibold uppercase tracking-widest text-gray-500 justify-center md:justify-end">
                  <span>USA: 980-259-3680</span>
                  <span>East Africa: +254 704 500 872</span>
                  <span className="text-[#4B0082] font-bold">bmiuniversity.org</span>
              </div>
           </div>
           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-red-500 hover:text-white transition-all"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 no-scrollbar">
           
           <div className="space-y-6">
              <FormSectionTitle title="Personal Information" icon={User} />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <div className="md:col-span-1">
                     <label className="group relative w-full aspect-[3/4] bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-none flex flex-col items-center justify-center cursor-pointer hover:border-[#FFD700] transition-all overflow-hidden shadow-sm">
                        {tempPhoto ? (
                          <img src={tempPhoto} className="w-full h-full object-cover transition-transform duration-500" style={{ transform: `scale(${tempZoom})` }} alt="Student Preview" />
                        ) : (
                          <div className="text-center p-4">
                            <Upload className="mx-auto mb-2 text-[#4B0082]" size={32} />
                            <p className="text-xs font-bold uppercase tracking-widest text-[#4B0082]">Profile Photo</p>
                          </div>
                        )}
                        <input type="file" className="hidden" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => { setTempPhoto(reader.result as string); setIsAdjustingPhoto(true); };
                            reader.readAsDataURL(file);
                          }
                        }} accept="image/*" />
                     </label>
                     {isAdjustingPhoto && (
                       <div className="mt-2 p-2 bg-purple-50 rounded-none border border-purple-100">
                          <input type="range" min="1" max="3" step="0.05" value={tempZoom} onChange={(e) => setTempZoom(parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4B0082]" />
                       </div>
                     )}
                 </div>

                 <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                       <label className="text-xs font-bold uppercase text-gray-500">First Name</label>
                       <input 
                        type="text" 
                        className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none focus:ring-1 focus:ring-[#4B0082] font-semibold" 
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold uppercase text-gray-500">Last Name</label>
                       <input 
                        type="text" 
                        className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none focus:ring-1 focus:ring-[#4B0082] font-semibold" 
                        value={formData.lastName}
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold uppercase text-gray-500">Gender</label>
                       <select 
                         className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none focus:ring-1 focus:ring-[#4B0082] font-semibold"
                         value={formData.gender}
                         onChange={e => setFormData({...formData, gender: e.target.value as any})}
                       >
                         <option value="Male">Male</option>
                         <option value="Female">Female</option>
                       </select>
                    </div>
                    
                    <div className="space-y-1">
                       <label className="text-xs font-bold uppercase text-gray-500">Institutional Email</label>
                       <input 
                        type="email" 
                        className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none focus:ring-1 focus:ring-[#4B0082] font-semibold" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="student@bmi.edu"
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold uppercase text-gray-500">Phone</label>
                       <input 
                        type="text" 
                        className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none focus:ring-1 focus:ring-[#4B0082]" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold uppercase text-gray-500">SSN</label>
                       <input type="text" className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none font-mono" placeholder="000-00-0000" />
                    </div>

                    <div className="md:col-span-2 space-y-1">
                       <label className="text-xs font-bold uppercase text-gray-500">Address (Street/County)</label>
                       <input type="text" className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold uppercase text-gray-500">City</label>
                       <input type="text" className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none" />
                    </div>
                    
                    <div className="space-y-1">
                       <label className="text-xs font-bold uppercase text-gray-500">State/Zip</label>
                       <div className="flex gap-2">
                          <input type="text" className="w-1/3 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none" placeholder="ST" />
                          <input type="text" className="w-2/3 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none" placeholder="Zip" />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold uppercase text-gray-500">Birthdate</label>
                       <input type="date" className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <FormSectionTitle title="Application Information" icon={GraduationCap} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Planned Enrollment Term</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none font-bold"
                      value={formData.enrollmentTerm}
                      onChange={e => setFormData({...formData, enrollmentTerm: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Academic Interest (Faculty)</label>
                    <select 
                      value={formData.faculty}
                      onChange={e => setFormData({...formData, faculty: e.target.value})}
                      className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-none outline-none font-bold uppercase tracking-tighter"
                    >
                       <option value="General">General</option>
                       <option value="Theology">Faculty of Theology</option>
                       <option value="Education">Faculty of Education</option>
                       <option value="ICT">Dept. of ICT</option>
                       <option value="Business">School of Business</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Status</label>
                    <select 
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value as Student['status']})}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-none text-xs font-bold uppercase"
                    >
                      <option value="Active">Active</option>
                      <option value="Applicant">Applicant</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Graduated">Graduated</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Department</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none"
                      value={formData.department}
                      onChange={e => setFormData({...formData, department: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Career Path / Year</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-none outline-none"
                      value={formData.careerPath}
                      onChange={e => setFormData({...formData, careerPath: e.target.value})}
                    />
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <FormSectionTitle title="Family Information" icon={Heart} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3 p-4 bg-gray-50 rounded-none border border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-600">Father's Information</h4>
                    <input type="text" className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-none outline-none font-semibold" placeholder="Father's Legal Name" />
                 </div>
                 <div className="space-y-3 p-4 bg-gray-50 rounded-none border border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-600">Mother's Information</h4>
                    <input type="text" className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-none outline-none font-semibold" placeholder="Mother's Legal Name" />
                 </div>
              </div>
           </div>

        </div>

        <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-800/50 border-t-2 border-[#4B0082] flex justify-between items-center">
           <button onClick={onClose} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors">Terminate Protocol</button>
           <div className="flex gap-4">
              <button className="px-6 py-3 bg-white border border-[#4B0082] rounded-none text-xs font-bold uppercase tracking-widest text-[#4B0082] hover:bg-gray-50 transition-all shadow-sm">Save Draft</button>
              <button onClick={handleCommit} className="px-10 py-3 bg-[#4B0082] text-white rounded-none shadow-lg font-bold uppercase tracking-widest text-xs border border-[#FFD700]/30 hover:bg-black transition-all">
                {editData ? 'Update Record' : 'Commit Admission'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistrationModal;
