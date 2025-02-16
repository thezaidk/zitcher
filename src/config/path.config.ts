/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/about",
    "/hire",
    "/work"
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /home
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/signin",
    "/auth/signup",
    "/auth/select-role"
]

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_CANDIDATE = "/candidate/find-project"
export const DEFAULT_LOGIN_REDIRECT_RECRUITER = "/recruiter/find-candidate"

/**
 * The default redirect path after log out
 * @type {string}
 */
export const DEFAULT_LOGOUT_REDIRECT = "/auth/signin"