#!/usr/bin/env node
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const fetch = globalThis.fetch || require('node-fetch');

// Routes to prerender (public marketing pages)
const routes = ['/', '/about', '/faq', '/contact', '/waitlist', '/waitlist-seller'];
const PREVIEW_PORT = process.env.PREVIEW_PORT || 5173;
const PREVIEW_URL = `http://localhost:${PREVIEW_PORT}`;

function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}

function saveRoute(route, html) {
  const outDir = path.join(__dirname, '..', 'dist', route === '/' ? '' : route.replace(/^\//, ''));
  const filePath = route === '/' ? path.join(__dirname, '..', 'dist', 'index.html') : path.join(outDir, 'index.html');
  if (route !== '/') mkdirp(outDir);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Saved ${filePath}`);
}

async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Server did not start in time');
}

async function prerender() {
  console.log('Building site...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('Starting preview server...');
  // use --yes to prevent npx from prompting to install packages interactively
  const preview = spawn('npx', ['--yes', 'vite', 'preview', '--port', String(PREVIEW_PORT)], { stdio: 'ignore', shell: true });

  try {
    await waitForServer(PREVIEW_URL);
    console.log('Preview server running, fetching routes...');

    for (const route of routes) {
      const url = PREVIEW_URL + route;
      try {
        const res = await fetch(url);
        const html = await res.text();
        saveRoute(route, html);
      } catch (err) {
        console.error('Failed to fetch', url, err);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Stopping preview server...');
    try { preview.kill(); } catch(e){}
  }
}

prerender().catch((e) => {
  console.error(e);
  process.exit(1);
});
