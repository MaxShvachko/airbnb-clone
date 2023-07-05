import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ROUTES } from './app/constants/routes';

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
}

export const config = {
  matcher: [
    ROUTES.TRIPS,
    ROUTES.RESERVATIONS,
    ROUTES.PROPERTIES,
    ROUTES.FAVORITES
  ]
};
