import FooterNavigation from './FooterNavigation';
import License from './License';

const Footer = () => {
  return (
    <footer className="pt-10 pb-6">
      <div className="max-w-356 mx-auto px-4 md:px-8 ">
        <FooterNavigation />
        <License />
      </div>
    </footer>
  );
};

export default Footer;
