import React, { Component } from 'react'

import {
  GAME_ACTION_TYPE_BET,
  GAME_ACTION_TYPE_CHECK,
  GAME_ACTION_TYPE_BIG_BLIND_CHECK,
  GAME_ACTION_TYPE_RAISE,
  GAME_ACTION_TYPE_CALL,
  GAME_ACTION_TYPE_FOLD,
  GAME_ACTION_TYPE_ALL_IN,
} from '../core/GameActionTypes'

import '../../../../vendor/styles/pages/chat.scss'

class SFXPlayer extends Component {

  constructor(props) {
    super(props)

    this.getAudioVolume = this.getAudioVolume.bind(this)
    this.handleRefreshGameActions = this.handleRefreshGameActions.bind(this)
    this.callbackNewGame = this.callbackNewGame.bind(this)
    this.callbackMessage = this.callbackMessage.bind(this)
    this.callbackShowdown = this.callbackShowdown.bind(this)
    this.callbackActionDefault = this.callbackActionDefault.bind(this)
    this.callbackCurrentPlayer = this.callbackCurrentPlayer.bind(this)
    this.fakeClickAndTouchEvent = this.fakeClickAndTouchEvent.bind(this)
    this.testAudioCallbackAction = this.testAudioCallbackAction.bind(this)

    this.state = {
      init: false,
      username: '',
      email: '',
      prevBetId: '',
      prevCurrentUser: '',
    }

    // document.body.addEventListener('click', this.testAudioCallbackAction)
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: String(JSON.parse(localStorage.getItem('user')).user.username),
        email: String(JSON.parse(localStorage.getItem('user')).user.email),
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data !== this.props.game.data) {
      this.handleRefreshGameActions()
    }
    if (prevProps.game.newgame !== this.props.game.newgame) {
      this.callbackNewGame()
    }
    if (prevProps.game.evaluation !== this.props.game.evaluation) {
      this.callbackShowdown()
    }
    if (prevProps.game.messages !== this.props.game.messages) {
      var msg = this.props.game.messages.slice(-1)[0]
      if (msg.channel === 'player') {
        this.callbackMessage()
      }
    }
  }

  handleRefreshGameActions() {
    try {
      if (
        this.props.game.data.game_started &&
        this.props.game.data.current_player
      ) {
        if (this.state.prevCurrentUser !== this.props.game.data.current_player.p_username) {
          if (this.state.username === this.props.game.data.current_player.p_username) {
            this.setState({
              prevCurrentUser: this.props.game.data.current_player.p_username,
            }, () => {
              this.callbackCurrentPlayer()
            })
          } else {
            this.setState({
              prevCurrentUser: this.props.game.data.current_player.p_username,
            }, () => {
              this.callbackActionDefault()
            })
          }
        }
      } else {
        this.setState({
          prevCurrentUser: '',
        })
      }
    } catch {
      this.setState({
        prevCurrentUser: '',
      })
    }
  }

  callbackActionDefault() {
    try {
      var sfxItemIdentifier = 'action-default-1-0-0'
      var sfxItemSource = `${process.env.PUBLIC_URL}/audio/v1/actions/3/action-default-1-0-0.m4a`

      if (this.props.game.data.current_action_values) {
        switch (this.props.game.data.current_action_values.current_action) {
          case GAME_ACTION_TYPE_BET:
            sfxItemIdentifier = 'action-bet-1-0-0'
            sfxItemSource = `${process.env.PUBLIC_URL}/audio/v1/actions/3/action-bet-1-0-0.m4a`
            break
          case GAME_ACTION_TYPE_CHECK:
            sfxItemIdentifier = 'action-check-1-0-0'
            sfxItemSource = `${process.env.PUBLIC_URL}/audio/v1/actions/3/action-check-1-0-0.m4a`
            break
          case GAME_ACTION_TYPE_BIG_BLIND_CHECK:
            sfxItemIdentifier = 'action-check-1-0-0'
            sfxItemSource = `${process.env.PUBLIC_URL}/audio/v1/actions/3/action-check-1-0-0.m4a`
            break
          case GAME_ACTION_TYPE_RAISE:
            sfxItemIdentifier = 'action-raise-1-0-0'
            sfxItemSource = `${process.env.PUBLIC_URL}/audio/v1/actions/3/action-raise-1-0-0.m4a`
            break
          case GAME_ACTION_TYPE_CALL:
            sfxItemIdentifier = 'action-call-1-0-0'
            sfxItemSource = `${process.env.PUBLIC_URL}/audio/v1/actions/3/action-call-1-0-0.m4a`
            break
          case GAME_ACTION_TYPE_ALL_IN:
            sfxItemIdentifier = 'action-allin-1-0-0'
            sfxItemSource = `${process.env.PUBLIC_URL}/audio/v1/actions/3/action-allin-1-0-0.m4a`
            break
          case GAME_ACTION_TYPE_FOLD:
            sfxItemIdentifier = 'action-fold-1-0-0'
            sfxItemSource = `${process.env.PUBLIC_URL}/audio/v1/actions/3/action-fold-1-0-0.m4a`
            break
          default:
            sfxItemIdentifier = 'action-default-1-0-0'
            sfxItemSource = `${process.env.PUBLIC_URL}/audio/v1/actions/3/action-default-1-0-0.m4a`
            break
        }
      }

      const element = document.getElementsByClassName(sfxItemIdentifier)[0]
      element.pause()
      element.src = sfxItemSource
      element.currentTime = 0
      element.volume = this.getAudioVolume()
      element.play()
    } catch { }
  }

  callbackNewGame() {
    try {
      const element = document.getElementsByClassName("event-newgame-1-0-0")[0]
      element.pause()
      element.src = `${process.env.PUBLIC_URL}/audio/v1/events/1/event-newgame-1-0-0.m4a`
      element.currentTime = 0
      element.volume = this.getAudioVolume()
      element.play()
    } catch { }
  }

  callbackMessage() {
    try {
      const element = document.getElementsByClassName("event-message-1-0-0")[0]
      element.pause()
      element.src = `${process.env.PUBLIC_URL}/audio/v1/events/1/event-message-1-0-0.m4a`
      element.currentTime = 0
      element.volume = this.getAudioVolume()
      element.play()
    } catch { }
  }

  callbackShowdown() {
    try {
      const element = document.getElementsByClassName("event-showdown-1-0-0")[0]
      element.pause()
      element.src = `${process.env.PUBLIC_URL}/audio/v1/events/2/event-showdown-1-0-0.m4a`
      element.currentTime = 0
      element.volume = this.getAudioVolume()
      element.play()
    } catch { }
  }

  callbackCurrentPlayer() {
    try {
      const element = document.getElementsByClassName("event-currentplayer-1-0-0")[0]
      element.pause()
      element.src = `${process.env.PUBLIC_URL}/audio/v1/events/2/event-currentplayer-1-0-0.m4a`
      element.currentTime = 0
      element.volume = this.getAudioVolume()
      element.play()
    } catch { }
  }

  getAudioVolume() {
    try {
      if (!this.props.settings.optionB4) {
        return Number(this.props.settings.optionB3 / 100)
      } else {
        return 0
      }
    } catch {
      return 0.75
    }
  }

  fakeClickAndTouchEvent() {
    try {
      const element = document.getElementsByClassName("event-newgame-1-0-0")[0]
      element.pause()
      element.src = `${process.env.PUBLIC_URL}/audio/v1/events/1/event-newgame-1-0-0.m4a`
      element.currentTime = 0
      element.volume = 0
      element.play()

      this.props.change('optionB4', false)

      document.body.removeEventListener('click', this.fakeClickAndTouchEvent)
      document.body.removeEventListener('touchstart', this.fakeClickAndTouchEvent)
    } catch { }
  }

  testAudioCallbackAction() {
    try {
      const element = document.getElementsByClassName("action-default-1-0-0")[0]
      element.pause()
      element.src = `${process.env.PUBLIC_URL}/audio/v1/actions/3/action-default-1-0-0.m4a`
      element.currentTime = 0
      element.volume = this.getAudioVolume()
      element.play()
    } catch { }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* SFXPlayer Audio Items */}
        <>
          {/* SFXPlayer Audio General UI */}
          <audio className="action-item-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/tick-item-3-0-0.wav`}></source>
          </audio>

          <audio className="action-item-2-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/tick-item-3-0-0.wav`}></source>
          </audio>

          <audio className="tick-item-6-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/tick-item-6-0-0.wav`}></source>
          </audio>

          <audio className="special-item-5-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/special-item-5-0-0.wav`}></source>
          </audio>

          <audio className="event-countdown-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/events/1/event-countdown-1-0-0.m4a`}></source>
          </audio>

          <audio className="event-countdown-2-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/events/1/event-countdown-2-0-0.m4a`}></source>
          </audio>
          {/* / SFXPlayer Audio General UI */}

          {/* SFXPlayer Audio Actions */}
          <audio className="action-default-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/actions/3/action-default-1-0-0.m4a`}></source>
          </audio>

          <audio className="action-bet-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/actions/3/action-bet-1-0-0.m4a`}></source>
          </audio>

          <audio className="action-check-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/actions/3/action-check-1-0-0.m4a`}></source>
          </audio>

          <audio className="action-raise-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/actions/3/action-raise-1-0-0.m4a`}></source>
          </audio>

          <audio className="action-call-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/actions/3/action-call-1-0-0.m4a`}></source>
          </audio>

          <audio className="action-allin-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/actions/3/action-allin-1-0-0.m4a`}></source>
          </audio>

          <audio className="action-fold-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/actions/3/action-fold-1-0-0.m4a`}></source>
          </audio>
          {/* / SFXPlayer Audio Actions */}

          {/* SFXPlayer Audio Events */}
          <audio className="event-newgame-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/events/1/event-newgame-1-0-0.m4a`}></source>
          </audio>

          <audio className="event-message-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/events/1/event-message-1-0-0.m4a`}></source>
          </audio>

          <audio className="event-showdown-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/events/2/event-showdown-1-0-0.m4a`}></source>
          </audio>

          <audio className="event-currentplayer-1-0-0">
            <source src={`${process.env.PUBLIC_URL}/audio/v1/events/2/event-currentplayer-1-0-0.m4a`}></source>
          </audio>
          {/* / SFXPlayer Audio Events */}
        </>
        {/* / SFXPlayer Audio Items */}
      </>
    )
  }
}

export default SFXPlayer
