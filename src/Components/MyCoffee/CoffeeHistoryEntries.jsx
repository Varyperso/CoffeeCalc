import React, { useEffect, useState } from 'react'
import { getTimeSinceConsumption } from '../../utils'
import { useUserData } from '../../context/UserContext'
import { myFetch } from '../../utils/myFetch'

export const CoffeeHistoryEntries = ({ coffeeHistory, setCoffeeHistory }) => {
  const [timeSinceConsumption, setTimeSinceConsumption] = useState([])

  const { user } = useUserData()

  const handleDeleteEntry = async time => {
    await myFetch({ url: `https://localhost:5000/UserCoffeeHistory/${user._id}`, method: 'DELETE', data: { timeId: time } })
    console.log('coffeeHistory', coffeeHistory)
    delete coffeeHistory[time]
    const updatedHistory = { ...coffeeHistory }
    setCoffeeHistory(updatedHistory)
  }

  useEffect(() => {
    if (Object.keys(coffeeHistory).length > 0) {
      setTimeSinceConsumption(
        Object.entries(coffeeHistory).map(([time, entry]) => (
          <div key={time}>
            <div style={{ textAlign: 'left' }}>
              {getTimeSinceConsumption(time)} --- {entry.name}
              <span className="deleteCoffeeEntry" onClick={() => handleDeleteEntry(time)}>
                X
              </span>
            </div>
          </div>
        ))
      )
    }
  }, [coffeeHistory])
  return (
    <>
      <p style={{ textAlign: 'center' }}>Coffee History Entries</p>
      <div style={{ maxHeight: '16rem', overflowY: 'scroll', border: '2px solid var(--my-darkpink)' }}>{timeSinceConsumption}</div>
    </>
  )
}
