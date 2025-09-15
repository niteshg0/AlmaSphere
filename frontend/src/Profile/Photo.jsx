import React, { useState } from "react";

const UploadProfileImage = ({ onSuccess }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
   formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const cloudRes = await fetch(
     `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await cloudRes.json();
    return data.secure_url;
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadToCloudinary(image);

      const token = localStorage.getItem("token");

      const backendRes = await fetch(
        "http://localhost:8000/api/users/updateimage",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ profile_image: imageUrl }),
        }
      );

      const result = await backendRes.json();

      if (backendRes.ok) {
        alert(result.message || "Profile image updated successfully");
        if (onSuccess) onSuccess(); // close modal
      } else {
        alert(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
        Upload Profile Image
      </h2>

      {image && (
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-indigo-300">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <label className="block text-gray-700 dark:text-gray-200">
        Choose Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-100 file:text-indigo-700
                     hover:file:bg-indigo-200"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500
                   hover:from-indigo-600 hover:to-purple-600 text-white font-semibold
                   shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default UploadProfileImage;
