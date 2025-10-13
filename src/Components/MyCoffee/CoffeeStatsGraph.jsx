import { useState } from 'react'
import Plot from 'react-plotly.js'
import { getMonthlyStats, getWeeklyStats } from '../../utils'

const CoffeeStatsGraph = ({ coffeeStats }) => {
  const [graphType, setGraphType] = useState('daily')

  const arrOfDayEntries = Object.entries(
    graphType === 'daily' ? coffeeStats : graphType === 'weekly' ? getWeeklyStats(coffeeStats) : getMonthlyStats(coffeeStats)
  ).map(([dateString, values]) => ({
    day: dateString,
    caffeine: values.caffeine,
    avg_caffeine_per_cup: values.avg_caffeine_per_cup,
    avg_caffeine_per_day: values.avg_caffeine_per_day,
    avg_cost_per_cup: values.avg_cost_per_cup,
    avg_cost_per_day: values.avg_cost_per_day
  }))

  const dates = arrOfDayEntries.map(entry => (entry.day).slice(5))

  const caffeineLevels = arrOfDayEntries.map(entry => entry.caffeine)
  const avg_caffeine_per_cup = arrOfDayEntries.map(entry => entry.avg_caffeine_per_cup)
  const avg_caffeine_per_day = arrOfDayEntries.map(entry => entry.avg_caffeine_per_day)
  const avg_cost_per_cup = arrOfDayEntries.map(entry => entry.avg_cost_per_cup)
  const avg_cost_per_day = arrOfDayEntries.map(entry => entry.avg_cost_per_day)

  const dailyData = [
    {
      x: dates,
      y: caffeineLevels,
      type: 'scatter',
      mode: 'lines+markers',
      name: `Caffeine ${graphType === 'daily' ? 'Today' : graphType === 'weekly' ? 'Weekly' : 'Monthly'}`,
      hoverlabel: {
        font: {
          size: 16
        },
        namelength: -1
      },
      hovertemplate: `Date: %{x}<br>Caffeine ${graphType === 'daily' ? 'Today' : graphType === 'weekly' ? 'Weekly' : 'Monthly'}: %{y}`,
      connectgaps: true
    },
    {
      x: dates,
      y: avg_caffeine_per_cup,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Avg Caffeine Per Cup',
      hoverlabel: {
        font: {
          size: 16
        },
        namelength: -1
      },
      hovertemplate: `Date: %{x}<br>Avg Caffeine Per Cup: %{y}`,
      connectgaps: true
    },
    {
      x: dates,
      y: avg_caffeine_per_day,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Avg Caffeine Per Day',
      hoverlabel: {
        font: {
          size: 16
        },
        namelength: -1
      },
      hovertemplate: `Date: %{x}<br>Avg Caffeine Per Day: %{y}`,
      connectgaps: true
    },
    {
      x: dates,
      y: avg_cost_per_cup,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Avg Cost Per Cup',
      hoverlabel: {
        font: {
          size: 16
        },
        namelength: -1
      },
      hovertemplate: `Date: %{x}<br>Avg Cost Per Cup: %{y}`,
      connectgaps: true
    },
    {
      x: dates,
      y: avg_cost_per_day,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Avg Cost Per Day',
      hoverlabel: {
        font: {
          size: 16
        },
        namelength: -1
      },
      hovertemplate: `Date: %{x}<br>Avg Cost Per Day: %{y}`,
      connectgaps: true
    }
  ]

  const titleText =
    graphType === 'daily'
      ? 'Daily Coffee History'
      : graphType === 'weekly'
        ? 'Weekly Coffee History'
        : graphType === 'monthly'
          ? 'Monthly Coffee History'
          : 'Caffeine History'

  //prettier-ignore
  return (
    <>
      <div style={{fontSize: "2.6rem"}}>
        <label htmlFor="daily">
          <input type="radio" id="daily" name="graphType" value="daily" checked={graphType === 'daily'} onChange={e => setGraphType(e.target.value)} />
          Daily
        </label>
        <label htmlFor="weekly">
        <input type="radio" id="weekly" name="graphType" value="weekly" checked={graphType === 'weekly'} onChange={e => setGraphType(e.target.value)} />
          Weekly
        </label>
        <label htmlFor="monthly">
          <input type="radio" id="monthly" name="graphType" value="monthly" checked={graphType === 'monthly'} onChange={e => setGraphType(e.target.value)} />
          Monthly
        </label>
      </div>
      {dailyData.length > 0 &&
        <Plot
          data={dailyData}
          layout={{
            title: {
              text: titleText,
              font: {
                size: 22,
                color: 'rgb(210, 170, 97)'
              }
            },
            xaxis: {
              title: {
                text: `${graphType}`,
                font: {
                  size: 16,
                  color: 'rgb(210, 170, 97)'
                },
              },
              tickfont: {
                size: 14,
                color: 'rgb(210, 170, 97)'
              },
              type: 'category',
              tickangle: 60, 
            },
            yaxis: {
              title: {
                text: 'Caffeine & Cost',
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
      }
    </>
  )
}
export default CoffeeStatsGraph
