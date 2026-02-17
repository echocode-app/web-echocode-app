import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionTitle from '@/components/UI/section/SectionTitle';
import SocialLinkList from './SocialLinkList';
import ContactUsBtn from '@/components/modals/ContactUsModal/ContactUsBtn';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';

const ContactsSection = () => {
  return (
    <section className="pb-10  md:pb-30 ">
      <SectionGradientLine height="1" />
      <SectionContainer>
        <div className="flex flex-col md:flex-row  md:justify-between">
          <div className="mb-10">
            <div className="mb-3">
              <SectionTitle>Contacts</SectionTitle>
            </div>
            <p className="text-main-base max-w-97.5 lg:max-w-127.5">
              {
                "Write us by email or contact us on any available social network. You're always welcome!"
              }
            </p>
          </div>
          <div className="mb-10 md:mb-0 mx-auto md:mx-0">
            <ContactUsBtn />
          </div>
        </div>
        <SocialLinkList />
      </SectionContainer>
    </section>
  );
};

export default ContactsSection;
