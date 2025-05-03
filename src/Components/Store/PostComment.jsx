import React, { useState } from 'react'
import { useUserData } from '../../context/UserContext'
import { myFetch } from '../../utils/myFetch'
import Button from '../UI/Button'
import StarsCommentRating from '../UI/StarsCommentRating'
import styles from './postcomment.module.css'

//prettier-ignore
const PostComment = ({ itemId, setItems }) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(1)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { user } = useUserData()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!comment.trim() || rating < 1 || rating > 5) {
      setError('Please provide a valid comment and rating (1-5)')
      setTimeout(() => setError(""), 2500)
      return
    }

    const commentData = {
      userId: user._id,
      comment,
      rating
    }
    
    let result = await myFetch({url :`http://localhost:5000/items/${itemId}/comments`, method: 'POST', data: commentData })
    if (result.error) {
      setError(result.error)
      setTimeout(() => setError(""), 2500)
    } 
    else {
      setSuccess('Comment posted successfully!')
      setTimeout(() => setSuccess(""), 2500)
      const itemsFetched = await myFetch({ url: 'http://localhost:5000/items' }) // fetch items from the server to see item updates (just refreshing the page will use localhost items)
      setItems(itemsFetched)
      localStorage.setItem('items', JSON.stringify(itemsFetched))
      setComment('')
      setRating(1)
      setError("")
    }
  }

  return (
    <>
      <form className={styles.post__comment} onSubmit={handleSubmit}>
        <textarea value={comment} onChange={e => setComment(e.target.value)} required placeholder="Write your comment here..." />
        <div> 
          <StarsCommentRating rating={rating} setRating={setRating}/>
          <Button type="submit"> Submit </Button>
        </div>
        {error && <p style={{ color: 'red' }}> {error} </p>}
        {success && <p style={{ color: 'green' }}> {success} </p>}
      </form>
    </>
  )
}

export default PostComment
