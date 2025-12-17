import { MapPin, Phone, Mail, Printer, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact-section" className="bg-[#2e3b5e] text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Map Section */}
                    <div className="flex justify-center md:justify-start w-full md:-ml-20">
                        <div className="bg-white p-2 rounded-lg shadow-lg w-full h-[250px] relative overflow-hidden flex items-center justify-center">
                            {/* Visual placeholder for map */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.6603222128524!2d100.66402207603167!3d13.859416794790931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d632991ba92b5%3A0xbf51554d7d71158d!2zMTQg4LiL4Lit4LiiIOC4hOC4ueC5ieC4muC4reC4mSAyNyDguYHguKLguIEgMTAg4LmB4LiC4Lin4LiH4LiX4LmI4Liy4LmB4Lij4LmJ4LiHIOC5gOC4guC4leC4muC4suC4h-C5gOC4guC4mSDguIHguKPguLjguIfguYDguJfguJ7guKHguKvguLLguJnguITguKMgMTAyMjA!5e0!3m2!1sth!2sth!4v1765629302974!5m2!1sth!2sth"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Info Section */}
                    <div className="space-y-6 md:pl-12 border-l-0 md:border-l-2 border-gray-500">
                        <h2 className="text-4xl font-serif mb-8">Contact Us</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-sm sm:text-base font-light whitespace-nowrap">000-000000</p>
                            </div>

                            {/* Line - Shifted Right */}
                            <div className="flex items-center gap-3 pl-8">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-sm sm:text-base font-light whitespace-nowrap">Blockcess</p>
                            </div>

                            {/* Email (was Fax) */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-sm sm:text-base font-light whitespace-nowrap">Blockcess.com</p>
                            </div>

                            {/* Facebook - Shifted Right */}
                            <div className="flex items-center gap-3 pl-8">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Facebook className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-sm sm:text-base font-light whitespace-nowrap">Blockcess</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
