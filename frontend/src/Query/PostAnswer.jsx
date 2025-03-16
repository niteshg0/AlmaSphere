import { useParams } from "react-router";
import { usePostAnswerMutation, useShowAllAnswerQuery } from "../redux/Api/queryApiSlice";
import { useState } from "react";
// import { postAnswer } from "../../../backend/controller/Query/queryController";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
// import { toast } from "react-hot-toast";

const PostAnswer = ({ setPostActive }) => {
  const { questionId } = useParams();
  const [postAnswer] = usePostAnswerMutation();
  const {refetch}= useShowAllAnswerQuery(questionId)
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

 

  const handleSubmit = async () => {
    if (!answer.trim()) {
    //   toast.error("Please write an answer before submitting");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = {
        questionId,
        answer: answer.trim(),
      };
      const resp = await postAnswer(data);

      if (resp?.error?.status == 500) {
        // toast.error("Server error. Please try again later.");/
        return;
      }
      if (!resp) {
        // toast.error("Failed to post answer. Please try again.");
        return;
      }
    //   toast.success("Answer posted successfully!");
      setPostActive(false);
      
    } catch (error) {
      console.error("Error posting answer:", error);
    //   toast.error(error.message || "Failed to post answer");
    } finally {
      setIsSubmitting(false);
      await refetch();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Post Your Answer
        </h2>
        <button
          onClick={() => setPostActive(false)}
          className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer here..."
          className="w-full min-h-[150px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg 
                    focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    resize-y"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !answer.trim()}
          className={`flex items-center px-6 py-2.5 rounded-lg text-white
                     ${
                       isSubmitting || !answer.trim()
                         ? "bg-gray-400 cursor-not-allowed"
                         : "bg-indigo-600 hover:bg-indigo-700"
                     } 
                     transition-colors duration-200`}
        >
          <FaPaperPlane
            className={`mr-2 ${isSubmitting ? "animate-pulse" : ""}`}
          />
          {isSubmitting ? "Posting..." : "Post Answer"}
        </button>
      </div>
    </div>
  );
};
export default PostAnswer;
