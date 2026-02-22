import ContactButton from '@/components/UI/buttons/ContactButton';
import Image from '@/components/UI/AppImage';

const ContactCTA = () => {
  return (
    <ContactButton href="/contact">
      <div className="relative z-10 flex gap-2 md:gap-4 items-center justify-between">
        <span
          className="
          font-title font-bold uppercase tracking-[0.04em] text-white
        "
        >
          Contact us
        </span>

        <span
          className="
          flex items-center justify-center 
          w-14 h-14 
          rounded-full bg-black
          border-2 border-accent
          transition-colors duration-500 ease-out
          md:group-hover:border-accent
          md:group-focus-visible:border-accent
        "
        >
          <Image src="/UI/contact.svg" width={26} height={22} alt="Contact" className="w-6.5 h-5.5" />
        </span>
      </div>
    </ContactButton>
  );
};

export default ContactCTA;
