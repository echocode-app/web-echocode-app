export const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID?.trim() || 'echocode_app';
export const SITE_HOST = process.env.NEXT_PUBLIC_SITE_HOST?.trim() || '';

export const ANALYTICS_INGEST_URL = process.env.NEXT_PUBLIC_ANALYTICS_INGEST_URL?.trim() || '';
export const FORM_SUBMIT_URL = process.env.NEXT_PUBLIC_FORMS_SUBMIT_URL?.trim() || '';

const deriveUploadInitUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_FORMS_UPLOAD_INIT_URL?.trim();
  if (configuredUrl) {
    return configuredUrl;
  }

  if (!FORM_SUBMIT_URL) {
    return '';
  }

  try {
    return new URL('/api/forms/uploads/init', FORM_SUBMIT_URL).toString();
  } catch {
    return '';
  }
};

export const FORM_UPLOAD_INIT_URL = deriveUploadInitUrl();
