export const HERO_BACKGROUND_READY_EVENT = 'hero:background-ready';

export type HeroReadyWindow = Window & {
  __ECHOCODE_HERO_READY__?: boolean;
};

export function markHeroBackgroundReady() {
  if (typeof window === 'undefined') {
    return;
  }

  (window as HeroReadyWindow).__ECHOCODE_HERO_READY__ = true;
  window.dispatchEvent(new Event(HERO_BACKGROUND_READY_EVENT));
}
