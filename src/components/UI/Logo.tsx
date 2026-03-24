import Image from '@/components/UI/AppImage';

const Logo = () => {
  return (
    <div className="relative w-17 h-15">
      <Image src="/UI/logo.png" alt="Logo" fill sizes="68px" />
    </div>
  );
};

export default Logo;
