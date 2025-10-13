import { useRef, useState } from 'react'
import Button from '../UI/Button'
import CoffeeDropdown from './CoffeeDropdown'
import styles from './coffeepostform.module.css'
import { useUserData } from '../../context/UserContext'
import { myFetch } from '../../utils/myFetch'
import { useUiData } from '../../context'
//prettier-ignore
const CoffeePostForm = ({ setCoffeeHistory }) => {
  const [selectedCoffee, setSelectedCoffee] = useState(null)

  const { user } = useUserData()
  const { error, setError } = useUiData()

  const newCoffeeDataEntry = useRef({ servingSize: '', cost: '', mood: '', location: '', hours: '', minutes: '' })

  const handleChange = (e) => {
    const { value, ariaLabel } = e.target;
    newCoffeeDataEntry.current[ariaLabel] = value; 
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    if (!selectedCoffee?.name || !newCoffeeDataEntry.current.servingSize || !newCoffeeDataEntry.current.cost || !newCoffeeDataEntry.current.hours || !newCoffeeDataEntry.current.minutes) {
      setError("Missing Fields!")
      setTimeout(() => setError(""), 3000)
      return
    }

    const coffeeData = {
      name: selectedCoffee?.name,
      servingSize: newCoffeeDataEntry.current.servingSize,
      cost: newCoffeeDataEntry.current.cost,
      mood: newCoffeeDataEntry.current.mood,
      location: newCoffeeDataEntry.current.location,
    }

    const newCoffeeData = {}

    const nowTime = Date.now()
    const timeToSubtract = newCoffeeDataEntry.current.hours * 60 * 60 * 1000 + newCoffeeDataEntry.current.minutes * 60 * 1000
    const timestamp = nowTime - timeToSubtract
    newCoffeeData[timestamp] = coffeeData
    
    await myFetch({ url: `https://localhost:5000/UserCoffeeHistory/${user._id}`, method: 'POST', data: newCoffeeData })

    setCoffeeHistory(prev => ({...prev, ...newCoffeeData }))
  }

  return (
    <>
      <form onSubmit={handleSubmitForm} style={{ border: "3px solid var(--my-darkpink)"}}>
          <CoffeeDropdown setSelectedCoffee={setSelectedCoffee} selectedCoffee={selectedCoffee} />
          <div className={styles.inputs__wrapper} style={{flexDirection: "row"}}>
            <div>
              <input type="number" aria-label="servingSize" className="input__one" onChange={handleChange} placeholder="Serving Size" step="0.1" min="0.1" max="5" required />
              <label> Serving Size: </label>
            </div>
            <div>
              <input type="number" aria-label="cost" className="input__one" onChange={handleChange} placeholder="Cost" required />
              <label> Cost: </label>
            </div>
          </div>
        <fieldset>
          <legend> Mood & Location: </legend>
          <div className={styles.inputs__wrapper}>
            <div>
              <textarea type="text" aria-label="mood" className="input__one" onChange={handleChange} placeholder="Mood(optional)" />
              <label> Mood: </label>
            </div>
            <div>
              <input type="text" aria-label="location" className="input__one" onChange={handleChange} placeholder="Location(optional)" />
              <label> Location: </label>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend> Time Ago: </legend>
          <div className={styles.inputs__wrapper} style={{flexDirection: "row"}}>
            <div>
              <input type="number" aria-label="hours" className="input__one" onChange={handleChange} placeholder="Hours" min="0" max="71" required />
              <label> Hours: </label>
            </div>
            <div>
              <input type="number" aria-label="minutes" className="input__one" onChange={handleChange} placeholder="Minutes" min="0" max="59" required />
              <label> Minutes: </label>
            </div>
          </div>
        </fieldset>
        <Button type="submit"> Submit </Button>
        <Button type="reset"> Reset </Button>
      </form>
      <div style={{ color: "red" }}> {error} </div>
    </>
  )
}
export default CoffeePostForm