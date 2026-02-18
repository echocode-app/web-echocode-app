type ContactInputProps = {
  label: string;
  name: string;
  value: string;
  type?: 'text' | 'email';
  autoComplete?: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
};

export default function ContactInput({
  label,
  name,
  value,
  type = 'text',
  autoComplete,
  required = false,
  error,
  onChange,
}: ContactInputProps) {
  return (
    <div className="relative w-full">
      {!value && (
        <span
          className="
            pointer-events-none
            absolute left-4 top-1/2 -translate-y-1/2  text-white text-[10px] font-title
          "
        >
          {label}
        </span>
      )}

      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full h-14
          px-4
           hover:border-accent focus:border-accent duration-main transition-colors
          border border-white rounded-secondary
          bg-transparent
          text-white text-[10px] font-title
          outline-none
        "
      />
      {error ? <p className="mt-1 text-main-xs text-[#ff8d8d]">{error}</p> : null}
    </div>
  );
}
