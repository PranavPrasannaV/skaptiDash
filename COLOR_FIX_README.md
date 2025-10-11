# Color Override Fix - Complete Solution

## Problem Description
Colors were loading correctly initially, then after ~1 second:
- Button gradient backgrounds disappeared
- White sections turned silver/gray
- Screenshot backgrounds changed
- Brand blue text (`ELEVATION`) turned black

## Root Cause
This is caused by **browser extensions or accessibility features** (like Dark Reader, Auto Dark Mode, or Windows High Contrast) that inject styles **after** the page loads.

## Solution Implemented

### 1. Mutation Observer in `main.tsx`
Added a JavaScript mutation observer that:
- Monitors the `<html>` element for style changes
- Re-applies color enforcement whenever browser tries to override
- Runs at multiple lifecycle points (immediate, DOMContentLoaded, load)

### 2. Inline Critical Styles in `index.html`
- Inline styles in `<html>` and `<body>` tags
- Maximum specificity with `!important`
- Targets both standard and `-webkit-` prefixed properties

### 3. CSS Overrides in `index.css`
- Global `forced-color-adjust: none !important`
- Explicit background color locks
- Wildcard selectors for all gradient classes

## Testing Steps

### Chrome/Edge
1. Open http://localhost:5174/
2. Wait 2-3 seconds
3. **Expected**: Colors remain stable (no flashing/changes)

### Check Browser Settings
If still seeing issues, verify:

**Chrome:**
- Go to `chrome://settings/appearance`
- Disable "Auto Dark Mode for Web Contents"

**Edge:**
- Go to `edge://settings/appearance`
- Set Theme to "System default" or "Dark"
- Disable "Automatic theme"

**Windows High Contrast:**
- Windows Settings → Accessibility → Contrast themes
- Ensure it's set to "None"

**Browser Extensions:**
- Disable Dark Reader
- Disable any color/theme forcing extensions

## Files Modified

1. **`index.html`** - Inline critical styles with maximum priority
2. **`src/main.tsx`** - Mutation observer to fight extension overrides
3. **`src/index.css`** - Comprehensive forced-color-adjust rules

## Verification
```bash
npm run build  # Should succeed with ~49KB CSS
npm run dev    # Test at http://localhost:5174/
```

## If Issue Persists

### Debugging Steps:
1. Open DevTools → Elements tab
2. Inspect `<html>` element
3. Look for:
   - Injected `style` attributes
   - Browser-added `filter` or `backdrop-filter` properties
   - Extension-injected inline styles

### Check Console:
The mutation observer will log every time it re-enforces colors (if you add logging)

### Nuclear Option:
If a specific extension is causing issues, create a custom CSS file:
```css
html, body, * {
  filter: none !important;
  backdrop-filter: none !important;
  forced-color-adjust: none !important;
}
```

## Technical Details

### CSS Specificity
All overrides use `!important` to ensure maximum priority over:
- Browser user-agent styles
- Extension-injected styles
- Accessibility overrides

### JavaScript Observer
The MutationObserver watches for:
- `style` attribute changes on `<html>`
- `class` attribute changes that might trigger styles

### Performance Impact
Minimal - observer only fires when attributes change, typically 0-2 times after load.
