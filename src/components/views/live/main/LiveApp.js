import React, { Component, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import fscreen from 'fscreen'

import API from '../../../../api'
import ActionPanel from '../partials/ActionPanel'
import DealerModal from '../partials/DealerModal'
import DropdownMenu from '../partials/DropdownMenu'
import FillInModal from '../partials/FillInModal'
import PlayerList from '../partials/PlayerList'
import MessageModal from '../partials/MessageModal'
import MobilePartials from '../partials/MobilePartials'
import Notifications from '../partials/Notifications'
import PlayerPanel from '../partials/PlayerPanel'
import SFXPlayer from '../partials/SFXPlayer'
import SlideInModal from '../partials/SlideInModal'
import StatusBarLarge from '../partials/StatusBarLarge'
import ToastAdapter from '../partials/ToastAdapter'
import TopNavigation from '../partials/TopNavigation'
import WebSocketAdapter from '../core/WebSocketAdapter'

import BackgroundPanel from '../hud/groups/panels/BackgroundPanel'
import ErrorPanel from '../hud/groups/panels/ErrorPanel'
import LoadingPanel from '../hud/groups/panels/LoadingPanel'
import TimerPanel from '../hud/groups/panels/TimerPanel'

import {
  MSG_PRESENCE_STATE,
  MSG_GAME_STATE,
  MSG_JOINABLE,
  MSG_JOIN_STATE,
  MSG_PLAYER_STATE,
  MSG_CONNECTED,
  MSG_PROFILE_DATA,
  MSG_TEXT_MESSAGE,
  MSG_STATUS_MESSAGE,
  MSG_NOTIFICATIONS,
  MSG_SEND_NEW_CARD,
  MSG_SEND_NEW_BURN,
  MSG_BUY_IN_REQUEST,
  MSG_BUY_IN_RESPONSE,
  MSG_RE_BUY_REQUEST,
  MSG_RE_BUY_RESPONSE,
  MSG_DEALER_TIP_REQUEST,
  MSG_NEW_GAME,
  MSG_END_GAME,
  MSG_DEALER_STATE,
  MSG_DEALER_NEW_GAME,
  MSG_DEALER_UPDATE_PLAYERS,
  MSG_DEALER_SHUFFLE_COUNTDOWN,
  MSG_UPDATE_GAME_PLAYER,
  MSG_UPDATE_GAME_PLAYERS,
  MSG_UPDATE_SYNC_STATE,
  MSG_UPDATE_GAME_EVALUATION,
  MSG_UPDATE_GAME_EVALUATION_ERROR,
  MSG_UPDATE_PLAYER_STATISTICS,
} from '../core/MessageTypes'

import {
  STATE_ANALYTICS,
  STATE_BURN,
  STATE_BUY_IN,
  STATE_BUY_IN_RES,
  STATE_CARDS,
  STATE_CONNECTION,
  STATE_DEALER_TIP,
  STATE_GAME_DATA,
  STATE_DEALER,
  STATE_ERROR,
  STATE_EVALUATION,
  STATE_HISTORY,
  STATE_JOINING,
  STATE_MESSAGES,
  STATE_NEW_GAME,
  STATE_NOTIFICATIONS,
  STATE_PLAYER,
  STATE_PLAYERS,
  STATE_PRESENCE,
  STATE_PROFILE,
  STATE_RE_BUY,
  STATE_RE_BUY_RES,
  STATE_REPORT,
  STATE_SHUFFLE,
  STATE_STATUS,
  STATE_STREAMS,
  STATE_SYNCED,
} from '../core/StateTypes'

import {
  DEFAULT_SESSION_PROPERTY_REALM,
  DEFAULT_SESSION_PROPERTY_GAME_ID,
  DEFAULT_SESSION_PROPERTY_LIVE_MODE,
  DEFAULT_SESSION_PROPERTY_DEMO_MODE,
  DEFAULT_SESSION_PROPERTY_THRESHOLD,
} from '../core/PropertyConfig'

import {
  PROVIDER_TYPE_EXTERNAL,
  PROVIDER_TYPE_EVERYMATRIX,
} from '../core/ProviderTypes'

import '../../../../vendor/styles/layouts/1/layout.scss'
import '../../../../vendor/styles/pages/chat.scss'

var Wordfilter = require('bad-words')

function FullScreenContainer(Component) {
  return function WrappedComponent(props) {
    const [fsEnabled, setFsEnabled] = useState(false)
    function fsEnter() {
      if (fscreen.fullscreenEnabled) {
        var element = document.getElementsByTagName('body')[0]
        fscreen.addEventListener('fullscreenchange', fsHandler, false)
        fscreen.requestFullscreen(element)
      }
    }
    function fsExit() {
      if (fsEnabled && fscreen.fullscreenEnabled) {
        fscreen.exitFullscreen()
      }
    }
    function fsHandler() {
      if (fscreen.fullscreenElement !== null) {
        setFsEnabled(true)
      } else {
        setFsEnabled(false)
      }
    }
    return (
      <Component {...props}
        fsEnabled={fsEnabled} fsEnter={fsEnter} fsExit={fsExit} />
    )
  }
}

class GameLiveConnectView extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Play Now')

    this.profanityFilter = new Wordfilter({ placeHolder: '*', })

    this._isMounted = false
    this._evaluationTimeout = null
    this._heartbeatInterval = null

    this.toggleSidebox1 = this.toggleSidebox1.bind(this)
    this.toggleSidebox2 = this.toggleSidebox2.bind(this)
    this.onSlideModalOpen = this.onSlideModalOpen.bind(this)
    this.onSlideModalEnter = this.onSlideModalEnter.bind(this)
    this.onSlideModalClose = this.onSlideModalClose.bind(this)
    this.onDealerModalOpen = this.onDealerModalOpen.bind(this)
    this.onDealerModalEnter = this.onDealerModalEnter.bind(this)
    this.onDealerModalClose = this.onDealerModalClose.bind(this)
    this.onFillInModalOpen = this.onFillInModalOpen.bind(this)
    this.onFillInModalEnter = this.onFillInModalEnter.bind(this)
    this.onFillInModalClose = this.onFillInModalClose.bind(this)
    this.onMessageModalOpen = this.onMessageModalOpen.bind(this)
    this.onMessageModalEnter = this.onMessageModalEnter.bind(this)
    this.onMessageModalClose = this.onMessageModalClose.bind(this)
    this.onHandleLeaveGame = this.onHandleLeaveGame.bind(this)
    this.onHandleExitSession = this.onHandleExitSession.bind(this)
    this.onHandleClearSession = this.onHandleClearSession.bind(this)
    this.onHandleCloseSession = this.onHandleCloseSession.bind(this)
    this.onHandleAppendHistory = this.onHandleAppendHistory.bind(this)
    this.onHandleSettingsChange = this.onHandleSettingsChange.bind(this)
    this.onHandleResetAutoOptions = this.onHandleResetAutoOptions.bind(this)
    this.onHandleSetInactivityTimeout = this.onHandleSetInactivityTimeout.bind(this)
    this.onHandleSelectSeat = this.onHandleSelectSeat.bind(this)
    this.onHandleResetPlayer = this.onHandleResetPlayer.bind(this)
    this.onHandleUpdateOptions = this.onHandleUpdateOptions.bind(this)
    this.onHandleCaptureScreenshot = this.onHandleCaptureScreenshot.bind(this)
    this.onHandleMuteAudioElements = this.onHandleMuteAudioElements.bind(this)

    this.state = {

      channelId: null,
      isConnected: false,
      isConnecting: true,
      isExited: false,
      isError: false,
      isClosed: false,
      isInactive: false,
      sideboxOpen1: false,
      sideboxOpen2: false,      

      game: {
        analytics: null,
        burn: null,
        buyin: null,
        buyin_res: null,
        cards: null,
        connection: null,
        data: null,
        dealer: null,
        dealertip: null,
        error: null,
        evaluation: null,
        history: [],
        joining: false,
        messages: [],
        newgame: null,
        notifications: null,
        player: null,
        players: null,
        presence: null,
        profile: null,
        rebuy: null,
        rebuy_res: null,
        report: [],
        shuffle: null,
        status: null,
        streams: null,
        synced: null,
        tournament: false,
        transactions: [],
      },

      settings: {
        optionA1: false,
        optionA2: false,
        optionA3: false,
        optionA4: false,
        optionA5: false,
        optionA6: true,
        optionA7: false,
        optionA8: false,
        optionA9: false,
        optionA10: false,
        optionB1: 75,
        optionB2: true,
        optionB3: 100,
        optionB4: true,
        optionC1: 75,
        optionC2: 100,
        optionC3: 0,
        optionC4: 0,
        optionC5: 0,
        optionC6: 60,
        optionC7: 50,
        optionC8: 50,
        optionC9: false,
        optionD1: false,
        optionD2: true,
        optionD3: true,
        optionD4: true,
        optionD5: true,
        optionD6: false,
        optionD7: false,
        optionD8: true,
        optionD9: true,
        optionD10: true,
        optionD11: true,
        optionD12: false,
        optionD13: false,
        optionD14: true,
        optionD15: true,
        optionE1: true,
        optionE2: null,
        optionE3: null,
        optionE4: null,
        optionE5: 0,
        optionF1: true,
        optionF2: false,
        optionF3: true,
        optionF4: 0,
        optionF5: 2,
        optionF6: 1,
        optionF7: true,
        optionF8: true,
        optionG1: true,
        optionG2: true,
        optionG3: true,
        optionG4: true,
        optionG5: true,
        optionG6: true,
        optionG7: true,
        optionG8: true,
        optionG9: true,
        optionG10: true,
        optionG11: true,
        optionG12: true,
        optionH1: true,
        optionH2: true,
        optionH3: true,
        optionH4: true,
        optionH5: true,
        optionH6: true,
        optionH7: true,
        optionH8: true,
        optionI1: false,
        optionI2: false,
        optionI3: false,
        optionJ1: false,
        optionJ2: false,
        optionK1: 0,
        optionK2: 1,
        optionK3: true,
        optionK4: 2,
        optionK5: false,
        optionK6: false,
        optionL1: true,
        optionM1: false,
      },

      options: {
        bet: {
          mode: true,
          preValue: null,
          display: true,
        },
        raise: {
          mode: true,
          preValue: null,
          display: true,
        },
        call: {
          mode: true,
          preValue: null,
          display: true,
        },
      },

      slideModalShow: false,
      slideModalEnter: false,
      slideModalContent: 0,
      dealerModalShow: false,
      dealerModalEnter: false,
      dealerModalContent: 0,
      fillInModalShow: false,
      fillInModalEnter: false,
      fillInModalContent: 0,
      messageModalShow: false,
      messageModalEnter: false,
      messageModalContent: 0,
      selectedSeat: 0,
      screenshot: null,

      // providerId: "everymatrix",

    }
  }

  async componentDidMount() {  
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
    this._isMounted = true
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    })

    var freePlay = (params.freePlay === 'true')

    let fd = new FormData()
    fd.append('params', JSON.stringify({
      id: this.props.match.params.id || '',
      provider: this.props.providerId || '',
      access_code: this.props.accessCode || '',
      properties: {
        realm: params.realm
          ? params.realm
          : DEFAULT_SESSION_PROPERTY_REALM,
        game_id: params.gameId
          ? String(params.gameId)
          : DEFAULT_SESSION_PROPERTY_GAME_ID,
        live_mode: params.live
          ? params.live
          : DEFAULT_SESSION_PROPERTY_LIVE_MODE,
        demo_mode: freePlay
          ? params.freePlay
          : DEFAULT_SESSION_PROPERTY_DEMO_MODE,
        threshold: params.stake
          ? params.stake
          : DEFAULT_SESSION_PROPERTY_THRESHOLD,
      },
    }))

    await API.post(
      `session/create/`, fd, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data',
      },
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          channelId: res.data.channel_id,
        }, () => {
          this.socket = this.initiateWebSocket()
        })
      }
    }).catch(err => {
      this.onHandleClearSession()
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreenSize); 
    this._isMounted = false
    if (this.state.client) {
      this.state.client.close()
    }
    clearTimeout(this._evaluationTimeout)
    clearInterval(this._heartbeatInterval)
  }
  
  checkScreenSize = () => {
    const screenSize = window.innerWidth; 
    if (screenSize <= 430) {
      this.setState({ 
        settings: {
          ...this.state.settings,         
          optionD15: false,
          optionD4: false,
        }
      });  
      
    } else {
      this.setState({ 
        settings: {
          ...this.state.settings,         
          optionD15: true,
          optionD4: true,
        }
      });
    }
  };

  toggleSidebox1(e) {
    e.preventDefault()
    this.setState({
      sideboxOpen1: !this.state.sideboxOpen1,
    })
  }

  toggleSidebox2(e) {
    e.preventDefault()
    this.setState({
      sideboxOpen2: !this.state.sideboxOpen2,
    })
  }

  onSlideModalOpen(c) {
    this.setState({
      slideModalShow: true,
      slideModalContent: c,
    })
  }

  onSlideModalEnter() {
    if (
      this.state.slideModalContent === 1 |
      this.state.slideModalContent === 2 |
      this.state.slideModalContent === 4 |
      this.state.slideModalContent === 10 |
      this.state.slideModalContent === 11
    ) {
      this.setState({
        slideModalEnter: true,
      })
    }
  }

  onSlideModalClose() {
    this.setState({
      slideModalShow: false,
      slideModalEnter: false,
    })
  }

  onFillInModalOpen(c) {
    this.setState({
      fillInModalShow: true,
      fillInModalContent: c,
    })
  }

  onFillInModalEnter() {
    this.setState({
      fillInModalEnter: true,
    })
  }

  onFillInModalClose() {
    this.setState({
      fillInModalShow: false,
      fillInModalEnter: false,
    })
  }

  onDealerModalOpen(c) {
    this.setState({
      dealerModalShow: true,
      dealerModalContent: c,
    })
  }

  onDealerModalEnter() {
    this.setState({
      dealerModalEnter: true,
    })
  }

  onDealerModalClose() {
    this.setState({
      dealerModalShow: false,
      dealerModalEnter: false,
    })
  }

  onMessageModalOpen(c) {
    this.setState({
      messageModalShow: true,
      messageModalContent: c,
    })
  }

  onMessageModalEnter() {
    this.setState({
      messageModalEnter: true,
    })
  }

  onMessageModalClose() {
    this.setState({
      messageModalShow: false,
      messageModalEnter: false,
    })
  }

  onGameUpdate(field, data) {
    this.setState({
      game: {
        ...this.state.game,
        [field]: data,
      }
    })
  }

  onHandleAppendHistory(obj) {
    if (this.state.game.profile) {
      var item = obj.winner_map.find(x => x.player_username === this.state.game.profile.username)
      if (item) {
        this.onGameUpdate(STATE_HISTORY, [...this.state.game.history, item])
        this.onGameUpdate(STATE_REPORT, [...this.state.game.report, obj.bet_history])
      }
    }
  }

  onHandleSettingsChange(field, value) {
    switch (field) {

      case 'optionA1':
        if (value) {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
              optionA2: false,
              optionA3: false,
              optionA4: false,
              optionA7: false,
              optionA8: false,
              optionA9: false,
              optionA10: false,
            }
          })
        } else {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
            }
          })
        }
        break

      case 'optionA2':
        if (value) {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
              optionA1: false,
              optionA3: false,
              optionA4: false,
              optionA7: false,
              optionA8: false,
              optionA9: false,
              optionA10: false,
            }
          })
        } else {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
            }
          })
        }
        break

      case 'optionA3':
        if (value) {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
              optionA1: false,
              optionA2: false,
              optionA4: false,
              optionA7: false,
              optionA8: false,
              optionA9: false,
              optionA10: false,
            }
          })
        } else {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
            }
          })
        }
        break

      case 'optionA4':
        if (value) {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
              optionA1: false,
              optionA2: false,
              optionA3: false,
              optionA7: false,
              optionA8: false,
              optionA9: false,
              optionA10: false,
            }
          })
        } else {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
            }
          })
        }
        break

      case 'optionA5':
        if (value) {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
              optionA1: false,
              optionA2: false,
              optionA3: false,
              optionA4: false,
              optionA7: false,
              optionA8: false,
              optionA9: false,
              optionA10: false,
            }
          })
        } else {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
            }
          })
        }
        break

      case 'optionA7':
        if (value) {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
              optionA1: false,
              optionA2: false,
              optionA3: false,
              optionA4: false,
              optionA8: false,
              optionA9: false,
              optionA10: false,
            }
          })
        } else {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
            }
          })
        }
        break

      case 'optionA8':
        if (value) {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
              optionA1: false,
              optionA2: false,
              optionA3: false,
              optionA4: false,
              optionA7: false,
              optionA9: false,
              optionA10: false,
            }
          })
        } else {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
            }
          })
        }
        break

      case 'optionA9':
        if (value) {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
              optionA1: false,
              optionA2: false,
              optionA3: false,
              optionA4: false,
              optionA7: false,
              optionA8: false,
              optionA10: false,
            }
          })
        } else {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
            }
          })
        }
        break

      case 'optionA10':
        if (value) {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
              optionA1: false,
              optionA2: false,
              optionA3: false,
              optionA4: false,
              optionA7: false,
              optionA8: false,
              optionA9: false,
            }
          })
        } else {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
            }
          })
        }
        break

      case 'optionD7':
        if (!value) {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
              optionD6: false,
            }
          })
        } else {
          this.setState({
            settings: {
              ...this.state.settings,
              [field]: value,
            }
          })
        }
        break

      default:
        this.setState({
          settings: {
            ...this.state.settings,
            [field]: value,
          }
        })
        break
    }
  }

  onHandleMuteAudioElements(mute) {
    this.setState({
      settings: {
        ...this.state.settings,
        optionB2: mute ? true : false,
        optionB4: mute ? true : false,
      }
    })
  }

  onHandleResetAutoOptions() {
    this.setState({
      settings: {
        ...this.state.settings,
        optionA1: false,
        optionA2: false,
        optionA3: false,
        optionA4: false,
        optionA5: false,
        optionA7: false,
        optionA8: false,
        optionA9: false,
        optionA10: false,
      }
    })
  }

  initiateWebSocket() {
    this.setState({
      client: new WebSocketAdapter({
        callback: function (info, obj) {
          switch (info) {
            case MSG_PRESENCE_STATE:
              this.onGameUpdate(STATE_PRESENCE, obj.payload)
              break
            case MSG_GAME_STATE:
              this.onGameUpdate(STATE_GAME_DATA, obj.game)
              this.onGameUpdate(STATE_STREAMS, obj.game.table_streams)
              break
            case MSG_JOINABLE:
              break
            case MSG_JOIN_STATE:
              this.onGameUpdate(STATE_JOINING, obj.payload)
              break;
            case MSG_PLAYER_STATE:
              this.onGameUpdate(STATE_PLAYER, obj.current_player)
              break
            case MSG_CONNECTED:
              this.setState({ connection: obj.message }, () => {
                setTimeout(() => {
                  this.setState({
                    isConnected: true,
                    isConnecting: false,
                  }, () => {
                    this.onGameUpdate(STATE_CONNECTION, obj.message)
                    if (!this.state.game.player && !this.state.game.dealer) {
                      setTimeout(() => {
                        // this.onFillInModalOpen(1)
                      }, 500)
                    }
                  })
                }, 2000)
              })
              break
            case MSG_PROFILE_DATA:
              this.onGameUpdate(STATE_PROFILE, obj.profile)
              break
            case MSG_TEXT_MESSAGE:
              if (this.state.settings.optionF7) {
                try {
                  obj.payload.data = this.profanityFilter.clean(obj.payload.data)
                } catch { }
                this.onGameUpdate(STATE_MESSAGES, [...this.state.game.messages, obj.payload])
              }
              break
            case MSG_STATUS_MESSAGE:
              this.onGameUpdate(STATE_STATUS, obj.payload)
              if (!this.state.dealerModalShow) {
                this.onMessageModalOpen(2)
              }
              break
            case MSG_NOTIFICATIONS:
              this.onGameUpdate(STATE_NOTIFICATIONS, obj.notifications)
              break
            case MSG_SEND_NEW_CARD:
              this.onGameUpdate(STATE_CARDS, obj.payload)
              break
            case MSG_SEND_NEW_BURN:
              this.onGameUpdate(STATE_BURN, obj.payload)
              break
            case MSG_BUY_IN_REQUEST:
              this.onGameUpdate(STATE_BUY_IN, obj.buy_in_request)
              break
            case MSG_BUY_IN_RESPONSE:
              this.onGameUpdate(STATE_BUY_IN_RES, obj.buy_in_response)
              break
            case MSG_RE_BUY_REQUEST:
              this.onGameUpdate(STATE_RE_BUY, obj.re_buy_request)
              break
            case MSG_RE_BUY_RESPONSE:
              this.onGameUpdate(STATE_RE_BUY_RES, obj.re_buy_response)
              break
            case MSG_DEALER_TIP_REQUEST:
              this.onGameUpdate(STATE_DEALER_TIP, obj.dealer_tip_request)
              break
            case MSG_NEW_GAME:
              this.onGameUpdate(STATE_NEW_GAME, obj)
              if (!this.state.dealerModalShow) {
                this.onMessageModalOpen(1)
              }
              break
            case MSG_END_GAME:
              break
            case MSG_DEALER_STATE:
              this.onGameUpdate(STATE_DEALER, obj.dealer)
              if (obj.dealer) {
                this.setState({
                  settings: {
                    ...this.state.settings,
                    optionF8: false,
                    optionK6: true,
                  }
                })
              }
              break
            case MSG_DEALER_NEW_GAME:
              break
            case MSG_DEALER_UPDATE_PLAYERS:
              this.onGameUpdate(STATE_PLAYERS, obj.update_players)
              this.onSlideModalOpen(12)
              break
            case MSG_DEALER_SHUFFLE_COUNTDOWN:
              this.onGameUpdate(STATE_SHUFFLE, obj.payload)
              break
            case MSG_UPDATE_GAME_PLAYER:
              this.onGameUpdate(STATE_PLAYER, obj.current_player)
              break
            case MSG_UPDATE_GAME_PLAYERS:
              this.onGameUpdate(STATE_GAME_DATA, obj.game)
              break
            case MSG_UPDATE_SYNC_STATE:
              this.onGameUpdate(STATE_SYNCED, obj)
              break
            case MSG_UPDATE_GAME_EVALUATION:
              this.onHandleAppendHistory(obj)
              this.onGameUpdate(STATE_EVALUATION, obj)
              if (!this.state.dealerModalShow) {
                try {
                  if (this.state.game.data.auto_mode) {
                    this.onFillInModalOpen(3)
                  } else {
                    this._evaluationTimeout = setTimeout(() => {
                      this.onFillInModalOpen(3)
                    }, 1000)
                  }
                } catch {
                  this.onFillInModalOpen(3)
                }
              }
              break
            case MSG_UPDATE_GAME_EVALUATION_ERROR:
              this.onGameUpdate(STATE_ERROR, obj)
              if (!this.state.dealerModalShow) {
                try {
                  if (this.state.game.data.auto_mode) {
                    this.onFillInModalOpen(11)
                  } else {
                    this._evaluationTimeout = setTimeout(() => {
                      this.onFillInModalOpen(11)
                    }, 1000)
                  }
                } catch {
                  this.onFillInModalOpen(11)
                }
              }
              break
            case MSG_UPDATE_PLAYER_STATISTICS:
              this.onGameUpdate(STATE_ANALYTICS, obj.statistics)
              break
            default:
              break
          }
        }.bind(this),
        callbackError: function (error) {
          if (this._isMounted) {
            this.props.fsExit()
            this.setState({
              isConnected: false,
              isConnecting: false,
              isExited: true,
              isError: true,
              isClosed: true,
            })
          }
        }.bind(this),
        callbackClose: function (error) {
          if (this._isMounted) {
            this.props.fsExit()
            this.setState({
              isConnected: false,
              isConnecting: false,
              isExited: true,
              isError: false,
              isClosed: true,
            })
          }
        }.bind(this),
      },
        String(process.env.REACT_APP_ENV === 'development'
          ? process.env.REACT_APP_DEV_WSS_HOST
          : process.env.REACT_APP_WSS_HOST),
        String(this.state.channelId),
        String(this.props.providerId),
        String(this.props.accessCode),
      )
    }, () => {
      this._heartbeatInterval = setInterval(() => {
        this.state.client.sendPlayerHeartbeat(0)
      }, 30000)
    })
  }

  onHandleCloseSession() {
    this.setState({
      isExited: true,
      isConnected: false,
      isConnecting: false,
    }, () => {
      this.props.fsExit()
      if (this.state.client) {
        this.state.client.sendPlayerExit()
        this.state.client.close()
      }
    })
  }

  onHandleExitSession() {
    this.setState({
      isExited: true,
      isConnected: false,
      isConnecting: false,
    }, () => {
      this.props.fsExit()
      if (this.state.client) {
        this.state.client.sendPlayerExit()
        this.state.client.close()
      }
    })
  }

  onHandleClearSession() {
    this.setState({
      isExited: false,
      isConnected: false,
      isConnecting: false,
    }, () => {
      this.props.fsExit()
      if (this.state.client) {
        this.state.client.sendPlayerExit()
        this.state.client.close()
      }
    })
  }

  onHandleLeaveGame() {
    this.setState({
      isExited: true,
      isConnected: false,
      isConnecting: false,
    }, () => {
      this.props.fsExit()
      if (this.state.client) {
        this.state.client.sendPlayerExit()
        this.state.client.close()
      }
      if ([PROVIDER_TYPE_EXTERNAL, PROVIDER_TYPE_EVERYMATRIX,].includes(this.props.providerId)) {
        this.props.history.push(`/games/live/connect/${this.props.providerId}/exit`)
      } else {
        this.props.history.push('/')
      }
    })
  }

  onHandleResetPlayer() {
    this.onGameUpdate(STATE_PLAYER, null)
  }

  onHandleCaptureScreenshot(dataUrl) {
    this.setState({
      screenshot: dataUrl,
    }, () => {
      this.onFillInModalOpen(10)
    })
  }

  onHandleSelectSeat(seat, reset) {
    if (!reset) {
      this.setState({
        selectedSeat: seat,
      }, () => {
        this.onFillInModalOpen(1)
      })
    } else {
      this.setState({
        selectedSeat: 0,
      })
    }
  }

  onHandleSetInactivityTimeout() {
    this.setState({
      isInactive: true,
    }, () => {
      this.onHandleExitSession()
    })
  }

  onHandleUpdateOptions(type, option, value) {
    this.setState({
      options: {
        ...this.state.options,
        [type]: {
          ...this.state.options[type],
          [option]: value,
        },
      },
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() { 
    
    return (<>      
      {this.state.isConnected
        ? <>
          {/* Live App */}
          <div
            className={`chat-wrapper ${this.state.sideboxOpen1
              ? 'chat-sidebox-open'
              : ''}`}
            style={{
              height: "100vh",
              width: "100vw",
              filter: `blur(${this.state.slideModalShow || this.state.fillInModalShow
                ? '5px'
                : '0px'})`,
              background: "#0D131C",
              // backgroundImage: `url(${process.env.PUBLIC_URL}/img/cardroom/bg.jpg)`,
            }}>

            <BackgroundPanel
              {...this.props} {...this.state}
              change={this.onHandleSettingsChange}
              openSlide={this.onSlideModalOpen} />

            <Card className="flex-grow-1 position-relative overflow-hidden bg-transparent" style={{
              borderRadius: "0px",
              // boxShadow: `inset 0px 0px ${Number(this.state.settings.optionC7) / 10}rem ${Number(this.state.settings.optionC8) / 10}rem rgba(0, 0, 0, ${Number(this.state.settings.optionC6) / 100})`,
            }}>
              <Row noGutters className="h-100">
                <Col
                  className="chat-sidebox-1 bg-transparent pl-3"
                  style={{
                    flexBasis: "24rem",
                  }}>

                  {/* Player Panel */}
                  <PlayerPanel
                    {...this.props} {...this.state}
                    open={this.onFillInModalOpen}
                    openSlide={this.onSlideModalOpen}
                    change={this.onHandleSettingsChange}
                    select={this.onHandleSelectSeat}
                  />
                  {/* / Player Panel */}

                </Col>

                <Col
                  className="d-flex flex-column"
                  style={{
                    flexGrow: "30",
                  }}>

                  {/* Top Navigation */}
                  <TopNavigation
                    {...this.props} {...this.state}
                    openFill={this.onFillInModalOpen}
                    openSlide={this.onSlideModalOpen}
                    toggle={this.toggleSidebox1}
                  />
                  {/* / Top Navigation */}

                  {this.state.settings.optionK5 && (
                    <>
                      {/* Action Panel */}
                      <ActionPanel
                        {...this.props} {...this.state}
                        openDealer={this.onDealerModalOpen}
                        openFill={this.onFillInModalOpen}
                        openSlide={this.onSlideModalOpen}
                        change={this.onHandleSettingsChange}
                        changeOptions={this.onHandleUpdateOptions}
                        resetAuto={this.onHandleResetAutoOptions}
                        exit={this.onHandleLeaveGame}
                      />
                      {/* / Action Panel */}
                    </>
                  )}

                </Col>

                <Col
                  className="right-action-panel bg-transparent pr-3"
                  style={{
                    zIndex: "0",
                  }}>

                  {/* Dropdown Menu */}
                  <DropdownMenu
                    {...this.props} {...this.state}
                    openFill={this.onFillInModalOpen}
                    openSlide={this.onSlideModalOpen}
                    change={this.onHandleSettingsChange}
                    capture={this.onHandleCaptureScreenshot}
                    setMute={this.onHandleMuteAudioElements}
                  />
                  {/* / Dropdown Menu */}

                  {/* Player List */}
                  <PlayerList
                    {...this.props} {...this.state}
                    change={this.onHandleSettingsChange}
                    open={this.onFillInModalOpen}
                    openSlide={this.onSlideModalOpen}
                    select={this.onHandleSelectSeat}                    
                  />
                  {/* / Player List */}   
                </Col>
              </Row>

              {/* Mobile Partials */}
              <MobilePartials
                {...this.props} {...this.state}
                open={this.onFillInModalOpen}
                openSlide={this.onSlideModalOpen}
                change={this.onHandleSettingsChange}
                changeOptions={this.onHandleUpdateOptions}
                resetAuto={this.onHandleResetAutoOptions}
                exit={this.onHandleLeaveGame}
                select={this.onHandleSelectSeat}
              />
              {/* / Mobile Partials */}

              {!this.state.settings.optionK5 && (
                <>
                  {/* Status Bar Large */}
                  <StatusBarLarge
                    {...this.props} {...this.state}
                    open={this.onFillInModalOpen}                    
                    openSlide={this.onSlideModalOpen}
                    openDealer={this.onDealerModalOpen}
                    change={this.onHandleSettingsChange}
                    changeOptions={this.onHandleUpdateOptions}
                    resetAuto={this.onHandleResetAutoOptions}
                    exit={this.onHandleLeaveGame}
                  />
                  {/* / Status Bar Large */}
                </>
              )}

            </Card>

            {/* Message Modal */}
            <MessageModal
              {...this.props} {...this.state}
              enter={this.onMessageModalEnter}
              close={this.onMessageModalClose}
            />
            {/* / Message Modal */}

            {/* Slide In Modal */}
            <SlideInModal
              {...this.props} {...this.state}
              enter={this.onSlideModalEnter}
              close={this.onSlideModalClose}
              openFill={this.onFillInModalOpen}
              openSlide={this.onSlideModalOpen}
              changeSettings={this.onHandleSettingsChange}
              exit={this.onHandleLeaveGame}
            />
            {/* / Slide In Modal */}

            {/* Dealer Modal */}
            <DealerModal
              {...this.props} {...this.state}
              enter={this.onDealerModalEnter}
              close={this.onDealerModalClose}
            />
            {/* / Dealer Modal */}

            {/* Fill In Modal */}
            <FillInModal
              {...this.props} {...this.state}
              enter={this.onFillInModalEnter}
              close={this.onFillInModalClose}
              exit={this.onHandleLeaveGame}
              exitSession={this.onHandleExitSession}
              select={this.onHandleSelectSeat}
              change={this.onHandleSettingsChange}
              mute={this.onHandleMuteAudioElements}
              timeout={this.onHandleSetInactivityTimeout}
              openFill={this.onFillInModalOpen}
              openSlide={this.onSlideModalOpen}
            />
            {/* / Fill In Modal */}

            {/* Notifications */}
            <Notifications
              {...this.props} {...this.state}
              open={this.onSlideModalOpen}
              change={this.onHandleSettingsChange}
              reset={this.onHandleResetPlayer}
              resetAuto={this.onHandleResetAutoOptions}
            />
            {/* / Notifications */}

            {/* SFXPlayer */}
            <SFXPlayer
              {...this.props} {...this.state}
              change={this.onHandleSettingsChange}
            />
            {/* / SFXPlayer */}

            {/* Toast Adapter */}
            <ToastAdapter />
            {/* / Toast Adapter */}
          </div>
          {/* / Live App */}
        </>
        : this.state.isConnecting
          ? <LoadingPanel
            {...this.props} {...this.state} />
          : <ErrorPanel
            {...this.props} {...this.state} />
      }

      <TimerPanel
        {...this.props} {...this.state}
        open={this.onFillInModalOpen}
        close={this.onHandleExitSession}
        timeout={this.onHandleSetInactivityTimeout}
        exit={this.onHandleLeaveGame} />     

    </>)
  }
}

export default FullScreenContainer(GameLiveConnectView)
