import React, { Component } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Clock from 'react-live-clock'
import toast from 'react-hot-toast'
import { RateLimiter } from 'limiter'

// import CardsPanel from './CardsPanel'
import DealerPanel from './DealerPanel'
import GameActions from './GameActions'
// import PlayerProgressBar from './PlayerProgressBar'
// import PlayerQuickActions from './PlayerQuickActionsPanel'
// import PlayerStateDefault from './PlayerStateDefault'

class StatusBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      start: new Date().getTime(),
      phase: 0,
      sitOutStatus: false,
    }

    this.handleRenderSitOutState = this.handleRenderSitOutState.bind(this)
    // this.handleRenderSitOutClassName = this.handleRenderSitOutClassName.bind(this)
    this.handleSubmitSitOutState = this.handleSubmitSitOutState.bind(this)

    this.rateLimiter = new RateLimiter({ tokensPerInterval: 1, interval: 250, })
    this.sitOutLimiter = new RateLimiter({ tokensPerInterval: 1, interval: 2500, })

    this.periodicHeaderChange = this.periodicHeaderChange.bind(this)
    this.phaseInterval = setInterval(this.periodicHeaderChange, 5000)

    this.state = {
      sitOutEnabled: true,
    }
  }

  
  componentWillUnmount() {
    clearInterval(this.phaseInterval)
  }

  getElementTargetSize() {
    switch (this.props.settings.optionK4) {
      case 0:
        return 5
      case 1:
        return 0
      case 2:
        return 5
      case 3:
        return 2
      case 4:
        return 3
      case 5:
        return 4
      default:
        return this.props.settings.optionK4
    }
  }

  componentDidMount() {
    if (this.props.game.player) {
      if (this.props.game.player.p_sit_out_request && this.props.game.player.p_sit_out) {
        this.setState({
          sitOutEnabled: true,
        })
      } else if (!this.props.game.player.p_sit_out_request) {
        var p = this.props.game.data.users.filter(function (item) {
          return item.p_playing && !item.p_low_balance
        })
        var s = this.props.game.data.users.filter(function (item) {
          return item.p_sit_out_request
        })
        this.setState({
          sitOutEnabled: (p.length - s.length) > 2 ? true : false,
        })
      } else if (this.props.game.player.p_sit_out_request) {
        this.setState({
          sitOutEnabled: true,
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data.users !== this.props.game.data.users) {
      if (this.props.game.player) {
        if (this.props.game.player.p_sit_out_request && this.props.game.player.p_sit_out) {
          this.setState({
            sitOutEnabled: true,
          })
        } else if (!this.props.game.player.p_sit_out_request) {
          var p = this.props.game.data.users.filter(function (item) {
            return item.p_playing && !item.p_low_balance
          })
          var s = this.props.game.data.users.filter(function (item) {
            return item.p_sit_out_request
          })
          this.setState({
            sitOutEnabled: (p.length - s.length) > 2 ? true : false,
          })
        } else if (this.props.game.player.p_sit_out_request) {
          this.setState({
            sitOutEnabled: true,
          })
        }
      }
    }
  }

  periodicHeaderChange() {
    switch (this.state.phase) {
      case 0:
        this.setState({
          phase: 1,
        })
        break
      case 1:
        this.setState({
          phase: 2,
        })
        break
      case 2:
        this.setState({
          phase: 3,
        })
        break
      case 3:
        this.setState({
          phase: 0,
        })
        break
      default:
        this.setState({
          phase: 0,
        })
        break
    }
  }

  getPlaytime() {
    var now = new Date().getTime()
    var diff = now - this.state.start
    var diffSeconds = diff / 1000
    var diffMinutes = diff / 60 / 1000
    var diffHours = diff / 3600 / 1000

    var humanReadable = {}
    humanReadable.hours = Math.floor(diffHours)
    humanReadable.minutes = Math.floor(diffMinutes)
    humanReadable.seconds = Math.floor(diffSeconds)

    if (humanReadable.seconds < 120) {
      return `Connected: ${humanReadable.minutes} min`
    }

    if (humanReadable.minutes < 120) {
      return `Connected: ${humanReadable.minutes} min`
    }

    return `Connected: ${humanReadable.hours} hours`
  }

  getRandomKey(length) {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  handleMessageSitOutUnavailable() {
    if (this.rateLimiter.tryRemoveTokens(1)) {
      toast("Sit-out currently unavailable", {
        duration: 2500,
        icon: <i className="fas fa-exclamation-triangle text-warning ml-2"></i>,
        className: 'font-weight-bold cursor-pointer',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          zIndex: '99999',
        },
      })
    }
  }

  handleSubmitSitOutState(value) {
    if (this.sitOutLimiter.tryRemoveTokens(1)) {
      if (this.props.game.player) {
        this.props.client.sendPlayerSitOut(0, this.props.game.data.current_round, value ? 1 : 0,         
         
        )
      }
    }
  }

  handleSitOutButtonClick = () => {
    this.setState((prevState) => ({
      sitOutStatu: !prevState.sitOutStatu
    }));
  }; 

  handleRenderSitOutState(request, state) {
    if (request && state) {
      return `icon__success`
    } else if (!request) {
      return `icon__default`
    } else if (request) {
      return `icon__success`
    }
  }

  handleRenderSitOutClassName(request, state) {
    if (request && state) {
      return `sit-out-button-active`
    } else if (!request && !state) {
      return `sit-out-button`
    } else if (request !== state) {
      return `sit-out-button-active`
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {    
    return (
      <>
        {/* Status Bar Content */}
        <div style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          zIndex: "99999",
        }}>
          {/* Layout K1/0 K2/1 */}
          {true && this.props.settings.optionK1 === 0 && this.props.settings.optionK2 === 1 && (
           
            <Card className="bg-transparent border-0 shadow-none status-bar-opacity-animation-up">
              <Row
                className={`status-bar-opacity-animation-up ${this.props.settings.optionK3
                  ? 'action-panel-parent-s1'
                  : 'action-panel-parent-s2'}`}
                style={{
                  backgroundColor: "rgba(0,0,0,0.0)",
                  borderRadius: "24px 24px 0px 0px",
                }}>
                <Col className="py-0 text-left pl-4 d-flex align-items-end justify-content-start mobile-sitout-button">
                  <span
                    className={`status-bar-layout-s3-${this.props.settings.optionK4}`}
                    style={{ transformOrigin: "left bottom", width: "initial", }}>
                    <div>
                      {/* Live Clock */}
                      {/* <div className="d-flex justify-content-between"> */}
                        <span className="font-weight-bold mx-2 my-1 small" style={{display: "none"}}>
                          <span
                            id="bottom-nav-container-item"
                            className="bottom-nav-hover bottom-nav-hover-field d-flex align-items-center justify-content-center mb-0"></span>
                        </span>
                        <span className="font-weight-bold mx-2 my-1 small">
                          <Clock format={"dddd, HH:mm"} ticking={true} />
                        </span>
                        
                      {/* </div> */}
                      {/* / Live Clock */}

                      {/* SitOut Next hand */}
                      
                        {this.props.game.player && this.state.sitOutEnabled
                        ?
                          <Button              
                          className={`d-flex justify-content-center align-items-center`}
                          onClick={e => this.handleSubmitSitOutState(!this.props.game.player.p_sit_out_request)}
                          style={{                        
                            background: "linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)",
                            borderRadius: "4px",
                            border: "0.4px solid #84DAFF",
                            margin: "2px",
                            padding: "15px",
                            height: "47px"
                          }}
                          >
                          <div className={`rounded-circle d-flex justify-content-center align-items-center ${this.handleRenderSitOutClassName(this.props.game.player.p_sit_out_request, this.props.game.player.p_sit_out)}`}>
                            {/* <div className="rounded-circle" style={{width: "12px", height: "12px",background: "linear-gradient(150.95deg, #249F4A -8.04%, #46CB6B 86.61%)", border: "0.2px solid #46CB6B", boxShadow: " 0px -2px 4px rgba(0, 0, 0, 0.25)"}}></div> */}
                            </div> 
                          <div className="ml-3 text-medium font-weight-bold">Sit out next hand</div>
                          </Button>
                        
                        : 
                          <Button              
                          className="d-flex justify-content-center align-items-center"
                          onClick={(e) => { this.handleMessageSitOutUnavailable()}}
                          style={{                        
                            background: "linear-gradient(180deg, #2AA9D8 0%, #1C8CB6 46.35%, #233840 100%)",
                            borderRadius: "4px",
                            border: "0.4px solid #84DAFF",
                            margin: "2px",
                            padding: "15px",
                            height: "47px"
                          }}
                          >
                            <div className="sit-out-button rounded-circle"></div> 
                            <div className="ml-3 text-medium font-weight-bold">Sit out next hand</div>
                        </Button>
                        }
                                            
                      {/* /SitOut Next hand */}
                    </div> 
                  </span>
                </Col>

                <Col className="game-action-panel">
                  {/* Game Actions Panel */}
                  <GameActions
                      {...this.props}
                      {...this.state}
                      // size="sm"
                      color="light"
                      rounded={true}
                      openFill={this.props.open}
                      change={this.props.change}
                      resetAuto={this.props.resetAuto}
                    />
                    {/* / Game Actions Panel */}
                </Col>
              </Row>                          
            </Card>            
            
            
            
          )}
          {/* / Layout K1/0 K2/1 */} 
        </div>

        <div
          className="p-0"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}>

          {/* Dealer Panel */}
          <DealerPanel
            {...this.props}
            {...this.state}
            openDealer={this.props.openDealer} />
          {/* / Dealer Panel */}

        </div>
        {/* / Status Bar Content */}
      </>
    )
  }
}

export default StatusBar
