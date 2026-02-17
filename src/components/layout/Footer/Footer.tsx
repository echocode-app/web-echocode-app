import BottomLine from './BottomLine';
import FooterNavigation from './FooterNavigation';
import License from './License';

const Footer = () => {
  return (
    <footer className="pt-10">
      <div className="max-w-356 mx-auto px-4 md:px-8 mb-10">
        <FooterNavigation />
        <License />
      </div>
      <BottomLine />
    </footer>
  );
};

export default Footer;
