import { useState, useEffect } from 'react';
import { Wallet, GraduationCap } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Courses() {
    const location = useLocation();
    const { t } = useLanguage();
    const [activeTabKey, setActiveTabKey] = useState("pvc"); // Use keys: pvc, pws, bachelor

    // Get translated data
    const levels = t('courses.levels');
    const majorsData = t('courses.majors');

    const tabKeys = ['pvc', 'pws', 'bachelor'];

    useEffect(() => {
        if (location.state?.activeTab) {
            // Map the previous text-based state to keys if possible, or just default to pvc
            // Since we changed the state to rely on keys, we should probably update Home.jsx too,
            // but for backward compatibility or direct navigation:
            const target = location.state.activeTab;
            if (target.includes('ปวช') || target.includes('Vocational')) setActiveTabKey('pvc');
            else if (target.includes('ปวส') || target.includes('High')) setActiveTabKey('pws');
            else if (target.includes('ปริญญา') || target.includes('Bachelor')) setActiveTabKey('bachelor');
        }
    }, [location.state]);

    return (
        <div className="bg-[#fcfbf9] min-h-screen pb-20">



            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 pl-60 flex gap-8 text-sm font-medium pt-5">
                    {tabKeys.map((key) => (
                        <div
                            key={key}
                            onClick={() => setActiveTabKey(key)}
                            className={`pb-2 cursor-pointer transition-colors ${activeTabKey === key
                                ? "text-blue-900 border-b-2 border-blue-900"
                                : "text-gray-500 hover:text-gray-800"
                                }`}
                        >
                            {levels[key]}
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Course Grid */}
                <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {majorsData[activeTabKey].map((course, index) => (
                            <div key={index} className="bg-gray-500 rounded-lg overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow">
                                <img src="https://placehold.co/400x250" alt={course} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end h-full">
                                    <h3 className="text-white font-bold text-center w-full drop-shadow-md">{course}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}