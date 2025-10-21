import { useState } from 'react'
import styles from './carditem.module.css'
import Button from '../UI/Button'
import { useItemsData, useUserData } from '../../context'
import { NavLink } from 'react-router-dom'

//prettier-ignore
export default function CardItem({ prevItem, handleQuantityChange, handleAddToCart, handleDeleteItem, itemPage }) {
  const [item, setItem] = useState({...prevItem, quantitySelected: ""})
  
  const { user } = useUserData()
  const { setItems } = useItemsData()

  const itemRatingDecimalPart = Number(item.averageRating) - Math.floor(Number(item.averageRating))

  const headingItem = <div className={styles.headingAndRating__wrapper}>
                        <h3 className={styles.card__heading}> {item.itemName} </h3>
                        <span style={{ lineHeight: '2', marginLeft: '1rem', marginRight: '0.25rem', color: 'var(--my-lightgreen2)', fontSize: '1.5rem' }}>{item.averageRating > 0 ? item.averageRating : "none"}</span>
                        {item.averageRating > 0 && <span className={styles.stars} title={item.averageRating}>{[1,2,3,4,5].map(value => value <= item.averageRating && <span key={value}>&#9733;</span>)}
                        {itemRatingDecimalPart > 0 && <span className={styles.specialStar} style={{clipPath: `inset(0 ${itemRatingDecimalPart * 100}% 0 0)`}}>&#9733;</span>}</span>}
                      </div>
  const pictureItem = item.image ? <img src={item.image || null} alt="" className={styles.card__image}/> : <p>No Picture Available</p>
  let itemHeading = itemPage ? headingItem : <NavLink to={`/items/${item._id}`}> {headingItem} </NavLink>
  let itemPicture = itemPage ? pictureItem : <NavLink to={`/items/${item._id}`}> {pictureItem} </NavLink>
  
  return (
    <div className={styles.card__wrapper}>
      {itemHeading}

      <div className={styles.card__content}>
        {itemPicture}

        <div className={styles.priceAndQuantityLeft__wrapper}>
          <span className={styles.price}> Price: {item.price}$ </span>
          <span className={styles.quantityLeft}> Left: { item.quantityLeft ? (item.checked ? `${item.quantitySelected + " / " + item.quantityLeft}` : item.quantityLeft) : <span style={{color:"red"}}>{item.quantityLeft}</span>}</span> <br/>
        </div>

        {user.admin && <Button handler={() => handleDeleteItem(item, setItems) }> Delete Item </Button>}

        <div className={styles.quantity__wrapper}>
          <input type="text" inputMode="numeric" pattern="[0-9]+" className={`${styles.card__quantity} input__one`} value={item.quantitySelected || ''} placeholder='Quantity' onChange={(e) => handleQuantityChange(e, setItem)}/>
          <span className={styles.itemDescription} data-description={item.description} tabIndex="1"> ? </span>
          <Button handler={() => handleAddToCart(setItem, item)} disabled={!item.quantitySelected}> Buy Item </Button>
        </div>
      </div>
    </div>
  );
}