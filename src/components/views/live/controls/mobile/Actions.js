import React, { Component } from 'react'
import { ButtonGroup, Col, Row } from 'react-bootstrap'

import debounce from 'debounce'

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

import BetAuto from '../actions/auto/v1/Bet'
import CheckAuto from '../actions/auto/v1/Check'
import CheckFoldAuto from '../actions/auto/v1/CheckFold'
import RaiseAuto from '../actions/auto/v1/Raise'
import CallAuto from '../actions/auto/v1/Call'
import CallAnyAuto from '../actions/auto/v1/CallAny'
import AllInAuto from '../actions/auto/v1/AllIn'
import FoldAuto from '../actions/auto/v1/Fold'

import BetDefault from '../actions/default/v1/Bet'
import CheckDefault from '../actions/default/v1/Check'
import CheckBBDefault from '../actions/default/v1/CheckBB'
import CheckFold from '../actions/default/v1/CheckFold'
import CheckFoldBB from '../actions/default/v1/CheckFoldBB'
import RaiseDefault from '../actions/default/v1/Raise'
import CallDefault from '../actions/default/v1/Call'
import AllInDefault from '../actions/default/v1/AllIn'
import FoldDefault from '../actions/default/v1/Fold'
import NoActionDefault from '../actions/default/v1/NoAction'
import ExitDefault from '../actions/default/v1/Exit'
import WaitingDefault from '../actions/default/v1/Waiting'
import NextTurnDefault from '../actions/default/v1/NextTurn'
import ReBuyDefault from '../actions/default/v1/ReBuy'
import SitOutDefault from '../actions/default/v1/SitOut'

import AutoActionsController from '../actions/utilities/AutomaticActions'

import {
  resolveBreakpoint,
  translateBreakpoint,
} from '../core/Breakpoints'

import '../../../../vendor/styles/pages/chat.scss'

class GameActionsPanel extends Component {

  constructor(props) {
    super(props)

    this.renderGameActionsDefault = this.renderGameActionsDefault.bind(this)
    this.renderGameActionBetDefault = this.renderGameActionBetDefault.bind(this)
    this.renderGameActionCheckDefault = this.renderGameActionCheckDefault.bind(this)
    this.renderGameActionCheckBBDefault = this.renderGameActionCheckBBDefault.bind(this)
    this.renderGameActionCheckFoldDefault = this.renderGameActionCheckFoldDefault.bind(this)
    this.renderGameActionCheckFoldBBDefault = this.renderGameActionCheckFoldBBDefault.bind(this)
    this.renderGameActionRaiseDefault = this.renderGameActionRaiseDefault.bind(this)
    this.renderGameActionCallDefault = this.renderGameActionCallDefault.bind(this)
    this.renderGameActionAllInDefault = this.renderGameActionAllInDefault.bind(this)
    this.renderGameActionFoldDefault = this.renderGameActionFoldDefault.bind(this)
    this.renderGameActionNoActionDefault = this.renderGameActionNoActionDefault.bind(this)
    this.renderGameActionExitDefault = this.renderGameActionExitDefault.bind(this)
    this.renderGameActionWaitingDefault = this.renderGameActionWaitingDefault.bind(this)
    this.renderGameActionNextTurnDefault = this.renderGameActionNextTurnDefault.bind(this)
    this.renderGameActionReBuyDefault = this.renderGameActionReBuyDefault.bind(this)
    this.renderGameActionSitOutDefault = this.renderGameActionSitOutDefault.bind(this)

    this.renderGameActionsAuto = this.renderGameActionsAuto.bind(this)
    this.renderGameActionBetAuto = this.renderGameActionBetAuto.bind(this)
    this.renderGameActionCheckAuto = this.renderGameActionCheckAuto.bind(this)
    this.renderGameActionCheckFoldAuto = this.renderGameActionCheckFoldAuto.bind(this)
    this.renderGameActionCallAuto = this.renderGameActionCallAuto.bind(this)
    this.renderGameActionCallAnyAuto = this.renderGameActionCallAnyAuto.bind(this)
    this.renderGameActionRaiseAuto = this.renderGameActionRaiseAuto.bind(this)
    this.renderGameActionAllInAuto = this.renderGameActionAllInAuto.bind(this)
    this.renderGameActionFoldAuto = this.renderGameActionFoldAuto.bind(this)

    this.onHandleRefreshSync = this.onHandleRefreshSync.bind(this)
    this.onHandleEvaluateSync = this.onHandleEvaluateSync.bind(this)
    this.resolveWindowBreakpoint = this.resolveWindowBreakpoint.bind(this)

    this.state = {
      init: false,
      size: 6,
      currentRound: null,
      currentPlayer: false,
      currentActionSet: null,
      timer: false,
      duration: 1200,
    }

    window.addEventListener("resize", debounce(this.resolveWindowBreakpoint, 10))
  }

  resolveWindowBreakpoint() {
    this.setState({
      size: translateBreakpoint(resolveBreakpoint(window.innerWidth)),
    })
  }

  componentDidMount() {
    this.onHandleRefreshSync()
    this.resolveWindowBreakpoint()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.synced !== this.props.game.synced) {
      this.onHandleRefreshSync()
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", debounce(this.resolveWindowBreakpoint, 10))
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
      })
    } else {
      this.setState({
        init: false,
      })
    }
  }

  renderGameActionBetDefault(left, right) {
    return <BetDefault {...this.props} left={left} right={right} reset={this.props.resetAuto} />
  }

  renderGameActionCheckDefault(left, right) {
    return <CheckDefault {...this.props} client={this.props.client} reset={this.props.resetAuto} borderLeft={left} borderRight={right} />
  }

  renderGameActionCheckBBDefault(left, right) {
    return <CheckBBDefault {...this.props} client={this.props.client} reset={this.props.resetAuto} borderLeft={left} borderRight={right} />
  }

  renderGameActionRaiseDefault(left, right) {
    return <RaiseDefault {...this.props} left={left} right={right} reset={this.props.resetAuto} />
  }

  renderGameActionCallDefault(left, right) {
    return <CallDefault {...this.props} client={this.props.client} reset={this.props.resetAuto} borderLeft={left} borderRight={right} />
  }

  renderGameActionCheckFoldDefault(left, right) {
    return <CheckFold {...this.props} left={left} right={right} reset={this.props.resetAuto} />
  }

  renderGameActionCheckFoldBBDefault(left, right) {
    return <CheckFoldBB {...this.props} left={left} right={right} reset={this.props.resetAuto} />
  }

  renderGameActionFoldDefault(left, right) {
    return <FoldDefault {...this.props} client={this.props.client} reset={this.props.resetAuto} borderLeft={left} borderRight={right} />
  }

  renderGameActionAllInDefault(left, right) {
    return <AllInDefault {...this.props} client={this.props.client} reset={this.props.resetAuto} borderLeft={left} borderRight={right} />
  }

  renderGameActionNoActionDefault(left, right) {
    return <NoActionDefault {...this.props} client={this.props.client} reset={this.props.resetAuto} borderLeft={left} borderRight={right} />
  }

  renderGameActionExitDefault(left, right) {
    return <ExitDefault {...this.props} client={this.props.client} reset={this.props.resetAuto} borderLeft={left} borderRight={right} />
  }

  renderGameActionWaitingDefault(left, right) {
    return <WaitingDefault {...this.props} client={this.props.client} reset={this.props.resetAuto} borderLeft={left} borderRight={right} />
  }

  renderGameActionNextTurnDefault(left, right) {
    return <NextTurnDefault {...this.props} client={this.props.client} reset={this.props.resetAuto} borderLeft={left} borderRight={right} />
  }

  renderGameActionReBuyDefault(left, right) {
    return <ReBuyDefault {...this.props} client={this.props.client} reset={this.props.resetAuto} borderLeft={left} borderRight={right} />
  }

  renderGameActionSitOutDefault(left, right) {
    return <SitOutDefault {...this.props} client={this.props.client} reset={this.props.resetAuto} borderLeft={left} borderRight={right} />
  }

  renderGameActionBetAuto(left, right) {
    return <BetAuto {...this.props} {...this.state} change={this.props.change} borderLeft={left} borderRight={right} />
  }

  renderGameActionCheckAuto(left, right) {
    return <CheckAuto {...this.props} {...this.state} change={this.props.change} borderLeft={left} borderRight={right} />
  }

  renderGameActionCheckFoldAuto(left, right) {
    return <CheckFoldAuto {...this.props} {...this.state} change={this.props.change} borderLeft={left} borderRight={right} />
  }

  renderGameActionCallAuto(left, right) {
    return <CallAuto {...this.props} {...this.state} change={this.props.change} borderLeft={left} borderRight={right} />
  }

  renderGameActionCallAnyAuto(left, right) {
    return <CallAnyAuto {...this.props} {...this.state} change={this.props.change} borderLeft={left} borderRight={right} />
  }

  renderGameActionRaiseAuto(left, right) {
    return <RaiseAuto {...this.props} {...this.state} change={this.props.change} borderLeft={left} borderRight={right} />
  }

  renderGameActionAllInAuto(left, right) {
    return <AllInAuto {...this.props} {...this.state} change={this.props.change} borderLeft={left} borderRight={right} />
  }

  renderGameActionFoldAuto(left, right) {
    return <FoldAuto {...this.props} {...this.state} change={this.props.change} borderLeft={left} borderRight={right} />
  }

  renderGameActionsDefault() {
    if (
      this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
      this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
    ) {
      switch (this.state.currentActionSet) {

        case SYNC_TYPE_ACTIONS_PANEL_NULL:
          return (<>{this.renderGameActionsAuto()}</>)

        case SYNC_TYPE_ACTIONS_PANEL_DISABLED:
          return (<>{this.renderGameActionsAuto()}</>)

        case SYNC_TYPE_ACTIONS_PANEL_SHOWDOWN:
          return (<>{this.renderGameActionsAuto()}</>)

        case SYNC_TYPE_ACTIONS_PANEL_CHECKABLE_FB:
          return (
            <ButtonGroup size="md" className="w-100">
              {this.renderGameActionBetDefault(false, false)}
              {this.renderGameActionCheckDefault(false, false)}
              {this.renderGameActionAllInDefault(false, false)}
              {this.renderGameActionCheckFoldDefault(false, true)}
            </ButtonGroup>
          )

        case SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE_FB:
          return (
            <ButtonGroup size="md" className="w-100">
              {this.renderGameActionRaiseDefault(false, false)}
              {this.renderGameActionCallDefault(false, false)}
              {this.renderGameActionAllInDefault(false, false)}
              {this.renderGameActionFoldDefault(false, true)}
            </ButtonGroup>
          )

        case SYNC_TYPE_ACTIONS_PANEL_BIG_BLIND_CHECKABLE:
          return (
            <ButtonGroup size="md" className="w-100">
              {this.renderGameActionCheckBBDefault(false, false)}
              {this.renderGameActionRaiseDefault(false, false)}
              {this.renderGameActionAllInDefault(false, false)}
              {this.renderGameActionCheckFoldBBDefault(false, true)}
            </ButtonGroup>
          )

        case SYNC_TYPE_ACTIONS_PANEL_CHECKABLE_LOW_BALANCE:
          return (
            <ButtonGroup size="md" className="w-100">
              {this.renderGameActionCheckDefault(false, false)}
              {this.renderGameActionAllInDefault(false, false)}
              {this.renderGameActionCheckFoldDefault(false, true)}
            </ButtonGroup>
          )

        case SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE_LOW_BALANCE:
          return (
            <ButtonGroup size="md" className="w-100">
              {this.renderGameActionAllInDefault(false, false)}
              {this.renderGameActionFoldDefault(false, true)}
            </ButtonGroup>
          )

        case SYNC_TYPE_ACTIONS_PANEL_CHECKABLE:
          return (
            <ButtonGroup size="md" className="w-100">
              {this.renderGameActionBetDefault(false, false)}
              {this.renderGameActionCheckDefault(false, false)}
              {this.renderGameActionAllInDefault(false, false)}
              {this.renderGameActionCheckFoldDefault(false, true)}
            </ButtonGroup>
          )

        case SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE:
          return (
            <ButtonGroup size="md" className="w-100">
              {this.renderGameActionRaiseDefault(false, false)}
              {this.renderGameActionCallDefault(false, false)}
              {this.renderGameActionAllInDefault(false, false)}
              {this.renderGameActionFoldDefault(false, true)}
            </ButtonGroup>
          )

        default:
          return (<>{this.renderGameActionsAuto()}</>)
      }
    } else {
      return (<>{this.renderGameActionsAuto()}</>)
    }
  }

  renderGameActionsAuto() {
    if (this.state.size >= 4 && this.state.size <= 5) {
      return (
        <>
          <Row className="d-flex align-items-center w-100 p-0 m-0">
            <Col className="d-flex align-items-center w-100 p-0 m-0">
              <ButtonGroup
                size="md" className="w-100">
                {this.renderGameActionBetAuto(false, false)}
                {this.renderGameActionCheckAuto(false, false)}
                {this.renderGameActionCheckFoldAuto(false, false)}
                {this.renderGameActionRaiseAuto(false, false)}
              </ButtonGroup>
            </Col>
          </Row>

          <Row className="border-top border-dark d-flex align-items-center w-100 p-0 m-0">
            <Col className="d-flex align-items-center w-100 p-0 m-0">
              <ButtonGroup
                size="md" className="w-100">
                {this.renderGameActionCallAuto(false, false)}
                {this.renderGameActionCallAnyAuto(false, false)}
                {this.renderGameActionAllInAuto(false, false)}
                {this.renderGameActionFoldAuto(false, false)}
              </ButtonGroup>
            </Col>
          </Row>
        </>
      )
    } else if (this.state.size >= 0 && this.state.size <= 2) {
      return (
        <>
          <Row className="d-flex align-items-center w-100 p-0 m-0">
            <Col className="d-flex align-items-center w-100 p-0 m-0">
              <ButtonGroup
                size="md" className="w-100">
                {this.renderGameActionBetAuto(false, false)}
                {this.renderGameActionCheckAuto(false, false)}
                {this.renderGameActionCheckFoldAuto(false, false)}
                {this.renderGameActionRaiseAuto(false, false)}
              </ButtonGroup>
            </Col>
          </Row>

          <Row className="border-top border-dark d-flex align-items-center w-100 p-0 m-0">
            <Col className="d-flex align-items-center w-100 p-0 m-0">
              <ButtonGroup
                size="md" className="w-100">
                {this.renderGameActionCallAuto(false, false)}
                {this.renderGameActionCallAnyAuto(false, false)}
                {this.renderGameActionAllInAuto(false, false)}
                {this.renderGameActionFoldAuto(false, false)}
              </ButtonGroup>
            </Col>
          </Row>
        </>
      )
    } else {
      return (

        // <>
        //     <ButtonGroup
        //         size="md" className="w-100">
        //         {this.renderGameActionBetAuto(false, false)}
        //         {this.renderGameActionCheckAuto(false, false)}
        //         {this.renderGameActionCheckFoldAuto(false, false)}
        //         {this.renderGameActionRaiseAuto(false, false)}
        //         {this.renderGameActionCallAuto(false, false)}
        //         {this.renderGameActionCallAnyAuto(false, false)}
        //         {this.renderGameActionAllInAuto(false, false)}
        //         {this.renderGameActionFoldAuto(false, false)}
        //     </ButtonGroup>
        // </>

        <>
          <Row className="d-flex align-items-center w-100 p-0 m-0">
            <Col className="d-flex align-items-center w-100 p-0 m-0">
              <ButtonGroup
                size="md" className="w-100">
                {this.renderGameActionBetAuto(false, false)}
                {this.renderGameActionCheckAuto(false, false)}
                {this.renderGameActionCheckFoldAuto(false, false)}
                {this.renderGameActionRaiseAuto(false, false)}
              </ButtonGroup>
            </Col>
          </Row>

          <Row className="border-top border-dark d-flex align-items-center w-100 p-0 m-0">
            <Col className="d-flex align-items-center w-100 p-0 m-0">
              <ButtonGroup
                size="md" className="w-100">
                {this.renderGameActionCallAuto(false, false)}
                {this.renderGameActionCallAnyAuto(false, false)}
                {this.renderGameActionAllInAuto(false, false)}
                {this.renderGameActionFoldAuto(false, false)}
              </ButtonGroup>
            </Col>
          </Row>
        </>
      )
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>

        {/* Game Actions Panel */}
        <Row>
          <Col>
            <div className="flex-grow-1 position-relative p-0">
              <span
                className={`
                                p-0 border-0
                                bg-transparent
                                justify-content-center 
                                gameactions-panel-opacity-animation`}>
                <div className="badge badge-light align-items-center justify-content-center w-100 p-0">
                  {this.state.init
                    ? this.renderGameActionsDefault()
                    : this.renderGameActionsAuto()}
                </div>
              </span>
            </div>
          </Col>
        </Row>
        {/* / Game Actions Panel */}

        {/* Auto Actions Controller */}
        <AutoActionsController
          {...this.props} {...this.state}
          reset={this.props.resetAuto} />
        {/* / Auto Actions Controller */}

      </>
    )
  }
}

export default GameActionsPanel