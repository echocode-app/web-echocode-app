/** Must stay in sync with what UI allows users to attach. */
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
export const MAX_DOCUMENT_SIZE_BYTES = 20 * 1024 * 1024;

/** Allowed MIME types for uploaded images. */
export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/bmp',
  'image/tiff',
  'image/heic',
  'image/heif',
] as const;

/** Allowed MIME types for document attachments. */
export const ALLOWED_DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/rtf',
  'application/vnd.oasis.opendocument.text',
  'text/plain',
] as const;

type ImageMime = (typeof ALLOWED_IMAGE_MIME_TYPES)[number];
type DocumentMime = (typeof ALLOWED_DOCUMENT_MIME_TYPES)[number];

export function isImageMimeType(value: string): value is ImageMime {
  return ALLOWED_IMAGE_MIME_TYPES.includes(value as ImageMime);
}

export function isDocumentMimeType(value: string): value is DocumentMime {
  return ALLOWED_DOCUMENT_MIME_TYPES.includes(value as DocumentMime);
}

/** Validates optional attachment for the project contact form. */
export function getProjectAttachmentValidationError(file: File | null | undefined): string | null {
  if (!file) {
    return null;
  }

  if (!isImageMimeType(file.type) && !isDocumentMimeType(file.type)) {
    return 'Unsupported attachment file type';
  }

  if (isImageMimeType(file.type) && file.size > MAX_IMAGE_SIZE_BYTES) {
    return 'Image exceeds 5MB limit';
  }

  if (isDocumentMimeType(file.type) && file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return 'Document exceeds 20MB limit';
  }

  return null;
}
