import { FORM_SUBMIT_URL, FORM_UPLOAD_INIT_URL } from '@/lib/siteIngest';

export type UploadedAttachmentPayload = {
  path: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
};

type ApiErrorPayload = {
  error?: {
    message?: string;
  };
  errors?: Array<{
    message?: string;
  }>;
  message?: string;
  title?: string;
};

type UploadInitResponse = {
  success: boolean;
  data?: {
    uploadUrl: string;
    path: string;
    method: 'PUT';
    headers: {
      'Content-Type': string;
    };
  };
};

async function getApiErrorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const payload = (await response.json()) as ApiErrorPayload;
    const message =
      payload.errors?.[0]?.message || payload.error?.message || payload.message || payload.title;

    if (typeof message === 'string' && message.trim()) {
      return message.trim();
    }
  } catch {
    // Ignore JSON parsing errors and keep fallback.
  }

  return fallback;
}

export async function initAttachmentUpload(file: File): Promise<UploadedAttachmentPayload> {
  if (!FORM_UPLOAD_INIT_URL) {
    throw new Error('File upload endpoint is not configured yet');
  }

  let response: Response;
  try {
    response = await fetch(FORM_UPLOAD_INIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        formType: 'project',
        file: {
          originalName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
        },
      }),
    });
  } catch {
    throw new Error(
      'File upload is temporarily unavailable. Please try again later or send your materials to hello@echocode.app.',
    );
  }

  if (!response.ok) {
    if (response.status === 503) {
      throw new Error(
        'File upload is temporarily unavailable. Please submit the form without a file.',
      );
    }

    throw new Error(await getApiErrorMessage(response, 'Failed to initialize file upload'));
  }

  const payload = (await response.json()) as UploadInitResponse;
  if (!payload.success || !payload.data) {
    throw new Error('Invalid file upload initialization payload');
  }

  const uploadResult = await fetch(payload.data.uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': payload.data.headers['Content-Type'],
    },
    body: file,
  });

  if (!uploadResult.ok) {
    throw new Error('Failed to upload file');
  }

  return {
    path: payload.data.path,
    originalName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
  };
}

export function isFormSubmitConfigured(): boolean {
  return Boolean(FORM_SUBMIT_URL);
}
