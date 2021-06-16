import { CookieKey } from './cookieKeys';

export abstract class CookieAgent {
  public static setCookie(key: CookieKey, data: any, days?: number): void {
    if (!days) {
      days = 365 * 20;
    }

    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    const expires = '; expires=' + date.toUTCString();

    document.cookie = key + '=' + data + expires + '; path=/';
  }

  public static getCookie(key: CookieKey): any {
    const nameLenPlus = key.length + 1;
    return (
      document.cookie
        .split(';')
        .map((c) => c.trim())
        .filter((cookie) => {
          return cookie.substring(0, nameLenPlus) === `${key}=`;
        })
        .map((cookie) => {
          return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null
    );
  }

  public static eraseCookie(key: CookieKey): void {
    CookieAgent.setCookie(key, '', -1);
  }
}
