import { BigNumber } from 'ethers'
import ms from 'ms'

export const getDateLong = (date) => {
  const newFormatDate =
    new Date(date).toLocaleString('en-us', { month: 'long' }) +
    ' ' +
    new Date(date).getDate() +
    ', ' +
    new Date(date).getFullYear()

  return newFormatDate
}
export const getDateShort = (date) => {
  const newFormatDate =
    new Date(date).toLocaleString('en-us', { month: 'short' }) +
    ' ' +
    new Date(date).getDate() +
    ', ' +
    new Date(date).getFullYear()

  return newFormatDate
}

/**
 * @param {number} duration the duration in milliseconds
 * @return { {days: number, hours: number, minutes: number, seconds: number} }
 */

export const splitDuration = (duration) => {
  const baseSecs = duration
  const days = Math.floor(baseSecs / 86400)
  const hours = Math.floor((baseSecs - days * 86400) / 3600)
  const minutes = Math.floor((baseSecs - days * 86400 - hours * 3600) / 60)
  const seconds = Math.floor(
    baseSecs - days * 86400 - hours * 3600 - minutes * 60
  )

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

export const durationToHHMMSS = (duration) => {
  const { hours, minutes, seconds } = splitDuration(duration)

  return `${hours}:${minutes}:${seconds}`
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

// returns true if src contains a word that is in the string search

export const hasWord = (src, search = '') => {
  src = src.toLowerCase()
  const searchWords = search.trim().toLowerCase().split(' ')

  for (const word of searchWords) {
    if (!src.includes(word)) return false
  }

  return true
}

/**
 * Returns a copy of arr that doesn't contain any duplicate. The optional predicate is used to determine uniqueness.
 * @param arr {array} The array to filter duplicates from
 * @param predicate  {function} A function that takes an element of the array as an argument. The returned value
 * will be stringified and will be used to compare for uniqueness against next elements.
 *
 * @returns {array}
 */

export const arrayUnique = (arr, predicate = (a) => a) => {
  const ht = {}
  const newArr = []

  for (const el of arr) {
    const uniqueEl = JSON.stringify(predicate(el))
    if (ht[uniqueEl] === undefined) {
      ht[uniqueEl] = true
      newArr.push(el)
    }
  }

  return newArr
}

export const clamp = (n, { min, max }) => {
  let clamped = Math.max(n, min ? min : n)
  clamped = Math.min(clamped, max ? max : clamped)

  return clamped
}

export const partition = (arr, predicate) => {
  const yes = [],
    no = []

  for (const el of arr) {
    predicate(el) ? yes.push(el) : no.push(el)
  }

  return [yes, no]
}

/**
 * Used to compute the amount of DAI (in WEI) that is going
 * to be sent each second.
 */
export const getMultipleOfDelta = (totalAmount, delta) => {
  totalAmount = BigNumber.from(totalAmount)
  delta = BigNumber.from(delta)

  return totalAmount - (totalAmount % delta)
}

/*
 * Shorten an ethereum address, including the first and last four characters. The hex prefix '0x' is always included
 * and don't count in the first four characters.
 * Example: 0xb794f5ea0ba39494ce839613fffba74279579268 => 0xb794...9268
 * @param address
 * @returns {`0x${*}...${*}`}
 */
export const shortenEthereumAddress = (address, n = 4) =>
  address !== 'undefined'
    ? `0x${address.replace(/0x/g, '').slice(0, n)}...${address.slice(-n)}`
    : 'undefined'

/**
 * Ensures all the parameters are defined values.
 * @param items The values to test
 * @returns {boolean} true if all values are defined (does not compare equal to undefined), false if at least one doesn't.
 */
export const isDefined = (...items) => !items.find((item) => item === undefined)

export const toShortDate = (date) => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatEuro = (euroAsString) =>
  String(Number(euroAsString).toFixed(2))

export const flattenObject = (ob) => {
  let result = {}

  for (const i in ob) {
    if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
      const temp = flattenObject(ob[i])
      for (const j in temp) {
        result[i + '.' + j] = temp[j]
      }
    } else {
      result[i] = ob[i]
    }
  }
  return result
}

/**
 *
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean} Whether or not the two dates correspond to the same day of the same year.
 */
export const isSameDayOfTheYear = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getFullYear() === date2.getFullYear()

/**
 * Create a new Date object with only the date of the year and the full year as time information
  query.
 * @param {Date} date
 * @returns {Date}
 */
export const toDayOfTheYear = (date) => {
  const d = new Date('2022-04-17T00:00:00.00Z"')

  d.setDate(date.getDate())
  d.setFullYear(date.getFullYear())

  return d
}

export const isDateString = (dateString) =>
  new Date(dateString).toString() !== 'Invalid Date'

/**
 * @param {Date} date
 * @returns {boolean}
 */
export const isValidDate = (date) => !isNaN(date.getTime())

/**
 *
 * @param {Date} date
 * @returns
 */
export const dateToSolidityTimestamp = (date) =>
  Math.floor(date.getTime() / 1000)

/**
 *
 * @param {string | number} solidityTimestamp
 * @returns
 */
export const solidityTimestampToDate = (solidityTimestamp) =>
  new Date(+solidityTimestamp * 1000)

/**
 * Change window query string
 *
 * @param {Object.<string, any>} params
 */
export const updateQueryString = (params) => {
  const searchParams = new URLSearchParams(window.location.search)

  for (const paramName in params) {
    const paramValue = params[paramName]

    if (paramValue === null) {
      searchParams.delete()
    } else {
      searchParams.set(paramName, String(paramValue))
    }
  }

  if (history.pushState) {
    const newUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }?${searchParams.toString()}`
    window.history.pushState({ path: newUrl }, '', newUrl)
  }
}

/**
 *
 * @param {string | number}
 * @returns {Promise<void>}
 */
export const sleep = async (duration) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(),
      typeof duration === 'string' ? ms(duration) : duration
    )
  )

export const daysToSeconds = (days) => days * (24 * 3600)

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
