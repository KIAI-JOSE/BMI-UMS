import React, { useState, useEffect } from 'react';
import { X, Upload, User, CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';
import { Student } from '../types';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (student: Partial<Student>) => void;
  initialData?: Student;
}

const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [activeSection, setActiveSection] = useState<string>('A');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<any>({
    // Student Core
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    nationality: '',
    faculty: 'Theology',
    department: 'Biblical Studies',
    gender: 'Male',
    academicLevel: 'Degree',
    status: 'Active',
    photo: '',
    photoZoom: 1,
    photoPosition: { x: 0, y: 0 },
    
    // Detailed Fields
    dob: '',
    countryOfBirth: '',
    nationalId: '',
    passportExpiry: '',
    
    address: '',
    city: '',
    country: '',
    zip: '',
    altContact: '',
    
    nokName: '',
    nokRelation: '',
    nokPhone: '',
    nokEmail: '',
    nokAddress: '',
    
    hsName: '',
    hsCountry: '',
    hsQual: '',
    hsYear: '',
    
    uniName: '',
    uniCountry: '',
    uniQual: '',
    uniYears: '',
    
    nativeEnglish: 'Yes',
    englishTest: '',
    englishScore: '',
    englishDate: '',
    
    sponsorSource: 'Self',
    sponsorName: '',
    sponsorContact: '',
    
    medicalCondition: 'No',
    medicalDetails: '',
    
    declaration: false
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData((prev: any) => ({ ...prev, ...initialData }));
        setImagePreview(initialData.photo || null);
      } else {
        // Reset defaults
        setFormData({
            firstName: '', lastName: '', middleName: '', email: '', phone: '', nationality: '',
            faculty: 'Theology', department: 'Biblical Studies', gender: 'Male', academicLevel: 'Degree', status: 'Active', photo: '',
            photoZoom: 1, photoPosition: { x: 0, y: 0 },
            dob: '', countryOfBirth: '', nationalId: '', passportExpiry: '',
            address: '', city: '', country: '', zip: '', altContact: '',
            nokName: '', nokRelation: '', nokPhone: '', nokEmail: '', nokAddress: '',
            hsName: '', hsCountry: '', hsQual: '', hsYear: '',
            uniName: '', uniCountry: '', uniQual: '', uniYears: '',
            nativeEnglish: 'Yes', englishTest: '', englishScore: '', englishDate: '',
            sponsorSource: 'Self', sponsorName: '', sponsorContact: '',
            medicalCondition: 'No', medicalDetails: '', declaration: false
        });
        setImagePreview(null);
      }
      setActiveSection('A');
    }
  }, [isOpen, initialData]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image too large. Max 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData((prev: any) => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData);
    onClose();
  };

  if (!isOpen) return null;

  const SectionHeader = ({ id, title }: { id: string, title: string }) => (
    <div 
      className={`flex items-center justify-between p-4 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 ${activeSection === id ? 'bg-[#4B0082]/5' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
      onClick={() => setActiveSection(activeSection === id ? '' : id)}
    >
      <div className="flex items-center gap-3">
        <span className={`w-6 h-6 flex items-center justify-center text-[10px] font-black rounded-full ${activeSection === id ? 'bg-[#4B0082] text-white' : 'bg-gray-200 text-gray-500'}`}>{id}</span>
        <h3 className={`text-xs font-black uppercase tracking-widest ${activeSection === id ? 'text-[#4B0082] dark:text-[#FFD700]' : 'text-gray-500'}`}>{title}</h3>
      </div>
      {activeSection === id ? <ChevronDown size={16} className="text-[#4B0082]" /> : <ChevronRight size={16} className="text-gray-400" />}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#1a0033]/95 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-none shadow-2xl flex flex-col h-[90vh] overflow-hidden animate-slide-up border-y-[6px] border-[#4B0082]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-950">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-[#4B0082] dark:text-white">{initialData ? 'Update Enrollment' : 'New Admission Form'}</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Official Institutional Entry Protocol</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-500 hover:text-white transition-colors text-gray-400"><X size={24} /></button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto no-scrollbar bg-white dark:bg-gray-900 flex flex-col md:flex-row">
           
           {/* Sidebar Navigation (Desktop) */}
           <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 flex-shrink-0 overflow-y-auto hidden md:block">
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((sec) => {
                 const titles: any = {
                    'A': 'Program Selection', 'B': 'Personal Details', 'C': 'Contact Info', 'D': 'Next of Kin',
                    'E': 'Academic History', 'F': 'Language', 'G': 'Sponsorship', 'H': 'Medical',
                    'I': 'Documents', 'J': 'Declaration'
                 };
                 return (
                    <button 
                       key={sec}
                       type="button"
                       onClick={() => setActiveSection(sec)}
                       className={`w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest border-l-4 transition-all ${
                          activeSection === sec 
                             ? 'bg-white dark:bg-gray-900 border-[#4B0082] text-[#4B0082] dark:text-[#FFD700]' 
                             : 'border-transparent text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
                       }`}
                    >
                       {sec}. {titles[sec]}
                    </button>
                 );
              })}
           </div>

           {/* Content Area */}
           <div className="flex-1 p-8 md:p-10 space-y-8">
              
              {/* Section A: Program Selection (Core Data) */}
              <div className={activeSection === 'A' ? 'block' : 'hidden md:hidden'}>
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">A. Program Selection</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-gray-500">Faculty</label>
                       <select value={formData.faculty} onChange={(e) => handleChange('faculty', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold uppercase">
                          {['Theology', 'ICT', 'Business', 'Education'].map(o => <option key={o} value={o}>{o}</option>)}
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-gray-500">Department</label>
                       <input type="text" value={formData.department} onChange={(e) => handleChange('department', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold uppercase" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-gray-500">Academic Level</label>
                       <select value={formData.academicLevel} onChange={(e) => handleChange('academicLevel', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold uppercase">
                          {['Diploma', 'Degree', 'Masters', 'PhD'].map(o => <option key={o} value={o}>{o}</option>)}
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold uppercase text-gray-500">Admission Status</label>
                       <select value={formData.status} onChange={(e) => handleChange('status', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold uppercase">
                          {['Active', 'Applicant', 'Pending'].map(o => <option key={o} value={o}>{o}</option>)}
                       </select>
                    </div>
                 </div>
              </div>

              {/* Section B: Applicant Personal Details */}
              <div className={activeSection === 'B' ? 'block' : 'hidden md:hidden'}>
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">B. Applicant Personal Details</h4>
                 
                 <div className="flex gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                           {imagePreview ? (
                               <img 
                                   src={imagePreview} 
                                   className="w-full h-full object-cover transition-transform" 
                                   style={{ transform: `scale(${formData.photoZoom}) translate(${formData.photoPosition?.x}px, ${formData.photoPosition?.y}px)` }}
                               />
                           ) : (
                               <User className="text-gray-400" />
                           )}
                           <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleImageUpload} />
                           <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[9px] font-bold uppercase pointer-events-none">Upload Photo</div>
                        </div>
                        {imagePreview && (
                            <div className="w-32 space-y-2">
                                <div className="flex items-center gap-1">
                                    <span className="text-[8px] font-bold uppercase text-gray-500">Zoom</span>
                                    <input 
                                        type="range" 
                                        min="1" max="3" step="0.1" 
                                        value={formData.photoZoom} 
                                        onChange={(e) => handleChange('photoZoom', parseFloat(e.target.value))}
                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[8px] font-bold uppercase text-gray-500">X</span>
                                        <input 
                                            type="number" 
                                            value={formData.photoPosition?.x} 
                                            onChange={(e) => handleChange('photoPosition', { ...formData.photoPosition, x: parseInt(e.target.value) })}
                                            className="w-full p-1 text-[8px] border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700"
                                        />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[8px] font-bold uppercase text-gray-500">Y</span>
                                        <input 
                                            type="number" 
                                            value={formData.photoPosition?.y} 
                                            onChange={(e) => handleChange('photoPosition', { ...formData.photoPosition, y: parseInt(e.target.value) })}
                                            className="w-full p-1 text-[8px] border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Surname</label><input required type="text" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">First Name</label><input required type="text" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Middle Name(s)</label><input type="text" value={formData.middleName} onChange={(e) => handleChange('middleName', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Gender</label>
                          <div className="flex gap-4 pt-2">
                             {['Male', 'Female'].map(g => (
                                <label key={g} className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={(e) => handleChange('gender', e.target.value)} className="accent-[#4B0082]" /><span className="text-xs font-bold uppercase text-gray-600 dark:text-gray-400">{g}</span></label>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Date of Birth</label><input type="date" value={formData.dob} onChange={(e) => handleChange('dob', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold uppercase" /></div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase text-gray-500">Nationality</label>
                        <select value={formData.nationality} onChange={(e) => handleChange('nationality', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold">
                            <option value="">Select Country</option>
                            {['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'South Sudan', 'Ethiopia', 'Somalia', 'Nigeria', 'Ghana', 'South Africa', 'USA', 'UK', 'Canada', 'Other'].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Country of Birth</label><input type="text" value={formData.countryOfBirth} onChange={(e) => handleChange('countryOfBirth', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">ID / Passport No.</label><input type="text" value={formData.nationalId} onChange={(e) => handleChange('nationalId', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Passport Expiry</label><input type="date" value={formData.passportExpiry} onChange={(e) => handleChange('passportExpiry', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold uppercase" /></div>
                 </div>
              </div>

              {/* Section C: Contact Information */}
              <div className={activeSection === 'C' ? 'block' : 'hidden md:hidden'}>
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">C. Contact Information</h4>
                 <div className="space-y-6">
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Permanent Address</label><input type="text" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">City / State</label><input type="text" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Country</label><input type="text" value={formData.country} onChange={(e) => handleChange('country', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Postal / Zip</label><input type="text" value={formData.zip} onChange={(e) => handleChange('zip', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Mobile Phone</label><input required type="text" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" placeholder="+254..." /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Email Address</label><input required type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Alternative Contact</label><input type="text" value={formData.altContact} onChange={(e) => handleChange('altContact', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                    </div>
                 </div>
              </div>

              {/* Section D: Next of Kin */}
              <div className={activeSection === 'D' ? 'block' : 'hidden md:hidden'}>
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">D. Next of Kin / Emergency</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Full Name</label><input type="text" value={formData.nokName} onChange={(e) => handleChange('nokName', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Relationship</label><input type="text" value={formData.nokRelation} onChange={(e) => handleChange('nokRelation', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Phone Number</label><input type="text" value={formData.nokPhone} onChange={(e) => handleChange('nokPhone', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Email Address</label><input type="email" value={formData.nokEmail} onChange={(e) => handleChange('nokEmail', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                    <div className="md:col-span-2 space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Address</label><input type="text" value={formData.nokAddress} onChange={(e) => handleChange('nokAddress', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                 </div>
              </div>

              {/* Section E: Academic Background */}
              <div className={activeSection === 'E' ? 'block' : 'hidden md:hidden'}>
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">E. Academic Background</h4>
                 
                 <div className="mb-8">
                    <h5 className="text-xs font-bold text-[#4B0082] dark:text-[#FFD700] uppercase mb-4 border-b border-gray-200 pb-2">Secondary / High School</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Institution Name</label><input type="text" value={formData.hsName} onChange={(e) => handleChange('hsName', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Country</label><input type="text" value={formData.hsCountry} onChange={(e) => handleChange('hsCountry', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Qualification</label><input type="text" value={formData.hsQual} onChange={(e) => handleChange('hsQual', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Year Completed</label><input type="text" value={formData.hsYear} onChange={(e) => handleChange('hsYear', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                    </div>
                 </div>

                 <div>
                    <h5 className="text-xs font-bold text-[#4B0082] dark:text-[#FFD700] uppercase mb-4 border-b border-gray-200 pb-2">Post-Secondary / University (If Applicable)</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Institution Name</label><input type="text" value={formData.uniName} onChange={(e) => handleChange('uniName', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Country</label><input type="text" value={formData.uniCountry} onChange={(e) => handleChange('uniCountry', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Qualification</label><input type="text" value={formData.uniQual} onChange={(e) => handleChange('uniQual', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Years Attended</label><input type="text" value={formData.uniYears} onChange={(e) => handleChange('uniYears', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                    </div>
                 </div>
              </div>

              {/* Section F: Language */}
              <div className={activeSection === 'F' ? 'block' : 'hidden md:hidden'}>
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">F. English Proficiency</h4>
                 <div className="space-y-6">
                    <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-gray-500">Native English Speaker?</label>
                       <div className="flex gap-4">
                          <label className="flex items-center gap-2"><input type="radio" name="nativeEnglish" value="Yes" checked={formData.nativeEnglish === 'Yes'} onChange={(e) => handleChange('nativeEnglish', 'Yes')} className="accent-[#4B0082]" /><span className="text-xs font-bold">Yes</span></label>
                          <label className="flex items-center gap-2"><input type="radio" name="nativeEnglish" value="No" checked={formData.nativeEnglish === 'No'} onChange={(e) => handleChange('nativeEnglish', 'No')} className="accent-[#4B0082]" /><span className="text-xs font-bold">No</span></label>
                       </div>
                    </div>
                    {formData.nativeEnglish === 'No' && (
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                          <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Test Taken</label><select value={formData.englishTest} onChange={(e) => handleChange('englishTest', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold"><option value="">Select...</option><option>IELTS</option><option>TOEFL</option><option>Other</option></select></div>
                          <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Score</label><input type="text" value={formData.englishScore} onChange={(e) => handleChange('englishScore', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                          <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Date Taken</label><input type="date" value={formData.englishDate} onChange={(e) => handleChange('englishDate', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       </div>
                    )}
                 </div>
              </div>

              {/* Section G: Sponsorship */}
              <div className={activeSection === 'G' ? 'block' : 'hidden md:hidden'}>
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">G. Sponsorship & Finance</h4>
                 <div className="space-y-6">
                    <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-gray-500">Source of Funding</label>
                       <div className="flex flex-wrap gap-4">
                          {['Self', 'Parent/Guardian', 'Government', 'Scholarship', 'Organization'].map(s => (
                             <label key={s} className="flex items-center gap-2"><input type="radio" name="sponsor" value={s} checked={formData.sponsorSource === s} onChange={(e) => handleChange('sponsorSource', s)} className="accent-[#4B0082]" /><span className="text-xs font-bold">{s}</span></label>
                          ))}
                       </div>
                    </div>
                    {formData.sponsorSource !== 'Self' && (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                          <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Sponsor Name</label><input type="text" value={formData.sponsorName} onChange={(e) => handleChange('sponsorName', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                          <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Sponsor Contact</label><input type="text" value={formData.sponsorContact} onChange={(e) => handleChange('sponsorContact', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold" /></div>
                       </div>
                    )}
                 </div>
              </div>

              {/* Section H: Medical */}
              <div className={activeSection === 'H' ? 'block' : 'hidden md:hidden'}>
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">H. Medical & Special Needs</h4>
                 <div className="space-y-6">
                    <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-gray-500">Any medical conditions or disabilities requiring support?</label>
                       <div className="flex gap-4">
                          <label className="flex items-center gap-2"><input type="radio" name="med" value="No" checked={formData.medicalCondition === 'No'} onChange={(e) => handleChange('medicalCondition', 'No')} className="accent-[#4B0082]" /><span className="text-xs font-bold">No</span></label>
                          <label className="flex items-center gap-2"><input type="radio" name="med" value="Yes" checked={formData.medicalCondition === 'Yes'} onChange={(e) => handleChange('medicalCondition', 'Yes')} className="accent-[#4B0082]" /><span className="text-xs font-bold">Yes (Please specify)</span></label>
                       </div>
                    </div>
                    {formData.medicalCondition === 'Yes' && (
                       <div className="space-y-1 animate-fade-in"><textarea rows={3} value={formData.medicalDetails} onChange={(e) => handleChange('medicalDetails', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium" placeholder="Describe requirements..." /></div>
                    )}
                 </div>
              </div>

              {/* Section I: Documents */}
              <div className={activeSection === 'I' ? 'block' : 'hidden md:hidden'}>
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">I. Document Upload Checklist</h4>
                 <div className="space-y-3">
                    {['Passport / National ID', 'Academic Certificates & Transcripts', 'English Proficiency Certificate', 'Passport-size Photograph', 'Recommendation Letter(s)'].map((doc, i) => (
                       <label key={i} className="flex items-center gap-3 p-3 border border-gray-100 hover:bg-gray-50 dark:border-gray-800 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 accent-[#4B0082]" />
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">{doc}</span>
                          <span className="ml-auto text-[10px] font-bold text-[#4B0082] uppercase">Upload</span>
                       </label>
                    ))}
                 </div>
              </div>

              {/* Section J: Declaration */}
              <div className={activeSection === 'J' ? 'block' : 'hidden md:hidden'}>
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6">J. Declaration & Consent</h4>
                 <div className="p-6 bg-gray-50 dark:bg-gray-800 border-l-4 border-[#4B0082] space-y-4">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                       I hereby declare that the information provided in this enrollment form is true, complete, and accurate to the best of my knowledge. I understand that providing false information may result in rejection or termination of enrollment.
                       I consent to the collection, processing, and storage of my personal data for academic, administrative, and legal purposes in accordance with international data protection regulations.
                    </p>
                    <label className="flex items-center gap-3 pt-4 cursor-pointer">
                       <input type="checkbox" checked={formData.declaration} onChange={(e) => handleChange('declaration', e.target.checked)} className="w-5 h-5 accent-[#4B0082]" />
                       <span className="text-xs font-black uppercase text-[#4B0082] dark:text-[#FFD700]">I Agree to the Terms & Conditions</span>
                    </label>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Applicant Signature (Type Name)</label><input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-serif italic" placeholder="Digital Signature" /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold uppercase text-gray-500">Date</label><input type="date" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold uppercase" defaultValue={new Date().toISOString().split('T')[0]} /></div>
                 </div>
              </div>

           </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t-2 border-gray-900 bg-white dark:bg-gray-900 flex justify-end gap-4">
           {activeSection !== 'A' && (
              <button 
                 type="button" 
                 onClick={() => {
                    const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
                    const idx = sections.indexOf(activeSection);
                    if (idx > 0) setActiveSection(sections[idx - 1]);
                 }} 
                 className="px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
              >
                 Back
              </button>
           )}
           
           {activeSection !== 'J' ? (
              <button 
                 type="button" 
                 onClick={() => {
                    const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
                    const idx = sections.indexOf(activeSection);
                    if (idx < sections.length - 1) setActiveSection(sections[idx + 1]);
                 }} 
                 className="px-10 py-3 bg-[#4B0082] text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center gap-2"
              >
                 Next Section <ChevronRight size={14} className="text-[#FFD700]" />
              </button>
           ) : (
              <button 
                 onClick={handleSubmit} 
                 disabled={!formData.declaration}
                 className="px-10 py-3 bg-[#FFD700] text-[#4B0082] text-[10px] font-black uppercase tracking-widest hover:bg-white border-2 border-[#FFD700] transition-all shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 <CheckCircle2 size={16} /> Submit Admission
              </button>
           )}
        </div>

      </div>
    </div>
  );
};

export default StudentRegistrationModal;