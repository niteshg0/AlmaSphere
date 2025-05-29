import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FiUpload, FiX } from "react-icons/fi";
import { useParams } from "react-router-dom";
// const token = localStorage.getItem("token");

export default function MemoryForm({ onUpload }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const { id } = useParams(); // <-- This gets the "1" from /memory/1
  const tag = Number(id);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const images = watch("images");

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const currentFiles = watch("images") || [];
    const updatedFiles = [...currentFiles, ...newFiles];

    // Update form value
    setValue("images", updatedFiles);

    // Update previews
    const newPreviews = updatedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  React.useEffect(() => {
    return () => {
      // Cleanup preview URLs when component unmounts
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Memory_Lane");
    formData.append("cloud_name", "dq3vtsohv");

    const response = await fetch("https://api.cloudinary.com/v1_1/dq3vtsohv/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.url;
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setUploadProgress(0);

      // Upload all images to Cloudinary
      const uploadPromises = Array.from(data.images).map(file => uploadToCloudinary(file));
      const imageUrls = await Promise.all(uploadPromises);

      // Send to your backend
      await fetch("http://localhost:8000/memory/post", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          tags: tag,
          GallaryImages: imageUrls,
          description: data.description,
        }),
      });

      setLoading(false);
      reset();
      setPreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (onUpload) onUpload();
    } catch (error) {
      console.error("Error uploading:", error);
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    const currentFiles = watch("images");
    const updatedFiles = Array.from(currentFiles).filter((_, i) => i !== index);
    setValue("images", updatedFiles);

    // Update previews
    const newPreviews = updatedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mb-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 mx-auto border border-indigo-100 dark:border-gray-700"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Share a Memory</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Upload your favorite moments and let everyone relive them!</p>
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Title</label>
        <input
          {...register("title", { required: true })}
          placeholder="Title"
          className="w-full px-4 py-3 border rounded-xl bg-white/70 dark:bg-gray-900/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border-indigo-100 dark:border-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Description</label>
        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="w-full px-4 py-3 border rounded-xl bg-white/70 dark:bg-gray-900/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border-indigo-100 dark:border-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Photos</label>
        <div className="space-y-4">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-indigo-400 dark:border-indigo-600 rounded-xl cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition">
            <FiUpload className="text-3xl text-indigo-600 dark:text-indigo-400 mb-2" />
            <span className="text-sm text-indigo-600 dark:text-indigo-400">Click to upload multiple photos</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Preview Grid */}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-xl shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
      >
        {loading ? "Uploading..." : "Add Memory"}
      </button>
    </form>
  );
}
