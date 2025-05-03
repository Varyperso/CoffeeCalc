import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'

const CoffeePlot = ({ csvData, tableType }) => {
  const [plotData, setPlotData] = useState([])

  const years = []

  useEffect(() => {
    processData(csvData)
  }, [csvData])

  const processData = data => {
    const transformedData = []

    if (Object.keys(data).length === 0) {
      setPlotData([])
      return
    }

    data.forEach(row => {
      const { Country, 'Coffee type': coffeeType, ...years } = row
      Object.keys(years).forEach(year => {
        if (year !== `Total ${tableType} in Tons`) {
          transformedData.push({
            Country: Country,
            CoffeeType: coffeeType,
            Year: year,
            Value: years[year]
          })
        }
      })
    })

    const countries = data.map(item => item.Country)

    for (const key of data.length <= 1 ? Object.keys(data[0]) : Object.keys(data[1])) {
      if (key !== 'Country' && key !== 'Coffee type' && key !== `Total ${tableType} in Tons`) years.push(key)
    }

    const traces = countries.map(country => {
      const countryData = transformedData.filter(item => item.Country === country)

      return {
        x: countryData.map(item => item.Year),
        y: countryData.map(item => item.Value),
        type: 'scatter',
        mode: 'markers+lines',
        name: country,
        hovertemplate: `%{y} Thousand Kgs of ${tableType}<br>%{x} Year`
      }
    })

    setPlotData(traces)
  }

  return (
    <>
      <h1>Coffee {tableType} Visualization</h1>
      <Plot
        data={plotData}
        layout={{
          title: {
            text: `Coffee ${tableType} Over Time`,
            font: {
              size: 24,
              color: 'rgb(90, 144, 200)'
            }
          },
          xaxis: {
            tickmode: 'linear',
            tickvals: years,
            tickangle: 60,
            title: {
              text: 'Year',
              font: {
                size: 20,
                color: 'rgb(200, 166, 149)'
              }
            },
            tickfont: {
              size: 16,
              color: 'rgb(189, 211, 119)'
            }
          },
          yaxis: {
            title: {
              text: `Thousand Kgs of Coffee ${tableType}`,
              font: {
                size: 20,
                color: 'rgb(189, 139, 166)'
              }
            },
            tickfont: {
              size: 18,
              color: 'rgb(161, 177, 119)'
            }
          },
          legend: {
            font: {
              family: 'montserrat, sans-serif',
              size: 12,
              color: 'rgb(200, 120, 169)'
            }
          },
          paper_bgcolor: 'rgb(33, 21, 7)',
          plot_bgcolor: '#1B2D15FF',
          text_color: '#79B864FF',
          margin: {
            l: 80,
            r: 20,
            b: 80,
            t: 50
          },
          autosize: true
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
      />
    </>
  )
}

export default CoffeePlot
