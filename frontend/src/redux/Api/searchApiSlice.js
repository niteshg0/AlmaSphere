import { apiSlice } from "./apiSlice.js";
import { SEARCH_URL } from "../constants.js";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: (searchQuery) => ({
        url: `${SEARCH_URL}?query=${encodeURIComponent(searchQuery)}`,
        method: "GET",
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

export const { useSearchQuery } = searchApiSlice;
