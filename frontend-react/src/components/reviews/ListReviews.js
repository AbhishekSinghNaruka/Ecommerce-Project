import React from 'react';

const ListReviews = ({reviews}) =>{
  return(
    <React.Fragment>
      <div className="reviews w-75">
        <h3>Other's Reviews:</h3>
        <hr />
        {reviews.map((review)=> (
          <div key={review._id} className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
            </div>
            <p className="review_user">{review.name}</p>
            <p className="review_comment">{review.comments}</p>

            <hr />
          </div>
        ))}
        
      </div>
    </React.Fragment>
  );
}

export default ListReviews;
