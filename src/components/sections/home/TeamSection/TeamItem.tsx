interface TeamItemProps {
  title: string;
}

const TeamItem = ({ title }: TeamItemProps) => {
  return <li className="px-3 py-2 font-title border-l border-accent w-58.5">{title}</li>;
};

export default TeamItem;
