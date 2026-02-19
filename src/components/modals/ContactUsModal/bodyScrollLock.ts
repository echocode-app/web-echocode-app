let bodyLockCount = 0;
let bodyUnlockTimer: number | null = null;
let bodyOriginalOverflow: string | null = null;

export const lockBodyScroll = () => {
  if (bodyUnlockTimer) {
    window.clearTimeout(bodyUnlockTimer);
    bodyUnlockTimer = null;
  }

  if (bodyLockCount === 0) {
    if (bodyOriginalOverflow === null) {
      bodyOriginalOverflow = document.body.style.overflow || window.getComputedStyle(document.body).overflow;
    }
    document.body.style.overflow = 'hidden';
  }

  bodyLockCount += 1;
};

export const unlockBodyScroll = () => {
  bodyLockCount = Math.max(0, bodyLockCount - 1);

  if (bodyLockCount !== 0) {
    return;
  }

  bodyUnlockTimer = window.setTimeout(() => {
    if (bodyLockCount === 0) {
      document.body.style.overflow = bodyOriginalOverflow ?? '';
      bodyOriginalOverflow = null;
    }
    bodyUnlockTimer = null;
  }, 120);
};

export const forceUnlockBodyScroll = () => {
  if (bodyUnlockTimer) {
    window.clearTimeout(bodyUnlockTimer);
    bodyUnlockTimer = null;
  }

  bodyLockCount = 0;
  document.body.style.overflow = bodyOriginalOverflow ?? '';
  bodyOriginalOverflow = null;
};
