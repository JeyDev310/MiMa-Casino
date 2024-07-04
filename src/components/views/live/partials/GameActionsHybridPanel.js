import React, { Component } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'

import {
  GAME_ACTION_TYPE_BET,
  GAME_ACTION_TYPE_CHECK,
  GAME_ACTION_TYPE_BIG_BLIND_CHECK,
  GAME_ACTION_TYPE_CALL,
  GAME_ACTION_TYPE_FOLD,
  GAME_ACTION_TYPE_ALL_IN,
  GAME_ACTION_TYPE_NO_ACTION,
  GAME_ACTION_TYPE_EXIT,
} from '../core/GameActionTypes'

import {
  GAME_ROUND_TYPE_NULL,
  GAME_ROUND_TYPE_SHOWDOWN,
} from '../core/GameRoundTypes'

import {
  SYNC_TYPE_ACTIONS_PANEL_NULL,
  SYNC_TYPE_ACTIONS_PANEL_DISABLED,
  SYNC_TYPE_ACTIONS_PANEL_SHOWDOWN,
  SYNC_TYPE_ACTIONS_PANEL_CHECKABLE_FB,
  SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE_FB,
  SYNC_TYPE_ACTIONS_PANEL_BIG_BLIND_CHECKABLE,
  SYNC_TYPE_ACTIONS_PANEL_CHECKABLE_LOW_BALANCE,
  SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE_LOW_BALANCE,
  SYNC_TYPE_ACTIONS_PANEL_CHECKABLE,
  SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE,
} from '../core/SyncTypes'

import BetModal from '../modals/panel/BetModal'
import RaiseModal from '../modals/panel/RaiseModal'
import ResourceLoaderM from '../../utilities/loaders/ResourceLoaderM'

import { formatPrice } from '../utilities/TextPreprocessing'

import '../../../../vendor/styles/pages/chat.scss'

class GameActionsPanel extends Component {

  constructor(props) {
    super(props)

    this.renderGameActions = this.renderGameActions.bind(this)
    this.renderGameActionsDefault = this.renderGameActionsDefault.bind(this)

    this.renderGameActionBet = this.renderGameActionBet.bind(this)
    this.renderGameActionCheck = this.renderGameActionCheck.bind(this)
    this.renderGameActionBBCheck = this.renderGameActionBBCheck.bind(this)
    this.renderGameActionRaise = this.renderGameActionRaise.bind(this)
    this.renderGameActionCall = this.renderGameActionCall.bind(this)
    this.renderGameActionFold = this.renderGameActionFold.bind(this)
    this.renderGameActionAllIn = this.renderGameActionAllIn.bind(this)
    this.renderGameActionNoAction = this.renderGameActionNoAction.bind(this)
    this.renderGameActionExit = this.renderGameActionExit.bind(this)
    this.renderGameActionWaiting = this.renderGameActionWaiting.bind(this)
    this.renderGameActionNextTurn = this.renderGameActionNextTurn.bind(this)
    this.renderGameActionReBuy = this.renderGameActionReBuy.bind(this)
    this.renderGameActionSitOut = this.renderGameActionSitOut.bind(this)
    this.renderGameActionsHybrid = this.renderGameActionsHybrid.bind(this)

    this.onHandleSendMessage = this.onHandleSendMessage.bind(this)
    this.onHandleRefreshSync = this.onHandleRefreshSync.bind(this)
    this.onHandleEvaluateSync = this.onHandleEvaluateSync.bind(this)
    this.onHandleEvaluateAutoActions = this.onHandleEvaluateAutoActions.bind(this)

    this.state = {
      init: false,
      currentRound: null,
      currentPlayer: false,
      currentActionSet: null,
      timer: false,
    }
  }

  componentDidMount() {
    this.onHandleRefreshSync()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.synced !== this.props.game.synced) {
      this.onHandleRefreshSync()
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
    if (this.state.currentPlayer) {
      this.setState({
        init: true,
      }, () => {
        this.onHandleEvaluateAutoActions()
      })
    } else {
      this.setState({
        init: false,
      })
    }
  }

  onHandleSendMessage(action) {
    this.props.client.sendGameAction(
      this.props.game.data.room_name,
      this.props.game.data.current_round,
      action,
      0,
    )
  }

  onHandleEvaluateAutoActions() {
    if (this.props.settings) {
      if (this.props.settings.optionA7) {
        if (this.props.game.data.current_round_checkable) {
          this.props.client.sendGameAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            GAME_ACTION_TYPE_BET,
            Number(parseFloat(this.props.game.data.current_game_values.table_big_blind).toFixed(2)),
          )
          if (this.props.settings.optionA6) {
            this.props.resetAuto()
          }
        }
      }
      if (this.props.settings.optionA8) {
        if (this.props.game.data.current_round_checkable) {
          this.onHandleSendMessage(GAME_ACTION_TYPE_CHECK)
          if (this.props.settings.optionA6) {
            this.props.resetAuto()
          }
        }
      }
      if (this.props.settings.optionA1) {
        if (this.props.game.data.current_round_checkable) {
          this.onHandleSendMessage(GAME_ACTION_TYPE_CHECK)
          if (this.props.settings.optionA6) {
            this.props.resetAuto()
          }
        } else {
          this.onHandleSendMessage(GAME_ACTION_TYPE_FOLD)
          if (this.props.settings.optionA6) {
            this.props.resetAuto()
          }
        }
      }
      if (this.props.settings.optionA4) {
        this.onHandleSendMessage(GAME_ACTION_TYPE_CALL)
        if (this.props.settings.optionA6) {
          this.props.resetAuto()
        }
      }
      if (this.props.settings.optionA2) {
        this.onHandleSendMessage(GAME_ACTION_TYPE_ALL_IN)
        if (this.props.settings.optionA6) {
          this.props.resetAuto()
        }
      }
      if (this.props.settings.optionA3) {
        this.onHandleSendMessage(GAME_ACTION_TYPE_FOLD)
        if (this.props.settings.optionA6) {
          this.props.resetAuto()
        }
      }
    }
  }

  renderGameActionBet() {
    return (
      <BetModal {...this.props} />
    )
  }

  renderGameActionCheck() {
    return (
      <Button
        size="md"
        className="my-0 ml-2 d-flex align-items-center border-0 shadow-none game-action-button-drop-shadow-filter"
        variant="light"
        style={{
          borderRadius: "15px",
        }}
        onClick={() => {
          this.props.client.sendGameAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            GAME_ACTION_TYPE_CHECK,
            0,
          )
        }}>
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect opacity="0.5" x="7" y="2" width="14" height="16" rx="3" fill="white" />
            <rect x="3" y="6" width="14" height="16" rx="3" fill="white" />
          </svg>
        </span>
        <span className="ml-2 font-weight-bold">Check</span>
      </Button>
    )
  }

  renderGameActionBBCheck() {
    return (
      <Button
        size="md"
        className="my-0 d-flex align-items-center border-0 shadow-none game-action-button-drop-shadow-filter"
        variant="light"
        style={{
          borderRadius: "15px",
        }}
        onClick={() => {
          this.props.client.sendGameAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            GAME_ACTION_TYPE_BIG_BLIND_CHECK,
            0,
          )
        }}>
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect opacity="0.5" x="7" y="2" width="14" height="16" rx="3" fill="white" />
            <rect x="3" y="6" width="14" height="16" rx="3" fill="white" />
          </svg>
        </span>
        <span className="ml-2 font-weight-bold">Check</span>
      </Button>
    )
  }

  renderGameActionRaise() {
    return (
      <RaiseModal {...this.props} />
    )
  }

  renderGameActionCall() {
    var callAmount = Number(0)
    try {
      if (
        this.props.game.data.current_game_values.raise_level > 0 &&
        this.props.game.data.current_game_values.raise_level <= this.props.game.player.p_balance_display
      ) {
        callAmount = Number(this.props.game.data.current_game_values.raise_level)
      }
    } catch { }
    return (
      <Button
        size="md"
        className="my-0 ml-2 d-flex align-items-center border-0 shadow-none game-action-button-drop-shadow-filter"
        variant="light"
        style={{
          borderRadius: "15px",
        }}
        onClick={() => {
          this.props.client.sendGameAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            GAME_ACTION_TYPE_CALL,
            0,
          )
        }}>
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path opacity="0.3" d="M8.70001 6C8.10001 5.7 7.39999 5.40001 6.79999 5.10001C7.79999 4.00001 8.90001 3 10.1 2.2C10.7 2.1 11.4 2 12 2C12.7 2 13.3 2.1 13.9 2.2C12 3.2 10.2 4.5 8.70001 6ZM12 8.39999C13.9 6.59999 16.2 5.30001 18.7 4.60001C18.1 4.00001 17.4 3.6 16.7 3.2C14.4 4.1 12.2 5.40001 10.5 7.10001C11 7.50001 11.5 7.89999 12 8.39999Z" fill="white" />
            <path d="M7 20C7 20.2 7 20.4 7 20.6C6.2 20.1 5.49999 19.6 4.89999 19C4.59999 18 4.00001 17.2 3.20001 16.6C2.80001 15.8 2.49999 15 2.29999 14.1C4.99999 14.7 7 17.1 7 20ZM10.6 9.89995C8.70001 8.09995 6.39999 6.89996 3.79999 6.29996C3.39999 6.89996 2.99999 7.49995 2.79999 8.19995C5.39999 8.59995 7.7 9.79996 9.5 11.6C9.8 10.9 10.2 10.3999 10.6 9.89995ZM2.20001 10.1C2.10001 10.7 2 11.4 2 12C2 12 2 12 2 12.1C4.3 12.4 6.40001 13.7 7.60001 15.6C7.80001 14.8 8.09999 14.0999 8.39999 13.3999C6.89999 11.5999 4.70001 10.4 2.20001 10.1ZM11 20C11 14 15.4 8.99996 21.2 8.09996C20.9 7.39996 20.6 6.79995 20.2 6.19995C13.8 7.49995 9 13.0999 9 19.8999C9 20.3999 9.00001 21 9.10001 21.5C9.80001 21.7 10.5 21.7999 11.2 21.8999C11.1 21.2999 11 20.7 11 20ZM19.1 19C19.4 18 20 17.2 20.8 16.6C21.2 15.8 21.5 15 21.7 14.1C19 14.7 16.9 17.1 16.9 20C16.9 20.2 16.9 20.4 16.9 20.6C17.8 20.2 18.5 19.6 19.1 19ZM15 20C15 15.9 18.1 12.6 22 12.1C22 12.1 22 12.1 22 12C22 11.3 21.9 10.7 21.8 10.1C16.8 10.7 13 14.9 13 20C13 20.7 13.1 21.2999 13.2 21.8999C13.9 21.7999 14.5 21.7 15.2 21.5C15.1 21 15 20.5 15 20Z" fill="white" />
          </svg>
        </span>
        <span className="ml-2 font-weight-bold">Call {callAmount > 0 ? formatPrice(callAmount) : null}</span>
      </Button>
    )
  }

  renderGameActionFold() {
    return (
      <Button
        size="md"
        className="my-0 ml-2 d-flex align-items-center border-0 shadow-none game-action-button-drop-shadow-filter"
        variant="light"
        style={{
          borderRadius: "15px",
        }}
        onClick={() => {
          this.props.client.sendGameAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            GAME_ACTION_TYPE_FOLD,
            0,
          )
        }}>
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
            <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
            <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
          </svg>
        </span>
        <span className="ml-2 font-weight-bold">Fold</span>
      </Button>
    )
  }

  renderGameActionAllIn() {
    return (
      <Button
        size="md"
        className="my-0 ml-2 d-flex align-items-center border-0 shadow-none game-action-button-drop-shadow-filter"
        variant="light"
        style={{
          borderRadius: "15px",
        }}
        onClick={() => {
          this.props.client.sendGameAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            GAME_ACTION_TYPE_ALL_IN,
            0,
          )
        }}>
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path opacity="0.3" d="M11.425 7.325C12.925 5.825 15.225 5.825 16.725 7.325C18.225 8.825 18.225 11.125 16.725 12.625C15.225 14.125 12.925 14.125 11.425 12.625C9.92501 11.225 9.92501 8.825 11.425 7.325ZM8.42501 4.325C5.32501 7.425 5.32501 12.525 8.42501 15.625C11.525 18.725 16.625 18.725 19.725 15.625C22.825 12.525 22.825 7.425 19.725 4.325C16.525 1.225 11.525 1.225 8.42501 4.325Z" fill="white" />
            <path d="M11.325 17.525C10.025 18.025 8.425 17.725 7.325 16.725C5.825 15.225 5.825 12.925 7.325 11.425C8.825 9.92498 11.125 9.92498 12.625 11.425C13.225 12.025 13.625 12.925 13.725 13.725C14.825 13.825 15.925 13.525 16.725 12.625C17.125 12.225 17.425 11.825 17.525 11.325C17.125 10.225 16.525 9.22498 15.625 8.42498C12.525 5.32498 7.425 5.32498 4.325 8.42498C1.225 11.525 1.225 16.625 4.325 19.725C7.425 22.825 12.525 22.825 15.625 19.725C16.325 19.025 16.925 18.225 17.225 17.325C15.425 18.125 13.225 18.225 11.325 17.525Z" fill="white" />
          </svg>
        </span>
        <span className="ml-2 font-weight-bold">All In</span>
      </Button>
    )
  }

  renderGameActionNoAction() {
    return (
      <Button
        size="md"
        className="my-0 ml-2 d-flex align-items-center border-0 shadow-none game-action-button-drop-shadow-filter"
        variant="light"
        style={{
          borderRadius: "15px",
        }}
        onClick={() => {
          this.props.client.sendGameAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            GAME_ACTION_TYPE_NO_ACTION,
            0,
          )
        }}>
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect opacity="0.5" x="7" y="2" width="14" height="16" rx="3" fill="white" />
            <rect x="3" y="6" width="14" height="16" rx="3" fill="white" />
          </svg>
        </span>
        <span className="ml-2 font-weight-bold">Check</span>
      </Button>
    )
  }

  renderGameActionExit() {
    return (
      <Button
        size="md"
        className="my-0 ml-2 d-flex align-items-center border-0 shadow-none game-action-button-drop-shadow-filter"
        variant="light"
        style={{
          borderRadius: "15px",
        }}
        onClick={() => {
          this.props.client.sendGameAction(
            this.props.game.data.room_name,
            this.props.game.data.current_round,
            GAME_ACTION_TYPE_EXIT,
            0,
          )
        }}>
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11 2.375L2 9.575V20.575C2 21.175 2.4 21.575 3 21.575H9C9.6 21.575 10 21.175 10 20.575V14.575C10 13.975 10.4 13.575 11 13.575H13C13.6 13.575 14 13.975 14 14.575V20.575C14 21.175 14.4 21.575 15 21.575H21C21.6 21.575 22 21.175 22 20.575V9.575L13 2.375C12.4 1.875 11.6 1.875 11 2.375Z" fill="white" />
          </svg>
        </span>
        <span className="ml-2 font-weight-bold">Leave Game</span>
      </Button>
    )
  }

  renderGameActionWaiting() {
    return (
      <Button
        size="md"
        className="my-0 d-flex align-items-center border-0 shadow-none game-action-button-drop-shadow-filter"
        variant="light"
        style={{
          borderRadius: "15px",
        }}
        disabled={true}>
        <ResourceLoaderM height="1.6rem" width="1.6rem" />
        <span className="ml-2 font-weight-bold">Waiting to play...</span>
      </Button>
    )
  }

  renderGameActionNextTurn() {
    return (
      <Button
        size="md"
        className="my-0 d-flex align-items-center border-0 shadow-none game-action-button-drop-shadow-filter"
        variant="light"
        style={{
          borderRadius: "15px",
        }}
        disabled={true}>
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12.6 7C12 7 11.6 6.6 11.6 6V3C11.6 2.4 12 2 12.6 2C13.2 2 13.6 2.4 13.6 3V6C13.6 6.6 13.2 7 12.6 7ZM10 7.59998C10.5 7.29998 10.6 6.69995 10.4 6.19995L9 3.80005C8.7 3.30005 8.10001 3.20002 7.60001 3.40002C7.10001 3.70002 7.00001 4.30005 7.20001 4.80005L8.60001 7.19995C8.80001 7.49995 9.1 7.69995 9.5 7.69995C9.7 7.69995 9.9 7.69998 10 7.59998ZM8 9.30005C8.3 8.80005 8.10001 8.20002 7.60001 7.90002L5.5 6.69995C5 6.39995 4.40001 6.59998 4.10001 7.09998C3.80001 7.59998 4 8.2 4.5 8.5L6.60001 9.69995C6.80001 9.79995 6.90001 9.80005 7.10001 9.80005C7.50001 9.80005 7.9 9.70005 8 9.30005ZM7.20001 12C7.20001 11.4 6.80001 11 6.20001 11H4C3.4 11 3 11.4 3 12C3 12.6 3.4 13 4 13H6.20001C6.70001 13 7.20001 12.6 7.20001 12Z" fill="white" />
            <path opacity="0.3" d="M17.4 5.5C17.4 6.1 17 6.5 16.4 6.5C15.8 6.5 15.4 6.1 15.4 5.5C15.4 4.9 15.8 4.5 16.4 4.5C17 4.5 17.4 5 17.4 5.5ZM5.80001 17.1L7.40001 16.1C7.90001 15.8 8.00001 15.2 7.80001 14.7C7.50001 14.2 6.90001 14.1 6.40001 14.3L4.80001 15.3C4.30001 15.6 4.20001 16.2 4.40001 16.7C4.60001 17 4.90001 17.2 5.30001 17.2C5.50001 17.3 5.60001 17.2 5.80001 17.1ZM8.40001 20.2C8.20001 20.2 8.10001 20.2 7.90001 20.1C7.40001 19.8 7.3 19.2 7.5 18.7L8.30001 17.3C8.60001 16.8 9.20002 16.7 9.70002 16.9C10.2 17.2 10.3 17.8 10.1 18.3L9.30001 19.7C9.10001 20 8.70001 20.2 8.40001 20.2ZM12.6 21.2C12 21.2 11.6 20.8 11.6 20.2V18.8C11.6 18.2 12 17.8 12.6 17.8C13.2 17.8 13.6 18.2 13.6 18.8V20.2C13.6 20.7 13.2 21.2 12.6 21.2ZM16.7 19.9C16.4 19.9 16 19.7 15.8 19.4L15.2 18.5C14.9 18 15.1 17.4 15.6 17.1C16.1 16.8 16.7 17 17 17.5L17.6 18.4C17.9 18.9 17.7 19.5 17.2 19.8C17 19.9 16.8 19.9 16.7 19.9ZM19.4 17C19.2 17 19.1 17 18.9 16.9L18.2 16.5C17.7 16.2 17.6 15.6 17.8 15.1C18.1 14.6 18.7 14.5 19.2 14.7L19.9 15.1C20.4 15.4 20.5 16 20.3 16.5C20.1 16.8 19.8 17 19.4 17ZM20.4 13H19.9C19.3 13 18.9 12.6 18.9 12C18.9 11.4 19.3 11 19.9 11H20.4C21 11 21.4 11.4 21.4 12C21.4 12.6 20.9 13 20.4 13ZM18.9 9.30005C18.6 9.30005 18.2 9.10005 18 8.80005C17.7 8.30005 17.9 7.70002 18.4 7.40002L18.6 7.30005C19.1 7.00005 19.7 7.19995 20 7.69995C20.3 8.19995 20.1 8.79998 19.6 9.09998L19.4 9.19995C19.3 9.19995 19.1 9.30005 18.9 9.30005Z" fill="white" />
          </svg>
        </span>
        <span className="ml-2 font-weight-bold">Waiting for the next turn...</span>
      </Button>
    )
  }

  renderGameActionReBuy() {
    return (
      <Button
        size="md"
        className="my-0 d-flex align-items-center border-0 shadow-none game-action-button-drop-shadow-filter"
        variant="light"
        style={{
          borderRadius: "15px",
        }}>
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path opacity="0.3" d="M3.20001 5.91897L16.9 3.01895C17.4 2.91895 18 3.219 18.1 3.819L19.2 9.01895L3.20001 5.91897Z" fill="white" />
            <path opacity="0.3" d="M13 13.9189C13 12.2189 14.3 10.9189 16 10.9189H21C21.6 10.9189 22 11.3189 22 11.9189V15.9189C22 16.5189 21.6 16.9189 21 16.9189H16C14.3 16.9189 13 15.6189 13 13.9189ZM16 12.4189C15.2 12.4189 14.5 13.1189 14.5 13.9189C14.5 14.7189 15.2 15.4189 16 15.4189C16.8 15.4189 17.5 14.7189 17.5 13.9189C17.5 13.1189 16.8 12.4189 16 12.4189Z" fill="white" />
            <path d="M13 13.9189C13 12.2189 14.3 10.9189 16 10.9189H21V7.91895C21 6.81895 20.1 5.91895 19 5.91895H3C2.4 5.91895 2 6.31895 2 6.91895V20.9189C2 21.5189 2.4 21.9189 3 21.9189H19C20.1 21.9189 21 21.0189 21 19.9189V16.9189H16C14.3 16.9189 13 15.6189 13 13.9189Z" fill="white" />
          </svg>
        </span>
        <span className="ml-2 font-weight-bold">Re-Buy</span>
      </Button>
    )
  }

  renderGameActionSitOut() {
    return (
      <Button
        size="md"
        className="my-0 d-flex align-items-center border-0 shadow-none game-action-button-drop-shadow-filter"
        variant="light"
        style={{
          borderRadius: "15px",
        }}>
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path opacity="0.3" d="M20.9 12.9C20.3 12.9 19.9 12.5 19.9 11.9C19.9 11.3 20.3 10.9 20.9 10.9H21.8C21.3 6.2 17.6 2.4 12.9 2V2.9C12.9 3.5 12.5 3.9 11.9 3.9C11.3 3.9 10.9 3.5 10.9 2.9V2C6.19999 2.5 2.4 6.2 2 10.9H2.89999C3.49999 10.9 3.89999 11.3 3.89999 11.9C3.89999 12.5 3.49999 12.9 2.89999 12.9H2C2.5 17.6 6.19999 21.4 10.9 21.8V20.9C10.9 20.3 11.3 19.9 11.9 19.9C12.5 19.9 12.9 20.3 12.9 20.9V21.8C17.6 21.3 21.4 17.6 21.8 12.9H20.9Z" fill="white" />
            <path d="M16.9 10.9H13.6C13.4 10.6 13.2 10.4 12.9 10.2V5.90002C12.9 5.30002 12.5 4.90002 11.9 4.90002C11.3 4.90002 10.9 5.30002 10.9 5.90002V10.2C10.6 10.4 10.4 10.6 10.2 10.9H9.89999C9.29999 10.9 8.89999 11.3 8.89999 11.9C8.89999 12.5 9.29999 12.9 9.89999 12.9H10.2C10.4 13.2 10.6 13.4 10.9 13.6V13.9C10.9 14.5 11.3 14.9 11.9 14.9C12.5 14.9 12.9 14.5 12.9 13.9V13.6C13.2 13.4 13.4 13.2 13.6 12.9H16.9C17.5 12.9 17.9 12.5 17.9 11.9C17.9 11.3 17.5 10.9 16.9 10.9Z" fill="white" />
          </svg>
        </span>
        <span className="ml-2 font-weight-bold">Sit Out</span>
      </Button>
    )
  }

  renderGameActionsHybrid() {
    return (
      <React.Fragment>
        <Row className="w-100">
          <Col>
            <Form.Group className="mb-0 mr-2">
              <InputGroup className="d-flex align-items-center justify-content-center">
                <InputGroup.Prepend
                  className="border-0 shadow-none d-flex align-items-center justify-content-center bg-light"
                  style={{
                    padding: "0.55rem",
                    borderTopLeftRadius: "15px",
                    borderBottomLeftRadius: "15px",
                  }}>
                  <label className="switcher switcher-sm mr-0 my-0">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.props.settings.optionA7}
                      disabled={this.props.settings.optionA5}
                      onChange={e => this.props.change('optionA7', e.target.checked)} />
                    <span className="switcher-indicator cursor-pointer">
                      <span className="switcher-yes cursor-pointer">
                        <span className="ion ion-md-checkmark"></span>
                      </span>
                      <span className="switcher-no cursor-pointer">
                        <span className="ion ion-md-close"></span>
                      </span>
                    </span>
                  </label>
                </InputGroup.Prepend>
                <InputGroup.Append>
                  <Button
                    size="md"
                    className="my-0 d-flex align-items-center border-0 shadow-none"
                    variant="light"
                    style={{
                      borderTopRightRadius: "15px",
                      borderBottomRightRadius: "15px",
                      zIndex: "0",
                    }}
                    onClick={(e) => this.prevent(e)}>
                    <span className="font-weight-bold">Bet</span>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-0 mr-2">
              <InputGroup className="d-flex align-items-center justify-content-center">
                <InputGroup.Prepend
                  className="border-0 shadow-none d-flex align-items-center justify-content-center bg-light"
                  style={{
                    padding: "0.55rem",
                    borderTopLeftRadius: "15px",
                    borderBottomLeftRadius: "15px",
                  }}>
                  <label className="switcher switcher-sm mr-0">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.props.settings.optionA8}
                      disabled={this.props.settings.optionA5}
                      onChange={e => this.props.change('optionA8', e.target.checked)} />
                    <span className="switcher-indicator cursor-pointer">
                      <span className="switcher-yes cursor-pointer">
                        <span className="ion ion-md-checkmark"></span>
                      </span>
                      <span className="switcher-no cursor-pointer">
                        <span className="ion ion-md-close"></span>
                      </span>
                    </span>
                  </label>
                </InputGroup.Prepend>
                <InputGroup.Append>
                  <Button
                    size="md"
                    className="my-0 d-flex align-items-center border-0 shadow-none"
                    variant="light"
                    style={{
                      borderTopRightRadius: "15px",
                      borderBottomRightRadius: "15px",
                      zIndex: "0",
                    }}
                    onClick={(e) => this.prevent(e)}>
                    <span className="font-weight-bold">Check</span>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-0 mr-2">
              <InputGroup className="d-flex align-items-center justify-content-center">
                <InputGroup.Prepend
                  className="border-0 shadow-none d-flex align-items-center justify-content-center bg-light"
                  style={{
                    padding: "0.55rem",
                    borderTopLeftRadius: "15px",
                    borderBottomLeftRadius: "15px",
                  }}>
                  <label className="switcher switcher-sm mr-0">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.props.settings.optionA4}
                      disabled={this.props.settings.optionA5}
                      onChange={e => this.props.change('optionA4', e.target.checked)} />
                    <span className="switcher-indicator cursor-pointer">
                      <span className="switcher-yes cursor-pointer">
                        <span className="ion ion-md-checkmark"></span>
                      </span>
                      <span className="switcher-no cursor-pointer">
                        <span className="ion ion-md-close"></span>
                      </span>
                    </span>
                  </label>
                </InputGroup.Prepend>
                <InputGroup.Append>
                  <Button
                    size="md"
                    className="my-0 d-flex align-items-center border-0 shadow-none"
                    variant="light"
                    style={{
                      borderTopRightRadius: "15px",
                      borderBottomRightRadius: "15px",
                      zIndex: "0",
                    }}
                    onClick={(e) => this.prevent(e)}>
                    <span className="font-weight-bold">Call</span>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-0 mr-2">
              <InputGroup className="d-flex align-items-center justify-content-center">
                <InputGroup.Prepend
                  className="border-0 shadow-none d-flex align-items-center justify-content-center bg-light"
                  style={{
                    padding: "0.55rem",
                    borderTopLeftRadius: "15px",
                    borderBottomLeftRadius: "15px",
                  }}>
                  <label className="switcher switcher-sm mr-0">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.props.settings.optionA2}
                      disabled={this.props.settings.optionA5}
                      onChange={e => this.props.change('optionA2', e.target.checked)} />
                    <span className="switcher-indicator cursor-pointer">
                      <span className="switcher-yes cursor-pointer">
                        <span className="ion ion-md-checkmark"></span>
                      </span>
                      <span className="switcher-no cursor-pointer">
                        <span className="ion ion-md-close"></span>
                      </span>
                    </span>
                  </label>
                </InputGroup.Prepend>
                <InputGroup.Append>
                  <Button
                    size="md"
                    className="my-0 d-flex align-items-center border-0 shadow-none"
                    variant="light"
                    style={{
                      borderTopRightRadius: "15px",
                      borderBottomRightRadius: "15px",
                      zIndex: "0",
                    }}
                    onClick={(e) => this.prevent(e)}>
                    <span className="font-weight-bold">All In</span>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-0">
              <InputGroup className="d-flex align-items-center justify-content-center">
                <InputGroup.Prepend
                  className="border-0 shadow-none d-flex align-items-center justify-content-center bg-light"
                  style={{
                    padding: "0.55rem",
                    borderTopLeftRadius: "15px",
                    borderBottomLeftRadius: "15px",
                  }}>
                  <label className="switcher switcher-sm mr-0">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.props.settings.optionA3}
                      disabled={this.props.settings.optionA5}
                      onChange={e => this.props.change('optionA3', e.target.checked)} />
                    <span className="switcher-indicator cursor-pointer">
                      <span className="switcher-yes cursor-pointer">
                        <span className="ion ion-md-checkmark"></span>
                      </span>
                      <span className="switcher-no cursor-pointer">
                        <span className="ion ion-md-close"></span>
                      </span>
                    </span>
                  </label>
                </InputGroup.Prepend>
                <InputGroup.Append>
                  <Button
                    size="md"
                    className="my-0 d-flex align-items-center border-0 shadow-none"
                    variant="light"
                    style={{
                      borderTopRightRadius: "15px",
                      borderBottomRightRadius: "15px",
                      zIndex: "0",
                    }}
                    onClick={(e) => this.prevent(e)}>
                    <span className="font-weight-bold">Fold</span>
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>

        </Row>
      </React.Fragment>
    )
  }

  renderGameActions() {
    if (
      this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
      this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
    ) {
      switch (this.state.currentActionSet) {
        case SYNC_TYPE_ACTIONS_PANEL_NULL:
          return (
            <React.Fragment>
              {this.renderGameActionNextTurn()}
            </React.Fragment>
          )
        case SYNC_TYPE_ACTIONS_PANEL_DISABLED:
          return (
            <React.Fragment>
              {this.renderGameActionNextTurn()}
            </React.Fragment>
          )
        case SYNC_TYPE_ACTIONS_PANEL_SHOWDOWN:
          return (
            <React.Fragment>
              {this.renderGameActionWaiting()}
            </React.Fragment>
          )
        case SYNC_TYPE_ACTIONS_PANEL_CHECKABLE_FB:
          return (
            <React.Fragment>
              {this.renderGameActionBet()}
              {this.renderGameActionCheck()}
              {this.renderGameActionFold()}
              {this.renderGameActionAllIn()}
            </React.Fragment>
          )
        case SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE_FB:
          return (
            <React.Fragment>
              {this.renderGameActionRaise()}
              {this.renderGameActionCall()}
              {this.renderGameActionFold()}
              {this.renderGameActionAllIn()}
            </React.Fragment>
          )
        case SYNC_TYPE_ACTIONS_PANEL_BIG_BLIND_CHECKABLE:
          return (
            <React.Fragment>
              {this.renderGameActionBBCheck()}
              {this.renderGameActionRaise()}
              {this.renderGameActionFold()}
              {this.renderGameActionAllIn()}
            </React.Fragment>
          )
        case SYNC_TYPE_ACTIONS_PANEL_CHECKABLE_LOW_BALANCE:
          return (
            <React.Fragment>
              {this.renderGameActionCheck()}
              {this.renderGameActionFold()}
              {this.renderGameActionAllIn()}
            </React.Fragment>
          )
        case SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE_LOW_BALANCE:
          return (
            <React.Fragment>
              {this.renderGameActionFold()}
              {this.renderGameActionAllIn()}
            </React.Fragment>
          )
        case SYNC_TYPE_ACTIONS_PANEL_CHECKABLE:
          return (
            <React.Fragment>
              {this.renderGameActionBet()}
              {this.renderGameActionCheck()}
              {this.renderGameActionFold()}
              {this.renderGameActionAllIn()}
            </React.Fragment>
          )
        case SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE:
          return (
            <React.Fragment>
              {this.renderGameActionRaise()}
              {this.renderGameActionCall()}
              {this.renderGameActionFold()}
              {this.renderGameActionAllIn()}
            </React.Fragment>
          )
        default:
          return (
            <React.Fragment>
              {this.renderGameActionNextTurn()}
            </React.Fragment>
          )
      }
    } else {
      return (
        <React.Fragment>
          {this.renderGameActionWaiting()}
        </React.Fragment>
      )
    }
  }

  renderGameActionsDefault() {
    return (<React.Fragment>
      {this.renderGameActionsHybrid()}
    </React.Fragment>)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.state.init
          ? <React.Fragment>

            {/* Game Actions Panel */}
            <Row>
              <Col>
                <div className="flex-grow-1 position-relative">
                  <span onClick={this.prevent} className={`list-group-item list-group-item-action online d-flex justify-content-center`} style={{
                    backgroundColor: "rgba(37, 40, 46, 0.95)",
                    borderWidth: "0px",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                    height: "68px",
                  }}>
                    <div className="badge badge-light d-flex" style={{ alignItems: "center", }}>
                      {this.renderGameActions()}
                    </div>
                  </span>
                </div>
              </Col>
            </Row>
            {/* / Game Actions Panel */}

          </React.Fragment>
          : <React.Fragment>

            {/* Game Actions Panel Default */}
            <Row>
              <Col>
                <div className="flex-grow-1 position-relative">
                  <span className={`list-group-item list-group-item-action online d-flex justify-content-center`} style={{
                    backgroundColor: "rgba(37, 40, 46, 0.95)",
                    borderWidth: "0px",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                    height: "68px",
                  }}>
                    <div className="badge badge-light d-flex align-items-center w-100">
                      {this.renderGameActionsDefault()}
                    </div>
                  </span>
                </div>
              </Col>
            </Row>
            {/* / Game Actions Panel Default */}

          </React.Fragment>}
      </>
    )
  }
}

export default GameActionsPanel