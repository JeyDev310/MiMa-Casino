import React, { Component } from 'react'
import IdleTimer from 'react-idle-timer'

class SessionIdleTimer extends Component {

  constructor(props) {
    super(props)

    this.idleTimer = null
    this.onAction = this.onAction.bind(this)
    this.onActive = this.onActive.bind(this)
    this.onIdle = this.onIdle.bind(this)

    this.state = {
      dealer: false,
      hasParticipated: false,
      isActive: true,
      lastActiveTime: new Date().toString(),
      remainingTime: 0,
      log: '',
    }

    this.intervalId = setInterval(() => {
      if (!this.idleTimer || (!this.state.isActive && !this.state.remainingTime)) return
      this.setState({ remainingTime: this.idleTimer.getRemainingTime() })
    }, 200)
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

  getLastActiveTime() {
    return new Date(this.idleTimer.getLastActiveTime()).toString()
  }

  onAction(e) {
    if (this.unmounted) return
    this.setState(state => ({
      lastActiveTime: this.getLastActiveTime(),
      log: `Action: ${e.type}\n` + state.log,
    }))
  }

  onActive(e) {
    if (this.unmounted) return
    this.setState(state => ({
      isActive: true,
      lastActiveTime: this.getLastActiveTime(),
      log: `User is active\n` + state.log,
    }))
  }

  onIdle(e) {
    if (this.unmounted) return
    this.setState(state => ({
      isActive: false,
      lastActiveTime: this.getLastActiveTime(),
      log: `Idle\n` + state.log,
    }), () => {
      if (!this.props.settings.optionM1) {
        setTimeout(() => {
          if (!this.state.dealer && !this.state.hasParticipated) {
            this.props.open(8)
          }
        }, 3000)
      }
    })
  }

  componentWillUnmount() {
    this.unmounted = true
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  render() {
    return (
      <>
        {!this.componentUnmounted && <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={300000}
        />}
      </>
    )
  }
}

export default SessionIdleTimer
