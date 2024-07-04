import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

import {
  GAME_ACTION_TYPE_CHECK,
  GAME_ACTION_TYPE_FOLD,
} from '../core/GameActionTypes'

import '../../../../vendor/styles/pages/chat.scss'

class CircularProgressBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    const sqSize = this.props.sqSize
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2
    const viewBox = `0 0 ${sqSize} ${sqSize}`
    const dashArray = radius * Math.PI * 2
    const dashOffset = dashArray - dashArray * this.props.percentage / 100

    return (
      <svg
        width={this.props.sqSize}
        height={this.props.sqSize}
        viewBox={viewBox}>

        <circle
          style={{ fill: "none", stroke: "#df3d371e", }}
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`} />

        <circle
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
          transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            fill: "none",
            stroke: "#df3d37",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            transition: "all 0.2s ease 0s",
          }} />

        <text
          style={{ fontSize: "1em", fontWeight: "bold", fill: "white", }}
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle">
          {`${parseInt(this.props.seconds)}`}
        </text>
      </svg>
    );
  }
}

CircularProgressBar.defaultProps = {
  sqSize: 50,
  percentage: 25,
  strokeWidth: 3,
};

class BetTimer extends Component {

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

  prevent(e) {
    e.preventDefault()
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

  render() {
    return (
      <>
        {/* Bet Timer */}
        <span className="mb-0">
          <Spinner
            animation="border"
            variant="danger"
            style={{
              height: "1.5rem",
              width: "1.5rem",
            }} />
        </span>
        {/* / Bet Timer */}
      </>
    )
  }
}

export default BetTimer