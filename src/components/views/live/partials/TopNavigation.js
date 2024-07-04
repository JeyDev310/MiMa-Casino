import React, { Component } from 'react'
import { Button, Media, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { toast } from 'react-toastify'

import {
  GAME_ROUND_TYPE_NULL,
  GAME_ROUND_TYPE_SHOWDOWN,
} from '../core/GameRoundTypes'

import {
  PROVIDER_TYPE_EXTERNAL,
  PROVIDER_TYPE_EVERYMATRIX,
} from '../core/ProviderTypes'

import CountdownPanel from './CountdownPanel'
import NavigationButton from '../modals/panel/NavigationButton'
import ShuffleCountdownPanel from './ShuffleCountdownPanel'

import AwardIcon from '../icons/Award'
import ChatIcon from '../icons/Chat'
import DealerTipIcon from '../icons/DealerTip'
import JoinIcon from '../icons/Join'
import ReBuyIcon from '../icons/Re-Buy'
import SettingsIcon from '../icons/Settings'
import ShowdownIcon from '../icons/Showdown'
import TableIcon from '../icons/Table'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/libs/react-toastify/react-toastify.scss'

class TopNavigation extends Component {

  constructor(props) {
    super(props)

    this.shuffleTimer = null
    this.shuffleAnimTimer = null
    this.onHandleRefreshSync = this.onHandleRefreshSync.bind(this)
    this.onHandleRefreshPresence = this.onHandleRefreshPresence.bind(this)
    this.onHandleRefreshGameState = this.onHandleRefreshGameState.bind(this)
    this.onHandleRefreshEvaluation = this.onHandleRefreshEvaluation.bind(this)
    this.onHandleRefreshShuffleCountdown = this.onHandleRefreshShuffleCountdown.bind(this)

    this.state = {
      init: false,
      internal: false,
      joinable: false,
      playing: false,
      spectator: true,

      shuffle: false,
      shuffleAnim: false,
      countdown: false,

      currentRound: null,
      currentPlayer: false,
      currentActionSet: null,
      currentTimer: false,

      text: 'Streams currently not available...',
      type: 'default',
      position: 'top-left',
      delay: '2500',
      disableAutoClose: false,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      pauseOnHover: true,
      allowDragAndClose: true,
    }
  }

  componentDidMount() {

    this.setState({
      internal: ![
        PROVIDER_TYPE_EXTERNAL,
        PROVIDER_TYPE_EVERYMATRIX,
      ].includes(this.props.providerId),
    })

    this.onHandleRefreshPresence()
    const container = document.getElementById('top-navigation-hcontainer-item')
    var elements = document.querySelectorAll('[id^="top-navigation-link"]')
    for (let i = 0; i < elements.length; i++) {
      switch (elements[i].id.slice(-1)) {
        case '1':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Join Game')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '2':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Re-Buy')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '3':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Table Insights')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '4':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Live Chat')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '5':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Awards & Collectibles')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '6':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Settings')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '7':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Showdown')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '8':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Dealer Tip')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '9':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Toggle Fullscreen')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        default:
          break
      }
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.providerId !== this.props.providerId) {
      this.setState({
        internal: ![
          PROVIDER_TYPE_EXTERNAL,
          PROVIDER_TYPE_EVERYMATRIX,
        ].includes(this.props.providerId),
      })
    }

    if (prevProps.game.presence !== this.props.game.presence) {
      this.onHandleRefreshPresence()
    }

    if (prevProps.game.data !== this.props.game.data) {
      this.onHandleRefreshGameState()
    }

    if (prevProps.game.synced !== this.props.game.synced) {
      this.onHandleRefreshSync()
    }

    if (prevProps.game.evaluation !== this.props.game.evaluation) {
      this.onHandleRefreshEvaluation()
    }

    if (prevProps.game.shuffle !== this.props.game.shuffle) {
      this.onHandleRefreshShuffleCountdown()
    }

    try {
      if (prevProps.game.presence.user_has_joined !== this.props.game.presence.user_has_joined) {
        if (!this.props.game.presence.user_has_joined) {
          this.setState({
            joinable: this.props.game.presence.game_is_joinable,
          })
        } else {
          this.setState({
            joinable: false,
          })
        }
      }
    } catch { }

    if (prevProps.settings.optionF7 !== this.props.settings.optionF7) {
      const container = document.getElementById('top-navigation-hcontainer-item')
      var elements = document.querySelectorAll('[id^="top-navigation-link"]')
      for (let i = 0; i < elements.length; i++) {
        switch (elements[i].id.slice(-1)) {
          case '4':
            elements[i].addEventListener('mouseover', () => {
              container.style.opacity = 1
              container.style.transform = "translate(0px, 0px)"
              container.setAttribute('content-before', 'Live Chat')
            })
            elements[i].addEventListener('mouseleave', () => {
              container.style.opacity = 0
              container.style.transform = "translate(100px, 0px)"
            })
            break
          default:
            break
        }
      }
    }

  }

  componentWillUnmount() {
    clearInterval(this.shuffleTimer)
    clearInterval(this.shuffleAnimTimer)
  }

  onHandleRefreshPresence() {
    if (
      this.props.game.data &&
      this.props.game.profile &&
      this.props.game.presence &&
      !this.props.game.player
    ) {
      if (!this.props.game.presence.user_has_joined) {
        if (this.props.game.presence.joined_players < this.props.game.presence.max_players) {
          this.setState({
            init: false,
            joinable: true,
            playing: false,
            spectator: true,
          })
        } else {
          this.setState({
            init: false,
            joinable: false,
            playing: false,
            spectator: true,
          })
        }
      } else {
        this.setState({
          init: true,
          joinable: false,
          playing: true,
          spectator: false,
        })
      }
    }
    if (
      this.props.game.data &&
      this.props.game.profile &&
      this.props.game.presence &&
      this.props.game.player
    ) {
      if (
        this.props.game.player.p_inactive |
        this.props.game.player.p_exited
      ) {
        if (
          !this.props.game.data.game_started &&
          !this.props.game.presence.user_has_joined
        ) {
          this.setState({
            init: false,
            joinable: true,
            playing: false,
            spectator: true,
          })
        } else {
          this.setState({
            init: true,
            joinable: false,
            playing: true,
            spectator: false,
          })
        }
      } else {
        this.setState({
          init: true,
          joinable: false,
          playing: true,
          spectator: false,
        })
      }
    }
  }

  onHandleRefreshSync() {
    if (this.props.game.synced) {
      this.setState({
        currentRound: this.props.game.synced.current_street,
        currentPlayer: this.props.game.synced.current_player,
        currentActionSet: this.props.game.synced.current_action_set,
        currentTimer: this.props.game.synced.timer,
      }, () => {
        this.onHandleEvaluateSync()
      })
    }
  }

  onHandleEvaluateSync() {
    try {
      if (this.props.game.data.game_started) {
        if (
          this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
          this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
        ) {
          if (this.state.currentPlayer) {
            this.setState({
              countdown: true,
            })
          } else {
            this.setState({
              countdown: false,
            })
          }
        } else {
          this.setState({
            countdown: false,
          })
        }
      } else {
        this.setState({
          countdown: false,
        })
      }
    } catch {
      this.setState({
        countdown: false,
      })
    }
  }

  onHandleRefreshGameState() {
    if (this.props.game.data) {
      if (
        this.props.game.data.current_round === GAME_ROUND_TYPE_NULL |
        this.props.game.data.current_round === GAME_ROUND_TYPE_SHOWDOWN
      ) {
        this.setState({
          countdown: false,
        })
      }
    }
  }

  onHandleRefreshEvaluation() {
    this.setState({
      countdown: false,
    })
  }

  onHandleRefreshShuffleCountdown() {
    if (!this.state.shuffle) {
      this.setState({
        shuffle: true,
        shuffleAnim: true,
      }, () => {
        this.shuffleTimer = setTimeout(() => {
          this.setState({
            shuffle: false,
          })
        }, this.props.game.data.auto_mode
          ? 7000
          : 17000)
        this.shuffleAnimTimer = setTimeout(() => {
          this.setState({
            shuffleAnim: false,
          })
        }, this.props.game.data.auto_mode
          ? 6000
          : 16000)
      })
    }
  }

  showToastify() {
    toast(this.state.text, {
      type: this.state.type,
      position: this.state.position,
      hideProgressBar: this.state.hideProgressBar,
      closeOnClick: this.state.closeOnClick,
      pauseOnHover: this.state.pauseOnHover,
      draggable: this.state.allowDragAndClose,
    })
  }

  clearToastify() {
    toast.dismiss()
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        <span className="top-navigation-layout-s1">

          {/* Top Navigation */}
          {false && (
            <div
              className="d-flex flex-grow-0 pt-3 pb-1 live-top-navigation"
              style={{ justifyContent: "center", }}>
              <Media className="align-items-center">
                <div className="d-flex">

                  {this.props.settings.optionG1 && (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip
                          className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                          Join Game
                        </Tooltip>
                      }>
                      <Button
                        id="top-navigation-link-1"
                        variant="widget5 rounded-pill icon-btn mr-1"
                        onClick={() => this.props.openFill(1)}
                        disabled={this.state.joinable ? false : true}>
                        <JoinIcon />
                      </Button>
                    </OverlayTrigger>
                  )}

                  {this.props.settings.optionG2 && !this.props.game.tournament && (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip
                          className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                          Re-Buy
                        </Tooltip>
                      }>
                      <Button
                        id="top-navigation-link-2"
                        variant="widget5 rounded-pill icon-btn mr-1"
                        onClick={() => this.props.openFill(4)}>
                        <ReBuyIcon />
                      </Button>
                    </OverlayTrigger>
                  )}

                  {this.props.settings.optionG3 && this.state.internal && (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip
                          className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                          Table Insights
                        </Tooltip>
                      }>
                      <Button
                        id="top-navigation-link-3"
                        variant="widget5 rounded-pill icon-btn mr-1 d-none live-d-lg-initial"
                        onClick={() => this.props.openSlide(10)}>
                        <TableIcon />
                      </Button>
                    </OverlayTrigger>
                  )}

                  {this.props.settings.optionG4 && this.props.settings.optionF7 && (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip
                          className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                          Live Chat
                        </Tooltip>
                      }>
                      <Button
                        id="top-navigation-link-4"
                        variant="widget5 rounded-pill icon-btn mr-1"
                        onClick={() => this.props.openSlide(4)}>
                        <ChatIcon />
                      </Button>
                    </OverlayTrigger>
                  )}

                  {this.props.settings.optionG5 && this.state.internal && (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip
                          className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                          Awards & Collectibles
                        </Tooltip>
                      }>
                      <Button
                        id="top-navigation-link-5"
                        variant="widget5 rounded-pill icon-btn mr-1"
                        onClick={() => this.props.openSlide(5)}>
                        <AwardIcon />
                      </Button>
                    </OverlayTrigger>
                  )}

                  {this.props.settings.optionG6 && this.state.internal && (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip
                          className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                          Settings
                        </Tooltip>
                      }>
                      <Button
                        id="top-navigation-link-6"
                        variant="widget5 rounded-pill icon-btn mr-1 d-none live-d-lg-initial"
                        onClick={() => this.props.openSlide(7)}>
                        <SettingsIcon />
                      </Button>
                    </OverlayTrigger>
                  )}

                  {this.props.settings.optionG7 && (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip
                          className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                          Showdown
                        </Tooltip>
                      }>
                      <Button
                        id="top-navigation-link-7"
                        variant="widget5 rounded-pill icon-btn mr-1"
                        onClick={() => this.props.openFill(3)}>
                        <ShowdownIcon />
                      </Button>
                    </OverlayTrigger>
                  )}

                  {this.props.settings.optionG8 && !this.props.game.data.auto_mode && (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip
                          className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                          Dealer Tip
                        </Tooltip>
                      }>
                      <Button
                        id="top-navigation-link-8"
                        variant="widget5 rounded-pill icon-btn mr-0"
                        onClick={() => this.props.openFill(7)}>
                        <DealerTipIcon />
                      </Button>
                    </OverlayTrigger>
                  )}

                  {/* Navigation Button */}
                  <NavigationButton
                    {...this.props} {...this.state}
                    open={this.props.openSlide}
                    position="top"
                  />
                  {/* / Navigation Button */}

                </div>
              </Media>
            </div>
          )}
          {/* / Top Navigation */}

          {/* Game State Mobile */}
          {/* <GameStateV1Mobile
            {...this.props} {...this.state} /> */}
          {/* / Game State Mobile */}

          <>
            {this.state.countdown && (
              <div className="shuffle-panel-opacity-animation-up cursor-pointer py-2 mt-1">
                <div className={`shuffle-panel-opacity-animation-up ${this.state.countdown
                  ? 'shuffle-panel-parent-s1'
                  : 'shuffle-panel-parent-s2'}`}>
                  {/* Countdown Panel */}
                  <CountdownPanel
                    {...this.props} {...this.state} />
                  {/* / Countdown Panel */}
                </div>
              </div>
            )}
          </>

          <>
            {this.state.shuffle && (
              <div className="shuffle-panel-opacity-animation-up cursor-pointer py-2 mt-1">
                <div className={`shuffle-panel-opacity-animation-up ${this.state.shuffleAnim
                  ? 'shuffle-panel-parent-s1'
                  : 'shuffle-panel-parent-s2'}`}>
                  {/* Shuffle Countdown Panel */}
                  <ShuffleCountdownPanel
                    {...this.props} {...this.state} />
                  {/* / Shuffle Countdown Panel */}
                </div>
              </div>
            )}
          </>

        </span>
      </>
    )
  }
}

export default TopNavigation
