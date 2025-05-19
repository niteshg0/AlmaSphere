import { useState } from "react";
import { useUpload_ExcelMutation } from "../redux/Api/adminApiSlice";
import { toast } from "react-toastify";
import Table from "./Table";

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadExcel] = useUpload_ExcelMutation();

  // const [addedData , setAddedData]= useState(null);
  const [duplicateData , setDuplicateData]= useState(null);
  const [errorData , setErrorData]= useState(null);

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
      setErrorData(response.errors)

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
    <div className=" flex flex-col">
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400 border-b border-indigo-200 dark:border-indigo-500/20 pb-2">
          Upload Excel File
        </h3>

      <div className="space-y-4 mt-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Excel File (.xlsx, .xls)
          </label>
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
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !file}
          className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 
            text-white font-semibold rounded-lg shadow-md 
            transition-all duration-300 transform hover:scale-[1.02] 
            disabled:opacity-50 disabled:cursor-not-allowed 
            disabled:hover:scale-100"
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

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>Note: The Excel file should contain the following columns:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Full Name</li>
          <li>Roll Number</li>
          <li>Email</li>
          <li>Gender</li>
          <li>Course</li>
          <li>Branch</li>
          <li>CGPA</li>
          <li>Batch</li>
        </ul>
      </div>
    </div>

    {duplicateData && duplicateData.length>0 && (
      <Table title= "Duplicate Data" college_data={duplicateData} />
    )} 

    {errorData && errorData.length>0 && (
      <Table title={"Incorrect Format"} college_data={errorData} />
    )}

    </div>
  );
};

export default ExcelUpload;
