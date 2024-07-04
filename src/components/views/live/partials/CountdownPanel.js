/*eslint-disable*/

import React, { Component } from 'react'
import { Card, Col, ProgressBar, Row } from 'react-bootstrap'

import {
  GAME_ACTION_TYPE_BIG_BLIND_CHECK,
  GAME_ACTION_TYPE_CHECK,
  GAME_ACTION_TYPE_FOLD,
} from '../core/GameActionTypes'

import {
  GAME_ROUND_TYPE_INIT,
} from '../core/GameRoundTypes'

import '../../../../vendor/styles/pages/chat.scss'

class CountdownPanel extends Component {

  constructor(props) {
    super(props)

    this.timer = 0

    this.getAudioVolume = this.getAudioVolume.bind(this)
    this.handleChangeEvent = this.handleChangeEvent.bind(this)
    this.onHandleStartTimer = this.onHandleStartTimer.bind(this)
    this.onHandleStartCountdown = this.onHandleStartCountdown.bind(this)
    this.onHandleDisplaySeconds = this.onHandleDisplaySeconds.bind(this)
    this.onHandleStartAudioWarning = this.onHandleStartAudioWarning.bind(this)
    this.onHandleStopAudioWarning = this.onHandleStopAudioWarning.bind(this)

    this.state = {
      init: false,
      bank: 20,
      time: {},
      seconds: 20,
      percentage: 100,
      alarm: false,
    }
  }

  componentDidMount() {
    let timeLeftVar = this.calcSeconds(this.state.seconds)
    this.setState({
      time: timeLeftVar,
      percentage: 100,
    }, () => {
      this.onHandleStartTimer()
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.onHandleStopAudioWarning()
  }

  handleChangeEvent(event) {
    this.setState({
      percentage: event.target.value,
    })
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
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.onHandleStartCountdown, 1000)
    }
  }

  onHandleStartCountdown() {

    let seconds = this.state.seconds - 1

    this.setState({
      time: this.calcSeconds(seconds),
      seconds: seconds,
      percentage: seconds / this.state.bank * 100,
    })

    if (seconds <= 10 && !this.state.alarm) {
      this.setState({
        alarm: true,
      }, () => {
        this.onHandleStartAudioWarning()
      })
    }

    if (seconds === 0) {
      clearInterval(this.timer)
      try {
        if (
          this.props.game.data &&
          this.props.game.player &&
          this.props.game.player.p_bigblind &&
          this.props.game.data.current_round === GAME_ROUND_TYPE_INIT &&
          this.props.game.data.current_round_checkable === false
        ) {

          if (
            Number(this.props.game.data.current_game_values.raise_level) > Number(this.props.game.data.current_game_values.table_big_blind)
          ) {

            this.props.client.sendGameAction(
              this.props.game.data.room_name,
              this.props.game.data.current_round,
              GAME_ACTION_TYPE_FOLD,
              0,
            )

          } else {

            this.props.client.sendGameAction(
              this.props.game.data.room_name,
              this.props.game.data.current_round,
              GAME_ACTION_TYPE_BIG_BLIND_CHECK,
              0,
            )

          }

        } else if (
          this.props.game.data.current_round_checkable
        ) {

          this.props.client.sendGameAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            GAME_ACTION_TYPE_CHECK,
            0,
          )

        } else {

          this.props.client.sendGameAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            GAME_ACTION_TYPE_FOLD,
            0,
          )

        }
      } catch {

        this.props.client.sendGameAction(
          this.props.game.data.room_name,
          this.props.game.data.current_round,
          GAME_ACTION_TYPE_FOLD,
          0,
        )

      }
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

  onHandleStartAudioWarning() {
    try {
      const signalA = document.getElementsByClassName("event-countdown-1-0-0")[0]
      signalA.pause()
      signalA.src = `${process.env.PUBLIC_URL}/audio/v1/events/1/event-countdown-1-0-0.m4a`
      signalA.currentTime = 0
      signalA.volume = this.getAudioVolume()
      signalA.play()

      const signalB = document.getElementsByClassName("event-countdown-2-0-0")[0]
      signalB.pause()
      signalB.src = `${process.env.PUBLIC_URL}/audio/v1/events/1/event-countdown-2-0-0.m4a`
      signalB.currentTime = 0
      signalB.volume = this.getAudioVolume()
      signalB.play()
    } catch { }
  }

  onHandleStopAudioWarning() {
    try {
      const signalA = document.getElementsByClassName("event-countdown-1-0-0")[0]
      signalA.pause()
      signalA.loop = false
      signalA.currentTime = 0

      const signalB = document.getElementsByClassName("event-countdown-2-0-0")[0]
      signalB.pause()
      signalB.loop = false
      signalB.currentTime = 0
    } catch { }
  }

  getAudioVolume() {
    try {
      if (!this.props.settings.optionB4) {
        return Number(this.props.settings.optionB3 / 100)
      } else {
        return 0
      }
    } catch {
      return 0.75
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Countdown Panel */}
        <div
          className="d-flex flex-grow-0 py-1 countdown-panel-transform-animation"
          style={{ justifyContent: "center", }}>

          <Card
            className="border-0 shadow-none bg-widget6 d-none live-d-lg-initial"
            style={{
              borderRadius: "15px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px",
            }}>
            <Card.Body className="py-3">
              <Row noGutters className="h-100 border-0 shadow-none">
                <Col
                  sm={12} md={12} lg={12}
                  className="d-flex align-items-center border-0 shadow-none py-0"
                  style={{ justifyContent: "center", }}>
                  <span className="h2 mb-0 font-weight-bold">
                    {this.onHandleDisplaySeconds(this.state.seconds)}
                  </span>
                </Col>

                <Col
                  sm={12} md={12} lg={12}
                  className="d-flex align-items-center border-0 shadow-none py-0"
                  style={{ justifyContent: "center", }}>
                  <div className={`text-center text-white opacity-100 mt-1 font-weight-bold small`}>
                    It's your turn!
                  </div>
                </Col>
              </Row>
            </Card.Body>

            <ProgressBar
              variant={"success"}
              now={this.state.percentage}
              animated={true}
              style={{
                height: "6px",
                borderRadius: "0px",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }} />
          </Card>
          <Card
            className="border-0 shadow-none bg-widget6 d-initial live-d-lg-none"
            style={{
              borderRadius: "2px",              
              transformOrigin: "top center",
            }}>
            <Card.Body className="py-1 px-2">
              <Row noGutters className="h-100 border-0 shadow-none p-0 m-0">
                <Col
                  sm={12} md={12} lg={12}
                  className="d-flex align-items-center border-0 shadow-none py-0"
                  style={{ justifyContent: "center", }}>
                  <div className="text-center text-white opacity-100 mt-1" style={{fontSize: "12px", fontWeight: "700"}}>
                    <span className="d-flex align-items-center justify-content-between w-100">
                      <span className="d-flex align-items-center">
                        <i className="ion ion-ios-timer mr-1" />
                      </span>
                      <span className="d-flex align-items-center">
                        {this.onHandleDisplaySeconds(this.state.seconds)}
                      </span>
                    </span>
                  </div>
                </Col>
              </Row>
            </Card.Body>

            <ProgressBar
              variant="success"
              now={this.state.percentage}
              animated={true}
              style={{
                height: "2px",
                borderRadius: "0px 0px 15px 15px",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }} />
          </Card>
          {/* <Card
            className="border-0 shadow-none bg-widget6 d-initial live-d-lg-none"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "15px",
              transform: "scale(0.9)",
              transformOrigin: "top center",
            }}>
            <Card.Body className="pt-3 pb-0">
              <Row noGutters className="h-100 border-0 shadow-none">
                <Col
                  sm={12} md={12} lg={12}
                  className="d-flex align-items-center border-0 shadow-none py-0"
                  style={{ justifyContent: "center", }}>
                  <div className="h3 text-center text-white opacity-100 mt-1 font-weight-bold">
                    <span className="d-flex align-items-center justify-content-between w-100">
                      <span className="d-flex align-items-center">
                        <i className="ion ion-ios-timer mr-3" />
                      </span>
                      <span className="d-flex align-items-center">
                        {this.onHandleDisplaySeconds(this.state.seconds)}
                      </span>
                    </span>
                  </div>
                </Col>
              </Row>
            </Card.Body>

            <ProgressBar
              variant="success"
              now={this.state.percentage}
              animated={true}
              style={{
                height: "10px",
                borderRadius: "0px 0px 15px 15px",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }} />
          </Card> */}

        </div>
        {/* / Countdown Panel */}
      </>
    )
  }
}

export default CountdownPanel