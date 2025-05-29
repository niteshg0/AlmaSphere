import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import AddMemoryForm from "./Memoryform"
import { FaHeart, FaRegHeart, FaComment, FaCamera } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
const token = localStorage.getItem("token");

const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=6d28d9&color=fff&rounded=true";

export default function MemoryGallery() {
  const [images, setImages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const { id } = useParams();
  const [likeLoading, setLikeLoading] = useState({});
  const [likedPosts, setLikedPosts] = useState({});

  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/memory");
      const data = await response.json();
      setImages(Array.isArray(data) ? data : []);

      // Initialize liked posts state from fetched data
      const initialLikedState = {};
      data.forEach(post => {
        if (post.upvotes && Array.isArray(post.upvotes)) {
          initialLikedState[post._id] = post.upvotes.includes(localStorage.getItem('userId'));
        }
      });
      setLikedPosts(initialLikedState);
    } catch (err) {
      console.error("Error fetching memories:", err);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Group images by their original post
  const groupedImages = images
    .filter((img) => img.tags == id)
    .reduce((acc, img) => {
      const images = Array.isArray(img.GallaryImages) ? img.GallaryImages : [img.GallaryImages];
      acc.push({
        ...img,
        GallaryImages: images,
        totalImages: images.length
      });
      return acc;
    }, []);

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
      setCurrentImageIdx(prev => prev + 1);
    } else if (modalIdx < groupedImages.length - 1) {
      setModalIdx(prev => prev + 1);
      setCurrentImageIdx(0);
    }
  };
  const prevImage = () => {
    if (currentImageIdx > 0) {
      setCurrentImageIdx(prev => prev - 1);
    } else if (modalIdx > 0) {
      setModalIdx(prev => prev - 1);
      setCurrentImageIdx(groupedImages[modalIdx - 1].totalImages - 1);
    }
  };

  // Like handler
  const handleVote = async (post, type) => {
    if (!localStorage.getItem('token')) {
      alert('Please login to like memories');
      return;
    }

    setLikeLoading((prev) => ({ ...prev, [post._id]: true }));
    try {
      const response = await fetch(`http://localhost:8000/memory/photo/${post._id}/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }

      const updatedPost = await response.json();

      // Update the images array with the new like count
      setImages(prevImages =>
        prevImages.map(img =>
          img._id === post._id
            ? { ...img, upvotes: updatedPost.upvotes }
            : img
        )
      );

      // Update liked state
      setLikedPosts(prev => ({
        ...prev,
        [post._id]: !prev[post._id]
      }));

    } catch (error) {
      console.error("Error voting:", error);
      alert('Failed to update like. Please try again.');
    } finally {
      setLikeLoading((prev) => ({ ...prev, [post._id]: false }));
    }
  };

  const handleUploadSuccess = () => {
    setShowForm(false);
    fetchImages();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 py-8 px-4 sm:px-6">
      {/* Header with Add Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Memory Gallery</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Share and relive your favorite moments.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <FaCamera className="text-lg" />
            {showForm ? "Back to Gallery" : "Add Memory"}
          </motion.button>
        </div>
      </motion.div>

      {/* Form Section */}
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

      {/* Gallery Section */}
      {!showForm && (
        <div className="max-w-7xl mx-auto px-4">
          {groupedImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 my-8"
            >
              <p>No memories uploaded yet. Be the first to add one!</p>
            </motion.div>
          )}

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {groupedImages.map((post, postIdx) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: postIdx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container */}
                <div
                  className="relative aspect-square cursor-pointer group"
                  onClick={() => openModal(postIdx, 0)}
                >
                  <img
                    src={post.GallaryImages[0]}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={e => {
                      e.target.onerror = null;
                      const fallbackText = encodeURIComponent(post.title || "Image not found");
                      e.target.src = `https://placehold.co/600x600?text=${fallbackText}`;
                    }}
                  />
                  {post.totalImages > 1 && (
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                      +{post.totalImages - 1}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Post Info */}
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={post.PostedBy?.avatar || defaultAvatar}
                      alt={post.PostedBy?.fullName || "User"}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {post.PostedBy?.fullName || "Anonymous"}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1 truncate">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2">{post.description}</p>

                  {/* Interaction Buttons */}
                  <div className="flex items-center gap-4 mt-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center gap-1 text-lg transition-colors ${likedPosts[post._id]
                        ? 'text-red-500 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
                        }`}
                      onClick={() => handleVote(post, "up")}
                      disabled={likeLoading[post._id]}
                    >
                      {likedPosts[post._id] ? <FaHeart /> : <FaRegHeart />}
                      <span className="text-xs">{post.upvotes?.length || 0}</span>
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1 text-lg text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      <FaComment />
                      <span className="text-xs">0</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {modalOpen && groupedImages[modalIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <button
              className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-indigo-400 transition-colors"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl font-bold hover:text-indigo-400 transition-colors"
              onClick={prevImage}
              aria-label="Previous Image"
            >
              &#8592;
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <img
                src={groupedImages[modalIdx].GallaryImages[currentImageIdx]}
                alt={groupedImages[modalIdx].title}
                className="max-h-[80vh] max-w-full rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <div className="text-lg font-semibold text-white">{groupedImages[modalIdx].title}</div>
                <div className="text-sm text-gray-300 mt-1 max-w-lg">{groupedImages[modalIdx].description}</div>
              </div>
            </motion.div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl font-bold hover:text-indigo-400 transition-colors"
              onClick={nextImage}
              aria-label="Next Image"
            >
              &#8594;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
