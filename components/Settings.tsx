import React, { useState, useEffect } from 'react';
import { Save, Bell, Shield, Globe, Moon, Sun, Smartphone, Mail, Upload, ImageIcon, Check } from 'lucide-react';

interface SettingsProps {
  currentLogo: string;
  onUpdateLogo: (logo: string) => void;
  currentTheme: string;
  onUpdateTheme: (theme: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ currentLogo, onUpdateLogo, currentTheme, onUpdateTheme }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Settings saved successfully');
  const [logoPreview, setLogoPreview] = useState<string | null>(currentLogo);

  // Password Management State
  const [passwordData, setPasswordData] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });

  // Sync logo preview if prop changes
  useEffect(() => {
    setLogoPreview(currentLogo);
  }, [currentLogo]);

  // General Settings State
  const [general, setGeneral] = useState(() => {
    const saved = localStorage.getItem('bmi_settings_general');
    return saved ? JSON.parse(saved) : {
      uniName: 'BMI University',
      email: 'admin@bmi.edu',
      phone: '+1 (555) 123-4567',
      address: '123 University Ave, Education City',
      theme: 'light'
    };
  });

  // Sync local theme state with prop to ensure form consistency
  useEffect(() => {
    setGeneral((prev: any) => ({ ...prev, theme: currentTheme }));
  }, [currentTheme]);

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('bmi_settings_notifications');
    return saved ? JSON.parse(saved) : {
      emailAlerts: true,
      smsAlerts: false,
      newsletters: true,
      weeklyReports: true
    };
  });

  // Security State
  const [security, setSecurity] = useState(() => {
    const saved = localStorage.getItem('bmi_settings_security');
    return saved ? JSON.parse(saved) : {
      twoFactor: true,
      sessionTimeout: '30m'
    };
  });

  const handleSave = () => {
    setIsLoading(true);
    
    // Save all settings to localStorage
    localStorage.setItem('bmi_settings_general', JSON.stringify(general));
    localStorage.setItem('bmi_settings_notifications', JSON.stringify(notifications));
    localStorage.setItem('bmi_settings_security', JSON.stringify(security));

    setTimeout(() => {
      setIsLoading(false);
      setToastMessage('Settings saved successfully');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  const handlePasswordUpdate = () => {
    if (!passwordData.current || !passwordData.newPass || !passwordData.confirm) {
        // In a real app, use a better UI for validation errors
        alert("Please fill in all password fields");
        return;
    }
    if (passwordData.newPass !== passwordData.confirm) {
        alert("New passwords do not match");
        return;
    }
    if (passwordData.newPass.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }

    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
        setIsLoading(false);
        setPasswordData({ current: '', newPass: '', confirm: '' }); // Reset form
        setToastMessage('Password updated successfully');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic size check (2MB)
      if (file.size > 2 * 1024 * 1024) {
          alert("File is too large. Please upload an image under 2MB.");
          return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas to resize
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimensions
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
             ctx.drawImage(img, 0, 0, width, height);
             // Compress to JPEG with 0.7 quality to ensure small base64 string
             const dataUrl = canvas.toDataURL('image/png', 0.8);
             setLogoPreview(dataUrl);
             onUpdateLogo(dataUrl);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const TabButton = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
        activeTab === id
          ? 'border-[#4B0082] text-[#4B0082] dark:text-[#FFD700] dark:border-[#FFD700]'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="p-8 animate-fade-in pb-20 max-w-5xl mx-auto relative">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white tracking-tight">Settings</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage institutional preferences and system configurations</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-gray-700 overflow-x-auto">
          <TabButton id="general" label="General" icon={Globe} />
          <TabButton id="notifications" label="Notifications" icon={Bell} />
          <TabButton id="security" label="Security" icon={Shield} />
        </div>

        {/* Content */}
        <div className="p-8 min-h-[500px]">
          
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-8 max-w-2xl">
              
              {/* Logo Upload Section */}
              <div className="bg-purple-50/50 dark:bg-gray-700/50 p-6 rounded-xl border border-purple-100 dark:border-gray-600">
                <h3 className="text-sm font-bold text-[#4B0082] dark:text-purple-300 mb-4 flex items-center gap-2">
                    <ImageIcon size={16} /> Institutional Branding
                </h3>
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-xl border-2 border-dashed border-purple-200 dark:border-gray-500 flex items-center justify-center bg-white dark:bg-gray-600 overflow-hidden relative group shadow-sm">
                        {logoPreview ? (
                            <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain p-1" />
                        ) : (
                            <div className="text-center">
                                <span className="text-xs text-gray-400">No Logo</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-[#4B0082] dark:hover:text-purple-300 hover:border-[#4B0082] transition-all shadow-sm font-medium text-sm group">
                            <Upload size={16} className="group-hover:scale-110 transition-transform"/>
                            Upload New Logo
                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        </label>
                        <p className="text-xs text-gray-400 dark:text-gray-400 mt-2">
                            Supported formats: PNG, JPG, SVG.<br/>
                            Auto-resized to max 200px.
                        </p>
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Institution Name</label>
                  <input 
                    type="text" 
                    value={general.uniName}
                    onChange={(e) => setGeneral({...general, uniName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4B0082]/20 focus:border-[#4B0082] outline-none transition-all dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Admin Email</label>
                  <input 
                    type="email" 
                    value={general.email}
                    onChange={(e) => setGeneral({...general, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4B0082]/20 focus:border-[#4B0082] outline-none transition-all dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Contact Phone</label>
                  <input 
                    type="text" 
                    value={general.phone}
                    onChange={(e) => setGeneral({...general, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4B0082]/20 focus:border-[#4B0082] outline-none transition-all dark:bg-gray-700 dark:text-white"
                  />
                </div>
                 <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Timezone</label>
                   <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4B0082]/20 focus:border-[#4B0082] outline-none transition-all bg-white dark:bg-gray-700 dark:text-white">
                     <option>UTC-05:00 Eastern Time</option>
                     <option>UTC-08:00 Pacific Time</option>
                     <option>UTC+00:00 London</option>
                   </select>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Campus Address</label>
                  <textarea 
                    value={general.address}
                    onChange={(e) => setGeneral({...general, address: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4B0082]/20 focus:border-[#4B0082] outline-none transition-all resize-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                 <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">Interface Theme</h3>
                 <div className="flex gap-4">
                    <button 
                      onClick={() => onUpdateTheme('light')}
                      className={`flex items-center gap-3 px-4 py-3 border rounded-xl transition-all ${currentTheme === 'light' ? 'border-[#4B0082] bg-purple-50 text-[#4B0082] dark:bg-gray-700 dark:text-white' : 'border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-400'}`}
                    >
                        <Sun size={20} />
                        <span className="font-medium">Light Mode</span>
                    </button>
                    <button 
                      onClick={() => onUpdateTheme('dark')}
                      className={`flex items-center gap-3 px-4 py-3 border rounded-xl transition-all ${currentTheme === 'dark' ? 'border-[#4B0082] bg-purple-900 text-white shadow-md' : 'border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-400'}`}
                    >
                        <Moon size={20} />
                        <span className="font-medium">Dark Mode</span>
                    </button>
                 </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
             <div className="space-y-6 max-w-2xl">
                <h3 className="text-lg font-bold text-[#4B0082] dark:text-purple-300">Alert Preferences</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-600 space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 text-blue-600"><Mail size={20}/></div>
                         <div>
                            <p className="font-semibold text-gray-800 dark:text-white">Email Notifications</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Receive daily summaries and critical alerts</p>
                         </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={notifications.emailAlerts} onChange={() => setNotifications({...notifications, emailAlerts: !notifications.emailAlerts})} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4B0082]"></div>
                      </label>
                   </div>
                   
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 text-green-600"><Smartphone size={20}/></div>
                         <div>
                            <p className="font-semibold text-gray-800 dark:text-white">SMS Alerts</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Urgent campus announcements sent to mobile</p>
                         </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={notifications.smsAlerts} onChange={() => setNotifications({...notifications, smsAlerts: !notifications.smsAlerts})} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4B0082]"></div>
                      </label>
                   </div>
                </div>
             </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-8 max-w-2xl">
               <div>
                  <h3 className="text-lg font-bold text-[#4B0082] dark:text-purple-300 mb-4">Password Management</h3>
                  <div className="space-y-4">
                     <input 
                        type="password" 
                        placeholder="Current Password" 
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-[#4B0082]/20 outline-none transition-all"
                     />
                     <div className="grid grid-cols-2 gap-4">
                        <input 
                            type="password" 
                            placeholder="New Password" 
                            value={passwordData.newPass}
                            onChange={(e) => setPasswordData({...passwordData, newPass: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-[#4B0082]/20 outline-none transition-all"
                        />
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={passwordData.confirm}
                            onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-[#4B0082]/20 outline-none transition-all"
                        />
                     </div>
                     <button 
                        onClick={handlePasswordUpdate}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-semibold text-[#4B0082] dark:text-purple-300 hover:text-[#FFD700] hover:bg-[#4B0082] border border-[#4B0082] dark:border-purple-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {isLoading ? 'Updating...' : 'Update Password'}
                     </button>
                  </div>
               </div>

               <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-[#4B0082] dark:text-purple-300 mb-4">Access Control</h3>
                  <div className="flex items-center justify-between p-4 border border-purple-100 dark:border-gray-600 bg-purple-50 dark:bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">Two-Factor Authentication (2FA)</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Secure your account with an extra layer of protection</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={security.twoFactor} onChange={() => setSecurity({...security, twoFactor: !security.twoFactor})} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4B0082]"></div>
                      </label>
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
           <button 
             onClick={handleSave}
             disabled={isLoading}
             className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4B0082] to-[#6A0DAD] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:transform-none"
           >
             {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save size={18} />}
             Save Changes
           </button>
        </div>
      </div>
      
      {/* Success Toast Notification */}
      {showToast && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
             <div className="bg-[#4B0082] text-white dark:bg-white dark:text-[#4B0082] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 dark:border-[#4B0082]/20">
               <div className="bg-white/20 dark:bg-[#4B0082]/10 p-1 rounded-full">
                  <Check size={16} className="text-white dark:text-[#4B0082]" />
               </div>
               <span className="font-bold text-sm">{toastMessage}</span>
             </div>
          </div>
      )}
    </div>
  );
};

export default Settings;