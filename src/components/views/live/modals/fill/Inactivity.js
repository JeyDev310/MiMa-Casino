/*eslint-disable*/

import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

class Inactivity extends Component {

  constructor(props) {
    super(props)

    this.exitTimer = 0

    this.handleChangeEvent = this.handleChangeEvent.bind(this)
    this.onHandleStartTimer = this.onHandleStartTimer.bind(this)
    this.onHandleStartCountdown = this.onHandleStartCountdown.bind(this)
    this.onHandleDisplaySeconds = this.onHandleDisplaySeconds.bind(this)

    this.state = {
      init: false,
      bank: 15,
      time: {},
      seconds: 15,
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
    clearInterval(this.exitTimer)
  }

  handleChangeEvent(event) {
    this.setState({ percentage: event.target.value })
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
    if (this.exitTimer === 0 && this.state.seconds > 0) {
      this.exitTimer = setInterval(this.onHandleStartCountdown, 1000)
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
      clearInterval(this.exitTimer)
      this.props.timeout()
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

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Inactivity Warning Modal */}
        <Modal.Body style={{
          borderRadius: "15px",
          backgroundColor: "rgba(37, 40, 46, 0.7)",
        }}>
          <h1 className="text-center display-4 font-weight-bold">
            Inactivity Warning
          </h1>

          <hr className="border-light m-0 py-2" />

          <div className="text-center text-white opacity-100 font-weight-semibold mb-3">
            Your session will be closed in {this.state.seconds} seconds due to inactivity.
            <br />
            Please start a new session or continue the existing session.
          </div>

          <div className="text-center text-white opacity-100 mb-3">
            <span className="h2 mb-0 font-weight-bold">
              {this.onHandleDisplaySeconds(this.state.seconds)}
            </span>
          </div>

          <hr className="border-light m-0 py-2" />

          <Button
            variant="instagram" block
            onClick={this.props.close}
            className="font-weight-bold h5 mb-0">
            Continue
          </Button>

          <Button
            variant="default" block
            onClick={this.props.exit}
            className="font-weight-bold h5 mb-0">
            Leave Session
          </Button>
        </Modal.Body>
        {/* / Inactivity Warning Modal */}
      </>
    )
  }
}

export default Inactivity
