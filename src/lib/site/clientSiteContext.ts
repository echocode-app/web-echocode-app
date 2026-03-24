'use client';

type ClientSiteConfig = {
  siteId: string;
  siteHost: string;
  defaultAnalyticsSource: string;
  defaultFormSource: string;
};

const DEFAULT_SITE_ID = process.env.NEXT_PUBLIC_SITE_ID?.trim() || 'echocode_app';
const DEFAULT_SITE_HOST = process.env.NEXT_PUBLIC_SITE_HOST?.trim() || 'echocode.app';

const DEFAULT_SITE_CONFIG: ClientSiteConfig = {
  siteId: DEFAULT_SITE_ID,
  siteHost: DEFAULT_SITE_HOST,
  defaultAnalyticsSource: 'website',
  defaultFormSource: 'contact_modal',
};

const normalizeHost = (value: string | null | undefined) => {
  const normalized = value?.trim().toLowerCase();
  return normalized ? normalized : null;
};

const removeWwwPrefix = (value: string) => value.replace(/^www\./, '');

const isLocalHost = (host: string) =>
  host === 'localhost' || host === '127.0.0.1' || host.endsWith('.localhost');

const getAllowedHosts = () => {
  const canonicalHost = normalizeHost(DEFAULT_SITE_HOST) || 'echocode.app';
  const bareHost = removeWwwPrefix(canonicalHost);

  return new Set([canonicalHost, bareHost, `www.${bareHost}`, 'web-echocode-app.vercel.app']);
};

export function getClientSiteConfig(): ClientSiteConfig {
  if (typeof window === 'undefined') {
    return DEFAULT_SITE_CONFIG;
  }

  const currentHost = normalizeHost(window.location.host);
  if (!currentHost) {
    return DEFAULT_SITE_CONFIG;
  }

  const allowedHosts = getAllowedHosts();
  if (allowedHosts.has(currentHost) || isLocalHost(currentHost)) {
    return DEFAULT_SITE_CONFIG;
  }

  return {
    ...DEFAULT_SITE_CONFIG,
    siteHost: currentHost,
  };
}
