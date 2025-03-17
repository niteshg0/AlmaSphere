import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { usePostQuestionMutation } from "../redux/Api/queryApiSlice";
import { useNavigate } from "react-router";

const AskQuestion = () => {
//   const { user } = useSelector((state) => state.auth);
  const [postQuestion, { isLoading }] = usePostQuestionMutation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("General");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = {
    //   askedBy: user._id,
      title: data.title,
      content: data.content,
      category: data.category,
    };

    try {
      const response = await postQuestion(formData);

      if (response.error) {
        console.log(response);
        //toast
        return;
      }
      //toast

      navigate("/query");
    } catch (error) {
      console.log("error in submission", error);
    }
  };

  const categories = [
    { value: "Career", label: "Career", icon: "👔" },
    { value: "Technical", label: "Technical", icon: "💻" },
    { value: "Academic", label: "Academic", icon: "🏆" },
    { value: "General", label: "General", icon: "🔍" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 pb-8 mt-16">
      <div className="bg-gradient-to-br from-white/95 via-blue-50/95 to-indigo-50/95 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 px-6 py-5">
          <h2 className="text-2xl font-bold text-white font-serif">
            Ask a Question
          </h2>
          <p className="text-indigo-100 mt-1">
            Share your question with the alumni community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Question Title
              </label>
              <div className="relative">
                <input
                  id="title"
                  type="text"
                  placeholder="What would you like to ask?"
                  className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border ${
                    errors.title
                      ? "border-red-300 dark:border-red-500"
                      : "border-indigo-200 dark:border-indigo-800"
                  } focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-gray-200 backdrop-blur-sm transition-all duration-200`}
                  {...register("title", {
                    required: "Please enter a question title",
                    minLength: {
                      value: 5,
                      message: "Title must be at least 5 characters",
                    },
                  })}
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none border border-indigo-200/50 dark:border-indigo-500/20" />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Content Field */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Question Details
              </label>
              <div className="relative">
                <textarea
                  id="content"
                  rows={6}
                  placeholder="Provide more details about your question..."
                  className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border ${
                    errors.content
                      ? "border-red-300 dark:border-red-500"
                      : "border-indigo-200 dark:border-indigo-800"
                  } focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-gray-200 backdrop-blur-sm transition-all duration-200`}
                  {...register("content", {
                    required: "Please provide question details",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                  })}
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none border border-indigo-200/50 dark:border-indigo-500/20" />
              </div>
              {errors.content && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* Category Field */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {categories.map((category) => (
                  <div key={category.value}>
                    <input
                      type="radio"
                      id={category.value}
                      value={category.value}
                      className="sr-only"
                      {...register("category")}
                      defaultChecked={category.value === "General"}
                      onChange={() => setSelectedCategory(category.value)}
                    />
                    <label
                      htmlFor={category.value}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedCategory === category.value
                          ? "bg-indigo-100 dark:bg-indigo-900/40 border-indigo-300 dark:border-indigo-700"
                          : "bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                      } border hover:border-indigo-300 dark:hover:border-indigo-700`}
                    >
                      <span className="text-2xl mb-1">{category.icon}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {category.label}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>Post Your Question</>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-white/80 dark:bg-gray-800/80 rounded-xl p-5 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900/30">
        <h3 className="text-lg font-medium text-indigo-900 dark:text-indigo-400 mb-3">
          Tips for a great question:
        </h3>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            <span>Be specific and provide details</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            <span>Check if your question has been asked before</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            <span>Keep your question concise and to the point</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">•</span>
            <span>Be respectful and follow community guidelines</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AskQuestion;
