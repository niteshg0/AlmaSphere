import { apiSlice } from "./apiSlice.js";
import { ACADMIC_URL } from "../constants.js";

export const academicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAcademicDetail: builder.mutation({
      query: (data) => ({
        url: `${ACADMIC_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getAcademicDetail: builder.query({
      query: () => ACADMIC_URL,
      providesTags: ["Academic"]
    }),
    addAchievement: builder.mutation({
      query: (data) => ({
        url: `${ACADMIC_URL}/addAchievement`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateAcademicDetailMutation,
  useGetAcademicDetailQuery,
  useAddAchievementMutation,
} = academicApiSlice;
