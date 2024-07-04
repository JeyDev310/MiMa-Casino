import React, { Component } from 'react'
import { Badge, Card, Form, Media } from 'react-bootstrap'

import PlayerNotifications from './PlayerNotifications'

import PerfectScrollbar from 'react-perfect-scrollbar'

import {
  formatPrice,
  truncateUsername,
} from '../utilities/TextPreprocessing'

import {
  GAME_ROUND_TYPE_NULL,
  GAME_ROUND_TYPE_SHOWDOWN,
} from '../core/GameRoundTypes'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/libs/react-perfect-scrollbar/react-perfect-scrollbar.scss'

class PlayerOrbit extends Component {

  constructor(props) {
    super(props)

    this.renderSeat = this.renderSeat.bind(this)
    this.renderPresence = this.renderPresence.bind(this)

    this.getSeatCount = this.getSeatCount.bind(this)
    this.getSeatCountArr = this.getSeatCountArr.bind(this)
    this.getPlayersCount = this.getPlayersCount.bind(this)
    this.getItemActionEl = this.getItemActionEl.bind(this)
    this.getItemPlayerIcon = this.getItemPlayerIcon.bind(this)
    this.getItemOpacity = this.getItemOpacity.bind(this)
    this.getItemPanelBackground = this.getItemPanelBackground.bind(this)
    this.getItemActionIndicator = this.getItemActionIndicator.bind(this)
    this.itemIsCurrentPlayer = this.itemIsCurrentPlayer.bind(this)
    this.onHandleSwitchPlayerList = this.onHandleSwitchPlayerList.bind(this)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    this.onHandleSwitchPlayerList()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data !== this.props.game.data) {
      this.onHandleSwitchPlayerList()
    }
  }

  onHandleSwitchPlayerList() {
    if (
      this.props.game.data &&
      this.props.game.profile &&
      this.props.game.presence
    ) {
      if (
        !this.props.game.data.game_started &&
        this.props.game.data.current_round === GAME_ROUND_TYPE_NULL &&
        this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
      ) {
        this.setState({
          init: true,
        })
      } else {
        this.setState({
          init: false,
        })
      }
    } else {
      this.setState({
        init: false,
      })
    }
  }

  getItemPlayerIcon(p) {
    if (p.p_sit_out) {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx player-position-icon-halo-transform-animation">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.0001 2.30952C18.4753 0.880456 21.5249 0.880456 24.0001 2.30952L33.3206 7.69069C35.7958 9.11977 37.3206 11.7608 37.3206 14.6189V25.3813C37.3206 28.2394 35.7958 30.8805 33.3206 32.3095L24.0001 37.6907C21.5249 39.1198 18.4753 39.1198 16.0001 37.6907L6.67954 32.3095C4.20434 30.8805 2.67955 28.2394 2.67955 25.3813V14.6189C2.67955 11.7608 4.20434 9.11977 6.67954 7.69069L16.0001 2.30952Z" fill="white" />
            <path d="M17.0009 13.002C17.1344 12.9932 17.2684 13.013 17.3937 13.0601C17.519 13.1072 17.6327 13.1806 17.7274 13.2752C17.8221 13.3699 17.8954 13.4837 17.9425 13.609C17.9896 13.7343 18.0094 13.8682 18.0006 14.0018V25.9982C18.0094 26.1318 17.9896 26.2657 17.9425 26.391C17.8954 26.5163 17.8221 26.6301 17.7274 26.7248C17.6327 26.8194 17.519 26.8928 17.3937 26.9399C17.2684 26.987 17.1344 27.0068 17.0009 26.998H14.0018C13.8682 27.0068 13.7343 26.987 13.609 26.9399C13.4837 26.8928 13.3699 26.8194 13.2752 26.7248C13.1806 26.6301 13.1072 26.5163 13.0601 26.391C13.013 26.2657 12.9932 26.1318 13.002 25.9982V14.0018C12.9932 13.8682 13.013 13.7343 13.0601 13.609C13.1072 13.4837 13.1806 13.3699 13.2752 13.2752C13.3699 13.1806 13.4837 13.1072 13.609 13.0601C13.7343 13.013 13.8682 12.9932 14.0018 13.002H17.0009ZM25.9982 13.002C26.1318 12.9932 26.2657 13.013 26.391 13.0601C26.5163 13.1072 26.6301 13.1806 26.7248 13.2752C26.8194 13.3699 26.8928 13.4837 26.9399 13.609C26.987 13.7343 27.0068 13.8682 26.998 14.0018V25.9982C27.0068 26.1318 26.987 26.2657 26.9399 26.391C26.8928 26.5163 26.8194 26.6301 26.7248 26.7248C26.6301 26.8194 26.5163 26.8928 26.391 26.9399C26.2657 26.987 26.1318 27.0068 25.9982 26.998H22.9991C22.8656 27.0068 22.7316 26.987 22.6063 26.9399C22.481 26.8928 22.3673 26.8194 22.2726 26.7248C22.1779 26.6301 22.1046 26.5163 22.0575 26.391C22.0104 26.2657 21.9906 26.1318 21.9994 25.9982V14.0018C21.9906 13.8682 22.0104 13.7343 22.0575 13.609C22.1046 13.4837 22.1779 13.3699 22.2726 13.2752C22.3673 13.1806 22.481 13.1072 22.6063 13.0601C22.7316 13.013 22.8656 12.9932 22.9991 13.002H25.9982Z" fill="black" />
          </svg>
        </span>
      )
    }
    if (p.p_low_balance) {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx player-position-icon-halo-transform-animation">
          <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0001 4.04166C32.3317 1.5408 37.6685 1.5408 42.0001 4.04166L58.311 13.4587C62.6426 15.9596 65.311 20.5814 65.311 25.5831V44.4173C65.311 49.419 62.6426 54.0408 58.311 56.5417L42.0001 65.9587C37.6685 68.4596 32.3317 68.4596 28.0001 65.9587L11.6892 56.5417C7.3576 54.0408 4.68921 49.419 4.68921 44.4173V25.5831C4.68921 20.5814 7.3576 15.9596 11.6892 13.4587L28.0001 4.04166Z" fill="white" />
            <path opacity="0.3" d="M34.7926 54.7407C33.6371 54.7407 32.8667 53.9703 32.8667 52.8148V18.1481C32.8667 16.9925 33.6371 16.2222 34.7926 16.2222C35.9482 16.2222 36.7186 16.9925 36.7186 18.1481V52.8148C36.7186 53.9703 35.9482 54.7407 34.7926 54.7407Z" fill="black" />
            <path d="M45 40.6823C45 42.223 44.6148 43.7638 43.8444 44.9193C43.074 46.2675 41.9185 47.2304 40.1851 47.8082C38.6444 48.5786 36.7185 48.9638 34.6 48.9638C32.0962 48.9638 29.9777 48.386 28.2444 47.423C27.0889 46.6527 26.1259 45.8823 25.3555 44.5341C24.5852 43.3786 24.2 42.223 24.2 41.0675C24.2 40.4897 24.3925 39.9119 24.7777 39.3341C25.1629 38.949 25.7407 38.5638 26.5111 38.5638C27.0889 38.5638 27.474 38.7564 27.8592 39.1416C28.2444 39.5267 28.6296 40.1045 28.8222 40.6823C29.2073 41.4527 29.5925 42.223 29.9777 42.8008C30.3629 43.3786 30.9407 43.7638 31.5185 44.149C32.2888 44.5341 33.0592 44.7267 34.2148 44.7267C35.7555 44.7267 37.1037 44.3416 38.0666 43.5712C39.0296 42.8008 39.6074 41.8378 39.6074 40.8749C39.6074 40.1045 39.4148 39.3341 38.837 38.7564C38.2592 38.1786 37.6814 37.7934 36.7185 37.6008C35.9481 37.4082 34.7925 37.023 33.4444 36.6379C31.5185 36.2527 29.9777 35.6749 28.8222 35.0971C27.474 34.5193 26.511 33.749 25.7407 32.786C24.9703 31.823 24.5852 30.4748 24.5852 28.9341C24.5852 27.586 24.9703 26.2378 25.7407 25.0823C26.511 23.9267 27.6666 23.1565 29.2074 22.5787C30.7481 22.0009 32.4814 21.6157 34.4074 21.6157C35.9481 21.6157 37.2962 21.8082 38.6444 22.1934C39.8 22.5786 40.7629 23.1564 41.5333 23.7342C42.3037 24.312 42.8814 25.0823 43.2666 25.8527C43.6518 26.623 43.8444 27.2008 43.8444 27.9711C43.8444 28.5489 43.6518 29.1267 43.2666 29.7045C42.8814 30.2823 42.3037 30.4749 41.5333 30.4749C40.9555 30.4749 40.3777 30.2822 40.1851 30.0896C39.9925 29.897 39.6074 29.3194 39.2222 28.549C38.837 27.586 38.2592 26.8155 37.4888 26.2378C36.7185 25.66 35.7555 25.4676 34.2148 25.4676C32.8666 25.4676 31.7111 25.8528 30.9407 26.4305C30.1703 27.0083 29.5925 27.7786 29.5925 28.549C29.5925 29.1268 29.7851 29.5119 29.9777 29.8971C30.1703 30.2823 30.7481 30.6674 31.1333 30.86C31.5185 31.0526 32.0962 31.4379 32.674 31.4379C33.2518 31.6304 34.0222 31.823 35.1777 32.2082C36.7185 32.5934 38.0666 32.9786 39.2222 33.3638C40.3777 33.749 41.3407 34.3267 42.3037 34.9045C43.074 35.4823 43.8444 36.2527 44.2296 37.2156C44.6148 38.1786 45 39.3341 45 40.6823Z" fill="black" />
          </svg>
        </span>
      )
    }
    if (p.p_smallblind) {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx player-position-icon-halo-transform-animation">
          <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0001 4.04166C32.3317 1.5408 37.6685 1.5408 42.0001 4.04166L58.311 13.4587C62.6426 15.9596 65.311 20.5814 65.311 25.5831V44.4173C65.311 49.419 62.6426 54.0408 58.311 56.5417L42.0001 65.9587C37.6685 68.4596 32.3317 68.4596 28.0001 65.9587L11.6892 56.5417C7.3576 54.0408 4.68921 49.419 4.68921 44.4173V25.5831C4.68921 20.5814 7.3576 15.9596 11.6892 13.4587L28.0001 4.04166Z" fill="white" />
            <path d="M24.3396 47C30.4481 47 34.0971 44.0422 34.0971 39.3804C34.0971 35.7314 31.8466 33.722 26.8955 32.7736L24.5164 32.3235C21.9926 31.8413 20.9478 31.1661 20.9478 29.9444C20.9478 28.578 22.2016 27.6135 24.3396 27.6135C26.0435 27.6135 27.3295 28.1762 28.0851 29.6229C28.7763 30.7482 29.58 31.2143 30.866 31.2143C32.3449 31.1983 33.3416 30.282 33.3416 28.9156C33.3416 28.4334 33.2612 28.0476 33.1005 27.6457C31.9752 24.704 28.7281 23 24.2914 23C18.9545 23 15.0804 25.8774 15.0804 30.3463C15.0804 33.8828 17.4916 36.1494 22.1052 37.0174L24.5003 37.4675C27.2492 37.998 28.2297 38.6571 28.2297 39.9431C28.2297 41.3577 26.7348 42.3865 24.436 42.3865C22.5713 42.3865 21.0121 41.7756 20.2244 40.3289C19.4689 39.1715 18.6973 38.7696 17.5559 38.7696C16.061 38.7696 15 39.7662 15 41.2451C15 41.7274 15.0965 42.2257 15.3054 42.708C16.2699 45.1031 19.3081 47 24.3396 47Z" fill="black" />
            <path d="M39.7877 46.5981H47.9056C52.8727 46.5981 56.0074 43.9779 56.0074 39.9109C56.0074 36.8245 53.5318 34.4936 50.3972 34.349V34.2204C52.9692 33.8667 54.9303 31.793 54.9303 29.1889C54.9303 25.6042 52.1815 23.4019 47.6162 23.4019H39.7877C37.923 23.4019 36.8299 24.5271 36.8299 26.4883V43.5117C36.8299 45.4729 37.923 46.5981 39.7877 46.5981ZM42.7294 32.854V27.5814H46.0569C48.0342 27.5814 49.1916 28.5459 49.1916 30.1695C49.1916 31.8413 47.9056 32.854 45.7676 32.854H42.7294ZM42.7294 42.4186V36.4387H46.2016C48.6289 36.4387 50.0114 37.4997 50.0114 39.3965C50.0114 41.3577 48.6611 42.4186 46.2338 42.4186H42.7294Z" fill="black" />
          </svg>
        </span>
      )
    }
    if (p.p_dealer) {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx player-position-icon-halo-transform-animation">
          <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0001 4.04166C32.3317 1.5408 37.6685 1.5408 42.0001 4.04166L58.311 13.4587C62.6426 15.9596 65.311 20.5814 65.311 25.5831V44.4173C65.311 49.419 62.6426 54.0408 58.311 56.5417L42.0001 65.9587C37.6685 68.4596 32.3317 68.4596 28.0001 65.9587L11.6892 56.5417C7.3576 54.0408 4.68921 49.419 4.68921 44.4173V25.5831C4.68921 20.5814 7.3576 15.9596 11.6892 13.4587L28.0001 4.04166Z" fill="white" />
            <path d="M28.0603 47H34.7464C41.9813 47 46.2557 42.526 46.2557 34.8586C46.2557 27.2079 41.9979 23 34.7464 23H28.0603C26.131 23 25 24.1642 25 26.1933V43.8067C25 45.8358 26.131 47 28.0603 47ZM31.1039 42.0769V27.9231H33.948C37.8067 27.9231 40.052 30.368 40.052 34.8753C40.052 39.6653 37.9231 42.0769 33.948 42.0769H31.1039Z" fill="black" />
          </svg>
        </span>
      )
    }
    if (p.p_bigblind) {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx player-position-icon-halo-transform-animation">
          <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0001 4.04166C32.3317 1.5408 37.6685 1.5408 42.0001 4.04166L58.311 13.4587C62.6426 15.9596 65.311 20.5814 65.311 25.5831V44.4173C65.311 49.419 62.6426 54.0408 58.311 56.5417L42.0001 65.9587C37.6685 68.4596 32.3317 68.4596 28.0001 65.9587L11.6892 56.5417C7.3576 54.0408 4.68921 49.419 4.68921 44.4173V25.5831C4.68921 20.5814 7.3576 15.9596 11.6892 13.4587L28.0001 4.04166Z" fill="white" />
            <path d="M18.0603 47H26.4595C31.5988 47 34.842 44.289 34.842 40.0811C34.842 36.8877 32.2807 34.4761 29.0374 34.3264V34.1933C31.6985 33.8274 33.7277 31.6819 33.7277 28.9875C33.7277 25.2786 30.8836 23 26.1601 23H18.0603C16.131 23 15 24.1642 15 26.1933V43.8067C15 45.8358 16.131 47 18.0603 47ZM21.104 32.7796V27.3243H24.5468C26.5925 27.3243 27.79 28.3222 27.79 30.0021C27.79 31.7318 26.4595 32.7796 24.2474 32.7796H21.104ZM21.104 42.6757V36.4886H24.6965C27.2079 36.4886 28.6383 37.5863 28.6383 39.5489C28.6383 41.578 27.2412 42.6757 24.7297 42.6757H21.104Z" fill="black" />
            <path d="M40.4803 47H48.8794C54.0187 47 57.262 44.289 57.262 40.0811C57.262 36.8877 54.7006 34.4761 51.4574 34.3264V34.1933C54.1185 33.8274 56.1476 31.6819 56.1476 28.9875C56.1476 25.2786 53.3035 23 48.58 23H40.4803C38.5509 23 37.42 24.1642 37.42 26.1933V43.8067C37.42 45.8358 38.5509 47 40.4803 47ZM43.5239 32.7796V27.3243H46.9667C49.0125 27.3243 50.21 28.3222 50.21 30.0021C50.21 31.7318 48.8794 32.7796 46.6674 32.7796H43.5239ZM43.5239 42.6757V36.4886H47.1164C49.6279 36.4886 51.0582 37.5863 51.0582 39.5489C51.0582 41.578 49.6611 42.6757 47.1497 42.6757H43.5239Z" fill="black" />
          </svg>
        </span>
      )
    }
    return (
      <span className="svg-icon svg-icon-muted svg-icon-2hx">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" version="1.1">
          <circle fill="white" cx="12" cy="12" r="8" />
        </svg>
      </span>
    )
  }

  itemIsCurrentPlayer(item) {
    if (
      this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
      this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
    ) {
      if (this.props.game.data && this.props.game.data.current_player) {
        if (this.props.game.data.current_player.p_username === item) {
          return true
        }
      }
    } else {
      return false
    }
  }

  getItemOpacity(item) {
    if (!item.p_playing | item.p_waiting | item.p_inactive) return 0.5
    return 1.0
  }

  getItemActionEl(item) {
    if (item.p_action === "Joined") return (<>
      <i className="ion ion-md-arrow-forward text-body"></i>
      <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)

    if (item.p_action === "Small Blind") return (<>
      <i className="ion ion-md-arrow-forward text-body"></i>
      <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)

    if (item.p_action === "Big Blind") return (<>
      <i className="ion ion-md-arrow-forward text-body"></i>
      <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)

    if (item.p_action === "Showdown") return (<>
      <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
        Waiting
      </span>
    </>)

    if (item.p_action === "Inactive") return (<>
      <span className="text-medium font-weight-bold ml-0" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)

    if (item.p_action === "Exited") return (<>
      <span className="text-medium font-weight-bold ml-0" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)

    if (item.p_action === "No Bet") return null
    if (item.p_action === "No Action") return null

    return (<>
      <i className="ion ion-md-arrow-forward text-body"></i>
      <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)
  }

  getItemActionIndicator(item) {
    if (item.p_action === "Bet") return (<>
      <Badge pill variant="opaque1" className="bg-player-action-opacity-drop-var-2  ml-1 font-weight-bold">BET</Badge>
    </>)
    if (item.p_action === "Check") return (<>
      <Badge pill variant="opaque1" className="bg-player-action-opacity-drop-var-2  ml-1 font-weight-bold">CHECK</Badge>
    </>)
    if (item.p_action === "Raise") return (<>
      <Badge pill variant="opaque1" className="bg-player-action-opacity-drop-var-2  ml-1 font-weight-bold">RAISE</Badge>
    </>)
    if (item.p_action === "Re-Raise") return (<>
      <Badge pill variant="opaque1" className="bg-player-action-opacity-drop-var-2  ml-1 font-weight-bold">RE-RAISE</Badge>
    </>)
    if (item.p_action === "Call") return (<>
      <Badge pill variant="opaque1" className="bg-player-action-opacity-drop-var-2  ml-1 font-weight-bold">CALL</Badge>
    </>)
    if (item.p_action === "Fold") return (<>
      <Badge pill variant="opaque1" className="bg-player-action-opacity-drop-var-2  ml-1 font-weight-bold">FOLD</Badge>
    </>)
    if (item.p_action === "All In") return (<>
      <Badge pill variant="opaque1" className="bg-player-action-opacity-drop-var-2  ml-1 font-weight-bold">ALL IN</Badge>
    </>)
    if (item.p_action === "Exited") return (<>
      <Badge pill variant="opaque1" className="bg-player-action-opacity-drop-var-2  ml-1 font-weight-bold">EXIT</Badge>
    </>)
    return null
  }

  getItemPanelBackground(item) {
    if (
      this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
      this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
    ) {
      if (this.itemIsCurrentPlayer(item.p_username)) return 'bg-active-player-timer-progress'
      if (item.p_action === "All In") return 'bg-player-item-action-all-in'
      if (item.p_action === "Inactive") return 'bg-player-item-action-inactive'
      return null
    } else {
      return null
    }
  }

  getSeatCountArr() {
    if (this.props.game.data) {
      return Array.from({ length: this.props.game.data.max_players }, (_, i) => i + 1)
    } else {
      return [1, 2, 3, 4, 5, 6]
    }
  }

  getSeatCount() {
    if (this.props.game.data) {
      return Number(this.props.game.data.max_players)
    } else {
      return 6
    }
  }

  getPlayersCount() {
    try {
      if (this.props.game.data) {
        return Number(this.props.game.data.users.length)
      } else {
        return 0
      }
    } catch {
      return 0
    }
  }

  getPlayersCountAsString() {
    try {
      if (this.props.game.data) {
        if (
          Number(this.props.game.data.users.length) === 0
        ) {
          return `No Live Players`
        } else if (
          Number(this.props.game.data.users.length) === 1
        ) {
          return `1 Live Player`
        } else {
          return `${Number(this.props.game.data.users.length)} Live Players`
        }
      } else {
        return `No Live Players`
      }
    } catch {
      return `No Live Players`
    }
  }

  renderSeat(seat, index) {

    var users = this.props.game.data.users
    var wait = users.find(x => x.p_seat_request === seat && x.p_waiting)
    var item = users.find(x => x.p_seat === seat && !x.p_waiting && x.p_playing)

    if (item) {
      return (
        <span
          key={seat}
          onClick={this.prevent}
          className={`list-group-item list-group-item-action online ${this.getItemPanelBackground(item)}`}
          style={{
            padding: "6px 6px 6px 6px",
            backgroundColor: `${index % 2 ? "rgba(255, 255, 255, 0.10)" : "rgba(255, 255, 255, 0.10)"}`,
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            borderBottomLeftRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
            borderBottomRightRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
            borderBottom: `${seat === this.getSeatCount() ? "0px solid rgba(255, 255, 255, 0.0)" : "1px solid rgba(255, 255, 255, 0.1)"}`,
            opacity: `${this.getItemOpacity(item)}`,
          }}>

          <div className="position-relative">
            {this.getItemPlayerIcon(item)}
          </div>

          <Media.Body className="ml-2">
            <span className="text-medium font-weight-bold">
              <span>
                {item.p_seat} | {truncateUsername(item.p_username)}
              </span>
              <span>
                {item.p_online
                  ? <Badge variant="success badge-dot ml-1" />
                  : <Badge variant="danger badge-dot ml-1" />}
              </span>
            </span>
            {this.getItemActionIndicator(item)}
            <div className="chat-status small text-body font-weight-bold">
              <i className="fas fa-check-circle text-body"></i>
              <span className="text-medium font-weight-bold ml-1 text-body">
                {formatPrice(item.p_balance_display)}
              </span>
              <i className="fas fa-coins text-body ml-2"></i>
              <span className="text-medium font-weight-bold ml-1 text-body">
                {formatPrice(item.p_bet_total)}
              </span>
            </div>
          </Media.Body>

          <div className="badge badge-light text-right">
            <h5 className="mb-0">
              <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", }}>
                {formatPrice(item.p_bet_per_round_display)}
              </span>
            </h5>
            {this.getItemActionEl(item)}
          </div>
        </span>
      )
    } else if (wait) {
      return (
        <span
          key={seat}
          onClick={this.prevent}
          className={`list-group-item list-group-item-action online`}
          style={{
            padding: "6px 6px 6px 6px",
            backgroundColor: `${index % 2 ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.08)"}`,
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            borderBottomLeftRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
            borderBottomRightRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
            borderBottom: `${seat === this.getSeatCount() ? "0px solid rgba(255, 255, 255, 0.0)" : "1px solid rgba(255, 255, 255, 0.1)"}`,
            opacity: `0.75`,
          }}>

          <div className="position-relative">
            <span className="svg-icon svg-icon-muted svg-icon-2hx">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" version="1.1">
                <circle fill="white" cx="12" cy="12" r="8" />
              </svg>
            </span>
          </div>

          <Media.Body className="ml-2">
            <span className="text-medium font-weight-bold">{seat} | {truncateUsername(wait.p_username)}</span>
            <div className="chat-status small text-body font-weight-bold">
              <i className="fas fa-check-circle text-body"></i>
              <span className="text-medium font-weight-bold ml-1 text-body">
                {wait.p_sit_out ? 'Sitting Out' : 'Reserved Seat'}
              </span>
            </div>
          </Media.Body>

          <div className="badge badge-light text-right">
            <span className="svg-icon svg-icon-muted svg-icon-2hx">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                <path d="M15.8054 11.639C15.6757 11.5093 15.5184 11.4445 15.3331 11.4445H15.111V10.1111C15.111 9.25927 14.8055 8.52784 14.1944 7.91672C13.5833 7.30557 12.8519 7 12 7C11.148 7 10.4165 7.30557 9.80547 7.9167C9.19432 8.52784 8.88885 9.25924 8.88885 10.1111V11.4445H8.66665C8.48153 11.4445 8.32408 11.5093 8.19444 11.639C8.0648 11.7685 8 11.926 8 12.1112V16.1113C8 16.2964 8.06482 16.4539 8.19444 16.5835C8.32408 16.7131 8.48153 16.7779 8.66665 16.7779H15.3333C15.5185 16.7779 15.6759 16.7131 15.8056 16.5835C15.9351 16.4539 16 16.2964 16 16.1113V12.1112C16.0001 11.926 15.9351 11.7686 15.8054 11.639ZM13.7777 11.4445H10.2222V10.1111C10.2222 9.6204 10.3958 9.20138 10.7431 8.85421C11.0903 8.507 11.5093 8.33343 12 8.33343C12.4909 8.33343 12.9097 8.50697 13.257 8.85421C13.6041 9.20135 13.7777 9.6204 13.7777 10.1111V11.4445Z" fill="white" />
              </svg>
            </span>
          </div>
        </span >
      )
    } else {
      return (
        <span
          key={seat}
          onClick={this.prevent}
          className={`list-group-item list-group-item-action online`}
          style={{
            padding: "6px 6px 6px 6px",
            backgroundColor: `${index % 2 ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.08)"}`,
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            borderBottomLeftRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
            borderBottomRightRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
            borderBottom: `${seat === this.getSeatCount() ? "0px solid rgba(255, 255, 255, 0.0)" : "1px solid rgba(255, 255, 255, 0.1)"}`,
            opacity: `0.75`,
          }}>

          <div className="position-relative cursor-pointer close-btn-opacity-animation" onClick={() => { this.props.select(seat, false) }}>
            <span className="svg-icon svg-icon-muted svg-icon-2hx">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" version="1.1">
                <circle fill="white" cx="12" cy="12" r="8" />
              </svg>
            </span>
          </div>

          <Media.Body className="ml-2 cursor-pointer close-btn-opacity-animation" onClick={() => { this.props.select(seat, false) }}>
            <span className="text-medium font-weight-bold">{seat} | Empty Seat</span>
            <div className="chat-status small text-body font-weight-bold">
              <i className="fas fa-check-circle text-body"></i>
              <span className="text-medium font-weight-bold ml-1 text-body">
                {formatPrice(0)}
              </span>
            </div>
          </Media.Body>

          <div className="badge badge-light text-right cursor-pointer close-btn-opacity-animation" onClick={() => { this.props.select(seat, false) }}>
            <span className="svg-icon svg-icon-muted svg-icon-2hx">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5C12.3 5 12.7 4.99998 13 5.09998V5V3C13 2.4 12.6 2 12 2C11.4 2 11 2.4 11 3V5V5.09998C11.3 4.99998 11.7 5 12 5Z" fill="white" />
                <path opacity="0.3" d="M12 22C8.7 22 6 19.3 6 16V11C6 7.7 8.7 5 12 5C15.3 5 18 7.7 18 11V16C18 19.3 15.3 22 12 22ZM13 12V9C13 8.4 12.6 8 12 8C11.4 8 11 8.4 11 9V12C11 12.6 11.4 13 12 13C12.6 13 13 12.6 13 12Z" fill="white" />
              </svg>
            </span>
          </div>
        </span >
      )
    }
  }

  renderPresence(seat, index) {
    if (this.props.game.presence) {

      var users = this.props.game.presence.players
      var wait = users.find(x => x.p_seat === seat && !x.p_waiting && x.p_playing)
      var item = users.find(x => x.p_seat_request === seat && x.p_waiting)

      if (item) {
        return (
          <span
            key={seat}
            onClick={this.prevent}
            className={`list-group-item list-group-item-action online ${this.getItemPanelBackground(item)}`}
            style={{
              padding: "6px 6px 6px 6px",
              backgroundColor: `${index % 2 ? "rgba(255, 255, 255, 0.10)" : "rgba(255, 255, 255, 0.10)"}`,
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
              borderBottomLeftRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
              borderBottomRightRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
              borderBottom: `${seat === this.getSeatCount() ? "0px solid rgba(255, 255, 255, 0.0)" : "1px solid rgba(255, 255, 255, 0.1)"}`,
              opacity: "1.0",
            }}>

            <div className="position-relative">
              {this.getItemPlayerIcon(item)}
            </div>

            <Media.Body className="ml-2">
              <span className="text-medium font-weight-bold">
                <span>
                  {item.p_seat_request} | {truncateUsername(item.p_username)}
                </span>
                <span>
                  {item.p_online
                    ? <Badge variant="success badge-dot ml-1" />
                    : <Badge variant="danger badge-dot ml-1" />}
                </span>
              </span>
              {this.getItemActionIndicator(item)}
              <div className="chat-status small text-body font-weight-bold">
                <i className="fas fa-check-circle text-body"></i>
                <span className="text-medium font-weight-bold ml-1 text-body">
                  {item.p_sit_out ? 'Sitting Out' : 'Ready'}
                </span>
              </div>
            </Media.Body>

            <div className="badge badge-light text-right">
              <h5 className="mb-0">
                <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", }}>
                  {formatPrice(0)}
                </span>
              </h5>
              {this.getItemActionEl(item)}
            </div>
          </span>
        )
      } else if (wait) {
        return (
          <span
            key={seat}
            className={`list-group-item list-group-item-action online`}
            style={{
              padding: "6px 6px 6px 6px",
              backgroundColor: `${index % 2 ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.08)"}`,
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
              borderBottomLeftRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
              borderBottomRightRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
              borderBottom: `${seat === this.getSeatCount() ? "0px solid rgba(255, 255, 255, 0.0)" : "1px solid rgba(255, 255, 255, 0.1)"}`,
              opacity: `0.75`,
            }}>

            <div className="position-relative">
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" version="1.1">
                  <circle fill="white" cx="12" cy="12" r="8" />
                </svg>
              </span>
            </div>

            <Media.Body className="ml-2">
              <span className="text-medium font-weight-bold">{seat} | Reserved Seat</span>
              <div className="chat-status small text-body font-weight-bold">
                <i className="fas fa-check-circle text-body"></i>
                <span className="text-medium font-weight-bold ml-1 text-body">
                  {truncateUsername(wait.p_username)}
                </span>
              </div>
            </Media.Body>

            <div className="badge badge-light text-right">
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                  <path d="M15.8054 11.639C15.6757 11.5093 15.5184 11.4445 15.3331 11.4445H15.111V10.1111C15.111 9.25927 14.8055 8.52784 14.1944 7.91672C13.5833 7.30557 12.8519 7 12 7C11.148 7 10.4165 7.30557 9.80547 7.9167C9.19432 8.52784 8.88885 9.25924 8.88885 10.1111V11.4445H8.66665C8.48153 11.4445 8.32408 11.5093 8.19444 11.639C8.0648 11.7685 8 11.926 8 12.1112V16.1113C8 16.2964 8.06482 16.4539 8.19444 16.5835C8.32408 16.7131 8.48153 16.7779 8.66665 16.7779H15.3333C15.5185 16.7779 15.6759 16.7131 15.8056 16.5835C15.9351 16.4539 16 16.2964 16 16.1113V12.1112C16.0001 11.926 15.9351 11.7686 15.8054 11.639ZM13.7777 11.4445H10.2222V10.1111C10.2222 9.6204 10.3958 9.20138 10.7431 8.85421C11.0903 8.507 11.5093 8.33343 12 8.33343C12.4909 8.33343 12.9097 8.50697 13.257 8.85421C13.6041 9.20135 13.7777 9.6204 13.7777 10.1111V11.4445Z" fill="white" />
                </svg>
              </span>
            </div>
          </span>
        )
      } else {
        return (
          <span
            key={seat}
            className={`list-group-item list-group-item-action online`}
            style={{
              padding: "6px 6px 6px 6px",
              backgroundColor: `${index % 2 ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.08)"}`,
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
              borderBottomLeftRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
              borderBottomRightRadius: `${seat === this.getSeatCount() ? "15px" : "0px"}`,
              borderBottom: `${seat === this.getSeatCount() ? "0px solid rgba(255, 255, 255, 0.0)" : "1px solid rgba(255, 255, 255, 0.1)"}`,
              opacity: `0.75`,
            }}>

            <div className="position-relative cursor-pointer close-btn-opacity-animation" onClick={() => { this.props.select(seat, false) }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" version="1.1">
                  <circle fill="white" cx="12" cy="12" r="8" />
                </svg>
              </span>
            </div>

            <Media.Body className="ml-2 cursor-pointer close-btn-opacity-animation" onClick={() => { this.props.select(seat, false) }}>
              <span className="text-medium font-weight-bold">{seat} | Empty Seat</span>
              <div className="chat-status small text-body font-weight-bold">
                <i className="fas fa-check-circle text-body"></i>
                <span className="text-medium font-weight-bold ml-1 text-body">
                  {formatPrice(0)}
                </span>
              </div>
            </Media.Body>

            <div className="badge badge-light text-right cursor-pointer close-btn-opacity-animation" onClick={() => { this.props.select(seat, false) }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5C12.3 5 12.7 4.99998 13 5.09998V5V3C13 2.4 12.6 2 12 2C11.4 2 11 2.4 11 3V5V5.09998C11.3 4.99998 11.7 5 12 5Z" fill="white" />
                  <path opacity="0.3" d="M12 22C8.7 22 6 19.3 6 16V11C6 7.7 8.7 5 12 5C15.3 5 18 7.7 18 11V16C18 19.3 15.3 22 12 22ZM13 12V9C13 8.4 12.6 8 12 8C11.4 8 11 8.4 11 9V12C11 12.6 11.4 13 12 13C12.6 13 13 12.6 13 12Z" fill="white" />
                </svg>
              </span>
            </div>
          </span>
        )
      }
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.props.game.data && (
          <>
            {/* Player List */}
            {!this.state.init
              ? <>
                <div className="flex-grow-1 position-relative">
                  <PerfectScrollbar
                    options={{ suppressScrollX: true, wheelPropagation: true, }}
                    className="chat-contacts list-group chat-scroll py-1 justify-content-start perfect-scrollbar-overflow-visible position-relative">

                    {/* Player List Header */}
                    {this.props.settings.optionD11 && (
                      <Card
                        className="bg-widget5 border-0 shadow-none p-2 mb-0 cursor-pointer"
                        style={{
                          borderRadius: "10px 10px 0px 0px",
                          backdropFilter: `${this.props.settings.optionD12 ? "blur(4px)" : null}`,
                          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                        }}
                        onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                        <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
                          <span className="mb-0 font-weight-bold ml-1">
                            <span className="d-flex align-items-center">
                              <div>
                                <i
                                  className="fas fa-users"
                                  style={{
                                    fontSize: "250%",
                                  }}
                                />
                              </div>
                              <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                                <div>
                                  <div className="text-body text-big font-weight-bold" style={{
                                    lineHeight: "0px",
                                  }}>
                                    Live Players
                                    <Badge
                                      pill variant="default"
                                      className="font-weight-bold align-text-bottom ml-1 cursor-pointer">
                                      {this.getPlayersCount()}
                                    </Badge>
                                  </div>
                                  <span
                                    className="text-muted small mt-0 cursor-pointer font-weight-bold"
                                    onClick={e => this.props.change('optionD4', true)}>
                                    {this.getPlayersCountAsString()}
                                  </span>
                                </div>
                              </span>
                            </span>
                          </span>
                          <Form.Label
                            className="mb-0 font-weight-bold text-tiny cursor-pointer close-btn-opacity-animation align-self-baseline"
                            onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                                <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                              </svg>
                            </span>
                          </Form.Label>
                        </span>
                      </Card>
                    )}
                    {/* / Player List Header */}

                    {/* Player List Main */}
                    {this.props.settings.optionD11 && (
                      <div className="livechat-panel-opacity-animation-up">
                        {this.getSeatCountArr()
                          .map((seat, index) => this.renderSeat(seat, index)
                          )}
                      </div>
                    )}
                    {/* / Player List Main */}

                    {/* Click To Enable Player List */}
                    {!this.props.settings.optionD11 && (
                      <Card
                        className="bg-widget5 border-0 shadow-none p-2 mb-0 cursor-pointer playerlist-enable-header"
                        style={{
                          borderRadius: "10px",
                          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                        }}
                        onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                        <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
                          <span className="mb-0 font-weight-bold ml-1">
                            <span className="d-flex align-items-center">
                              <div>
                                <i
                                  className="fas fa-users"
                                  style={{
                                    fontSize: "250%",
                                  }}
                                />
                              </div>
                              <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                                <div>
                                  <div className="text-body text-big font-weight-bold" style={{
                                    lineHeight: "0px",
                                  }}>
                                    Live Players
                                    <Badge
                                      pill variant="default"
                                      className="font-weight-bold align-text-bottom ml-1 cursor-pointer">
                                      Open
                                    </Badge>
                                  </div>
                                  <span
                                    className="text-muted small mt-0 cursor-pointer font-weight-bold"
                                    onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                                    {this.getPlayersCountAsString()}
                                  </span>
                                </div>
                              </span>
                            </span>
                          </span>

                          <div className="playerlist-icon-header">
                            <i
                              className="fas fa-users mr-2"
                              style={{
                                fontSize: "250%",
                              }}
                            />
                          </div>
                        </span>
                      </Card>
                    )}
                    {/* / Click To Enable Player List */}

                  </PerfectScrollbar>

                  {/* Player Notifications */}
                  {this.props.settings.optionD14 && (
                    <div className="pb-2">
                      <PlayerNotifications
                        {...this.state} {...this.props} />
                    </div>
                  )}
                  {/* / Player Notifications */}

                </div>
              </>
              : <>
                <div className="flex-grow-1 position-relative">
                  <PerfectScrollbar
                    options={{ suppressScrollX: true, wheelPropagation: true }}
                    className="chat-contacts list-group chat-scroll py-1 justify-content-start perfect-scrollbar-overflow-visible position-relative">

                    {/* Player List Header */}
                    {this.props.settings.optionD11 && (
                      <Card
                        className="bg-widget5 border-0 shadow-none p-2 mb-0 cursor-pointer"
                        style={{
                          borderRadius: "10px 10px 0px 0px",
                          backdropFilter: `${this.props.settings.optionD12 ? "blur(4px)" : null}`,
                          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                        }}
                        onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                        <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
                          <span className="mb-0 font-weight-bold ml-1">
                            <span className="d-flex align-items-center">
                              <div>
                                <i
                                  className="fas fa-users"
                                  style={{
                                    fontSize: "250%",
                                  }}
                                />
                              </div>
                              <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                                <div>
                                  <div className="text-body text-big font-weight-bold" style={{
                                    lineHeight: "0px",
                                  }}>
                                    Live Players
                                    <Badge
                                      pill variant="default"
                                      className="font-weight-bold align-text-bottom ml-1 cursor-pointer">
                                      {this.getPlayersCount()}
                                    </Badge>
                                  </div>
                                  <span
                                    className="text-muted small mt-0 cursor-pointer font-weight-bold"
                                    onClick={e => this.props.change('optionD4', true)}>
                                    {this.getPlayersCountAsString()}
                                  </span>
                                </div>
                              </span>
                            </span>
                          </span>

                          <Form.Label
                            className="mb-0 font-weight-bold text-tiny cursor-pointer close-btn-opacity-animation align-self-baseline"
                            onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                                <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                              </svg>
                            </span>
                          </Form.Label>
                        </span>
                      </Card>
                    )}
                    {/* / Player List Header */}

                    {/* Player List Main */}
                    {this.props.settings.optionD11 && (
                      <div className="livechat-panel-opacity-animation-up">
                        {this.getSeatCountArr()
                          .map((seat, index) => this.renderPresence(seat, index)
                          )}
                      </div>
                    )}
                    {/* / Player List Main */}

                    {/* Click To Enable Player List */}
                    {!this.props.settings.optionD11 && (
                      <Card
                        className="bg-widget5 border-0 shadow-none p-2 mb-0 cursor-pointer playerlist-enable-header"
                        style={{
                          borderRadius: "10px",
                          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                        }}
                        onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                        <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
                          <span className="mb-0 font-weight-bold ml-1">
                            <span className="d-flex align-items-center">
                              <div>
                                <i
                                  className="fas fa-users"
                                  style={{
                                    fontSize: "250%",
                                  }}
                                />
                              </div>
                              <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                                <div>
                                  <div className="text-body text-big font-weight-bold" style={{
                                    lineHeight: "0px",
                                  }}>
                                    Live Players
                                    <Badge
                                      pill variant="default"
                                      className="font-weight-bold align-text-bottom ml-1 cursor-pointer">
                                      Open
                                    </Badge>
                                  </div>
                                  <span
                                    className="text-muted small mt-0 cursor-pointer font-weight-bold"
                                    onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                                    {this.getPlayersCountAsString()}
                                  </span>
                                </div>
                              </span>
                            </span>
                          </span>

                          <div className="playerlist-icon-header">
                            <i
                              className="fas fa-users mr-2"
                              style={{
                                fontSize: "250%",
                              }}
                            />
                          </div>
                        </span>
                      </Card>
                    )}
                    {/* / Click To Enable Player List */}

                  </PerfectScrollbar>
                </div>

                {/* Player Notifications */}
                {this.props.settings.optionD14 && (
                  <div className="pb-2">
                    <PlayerNotifications
                      {...this.state} {...this.props} />
                  </div>
                )}
                {/* / Player Notifications */}

              </>}
            {/* / Player List */}
          </>
        )}
      </>
    )
  }
}

export default PlayerOrbit