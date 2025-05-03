import React, { useState, useEffect, useRef } from 'react'
import Papa from 'papaparse'
import CoffeePlot from '../Components/CoffeeWorld/CoffeePlot'
import Button from '../Components/UI/Button'
import styles from './coffeeworld.module.css'
import Svgs from '../svg/Svgs'

function CoffeeInfoTable() {
  const [tableData, setTableData] = useState([])
  const [showTable, setShowTable] = useState(false)
  const [tableType, setTableType] = useState('export')
  const [searchTerm, setSearchTerm] = useState('')

  const sortAscOrDesc = useRef(true)

  useEffect(() => {
    if (tableType) {
      fetch(`http://localhost:5000/WorldCoffeeInfo/${tableType}`)
        .then(response => response.text())
        .then(data => {
          Papa.parse(data, {
            header: true, // true = remove the header
            dynamicTyping: true, // try to parse values as their type(number, bool)
            complete: result => {
              const transformedData = result.data.map(row => {
                return Object.keys(row).reduce((acc, key) => {
                  if (isFinite(row[key])) {
                    if (!isExcludedYear(key)) acc[key] = +(row[key] / 1000000).toFixed(2)
                  } else acc[key] = row[key]
                  return acc
                }, {})
              })
              setTableData(transformedData)
            }
          })
        })
        .catch(error => {
          console.error('Error fetching the CSV file:', error)
        })
    }
  }, [tableType])

  const isExcludedYear = year => {
    const yearParts = year.split('/')
    const yearStart = parseInt(yearParts[0])
    return yearStart >= 1990 && yearStart < 2000
  }

  const handleSearch = e => setSearchTerm(e.target.value)

  const currentFilteredItems = tableData.filter(item => {
    return item.Country.toLowerCase().includes(searchTerm.toLowerCase())
  })

  console.log(currentFilteredItems)

  const handleSort = column => {
    sortAscOrDesc.current = !sortAscOrDesc.current
    let sortReturnValue = sortAscOrDesc.current ? 1 : -1
    const sortedData = [...tableData].sort((a, b) => {
      if (typeof a[column] === 'number' && typeof b[column] === 'number') {
        return (a[column] - b[column]) * sortReturnValue
      } else {
        if (a[column] < b[column]) return -sortReturnValue
        if (a[column] > b[column]) return sortReturnValue
        return 0
      }
    })
    setTableData(sortedData)
  }

  const handleShowTable = () => {
    setShowTable(prev => !prev)
  }

  const handleTableType = e => {
    setTableType(e.target.value)
  }

  return (
    <div className={styles.coffeeInfo__Wrapper}>
      <h1>World-Wide Coffee Data Charts</h1>
      <Button handler={handleShowTable}>Show Table</Button>
      <Svgs name="search-icon" className="search__icon" />
      <input id="searchField" type="text" value={searchTerm} className="input__one" onChange={handleSearch} />
      <select value={tableType} onChange={handleTableType}>
        <option value="export">Exports</option>
        <option value="import">Imports</option>
        <option value="domestic_consumption">Domestic Consumption</option>
        <option value="green_coffee_inventorie">Green Coffee Inventory</option>
        <option value="production">Production</option>
      </select>
      {showTable && (
        <div className={styles.table__wrapper}>
          <table>
            <thead>
              <tr>
                {currentFilteredItems.length > 0 &&
                  Object.keys(currentFilteredItems[0]).map(key => (
                    <th key={key} onClick={() => handleSort(key)}>
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {currentFilteredItems.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <CoffeePlot csvData={currentFilteredItems} tableType={tableType} />
    </div>
  )
}

export default CoffeeInfoTable
