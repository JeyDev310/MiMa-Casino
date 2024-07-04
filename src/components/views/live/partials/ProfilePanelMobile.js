/*eslint-disable*/

import React, { Component } from 'react'
import { Badge, Card, Form, Media, ProgressBar } from 'react-bootstrap'
import PlayerQuickActions from './PlayerQuickActionsPanel'

import {
  formatPrice,
  formatCapitalized,
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
          })
        }
      }
    } catch { }

  }

  componentWillUnmount() {
    clearInterval(this.reBuyPopupTimer)
    clearInterval(this.sitOutTimer)
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

  renderCurrentBetRound(street) {
    if (street === 'INIT') return 'Preflop'
    return formatCapitalized(street)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Profile Panel */}
        {this.props.game.profile && (
          <>
            <div
              className="flex-grow-1 position-absolute profile-panel-mobile-layout-s1">
              <div
                className="chat-contacts list-group chat-scroll py-1 justify-content-start position-relative profile-panel-mobile-layout-s2">

                {/* Player List Header */}
                {this.props.settings.optionD15 && (
                  <div>
                    <Card
                      className="border-0 shadow-none p-2 mb-0 cursor-pointer"
                      style={{
                        borderRadius: "10px 10px 0px 0px",
                        filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                        background: "rgba(43, 43, 51, 0.5)"
                      }}
                      onClick={e => this.props.change('optionD15', !this.props.settings.optionD15)}>
                      <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
                        <span className="mb-0 font-weight-bold ml-1">
                          <span className="d-flex align-items-center">
                            <div className="position-relative">
                              {/* <Badge variant={`${this.props.game.connection === "connected"
                                ? "success"
                                : "danger"} badge-dot indicator`} /> */}
                              <img
                                src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`}
                                className="ui-w-40 rounded-circle player-drop-shadow-animation" alt="User" />
                            </div>
                            <span className="ml-1 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                              <div>
                                <div tyle={{
                                  lineHeight: "0px",
                                }}>
                                  <span className="d-flex align-items-center cursor-pointer" style={{fontSize: "22px", fontWeight: "800"}}>
                                  {this.props.game.profile
                                    ? 
                                      <div className="ml-3">
                                        {this.props.game.profile.username
                                          ? truncateUsername(this.props.game.profile.username)
                                          : 'Undefined'}
                                      </div>
                                    
                                    : <span className="mb-0">N/A</span>}                                    
                                  </span>
                                </div>                               

                                {this.state.reBuyHint && this.props.game.player &&
                                  <Badge
                                    variant="default"
                                    className="bg-player-panel-item-opacity-drop ml-1 font-weight-bold"
                                    style={{ verticalAlign: "middle", }}>
                                    LOW BALANCE
                                  </Badge>}

                                {this.state.sitOutHint && this.props.game.player &&
                                  <Badge
                                    variant="default"
                                    className="bg-player-panel-item-opacity-drop ml-1 font-weight-bold"
                                    style={{ verticalAlign: "middle", }}>
                                    SITTING OUT
                                  </Badge>}

                                {this.state.inactive &&
                                  <Badge
                                    variant="default"
                                    className="bg-player-panel-item-opacity-drop ml-1 font-weight-bold"
                                    style={{ verticalAlign: "middle", }}>
                                    INACTIVE
                                  </Badge>}
                              </div>
                            </span>
                          </span>
                        </span>
                        <div>
                        {this.state.dealer
                          ? <span className="h5 mb-0 small opacity-75">
                            <Badge
                              pill variant="opaque1"
                              className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                              Dealer
                            </Badge>
                          </span>
                          : <span className="ml-5 h5 mb-0 small opacity-100">
                            <Badge
                              pill variant="opaque1"
                              className="ml-1 font-weight-bold cursor-pointer">
                              {this.props.game.player
                                ? <h4 className="mb-0"><strong>{formatPrice(this.props.game.player.p_balance_display)}</strong></h4>
                                : <h4 className="mb-0"><strong>{formatPrice(0)}</strong></h4>}
                            </Badge>
                          </span>}
                        </div>
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
                      }} />
                    {/* Player Quick Actions */}
                    <PlayerQuickActions
                      {...this.props} {...this.state}
                      change={this.props.change}
                      openFill={this.props.open}
                      openSlide={this.props.openSlide}                  
                    />
                    {/* / Player Quick Actions */}
                    {/* <div
                      className="flex-grow-0 pl-3 bg-widget3 livechat-panel-opacity-animation-up"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderRadius: "0 0 15px 15px",
                      }}>
                      <div className="flex-grow-0 py-3">
                        <Media className="align-items-center cursor-pointer">
                          <Media.Body>
                            {this.props.game.player
                              ? <h4 className="mb-0">
                                <strong>
                                  {formatPrice(this.props.game.player.p_balance_display)}
                                </strong>
                              </h4>
                              : <h4 className="mb-0">
                                <strong>
                                  {formatPrice(0)}
                                </strong>
                              </h4>}
                            <div>
                              Player Balance
                            </div>
                          </Media.Body>

                          <Media.Body>
                            {this.props.game.player
                              ? <h4 className="mb-0">
                                <strong>
                                  {formatPrice(this.props.game.player.p_bet_total)}
                                </strong>
                              </h4>
                              : <h4 className="mb-0">
                                <strong>
                                  {formatPrice(0)}
                                </strong>
                              </h4>}
                            <div>
                              Total Bet
                            </div>
                          </Media.Body>
                        </Media>
                      </div>
                    </div> */}
                  </div>
                )}
                {/* / Player List Header */}

                {/* Click To Enable Player List */}
                {!this.props.settings.optionD15 && (
                  <div className="profilepanel-enable-header">
                    <Card
                      className="bg-transparent border-0 shadow-none p-2 mb-0 cursor-pointer"
                      style={{
                        borderRadius: "10px 10px 0px 0px",
                        filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                      }}
                      onClick={e => this.props.change('optionD15', !this.props.settings.optionD15)}>
                      <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
                        <span className="mb-0 font-weight-bold ml-1">
                          <span className="d-flex align-items-center">
                            <div className="position-relative">
                              {/* <Badge
                                variant={`${this.props.game.connection === "connected" ? "success" : "danger"} badge-dot indicator`} /> */}
                              <img
                                src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`}
                                className="ui-w-50 rounded-circle player-drop-shadow-animation" alt="User" />
                            </div>
                            {!this.props.settings.optionD4 ? 
                              <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                                <div>
                                  <div className="text-body text-big font-weight-bold" style={{
                                    lineHeight: "0px",
                                  }}>
                                    <span className="d-flex align-items-center cursor-pointer">
                                      {this.props.game.profile
                                        ? <h5 className="mb-0">
                                          <strong>
                                            {this.props.game.profile.username
                                              ? truncateUsername(this.props.game.profile.username)
                                              : 'Undefined'}
                                          </strong>
                                        </h5>
                                        : <h5 className="mb-0">
                                          <strong>
                                            N/A
                                          </strong>
                                        </h5>}
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
                                            {this.props.game.data.auto_mode
                                              ? `Auto`
                                              : `Live`}
                                          </Badge>
                                        </span>}
                                    </span>
                                  </div>
                                  <span
                                    className="text-muted mt-0 cursor-pointer font-weight-bold"
                                    onClick={e => this.props.change('optionD15', !this.props.settings.optionD15)}>
                                    <span>
                                      {this.props.game.connection === "connected"
                                        ? <Badge
                                          pill variant="opaque1"
                                          className="font-weight-bold cursor-pointer">
                                          <span className="d-flex align-items-center justify-content-center">
                                            <span className="mr-1 d-flex align-items-center justify-content-center">
                                              <i className="fas fa-circle text-success" style={{
                                                fontSize: "6px",
                                              }} />
                                            </span>
                                            <span className="d-flex align-items-center justify-content-center">
                                              Online
                                            </span>
                                          </span>
                                        </Badge>
                                        : <Badge
                                          pill variant="opaque1"
                                          className="font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                                          <span className="d-flex align-items-center justify-content-center">
                                            <span className="mr-1 d-flex align-items-center justify-content-center">
                                              <i className="fas fa-circle text-danger" style={{
                                                fontSize: "6px",
                                              }} />
                                            </span>
                                            <span className="d-flex align-items-center justify-content-center">
                                              Offline
                                            </span>
                                          </span>
                                        </Badge>}
                                    </span>
                                  </span>
                                </div>
                              </span> : 
                              <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", opacity: "0", pointerEvents: "none"}}>
                              <div>
                                <div className="text-body text-big font-weight-bold" style={{
                                  lineHeight: "0px",
                                }}>
                                  <span className="d-flex align-items-center cursor-pointer">
                                    {this.props.game.profile
                                      ? <h5 className="mb-0">
                                        <strong>
                                          {this.props.game.profile.username
                                            ? truncateUsername(this.props.game.profile.username)
                                            : 'Undefined'}
                                        </strong>
                                      </h5>
                                      : <h5 className="mb-0">
                                        <strong>
                                          N/A
                                        </strong>
                                      </h5>}
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
                                          {this.props.game.data.auto_mode
                                            ? `Auto`
                                            : `Live`}
                                        </Badge>
                                      </span>}
                                  </span>
                                </div>
                                <span
                                  className="text-muted mt-0 cursor-pointer font-weight-bold"
                                  onClick={e => this.props.change('optionD15', !this.props.settings.optionD15)}>
                                  <span>
                                    {this.props.game.connection === "connected"
                                      ? <Badge
                                        pill variant="opaque1"
                                        className="font-weight-bold cursor-pointer">
                                        <span className="d-flex align-items-center justify-content-center">
                                          <span className="mr-1 d-flex align-items-center justify-content-center">
                                            <i className="fas fa-circle text-success" style={{
                                              fontSize: "6px",
                                            }} />
                                          </span>
                                          <span className="d-flex align-items-center justify-content-center">
                                            Online
                                          </span>
                                        </span>
                                      </Badge>
                                      : <Badge
                                        pill variant="opaque1"
                                        className="font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                                        <span className="d-flex align-items-center justify-content-center">
                                          <span className="mr-1 d-flex align-items-center justify-content-center">
                                            <i className="fas fa-circle text-danger" style={{
                                              fontSize: "6px",
                                            }} />
                                          </span>
                                          <span className="d-flex align-items-center justify-content-center">
                                            Offline
                                          </span>
                                        </span>
                                      </Badge>}
                                  </span>
                                </span>
                              </div>
                            </span>
                            }                            
                          </span>
                        </span>

                        {/* <div className="position-relative profilepanel-icon-header mr-2">
                          <Badge
                            variant={`${this.props.game.connection === "connected"
                              ? "success"
                              : "danger"} badge-dot indicator`} />
                          <img
                            src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`}
                            className="ui-w-40 rounded-circle player-drop-shadow-animation" alt="User" />
                        </div> */}

                      </span>
                    </Card>

                    {/* <ProgressBar
                      variant={this.state.variant}
                      now={this.state.progress}
                      animated={!this.state.init}
                      style={{
                        height: "6px",
                        borderRadius: "0px 0px 10px 10px",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                      }} /> */}

                  </div>
                )}
                {/* / Click To Enable Player List */}

              </div>
            </div>
          </>
        )}
        {/* / Profile Panel */}
      </>
    )
  }
}

export default ProfilePanel