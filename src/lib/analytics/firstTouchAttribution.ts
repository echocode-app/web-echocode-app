export const FIRST_TOUCH_ATTRIBUTION_STORAGE_KEY = 'echocode_attribution';

export type FirstTouchAttribution = {
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  timestamp: string;
};

const withTrimmedOptionalValue = (value: string | null | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toAttributionFromSearchParams = (
  searchParams: URLSearchParams,
): FirstTouchAttribution | null => {
  const source = withTrimmedOptionalValue(searchParams.get('utm_source'));
  if (!source) {
    return null;
  }

  return {
    source,
    medium: withTrimmedOptionalValue(searchParams.get('utm_medium')),
    campaign: withTrimmedOptionalValue(searchParams.get('utm_campaign')),
    content: withTrimmedOptionalValue(searchParams.get('utm_content')),
    term: withTrimmedOptionalValue(searchParams.get('utm_term')),
    timestamp: new Date().toISOString(),
  };
};

export const readFirstTouchAttribution = (): FirstTouchAttribution | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(FIRST_TOUCH_ATTRIBUTION_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue);
    if (
      !isRecord(parsed) ||
      typeof parsed.source !== 'string' ||
      typeof parsed.timestamp !== 'string'
    ) {
      return null;
    }

    return {
      source: parsed.source,
      medium: typeof parsed.medium === 'string' ? parsed.medium : undefined,
      campaign: typeof parsed.campaign === 'string' ? parsed.campaign : undefined,
      content: typeof parsed.content === 'string' ? parsed.content : undefined,
      term: typeof parsed.term === 'string' ? parsed.term : undefined,
      timestamp: parsed.timestamp,
    };
  } catch {
    return null;
  }
};

export const persistFirstTouchAttribution = (): FirstTouchAttribution | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const existingAttribution = readFirstTouchAttribution();
  if (existingAttribution) {
    return existingAttribution;
  }

  try {
    const currentUrl = new URL(window.location.href);
    const attribution = toAttributionFromSearchParams(currentUrl.searchParams);

    if (!attribution) {
      return null;
    }

    window.localStorage.setItem(FIRST_TOUCH_ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));

    return attribution;
  } catch {
    return null;
  }
};
