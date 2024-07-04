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
  GAME_ROUND_TYPE_SHOWDOWN,
} from '../core/GameRoundTypes'

import Hand from '../core/PokerHandSolver'

import '../../../../vendor/styles/pages/chat.scss'

class SystemCardsHolder extends Component {

  constructor(props) {
    super(props)

    this.onHandleSolvePokerHand = this.onHandleSolvePokerHand.bind(this)

    this.state = {
      init: false,
      handName: '',
      handDescr: '',
      handHints: [],
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
            this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
            this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
          ) {
            if (this.props.game.player.p_hole_cards.length > 0) {
              this.setState({
                init: true,
              }, () => {
                this.onHandleSolvePokerHand()
              })
            } else {
              this.setState({
                init: false,
              })
            }
          } else {
            this.setState({
              init: false,
            })
          }
        }
      }
    }
  }

  onHandleSolvePokerHand() {
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

  onRenderBestHandPanel() {
    if (this.state.handName) {
      return (
        <>
          <Badge
            pill variant="default"
            className="bg-darker1 cursor-pointer"
            style={{ verticalAlign: "middle", }}>
            <span className="d-flex font-weight-bold">
              {this.state.handDescr}
            </span>
          </Badge>
          <Badge
            pill variant="default"
            className="bg-darker1 ml-1 cursor-pointer"
            style={{ verticalAlign: "middle", }}>
            <span className="d-flex font-weight-bold">
              {this.state.handName}
            </span>
          </Badge>
        </>
      )
    } else {
      return (
        <Badge
          pill
          variant="default"
          className="bg-darker1 cursor-pointer"
          style={{ verticalAlign: "middle", }}>
          <span className="d-flex font-weight-bold">
            Live Poker Studio™ Hints
          </span>
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
        {/* System Cards Holder */}
        <div className="flex-grow-1 position-relative">

          {this.props.game.player && this.state.init && this.state.handName && this.props.settings.optionD3 && (
            <div
              className="d-flex align-items-center justify-content-start">
              <div>
                <div className="font-weight-bold h5 mb-0">
                  {this.onRenderBestHandPanel()}
                </div>
              </div>
            </div>
          )}

          <span
            onClick={this.prevent}
            className={`list-group-item online d-flex px-0 py-0 bg-transparent pb-2`}
            style={{
              border: "0",
              justifyContent: `${this.state.init
                ? "space-between"
                : "center"}`,
            }}>

            {this.props.game.player && this.state.init && (
              <>
                <div
                  className="d-flex position-relative px-0 pt-0"
                  style={{
                    transform: "scale(0.8)",
                    transformOrigin: "left bottom",
                  }}>
                  {this.props.game.player.p_hole_cards.map((card, index) =>
                    <img
                      key={index}
                      src={`${process.env.PUBLIC_URL}/svg/${this.props.settings.optionD3
                        ? this.state.handHints.includes(card)
                          ? 'special/hints'
                          : 'cards'
                        : 'cards'}/${card}.svg`}
                      className={`
                        d-block 
                        ui-w-60 
                        cursor-pointer 
                        card-item-drop-shadow-filter
                        hole-card-item-transform-animation
                        ${this.props.game.player.p_hole_cards.length === index + 1
                          ? "mr-0"
                          : "mr-2"}`}
                      alt={card} />
                  )}
                </div>
              </>
            )}

            {this.props.game.data && (
              <>
                <div
                  className="d-flex position-relative px-0 pt-0"
                  style={{
                    transform: "scale(0.8)",
                    transformOrigin: "left bottom",
                  }}>
                  {this.props.game.data.community_cards.map((card, index) =>
                    <img
                      key={index}
                      src={`${process.env.PUBLIC_URL}/svg/${this.props.settings.optionD3
                        ? this.state.handHints.includes(card)
                          ? 'special/hints'
                          : 'cards'
                        : 'cards'}/${card}.svg`}
                      className={`
                        d-block 
                        ui-w-60
                        cursor-pointer 
                        card-item-drop-shadow-filter
                        card-item-hover-translate
                        community-card-item-transform-animation 
                        ${this.props.game.data.community_cards.length === index + 1
                          ? "mr-0"
                          : "mr-2"}`}
                      alt={card} />
                  )}
                </div>
              </>
            )}

          </span>
        </div>
        {/* / System Cards Holder */}
      </>
    )
  }
}

export default SystemCardsHolder