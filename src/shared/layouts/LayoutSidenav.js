import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Sidenav from '../../vendor/libs/sidenav'
import layoutHelpers from './helpers'

class LayoutSidenav extends Component {

  layoutSidenavClasses() {
    let bg = this.props.sidenavBg

    if (this.props.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
      bg = bg
        .replace(' sidenav-dark', '')
        .replace(' sidenav-light', '')
        .replace('-darker', '')
        .replace('-dark', '')
    }

    return `bg-${bg} ` + (
      this.props.orientation !== 'horizontal'
        ? 'layout-sidenav'
        : 'layout-sidenav-horizontal container-p-x flex-grow-0 shadow-lg'
    )
  }

  toggleSidenav(e) {
    e.preventDefault()
    layoutHelpers.toggleCollapsed()
  }

  isMenuActive(url) {
    return this.props.location.pathname.indexOf(url) === 0
  }

  isMenuOpen(url) {
    return this.props.location.pathname.indexOf(url) === 0 && this.props.orientation !== 'horizontal'
  }

  render() {
    return (
      <Sidenav orientation={this.props.orientation} className={this.layoutSidenavClasses()}>

        {this.props.orientation !== 'horizontal' && (
          <React.Fragment>
            <div className="app-brand demo">
              <span className="app-brand-logo demo bg-primary">
                <svg viewBox="0 0 148 80" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="a" x1="46.49" x2="62.46" y1="53.39" y2="48.2" gradientUnits="userSpaceOnUse"><stop stopOpacity=".25" offset="0"></stop><stop stopOpacity=".1" offset=".3"></stop><stop stopOpacity="0" offset=".9"></stop></linearGradient><linearGradient id="e" x1="76.9" x2="92.64" y1="26.38" y2="31.49" xlinkHref="#a"></linearGradient><linearGradient id="d" x1="107.12" x2="122.74" y1="53.41" y2="48.33" xlinkHref="#a"></linearGradient></defs><path style={{ fill: '#fff' }} transform="translate(-.1)" d="M121.36,0,104.42,45.08,88.71,3.28A5.09,5.09,0,0,0,83.93,0H64.27A5.09,5.09,0,0,0,59.5,3.28L43.79,45.08,26.85,0H.1L29.43,76.74A5.09,5.09,0,0,0,34.19,80H53.39a5.09,5.09,0,0,0,4.77-3.26L74.1,35l16,41.74A5.09,5.09,0,0,0,94.82,80h18.95a5.09,5.09,0,0,0,4.76-3.24L148.1,0Z"></path><path transform="translate(-.1)" d="M52.19,22.73l-8.4,22.35L56.51,78.94a5,5,0,0,0,1.64-2.19l7.34-19.2Z" fill="url(#a)"></path><path transform="translate(-.1)" d="M95.73,22l-7-18.69a5,5,0,0,0-1.64-2.21L74.1,35l8.33,21.79Z" fill="url(#e)"></path><path transform="translate(-.1)" d="M112.73,23l-8.31,22.12,12.66,33.7a5,5,0,0,0,1.45-2l7.3-18.93Z" fill="url(#d)"></path></svg>
              </span>
              <Link to="/games" className="app-brand-text demo sidenav-text font-weight-normal ml-2">Live Poker Studio™</Link>
              <a href="#toggle" className="layout-sidenav-toggle sidenav-link text-large ml-auto" onClick={this.toggleSidenav}>
                <i className="ion ion-md-menu align-middle"></i>
              </a>
            </div>
            <Sidenav.Divider className="mt-0" />
          </React.Fragment>
        )}

        <div className={`sidenav-inner ${this.props.orientation !== 'horizontal' ? 'py-0' : ''} font-weight-bold`}>
          <Sidenav.Divider
            className="mb-1" />
          <Sidenav.Header
            className="small font-weight-semibold">
            MAIN
          </Sidenav.Header>

          <Sidenav.RouterLink
            to={{
              pathname: '/games',
              state: {
                prevPath: this.props.location.pathname,
              },
            }}
            active={this.isMenuActive('/games')}
            className="medium">
            Live Games
          </Sidenav.RouterLink>

          <Sidenav.RouterLink
            to={{
              pathname: '/free',
              state: {
                prevPath: this.props.location.pathname,
              },
            }}
            active={this.isMenuActive('/free')}
            className="medium">
            Free Play
          </Sidenav.RouterLink>

          <Sidenav.RouterLink
            to={{
              pathname: '/leaderboard',
              state: {
                prevPath: this.props.location.pathname,
              },
            }}
            active={this.isMenuActive('/leaderboard')}
            className="medium">
            Leaderboard
          </Sidenav.RouterLink>

          <Sidenav.RouterLink
            to={{
              pathname: '/profile',
              state: {
                prevPath: this.props.location.pathname,
              },
            }}
            active={this.isMenuActive('/profile')}
            className="medium">
            Statistics
          </Sidenav.RouterLink>

          {/* <Sidenav.RouterLink
            to={{
              pathname: '/wallet/overview',
              state: {
                prevPath: this.props.location.pathname,
              },
            }}
            active={this.isMenuActive('/wallet')}
            className="medium">
            Wallet
          </Sidenav.RouterLink> */}

          <Sidenav.RouterLink
            to={{
              pathname: '/settings',
              state: {
                prevPath: this.props.location.pathname,
              },
            }}
            active={this.isMenuActive('/settings')}
            className="medium">
            Settings
          </Sidenav.RouterLink>
        </div>
      </Sidenav>
    )
  }
}

LayoutSidenav.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
}

LayoutSidenav.defaultProps = {
  orientation: 'vertical',
}

export default connect(store => ({
  sidenavBg: store.theme.sidenavBg,
}))(LayoutSidenav)