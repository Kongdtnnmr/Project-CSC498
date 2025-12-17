// src/pages/News.jsx
import { useEffect, useState } from "react";
import { fetchContent } from "../services/api";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderImages, setSliderImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    fetchContent("news")
      .then((data) => {
        setNews(data || []);
        // Use news images for the slider
        const images = (data || []).map(item => item.image).filter(Boolean);
        setSliderImages(images);
      })
      .finally(() => setLoading(false));
  }, []);

  const nextSlide = () => {
    if (!sliderImages.length) return;
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    if (!sliderImages.length) return;
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      {/* Slider Section - Replicated from Home */}
      {sliderImages.length > 0 && (
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
      )}

      {/* News Grid */}
      <div className="max-w-7xl mx-auto p-4 py-8">
        <h1 className="text-3xl mb-8 text-gray-800 text-center">ข่าวประชาสัมพันธ์ทั้งหมด</h1>

        {loading ? (
          <p className="text-center text-gray-500 mt-10">กำลังโหลดข่าว...</p>
        ) : news.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {news.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedImage(item.image)}>
                <img src={item.image} className="h-48 w-full object-cover" alt={item.title} />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">ยังไม่มีข่าว</p>
        )}
      </div>
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 bg-white/10 text-white rounded-full p-2 cursor-pointer hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Full Screen View"
              className="w-full h-full object-contain max-h-[85vh] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
