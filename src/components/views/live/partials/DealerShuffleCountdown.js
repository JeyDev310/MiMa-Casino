/*eslint-disable*/

import React, { Component } from 'react'
import { Card, Col, ProgressBar, Row } from 'react-bootstrap'

import '../../../../vendor/styles/pages/chat.scss'

class DealerShuffleCountdown extends Component {

  constructor(props) {
    super(props)

    this.timer = 0

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
        {/* Dealer Shuffle Countdown */}
        <Card
          className="d-flex w-100 mt-3 mb-3 bg-light border-0 shadow-none p-5"
          style={{ borderRadius: "15px", }}>
          <Row className="mx-0 d-flex justify-content-center p-2">
            <div className={`text-center text-white opacity-100 mb-0 h4 font-weight-bold`}>
              Shuffle Countdown
            </div>
          </Row>

          <Row noGutters className="h-100 border-0 shadow-none mx-0 d-flex justify-content-center p-2">
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
              className="d-flex align-items-center border-0 shadow-none py-0 mt-5"
              style={{ justifyContent: "center", }}>
              <div className={`text-center text-white opacity-100 mt-1 font-weight-bold small`}>
                Timer
              </div>
            </Col>
          </Row>

          <ProgressBar
            variant={"success"}
            now={this.state.percentage}
            animated={true}
            style={{
              height: "24px",
              borderRadius: "12px",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }} />
        </Card>
        {/* / Dealer Shuffle Countdown */}
      </>
    )
  }
}

export default DealerShuffleCountdown