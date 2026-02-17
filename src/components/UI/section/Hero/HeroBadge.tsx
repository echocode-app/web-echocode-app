const HeroBadge = () => {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex rounded-(--radius-secondary)">
        {/* Glow */}
        <div className="hero-badge-glow" />

        {/* Badge */}
        <div
          className="
            hero-badge-border
            relative
            z-10
            inline-flex
            items-center
            justify-center
            px-6.5
            py-3
            rounded-(--radius-secondary)
            shadow-[0px_2px_8px_rgba(255,255,255,0.12)]
            border border-transparent
          "
        >
          <span
            className="
              hero-badge-text
              font-title
              font-bold
              text-(--text-title-base)
              leading-5
            "
          >
            Echocode.app
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroBadge;
