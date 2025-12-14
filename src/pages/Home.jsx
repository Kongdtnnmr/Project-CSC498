import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
    const { hash } = useLocation();
    const { t } = useLanguage();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    const navigate = useNavigate();

    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderImages = [
        '/public/pic/family.jpg',
        '/public/pic/Screenshot 2025-12-14 232104.png',
        '/public/pic/sddefault.jpg',
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    };

    const levels = [
        { title: t('home.levelVocational'), target: 'ประกาศนียบัตรวิชาชีพ (ปวช.)' },
        { title: t('home.levelHighVocational'), target: 'ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)' },
        { title: t('home.levelBachelor'), target: 'ปริญญาตรี' },
    ];

    const news = [
        { id: 1, title: 'ข่าวประชาสัมพันธ์ 1', date: '25 พฤษภาคม 2568' },
        { id: 2, title: 'รับสมัครนักศึกษาใหม่', date: '21 มีนาคม 2568' },
        { id: 3, title: 'โครงการทุนการศึกษา', date: '15 กุมภาพันธ์ 2568' },
        { id: 4, title: 'กิจกรรม open house', date: '10 มกราคม 2568' },
    ]

    return (
        <div className="bg-[#f0f0f0] min-h-screen">
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
            <div className="bg-[#2e3b5e] py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center tracking-wide">
                        {levels.map((level, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-4 cursor-pointer group"
                                onClick={() => navigate('/courses', { state: { activeTab: level.target } })}
                            >
                                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-lg group-hover:scale-105 transition-transform">
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
                                <span className="text-gray-500">{t('home.studentImagePlaceholder')}</span>
                            </div>
                            <div className="p-8 flex flex-col justify-center bg-white">
                                <h2 className="text-3xl font-bold text-red-600 mb-2">{t('home.promoMainTitle')}</h2>
                                <h3 className="text-xl text-blue-900 font-bold mb-4">{t('home.promoSubTitle')}</h3>
                                <ul className="text-blue-800 space-y-2 mb-6 text-sm md:text-base">
                                    <li>{t('home.promoList1')}</li>
                                    <li>{t('home.promoList2')}</li>
                                    <li>{t('home.promoList3')}</li>
                                    <li>{t('home.promoList4')}</li>
                                </ul>
                                <button className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 w-max transition-colors">
                                    {t('home.applyButton')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Header */}
            <div id="news-section" className="bg-[#3e4c70] text-white text-center py-4">
                <h2 className="text-xl font-medium">{t('home.newsHeader')}</h2>
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
                                <p className="text-xs text-blue-600 font-semibold mb-1">{t('home.newsTag')}</p>
                                <h4 className="text-sm font-bold text-gray-800 line-clamp-2">{item.title}</h4>
                                <p className="text-xs text-gray-500 mt-2">{item.date}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <button className="bg-gray-800 text-white px-6 py-2 rounded text-sm hover:bg-black transition-colors">
                            {t('home.readAllNews')} {'>'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

