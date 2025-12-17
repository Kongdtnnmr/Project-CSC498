import { useState, useEffect } from 'react';
import { Wallet, GraduationCap, ChevronsRight, X } from 'lucide-react';
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
    const departmentHeaders = t('courses.headers');

    const [expandedDepartment, setExpandedDepartment] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const levelImages = {
        pvc: "/pic/ปวช.webp",
        pws: "/pic/ปวส.webp",
        bachelor: "/pic/ปตรี.webp"
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
                                {Object.values(courseDetails[activeTabKey] || {}).map((course, index) => {
                                    const isExpanded = expandedMajor === index;
                                    const details = course[language];

                                    return (
                                        <div key={index}>
                                            <div
                                                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${isExpanded ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                                onClick={() => setExpandedMajor(isExpanded ? null : index)}
                                            >
                                                <ChevronsRight className={`text-[#8B2635] flex-shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} size={20} />
                                                <span className="text-[#8B2635] text-lg">{details?.name || details?.title}</span>
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

                                                            {details.studyPlan && (
                                                                <div>
                                                                    <h4 className="text-xl font-bold text-[#00B4D8] mb-2">
                                                                        {language === 'TH' ? 'แผนการเรียน' : 'Study Plan'}
                                                                    </h4>
                                                                    <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                                                                        {details.studyPlan.map((item, i) => (
                                                                            <li key={i}>{item}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

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

                {/* Study Departments Section */}
                <div className="mt-12 w-full">
                    {activeTabKey === 'bachelor' ? (
                        <div className="w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {
                                    [
                                        { id: 1, image: "/pic/pic ปตรี/1.webp" },
                                        { id: 2, image: "/pic/pic ปตรี/2.webp" },
                                        { id: 3, image: "/pic/pic ปตรี/3.webp" },
                                        { id: 4, image: "/pic/pic ปตรี/4.webp" },
                                        { id: 5, image: "/pic/pic ปตรี/5.webp" },
                                        { id: 6, image: "/pic/pic ปตรี/6.webp" },
                                        { id: 7, image: "/pic/pic ปตรี/7.webp" },
                                        { id: 8, image: "/pic/pic ปตรี/8.webp" },
                                        { id: 9, image: "/pic/pic ปตรี/9.webp" },
                                        { id: 10, image: "/pic/pic ปตรี/10.webp" },
                                        { id: 11, image: "/pic/pic ปตรี/11.webp" },
                                    ].map((course) => (
                                        <div
                                            key={course.id}
                                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden aspect-square hover:shadow-md transition-shadow cursor-pointer"
                                            onClick={() => setSelectedImage({ src: course.image, type: 'bachelor' })}
                                        >
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                <img
                                                    src={course.image}
                                                    alt={`Bachelor Course ${course.id}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden">
                            {/* Red Header matching the requirement */}
                            <div className="bg-[#8B2635] text-white py-4 px-6 text-xl font-bold">
                                {departmentHeaders && departmentHeaders[activeTabKey]}
                            </div>
                            <div className="divide-y divide-gray-100 p-6 space-y-4">
                                {Object.values(courseDetails[activeTabKey] || {}).map((course, idx) => {
                                    const deptName = course[language]?.departmentName || course[language]?.title;
                                    const deptImage = course.scheduleImage;
                                    const isDeptExpanded = expandedDepartment === idx;

                                    return (
                                        <div key={idx} className="flex flex-col">
                                            <div
                                                className={`flex items-start gap-3 text-gray-700 cursor-pointer hover:text-blue-900 transition-colors ${isDeptExpanded ? 'font-semibold text-blue-900' : ''}`}
                                                onClick={() => setExpandedDepartment(isDeptExpanded ? null : idx)}
                                            >
                                                <ChevronsRight className={`text-[#8B2635] flex-shrink-0 mt-1 transition-transform ${isDeptExpanded ? 'rotate-90' : ''}`} size={20} />
                                                <span className="font-medium text-lg leading-relaxed">{deptName}</span>
                                            </div>

                                            {/* Expandable Image Section */}
                                            {isDeptExpanded && (
                                                <div className="mt-4 ml-8 animate-in slide-in-from-top-2 duration-300">
                                                    {deptImage ? (
                                                        <div
                                                            className="rounded-lg overflow-hidden border border-gray-200 shadow-md cursor-pointer hover:opacity-95 transition-opacity"
                                                            onClick={() => setSelectedImage({ src: deptImage, type: 'schedule' })}
                                                        >
                                                            <img
                                                                src={deptImage}
                                                                alt={`${deptName} Schedule`}
                                                                className="w-full h-auto object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center text-gray-400">
                                                            <p>{t('courses.noScheduleData')}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                {/* Image Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-95 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="fixed top-4 right-4 z-[60] text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                            >
                                <X size={32} />
                            </button>
                            <img
                                src={selectedImage.src}
                                alt="Full Size"
                                className={`w-full h-auto object-contain rounded-md shadow-2xl animate-in zoom-in-95 duration-200 ${selectedImage.type === 'schedule' ? 'max-w-8xl' : 'max-w-4xl'
                                    }`}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}