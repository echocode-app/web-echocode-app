'use client';

import { useEffect, useState } from 'react';
import { projectSubmissionSchema } from '@/shared/validation';
import { FORM_SUBMIT_URL, SITE_HOST, SITE_ID } from '@/lib/siteIngest';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues | 'form', string>>;

const INITIAL_VALUES: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

const normalizeValues = (values: FormValues) => ({
  firstName: values.firstName.trim(),
  lastName: values.lastName.trim(),
  email: values.email.trim(),
  message: values.message.trim(),
});

const getFieldError = (field: keyof FormValues, candidateValues: FormValues) => {
  const normalized = normalizeValues(candidateValues);
  const validationResult = projectSubmissionSchema.safeParse({
    firstName: normalized.firstName,
    lastName: normalized.lastName,
    email: normalized.email,
    message: normalized.message ? normalized.message : undefined,
  });

  if (validationResult.success) {
    return undefined;
  }

  return validationResult.error.issues.find((issue) => issue.path[0] === field)?.message;
};

type UseContactUsFormArgs = {
  isSuccessRoute?: boolean;
  onSuccessSubmit?: () => void;
};

export const useContactUsForm = ({ isSuccessRoute = false, onSuccessSubmit }: UseContactUsFormArgs) => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(isSuccessRoute);
  const isFormLocked = isPending || isSuccess;

  useEffect(() => {
    setIsSuccess(isSuccessRoute);
  }, [isSuccessRoute]);

  const onChangeField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) {
        return { ...prev, form: undefined };
      }

      const nextValues = { ...values, [field]: value };
      return { ...prev, [field]: getFieldError(field, nextValues), form: undefined };
    });
  };

  const onBlurField = (field: keyof FormValues) => {
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
      firstName: normalized.firstName,
      lastName: normalized.lastName,
      email: normalized.email,
      message: normalized.message ? normalized.message : undefined,
    });

    const nextErrors: FormErrors = {};
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormValues;
        if (!nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      });
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (!FORM_SUBMIT_URL) {
      setErrors({ form: 'Form submit endpoint is not configured yet' });
      return;
    }

    const payload = {
      siteId: SITE_ID,
      siteHost: SITE_HOST,
      source: 'website' as const,
      firstName: normalized.firstName,
      lastName: normalized.lastName,
      email: normalized.email,
      message: normalized.message || undefined,
    };

    setIsPending(true);
    try {
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
            payload?.errors?.[0]?.message ||
            payload?.error ||
            payload?.message ||
            payload?.title;

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
    } catch {
      setErrors({ form: 'Submission failed. Please check your connection and try again.' });
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
    onBlurField,
  };
};
