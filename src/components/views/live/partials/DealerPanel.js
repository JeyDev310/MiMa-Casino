import React, { Component } from 'react'
import { Badge, Button, Card, Dropdown, DropdownButton, Media, ProgressBar } from 'react-bootstrap'

import debounce from 'debounce'

import {
  MSG_TYPE_DEALER_START_SHUFFLE_LIVE_FALSE,
  MSG_TYPE_DEALER_REQUEST_UPDATE_PLAYERS,
  MSG_TYPE_DEALER_SHUFFLE_COUNTDOWN,
  MSG_TYPE_DEALER_RESUME_GAME,
  MSG_TYPE_DEALER_NEXT_PLAYER,
  MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA,
  MSG_TYPE_DEALER_HARD_RESET,
  MSG_TYPE_DEALER_DISCONNECT_ALL,
} from '../core/DealerActionTypes'

import {
  resolveBreakpoint,
  translateBreakpoint,
} from '../core/Breakpoints'

import '../../../../vendor/styles/pages/chat.scss'

class DealerPanel extends Component {

  constructor(props) {
    super(props)

    this.sendMessage = this.sendMessage.bind(this)
    this.resolveWindowBreakpoint = this.resolveWindowBreakpoint.bind(this)
    this.handleRenderDealerConnectionBadge = this.handleRenderDealerConnectionBadge.bind(this)

    this.state = {
      init: false,
      username: 'N/A',
      email: 'N/A',
    }

    window.addEventListener("resize", debounce(this.resolveWindowBreakpoint, 10))
  }

  resolveWindowBreakpoint() {
    this.setState({
      size: translateBreakpoint(resolveBreakpoint(window.innerWidth)),
    })
  }

  componentDidMount() {
    if (this.props.game.dealer) {
      this.setState({
        init: true,
      }, () => {
        this.resolveWindowBreakpoint()
      })
    } else {
      this.setState({
        init: false,
      })
    }
    try {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
        email: JSON.parse(localStorage.getItem('user')).user.email,
      })
    } catch { }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.dealer !== this.props.game.dealer) {
      if (this.props.game.dealer) {
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
    window.removeEventListener("resize", debounce(this.resolveWindowBreakpoint, 50))
  }

  sendMessage(action) {
    this.props.client.sendDealerAction(
      this.props.game.data.room_name,
      this.props.game.data.current_round,
      action,
      JSON.stringify([]),
    )
  }

  handleRenderDealerConnectionBadge() {
    if (this.state.size >= 4 && this.state.size <= 5) {
      return (<>
        {this.props.game.profile
          ? <span className="text-medium font-weight-bold">DP</span>
          : <span className="text-medium font-weight-bold">N/A</span>
        }
      </>)
    } else if (this.state.size >= 0 && this.state.size <= 2) {
      return (<>
        {this.props.game.profile
          ? <span className="text-medium font-weight-bold">DP</span>
          : <span className="text-medium font-weight-bold">N/A</span>
        }
      </>)
    } else {
      return (<>
        {this.props.game.profile
          ? <span className="text-medium font-weight-bold">Dealer Panel</span>
          : <span className="text-medium font-weight-bold">N/A</span>
        }
        <span className="chat-status text-body font-weight-bold ml-2">
          {this.props.game.connection === "connected"
            ? <Badge className="ml-0" pill variant="success">Connected</Badge>
            : <Badge className="ml-0" pill variant="danger">Disconnected</Badge>
          }
        </span>
      </>)
    }
  }

  handleReturnToLogin() {
    this.props.history.push('/')
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.state.init && (
          <>
            {/* Dealer Panel */}
            <div className="authentication-inner py-2 auth-loader-layout-s1" style={{ width: "600px", }}>
              <Card
                style={{
                  borderRadius: "10px 10px 0px 0px",
                  backgroundColor: "rgb(0,0,0,0.6)",
                  border: "0px",
                  filter: "drop-shadow(0px 0px 10px rgb(0, 0, 0))",
                }}>
                <Card.Body className="px-5 pt-5 pb-4 mb-0">
                  <div className="d-flex justify-content-start align-items-center mb-4">
                    <div className="ui-w-100">
                      <div className="w-100 position-relative" style={{ paddingBottom: '10%', }}>
                        <img
                          src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                          alt="Live Poker Studio™" className="d-block ui-w-140" />
                      </div>
                    </div>
                  </div>

                  <Media className="align-items-center text-left">
                    <Media.Body>
                      <div className="text-light text-tiny font-weight-semibold line-height-1 mb-1">
                        LOGGED IN AS
                      </div>
                      <div className="text-large font-weight-bolder line-height-1">
                        {this.state.username}
                      </div>
                      <div className="font-weight-bold small">
                        {this.state.email}
                      </div>
                    </Media.Body>
                  </Media>

                  <hr className="my-4" />

                  <form>
                    <div className="mt-4 mb-0">
                      <Button
                        block size="md"
                        variant="macos w-100 d-flex align-items-center justify-content-center mb-2"
                        className="font-weight-bold"
                        onClick={() => {
                          this.props.openDealer(1)
                        }}>
                        Live Cards
                      </Button>

                      <DropdownButton
                        size="md"
                        variant="macos w-100 d-flex align-items-center justify-content-center mb-2"
                        title={
                          <>
                            <span className="font-weight-bold">
                              New Action
                            </span>
                          </>
                        }
                        className="d-inline-block d-flex align-items-center"
                        alignRight={false}>

                        <Dropdown.Header>Game Analysis</Dropdown.Header>

                        <Dropdown.Item
                          className="small font-weight-bold"
                          onClick={() => {
                            this.sendMessage(MSG_TYPE_DEALER_REQUEST_UPDATE_PLAYERS)
                          }}>
                          Get Player Data
                        </Dropdown.Item>

                        <Dropdown.Header>Pre Game Actions</Dropdown.Header>

                        <Dropdown.Item
                          className="small font-weight-bold"
                          onClick={() => {
                            this.sendMessage(MSG_TYPE_DEALER_SHUFFLE_COUNTDOWN)
                          }}>
                          Shuffle Countdown
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="small font-weight-bold"
                          onClick={() => {
                            this.sendMessage(MSG_TYPE_DEALER_START_SHUFFLE_LIVE_FALSE)
                          }}>
                          Shuffle System
                        </Dropdown.Item>

                        <Dropdown.Header>Mid Game Actions</Dropdown.Header>

                        <Dropdown.Item
                          className="small font-weight-bold"
                          onClick={() => {
                            this.sendMessage(MSG_TYPE_DEALER_RESUME_GAME)
                          }}>
                          Resume Game
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="small font-weight-bold"
                          onClick={() => {
                            this.sendMessage(MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA)
                          }}>
                          Start Showdown
                        </Dropdown.Item>

                        <Dropdown.Header>Player Handling</Dropdown.Header>

                        <Dropdown.Item
                          className="small font-weight-bold"
                          onClick={() => {
                            this.sendMessage(MSG_TYPE_DEALER_NEXT_PLAYER)
                          }}>
                          Skip Player
                        </Dropdown.Item>

                        <Dropdown.Header>Error Handling</Dropdown.Header>

                        <Dropdown.Item
                          className="small font-weight-bold"
                          onClick={() => {
                            this.sendMessage(MSG_TYPE_DEALER_HARD_RESET)
                          }}>
                          Reset Game
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="small font-weight-bold"
                          onClick={() => {
                            this.sendMessage(MSG_TYPE_DEALER_DISCONNECT_ALL)
                          }}>
                          Disconnect All
                        </Dropdown.Item>
                      </DropdownButton>

                      <Button
                        block size="md"
                        variant="macos w-100 d-flex align-items-center justify-content-center mb-2"
                        className="font-weight-bold"
                        onClick={() => {
                          this.sendMessage(MSG_TYPE_DEALER_REQUEST_UPDATE_PLAYERS)
                        }}>
                        Game Players
                      </Button>

                      <Button
                        block size="md"
                        variant="macos w-100 d-flex align-items-center justify-content-center mb-0"
                        className="font-weight-bold"
                        onClick={() => {
                          this.sendMessage(MSG_TYPE_DEALER_RESUME_GAME)
                        }}>
                        Resume
                      </Button>
                    </div>
                  </form>
                </Card.Body>

                <Card.Footer className="px-sm-5 text-left text-muted small mb-1">
                  <span>
                    Not you?
                  </span>
                  <span
                    className="ml-1 font-weight-bold text-body cursor-pointer"
                    onClick={() => { this.handleReturnToLogin() }}>
                    Login as a different user
                  </span>
                </Card.Footer>
              </Card>

              <ProgressBar
                variant={"success"}
                now={100}
                animated={true}
                style={{
                  height: "16px",
                  borderTopLeftRadius: "0px",
                  borderTopRightRadius: "0px",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  backgroundColor: "rgb(0,0,0,0.6)",
                }} />
            </div>
            {/* / Dealer Panel */}
          </>
        )}
      </>
    )
  }
}

export default DealerPanel