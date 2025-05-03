import Button from '../Components/UI/Button'
import { myFetch } from '../utils/myFetch'
import { useUserData } from '../context/UserContext'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './mycart.module.css'

export default function MyCart() {
  const [message, setMessage] = useState('')
  const [itemsInCart, setItemsInCart] = useState(JSON.parse(localStorage.getItem('itemsInCart')) || [])

  const { user, setUser } = useUserData()

  const navigate = useNavigate()

  const handleRemoveFromCart = index => {
    setItemsInCart(prevItems => {
      const updatedItemsInCart = prevItems.filter(item => item !== prevItems[index])
      localStorage.setItem('itemsInCart', JSON.stringify(updatedItemsInCart))
      return updatedItemsInCart
    })
  }

  const handlePurchase = async () => {
    const itemsToPurchase = itemsInCart.map(item => ({ ...item, quantity: item.quantitySelected }))
    if (!itemsToPurchase.length) return

    const result = await myFetch({ url: `http://localhost:5000/purchase/${user._id}`, method: 'POST', data: itemsToPurchase })
    if (result.error)
      setMessage('error', result.error) // if some/all items were cancelled
    else setMessage('purchased')

    const userData = await myFetch({ url: `http://localhost:5000/user/${user._id}` }) // renew user data to update previous purchases
    setUser(userData)
    setItemsInCart([])
    localStorage.setItem('itemsInCart', JSON.stringify([]))
    setTimeout(() => setMessage(''), 2500)
    setTimeout(() => navigate('/ProductList'), 3000)
  }

  return (
    <>
      <h2 style={{ textDecoration: 'underline' }}> Items In Cart </h2>
      {itemsInCart.length === 0 && <p> No Items In Cart </p>}
      {message === 'error' && <div style={{ fontSize: '2.4rem', color: 'red' }}> purchase error, one or more items were cancelled. </div>}
      <ul className={styles.purchasedItems__grid}>
        {itemsInCart.map((item, index) => (
          <li className={styles.purchasedItem} style={{ border: '2px solid #555' }} key={`${item._id}-${index}`}>
            <p> {item.itemName} </p>
            <p> Quantity Selected: {'(' + item.quantitySelected + ')'} </p>
            <NavLink to={`/items/${item._id}`}>
              <img src={item.image} alt={item.description} />
            </NavLink>
            <p> {item.description} </p>
            <Button handler={() => handleRemoveFromCart(index)}> Delete Item </Button>
          </li>
        ))}
      </ul>
      {message === 'purchased' && (
        <div style={{ fontSize: '2.4rem', color: 'red' }}>
          Items Purchased! <span style={{ fontSize: '1.4rem', color: 'darkgreen' }}> Redirecting to Product List... </span>
        </div>
      )}
      {itemsInCart.length > 0 && <Button handler={handlePurchase}> Purchase Now </Button>}
      <hr style={{ marginBottom: '1.2rem' }} />
      <h3> Previous Purchases </h3>
      <div className={styles.purchasedItems__grid}>
        {user.purchasedItems?.map((item, index) => (
          <div className={styles.purchasedItem} key={`${item._id}-${index}`}>
            <p> {item.item.itemName} </p>
            <p> Quantity: {item.quantity} </p>
            <p> Purchase Date: {new Date(item.purchaseDate).toLocaleString()} </p>
            <NavLink to={`/items/${item.item._id}`}>
              <img src={item.item.image} alt={item.item.description} />
            </NavLink>
          </div>
        ))}
      </div>
    </>
  )
}
