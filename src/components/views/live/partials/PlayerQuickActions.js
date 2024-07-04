import React, { Component } from 'react'
import { RateLimiter } from 'limiter'
import toast from 'react-hot-toast'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/styles/pages/navigation.scss'

class PlayerQuickActions extends Component {

  constructor(props) {
    super(props)

    this.handleRenderSitOutState = this.handleRenderSitOutState.bind(this)
    this.handleRenderSitOutClassName = this.handleRenderSitOutClassName.bind(this)
    this.handleSubmitSitOutState = this.handleSubmitSitOutState.bind(this)
    this.handleSubmitMuckCardsState = this.handleSubmitMuckCardsState.bind(this)

    this.rateLimiter = new RateLimiter({ tokensPerInterval: 1, interval: 250, })
    this.sitOutLimiter = new RateLimiter({ tokensPerInterval: 1, interval: 2500, })
    this.muckCardsLimiter = new RateLimiter({ tokensPerInterval: 1, interval: 1500, })

    this.state = {
      sitOutEnabled: true,
    }
  }

  componentDidMount() {
    const container = document.getElementById('hover-container-item')
    var elements = document.querySelectorAll('[id^="nav-link"]')
    for (let i = 0; i < elements.length; i++) {
      switch (elements[i].id.slice(-1)) {
        case '1':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.setAttribute('content-before', 'Live Poker Hints')
          })
          elements[i].addEventListener('mouseleave', () => container.style.opacity = 0)
          break
        case '2':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.setAttribute('content-before', 'Live Chat')
          })
          elements[i].addEventListener('mouseleave', () => container.style.opacity = 0)
          break
        case '3':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.setAttribute('content-before', 'Sit Out')
          })
          elements[i].addEventListener('mouseleave', () => container.style.opacity = 0)
          break
        case '4':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.setAttribute('content-before', 'Muck Cards')
          })
          elements[i].addEventListener('mouseleave', () => container.style.opacity = 0)
          break
        case '5':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.setAttribute('content-before', 'Profile')
          })
          elements[i].addEventListener('mouseleave', () => container.style.opacity = 0)
          break
        case '6':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.setAttribute('content-before', 'Game Pad')
          })
          elements[i].addEventListener('mouseleave', () => container.style.opacity = 0)
          break
        case '7':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.setAttribute('content-before', 'Live Stream')
          })
          elements[i].addEventListener('mouseleave', () => container.style.opacity = 0)
          break
        case '8':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.setAttribute('content-before', 'Exit Game')
          })
          elements[i].addEventListener('mouseleave', () => container.style.opacity = 0)
          break
        case '9':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.setAttribute('content-before', 'Awards & Collectibles')
          })
          elements[i].addEventListener('mouseleave', () => container.style.opacity = 0)
          break
        default:
          break
      }
    }

    if (this.props.game.player) {
      if (this.props.game.player.p_sit_out_request && this.props.game.player.p_sit_out) {
        this.setState({
          sitOutEnabled: true,
        })
      } else if (!this.props.game.player.p_sit_out_request) {
        var p = this.props.game.data.users.filter(function (item) {
          return item.p_playing && !item.p_low_balance
        })
        var s = this.props.game.data.users.filter(function (item) {
          return item.p_sit_out_request
        })
        this.setState({
          sitOutEnabled: (p.length - s.length) > 2 ? true : false,
        })
      } else if (this.props.game.player.p_sit_out_request) {
        this.setState({
          sitOutEnabled: true,
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data.users !== this.props.game.data.users) {
      if (this.props.game.player) {
        if (this.props.game.player.p_sit_out_request && this.props.game.player.p_sit_out) {
          this.setState({
            sitOutEnabled: true,
          })
        } else if (!this.props.game.player.p_sit_out_request) {
          var p = this.props.game.data.users.filter(function (item) {
            return item.p_playing && !item.p_low_balance
          })
          var s = this.props.game.data.users.filter(function (item) {
            return item.p_sit_out_request
          })
          this.setState({
            sitOutEnabled: (p.length - s.length) > 2 ? true : false,
          })
        } else if (this.props.game.player.p_sit_out_request) {
          this.setState({
            sitOutEnabled: true,
          })
        }
      }
    }
  }

  handleSubmitSitOutState(value) {
    if (this.sitOutLimiter.tryRemoveTokens(1)) {
      if (this.props.game.player) {
        this.props.client.sendPlayerSitOut(
          0,
          this.props.game.data.current_round,
          value ? 1 : 0,
        )
      }
    }
  }

  handleSubmitMuckCardsState(value) {
    if (this.muckCardsLimiter.tryRemoveTokens(1)) {
      if (this.props.game.player) {
        this.props.client.sendPlayerMuckCards(
          0,
          this.props.game.data.current_round,
          value ? 1 : 0,
        )
      }
    }
  }

  handleRenderSitOutState(request, state) {
    if (request && state) {
      return `icon__success`
    } else if (!request) {
      return `icon__default`
    } else if (request) {
      return `icon__success`
    }
  }

  handleRenderSitOutClassName(request, state) {
    if (request && state) {
      return `nav_link__item__active`
    } else if (!request && !state) {
      return ``
    } else if (request !== state) {
      return `nav_link__item__active`
    }
  }

  handleMessageSitOutUnavailable() {
    if (this.rateLimiter.tryRemoveTokens(1)) {
      toast("Sit Out Unavailable", {
        duration: 2500,
        icon: <i className="fas fa-exclamation-triangle text-warning ml-2"></i>,
        className: 'font-weight-bold cursor-pointer',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          zIndex: '99999',
        },
      })
    }
  }

  handleMessageMuckCardsUnavailable() {
    if (this.rateLimiter.tryRemoveTokens(1)) {
      toast("Muck Cards Unavailable", {
        duration: 2500,
        icon: <i className="fas fa-exclamation-triangle text-warning ml-2"></i>,
        className: 'font-weight-bold cursor-pointer',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          zIndex: '99999',
        },
      })
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Player Quick Actions */}
        {this.props.settings.optionK5 && (
          <>
            <div id="hover-container" >
              <span id="hover-container-item" className="game__actions__hover game__actions__item"></span>
              <span id="hover-container-text" className="game__actions__text float-right">
                {this.props.game.data.auto_mode
                  ? this.props.game.data.demo_mode ? "FREE PLAY" : "AUTO GAME"
                  : this.props.game.data.demo_mode ? "FREE PLAY" : "LIVE GAME"}
              </span>
            </div>

            <div className="game__actions">
              <span
                id="nav-link-1"
                className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.settings.optionD3 && "nav_link__item__active"}`}
                onClick={(e) => this.props.change('optionD3', !this.props.settings.optionD3)}>
                <svg className={`icon icon-eye ${this.props.settings.optionD3 ? "icon__success" : "icon__default"}`}>
                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-eye`}></use>
                </svg>
              </span>

              <span
                id="nav-link-2"
                className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.settings.optionF7 && "nav_link__item__active"}`}
                onClick={(e) => this.props.change('optionF7', !this.props.settings.optionF7)}>
                <svg className={`icon icon-wand ${this.props.settings.optionF7 ? "icon__success" : "icon__default"}`}>
                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-chart`}></use>
                </svg>
              </span>

              {this.props.game.player && this.state.sitOutEnabled
                ? <span
                  id="nav-link-3"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.handleRenderSitOutClassName(this.props.game.player.p_sit_out_request, this.props.game.player.p_sit_out)}`}
                  onClick={e => this.handleSubmitSitOutState(!this.props.game.player.p_sit_out_request)}>
                  <svg className={`icon icon-eye ${this.handleRenderSitOutState(this.props.game.player.p_sit_out_request, this.props.game.player.p_sit_out)}`}>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-pause`}></use>
                  </svg>
                </span>
                : <span
                  id="nav-link-3"
                  className="game__action cursor-pointer nav_link__container nav_link__item"
                  onClick={(e) => { this.handleMessageSitOutUnavailable() }}>
                  <svg className={`icon icon-eye icon__default`}>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-pause`}></use>
                  </svg>
                </span>}

              {this.props.game.player
                ? <span
                  id="nav-link-4"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.game.player.p_muck_cards && "nav_link__item__active"}`}
                  onClick={e => this.handleSubmitMuckCardsState(!this.props.game.player.p_muck_cards)}>
                  <svg className={`icon icon-wand ${this.props.game.player.p_muck_cards ? "icon__success" : "icon__default"}`}>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-wand`}></use>
                  </svg>
                </span>
                : <span
                  id="nav-link-4"
                  className="game__action cursor-pointer nav_link__container nav_link__item"
                  onClick={(e) => { this.handleMessageMuckCardsUnavailable() }}>
                  <svg className={`icon icon-wand icon__default`}>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-wand`}></use>
                  </svg>
                </span>}

              <span
                id="nav-link-5"
                className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.settings.optionD15 && "nav_link__item__active"}`}
                onClick={(e) => this.props.change('optionD15', !this.props.settings.optionD15)}>
                <svg className={`icon icon-wand ${this.props.settings.optionD15 ? "icon__success" : "icon__default"}`}>
                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-profile`}></use>
                </svg>
              </span>

              <span
                id="nav-link-6"
                className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.settings.optionF8 && "nav_link__item__active"}`}
                onClick={(e) => this.props.change('optionF8', !this.props.settings.optionF8)}>
                <svg className={`icon icon-wand ${this.props.settings.optionF8 ? "icon__success" : "icon__default"}`}>
                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-game-play`}></use>
                </svg>
              </span>

              {!this.props.game.data.auto_mode ? (
                <span
                  id="nav-link-7"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.settings.optionE1 && "nav_link__item__active"}`}
                  onClick={(e) => this.props.change('optionE1', !this.props.settings.optionE1)}>
                  <svg className={`icon icon-wand ${this.props.settings.optionE1 ? "icon__success" : "icon__default"}`}>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-camera`}></use>
                  </svg>
                </span>
              ) : (
                <span
                  id="nav-link-9"
                  className="game__action cursor-pointer nav_link__container nav_link__item"
                  onClick={() => this.props.openSlide(5)}>
                  <svg className="icon icon-star">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-star`}></use>
                  </svg>
                </span>
              )}

              <span
                id="nav-link-8"
                className="game__action cursor-pointer nav_link__container nav_link__item"
                onClick={() => this.props.openSlide(9)}>
                <svg className="icon icon-logout-s2">
                  <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-logout`}></use>
                </svg>
              </span>
            </div>
          </>
        )}
        {/* / Player Quick Actions */}
      </>
    )
  }
}

export default PlayerQuickActions