import React, { Component } from 'react'
import { RateLimiter } from 'limiter'
import toast from 'react-hot-toast'

import QuickGiphySearchbox from '../modals/panel/QuickGiphySearchboxModal'

import {
  PROVIDER_TYPE_EXTERNAL,
  PROVIDER_TYPE_EVERYMATRIX,
} from '../core/ProviderTypes'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/styles/pages/navigation.scss'

const JoinGameIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.84 11.59C10.92 11.59 12.61 9.9 12.61 7.82C12.61 5.74 10.92 4.05 8.84 4.05C6.76 4.05 5.07001 5.74 5.07001 7.82C5.07001 9.9 6.76 11.59 8.84 11.59Z" fill="white" />
  <path d="M16.16 17.48V19.2C16.16 19.61 15.83 19.95 15.41 19.95H2.75C2.34 19.95 2 19.61 2 19.2V17.48C2 15.07 3.96 13.11 6.37 13.11H11.79C12.28 13.11 12.75 13.19 13.19 13.35C13.19 13.35 13.19 13.34 13.2 13.35C14.92 13.93 16.16 15.56 16.16 17.48Z" fill="white" />
  <path d="M16.16 17.48V19.2C16.16 19.61 15.83 19.95 15.41 19.95H2.75C2.34 19.95 2 19.61 2 19.2V17.48C2 15.07 3.96 13.11 6.37 13.11H11.79C12.28 13.11 12.75 13.19 13.19 13.35C13.19 13.35 13.19 13.34 13.2 13.35C14.92 13.93 16.16 15.56 16.16 17.48Z" fill="white" />
  <path d="M22 16.62V18.03C22 18.36 21.73 18.63 21.4 18.63H17.66V17.48C17.66 16.47 17.4 15.51 16.95 14.68C16.76 14.34 16.55 14.02 16.31 13.73C16.14 13.54 15.97 13.35 15.79 13.19H18.57C18.68 13.19 18.78 13.19 18.88 13.21C19.01 13.22 19.14 13.24 19.27 13.27C20.03 13.43 20.69 13.85 21.18 14.41C21.26 14.5 21.34 14.6 21.41 14.71C21.42 14.71 21.42 14.71 21.41 14.72C21.6 15 21.75 15.3 21.85 15.63C21.88 15.74 21.91 15.85 21.93 15.96C21.98 16.17 22 16.39 22 16.62Z" fill="white" />
  <path d="M16.38 11.45C18.0314 11.45 19.37 10.1113 19.37 8.46C19.37 6.80867 18.0314 5.47 16.38 5.47C14.7287 5.47 13.39 6.80867 13.39 8.46C13.39 10.1113 14.7287 11.45 16.38 11.45Z" fill="white" />
</svg>

const ReBuyIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.39999 7.35C8.53999 7.2 8.73999 7.13 8.92999 7.13C9.11999 7.13 9.30999 7.2 9.45999 7.35L11.26 9.15V2.75C11.26 2.54 11.35 2.35 11.48 2.22C11.62 2.08 11.81 2 12.01 2C12.21 2 12.4 2.08 12.54 2.22C12.67 2.35 12.76 2.54 12.76 2.75V9.15L14.56 7.35C14.71 7.2 14.9 7.13 15.09 7.13C15.28 7.13 15.48 7.2 15.62 7.35C15.92 7.64 15.92 8.11 15.62 8.41L12.57 11.47C12.43 11.62 12.23 11.72 12.01 11.72C11.79 11.72 11.59 11.62 11.45 11.47L8.39999 8.41C8.09999 8.11 8.09999 7.64 8.39999 7.35Z" fill="white" />
  <path d="M12.01 11.72C11.81 11.72 11.62 11.64 11.48 11.5H12.54C12.4 11.64 12.21 11.72 12.01 11.72Z" fill="white" />
  <path d="M17.15 12.27H6.87C4.19 12.27 2.01001 14.45 2.01001 17.13C2.01001 19.81 4.19 22 6.87 22H17.15C19.83 22 22.01 19.81 22.01 17.13C22.01 14.45 19.83 12.27 17.15 12.27ZM13.04 17.88H10.98C10.57 17.88 10.23 17.55 10.23 17.13C10.23 16.72 10.57 16.38 10.98 16.38H13.04C13.45 16.38 13.79 16.72 13.79 17.13C13.79 17.55 13.45 17.88 13.04 17.88Z" fill="white" />
</svg>

const SitOutIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.54999 19C6.13999 19 5 17.86 5 16.45V7.54001C5 6.13001 6.13999 4.98999 7.54999 4.98999C8.95999 4.98999 10.1 6.13001 10.1 7.54001V16.45C10.09 17.86 8.94999 19 7.54999 19Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M16.45 19C15.04 19 13.9 17.86 13.9 16.45V7.54001C13.9 6.13001 15.04 4.98999 16.45 4.98999C17.86 4.98999 19 6.13001 19 7.54001V16.45C19 17.86 17.86 19 16.45 19Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>

const MuckCardsIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.10999 14.16C9.00999 14.05 8.86999 13.99 8.71999 13.99H6.12999H5.05999C4.90999 13.99 4.76999 14.05 4.66999 14.16L4.05999 14.83C3.87999 15.03 3.87999 15.33 4.05999 15.52L6.94999 18.79L7.21999 18.47L9.72999 15.52C9.89999 15.32 9.88999 15.03 9.71999 14.83L9.10999 14.16Z" fill="white" />
  <path d="M18.89 5.33H18.81C18.39 5.33 18.02 5.55 17.81 5.88C17.72 6.03 17.66 6.2 17.64 6.39C17.63 6.43 17.63 6.46999 17.63 6.50999V12.61C17.61 12.99 17.29 13.3 16.89 13.3C16.48 13.3 16.14 12.96 16.14 12.55V10.18C16.14 10.17 16.14 10.17 16.14 10.16V4.02C16.14 3.39 15.63 2.88 15 2.88C14.39 2.88 13.9 3.36 13.87 3.97V3.98C13.87 4 13.86 4.01 13.86 4.02V10.16C13.86 10.16 13.86 10.16 13.86 10.17V11.5C13.86 11.92 13.53 12.25 13.11 12.25C12.7 12.25 12.36 11.92 12.36 11.5V9.36V3.22C12.36 2.59 11.85 2.07001 11.22 2.07001C11.17 2.07001 11.11 2.07 11.06 2.08C10.96 2.1 10.87 2.12 10.78 2.16C10.77 2.16 10.76 2.17 10.76 2.17C10.36 2.35 10.08 2.76 10.08 3.22V9.36V10.04C10.08 10.46 9.73999 10.79 9.32999 10.79C8.91999 10.79 8.57999 10.46 8.57999 10.04V9.28999V6.55C8.57999 6.14 8.36999 5.78 8.05999 5.56C7.85999 5.41 7.61999 5.33 7.35999 5.33H7.34999C6.67999 5.33 6.12999 5.88 6.12999 6.55V7.92999V9.28999V12.49H9.27999C9.48999 12.49 9.68999 12.58 9.82999 12.74L11.58 14.66C11.83 14.94 11.84 15.36 11.59 15.65L8.13999 19.72C9.40999 21.09 11.17 21.93 13.1 21.93C16.95 21.93 20.07 18.6 20.07 14.51V12.58V8.3V6.50999C20.07 5.85999 19.54 5.33 18.89 5.33Z" fill="white" />
</svg>

const ShowdownReviewIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.98 2C7.52001 2 3.89001 5.63001 3.89001 10.1C3.89001 11.69 4.34999 13.18 5.14999 14.43C5.43999 14.89 5.76999 15.31 6.14999 15.7L6.45999 16.01C6.55999 16.09 6.65 16.18 6.75 16.27C7.2 16.65 7.70001 16.98 8.23001 17.26C8.36001 17.33 8.49 17.39 8.62 17.45C8.75 17.51 8.87999 17.57 9.01999 17.62C9.48999 17.81 9.99 17.96 10.5 18.05C10.98 18.14 11.47 18.19 11.98 18.19C12.5 18.19 13 18.14 13.49 18.04C14.01 17.95 14.5 17.81 14.97 17.62V17.61C15.1 17.56 15.24 17.5 15.37 17.44C15.5 17.38 15.63 17.31 15.76 17.25C15.79 17.23 15.81 17.22 15.84 17.21C16.19 17.01 16.52 16.8 16.83 16.58C16.96 16.47 17.08 16.38 17.2 16.28C17.31 16.18 17.42 16.09 17.53 15.99C17.63 15.89 17.74 15.78 17.84 15.68C18.21 15.29 18.54 14.87 18.84 14.41C19.62 13.16 20.08 11.68 20.08 10.1C20.08 5.63001 16.45 2 11.98 2ZM15.82 9.48999L14.23 11.05C14.16 11.11 14.13 11.21 14.15 11.31L14.53 13.5C14.57 13.74 14.32 13.92 14.1 13.81L12.13 12.77C12.04 12.73 11.94 12.73 11.85 12.77L9.88 13.81C9.66001 13.92 9.41001 13.74 9.45001 13.5L9.82999 11.31C9.83999 11.21 9.81 11.12 9.75 11.05L8.14999 9.48999C7.97999 9.31999 8.07 9.02999 8.31 8.98999L10.52 8.67001C10.61 8.66001 10.69 8.60001 10.74 8.51001L11.72 6.51001C11.83 6.29001 12.14 6.29001 12.25 6.51001L13.23 8.51001C13.28 8.60001 13.36 8.66001 13.45 8.67001L15.66 8.98999C15.9 9.02999 15.99 9.31999 15.82 9.48999Z" fill="white" />
  <path d="M5.63002 16.59C5.25002 16.22 4.90002 15.82 4.60002 15.38L2.86 18.4C2.72 18.64 2.72001 18.93 2.87001 19.17C3.01001 19.4 3.25001 19.54 3.55001 19.52L6.01003 19.39L7.13002 21.59C7.25002 21.83 7.50002 21.99 7.78002 22C7.78002 22 7.79001 22 7.80001 22C8.06001 22 8.31003 21.86 8.45003 21.62L9.98003 18.96C9.48003 18.85 8.99001 18.7 8.52001 18.5C7.43001 18.05 6.45002 17.4 5.63002 16.59Z" fill="white" />
  <path d="M21.15 18.4L19.39 15.36C19.08 15.8 18.74 16.21 18.35 16.57C17.53 17.39 16.55 18.04 15.47 18.49C15 18.69 14.52 18.84 14.02 18.95L15.56 21.62C15.69 21.86 15.94 22 16.21 22C16.21 22 16.22 22 16.23 22C16.5 21.99 16.75 21.83 16.87 21.59L17.99 19.39L20.46 19.52C20.75 19.54 20.99 19.4 21.14 19.17C21.28 18.93 21.28 18.64 21.15 18.4Z" fill="white" />
</svg>

const DealerTipIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M22 8.71001C22 10.13 21.45 11.46 20.45 12.46L12.6 20.31C12.56 20.35 12.45 20.44 12.4 20.47C12.28 20.55 12.14 20.59 12 20.59C11.86 20.59 11.71 20.55 11.59 20.47C11.53 20.43 11.48 20.39 11.42 20.33L3.56 12.46C2.55 11.46 2 10.13 2 8.71001C2 7.29001 2.55 5.96001 3.56 4.96001C5.63 2.90001 8.99 2.90001 11.06 4.96001L12 5.91001L12.95 4.96001C15.02 2.90001 18.38 2.90001 20.44 4.96001C21.45 5.96001 22 7.29001 22 8.71001Z" fill="white" />
</svg>

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
    const container = document.getElementById('bottom-nav-container-item')
    var elements = document.querySelectorAll('[id^="bottom-nav-link"]')
    for (let i = 0; i < elements.length; i++) {
      switch (elements[i].id.slice(-2)) {
        case '01':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', `${this.props.settings.optionD3
              ? 'Live Poker Hints Off'
              : 'Live Poker Hints On'}`)
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '02':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', `${this.props.settings.optionF7
              ? 'Live Chat Off'
              : 'Live Chat On'}`)
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '03':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Sit Out')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '04':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Muck Cards')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '05':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', `${this.props.settings.optionD15
              ? 'Hide Player Profile'
              : 'Show Player Profile'}`)
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '06':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', `${this.props.settings.optionK3
              ? 'Hide Game Pad'
              : 'Show Game Pad'}`)
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '07':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Live Stream')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '08':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Giphy Searchbox')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '09':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Exit Game')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '10':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Join Game')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '11':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Re-Buy')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '12':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Dealer Tip')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
          break
        case '14':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Showdown Review')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(0px, -50px)"
          })
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
    try {
      if (prevProps.game.player.p_muck_cards !== this.props.game.player.p_muck_cards) {
        if (this.props.game.player.p_muck_cards) {
          toast.success("Auto-Muck enabled", {
            duration: 2500,
            className: 'font-weight-bold cursor-pointer',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              zIndex: '99999',
            },
          })
        } else {
          toast.success("Auto-Muck disabled", {
            duration: 2500,
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
    } catch { }
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
      toast("Sit-out currently unavailable", {
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
      toast("Muck cards currently unavailable", {
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
        {!this.props.settings.optionK5 && (
          <>
            <div
              id="bottom-nav-container"
              className="mb-0">
              <span
                id="bottom-nav-container-item"
                className="bottom-nav-hover bottom-nav-hover-field d-flex align-items-center justify-content-center mb-2"></span>
            </div>

            <div
              className="d-flex justify-content-center p-0 px-2 mb-0 bg-widget5 border-0 shadow-none player-actions-large-layout-s1"
              style={{
                borderRadius: "20px 20px 0px 0px",
                filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
              }}>
              <div className="game__actions">

                {/* Join Game – EveryMatrix */}
                {[PROVIDER_TYPE_EXTERNAL, PROVIDER_TYPE_EVERYMATRIX].includes(this.props.providerId) && (
                  <span
                    id="bottom-nav-link-10"
                    className={`game__action cursor-pointer nav_link__container nav_link__item ${!this.props.game.player && "nav_link__item__active"} ml-3 mr-3`}
                    onClick={() => this.props.openFill(1)}>
                    <span className={`${!this.props.game.player ? "icon__success" : "icon__default"}`}>
                      <JoinGameIcon />
                    </span>
                  </span>
                )}
                {/* / Join Game – EveryMatrix */}

                {/* Re-Buy – EveryMatrix */}
                {[PROVIDER_TYPE_EXTERNAL, PROVIDER_TYPE_EVERYMATRIX].includes(this.props.providerId) && !this.props.game.tournament && (
                  <span
                    id="bottom-nav-link-11"
                    className={`game__action cursor-pointer nav_link__container nav_link__item mr-3`}
                    onClick={() => this.props.openFill(4)}>
                    <ReBuyIcon />
                  </span>
                )}
                {/* / Re-Buy – EveryMatrix */}

                {/* Sit Out – Internal/EveryMatrix */}
                <>
                  {this.props.game.player && this.state.sitOutEnabled
                    ? <span
                      id="bottom-nav-link-03"
                      className={`game__action cursor-pointer nav_link__container nav_link__item ${this.handleRenderSitOutClassName(this.props.game.player.p_sit_out_request, this.props.game.player.p_sit_out)} mr-3 live-d-lg-flex`}
                      onClick={e => this.handleSubmitSitOutState(!this.props.game.player.p_sit_out_request)}>
                      <span className={`${this.handleRenderSitOutState(this.props.game.player.p_sit_out_request, this.props.game.player.p_sit_out)}`}>
                        <SitOutIcon />
                      </span>
                    </span>
                    : <span
                      id="bottom-nav-link-03"
                      className="game__action cursor-pointer nav_link__container nav_link__item mr-3 live-d-lg-flex"
                      onClick={(e) => { this.handleMessageSitOutUnavailable() }}>
                      <SitOutIcon />
                    </span>}
                </>
                {/* / Sit Out – Internal/EveryMatrix */}

                {/* Muck Cards – Internal/EveryMatrix */}
                <>
                  {this.props.game.player
                    ? <span
                      id="bottom-nav-link-04"
                      className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.game.player.p_muck_cards && "nav_link__item__active"} mr-3 live-d-lg-flex`}
                      onClick={e => this.handleSubmitMuckCardsState(!this.props.game.player.p_muck_cards)}>
                      <span className={`${this.props.game.player.p_muck_cards ? "icon__success" : "icon__default"}`}>
                        <MuckCardsIcon />
                      </span>
                    </span>
                    : <span
                      id="bottom-nav-link-04"
                      className="game__action cursor-pointer nav_link__container nav_link__item mr-3 live-d-lg-flex"
                      onClick={(e) => { this.handleMessageMuckCardsUnavailable() }}>
                      <MuckCardsIcon />
                    </span>}
                </>
                {/* / Muck Cards – Internal/EveryMatrix */}

                {/* Player Profile – Internal/EveryMatrix */}
                {/* <span
                  id="bottom-nav-link-05"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.settings.optionD15 && "nav_link__item__active"} mr-3 live-d-lg-flex`}
                  onClick={(e) => this.props.change('optionD15', !this.props.settings.optionD15)}>
                  <svg className={`icon icon-wand ${this.props.settings.optionD15 ? "icon__success" : "icon__default"}`}>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-profile`}></use>
                  </svg>
                </span> */}
                {/* / Player Profile – Internal/EveryMatrix */}

                {/* Giphy Searchbox – Internal/EveryMatrix */}
                {this.props.game.player && this.props.settings.optionF7 && (
                  <>
                    <QuickGiphySearchbox
                      {...this.props} {...this.state}
                      disabled={this.props.game.player ? false : true}
                    />
                  </>
                )}
                {/* / Giphy Searchbox – Internal/EveryMatrix */}

                {/* Review Showdown – EveryMatrix */}
                {[PROVIDER_TYPE_EXTERNAL, PROVIDER_TYPE_EVERYMATRIX].includes(this.props.providerId) && (
                  <span
                    id="bottom-nav-link-14"
                    className={`game__action cursor-pointer nav_link__container nav_link__item mr-3`}
                    onClick={() => this.props.openFill(3)}>
                    <ShowdownReviewIcon />
                  </span>
                )}
                {/* / Review Showdown – EveryMatrix */}

                {/* Dealer Tip – EveryMatrix */}
                {[PROVIDER_TYPE_EXTERNAL, PROVIDER_TYPE_EVERYMATRIX].includes(this.props.providerId) && (
                  <span
                    id="bottom-nav-link-12"
                    className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.game.player && "nav_link__item__active"} mr-3 live-d-lg-flex`}
                    onClick={() => this.props.openFill(7)}>
                    <span className={`${this.props.game.player ? "icon__success" : "icon__default"}`}>
                      <DealerTipIcon />
                    </span>
                  </span>
                )}
                {/* / Dealer Tip – EveryMatrix */}

                {/* Enable Stream – Internal */}
                {![PROVIDER_TYPE_EXTERNAL, PROVIDER_TYPE_EVERYMATRIX].includes(this.props.providerId) && !this.props.game.data.auto_mode && (
                  <span
                    id="bottom-nav-link-07"
                    className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.settings.optionE1 && "nav_link__item__active"} mr-3`}
                    onClick={(e) => this.props.change('optionE1', !this.props.settings.optionE1)}>
                    <svg className={`icon icon-wand ${this.props.settings.optionE1 ? "icon__success" : "icon__default"}`}>
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-camera`}></use>
                    </svg>
                  </span>
                )}
                {/* / Enable Stream – Internal */}

                {/* Leave Game – Internal */}
                {![PROVIDER_TYPE_EXTERNAL, PROVIDER_TYPE_EVERYMATRIX].includes(this.props.providerId) && (
                  <span
                    id="bottom-nav-link-09"
                    className="game__action cursor-pointer nav_link__container nav_link__item mr-3"
                    onClick={() => this.props.openSlide(9)}>
                    <svg className="icon icon-logout-s2">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-logout`}></use>
                    </svg>
                  </span>
                )}
                {/* / Leave Game – Internal */}

              </div>
            </div>
          </>
        )}
        {/* / Player Quick Actions */}
      </>
    )
  }
}

export default PlayerQuickActions