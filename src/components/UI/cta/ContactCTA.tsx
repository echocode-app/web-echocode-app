import ContactButton from '@/components/UI/buttons/ContactButton';
import Image from 'next/image';

const ContactCTA = () => {
  return (
    <ContactButton href="/contact">
      <div className="flex gap-2 md:gap-4 items-center justify-between">
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
          w-10 h-10 md:w-14 md:h-14 
          rounded-full bg-black
          border-2 border-accent
          md:group-hover:border-accent
        "
        >
          <Image src="/UI/contact.svg" width={26} height={22} alt="Contact" />
        </span>
      </div>
    </ContactButton>
  );
};

export default ContactCTA;
