import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getCookie,
  setCookie,
  removeAuthCookies
} from '../utils/cookes';
import { setToken } from '../store/slices/authSlice';
import { APIURL } from './apiURL';


const pokemonBaseQuery = fetchBaseQuery({
  baseUrl: APIURL.POKEMON_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = getCookie('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const authBaseQuery = fetchBaseQuery({
  baseUrl: APIURL.AUTH_URL,
  credentials: 'include',
})

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await pokemonBaseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    const refreshResult = await authBaseQuery(
      { url: '/auth/refresh', method: 'GET' },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      const { access_token } = refreshResult.data as { access_token: string };
      setCookie('access_token', access_token, 3600);
      api.dispatch(setToken(access_token));
      result = await pokemonBaseQuery(args, api, extraOptions);
    } else {
      removeAuthCookies();
      api.dispatch(setToken(null));
    }
  }

  return result;
};