import React, { Component } from 'react'
import { Badge, Dropdown, Navbar, Nav } from 'react-bootstrap'

import layoutHelpers from './helpers'
import * as numeral from 'numeral'
import * as moment from 'moment'

import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

import {
  objectsRequestHandler,
} from '../../store/actions'

import {
  truncateUsername,
} from '../../components/views/live/utilities/TextPreprocessing'

import '../../vendor/styles/pages/navigation.scss'

class LayoutNavbar extends Component {

  constructor(props) {
    super(props)

    this.isRTL = document.documentElement.getAttribute('dir') === 'rtl'

    this.onHandleLogout = this.onHandleLogout.bind(this)
    this.onToggleWalletDropdown = this.onToggleWalletDropdown.bind(this)
    this.onToggleStatisticsDropdown = this.onToggleStatisticsDropdown.bind(this)
    this.onToggleNotificationsDropdown = this.onToggleNotificationsDropdown.bind(this)

    this.state = {
      username: "N/A",
      email: "N/A",
      now: moment().format('HH:mm'),
    }
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
        email: JSON.parse(localStorage.getItem('user')).user.email,
      })
      this.props.objectsRequestHandler('REQ_PROFILE_NOTIFICATIONS_GET', {
        id: JSON.parse(localStorage.getItem('user')).id,
      }).then(() => {
      })
      if (!this.props.avatar) {
        this.props.objectsRequestHandler('REQ_PROFILE_AVATAR_GET', {
          id: JSON.parse(localStorage.getItem('user')).id,
        }).then(() => {
        })
      }
    }
  }

  toggleSidenav(e) {
    e.preventDefault()
    layoutHelpers.toggleCollapsed()
  }

  onHandleLogout() {
    this.props.objectsRequestHandler('REQ_OBJECTS_RESET', {}).then(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.props.history.push('/login')
    })
  }

  formatPrice(p) {
    return numeral(p).format('$0,0.00')
  }

  onToggleNotificationsDropdown() {
    if (localStorage.getItem('user')) {
      this.props.objectsRequestHandler('REQ_PROFILE_NOTIFICATIONS_GET', {
        id: JSON.parse(localStorage.getItem('user')).id,
      }).then(() => {
      })
    }
  }

  onToggleStatisticsDropdown() {
    if (localStorage.getItem('user')) {
      this.props.objectsRequestHandler('REQ_PROFILE_STATISTICS_GET', {
        id: JSON.parse(localStorage.getItem('user')).id,
      }).then(() => {
      })
    }
  }

  onToggleWalletDropdown() {
    if (localStorage.getItem('user')) {
      this.props.objectsRequestHandler('REQ_PROFILE_WALLET_GET', {
        id: JSON.parse(localStorage.getItem('user')).id,
      }).then(() => {
      })
    }
  }

  layoutSidenavClasses() {
    let bg = this.props.sidenavBg
    return `bg-${bg}`
  }

  render() {
    return (
      <>
        {/* Navigation */}
        <Navbar
          bg={this.props.navbarBg}
          expand="lg"
          className="layout-navbar align-items-lg-center container-p-x">

          {/* Navigation App Header */}
          <Navbar.Brand
            as={NavLink}
            to="/games"
            className="app-brand demo d-lg-none py-0 mr-4">
            <div className="app-brand">
              <img
                src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                alt="Live Poker Studio™" className="d-block ui-w-100" />
            </div>
          </Navbar.Brand>
          {/* / Navigation App Header */}

          {/* Navigation Header Toggle */}
          {this.props.sidenavToggle && (
            <Nav className="layout-sidenav-toggle d-lg-none align-items-lg-center mr-auto">
              <Nav.Item
                as="a"
                className="nav-link px-0 mr-lg-4"
                href="#toggle"
                onClick={this.toggleSidenav}>
                <i className="ion ion-md-menu text-large align-middle"></i>
              </Nav.Item>
            </Nav>
          )}
          {/* / Navigation Header Toggle */}

          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav className="align-items-lg-center ml-auto">

              {/* Dropdown Notifications Panel */}
              <Dropdown
                as={Nav.Item}
                className="demo-navbar-notifications mr-1"
                alignRight={!this.isRTL}
                onClick={this.onToggleNotificationsDropdown}>

                <Dropdown.Toggle
                  as={Nav.Link}
                  className="hide-arrow d-flex">
                  {this.props.notifications && this.props.notifications.content.length > 0 && (
                    <h5 className="mb-0">
                      <Badge pill variant="primary indicator">
                        {this.props.notifications.content.length}
                      </Badge>
                    </h5>
                  )}
                  <div className="nav_content__s4">
                    <svg className="nav_content__s2 nav_icon_link__item icon__trending_s1">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-bell`}></use>
                    </svg>
                  </div>
                  <span className="d-lg-none align-middle ml-2">
                    Notifications
                  </span>
                </Dropdown.Toggle>

                {this.props.notifications && (
                  <Dropdown.Menu
                    show={this.state.show}
                    className="nav_parent__container shadow-none p-0 mt-0">
                    <div className="p-2">

                      {this.props.notifications.content.length > 0
                        ? <LinkContainer
                          activeClassName=""
                          to={{
                            pathname: '/notifications',
                            state: {
                              prevPath: this.props.location.pathname,
                            }
                          }}>
                          <Dropdown.Item
                            hred="#"
                            className="d-flex align-items-center nav_link__container nav_wallet__item pl-0">
                            <span className="nav_wallet__item d-flex align-items-center justify-content-center">
                              <div className="nav_wallet__ava d-flex align-items-center justify-content-center">
                                <div className="nav_content__s1 d-flex align-items-center justify-content-center">
                                  <svg className="nav_content__s2 icon__trending_s2 icon__success">
                                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-email`}></use>
                                  </svg>
                                </div>
                              </div>
                              <div className="nav_wallet__details">
                                <div className="nav_wallet__line">
                                  <div className="nav_wallet__user font-weight-bold opacity-50">
                                    Inbox
                                  </div>
                                </div>
                                <div className="nav_wallet__text">
                                  {this.props.notifications.content.length} new {this.props.notifications.content.length === 1 ? 'message' : 'messages'}
                                </div>
                              </div>
                            </span>
                          </Dropdown.Item>
                        </LinkContainer>
                        : <LinkContainer
                          activeClassName=""
                          to={{
                            pathname: '/notifications',
                            state: {
                              prevPath: this.props.location.pathname,
                            }
                          }}>
                          <Dropdown.Item
                            hred="#"
                            className="d-flex align-items-center nav_link__container nav_wallet__item pl-0">
                            <span className="nav_wallet__item d-flex align-items-center justify-content-center">
                              <div className="nav_wallet__ava d-flex align-items-center justify-content-center">
                                <div className="nav_content__s1 d-flex align-items-center justify-content-center">
                                  <svg className="nav_content__s2 icon__trending_s2 icon__success">
                                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-email`}></use>
                                  </svg>
                                </div>
                              </div>
                              <div className="nav_wallet__details">
                                <div className="nav_wallet__line">
                                  <div className="nav_wallet__user font-weight-bold opacity-50">
                                    Inbox
                                  </div>
                                </div>
                                <div className="nav_wallet__text">
                                  0 new messages
                                </div>
                              </div>
                            </span>
                          </Dropdown.Item>
                        </LinkContainer>}

                      <LinkContainer
                        activeClassName=""
                        className="nav_link__container nav_link__item"
                        to={{
                          pathname: '/notifications',
                          state: {
                            prevPath: this.props.location.pathname,
                          }
                        }}>
                        <Dropdown.Item
                          hred="#"
                          className="d-flex align-items-center px-4 mt-0">
                          <div className="nav_content__s1">
                            <svg className="nav_content__s2 icon__reply">
                              <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-reply`}></use>
                            </svg>
                          </div>
                          <span className="font-weight-semibold">
                            Notifications
                          </span>
                        </Dropdown.Item>
                      </LinkContainer>
                    </div>
                  </Dropdown.Menu>
                )}
              </Dropdown>
              {/* / Dropdown Notifications Panel */}

              {/* Dropdown Statistics Panel */}
              <Dropdown
                as={Nav.Item}
                className="demo-navbar-notifications mr-1"
                alignRight={!this.isRTL}
                onClick={this.onToggleStatisticsDropdown}>

                <Dropdown.Toggle
                  as={Nav.Link}
                  className="hide-arrow d-flex">
                  <div className="nav_content__s4">
                    <svg className="nav_content__s2 nav_icon_link__item icon__trending_s1">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-eye`}></use>
                    </svg>
                  </div>
                  <span className="d-lg-none align-middle ml-2">
                    Statistics
                  </span>
                </Dropdown.Toggle>

                {this.props.statistics && (
                  <Dropdown.Menu
                    show={this.state.show}
                    className="nav_parent__container shadow-none p-0 mt-0">
                    <div className="p-2">
                      <LinkContainer
                        activeClassName=""
                        to={{
                          pathname: '/profile',
                          state: {
                            prevPath: this.props.location.pathname,
                          }
                        }}>
                        <Dropdown.Item
                          hred="#"
                          className="d-flex align-items-center nav_link__container nav_wallet__item pl-0">
                          <span className="nav_wallet__item d-flex align-items-center justify-content-center">
                            <div className="nav_wallet__ava d-flex align-items-center justify-content-center">
                              <div className="nav_content__s1 d-flex align-items-center justify-content-center">
                                <svg className="nav_content__s2 icon__trending_s2 icon__success">
                                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-add`}></use>
                                </svg>
                              </div>
                            </div>
                            <div className="nav_wallet__details">
                              <div className="nav_wallet__line">
                                <div className="nav_wallet__user font-weight-bold opacity-50">
                                  Last Session Profit
                                </div>
                              </div>
                              <div className="nav_wallet__text">
                                {this.formatPrice(this.props.statistics.live_statistics_session.player_balance_profit)}
                              </div>
                            </div>
                          </span>
                        </Dropdown.Item>
                      </LinkContainer>

                      <LinkContainer
                        activeClassName=""
                        to={{
                          pathname: '/profile',
                          state: {
                            prevPath: this.props.location.pathname,
                          }
                        }}>
                        <Dropdown.Item
                          hred="#"
                          className="d-flex align-items-center nav_link__container nav_wallet__item pl-0">
                          <span className="nav_wallet__item d-flex align-items-center justify-content-center">
                            <div className="nav_wallet__ava d-flex align-items-center justify-content-center">
                              <div className="nav_content__s1 d-flex align-items-center justify-content-center">
                                <svg className="nav_content__s2 icon__trending_s2 icon__success">
                                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-minus`}></use>
                                </svg>
                              </div>
                            </div>
                            <div className="nav_wallet__details">
                              <div className="nav_wallet__line">
                                <div className="nav_wallet__user font-weight-bold opacity-50">
                                  Last Session Loss
                                </div>
                              </div>
                              <div className="nav_wallet__text">
                                {this.formatPrice(this.props.statistics.live_statistics_session.player_balance_loss)}
                              </div>
                            </div>
                          </span>
                        </Dropdown.Item>
                      </LinkContainer>

                      <LinkContainer
                        activeClassName=""
                        to={{
                          pathname: '/profile',
                          state: {
                            prevPath: this.props.location.pathname,
                          }
                        }}>
                        <Dropdown.Item
                          hred="#"
                          className="d-flex align-items-center nav_link__container nav_wallet__item pl-0">
                          <span className="nav_wallet__item d-flex align-items-center justify-content-center">
                            <div className="nav_wallet__ava d-flex align-items-center justify-content-center">
                              <div className="nav_content__s1 d-flex align-items-center justify-content-center">
                                <svg className="nav_content__s2 icon__trending_s2 icon__success">
                                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-game-play`}></use>
                                </svg>
                              </div>
                            </div>
                            <div className="nav_wallet__details">
                              <div className="nav_wallet__line">
                                <div className="nav_wallet__user font-weight-bold opacity-50">
                                  Games Played
                                </div>
                              </div>
                              <div className="nav_wallet__text">
                                {this.props.statistics.live_statistics_session.session_games_played
                                  ? this.props.statistics.live_statistics_session.session_games_played
                                  : '0'}
                              </div>
                            </div>
                          </span>
                        </Dropdown.Item>
                      </LinkContainer>

                      <LinkContainer
                        activeClassName=""
                        to={{
                          pathname: '/profile',
                          state: {
                            prevPath: this.props.location.pathname,
                          }
                        }}>
                        <Dropdown.Item
                          hred="#"
                          className="d-flex align-items-center nav_link__container nav_wallet__item pl-0">
                          <span className="nav_wallet__item d-flex align-items-center justify-content-center">
                            <div className="nav_wallet__ava d-flex align-items-center justify-content-center">
                              <div className="nav_content__s1 d-flex align-items-center justify-content-center">
                                <svg className="nav_content__s2 icon__trending_s2 icon__success">
                                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-star`}></use>
                                </svg>
                              </div>
                            </div>
                            <div className="nav_wallet__details">
                              <div className="nav_wallet__line">
                                <div className="nav_wallet__user font-weight-bold opacity-50">
                                  Win/Lose
                                </div>
                              </div>
                              <div className="nav_wallet__text">
                                {this.props.statistics.live_statistics_session.session_games_won
                                  ? this.props.statistics.live_statistics_session.session_games_won
                                  : '0'}/
                                {this.props.statistics.live_statistics_session.session_games_lost
                                  ? this.props.statistics.live_statistics_session.session_games_lost
                                  : '0'}
                              </div>
                            </div>
                          </span>
                        </Dropdown.Item>
                      </LinkContainer>

                      <LinkContainer
                        activeClassName=""
                        className="nav_link__container nav_link__item"
                        to={{
                          pathname: '/profile',
                          state: {
                            prevPath: this.props.location.pathname,
                          }
                        }}>
                        <Dropdown.Item
                          hred="#"
                          className="d-flex align-items-center px-4 mt-0">
                          <div className="nav_content__s1">
                            <svg className="nav_content__s2 icon__reply">
                              <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-reply`}></use>
                            </svg>
                          </div>
                          <span className="font-weight-semibold">
                            Statistics
                          </span>
                        </Dropdown.Item>
                      </LinkContainer>
                    </div>
                  </Dropdown.Menu>
                )}
              </Dropdown>
              {/* / Dropdown Statistics Panel */}

              {/* Dropdown Wallet Panel */}
              <Dropdown
                as={Nav.Item}
                className="demo-navbar-notifications mr-3"
                alignRight={!this.isRTL}
                onClick={this.onToggleWalletDropdown}>

                <Dropdown.Toggle
                  as={Nav.Link}
                  className="hide-arrow d-flex">
                  <div className="nav_content__s4">
                    <svg className="nav_content__s2 nav_icon_link__item icon__trending_s1">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-trending`}></use>
                    </svg>
                  </div>
                  <span className="d-lg-none align-middle ml-2">
                    Wallet
                  </span>
                </Dropdown.Toggle>

                {this.props.wallet && (
                  <Dropdown.Menu
                    show={this.state.show}
                    className="nav_parent__container shadow-none p-0 mt-0">
                    <div className="p-2">
                      <LinkContainer
                        activeClassName=""
                        to={{
                          pathname: '/',
                          state: {
                            prevPath: this.props.location.pathname,
                          }
                        }}>
                        <Dropdown.Item
                          hred="#"
                          className="d-flex align-items-center nav_link__container nav_wallet__item pl-0">
                          <span className="nav_wallet__item d-flex align-items-center justify-content-center">
                            <div className="nav_wallet__ava d-flex align-items-center justify-content-center">
                              <div className="nav_content__s1 d-flex align-items-center justify-content-center">
                                <svg className="nav_content__s2 icon__trending_s2 icon__success">
                                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-trending`}></use>
                                </svg>
                              </div>
                            </div>
                            <div className="nav_wallet__details">
                              <div className="nav_wallet__line">
                                <div className="nav_wallet__user font-weight-bold opacity-50">
                                  Live Deposit
                                </div>
                              </div>
                              <div className="nav_wallet__text">
                                {this.formatPrice(this.props.wallet.live_deposit)}
                              </div>
                            </div>
                          </span>
                        </Dropdown.Item>
                      </LinkContainer>

                      <LinkContainer
                        activeClassName=""
                        to={{
                          pathname: '/',
                          state: {
                            prevPath: this.props.location.pathname,
                          }
                        }}>
                        <Dropdown.Item
                          hred="#"
                          className="d-flex align-items-center nav_link__container nav_wallet__item pl-0">
                          <span className="nav_wallet__item d-flex align-items-center justify-content-center">
                            <div className="nav_wallet__ava d-flex align-items-center justify-content-center">
                              <div className="nav_content__s1 d-flex align-items-center justify-content-center">
                                <svg className="nav_content__s2 icon__game_play_s1 icon__success">
                                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-game-play`}></use>
                                </svg>
                              </div>
                            </div>
                            <div className="nav_wallet__details">
                              <div className="nav_wallet__line">
                                <div className="nav_wallet__user font-weight-bold opacity-50">
                                  Play Money
                                </div>
                              </div>
                              <div className="nav_wallet__text">
                                {this.formatPrice(this.props.wallet.practice_deposit)}
                              </div>
                            </div>
                          </span>
                        </Dropdown.Item>
                      </LinkContainer>

                      <LinkContainer
                        activeClassName=""
                        className="nav_link__container nav_link__item"
                        to={{
                          pathname: '/',
                          state: {
                            prevPath: this.props.location.pathname,
                          }
                        }}>
                        <Dropdown.Item
                          hred="#"
                          className="d-flex align-items-center px-4 mt-0">
                          <div className="nav_content__s1">
                            <svg className="nav_content__s2 icon__reply">
                              <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-reply`}></use>
                            </svg>
                          </div>
                          <span className="font-weight-semibold">
                            Wallet
                          </span>
                        </Dropdown.Item>
                      </LinkContainer>
                    </div>
                  </Dropdown.Menu>
                )}

              </Dropdown>
              {/* / Dropdown Wallet Panel */}

              <div className="nav-item d-none d-lg-block text-big font-weight-light line-height-1 mr-3 ml-1 text-body">|</div>

              {/* Navigation Main Panel */}
              <Dropdown
                as={Nav.Item}
                className="demo-navbar-notifications mr-1"
                alignRight={!this.isRTL}>

                <Dropdown.Toggle
                  as={Nav.Link}>
                  <span className="d-inline-flex flex-lg-row-reverse align-items-center align-middle">

                    {this.props.avatar
                      ? <img
                        src={`${this.props.avatar}`} className="d-block ui-w-40 rounded-circle"
                        alt="Live Poker Studio™ Avatar" style={{ filter: "drop-shadow(0px 0px 10px #000)", }} />
                      : <img
                        src={`${process.env.PUBLIC_URL}/img/avatars/avatar-1.png`} className="d-block ui-w-40 rounded-circle"
                        alt="Live Poker Studio™ Avatar" style={{ filter: "drop-shadow(0px 0px 10px #000) blur(1px)", }} />}

                    <h5 className="px-1 mr-lg-1 ml-2 ml-lg-0 text-white font-weight-bold mb-0 nav_icon_link__item">
                      <div className="px-1 mr-lg-1 ml-2 ml-lg-0 text-white font-weight-bold mb-0">
                        {this.state.email || truncateUsername(this.state.username)}
                      </div>
                      <div className="px-1 mr-lg-1 ml-2 ml-lg-0 text-muted font-weight-bold mb-0 text-tiny">
                        {truncateUsername(this.state.username)}
                      </div>
                    </h5>
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  show={this.state.show}
                  className="nav_parent__container shadow-none p-0 mt-0">
                  <div className="p-3">
                    <LinkContainer
                      className="nav_link__container nav_link__item"
                      to={{
                        pathname: '/games',
                        state: {
                          prevPath: this.props.location.pathname,
                        }
                      }}>
                      <Dropdown.Item
                        hred="#"
                        className="d-flex align-items-center px-4 mt-0">
                        <div className="nav_content__s1">
                          <svg className="nav_content__s2 icon__star">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-star`}></use>
                          </svg>
                        </div>
                        <span className="font-weight-semibold">
                          Live Games
                        </span>
                      </Dropdown.Item>
                    </LinkContainer>

                    <LinkContainer
                      className="nav_link__container nav_link__item"
                      to={{
                        pathname: '/profile',
                        state: {
                          prevPath: this.props.location.pathname,
                        }
                      }}>
                      <Dropdown.Item
                        hred="#"
                        className="d-flex align-items-center px-4 mt-0">
                        <div className="nav_content__s1">
                          <svg className="nav_content__s2 icon__profile">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-profile`}></use>
                          </svg>
                        </div>
                        <span className="font-weight-semibold">
                          Profile
                        </span>
                      </Dropdown.Item>
                    </LinkContainer>

                    <LinkContainer
                      className="nav_link__container nav_link__item"
                      to={{
                        pathname: '/summary',
                        state: {
                          prevPath: this.props.location.pathname,
                        }
                      }}>
                      <Dropdown.Item
                        hred="#"
                        className="d-flex align-items-center px-4 mt-0">
                        <div className="nav_content__s1">
                          <svg className="nav_content__s2 icon__document">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-document`}></use>
                          </svg>
                        </div>
                        <span className="font-weight-semibold">
                          Game History
                        </span>
                      </Dropdown.Item>
                    </LinkContainer>

                    <LinkContainer
                      className="nav_link__container nav_link__item"
                      to={{
                        pathname: '/activity/events',
                        state: {
                          prevPath: this.props.location.pathname,
                        }
                      }}>
                      <Dropdown.Item
                        hred="#"
                        className="d-flex align-items-center px-4 mt-0">
                        <div className="nav_content__s1">
                          <svg className="nav_content__s2 icon__eye">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-eye`}></use>
                          </svg>
                        </div>
                        <span className="font-weight-semibold">
                          Activity Log
                        </span>
                      </Dropdown.Item>
                    </LinkContainer>

                    <LinkContainer
                      className="nav_link__container nav_link__item"
                      to={{
                        pathname: '/settings',
                        state: {
                          prevPath: this.props.location.pathname,
                        }
                      }}>
                      <Dropdown.Item
                        hred="#"
                        className="d-flex align-items-center px-4 mt-0">
                        <div className="nav_content__s1">
                          <svg className="nav_content__s2 icon__settings">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-settings`}></use>
                          </svg>
                        </div>
                        <span className="font-weight-semibold">
                          Settings
                        </span>
                      </Dropdown.Item>
                    </LinkContainer>

                    <Dropdown.Item
                      hred="#"
                      onClick={this.onHandleLogout}
                      className="d-flex align-items-center px-4 mt-0 nav_link__container nav_link__item">
                      <div className="nav_content__s1">
                        <svg className="nav_content__s2 icon__logout">
                          <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-logout`}></use>
                        </svg>
                      </div>
                      <span className="font-weight-semibold">
                        Log Out
                      </span>
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              {/* / Navigation Main Panel  */}

            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* / Navigation */}
      </>
    )
  }
}

LayoutNavbar.propTypes = {
  sidenavToggle: PropTypes.bool,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
}

LayoutNavbar.defaultProps = {
  sidenavToggle: true,
  orientation: 'horizontal',
}

const mapStateToProps = (state) => ({
  navbarBg: state.theme.navbarBg,
  sidenavBg: state.theme.sidenavBg,
  avatar: state.objects.avatar,
  notifications: state.objects.notifications.selected,
  statistics: state.objects.profile.statistics,
  wallet: state.objects.profile.wallet,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(LayoutNavbar))