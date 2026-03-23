import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const DeleteAccountPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0c15] to-black text-white">
            <Navigation />

            <main className="pt-32 pb-24">
                <div className="max-w-3xl mx-auto px-6 sm:px-8">
                    {/* Header */}
                    <div className="mb-12 animate-fadeIn">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                            Delete Your Account
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            We're sorry to see you go. Please review the information below before proceeding with your account deletion.
                        </p>
                    </div>

                    {/* How to Delete */}
                    <div className="glass rounded-2xl p-8 mb-8 animate-slideInUp delay-200">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6e83f7] to-[#A8B5DB] flex items-center justify-center text-sm font-bold">
                                1
                            </span>
                            How to delete your account
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-5">
                            You can delete your account directly from the Skaptix app by following these steps:
                        </p>
                        <ol className="space-y-4">
                            {[
                                'Open the Skaptix app and go to your profile.',
                                'Tap the Settings icon (⚙️) in the top-right corner.',
                                'Scroll down and tap "Delete Account".',
                                'Confirm the deletion by following the on-screen prompts.',
                            ].map((step, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <span className="mt-0.5 w-7 h-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-sm font-semibold text-[#A8B5DB] flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-300 leading-relaxed">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* What Happens Section */}
                    <div className="glass rounded-2xl p-8 mb-8 animate-slideInUp delay-400">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6e83f7] to-[#A8B5DB] flex items-center justify-center text-sm font-bold">
                                !
                            </span>
                            What happens when you delete your account
                        </h2>
                        <ul className="space-y-4">
                            {[
                                'Your profile, account information, and login credentials will be permanently deleted.',
                                'Your order history and transaction records will be removed, except where retention is required by law.',
                                'Any saved items, wishlists, collections, and preferences will be permanently deleted.',
                                'Your posts, comments, and social interactions will be removed.',
                                'Active orders in progress will still be fulfilled before account data is deleted.',
                                'This action is irreversible — you will not be able to recover your account or any associated data.',
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-[#6e83f7] to-[#A8B5DB] flex-shrink-0" />
                                    <span className="text-gray-300 leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Data Retention Notice */}
                    <div className="glass rounded-2xl p-8 mb-8 animate-slideInUp delay-600">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6e83f7]/30 to-[#A8B5DB]/30 border border-[#6e83f7]/40 flex items-center justify-center text-sm">
                                🔒
                            </span>
                            Data Retention Notice
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            In accordance with applicable laws and regulations, certain data such as transaction records and legal compliance information may be retained for a limited period after account deletion.
                            For full details, please review our{' '}
                            <a href="/privacy-policy" className="text-[#6e83f7] hover:text-[#A8B5DB] underline underline-offset-4 transition-colors">
                                Privacy Policy
                            </a>.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-10 text-center animate-slideInUp delay-800">
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Need help or unable to access the app? Contact us at{' '}
                            <a href="mailto:team@skaptix.com" className="text-[#6e83f7] hover:text-[#A8B5DB] underline underline-offset-4 transition-colors">
                                team@skaptix.com
                            </a>{' '}
                            to request account deletion.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DeleteAccountPage;
