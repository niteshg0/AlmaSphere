import { formatDistanceToNow } from "date-fns";
import {
    FaQuestion,
    FaThumbsUp,
    FaThumbsDown,
    FaComment,
    FaTag,
    FaFilter,
    FaSearch,
    FaSortAmountDown,
    FaSortAmountUp,
    FaReply,
  } from "react-icons/fa";

const QueryCard = ({q}) => {
    // Function to format date
    const formatDate = (dateString) => {
        try {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
        } catch (error) {
        return "Invalid date";
        }
    };

    // Function to get category color
    const getCategoryColor = (category) => {     
        const categories = {
          Career: {
            bg: "bg-blue-100 dark:bg-blue-900/30",
            text: "text-blue-800 dark:text-blue-300",
          },
          Academic: {
            bg: "bg-green-100 dark:bg-green-900/30",
            text: "text-green-800 dark:text-green-300",
          },
          Technical: {
            bg: "bg-purple-100 dark:bg-purple-900/30",
            text: "text-purple-800 dark:text-purple-300",
          },
          Campus: {
            bg: "bg-amber-100 dark:bg-amber-900/30",
            text: "text-amber-800 dark:text-amber-300",
          },
          Other: {
            bg: "bg-gray-100 dark:bg-gray-700",
            text: "text-gray-800 dark:text-gray-300",
          },
        };
    
        return categories[category] || categories["Other"];
      };
    
      // Function to get status color
    const getStatusColor = (status) => {
    const statuses = {
        Open: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-800 dark:text-green-300",
        },
        Closed: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-800 dark:text-red-300",
        },
        "In Progress": {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-800 dark:text-yellow-300",
        },
    };

    return statuses[status] || statuses["Open"];
    };
    
  return (
    <div
        key={q._id}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
        >
        <div className="p-6">
            {/* Header with title and tags */}
            <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white pr-4 line-clamp-1">
                {q.title}
            </h2>
            {/* Tags at top right */}
            <div className="flex flex-wrap gap-2 shrink-0">
                <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                    getCategoryColor(q.category).bg
                } ${getCategoryColor(q.category).text}`}
                >
                <FaTag className="inline mr-1" />
                {q.category}
                </span>
                <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                    getStatusColor(q.status).bg
                } ${getStatusColor(q.status).text}`}
                >
                {q.status}
                </span>
            </div>
            </div>

            {/* Content description */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 overflow-hidden text-ellipsis">
            {q.content}
            </p>

            {/* Footer with metadata in a single line */}
            <div className="flex flex-wrap justify-between items-center text-sm">
            {/* Left side - Engagement metrics */}
            <div className="flex items-center space-x-4">
                {/* Answers count */}
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                <FaReply className="mr-1" />
                <span>
                    {q.answers.length > 0
                    ? `${q.answers.length} ${
                        q.answers.length === 1 ? "Answer" : "Answers"
                        }`
                    : "No Answers"}
                </span>
                </div>

                {/* Votes */}
                <div className="flex items-center space-x-3">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <FaThumbsUp className="mr-1" />
                    <span>{q.upvotes.length}</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <FaThumbsDown className="mr-1" />
                    <span>{q.downvotes.length}</span>
                </div>
                </div>
            </div>

            {/* Right side - User info (smaller) */}
            <div className="flex items-center text-gray-500 dark:text-gray-400 shrink-0">
                <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-medium text-indigo-600 dark:text-indigo-400 text-xs mr-1">
                {q.askedBy.fullName.charAt(0)}
                </span>
                <span className="mr-1">{q.askedBy.fullName}</span>
                <span className="text-xs">
                ({formatDate(q.createdAt)})
                </span>
            </div>
            </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
    </div>
  )
}
export default QueryCard