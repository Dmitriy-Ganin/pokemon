export const setCookie = (name: string, value: string, maxAge: number) => {
  const encodedValue = encodeURIComponent(value);
  document.cookie = `${name}=${encodedValue}; max-age=${maxAge}; path=/; samesite=strict`;
};

export const getCookie = (name: string) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');
  
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    
    if (cookieName === name && cookieValue) {
      return decodeURIComponent(cookieValue);
    }
  }
  
  return null;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; max-age=-1; path=/; samesite=strict`;
};

export const getAccessToken = () => getCookie('access_token');
export const removeAuthCookies = () => removeCookie('access_token');