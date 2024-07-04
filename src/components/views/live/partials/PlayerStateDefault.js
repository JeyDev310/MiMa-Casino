import React, { Component } from 'react'
import { ButtonGroup, Col, Row } from 'react-bootstrap'

import debounce from 'debounce'
import { RSButton } from 'reactsymbols-kit'

import {
  GAME_ROUND_TYPE_NULL,
  GAME_ROUND_TYPE_SHOWDOWN,
} from '../core/GameRoundTypes'

import {
  resolveBreakpoint,
  translateBreakpoint,
} from '../core/Breakpoints'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/styles/pages/live.scss'
import '../../../../vendor/styles/pages/profile.scss'

class PlayerStateDefault extends Component {

  constructor(props) {
    super(props)

    this.onRenderDealerTip = this.onRenderDealerTip.bind(this)
    this.resolveWindowBreakpoint = this.resolveWindowBreakpoint.bind(this)
    this.onHandleRefreshPresence = this.onHandleRefreshPresence.bind(this)
    this.onHandleRefreshGameState = this.onHandleRefreshGameState.bind(this)
    this.onHandleRefreshSync = this.onHandleRefreshSync.bind(this)
    this.onHandleEvaluateSync = this.onHandleEvaluateSync.bind(this)
    this.onHandleRenderDealerTip = this.onHandleRenderDealerTip.bind(this)
    this.onHandleSubmitSitOutState = this.onHandleSubmitSitOutState.bind(this)
    this.onHandleRenderSitOutState = this.onHandleRenderSitOutState.bind(this)
    this.onHandleSubmitMuckCardsState = this.onHandleSubmitMuckCardsState.bind(this)
    this.onHandleRenderMuckCardsState = this.onHandleRenderMuckCardsState.bind(this)

    this.state = {
      init: false,
      size: 6,
      active: false,
      joinable: false,
      playing: false,
      spectator: true,
      currentRound: null,
      currentPlayer: false,
      currentActionSet: null,
      timer: false,
    }

    window.addEventListener("resize", debounce(this.resolveWindowBreakpoint, 10))
  }

  resolveWindowBreakpoint() {
    this.setState({
      size: translateBreakpoint(resolveBreakpoint(window.innerWidth)),
    })
  }

  componentDidMount() {
    this.onHandleRefreshPresence()
    this.resolveWindowBreakpoint()
  }

  componentDidUpdate(prevProps) {
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
      this.setState({
        active: false,
      })
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
  }

  componentWillUnmount() {
    window.removeEventListener("resize", debounce(this.resolveWindowBreakpoint, 10))
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
          init: false,
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
      this.setState({
        init: true,
        joinable: false,
        playing: true,
        spectator: false,
      })
    }
  }

  onHandleRefreshSync() {
    if (this.props.game.synced) {
      this.setState({
        currentRound: this.props.game.synced.current_street,
        currentPlayer: this.props.game.synced.current_player,
        currentActionSet: this.props.game.synced.current_action_set,
        timer: this.props.game.synced.timer,
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
              active: true,
            })
          } else {
            this.setState({
              active: false,
            })
          }
        } else {
          this.setState({
            active: false,
          })
        }
      } else {
        this.setState({
          active: false,
        })
      }
    } catch {
      this.setState({
        active: false,
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
          active: false,
        })
      }
    }
  }

  onHandleSubmitSitOutState() {
    if (
      this.props.game.player
    ) {
      this.props.client.sendPlayerSitOut(
        0,
        this.props.game.data.current_round,
        !this.props.game.player.p_sit_out_request ? 1 : 0,
      )
    }
  }

  onHandleRenderSitOutState(pos) {
    var request = this.props.game.player.p_sit_out_request
    var state = this.props.game.player.p_sit_out
    if (pos === 1) {
      if (request && state) {
        return String('FaCheck')
      } else if (!request && !state) {
        return String('FaTimesCircle')
      } else if (request !== state) {
        return String('FaCheck')
      }
    } else if (pos === 2) {
      if (request && state) {
        return String('linear-gradient(-1deg, rgb(0, 0, 0) 2%, rgb(41, 41, 41) 98%)')
      } else if (!request && !state) {
        return String('linear-gradient(-1deg, #1991EB 2%, #2DA1F8 98%)')
      } else if (request !== state) {
        return String('linear-gradient(-1deg, rgb(0, 0, 0) 2%, rgb(41, 41, 41) 98%)')
      }
    }
  }

  onHandleSubmitMuckCardsState() {
    if (
      this.props.game.player
    ) {
      this.props.client.sendPlayerMuckCards(
        0,
        this.props.game.data.current_round,
        !this.props.game.player.p_muck_cards ? 1 : 0,
      )
    }
  }

  onHandleRenderMuckCardsState(pos) {
    if (pos === 1) {
      if (this.props.game.player.p_muck_cards) {
        return String('FaCheck')
      } else {
        return String('FaTimesCircle')
      }
    } else if (pos === 2) {
      if (this.props.game.player.p_muck_cards) {
        return String('linear-gradient(-1deg, rgb(0, 0, 0) 2%, rgb(41, 41, 41) 98%)')
      } else {
        return String('linear-gradient(-1deg, #1991EB 2%, #2DA1F8 98%)')
      }
    }
  }

  onHandleRenderDealerTip() {
    try {
      if (
        !this.props.game.data.game_started
      ) {
        if (
          this.props.game.data.current_round === GAME_ROUND_TYPE_NULL |
          this.props.game.data.current_round === GAME_ROUND_TYPE_SHOWDOWN
        ) {
          return (
            <span className="d-flex h-100 ml-1">
              <ButtonGroup size="sm" className="w-100">

                <div style={{ width: "inherit", }}>
                  <RSButton
                    size='medium'
                    value='Tip the Dealer'
                    background='linear-gradient(-1deg, #1991EB 2%, #2DA1F8 98%)'
                    color="#FFFFFF"
                    iconName='FaHeart'
                    iconSize={16}
                    onClick={() => { this.props.openFill(7) }}
                    className='w-100'
                    style={{
                      borderRadius: "15px 15px 0px 0px",
                      zIndex: "0",
                      height: "100%",
                    }} />
                </div>

              </ButtonGroup>
            </span>
          )
        }
      } else {
        if (
          this.props.game.player &&
          this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL |
          this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
        ) {
          return (
            <span className="d-flex h-100 ml-1">
              <ButtonGroup size="md" className="h-100">

                <div style={{ width: "inherit", }}>
                  <RSButton
                    size='medium'
                    value='Sit Out'
                    background={this.onHandleRenderSitOutState(2)}
                    color="#FFFFFF"
                    iconName={this.onHandleRenderSitOutState(1)}
                    iconSize={16}
                    onClick={e => this.onHandleSubmitSitOutState()}
                    className='w-100'
                    style={{
                      borderRadius: [3, 6].includes(this.state.size)
                        ? "15px 0px 0px 0px"
                        : "15px 15px 0px 0px",
                      zIndex: "0",
                      height: "100%",
                    }} />
                </div>

                {[3, 6].includes(this.state.size) && (
                  <div style={{ width: "inherit", }}>
                    <RSButton
                      size='medium'
                      value='Muck'
                      background={this.onHandleRenderMuckCardsState(2)}
                      color="#FFFFFF"
                      iconName={this.onHandleRenderMuckCardsState(1)}
                      iconSize={16}
                      onClick={e => this.onHandleSubmitMuckCardsState()}
                      className='w-100'
                      style={{
                        borderRadius: "0px 15px 0px 0px",
                        zIndex: "0",
                        height: "100%",
                      }} />
                  </div>
                )}

              </ButtonGroup>
            </span>
          )
        }
      }
    } catch { }
  }

  onRenderDealerTip() {
    try {
      if (
        !this.props.game.data.game_started
      ) {
        if (
          this.props.game.data.current_round === GAME_ROUND_TYPE_NULL |
          this.props.game.data.current_round === GAME_ROUND_TYPE_SHOWDOWN
        ) {
          return (

            <RSButton
              size='medium'
              value='Tip the Dealer'
              background='linear-gradient(-1deg, #1991EB 2%, #2DA1F8 98%)'
              color="#FFFFFF"
              iconName='FaHeart'
              iconSize={16}
              onClick={() => { this.props.openFill(7) }}
              className='w-100'
              style={{
                borderRadius: "15px 15px 0px 0px",
                zIndex: "0",
                height: "100%",
              }} />

          )
        }
      } else {
        if (
          this.props.game.player &&
          this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL |
          this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
        ) {
          return (

            <RSButton
              size='medium'
              value='Tip the Dealer'
              background='linear-gradient(-1deg, #1991EB 2%, #2DA1F8 98%)'
              color="#FFFFFF"
              iconName='FaHeart'
              iconSize={16}
              onClick={() => { this.props.openFill(7) }}
              className='w-100'
              style={{
                borderRadius: "15px 15px 0px 0px",
                zIndex: "0",
                height: "100%",
              }} />

          )
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
        {this.state.init && this.props.game.player
          ? <>
            {/* Player State Playing */}
            <Row>
              <Col>
                <div className="flex-grow-1 position-relative">
                  <span className="d-flex">
                    <ButtonGroup size="sm" className="w-100">
                      {this.onRenderDealerTip()}
                    </ButtonGroup>
                  </span>
                </div>
              </Col>
            </Row>
            {/* / Player State Playing */}
          </>
          : <>
            {this.state.joinable
              ? <>
                {/* Player State Joinable */}
                <Row>
                  <Col>
                    <div className="flex-grow-1 position-relative">
                      <span className="d-flex">
                        <ButtonGroup size="sm" className="w-100">
                          <RSButton
                            size='medium'
                            value='Join Game'
                            background='linear-gradient(-1deg, #1991EB 2%, #2DA1F8 98%)'
                            color="#FFFFFF"
                            iconName='FaUserPlus'
                            iconSize={22}
                            onClick={() => { this.props.openFill(1) }}
                            className='w-100'
                            style={{
                              borderRadius: "15px 15px 0px 0px",
                              zIndex: "0",
                            }} />
                        </ButtonGroup>
                      </span>
                    </div>
                  </Col>
                </Row>
                {/* / Player State Joinable */}
              </>
              : <>
                {/* Player State No Seats */}
                <Row>
                  <Col>
                    <div className="flex-grow-1 position-relative">
                      <span className="d-flex">
                        <ButtonGroup size="sm" className="w-100">
                          <RSButton
                            size='medium'
                            value='No Seats'
                            background='linear-gradient(-180deg, #516173 3%, #3B4857 98%)'
                            color="#FFFFFF"
                            iconName='FaTimesCircle'
                            iconSize={22}
                            onClick={this.prevent}
                            className='w-100 card-item-drop-shadow-filter'
                            style={{
                              borderRadius: "15px 15px 0px 0px",
                              zIndex: "0",
                            }} />
                        </ButtonGroup>
                      </span>
                    </div>
                  </Col>
                </Row>
                {/* / Player State No Seats */}
              </>}
          </>}
      </>
    )
  }
}

export default PlayerStateDefault