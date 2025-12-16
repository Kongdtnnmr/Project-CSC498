import { useState, useEffect } from 'react';
import { Wallet, GraduationCap, ChevronsRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { courseDetails } from '../data/courseDetails';

export default function Courses() {
    const location = useLocation();
    const { t, language } = useLanguage();
    const [activeTabKey, setActiveTabKey] = useState("pvc"); // Use keys: pvc, pws, bachelor
    const [expandedMajor, setExpandedMajor] = useState(null);

    // Get translated data
    const levels = t('courses.levels');
    const majorsData = t('courses.majors');

    const levelImages = {
        pvc: "public/pic/ปวช.webp",
        pws: "public/pic/ปวส.webp",
        bachelor: "public/pic/ปตรี.webp"
    };

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
                <div className="max-w-7xl mx-auto px-4 flex justify-center gap-4 sm:gap-8 text-sm font-medium pt-5">
                    {tabKeys.map((key) => (
                        <div
                            key={key}
                            onClick={() => {
                                setActiveTabKey(key);
                                setExpandedMajor(null);
                            }}
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
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Left Column: Image */}
                        <div className="w-full md:w-2/5">
                            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg aspect-[3/4]">
                                <img
                                    src={levelImages[activeTabKey]}
                                    alt="Student"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right Column: List */}
                        <div className="w-full md:w-3/5 bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden">
                            {/* Header */}
                            <div className="bg-[#1e3a8a] text-white py-4 px-6 text-xl font-bold">
                                {levels[activeTabKey]}
                            </div>

                            {/* List */}
                            <div className="divide-y divide-gray-100">
                                {majorsData[activeTabKey].map((course, index) => {
                                    const isExpanded = expandedMajor === index;

                                    // Get details from our data file using keys and index
                                    // This bypasses the name matching which is fragile with bilingual names
                                    const details = courseDetails[activeTabKey]?.[index]?.[language];

                                    return (
                                        <div key={index}>
                                            <div
                                                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${isExpanded ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                                onClick={() => setExpandedMajor(isExpanded ? null : index)}
                                            >
                                                <ChevronsRight className={`text-[#8B2635] flex-shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} size={20} />
                                                <span className="text-[#8B2635] font-bold text-lg">{course}</span>
                                            </div>

                                            {isExpanded && (
                                                <div className="bg-white p-6 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                                                    {details ? (
                                                        <div className="space-y-6">
                                                            <div>
                                                                <h4 className="text-xl font-bold text-[#00B4D8] mb-2">{details.title}</h4>
                                                                <p className="text-gray-600 leading-relaxed">
                                                                    {details.description}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <h4 className="text-xl font-bold text-[#00B4D8] mb-2">
                                                                    {language === 'TH' ? 'แนวทางการประกอบอาชีพ' : 'Future Careers'}
                                                                </h4>
                                                                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                                                                    {details.careers.map((career, i) => (
                                                                        <li key={i}>{career}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            <div>
                                                                <h4 className="text-xl font-bold text-[#00B4D8] mb-2">
                                                                    {language === 'TH' ? 'แนวทางการศึกษาต่อ' : 'Further Education'}
                                                                </h4>
                                                                <div className="space-y-4">
                                                                    {details.education.map((edu, i) => (
                                                                        <div key={i}>
                                                                            <h5 className="font-bold text-[#00B4D8]">{edu.level}</h5>
                                                                            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                                                                                {edu.items.map((item, j) => (
                                                                                    <li key={j}>{item}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-8 text-gray-400">
                                                            <p>{language === 'TH' ? 'รายละเอียดหลักสูตรอยู่ระหว่างการปรับปรุง' : 'Course details currently being updated'}</p>
                                                            <p className="text-sm mt-2">...</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}