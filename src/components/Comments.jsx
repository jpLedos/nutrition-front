import React from 'react'
import { Rating } from 'react-simple-star-rating'

const Comments = ( {recipe} ) => {

  return (
 
    <div className="mx-lg-5  border-success">
        {recipe.comments.map(comment=> {
            return (
            <div key={comment.id} >
                <Rating name='note' readonly transition ratingValue= {(comment.note*20)} size="12" fillColor="#0D6EFD" />
                <br /><span className="comments-text">{comment.comment}</span>
                <span className="user-infos user  float-end ">{comment.user.userName}</span>
                <hr />
            </div>
            )
        })}
    </div>
  )                 
}

export default Comments