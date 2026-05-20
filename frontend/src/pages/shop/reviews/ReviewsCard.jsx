import React from "react";
import commentorIcon from "../../../assets/avatar.png";
import { formatDate } from "../../../utils/formateDate";
import RatingStars from "../../../components/rating/RatingStars";
import { useState } from "react";
import PostAReview from "./PostAReview";

const ReviewsCard = ({ productReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviews = productReviews || [];

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm max-w-4xl">
      
      {/* Title */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
          <i className="ri-chat-3-line text-lg text-primary"></i>
          <span>Customer Reviews ({reviews.length})</span>
        </h3>
        
        <button
          onClick={handleOpenReviewModal}
          className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-colors"
        >
          Add Review
        </button>
      </div>

      {/* Review list */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          <div className="divide-y divide-gray-50 space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="pt-6 first:pt-0">
                
                {/* Author profile row */}
                <div className="flex items-start gap-4">
                  <img 
                    src={commentorIcon} 
                    alt="avatar icon" 
                    className="w-12 h-12 rounded-full object-cover border border-gray-100 bg-gray-50 shrink-0" 
                  />
                  
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-800 capitalize leading-none">
                      {review?.userId?.username || "Anonymous Customer"}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {formatDate(review?.updatedAt)}
                    </p>
                    <div className="pt-0.5">
                      <RatingStars rating={review?.rating} />
                    </div>
                  </div>
                </div>

                {/* Comment message */}
                <div className="mt-4 bg-gray-50 border border-gray-100/50 rounded-2xl p-5 text-xs md:text-sm text-gray-600 leading-relaxed max-w-3xl shadow-sm">
                  <p>{review.comment}</p>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>

      <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal} />
    </div>
  );
};

export default ReviewsCard;