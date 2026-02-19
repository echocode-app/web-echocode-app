import Image from 'next/image';

interface CloseBtnProps {
  onClose: () => void;
}

const CloseBtn = ({ onClose }: CloseBtnProps) => {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close modal"
      title="Close modal"
      className="relative flex justify-center items-center w-8.5 h-11 cursor-pointer
      rounded-secondary transition-[color,opacity] duration-main hover:color-gray7 hover:opacity-60"
    >
      <Image src={'/UI/close.svg'} alt="Close" fill />
    </button>
  );
};

export default CloseBtn;
