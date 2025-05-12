import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from "../constants.js";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // Add this to ensure cookies are sent with cross-origin requests
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["user", "location", "academic", "professional", "contribution",'jobDetail'],
  endpoints: () => ({}),
});