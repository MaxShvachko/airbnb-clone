const API_PREFIX = '/api';

export const API_ROUTES = {
  REGISTER: `${API_PREFIX}/register`,
  LISTINGS: `${API_PREFIX}/listings`,
  FAVORITES: (id?: string) => `${API_PREFIX}/favorites/${id}`,
  RESERVATIONS: (id?: string) => `${API_PREFIX}/reservations${id ? `/${id}` : ''}`
};

export const ROUTES = {
  HOME: '/',
  LISTINGS: (id?: string) => `/listings/${id}`,
  TRIPS: '/trips',
  RESERVATIONS: '/reservations',
  FAVORITES: '/favorites'
};
