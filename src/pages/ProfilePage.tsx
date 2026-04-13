import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Loader2, ShoppingBag,
  ChevronRight, Users, UserCheck, Smartphone
} from 'lucide-react';
import axios from 'axios';
import * as constants from '../constants';

const API_URL = import.meta.env.VITE_API_URL || 'https://backend-test.skaptix.com/api';
const DEEP_LINK_SCHEME = import.meta.env.VITE_APP_DEEP_LINK_SCHEME || 'skaptix';
const THEME = '#6e83f7';

const AppleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
  </svg>
);

const AndroidLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 576 512" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M420.22 173.04l43.26-75.1c4.54-7.86 1.83-17.91-6.04-22.45-7.88-4.54-17.92-1.83-22.46 6.04l-44.52 77.29c-32.93-14.88-69.5-23.15-108.45-23.15-38.94 0-75.52 8.27-108.46 23.15l-44.51-77.29c-4.54-7.87-14.58-10.58-22.46-6.04-7.87 4.54-10.58 14.59-6.04 22.45l43.26 75.1C65.52 216.7 8 285.83 8 368h560c0-82.17-57.52-151.3-147.78-194.96zM170.81 315.68c-12.72 0-23.04-10.35-23.04-23.09s10.32-23.09 23.04-23.09c12.73 0 23.04 10.35 23.04 23.09s-10.31 23.09-23.04 23.09zm234.38 0c-12.73 0-23.04-10.35-23.04-23.09s10.31-23.09 23.04-23.09c12.72 0 23.04 10.35 23.04 23.09s-10.32 23.09-23.04 23.09z" />
  </svg>
);

// ── Helpers ────────────────────────────────────────────────────────────────
const resolveImageUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) {
    const base = API_URL.replace(/\/api\/?$/, '');
    return `${base}${url}`;
  }
  return url;
};

const formatCount = (n?: number) => {
  if (n == null) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
};

// ── Types ──────────────────────────────────────────────────────────────────
interface ProfileData {
  displayName?: string;
  username?: string;
  bio?: string;
  profilePhotoUrl?: string;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
  isVerified?: boolean;
  isSeller?: boolean;
  sellerId?: string;
  businessId?: string;
  role?: string;
  _count?: {
    followers?: number;
    following?: number;
    posts?: number;
  };
}

interface ProductItem {
  id: string;
  title: string;
  image_url?: string;              // flat shape from /products/business
  images?: { url?: string; imageUrl?: string }[];
  price_cents?: number;            // flat shape
  min_price_cents?: number;
  variants?: { priceCents: number }[];
}

// ── Sub-components ─────────────────────────────────────────────────────────
function ProductCard({ product, onTap }: { product: ProductItem; onTap: () => void }) {
  const rawImg = product.image_url ?? product.images?.[0]?.url ?? product.images?.[0]?.imageUrl;
  const imageUrl = resolveImageUrl(rawImg);
  const flatPrice = product.price_cents ?? product.min_price_cents;
  const prices = product.variants?.map(v => v.priceCents) ?? [];
  const minPrice = flatPrice != null ? flatPrice / 100 : prices.length > 0 ? Math.min(...prices) / 100 : null;

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a] cursor-pointer" onClick={onTap}>
      <div className="aspect-square relative">
        {imageUrl ? (
          <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#252525]">
            <ShoppingBag size={28} className="text-zinc-600" />
          </div>
        )}
        {minPrice != null && (
          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
            ${minPrice.toFixed(2)}
          </div>
        )}
      </div>
      <div className="p-2 pb-3">
        <p className="text-white text-xs font-semibold line-clamp-1">{product.title}</p>
      </div>
    </div>
  );
}

function EmptyState({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      {icon}
      <p className="text-zinc-500 text-sm">{label}</p>
    </div>
  );
}

function LoadMoreSpinner() {
  return (
    <div className="flex justify-center py-6">
      <Loader2 size={24} className="animate-spin text-zinc-500" />
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  // Products state
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [productCursor, setProductCursor] = useState<string | null>(null);
  const [hasMoreProducts, setHasMoreProducts] = useState(false);
  const [loadingMoreProducts, setLoadingMoreProducts] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  // Intersection observer sentinel ref
  const productSentinelRef = useRef<HTMLDivElement>(null);

  const deepLink = `${DEEP_LINK_SCHEME}://social/profile/${id}`;
  const APP_STORE_URL = constants.APP_STORE_URL;
  const PLAY_STORE_URL = constants.PLAY_STORE_URL;

  // ── Initial data fetch ──
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    const ios = /iPad|iPhone|iPod/.test(ua);
    const android = /android/i.test(ua);
    setIsIOS(ios);
    setIsAndroid(android);

    if (!id) { setLoading(false); return; }

    const fetchData = async () => {
      try {
        const profileRes = await axios.get(`${API_URL}/social-media/users/${id}`);
        const prof: ProfileData = profileRes.data?.data || profileRes.data;
        setProfile(prof);

        const isSeller = prof?.isSeller || prof?.role === 'seller' || !!prof?.sellerId || !!prof?.businessId;
        const ownerId = prof?.sellerId || prof?.businessId;

        if (isSeller && ownerId) {
          // Fetch products
          const prodRes = await axios.get(`${API_URL}/products/business/${ownerId}`, { params: { limit: 20, approvedOnly: true } });
          const resData = prodRes.data?.data;
          const prods: ProductItem[] = Array.isArray(resData) ? resData : (resData?.data ?? []);
          setProducts(Array.isArray(prods) ? prods : []);
          setHasMoreProducts(prodRes.data?.data?.hasMore ?? false);
          setProductCursor(prodRes.data?.data?.nextCursor ?? null);
        }
      } catch (e) {
        console.error('Failed to fetch profile', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    if (/iPad|iPhone|iPod/.test(navigator.userAgent) || /android/i.test(navigator.userAgent)) {
      window.location.href = `${DEEP_LINK_SCHEME}://social/profile/${id}`;
      setIsRedirecting(true);
      const t = setTimeout(() => setIsRedirecting(false), 2000);
      return () => clearTimeout(t);
    }
  }, [id]);

  // ── Load more: products (cursor-based) ──
  const loadMoreProducts = useCallback(async () => {
    if (loadingMoreProducts || !hasMoreProducts || !productCursor || !profile) return;
    const ownerId = profile.sellerId || profile.businessId;
    if (!ownerId) return;
    setLoadingMoreProducts(true);
    try {
      const res = await axios.get(`${API_URL}/products/business/${ownerId}`, {
        params: { limit: 20, cursor: productCursor, approvedOnly: true },
      });
      const resData = res.data?.data;
      const newProds: ProductItem[] = Array.isArray(resData) ? resData : (resData?.data ?? []);
      setProducts(prev => [...prev, ...newProds]);
      setHasMoreProducts(resData?.hasMore ?? false);
      setProductCursor(resData?.nextCursor ?? null);
    } catch { /* silent */ } finally {
      setLoadingMoreProducts(false);
    }
  }, [loadingMoreProducts, hasMoreProducts, productCursor, profile]);

  // ── Intersection observer for infinite scroll ──
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (entry.target === productSentinelRef.current) loadMoreProducts();
        });
      },
      { threshold: 0.1 }
    );
    if (productSentinelRef.current) observer.observe(productSentinelRef.current);
    return () => observer.disconnect();
  }, [loading, loadMoreProducts]);

  const handleOpenApp = () => { window.location.href = deepLink; };
  const handleDownloadApp = () => {
    if (isAndroid) {
      window.location.href = PLAY_STORE_URL;
    } else {
      window.location.href = APP_STORE_URL;
    }
  };
  const openProduct = (pid: string) => { window.location.href = `${DEEP_LINK_SCHEME}://product/${pid}`; };
  const openPost = (pid: string) => { window.location.href = `${DEEP_LINK_SCHEME}://social/post/${pid}`; };

  const brandName = profile?.displayName || profile?.username || 'Profile';
  const initial = brandName.charAt(0).toUpperCase();
  const isSeller = profile?.isSeller || profile?.role === 'seller' || !!profile?.sellerId || !!profile?.businessId;

  // ── Storefront (seller) layout ────────────────────────────────────────
  if (!loading && isSeller) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-[#0d0d0d]/95 backdrop-blur border-b border-white/5 px-4 py-3 flex items-center justify-between">
          <span className="text-base font-bold tracking-tight text-white">skaptix</span>
          <button onClick={handleOpenApp} style={{ color: THEME }} className="text-xs font-semibold flex items-center gap-1 active:opacity-70">
            Open in App <ChevronRight size={14} />
          </button>
        </div>

        {/* Profile Header */}
        <div className="px-5 pt-6 pb-4 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-[104px] h-[104px] rounded-full p-[3px]" style={{ backgroundColor: THEME }}>
              <div className="w-full h-full rounded-full overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
                {profile?.profilePhotoUrl ? (
                  <img src={resolveImageUrl(profile.profilePhotoUrl)} alt={brandName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-white">{initial}</span>
                )}
              </div>
            </div>
            {profile?.isVerified && (
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#0d0d0d]" style={{ backgroundColor: THEME }}>
                <UserCheck size={14} className="text-white" />
              </div>
            )}
          </div>

          <h1 className="text-xl font-bold text-white">{brandName}</h1>
          {profile?.username && <p className="text-sm text-zinc-400 mt-0.5">@{profile.username}</p>}
          {profile?.bio && <p className="text-sm text-zinc-300 mt-2 max-w-xs leading-relaxed">{profile.bio}</p>}

          {/* <div className="flex items-center gap-8 mt-4">
            {[
              { label: 'Followers', value: profile?._count?.followers ?? profile?.followersCount },
              { label: 'Following', value: profile?._count?.following ?? profile?.followingCount },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-xl font-bold text-white">{formatCount(value)}</span>
                <span className="text-xs text-zinc-500 mt-0.5">{label}</span>
              </div>
            ))}
          </div> */}

          <button
            onClick={handleDownloadApp}
            className="mt-5 w-full max-w-sm rounded-xl font-semibold text-sm py-3 text-white transition-all active:scale-95"
            style={{ backgroundColor: THEME }}
          >
            Download Skaptix
          </button>
        </div>

        {/* Content */}
        <div className="pb-36 px-3 pt-3">
          {loading ? (
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-[#1a1a1a] animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {/* Products */}
              {products.length === 0
                ? <EmptyState icon={<ShoppingBag size={40} className="text-zinc-600" />} label="No products yet" />
                : <>
                  <div className="grid grid-cols-2 gap-2">
                    {products.map(p => <ProductCard key={p.id} product={p} onTap={() => openProduct(p.id)} />)}
                  </div>
                  <div ref={productSentinelRef} className="h-1" />
                  {loadingMoreProducts && <LoadMoreSpinner />}
                </>
              }
            </>
          )}
        </div>

        {/* Sticky Bottom Banner */}
        {bannerVisible && (
          <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-white/10 px-4 py-3 flex items-center gap-3"
            style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}
          >
            <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: THEME }}>
              <Users size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-semibold leading-tight truncate">Enjoying {brandName}'s store?</p>
              <p className="text-zinc-400 text-[11px] leading-tight mt-0.5">Follow, message &amp; shop in the app.</p>
            </div>
            <button onClick={() => setBannerVisible(false)} className="text-zinc-600 text-lg leading-none px-1 flex-shrink-0">×</button>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <button
                onClick={handleDownloadApp}
                className="text-sm font-bold px-4 py-2.5 rounded-xl text-white flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 transition-all w-full"
                style={{ backgroundColor: THEME }}
              >
                {isAndroid ? (
                  <><AndroidLogo className="w-5 h-5" /> Download Skaptix</>
                ) : (
                  <><AppleLogo className="w-5 h-5" /> Download Skaptix</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Regular user / loading state ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800 text-center relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: THEME }} />
          </div>
        )}

        <div className="w-24 h-24 bg-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg border border-zinc-700 overflow-hidden">
          {profile?.profilePhotoUrl ? (
            <img src={resolveImageUrl(profile.profilePhotoUrl)} alt={brandName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-bold text-zinc-300">{initial}</span>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-2">View {brandName} on Skaptix</h1>

        {(isIOS || isAndroid) ? (
          <>
            <p className="text-zinc-400 mb-8 px-2">
              Open the Skaptix app to view {brandName}, follow, and shop their products.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleOpenApp}
                className="w-full text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center transition-all active:scale-95"
                style={{ backgroundColor: THEME }}
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
              <p className="mt-6 text-xs text-zinc-500 animate-pulse">Attempting to open app...</p>
            )}
          </>
        ) : (
          <div className="mt-4">
            <div className="flex items-center justify-center mb-4 text-zinc-500 space-x-4">
              <AppleLogo className="w-12 h-12 opacity-50" />
              <AndroidLogo className="w-12 h-12 opacity-50" />
            </div>
            <p className="text-zinc-400 mb-6">Skaptix is available on iOS and Android.</p>
            <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
              <p className="text-sm text-zinc-300">
                Please visit this link on your mobile device to view the profile in the app.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <p className="text-[13px] leading-relaxed text-zinc-400">
            <strong className="text-zinc-300 font-semibold block mb-1">Skaptix: The fashion marketplace designed for you.</strong>
            Discover &amp; shop thousands of verified clothing brands all across the U.S, in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
