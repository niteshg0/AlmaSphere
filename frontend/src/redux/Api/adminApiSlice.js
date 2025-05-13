import { apiSlice } from "./apiSlice.js";
import {ADMIN_URL } from "../constants.js";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getCollege_data: builder.query({
        query: ()=> ({
            url: `${ADMIN_URL}/all-Data`,
            method: "GET",
        })
    }),
    postCollege_data: builder.mutation({
        query: (data)=> ({
            url: `${ADMIN_URL}/add-edit-Data`,
            method: "POST",
            body: data,
        })
     })
  }),
});

export const {
    useGetCollege_dataQuery,
    usePostCollege_dataMutation
} = adminApiSlice;
