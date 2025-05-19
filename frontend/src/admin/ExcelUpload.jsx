import { useState } from "react";
import { useUpload_ExcelMutation } from "../redux/Api/adminApiSlice";
import { toast } from "react-toastify";
import Table from "./Table";

const ExcelUpload = ({setDuplicateData, setErrorData}) => {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadExcel] = useUpload_ExcelMutation();

  // const [addedData , setAddedData]= useState(null);
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Check file type
      const fileType = selectedFile.name.split(".").pop().toLowerCase();

      if (!["xlsx", "xls"].includes(fileType)) {
        toast.error("Please upload only Excel files (.xlsx or .xls)");
        e.target.value = null;
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadExcel(formData).unwrap();

      toast.success(`Upload complete! ${response.insertedCount} records added`);

      if (response.duplicateCount > 0) {
        toast.info(`${response.duplicateCount} duplicate records found`);
      }

      if (response.errorCount > 0) {
        toast.warn(`${response.errorCount} records had errors`);
      }

      setDuplicateData(response.duplicates);
      setErrorData(response.errors);

      // Reset file input
      setFile(null);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error?.data?.message || "Failed to upload file");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400">
          Bulk Upload
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Upload multiple students via Excel file
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <input
            type="file"
            name="college_data"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              dark:file:bg-indigo-900 dark:file:text-indigo-300
              hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800
              transition-all duration-200"
          />

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !file}
            className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 
              text-white font-semibold rounded-lg shadow-md 
              transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
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
                Uploading...
              </div>
            ) : (
              "Upload Excel"
            )}
          </button>
        </div>

        
      </div>

      
    </div>
  );
};

export default ExcelUpload;
