export { default } from 'next-auth/middleware';

import { ROUTES } from './app/constants/routes';

export const config = {
  matcher: [
    ROUTES.TRIPS,
    ROUTES.RESERVATIONS,
    ROUTES.PROPERTIES,
    ROUTES.FAVORITES
  ]
};
