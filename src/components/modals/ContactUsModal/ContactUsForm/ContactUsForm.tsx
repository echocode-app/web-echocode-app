'use client';

import ContactInput from './ContactInput';
import SubmitButton from './SubmitBtn';
import YourNeedsInput from './YourNeedInput';
import { useContactUsForm } from './useContactUsForm';

type ContactUsFormProps = {
  isSuccessRoute?: boolean;
  onSuccessSubmit?: () => void;
};

const ContactUsForm = ({ isSuccessRoute = false, onSuccessSubmit }: ContactUsFormProps) => {
  const { values, errors, isPending, isSuccess, isFormLocked, onSubmit, onChangeField, onBlurField } =
    useContactUsForm({
      isSuccessRoute,
      onSuccessSubmit,
    });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-1 sm:mb-2 md:mb-3">
        <ContactInput
          name="firstName"
          label="First name*"
          autoComplete="given-name"
          value={values.firstName}
          required
          disabled={isFormLocked}
          error={errors.firstName}
          onBlur={() => onBlurField('firstName')}
          onChange={(value) => onChangeField('firstName', value)}
        />
        <ContactInput
          name="lastName"
          label="Last name*"
          autoComplete="family-name"
          value={values.lastName}
          required
          disabled={isFormLocked}
          error={errors.lastName}
          onBlur={() => onBlurField('lastName')}
          onChange={(value) => onChangeField('lastName', value)}
        />
      </div>
      <div className="mb-1 sm:mb-2 md:mb-3">
        <ContactInput
          name="email"
          label="Email*"
          type="email"
          autoComplete="email"
          value={values.email}
          required
          disabled={isFormLocked}
          error={errors.email}
          onBlur={() => onBlurField('email')}
          onChange={(value) => onChangeField('email', value)}
        />
      </div>
      <div className="mb-1 sm:mb-2 md:mb-3">
        <YourNeedsInput
          value={values.message}
          disabled={isFormLocked}
          error={errors.message}
          onBlur={() => onBlurField('message')}
          onChange={(value) => onChangeField('message', value)}
        />
      </div>

      {errors.form ? (
        <div className="mb-2 sm:mb-3" aria-live="polite">
          <p className="text-main-xs text-[#ff8d8d]">{errors.form}</p>
        </div>
      ) : null}

      <SubmitButton isPending={isPending} isSuccess={isSuccess} />
      {isSuccess ? (
        <p className="mt-4 sm:mt-5 md:mt-8 text-center text-accent font-main font-medium text-[20px] leading-[140%]">
          THANK YOU!
        </p>
      ) : null}
    </form>
  );
};

export default ContactUsForm;
