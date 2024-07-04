import React, { Component } from 'react'
import { Badge, Card, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap'

import {
  CARD_MAP,
  DEALER_CARD_MAP,
} from '../../core/CardMap'

import {
  MSG_TYPE_DEALER_START_SHUFFLE_LIVE_TRUE,
  MSG_TYPE_DEALER_RESUME_GAME,
  MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA,
  MSG_TYPE_DEALER_RECEIVE_NEW_CARD,
  MSG_TYPE_DEALER_RECEIVE_NEW_DEALER_NAME,
  MSG_TYPE_DEALER_RECEIVE_NEW_STATUS,
  MSG_TYPE_DEALER_NEXT_PLAYER,
  MSG_TYPE_DEALER_HARD_RESET,
  MSG_TYPE_DEALER_DISCONNECT_ALL,
} from '../../core/DealerActionTypes'

import {
  DEALER_CARD_MAP_LIVE_INPUT_DP,
  DEALER_CARD_MAP_LIVE_INPUT_RD,
  DEALER_CARD_MAP_LIVE_INPUT_RE,
  DEALER_CARD_MAP_LIVE_INPUT_RG,
  DEALER_CARD_MAP_LIVE_INPUT_SD,
  DEALER_CARD_MAP_LIVE_INPUT_SP,
} from '../../core/DealerCardInputTypes'

import {
  GAME_ROUND_TYPE_NULL,
  GAME_ROUND_TYPE_INIT,
  GAME_ROUND_TYPE_PREFLOP,
  GAME_ROUND_TYPE_FLOP,
  GAME_ROUND_TYPE_TURN,
  GAME_ROUND_TYPE_RIVER,
  GAME_ROUND_TYPE_SHOWDOWN,
} from '../../core/GameRoundTypes'

import DealerActionsButtonGroup from '../dealer/DealerActionsButtonGroup'
import DealerActionsDropdownMenu from '../dealer/DealerActionsDropdownMenu'
import DealerAutoResumeToggle from '../dealer/DealerAutoResumeToggle'
import DealerAutoSkip from '../dealer/DealerAutoSkip'
import DealerPanelHeader from '../dealer/DealerPanelHeader'
import DealerPanelNotifications from '../dealer/DealerPanelNotifications'
import DealerPanelStartup from '../dealer/DealerPanelStartup'
import DealerPanelStatus from '../dealer/DealerPanelStatus'
import DealerPanelUnavailable from '../dealer/DealerPanelUnavailable'
import DealerShuffleCountdown from '../../partials/DealerShuffleCountdown'

import {
  truncateUsername,
} from '../../utilities/TextPreprocessing'

import '../../../../../vendor/styles/pages/chat.scss'

class LiveCardsMonitor extends Component {

  constructor(props) {
    super(props)

    this.cache = this.shuffleCache(CARD_MAP)
    this.myInputRef = React.createRef()
    this.shuffleTimer = null

    this.refocus = this.refocus.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.getRandomInt = this.getRandomInt.bind(this)
    this.getRandomTestCard = this.getRandomTestCard.bind(this)

    this.sendRandomCardTest = this.sendRandomCardTest.bind(this)
    this.onHandleSubmitInput = this.onHandleSubmitInput.bind(this)
    this.onHandleReceiveInput = this.onHandleReceiveInput.bind(this)
    this.onHandleReceiveNewCard = this.onHandleReceiveNewCard.bind(this)
    this.onHandleToggleTestMode = this.onHandleToggleTestMode.bind(this)
    this.onHandleToggleAutoResume = this.onHandleToggleAutoResume.bind(this)
    this.onHandleTranslateRoundName = this.onHandleTranslateRoundName.bind(this)
    this.onHandleEvaluateGameStatus = this.onHandleEvaluateGameStatus.bind(this)
    this.onHandleEvaluateAutoResume = this.onHandleEvaluateAutoResume.bind(this)
    this.onHandleEvaluateBoardHints = this.onHandleEvaluateBoardHints.bind(this)
    this.onHandleEvaluateCurrentAction = this.onHandleEvaluateCurrentAction.bind(this)

    this.renderSeat = this.renderSeat.bind(this)
    this.getSeatCount = this.getSeatCount.bind(this)
    this.getSeatCountArr = this.getSeatCountArr.bind(this)

    this.state = {
      auth: false,
      auto: true,
      skip: true,
      debug: true,
      init: false,
      input: '',
      cseq: Array.from({ length: 5 }, (_) => null),
      hseq: {},
      chkpt: 0,
      shuffle: false,
    }

    window.addEventListener('click', this.refocus, false)
  }

  componentDidMount() {

    this.setState({
      auth: this.props.game.dealer,
    })

    try {
      if (this.props.game.data.game_started) {
        this.setState({
          init: false,
          cseq: Array.from({ length: 5 }, (_) => null),
          hseq: {},
        }, () => {
          this.cache = this.shuffleCache(CARD_MAP)
        })
      }
    } catch { }

    const element = document.getElementsByClassName('modal-content')[0]
    element.style['border-bottom-left-radius'] = "10px"
    element.style['border-bottom-right-radius'] = "10px"

    setTimeout(() => {
      try {
        this.myInputRef.current.focus()
      } catch { }
    }, 1)

  }

  componentDidUpdate(prevProps) {

    if (prevProps.game.cards !== this.props.game.cards) {
      if (this.props.game.cards) {
        this.setState({
          init: true,
        }, () => {
          this.onHandleReceiveNewCard()
        })
      } else {
        this.setState({
          init: false,
        })
      }
    }

    if (prevProps.game.evaluation !== this.props.game.evaluation) {
      this.setState({
        cseq: Array.from({ length: 5 }, (_) => null),
        hseq: {},
      }, () => {
        this.cache = this.shuffleCache(CARD_MAP)
      })
    }

    if (prevProps.game.shuffle !== this.props.game.shuffle) {
      this.setState({
        shuffle: true,
      }, () => {
        this.shuffleTimer = setTimeout(() => {
          this.setState({
            shuffle: false,
          })
        }, 16000)
      })
    }

  }

  componentWillUnmount() {
    clearInterval(this.shuffleTimer)
    window.removeEventListener('click', this.refocus, false)
  }

  refocus() {
    try {
      this.myInputRef.current.focus()
    } catch { }
  }

  sendMessage(action) {
    this.props.client.sendDealerAction(
      this.props.game.data.room_name,
      this.props.game.data.current_round,
      action,
      JSON.stringify([]),
    )
  }

  onHandleReceiveNewCard() {
    this.setState({
      cseq: this.props.game.cards.manifest.community_cards,
      hseq: this.props.game.cards.manifest.hole_cards,
    }, () => {
      this.onHandleEvaluateAutoResume()
    })
  }

  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  getRandomTestCard() {
    return String(this.cache.pop())
  }

  onHandleReceiveInput(e) {
    this.setState({
      input: e.target.value,
    })
  }

  sendRandomCardTest() {
    if (!this.state.shuffle) {
      if (
        !this.props.game.data.game_started &&
        this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
      ) {
        this.props.client.sendDealerAction(
          this.props.game.data.room_name,
          this.props.game.data.current_round,
          MSG_TYPE_DEALER_START_SHUFFLE_LIVE_TRUE,
          JSON.stringify(this.getRandomTestCard()),
        )
      } else if (
        this.props.game.data.game_started &&
        this.props.game.data.current_round === GAME_ROUND_TYPE_SHOWDOWN &&
        this.state.cseq.filter(x => x !== null).length === 5
      ) {
        this.sendMessage(MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA)
      } else {
        if (
          Object.keys(this.props.game.data.current_player).length === 0
        ) {
          this.props.client.sendDealerAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            MSG_TYPE_DEALER_RECEIVE_NEW_CARD,
            JSON.stringify(this.getRandomTestCard()),
          )
        } else if (
          Object.keys(this.props.game.data.current_player).length !== 0 &&
          this.props.game.data.current_round === GAME_ROUND_TYPE_SHOWDOWN
        ) {
          this.props.client.sendDealerAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            MSG_TYPE_DEALER_RECEIVE_NEW_CARD,
            JSON.stringify(this.getRandomTestCard()),
          )
        }
      }
    }
  }

  onHandleSubmitInput(target) {
    if (!this.state.shuffle) {
      if (target.charCode === 13) {
        let currentInput = String(this.state.input).replace('(', '*')
        this.setState({
          input: '',
        }, () => {
          if (CARD_MAP.includes(currentInput)) {
            if (
              !this.props.game.data.game_started &&
              this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
            ) {
              this.props.client.sendDealerAction(
                this.props.game.data.room_name,
                this.props.game.data.current_round,
                MSG_TYPE_DEALER_START_SHUFFLE_LIVE_TRUE,
                JSON.stringify(String(currentInput)),
              )
            } else if (
              this.props.game.data.game_started &&
              this.props.game.data.current_round === GAME_ROUND_TYPE_SHOWDOWN &&
              this.state.cseq.filter(x => x !== null).length === 5
            ) {
              this.sendMessage(MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA)
            } else {
              if (
                Object.keys(this.props.game.data.current_player).length === 0
              ) {
                this.props.client.sendDealerAction(
                  this.props.game.data.room_name,
                  this.props.game.data.current_round,
                  MSG_TYPE_DEALER_RECEIVE_NEW_CARD,
                  JSON.stringify(String(currentInput)),
                )
              } else if (
                Object.keys(this.props.game.data.current_player).length !== 0 &&
                this.props.game.data.current_round === GAME_ROUND_TYPE_SHOWDOWN
              ) {
                this.props.client.sendDealerAction(
                  this.props.game.data.room_name,
                  this.props.game.data.current_round,
                  MSG_TYPE_DEALER_RECEIVE_NEW_CARD,
                  JSON.stringify(String(currentInput)),
                )
              }
            }
          } else if (DEALER_CARD_MAP.includes(currentInput)) {
            switch (currentInput) {
              case DEALER_CARD_MAP_LIVE_INPUT_DP:
                this.sendMessage(MSG_TYPE_DEALER_DISCONNECT_ALL)
                break
              case DEALER_CARD_MAP_LIVE_INPUT_RD:
                this.sendMessage(MSG_TYPE_DEALER_DISCONNECT_ALL)
                break
              case DEALER_CARD_MAP_LIVE_INPUT_RE:
                this.sendMessage(MSG_TYPE_DEALER_RESUME_GAME)
                break
              case DEALER_CARD_MAP_LIVE_INPUT_RG:
                this.sendMessage(MSG_TYPE_DEALER_HARD_RESET)
                break
              case DEALER_CARD_MAP_LIVE_INPUT_SD:
                this.sendMessage(MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA)
                break
              case DEALER_CARD_MAP_LIVE_INPUT_SP:
                this.sendMessage(MSG_TYPE_DEALER_NEXT_PLAYER)
                break
              default:
                break
            }
          } else if (currentInput.startsWith('TB') || currentInput.startsWith('ER1')) {
            this.props.client.sendDealerAction(
              this.props.game.data.room_name,
              this.props.game.data.current_round,
              MSG_TYPE_DEALER_RECEIVE_NEW_STATUS,
              JSON.stringify(String(currentInput)),
            )
          } else {
            this.props.client.sendDealerAction(
              this.props.game.data.room_name,
              this.props.game.data.current_round,
              MSG_TYPE_DEALER_RECEIVE_NEW_DEALER_NAME,
              JSON.stringify(String(currentInput)),
            )
          }
        })
      }
    } else {
      this.setState({
        input: '',
      })
    }
  }

  getSeatCountArr() {
    if (this.props.game.data) {
      return Array.from({ length: this.props.game.data.max_players }, (_, i) => i + 1)
    } else {
      return Array.from({ length: 6 }, (_, i) => i + 1)
    }
  }

  getSeatCount() {
    if (this.props.game.data) {
      return Number(this.props.game.data.max_players)
    } else {
      return 6
    }
  }

  renderSeat(seat, index) {

    var username = null
    var users = this.props.game.data.users
    var item = users.find(x => x.p_seat === seat && !x.p_waiting)

    if (item) {
      username = item.p_username
    }

    if (username && Object.keys(this.state.hseq).includes(username)) {
      return (
        <Col key={index} xs={2} sm={2} md={2} lg={2} xl={2} className="p-0">
          <div className="d-flex justify-content-center mb-2">
            <span className="font-weight-bold small opacity-50">
              {truncateUsername(username)}
            </span>
          </div>
          <div className="d-flex justify-content-center">
            {this.state.hseq[username].map((card, index) =>
              <img
                key={index}
                src={`${process.env.PUBLIC_URL}/svg/cards/${card ? 'Z-CORRECT' : 'Z-ADD'}.svg`}
                className={`
                                d-block 
                                ui-w-50 
                                card-item-hover-translate
                                card-item-drop-shadow-filter
                                ${this.state.hseq[username].length === index + 1 ? "mr-0" : "mr-1"}
                                ${!card ? "dealer-svg-card-halo-fade-animation-1" : null}`}
                alt={card ? card : 'X'} />
            )}
          </div>
          <div className="d-flex justify-content-center mt-2 mb-0">
            <span className="font-weight-bold h4 mb-0">{seat}</span>
          </div>
        </Col>
      )
    } else {
      return (
        <Col key={index} xs={2} sm={2} md={2} lg={2} xl={2} className="p-0">
          <div className="d-flex justify-content-center mb-2">
            <span className="font-weight-bold small opacity-50">
              Empty
            </span>
          </div>
          <div className="d-flex justify-content-center">
            {['X', 'X'].map((card, index) =>
              <img
                key={index}
                src={`${process.env.PUBLIC_URL}/svg/cards/Z-EMPTY1.svg`}
                className={`
                                d-block 
                                ui-w-50 
                                card-item-drop-shadow-filter
                                opacity-50
                                ${['X', 'X'].length === index + 1 ? "mr-0" : "mr-1"}`}
                alt={card ? card : 'X'} />
            )}
          </div>
          <div className="d-flex justify-content-center mt-2 mb-0">
            <span className="font-weight-bold opacity-50 h4 mb-0">{seat}</span>
          </div>
        </Col>
      )
    }
  }

  onHandleTranslateRoundName(name) {
    switch (name) {
      case GAME_ROUND_TYPE_NULL:
        return String('Paused')
      case GAME_ROUND_TYPE_INIT:
        return String('Preflop')
      case GAME_ROUND_TYPE_PREFLOP:
        return String('Preflop')
      case GAME_ROUND_TYPE_FLOP:
        return String('Flop')
      case GAME_ROUND_TYPE_TURN:
        return String('Turn')
      case GAME_ROUND_TYPE_RIVER:
        return String('River')
      case GAME_ROUND_TYPE_SHOWDOWN:
        return String('Showdown')
      default:
        return String('N/A')
    }
  }

  onHandleEvaluateGameStatus(game) {
    if (game.data.game_started) {
      if (game.data.round_started) {
        return (
          <Badge
            pill variant="light"
            className="ml-0 font-weight-bold bg-player-panel-item-opacity-drop bg-dark">
            Game Started
          </Badge>
        )
      } else {
        return (
          <Badge
            pill variant="light"
            className="ml-0 font-weight-bold bg-player-panel-item-opacity-drop bg-dark">
            Ready...
          </Badge>
        )
      }
    } else {
      if (this.props.game.presence) {
        if (this.props.game.presence.joined_players >= 2) {
          return (
            <Badge
              pill variant="light"
              className="ml-0 font-weight-bold bg-player-panel-item-opacity-drop bg-dark">
              Start Game
            </Badge>
          )
        } else {
          return (
            <Badge
              pill variant="light"
              className="ml-0 font-weight-bold bg-player-panel-item-opacity-drop bg-dark">
              Waiting for players...
            </Badge>
          )
        }
      } else {
        return (
          <Badge
            pill variant="light"
            className="ml-0 font-weight-bold bg-player-panel-item-opacity-drop bg-dark">
            Unavailable
          </Badge>
        )
      }
    }
  }

  onHandleEvaluateAutoResume() {
    if (this.state.auto) {
      var checkpoints = [
        [1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
      ]
      var sdTrigger = [
        [1, 1, 1, 1, 1],
      ]
      var pattern = []
      Object.keys(this.props.game.cards.manifest.checkpoints)
        .forEach(item => pattern.push(this.props.game.cards.manifest.checkpoints[item] ? 1 : 0))
      if (
        checkpoints.some(a => pattern.every((v, i) => v === a[i])) &&
        this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
      ) {
        setTimeout(() => {
          this.sendMessage(MSG_TYPE_DEALER_RESUME_GAME)
        }, 100)
      }
      if (
        sdTrigger.some(a => pattern.every((v, i) => v === a[i])) &&
        this.props.game.data.current_round === GAME_ROUND_TYPE_SHOWDOWN
      ) {
        setTimeout(() => {
          this.sendMessage(MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA)
        }, 100)
      }
    }
  }

  onHandleEvaluateBoardHints(target, index) {
    if (target === 'COMMUNITY_CARDS') {
      switch (this.props.game.data.current_round) {
        case GAME_ROUND_TYPE_PREFLOP:
          return false
        case GAME_ROUND_TYPE_FLOP:
          if (index <= 2) {
            return true
          } else {
            return false
          }
        case GAME_ROUND_TYPE_TURN:
          if (index === 3) {
            return true
          } else {
            return false
          }
        case GAME_ROUND_TYPE_RIVER:
          if (index === 4) {
            return true
          } else {
            return false
          }
        default:
          return false
      }
    }
    return false
  }

  onHandleToggleAutoResume(field, value) {
    this.setState({
      [field]: value,
    })
  }

  onHandleToggleTestMode(field, value) {
    this.setState({
      [field]: value,
    })
  }

  onHandleEvaluateCurrentAction(game) {
    if (game.data.game_started) {
      if (
        Object.keys(this.state.hseq).length === 0
      ) {
        return (
          <Badge
            pill variant="light"
            className="bg-player-panel-item-opacity-drop bg-dark"
            style={{ verticalAlign: "middle", }}>
            Please scan the first card after the shuffle countdown
          </Badge>
        )
      } else if (
        Object.keys(this.state.hseq).length !== 0 &&
        Object.keys(game.data.current_player).length === 0
      ) {
        if (
          game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
        ) {
          return (
            <Badge
              pill variant="light"
              className="bg-player-panel-item-opacity-drop bg-dark"
              style={{ verticalAlign: "middle", }}>
              {`Prepare cards for ${this.onHandleTranslateRoundName(game.data.current_round)}`}
            </Badge>
          )
        } else {
          if (
            this.state.cseq.filter(x => x !== null).length === 5
          ) {
            return (
              <Badge
                pill variant="light"
                className="bg-player-panel-item-opacity-drop bg-dark"
                style={{ verticalAlign: "middle", }}>
                Scan a random card to trigger Showdown
              </Badge>
            )
          } else {
            return (
              <Badge
                pill variant="light"
                className="bg-player-panel-item-opacity-drop bg-dark"
                style={{ verticalAlign: "middle", }}>
                Prepare the final cards for Showdown
              </Badge>
            )
          }
        }
      } else if (
        Object.keys(this.state.hseq).length !== 0 &&
        Object.keys(game.data.current_player).length !== 0 &&
        game.data.current_round === GAME_ROUND_TYPE_SHOWDOWN
      ) {
        return (
          <Badge
            pill variant="light"
            className="bg-player-panel-item-opacity-drop bg-dark"
            style={{ verticalAlign: "middle", }}>
            Scan a random card to trigger Showdown or reset the Game
          </Badge>
        )
      } else {
        return (
          <Badge
            pill variant="light"
            className="bg-player-panel-item-opacity-drop bg-dark"
            style={{ verticalAlign: "middle", }}>
            {`${this.onHandleTranslateRoundName(game.data.current_round)} is running`}
          </Badge>
        )
      }
    } else {
      if (
        game.data.current_round === GAME_ROUND_TYPE_SHOWDOWN
      ) {
        if (
          this.state.cseq.filter(x => x !== null).length === 5
        ) {
          return (
            <Badge
              pill variant="light"
              className="bg-player-panel-item-opacity-drop bg-dark"
              style={{ verticalAlign: "middle", }}>
              Scan a random card to trigger Showdown
            </Badge>
          )
        } else {
          return (
            <Badge
              pill variant="light"
              className="bg-player-panel-item-opacity-drop bg-dark"
              style={{ verticalAlign: "middle", }}>
              Prepare the final cards for Showdown
            </Badge>
          )
        }
      } else {
        return (
          <Badge
            pill variant="light"
            className="bg-player-panel-item-opacity-drop bg-dark"
            style={{ verticalAlign: "middle", }}>
            Scan the first card to start a new live game
          </Badge>
        )
      }
    }
  }

  shuffleCache(array) {
    var arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.state.auth
          ? <>
            {/* Live Cards Monitor Modal */}
            <Modal.Body style={{
              borderLeftBottomRadius: "10px",
              borderRightBottomRadius: "10px",
            }}>
              <span className="d-flex align-items-center justify-content-between mb-3">
                {/* Dealer Panel Header */}
                <DealerPanelHeader
                  {...this.props}
                  refocus={this.refocus} />
                {/* / Dealer Panel Header */}

                {/* Dealer Input Panel */}
                <div className="d-flex">
                  {/* Dealer Game Actions Dropdown */}
                  <DealerAutoResumeToggle
                    {...this.props}
                    auto={this.state.auto}
                    change={this.onHandleToggleAutoResume}
                    refocus={this.refocus} />
                  {/* / Dealer Game Actions Dropdown */}

                  {/* Dealer Game Actions Dropdown */}
                  <DealerActionsDropdownMenu
                    {...this.props}
                    send={this.sendMessage}
                    refocus={this.refocus} />
                  {/* / Dealer Game Actions Dropdown */}

                  {/* Dealer Live Input */}
                  <div className="card-header-elements ml-auto">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text
                          className="font-weight-bold text-tiny">
                          Input
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        ref={this.myInputRef}
                        autoFocus
                        placeholder=""
                        value={this.state.input}
                        onChange={(e) => { this.onHandleReceiveInput(e) }}
                        onKeyPress={(e) => { this.onHandleSubmitInput(e) }} />
                    </InputGroup>
                  </div>
                  {/* / Dealer Live Input */}
                </div>
                {/* / Dealer Input Panel */}
              </span>

              {/* Dealer Status Panel */}
              <DealerPanelStatus
                {...this.props}
                status={this.onHandleEvaluateGameStatus}
                translate={this.onHandleTranslateRoundName}
                action={this.onHandleEvaluateCurrentAction}
                refocus={this.refocus} />
              {/* / Dealer Status Panel */}

              {/* Dealer Notifications Panel */}
              <DealerPanelNotifications
                {...this.props}
                refocus={this.refocus} />
              {/* / Dealer Notifications Panel */}

              {/* Dealer Main Panel */}
              {this.state.shuffle
                ? <DealerShuffleCountdown
                  {...this.props} {...this.state} />
                : <Card className="mb-3 bg-light border-0 p-5" style={{ borderRadius: "15px", }}>
                  {this.state.init
                    ? <>
                      {/* Dealer Live Cards */}
                      <Card className="d-flex w-100 mt-4 mb-4 bg-transparent border-0 shadow-none">
                        <Row className="mx-0 d-flex justify-content-center mb-5">
                          {this.getSeatCountArr()
                            .map((seat, index) => this.renderSeat(seat, index)
                            )}
                        </Row>

                        <Row className="mx-0 d-flex justify-content-center mb-2">
                          <div className="d-flex position-relative px-2">
                            {this.state.cseq.map((card, index) =>
                              <img
                                key={index}
                                src={`${process.env.PUBLIC_URL}/svg/cards/${card
                                  ? card
                                  : 'Z-ADD'}.svg`}
                                className={`
                                                                    d-block 
                                                                    ui-w-60 
                                                                    card-item-hover-translate 
                                                                    card-item-drop-shadow-filter
                                                                    ${this.state.cseq.length === index + 1
                                    ? "mr-0"
                                    : "mr-2"}
                                                                    ${this.onHandleEvaluateBoardHints('COMMUNITY_CARDS', index)
                                    ? "dealer-svg-card-halo-fade-animation-1"
                                    : "opacity-50"}`}
                                alt={card
                                  ? card
                                  : 'X'} />
                            )}
                          </div>
                        </Row>

                        <Row className="mx-0 d-flex justify-content-center">
                          <div className="font-weight-bold small opacity-50">
                            Community Cards
                          </div>
                        </Row>
                      </Card>
                      {/* / Dealer Live Cards */}
                    </>
                    : <>
                      {/* Dealer Startup Display */}
                      <DealerPanelStartup
                        {...this.props}
                        change={this.onHandleToggleTestMode}
                        debug={this.state.debug}
                        refocus={this.refocus} />
                      {/* / Dealer Startup Display */}
                    </>}
                </Card>}
              {/* / Dealer Main Panel */}

              <hr className="border-light m-0 pt-2 pb-2" />

              {/* Dealer Actions Button Group */}
              <DealerActionsButtonGroup
                {...this.props}
                debug={this.state.debug}
                send={this.sendMessage}
                refocus={this.refocus}
                random={this.sendRandomCardTest} />
              {/* / Dealer Actions Button Group */}

            </Modal.Body>
            {/* / Live Cards Monitor Modal */}

            <DealerAutoSkip
              {...this.props} {...this.state}
              autoSkip={this.state.skip} />
          </>
          : <>
            {/* Dealer Panel Unavailable Modal */}
            <DealerPanelUnavailable
              {...this.props} />
            {/* / Dealer Panel Unavailable Modal */}
          </>}
      </>
    )
  }
}

export default LiveCardsMonitor
