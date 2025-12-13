import { useState } from 'react';

const InputField = ({ label, placeholder, type = "text", required = false, icon, value, onChange, maxLength }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    {icon}
                </div>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                placeholder={placeholder}
                className={`w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg py-2.5 ${icon ? 'pl-10' : 'px-4'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none placeholder:text-slate-400`}
            />
        </div>
    </div>
);

const SelectField = ({ label, value, onChange, options, placeholder, required = false, disabled = false }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg py-2.5 px-4 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none appearance-none disabled:bg-slate-100 disabled:text-slate-400 ${value === "" ? "text-slate-400" : ""}`}
            >
                <option value="" disabled hidden>{placeholder}</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt} className="text-slate-900">{opt}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
    </div>
);

const SectionHeader = ({ title, subtitle }) => (
    <div className="mb-6 border-b border-slate-100 pb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            {title}
        </h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1 ml-3">{subtitle}</p>}
    </div>
);

export default function Apply() {
    const [selectedCurriculum, setSelectedCurriculum] = useState("");
    const [selectedMajor, setSelectedMajor] = useState("");

    // Form States
    const [dob, setDob] = useState("");
    const [idCard, setIdCard] = useState("");
    const [mobile, setMobile] = useState("");
    const [prefix, setPrefix] = useState(""); // Add prefix state

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

    // Validation Handlers
    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Keep only numbers
        if (value.length <= 10) {
            setMobile(value);
        }
    };

    const handleIdCardChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 13) {
            setIdCard(value);
        }
    };

    const handleDobChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
        if (value.length > 8) value = value.slice(0, 8); // Max 8 digits

        // Add slashes
        if (value.length >= 5) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
        } else if (value.length >= 3) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }
        setDob(value);
    };


    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-10 -translate-y-10">
                            <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight relative z-10">
                            แบบฟอร์มสมัครเรียนออนไลน์
                        </h1>
                        <p className="mt-2 text-blue-100 relative z-10 font-light text-lg">
                            ยินดีต้อนรับสู่ครอบครัวของเรา กรุณากรอกข้อมูลให้ครบถ้วน
                        </p>
                    </div>

                    <div className="p-8 space-y-10">

                        {/* 1. ข้อมูลหลักสูตร */}
                        <section>
                            <SectionHeader title="ข้อมูลการสมัคร" subtitle="เลือกหลักสูตรที่ต้องการเข้าศึกษา" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <SelectField
                                    label="ระดับการศึกษา"
                                    placeholder="เลือก ระดับการศึกษา"
                                    required
                                    value={selectedCurriculum}
                                    onChange={(e) => {
                                        setSelectedCurriculum(e.target.value);
                                        setSelectedMajor("");
                                    }}
                                    options={[
                                        "ประกาศนียบัตรวิชาชีพ (ปวช.)",
                                        "ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)",
                                        "ปริญญาตรี"
                                    ]}
                                />
                                <SelectField
                                    label="สาขาวิชา"
                                    placeholder={selectedCurriculum ? "เลือก สาขาวิชา" : "กรุณาเลือกระดับการศึกษาก่อน"}
                                    required
                                    disabled={!selectedCurriculum}
                                    value={selectedMajor}
                                    onChange={(e) => setSelectedMajor(e.target.value)}
                                    options={selectedCurriculum ? majors[selectedCurriculum] : []}
                                />
                            </div>
                        </section>

                        {/* 2. ข้อมูลส่วนตัว */}
                        <section>
                            <SectionHeader title="ข้อมูลส่วนตัว" subtitle="กรอกข้อมูลตามบัตรประชาชน" />
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div className="md:col-span-3">
                                        <SelectField
                                            label="คำนำหน้า"
                                            placeholder="เลือก"
                                            required
                                            value={prefix}
                                            onChange={(e) => setPrefix(e.target.value)}
                                            options={["นาย", "นางสาว", "นาง"]}
                                        />
                                    </div>
                                    <div className="md:col-span-4">
                                        <InputField label="ชื่อ (ภาษาไทย)" placeholder="ชื่อจริง" required />
                                    </div>
                                    <div className="md:col-span-5">
                                        <InputField label="นามสกุล (ภาษาไทย)" placeholder="นามสกุล" required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="ชื่อ (ภาษาอังกฤษ)" placeholder="First Name" required />
                                    <InputField label="นามสกุล (ภาษาอังกฤษ)" placeholder="Last Name" required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="วัน/เดือน/ปีเกิด (พ.ศ.)"
                                        placeholder="dd/mm/yyyy"
                                        required
                                        value={dob}
                                        onChange={handleDobChange}
                                        maxLength={10}

                                    />
                                    <InputField
                                        label="เลขบัตรประจำตัวประชาชน"
                                        placeholder="เลข 13 หลัก"
                                        required
                                        value={idCard}
                                        onChange={handleIdCardChange}
                                        maxLength={13}

                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="เบอร์โทรศัพท์มือถือ"
                                        placeholder="08x-xxx-xxxx"
                                        required
                                        type="tel"
                                        value={mobile}
                                        onChange={handleMobileChange}
                                        maxLength={10}
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>}
                                    />
                                    <InputField
                                        label="อีเมล"
                                        placeholder="customer@example.com"
                                        required
                                        type="email"
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 3. ข้อมูลการศึกษา */}
                        <section>
                            <SectionHeader title="ข้อมูลการศึกษา" subtitle="สถานศึกษาเดิม" />
                            <div className="grid grid-cols-1 gap-6">
                                <InputField label="โรงเรียน/วิทยาลัย (เดิม)" placeholder="ชื่อสถานศึกษาเดิม" required />

                            </div>
                        </section>

                        {/* Submit Button */}
                        <div className="pt-6 border-t border-slate-100 flex justify-center">
                            <button
                                className="bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-lg font-bold py-3 px-12 rounded-full  transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                            >
                                ยืนยันการสมัคร
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
