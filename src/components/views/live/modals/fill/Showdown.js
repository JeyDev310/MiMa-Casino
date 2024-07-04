import React, { Component } from 'react'
import { Badge, Card, Col, Form, Media, Modal, Row, Tab, Tabs } from 'react-bootstrap'

import moment from 'moment'

import {
  POKER_HAND_FLUSH,
  POKER_HAND_FOURCARD,
  POKER_HAND_FULLHOUSE,
  POKER_HAND_HIGHCARD,
  POKER_HAND_ONEPAIR,
  POKER_HAND_ROYALFLUSH,
  POKER_HAND_STRAIGHT,
  POKER_HAND_STRAIGHTFLUSH,
  POKER_HAND_THREECARD,
  POKER_HAND_TWOPAIR,
} from '../../core/PokerHands'

import {
  formatCapitalized,
  formatPrice,
  truncateUsername,
} from '../../utilities/TextPreprocessing'

import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'

import '../../../../../vendor/styles/pages/chat.scss'

class Showdown extends Component {

  constructor(props) {
    super(props)

    this.showdownTimer = 0

    this.getItemOpacity = this.getItemOpacity.bind(this)
    this.getEvaluationTotalPot = this.getEvaluationTotalPot.bind(this)
    this.getEvaluationDatetime = this.getEvaluationDatetime.bind(this)
    this.getEvaluationRoundName = this.getEvaluationRoundName.bind(this)
    this.getEvaluationCommunityCards = this.getEvaluationCommunityCards.bind(this)

    this.renderItemBestHand = this.renderItemBestHand.bind(this)
    this.renderCorrectPotName = this.renderCorrectPotName.bind(this)
    this.renderPotSummaryIcon = this.renderPotSummaryIcon.bind(this)
    this.renderPlayerBestHand = this.renderPlayerBestHand.bind(this)
    this.renderPlayerHoleCards = this.renderPlayerHoleCards.bind(this)
    this.renderPotContributors = this.renderPotContributors.bind(this)

    this.onHandleChangeKeepOpen = this.onHandleChangeKeepOpen.bind(this)   

    this.state = {
      init: false,
      keep: false,      
    }
  }

  componentDidMount() {
    if (this.props.game.evaluation) {
      this.setState({
        init: true,
      }, () => {
        if (this.props.settings.optionF1) {
          this.showdownTimer = setTimeout(() => {
            this.props.close()
          }, 10000)
        }
      })
    } else {
      this.setState({
        init: false,
      })
    }

    const element = document.getElementsByClassName('modal-content')[0]
    element.style['border-radius'] = "15px"
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.evaluation !== this.props.game.evaluation) {
      if (this.props.game.evaluation) {
        this.setState({
          init: true,
        })
      } else {
        this.setState({
          init: false,
        })
      }
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.showdownTimer)
  }

  getItemOpacity(item) {
    if (item.player_winner) return 1.0
    return 0.5
  }

  getEvaluationCommunityCards() {
    try {
      if (
        this.props.game.evaluation.winner_hand.hasOwnProperty('winner_hole_cards') &&
        this.props.game.evaluation.winner_hand.hasOwnProperty('winner_community_cards') &&
        this.props.game.evaluation.winner_hand.hasOwnProperty('winner_best_hand_hints_hc') &&
        this.props.game.evaluation.winner_hand.hasOwnProperty('winner_best_hand_hints_cc')
      ) {
        var muck = false
        if (
          this.props.game.evaluation.winner_hand.winner_enforced_muck
        ) {
          muck = true
        } else if (
          this.props.game.evaluation.winner_hand.winner_muck_cards &&
          this.props.game.evaluation.winner_hand.winner_enforced_muck
        ) {
          muck = true
        } else {
          muck = false
        }
        return (
          <>
            {muck
              ? <span className="d-flex showdown-cards-layout-s1">
                <span>
                  <span className="d-flex">
                    {this.props.game.evaluation.winner_hand.winner_community_cards
                      .map((card, index) =>
                        <img
                          key={index}
                          src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                          className={`
                            d-block 
                            card-size 
                            cursor-pointer 
                            card-item-drop-shadow-filter
                            ${this.props.game.evaluation.winner_hand.winner_community_cards.length === index + 1
                              ? "mr-0"
                              : "mr-1"}`}
                          alt={card} />
                      )}
                  </span>
                  <span className="small opacity-25 text-left font-weight-bold">
                    Community Cards
                  </span>
                </span>
              </span>
              : <span className="d-flex showdown-cards-layout-s1">
                <span className="mr-4">
                  <span className="d-flex">
                    {this.props.game.evaluation.winner_hand.winner_hole_cards
                      .map((card, index) =>
                        <img
                          key={index}
                          src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                          className={`
                            d-block 
                            card-size 
                            cursor-pointer 
                            card-item-drop-shadow-filter
                            ${this.props.game.evaluation.winner_hand.winner_best_hand_hints_hc.includes(card) && "card-hint-item-outline-animation"}
                            ${this.props.game.evaluation.winner_hand.winner_hole_cards.length === index + 1
                              ? "mr-0"
                              : "mr-1"}`}
                          alt={card} />
                      )}
                  </span>
                  <span className="small opacity-25 text-left font-weight-bold">
                    Winner Cards
                  </span>
                </span>
                <span>
                  <span className="d-flex">
                    {this.props.game.evaluation.winner_hand.winner_community_cards
                      .map((card, index) =>
                        <img
                          key={index}
                          src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                          className={`
                            d-block 
                            card-size 
                            cursor-pointer 
                            card-item-drop-shadow-filter
                            ${this.props.game.evaluation.winner_hand.winner_best_hand_hints_cc.includes(card) && "card-hint-item-outline-animation"}
                            ${this.props.game.evaluation.winner_hand.winner_community_cards.length === index + 1
                              ? "mr-0"
                              : "mr-1"}`}
                          alt={card} />
                      )}
                  </span>
                  <span className="small opacity-25 text-left font-weight-bold">
                    Community Cards
                  </span>
                </span>
              </span>}
          </>
        )
      } else {
        if (this.props.game.evaluation.winner_map.length > 0) {
          return (
            <span className="d-flex showdown-cards-layout-s1">
              <span className="d-flex">
                {this.props.game.evaluation.winner_map[0].game_community_cards
                  .map((card, index) =>
                    <img
                      key={index}
                      src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                      className={`
                        d-block 
                        card-size 
                        cursor-pointer 
                        card-item-drop-shadow-filter
                        ${this.props.game.evaluation.winner_map[0].game_community_cards.length === index + 1
                          ? "mr-0"
                          : "mr-1"}`}
                      alt={card} />
                  )}
              </span>
            </span>
          )
        }
      }
    } catch {
      return null
    }
  }

  getEvaluationRoundName(round) {
    if (round === 'INIT') return 'Preflop'
    return round
  }

  getEvaluationDatetime() {
    try {
      if (this.props.game.evaluation.winner_map.length > 0) {
        let started = moment(this.props.game.evaluation.winner_map[0].game_started).format('DD.MM.YYYY HH:mm:ss')
        let ended = moment(this.props.game.evaluation.winner_map[0].game_ended).format('DD.MM.YYYY HH:mm:ss')
        let round = formatCapitalized(this.getEvaluationRoundName(this.props.game.evaluation.winner_map[0].game_ended_in_round))
        return `Game started ${started} / Game ended ${ended} (in ${round})`
      }
    } catch {
      return null
    }
  }

  getEvaluationTotalPot() {
    try {
      if (this.props.game.evaluation.winner_map.length > 0) {
        let amount = this.props.game.evaluation.winner_map[0].game_total_pot
        return (<React.Fragment>{formatPrice(amount)}</React.Fragment>)
      }
    } catch {
      return (<React.Fragment>{formatPrice(0)}</React.Fragment>)
    }
  }

  renderPlayerBestHand(input) {
    switch (input) {
      case POKER_HAND_FLUSH:
        return (<Badge variant="dark" className="font-weight-bold bg-player-panel-item-opacity-drop">Flush</Badge>)
      case POKER_HAND_FOURCARD:
        return (<Badge variant="dark" className="font-weight-bold bg-player-panel-item-opacity-drop">Four Of A Kind</Badge>)
      case POKER_HAND_FULLHOUSE:
        return (<Badge variant="dark" className="font-weight-bold bg-player-panel-item-opacity-drop">Full House</Badge>)
      case POKER_HAND_HIGHCARD:
        return (<Badge variant="dark" className="font-weight-bold bg-player-panel-item-opacity-drop">High Card</Badge>)
      case POKER_HAND_ONEPAIR:
        return (<Badge variant="dark" className="font-weight-bold bg-player-panel-item-opacity-drop">One Pair</Badge>)
      case POKER_HAND_ROYALFLUSH:
        return (<Badge variant="dark" className="font-weight-bold bg-player-panel-item-opacity-drop">Royal Flush</Badge>)
      case POKER_HAND_STRAIGHT:
        return (<Badge variant="dark" className="font-weight-bold bg-player-panel-item-opacity-drop">Straight</Badge>)
      case POKER_HAND_STRAIGHTFLUSH:
        return (<Badge variant="dark" className="font-weight-bold bg-player-panel-item-opacity-drop">Straight Flush</Badge>)
      case POKER_HAND_THREECARD:
        return (<Badge variant="dark" className="font-weight-bold bg-player-panel-item-opacity-drop">Three Of A Kind</Badge>)
      case POKER_HAND_TWOPAIR:
        return (<Badge variant="dark" className="font-weight-bold bg-player-panel-item-opacity-drop">Two Pair</Badge>)
      default:
        return (<Badge variant="dark" className="font-weight-bold bg-player-panel-item-opacity-drop">{formatCapitalized(input)}</Badge>)
    }
  }

  renderItemBestHand(item) {
    if (item.player_winner) {
      if (item.player_best_hand.display) {
        if (
          item.player_best_hand.display === '' ||
          item.player_best_hand.display === null
        ) {
          return (
            <>| <Badge
              variant="dark"
              className="font-weight-bold bg-player-panel-item-opacity-drop">
              High Card
            </Badge>
            </>
          )
        } else {
          if (item.game_enforced_muck) {
            return (
              <>| <Badge
                variant="dark"
                className="font-weight-bold bg-player-panel-item-opacity-drop">
                Hidden
              </Badge>
              </>
            )
          } else if (item.player_muck_cards && item.game_enforced_muck) {
            return (
              <>| <Badge
                variant="dark"
                className="font-weight-bold bg-player-panel-item-opacity-drop">
                Hidden
              </Badge></>
            )
          } else {
            return (
              <>| {this.renderPlayerBestHand(item.player_best_hand.display)}</>
            )
          }
        }
      } else {
        return (
          <>| <Badge
            variant="dark"
            className="font-weight-bold bg-player-panel-item-opacity-drop">
            High Card
          </Badge>
          </>
        )
      }
    } else {
      return null
    }
  }

  renderCorrectPotName(name) {
    switch (name) {
      case 'mainpot_1':
        return 'Main Pot'
      case 'sidepot_1':
        return 'Main Pot'
      case 'sidepot_2':
        return 'Side Pot'
      case 'sidepot_3':
        return 'Side Pot'
      case 'sidepot_4':
        return 'Side Pot'
      case 'sidepot_5':
        return 'Side Pot'
      case 'sidepot_6':
        return 'Side Pot'
      case 'sidepot_7':
        return 'Side Pot'
      case 'sidepot_8':
        return 'Side Pot'
      case 'sidepot_9':
        return 'Side Pot'
      case 'return':
        return 'Return'
      default:
        return 'Unknown Pot'
    }
  }

  renderPotSummaryIcon(name) {
    if (name === 'return') {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9.60001 11H21C21.6 11 22 11.4 22 12C22 12.6 21.6 13 21 13H9.60001V11Z" fill="white" />
            <path d="M6.2238 13.2561C5.54282 12.5572 5.54281 11.4429 6.22379 10.7439L10.377 6.48107C10.8779 5.96697 11.75 6.32158 11.75 7.03934V16.9607C11.75 17.6785 10.8779 18.0331 10.377 17.519L6.2238 13.2561Z" fill="white" />
            <rect opacity="0.3" x="2" y="4" width="2" height="16" rx="1" fill="white" />
          </svg>
        </span>
      )
    } else {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="white" />
            <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="white" />
          </svg>
        </span>
      )
    }
  }

  renderPotContributors(contributors) {
    if (contributors.length > 0) {
      return (
        <>
          {contributors
            .filter((i) => i.contributor_amount > 0)
            .sort((a, b) => a.contributor_index - b.contributor_index)
            .map((item, index) =>
              <span key={index} className="mr-1">
                <span className="text-medium text-body">
                  <Badge pill variant="default" className="font-weight-bold">
                    <span className="font-weight-bold">
                      {truncateUsername(item.contributor_player)}
                    </span>
                    <span className="font-weight-semibold ml-1">
                      {formatPrice(item.contributor_amount)}
                    </span>
                  </Badge>
                </span>
              </span>
            )}
        </>
      )
    } else {
      return (
        <>
          <span>
            <i className="fas fa-user-alt-slash text-body ml-0"></i>
            <span className="text-medium font-weight-bold ml-1 text-body">
              No contributors
            </span>
          </span>
        </>
      )
    }
  }

  renderPlayerHoleCards(item) {
    if (item.player_winner) {
      if (item.game_enforced_muck) {
        return (
          <div className="d-flex position-relative">
            {Array.from({ length: 2 }, (_) => 'X').map((card, index) =>
              <img
                key={index}
                src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                className={`
                  d-block 
                  card-size 
                  cursor-pointer 
                  ${item.player_hole_cards.length === index + 1 ? "mr-0" : "mr-1"}
                  ${item.player_winner ? "hole-card-item-halo-animation" : null}
                  `}
                alt={card}
              />
            )}
          </div>
        )
      } else if (item.player_muck_cards && item.game_enforced_muck) {
        return (
          <div className="d-flex position-relative">
            {Array.from({ length: 2 }, (_) => 'X').map((card, index) =>
              <img
                key={index}
                src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                className={`
                  d-block 
                  card-size 
                  cursor-pointer 
                  ${item.player_hole_cards.length === index + 1 ? "mr-0" : "mr-1"}
                  ${item.player_winner && "hole-card-item-halo-animation"}
                  `}
                alt={card}
              />
            )}
          </div>
        )
      } else {
        return (
          <div className="d-flex position-relative">
            {item.player_hole_cards.map((card, index) =>
              <img
                key={index}
                src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                className={`
                  d-block 
                  card-size 
                  cursor-pointer 
                  ${item.player_hole_cards.length === index + 1 ? "mr-0" : "mr-1"}
                  ${item.player_winner && "hole-card-item-halo-animation"}
                  `}
                alt={card}
              />
            )}
          </div>
        )
      }
    } else {
      if (item.player_muck_cards) {
        return (
          <div className="d-flex position-relative">
            {Array.from({ length: 2 }, (_) => 'X').map((card, index) =>
              <img
                key={index}
                src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                className={`
                  d-block 
                  card-size 
                  cursor-pointer 
                  ${item.player_hole_cards.length === index + 1 ? "mr-0" : "mr-1"}
                  ${item.player_winner && "hole-card-item-halo-animation"}
                  `}
                alt={card}
              />
            )}
          </div>
        )
      } else {
        return (
          <div className="d-flex position-relative">
            {item.player_hole_cards.map((card, index) =>
              <img
                key={index}
                src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                className={`
                  d-block 
                  card-size 
                  cursor-pointer 
                  ${item.player_hole_cards.length === index + 1 ? "mr-0" : "mr-1"}
                  ${item.player_winner && "hole-card-item-halo-animation"}
                  `}
                alt={card}
              />
            )}
          </div>
        )
      }
    }
  }

  onHandleChangeKeepOpen(e) {
    this.setState({
      keep: e.target.checked,
    }, () => {
      if (this.state.keep) {
        clearTimeout(this.showdownTimer)
      } else {
        if (this.props.settings.optionF1) {
          this.showdownTimer = setTimeout(() => {
            this.props.close()
          }, 10000)
        }
      }
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.state.init
          ? <>
            {/* Showdown Modal */}
            <Modal.Body style={{
              borderRadius: "15px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              border: "2px solid rgba(9, 134, 169, 0.7)",
              padding: "0.7rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <div className="d-flex w-100 justify-content-end">
                <Form.Label
                  className="ml-3 mb-0 font-weight-bold text-tiny cursor-pointer"
                  style={{marginTop: "2px"}}
                  onClick={this.props.close}>
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="white"/>
                  </svg>
                  </span>
                </Form.Label>
              </div>
              <div className="text-white text-center" style={{fontSize: "24px", fontWeight: "800"}}>
                Showdown
              </div>

              <div className="my-2 fill-modal-hr fill-modal-mobile-hidden"/>

              <Card className="bg-light border-0 text-white mb-3 mt-2 fill-modal-container-width"
                style={{
                  borderRadius: "15px",                  
                }}>
                <Card.Body className="fill-modal-showdown-total-pot-container">
                  <div className="fill-modal-showdown-total-pot">
                    <div className="fill-modal-showdown-total-pot-value mr-2">
                      {this.getEvaluationTotalPot()}
                    </div>
                    <div className="opacity-75 fill-modal-showdown-total-pot-name">
                      TOTAL POT
                    </div>
                  </div>

                  <div className="fill-modal-showdown-card">
                    {this.getEvaluationCommunityCards()}
                  </div>
                </Card.Body>
              </Card>

              <div className="nav-tabs-top mb-3 fill-modal-container-width">
                <Tabs  className="showdown-tap" defaultActiveKey="gameSummary">
                  <Tab
                    eventKey="gameSummary"
                    title={<>
                      <span className="font-weight-bold small">
                        Game Summary
                      </span>
                    </>}>
                    <div className="flex-grow-1 position-relative fill-modal-showdown-gamesummary-container">

                      {this.props.game.evaluation.winner_map
                        .sort((a, b) => a.player_seat - b.player_seat)
                        .map((item, index) =>
                          <span
                            key={index}
                            onClick={this.prevent}
                            className="d-flex py-1 align-items-center border-0 bg-transparent fill-modal-showdown-summary"
                            style={{                              
                              border: "0px",
                              opacity: `${this.getItemOpacity(item)}`,
                            }}>

                            {/* Render Hole Cards */}
                            <div>
                              {this.renderPlayerHoleCards(item)}
                            </div>                            
                            {/* / Render Hole Cards */}

                            <Media.Body className="ml-3 align-items-start showdown-cards-layout-s2 d-flex flex-column" >
                              <span className="mb-1" style={{fontSize:"16px", fontWeight: "600", display: "inline",  whiteSpace: "nowrap"}}>
                                {item.player_seat} | {truncateUsername(item.player_username)} | {formatPrice(item.player_winner_pot_size)} <span className="fill-modal-showdown-best-hand-large">{this.renderItemBestHand(item)}</span>
                              </span>

                              <div className="mobile-flex" style={{fontWeight: "400", display: "inline",  whiteSpace: "nowrap"}}>
                                <div className="d-flex align-items-center">
                                  <i className="fas fa-coins text-body ml-0"></i>
                                  <span className="text-medium ml-1 text-body">
                                    Total Bet {formatPrice(item.player_total_bet)}
                                  </span>
                                </div>                               

                                {item.player_winner
                                  ? <>
                                    <i className="fas fa-trophy text-body"></i>
                                    <span className="text-medium ml-1 text-body">
                                      Potsize {formatPrice(item.player_winner_pot_size)}
                                    </span>
                                  </>
                                  : null
                                }
                              </div>
                            </Media.Body>

                            <div className="badge badge-light text-right" style={{ display: "grid", alignContent: "center", }}>
                              <h5 className="mb-1">
                                <span className="text-medium font-weight-bold ml-2 h5" style={{ verticalAlign: "middle", }}>
                                  {formatPrice(item.player_winner_payout)}
                                </span>
                              </h5>

                              {item.player_winner
                                ? <>
                                  <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
                                    Rake {formatPrice(item.player_winner_rake)}
                                  </span>
                                </>
                                : <>
                                  <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
                                    {formatPrice(item.player_winner_rake)}
                                  </span>
                                </>
                              }
                              <span className="fill-modal-showdown-best-hand-mobile">{this.renderItemBestHand(item)}</span>
                            </div>
                          </span>
                        )}

                    </div>
                  </Tab>

                  <Tab eventKey="potSummary" title={
                    <span className="font-weight-bold small">
                      Pot Summary
                    </span>
                  }>
                    <div className="flex-grow-1 position-relative px-3 py-4">

                      <Card.Body className="px-3 py-3 mb-2" style={{
                        borderRadius: "15px",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                      }}>
                        <div className="px-3 d-flex flex-wrap justify-content-between">
                          <div md={3} className="mb-0">
                            <div className="small">Total Pot</div>
                            <Badge pill variant="default" className="font-weight-bold" style={{ paddingTop: "0.3rem", }}>
                              {formatPrice(this.props.game.evaluation.pot_summary.pot_total)}
                            </Badge>
                          </div>
                          <div md={3} className="mb-0">
                            <div className="small">Rake</div>
                            <Badge pill variant="default" className="font-weight-bold" style={{ paddingTop: "0.3rem", }}>
                              {formatPrice(this.props.game.evaluation.pot_summary.rake_total)}
                            </Badge>
                          </div>
                          <div md={3} className="mb-0">
                            <div className="small">Datetime</div>
                            <Badge pill variant="default" className="font-weight-bold">
                              {moment(this.props.game.evaluation.pot_summary.updated_at).format("DD.MM.YYYY HH:mm")}
                            </Badge>
                          </div>
                          <div md={3} className="mb-0">
                            <div className="small">Final Round</div>
                            <Badge pill variant="default" className="font-weight-bold">
                              {formatCapitalized(this.getEvaluationRoundName(this.props.game.evaluation.winner_map[0].game_ended_in_round))}
                            </Badge>
                          </div>
                        </div>
                      </Card.Body>

                      <Card.Body className="px-3 py-3" style={{
                        borderRadius: "15px",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                      }}>
                        {this.props.game.evaluation.pot_summary.details
                          .filter(i => i.pot_size > 0)
                          .sort((a, b) => a.pot_index - b.pot_index)
                          .map((item, index) =>
                            <span
                              key={index}
                              onClick={this.prevent}
                              className={`d-flex list-group-item list-group-item-action online border-0 bg-transparent py-2`}
                              style={{ border: "0px", opacity: "1.0", }}>

                              <div className="d-flex position-relative align-items-center">
                                {this.renderPotSummaryIcon(item.pot_name)}
                              </div>

                              <Media.Body className="ml-3" style={{ display: "grid", alignContent: "center", }}>
                                <span className="text-medium font-weight-bolder h6 mb-1">
                                  {this.renderCorrectPotName(item.pot_name)}
                                </span>

                                <div className="chat-status small text-body font-weight-bold">
                                  {this.renderPotContributors(item.pot_contributions)}
                                </div>
                              </Media.Body>

                              <div className="badge badge-light text-right" style={{ display: "grid", alignContent: "center", }}>
                                <h5 className="mb-1">
                                  <Badge pill variant="default" className="font-weight-bold">
                                    <span className="text-medium font-weight-bold h5 mb-0" style={{ verticalAlign: "middle", }}>
                                      {formatPrice(item.pot_size)}
                                    </span>
                                  </Badge>
                                </h5>
                              </div>
                            </span>
                          )}
                      </Card.Body>

                    </div>
                  </Tab>
                </Tabs>
              </div>

              {/* <div className="text-white opacity-50 small font-weight-bold mb-3 d-flex justify-content-between fill-modal-showdown-best-hand-large" style={{width: "85%"}}>
                <span className="d-flex align-items-center showdown-text-layout-s1">
                  {this.getEvaluationDatetime()}
                </span>

                <span>
                  <div className="d-flex align-items-center showdown-text-layout-s1">
                    <Form.Label className="mb-0">
                      <span>Keep Open</span>
                    </Form.Label>
                    <label className="switcher switcher-sm ml-2 mr-0">
                      <input
                        type="checkbox"
                        className="switcher-input"
                        checked={this.state.keep}
                        disabled={false}
                        onChange={(e) => { this.onHandleChangeKeepOpen(e) }} />
                      <span className="switcher-indicator">
                        <span className="switcher-yes"></span>
                        <span className="switcher-no"></span>
                      </span>
                    </label>
                  </div>
                </span>
              </div> */}

              {/* <hr className="border-light m-0 py-2" /> */}
              
                {this.props.game.dealer
                  ? 
                  <div                     
                    onClick={this.props.close}
                    className="my-3 d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                    style={{ height:"32px", borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                    ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "14px", fontWeight: "800"}}>Accept</div></div>
                  </div>
                  : 
                  <div                     
                    onClick={() => { this.props.openFill(7) }}
                    className="my-3 d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                    style={{height:"32px",borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                    ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "14px", fontWeight: "800"}}>Tip the Dealer</div></div>
                  </div>
                }              
            </Modal.Body>
            {/* / Showdown Modal */}
          </>
          : <>
            {/* Showdown Modal */}
            <Modal.Body style={{
              borderRadius: "15px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              border: "2px solid rgba(9, 134, 169, 0.7)",
              padding: "0.7rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <div className="d-flex w-100 justify-content-end">
                <Form.Label
                  className="ml-3 mb-0 font-weight-bold text-tiny cursor-pointer"
                  style={{marginTop: "2px"}}
                  onClick={this.props.close}>
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="white"/>
                  </svg>
                  </span>
                </Form.Label>
                </div>
              <div className="text-white text-center" style={{fontSize: "24px", fontWeight: "800"}}>
                Showdown
              </div>
              <div className=" my-2 fill-modal-hr fill-modal-mobile-hidden"/>

              <Card className="d-flex w-100 mb-3 bg-transparent border-0 shadow-none mt-2" style={{
                borderRadius: "15px",
              }}>
                <Row noGutters className="h-100 border-0 bg-transparent justify-content-center">
                  <Col sm={12} md={12} lg={12} className="d-flex align-items-center justify-content-center border-0 shadow-none my-4">
                    <ResourceLoaderB
                      height="4rem" width="4rem" />
                  </Col>

                  <div className={`text-center text-white opacity-100 mb-3`}>
                    Showdown data currently not available...
                  </div>

                  <div className="text-center text-white opacity-50 text-tiny mb-0">
                    Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                  </div>
                </Row>
              </Card>

              {/* <hr className="border-light m-0 py-2" /> */}
              <div                     
                onClick={this.props.close}
                className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Accept</div></div>
              </div>
            </Modal.Body>
            {/* / Showdown Modal */}
          </>}
      </>
    )
  }
}

export default Showdown