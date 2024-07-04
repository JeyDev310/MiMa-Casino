import React, { Component } from 'react'
import { Badge } from 'react-bootstrap'

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
} from '../core/GameRoundTypes'

import Hand from '../core/PokerHandSolver'

import '../../../../vendor/styles/pages/chat.scss'

class LiveCardsHolder extends Component {

  constructor(props) {
    super(props)

    this.deferredReveal = null
    this.onHandleResetManifest = this.onHandleResetManifest.bind(this)
    this.onRenderBestHandPanel = this.onRenderBestHandPanel.bind(this)
    this.onHandleSolvePokerHand = this.onHandleSolvePokerHand.bind(this)

    this.state = {
      init: false,
      cseq: [],
      hseq: [],
      handName: '',
      handHints: [],
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data !== this.props.game.data) {
      if (!this.props.game.data.game_started) {
        this.setState({ init: false })
      } else {
        if (this.props.game.player) {
          if (
            this.props.game.player.p_playing && !this.props.game.player.p_waiting &&
            this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL
          ) {
            this.setState({ init: true })
          } else {
            this.setState({ init: false })
          }
        }
      }
    }

    if (prevProps.game.cards !== this.props.game.cards) {
      if (localStorage.getItem('user')) {
        if (this.props.game.cards) {
          var hproxy = []
          var username = JSON.parse(localStorage.getItem('user')).user.username
          if (this.props.game.cards.manifest.hole_cards.hasOwnProperty(username)) {
            hproxy = this.props.game.cards.manifest.hole_cards[username]
          }
          this.deferredReveal = setTimeout(() => {
            this.setState({
              cseq: this.props.game.cards.manifest.community_cards,
              hseq: hproxy,
            }, () => {
              this.onHandleSolvePokerHand()
            })
          }, 150)
        } else {
          this.setState({ cseq: [], hseq: [] })
        }
      } else {
        this.props.exit()
      }
    }

    if (prevProps.game.evaluation !== this.props.game.evaluation) {
      this.onHandleResetManifest()
    }
  }

  componentWillUnmount() {
    clearInterval(this.deferredReveal)
  }

  onHandleResetManifest() {
    this.setState({
      cseq: [],
      hseq: [],
    })
  }

  onHandleSolvePokerHand() {
    try {
      if (
        this.props.game.data &&
        this.props.game.player
      ) {
        var cards = []
        var cards_ = this.state.hseq.concat(this.state.cseq)
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

  getHoleCardClassNamesByValue(card) {
    if (card === null) {
      return "d-block ui-w-60 cursor-pointer card-item-drop-shadow-filter community-card-x-pop-up-animation mr-2"
    } else {
      return "d-block ui-w-60 cursor-pointer card-item-drop-shadow-filter community-card-item-pop-up-animation mr-2"
    }
  }

  getCommunityCardClassNamesByValue(card) {
    if (card === null) {
      return "d-block card-size cursor-pointer card-item-drop-shadow-filter community-card-x-pop-up-animation mr-2"
    } else {
      return "d-block card-size cursor-pointer card-item-drop-shadow-filter community-card-item-pop-up-animation mr-2"
    }
  }

  onRenderBestHandPanel() {
    if (this.state.handName) {
      return (
        <>
          <Badge
            pill variant="default"
            className="bg-darker1 cursor-pointer"
            style={{ verticalAlign: "middle", }}>
            <span className="d-flex font-weight-bold">
              <i className="fas fa-star" />
              <span className="ml-2">{this.state.handDescr}</span>
            </span>
          </Badge>

          <Badge
            pill variant="default"
            className="bg-darker1 ml-1 cursor-pointer"
            style={{ verticalAlign: "middle", }}>
            <span className="d-flex font-weight-bold">{this.state.handName}</span>
          </Badge>
        </>
      )
    } else {
      return (
        <Badge
          pill variant="default"
          className="bg-darker1 cursor-pointer"
          style={{ verticalAlign: "middle", }}>
          <span className="d-flex font-weight-bold">Live Poker Studio™ Hints</span>
        </Badge>
      )
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Live Cards Holder */}
        <div className="position-relative">

          {/* {this.state.init && this.state.handName && this.props.settings.optionD3 && this.state.hseq.length >= 2 && (
            <div className="d-flex align-items-center justify-content-start">
              <div>
                <div className="font-weight-bold h4 mb-0">
                  {this.onRenderBestHandPanel()}
                </div>
              </div>
            </div>
          )} */}

          <div
            onClick={this.prevent}
            className="d-flex px-0 py-0 bg-transparent"
            style={{
              marginLeft: "0.5rem",
              border: "0",
              justifyContent: `${this.state.hseq.length > 0
                ? "space-between"
                : "center"}`,
            }}>

            {/* {this.props.game.player && this.state.hseq && !this.props.game.player.p_sit_out && (
              <>
                <div
                  className="d-flex position-relative px-0 pt-0"
                  style={{
                    transform: "scale(0.8)",
                    transformOrigin: "left bottom",
                  }}>
                  {this.state.hseq.map((card, index) =>
                    <img
                      key={index}
                      src={`${process.env.PUBLIC_URL}/svg/${this.props.settings.optionD3
                        ? this.state.handHints.includes(card) ? 'special/hints' : 'cards' : 'cards'}/${card ? card : 'X'}.svg`}
                      className={this.getHoleCardClassNamesByValue(card)}
                      alt={card ? card : 'X'}
                    />
                  )}
                </div>
              </>
            )} */}

            {this.state.cseq && (
              <>
                <div
                  className="d-flex position-relative px-0 pt-0"
                  style={{
                    transform: "scale(0.8, 0.8)",
                    // transformOrigin: "left bottom",
                  }}>
                  {this.state.cseq.map((card, index) =>
                    <img
                      key={index}
                      src={`${process.env.PUBLIC_URL}/svg/${this.props.settings.optionD3
                        ? this.state.handHints.includes(card) ? 'special/hints' : 'cards' : 'cards'}/${card ? card : 'X'}.svg`}
                      className={this.getCommunityCardClassNamesByValue(card)}
                      alt={card ? card : 'X'}
                    />
                  )}
                </div>
              </>
            )}

          </div>
        </div>
        {/* / Live Cards Holder */}
      </>
    )
  }
}

export default LiveCardsHolder
