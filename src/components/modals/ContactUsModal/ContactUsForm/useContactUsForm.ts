'use client';

import { useEffect, useState } from 'react';
import { projectSubmissionSchema } from '@/shared/validation';

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

const getFormspreeEndpoint = () => {
  const isProd = process.env.NODE_ENV === 'production';
  const defaultEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  if (isProd) {
    return process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT_PROD || defaultEndpoint;
  }

  return process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT_DEV || defaultEndpoint;
};

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

    const endpoint = getFormspreeEndpoint();
    if (!endpoint) {
      setErrors({ form: 'Form submit endpoint is not configured yet' });
      return;
    }

    const formData = new FormData();
    formData.append('firstName', normalized.firstName);
    formData.append('lastName', normalized.lastName);
    formData.append('email', normalized.email);
    formData.append('message', normalized.message);

    setIsPending(true);
    try {
      // Formspree accepts multipart FormData, which keeps payload shape future-proof.
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
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
