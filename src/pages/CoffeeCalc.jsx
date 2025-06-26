import { useEffect, useState } from 'react'
import CoffeePostForm from '../Components/MyCoffee/CoffeePostForm'
import { myFetch } from '../utils/myFetch'
import { useUserData } from '../context/UserContext'
import styles from './coffeecalc.module.css'
import CaffeineHistoryGraph from '../Components/MyCoffee/CaffeineHistoryGraph'
import { HalfLifeBar } from '../Components/MyCoffee/HalfLifeBar'
import CoffeeStatsGraph from '../Components/MyCoffee/CoffeeStatsGraph'
import CoffeeStats from '../Components/MyCoffee/CoffeeStats'
import { calculateCoffeeStats } from '../utils'

export default function CoffeeCalc() {
  const [coffeeHistory, setCoffeeHistory] = useState({})
  const [halfLifeHours, setHalfLifeHours] = useState(4)
  const [coffeeStats, setCoffeeStats] = useState(null)

  const { user } = useUserData()

  useEffect(() => {
    const personalCoffeeData = async () => {
      const data = await myFetch({ url: `https://localhost:5000/UserCoffeeHistory/${user._id}` })
      if (data) setCoffeeHistory(data.coffeeHistory)
    }
    if (user && user._id) personalCoffeeData()
  }, [user._id])

  useEffect(() => {
    if (coffeeHistory) setCoffeeStats(calculateCoffeeStats(coffeeHistory))
  }, [coffeeHistory])

  //prettier-ignore
  return (
    <>
      <div className={styles.calc__wrapper}>
        <div>
          <CoffeePostForm setCoffeeHistory={setCoffeeHistory} />
          <HalfLifeBar coffeeHistory={coffeeHistory} halfLifeHours={halfLifeHours} setHalfLifeHours={setHalfLifeHours} />
        </div>

        <div>
          <CaffeineHistoryGraph coffeeHistory={coffeeHistory} halfLifeHours={halfLifeHours} />
        </div>

        {coffeeStats && <CoffeeStats coffeeHistory={coffeeHistory} setCoffeeHistory={setCoffeeHistory} coffeeStats={coffeeStats} />} 
      </div>
      
      <div>
        {coffeeStats && <CoffeeStatsGraph coffeeStats={coffeeStats.daily_stats} />}
      </div>
    </>
  )
}
