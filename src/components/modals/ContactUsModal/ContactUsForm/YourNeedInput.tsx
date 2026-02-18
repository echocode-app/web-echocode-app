type YourNeedsInputProps = {
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

const YourNeedsInput = ({ value, error, onChange }: YourNeedsInputProps) => {
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
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Mobile app design for a fintech startup"
        className="block pt-6.5 pb-2 pl-4 pr-6 border rounded-secondary leading-3.5 w-full min-h-14 resize-y
         hover:border-accent focus:border-accent duration-main transition-colors
       outline-0 text-main-xs font-main text-white placeholder:text-primary-gray  border-white"
      />
      {error ? <p className="mt-1 text-main-xs text-[#ff8d8d]">{error}</p> : null}
    </div>
  );
};

export default YourNeedsInput;
