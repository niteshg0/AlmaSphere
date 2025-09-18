import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import AddMemoryForm from "./Memoryform";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {
  FaHeart,
  FaRegHeart,
  FaCamera,
  FaTimes,

  FaCalendarAlt,

} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


export default function MemoryGallery() {
  const [images, setImages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const { id } = useParams();
  const [likeLoading, setLikeLoading] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const userId = localStorage.getItem("userId");
  



  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/memory", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setImages(Array.isArray(data) ? data : []);

      // Initialize liked posts state
      const initialLikedState = {};
      data.forEach((post) => {
        if (post.upvotes && Array.isArray(post.upvotes)) {
          initialLikedState[post._id] = post.upvotes.includes(userId);
        }
      });
      setLikedPosts(initialLikedState);
    } catch (err) {
      console.error("Error fetching memories:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Group images by their original post
  const groupedImages = images
    .filter((img) => img.tags == id)
    .reduce((acc, img) => {
      const images = Array.isArray(img.GallaryImages)
        ? img.GallaryImages
        : [img.GallaryImages];
      acc.push({
        ...img,
        GallaryImages: images,
        totalImages: images.length,
      });
      return acc;
    }, []);

    useEffect(() => {
  if (groupedImages[modalIdx]?.totalImages > 1) {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) =>
        (prev + 1) % groupedImages[modalIdx].totalImages
      );
    }, 3000); // change every 3s
    return () => clearInterval(interval);
  }
}, [groupedImages, modalIdx]);

  // Modal logic
  const openModal = (postIdx, imageIdx) => {
    setModalIdx(postIdx);
    setCurrentImageIdx(imageIdx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const nextImage = () => {
    const currentPost = groupedImages[modalIdx];
    if (currentImageIdx < currentPost.totalImages - 1) {
      setCurrentImageIdx((prev) => prev + 1);
    } else if (modalIdx < groupedImages.length - 1) {
      setModalIdx((prev) => prev + 1);
      setCurrentImageIdx(0);
    }
  };
  const prevImage = () => {
    if (currentImageIdx > 0) {
      setCurrentImageIdx((prev) => prev - 1);
    } else if (modalIdx > 0) {
      setModalIdx((prev) => prev - 1);
      setCurrentImageIdx(groupedImages[modalIdx - 1].totalImages - 1);
    }
  };

  const handleLike = async (postId) => {
    if (!localStorage.getItem("token")) {
      alert("Please login to like memories");
      return;
    }
    if (likeLoading[postId]) return;

    try {
      setLikeLoading((prev) => ({ ...prev, [postId]: true }));

      const response = await fetch(
        `http://localhost:8000/memory/photo/${postId}/upvote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to like post");
      const data = await response.json();

      // Update the UI with the new upvote count
      setImages((prevImages) =>
        prevImages.map((img) =>
          img._id === postId
            ? { ...img, upvotes: Array(data.upvotes).fill("dummy") } // Just for count, or fetch the actual upvotes array if needed
            : img
        )
      );
      // Optionally, update likedPosts state if you track if the user liked it
    } catch (error) {
      alert("Failed to like post. Please try again.");
    } finally {
      setLikeLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleUploadSuccess = () => {
    setShowForm(false);
    fetchImages();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      
<div className="w-full bg-transparent py-6 px-4 sm:px-6 transition-colors duration-500">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    {/* <div className="flex items-center gap-5">
      <div className="relative">
        <span className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        <h1 className="text-3xl font-extrabold text-white relative z-10">
          Memory Lane
        </h1>
      </div>
    </div> */}
     <div className="flex items-center gap-4">
                <Link
                  to="/memorylane"
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm"
                >
                  <FaHome size={16} />
                  <span>Back</span>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  MemoryLane
                </h1>
              </div>

    <button
      onClick={() => setShowForm(!showForm)}
      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 
                 hover:from-blue-700 hover:to-indigo-700 text-white font-medium 
                 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
    >
      <FaCamera className="text-lg" />
      {showForm ? "Back to Gallery" : "Add Memory"}
    </button>
  </div>
</div>



      {/* Main Content */}
      <div className="py-8 px-4 sm:px-6">
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <AddMemoryForm onUpload={handleUploadSuccess} />
            </motion.div>
          )}
        </AnimatePresence>

        {!showForm && (
          <div className="max-w-5xl mx-auto">
            {groupedImages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                  <FaCamera className="text-6xl text-gray-400 mx-auto mb-4" />
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    No memories uploaded yet
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Be the first to add one!
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500 transform -translate-x-1/2" />

                {/* Memory Cards */}
                <div className="space-y-16">
                  {groupedImages.map((post, postIdx) => (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: postIdx * 0.1 }}
                      className={`relative flex items-center gap-8 ${
                        postIdx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg" />

                      {/* Memory Card */}
                      <div className="w-1/2">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-xl overflow-hidden border border-blue-100/50 dark:border-gray-700/50"
                        >
                          {/* Image Section */}
                        {/* Image Section */}
<div className="relative aspect-[13/9] overflow-hidden">
  {post.totalImages > 1 ? (
    <motion.div
      key={post._id}
      className="w-full h-full"
    >
      {/* Carousel (auto-play) */}
      <div className="w-full h-full relative overflow-hidden">
        {post.GallaryImages.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={post.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              currentImageIdx === idx ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => openModal(postIdx, idx)}
          />
        ))}
      </div>
    </motion.div>
  ) : (
    <motion.img
      src={post.GallaryImages[0]}
      alt={post.title}
      className="w-full h-full object-cover cursor-pointer"
      onClick={() => openModal(postIdx, 0)}
    />
  )}

  {/* Overlay (kept same) */}
  <div
    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 
    opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
  />

  {post.totalImages > 1 && (
    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
      <FaCamera className="text-indigo-600" />
      <span>{post.totalImages} Photos</span>
    </div>
  )}
</div>

                        </motion.div>
                      </div>

                      {/* Description Card */}
<div className="w-1/2">
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="backdrop-blur-lg bg-white/30 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/40 shadow-lg rounded-2xl p-6 flex flex-col h-full"
  >
    {/* Title + Like */}
    <div className="flex items-center justify-between mb-4 ">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {post.title}
      </h3>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          likedPosts[post._id]
            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
            : "bg-gray-100/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-red-50/40 dark:hover:bg-red-900/40"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleLike(post._id);
        }}
        disabled={likeLoading[post._id]}
      >
        {likedPosts[post._id] ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart />
        )}
        <span>
          {Array.isArray(post.upvotes) ? post.upvotes.length : 0}{" "}
          {/* {likedPosts[post._id] ? "Liked" : "Likes"} */}
        </span>
      </motion.button>
    </div>

    {/* Description */}
    <p className="text-gray-700 dark:text-gray-300 mb-6">{post.description}</p>

    {/* Date */}
    <div className="mt-auto flex justify-end items-center text-sm text-gray-700 dark:text-gray-400">
      <FaCalendarAlt className="mr-2 text-indigo-400" />
      <span>
        {post.createdAt
          ? new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "Just now"}
      </span>
    </div>
  </motion.div>
</div>


                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {modalOpen && groupedImages[modalIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              className="absolute top-6 right-8 text-white text-3xl hover:text-indigo-400 transition-colors"
              onClick={closeModal}
            >
              <FaTimes />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-indigo-400 transition-colors"
              onClick={prevImage}
            >
              &#8592;
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.img
                key={currentImageIdx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={groupedImages[modalIdx].GallaryImages[currentImageIdx]}
                alt={groupedImages[modalIdx].title}
                className="max-h-[80vh] max-w-full rounded-2xl shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center max-w-2xl"
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  {groupedImages[modalIdx].title}
                </h2>
                <p className="text-gray-300">
                  {groupedImages[modalIdx].description}
                </p>
              </motion.div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-indigo-400 transition-colors"
              onClick={nextImage}
            >
              &#8594;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}