import FooterNavLink from './FooterNavLink';
import FooterSocialLink from './FooterSocialLink';
import EmailLink from '../EmailLink';
import Link from 'next/link';
import SocailLinks from './SocialLinks';
import Logo from '@/components/UI/Logo';

const FooterNavigation = () => (
  <div
    className="mb-12 py-8 px-4 lg:px-10 flex flex-wrap justify-center
   lg:flex-nowrap lg:gap-4 xl:gap-24 bg-white rounded-base"
  >
    <div className="flex w-full justify-between flex-col md:flex-row md:flex-nowrap gap-2 mb-10 lg:mb-0">
      <Link href={'/'} className="flex flex-col gap-2.5 items-center z-10 mb-6 md:mb-0">
        <Logo />
        <p className="font-title text-accent">Echocode.app</p>
      </Link>
      <div className="flex justify-center flex-wrap md:flex-nowrap mx-auto md:mx-0 md:justify-between gap-4 max-w-143.5">
        <div>
          <h3 className="mb-6 font-title text-[10px] text-base-gray opacity-65 tracking-[0.4px] uppercase">
            Navigation
          </h3>
          <ul className="flex flex-col gap-1 w-full sm:w-34 xl:w-51">
            <FooterNavLink link="/">Home</FooterNavLink>
            {/* <FooterNavLink link="/portfolio">Portfolio</FooterNavLink> */}
          </ul>
        </div>
        {/* <div>
          <h3 className="mb-6 font-title text-[10px] text-base-gray opacity-65 tracking-[0.4px] uppercase">
            products
          </h3>
          <ul className="flex flex-col gap-1 w-full sm:w-34 xl:w-51">
            <FooterNavLink link="/portfolio">Cleaning-APP</FooterNavLink>
            <FooterNavLink link="/portfolio">E-commerce</FooterNavLink>
            <FooterNavLink link="/portfolio">Food & Drinks</FooterNavLink>
          </ul>
        </div> */}
        <div>
          <h3 className="mb-6 font-title text-[10px] text-base-gray opacity-65 tracking-[0.4px] uppercase">
            Subscribe to
          </h3>
          <ul className="flex flex-col gap-1 sm:w-34 xl:w-34">
            <FooterSocialLink link="http://linkedin.com/company/echocode">
              LinkedIn →
            </FooterSocialLink>
            <FooterSocialLink link="http://instagram.com/echocode.app">
              Instagram →
            </FooterSocialLink>
            <FooterSocialLink link="https://t.me/echocode_app">Telegram →</FooterSocialLink>
          </ul>
        </div>
      </div>
    </div>
    <div className="lg:flex lg:flex-col lg:justify-between">
      <EmailLink />
      <SocailLinks />
    </div>
  </div>
);

export default FooterNavigation;
