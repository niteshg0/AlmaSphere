import { apiSlice } from "./apiSlice.js";
import { CONNECTUSER_URL } from "../constants.js";

export const connectUserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConnectedUser: builder.query({
      query: (userId) => ({
        url: `${CONNECTUSER_URL}/connection/${userId}`,
        method: "GET",
      }),
    }),
    createConnection: builder.mutation({
      query: (data) => ({
        url: `${CONNECTUSER_URL}/connect`,
        method: "POST",
        body: data,
      }),
    }),
    acceptConnection: builder.mutation({
      query: (id) => ({
        url: `${CONNECTUSER_URL}/accept/${id}`,
        method: "PUT",
      }),
    }),
    rejectConnection: builder.mutation({
      query: (id) => ({
        url: `${CONNECTUSER_URL}/reject/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useAcceptConnectionMutation,
  useCreateConnectionMutation,
  useGetConnectedUserQuery,
  useRejectConnectionMutation,
} = connectUserApiSlice;
