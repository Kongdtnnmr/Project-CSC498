import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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

const CustomSelect = ({ value, onChange, options, placeholder, isMobile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val) => {
        onChange(val);
        setIsOpen(false);
    };

    // Helper to get display label
    const getDisplayLabel = () => {
        if (!value) return placeholder;
        // options can be array of strings or objects {val, label}
        const found = options.find(o => (typeof o === 'object' ? o.val : o) === value);
        if (!found) return value;
        return typeof found === 'object' ? found.label : found;
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none flex justify-between items-center cursor-pointer ${!value ? 'text-slate-500' : ''}`}
            >
                <span className="truncate">{getDisplayLabel()}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Dropdown List - Forced Downwards */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto z-50 animate-in fade-in zoom-in-95 duration-100">
                    {options.map((opt, idx) => {
                        const val = typeof opt === 'object' ? opt.val : opt;
                        const label = typeof opt === 'object' ? opt.label : opt;
                        const isSelected = val === value;
                        return (
                            <div
                                key={idx}
                                onClick={() => handleSelect(val)}
                                className={`px-4 py-2 cursor-pointer text-sm hover:bg-blue-50 transition-colors ${isSelected ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'}`}
                            >
                                {label}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const DateSelect = ({ label, value, onChange, required }) => {
    const { language } = useLanguage();
    // Value format: DD/MM/YYYY
    const [d, m, y] = (value || "//").split('/');

    // Calculate days based on selected month
    const getDaysInMonth = (month) => {
        if (!month) return 31;
        // User custom rules:
        // April (04), June (06), September (09), November (11) = 30 days
        // February (02) = 14 days (per request)
        if (['04', '06', '09', '11'].includes(month)) return 30;
        if (month === '02') return 14;
        return 31;
    };

    const daysInMonth = getDaysInMonth(m);
    const days = Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, '0'));

    const monthsTH = [
        { val: '01', label: 'มกราคม' }, { val: '02', label: 'กุมภาพันธ์' }, { val: '03', label: 'มีนาคม' },
        { val: '04', label: 'เมษายน' }, { val: '05', label: 'พฤษภาคม' }, { val: '06', label: 'มิถุนายน' },
        { val: '07', label: 'กรกฎาคม' }, { val: '08', label: 'สิงหาคม' }, { val: '09', label: 'กันยายน' },
        { val: '10', label: 'ตุลาคม' }, { val: '11', label: 'พฤศจิกายน' }, { val: '12', label: 'ธันวาคม' }
    ];

    const monthsEN = [
        { val: '01', label: 'January' }, { val: '02', label: 'February' }, { val: '03', label: 'March' },
        { val: '04', label: 'April' }, { val: '05', label: 'May' }, { val: '06', label: 'June' },
        { val: '07', label: 'July' }, { val: '08', label: 'August' }, { val: '09', label: 'September' },
        { val: '10', label: 'October' }, { val: '11', label: 'November' }, { val: '12', label: 'December' }
    ];

    const months = language === 'TH' ? monthsTH : monthsEN;

    // Years calculation
    // TH: BE (Current Year + 543)
    // EN: AD (Current Year)
    // Range: 15-70 years old (approx)
    const currentYear = new Date().getFullYear();
    const isThai = language === 'TH';
    const yearOffset = isThai ? 543 : 0;

    // Base calculation on AD year to keep consistent range
    const startYearAD = currentYear - 10;
    const endYearAD = currentYear - 70;

    const years = [];
    for (let yr = startYearAD; yr >= endYearAD; yr--) {
        years.push(String(yr + yearOffset));
    }

    const handleChange = (type, val) => {
        let newD = type === 'd' ? val : (d || '');
        const newM = type === 'm' ? val : (m || '');
        const newY = type === 'y' ? val : (y || '');

        // If changing month, check if current day is valid for new month
        if (type === 'm') {
            const maxDays = getDaysInMonth(val);
            if (newD && parseInt(newD) > maxDays) {
                newD = ''; // Reset day if invalid
            }
        }

        onChange(`${newD}/${newM}/${newY}`);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                    <CustomSelect
                        value={d || ''}
                        onChange={(val) => handleChange('d', val)}
                        options={days}
                        placeholder={isThai ? 'วัน' : 'Day'}
                    />
                </div>
                <div className="relative">
                    <CustomSelect
                        value={m || ''}
                        onChange={(val) => handleChange('m', val)}
                        options={months}
                        placeholder={isThai ? 'เดือน' : 'Month'}
                    />
                </div>
                <div className="relative">
                    <CustomSelect
                        value={y || ''}
                        onChange={(val) => handleChange('y', val)}
                        options={years}
                        placeholder={isThai ? 'ปี' : 'Year'}
                    />
                </div>
            </div>
        </div>
    );
};

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
    const { t } = useLanguage();
    const [selectedCurriculumKey, setSelectedCurriculumKey] = useState("");
    const [selectedMajor, setSelectedMajor] = useState("");

    // Form States
    const [dob, setDob] = useState("");
    const [idCard, setIdCard] = useState("");
    const [mobile, setMobile] = useState("");
    const [prefix, setPrefix] = useState("");

    // Get translated data
    const levels = t('courses.levels');
    const majorsData = t('courses.majors');
    const prefixOptions = t('apply.prefixOptions');

    const curriculumKeys = ['pvc', 'pws', 'bachelor'];
    // Map dropdown value back to key for simple state management in this demo
    // Ideally SelectField would just take the key as value.

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




    return (
        <div className="min-h-screen bg-white font-sans">
            <div className="w-full">
                <div
                    className="overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-10 -translate-y-10">
                            <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight relative z-10">
                            {t('apply.bannerTitle')}
                        </h1>
                        <p className="mt-2 text-blue-100 relative z-10 font-light text-lg">
                            {t('apply.bannerSubtitle')}
                        </p>
                    </div>

                    <div className="p-8 space-y-10">

                        {/* 1. ข้อมูลหลักสูตร */}
                        <section>
                            <SectionHeader title={t('apply.sectionCourse')} subtitle={t('apply.sectionCourseSub')} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Modified SelectField usage to handle keys and display text manually for now since SelectField is simple */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        {t('apply.labelLevel')} <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedCurriculumKey}
                                            onChange={(e) => {
                                                setSelectedCurriculumKey(e.target.value);
                                                setSelectedMajor("");
                                            }}
                                            className={`w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg py-2.5 px-4 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none appearance-none ${selectedCurriculumKey === "" ? "text-slate-400" : ""}`}
                                        >
                                            <option value="" disabled hidden>{t('apply.placeholderLevel')}</option>
                                            {curriculumKeys.map((key) => (
                                                <option key={key} value={key} className="text-slate-900">{levels[key]}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <SelectField
                                    label={t('apply.labelMajor')}
                                    placeholder={selectedCurriculumKey ? t('apply.placeholderMajor') : t('apply.placeholderMajorWait')}
                                    required
                                    disabled={!selectedCurriculumKey}
                                    value={selectedMajor}
                                    onChange={(e) => setSelectedMajor(e.target.value)}
                                    options={selectedCurriculumKey ? majorsData[selectedCurriculumKey] : []}
                                />
                            </div>
                        </section>

                        {/* 2. ข้อมูลส่วนตัว */}
                        <section>
                            <SectionHeader title={t('apply.sectionPersonal')} subtitle={t('apply.sectionPersonalSub')} />
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div className="md:col-span-3">
                                        <SelectField
                                            label={t('apply.labelPrefix')}
                                            placeholder={t('apply.placeholderPrefix')}
                                            required
                                            value={prefix}
                                            onChange={(e) => setPrefix(e.target.value)}
                                            options={prefixOptions || []}
                                        />
                                    </div>
                                    <div className="md:col-span-4">
                                        <InputField label={t('apply.labelFirstNameTH')} placeholder={t('apply.placeholderFirstNameTH')} required />
                                    </div>
                                    <div className="md:col-span-5">
                                        <InputField label={t('apply.labelLastNameTH')} placeholder={t('apply.placeholderLastNameTH')} required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label={t('apply.labelFirstNameEN')} placeholder={t('apply.placeholderFirstNameEN')} required />
                                    <InputField label={t('apply.labelLastNameEN')} placeholder={t('apply.placeholderLastNameEN')} required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <DateSelect
                                        label={t('apply.labelDob')}
                                        required
                                        value={dob}
                                        onChange={setDob}
                                    />
                                    <InputField
                                        label={t('apply.labelIdCard')}
                                        placeholder={t('apply.placeholderIdCard')}
                                        required
                                        value={idCard}
                                        onChange={handleIdCardChange}
                                        maxLength={13}

                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label={t('apply.labelMobile')}
                                        placeholder={t('apply.placeholderMobile')}
                                        required
                                        type="tel"
                                        value={mobile}
                                        onChange={handleMobileChange}
                                        maxLength={10}
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>}
                                    />
                                    <InputField
                                        label={t('apply.labelEmail')}
                                        placeholder={t('apply.placeholderEmail')}
                                        required
                                        type="email"
                                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 3. ข้อมูลการศึกษา */}
                        <section>
                            <SectionHeader title={t('apply.sectionEducation')} subtitle={t('apply.sectionEducationSub')} />
                            <div className="grid grid-cols-1 gap-6">
                                <InputField label={t('apply.labelSchool')} placeholder={t('apply.placeholderSchool')} required />

                            </div>
                        </section>

                        {/* Submit Button */}
                        <div className="pt-6 border-t border-slate-100 flex justify-center">
                            <button
                                className="bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-lg font-bold py-3 px-12 rounded-full  transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                            >
                                {t('apply.submitButton')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
