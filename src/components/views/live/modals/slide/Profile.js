import React, { Component } from 'react'
import { Badge, Button, Card, Col, Collapse, Dropdown, Media, Modal, ProgressBar, Row } from 'react-bootstrap'

import moment from 'moment'
import * as Chartjs from 'react-chartjs-2'

import {
  formatPrice,
  calcListAverage,
  calcListMinimum,
  calcListMaximum,
  truncateUsername,
} from '../../utilities/TextPreprocessing'

import ResourceLoaderC from '../../../utilities/loaders/ResourceLoaderC'

import '../../../../../vendor/styles/pages/chat.scss'

class Profile extends Component {

  constructor(props) {
    super(props)

    this.calcWinRatio = this.calcWinRatio.bind(this)
    this.onHandleChangeScale = this.onHandleChangeScale.bind(this)

    this.state = {
      init: false,
      data: null,
      stats: false,
      scale1: true,
      scale2: true,
      scale3: true,
      progress: 100,
      color: '#02BC77',
      variant: 'success',
    }
  }

  componentDidMount() {
    if (this.props.game.data &&
      this.props.game.player &&
      this.props.game.profile
    ) {
      this.setState({
        init: true,
      }, () => {
        this.onHandleUpdatePlayerData()
      })
    } else {
      this.setState({
        init: false,
      }, () => {
        this.onHandleUpdatePlayerData()
      })
    }
    if (this.props.game.data &&
      this.props.game.player &&
      this.props.game.profile &&
      this.props.game.analytics
    ) {
      this.setState({
        stats: true,
        data: this.props.game.analytics,
      })
    } else {
      this.setState({
        stats: false,
      })
    }
  }

  calcWinRatio(a, b) {
    try {
      if (b > 0) {
        var r = Number(parseFloat((a / b) * 100).toFixed(0))
        return `${r}%`
      } else {
        return `0%`
      }
    } catch {
      return 'N/A'
    }
  }

  onHandleChangeScale(field) {
    const value = !this.state[field]
    this.setState({
      [field]: value,
    })
  }

  onHandleUpdatePlayerData() {
    try {

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

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.state.init
          ? <>
            {/* Profile Modal */}

            <Modal.Body style={{ margin: "0" }}>
              <h4 className="text-left mb-4 font-weight-bold">
                Profile
              </h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                These insights offer you a comprehensive overview of all essential statistics and parameters relating to your personal player profile.
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              {/* Profile Panel Header */}
              <div className="pb-3">
                <Card
                  className="bg-widget5 border-0 shadow-none p-2 mb-0 cursor-pointer"
                  style={{
                    borderRadius: "10px 10px 0px 0px",
                    filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                  }}>
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
                            className="ui-w-40 rounded-circle player-drop-shadow-animation profilepanel-icon-header" alt="Player" />
                        </div>
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
                                  ? <span className="h5 mb-0">
                                    <Badge
                                      pill variant="opaque1"
                                      className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                                      Dealer
                                    </Badge>
                                  </span>
                                  : <span className="h5 mb-0">
                                    <Badge
                                      pill variant="opaque1"
                                      className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                                      Live
                                    </Badge>
                                  </span>}
                              </span>
                            </div>
                            <span
                              className="text-muted mt-0 cursor-pointer font-weight-bold">
                              <span className="h5 mb-0">
                                {this.props.game.connection === "connected"
                                  ? <Badge
                                    pill variant="opaque1"
                                    className="font-weight-bold cursor-pointer">
                                    Online
                                  </Badge>
                                  : <Badge
                                    pill variant="danger"
                                    className="font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                                    Offline
                                  </Badge>}
                              </span>
                            </span>
                          </div>
                        </span>
                      </span>
                    </span>
                  </span>
                </Card>

                <ProgressBar
                  variant={this.state.variant}
                  now={this.state.progress}
                  animated={false}
                  style={{
                    height: "6px",
                    borderRadius: "0px 0px 10px 10px",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                  }} />

              </div>
              {/* / Profile Panel Header */}

              {this.state.stats
                ? <>
                  <div className="mb-0 list-group pt-0 pb-3">
                    <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0 bg-dark`} style={{
                      padding: "10px",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      alignItems: "center",
                    }}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M16.9 10.7L7 5V19L16.9 13.3C17.9 12.7 17.9 11.3 16.9 10.7Z" fill="white" />
                        </svg>
                      </span>

                      <Media.Body className="ml-3">
                        <span className="text-medium font-weight-medium h6">Games Played</span>
                      </Media.Body>
                      <h5 className="mb-0 font-weight-bold">{this.state.data.session_games_played}</h5>
                    </span>

                    <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
                      padding: "10px",
                      alignItems: "center",
                      backgroundColor: "rgba(37, 40, 46, 0.8)",
                    }}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                          <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                        </svg>
                      </span>

                      <Media.Body className="ml-3">
                        <span className="text-medium font-weight-medium h6">Games Won</span>
                      </Media.Body>
                      <h5 className="mb-0 font-weight-bold">{this.state.data.session_games_won}</h5>
                    </span>

                    <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online bg-dark border-0`} style={{
                      padding: "10px",
                      alignItems: "center",
                    }}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM16 15V9C16 8.4 15.6 8 15 8H9C8.4 8 8 8.4 8 9V15C8 15.6 8.4 16 9 16H15C15.6 16 16 15.6 16 15Z" fill="white" />
                        </svg>
                      </span>

                      <Media.Body className="ml-3">
                        <span className="text-medium font-weight-medium h6">Games Lost</span>
                      </Media.Body>
                      <h5 className="mb-0 font-weight-bold">{this.state.data.session_games_lost}</h5>
                    </span>

                    <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
                      padding: "10px",
                      alignItems: "center",
                      backgroundColor: "rgba(37, 40, 46, 0.8)",
                    }}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path opacity="0.3" d="M20.9 12.9C20.3 12.9 19.9 12.5 19.9 11.9C19.9 11.3 20.3 10.9 20.9 10.9H21.8C21.3 6.2 17.6 2.4 12.9 2V2.9C12.9 3.5 12.5 3.9 11.9 3.9C11.3 3.9 10.9 3.5 10.9 2.9V2C6.19999 2.5 2.4 6.2 2 10.9H2.89999C3.49999 10.9 3.89999 11.3 3.89999 11.9C3.89999 12.5 3.49999 12.9 2.89999 12.9H2C2.5 17.6 6.19999 21.4 10.9 21.8V20.9C10.9 20.3 11.3 19.9 11.9 19.9C12.5 19.9 12.9 20.3 12.9 20.9V21.8C17.6 21.3 21.4 17.6 21.8 12.9H20.9Z" fill="white" />
                          <path d="M16.9 10.9H13.6C13.4 10.6 13.2 10.4 12.9 10.2V5.90002C12.9 5.30002 12.5 4.90002 11.9 4.90002C11.3 4.90002 10.9 5.30002 10.9 5.90002V10.2C10.6 10.4 10.4 10.6 10.2 10.9H9.89999C9.29999 10.9 8.89999 11.3 8.89999 11.9C8.89999 12.5 9.29999 12.9 9.89999 12.9H10.2C10.4 13.2 10.6 13.4 10.9 13.6V13.9C10.9 14.5 11.3 14.9 11.9 14.9C12.5 14.9 12.9 14.5 12.9 13.9V13.6C13.2 13.4 13.4 13.2 13.6 12.9H16.9C17.5 12.9 17.9 12.5 17.9 11.9C17.9 11.3 17.5 10.9 16.9 10.9Z" fill="white" />
                        </svg>
                      </span>

                      <Media.Body className="ml-3">
                        <span className="text-medium font-weight-medium h6">Playtime</span>
                      </Media.Body>
                      <h5 className="mb-0 font-weight-bold">{this.state.data.session_playtime_display}</h5>
                    </span>

                    <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online bg-dark border-0`} style={{
                      padding: "10px",
                      alignItems: "center",
                    }}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="white" />
                          <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="white" />
                        </svg>
                      </span>

                      <Media.Body className="ml-3">
                        <span className="text-medium font-weight-medium h6">Win Ratio</span>
                      </Media.Body>
                      <h5 className="mb-0 font-weight-bold">{this.calcWinRatio(this.state.data.session_games_won, this.state.data.session_games_played)}</h5>
                    </span>

                    <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
                      padding: "10px",
                      alignItems: "center",
                      backgroundColor: "rgba(37, 40, 46, 0.8)",
                    }}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                          <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                        </svg>
                      </span>

                      <Media.Body className="ml-3">
                        <span className="text-medium font-weight-medium h6">Total Bet</span>
                      </Media.Body>
                      <h5 className="mb-0 font-weight-bold">{formatPrice(this.state.data.player_total_bet)}</h5>
                    </span>

                    <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online bg-dark border-0`} style={{
                      padding: "10px",
                      alignItems: "center",
                    }}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path opacity="0.3" d="M14 3V21H10V3C10 2.4 10.4 2 11 2H13C13.6 2 14 2.4 14 3ZM7 14H5C4.4 14 4 14.4 4 15V21H8V15C8 14.4 7.6 14 7 14Z" fill="white" />
                          <path d="M21 20H20V8C20 7.4 19.6 7 19 7H17C16.4 7 16 7.4 16 8V20H3C2.4 20 2 20.4 2 21C2 21.6 2.4 22 3 22H21C21.6 22 22 21.6 22 21C22 20.4 21.6 20 21 20Z" fill="white" />
                        </svg>
                      </span>

                      <Media.Body className="ml-3">
                        <span className="text-medium font-weight-medium h6">Total Bet Min/Max</span>
                      </Media.Body>
                      <h5 className="mb-0 font-weight-bold">{formatPrice(this.state.data.player_total_bets_min)}/{formatPrice(this.state.data.player_total_bets_max)}</h5>
                    </span>

                    <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
                      padding: "10px",
                      alignItems: "center",
                      backgroundColor: "rgba(37, 40, 46, 0.8)",
                    }}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path opacity="0.3" d="M8.4 14L15.6 8.79999L20 9.90002V6L16 4L9 11L5 12V14H8.4Z" fill="white" />
                          <path d="M21 18H20V12L16 11L9 16H6V3C6 2.4 5.6 2 5 2C4.4 2 4 2.4 4 3V18H3C2.4 18 2 18.4 2 19C2 19.6 2.4 20 3 20H4V21C4 21.6 4.4 22 5 22C5.6 22 6 21.6 6 21V20H21C21.6 20 22 19.6 22 19C22 18.4 21.6 18 21 18Z" fill="white" />
                        </svg>
                      </span>

                      <Media.Body className="ml-3">
                        <span className="text-medium font-weight-medium h6">Total Bet Average</span>
                      </Media.Body>
                      <h5 className="mb-0 font-weight-bold">{formatPrice(this.state.data.player_total_bets_avg)}</h5>
                    </span>

                    <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online bg-dark border-0`} style={{
                      padding: "10px",
                      alignItems: "center",
                    }}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M10 4L18 12L10 20H14L21.3 12.7C21.7 12.3 21.7 11.7 21.3 11.3L14 4H10Z" fill="white" />
                          <path opacity="0.3" d="M3 4L11 12L3 20H7L14.3 12.7C14.7 12.3 14.7 11.7 14.3 11.3L7 4H3Z" fill="white" />
                        </svg>
                      </span>

                      <Media.Body className="ml-3">
                        <span className="text-medium font-weight-medium h6">Session Started</span>
                      </Media.Body>
                      <h5 className="mb-0 font-weight-bold small">{moment(this.state.data.session_init).format('DD.MM.YYYY HH:mm')}</h5>
                    </span>

                    <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
                      padding: "10px",
                      alignItems: "center",
                      backgroundColor: "rgba(37, 40, 46, 0.8)",
                      borderBottomLeftRadius: "15px",
                      borderBottomRightRadius: "15px",
                    }}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                          <path d="M21 13V13.5C21 16 19 18 16.5 18H5.6V16H16.5C17.9 16 19 14.9 19 13.5V13C19 12.4 19.4 12 20 12C20.6 12 21 12.4 21 13ZM18.4 6H7.5C5 6 3 8 3 10.5V11C3 11.6 3.4 12 4 12C4.6 12 5 11.6 5 11V10.5C5 9.1 6.1 8 7.5 8H18.4V6Z" fill="white" />
                          <path opacity="0.3" d="M21.7 6.29999C22.1 6.69999 22.1 7.30001 21.7 7.70001L18.4 11V3L21.7 6.29999ZM2.3 16.3C1.9 16.7 1.9 17.3 2.3 17.7L5.6 21V13L2.3 16.3Z" fill="white" />
                        </svg>
                      </span>

                      <Media.Body className="ml-3">
                        <span className="text-medium font-weight-medium h6">Session Updated</span>
                      </Media.Body>
                      <h5 className="mb-0 font-weight-bold small">{moment(this.state.data.session_update).format('DD.MM.YYYY HH:mm')}</h5>
                    </span>
                  </div>

                  {this.props.slideModalEnter
                    ? <Card className="mb-3 bg-light" style={{
                      borderRadius: "15px",
                    }}>
                      <Card.Header as="h6" className="with-elements border-0 pr-0 pb-0">
                        <div className="card-header-title">Profit per game</div>
                        <div className="card-header-elements ml-auto">
                          <Dropdown alignRight={false} className="dropdown-toggle-hide-arrow">
                            <Dropdown.Toggle variant="default" size="sm" className="icon-btn borderless rounded-pill md-btn-flat mr-3">
                              <i className="ion ion-ios-more"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => { this.onHandleChangeScale('scale1') }}>
                                {this.state.scale1 ? 'Linear' : 'Logarithmic'}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Card.Header>
                      <div className="mt-3">
                        {this.state.data.player_balance_profits.length > 1
                          ? <Chartjs.Line
                            height={100}
                            data={{
                              datasets: [{
                                data: this.state.data.player_balance_profits.slice(-256),
                                borderWidth: 1,
                                backgroundColor: 'rgba(0,0,0,0)',
                                borderColor: '#009688',
                                pointBorderColor: 'rgba(0,0,0,0)',
                                pointRadius: 1,
                                lineTension: 0,
                              }],
                              labels: Array.from({ length: Object.keys(this.state.data.player_balance_profits).length }, (_, index) => index + 1).slice(-256),
                            }}
                            options={{
                              tooltips: {
                                callbacks: {
                                  label: function (t, d) {
                                    var value = parseFloat(t.yLabel).toFixed(2)
                                    var yLabel = value >= 1000 ? ' $' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ' $' + value
                                    return yLabel
                                  },
                                }
                              },
                              scales: {
                                xAxes: [{
                                  display: false,
                                }],
                                yAxes: [{
                                  display: false,
                                  type: this.state.scale1 ? "logarithmic" : "linear",
                                }]
                              },
                              legend: {
                                display: false,
                              },
                              responsive: true,
                              maintainAspectRatio: false,
                            }}
                          />
                          : <Row noGutters className="h-100 border-0 shadow-none mb-4">
                            <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                              <ResourceLoaderC
                                height="4rem" width="4rem" />
                            </Col>
                          </Row>}
                      </div>
                      <Card.Footer className="text-center py-2">
                        <Row>
                          <Col>
                            <div className="text-muted small">Avg. Profit</div>
                            <strong className="text-big">
                              {formatPrice(calcListAverage(this.state.data.player_balance_profits))}
                            </strong>
                          </Col>
                          <Col>
                            <div className="text-muted small">Avg. Loss</div>
                            <strong className="text-big">
                              {formatPrice(calcListAverage(this.state.data.player_balance_losses))}
                            </strong>
                          </Col>
                        </Row>
                      </Card.Footer>
                    </Card>
                    : null}

                  {this.props.slideModalEnter
                    ? <Card className="mb-3 bg-light" style={{
                      borderRadius: "15px",
                    }}>
                      <Card.Body>
                        <div className="float-right text-success text-tiny">
                          <div className="card-header-elements ml-auto">
                            <Button size="sm" variant="light rounded-pill md-btn-flat" onClick={() => { this.onHandleChangeScale('scale2') }}>
                              {this.state.scale2
                                ? 'Logarithmic'
                                : 'Linear'}
                            </Button>
                          </div>
                        </div>
                        <div className="text-muted small">Total Bet</div>
                        <div className="text-xlarge">
                          {formatPrice(this.state.data.player_total_bet)}
                        </div>
                      </Card.Body>
                      <div className="px-2">
                        {this.state.data.player_total_bets.length > 1
                          ? <Chartjs.Bar className="w-100"
                            height={117}
                            data={{
                              datasets: [{
                                data: this.state.data.player_total_bets.slice(-256),
                                borderWidth: 0,
                                backgroundColor: '#673AB7',
                              }],
                              labels: Array.from({ length: Object.keys(this.state.data.player_total_bets).length }, (_, index) => index + 1).slice(-256),
                            }}
                            options={{
                              tooltips: {
                                callbacks: {
                                  label: function (t, d) {
                                    var value = parseFloat(t.yLabel).toFixed(2)
                                    var yLabel = value >= 1000 ? ' $' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ' $' + value
                                    return yLabel
                                  }
                                }
                              },
                              scales: {
                                xAxes: [{
                                  display: false,
                                }],
                                yAxes: [{
                                  display: false,
                                  type: this.state.scale2 ? "logarithmic" : "linear",
                                }]
                              },
                              legend: {
                                display: false,
                              },
                              responsive: true,
                              maintainAspectRatio: false,
                            }}
                          />
                          : <Row noGutters className="h-100 border-0 shadow-none mb-4">
                            <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                              <ResourceLoaderC
                                height="4rem" width="4rem" />
                            </Col>
                          </Row>}
                      </div>
                      <Card.Footer className="text-center py-2">
                        <Row>
                          <Col>
                            <div className="text-muted small">Average</div>
                            <strong className="text-big">
                              {formatPrice(calcListAverage(this.state.data.player_total_bets))}
                            </strong>
                          </Col>
                          <Col>
                            <div className="text-muted small">Min/Max</div>
                            <strong className="text-big">
                              {formatPrice(calcListMinimum(this.state.data.player_total_bets))}/{formatPrice(calcListMaximum(this.state.data.player_total_bets))}
                            </strong>
                          </Col>
                        </Row>
                      </Card.Footer>
                    </Card>
                    : null}

                  {this.props.slideModalEnter && (
                    <>
                      <Card className="d-flex w-100 mb-3 bg-light" style={{ borderRadius: "15px", }}>
                        <Row noGutters className="row-bordered h-100">
                          <Col sm={12} className="d-flex align-items-center container-p-x py-4">
                            <div>
                              <div className="text-muted small">Profit</div>
                              <strong className="text-large font-weight-normal">
                                {formatPrice(this.state.data.player_balance_profit)}
                              </strong>
                            </div>
                            <div className="w-50 ml-auto">
                              <Chartjs.Line
                                height={40}
                                data={{
                                  datasets: [{
                                    data: this.state.data.player_balance_profits.slice(-256),
                                    borderWidth: 1,
                                    backgroundColor: '#02BC7740',
                                    borderColor: '#009688',
                                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                                    pointRadius: 1,
                                    lineTension: 0
                                  }],
                                  labels: Array.from({ length: Object.keys(this.state.data.player_balance_profits).length }, (_, index) => index + 1).slice(-256),
                                }}
                                options={{
                                  scales: {
                                    xAxes: [{
                                      display: false,
                                    }],
                                    yAxes: [{
                                      display: false,
                                      type: false ? "linear" : "logarithmic",
                                    }]
                                  },
                                  legend: {
                                    display: false,
                                  },
                                  tooltips: {
                                    enabled: false,
                                  },
                                  responsive: true,
                                  maintainAspectRatio: false,
                                }}
                              />
                            </div>
                          </Col>
                          <Col sm={12} className="d-flex align-items-center container-p-x py-4">
                            <div>
                              <div className="text-muted small">Loss</div>
                              <strong className="text-large font-weight-normal">
                                {formatPrice(this.state.data.player_balance_loss)}
                              </strong>
                            </div>
                            <div className="w-50 ml-auto">
                              <Chartjs.Line
                                height={40}
                                data={{
                                  datasets: [{
                                    data: this.state.data.player_balance_losses.slice(-256),
                                    borderWidth: 1,
                                    backgroundColor: 'rgba(217, 83, 79, 0.2)',
                                    borderColor: 'rgba(217, 83, 79, 1.0)',
                                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                                    pointRadius: 1,
                                    lineTension: 0
                                  }],
                                  labels: Array.from({ length: Object.keys(this.state.data.player_balance_losses).length }, (_, index) => index + 1).slice(-256),
                                }}
                                options={{
                                  scales: {
                                    xAxes: [{
                                      display: false,
                                    }],
                                    yAxes: [{
                                      display: false,
                                      type: false ? "linear" : "logarithmic",
                                    }]
                                  },
                                  legend: {
                                    display: false,
                                  },
                                  tooltips: {
                                    enabled: false,
                                  },
                                  responsive: true,
                                  maintainAspectRatio: false,
                                }}
                              />
                            </div>
                          </Col>
                          <Col sm={12} className="d-flex align-items-center container-p-x py-4">
                            <div>
                              <div className="text-muted small">Total Bet (Average)</div>
                              <strong className="text-large font-weight-normal">
                                {formatPrice(this.state.data.player_total_bets_avg)}
                              </strong>
                            </div>
                            <div className="w-50 ml-auto">
                              <Chartjs.Line
                                height={40}
                                data={{
                                  datasets: [{
                                    data: this.state.data.player_total_bets.slice(-256),
                                    borderWidth: 1,
                                    backgroundColor: 'rgba(136, 151, 170, .2)',
                                    borderColor: 'rgba(136, 151, 170, 1)',
                                    pointBorderColor: 'rgba(0,0,0,0)',
                                    pointRadius: 1,
                                    lineTension: 0
                                  }],
                                  labels: Array.from({ length: Object.keys(this.state.data.player_total_bets).length }, (_, index) => index + 1).slice(-256),
                                }}
                                options={{
                                  scales: {
                                    xAxes: [{
                                      display: false,
                                    }],
                                    yAxes: [{
                                      display: false,
                                      type: false ? "linear" : "logarithmic",
                                    }]
                                  },
                                  legend: {
                                    display: false,
                                  },
                                  tooltips: {
                                    enabled: false,
                                  },
                                  responsive: true,
                                  maintainAspectRatio: false,
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </>
                  )}
                </>
                : <>
                  <Card className="d-flex w-100 mb-3 bg-light border-0 shadow-none" style={{ borderRadius: "15px", }}>
                    <Card.Header className="with-elements">
                      <span className="card-header-title mr-2 small font-weight-bold">
                        Player Statistics
                      </span>
                    </Card.Header>

                    <Card.Body>
                      <Row noGutters className="h-100 border-0 shadow-none">
                        <Col sm={12} md={12} lg={12} className="d-flex align-items-center justify-content-center border-0 shadow-none py-0">
                          <ResourceLoaderC
                            height="5rem" width="5rem" />
                        </Col>
                      </Row>
                    </Card.Body>

                    <Card.Footer className="small text-muted">
                      Statistics currently not available...
                    </Card.Footer>
                  </Card>
                </>}

              {this.props.game.player && (
                <Card className="mb-3 bg-light">

                  <Card.Header>
                    <a className="text-body small font-weight-bold"
                      href="#accordion"
                      onClick={e => this.props.change(e, 'profileTab', 1)}
                      aria-expanded={this.props.profileTab === 1}>
                      Player Details
                    </a>
                  </Card.Header>

                  <Collapse in={this.props.profileTab === 1}>
                    <div>
                      <Card.Body className="p-0">

                        <div className="mb-0 list-group pt-0 pb-0">
                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0 bg-dark`}
                            style={{
                              padding: "10px",
                              borderTopLeftRadius: "0px",
                              borderTopRightRadius: "0px",
                              alignItems: "center",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M10.6 10.7C13.3 8 16.9 6.3 20.9 6C21.5 6 21.9 5.5 21.9 4.9V3C21.9 2.4 21.4 2 20.9 2C15.8 2.3 11.2 4.4 7.79999 7.8C4.39999 11.2 2.2 15.8 2 20.9C2 21.5 2.4 21.9 3 21.9H4.89999C5.49999 21.9 6 21.5 6 20.9C6.2 17 7.90001 13.4 10.6 10.7Z" fill="white" />
                                <path opacity="0.3" d="M14.8 14.9C16.4 13.3 18.5 12.2 20.9 12C21.5 11.9 21.9 11.5 21.9 10.9V9C21.9 8.4 21.4 8 20.8 8C17.4 8.3 14.3 9.8 12 12.1C9.7 14.4 8.19999 17.5 7.89999 20.9C7.89999 21.5 8.29999 22 8.89999 22H10.8C11.4 22 11.8 21.6 11.9 21C12.2 18.6 13.2 16.5 14.8 14.9ZM16.2 16.3C17.4 15.1 19 14.3 20.7 14C21.3 13.9 21.8 14.4 21.8 15V17C21.8 17.5 21.4 18 20.9 18.1C20.1 18.3 19.5 18.6 19 19.2C18.5 19.8 18.1 20.4 17.9 21.1C17.8 21.6 17.4 22 16.8 22H14.8C14.2 22 13.7 21.5 13.8 20.9C14.2 19.1 15 17.5 16.2 16.3Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Online
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_online
                                ? "Yes"
                                : "No"}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                              backgroundColor: "rgba(37, 40, 46, 0.8)",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M16.9 10.7L7 5V19L16.9 13.3C17.9 12.7 17.9 11.3 16.9 10.7Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Playing
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_playing
                                ? "Yes"
                                : "No"}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online bg-dark border-0`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M20.9 12.9C20.3 12.9 19.9 12.5 19.9 11.9C19.9 11.3 20.3 10.9 20.9 10.9H21.8C21.3 6.2 17.6 2.4 12.9 2V2.9C12.9 3.5 12.5 3.9 11.9 3.9C11.3 3.9 10.9 3.5 10.9 2.9V2C6.19999 2.5 2.4 6.2 2 10.9H2.89999C3.49999 10.9 3.89999 11.3 3.89999 11.9C3.89999 12.5 3.49999 12.9 2.89999 12.9H2C2.5 17.6 6.19999 21.4 10.9 21.8V20.9C10.9 20.3 11.3 19.9 11.9 19.9C12.5 19.9 12.9 20.3 12.9 20.9V21.8C17.6 21.3 21.4 17.6 21.8 12.9H20.9Z" fill="white" />
                                <path d="M16.9 10.9H13.6C13.4 10.6 13.2 10.4 12.9 10.2V5.90002C12.9 5.30002 12.5 4.90002 11.9 4.90002C11.3 4.90002 10.9 5.30002 10.9 5.90002V10.2C10.6 10.4 10.4 10.6 10.2 10.9H9.89999C9.29999 10.9 8.89999 11.3 8.89999 11.9C8.89999 12.5 9.29999 12.9 9.89999 12.9H10.2C10.4 13.2 10.6 13.4 10.9 13.6V13.9C10.9 14.5 11.3 14.9 11.9 14.9C12.5 14.9 12.9 14.5 12.9 13.9V13.6C13.2 13.4 13.4 13.2 13.6 12.9H16.9C17.5 12.9 17.9 12.5 17.9 11.9C17.9 11.3 17.5 10.9 16.9 10.9Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Waiting to play
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_waiting
                                ? "Yes"
                                : "No"}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                              backgroundColor: "rgba(37, 40, 46, 0.8)",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 21" fill="none">
                                <path opacity="0.3" d="M12 6.20001V1.20001H2V6.20001C2 6.50001 2.1 6.70001 2.3 6.90001L5.6 10.2L2.3 13.5C2.1 13.7 2 13.9 2 14.2V19.2H12V14.2C12 13.9 11.9 13.7 11.7 13.5L8.4 10.2L11.7 6.90001C11.9 6.70001 12 6.50001 12 6.20001Z" fill="white" />
                                <path d="M13 2.20001H1C0.4 2.20001 0 1.80001 0 1.20001C0 0.600012 0.4 0.200012 1 0.200012H13C13.6 0.200012 14 0.600012 14 1.20001C14 1.80001 13.6 2.20001 13 2.20001ZM13 18.2H10V16.2L7.7 13.9C7.3 13.5 6.7 13.5 6.3 13.9L4 16.2V18.2H1C0.4 18.2 0 18.6 0 19.2C0 19.8 0.4 20.2 1 20.2H13C13.6 20.2 14 19.8 14 19.2C14 18.6 13.6 18.2 13 18.2ZM4.4 6.20001L6.3 8.10001C6.7 8.50001 7.3 8.50001 7.7 8.10001L9.6 6.20001H4.4Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Inactive
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_inactive
                                ? "Yes"
                                : "No"}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0 bg-dark`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                              backgroundColor: "rgba(37, 40, 46, 0.8)",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM16 15V9C16 8.4 15.6 8 15 8H9C8.4 8 8 8.4 8 9V15C8 15.6 8.4 16 9 16H15C15.6 16 16 15.6 16 15Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Dealer
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_dealer
                                ? "Yes"
                                : "-"}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                              backgroundColor: "rgba(37, 40, 46, 0.8)",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M11.8 6.4L16.7 9.2V14.8L11.8 17.6L6.89999 14.8V9.2L11.8 6.4ZM11.8 2C11.5 2 11.2 2.1 11 2.2L3.79999 6.4C3.29999 6.7 3 7.3 3 7.9V16.2C3 16.8 3.29999 17.4 3.79999 17.7L11 21.9C11.3 22.1 11.5 22.1 11.8 22.1C12.1 22.1 12.4 22 12.6 21.9L19.8 17.7C20.3 17.4 20.6 16.8 20.6 16.2V7.9C20.6 7.3 20.3 6.7 19.8 6.4L12.6 2.2C12.4 2.1 12.1 2 11.8 2Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Small Blind
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_smallblind
                                ? "Yes"
                                : "-"}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0 bg-dark`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M19.0963 4.92704C20.0963 5.92704 20.8963 7.12705 21.2963 8.32705L17.6963 11.927L8.39633 2.62705C11.8963 1.32705 16.1963 2.02704 19.0963 4.92704ZM2.69633 15.627C3.19633 16.827 3.89634 18.027 4.89634 19.027C7.79634 21.927 11.9963 22.627 15.5963 21.227L6.29634 11.927L2.69633 15.627Z" fill="white" />
                                <path opacity="0.3" d="M8.39634 2.72705L11.9963 6.32706L2.69634 15.6271C1.29634 12.0271 1.99634 7.82705 4.89634 4.92705C5.89634 3.92705 7.09634 3.22705 8.39634 2.72705ZM11.9963 17.7271L15.5963 21.3271C16.7963 20.8271 17.9963 20.1271 18.9963 19.1271C21.8963 16.2271 22.5963 12.027 21.1963 8.42705L11.9963 17.7271Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Big Blind
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_bigblind
                                ? "Yes"
                                : "-"}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                              backgroundColor: "rgba(37, 40, 46, 0.8)",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M2 11.7127L10 14.1127L22 11.7127L14 9.31274L2 11.7127Z" fill="white" />
                                <path opacity="0.3" d="M20.9 7.91274L2 11.7127V6.81275C2 6.11275 2.50001 5.61274 3.10001 5.51274L20.6 2.01274C21.3 1.91274 22 2.41273 22 3.11273V6.61273C22 7.21273 21.5 7.81274 20.9 7.91274ZM22 16.6127V11.7127L3.10001 15.5127C2.50001 15.6127 2 16.2127 2 16.8127V20.3127C2 21.0127 2.69999 21.6128 3.39999 21.4128L20.9 17.9128C21.5 17.8128 22 17.2127 22 16.6127Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Last Action
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_action}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0 bg-dark`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M3.20001 5.91897L16.9 3.01895C17.4 2.91895 18 3.219 18.1 3.819L19.2 9.01895L3.20001 5.91897Z" fill="white" />
                                <path opacity="0.3" d="M13 13.9189C13 12.2189 14.3 10.9189 16 10.9189H21C21.6 10.9189 22 11.3189 22 11.9189V15.9189C22 16.5189 21.6 16.9189 21 16.9189H16C14.3 16.9189 13 15.6189 13 13.9189ZM16 12.4189C15.2 12.4189 14.5 13.1189 14.5 13.9189C14.5 14.7189 15.2 15.4189 16 15.4189C16.8 15.4189 17.5 14.7189 17.5 13.9189C17.5 13.1189 16.8 12.4189 16 12.4189Z" fill="white" />
                                <path d="M13 13.9189C13 12.2189 14.3 10.9189 16 10.9189H21V7.91895C21 6.81895 20.1 5.91895 19 5.91895H3C2.4 5.91895 2 6.31895 2 6.91895V20.9189C2 21.5189 2.4 21.9189 3 21.9189H19C20.1 21.9189 21 21.0189 21 19.9189V16.9189H16C14.3 16.9189 13 15.6189 13 13.9189Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Buy-In
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {formatPrice(this.props.game.player.p_balance_buy_in)}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                              backgroundColor: "rgba(37, 40, 46, 0.8)",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                                <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Balance
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {formatPrice(this.props.game.player.p_balance_display)}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0 bg-dark`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                                <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Total Bet
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {formatPrice(this.props.game.player.p_bet_total)}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                              backgroundColor: "rgba(37, 40, 46, 0.8)",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="white" />
                                <rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Current Player
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_is_current_player
                                ? "Yes"
                                : "No"}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0 bg-dark`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                <rect x="11" y="14" width="7" height="2" rx="1" transform="rotate(-90 11 14)" fill="white" />
                                <rect x="11" y="17" width="2" height="2" rx="1" transform="rotate(-90 11 17)" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Low Balance
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_low_balance
                                ? "Yes"
                                : "No"}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                              backgroundColor: "rgba(37, 40, 46, 0.8)",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                                <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Folded
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_folded_in_current_game
                                ? "Yes"
                                : "No"}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0 bg-dark`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M4.05424 15.1982C8.34524 7.76818 13.5782 3.26318 20.9282 2.01418C21.0729 1.98837 21.2216 1.99789 21.3618 2.04193C21.502 2.08597 21.6294 2.16323 21.7333 2.26712C21.8372 2.37101 21.9144 2.49846 21.9585 2.63863C22.0025 2.7788 22.012 2.92754 21.9862 3.07218C20.7372 10.4222 16.2322 15.6552 8.80224 19.9462L4.05424 15.1982ZM3.81924 17.3372L2.63324 20.4482C2.58427 20.5765 2.5735 20.7163 2.6022 20.8507C2.63091 20.9851 2.69788 21.1082 2.79503 21.2054C2.89218 21.3025 3.01536 21.3695 3.14972 21.3982C3.28408 21.4269 3.42387 21.4161 3.55224 21.3672L6.66524 20.1802L3.81924 17.3372ZM16.5002 5.99818C16.2036 5.99818 15.9136 6.08615 15.6669 6.25097C15.4202 6.41579 15.228 6.65006 15.1144 6.92415C15.0009 7.19824 14.9712 7.49984 15.0291 7.79081C15.0869 8.08178 15.2298 8.34906 15.4396 8.55884C15.6494 8.76862 15.9166 8.91148 16.2076 8.96935C16.4986 9.02723 16.8002 8.99753 17.0743 8.884C17.3484 8.77046 17.5826 8.5782 17.7474 8.33153C17.9123 8.08486 18.0002 7.79485 18.0002 7.49818C18.0002 7.10035 17.8422 6.71882 17.5609 6.43752C17.2796 6.15621 16.8981 5.99818 16.5002 5.99818Z" fill="white" />
                                <path d="M4.05423 15.1982L2.24723 13.3912C2.15505 13.299 2.08547 13.1867 2.04395 13.0632C2.00243 12.9396 1.9901 12.8081 2.00793 12.679C2.02575 12.5498 2.07325 12.4266 2.14669 12.3189C2.22013 12.2112 2.31752 12.1219 2.43123 12.0582L9.15323 8.28918C7.17353 10.3717 5.4607 12.6926 4.05423 15.1982ZM8.80023 19.9442L10.6072 21.7512C10.6994 21.8434 10.8117 21.9129 10.9352 21.9545C11.0588 21.996 11.1903 22.0083 11.3195 21.9905C11.4486 21.9727 11.5718 21.9252 11.6795 21.8517C11.7872 21.7783 11.8765 21.6809 11.9402 21.5672L15.7092 14.8442C13.6269 16.8245 11.3061 18.5377 8.80023 19.9442ZM7.04023 18.1832L12.5832 12.6402C12.7381 12.4759 12.8228 12.2577 12.8195 12.032C12.8161 11.8063 12.725 11.5907 12.5653 11.4311C12.4057 11.2714 12.1901 11.1803 11.9644 11.1769C11.7387 11.1736 11.5205 11.2583 11.3562 11.4132L5.81323 16.9562L7.04023 18.1832Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  All-In
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.p_all_in_in_current_game
                                ? "Yes"
                                : "No"}
                            </h5>
                          </span>

                          <span
                            className={`d-flex list-group-item list-group-item-action online border-0`}
                            style={{
                              padding: "10px",
                              alignItems: "center",
                              backgroundColor: "rgba(37, 40, 46, 0.8)",
                            }}>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M11.8 5.2L17.7 8.6V15.4L11.8 18.8L5.90001 15.4V8.6L11.8 5.2ZM11.8 2C11.5 2 11.2 2.1 11 2.2L3.8 6.4C3.3 6.7 3 7.3 3 7.9V16.2C3 16.8 3.3 17.4 3.8 17.7L11 21.9C11.3 22 11.5 22.1 11.8 22.1C12.1 22.1 12.4 22 12.6 21.9L19.8 17.7C20.3 17.4 20.6 16.8 20.6 16.2V7.9C20.6 7.3 20.3 6.7 19.8 6.4L12.6 2.2C12.4 2.1 12.1 2 11.8 2Z" fill="white" />
                                <path d="M11.8 8.69995L8.90001 10.3V13.7L11.8 15.3L14.7 13.7V10.3L11.8 8.69995Z" fill="white" />
                              </svg>
                            </span>

                            <Media.Body className="ml-3">
                              <span className="text-medium font-weight-medium h5">
                                <Badge pill variant="default" className="font-weight-bold">
                                  Player ID
                                </Badge>
                              </span>
                            </Media.Body>

                            <h5 className="mb-0 text-medium font-weight-bold small">
                              {this.props.game.player.id}
                            </h5>
                          </span>
                        </div>

                      </Card.Body>
                    </div>
                  </Collapse>

                </Card>
              )}

              <hr className="border-light m-0 py-2" />

              <Button
                variant="instagram"
                block onClick={this.props.close}
                className="font-weight-bold">
                Continue
              </Button>

            </Modal.Body>
            {/* / Profile Modal */}
          </>
          : <>
            {/* Profile Modal */}
            <Modal.Body style={{ margin: "0" }}>
              <h4 className="text-left mb-4 font-weight-bold">
                Profile
              </h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                These insights offer you a comprehensive overview of all essential statistics and parameters relating to your personal player profile.
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              {/* Profile Panel Header */}
              <div className="pb-3">
                <Card
                  className="bg-widget5 border-0 shadow-none p-2 mb-0 cursor-pointer"
                  style={{
                    borderRadius: "10px 10px 0px 0px",
                    filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                  }}>
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
                            className="ui-w-40 rounded-circle player-drop-shadow-animation profilepanel-icon-header" alt="Player" />
                        </div>
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
                                  ? <span className="h5 mb-0">
                                    <Badge
                                      pill variant="opaque1"
                                      className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                                      Dealer
                                    </Badge>
                                  </span>
                                  : <span className="h5 mb-0">
                                    <Badge
                                      pill variant="opaque1"
                                      className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                                      Live
                                    </Badge>
                                  </span>}
                              </span>
                            </div>
                            <span
                              className="text-muted mt-0 cursor-pointer font-weight-bold">
                              <span className="h5 mb-0">
                                {this.props.game.connection === "connected"
                                  ? <Badge
                                    pill variant="opaque1"
                                    className="font-weight-bold cursor-pointer">
                                    Online
                                  </Badge>
                                  : <Badge
                                    pill variant="danger"
                                    className="font-weight-bold bg-player-panel-item-opacity-drop cursor-pointer">
                                    Offline
                                  </Badge>}
                              </span>
                            </span>
                          </div>
                        </span>
                      </span>
                    </span>
                  </span>
                </Card>

                <ProgressBar
                  variant={'success'}
                  now={100}
                  animated={false}
                  style={{
                    height: "6px",
                    borderRadius: "0px 0px 10px 10px",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                  }} />

              </div>
              {/* / Profile Panel Header */}

              <div className="text-left text-left text-white opacity-50 text-tiny mb-3">
                Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
              </div>

              <hr className="border-light m-0 py-2" />

              <Button
                variant="instagram" block
                onClick={this.props.close}
                className="font-weight-bold">
                Continue
              </Button>
            </Modal.Body>
            {/* / Profile Modal */}
          </>}
      </>
    )
  }
}

export default Profile