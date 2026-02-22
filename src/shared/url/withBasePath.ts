const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const withBasePath = (path: string) => {
  if (!path) {
    return path;
  }

  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path;
  }

  if (!path.startsWith('/')) {
    return path;
  }

  if (!BASE_PATH) {
    return path;
  }

  return `${BASE_PATH}${path}`;
};
