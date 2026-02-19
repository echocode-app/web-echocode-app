type YourNeedsInputProps = {
  value: string;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

const YourNeedsInput = ({ value, disabled = false, error, onChange, onBlur }: YourNeedsInputProps) => {
  return (
    <div className="relative">
      <label
        htmlFor="needs"
        className=" absolute top-2 left-4
       text-[10px] font-title text-white border-white"
      >
        About your needs...
      </label>
      <textarea
        id="needs"
        name="needs"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-describedby="needs-error"
        aria-invalid={error ? true : undefined}
        placeholder="e.g. Mobile app design for a fintech startup"
        className="block pt-6.5 pb-2 pl-4 pr-6 border rounded-secondary leading-3.5 w-full min-h-14 resize-y
         hover:border-accent focus:border-accent duration-main transition-colors
       outline-0 text-[14px] font-main text-gray-90 placeholder:text-primary-gray border-white
       disabled:opacity-70 disabled:cursor-not-allowed"
      />
      <p
        id="needs-error"
        className={`min-h-4 text-main-xs leading-4 transition-opacity ${error ? 'text-[#ff8d8d] opacity-100' : 'opacity-0'}`}
      >
        {error || ' '}
      </p>
    </div>
  );
};

export default YourNeedsInput;
