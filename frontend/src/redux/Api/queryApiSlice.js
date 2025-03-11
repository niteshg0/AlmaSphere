import { QUERY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const queryApiSlice= apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        showAllQuery: builder.query({
            query: ()=>({
                url: `${QUERY_URL}/`,
                method: "GET"
            })
        }),

        postQuestion: builder.mutation({
            query: (data)=>({
                url: `${QUERY_URL}/question`,
                method: "POST",
                body: data
            })
        }),

        showAllAnswer: builder.query({
            query: ({questionId, data})=>({
                url: `${QUERY_URL}/${questionId}`,
                method: "GET",
                body: data
            })
        }),

        upvotes: builder.mutation({
            query: ({questionId})=>({
                url: `${QUERY_URL}/${questionId}/upvote`,
                method: "POST",
            })
        }),

        downvotes: builder.mutation({
            query: ({questionId})=>({
                url: `${QUERY_URL}/${questionId}/downvote`,
                method: "POST",
            })
        }),

        postAnswer: builder.mutation({
            query: ({questionId, data})=>({
                url: `${QUERY_URL}/${questionId}/answer`,
                method: "POST",
                body: data
            })
        }),

        postComment: builder.mutation({
            query: ({answerId, data})=>({
                url: `${QUERY_URL}/answer/${answerId}/comment`,
                method: "POST",
                body: data
            })
        }),
    })
})

export const {
    useShowAllQueryQuery, 
    usePostCommentMutation, 
    usePostAnswerMutation, 
    useDownvotesMutation, 
    useUpvotesMutation, 
    useShowAllAnswerQuery, 
    usePostQuestionMutation }= queryApiSlice