import {
  ALLOWED_DOCUMENT_MIME_TYPES,
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_DOCUMENT_SIZE_BYTES,
  MAX_IMAGE_SIZE_BYTES,
  getProjectAttachmentValidationError,
  isDocumentMimeType,
  isImageMimeType,
} from '@/shared/validation/submissions.files';
import {
  projectSubmissionSchema,
  type ProjectSubmissionInput,
} from '@/shared/validation/submissions.project';

export {
  ALLOWED_DOCUMENT_MIME_TYPES,
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_DOCUMENT_SIZE_BYTES,
  MAX_IMAGE_SIZE_BYTES,
  getProjectAttachmentValidationError,
  isDocumentMimeType,
  isImageMimeType,
  projectSubmissionSchema,
  type ProjectSubmissionInput,
};
