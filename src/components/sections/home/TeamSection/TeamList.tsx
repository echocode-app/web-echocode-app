import TeamItem from './TeamItem';

const TeamList = () => {
  return (
    <ul className="flex flex-wrap justify-between gap-y-7 gap-x-5">
      <TeamItem title={'Passion'} />
      <TeamItem title={'Experience'} />
      <TeamItem title={'Friendly Staff'} />
      <TeamItem title={'Innovation'} />
      <TeamItem title={'The Best!'} />
    </ul>
  );
};

export default TeamList;
