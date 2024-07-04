/*eslint-disable*/

import React, { Component } from 'react'
import { Card, Modal } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

class StatusMessage extends Component {

  constructor(props) {
    super(props)

    this.modalTimeout = null
    this.modalInterval = null

    this.onHandleStartTimer = this.onHandleStartTimer.bind(this)
    this.onHandleStartCountdown = this.onHandleStartCountdown.bind(this)
    this.onHandleDisplaySeconds = this.onHandleDisplaySeconds.bind(this)

    this.state = {
      init: false,
      emergency: false,
      bank: 15,
      time: {},
      seconds: 15,
      percentage: 100,
    }
  }

  componentDidMount() {
    this.modalTimeout = setTimeout(() => {
      this.props.close()
    }, 15000)

    let timeLeftVar = this.calcSeconds(this.state.seconds)
    this.setState({
      time: timeLeftVar,
      percentage: 100,
    }, () => {
      this.onHandleStartTimer()
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.status !== this.props.game.status) {
      try {
        if (prevProps.game.status.id !== this.props.game.status.id && prevProps.game.status.code === this.props.game.status.code) {
          clearTimeout(this.modalTimeout)
          clearInterval(this.modalInterval)
          this.modalTimeout = setTimeout(() => {
            this.props.close()
          }, 10)
        }

        if (prevProps.game.status.id !== this.props.game.status.id && prevProps.game.status.code !== this.props.game.status.code) {
          clearTimeout(this.modalTimeout)
          this.modalTimeout = setTimeout(() => {
            this.props.close()
          }, 15000)

          clearInterval(this.modalInterval)
          this.modalInterval = null
          this.setState({
            bank: 15,
            time: {},
            seconds: 15,
            percentage: 100,
          }, () => {
            let timeLeftVar = this.calcSeconds(this.state.seconds)
            this.setState({
              time: timeLeftVar,
              percentage: 100,
            }, () => {
              this.onHandleStartTimer()
            })
          })
        }

        if (this.props.game.status.code === "ER1") {
          this.setState({ emergency: true })
        } else {
          this.setState({ emergency: false })
        }
      } catch { }
    }

    if (prevProps.game.data !== this.props.game.data) {
      clearTimeout(this.modalTimeout)
      clearInterval(this.modalInterval)
      this.props.close()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.modalTimeout)
    clearInterval(this.modalInterval)
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
    if (this.modalInterval === null && this.state.seconds > 0) {
      this.modalInterval = setInterval(this.onHandleStartCountdown, 1000)
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
      clearInterval(this.modalInterval)
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

  render() {
    return (
      <>
        {/* Status Message Modal */}
        {this.props.game.status && (
          <Modal.Body className="bg-transparent" style={{ borderRadius: "15px" }}>
            <Card className="bg-darker1 border-0 p-4" style={{
              borderRadius: "15px",
              filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.9))",
            }}>
              <Card.Body>
                <h1 className="text-center display-1 font-weight-bold mb-1">
                  {this.props.game.status.headline}
                </h1>

                <div className="text-center text-white opacity-100 h5 mt-2 mb-0">
                  {this.props.game.status.subtitle}
                </div>

                <div className="text-center text-white opacity-100 mt-3 mb-0">
                  <span className="h2 mb-0 font-weight-bold">
                    {this.onHandleDisplaySeconds(this.state.seconds)}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Modal.Body>
        )}
        {/* / Status Message Modal */}
      </>
    )
  }
}

export default StatusMessage
