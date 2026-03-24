import ProjectItem from './ProjectItem';

interface ProjectListProps {
  list: { image: string; title: string; id: string; platforms: string[] }[];
}

const ProjectList = ({ list }: ProjectListProps) => {
  return (
    <ul className="flex flex-col gap-10 md:gap-25 w-full">
      <ProjectItem {...list[0]}>
        <p>
          Digitize your cleaning business with an app for{' '}
          <span className="text-accent">fast booking and scheduling</span>. Deliver a seamless
          customer journey and <span className="text-accent">grow brand loyalty</span>.
        </p>
      </ProjectItem>
      <ProjectItem {...list[1]}>
        <p>
          Boost your sales with a smart online shop.{' '}
          <span className="text-accent">Grow your reach</span> and make shopping simple and
          engaging.
        </p>
      </ProjectItem>
      <ProjectItem {...list[2]}>
        <p>
          Strengthen your restaurant or delivery service with an app for{' '}
          <span className="text-accent">orders and tracking</span>. Offer clients a{' '}
          <span className="text-accent">smooth experience</span> that drives repeat business.
        </p>
      </ProjectItem>
    </ul>
  );
};

export default ProjectList;
