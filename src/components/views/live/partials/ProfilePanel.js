/*eslint-disable*/

import React, { Component } from 'react'
import { Badge, Card, Col, Form, Media, ProgressBar, Row } from 'react-bootstrap'
import toast from 'react-hot-toast'
import PlayerQuickActions from './PlayerQuickActionsPanel'

import {
  formatCapitalized,
  formatPrice,
  truncateUsername,
} from '../utilities/TextPreprocessing'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/styles/pages/navigation.scss'

class ProfilePanel extends Component {

  constructor(props) {
    super(props)

    this.sitOutTimer = 0
    this.reBuyPopupTimer = 0

    this.onHandleStartTimer = this.onHandleStartTimer.bind(this)
    this.onHandleStartCountdown = this.onHandleStartCountdown.bind(this)
    this.onHandleDisplaySeconds = this.onHandleDisplaySeconds.bind(this)

    this.onHandleLerpColor = this.onHandleLerpColor.bind(this)
    this.onHandleUpdatePlayerData = this.onHandleUpdatePlayerData.bind(this)
    this.onHandleRefreshPlayerData = this.onHandleRefreshPlayerData.bind(this)

    this.state = {
      init: false,
      data: null,
      dealer: false,
      progress: 100,
      color: '#02BC77',
      variant: 'success',
      playing: false,
      waiting: false,
      inactive: false,
      exited: false,
      joinable: false,
      lowBalance: false,
      joinHint: true,
      reBuyHint: false,
      sitOutHint: false,
      sitOutWarn: false,
      sitOutPenalty: null,
      bank: 300,
      time: {},
      seconds: 300,
      percentage: 100,
    }
  }

  componentDidMount() {   

    this.onHandleRefreshPlayerData()
    try {
      this.setState({
        dealer: this.props.game.dealer,
      })
    } catch { }
  }

  componentDidUpdate(prevProps) {

    try {
      if (prevProps.game.player !== this.props.game.player) {
        this.onHandleRefreshPlayerData()
      }
    } catch { }

    try {
      if (prevProps.game.presence.user_has_joined !== this.props.game.presence.user_has_joined) {
        if (!this.props.game.presence.user_has_joined) {
          this.setState({
            joinHint: this.props.game.presence.game_is_joinable,
            reBuyHint: false,
            sitOutHint: false,
            progress: 100,
            color: '#02BC77',
            variant: 'success',
          }, () => {
            this.onHandleRefreshPlayerData()
          })
        } else {
          this.setState({
            joinHint: false,
          }, () => {
            this.onHandleRefreshPlayerData()
          })
        }
      }
    } catch { }

    try {
      if (prevProps.game.player.p_balance_display !== this.props.game.player.p_balance_display) {
        if (this.props.game.player.p_balance_display <= Number(this.props.game.data.current_game_values.table_minimum_buy_in)) {
          this.setState({
            reBuyHint: true,
          })
        } else if (this.props.game.player.p_balance_display >= Number(this.props.game.data.current_game_values.table_minimum_buy_in)) {
          this.setState({
            reBuyHint: false,
          })
        }
      }
    } catch { }

    try {
      if (prevProps.game.player.p_sit_out !== this.props.game.player.p_sit_out) {
        if (this.props.game.player.p_sit_out) {
          this.setState({
            sitOutHint: true,
            sitOutWarn: true,
          }, () => {
            let timeLeftVar = this.calcSeconds(this.state.seconds)
            this.setState({
              time: timeLeftVar,
              percentage: 100,
            }, () => {
              this.onHandleStartTimer()
              this.onHandleNotificationCallback(
                `You are sitting out now.`,
                "success", "success", 2500,
              )
            })
          })
        } else {
          this.setState({
            sitOutHint: false,
            sitOutWarn: false,
            bank: 300,
            time: {},
            seconds: 300,
            percentage: 100,
          }, () => {
            clearInterval(this.sitOutTimer)
            this.sitOutTimer = 0
            this.onHandleNotificationCallback(
              `Successfully rejoined the game.`,
              "success", "success", 2500,
            )
          })
        }
      }
    } catch { }

    try {
      if (prevProps.game.player.p_sit_out_penalty !== this.props.game.player.p_sit_out_penalty) {
        if (Number(this.props.game.player.p_sit_out_penalty) > 0) {
          this.setState({
            sitOutPenalty: this.props.game.player.p_sit_out_penalty,
          }, () => {
            this.onHandleNotificationCallback(
              `Sit out penalty changed to ${formatPrice(this.props.game.player.p_sit_out_penalty)}`,
              "info", "penalty", 4000,
            )
          })
        } else {
          this.setState({
            sitOutPenalty: null,
          })
        }
      }
    } catch { }

  }

  componentWillUnmount() {    
    clearInterval(this.reBuyPopupTimer)
    clearInterval(this.sitOutTimer)
  }

  getIcon(icon) {
    switch (icon) {
      case "penalty":
        return '⏱️'
      default:
        return ``
    }
  }

  onHandleRefreshPlayerData() {
    if (
      this.props.game.data &&
      this.props.game.profile &&
      this.props.game.player
    ) {
      this.setState({
        init: true,
        data: this.props.game.player,
      }, () => {
        this.onHandleUpdatePlayerData()
      })
    } else {
      this.setState({
        init: false,
      })
    }
  }

  onHandleUpdatePlayerData() {
    try {

      if (this.props.game.player) {
        this.setState({
          playing: this.props.game.player.p_playing ? true : false,
          waiting: this.props.game.player.p_waiting ? true : false,
          inactive: this.props.game.player.p_inactive ? true : false,
          exited: this.props.game.player.p_exited ? true : false,
          lowBalance: this.props.game.player.p_low_balance ? true : false,
        })
      }

      var valueMaxBuyIn = Number(this.props.game.data.current_game_values.table_maximum_buy_in)
      var playerBalance = Number(this.props.game.player.p_balance_display)

      if (playerBalance >= valueMaxBuyIn) {
        this.setState({
          progress: 100,
          color: '#02BC77',
          variant: 'success',
        })
      } else if (
        playerBalance >= 0 &&
        playerBalance <= valueMaxBuyIn
      ) {
        var x = (playerBalance / valueMaxBuyIn) * 100
        var c = this.onHandleLerpColor('#d9534f', '#02BC77', x / 100)
        var v = 'danger'

        switch (true) {
          case (x >= 0 && x < 25):
            v = 'danger'
            break
          case (x >= 25 && x < 50):
            v = 'warning'
            break
          case (x >= 50 && x < 75):
            v = 'info'
            break
          case (x >= 75 && x < 100):
            v = 'success'
            break
          default:
            v = 'danger'
            break
        }

        this.setState({
          progress: Number(x),
          color: c,
          variant: v,
        })
      } else {
        this.setState({
          progress: 0,
          color: '#d9534f',
          variant: 'danger',
        })
      }
    } catch {
      this.setState({
        progress: 0,
        color: '#d9534f',
        variant: 'danger',
      })
    }
  }

  onHandleLerpColor(a, b, amount) {

    var ah = parseInt(a.replace(/#/g, ''), 16),
      ar = ah >> 16, ag = ah >> 8 && 0xff, ab = ah & 0xff,
      bh = parseInt(b.replace(/#/g, ''), 16),
      br = bh >> 16, bg = bh >> 8 && 0xff, bb = bh & 0xff,
      rr = ar + amount * (br - ar),
      rg = ag + amount * (bg - ag),
      rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1)
  }

  calcSeconds(secs) {

    let hours = Math.floor(secs / (60 * 60))
    let divisor_for_minutes = secs % (60 * 60)
    let minutes = Math.floor(divisor_for_minutes / 60)
    let divisor_for_seconds = divisor_for_minutes % 60
    let seconds = Math.ceil(divisor_for_seconds)

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds,
    }

    return obj
  }

  onHandleStartTimer() {
    if (this.sitOutTimer === 0 && this.state.seconds > 0) {
      this.sitOutTimer = setInterval(this.onHandleStartCountdown, 1000)
    }
  }

  onHandleStartCountdown() {
    let seconds = this.state.seconds - 1
    this.setState({
      time: this.calcSeconds(seconds),
      seconds: seconds,
      percentage: seconds / this.state.bank * 100,
    })
    if (seconds === 0) {
      this.setState({
        sitOutHint: false,
        sitOutWarn: false,
        bank: 300,
        time: {},
        seconds: 300,
        percentage: 100,
      }, () => {
        clearInterval(this.sitOutTimer)
        this.sitOutTimer = 0
      })
    }
  }

  onHandleDisplaySeconds(sec) {

    var pad = function (num, size) { return ('000' + num).slice(size * -1); },
      time = parseFloat(sec).toFixed(3),
      hours = Math.floor(time / 60 / 60),
      minutes = Math.floor(time / 60) % 60,
      seconds = Math.floor(time - minutes * 60),
      milliseconds = time.slice(-3)

    return pad(minutes, 2) + ':' + pad(seconds, 2)
  }

  onHandleNotificationCallback(message, type, icon, duration) {
    switch (type) {
      case 'success':
        toast.success(message, {
          duration: duration
            ? duration
            : 2500,
          className: 'font-weight-bold cursor-pointer',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            zIndex: '99999',
          },
        })
        break
      case 'error':
        toast.error(message, {
          duration: duration
            ? duration
            : 2500,
          className: 'font-weight-bold cursor-pointer',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            zIndex: '99999',
          },
        })
        break
      case 'info':
        toast.success(message, {
          duration: duration
            ? duration
            : 2500,
          className: 'font-weight-bold cursor-pointer',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            zIndex: '99999',
          },
        })
        break
      default:
        break
    }
  }

  onRenderCurrentBetRound(street) {
    if (street === 'INIT') return 'Preflop'
    return formatCapitalized(street)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    const { optionD15 } = this.state;
    return (
      <>
        {/* Profile Panel */}
        {this.props.game.profile && (
          <>
            {/* Profile Panel Content */}
            {this.props.settings.optionD15 && (
              <div className="pb-2" style={{marginTop: "85px"}}>
                <Card
                  className="border-0 shadow-none p-2 mb-0 cursor-pointer"
                  style={{
                    borderRadius: "10px 10px 0px 0px",
                    filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                    background: "rgba(43, 43, 51, 0.5)"
                  }}
                  onClick={e => this.props.change('optionD15', !this.props.settings.optionD15)}>
                  <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
                    <span className="d-flex align-items-center justify-content-center">
                      <div className="position-relative">
                        {/* <Badge variant={`${this.props.game.connection === "connected"
                          ? "success"
                          : "danger"} badge-dot indicator`} /> */}
                        <img
                          src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`}
                          className="ui-w-40 rounded-circle" alt="User" style={{border: "1.5px solid #FFFFFF"}}/>
                      </div>
                                               
                      <span className="cursor-pointer" style={{fontSize: "22px", fontWeight: "800"}} onClick={() => {
                        this.props.openSlide(10)
                      }}>
                        {this.props.game.profile
                          ? 
                            <div className="ml-3">
                              {this.props.game.profile.username
                                ? truncateUsername(this.props.game.profile.username)
                                : 'Undefined'}
                            </div>
                          
                          : <span className="mb-0">N/A</span>}
                      </span>
                      <div style={{marginLeft: "50px"}}>
                        {this.state.dealer
                          ? <span className="h5 mb-0 small opacity-75">
                            <Badge
                              pill variant="opaque1"
                              className="ml-1 px-3 py-1 font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                              Dealer
                            </Badge>
                          </span>
                          : <span className="ml-5 mb-0 small opacity-100">
                            <Badge
                              pill variant="opaque1"
                              className="ml-1 font-weight-bold cursor-pointer px-3 py-1">
                              {this.props.game.player
                                ? <span className="mb-0" style={{fontSize: "18px", fontWeight: "700"}}>{formatPrice(this.props.game.player.p_balance_display)}</span>
                                : <span className="mb-0" style={{fontSize: "18px", fontWeight: "700"}}>{formatPrice(0)}</span>}
                            </Badge>
                          </span>}
                        </div>
                    </span>
                      <Form.Label
                        className="mb-0 font-weight-bold text-tiny cursor-pointer close-btn-opacity-animation align-self-baseline"
                        onClick={e => this.props.change('optionD15', !this.props.settings.optionD15)}>
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            {/* <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" /> */}
                            <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                            <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                          </svg>
                        </span>
                      </Form.Label>
                  </span>
                </Card>

                <ProgressBar
                  variant={this.state.variant}
                  now={this.state.progress}
                  animated={!this.state.init}
                  style={{
                    height: "6px",
                    borderRadius: "0px",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                  }}
                />

                {/* Player Quick Actions */}
                <PlayerQuickActions
                  {...this.props} {...this.state}
                  change={this.props.change}
                  openFill={this.props.open}
                  openSlide={this.props.openSlide}                  
                />
                {/* / Player Quick Actions */}

                {/* <div
                  className="flex-grow-0 pl-3 livechat-panel-opacity-animation-up"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                    borderBottomLeftRadius: `${(this.state.joinHint && !this.props.game.player) || (this.state.reBuyHint && this.props.game.player) ? '0px' : '15px'}`,
                    borderBottomRightRadius: `${(this.state.joinHint && !this.props.game.player) || (this.state.reBuyHint && this.props.game.player) ? '0px' : '15px'}`,
                  }}>
                  <div className="flex-grow-0 py-1">
                    <Media className="align-items-center">
                      <div className="h5 mb-0">
                        <Badge
                          id="game-state-badge-1"
                          pill variant="transparent"
                          className="d-flex align-items-center justify-content-start cursor-pointer"
                          style={{ overflow: "visible", display: "inline-flex" }}>
                          <span className="svg-icon svg-icon-muted svg-icon-2hx mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M8 22C7.4 22 7 21.6 7 21V9C7 8.4 7.4 8 8 8C8.6 8 9 8.4 9 9V21C9 21.6 8.6 22 8 22Z" fill="white" />
                              <path opacity="0.3" d="M4 15C3.4 15 3 14.6 3 14V6C3 5.4 3.4 5 4 5C4.6 5 5 5.4 5 6V14C5 14.6 4.6 15 4 15ZM13 19V3C13 2.4 12.6 2 12 2C11.4 2 11 2.4 11 3V19C11 19.6 11.4 20 12 20C12.6 20 13 19.6 13 19ZM17 16V5C17 4.4 16.6 4 16 4C15.4 4 15 4.4 15 5V16C15 16.6 15.4 17 16 17C16.6 17 17 16.6 17 16ZM21 18V10C21 9.4 20.6 9 20 9C19.4 9 19 9.4 19 10V18C19 18.6 19.4 19 20 19C20.6 19 21 18.6 21 18Z" fill="white" />
                            </svg>
                          </span>
                          <span className="font-weight-bold" style={{ fontSize: "11px" }}>
                            {this.props.game.data.current_round === "null"
                              ? "Paused"
                              : this.onRenderCurrentBetRound(this.props.game.data.current_round)}
                          </span>
                        </Badge>
                      </div>

                      <div className="h5 mb-0">
                        <Badge
                          id="game-state-badge-2"
                          pill variant="transparent"
                          className="d-flex align-items-center justify-content-start cursor-pointer"
                          style={{ overflow: "visible", display: "inline-flex", }}>
                          <span className="svg-icon svg-icon-muted svg-icon-2hx mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                              <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                            </svg>
                          </span>
                          <span className="font-weight-bold" style={{ fontSize: "11px" }}>
                            {formatPrice(this.props.game.data.current_game_values.total_pot)}
                          </span>
                        </Badge>
                      </div>
                    </Media>
                  </div>
                </div> */}

                {/* {this.state.joinHint && !this.props.game.player && (
                  <div className="flex-grow-0 pl-3 livechat-panel-opacity-animation-up" style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderBottomLeftRadius: "15px",
                    borderBottomRightRadius: "15px",
                  }}>
                    <div className="flex-grow-0 py-2">
                      <Media className="align-items-center">
                        <Media.Body className="pl-2">
                          <span
                            onClick={() => {
                              this.props.open(1)
                            }}
                            className="text-body cursor-pointer">
                            <h6 className="mb-0 small">
                              <i className="fas fa-info-circle text-body mr-2"></i>
                              <strong>Click here to join the game.</strong>
                            </h6>
                          </span>
                        </Media.Body>
                      </Media>
                    </div>
                  </div>
                )} */}

                {this.state.reBuyHint && this.props.game.player && (
                  <div className="flex-grow-0 pl-3 livechat-panel-opacity-animation-up" style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderBottomLeftRadius: "15px",
                    borderBottomRightRadius: "15px",
                  }}>
                    <div className="flex-grow-0 py-2">
                      <Media className="align-items-center">
                        <Media.Body className="pl-2">
                          <span
                            onClick={() => {
                              this.props.open(4)
                            }}
                            className="text-body cursor-pointer">
                            <h6 className="mb-0 small">
                              <i className="fas fa-info-circle text-body mr-2"></i>
                              <strong>Click here to re-buy.</strong>
                            </h6>
                          </span>
                        </Media.Body>
                      </Media>
                    </div>
                  </div>
                )}

                {this.state.sitOutWarn && this.props.game.player && (
                  <div
                    className="flex-grow-0 pl-3 mt-2 cursor-pointer livechat-panel-opacity-animation-up"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "10px",
                    }}>
                    <div className="flex-grow-0 py-2">
                      <Media className="align-items-center">
                        <Media.Body className="pl-0">
                          <span className="text-body">
                            <h6 className="mb-0 small d-flex align-items-center">
                              <i className="fas fa-info-circle text-body mr-2"></i>
                              <span className="justify-content-between w-100 d-flex align-items-center">
                                <span className="font-weight-bold mr-2">
                                  {this.state.sitOutPenalty
                                    ? `Penalty ${formatPrice(this.state.sitOutPenalty)}`
                                    : `Time left to rejoin`}
                                </span>
                                <span className="font-weight-bold mr-3">
                                  {this.onHandleDisplaySeconds(this.state.seconds)}
                                </span>
                              </span>
                            </h6>
                          </span>
                        </Media.Body>
                      </Media>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* / Profile Panel Content */}

            {/* Click To Enable Profile Panel */}
            {!this.props.settings.optionD15 && (
              <div className="pt-3 pb-2 profilepanel-enable-header">
                <Card
                  className="bg-widget5 border-0 shadow-none p-2 mb-0 cursor-pointer"
                  style={{
                    borderRadius: "10px 10px 0px 0px",
                    filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                  }}
                  onClick={e => this.props.change('optionD15', !this.props.settings.optionD15)}>
                  <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
                    <span className="mb-0 font-weight-bold ml-1">
                      <span className="d-flex align-items-center">
                        <div className="position-relative">
                          <Badge
                            variant={`${this.props.game.connection === "connected"
                              ? "success"
                              : "danger"} badge-dot indicator`} />
                          <img
                            src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`}
                            className="ui-w-40 rounded-circle player-drop-shadow-animation" alt="User" />
                        </div>
                        <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                          <div>
                            <div className="text-body text-big font-weight-bold" style={{
                              lineHeight: "0px",
                            }}>
                              <span className="d-flex align-items-center cursor-pointer" onClick={() => {
                                this.props.openSlide(10)
                              }}>
                                {this.props.game.profile
                                  ? <h5 className="mb-0">
                                    <strong>
                                      {this.props.game.profile.username
                                        ? truncateUsername(this.props.game.profile.username)
                                        : 'Undefined'}
                                    </strong>
                                  </h5>
                                  : <h5 className="mb-0"><strong>N/A</strong></h5>}

                                {this.state.dealer
                                  ? <span className="h5 mb-0 small opacity-75">
                                    <Badge
                                      pill variant="opaque1"
                                      className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                                      Dealer
                                    </Badge>
                                  </span>
                                  : <span className="h5 mb-0 small opacity-75">
                                    <Badge
                                      pill variant="opaque1"
                                      className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                                      {this.props.game.player
                                        ? <h6 className="mb-0"><strong>{formatPrice(this.props.game.player.p_balance_display)}</strong></h6>
                                        : <h6 className="mb-0"><strong>{formatPrice(0)}</strong></h6>}
                                    </Badge>
                                  </span>}
                              </span>
                            </div>

                            <span
                              className="text-muted mt-0 cursor-pointer font-weight-bold"
                              onClick={e => this.props.change('optionD15', !this.props.settings.optionD15)}>
                              <span>
                                {this.props.game.connection === "connected"
                                  ? <span className="d-flex align-items-center justify-content-start small" style={{ fontWeight: "700" }}>
                                    <span className="mr-1 d-flex align-items-center justify-content-start">
                                      <i className="fas fa-circle text-success" style={{ fontSize: "6px" }} />
                                    </span>
                                    <span className="d-flex align-items-center justify-content-start">
                                      Online
                                    </span>
                                  </span>
                                  : <span className="d-flex align-items-center justify-content-start small" style={{ fontWeight: "700" }}>
                                    <span className="mr-1 d-flex align-items-center justify-content-start">
                                      <i className="fas fa-circle text-danger" style={{ fontSize: "6px" }} />
                                    </span>
                                    <span className="d-flex align-items-center justify-content-start">
                                      Offline
                                    </span>
                                  </span>}
                              </span>
                            </span>
                          </div>
                        </span>
                      </span>
                    </span>

                    <div className="position-relative profilepanel-icon-header mr-1">
                      <Badge
                        variant={`${this.props.game.connection === "connected"
                          ? "success"
                          : "danger"} badge-dot indicator`} />
                      <img
                        src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`}
                        className="ui-w-40 rounded-circle player-drop-shadow-animation" alt="Avatar" />
                    </div>

                  </span>
                </Card>

                <ProgressBar
                  variant={this.state.variant}
                  now={this.state.progress}
                  animated={!this.state.init}
                  style={{
                    height: "6px",
                    borderRadius: "0px 0px 10px 10px",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                  }}
                />

              </div>
            )}
            {/* / Click To Enable Profile Panel */}
          </>
        )
        }
        {/* / Profile Panel */}
      </>
    )
  }
}

export default ProfilePanel
