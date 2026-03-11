import {
  type FirstTouchAttribution,
  persistFirstTouchAttribution,
  readFirstTouchAttribution,
} from '@/lib/analytics/firstTouchAttribution';

export const ANALYTICS_INGEST_URL = process.env.NEXT_PUBLIC_ANALYTICS_INGEST_URL?.trim() || '';
export const ANALYTICS_SITE_ID =
  process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID?.trim() || 'echocode_app';

export const SPLASH_FINISHED_EVENT = 'splash:finished';

export type AnalyticsPageViewPayload = {
  siteId: string;
  siteHost: string;
  path: string;
  url: string;
  title: string;
  referrer: string;
  source: 'website';
  metadata?: {
    attribution?: FirstTouchAttribution;
  };
};

export const buildAnalyticsPageViewPayload = (): AnalyticsPageViewPayload | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const currentUrl = new URL(window.location.href);
  const attribution = persistFirstTouchAttribution() || readFirstTouchAttribution();

  return {
    siteId: ANALYTICS_SITE_ID,
    siteHost: currentUrl.host,
    path: `${currentUrl.pathname}${currentUrl.search}`,
    url: currentUrl.toString(),
    title: document.title,
    referrer: document.referrer,
    source: 'website',
    metadata: attribution
      ? {
          attribution,
        }
      : undefined,
  };
};

const sendWithBeacon = (payload: AnalyticsPageViewPayload) => {
  if (typeof navigator === 'undefined' || typeof navigator.sendBeacon !== 'function') {
    return false;
  }

  const body = JSON.stringify(payload);
  return navigator.sendBeacon(ANALYTICS_INGEST_URL, new Blob([body], { type: 'application/json' }));
};

export const trackPageView = async () => {
  if (!ANALYTICS_INGEST_URL || typeof window === 'undefined') {
    return;
  }

  const payload = buildAnalyticsPageViewPayload();
  if (!payload) {
    return;
  }

  if (sendWithBeacon(payload)) {
    return;
  }

  try {
    await fetch(ANALYTICS_INGEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Analytics must never affect the page lifecycle.
  }
};
