import ContactCTA from '@/components/UI/cta/ContactCTA'
import Image from 'next/image'

const HeroCTASection = () => {
  return (
    <div className="my-10 flex justify-center">
      <div className="relative inline-flex">

        {/* Background image */}
        <Image
          src="/UI/backgrounds/circles-bg.png"
          alt=""
          width={400}
          height={168}
          className="
            absolute
            left-1/2
            -translate-x-1/2
            -bottom-4
            w-[170%]
            max-w-170
            pointer-events-none
            opacity-60
            -z-10
          "
        />

        <ContactCTA />

      </div>
    </div>
  )
}

export default HeroCTASection
