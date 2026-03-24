interface SectionGradientLineProps {
  height: string;
  container?: 'section' | 'project';
}

const CONTAINER_CLASS_NAMES = {
  section: 'mx-auto px-4 max-w-316 md:px-8',
  project: 'mx-auto px-4 max-w-266 md:px-8',
} as const;

const SectionGradientLine = ({ height, container = 'section' }: SectionGradientLineProps) => {
  return (
    <div className={`${CONTAINER_CLASS_NAMES[container]} mb-6`}>
      <div
        className="bg-section-gradient-animated w-full mx-auto"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

export default SectionGradientLine;
