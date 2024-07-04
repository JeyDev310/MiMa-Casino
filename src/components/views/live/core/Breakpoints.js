import { useState, useEffect } from 'react'
import debounce from 'debounce'

export const SIZE_XS = 'xs'
export const SIZE_SM = 'sm'
export const SIZE_MD = 'md'
export const SIZE_LG = 'lg'
export const SIZE_XL = 'xl'
export const SIZE_XXL = 'xxl'
export const SIZE_XXXL = 'xxxl'

export const resolveBreakpoint = (width) => {
  if (width < 576) {
    return SIZE_XS // double
  } else if (width >= 576 && width < 768) {
    return SIZE_SM // double
  } else if (width >= 768 && width < 992) {
    return SIZE_MD // double
  } else if (width >= 992 && width < 1280) {
    return SIZE_LG
  } else if (width >= 1280 && width < 1440) {
    return SIZE_XL // double
  } else if (width >= 1440 && width < 1600) {
    return SIZE_XXL // double
  } else if (width >= 1600) {
    return SIZE_XXXL
  }
}

export const translateBreakpoint = (bp) => {
  if (bp === SIZE_XS) {
    return 0 // double
  } else if (bp === SIZE_SM) {
    return 1 // double
  } else if (bp === SIZE_MD) {
    return 2 // double
  } else if (bp === SIZE_LG) {
    return 3
  } else if (bp === SIZE_XL) {
    return 4 // double
  } else if (bp === SIZE_XXL) {
    return 5 // double
  } else if (bp === SIZE_XXXL) {
    return 6
  }
  return 6
}

export const useBreakpoint = () => {
  const [size, setSize] = useState(() => resolveBreakpoint(window.innerWidth))
  useEffect(() => {
    const calcInnerWidth = debounce(function () {
      setSize(resolveBreakpoint(window.innerWidth))
    }, 200)
    window.addEventListener('resize', calcInnerWidth)
    return () => window.removeEventListener('resize', calcInnerWidth)
  }, [])
  return size
}