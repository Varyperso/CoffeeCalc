import { calculateCurrentCaffeineLevel } from '../../utils'
//prettier-ignore
export const HalfLifeBar = ({ coffeeHistory, halfLifeHours, setHalfLifeHours }) => {
  let currentCaffeineLevel = calculateCurrentCaffeineLevel(coffeeHistory, halfLifeHours)

  return (
    <div style={{marginBlock: "1rem"}}>
      <p> Half-Life Bar: </p>
      <input type="range" aria-label="halfLife" min="4" max="8" step="0.25" value={halfLifeHours} list="markers" onChange={e => setHalfLifeHours(e.target.value)} />
      <datalist id="markers">
        <option value="4" label="4h"></option>
        <option value="5" label="5h"></option>
        <option value="6" label="6h"></option>
        <option value="7" label="7h"></option>
        <option value="8" label="8h"></option>
      </datalist>
      <div style={{ fontSize: '2.0rem', width: '19ch' }}><strong> Caffeine Now </strong>: <span style={{ color: 'var(--my-turquise)', fontFamily: 'monospace' }}> {currentCaffeineLevel}</span><span style={{ color:"var(--my-lightbrown)" }}>mg </span> </div>
    </div>
  )
}