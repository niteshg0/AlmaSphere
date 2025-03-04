import { apiSlice } from "./apiSlice.js";
import { JOBDETAIL_URL } from "../constants.js";

export const jobDetailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => JOBDETAIL_URL,
      providesTags:["jobDetail"]
    }),
    createJob: builder.mutation({
      query: (data) => ({
        url : JOBDETAIL_URL,
        method:"POST",
        body:data
      })
    }),
    getOneJobDetail: builder.query({
      query: (jobId) => ({
        url: `${JOBDETAIL_URL}/${jobId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
    useGetAllJobsQuery,
    useCreateJobMutation,
    useGetOneJobDetailQuery
} = jobDetailApiSlice;
