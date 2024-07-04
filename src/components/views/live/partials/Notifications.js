import React, { Component } from 'react'
import '../../../../vendor/styles/pages/chat.scss'

class Notifications extends Component {

  constructor(props) {
    super(props)

    this.onHandleNewNotification = this.onHandleNewNotification.bind(this)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    if (this.props.game.data.auto_mode) {
      this.props.change('optionE1', false)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.presence !== this.props.game.presence) {
      if (this.props.game.presence) {
        this.setState({
          init: true,
        }, () => {
          this.onHandleNewNotification()
        })
      } else {
        this.setState({
          init: false,
        })
      }
    }
    if (prevProps.game.notifications !== this.props.game.notifications) {
      if (this.props.game.notifications.p_low_balance) {
        this.props.open(3)
      }
    }
    if (prevProps.game.evaluation !== this.props.game.evaluation) {
      this.props.resetAuto()
    }
    if (prevProps.game?.presence?.user_has_joined !== this.props.game?.presence?.user_has_joined) {
      if (!this.props.game.presence.user_has_joined) {
        this.props.reset()
      }
    }
  }

  onHandleNewNotification() {
    try {
      if (
        this.props.game.player.p_inactive |
        this.props.game.player.p_exited
      ) {
        if (
          !this.props.game.data.game_started &&
          !this.props.game.presence.user_has_joined
        ) {
          this.props.reset()
        }
      }
    } catch { }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Notifications */}
      </>
    )
  }
}

export default Notifications
