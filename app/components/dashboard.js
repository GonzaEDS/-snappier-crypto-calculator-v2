import coinGecko from '../helpers/coinGeckoApi.js'
import { ajax } from '../helpers/ajax.js'
import {
  sortTable,
  filterTable,
  populateArray,
  displayCalculator,
  resetTable
} from '../helpers/table.js'

export function renderTable() {
  //vars

  const coinObjects = []
  const tableHeadersArray = [
    'current_price',
    'ath',
    'ath_change_percentage',
    'circulating_supply',
    'market_cap_rank'
  ]

  // DOM elements
  const dashboardTableBody = document.querySelector('.table-body')
  const sortSelecor = document.querySelector('#sort')
  const dashboardFilter = document.querySelector('#filter')

  callTable()
  setInterval(callTable, 60000)

  sortSelecor.addEventListener('change', () => {
    resetTable(renderTable)
  })

  dashboardFilter.addEventListener('keyup', () => {
    resetTable(renderTable)
  })

  // Functions
  function callTable() {
    ajax({
      url: coinGecko.dashboard_call,
      cbSuccess: res => {
        populateArray(res, coinObjects)
        resetTable(renderTable)
        console.log('click')
      }
    })
  }

  function renderTable() {
    let coinsCopy = coinObjects
    const sortSelecorValue = sortSelecor.value
    const dashboardFilterValue = dashboardFilter.value

    sortTable(sortSelecorValue, coinsCopy)
    coinsCopy = filterTable(dashboardFilterValue, coinsCopy, coinObjects)

    coinsCopy.forEach(coin => {
      const tableRow = document.createElement('tr')
      tableRow.classList.add(`${coin.id}`)
      const coinTd = document.createElement('td')
      const logoImg = document.createElement('img')
      logoImg.src = `${coin.image}`
      coinTd.appendChild(logoImg)
      const name = document.createTextNode(coin.name)

      coinTd.appendChild(name)
      tableRow.appendChild(coinTd)
      dashboardTableBody.appendChild(tableRow)

      tableHeadersArray.forEach(header => {
        let tableData = document.createElement('td')
        let input = document.createTextNode(`${coin[header]}`)
        tableData.appendChild(input)
        tableData.classList.add(`${header}`)
        tableRow.appendChild(tableData)
      })

      dashboardTableBody.appendChild(tableRow)

      displayCalculator(tableRow, coin)
    })
  }
}
