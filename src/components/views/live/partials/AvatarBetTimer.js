import React, { Component } from 'react'

import {
  GAME_ACTION_TYPE_CHECK,
  GAME_ACTION_TYPE_FOLD,
} from '../core/GameActionTypes'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/styles/pages/profile.scss'

class AvatarBetTimer extends Component {

  constructor(props) {
    super(props)

    this.timer = 0
    this.handleChangeEvent = this.handleChangeEvent.bind(this)
    this.onHandleStartTimer = this.onHandleStartTimer.bind(this)
    this.onHandleStartCountdown = this.onHandleStartCountdown.bind(this)

    this.state = {
      init: false,
      bank: 20,
      time: {},
      seconds: 20,
      percentage: 100,
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
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
    if (seconds === 0) {
      clearInterval(this.timer)
      if (this.props.game.data.current_round_checkable) {
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
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Avatar Bet Timer */}
        {this.props.game.connection
          ? <div
            className={`${this.props.translate
              ? 'ava'
              : 'ava_s1'} ava_online avatar-bet-timer-border-animation ava_online_green`}
            style={{
              transform: `${this.props.translate
                ? "translateX(-130%)"
                : "translateX(0%)"}`,
              filter: "drop-shadow(0px 0px 15px rgb(0, 0, 0))",
            }}>
            <span
              className="cursor-pointer"
              onClick={(e) => { this.props.change('optionK5', !this.props.settings.optionK5) }}>
              <img
                src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`}
                className="ava__pic avatar-bet-timer-scale-animation" alt="Avatar" />
            </span>
          </div>
          : <div
            className={`${this.props.translate
              ? 'ava'
              : 'ava_s1'} ava_online avatar-bet-timer-border-animation ava_online_orange`}
            style={{
              transform: `${this.props.translate
                ? "translateX(-130%)"
                : "translateX(0%)"}`,
              filter: "drop-shadow(0px 0px 15px rgb(0, 0, 0))",
            }}>
            <span
              className="cursor-pointer"
              onClick={(e) => { this.props.change('optionK5', !this.props.settings.optionK5) }}>
              <img
                src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`}
                className="ava__pic" alt="Avatar" />
            </span>
          </div>}
        {/* / Avatar Bet Timer */}
      </>
    )
  }
}

export default AvatarBetTimer