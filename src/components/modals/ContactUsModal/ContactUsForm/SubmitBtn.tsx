type SubmitBtnProps = {
  isPending: boolean;
};

const SubmitBtn = ({ isPending }: SubmitBtnProps) => {
  return (
    <div>
      <button
        type="submit"
        disabled={isPending}
        className=" block w-full py-3 md:py-4 font-title text-white text-title-base
          bg-main-gradient rounded-secondary shadow-button cursor-pointer disabled:opacity-70"
      >
        {isPending ? 'Sending...' : 'Send message'}
      </button>
    </div>
  );
};

export default SubmitBtn;
