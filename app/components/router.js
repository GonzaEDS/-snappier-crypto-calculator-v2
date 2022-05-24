import { renderTable } from './dashboard.js'
import coinGecko from '../helpers/coinGeckoApi.js'
import { ajax } from '../helpers/ajax.js'
import {
  sortTable,
  filterTable,
  populateArray,
  displayCalculator,
  resetTable
} from '../helpers/table.js'

export function Router() {
  let { hash } = location
  const body = document.querySelector('body')

  if (location.hash == '') {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', './app/views/dashboard.html')

    xhr.onload = () => {
      body.innerHTML = xhr.responseText
    }

    xhr.send()

    renderTable()
  }
}
