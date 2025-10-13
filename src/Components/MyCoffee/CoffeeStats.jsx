import { TopFive } from './TopFive'
import { CoffeeHistoryEntries } from './CoffeeHistoryEntries'

//prettier-ignore
const CoffeeStats = ({coffeeHistory, setCoffeeHistory, coffeeStats}) => {

  return (
    <>
      <div style={{textAlign: "left", fontSize:"1.8rem"}} >
        <p> Avg Caffeine Per Cup: <span style={{color:"var(--my-turquise)"}}> {coffeeStats.avg_caffeine_per_cup}</span><span style={{color:"var(--my-lightbrown)"}}>mg </span> </p>
        <p> Avg Daily Caffeine <span style={{fontSize:"1.2rem"}}>{`(Excluding days without coffee)`}</span>: <span style={{color:"var(--my-turquise)"}}>{coffeeStats.avg_daily_caffeine_excluding_days_without_coffee}</span><span style={{color:"var(--my-lightbrown)"}}>mg </span></p>
        <p> Avg Daily Caffeine <span style={{fontSize:"1.2rem"}}>{`(Including days without coffee)`}</span>: <span style={{color:"var(--my-turquise)"}}>{coffeeStats.avg_daily_caffeine_including_days_without_coffee}</span><span style={{color:"var(--my-lightbrown)"}}>mg </span> </p>
        <p> Avg Daily Cost: <span style={{color:"var(--my-purple)"}}> {coffeeStats.avg_daily_cost} </span> </p>
        <p> Avg Daily Cups: <span style={{color:"var(--my-purple)"}}> {coffeeStats.avg_daily_cups} </span> </p>
        <p> Days Without Coffee: <span style={{color:"var(--my-purple)"}}> {coffeeStats.days_with_no_coffee} </span> </p>
        <p> Total Cups Drank: <span style={{color:"var(--my-purple)"}}> {coffeeStats.avg_caffeine_per_cup > 0 ? (coffeeStats.total_caffeine / coffeeStats.avg_caffeine_per_cup).toFixed(0) : 0} </span> </p>
        <p> Total Caffeine Consumed: <span style={{color:"var(--my-turquise)"}}> {coffeeStats.total_caffeine}</span><span style={{color:"var(--my-lightbrown)"}}>mg </span></p>
        <p> Total Money Spent on Coffee: <span style={{color:"var(--my-purple)"}}> {coffeeStats.total_cost} </span> </p>
        <TopFive coffeeHistory={coffeeHistory} />
        <CoffeeHistoryEntries coffeeHistory={coffeeHistory} setCoffeeHistory={setCoffeeHistory}/> 
      </div>
    </>
  )
}

export default CoffeeStats