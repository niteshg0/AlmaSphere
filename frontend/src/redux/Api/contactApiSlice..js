import { apiSlice } from "./apiSlice.js";
import { CONTACT_US_URL } from "../constants.js";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    ContactMessage: builder.mutation({
        query: (data)=> ({
            url: `${CONTACT_US_URL}/`,
            method: "POST",
            body: data,
        })
    })
  }),
});

export const {
  useContactMessageMutation
} = contactApiSlice;
