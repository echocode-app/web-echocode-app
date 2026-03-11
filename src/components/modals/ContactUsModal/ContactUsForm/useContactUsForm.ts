'use client';

import { useEffect, useState } from 'react';

import { projectSubmissionSchema } from '@/shared/validation';
import { FORM_SUBMIT_URL, SITE_ID } from '@/lib/siteIngest';

import {
  initAttachmentUpload,
  isFormSubmitConfigured,
  type UploadedAttachmentPayload,
} from './contactForm.api';
import { ALLOWED_ATTACHMENT_MIME_TYPES, MAX_ATTACHMENT_SIZE_BYTES } from './contactForm.constants';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  attachment: File | null;
};

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName | 'form', string>>;

const INITIAL_VALUES: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  attachment: null,
};

const normalizeValues = (values: FormValues) => ({
  firstName: values.firstName.trim(),
  lastName: values.lastName.trim(),
  email: values.email.trim(),
  message: values.message.trim(),
  attachment: values.attachment,
});

const getAttachmentError = (file: File | null) => {
  if (!file) {
    return undefined;
  }

  if (
    !ALLOWED_ATTACHMENT_MIME_TYPES.includes(
      file.type as (typeof ALLOWED_ATTACHMENT_MIME_TYPES)[number],
    )
  ) {
    return 'Unsupported file type. Use image, PDF, Office, TXT, CSV, RTF or ZIP.';
  }

  if (file.size <= 0 || file.size > MAX_ATTACHMENT_SIZE_BYTES) {
    return 'File must be smaller than 10MB';
  }

  return undefined;
};

const getFieldError = (field: FieldName, candidateValues: FormValues) => {
  if (field === 'attachment') {
    return getAttachmentError(candidateValues.attachment);
  }

  const normalized = normalizeValues(candidateValues);
  const validationResult = projectSubmissionSchema.safeParse({
    formType: 'project',
    firstName: normalized.firstName,
    lastName: normalized.lastName,
    email: normalized.email,
    needs: normalized.message ? normalized.message : undefined,
  });

  if (validationResult.success) {
    return undefined;
  }

  const issuePathByField: Record<Exclude<FieldName, 'attachment'>, string> = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    message: 'needs',
  };

  return validationResult.error.issues.find((issue) => issue.path[0] === issuePathByField[field])
    ?.message;
};

type UseContactUsFormArgs = {
  isSuccessRoute?: boolean;
  onSuccessSubmit?: () => void;
};

export const useContactUsForm = ({
  isSuccessRoute = false,
  onSuccessSubmit,
}: UseContactUsFormArgs) => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(isSuccessRoute);
  const isFormLocked = isPending || isSuccess;

  useEffect(() => {
    setIsSuccess(isSuccessRoute);
  }, [isSuccessRoute]);

  const onChangeField = (field: Exclude<FieldName, 'attachment'>, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) {
        return { ...prev, form: undefined };
      }

      const nextValues = { ...values, [field]: value };
      return { ...prev, [field]: getFieldError(field, nextValues), form: undefined };
    });
  };

  const onChangeAttachment = (file: File | null) => {
    setValues((prev) => ({ ...prev, attachment: file }));
    setErrors((prev) => ({
      ...prev,
      attachment: getAttachmentError(file),
      form: undefined,
    }));
  };

  const onBlurField = (field: FieldName) => {
    setErrors((prev) => ({ ...prev, [field]: getFieldError(field, values) }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormLocked) {
      return;
    }

    setIsSuccess(false);
    const normalized = normalizeValues(values);

    const validationResult = projectSubmissionSchema.safeParse({
      formType: 'project',
      firstName: normalized.firstName,
      lastName: normalized.lastName,
      email: normalized.email,
      needs: normalized.message ? normalized.message : undefined,
    });

    const nextErrors: FormErrors = {};
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        const issuePath = issue.path[0];

        if (issuePath === 'firstName' && !nextErrors.firstName) {
          nextErrors.firstName = issue.message;
        }
        if (issuePath === 'lastName' && !nextErrors.lastName) {
          nextErrors.lastName = issue.message;
        }
        if (issuePath === 'email' && !nextErrors.email) {
          nextErrors.email = issue.message;
        }
        if (issuePath === 'needs' && !nextErrors.message) {
          nextErrors.message = issue.message;
        }
      });
    }

    const attachmentError = getAttachmentError(normalized.attachment);
    if (attachmentError) {
      nextErrors.attachment = attachmentError;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (!isFormSubmitConfigured()) {
      setErrors({ form: 'Form submit endpoint is not configured yet' });
      return;
    }

    setIsPending(true);
    try {
      let attachmentPayload: UploadedAttachmentPayload | undefined;

      if (normalized.attachment) {
        attachmentPayload = await initAttachmentUpload(normalized.attachment);
      }

      const payload = {
        formType: 'project' as const,
        siteId: SITE_ID,
        source: SITE_ID,
        firstName: normalized.firstName,
        lastName: normalized.lastName,
        email: normalized.email,
        needs: normalized.message || undefined,
        attachment: attachmentPayload,
      };

      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let formError = 'Submission failed. Please try again.';
        const contentType = response.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
          const payload = await response.json().catch(() => null);
          const apiMessage =
            payload?.errors?.[0]?.message || payload?.error || payload?.message || payload?.title;

          if (typeof apiMessage === 'string' && apiMessage.trim()) {
            formError = apiMessage;
          }
        } else {
          const text = await response.text().catch(() => '');
          if (text.trim()) {
            formError = text.trim().slice(0, 200);
          }
        }

        if (response.status === 429) {
          formError = 'Too many requests. Please wait a bit and try again.';
        }

        setErrors({ form: formError });
        return;
      }

      setErrors({});
      setIsSuccess(true);
      onSuccessSubmit?.();
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Submission failed. Please check your connection and try again.';

      setErrors({ form: message });
    } finally {
      setIsPending(false);
    }
  };

  return {
    values,
    errors,
    isPending,
    isSuccess,
    isFormLocked,
    onSubmit,
    onChangeField,
    onChangeAttachment,
    onBlurField,
  };
};
