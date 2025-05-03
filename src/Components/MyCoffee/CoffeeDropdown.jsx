import React, { useState } from 'react'
import styles from './coffeedropdown.module.css'
import Button from '../UI/Button'
import { coffeeOptions } from '../../utils/index'

const CoffeeDropdown = ({ selectedCoffee, setSelectedCoffee }) => {
  const [showCoffeeTypes, setShowCoffeeTypes] = useState(false)

  const selectOption = option => {
    setSelectedCoffee(option)
    setShowCoffeeTypes(false)
  }

  return (
    <>
      <div className={styles.dropdownContainer}>
        <Button handler={() => setShowCoffeeTypes(!showCoffeeTypes)}>{selectedCoffee ? selectedCoffee.name : 'Select Coffee Type'}</Button>
        {showCoffeeTypes && (
          <div className={styles.dropdownPopup}>
            {coffeeOptions.map(option => (
              <div key={option.name} className={styles.dropdownItem} onClick={() => selectOption(option)}>
                <span data-description={option.description} className={styles.coffeeDescription} tabIndex="1">
                  ?
                </span>
                <span>{option.name}</span>
                <span>{option.caffeine}mg</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default CoffeeDropdown
