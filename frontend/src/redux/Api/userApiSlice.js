import { apiSlice } from "./apiSlice.js";
import { USERS_URL } from "../constants.js";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        console.log("Raw login response:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("Login error response:", response);
        return response;
      },
    }),
    getProfile: builder.query({
      query: (rollNumber) => ({
        url: `${USERS_URL}/${rollNumber}`,
        method: "GET",
      }),
    }),
    userProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    verify: builder.mutation({
      query: ({ email, code }) => ({
        url: `${USERS_URL}/verify/${email}`,
        method: "POST",
        body: { code },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useVerifyMutation,
  useGetProfileQuery,
  useUserProfileQuery,
} = userApiSlice;
