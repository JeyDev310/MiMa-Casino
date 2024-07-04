import React, { Component } from 'react'
import { toast } from 'react-toastify'

import '../../../../vendor/styles/pages/live.scss'
import '../../../../vendor/libs/react-toastify/react-toastify.scss'

const Emoji = React.memo(({ className, label, symbol }) =>
  <span className={className} role="img" aria-label={label} style={{
    fontSize: "1rem",
  }}>
    {String.fromCodePoint(symbol)}
  </span>
)

class RealityCheckTimer extends Component {

  constructor(props) {
    super(props)

    this.realityInterval = null
    this.onShowRealityCheckMessage = this.onShowRealityCheckMessage.bind(this)

    this.state = {
      dealer: false,
    }

    this.realityInterval = setInterval(() => {
      this.onShowRealityCheckMessage()
    }, 1800000)
  }

  componentDidMount() {
    this.setState({
      dealer: this.props.game.dealer,
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.dealer !== this.props.game.dealer) {
      this.setState({
        dealer: this.props.game.dealer,
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.realityInterval)
  }

  onShowRealityCheckMessage() {
    if (!this.state.dealer) {
      this.showToastify(<>
        <div className="cursor-pointer p-0 m-0 small">
          <h6>
            <Emoji symbol={"0x26A1"} className="mr-1" />
            <span>
              Live Poker Studio™ Reality Check
            </span>
          </h6>
          <p className="mb-0">
            You have been playing for more than 30 minutes. Time for a break?
          </p>
        </div>
      </>, null)
    }
  }

  showToastify(message, type) {
    toast(message, {
      type: type,
      autoClose: 25000,
      className: 'bg-reality-check-timer',
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  render() {
    return (
      <>
      </>
    )
  }
}

export default RealityCheckTimer