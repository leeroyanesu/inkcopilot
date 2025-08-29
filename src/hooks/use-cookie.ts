import Cookies from 'js-cookie';

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const useCookie = () => {
  const setCookie = (
    name: string, 
    value: string | object, 
    options?: CookieOptions
  ) => {
    if (typeof value === 'object') {
      Cookies.set(name, JSON.stringify(value), options);
    } else {
      Cookies.set(name, value, options);
    }
  };

  const getCookie = (name: string) => {
    const cookie = Cookies.get(name);
    if (cookie) {
      try {
        return JSON.parse(cookie);
      } catch {
        return cookie;
      }
    }
    return null;
  };

  const removeCookie = (name: string, options?: CookieOptions) => {
    Cookies.remove(name, options);
  };

  return {
    setCookie,
    getCookie,
    removeCookie,
  };
};

// Auth specific cookie management
export const useAuthCookie = () => {
  const { setCookie, getCookie, removeCookie } = useCookie();
  const AUTH_COOKIE_NAME = 'inkcopilot_auth';
  const AUTH_COOKIE_OPTIONS: CookieOptions = {
    expires: 7, // 7 days
    path: '/',
    secure: true,
    sameSite: 'strict'
  };

  const setAuthCookie = (data: {
    token: string;
    user?: object;
    expiresIn?: number;
  }) => {
    setCookie(AUTH_COOKIE_NAME, data, AUTH_COOKIE_OPTIONS);
  };

  const getAuthCookie = () => {
    return getCookie(AUTH_COOKIE_NAME);
  };

  const removeAuthCookie = () => {
    removeCookie(AUTH_COOKIE_NAME, { path: '/' });
  };

  return {
    setAuthCookie,
    getAuthCookie,
    removeAuthCookie,
  };
};
