type SubmitBtnProps = {
  isPending: boolean;
  isSuccess: boolean;
};

const SubmitBtn = ({ isPending, isSuccess }: SubmitBtnProps) => {
  const isDisabled = isPending || isSuccess;
  const baseText = !isPending && !isSuccess;

  return (
    <div>
      <button
        type="submit"
        disabled={isDisabled}
        className={`relative block w-full py-3 md:py-4 font-title text-white text-title-base rounded-secondary shadow-button overflow-hidden
          transition-[color,background-color,box-shadow,opacity,transform] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70
          ${
            isSuccess
              ? 'bg-success cursor-default'
              : 'bg-main-gradient cursor-pointer before:absolute before:inset-0 before:bg-accent before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:before:opacity-100 hover:shadow-main focus-visible:shadow-main'
          } disabled:opacity-100`}
      >
        <span className="relative z-10 block h-6">
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-main ease-out ${
              baseText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
            }`}
          >
            Send message
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-main ease-out ${
              isPending ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
          >
            Sending...
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-main ease-out ${
              isSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            } text-[12px] leading-tight sm:text-[13px] md:text-title-base md:leading-normal px-2`}
          >
            Request received. We will talk soon.
          </span>
        </span>
      </button>
    </div>
  );
};

export default SubmitBtn;
