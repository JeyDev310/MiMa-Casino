import React, { Component } from 'react'
import Router from './shared/Router'

import './vendor/styles/bootstrap-dark.scss'
import './vendor/styles/appwork-dark.scss'
import './vendor/styles/theme-vibrant-dark.scss'
import './vendor/styles/colors-dark.scss'
import './vendor/styles/uikit.scss'

import './App.scss'

class App extends Component {
  render() {
    return <Router />
  }
}

export default App