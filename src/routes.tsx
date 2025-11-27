import { PAGES } from './configs/pages.config';

/**
 * An Array of routes that are used for authentication
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes = [PAGES.HOME, PAGES.ISSUES, PAGES.HOME];

/**
 * An Array of routes that are used for authentication
 * These routes will redirect logged in users to the default login redirect
 * @type {string[]}
 */
export const authRoutes = [PAGES.SIGN_IN, PAGES.SIGN_UP];

/**
 * The prefix for API auth routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default route to redirect logged in users to
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = PAGES.ISSUES;
