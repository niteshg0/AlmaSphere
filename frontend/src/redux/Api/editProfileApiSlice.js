import { apiSlice } from "./apiSlice.js";
import { USERS_URL } from "../constants.js";

export const editProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addJobInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addUserJobInfo`,
        method: "POST",
        body: data,
      }),
    }),
    editJobInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateJobInfo`,
        method: "PUT",
        body: data,
      }),
    }),
    addSkills: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addUserSkills`,
        method: "POST",
        body: data,
      }),
    }),
    editSkills: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateSkills`,
        method: "PUT",
        body: data,
      }),
    }),
    addExtraInfo: builder.mutation({
        query:(data) => ({
            url:`${USERS_URL}/addExtraInfo`,
            method:"POST",
            body:data
        })
    }),
    editAchievement: builder.mutation({
        query:(data) => ({
            url:`${USERS_URL}/updateAchievement`,
            method:"PUT",
            body:data
        })
    }),
    editExtraCurricular: builder.mutation({
        query:(data)=>({
            url:`${USERS_URL}/updateExtracarricular`,
            method:"PUT",
            body:data
        })
    })
  }),
});

export const {
  useAddJobInfoMutation,
  useEditJobInfoMutation,
  useAddSkillsMutation,
  useEditSkillsMutation,
  useAddExtraInfoMutation,
  useEditAchievementMutation,
  useEditExtraCurricularMutation
} = editProfileApiSlice;
