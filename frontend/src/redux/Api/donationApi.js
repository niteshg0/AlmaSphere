import { DONATION_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const donationSlice= apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        donation: builder.mutation({
            query:(formdata)=>({
                url:`${DONATION_URL}`,
                method:"POST",
                body:formdata,
            }),
        })
    })
})

export const {useDonationMutation}= donationSlice