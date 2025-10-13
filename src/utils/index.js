export const statusLevels = {
  veryLow: {
    color: '#2d6a4f',
    background: '#e0f2e9',
    description: 'Caffeine levels are minimal, offering little to no noticeable effect on alertness.',
    maxLevel: 50
  },
  low: {
    color: '#047857',
    background: '#d1fae5',
    description: 'Caffeine levels are mild, resulting in a light boost in alertness with minimal side effects.',
    maxLevel: 100
  },
  moderate: {
    color: '#b45309',
    background: '#fef3c7',
    description: 'A moderate amount of caffeine leads to noticeable stimulation, increased focus, and potential restlessness.',
    maxLevel: 200
  },
  high: {
    color: '#e11d48',
    background: '#ffe4e6',
    description:
      'Elevated caffeine levels can cause jitteriness, rapid heartbeat, and trouble concentrating, signaling an excessive intake.',
    maxLevel: 400
  },
  veryHigh: {
    color: '#9d174d',
    background: '#f9d5d8',
    description: 'Excessive caffeine intake causes significant discomfort, including anxiety, rapid heartbeat, and severe restlessness.',
    maxLevel: 1000
  },
  extreme: {
    color: '#8b0000',
    background: '#f7c7c9',
    description: 'Extreme caffeine levels lead to dangerous symptoms such as nausea, heart palpitations, and serious physical effects.',
    maxLevel: 5000
  }
}

export const coffeeOptions = [
  {
    name: 'Espresso',
    caffeine: 63,
    description: 'Espresso is a small, strong coffee made by forcing hot water through finely-ground coffee beans at high pressure.'
  },
  {
    name: 'Double Espresso',
    caffeine: 126,
    description: 'A Double Espresso is two shots of espresso, resulting in a stronger flavor and higher caffeine content.'
  },
  {
    name: 'Americano',
    caffeine: 96,
    description: 'An Americano is made by diluting a shot (or more) of espresso with hot water, creating a lighter and larger coffee.'
  },
  {
    name: 'Cappuccino',
    caffeine: 80,
    description:
      'Cappuccino is made with equal parts espresso, steamed milk, and frothed milk, creating a creamy, rich coffee with a foam top.'
  },
  {
    name: 'Latte',
    caffeine: 80,
    description:
      'A Latte consists of one shot of espresso and steamed milk, topped with a small amount of foam, creating a smooth and creamy flavor.'
  },
  {
    name: 'Turkish Coffee',
    caffeine: 160,
    description:
      'Turkish Coffee is made by boiling finely ground coffee beans in water with sugar, often served with a piece of Turkish delight.'
  },
  {
    name: 'Black Coffee',
    caffeine: 95,
    description: 'Black Coffee is brewed by extracting coffee from ground beans using hot water without any milk or flavorings.'
  },
  {
    name: 'Macchiato',
    caffeine: 85,
    description: 'Macchiato is an espresso with a small amount of foamed milk, resulting in a strong and bold coffee flavor.'
  },
  {
    name: 'Affogato',
    caffeine: 65,
    description: 'Affogato is a dessert-style coffee made by pouring a shot of hot espresso over a scoop of vanilla ice cream.'
  },
  {
    name: 'Flat White',
    caffeine: 130,
    description:
      'A Flat White consists of a shot of espresso and steamed milk, but with less foam than a cappuccino, giving it a smooth, velvety texture.'
  },
  {
    name: 'Cortado',
    caffeine: 85,
    description: 'A Cortado is made by combining equal parts espresso and steamed milk, creating a balanced, rich coffee.'
  },
  {
    name: 'Red Eye',
    caffeine: 159,
    description: 'A Red Eye is a regular drip coffee with a shot of espresso added for an extra boost of caffeine.'
  },
  {
    name: 'Iced Coffee',
    caffeine: 90,
    description: 'Iced Coffee is brewed coffee served cold over ice, offering a refreshing and chilled way to enjoy coffee.'
  },
  {
    name: 'Cold Brew',
    caffeine: 155,
    description:
      'Cold Brew is coffee that has been brewed with cold water for an extended period (usually 12-24 hours), resulting in a smooth, less acidic taste.'
  },
  {
    name: 'Nitro Cold Brew',
    caffeine: 215,
    description:
      'Nitro Cold Brew is cold brew coffee infused with nitrogen, giving it a creamy texture and a frothy, stout-like appearance.'
  },
  {
    name: 'Drip Coffee',
    caffeine: 120,
    description:
      'Drip Coffee is brewed by dripping hot water over ground coffee beans, typically using a coffee maker, producing a smooth, traditional coffee.'
  },
  {
    name: 'Frappuccino',
    caffeine: 95,
    description: 'A Frappuccino is a blended iced coffee drink made with espresso, milk, ice, and flavorings such as chocolate or vanilla.'
  },
  {
    name: 'Mocha',
    caffeine: 90,
    description: 'Mocha is a coffee drink made with espresso, steamed milk, and chocolate syrup, often topped with whipped cream.'
  },
  {
    name: 'Irish Coffee',
    caffeine: 70,
    description: 'Irish Coffee is made with hot coffee, Irish whiskey, sugar, and topped with whipped cream.'
  },
  {
    name: 'Vietnamese Coffee',
    caffeine: 100,
    description:
      'Vietnamese Coffee is made with strong coffee brewed using a traditional Vietnamese drip filter, often served sweetened with condensed milk.'
  },
  {
    name: 'Decaf Coffee',
    caffeine: 2,
    description:
      'Decaf Coffee is coffee made from beans that have had most of their caffeine content removed through various decaffeination processes.'
  },
  {
    name: 'Chai Latte',
    caffeine: 40,
    description:
      'A Chai Latte is a spiced tea drink made with a mix of black tea, spices (like cinnamon and cardamom), steamed milk, and sweetener.'
  },
  {
    name: 'Matcha Latte',
    caffeine: 70,
    description: 'A Matcha Latte is made with powdered green tea (matcha) and steamed milk, creating a vibrant, earthy flavor.'
  },
  {
    name: 'Monster Energy',
    caffeine: 160,
    description: 'Monster Energy is a popular energy drink containing caffeine, taurine, and B vitamins, providing a quick energy boost.'
  },
  {
    name: 'Red Bull',
    caffeine: 80,
    description: 'Red Bull is an energy drink containing caffeine, taurine, and sugar, commonly used for an energy boost.'
  },
  {
    name: 'Rockstar Energy',
    caffeine: 160,
    description: 'Rockstar Energy is an energy drink that contains caffeine, sugars, and additional ingredients like taurine and guarana.'
  },
  {
    name: 'Bang Energy',
    caffeine: 300,
    description: 'Bang Energy is a high-caffeine energy drink with added electrolytes, amino acids, and artificial sweeteners.'
  },
  {
    name: 'Celsius Energy Drink',
    caffeine: 200,
    description: 'Celsius is an energy drink that provides a natural caffeine boost from ingredients like green tea extract and guarana.'
  },
  {
    name: '5-hour Energy',
    caffeine: 200,
    description: '5-hour Energy is a small energy shot that provides a quick, concentrated dose of caffeine to combat fatigue.'
  },
  {
    name: 'NOS Energy Drink',
    caffeine: 160,
    description:
      'NOS Energy Drink contains caffeine, taurine, and B vitamins, designed to provide an energy boost during physical activity.'
  },
  {
    name: 'Reign Energy Drink',
    caffeine: 300,
    description:
      'Reign Energy Drink is a high-caffeine beverage that also contains electrolytes and BCAAs (Branched-Chain Amino Acids) for recovery and energy.'
  },
  {
    name: 'Starbucks Doubleshot',
    caffeine: 135,
    description:
      'Starbucks Doubleshot is a canned beverage that combines espresso, cream, and a touch of sweetness for a strong, smooth coffee flavor.'
  },
  {
    name: 'Monster Java',
    caffeine: 188,
    description: 'Monster Java is a coffee-based energy drink with a rich coffee flavor, caffeine, and added sugars.'
  },
  {
    name: 'AMP Energy Drink',
    caffeine: 142,
    description: 'AMP Energy Drink provides caffeine and a boost of energy, with added flavors and sweeteners.'
  },
  {
    name: 'Zipfizz',
    caffeine: 100,
    description:
      'Zipfizz is an energy supplement in powdered form that you mix with water, providing a boost of caffeine along with vitamins and electrolytes.'
  }
]

export const coffeeConsumptionHistory = { // mock for testing
  1735111502183: { name: 'Espresso', cost: 5.52, servingSize: 1.5, mood: 'good', location: 'earth' },
  1735090533976: { name: 'Espresso', cost: 6.78, servingSize: 1.5, mood: 'good', location: 'earth' },
  1735199427371: { name: 'Espresso', cost: 6.93, servingSize: 1.5, mood: 'good', location: 'earth' },
  1735188948195: { name: 'Espresso', cost: 4.9, servingSize: 1.5, mood: 'good', location: 'earth' },
  1735232424024: { name: 'Espresso', cost: 4.88, servingSize: 1.5, mood: 'good', location: 'earth' }
}

export function getCaffeineAmount(coffeeName) {
  const coffee = coffeeOptions.find(c => c.name === coffeeName)
  return coffee ? coffee.caffeine : 0
}

export function calculateCurrentCaffeineLevel(historyData, halfLifeHours, timeNow = Date.now()) {
  const halfLife = halfLifeHours * 60 * 60 * 1000
  const maxAge = 72 * 60 * 60 * 1000 // 72h

  let totalCaffeine = 0

  for (const [timestamp, entry] of Object.entries(historyData)) {
    const timeElapsed = timeNow - parseInt(timestamp)

    if (timeElapsed <= maxAge && timeElapsed > 0) {
      const caffeineInitial = getCaffeineAmount(entry.name) * entry.servingSize
      const remainingCaffeine = caffeineInitial * Math.pow(0.5, timeElapsed / halfLife) // half life function
      totalCaffeine += remainingCaffeine
    }
  }

  return totalCaffeine.toFixed(2)
}

export function generateCaffeineHistory(historyData, halfLifeHours) {
  const hoursBack = 72
  const timeIntervals = []
  const caffeineLevels = []
  const coffeeDetails = []

  for (let i = 0; i <= hoursBack; i++) {
    const currentTime = Date.now() - i * 60 * 60 * 1000
    const caffeineLevelAtTime = calculateCurrentCaffeineLevel(historyData, halfLifeHours, currentTime)

    timeIntervals.push(i)
    caffeineLevels.push(caffeineLevelAtTime)

    const closestEntry = Object.entries(historyData).find(([timestamp]) => {
      const entryTime = parseInt(timestamp)
      const timeDifference = currentTime - entryTime
      return timeDifference <= 60 * 60 * 1000 && timeDifference >= 0
    })

    if (closestEntry)
      coffeeDetails.push(
        closestEntry[1].name +
          ', Serving Size: ' +
          closestEntry[1].servingSize +
          ', Location: ' +
          closestEntry[1].location +
          ', Mood: ' +
          closestEntry[1].mood
      )
    else coffeeDetails.push('No entry')
  }

  return { timeIntervals, caffeineLevels, coffeeDetails }
}

export function getTopFiveCoffees(historyData) {
  const coffeeCount = {}
  for (const entry of Object.values(historyData)) {
    if (coffeeCount[entry.name]) coffeeCount[entry.name]++
    else coffeeCount[entry.name] = 1
  }

  const sortedCoffees = Object.entries(coffeeCount).sort((a, b) => b[1] - a[1])

  const totalCoffees = Object.values(coffeeCount).reduce((sum, count) => sum + count, 0)

  const topFive = sortedCoffees.slice(0, 5).map(([coffeeName, count]) => {
    const percentage = ((count / totalCoffees) * 100).toFixed(2)
    return {
      coffeeName: coffeeName,
      count: count,
      percentage: percentage + '%'
    }
  })

  return topFive
}

export function getTimeSinceConsumption(utcMilliseconds) {
  const now = Date.now()
  const diffInMilliseconds = now - utcMilliseconds

  const seconds = Math.floor(diffInMilliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)

  const remainingDays = days % 30
  const remainingHours = hours % 24
  const remainingMinutes = minutes % 60
  const remainingSeconds = seconds % 60

  let result = ''
  result += `${months}M `
  result += `${remainingDays}D `
  result += `${remainingHours}H `
  result += `${remainingMinutes}M `
  result += `${remainingSeconds}S`

  return result.trim()
}

//prettier-ignore

export function calculateCoffeeStats(coffeeConsumptionHistory) {
  const dailyStats = {}

  let highestCaffeineDay = { date: '', caffeine: 0 }

  let totalCoffeeCups = 0
  let totalCost = 0
  let totalCaffeine = 0
  let totalDaysWithCoffee = 0

  const timestamps = Object.keys(coffeeConsumptionHistory).map(Number)
  const startDate = new Date(Math.min(...timestamps)); 
  startDate.setHours(24, 0, 0, 0); 
  const endDate = new Date(Math.max(...timestamps));
  endDate.setHours(24, 0, 0, 0); 
  
  let currentDate = new Date(startDate) // copy for the while loop

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0] // extract YYYY-MM-DD

    // get all entries for a specific day
    const entriesForDay = Object.entries(coffeeConsumptionHistory).filter(([timestamp, coffee]) => {
      const timestampDate = new Date(parseInt(timestamp))
      return timestampDate.toISOString().split('T')[0] === dateString
    })

    if (entriesForDay.length === 0) dailyStats[dateString] = { caffeine: 0, cost: 0, count: 0 } // add days without coffee
    else {
      entriesForDay.forEach(([timestamp, coffee]) => {
        const caffeine = getCaffeineAmount(coffee.name) * coffee.servingSize
        const cost = parseFloat(coffee.cost)

        if (!dailyStats[dateString]) dailyStats[dateString] = { caffeine: 0, cost: 0, count: 0 }
        
        totalCoffeeCups += 1
        totalCost += cost

        dailyStats[dateString].caffeine += caffeine
        dailyStats[dateString].cost += cost
        dailyStats[dateString].count += 1
      })

      const daysUntilThisDay = Object.keys(dailyStats).length
      let totalCaffeineUntilThisDay = 0
      let totalCostUntilThisDay = 0
      for (const [date, stats] of Object.entries(dailyStats)) {
        if (stats.caffeine > 0) {
          totalCaffeineUntilThisDay += stats.caffeine
          totalCostUntilThisDay += stats.cost
        } 
      }
      dailyStats[dateString].avg_caffeine_per_day = (totalCaffeineUntilThisDay / daysUntilThisDay).toFixed(2)
      dailyStats[dateString].avg_caffeine_per_cup = (totalCaffeineUntilThisDay / totalCoffeeCups).toFixed(2)
      dailyStats[dateString].avg_cost_per_day = (totalCostUntilThisDay / daysUntilThisDay).toFixed(2)
      dailyStats[dateString].avg_cost_per_cup = (totalCostUntilThisDay / totalCoffeeCups).toFixed(2)
    }

    currentDate.setDate(currentDate.getDate() + 1) // goto next day
  }

  const days = Object.keys(dailyStats).length
  for (const [date, stats] of Object.entries(dailyStats)) {
    if (stats.caffeine > 0) {
      totalCaffeine += stats.caffeine
      totalDaysWithCoffee += 1
      if (stats.caffeine > highestCaffeineDay.caffeine) highestCaffeineDay = { date, caffeine: stats.caffeine }
    }
  }

  const averageDailyCaffeineExcludingDaysWithoutCoffee = totalDaysWithCoffee > 0 ? (totalCaffeine / totalDaysWithCoffee).toFixed(2) : 0
  const averageDailyCaffeineIncludingDaysWithoutCoffee = days > 0 ? (totalCaffeine / days).toFixed(2) : 0
  const averageDailyCost = totalDaysWithCoffee > 0 ? (totalCost / totalDaysWithCoffee).toFixed(2) : 0
  const averageCaffeinePerCup = totalCaffeine > 0 ? (totalCaffeine / totalCoffeeCups).toFixed(2) : 0
  const daysWithNoCoffee = days - totalDaysWithCoffee

  return { 
    avg_daily_caffeine_excluding_days_without_coffee: averageDailyCaffeineExcludingDaysWithoutCoffee,
    avg_daily_caffeine_including_days_without_coffee: averageDailyCaffeineIncludingDaysWithoutCoffee,
    avg_daily_cost: averageDailyCost,
    avg_daily_cups: (totalCoffeeCups / days).toFixed(2),
    highest_caffeine_day: highestCaffeineDay,
    avg_caffeine_per_cup: averageCaffeinePerCup,
    days_with_no_coffee: daysWithNoCoffee,
    total_caffeine: totalCaffeine.toFixed(2),
    total_cost: totalCost.toFixed(2),
    daily_stats: dailyStats
  }
}

function getWeekNumber(date) {
  const start = new Date(date.getFullYear(), 0, 1)
  const diff = date - start
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay) // floor makes today not included, ceil includes today
  return Math.ceil((dayOfYear + 1) / 7) // add 1 cuz days start from 0
}

export function getWeeklyStats(dailyStats) {
  const weeklyStats = {}

  let yearWeek, prevYearWeek, lastDate
  for (const [date, stats] of Object.entries(dailyStats)) {
    const dateObj = new Date(date)
    const weekNumber = getWeekNumber(dateObj)
    yearWeek = `${dateObj.getFullYear()}-W${weekNumber}`

    if (prevYearWeek && prevYearWeek !== yearWeek) {
      weeklyStats[prevYearWeek].avg_caffeine_per_day = dailyStats[lastDate].avg_caffeine_per_day
      weeklyStats[prevYearWeek].avg_caffeine_per_cup = dailyStats[lastDate].avg_caffeine_per_cup
      weeklyStats[prevYearWeek].avg_cost_per_day = dailyStats[lastDate].avg_cost_per_day
      weeklyStats[prevYearWeek].avg_cost_per_cup = dailyStats[lastDate].avg_cost_per_cup
    }

    prevYearWeek = yearWeek
    lastDate = date

    if (!weeklyStats[yearWeek]) weeklyStats[yearWeek] = { caffeine: 0, cost: 0, count: 0 }

    weeklyStats[yearWeek].caffeine += stats.caffeine
    weeklyStats[yearWeek].cost += stats.cost
    weeklyStats[yearWeek].count += stats.count
  }

  if (yearWeek && !weeklyStats[yearWeek].avg_caffeine_per_day) {
    weeklyStats[yearWeek].avg_caffeine_per_day = dailyStats[lastDate].avg_caffeine_per_day
    weeklyStats[yearWeek].avg_caffeine_per_cup = dailyStats[lastDate].avg_caffeine_per_cup
    weeklyStats[yearWeek].avg_cost_per_day = dailyStats[lastDate].avg_cost_per_day
    weeklyStats[yearWeek].avg_cost_per_cup = dailyStats[lastDate].avg_cost_per_cup
  }

  return weeklyStats
}

export function getMonthlyStats(dailyStats) {
  const monthlyStats = {}

  let yearMonth, prevYearMonth, lastDate // save previous month to get the last day of the month averages as that months averages
  for (const [date, stats] of Object.entries(dailyStats)) {
    const dateObj = new Date(date)
    yearMonth = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`

    if (prevYearMonth && prevYearMonth !== yearMonth) {
      monthlyStats[prevYearMonth].avg_caffeine_per_day = dailyStats[lastDate].avg_caffeine_per_day
      monthlyStats[prevYearMonth].avg_caffeine_per_cup = dailyStats[lastDate].avg_caffeine_per_cup
      monthlyStats[prevYearMonth].avg_cost_per_day = dailyStats[lastDate].avg_cost_per_day
      monthlyStats[prevYearMonth].avg_cost_per_cup = dailyStats[lastDate].avg_cost_per_cup
    }

    prevYearMonth = yearMonth
    lastDate = date

    if (!monthlyStats[yearMonth]) monthlyStats[yearMonth] = { caffeine: 0, cost: 0, count: 0 }

    monthlyStats[yearMonth].caffeine += stats.caffeine
    monthlyStats[yearMonth].cost += stats.cost
    monthlyStats[yearMonth].count += stats.count
  }

  if (yearMonth && !monthlyStats[yearMonth].avg_caffeine_per_day) {
    monthlyStats[yearMonth].avg_caffeine_per_day = dailyStats[lastDate].avg_caffeine_per_day
    monthlyStats[yearMonth].avg_caffeine_per_cup = dailyStats[lastDate].avg_caffeine_per_cup
    monthlyStats[yearMonth].avg_cost_per_day = dailyStats[lastDate].avg_cost_per_day
    monthlyStats[yearMonth].avg_cost_per_cup = dailyStats[lastDate].avg_cost_per_cup
  }

  return monthlyStats
}