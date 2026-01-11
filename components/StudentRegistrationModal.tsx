
import React, { useState } from 'react';
import { X, User, GraduationCap, Heart, Upload } from 'lucide-react';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (studentName: string) => void;
}

const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [tempPhoto, setTempPhoto] = useState<string | null>(null);
  const [tempZoom, setTempZoom] = useState(1);
  const [isAdjustingPhoto, setIsAdjustingPhoto] = useState(false);
  const [studentName, setStudentName] = useState({ first: '', last: '' });

  if (!isOpen) return null;

  const handleCommit = () => {
    if (onSuccess) {
      onSuccess(`${studentName.first} ${studentName.last}`);
    }
    onClose();
  };

  const FormSectionTitle = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
      <div className="p-2 bg-[#4B0082] text-white rounded-lg">
        <Icon size={14} />
      </div>
      <h3 className="text-xs font-black text-[#4B0082] dark:text-[#FFD700] uppercase tracking-widest italic">{title}</h3>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1a0033]/90 backdrop-blur-3xl p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-[85vw] h-[95vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-slide-up border border-[#FFD700]/30">
        
        {/* Paper Application Header */}
        <div className="p-4 md:p-6 bg-white dark:bg-gray-800 text-[#4B0082] flex flex-col md:flex-row justify-between items-center relative overflow-hidden border-b-[3px] border-[#4B0082]">
           <div className="flex items-center gap-4">
              <img src="https://i.ibb.co/Gv2vPdJC/BMI-PNG.png" className="w-16 h-16 object-contain" alt="BMI Logo" />
              <div>
                  <h1 className="text-3xl font-black tracking-tighter italic leading-none">BMI</h1>
                  <h2 className="text-sm font-bold tracking-[0.2em] uppercase">University</h2>
              </div>
           </div>
           <div className="text-center md:text-right mt-4 md:mt-0 flex flex-col justify-center">
              <h3 className="text-3xl font-black text-gray-300 uppercase tracking-tighter leading-none mb-1">Application for Admission</h3>
              <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest text-gray-500 justify-center md:justify-end">
                  <span>USA: 980-259-3680</span>
                  <span>East Africa: +254 704 500 872</span>
                  <span className="text-[#4B0082]">bmiuniversity.org</span>
              </div>
           </div>
           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-red-500 hover:text-white rounded-full transition-all"><X size={18} /></button>
        </div>

        {/* Application Form Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 no-scrollbar">
           
           {/* Personal Information */}
           <div className="space-y-6">
              <FormSectionTitle title="Personal Information" icon={User} />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <div className="md:col-span-1">
                     <label className="group relative w-full aspect-[3/4] bg-gray-50 dark:bg-gray-700 border-[3px] border-dashed border-gray-200 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#FFD700] transition-all overflow-hidden shadow-md">
                        {tempPhoto ? (
                          <img src={tempPhoto} className="w-full h-full object-cover transition-transform duration-500" style={{ transform: `scale(${tempZoom})` }} alt="Student Preview" />
                        ) : (
                          <div className="text-center p-4">
                            <Upload className="mx-auto mb-2 text-[#4B0082]" size={32} />
                            <p className="text-[9px] font-black uppercase tracking-widest text-[#4B0082]">Profile Photo</p>
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
                       <div className="mt-2 p-2 bg-purple-50 rounded-xl border border-purple-100">
                          <input type="range" min="1" max="3" step="0.05" value={tempZoom} onChange={(e) => setTempZoom(parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4B0082]" />
                       </div>
                     )}
                 </div>

                 <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase text-gray-400">Last Name</label>
                       <input 
                        type="text" 
                        className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/10 font-bold" 
                        value={studentName.last}
                        onChange={e => setStudentName({...studentName, last: e.target.value})}
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase text-gray-400">First Name</label>
                       <input 
                        type="text" 
                        className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/10 font-bold" 
                        value={studentName.first}
                        onChange={e => setStudentName({...studentName, first: e.target.value})}
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase text-gray-400">Middle/Maiden</label>
                       <input type="text" className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#4B0082]/10 font-bold" />
                    </div>
                    
                    <div className="md:col-span-2 space-y-1">
                       <label className="text-[9px] font-black uppercase text-gray-400">Address (Street/County)</label>
                       <input type="text" className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase text-gray-400">SSN</label>
                       <input type="text" className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl outline-none font-mono" placeholder="000-00-0000" />
                    </div>

                    <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase text-gray-400">City</label>
                       <input type="text" className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase text-gray-400">State/Zip</label>
                       <div className="flex gap-2">
                          <input type="text" className="w-1/2 px-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="ST" />
                          <input type="text" className="w-1/2 px-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl outline-none" placeholder="Zip" />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase text-gray-400">Birthdate</label>
                       <input type="date" className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl outline-none" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Application Information */}
           <div className="space-y-6">
              <FormSectionTitle title="Application Information" icon={GraduationCap} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-gray-400">Planned Enrollment</label>
                    <div className="flex gap-2">
                       <button className="flex-1 py-2 bg-[#4B0082] text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Fall</button>
                       <button className="flex-1 py-2 bg-white text-[#4B0082] rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100">Spring</button>
                       <input type="text" className="w-20 px-2 py-2 text-sm bg-gray-50 border border-gray-100 rounded-xl outline-none text-center font-bold" placeholder="2025" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-gray-400">Academic Interest</label>
                    <select className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-100 rounded-xl outline-none font-black uppercase italic tracking-tighter">
                       <option>Select Faculty Domain</option>
                       <option>Faculty of Theology</option>
                       <option>Faculty of Education</option>
                       <option>Dept. of ICT</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-gray-400">Residency & Status</label>
                    <div className="flex gap-2">
                       <select className="flex-1 px-2 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[11px] font-bold">
                          <option>Resident</option>
                          <option>Commuter</option>
                       </select>
                       <select className="flex-1 px-2 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[11px] font-bold">
                          <option>Full-time</option>
                          <option>Part-time</option>
                       </select>
                    </div>
                 </div>
              </div>
           </div>

           {/* Family Information */}
           <div className="space-y-6">
              <FormSectionTitle title="Family Information" icon={Heart} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3 p-4 bg-blue-50/20 rounded-xl border border-blue-50">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-blue-600 italic">Father's Information</h4>
                    <input type="text" className="w-full px-4 py-2 text-sm bg-white border border-blue-100 rounded-xl outline-none font-bold" placeholder="Father's Legal Name" />
                 </div>
                 <div className="space-y-3 p-4 bg-pink-50/20 rounded-xl border border-pink-50">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-pink-600 italic">Mother's Information</h4>
                    <input type="text" className="w-full px-4 py-2 text-sm bg-white border border-pink-100 rounded-xl outline-none font-bold" placeholder="Mother's Legal Name" />
                 </div>
              </div>
           </div>

        </div>

        {/* Portal Terminal Footer */}
        <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-800/50 border-t-[3px] border-[#4B0082] flex justify-between items-center">
           <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors italic">Terminate Application</button>
           <div className="flex gap-4">
              <button className="px-6 py-3 bg-white border-2 border-[#4B0082] rounded-xl text-xs font-black uppercase tracking-widest text-[#4B0082] hover:bg-purple-50 transition-all shadow-sm italic">Save Incomplete Node</button>
              <button onClick={handleCommit} className="px-10 py-3 bg-gradient-to-r from-[#4B0082] via-[#320064] to-[#1a0033] text-white rounded-xl shadow-lg font-black uppercase tracking-widest text-xs border border-[#FFD700]/30 hover:scale-105 transition-all italic">Commit Admission</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistrationModal;
