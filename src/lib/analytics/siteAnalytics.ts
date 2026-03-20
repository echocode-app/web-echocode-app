import {
  persistFirstTouchAttribution,
  readFirstTouchAttribution,
} from '@/lib/analytics/firstTouchAttribution';
import { getClientSiteConfig } from '@/lib/site/clientSiteContext';
import { ANALYTICS_INGEST_URL } from '@/lib/siteIngest';

export const SPLASH_FINISHED_EVENT = 'splash:finished';

export type AnalyticsPageViewPayload = {
  siteId: string;
  siteHost: string;
  path: string;
  url: string;
  title: string | null;
  referrer: string | null;
  source: string;
};

export const buildAnalyticsPageViewPayload = (): AnalyticsPageViewPayload | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const currentUrl = new URL(window.location.href);
  const attribution = persistFirstTouchAttribution() || readFirstTouchAttribution();
  const siteConfig = getClientSiteConfig();

  return {
    siteId: siteConfig.siteId,
    siteHost: siteConfig.siteHost,
    path: `${currentUrl.pathname}${currentUrl.search}`,
    url: currentUrl.toString(),
    title: document.title || null,
    referrer: document.referrer || null,
    source: siteConfig.defaultAnalyticsSource,
    ...(attribution ? { attribution } : {}),
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
