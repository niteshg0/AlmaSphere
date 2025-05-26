import { apiSlice } from "./apiSlice.js";
import { CONNECTUSER_URL } from "../constants.js";

export const connectUserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Connection Requests
    createConnection: builder.mutation({
      query: (userId) => ({
        url: `${CONNECTUSER_URL}/connect/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ['ConnectionRequests', 'ConnectionStatus'],
    }),
    
    getConnectionRequests: builder.query({
      query: () => ({
        url: `${CONNECTUSER_URL}/requests`,
        method: "GET",
      }),
      providesTags: ['ConnectionRequests'],
    }),
    
    acceptConnection: builder.mutation({
      query: (requestId) => ({
        url: `${CONNECTUSER_URL}/accept/${requestId}`,
        method: "PUT",
      }),
      invalidatesTags: ['ConnectionRequests', 'Connections', 'ConnectionStatus'],
    }),
    
    rejectConnection: builder.mutation({
      query: (requestId) => ({
        url: `${CONNECTUSER_URL}/reject/${requestId}`,
        method: "PUT",
      }),
      invalidatesTags: ['ConnectionRequests', 'ConnectionStatus'],
    }),

    // Connection Management
    getConnectionStatus: builder.query({
      query: (userId) => ({
        url: `${CONNECTUSER_URL}/getStatus/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => 
        [{ type: 'ConnectionStatus', id: userId }],
    }),
    
    removeConnection: builder.mutation({
      query: (userId) => ({
        url: `${CONNECTUSER_URL}/remove/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Connections', 'ConnectionStatus'],
    }),

    // User Connections
    getUserConnections: builder.query({
      query: () => ({
        url: CONNECTUSER_URL,
        method: "GET",
      }),
      providesTags: ['Connections'],
    }),
  }),
});

export const {
  useCreateConnectionMutation,
  useGetConnectionRequestsQuery,
  useAcceptConnectionMutation,
  useRejectConnectionMutation,
  useGetConnectionStatusQuery,
  useRemoveConnectionMutation,
  useGetUserConnectionsQuery,
} = connectUserApiSlice;