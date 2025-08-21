import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cafe-admin-api-production.up.railway.app/',
    credentials: 'include',
  }),
  endpoints: (buil) => ({
    login: buil.mutation({
      query: (credentials) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: buil.mutation({
      query: (userData) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: userData,
      }),
    }),
    refresh: buil.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
    }),
  })
});

export const { useLoginMutation, useRegisterMutation, useRefreshMutation } = authAPI;