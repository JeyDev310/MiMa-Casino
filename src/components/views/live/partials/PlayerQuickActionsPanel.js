import React, { Component } from 'react'
import { RateLimiter } from 'limiter'
import toast from 'react-hot-toast'

// import QuickGiphySearchbox from '../modals/panel/QuickGiphySearchboxModal'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/styles/pages/navigation.scss'

const JoinGameIcon = () => <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.2955 20.0313C14.8063 20.0313 7.84091 21.7977 7.84091 25.3438V28H28.75V25.3438C28.75 21.7977 21.7847 20.0313 18.2955 20.0313ZM6.53409 14.7188V10.7344H3.92045V14.7188H0V17.375H3.92045V21.3594H6.53409V17.375H10.4545V14.7188M18.2955 17.375C19.6818 17.375 21.0114 16.8153 21.9917 15.819C22.972 14.8227 23.5227 13.4715 23.5227 12.0625C23.5227 10.6535 22.972 9.30228 21.9917 8.306C21.0114 7.30971 19.6818 6.75 18.2955 6.75C16.9091 6.75 15.5795 7.30971 14.5992 8.306C13.6189 9.30228 13.0682 10.6535 13.0682 12.0625C13.0682 13.4715 13.6189 14.8227 14.5992 15.819C15.5795 16.8153 16.9091 17.375 18.2955 17.375Z" fill="white"/>
</svg>


const ReBuyIcon = () => <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.66667 7C3.19583 7 2 8.12109 2 9.5V19.5C2 20.8789 3.19583 22 4.66667 22H23.3333C24.8042 22 26 20.8789 26 19.5V9.5C26 8.12109 24.8042 7 23.3333 7H4.66667ZM13.3333 12H22.6667C23.0333 12 23.3333 12.2812 23.3333 12.625C23.3333 12.9688 23.0333 13.25 22.6667 13.25H13.3333C12.9667 13.25 12.6667 12.9688 12.6667 12.625C12.6667 12.2812 12.9667 12 13.3333 12ZM12.6667 16.375C12.6667 16.0312 12.9667 15.75 13.3333 15.75H22.6667C23.0333 15.75 23.3333 16.0312 23.3333 16.375C23.3333 16.7188 23.0333 17 22.6667 17H13.3333C12.9667 17 12.6667 16.7188 12.6667 16.375ZM8.83333 10.4375V10.9805C9.14583 11.0273 9.44167 11.0938 9.7125 11.1641C10.1583 11.2734 10.4208 11.7031 10.3042 12.1211C10.1875 12.5391 9.72917 12.7852 9.28333 12.6758C8.825 12.5625 8.38333 12.4805 7.98333 12.4727C7.65417 12.4688 7.31667 12.543 7.0875 12.668C6.8875 12.7773 6.82917 12.8867 6.82917 13.0312C6.82917 13.1016 6.83333 13.168 7.05 13.293C7.3125 13.4414 7.69583 13.5547 8.22917 13.7031L8.25833 13.7109C8.725 13.8438 9.325 14.0117 9.80417 14.2969C10.3417 14.6133 10.8167 15.1289 10.8292 15.9219C10.8417 16.7383 10.3917 17.332 9.79583 17.6797C9.49583 17.8555 9.1625 17.9648 8.82917 18.0312V18.5625C8.82917 18.9922 8.45417 19.3438 7.99583 19.3438C7.5375 19.3438 7.1625 18.9922 7.1625 18.5625V17.9922C6.73333 17.9062 6.32917 17.7773 5.9875 17.6641C5.9 17.6367 5.81667 17.6094 5.73333 17.582C5.29583 17.4453 5.0625 17.0039 5.20833 16.5938C5.35417 16.1836 5.825 15.9648 6.2625 16.1016C6.36667 16.1328 6.46667 16.168 6.5625 16.1953C7.12917 16.375 7.5625 16.5117 8.025 16.5273C8.38333 16.5391 8.7125 16.4648 8.91667 16.3438C9.0875 16.2461 9.16667 16.1289 9.1625 15.9336C9.1625 15.8203 9.12917 15.7383 8.91667 15.6133C8.65417 15.457 8.275 15.3437 7.75 15.1953L7.67917 15.1758C7.225 15.0469 6.65417 14.8867 6.19583 14.6289C5.66667 14.3281 5.17083 13.8281 5.16667 13.0391C5.1625 12.2148 5.65833 11.6445 6.24167 11.3242C6.52917 11.1641 6.84583 11.0586 7.16667 10.9922V10.4375C7.16667 10.0078 7.54167 9.65625 8 9.65625C8.45833 9.65625 8.83333 10.0078 8.83333 10.4375Z" fill="white"/>
</svg>

const SitOutIcon = () => <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.09 17.59L13.5 19L18.5 14L13.5 9L12.09 10.41L14.67 13H5V15H14.67L12.09 17.59ZM21 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V11H7V7H21V21H7V17H5V21C5 21.5304 5.21071 22.0391 5.58579 22.4142C5.96086 22.7893 6.46957 23 7 23H21C22.1 23 23 22.1 23 21V7C23 5.9 22.1 5 21 5Z" fill="white"/>
</svg>

const MuckCardsIcon = () => <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.8511 25.5C15.0125 25.5 16.0746 25.285 17.0374 24.855C18.0002 24.425 18.8313 23.8547 19.5307 23.1441C20.2307 22.4334 20.7754 21.6094 21.1649 20.6719C21.5543 19.7344 21.7494 18.7656 21.75 17.7656L21.75 8.39063C21.75 8.0625 21.6345 7.785 21.4035 7.55813C21.1725 7.33125 20.8903 7.21813 20.5568 7.21875C20.2227 7.21875 19.9402 7.33219 19.7092 7.55906C19.4782 7.78594 19.363 8.06313 19.3636 8.39063L19.3636 13.7813C19.3636 13.9063 19.3159 14.0156 19.2205 14.1094C19.125 14.2031 19.0136 14.25 18.8864 14.25C18.7591 14.25 18.6477 14.2031 18.5523 14.1094C18.4568 14.0156 18.4091 13.9063 18.4091 13.7813L18.4091 5.57813C18.4091 5.25 18.2936 4.9725 18.0626 4.74563C17.8316 4.51875 17.5494 4.40563 17.2159 4.40625C16.8818 4.40625 16.5993 4.51969 16.3683 4.74656C16.1373 4.97344 16.0221 5.25063 16.0227 5.57813V12.8438C16.0227 12.9688 15.975 13.0781 15.8795 13.1719C15.7841 13.2656 15.6727 13.3125 15.5455 13.3125C15.4182 13.3125 15.3068 13.2656 15.2114 13.1719C15.1159 13.0781 15.0682 12.9688 15.0682 12.8438L15.0682 4.17188C15.0682 3.84375 14.9527 3.56625 14.7217 3.33938C14.4907 3.1125 14.2085 2.99938 13.875 3C13.5409 3 13.2584 3.11344 13.0274 3.34032C12.7964 3.56719 12.6812 3.84438 12.6818 4.17188L12.6818 12.8438C12.6818 12.9688 12.6341 13.0781 12.5386 13.1719C12.4432 13.2656 12.3318 13.3125 12.2045 13.3125C12.0773 13.3125 11.9659 13.2656 11.8705 13.1719C11.775 13.0781 11.7273 12.9688 11.7273 12.8438L11.7273 6.04688C11.7273 5.71875 11.6118 5.44125 11.3808 5.21438C11.1498 4.9875 10.8675 4.87438 10.5341 4.875C10.2 4.875 9.91746 4.98844 9.68646 5.21531C9.45546 5.44219 9.34027 5.71938 9.34091 6.04688L9.34091 16.1484C10.2318 16.2734 10.9716 16.6288 11.5602 17.2144C12.1489 17.8 12.5068 18.5072 12.6341 19.3359C12.6659 19.4766 12.63 19.6016 12.5262 19.7109C12.4225 19.8203 12.2914 19.875 12.133 19.875C12.0216 19.875 11.9261 19.8397 11.8466 19.7691C11.767 19.6984 11.7193 19.6009 11.7034 19.4766C11.608 18.7891 11.2898 18.2147 10.7489 17.7534C10.208 17.2922 9.57955 17.0619 8.86364 17.0625C8.73637 17.0625 8.625 17.0156 8.52955 16.9219C8.43409 16.8281 8.38637 16.7188 8.38637 16.5938L8.38637 11.6719C8.38637 11.3438 8.27086 11.0663 8.03986 10.8394C7.80886 10.6125 7.52664 10.4994 7.19318 10.5C6.85909 10.5 6.57655 10.6134 6.34555 10.8403C6.11455 11.0672 5.99937 11.3444 6 11.6719L6 17.7656C6 18.7656 6.19091 19.7306 6.57273 20.6606C6.95455 21.5906 7.49132 22.4147 8.18305 23.1328C8.87541 23.8516 9.70268 24.4259 10.6649 24.8559C11.627 25.2859 12.6885 25.5006 13.8511 25.5Z" fill="white"/>
</svg>

// const PlayerProfileIcon = () => <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M19.3125 0.5H2.8125C1.67813 0.5 0.75 1.42813 0.75 2.5625V20.4375C0.75 21.5719 1.67813 22.5 2.8125 22.5H19.3125C20.4469 22.5 21.375 21.5719 21.375 20.4375V2.5625C21.375 1.42813 20.4469 0.5 19.3125 0.5ZM18.625 19.75H3.5V3.25H18.625V19.75ZM6.25 12.875H15.875V14.25H6.25V12.875ZM6.25 15.625H15.875V17H6.25V15.625ZM7.625 6.6875C7.62509 6.41656 7.67855 6.14829 7.78231 5.898C7.88608 5.64772 8.03813 5.42033 8.22978 5.22881C8.42143 5.03729 8.64892 4.88539 8.89927 4.78179C9.14963 4.67819 9.41793 4.62491 9.68887 4.625C9.95982 4.62509 10.2281 4.67855 10.4784 4.78231C10.7287 4.88608 10.956 5.03813 11.1476 5.22978C11.3391 5.42143 11.491 5.64892 11.5946 5.89927C11.6982 6.14963 11.7515 6.41793 11.7514 6.68887C11.7512 7.23607 11.5336 7.76077 11.1466 8.14757C10.7595 8.53436 10.2347 8.75156 9.6875 8.75137C9.14031 8.75119 8.6156 8.53365 8.22881 8.1466C7.84201 7.75954 7.62482 7.23469 7.625 6.6875ZM11.0625 8.75H8.3125C7.17813 8.75 6.25 9.36875 6.25 10.125V11.5H13.125V10.125C13.125 9.36875 12.1969 8.75 11.0625 8.75Z" fill="white"/>
// </svg>

const ShowdownReviewIcon = () => <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.8409 7.98701H4.29545C3.95198 7.98668 3.62268 7.85522 3.37981 7.62148C3.13694 7.38774 3.00034 7.07082 3 6.74026V4.24675C3.00034 3.9162 3.13694 3.59927 3.37981 3.36553C3.62268 3.13179 3.95198 3.00033 4.29545 3H19.8409C20.1844 3.00033 20.5137 3.13179 20.7566 3.36553C20.9994 3.59927 21.136 3.9162 21.1364 4.24675V6.74026C21.136 7.07082 20.9994 7.38774 20.7566 7.62148C20.5137 7.85522 20.1844 7.98668 19.8409 7.98701ZM4.29545 4.24675V6.74026H19.8409V4.24675H4.29545ZM19.8409 20.4545H4.29545C3.95198 20.4542 3.62268 20.3228 3.37981 20.089C3.13694 19.8553 3.00034 19.5384 3 19.2078V16.7143C3.00034 16.3837 3.13694 16.0668 3.37981 15.8331C3.62268 15.5993 3.95198 15.4679 4.29545 15.4675H19.8409C20.1844 15.4679 20.5137 15.5993 20.7566 15.8331C20.9994 16.0668 21.136 16.3837 21.1364 16.7143V19.2078C21.136 19.5384 20.9994 19.8553 20.7566 20.089C20.5137 20.3228 20.1844 20.4542 19.8409 20.4545ZM4.29545 16.7143V19.2078H19.8409V16.7143H4.29545ZM19.8409 14.2208H4.29545C3.95198 14.2204 3.62268 14.089 3.37981 13.8553C3.13694 13.6215 3.00034 13.3046 3 12.974V10.4805C3.00034 10.15 3.13694 9.83304 3.37981 9.5993C3.62268 9.36556 3.95198 9.2341 4.29545 9.23377H19.8409C20.1844 9.2341 20.5137 9.36556 20.7566 9.5993C20.9994 9.83304 21.136 10.15 21.1364 10.4805V12.974C21.136 13.3046 20.9994 13.6215 20.7566 13.8553C20.5137 14.089 20.1844 14.2204 19.8409 14.2208ZM4.29545 10.4805V12.974H19.8409V10.4805H4.29545Z" fill="white"/>
</svg>

const DealerTipIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M22 8.71001C22 10.13 21.45 11.46 20.45 12.46L12.6 20.31C12.56 20.35 12.45 20.44 12.4 20.47C12.28 20.55 12.14 20.59 12 20.59C11.86 20.59 11.71 20.55 11.59 20.47C11.53 20.43 11.48 20.39 11.42 20.33L3.56 12.46C2.55 11.46 2 10.13 2 8.71001C2 7.29001 2.55 5.96001 3.56 4.96001C5.63 2.90001 8.99 2.90001 11.06 4.96001L12 5.91001L12.95 4.96001C15.02 2.90001 18.38 2.90001 20.44 4.96001C21.45 5.96001 22 7.29001 22 8.71001Z" fill="white" />
</svg>

// const NavigationIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M4.81 9.19C3.26 9.19 2 10.45 2 12C2 13.55 3.26 14.81 4.81 14.81C6.35 14.81 7.60999 13.55 7.60999 12C7.60999 10.45 6.35 9.19 4.81 9.19Z" fill="white" />
//   <path d="M12 14.81C13.5519 14.81 14.81 13.5519 14.81 12C14.81 10.4481 13.5519 9.19 12 9.19C10.4481 9.19 9.19 10.4481 9.19 12C9.19 13.5519 10.4481 14.81 12 14.81Z" fill="white" />
//   <path d="M19.19 9.19C17.65 9.19 16.39 10.45 16.39 12C16.39 13.55 17.65 14.81 19.19 14.81C20.74 14.81 22 13.55 22 12C22 10.45 20.74 9.19 19.19 9.19Z" fill="white" />
// </svg>

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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
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
            container.style.transform = "translate(-50px, 0px)"
          })
          break
        case '15':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Navigation')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(-50px, 0px)"
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
              className="d-flex justify-content-center p-0 px-2 mb-0 bg-black border-0 shadow-none player-actions-large-layout-s1 joyride-step-3-3-status-quick">
              <div className="quick-actions-panel-outer">

                {/* Join Game – EveryMatrix */}
                {true && (
                  <span
                    id="bottom-nav-link-10"
                    className={`game__action cursor-pointer nav_link__container nav_link__item ${!this.props.game.player && "nav_link__item__active"} ml-3 mr-3 joyride-step-4-1-join-game`}
                    onClick={() => this.props.openFill(1)}>
                    <span className={`${!this.props.game.player ? "icon__success" : "icon__default"}`}>
                      <JoinGameIcon />
                    </span>
                  </span>
                )}
                {/* / Join Game – EveryMatrix */}

                {/* Re-Buy – EveryMatrix */}
                {true && !this.props.game.tournament && (
                  <span
                    id="bottom-nav-link-11"
                    className={`game__action cursor-pointer nav_link__container nav_link__item mr-3 joyride-step-4-2-re-buy`}
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
                      className={`game__action cursor-pointer nav_link__container nav_link__item ${this.handleRenderSitOutClassName(this.props.game.player.p_sit_out_request, this.props.game.player.p_sit_out)} mr-3 joyride-step-4-3-sit-out`}
                      onClick={e => this.handleSubmitSitOutState(!this.props.game.player.p_sit_out_request)}>
                      <span className={`${this.handleRenderSitOutState(this.props.game.player.p_sit_out_request, this.props.game.player.p_sit_out)}`}>
                        <SitOutIcon />
                      </span>
                    </span>
                    : <span
                      id="bottom-nav-link-03"
                      className="game__action cursor-pointer nav_link__container nav_link__item mr-3 joyride-step-4-3-sit-out"
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
                      className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.game.player.p_muck_cards && "nav_link__item__active"} mr-3 joyride-step-4-4-muck-cards`}
                      onClick={e => this.handleSubmitMuckCardsState(!this.props.game.player.p_muck_cards)}>
                      <span className={`${this.props.game.player.p_muck_cards ? "icon__success" : "icon__default"}`}>
                        <MuckCardsIcon />
                      </span>
                    </span>
                    : <span
                      id="bottom-nav-link-04"
                      className="game__action cursor-pointer nav_link__container nav_link__item mr-3 joyride-step-4-4-muck-cards"
                      onClick={(e) => { this.handleMessageMuckCardsUnavailable() }}>
                      <MuckCardsIcon />
                    </span>}
                </>
                {/* / Muck Cards – Internal/EveryMatrix */}

                {/* Player Profile – Internal/EveryMatrix */}
                {/* {!this.props.game.player && (
                  <span
                    id="bottom-nav-link-05"
                    className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.settings.optionD15 && "nav_link__item__active"} mr-3 live-d-lg-flex joyride-step-4-5-enable-profile`}
                    onClick={(e) => this.props.change('optionD15', !this.props.settings.optionD15)}>
                    <span className={`${this.props.settings.optionD15 ? "icon__success" : "icon__default"}`}>
                      <PlayerProfileIcon />
                    </span>
                  </span>
                )} */}
                {/* / Player Profile – Internal/EveryMatrix */}

                {/* Giphy Searchbox – Internal/EveryMatrix */}
                {/* {this.props.game.player && this.props.settings.optionF7 && (
                  <>
                    <QuickGiphySearchbox
                      {...this.props} {...this.state}
                      disabled={this.props.game.player ? false : true}
                    />
                  </>
                )} */}
                {/* / Giphy Searchbox – Internal/EveryMatrix */}

                {/* Review Showdown – EveryMatrix */}
                {true && (
                  <span
                    id="bottom-nav-link-14"
                    className={`game__action cursor-pointer nav_link__container nav_link__item mr-3 joyride-step-4-6-showdown`}
                    onClick={() => this.props.openFill(3)}>
                    <ShowdownReviewIcon />
                  </span>
                )}
                {/* / Review Showdown – EveryMatrix */}

                {/* Dealer Tip – EveryMatrix */}
                {true && (
                  <span
                    id="bottom-nav-link-12"
                    className={`game__action cursor-pointer nav_link__container nav_link__item ${this.props.game.player && "nav_link__item__active"} mr-3 joyride-step-4-7-dealer-tip`}
                    onClick={() => this.props.openFill(7)}>
                    <span className={`${this.props.game.player ? "icon__success" : "icon__default"}`}>
                      <DealerTipIcon />
                    </span>
                  </span>
                )}
                {/* / Dealer Tip – EveryMatrix */}

                {/* Review Showdown – EveryMatrix */}
                {/* {true && (
                  <span
                    id="bottom-nav-link-15"
                    className={`game__action cursor-pointer nav_link__container nav_link__item mr-3 live-d-flex-lg-none`}
                    onClick={() => this.props.openSlide(19)}>
                    <NavigationIcon />
                  </span>
                )} */}
                {/* / Review Showdown – EveryMatrix */}

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
