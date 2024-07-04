import React, { Component } from 'react'
import { Badge, Card, Col, Form, ProgressBar, Row } from 'react-bootstrap'

import {
  TRANS_CARD_MAP_ATOB,
  TRANS_CARD_MAP_BTOA,
} from '../core/CardMap'

import {
  POKER_SOLVER_HAND_HIGH_CARD,
  POKER_SOLVER_HAND_ONE_PAIR,
  POKER_SOLVER_HAND_TWO_PAIR,
  POKER_SOLVER_HAND_THREE_OF_A_KIND,
  POKER_SOLVER_HAND_STRAIGHT,
  POKER_SOLVER_HAND_FLUSH,
  POKER_SOLVER_HAND_FULL_HOUSE,
  POKER_SOLVER_HAND_FOUR_OF_A_KIND,
  POKER_SOLVER_HAND_STRAIGHT_FLUSH,
  POKER_SOLVER_HAND_ROYAL_FLUSH,
} from '../core/PokerHandSolverTypes'

import {
  GAME_ROUND_TYPE_NULL,
  GAME_ROUND_TYPE_SHOWDOWN,
} from '../core/GameRoundTypes'

import Hand from '../core/PokerHandSolver'

import '../../../../vendor/styles/pages/chat.scss'

class LivePokerSolver extends Component {

  constructor(props) {
    super(props)

    this.onHandleReset = this.onHandleReset.bind(this)
    this.onHandleSolvePokerHandLive = this.onHandleSolvePokerHandLive.bind(this)
    this.onHandleSolvePokerHandSystem = this.onHandleSolvePokerHandSystem.bind(this)

    this.state = {
      init: false,
      handName: '',
      handDescr: '',
      handHints: Array.from({ length: 5 }, (_) => 'X'),
    }
  }

  componentDidMount() {
    if (!this.props.game.data.game_started) {
      this.setState({
        init: false,
      })
    } else {
      if (this.props.game.player) {
        if (
          this.props.game.player.p_playing && !this.props.game.player.p_waiting &&
          this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL
        ) {
          if (this.props.game.data.live_mode) {
            if (this.props.game.cards) {
              this.setState({
                init: true,
              }, () => {
                this.onHandleSolvePokerHandLive()
              })
            }
          } else {
            if (
              this.props.game.player.p_hole_cards.length > 0 &&
              this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
              this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
            ) {
              this.setState({
                init: true,
              }, () => {
                this.onHandleSolvePokerHandSystem()
              })
            } else {
              this.setState({
                init: false,
              })
            }
          }
        } else {
          this.setState({
            init: false,
          })
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data !== this.props.game.data) {
      if (!this.props.game.data.game_started) {
        this.setState({
          init: false,
        })
      } else {
        if (this.props.game.player) {
          if (
            this.props.game.player.p_playing && !this.props.game.player.p_waiting &&
            this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL
          ) {
            if (this.props.game.data.live_mode) {
              if (this.props.game.cards) {
                this.setState({
                  init: true,
                }, () => {
                  this.onHandleSolvePokerHandLive()
                })
              }
            } else {
              if (
                this.props.game.player.p_hole_cards.length > 0 &&
                this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
                this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
              ) {
                this.setState({
                  init: true,
                }, () => {
                  this.onHandleSolvePokerHandSystem()
                })
              } else {
                this.setState({
                  init: false,
                })
              }
            }
          } else {
            this.setState({
              init: false,
            })
          }
        }
      }
    }
    if (prevProps.game.evaluation !== this.props.game.evaluation) {
      this.onHandleReset()
    }
    if (prevProps.game.shuffle !== this.props.game.shuffle) {
      this.onHandleReset()
    }
  }

  onHandleSolvePokerHandLive() {
    try {
      if (
        this.props.game.data &&
        this.props.game.player &&
        localStorage.getItem('user')
      ) {
        var hole = []
        var username = JSON.parse(localStorage.getItem('user')).user.username
        if (this.props.game.cards.manifest.hole_cards.hasOwnProperty(username)) {
          hole = this.props.game.cards.manifest.hole_cards[username]
        }
        var community = this.props.game.cards.manifest.community_cards
        var cards = []
        var cards_ = hole.concat(community)
        cards_.forEach((cid) => {
          if (TRANS_CARD_MAP_ATOB.hasOwnProperty(cid)) {
            cards.push(TRANS_CARD_MAP_ATOB[cid])
          }
        })
        var hints = []
        var result = Hand.solve(cards)
        if (result.cards) {
          switch (String(result.name)) {
            case POKER_SOLVER_HAND_HIGH_CARD:
              result.cards.slice(0, 1).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_ONE_PAIR:
              result.cards.slice(0, 2).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_TWO_PAIR:
              result.cards.slice(0, 4).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_THREE_OF_A_KIND:
              result.cards.slice(0, 3).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_STRAIGHT:
              result.cards.slice(0, 5).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_FLUSH:
              result.cards.slice(0, 5).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_FULL_HOUSE:
              result.cards.slice(0, 5).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_FOUR_OF_A_KIND:
              result.cards.slice(0, 4).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_STRAIGHT_FLUSH:
              result.cards.slice(0, 5).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_ROYAL_FLUSH:
              result.cards.slice(0, 5).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            default:
              break
          }
          this.setState({
            handName: result.name,
            handDescr: result.descr,
            handHints: hints,
          })
        }
      }
    } catch { }
  }

  onHandleSolvePokerHandSystem() {
    try {
      if (
        this.state.init &&
        this.props.game.data &&
        this.props.game.player
      ) {
        var cards = []
        var cards_ = this.props.game.player.p_hole_cards.concat(this.props.game.data.community_cards)
        cards_.forEach((cid) => {
          if (TRANS_CARD_MAP_ATOB.hasOwnProperty(cid)) {
            cards.push(TRANS_CARD_MAP_ATOB[cid])
          }
        })
        var hints = []
        var result = Hand.solve(cards)
        if (result.cards) {
          switch (String(result.name)) {
            case POKER_SOLVER_HAND_HIGH_CARD:
              result.cards.slice(0, 1).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_ONE_PAIR:
              result.cards.slice(0, 2).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_TWO_PAIR:
              result.cards.slice(0, 4).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_THREE_OF_A_KIND:
              result.cards.slice(0, 3).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_STRAIGHT:
              result.cards.slice(0, 5).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_FLUSH:
              result.cards.slice(0, 5).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_FULL_HOUSE:
              result.cards.slice(0, 5).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_FOUR_OF_A_KIND:
              result.cards.slice(0, 4).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_STRAIGHT_FLUSH:
              result.cards.slice(0, 5).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            case POKER_SOLVER_HAND_ROYAL_FLUSH:
              result.cards.slice(0, 5).forEach((cid) => {
                hints.push(this.getKeyByValue(TRANS_CARD_MAP_BTOA, cid.toString()))
              })
              break
            default:
              break
          }
          this.setState({
            handName: result.name,
            handDescr: result.descr,
            handHints: hints,
          })
        }
      }
    } catch { }
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
  }

  onHandleReset() {
    this.setState({
      handName: '',
      handDescr: '',
      handHints: Array.from({ length: 5 }, (_) => 'X'),
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Live Poker Solver Panel Header */}

        <Card
          className="bg-widget5 border-0 shadow-none p-2 mb-0 cursor-pointer"
          style={{
            borderRadius: "10px 10px 0px 0px",
            filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
            backdropFilter: `${this.props.settings.optionD12 ? "blur(4px)" : null}`,
          }}
          onClick={e => this.props.change('optionD3', !this.props.settings.optionD3)}>
          <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
            <span className="mb-0 font-weight-bold ml-1">
              <span className="d-flex align-items-center">
                <div>
                  <i className="fas fa-eye display-4" />
                </div>
                <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                  <div>
                    <div className="text-body text-big font-weight-bold" style={{
                      lineHeight: "0px",
                    }}>
                      Live Poker Hints
                      <Badge
                        pill variant="default"
                        className="font-weight-bold align-text-bottom ml-1 cursor-pointer"
                        onClick={() => { this.props.openSlide(2) }}>
                        Insights
                      </Badge>
                    </div>
                    <span
                      className="text-muted small mt-0 cursor-pointer font-weight-bold"
                      onClick={() => { this.props.openSlide(2) }}>
                      Open Live Poker Studio™ Insights
                    </span>
                  </div>
                </span>
              </span>
            </span>
            <Form.Label
              className="mb-0 font-weight-bold text-tiny cursor-pointer close-btn-opacity-animation align-self-baseline"
              onClick={e => this.props.change('optionD3', !this.props.settings.optionD3)}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                  <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                  <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                </svg>
              </span>
            </Form.Label>
          </span>
        </Card>
        {/* / Live Poker Solver Panel Header */}

        {/* Live Chat Panel Header Divider */}
        <ProgressBar
          className="solver-panel-opacity-animation-up"
          variant="danger"
          now={100}
          animated={true}
          style={{
            height: "4px",
            borderRadius: "0px",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }} />
        {/* / Live Chat Panel Header Divider */}

        {/* Live Poker Solver Panel Main */}
        <Card className="bg-widget3 border-0 shadow-none p-3 solver-panel-opacity-animation-up" style={{
          borderRadius: "0px 0px 10px 10px",
          backdropFilter: `${this.props.settings.optionD12 ? "blur(4px)" : null}`,
        }}>
          <span className="d-flex align-items-center justify-content-between bg-transparent">
            <Form.Label className="mb-2 font-weight-bold">
              Best Combination
            </Form.Label>
            <Form.Label className="mb-2 font-weight-bold">
              <Badge pill variant="default" className="font-weight-bold bg-player-panel-item-opacity-drop">
                {this.state.init ? this.state.handDescr ? this.state.handDescr : '' : ''}
              </Badge>
            </Form.Label>
          </span>

          <Row>
            <Col md={12}>
              <span className="d-flex align-items-center justify-content-between bg-transparent">

                {this.state.init
                  ? <div className="d-flex position-relative px-0 cursor-pointer">
                    {this.state.handHints.map((card, index) =>
                      <img
                        key={index}
                        src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                        className={`
                                                d-block
                                                ui-w-50
                                                card-hint-drop-shadow-filter
                                                card-item-hover-translate
                                                community-card-item-transform-animation
                                                ${this.state.handHints.length === index + 1 ? "mr-0" : "mr-1"}`}
                        alt={card} />
                    )}
                  </div>
                  : <div className="d-flex position-relative px-0 cursor-pointer">
                    {['X', 'X', 'X', 'X', 'X'].map((card, index) =>
                      <img
                        key={index}
                        src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                        className={`
                                                d-block
                                                ui-w-50
                                                card-hint-drop-shadow-filter
                                                card-item-hover-translate
                                                community-card-item-transform-animation
                                                ${['X', 'X', 'X', 'X', 'X'].length === index + 1 ? "mr-0" : "mr-1"}`}
                        alt={card} />
                    )}
                  </div>}

              </span>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={4}>
              <span className="d-flex align-items-center bg-transparent">
                <div className="d-flex position-relative px-0">
                  <span className="font-weight-bold small">
                    Combo Name
                  </span>
                </div>
              </span>
            </Col>
            <Col md={8}>
              <span className="d-flex align-items-center bg-transparent">
                <div className="d-flex position-relative px-0">
                  <span className="font-weight-bold small">
                    {this.state.init
                      ? this.state.handName
                        ? <Badge pill variant="default" className="font-weight-bold bg-player-panel-item-opacity-drop">
                          {this.state.handName}
                        </Badge>
                        : <Badge pill variant="default" className="font-weight-bold bg-player-panel-item-opacity-drop">
                          Waiting...
                        </Badge>
                      : <Badge pill variant="default" className="font-weight-bold bg-player-panel-item-opacity-drop">
                        Waiting...
                      </Badge>}
                  </span>
                </div>
              </span>
            </Col>
          </Row>

          <Row className="mt-0">
            <Col md={4}>
              <span className="d-flex align-items-center bg-transparent">
                <div className="d-flex position-relative px-0">
                  <span className="font-weight-bold small">
                    Details
                  </span>
                </div>
              </span>
            </Col>
            <Col md={8}>
              <span className="d-flex align-items-center bg-transparent">
                <div className="d-flex position-relative px-0">
                  <span className="font-weight-bold small">
                    {this.state.init
                      ? this.state.handDescr
                        ? <Badge pill variant="default" className="font-weight-bold bg-player-panel-item-opacity-drop">
                          {this.state.handDescr}
                        </Badge>
                        : <Badge pill variant="default" className="font-weight-bold bg-player-panel-item-opacity-drop">
                          Waiting...
                        </Badge>
                      : <Badge pill variant="default" className="font-weight-bold bg-player-panel-item-opacity-drop">
                        Waiting...
                      </Badge>}
                  </span>
                </div>
              </span>
            </Col>
          </Row>
        </Card>

        {/* / Live Poker Solver Panel Main */}
      </>
    )
  }
}

export default LivePokerSolver