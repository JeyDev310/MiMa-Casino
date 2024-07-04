import React, { Component } from 'react'
import {Button, Col, Row } from 'react-bootstrap'


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
  // SYNC_TYPE_ACTIONS_PANEL_SMALL_BLIND,
  // SYNC_TYPE_ACTIONS_PANEL_BIG_BLIND,
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
import CallAnyDefault from '../actions/default/v1/CallAny'
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
      duration: 300,
      betValue: 0,
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

  renderGameActionBetDefault(disabled) {
    return <BetDefault
      {...this.props}
      disabled={disabled}
      reset={this.props.resetAuto}
      change={this.props.change} />
  }

  renderGameActionCheckDefault(disabled) {
    return <CheckDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionCheckBBDefault(disabled) {
    return <CheckBBDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionRaiseDefault(disabled) {
    return <RaiseDefault
      {...this.props}
      disabled={disabled}
      reset={this.props.resetAuto}
      change={this.props.change} />
  }

  renderGameActionCallDefault(disabled) {
    return <CallDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionCallAnyDefault(disabled) {
    return <CallAnyDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionCheckFoldDefault(disabled) {
    return <CheckFold
      {...this.props}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionCheckFoldBBDefault(disabled) {
    return <CheckFoldBB
      {...this.props}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionFoldDefault(disabled) {
    return <FoldDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionAllInDefault(disabled) {
    return <AllInDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionNoActionDefault(disabled) {
    return <NoActionDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionExitDefault(disabled) {
    return <ExitDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionWaitingDefault(disabled) {
    return <WaitingDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionNextTurnDefault(disabled) {
    return <NextTurnDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionReBuyDefault(disabled) {
    return <ReBuyDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionSitOutDefault(disabled) {
    return <SitOutDefault
      {...this.props}
      client={this.props.client}
      disabled={disabled}
      reset={this.props.resetAuto} />
  }

  renderGameActionBetAuto(disabled) {
    return <BetAuto
      {...this.props} {...this.state}
      disabled={disabled}
      change={this.props.change} />
  }

  renderGameActionCheckAuto(disabled) {
    return <CheckAuto
      {...this.props} {...this.state}
      disabled={disabled}
      change={this.props.change} />
  }

  renderGameActionCheckFoldAuto(disabled) {
    return <CheckFoldAuto
      {...this.props} {...this.state}
      disabled={disabled}
      change={this.props.change} />
  }

  renderGameActionCallAuto(disabled) {
    return <CallAuto
      {...this.props} {...this.state}
      disabled={disabled}
      change={this.props.change} />
  }

  renderGameActionCallAnyAuto(disabled) {
    return <CallAnyAuto
      {...this.props} {...this.state}
      disabled={disabled}
      change={this.props.change} />
  }

  renderGameActionRaiseAuto(disabled) {
    return <RaiseAuto
      {...this.props} {...this.state}
      disabled={disabled}
      change={this.props.change} />
  }

  renderGameActionAllInAuto(disabled) {
    return <AllInAuto
      {...this.props} {...this.state}
      disabled={disabled}
      change={this.props.change} />
  }

  renderGameActionFoldAuto(disabled) {
    return <FoldAuto
      {...this.props} {...this.state}
      disabled={disabled}
      change={this.props.change} />
  }

  renderGameActionsDefault() {
    if (
      this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
      this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
    ) {
      switch (this.state.currentActionSet) {

        case SYNC_TYPE_ACTIONS_PANEL_NULL:
          return (
            <>
              {/* {this.renderGameActionsAuto()} */}
            </>
          )

        case SYNC_TYPE_ACTIONS_PANEL_DISABLED:
        return (
          <>
            {/* {this.renderGameActionsAuto()} */}
          </>
        )

        case SYNC_TYPE_ACTIONS_PANEL_SHOWDOWN:
          return (
            <>
              {/* {this.renderGameActionsAuto()} */}
            </>
          )        
        case SYNC_TYPE_ACTIONS_PANEL_CHECKABLE_FB:
          return (
            <>
              <Row className="p-0 m-0">
                <Col className="p-2">
                  {this.renderGameActionFoldDefault(false)}            
                </Col>
                <Col className="p-2">
                  {this.renderGameActionCheckDefault(false)}            
                </Col>
                <Col className="p-2">
                  {this.renderGameActionBetDefault(false)}
                </Col>          
              </Row>
            </>
          )

        case SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE_FB:
          return (
            <>
              <Row className="p-0 m-0">
                <Col className="p-2">
                  {this.renderGameActionFoldDefault(false)}            
                </Col>
                <Col className="p-2">
                  {this.renderGameActionCallDefault(false)}            
                </Col>
                <Col className="p-2">
                  {this.renderGameActionAllInDefault(false)}
                </Col>          
              </Row>
            </>
          )

        case SYNC_TYPE_ACTIONS_PANEL_BIG_BLIND_CHECKABLE:
          return (
            <>
              <Row className="p-0 m-0">
                <Col className="p-2">
                  {this.renderGameActionFoldDefault(false)}
                </Col>
                <Col className="p-2">
                  {this.renderGameActionCheckBBDefault(false)}             
                </Col>
                <Col className="p-2">
                  {this.renderGameActionRaiseDefault(false)}            
                </Col>  
              </Row> 
            </>
          )

        case SYNC_TYPE_ACTIONS_PANEL_CHECKABLE_LOW_BALANCE:
          return (
            <>
              <Row className="p-0 m-0">
                <Col className="p-2">
                  {this.renderGameActionFoldDefault(false)}            
                </Col>
                <Col className="p-2">
                  {this.renderGameActionCheckDefault(false)}            
                </Col>
                <Col className="p-2">
                  {this.renderGameActionAllInDefault(false)}
                </Col>          
              </Row> 
            </>
          )

        case SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE_LOW_BALANCE:
          return (
            <>
              <Row className="p-0 m-0">
                <Col className="p-2">
                  {this.renderGameActionFoldDefault(false)}
                </Col>  
                <Col className="p-2">
                              
                </Col>
                <Col className="p-2">
                  {this.renderGameActionAllInDefault(false)}            
                </Col>
              </Row>              
            </> 
          )

        case SYNC_TYPE_ACTIONS_PANEL_CHECKABLE:
          return (
            <>
              <Row className="p-0 m-0">
                <Col className="p-2">
                  {this.renderGameActionFoldDefault(false)}            
                </Col>
                <Col className="p-2">
                  {this.renderGameActionCheckDefault(false)}            
                </Col>
                <Col className="p-2">
                  {this.renderGameActionBetDefault(false)}
                </Col>          
              </Row>               
            </>
          )

        case SYNC_TYPE_ACTIONS_PANEL_NOT_CHECKABLE:
          return (
            <>
              <Row className="p-0 m-0">
                <Col className="p-2">
                  {this.renderGameActionFoldDefault(false)}            
                </Col>
                <Col className="p-2">
                  {this.renderGameActionCallDefault(false)}            
                </Col>
                <Col className="p-2">
                  {this.renderGameActionRaiseDefault(false)}
                </Col>          
              </Row>  
            </>
          )          
             
          default:
            return (
              <Row className="p-0 m-0">
                <Col className="p-2">                
                  {this.renderGameActionFoldAuto(false)}            
                </Col>
                <Col className="p-2">
                  {/* {this.renderGameActionCheckAuto(false)}             */}
                </Col>
                <Col className="p-2">
                  {/* {this.renderGameActionRaiseAuto(false)} */}
                </Col>   
              </Row>
            )
      }
    } else {
      return (
        <>
        {/* <Button              
          className="d-flex align-items-center"
          onClick={() => this.props.openFill(1)}
          // disabled={!valid}
          style={{                        
            background: "linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)",
            borderRadius: "4px",
            border: "0.4px solid #84DAFF",
            margin: "2px",
            padding: "8px",
            height: "72px"
          }}
          >
          Join Waiting List
        </Button> */}
        {/* {this.renderGameActionsAuto()} */}
        </>
      )
    }
  }

  renderGameActionsAuto() {
    console.log('------------gamedata', this.props.game.data)
    console.log('Action------------gamedata', this.props.game.synced)
    var users = this.props.game.data.users
    var item = users.find(x => x.username === this.props.game.profile.username)
    if (
      item
    ) {
    switch (item.p_action) {
      case 'Big Blind':
        return (
          <Row className="p-0 m-0">
            <Col className="p-2">
              {this.renderGameActionFoldAuto(false)}
            </Col>
            <Col className="p-2">
              {this.renderGameActionCheckAuto(false)}
            </Col>
            <Col className="p-2">
                        
            </Col>   
          </Row>
        )
      case 'Small Blind':
        return (
          <Row className="p-0 m-0">
            <Col className="p-2">
              {this.renderGameActionFoldAuto(false)}
            </Col>            
            <Col className="p-2">
              
            </Col>
            <Col className="p-2">
                          
            </Col>   
          </Row>
        )
      default :
        return (
          <Row className="p-0 m-0">
            <Col className="p-2">
              
            </Col>
            <Col className="p-2">
              
            </Col>
            <Col className="p-2">
              {/* {this.renderGameActionFoldAuto(false)} */}
            </Col>   
          </Row>
        )
      } 
    }else{
      return (
        <></>
      )
    }
    
  }

 

  
  prevent(e) {
    e.preventDefault()
  }

  render() {
    console.log('---game synced', this.props.game.synced) 
    var users = this.props.game.data.users
    var item = users.find(x => x.username === this.props.game.profile.username)   
    return (
      
      <>
        {/* Game Actions Panel */}        
        <div style={{width: "480px"}}>
          <span
            className="gameactions-panel-opacity-animation"
            style={{
              borderRadius: "20px",
              filter: "drop-shadow(0px 0px 10px rgb(0, 0, 0))",
            }}>
                             
            <div>
              <>{this.state.init ? this.renderGameActionsDefault():<>{item ? 
              this.renderGameActionsAuto()
              : <>{users.length >= this.props.game.data.max_players ? 
                  <Row>
                  <Col></Col>
                  <Col className="mr-4">
                    <Button              
                    className="d-flex align-items-center"
                    onClick={() => this.props.openFill(1)}
                    // disabled={!valid}
                    style={{                        
                      background: "linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)",
                      borderRadius: "12px",
                      border: "0.4px solid #84DAFF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "600",
                      fontSize: "20px",
                      lineHeight: "28px",
                      width: "100%",
                      height: "72px"
                    }}
                    >
                    Join Waiting List                 
                  </Button>
                  </Col>
                </Row> :
                <></>}</>
                }</>                
              }</>                               
                           
            </div>
          </span>
        </div>
         
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