# Skaptix Waitlist

Production-ready waitlist landing experience for Skaptix, powered by Vite + React + Tailwind CSS.

## Prerequisites

- Node.js 18+
- Firebase project with Firestore enabled

## Setup

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Copy `.env.example` to `.env` and populate with your Firebase + EmailJS credentials:
   ```powershell
   Copy-Item .env.example .env
   ```
   | Variable | Description |
   | --- | --- |
   | `VITE_FIREBASE_API_KEY` | Web API key from Firebase project settings |
   | `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain (e.g. `your-app.firebaseapp.com`) |
   | `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
   | `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket URL |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
   | `VITE_FIREBASE_APP_ID` | Web app ID |
   | `VITE_EMAILJS_SERVICE_ID` | EmailJS service identifier that routes mail (e.g. `service_xxx`) |
   | `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template to render your message (e.g. `template_xxx`) |
   | `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key (`user_xxx` / `public_xxx`) used on the client |
3. In EmailJS, create a template that accepts `full_name`, `email`, `company`, `website`, `focus`, `message`, and `submitted_at` fields so the contact form payload is delivered with context. Add the service, template, and public key to your `.env`.
4. Enable Cloud Firestore in production mode and create a security rule allowing creates from authenticated services or with appropriate conditions.

## Development

```powershell
npm run dev
```

## Production Build

```powershell
npm run build
```

## Firestore Schema

Waitlist submissions are stored in the `waitlistRequests` collection with the following shape:

```json
{
  "fullName": "string",
  "email": "string",
  "brandName": "string | null",
   "brandNameNormalized": "string | null",
  "website": "string | null",
   "websiteNormalized": "string | null",
  "source": "skaptix-site",
  "submittedAt": "timestamp"
}
```

### Unique indexes

The frontend writes to three additional collections to enforce uniqueness without exposing the waitlist contents:

- `waitlistEmailIndex/{emailNormalized}` → `{ waitlistId, createdAt }`
- `waitlistBrandIndex/{brandNameNormalized}` → `{ waitlistId, brandName, createdAt }`
- `waitlistWebsiteIndex/{websiteNormalized}` → `{ waitlistId, website, createdAt }`

If any of these documents already exist, the write is rejected and the UI surfaces a helpful duplicate message.

### Firestore security rules

Your rules must allow the batched write to `waitlistRequests` and the three index collections, while keeping the data private. Start from the snippet below and tailor it to your needs:

```
rules_version = '2';
service cloud.firestore {
   match /databases/{database}/documents {
      function isNonEmptyString(value) {
         return value is string && value.size() > 0;
      }

      match /waitlistRequests/{docId} {
         allow create: if request.resource.data.keys().hasOnly([
               'fullName',
               'email',
               'brandName',
               'brandNameNormalized',
               'website',
               'websiteNormalized',
               'source',
               'submittedAt'
            ]) &&
            isNonEmptyString(request.resource.data.fullName) &&
            isNonEmptyString(request.resource.data.email) &&
            !exists(/databases/$(database)/documents/waitlistEmailIndex/$(request.resource.data.email)) &&
            (!request.resource.data.brandNameNormalized ||
               !exists(/databases/$(database)/documents/waitlistBrandIndex/$(request.resource.data.brandNameNormalized))) &&
            (!request.resource.data.websiteNormalized ||
               !exists(/databases/$(database)/documents/waitlistWebsiteIndex/$(request.resource.data.websiteNormalized))) &&
            existsAfter(/databases/$(database)/documents/waitlistEmailIndex/$(request.resource.data.email));

         allow read, update, delete: if false;
      }

      match /waitlistEmailIndex/{emailKey} {
         allow create: if request.resource.data.keys().hasOnly(['waitlistId', 'createdAt']) &&
            request.resource.data.waitlistId is string &&
            !exists(/databases/$(database)/documents/waitlistEmailIndex/$(emailKey));
         allow get: if true; // needed for duplicate messaging
         allow list, update, delete: if false;
      }

      match /waitlistBrandIndex/{brandKey} {
         allow create: if request.resource.data.keys().hasOnly(['waitlistId', 'brandName', 'createdAt']) &&
            request.resource.data.waitlistId is string &&
            !exists(/databases/$(database)/documents/waitlistBrandIndex/$(brandKey));
         allow get: if true;
         allow list, update, delete: if false;
      }

      match /waitlistWebsiteIndex/{websiteKey} {
         allow create: if request.resource.data.keys().hasOnly(['waitlistId', 'website', 'createdAt']) &&
            request.resource.data.waitlistId is string &&
            !exists(/databases/$(database)/documents/waitlistWebsiteIndex/$(websiteKey));
         allow get: if true;
         allow list, update, delete: if false;
      }
   }
}
```

Publish these rules (or deploy via CLI) before running the site to avoid permission errors.

Adjust Firebase security rules or automation (e.g., Cloud Functions, Zapier) to route submissions to downstream systems.
