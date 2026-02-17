import FooterNavLink from './FooterNavLink';
import FooterSocialLink from './FooterSocialLink';
import EmailLink from '../EmailLink';
import Link from 'next/link';
import SocailLinks from './SocialLinks';
import Logo from '@/components/UI/Logo';

const FooterNavigation = () => (
  <div className="mb-12 py-8 px-4 lg:px-10 flex flex-wrap justify-between gap-8 bg-white rounded-base">
    {/* <div className="flex gap-20 justify-between"> */}
    <Link href={'/'} className="flex flex-col gap-2.5 items-center z-10">
      <Logo />
      <p className="font-title text-accent">Echocode.app</p>
    </Link>
    <div className="flex justify-between gap-4 mb-8 md:mb-0 max-w-143.5">
      <div>
        <h3 className="mb-6 font-title text-[10px] text-base-gray opacity-65 tracking-[0.4px] uppercase">
          Navigation
        </h3>
        <ul className="flex flex-col gap-1 w-24 sm:w-36.5 xl:w-51">
          <FooterNavLink link="/">Home</FooterNavLink>
          <FooterNavLink link="/portfolio">Portfolio</FooterNavLink>
        </ul>
      </div>
      <div>
        <h3 className="mb-6 font-title text-[10px] text-base-gray opacity-65 tracking-[0.4px] uppercase">
          products
        </h3>
        <ul className="flex flex-col gap-1 w-24 sm:w-36.5 xl:w-51">
          <FooterNavLink link="/portfolio">Cleaning-APP</FooterNavLink>
          <FooterNavLink link="/portfolio">E-commerce</FooterNavLink>
          <FooterNavLink link="/portfolio">Food & Drinks</FooterNavLink>
        </ul>
      </div>
      <div>
        <h3 className="mb-6 font-title text-[10px] text-base-gray opacity-65 tracking-[0.4px] uppercase">
          Subscribe to
        </h3>
        <ul className="flex flex-col gap-1 w-36.5 xl:w-34">
          <FooterSocialLink link="http://linkedin.com/company/echocode">
            LinkedIn →
          </FooterSocialLink>
          <FooterSocialLink link="http://instagram.com/echocode.app">Instagram →</FooterSocialLink>
          <FooterSocialLink link="https://t.me/echocode_app">Telegram →</FooterSocialLink>
        </ul>
      </div>
    </div>
    {/* </div> */}

    <div className="lg:flex lg:flex-col lg:justify-between">
      <EmailLink />
      <SocailLinks />
    </div>
  </div>
);

export default FooterNavigation;
