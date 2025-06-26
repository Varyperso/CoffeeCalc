import React, { useState } from 'react'
import Svgs from '../../svg/Svgs'
import { myFetch } from '../../utils/myFetch'
import Button from '../UI/Button'
import CardItem from './CardItem'
import { handleQuantityChange, handleAddToCart, handleDeleteItem } from '../../utils/handleCard'
import { useItemsData } from '../context'
import styles from '../../productlist.module.css'

const SearchItems = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchImportance, setSearchImportance] = useState('all')

  const { items, setItems } = useItemsData()

  const handleSearch = e => setSearchTerm(e.target.value)
  const handleSearchImportance = e => setSearchImportance(e.target.value)

  const currentFilteredItems = items.filter(item => {
    return (
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (searchImportance === 'all' ||
        (searchImportance === 'inStock' && item.quantityLeft > 0) ||
        (searchImportance === 'above10' && item.quantityLeft >= 10))
    )
  })

  const handleFetchItems = async () => {
    const itemsFetched = await myFetch({ url: 'https://localhost:5000/items' }) // fetch items from the server to see item updates (just refreshing the page will use localhost items)
    setItems(itemsFetched)
    localStorage.setItem('items', JSON.stringify(itemsFetched))
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        <Svgs name="search-icon" className="search__icon" />
        <input type="search" placeholder="search..." value={searchTerm} onChange={handleSearch} className="input__one" />
        <select value={searchImportance} onChange={handleSearchImportance}>
          <option value="all"> Show All </option>
          <option value="inStock"> In Stock </option>
          <option value="above10"> Above 10 Left </option>
        </select>
        <Button handler={handleFetchItems}> Refresh Items </Button>
      </div>
      <div className={styles.product__grid}>
        {currentFilteredItems.map(item => (
          <CardItem
            key={item._id}
            prevItem={item}
            handleQuantityChange={handleQuantityChange}
            handleAddToCart={handleAddToCart}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
    </>
  )
}
export default SearchItems
