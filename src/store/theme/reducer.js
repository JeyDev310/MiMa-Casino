const getSettings = () => ({
  navbarBg: 'navbar-theme',
  sidenavBg: 'sidenav-theme',
  footerBg: 'footer-theme',
})

const initialState = getSettings()

function reducer(state = initialState, action) {
  return state
}

export default reducer