import styles from './starscommentrating.module.css'

const StarsCommentRating = ({ rating, setRating }) => {
  const handleStarClick = value => {
    setRating(value)
  }

  return (
    <div className={styles.rating}>
      {[1, 2, 3, 4, 5].map(starValue => (
        <span key={starValue} className={starValue > rating ? styles.star : styles.starFilled} onClick={() => handleStarClick(starValue)}>
          &#9733;
        </span>
      ))}
    </div>
  )
}

export default StarsCommentRating