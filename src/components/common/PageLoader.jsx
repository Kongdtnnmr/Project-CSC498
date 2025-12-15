import { Loader2 } from 'lucide-react';

export default function PageLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
                <Loader2 className="w-12 h-12 text-[#1e3a8a] animate-spin" />
                <p className="text-[#1e3a8a] font-medium animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
