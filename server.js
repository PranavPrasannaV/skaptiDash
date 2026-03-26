import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

// Optimized SSR Configuration
const FETCH_TIMEOUT = 3000; // 3 seconds
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const responseCache = new Map();

let htmlTemplate = '';
const loadTemplate = async () => {
    try {
        htmlTemplate = await fs.readFile(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
        console.log('✅ SSR: index.html template cached in memory');
    } catch (err) {
        console.error('❌ SSR: Failed to load index.html template', err);
    }
};
loadTemplate();

console.log('🚀 Skaptix SSR Server v1.0.4 starting...');

// Serve static assets (js, css, images) directly
app.use(express.static(path.resolve(__dirname, 'dist'), { index: false, dotfiles: 'allow' }));

const replaceMetaTags = (html, meta) => {
    let result = html;
    if (meta.title) {
        result = result.replace(/<title>.*?<\/title>/gi, `<title>${meta.title}</title>`);
        result = result.replace(/<meta\s+(?:name|property)="title"\s+content=".*?"\s*\/?>/gi, `<meta name="title" content="${meta.title}" />`);
        result = result.replace(/<meta\s+(?:name|property)="og:title"\s+content=".*?"\s*\/?>/gi, `<meta property="og:title" content="${meta.title}" />`);
        result = result.replace(/<meta\s+(?:name|property)="twitter:title"\s+content=".*?"\s*\/?>/gi, `<meta property="twitter:title" content="${meta.title}" />`);
    }
    if (meta.description) {
        result = result.replace(/<meta\s+(?:name|property)="description"\s+content=".*?"\s*\/?>/gi, `<meta name="description" content="${meta.description}" />`);
        result = result.replace(/<meta\s+(?:name|property)="og:description"\s+content=".*?"\s*\/?>/gi, `<meta property="og:description" content="${meta.description}" />`);
        result = result.replace(/<meta\s+(?:name|property)="twitter:description"\s+content=".*?"\s*\/?>/gi, `<meta property="twitter:description" content="${meta.description}" />`);
    }
    if (meta.image) {
        result = result.replace(/<meta\s+(?:name|property)="og:image"\s+content=".*?"\s*\/?>/gi, 
            `<meta property="og:image" content="${meta.image}" />\n    <meta property="og:image:type" content="image/jpeg" />${meta.title ? `\n    <meta property="og:image:alt" content="${meta.title}" />` : ''}`);
        result = result.replace(/<meta\s+(?:name|property)="twitter:image"\s+content=".*?"\s*\/?>/gi, `<meta property="twitter:image" content="${meta.image}" />`);
        result = result.replace(/<link\s+rel="preload"\s+as="image"\s+href=".*?"\s*\/?>/gi, `<link rel="preload" as="image" href="${meta.image}" />`);
    }
    if (meta.url) {
        result = result.replace(/<meta\s+(?:name|property)="og:url"\s+content=".*?"\s*\/?>/gi, `<meta property="og:url" content="${meta.url}" />`);
        result = result.replace(/<meta\s+(?:name|property)="twitter:url"\s+content=".*?"\s*\/?>/gi, `<meta property="twitter:url" content="${meta.url}" />`);
        result = result.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/gi, `<link rel="canonical" href="${meta.url}" />`);
    }
    return result;
};

// Helper to fetch data and replace tags
const handleDynamicRequest = async (req, res, type) => {
    const id = req.params.id;
    const cacheKey = `${type}:${id}`;
    
    // Check Cache
    const cached = responseCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        console.log(`[SSR] Cache Hit: ${cacheKey}`);
        return res.send(replaceMetaTags(htmlTemplate || '', cached.meta));
    }

    try {
        const apiUrl = process.env.VITE_API_URL || 'https://backend-test.skaptix.com/api';
        let targetUrl;
        if (type === 'profile') targetUrl = `${apiUrl}/social-media/users/${id}`;
        else if (type === 'post') targetUrl = `${apiUrl}/social-media/posts/${id}`;
        else if (type === 'product') targetUrl = `${apiUrl}/product/${id}`;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

        try {
            const response = await fetch(targetUrl, { signal: controller.signal });
            clearTimeout(timeout);

            if (response.ok) {
                const data = await response.json();
                const item = data?.data;
                if (item) {
                    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
                    const host = req.get('host');
                    let meta = { url: `${protocol}://${host}${req.originalUrl}` };
                    
                    if (type === 'profile') {
                        const name = item.displayName || item.username || 'Profile';
                        meta.title = `View ${name} on Skaptix`;
                        meta.description = `Open the Skaptix app to view ${name}, follow, and shop their products.`;
                        meta.image = item.profilePhotoUrl;
                    } else if (type === 'post') {
                        const author = item.user?.displayName || item.user?.username || 'User';
                        meta.title = `Post by ${author} on Skaptix`;
                        meta.description = item.caption || 'Check out this post on Skaptix';
                        meta.image = item.images?.[0]?.imageUrl || item.video?.thumbnailUrl;
                    } else if (type === 'product') {
                        meta.title = `${item.title} | Skaptix`;
                        meta.description = item.description || 'Check out this product on Skaptix';
                        meta.image = item.images?.[0]?.url;
                    }

                    const apiBase = apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : (apiUrl.endsWith('/api/') ? apiUrl.slice(0, -5) : apiUrl);
                    if (meta.image && meta.image.startsWith('/')) {
                        meta.image = `${apiBase}${meta.image}`;
                    }
                    meta.image = meta.image || 'https://www.skaptix.com/og-image.png';

                    // Save to Cache
                    responseCache.set(cacheKey, { meta, timestamp: Date.now() });

                    console.log(`[SSR] ${type.toUpperCase()} | Resolved: ${id}`);
                    return res.send(replaceMetaTags(htmlTemplate || '', meta));
                }
            }
        } catch (apiError) {
            console.error(`[SSR] Fetch Error/Timeout ${type} ${id}:`, apiError.name === 'AbortError' ? 'Timeout' : apiError.message);
        }
        // Return default HTML on failure/timeout
        res.send(htmlTemplate || '');
    } catch (err) {
        console.error(`[SSR] Critical Error:`, err);
        res.status(500).send('Internal Server Error');
    }
};

// Profile routes
app.get('/profile/:id', (req, res) => handleDynamicRequest(req, res, 'profile'));
app.get('/social/profile/:id', (req, res) => handleDynamicRequest(req, res, 'profile'));
app.get('/u/:id', (req, res) => handleDynamicRequest(req, res, 'profile'));

// Post routes
app.get('/post/:id', (req, res) => handleDynamicRequest(req, res, 'post'));
app.get('/social/post/:id', (req, res) => handleDynamicRequest(req, res, 'post'));

// Product routes
app.get('/product/:id', (req, res) => handleDynamicRequest(req, res, 'product'));

// Fallback for everything else
app.get(/.*/, async (req, res) => {
    res.send(htmlTemplate || '');
});

app.listen(PORT, () => {
    console.log(`Skaptix SSR Server listening on port ${PORT}`);
});
