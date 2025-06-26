import { myFetch } from './myFetch'

export const handleQuantityChange = (e, setItem) => {
  setItem(prevItem => ({
    ...prevItem,
    quantitySelected: isFinite(e.target.value) ? (e.target.value <= prevItem.quantityLeft ? +e.target.value : '') : ''
  }))
}

export const handleAddToCart = (setItem, item) => {
  if (!item.quantitySelected) return
  let storedItemsInCart = JSON.parse(localStorage.getItem('itemsInCart'))
  if (!storedItemsInCart) {
    localStorage.setItem('itemsInCart', JSON.stringify([item]))
    setItem(prevItem => ({ ...prevItem, quantitySelected: '' }))
    return
  }
  let sameItemInCart = storedItemsInCart.findIndex(itemInCart => item._id === itemInCart._id)
  if (sameItemInCart !== -1) {
    storedItemsInCart[sameItemInCart].quantitySelected += item.quantitySelected
    localStorage.setItem('itemsInCart', JSON.stringify(storedItemsInCart))
  } else {
    let itemsToStore = [...storedItemsInCart, item]
    localStorage.setItem('itemsInCart', JSON.stringify(itemsToStore))
  }
  setItem(prevItem => ({ ...prevItem, quantitySelected: '' }))
}

export const handleDeleteItem = async (item, setData) => {
  await myFetch({ url: `https://localhost:5000/items/${item._id}`, method: 'DELETE' }) // returns deleted item
  const itemsFetched = await myFetch({ url: 'https://localhost:5000/items' })
  localStorage.setItem('items', JSON.stringify(itemsFetched))
  setData(itemsFetched)
}
