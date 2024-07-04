import * as numeral from 'numeral'

import {
  FIELD_USERNAME_STR_LENGTH,
  FIELD_USERNAME_PROVIDER_ID,
} from '../core/UsernameConfig'

export function formatPrice(p) {
  return numeral(p).format('$0,0.00')
}

export function calcListAverage(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

export function calcListSum(arr) {
  if (arr.length > 0) {
    return arr.reduce((a, b) => a + b, 0)
  } else {
    return 0
  }
}

export function calcListMaximum(arr) {
  if (arr.length > 0) {
    return Math.max(...arr)
  } else {
    return 0
  }
}

export function calcListMinimum(arr) {
  if (arr.length > 0) {
    return Math.min(...arr)
  } else {
    return 0
  }
}

export function calcDisplaySeconds(seconds) {
  if (Number.isNaN(seconds)) {
    return `0 s`
  } else {
    return `${parseFloat(seconds).toFixed(0)} s`
  }
}

export function formatCapitalized(text) {
  try {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  } catch {
    return "N/A"
  }
}

export function truncateString(str, num) {
  try {
    if (str.length > num) {
      return str.slice(0, num) + "..."
    } else {
      return str
    }
  } catch {
    return "N/A"
  }
}

export function truncateUsername(username) {
  try {
    if (username.includes(FIELD_USERNAME_PROVIDER_ID)) {
      username = username.split(FIELD_USERNAME_PROVIDER_ID)[0]
    }
    if (username.length > FIELD_USERNAME_STR_LENGTH) {
      return username.slice(0, FIELD_USERNAME_STR_LENGTH) + "..."
    } else {
      return username
    }
  } catch {
    return username
  }
}