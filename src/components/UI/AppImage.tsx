import NextImage, { type ImageProps } from 'next/image';

import { withBasePath } from '@/shared/url/withBasePath';

const AppImage = (props: ImageProps) => {
  const normalizedSrc = typeof props.src === 'string' ? withBasePath(props.src) : props.src;

  return <NextImage {...props} src={normalizedSrc} />;
};

export default AppImage;
