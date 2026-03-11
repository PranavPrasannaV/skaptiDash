import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Smartphone, User, Loader2 } from 'lucide-react';
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

interface ProfileData {
    displayName?: string;
    username?: string;
    profilePhotoUrl?: string;
}

export default function ProfilePage() {
    const { id } = useParams();
    const [isRedirecting, setIsRedirecting] = useState(true);
    const [isIOS, setIsIOS] = useState(false);
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    // Configuration - Replace with your actual values
    const APP_SCHEME = `skaptix://social/profile/${id}`;
    const APP_STORE_URL = constants.APP_STORE_URL;

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;
        const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
        setIsIOS(isIOSDevice);

        if (!id) {
            setIsRedirecting(false);
            setIsLoadingProfile(false);
            return;
        }

        // Fetch brand profile data
        const fetchProfile = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'https://backend-test.skaptix.com/api';
                const response = await axios.get(`${apiUrl}/social-media/users/${id}`);
                setProfile(response.data.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setIsLoadingProfile(false);
            }
        };

        fetchProfile();

        if (isIOSDevice) {
            window.location.href = APP_SCHEME;
            const timeout = setTimeout(() => {
                setIsRedirecting(false);
            }, 2000);
            return () => clearTimeout(timeout);
        } else {
            setIsRedirecting(false);
        }
    }, [id, APP_SCHEME]);

    const handleOpenApp = () => {
        window.location.href = APP_SCHEME;
    };

    const handleDownloadApp = () => {
        window.location.href = APP_STORE_URL;
    };

    const brandName = profile?.displayName || profile?.username || 'Profile';

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            {/* Top Skaptix Logo */}
            {/* <div className="mb-8 flex flex-col items-center justify-center">
                <img src={AppLogo} alt="Skaptix Logo" className="w-16 h-16 object-cover rounded-xl shadow-lg border border-white/10" />
                <span className="text-xl font-bold mt-3 tracking-tight">skaptix</span>
            </div> */}

            <div className="max-w-md w-full bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800 text-center relative overflow-hidden">
                {isLoadingProfile && (
                    <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                )}

                <div className="w-24 h-24 bg-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg border border-zinc-700 overflow-hidden">
                    {profile?.profilePhotoUrl ? (
                        <img src={profile.profilePhotoUrl} alt={`${brandName} logo`} className="w-full h-full object-cover" />
                    ) : (
                        <User size={40} className="text-zinc-400" />
                    )}
                </div>

                <h1 className="text-2xl font-bold mb-2">View {brandName} on Skaptix</h1>

                {isIOS ? (
                    <>
                        <p className="text-zinc-400 mb-8 px-2">
                            Open the Skaptix app to view {brandName}, follow, and shop their products.
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
                                <AppleLogo className="w-5 h-5 mr-2" />
                                Download on App Store
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
                        <div className="flex items-center justify-center mb-4 text-zinc-500">
                            <AppleLogo className="w-12 h-12 opacity-50" />
                        </div>
                        <p className="text-zinc-400 mb-6">
                            Skaptix is currently available only on iOS.
                        </p>
                        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
                            <p className="text-sm text-zinc-300">
                                Please visit this link on your iPhone or iPad to view the profile in the app.
                            </p>
                        </div>
                    </div>
                )}

                {/* Introductory text below buttons */}
                <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
                    <p className="text-[13px] leading-relaxed text-zinc-400">
                        <strong className="text-zinc-300 font-semibold block mb-1">Skaptix: The fashion marketplace designed for you.</strong>
                        Discover & shop thousands of verified clothing brands all across the U.S, in one place.
                    </p>
                </div>
            </div>
        </div>
    );
}
