const CareerList = () => {
  return (
    <ul className="flex flex-wrap items-center gap-5 justify-center mb-8">
      <li className="p-5 w-147.5 border-2 border-[#343434] rounded-secondary">
        <h3 className="mb-3 font-title text-title-base md:text-[20px] text-center">
          Got a Partnership Idea?
        </h3>
        <p className="max-w-105 mx-auto text-main-sm md:text-main-base text-center">
          Have a partnership proposal? Leave your contacts, we will contact you soon!
        </p>
      </li>
      <li className="p-5 w-147.5 border-2 border-[#343434] rounded-secondary">
        <h3 className="mb-3 font-title text-title-base md:text-[20px] text-center">
          Build the Future With Us
        </h3>
        <p className="max-w-105 mx-auto text-main-sm md:text-main-base text-center">
          {"We're always looking for developers, marketers, designers and other brilliant people!"}
        </p>
      </li>
    </ul>
  );
};

export default CareerList;
