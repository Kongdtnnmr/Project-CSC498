import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/logo.jpg';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, switchLanguage, t } = useLanguage();
    const [isLangOpen, setLangOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.apply'), path: '/apply' },
        { name: t('nav.courses'), path: '/courses' },
        { name: t('nav.news'), path: '/#news-section' },
        { name: t('nav.contact'), path: '/#contact-section' },
    ];

    const handleScroll = (e, path) => {
        if (path.includes('#')) {
            const [basePath, hash] = path.split('#');
            if (location.pathname === basePath || (basePath === '/' && location.pathname === '/')) {
                // Prevent default only if we want to handle scroll manually and avoid URL flicker, 
                // but letting it bubble usually updates URL which is fine. 
                // We mainly want to ensure scroll happens.
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100); // Small delay to ensuring rendering if returning from another page, though here we are likely already on page.
            }
        }
        setIsOpen(false);
    };

    return (
        <nav className="bg-[#1e3a8a] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-3 group">
                            <img
                                src={logo}
                                alt="Bangkok University Logo"
                                className="h-16 w-auto object-contain rounded-full p-1"
                            />
                            <div className="flex flex-col">
                                <span className="text-lg font-bold tracking-tight leading-none text-white transition-colors uppercase">
                                    {t('nav.bangkokUniversity')}
                                </span>
                                <span className="text-sm font-medium text-gray-200 transition-colors">
                                    {t('nav.bangkokUniversityThai')}
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                        <div className="flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={(e) => handleScroll(e, item.path)}
                                    className="hover:bg-[#172554] px-3 py-2 rounded-md text-base font-medium transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-2 relative">
                        <button
                            onClick={() => setLangOpen(!isLangOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#172554] transition-colors text-white"
                        >
                            <img
                                src={language === 'TH' ? "https://flagcdn.com/w40/th.png" : "https://flagcdn.com/w40/gb.png"}
                                alt={language}
                                className="h-5 w-8 object-cover rounded-sm"
                            />
                            <span className="font-bold text-sm">{language}</span>
                        </button>

                        {isLangOpen && (
                            <div className="absolute top-full right-0 mt-2 w-32 bg-[#1e3a8a] border border-[#172554] rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <button
                                    onClick={() => { switchLanguage('TH'); setLangOpen(false); }}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#172554] w-full text-left"
                                >
                                    <img
                                        src="https://flagcdn.com/w40/th.png"
                                        alt="TH"
                                        className="h-4 w-6 object-cover rounded-sm"
                                    />
                                    <span>TH</span>
                                </button>
                                <button
                                    onClick={() => { switchLanguage('EN'); setLangOpen(false); }}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#172554] w-full text-left"
                                >
                                    <img
                                        src="https://flagcdn.com/w40/gb.png"
                                        alt="EN"
                                        className="h-4 w-6 object-cover rounded-sm"
                                    />
                                    <span>EN</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#172554] focus:outline-none text-white"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#1e3a8a] border-t border-[#172554]">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#172554] text-white"
                                onClick={(e) => handleScroll(e, item.path)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
