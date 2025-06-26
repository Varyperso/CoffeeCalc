import React from 'react'
import { useParams } from 'react-router-dom'
import { useItemsData, useUserData } from '../context'
import CardItem from '../Components/Store/CardItem'
import PostComment from '../Components/Store/PostComment'
import UserCard from '../Components/User/UserCard'
import styles from './itempage.module.css'
import { myFetch } from '../utils/myFetch'
import { handleQuantityChange, handleAddToCart, handleDeleteItem } from '../utils/handleCard'
//prettier-ignore
const ItemPage = () => {
  const { id } = useParams()
  const { items, setItems } = useItemsData()
  const { user } = useUserData()

  const item = items?.find(item => item._id === id)
  if (!item) return <p>Item not found.</p>

  const onDelete = async commentId => {
    await myFetch({
      url: `https://localhost:5000/items/${item._id}/comments`,
      method: 'DELETE',
      data: { userId: user._id, commentId, admin: user.admin }
    })
    const itemsFetched = await myFetch({ url: 'https://localhost:5000/items' })
    localStorage.setItem('items', JSON.stringify(itemsFetched))
    setItems(itemsFetched)
  }

  return (
    <div className={styles.itemPage_wrapper}>
      <CardItem
        prevItem={item}
        handleQuantityChange={handleQuantityChange}
        handleAddToCart={handleAddToCart}
        handleDeleteItem={handleDeleteItem}
        itemPage={true}
      />
      <div className={styles.product__comments}>
        <PostComment itemId={id} setItems={setItems} />
        {item.comments.map(comment => (
          <div key={comment._id}>
            <div className={styles.product__comment}>
              <UserCard key={comment.userId?._id} user={comment.userId} className={styles.avatar} />
              <p className={styles.user__name}> {comment.userId?.user}: </p>
              <p className={styles.user__comment}> {comment.comment} </p>
              <p className={`${styles.user__rating}`}> <span style={{whiteSpace:'nowrap'}}> Rating: <span className={`${styles[`rating${comment.rating}`]}`}> {comment.rating} </span> </span></p>
              {(comment.userId._id === user._id || user.admin) && <button onClick={() => onDelete(comment._id)} className={styles.deleteComment}> X </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemPage
