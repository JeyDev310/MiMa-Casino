import React, { Component } from 'react'

import {
  BrowserRouter as AppRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import {
  DefaultLayout,
  titleTemplate,
  defaultRoute,
  routes,
} from '../routes'

import ErrorBoundary from './ErrorBoundary'
import NotFound from './NotFound'

class Router extends Component {

  constructor(props) {
    super(props)

    this.routes = routes.map(route => {
      route.layout = route.layout || DefaultLayout
      route.exact = typeof route.exact === 'undefined' ? true : route.exact
      return route
    })

    document.documentElement.classList.add('app-loading')
  }

  componentDidMount() {
    const removeLoadingClass = () => {
      document.documentElement.classList.remove('app-loading')
    }
    const splashScreen = document.querySelector('.app-splash-screen')
    if (splashScreen) {
      splashScreen.style.opacity = 0
      setTimeout(() => {
        if (splashScreen && splashScreen.parentNode) {
          splashScreen.parentNode.removeChild(splashScreen)
        }
        removeLoadingClass()
      }, 300)
    } else {
      removeLoadingClass()
    }
  }

  setTitle(title) {
    document.title = titleTemplate.replace('%s', title)
  }

  scrollTop(to, duration, element = document.scrollingElement || document.documentElement) {
    if (element.scrollTop === to) return
    const start = element.scrollTop
    const change = to - start
    const startDate = +new Date()

    if (!duration) {
      element.scrollTop = to
      return
    }

    // t = current time; b = start value; c = change in value; d = duration
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }

    const animateScroll = () => {
      const currentDate = +new Date()
      const currentTime = currentDate - startDate
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration))
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll)
      } else {
        element.scrollTop = to
      }
    }

    animateScroll()
  }

  render() {
    return (
      <AppRouter basename={process.env.REACT_APP_BASENAME}>

        <Switch>
          {this.routes.map(route => (
            <Route
              path={route.path}
              exact={route.exact}
              render={props => {
                if (window.layoutHelpers && window.layoutHelpers.isSmallScreen()) {
                  window.layoutHelpers.setCollapsed(true, false)
                }
                this.scrollTop(0, 0)
                return <route.layout {...props}>

                  {/* Route Component */}
                  <route.component
                    {...props}
                    setTitle={this.setTitle}
                    scrollTop={this.scrollTop} />
                  {/* / Route Component */}

                  {/* Error Handler */}
                  <ErrorBoundary
                    {...this.props} {...this.state} />
                  {/* / Error Handler */}

                </route.layout>
              }}
              key={route.path}
            />
          ))}

          {defaultRoute !== '/' && <Redirect from="/" to={defaultRoute} exact={true} />}
          {/* NotFound Page */}

          <Route
            path="*"
            component={NotFound} />

        </Switch>

      </AppRouter>
    )
  }
}

export default Router