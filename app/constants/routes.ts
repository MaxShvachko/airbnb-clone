const API_PREFIX = '/api';

export const API_ROUTES = {
  REGISTER: `${API_PREFIX}/register`,
  LISTINGS: `${API_PREFIX}/listings`,
  FAVORITES: (id?: string) => `${API_PREFIX}/favorites/${id}`
};

export const ROUTES = {
  HOME: '/',
  LISTING: (id?: string) => `/listing/${id}`
};
