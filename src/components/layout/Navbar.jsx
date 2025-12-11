import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/logo.jpg';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'หน้าแรก', path: '/' },
        { name: 'สมัครเรียน', path: '/apply' },
        { name: 'หลักสูตร', path: '/courses' },
        { name: 'ข่าวประชาสัมพันธ์', path: '#' },
        { name: 'ช่องทางการติดต่อ', path: '#' },
    ];

    return (
        <nav className="bg-[#1e3a8a] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-20 relative">
                    <div className="absolute left-0 flex-shrink-0 flex items-center z-50">
                        <Link to="/" className="block">
                            <img
                                src={logo}
                                alt="University Logo"
                                className="h-48 w-48 object-cover rounded-full border-4 border-white shadow-lg mt-12"
                            />
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="hover:bg-[#172554] px-3 py-2 rounded-md text-lg font-medium transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="absolute right-0 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#172554] focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#172554]"
                                onClick={() => setIsOpen(false)}
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
