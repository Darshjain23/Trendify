import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { usePostReviewMutation } from "../../../redux/features/reviews/reviewsApi";

const PostAReview = ({ isModalOpen, handleClose }) => {
  const { _id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { refetch } = useFetchProductByIdQuery(_id, { skip: !_id });
  const [postReview] = usePostReviewMutation();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Please select a rating before submitting.");
      return;
    }
    const newComment = {
      comment: comment,
      rating: rating,
      userId: user?._id,
      productId: _id,
    };

    try {
      await postReview(newComment).unwrap();
      setComment("");
      setRating(0);
      refetch();
    } catch (error) {
      alert(error?.message || "Failed to post review");
    }
    handleClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[2000] px-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 animate-in zoom-in-95 duration-200">
        
        {/* Title */}
        <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4">
          Post A Review
        </h2>

        {/* Rating Stars Select */}
        <div className="flex items-center gap-1.5 mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className="cursor-pointer text-yellow-400 text-2xl hover:scale-110 transition-transform"
            >
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line text-gray-300"></i>
              )}
            </span>
          ))}
        </div>

        {/* Review input */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product's quality, fit, or material..."
          rows={4}
          required
          className="w-full p-4 bg-gray-50 border border-gray-100 focus:bg-white focus:border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors mb-5"
        ></textarea>

        {/* Action buttons */}
        <div className="flex justify-end gap-3.5">
          <button
            onClick={() => {
              handleClose();
              setComment("");
              setRating(0);
            }}
            className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default PostAReview;