import SocialLinkItem from './SocialLinkItem';
import EmailLink from './EmailLink';

const socialLinks = [
  {
    image: '/UI/social-icons/linkedin.svg',
    title: 'LinkedIn',
    link: 'http://linkedin.com/company/echocode',
    width: '22',
  },
  {
    image: '/UI/social-icons/insta.svg',
    title: 'Instagram',
    link: 'http://instagram.com/echocode.app',
    width: '18',
  },
  {
    image: '/UI/social-icons/telegram.svg',
    title: 'Telegram channel',
    link: 'https://t.me/echocode_app',
    width: '18',
  },
];

const SocialLinkList = () => {
  return (
    <ul className="flex flex-col md:flex-row gap-10 items-start justify-start md:justify-center xl:justify-between  flex-wrap">
      {socialLinks.map((item, i) => (
        <SocialLinkItem key={i} {...item} />
      ))}
      <li>
        <EmailLink />
      </li>
    </ul>
  );
};

export default SocialLinkList;
