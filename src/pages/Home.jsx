import { ArrowRight } from 'lucide-react';

export default function Home() {
    const levels = [
        { title: 'หลักสูตร ระดับ ปวช.', color: 'bg-white' },
        { title: 'หลักสูตร ระดับ ปวส.', color: 'bg-white' },
        { title: 'หลักสูตร ระดับ ปริญญาตรี.', color: 'bg-white' },
    ];

    const news = [
        { id: 1, title: 'ข่าวประชาสัมพันธ์ 1', date: '25 พฤษภาคม 2568' },
        { id: 2, title: 'รับสมัครนักศึกษาใหม่', date: '21 มีนาคม 2568' },
        { id: 3, title: 'โครงการทุนการศึกษา', date: '15 กุมภาพันธ์ 2568' },
        { id: 4, title: 'กิจกรรม open house', date: '10 มกราคม 2568' },
    ]

    return (
        <div className="bg-[#f0f0f0] min-h-screen">
            {/* Hero Section */}
            <div className="bg-[#fdfbf6] py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">ภาพ/คลิป โปรโมทเพื่อความน่าเรียน</h1>
                <div className="w-full max-w-4xl mx-auto bg-gray-200 h-64 rounded-xl flex items-center justify-center text-gray-400">
                    Image/Video Placeholder
                </div>
            </div>

            {/* Course Levels Section */}
            <div className="bg-[#2e3b5e] py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center tracking-wide">
                        {levels.map((level, index) => (
                            <div key={index} className="flex flex-col items-center gap-4">
                                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                                    <span>logo</span>
                                </div>
                                <h3 className="text-white text-lg font-medium">{level.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Promotion Banner */}
            <div className="bg-[#f0f0f0] py-12 flex justify-center">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white">
                        {/* Simulated content based on image text */}
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="h-64 md:h-80 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">Student Image Placeholder</span>
                            </div>
                            <div className="p-8 flex flex-col justify-center bg-white">
                                <h2 className="text-3xl font-bold text-red-600 mb-2">"งานยุ่ง" ก็เรียนจบได้</h2>
                                <h3 className="text-xl text-blue-900 font-bold mb-4">เราพร้อมช่วยคุณวางแผนเรียนต่อ (ปวช. / ปวส. / ป.ตรี)</h3>
                                <ul className="text-blue-800 space-y-2 mb-6 text-sm md:text-base">
                                    <li>• เรียนออนไลน์ | เลือกเวลาเรียนได้ | ไม่กระทบงานประจำ</li>
                                    <li>• ผ่อนชำระรายเดือนได้</li>
                                    <li>• เทียบโอนหน่วยกิต ผู้มีประสบการณ์ทำงาน</li>
                                    <li>• กู้กองทุน กยศ.ได้</li>
                                </ul>
                                <button className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 w-max transition-colors">
                                    สมัครเรียน
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Header */}
            <div className="bg-[#3e4c70] text-white text-center py-4">
                <h2 className="text-xl font-medium">ข่าวประชาสัมพันธ์ เลื่อนมาตรงนี้</h2>
            </div>

            {/* News Grid */}
            <div className="bg-[#3e4c70] py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {news.map((item) => (
                            <div key={item.id} className="bg-white p-2 rounded shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                                <div className="bg-gray-200 h-40 w-full mb-3 rounded flex items-center justify-center bg-[url('https://placehold.co/400x300')] bg-cover bg-center">
                                    {/* Thumbnail */}
                                </div>
                                <p className="text-xs text-blue-600 font-semibold mb-1">ข่าว</p>
                                <h4 className="text-sm font-bold text-gray-800 line-clamp-2">{item.title}</h4>
                                <p className="text-xs text-gray-500 mt-2">{item.date}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <button className="bg-gray-800 text-white px-6 py-2 rounded text-sm hover:bg-black transition-colors">
                            อ่านข่าวทั้งหมด {'>'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

