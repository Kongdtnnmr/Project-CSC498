import { ArrowRight, ChevronLeft, ChevronRight, PenTool, Book, Languages, GraduationCap, X } from 'lucide-react';
import logo from '../assets/logo.jpg';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchContent } from '../services/cms';

export default function Home() {
    const { hash } = useLocation();
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderImages, setSliderImages] = useState([]);
    const [news, setNews] = useState([]);
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        Promise.all([
            fetchContent("news"),
            fetchContent("courses"),
            fetchContent("events"),
        ]).then(([newsData, coursesData, eventsData]) => {

            console.log("NEWS:", newsData);
            console.log("EVENTS:", eventsData);

            setNews(newsData || []);
            setCourses(coursesData || []);
            setEvents(eventsData || []);

            const images = (newsData || [])
                .map(item => item.image)
                .filter(Boolean);

            setSliderImages(images);
        });
    }, []);

    const navigate = useNavigate();

    const nextSlide = () => {
        if (!sliderImages.length) return;
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    };

    const prevSlide = () => {
        if (!sliderImages.length) return;
        setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    };

    const levels = [
        {
            title: t('home.levelVocational'),
            target: 'ประกาศนียบัตรวิชาชีพ (ปวช.)',
            icon: PenTool,
            color: 'bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6]',
            borderColor: 'border-blue-300'
        },
        {
            title: t('home.levelHighVocational'),
            target: 'ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)',
            icon: Book,
            color: 'bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6]',
            borderColor: 'border-blue-300'
        },
        {
            title: t('home.levelBachelor'),
            target: 'ปริญญาตรี',
            icon: GraduationCap,
            color: 'bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6]',
            borderColor: 'border-blue-300'
        },
    ];

    return (
        <div className="bg-[#f0f0f0] min-h-screen relative">
            {/* Hero Section - Image Slider */}
            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden bg-gray-100">
                {/* Slider Images */}
                <div className="relative w-full h-full">
                    {sliderImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={28} />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
                    aria-label="Next slide"
                >
                    <ChevronRight size={28} />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {sliderImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Course Levels Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center tracking-wide">
                        {levels.map((level, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-4 cursor-pointer group"
                                onClick={() => navigate('/courses', { state: { activeTab: level.target } })}
                            >
                                <div className={`w-48 h-48 rounded-full ${level.color} p-2 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                                    <div className="w-full h-full border-2 border-dashed border-white/50 rounded-full flex items-center justify-center">
                                        <level.icon size={72} className="text-white drop-shadow-md" />
                                    </div>
                                </div>
                                <h3 className="text-gray-800 text-xl font-medium text-center max-w-[250px]">{level.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Official Partner Section */}
            <div className="bg-white py-16 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        {/* Text Content */}
                        <div className="w-full md:w-3/5 space-y-6">
                            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold mb-2">
                                Official Partner
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                                มั่นใจได้ 100% บล็อคเซสฯ คือตัวแทนประชาสัมพันธ์ที่ได้รับการรับรองโดยตรงจาก <span className="text-[#1e3a8a]">"วิทยาลัยเทคโนโลยีวิศวกรรมแหลมฉบัง"</span>
                            </h2>
                            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    สำหรับผู้ปกครองและน้องๆ ที่สนใจศึกษาต่อที่ วิทยาลัยเทคโนโลยีวิศวกรรมแหลมฉบัง
                                    ท่านสามารถติดตามข้อมูลข่าวสารและสมัครเรียนผ่านทีมงานของ <span className="font-semibold text-gray-800">บริษัท บล็อคเซส จำกัด</span> ได้อย่างมั่นใจ
                                </p>
                                <p>
                                    เราคือพันธมิตรอย่างเป็นทางการ (Official Partner) ที่ได้รับมอบหมายโดยตรงจากท่านผู้อำนวยการ <span className="font-semibold text-gray-800">ดร. ทรรศนะ บุญขวัญ</span>
                                    ให้ดูแลด้านข้อมูลและการประชาสัมพันธ์หลักสูตร เพื่ออำนวยความสะดวกให้แก่ทุกท่านในการเข้าถึงโอกาสทางการศึกษาที่ดีที่สุด
                                </p>
                            </div>
                        </div>

                        {/* Certification Image */}
                        <div className="w-full md:w-2/5">
                            <div
                                className="relative rounded-lg overflow-hidden shadow-xl border border-gray-200 cursor-pointer group hover:shadow-2xl transition-all duration-300"
                                onClick={() => setSelectedImage("public/pic/หนังสือแต่งตั้ง_page-0001.jpg")}
                            >
                                <img
                                    src="/pic/หนังสือแต่งตั้ง_page-0001.jpg"
                                    alt="Certification Letter"
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Promotion Banner */}
            <div className="bg-[#f0f0f0] py-12 flex justify-center">
                <div className="max-w-[80%] mx-auto px-4 w-full">
                    <div className="relative">
                        {/* Simulated content based on image text */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <div className="aspect-video w-full bg-gray-200 flex items-center justify-center relative">
                                    <iframe
                                        className="w-full h-full object-cover"
                                        src="https://www.youtube.com/embed/4gDpNze0qZs"
                                        title="EN-TECH Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <p className="text-center font-bold text-gray-700 mt-2">EN-TECH</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="aspect-video w-full bg-gray-200 flex items-center justify-center relative">
                                    <iframe
                                        className="w-full h-full object-cover"
                                        src="https://www.youtube.com/embed/Qpg1CQkzbPM"
                                        title="Inthanin Phlat Bai Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <p className="text-center font-bold text-gray-700 mt-2">เพลง : อินทนิลผลัดใบ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Section */}
            <div id="news-section" className="bg-[#3E5074] py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left Column */}
                        <div className="flex flex-col gap-8">
                            <div className="mb-4">
                                <h2 className="text-4xl  text-white mb-2">{t('home.newsMainHeader')}</h2>
                                <p className="text-xl text-gray-400">{t('home.newsSubHeader')}</p>
                            </div>

                            {/* First News Item */}
                            {events.length > 0 && (
                                <div className="group cursor-pointer">
                                    <div className="overflow-hidden rounded-xl mb-4" onClick={() => setSelectedImage(events[0].image)}>
                                        <img
                                            src={events[0].image}
                                            alt={events[0].title}
                                            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <p className="text-gray-400 text-sm mb-2">{events[0].date}</p>
                                    <h3 className="text-white text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                        {events[0].title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                        {t('home.promoSubTitle')} {/* Using existing text as placeholder description */}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-12 pt-8 md:pt-20">
                            {events.slice(1, 3).map((item) => (
                                <div key={item.id} className="group cursor-pointer">
                                    <div className="overflow-hidden rounded-xl mb-4" onClick={() => setSelectedImage(item.image)}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <p className="text-gray-400 text-sm mb-2">{item.date}</p>
                                    <h3 className="text-white text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                        {t('home.promoSubTitle')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-12">
                        <button
                            onClick={() => navigate('/news')}
                            className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
                        >
                            {t('home.readAllNews')}
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-95 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="min-h-screen w-full flex items-center justify-center p-4">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="fixed top-4 right-4 z-[60] text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                        >
                            <X size={30} />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full Screen View"
                            className="w-full max-w-3xl h-auto object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}