import React, { useMemo, useState } from 'react'
import './Review.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Review = () => {

 const [reviews, setReviews] = useState([
       {  id: 1,
      name: 'Ayşe Yılmaz',
      rating: 5,
       comment: 'The product quality is great, it exceeded my expectations! I definitely recommend it.',       date: '2024-05-10',
    },
    {
      id: 2,
      name: 'Mehmet Demir',
      rating: 4,
       comment: 'Fast shipping and nice packaging. I am generally satisfied with the product, only the color looks a little different.',          date: '2024-05-15',
    },
    {
      id: 3,
      name: 'Zeynep Kaya',
      rating: 5,
       comment: 'Customer service was very attentive, my problem was solved immediately. The product is as it appears.',      date: '2024-05-20',
    },
    {
      id: 4,
      name: 'Ali Can',
      rating: 3,
       comment: 'Its okay for its price. Dont expect much.',
       date: '2024-05-22',
    },
    {
      id: 5,
      name: 'Elif Şahin',
      rating: 5,
      comment: 'I simply loved it! I highly recommend it to everyone.',
      date: '2024-05-25',
    },  
]);

 const [newReview, setNewReview] = useState({
       name:'',
       rating: 0,
       comment:''
 });

 const [formError, setFormError] = useState('');
 const [formSuccess, setFormSuccess] = useState(false);

   // Ortalama puan ve toplam yorum sayısını hesapla
     const {averageRating, totalReviews, ratingBreakDown} = useMemo(()=>{
       if(reviews.length === 0){
           return {averageRating: 0, totalReviews: 0, ratingBreakDown: {}};   
       }

       const totalStars = reviews.reduce((acc, review)=> acc + review.rating, 0);
       const avg = (totalStars / reviews.length).toFixed(2);

       const breakdown = {};
       for (let i = 1; i <= 5; i++){
           breakdown[i] = {count: 0, percentage: 0};   
       }
        reviews.forEach(review => {
          breakdown[review.rating].count++;
        });

        for(let i = 1; i <= 5; i++){
         breakdown[i].percentage = ((breakdown[i].count / reviews.length)*100).toFixed(0);
        }

        return {averageRating: parseFloat(avg), totalReviews: reviews.length, ratingBreakDown: breakdown};
     }, [reviews]);


     const handleInputChange = (e) =>{
       const {name, value} = e.target;
       setNewReview((prev) => ({...prev, [name]: value}));
     };

     const handleRatingChange = (rating) => {
       setNewReview((prev) => ({...prev, rating}));
     }

     const handleSubmitReview = (e) =>{
       e.preventDefault();

       if(!newReview.name.trim() || !newReview.comment.trim() || newReview.rating === 0){
          setFormError("Please fill in all fields and rate.");
          setFormSuccess(false);
          return;    
       }

       setFormError("");
       setFormSuccess(true);

       const newId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;
       const today = new Date().toISOString().split('T')[0];

       const submittedReview = {
          id: newId,
          name: newReview.name,
          rating: newReview.rating,
          comment: newReview.comment,
          date: today
       };

       setReviews((prev)=> [submittedReview, ...prev]); // Yeni yorumu en üste ekle
       setNewReview({ name: '', rating: 0, comment: ''}); // Formu sıfırla

       setTimeout(() => {
         setFormSuccess(false);
       }, 3000);
     };

     const renderStars = (rating) =>{
       const stars = [];
       for(let i = 1; i <= 5; i++){
          stars.push(
           i <= rating ? <FaStar key={i} className='star-filled'/> : <FaRegStar key={i} className="star-empty" />
          );    
       }
       return stars;
     }

 return (
    <div className="review-container">
      <h2 className="review-title">Customer Comments</h2>

      <div className="review-summary">
        <div className="summary-left">
          <div className="average-rating">
            <span className="rating-number">{averageRating}</span> / 5
          </div>
          <div className="total-reviews">
            {renderStars(Math.round(averageRating))}
            <p>{totalReviews} reviews</p>
          </div>
        </div>
        <div className="summary-right">
          {totalReviews > 0 ? (
            Array.from({ length: 5 }).map((_, index) => {
              const star = 5 - index; // 5, 4, 3, 2, 1
              const percentage = ratingBreakDown[star]?.percentage || 0;
              return (
                <div key={star} className="rating-bar-row">
                  <span className="star-label">{star} Star</span>
                  <div className="bar-wrapper">
                    <div className="rating-bar" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span className="bar-percentage">{percentage}%</span>
                </div>
              );
            })
          ) : (
            <p>There are no comments yet.</p>
          )}
        </div>
      </div>

      <div className="review-form-section">
        <h3>Leave a comment</h3>
        <form onSubmit={handleSubmitReview} className="review-form">
          <div className="form-group">
            <label htmlFor="name">Your name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newReview.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Your score:</label>
            <div className="star-rating-input">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`star-input ${i < newReview.rating ? 'selected' : ''}`}
                  onClick={() => handleRatingChange(i + 1)}
                >
                  <FaStar />
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Your comment:</label>
            <textarea
              id="comment"
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              rows="5"
              placeholder="Write your comment here..."
              required
            ></textarea>
          </div>
          {formError && <p className="form-message error">{formError}</p>}
          {formSuccess && <p className="form-message success">Your comment has been sent successfully!</p>}
          <button type="submit" className="submit-review-btn">Send a Comment</button>
        </form>
      </div>

      <div className="review-list-section">
        <h3>All comments ({totalReviews})</h3>
        {reviews.length === 0 ? (
          <p className="no-reviews-message">There are no comments yet. Be the first to comment!</p>
        ) : (
          <div className="review-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">{review.name}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Review