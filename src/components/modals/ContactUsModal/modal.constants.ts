export const CONTACT_PATH = '/contact';
export const CONTACT_SUCCESS_PATH = '/contact/success';
export const PORTFOLIO_PATH = '/portfolio';
export const PORTFOLIO_CONTACT_PATH = '/portfolio/contact';
export const PORTFOLIO_SUCCESS_PATH = '/portfolio/success';

export const CONTACT_SUCCESS_FLAG = 'contact_success_allowed';
export const CONTACT_SCROLL_Y_KEY = 'contact_modal_scroll_y';
export const CONTACT_RETURN_PATH_KEY = 'contact_modal_return_path';

export const SUCCESS_AUTO_CLOSE_MS = 3000;
export const SUCCESS_CLOSE_ANIMATION_MS = 280;
export const SCROLL_RESTORE_DELAY_MS = 80;

export interface ContactRouteConfig {
  returnPath: string;
  contactPath: string;
  successPath: string;
}

export const DEFAULT_CONTACT_ROUTE_CONFIG: ContactRouteConfig = {
  returnPath: '/',
  contactPath: CONTACT_PATH,
  successPath: CONTACT_SUCCESS_PATH,
};

export const PORTFOLIO_CONTACT_ROUTE_CONFIG: ContactRouteConfig = {
  returnPath: PORTFOLIO_PATH,
  contactPath: PORTFOLIO_CONTACT_PATH,
  successPath: PORTFOLIO_SUCCESS_PATH,
};

export const CONTACT_ROUTE_CONFIGS: ContactRouteConfig[] = [
  PORTFOLIO_CONTACT_ROUTE_CONFIG,
  DEFAULT_CONTACT_ROUTE_CONFIG,
];
