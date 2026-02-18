import ExploreItem from './ExploreItem';

const ExploreList = () => {
  return (
    <ul className="flex flex-wrap justify-center gap-5 mb-10 md:mb-20">
      <div className="flex flex-wrap gap-5 md:max-w-147.5">
        <ExploreItem width={'285'}>
          <p className="max-w-30">Our budgets</p>
        </ExploreItem>
        <ExploreItem width={'285'}>
          <p className="max-w-50">Revenue-sharing model</p>
        </ExploreItem>
        <ExploreItem width={'590'}>
          <p className="max-w-90">Infrastructure to get the job done</p>
        </ExploreItem>
      </div>
      <div className="flex flex-wrap gap-5 md:max-w-147.5">
        <ExploreItem width={'285'}>
          <p className="max-w-30">Organic growth</p>
        </ExploreItem>
        <ExploreItem width={'285'}>
          <p className="max-w-30">Marketing intelligence</p>
        </ExploreItem>
        <ExploreItem width={'590'}>
          <p className="max-w-100">Our grounded expertise for your new heights</p>
        </ExploreItem>
      </div>
    </ul>
  );
};

export default ExploreList;
