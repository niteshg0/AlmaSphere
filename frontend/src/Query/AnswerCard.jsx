import React, { useCallback, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import { format } from "date-fns";

const AnswerCard = ({ answer }) => {
  const [showComments, setShowComments] = useState(false);

  // const handleVote= useCallback(()=>{
    
  // }, [])

  if (!answer) return null;

  const formattedDate = answer.createdAt
    ? format(new Date(answer.createdAt), "MMM dd, yyyy")
    : "Unknown date";

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
                ? answer.answeredBy.name || "Unknown User"
                : "Anonymous"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none mb-4">
        <p className="text-gray-800 dark:text-gray-200">{answer.answer}</p>
      </div>

      <div className="flex items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <button className="flex items-center mr-4 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
          <FaThumbsUp className="mr-1" />
          <span>{answer.upvotes?.length || 0}</span>
        </button>
        <button className="flex items-center mr-4 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
          <FaThumbsDown className="mr-1" />
          <span>{answer.downvotes?.length || 0}</span>
        </button>
        <button
          className="flex items-center text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          onClick={() => setShowComments(!showComments)}
        >
          <FaComment className="mr-1" />
          <span>{answer.comments?.length || 0} Comments</span>
        </button>
      </div>

      {showComments && answer.comments && answer.comments.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
          <h4 className="text-sm font-medium mb-2 dark:text-white">Comments</h4>
          {answer.comments.map((comment, index) => (
            <div
              key={comment._id || index}
              className="mb-2 pb-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div className="flex items-center mb-1">
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {comment.user?.fullName || "Anonymous"}
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
