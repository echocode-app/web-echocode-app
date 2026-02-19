type ContactInputProps = {
  label: string;
  name: string;
  value: string;
  type?: 'text' | 'email';
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export default function ContactInput({
  label,
  name,
  value,
  type = 'text',
  autoComplete,
  required = false,
  disabled = false,
  error,
  onChange,
  onBlur,
}: ContactInputProps) {
  return (
    <div className="relative w-full">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      {!value && (
        <span
          className="
            pointer-events-none h-11.5
            absolute p-4 flex items-center text-white text-[10px] leading-none font-title
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
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-describedby={`${name}-error`}
        className="
          w-full h-11.5
          p-4
           hover:border-accent focus:border-accent duration-main transition-colors
          border border-white rounded-secondary
          bg-transparent
          text-gray-90 text-[14px] font-main
          disabled:opacity-70 disabled:cursor-not-allowed
          outline-none
        "
      />
      <p
        id={`${name}-error`}
        className={`min-h-4 text-main-xs leading-4 transition-opacity ${error ? 'text-[#ff8d8d] opacity-100' : 'opacity-0'}`}
      >
        {error || ' '}
      </p>
    </div>
  );
}
