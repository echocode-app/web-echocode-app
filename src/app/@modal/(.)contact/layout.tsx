import { ReactNode } from 'react';
import ContactUsModal from '@/components/modals/ContactUsModal';

export default function ContactModalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ContactUsModal />
    </>
  );
}
