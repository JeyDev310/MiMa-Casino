import React, { Component } from 'react'

class ParticipantIdleTimer extends Component {

  constructor(props) {
    super(props)

    this.idleInterval = null
    this.onIdlePlayerCheck = this.onIdlePlayerCheck.bind(this)

    this.state = {
      dealer: false,
      hasParticipated: false,
    }

    this.idleInterval = setInterval(() => {
      this.onIdlePlayerCheck()
    }, 600000)
  }

  componentDidMount() {
    this.setState({ dealer: this.props.game.dealer })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.dealer !== this.props.game.dealer) {
      this.setState({ dealer: this.props.game.dealer })
    }
    if (prevProps.game.player !== this.props.game.player) {
      this.setState({ hasParticipated: true })
    }
  }

  componentWillUnmount() {
    this.unmounted = true
    clearInterval(this.idleInterval)
    this.idleInterval = null
  }

  onIdlePlayerCheck() {
    if (this.unmounted) return
    if (this.state.dealer) return
    if (this.state.hasParticipated) return
    if (!this.props.settings.optionM1) {
      setTimeout(() => {
        if (!this.state.dealer) {
          this.props.timeout()
        }
      }, 5000)
    }
  }

  render() {
    return (
      <></>
    )
  }
}

export default ParticipantIdleTimer
