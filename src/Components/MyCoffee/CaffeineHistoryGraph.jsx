import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { generateCaffeineHistory } from '../../utils'

const CaffeineHistory = ({ coffeeHistory, halfLifeHours }) => {
  const [historyData, setHistoryData] = useState({ caffeineLevels: [], timeIntervals: [], coffeeDetails: [] })
  const [markerColors, setMarkerColors] = useState([])

  useEffect(() => {
    const { caffeineLevels, timeIntervals, coffeeDetails } = generateCaffeineHistory(coffeeHistory, halfLifeHours)
    setHistoryData({ caffeineLevels, timeIntervals, coffeeDetails })
  }, [halfLifeHours, coffeeHistory])

  useEffect(() => {
    const colors = historyData.coffeeDetails.map(coffeeName => (coffeeName === 'No entry' ? 'rgb(50, 100, 20)' : 'rgb(120, 60, 20)'))
    setMarkerColors(colors)
  }, [historyData])

  return (
    <Plot
      data={[
        {
          x: historyData.timeIntervals,
          y: historyData.caffeineLevels,
          type: 'scatter',
          mode: 'lines+markers',
          marker: {
            color: markerColors,
            size: 8
          },
          text: historyData.coffeeDetails,
          hovertemplate: `<b>Coffee:</b> %{text}<br>` + `<b>Caffeine Level:</b> %{y} mg<br>` + `<b>Time:</b> %{x} hours ago` // tooltip with coffee name, caffeine level, and time
        }
      ]}
      layout={{
        title: {
          text: `3 Day Coffee History`,
          font: {
            size: 22,
            color: 'rgb(210, 170, 97)'
          }
        },
        xaxis: {
          title: {
            text: 'Hours Ago',
            font: {
              size: 16,
              color: 'rgb(210, 170, 97)'
            }
          },
          tickfont: {
            size: 14,
            color: 'rgb(210, 170, 97)'
          },
          autorange: 'reversed'
        },
        yaxis: {
          title: {
            text: 'Caffeine Level (mg)',
            font: {
              size: 16,
              color: 'rgb(210, 170, 97)'
            }
          },
          tickfont: {
            size: 14,
            color: 'rgb(210, 170, 97)'
          }
        },
        legend: {
          font: {
            family: 'montserrat, sans-serif',
            size: 12,
            color: 'rgb(200, 120, 169)'
          }
        },
        margin: {
          l: 60,
          r: 25,
          b: 50,
          t: 50
        },
        paper_bgcolor: 'rgb(33, 21, 7)',
        plot_bgcolor: '#1B2D15FF',
        autosize: true
      }}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default CaffeineHistory