'use client';

import ContactFile from './ContactFile';
import ContactInput from './ContactInput';
import SubmitButton from './SubmitBtn';
import YourNeedsInput from './YourNeedInput';
import { useContactUsForm } from './useContactUsForm';

type ContactUsFormProps = {
  isSuccessRoute?: boolean;
  onSuccessSubmit?: () => void;
};

const ContactUsForm = ({ isSuccessRoute = false, onSuccessSubmit }: ContactUsFormProps) => {
  const {
    values,
    errors,
    isPending,
    isSuccess,
    isFormLocked,
    onSubmit,
    onChangeField,
    onChangeAttachment,
    onBlurField,
  } = useContactUsForm({
    isSuccessRoute,
    onSuccessSubmit,
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col md:flex-row gap-1 md:gap-4 mb-2 md:mb-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 mb-2 md:mb-4">
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
        <ContactFile
          file={values.attachment}
          error={errors.attachment}
          disabled={isFormLocked}
          onBlur={() => onBlurField('attachment')}
          onChange={onChangeAttachment}
        />
      </div>
      <div className="mb-2 md:mb-4">
        <YourNeedsInput
          value={values.message}
          disabled={isFormLocked}
          error={errors.message}
          onBlur={() => onBlurField('message')}
          onChange={(value) => onChangeField('message', value)}
        />
      </div>

      <div className="min-h-5 mb-1" aria-live="polite">
        <p
          className={`text-main-xs text-[#ff8d8d] transition-opacity duration-main ${
            errors.form ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {errors.form ?? ' '}
        </p>
      </div>

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
