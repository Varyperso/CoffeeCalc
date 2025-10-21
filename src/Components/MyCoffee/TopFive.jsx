import { getTopFiveCoffees } from '../../utils'
export const TopFive = ({ coffeeHistory }) => {
  const topFiveCoffees = getTopFiveCoffees(coffeeHistory)

  return (
    <>
      {topFiveCoffees.length && (
        <table>
          <caption style={{ marginBlock: '0.5rem' }}><u>Top 5 Coffee Types</u></caption>
          <thead>
            <tr>
              {Object.keys(topFiveCoffees[0]).map(objKey => (
                <th key={objKey}> {objKey[0].toUpperCase() + objKey.slice(1)} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topFiveCoffees.map(({ coffeeName, count, percentage }) => (
              <tr key={coffeeName}>
                <td> {coffeeName} </td>
                <td> {count} </td>
                <td> {percentage} </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}