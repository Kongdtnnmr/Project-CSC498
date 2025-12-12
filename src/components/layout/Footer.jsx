import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact-section" className="bg-[#2e3b5e] text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Map Section */}
                    <div className="flex justify-center md:justify-start">
                        <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-sm h-64 relative overflow-hidden flex items-center justify-center">
                            {/* Visual placeholder for map */}
                            <img
                                src="https://img.freepik.com/free-vector/location_53876-25530.jpg"
                                alt="Map Location"
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                    </div>

                    {/* Contact Info Section */}
                    <div className="space-y-6 md:pl-12 border-l-0 md:border-l-2 border-gray-500">
                        <h2 className="text-4xl font-serif mb-8">Contact Us</h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-[#fbbf24] mt-1" />
                                <div>
                                    <p>123 Anywhere St.</p>
                                    <p>Any City, ST 12345</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6 text-[#fbbf24]" />
                                <p>(123) 456-7890</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6 text-[#fbbf24]" />
                                <p>hello@reallygreatsite.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
