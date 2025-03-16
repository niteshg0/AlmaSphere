import React, { useCallback, useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaComment, FaPaperPlane } from "react-icons/fa";
import { format } from "date-fns";
import {useAnswerDownvotesMutation, useAnswerUpvotesMutation, usePostCommentMutation, useShowAllAnswerQuery} from "../redux/Api/queryApiSlice";

const AnswerCard = ({ answer, userId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment]= useState("");
  const [isSubmitting, setIsSubmitting]= useState(false);
  const {refetch}= useShowAllAnswerQuery(answer.questionId)
  const [postComment]= usePostCommentMutation()

  const [answerUpvotes]= useAnswerUpvotesMutation()
  const [answerDownvotes]= useAnswerDownvotesMutation()
  const [voteStatus, setVoteStatus]= useState();
  const [isVoting, setIsVoting]= useState(false);


  if (!answer) return null;

  useEffect(()=>{
    // answer.comments.sort((a,b)=>{
    //   return new Date(b.createdAt) - new Date(a.createdAt)
    // })
    const liked= answer.upvotes.includes(userId);
    const disliked= answer.downvotes.includes(userId);
    if(liked) setVoteStatus("Liked");
    else if(disliked) setVoteStatus("Disliked");
    else setVoteStatus("");
  }, [answer])

  const formattedDate = (answer.createdAt
    ? format(new Date(answer.createdAt), "MMM dd, yyyy")
    : "Unknown date")

  const handleComment= async ()=>{
    if(!comment.trim()){
      //toast
      return 
    }
    try {
      setIsSubmitting(true);
      const data= {
        answerId: answer._id,
        content: comment.trim()
      }
      
      // console.log(data);
      
      const resp= await postComment(data)

      if(!resp){
        //toast
        return
      }
      if(resp.error){
        //toast
        console.log(resp.error);
        
        return
      }

      await refetch()
      setComment("")

    } catch (error) {
      console.log(error);
      //toast
      
    } finally{
      setIsSubmitting(false);
      //toast\
      
    }
  }

  //votes
  const handleVote= async (action)=>{
    if(isVoting) return
    const answerId= answer._id;
    try {
      setIsVoting(true);

      if(action=="Liked"){
        const resp= await answerUpvotes({answerId});

        if(!resp){
          //toast
          return
        }
        if(resp.error){
          //toast
          console.log(resp.error);
          
          return
        }

        if(voteStatus=="Liked") setVoteStatus("")
        else setVoteStatus("Liked");
      } else{
        const resp= await answerDownvotes({answerId});

        if(!resp){
          //toast
          return
        }
        if(resp.error){
          //toast
          console.log(resp.error);
          
          return
        }

        if(voteStatus=="Disliked") setVoteStatus("");
        setVoteStatus("Disliked")
      }
    } catch (error) {
      console.error("Error handling vote:", error);
    } finally{
      await refetch()
      setTimeout(()=>{
        setIsVoting(false)
      }, 3000)
    }

  }

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            {answer.answeredBy ? answer.answeredBy.name?.charAt(0) || "U" : "A"}
          </div>
          <div className="ml-3">
            <p className="font-medium dark:text-white">
              {answer.answeredBy
                ? answer.answeredBy.fullName || "Unknown User"
                : "Anonymous"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none  mb-4">
        <pre className="text-gray-800 font-sans dark:text-gray-200 text-wrap">{answer.answer}</pre>
      </div>

      <div className="flex items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            {/* <div className="flex items-center"> */}
        <button
          disabled= {isVoting}
          onClick={() => handleVote("Liked")}
          className={`flex items-center text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 ${isVoting? "opacity-50 cursor-not-allowed": ""}`}
        >
          <FaThumbsUp
            className={`mr-1 ${
              voteStatus === "Liked" ? "text-indigo-600" : ""
            }`}
          />
        </button>
        <span className="ml-1">{answer.upvotes?.length || 0}</span>
            {/* </div> */}

            {/* <div className="flex items-center"> */}
        <button
        disabled= {isVoting}
          onClick={() => handleVote("Disliked")
          }
          className={`flex items-center text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 ${isVoting? "opacity-50 cursor-not-allowed": ""}`}
        >
          <FaThumbsDown
            className={`ml-3 ${
              voteStatus === "Disliked" ? "text-indigo-600" : ""
            }`}
          />
        </button>
        <span className="ml-1">{answer.downvotes?.length || 0}</span>
            
        <button
          className="flex ml-6 items-center text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          onClick={() => setShowComments(!showComments)}
        >
          <FaComment className="mr-1" />
          <span>{answer.comments?.length || 0} Comments</span>
        </button>
      </div>

      {showComments && (
        <div className=" mt-3 flex flex-row">
          <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full min-h-[10px] p-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-y"/>
        <button
          onClick={handleComment}
          disabled={isSubmitting || !comment.trim()}
          className={`flex items-center ml-3 h-16 px-6 py-2.5 rounded-lg text-white
                     ${
                       isSubmitting || !comment.trim()
                         ? "bg-gray-400 cursor-not-allowed"
                         : "bg-indigo-600 hover:bg-indigo-700"
                     } 
                     transition-colors duration-200`}
        >
          <FaPaperPlane
            className={`mr-2 ${isSubmitting ? "animate-pulse" : ""}`}
          />
          {isSubmitting ? "Posting..." : "Post"}
        </button>
        </div>)}

      {showComments && answer.comments && answer.comments.length > 0 &&  (
        <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-600">         
          <h4 className="text-sm font-medium mb-2 dark:text-white">Comments</h4>
          {answer.comments.map((comment, index) => (
            <div
              key={comment._id || index}
              className="mb-2 pb-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div className="flex items-center mb-1">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {comment.commentedBy?.fullName || "Anonymous"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {comment.createdAt
                    ? format(new Date(comment.createdAt), "dd MMM, yyyy")
                    : ""}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
