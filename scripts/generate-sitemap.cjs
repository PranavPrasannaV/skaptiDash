const fs = require('fs');
const path = require('path');

const domain = process.env.SITE_DOMAIN || 'https://www.skaptix.com';
const routes = ['/', '/about', '/faq', '/contact', '/waitlist', '/waitlist-seller'];

function isoDate(d = new Date()) {
  return d.toISOString().split('T')[0];
}

function buildSitemap() {
  const lastmod = isoDate();
  const urls = routes.map((r) => {
    return `  <url>\n    <loc>${domain.replace(/\/$/, '')}${r}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${r === '/' ? '1.0' : r.includes('waitlist') ? '0.9' : '0.8'}</priority>\n  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log('Wrote', outPath);
}

buildSitemap();
