import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLoading } from '../../contexts/LoadingContext';
import PageLoader from '../common/PageLoader';

export default function MainLayout() {
    const { isLoading, showLoader, hideLoader } = useLoading();
    const location = useLocation();

    useEffect(() => {
        // Trigger loader on route change
        showLoader();

        // Simulate loading delay (or wait for actual data if integrated)
        const timer = setTimeout(() => {
            hideLoader();
        }, 1500);

        return () => clearTimeout(timer);
    }, [location.pathname]); // Only trigger on path change, not hash changes

    // Handle hash scrolling after loading
    useEffect(() => {
        if (!isLoading && location.hash) {
            const timer = setTimeout(() => {
                const element = document.querySelector(location.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoading, location.hash]);

    return (
        <div className="flex flex-col min-h-screen relative">
            {isLoading && <PageLoader />}
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
