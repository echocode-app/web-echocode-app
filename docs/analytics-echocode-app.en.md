# Echocode.app Analytics Integration

This document describes the analytics and form-ingestion work completed on the `Echocode.app` frontend side.

## Scope

The `echocode-newsite` backend/admin already provides:

- `POST /api/analytics/page-view`
- `POST /api/forms/submissions`
- CORS allowlist for `echocode.app` and preview domains
- site-aware admin views under `/admin/echocode-app`

This repository now sends data into those endpoints from the `Echocode.app` website.

## Implemented Changes

### 1. Shared site configuration

Added [`src/lib/siteIngest.ts`](/Users/annakotlyar/Desktop/projects/web-echocode-app/src/lib/siteIngest.ts) as the single source of truth for:

- `SITE_ID`
- `SITE_HOST`
- `ANALYTICS_INGEST_URL`
- `FORM_SUBMIT_URL`

Default values:

- `SITE_ID = "echocode_app"`
- `SITE_HOST = "echocode.app"`

### 2. Page view ingestion

Existing page tracking remained in place through [`src/components/analytics/PageViewTracker.tsx`](/Users/annakotlyar/Desktop/projects/web-echocode-app/src/components/analytics/PageViewTracker.tsx), which is mounted in [`src/app/layout.tsx`](/Users/annakotlyar/Desktop/projects/web-echocode-app/src/app/layout.tsx).

Updated [`src/lib/analytics/siteAnalytics.ts`](/Users/annakotlyar/Desktop/projects/web-echocode-app/src/lib/analytics/siteAnalytics.ts) so that each page-view payload includes:

- `siteId`
- `siteHost`
- `path`
- `url`
- `title`
- `referrer`
- `source: "website"`
- optional first-touch attribution metadata

The page view request is sent to `NEXT_PUBLIC_ANALYTICS_INGEST_URL`.

### 3. Form submission ingestion

Updated [`src/components/modals/ContactUsModal/ContactUsForm/useContactUsForm.ts`](/Users/annakotlyar/Desktop/projects/web-echocode-app/src/components/modals/ContactUsModal/ContactUsForm/useContactUsForm.ts) to remove the old Formspree flow.

The contact form now sends a JSON `POST` request to `NEXT_PUBLIC_FORMS_SUBMIT_URL` with:

- `siteId`
- `siteHost`
- `source: "website"`
- `firstName`
- `lastName`
- `email`
- `message`

Validation and existing success/error UX were preserved.

### 4. Environment variables

Updated [`.env.example`](/Users/annakotlyar/Desktop/projects/web-echocode-app/.env.example) to use the new integration contract:

```env
NEXT_PUBLIC_SITE_ID=echocode_app
NEXT_PUBLIC_SITE_HOST=echocode.app
NEXT_PUBLIC_ANALYTICS_INGEST_URL=
NEXT_PUBLIC_FORMS_SUBMIT_URL=
```

Recommended values for local or preview verification:

```env
NEXT_PUBLIC_ANALYTICS_INGEST_URL=https://web-echocode-app.vercel.app/api/analytics/page-view
NEXT_PUBLIC_FORMS_SUBMIT_URL=https://web-echocode-app.vercel.app/api/forms/submissions
```

Replace the base domain above if the active backend/preview domain differs.

## Runtime Flow

### Page view

1. A route loads in `Echocode.app`.
2. `PageViewTracker` triggers `trackPageView()`.
3. The frontend posts a site-aware payload to `/api/analytics/page-view`.
4. Data becomes available in `/admin/echocode-app`.

### Form submission

1. A user submits the contact modal form.
2. Frontend validation runs locally.
3. The frontend posts a site-aware JSON payload to `/api/forms/submissions`.
4. Data becomes available in `/admin/echocode-app/submissions`.

## Verification Completed

The following repository checks passed after the changes:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run check`

## Manual Verification Still Required

These steps depend on live environment configuration and backend availability:

1. Set `NEXT_PUBLIC_ANALYTICS_INGEST_URL` and `NEXT_PUBLIC_FORMS_SUBMIT_URL`.
2. Open the site locally or on preview.
3. Load at least one page.
4. Submit the contact form.
5. Confirm records appear in:
   - `/admin/echocode-app`
   - `/admin/echocode-app/submissions`

## Commit Preparation

This branch is ready for a normal commit after you review the final diff.

Suggested commit scope:

- shared site ingest config
- page-view integration for `echocode-newsite`
- form submission integration for `echocode-newsite`
- env example update
- documentation

Before committing, double-check:

- no temporary local env values were added to tracked files
- endpoint URLs point to the intended backend environment
- backend payload contract still matches `firstName`, `lastName`, `email`, `message`, `siteId`, `siteHost`, `source`
