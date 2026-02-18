import clsx from 'clsx';

interface TeamItemProps {
  title: string;
  active?: boolean;
}

const TeamItem = ({ title, active }: TeamItemProps) => {
  return (
    <li
      className={clsx(
        'px-3 py-2 font-title border-l border-accent w-58.5 duration-main',
        active ? 'text-accent' : 'text-white',
      )}
    >
      {title}
    </li>
  );
};

export default TeamItem;
