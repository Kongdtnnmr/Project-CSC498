import { useState } from 'react';

export default function Apply() {
    const [formData, setFormData] = useState({});
    const [selectedCurriculum, setSelectedCurriculum] = useState("");
    const [selectedMajor, setSelectedMajor] = useState("");

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
        <div className="bg-[#fcfbf9] min-h-screen py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Form Container */}
                <div className="bg-white p-8 rounded shadow-sm border border-gray-100 space-y-8">

                    {/* Faculty/Major Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-red-600 mb-1">หลักสูตร *</label>
                            <select
                                value={selectedCurriculum}
                                onChange={(e) => {
                                    setSelectedCurriculum(e.target.value);
                                    setSelectedMajor(""); // Reset major when curriculum changes
                                }}
                                className="w-full border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="" disabled hidden>เลือก หลักสูตร</option>
                                <option value="ประกาศนียบัตรวิชาชีพ (ปวช.)">ประกาศนียบัตรวิชาชีพ (ปวช.)</option>
                                <option value="ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)">ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)</option>
                                <option value="ปริญญาตรี">ปริญญาตรี</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-red-600 mb-1">สาขา *</label>
                            <select
                                value={selectedMajor}
                                onChange={(e) => setSelectedMajor(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:border-blue-500"
                            >
                                <option value="" disabled hidden>เลือก สาขา</option>
                                {selectedCurriculum && majors[selectedCurriculum] && majors[selectedCurriculum].map((major, index) => (
                                    <option key={index} value={major}>{major}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Personal Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-6">ข้อมูลส่วนตัว/Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Row 1 */}
                            <div>
                                <label className="block text-sm font-semibold text-red-600 mb-1">คำนำหน้า/Prefix *</label>
                                <select defaultValue="" className="w-full border border-gray-300 rounded p-2 text-gray-700 focus:outline-none focus:border-blue-500">
                                    <option value="" disabled hidden>เลือก คำนำหน้า</option>
                                    <option>นาย</option>
                                    <option>นางสาว</option>
                                    <option>นาง</option>
                                </select>
                            </div>
                            <div className="hidden md:block"></div> { /* spacer */}

                            {/* Row 2 */}
                            <div>
                                <label className="block text-sm font-semibold text-red-600 mb-1">ชื่อ/FirstName(TH) *</label>
                                <input type="text" placeholder="ชื่อ/FirstName" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-red-600 mb-1">นามสกุล/LastName(TH) *</label>
                                <input type="text" placeholder="นามสกุล/LastName" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                            </div>

                            {/* Row 3 */}
                            <div>
                                <label className="block text-sm font-semibold text-red-600 mb-1">ชื่อ(อังกฤษ)/FirstName(EN) *</label>
                                <input type="text" placeholder="ชื่อ(อังกฤษ)/FirstName" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-red-600 mb-1">นามสกุล(อังกฤษ)/LastName(EN) *</label>
                                <input type="text" placeholder="นามสกุล(อังกฤษ)/LastName" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                            </div>

                            {/* Row 4 */}
                            <div>
                                <label className="block text-sm font-semibold text-red-600 mb-1">วันเกิด(พ.ศ) /Date of Birth (B.E.) *</label>
                                <input type="text" placeholder="11/12/2550" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-red-600 mb-1">เลขบัตรประชาชน/Passport No. *</label>
                                <input type="text" placeholder="เลขบัตรประชาชน หรือ passport no." className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                            </div>

                            {/* Row 5 */}
                            <div>
                                <label className="block text-sm font-semibold text-red-600 mb-1">หมายเลขมือถือ/Mobile Number *</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                        📞
                                    </span>
                                    <input type="text" placeholder="หมายเลขมือถือ/Mobile Number" className="w-full border border-gray-300 rounded-r p-2 focus:outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-red-600 mb-1">อีเมล/e-mail *</label>
                                <input type="email" placeholder="อีเมล/e-mail" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                            </div>
                        </div>
                    </div>

                    {/* Education Information */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-semibold text-red-600 mb-1">โรงเรียน/School *</label>
                                <div className="flex gap-2">
                                    <input type="text" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500" />
                                    <div className="flex items-center whitespace-nowrap">
                                        <input type="checkbox" className="mr-2" />
                                        <span className="text-sm text-gray-600">อื่น ๆ / Other</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terms and Submit */}
                    <div className="text-center pt-8 border-t border-gray-100">


                        <button className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 mx-auto transition-colors">
                            ✓ บันทึกข้อมูลการสมัคร
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
