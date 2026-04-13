import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Smartphone, ShoppingBag, Loader2 } from 'lucide-react';
import axios from 'axios';
import * as constants from '../constants';

const AppleLogo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 384 512"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
    </svg>
);

const AndroidLogo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 576 512"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M420.22 173.04l43.26-75.1c4.54-7.86 1.83-17.91-6.04-22.45-7.88-4.54-17.92-1.83-22.46 6.04l-44.52 77.29c-32.93-14.88-69.5-23.15-108.45-23.15-38.94 0-75.52 8.27-108.46 23.15l-44.51-77.29c-4.54-7.87-14.58-10.58-22.46-6.04-7.87 4.54-10.58 14.59-6.04 22.45l43.26 75.1C65.52 216.7 8 285.83 8 368h560c0-82.17-57.52-151.3-147.78-194.96zM170.81 315.68c-12.72 0-23.04-10.35-23.04-23.09s10.32-23.09 23.04-23.09c12.73 0 23.04 10.35 23.04 23.09s-10.31 23.09-23.04 23.09zm234.38 0c-12.73 0-23.04-10.35-23.04-23.09s10.31-23.09 23.04-23.09c12.72 0 23.04 10.35 23.04 23.09s-10.32 23.09-23.04 23.09z" />
    </svg>
);

const resolveImageUrl = (url?: string) => {
    if (!url) return undefined;
    if (url.startsWith('/')) {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://backend-test.skaptix.com/api';
        const apiBase = apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : (apiUrl.endsWith('/api/') ? apiUrl.slice(0, -5) : apiUrl);
        return `${apiBase}${url}`;
    }
    return url;
};

export default function ProductPage() {
    const { id } = useParams();
    const [isRedirecting, setIsRedirecting] = useState(true);
    const [isIOS, setIsIOS] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Configuration - Replace with your actual values
    const APP_SCHEME = `${import.meta.env.VITE_APP_DEEP_LINK_SCHEME || 'skaptix'}://product/${id}`;
    const APP_STORE_URL = constants.APP_STORE_URL;
    const PLAY_STORE_URL = constants.PLAY_STORE_URL;

    useEffect(() => {
        // Simple iOS and Android detection
        const userAgent = navigator.userAgent || navigator.vendor;
        const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
        const isAndroidDevice = /android/i.test(userAgent);
        setIsIOS(isIOSDevice);
        setIsAndroid(isAndroidDevice);

        const fetchProduct = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'https://backend-test.skaptix.com/api';
                const response = await axios.get(`${apiUrl}/product/${id}`);
                setProduct(response.data.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }

        if (!id || (!isIOSDevice && !isAndroidDevice)) {
            setIsRedirecting(false);
            return;
        }

        // Attempt to open the app
        window.location.href = APP_SCHEME;

        // Provide a fallback if it doesn't open within a short timeout
        const timeout = setTimeout(() => {
            setIsRedirecting(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [id, APP_SCHEME]);

    const handleOpenApp = () => {
        window.location.href = APP_SCHEME;
    };

    const handleDownloadApp = () => {
        if (isAndroid) {
            window.location.href = PLAY_STORE_URL;
        } else {
            window.location.href = APP_STORE_URL;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800 text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/20 overflow-hidden">
                    {isLoading ? (
                        <Loader2 size={40} className="text-white animate-spin" />
                    ) : product?.images?.[0]?.url ? (
                        <img
                            src={resolveImageUrl(product.images[0].url)}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <ShoppingBag size={40} className="text-white" />
                    )}
                </div>

                <h1 className="text-2xl font-bold mb-2">
                    {isLoading ? 'Loading Product...' : product?.title || 'View Product'} on Skaptix
                </h1>

                {product?.description && (
                    <p className="text-zinc-300 mb-4 line-clamp-3 px-2">
                        {product.description}
                    </p>
                )}

                {(isIOS || isAndroid) ? (
                    <>
                        <p className="text-zinc-400 mb-8">
                            Open the Skaptix app to view product details, check availability, and purchase.
                        </p>

                        <div className="space-y-4">
                            <button
                                onClick={handleOpenApp}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center transition-all active:scale-95"
                            >
                                <Smartphone size={20} className="mr-2" />
                                Open in Skaptix App
                            </button>

                            <button
                                onClick={handleDownloadApp}
                                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center transition-all active:scale-95"
                            >
                                {isAndroid ? (
                                    <>
                                        <AndroidLogo className="w-5 h-5 mr-2" />
                                        Download on Play Store
                                    </>
                                ) : (
                                    <>
                                        <AppleLogo className="w-5 h-5 mr-2" />
                                        Download on App Store
                                    </>
                                )}
                            </button>
                        </div>

                        {isRedirecting && (
                            <p className="mt-6 text-xs text-zinc-500 animate-pulse">
                                Attempting to open app...
                            </p>
                        )}
                    </>
                ) : (
                    <div className="mt-4">
                        <div className="flex items-center justify-center mb-4 text-zinc-500 space-x-4">
                            <AppleLogo className="w-12 h-12 opacity-50" />
                            <AndroidLogo className="w-12 h-12 opacity-50" />
                        </div>
                        <p className="text-zinc-400 mb-6">
                            Skaptix is available on iOS and Android.
                        </p>
                        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
                            <p className="text-sm text-zinc-300">
                                Please visit this link on your mobile device to view the product in the app.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
