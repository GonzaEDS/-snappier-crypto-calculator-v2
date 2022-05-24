import { Coin } from './models.js'

// DOM elements
const dashboardCoinsTable = document.querySelector('.coins-table')
const dashboardTableBody = document.querySelector('.table-body')
const calculator = document.querySelector('.calculator')
const calcCoinLogo = document.querySelector('.coinLogo')
const calcSelectedCoin = document.querySelector('.selectedCoin')
const calcUserInput = document.querySelector('.coinInput')
const calcResult = document.querySelector('.result')
const calcReturnArrow = document.querySelector('.arrowSvg')

// Functions
export function populateArray(coinsApiData, coinsArray) {
  coinsApiData.forEach(coin => {
    coinsArray[coin['market_cap_rank'] - 1] = new Coin(
      coin['id'],
      coin['name'],
      coin['symbol'],
      coin['current_price'],
      coin['image'],
      coin['total_supply'],
      coin['ath'],
      coin['ath_change_percentage'],
      coin['circulating_supply'],
      coin['market_cap_rank']
    )
  })
}

export function resetTable(cbRenderTable) {
  document.querySelectorAll('tbody tr').forEach(e => {
    e.remove()
  })
  cbRenderTable()
}

export function filterTable(filter, newArray, array) {
  if (filter) {
    newArray = array.filter(e =>
      e.name.toLowerCase().includes(filter.toLowerCase())
    )
  }
  if (newArray.length == 0) {
    const tableRow = document.createElement('tr')
    tableRow.classList.add('no-matches-row')
    const msjTd = document.createElement('td')
    msjTd.colSpan = 6
    const message = document.createTextNode('No matches')
    msjTd.appendChild(message)
    tableRow.appendChild(msjTd)
    dashboardTableBody.appendChild(tableRow)
  }
  return newArray
}

export function sortTable(selector, array) {
  switch (selector) {
    case 'price':
      array.sort((a, b) => b.current_price - a.current_price)
      break
    case 'ATH':
      array.sort((a, b) => b.ath - a.ath)
      break
    case 'ATHchangepercentage':
      array.sort((a, b) => a.ath_change_percentage - b.ath_change_percentage)
      break
    case 'circulatingSupply':
      array.sort((a, b) => b.circulating_supply - a.circulating_supply)
      break
    case 'marketCap':
      array.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
      break
    case 'name':
      array.sort((a, b) => (a.name > b.name ? 1 : -1))
      break
  }
}

// Calculator

export function displayCalculator(row, coin) {
  row.addEventListener('click', () => {
    calcCoinLogo.src = `${coin.image}`
    calcSelectedCoin.innerHTML = `${coin.name}`
    dashboardCoinsTable.classList.add('displayNone')
    calculator.classList.remove('displayNone')
    calcUserInput.value = 1
    const coinPrice = coin.current_price
    calcResult.innerHTML = `$ ${(coinPrice * calcUserInput.value).toFixed(2)}`
    // respond to any input change
    ;['click', 'keyup', 'change'].forEach(evento =>
      calcUserInput.addEventListener(evento, () => {
        calcResult.innerHTML = `$ ${(coinPrice * calcUserInput.value).toFixed(
          2
        )}`
      })
    )
    // return to table
    calcReturnArrow.addEventListener('click', () => {
      calculator.classList.add('displayNone')
      dashboardCoinsTable.classList.remove('displayNone')
    })
  })
}
