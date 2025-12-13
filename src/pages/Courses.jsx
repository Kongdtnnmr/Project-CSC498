import { useState, useEffect } from 'react';
import { Wallet, GraduationCap } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Courses() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("ประกาศนียบัตรวิชาชีพ (ปวช.)");

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    const majors = {
        "ประกาศนียบัตรวิชาชีพ (ปวช.)": [
            "สาขาวิชาช่างยนต์",
            "สาขาวิชาช่างไฟฟ้า",
            "สาขาวิชาช่างอิเล็กทรอนิกส์",
            "สาขาวิชาเมคคาทรอนิกส์",
            "สาขาวิชาการบัญชี",
            "สาขาวิชาการตลาด",
            "สาขาวิชาคอมพิวเตอร์ธุรกิจ",
            "สาขาจิสติกส์"
        ],
        "ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)": [
            "สาขาวิชาเทคนิคเครื่องกล",
            "สาขางานไฟฟ้า",
            "สาขาวิชาเทคนิคอุตสาหกรรม",
            "สาขาวิชาการจัดการธุรกิจการกีฬา",
            "สาขางานเมคคาทรอนิกส์และหุ่นยนต์",
            "สาขาวิชาการบัญชี",
            "สาขาวิชาการตลาด",
            "สาขาวิชาการจัดการโลจิสติกส์",
            "สาขาวิชาเทคโนโลยีสารสนเทศ",
            "สาขาวิชามัลติมีเดีย",
            "สาขาวิชาการจัดการงานบริการสถานพยาบาล",
            "สาขาวิชาเทคนิคยานยนต์ไฟฟ้า"
        ],
        "ปริญญาตรี": [
            "สาขาวิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์ (วศ.บ.)",
            "สาขาวิศวกรรมโลจิสติกส์ (วศ.บ.)",
            "สาขาวิศวกรรมไฟฟ้า (วศ.บ.) กว.",
            "สาขาวิศวกรรมไฟฟ้า (วศ.บ.) กว. วิชาเอก ยานยนต์ไฟฟ้า (EV)",
            "สาขาวิศวกรรมไฟฟ้า (วศ.บ.) กว. วิชาเอก Data Center",
            "สาขาวิศวกรรมความปลอดภัย (วศ.บ.) จป.",
            "สาขาบัญชีบัณฑิต (บช.บ.)",
            "สาขาการจัดการโลจิสติกส์และซัพพลายเชน (บธ.บ.) เรียนออนไลน์",
            "สาขาวิศวกรรมอุตสาหการ (วศ.บ.) กว. เรียนออนไลน์",
            "สาขาบัญชีบัณฑิต (บช.บ.) เรียนออนไลน์",
            "สาขานวัตกรรมการตลาด (บธ.บ.) เรียนออนไลน์"
        ]
    };

    return (
        <div className="bg-[#fcfbf9] min-h-screen pb-20">



            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 pl-60 flex gap-8 text-sm font-medium pt-5">
                    {Object.keys(majors).map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 cursor-pointer transition-colors ${activeTab === tab
                                ? "text-blue-900 border-b-2 border-blue-900"
                                : "text-gray-500 hover:text-gray-800"
                                }`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Course Grid */}
                <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {majors[activeTab].map((course, index) => (
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
