'use client';

import { useState } from 'react';
import ContactInput from './ContactInput';
import SubmitButton from './SubmitBtn';
import YourNeedsInput from './YourNeedInput';
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

const getFormspreeEndpoint = () => {
  const isProd = process.env.NODE_ENV === 'production';
  const defaultEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  if (isProd) {
    return process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT_PROD || defaultEndpoint;
  }

  return process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT_DEV || defaultEndpoint;
};

const ContactUsForm = () => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onChangeField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSuccess(false);

    const normalized = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

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
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
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

      setValues(INITIAL_VALUES);
      setErrors({});
      setIsSuccess(true);
    } catch {
      setErrors({ form: 'Submission failed. Please check your connection and try again.' });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-8">
        <ContactInput
          name="firstName"
          label="First name*"
          autoComplete="given-name"
          value={values.firstName}
          required
          error={errors.firstName}
          onChange={(value) => onChangeField('firstName', value)}
        />
        <ContactInput
          name="lastName"
          label="Last name*"
          autoComplete="family-name"
          value={values.lastName}
          required
          error={errors.lastName}
          onChange={(value) => onChangeField('lastName', value)}
        />
      </div>
      <div className="mb-4 md:mb-8">
        <ContactInput
          name="email"
          label="Email*"
          type="email"
          autoComplete="email"
          value={values.email}
          required
          error={errors.email}
          onChange={(value) => onChangeField('email', value)}
        />
      </div>
      <div className="mb-4 md:mb-8">
        <YourNeedsInput
          value={values.message}
          error={errors.message}
          onChange={(value) => onChangeField('message', value)}
        />
      </div>

      {errors.form ? <p className="mb-3 text-main-xs text-[#ff8d8d]">{errors.form}</p> : null}
      {isSuccess ? (
        <p className="mb-3 text-main-xs text-accent">Thanks! Your message has been sent.</p>
      ) : null}

      <SubmitButton isPending={isPending} />
    </form>
  );
};

export default ContactUsForm;
