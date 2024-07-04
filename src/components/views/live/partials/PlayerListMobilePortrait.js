import React, { Component } from 'react'
import { Badge, Card, Media } from 'react-bootstrap'

// import PlayerNotifications from './PlayerNotifications'

import moment from 'moment'
import Countdown from 'react-countdown'
// import PerfectScrollbar from 'react-perfect-scrollbar'
import CardsPanel from './CardsPanel'
import HoleCardsHolder from './HoleCardsHolder'

import {
  formatPrice,
  truncateUsername,
} from '../utilities/TextPreprocessing'

import {
  GAME_ROUND_TYPE_NULL,
  GAME_ROUND_TYPE_SHOWDOWN,
} from '../core/GameRoundTypes'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/libs/react-perfect-scrollbar/react-perfect-scrollbar.scss'

const SitOutTimeoutRenderer = ({ formatted: { minutes, seconds }, completed }) => {
  if (completed) {
    return <span>
      <Badge pill variant="default font-weight-bold">
        00:00
      </Badge>
    </span>
  } else {
    return <span>
      <Badge pill variant="default font-weight-bold">
        {minutes}:{seconds}
      </Badge>
    </span>
  }
}

class PlayerList extends Component {

  constructor(props) {
    super(props)

    this.intervalIds = []
    this.renderSeat = this.renderSeat.bind(this)
    this.renderPresence = this.renderPresence.bind(this)
    this.getSeatCount = this.getSeatCount.bind(this)
    this.getSeatCountArr = this.getSeatCountArr.bind(this)
    this.getPlayersCount = this.getPlayersCount.bind(this)
    this.getItemActionEl = this.getItemActionEl.bind(this)
    this.getItemPlayerIcon = this.getItemPlayerIcon.bind(this)
    this.getItemOpacity = this.getItemOpacity.bind(this)
    this.getItemPanelBackground = this.getItemPanelBackground.bind(this)
    this.getItemActionIndicator = this.getItemActionIndicator.bind(this)
    this.itemIsCurrentPlayer = this.itemIsCurrentPlayer.bind(this)
    this.onHandleSwitchPlayerList = this.onHandleSwitchPlayerList.bind(this)
    this.handleGetSeatPositionL = this.handleGetSeatPositionL.bind(this)
    this.handleGetSeatPositionT = this.handleGetSeatPositionT.bind(this)
    this.ChipPositionT = this.ChipPositionT.bind(this)
    this.ChipPositionL = this.ChipPositionL.bind(this)    

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    this.onHandleSwitchPlayerList()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data !== this.props.game.data) {
      this.onHandleSwitchPlayerList()
    }
  }

  componentWillUnmount() {
    for (var i = 0; i < this.intervalIds.length; i++) {
      clearInterval(this.intervalIds[i])
    }
  }

  onHandleSwitchPlayerList() {
    if (
      this.props.game.data &&
      this.props.game.profile &&
      this.props.game.presence
    ) {
      if (
        !this.props.game.data.game_started &&
        this.props.game.data.current_round === GAME_ROUND_TYPE_NULL &&
        this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
      ) {
        this.setState({
          init: true,
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

  getItemPlayerIcon(p) {
    if (p.p_sit_out) {
      return (
        <></>
      )
    }
    if (p.p_low_balance) {
      return (
        <></>
      )
    }
    if (p.p_smallblind) {
      return (
        <></>
      )
    }
    if (p.p_dealer) {
      return (
        <img src={`${process.env.PUBLIC_URL}/svg/icons/dealer-icon.svg`} alt="Dealer Icon" />
      )
    }
    if (p.p_bigblind) {
      return (
        <></>
      )
    }
    return (
      <></>
    )
  }

  itemIsCurrentPlayer(item) {
    if (
      this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
      this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
    ) {
      if (this.props.game.data && this.props.game.data.current_player) {
        if (this.props.game.data.current_player.p_username === item) {
          return true
        }
      }
    } else {
      return false
    }
  }

  getItemOpacity(item) {
    if (!item.p_playing | item.p_waiting | item.p_inactive) return 0.5
    return 1.0
  }

  getItemActionEl(item) {
    if (item.p_action === "Joined") return (<>
      <i className="ion ion-md-arrow-forward text-body"></i>
      <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)

    if (item.p_action === "Small Blind") return (<>
      <i className="ion ion-md-arrow-forward text-body"></i>
      <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)

    if (item.p_action === "Big Blind") return (<>
      <i className="ion ion-md-arrow-forward text-body"></i>
      <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)

    if (item.p_action === "Showdown") return (<>
      <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
        Waiting
      </span>
    </>)

    if (item.p_action === "Inactive") return (<>
      <span className="text-medium font-weight-bold ml-0" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)

    if (item.p_action === "Exited") return (<>
      <span className="text-medium font-weight-bold ml-0" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)

    if (item.p_action === "No Bet") return null
    if (item.p_action === "No Action") return null

    return (<>
      <i className="ion ion-md-arrow-forward text-body"></i>
      <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
        {item.p_action}
      </span>
    </>)
  }

  getItemActionIndicator(item) {
    if (item.p_action === "Bet") return (<>
      <div variant="opaque4" className="ml-1 font-weight-bold" style={{color: "#E48023"}}>Bet</div>
    </>)
    if (item.p_action === "Check") return (<>
      <div variant="opaque5" className="ml-1 font-weight-bold" style={{color: "#FE9600"}}>Check</div>
    </>)
    if (item.p_action === "Raise") return (<>
      <div variant="opaque4" className="ml-1 font-weight-bold" style={{color: "#46CB6B"}}>Raise</div>
    </>)
    if (item.p_action === "Re-Raise") return (<>
      <div variant="opaque4" className="ml-1 font-weight-bold" style={{color: "#46CB6B"}}>Re-Raise</div>
    </>)
    if (item.p_action === "Call") return (<>
      <div variant="opaque6" className="ml-1 font-weight-bold" style={{color: "#FFDA1B"}}>Call</div>
    </>)
    if (item.p_action === "Fold") return (<>
      <div variant="opaque7" className="ml-1 font-weight-bold" style={{color: "#DE4A4A"}}>Fold</div>
    </>)
    if (item.p_action === "All In") return (<>
      <div pill variant="opaque8" className="ml-1 font-weight-bold" style={{color: "#4FC7EC"}}>All In</div>
    </>)
    if (item.p_action === "Exited") return (<>
      <div pill variant="opaque7" className="ml-1 font-weight-bold" style={{color: "#DE4A4A"}}>Exit</div>
    </>)
    return null
  }

  getItemPanelBackground(item) {
    if (
      this.props.game.data.current_round !== GAME_ROUND_TYPE_NULL &&
      this.props.game.data.current_round !== GAME_ROUND_TYPE_SHOWDOWN
    ) {
      if (this.itemIsCurrentPlayer(item.p_username)) return 'bg-active-player-timer-progress'
      if (item.p_action === "All In") return 'bg-player-item-action-all-in'
      if (item.p_action === "Inactive") return 'bg-player-item-action-inactive'
      return null
    } else {
      return null
    }
  }

  getSeatCountArr() {
    var users = this.props.game.data.users
    var mseat = users.find(x=> x.username === this.props.game.profile.username)
    var tempArr = [];
    if (this.props.game.data) {
      tempArr = Array.from({ length: this.props.game.data.max_players }, (_, i) => i + 1)
    } else {
      tempArr = [1, 2, 3, 4, 5, 6]
    }
    var selectedIndex = mseat?mseat.p_seat - 1: 1;    
    for (var i = 0; i < selectedIndex; i++) {
      tempArr.push(tempArr.shift());
    }    
    return tempArr;
  }


  getSeatCount() {
    if (this.props.game.data) {
      return Number(this.props.game.data.max_players)
    } else {
      return 6
    }
  }

  getPlayersCount() {
    try {
      if (this.props.game.data) {
        return Number(this.props.game.data.users.length)
      } else {
        return 0
      }
    } catch {
      return 0
    }
  }

  getPlayersCountAsString() {
    try {
      if (this.props.game.data) {
        if (
          Number(this.props.game.data.users.length) === 0
        ) {
          return `No Live Players`
        } else if (
          Number(this.props.game.data.users.length) === 1
        ) {
          return `1 Live Player`
        } else {
          return `${Number(this.props.game.data.users.length)} Live Players`
        }
      } else {
        return `No Live Players`
      }
    } catch {
      return `No Live Players`
    }
  }

  getPlayerSitOutState(i, pos) {
    switch (pos) {
      case 'seat':
        if (i.p_sit_out_request) {
          if (i.p_sit_out) {
            return (
              <h5 className="mb-0 gen-icon-slide-l-opacity-animation">
                <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", fontSize: "1.5em !important", }}>
                  <i className="fas fa-sign-in-alt text-body"></i>
                </span>
              </h5>
            )
          } else {
            return (
              <h5 className="mb-0 gen-icon-slide-l-opacity-animation">
                <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", fontSize: "1.5em !important", }}>
                  <i className="fas fa-sign-out-alt text-body"></i>
                </span>
              </h5>
            )
          }
        } else {
          if (i.p_sit_out) {
            return (
              <h5 className="mb-0 gen-icon-slide-l-opacity-animation">
                <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", fontSize: "1.5em !important", }}>
                  <i className="fas fa-sign-out-alt text-body"></i>
                </span>
              </h5>
            )
          } else {
            return null
          }
        }

      case 'presence':
        if (i.p_sit_out_request) {
          if (i.p_sit_out) {
            return (
              <h5 className="mb-0 gen-icon-slide-l-opacity-animation">
                <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", fontSize: "1.5em !important", }}>
                  <i className="fas fa-sign-in-alt text-body"></i>
                </span>
              </h5>
            )
          } else {
            return (
              <h5 className="mb-0 gen-icon-slide-l-opacity-animation">
                <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", fontSize: "1.5em !important", }}>
                  <i className="fas fa-sign-out-alt text-body"></i>
                </span>
              </h5>
            )
          }
        } else {
          if (i.p_sit_out) {
            return (
              <h5 className="mb-0 gen-icon-slide-l-opacity-animation">
                <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", fontSize: "1.5em !important", }}>
                  <i className="fas fa-sign-out-alt text-body"></i>
                </span>
              </h5>
            )
          } else {
            return null
          }
        }

      default:
        return null
    }
  }

  getPlayerSitOutHint(i, pos) {
    switch (pos) {
      case 'seat':
        if (i.p_sit_out_request) {
          if (i.p_sit_out) {
            if (i.p_sit_out_dt) {

              let now = moment(new Date())
              let end = moment(i.p_sit_out_dt).add(5, 'minutes')
              let duration = moment.duration(end.diff(now))
              let minutes = duration.asMinutes()

              if (Number(minutes) > 5) {
                return (
                  <h5 className="mb-0 gen-icon-slide-l-opacity-animation">
                    <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", fontSize: "1.5em !important", }}>
                      <Countdown
                        date={new Date(i.p_sit_out_dt).getTime() + 300000}
                        intervalDelay={0} precision={3}
                        zeroPadTime={2}
                        renderer={SitOutTimeoutRenderer} />
                    </span>
                  </h5>
                )
              } else if (Number(minutes) <= 0) {
                return null
              } else {
                return (
                  <h5 className="mb-0 gen-icon-slide-l-opacity-animation">
                    <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", fontSize: "1.5em !important", }}>
                      <Countdown
                        date={new Date(i.p_sit_out_dt).getTime() + 300000}
                        intervalDelay={0} precision={3}
                        zeroPadTime={2}
                        renderer={SitOutTimeoutRenderer} />
                    </span>
                  </h5>
                )
              }

            } else {
              return null
            }
          } else {
            return null
          }
        } else {
          return null
        }

      case 'presence':
        if (i.p_sit_out_request) {
          if (i.p_sit_out) {
            if (i.p_sit_out_dt) {

              let now = moment(new Date())
              let end = moment(i.p_sit_out_dt).add(5, 'minutes')
              let duration = moment.duration(end.diff(now))
              let minutes = duration.asMinutes()

              if (Number(minutes) > 5) {
                return (
                  <h5 className="mb-0 gen-icon-slide-l-opacity-animation">
                    <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", fontSize: "1.5em !important", }}>
                      <Countdown
                        date={new Date(i.p_sit_out_dt).getTime() + 300000}
                        intervalDelay={0} precision={3}
                        zeroPadTime={2}
                        renderer={SitOutTimeoutRenderer} />
                    </span>
                  </h5>
                )
              } else if (Number(minutes) <= 0) {
                return null
              } else {
                return (
                  <h5 className="mb-0 gen-icon-slide-l-opacity-animation">
                    <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", fontSize: "1.5em !important", }}>
                      <Countdown
                        date={new Date(i.p_sit_out_dt).getTime() + 300000}
                        intervalDelay={0} precision={3}
                        zeroPadTime={2}
                        renderer={SitOutTimeoutRenderer} />
                    </span>
                  </h5>
                )
              }

            } else {
              return null
            }
          } else {
            return null
          }
        } else {
          return null
        }

      default:
        return null
    }
  }

  getPlayerMuckState(i, pos) {
    switch (pos) {
      case 'seat':
        if (i.p_muck_cards) {
          return (
            <h5 className="mb-0 livechat-panel-opacity-animation-up">
              <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", }}>
                <i className="fas fa-hand-paper text-body"></i>
              </span>
            </h5>
          )
        } else {
          return null
        }

      case 'presence':
        if (i.p_muck_cards) {
          return (
            <h5 className="mb-0 livechat-panel-opacity-animation-up">
              <span className="text-medium font-weight-bold ml-2" style={{ verticalAlign: "middle", }}>
                <i className="fas fa-hand-paper text-body"></i>
              </span>
            </h5>
          )
        } else {
          return null
        }

      default:
        return null
    }
  }

  handleGetSeatPositionL(Lpos){
    switch (Lpos) {
      case 1:
        return `38%`
      case 2:
        return `-14%`
      case 3:
        return `-14%`
      case 4:
        return `38%`
      case 5:
        return `86%`
      case 6:
        return `86%`
      default:
        return `0px`
    }
  }

  handleGetSeatPositionT(Tpos){
    switch (Tpos) {
      case 1:
        return `85%`
      case 2:
        return `50%`
      case 3:
        return `8%`
      case 4:
        return `-13%`
      case 5:
        return `8%`
      case 6:
        return `50%`
      default:
        return `0px`
    }
  }

ChipPositionT (Tpos) {
  switch (Tpos) {
    case 1 :
      return '-65%'
    case 2 :
      return '70%'
    case 3 :
      return '80%'
    case 4 :
      return '180%'
    case 5 :
      return '80%'
    case 6 :
      return '70%'
    default:
      return `0`
  }
}

ChipPositionL (Lpos) {
  switch (Lpos) {
    case 1 :
      return '0'
    case 2 :
      return '120%'
    case 3 :
      return '120%'
    case 4 :
      return '0'
    case 5 :
      return '-120%'
    case 6 :
      return '-120%'
    default:
      return `0`
  }
}

AvatarPlaceholder (pos) {
  switch (pos) {
    case 1:
      return 'avatar01'
    case 2:
      return 'avatar02'
    case 3:
      return 'avatar03'
    case 4:
      return 'avatar04'
    case 5:
      return 'avatar05'
    case 6:
      return 'avatar06'
    default :
      return 'avatar01'
  }
}

renderSeat(seat, index) {    
  var users = this.props.game.data.users 
  var wait = users.find(x => x.p_seat_request === seat && x.p_waiting)
  var item = users.find(x => x.p_seat === seat && !x.p_waiting && x.p_playing)    

  if (item) {
    return item.p_action === "Fold" ? <>
      {item.username === this.props.game.profile.username ? 
      <span
        key={index}
        onClick={this.prevent}          
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          padding: "0.375rem",
          marginLeft: "-8.3rem",
          left: this.handleGetSeatPositionL(index + 1),
          top: this.handleGetSeatPositionT(index + 1),            
        }}>
        <div className="position-relative" style={{marginLeft: "10rem"}}>
          <div style={{position: "absolute", top: "0", right: "-1.25rem", filter: "brightness(50%)", zIndex:"9999"}}>
            {this.getItemPlayerIcon(item)}
          </div>    
          <img src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`} className="rounded-circle" alt="User" style={{width: "5rem",height: "5rem", filter: "brightness(50%)", border: "0.18rem solid #FF3737"}}/> 
        </div>          
        <div style={{width: "14.75rem", height: "2.75rem", background: "rgba(0, 0, 0, 0.7)", border: "0.1rem solid #DE4A4A", borderRadius: "0.5rem", display: "flex", alignItems: "end",marginTop: "-0.43rem", zIndex: "1", position: "relative"}}>
          <div style={{position: "absolute", top: "-4.06rem", left: "0.625rem", filter: "brightness(50%)"}}>
            <HoleCardsHolder {...this.props} exit={this.props.exit} />
          </div>            
          <div className="d-flex flex-column align-items-center" style={{position: "absolute", top: "0", right: "0.625rem"}}>
            <span className="text-medium font-weight-bold" style={{color: "rgba(255, 255, 255, 0.6"}}>{truncateUsername(item.p_username)}</span>
            <span className="text-medium font-weight-bold" style={{color: "#DE4A4A"}}>Fold</span>            
          </div>
        </div> 
      </span > 
      :
      <span
        key={index}
        onClick={this.prevent}          
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0.375rem",            
          left: this.handleGetSeatPositionL(index + 1),
          top: this.handleGetSeatPositionT(index + 1),            
        }}>

        <div className="position-relative">
            <div style={{position: "absolute", top: "0", right: "-1.25rem", filter: "brightness(50%)", zIndex:"9999"}}>
              {this.getItemPlayerIcon(item)}
            </div>
          <img src={`${process.env.PUBLIC_URL}/svg/avatars/${this.AvatarPlaceholder(seat)}.svg`} className="rounded-circle" alt="User" style={{width: "5rem",height: "5rem",  filter: "brightness(50%)", border: "0.18rem solid #FF3737"}}/>
        </div>          
        <div style={{width: "6.43rem", height: "2.75rem", background: "rgba(0, 0, 0, 0.7)", border: "0.1rem solid #DE4A4A", borderRadius: "0.5rem", display: "flex", alignItems: "center",justifyContent: "center", marginTop: "-0.43rem", zIndex: "1", position: "relative"}}>                       
          <div className="d-flex flex-column align-items-center">
            <span className="text-medium font-weight-bold" style={{color: "rgba(255, 255, 255, 0.6"}}>{truncateUsername(item.p_username)}</span>
            <span className="text-medium font-weight-bold" style={{color: "#DE4A4A"}}>Fold</span>            
          </div>
        </div>           
        
      </span > }</>
      
     : item.username === this.props.game.profile.username ? (
      <div
        key={index} onClick={this.prevent}          
        style={{
          position: "absolute",
          left: this.handleGetSeatPositionL(index + 1),
          top: this.handleGetSeatPositionT(index + 1),
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          padding: "0.375rem",
          marginLeft: "-8.9rem",
        }}>

        <div className="position-relative" style={{marginLeft: "10rem"}}>
          <div style={{position: "absolute", top: "0", right: "-1.25rem"}}>
            {this.getItemPlayerIcon(item)}
          </div>
          {this.getItemPanelBackground(item) === null ? 
            <img src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`} className="rounded-circle" alt="User" style={{width: "5rem",height: "5rem", border: "0.18rem solid #4FC7EC"}}/>
          : 
            <img src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`} className="rounded-circle " alt="User" style={{width: "5rem",height: "5rem", border: "0.18rem solid #4FC7EC"}}/>
          }
          {item.p_bet_total === 0 || item.p_bet_per_round_display === 0 ?
                <></> :
                <div style={{position: "absolute", top: `${this.ChipPositionT(index + 1)}`, left: `${this.ChipPositionL(index + 1)}`}}>
                  <div className="d-flex">
                    <img src={`${process.env.PUBLIC_URL}/svg/icons/chip-icon.svg`} alt="Chip Icon" />
                    <span className="text-medium font-weight-bold ml-2 text-body">
                      {formatPrice(item.p_bet_per_round_display)}
                    </span>
                  </div>
                  {/* <div>{this.getItemActionIndicator(item)}</div>               */}
                </div> 
                }                    
        </div>

        
        <div style={{width: "14.75rem", height: "2.75rem", background: "rgba(0, 0, 0, 0.7)", border: "0.1rem solid #0986A9", borderRadius: "0.5rem", display: "flex", alignItems: "end",marginTop: "-0.43rem", zIndex: "1", position: "relative"}}>
          <div style={{position: "absolute", top: "-3.75rem", left: "0.625rem"}}>
            <HoleCardsHolder {...this.props} exit={this.props.exit} />
          </div>            
          <div className="d-flex flex-column align-items-center" style={{position: "absolute", top: "0", right: "1rem"}}>
            <div className="text-medium font-weight-bold">
              {truncateUsername(item.p_username)}
            </div>
            <div>
              {this.getItemActionIndicator(item) === null ? <>{formatPrice(item.p_balance_display)}</> : <>{this.getItemActionIndicator(item)}</> }
            </div>                
          </div>
        </div>
        <div className={`${this.getItemPanelBackground(item)}`} style={{width: "14.75rem", height: "0.43rem", margin: "0.43rem 0",borderRadius: "0.25rem"}}></div>
        
      </div>
      ) 
      : 
      (
        <div
          key={index} onClick={this.prevent}          
          style={{
            position: "absolute",
            left: this.handleGetSeatPositionL(index + 1),
            top: this.handleGetSeatPositionT(index + 1),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0.375rem",   
            // opacity: `${this.getItemOpacity(item)}`,
          }}>

          <div className="position-relative">
            <div style={{position: "absolute", top: "0", right: "-1.25rem"}}>
              {this.getItemPlayerIcon(item)}
            </div>
            <div className="d-flex" style={{position: "absolute", bottom: "0.23rem", right: "-1rem"}}>
              <img src={`${process.env.PUBLIC_URL}/svg/cards/X.svg`} alt="Card Back" style={{width: "1.25rem", height:"2.125rem", padding: "0"}} />
              <img src={`${process.env.PUBLIC_URL}/svg/cards/X.svg`} alt="Card Back" style={{width: "1.25rem", height: "2.125rem", padding: "0", marginLeft: "-0.4rem"}} />
            </div>
            {this.getItemPanelBackground(item) === null ? 
              <img src={`${process.env.PUBLIC_URL}/svg/avatars/${this.AvatarPlaceholder(seat)}.svg`} className="rounded-circle" alt="User" style={{width: "5rem",height: "5rem", border: "0.19rem solid #4FC7EC"}}/>
              :                 
              <img src={`${process.env.PUBLIC_URL}/svg/avatars/${this.AvatarPlaceholder(seat)}.svg`} className="rounded-circle player-list-active-seat" alt="User" style={{width: "5rem",height: "5rem", border: "0.19rem solid #4FC7EC"}}/>
              }
            {item.p_bet_total === 0 || item.p_bet_per_round_display === 0 ?
                <></> :
                <div style={{position: "absolute", top: `${this.ChipPositionT(index + 1)}`, left: `${this.ChipPositionL(index + 1)}`}}>
                  <div className="d-flex">
                    <img src={`${process.env.PUBLIC_URL}/svg/icons/chip-icon.svg`} alt="Chip Icon" />
                    <span className="text-medium font-weight-bold ml-2 text-body">
                      {formatPrice(item.p_bet_per_round_display)}
                    </span>
                  </div>
                  {/* <div>{this.getItemActionIndicator(item)}</div>               */}
                </div> 
                }                     
          </div>

          
          <div style={{width: "6.44rem", height: "2.75rem", background: "rgba(0, 0, 0, 0.7)", border: "0.1rem solid #0986A9", borderRadius: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-0.43rem", zIndex: "1"}}>
            <div className="d-flex flex-column align-items-center">
              <div className="text-medium font-weight-bold">
                {truncateUsername(item.p_username)}
              </div>
              <div>
                {this.getItemActionIndicator(item) === null ? <>{formatPrice(item.p_balance_display)}</> : <>{this.getItemActionIndicator(item)}</> }
              </div>                
            </div>
          </div>
          <div className={`${this.getItemPanelBackground(item)}`} style={{width: "6.44rem", height: "0.43rem", margin: "0.43rem 0",borderRadius: "0.25rem"}}></div>
          
        </div>
      )
    
  } else if (wait) {
    return (
      <span
        key={index}
        onClick={this.prevent}          
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0.187rem",
          left: this.handleGetSeatPositionL(index + 1),
          top: this.handleGetSeatPositionT(index + 1),            
        }}>

        <div className="position-relative">
          {wait.username === this.props.game.profile.username ?
           <img src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`} className="rounded-circle" alt="User" style={{width: "5rem",height: "5rem", border: "0.18rem solid #4FC7EC"}}/>
           : <img src={`${process.env.PUBLIC_URL}/svg/avatars/${this.AvatarPlaceholder(seat)}.svg`} className="rounded-circle" alt="User" style={{width: "5rem",height: "5rem", border: "0.18rem solid #4FC7EC"}}/>}
        </div>

        <div style={{width: "6.44rem", height: "2.75rem", background: "rgba(0, 0, 0, 0.7)", border: "0.1rem solid #0986A9", borderRadius: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-0.43rem", zIndex: "1"}}>
          <div className="d-flex flex-column align-items-center">
            <span className="text-medium font-weight-bold">{truncateUsername(wait.p_username)}</span>
            <span>
              {wait.p_sit_out ? 'Sitting Out' : 'Reserved Seat'}
            </span>
          </div>
        </div>
      </span >
    )
  } else {
    return (
      <span
        key={index}
        onClick={this.prevent}         
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0.187rem",
          left: this.handleGetSeatPositionL(index + 1),
          top: this.handleGetSeatPositionT(index + 1),           
        }}>

        <div className="position-relative cursor-pointer" onClick={() => { this.props.select(seat, false) }}>
          <div className="d-flex justify-content-center align-items-center rounded-circle"  style={{background: "#131313", width: "5rem", height: "5rem", border: "0.18rem solid #0986A9", boxShadow: "0px 2px 26px -3px #46CB6B"}}>
            <div className="rounded-circle d-flex justify-content-center align-items-center" style={{width: "2.5rem", height: "2.5rem", border: "0.125rem solid rgba(255, 255, 255, 0.9)"}}><div style={{fontSize: "1.375rem", color: "#FE9600"}}>{seat}</div></div>              
          </div>
        </div>

        <Media.Body className="d-flex flex-column text-center cursor-pointer" onClick={() => { this.props.select(seat, false) }} style={{marginTop: "-0.43rem", zIndex:"1" }}>
          <div style={{width: "6.44rem", height: "2.75rem", background: "rgba(0, 0, 0, 0.7)", border: "0.1rem solid #0986A9", borderRadius: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <span className="text-medium font-weight-bold" style={{color: "#46CB6B"}}>Take a Seat</span> 
          </div>             
        </Media.Body>         
      </span >
    )
  }
}

renderPresence(seat, index) {
  if (this.props.game.presence) {

    var users = this.props.game.presence.players
    var wait = users.find(x => x.p_seat === seat && !x.p_waiting && x.p_playing)
    var item = users.find(x => x.p_seat_request === seat && x.p_waiting)

    if (item) {
      return (
          <div
            key={index} onClick={this.prevent}          
            style={{
              position: "absolute",
              left: this.handleGetSeatPositionL(index + 1),
              top: this.handleGetSeatPositionT(index + 1),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0.375rem",   
              // opacity: `${this.getItemOpacity(item)}`,
            }}>

            <div className="position-relative">
              <div style={{position: "absolute", top: "0", right: "-1.25rem"}}>
                {this.getItemPlayerIcon(item)}
              </div>   
                {item.username === this.props.game.profile.username ?
                <img src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`} className="rounded-circle" alt="User" style={{width: "5rem",height: "5rem", border: "0.18rem solid #4FC7EC"}}/>
                : <img src={`${process.env.PUBLIC_URL}/svg/avatars/${this.AvatarPlaceholder(seat)}.svg`} className="rounded-circle" alt="User" style={{width: "5rem",height: "5rem", border: "0.18rem solid #4FC7EC"}}/>}
              {/* <div className="d-flex" style={{position: "absolute", top: `${this.ChipPositionT(index + 1)}`, left: `${this.ChipPositionL(index + 1)}`}}>
                <img src={`${process.env.PUBLIC_URL}/svg/icons/chip-icon.svg`} alt="Chip Icon" />
                <span className="text-medium font-weight-bold ml-2 text-body">
                  {formatPrice(item.p_bet_total)}
                </span>
              </div>                      */}
            </div>

            
            <div style={{width: "6.43rem", height: "2.75rem", background: "rgba(0, 0, 0, 0.7)", border: "0.1rem solid #0986A9", borderRadius: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-0.43rem", zIndex: "1"}}>
              <div className="d-flex flex-column align-items-center">
                <div className="text-medium font-weight-bold">
                  {truncateUsername(item.p_username)}
                </div>
                <div>
                  {formatPrice(item.p_balance_display)}
                </div>                
              </div>
            </div>
            <div className={`${this.getItemPanelBackground(item)}`} style={{width: "6.43rem", height: "0.43rem", margin: "0.43rem 0", borderRadius: "0.25rem"}}></div>
            
          </div>
        )
    } else if (wait) {
      return (
        <span
          key={index}
          onClick={this.prevent}            
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0.18rem",
            left: this.handleGetSeatPositionL(index + 1),
            top: this.handleGetSeatPositionT(index + 1),               
          }}>

          <div className="position-relative">
            {wait.username === this.props.game.profile.username ?
            <img src={`data:image/jpeg;base64, ${this.props.game.profile.avatar}`} className="rounded-circle" alt="User" style={{width: "5rem",height: "5rem", border: "0.18rem solid #4FC7EC"}}/>
            : <img src={`${process.env.PUBLIC_URL}/svg/avatars/${this.AvatarPlaceholder(seat)}.svg`} className="rounded-circle" alt="User" style={{width: "5rem",height: "5rem", border: "0.18rem solid #4FC7EC"}}/>}
          </div>

          <div style={{width: "6.43rem", height: "2.75rem", background: "rgba(0, 0, 0, 0.7)", border: "0.1rem solid #0986A9", borderRadius: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-0.43rem", zIndex: "1"}}>
            <div className="d-flex flex-column align-items-center">
              <span className="text-medium font-weight-bold">{truncateUsername(wait.p_username)}</span>
              <span>
                {wait.p_sit_out ? 'Sitting Out' : 'Reserved Seat'}
              </span>
            </div>
          </div>
          
        </span >
      )
    } else {
      return (
        <span
          key={index}
          onClick={this.prevent}            
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0.18rem",
            left: this.handleGetSeatPositionL(index + 1),
            top: this.handleGetSeatPositionT(index + 1),           
          }}>

          <div className="position-relative cursor-pointer" onClick={() => { this.props.select(seat, false) }}>
            <div className="d-flex justify-content-center align-items-center rounded-circle"  style={{background: "#131313", width: "5rem", height: "5rem", border: "0.18rem solid #0986A9", boxShadow: "0px 2px 26px -3px #46CB6B"}}>
              <div className="rounded-circle d-flex justify-content-center align-items-center" style={{width: "2.5rem", height: "2.5rem", border: "0.125rem solid rgba(255, 255, 255, 0.9)"}}><div style={{fontSize: "1.375rem", color: "#FE9600"}}>{seat}</div></div>              
            </div>
          </div>

          <Media.Body className="d-flex flex-column text-center cursor-pointer" onClick={() => { this.props.select(seat, false) }} style={{marginTop: "-0.43rem", zIndex:"1" }}>
            <div style={{width: "6.43rem", height: "2.75rem", background: "rgba(0, 0, 0, 0.7)", border: "0.1rem solid #0986A9", borderRadius: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <span className="text-medium font-weight-bold" style={{color: "#46CB6B"}}>Take a Seat</span> 
            </div>             
          </Media.Body>        
        </span >
      )
    }
  }
}

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.props.game.data && (
          <>
            {/* Player List */}
            {!this.state.init
              ? <>
                <div
                  className="flex-grow-1 position-absolute player-list-mobile-layout-s3">
                  <div
                    className="chat-contacts list-group chat-scroll py-1 justify-content-start position-relative">
                    {/* Player List Main */}
                    {this.props.settings.optionD11 && (
                      <div style={{position: "relative", width: "26rem", height: "22rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div style={{width: "26rem", height: "22rem", border: "0.2rem solid #4FC7EC", borderRadius: "4rem", background: "rgba(0, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <div className="d-flex flex-column align-items-center">
                            <span style={{ fontSize: "1.12rem", color: "#FFDA1B", fontWeight: "700"}}>
                              Total Pot: {formatPrice(this.props.game.data.current_game_values.total_pot)}
                            </span>
                            {/* Cards Panel */}
                            
                              <CardsPanel
                                {...this.props}
                                {...this.state}
                                exit={this.props.exit}/>
                                  
                            {/* / Cards Panel */}
                            {/* <span className="d-flex font-weight-bold" style={{ marginTop:"1rem", fontSize: "1rem", color: "#FFFFFF" }}>
                              <div className="px-4">{formatPrice(this.props.game.data.current_game_values.total_pot/3)}</div>
                              <div className="px-4">{formatPrice(this.props.game.data.current_game_values.total_pot/3 +this.props.game.data.current_game_values.total_pot/3)}</div>
                            </span>                                                  */}
                          </div>
                        </div>
                        {this.getSeatCountArr()
                          .map((seat, index) => this.renderSeat(seat, index)
                          )}
                      </div>
                    )}
                    {/* / Player List Main */}                    

                    {/* Click To Enable Player List */}
                    {!this.props.settings.optionD11 && (
                      <Card
                        className="bg-widget5 border-0 shadow-none p-2 mb-0 cursor-pointer playerlist-enable-header"
                        style={{
                          borderRadius: "10px",
                          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                        }}
                        onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                        <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
                          <span className="mb-0 font-weight-bold ml-1">
                            <span className="d-flex align-items-center">
                              <div>
                                <i
                                  className="fas fa-users"
                                  style={{
                                    fontSize: "250%",
                                  }}
                                />
                              </div>
                              <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                                <div>
                                  <div className="text-body text-big font-weight-bold" style={{
                                    lineHeight: "0px",
                                  }}>
                                    Live Players
                                    <Badge
                                      pill variant="default"
                                      className="font-weight-bold align-text-bottom ml-1 cursor-pointer">
                                      Open
                                    </Badge>
                                  </div>
                                  <span
                                    className="text-muted small mt-0 cursor-pointer font-weight-bold"
                                    onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                                    {this.getPlayersCountAsString()}
                                  </span>
                                </div>
                              </span>
                            </span>
                          </span>

                          <div className="playerlist-icon-header">
                            <i
                              className="fas fa-users mr-2"
                              style={{
                                fontSize: "250%",
                              }}
                            />
                          </div>
                        </span>
                      </Card>
                    )}
                    {/* / Click To Enable Player List */}
                    {!this.props.settings.optionD11 && (
                      <Card
                        className="bg-widget5 border-0 shadow-none p-2 mb-0 cursor-pointer playerlist-mobile-enable-header"
                        style={{
                          borderRadius: "10px",
                          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                        }}
                        onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                        <span className="d-flex align-items-center justify-content-between bg-transparent pl-1">
                          <span className="mb-0 font-weight-bold ml-0">
                            <span className="d-flex align-items-center">
                              <div>
                                <i
                                  className="fas fa-users"
                                  style={{
                                    fontSize: "250%",
                                  }}
                                />
                              </div>
                              <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                                <div>
                                  <div className="text-body text-big font-weight-bold" style={{
                                    lineHeight: "0px",
                                  }}>
                                    Live Players
                                    <Badge
                                      pill variant="default"
                                      className="font-weight-bold align-text-bottom ml-1 cursor-pointer">
                                      Open
                                    </Badge>
                                  </div>
                                  <span
                                    className="text-muted small mt-0 cursor-pointer font-weight-bold"
                                    onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                                    {this.getPlayersCountAsString()}
                                  </span>
                                </div>
                              </span>
                            </span>
                          </span>

                          <div className="playerlist-icon-header">
                            <i
                              className="fas fa-users mr-2"
                              style={{
                                fontSize: "250%",
                              }}
                            />
                          </div>
                        </span>
                      </Card>
                    )}
                    {/* / Click To Enable Player List */}

                  </div>
                </div>
              </>
              : <>
                <div
                  className="position-absolute player-list-mobile-layout-s3">
                  <div
                    className="chat-contacts list-group chat-scroll py-1 justify-content-start position-relative">                    
                    {/* Player List Main */}
                    {this.props.settings.optionD11 && (
                      <div style={{position: "relative", width: "26rem", height: "22rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <div style={{width: "26rem", height: "22rem", border: "0.2rem solid #4FC7EC", borderRadius: "4rem", background: "rgba(0, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center"}}></div>
                        {this.getSeatCountArr()
                          .map((seat, index) => this.renderPresence(seat, index)
                          )}
                      </div>
                    )}
                    {/* / Player List Main */}

                    {/* Click To Enable Player List */}
                    {!this.props.settings.optionD11 && (
                      <Card
                        className="bg-widget5 border-0 shadow-none p-2 mb-0 cursor-pointer playerlist-enable-header"
                        style={{
                          borderRadius: "10px",
                          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))",
                        }}
                        onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                        <span className="d-flex align-items-center justify-content-between bg-transparent pl-2">
                          <span className="mb-0 font-weight-bold ml-1">
                            <span className="d-flex align-items-center">
                              <div>
                                <i
                                  className="fas fa-users"
                                  style={{
                                    fontSize: "250%",
                                  }}
                                />
                              </div>
                              <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                                <div>
                                  <div className="text-body text-big font-weight-bold" style={{
                                    lineHeight: "0px",
                                  }}>
                                    Live Players
                                    <Badge
                                      pill variant="default"
                                      className="font-weight-bold align-text-bottom ml-1 cursor-pointer">
                                      Open
                                    </Badge>
                                  </div>
                                  <span
                                    className="text-muted small mt-0 cursor-pointer font-weight-bold"
                                    onClick={e => this.props.change('optionD11', !this.props.settings.optionD11)}>
                                    {this.getPlayersCountAsString()}
                                  </span>
                                </div>
                              </span>
                            </span>
                          </span>

                          <div className="playerlist-icon-header">
                            <i
                              className="fas fa-users mr-0"
                              style={{
                                fontSize: "250%",
                              }}
                            />
                          </div>
                        </span>
                      </Card>
                    )}
                    {/* / Click To Enable Player List */}

                  </div>
                </div>
              </>}
            {/* / Player List */}
          </>
        )}
      </>
    )
  }
}

export default PlayerList