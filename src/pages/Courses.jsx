import { Wallet, GraduationCap } from 'lucide-react';

export default function Courses() {
    const courses = [
        { title: 'วิทยาลัยแพทยศาสตร์', image: 'https://placehold.co/400x250' },
        { title: 'วิทยาลัยทันตแพทยศาสตร์', image: 'https://placehold.co/400x250' },
        { title: 'วิทยาลัยเภสัชศาสตร์', image: 'https://placehold.co/400x250' },
        { title: 'พยาบาลศาสตร์', image: 'https://placehold.co/400x250' },
        { title: 'วิทยาศาสตร์', image: 'https://placehold.co/400x250' },
        { title: 'กายภาพบำบัดและเวชศาสตร์การกีฬา', image: 'https://placehold.co/400x250' },
        { title: 'เทคนิคการแพทย์', image: 'https://placehold.co/400x250' },
        { title: 'วิทยาลัยการแพทย์แผนตะวันออก', image: 'https://placehold.co/400x250' },
        { title: 'ทัศนมาตรศาสตร์', image: 'https://placehold.co/400x250' },
        { title: 'รังสีเทคนิค', image: 'https://placehold.co/400x250' },
        { title: 'วิทยาลัยวิศวกรรมชีวการแพทย์', image: 'https://placehold.co/400x250' },
    ];

    return (
        <div className="bg-[#fcfbf9] min-h-screen pb-20">



            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 flex gap-8 text-sm font-medium pt-4">
                    <div className="text-pink-500 border-b-2 border-pink-500 pb-2 cursor-pointer">ประกาศนียบัตรวิชาชีพ (ปวช.)</div>
                    <div className="text-gray-500 hover:text-gray-800 pb-2 cursor-pointer">ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)</div>
                    <div className="text-gray-500 hover:text-gray-800 pb-2 cursor-pointer">ปริญญาตรี</div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Sidebar */}
                <div className="md:col-span-3 space-y-2">
                    <div className="bg-white p-4 rounded shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-3 text-gray-500 hover:text-blue-600 cursor-pointer">
                            <Wallet className="w-5 h-5" />
                            <span>ค่าธรรมเนียมการศึกษา</span>
                        </div>
                        <div className="h-px bg-gray-100"></div>
                        <div className="flex items-center gap-3 text-gray-500 hover:text-blue-600 cursor-pointer">
                            <GraduationCap className="w-5 h-5" />
                            <span>ทุนการศึกษา</span>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="md:col-span-9">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, index) => (
                            <div key={index} className="bg-gray-500 rounded-lg overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow">
                                <img src={course.image} alt={course.title} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end h-full">
                                    <h3 className="text-white font-bold text-center w-full drop-shadow-md">{course.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Text */}
            <div className="text-center mt-12 mb-8">
                <h2 className="text-4xl font-serif text-black">ขึ้นหลักสูตรตามที่เลือก</h2>
            </div>

        </div>
    );
}
