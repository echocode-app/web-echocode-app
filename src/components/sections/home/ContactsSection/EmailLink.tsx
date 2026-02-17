import Image from 'next/image';
import Link from 'next/link';

const EmailLink = () => {
  return (
    <Link
      href={'mailto:hello@echocode.com'}
      target="blank"
      className="group flex items-center gap-3 px-3 py-2 border-l border-accent"
    >
      <div
        className="flex justify-center items-center w-10 h-10 bg-base-gray rounded-full 
        "
      >
        <div className="relative w-5.5 h-5">
          <Image src={'/UI/social-icons/email.svg'} alt="Email" fill />
        </div>
      </div>
      <p
        className="font-title text-title-sm sm:text-title-base underline
         group-hover:text-accent duration-main"
      >
        hello<span className="text-[9px] ">@</span>echocode.com
      </p>
    </Link>
  );
};

export default EmailLink;
