import { apiSlice } from "./apiSlice.js";
import { SEARCH_URL } from "../constants.js";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.mutation({  // Changed from builder.query to builder.mutation
      query: (query) => ({
        url: SEARCH_URL,
        method: "POST",  // Changed from GET to POST
        body: { query: query },  // Send query in the request body
      }),
      // Cache search results for 5 minutes
      keepUnusedDataFor: 300,
      // Transform the response to match the backend structure
      transformResponse: (response) => {
        return response.users || [];
      },
      // Provide tags for cache invalidation if needed
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Search', id: _id })),
              { type: 'Search', id: 'LIST' },
            ]
          : [{ type: 'Search', id: 'LIST' }],
    }),
  }),
});

export const { useSearchMutation } = searchApiSlice;  // Changed from usequery to useSearchMutation
