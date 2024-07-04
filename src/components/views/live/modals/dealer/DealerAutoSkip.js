import React, { Component } from 'react'

import {
  MSG_TYPE_DEALER_NEXT_PLAYER,
} from '../../core/DealerActionTypes'

class DealerAutoSkip extends Component {

  constructor(props) {
    super(props)

    this.skipTimer = 0

    this.send = this.send.bind(this)
    this.clear = this.clear.bind(this)

    this.state = {
      skipTimout: 25000,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data.current_player !== this.props.game.data.current_player) {
      clearInterval(this.skipTimer)
      if (this.props.game.data.current_player.hasOwnProperty('id')) {
        this.clear()
        this.skipTimer = setTimeout(() => {
          this.send(MSG_TYPE_DEALER_NEXT_PLAYER)
        }, this.state.skipTimout)
      } else {
        this.clear()
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.skipTimer)
  }

  send(action) {
    this.props.client.sendDealerAction(
      this.props.game.data.room_name,
      this.props.game.data.current_round,
      action,
      JSON.stringify([]),
    )
    this.clear()
  }

  clear() {
    clearInterval(this.skipTimer)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Dealer Auto Skip */}

        <div></div>

        {/* / Dealer Auto Skip */}
      </>
    )
  }
}

export default DealerAutoSkip