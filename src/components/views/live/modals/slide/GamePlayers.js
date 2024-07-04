import React, { Component } from 'react'
import { Button, Card, Col, Dropdown, Media, Modal, OverlayTrigger, Row, SplitButton, Popover } from 'react-bootstrap'

import {
  MSG_TYPE_DEALER_START_SHUFFLE_LIVE_FALSE,
  MSG_TYPE_DEALER_REQUEST_UPDATE_PLAYERS,
  MSG_TYPE_DEALER_PROCESS_START_NEW_GAME,
  MSG_TYPE_DEALER_SHUFFLE_COUNTDOWN,
  MSG_TYPE_DEALER_RESUME_GAME,
  MSG_TYPE_DEALER_NEXT_PLAYER,
  MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA,
  MSG_TYPE_DEALER_HARD_RESET,
  MSG_TYPE_DEALER_DISCONNECT_ALL,
} from '../../core/DealerActionTypes'

import {
  formatPrice,
  truncateUsername,
} from '../../utilities/TextPreprocessing'

import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'

import '../../../../../vendor/styles/pages/chat.scss'

class GamePlayers extends Component {

  constructor(props) {
    super(props)

    this.sendMessage = this.sendMessage.bind(this)
    this.getItemPlayerIcon = this.getItemPlayerIcon.bind(this)

    this.state = {
      init: false,
      data: null,
    }
  }

  componentDidMount() {
    if (this.props.game.players) {
      this.setState({
        init: true,
      })
    } else {
      this.setState({
        init: false,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.players !== this.props.game.players) {
      if (this.props.game.players) {
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

  sendMessage(action) {
    this.props.client.sendDealerAction(
      this.props.game.data.room_name,
      this.props.game.data.current_round,
      action,
      JSON.stringify([]),
    )
  }

  getItemPlayerIcon(p) {
    if (p.p_sit_out) {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx player-position-icon-halo-transform-animation">
          <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0001 4.04166C32.3317 1.5408 37.6685 1.5408 42.0001 4.04166L58.311 13.4587C62.6426 15.9596 65.311 20.5814 65.311 25.5831V44.4173C65.311 49.419 62.6426 54.0408 58.311 56.5417L42.0001 65.9587C37.6685 68.4596 32.3317 68.4596 28.0001 65.9587L11.6892 56.5417C7.3576 54.0408 4.68921 49.419 4.68921 44.4173V25.5831C4.68921 20.5814 7.3576 15.9596 11.6892 13.4587L28.0001 4.04166Z" fill="white" />
            <path opacity="0.3" d="M50 35C50 26.7157 43.2843 20 35 20C26.7157 20 20 26.7157 20 35C20 43.2843 26.7157 50 35 50C43.2843 50 50 43.2843 50 35Z" fill="black" />
            <path d="M33.5 29V36.5C33.5 37.3284 34.1716 38 35 38C35.8284 38 36.5 37.3284 36.5 36.5V29C36.5 28.1716 35.8284 27.5 35 27.5C34.1716 27.5 33.5 28.1716 33.5 29Z" fill="black" />
            <path d="M35 39.5C34.1716 39.5 33.5 40.1716 33.5 41C33.5 41.8284 34.1716 42.5 35 42.5C35.8284 42.5 36.5 41.8284 36.5 41C36.5 40.1716 35.8284 39.5 35 39.5Z" fill="black" />
          </svg>
        </span>
      )
    }
    if (p.p_low_balance) {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx player-position-icon-halo-transform-animation">
          <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0001 4.04166C32.3317 1.5408 37.6685 1.5408 42.0001 4.04166L58.311 13.4587C62.6426 15.9596 65.311 20.5814 65.311 25.5831V44.4173C65.311 49.419 62.6426 54.0408 58.311 56.5417L42.0001 65.9587C37.6685 68.4596 32.3317 68.4596 28.0001 65.9587L11.6892 56.5417C7.3576 54.0408 4.68921 49.419 4.68921 44.4173V25.5831C4.68921 20.5814 7.3576 15.9596 11.6892 13.4587L28.0001 4.04166Z" fill="white" />
            <path opacity="0.3" d="M34.7926 54.7407C33.6371 54.7407 32.8667 53.9703 32.8667 52.8148V18.1481C32.8667 16.9925 33.6371 16.2222 34.7926 16.2222C35.9482 16.2222 36.7186 16.9925 36.7186 18.1481V52.8148C36.7186 53.9703 35.9482 54.7407 34.7926 54.7407Z" fill="black" />
            <path d="M45 40.6823C45 42.223 44.6148 43.7638 43.8444 44.9193C43.074 46.2675 41.9185 47.2304 40.1851 47.8082C38.6444 48.5786 36.7185 48.9638 34.6 48.9638C32.0962 48.9638 29.9777 48.386 28.2444 47.423C27.0889 46.6527 26.1259 45.8823 25.3555 44.5341C24.5852 43.3786 24.2 42.223 24.2 41.0675C24.2 40.4897 24.3925 39.9119 24.7777 39.3341C25.1629 38.949 25.7407 38.5638 26.5111 38.5638C27.0889 38.5638 27.474 38.7564 27.8592 39.1416C28.2444 39.5267 28.6296 40.1045 28.8222 40.6823C29.2073 41.4527 29.5925 42.223 29.9777 42.8008C30.3629 43.3786 30.9407 43.7638 31.5185 44.149C32.2888 44.5341 33.0592 44.7267 34.2148 44.7267C35.7555 44.7267 37.1037 44.3416 38.0666 43.5712C39.0296 42.8008 39.6074 41.8378 39.6074 40.8749C39.6074 40.1045 39.4148 39.3341 38.837 38.7564C38.2592 38.1786 37.6814 37.7934 36.7185 37.6008C35.9481 37.4082 34.7925 37.023 33.4444 36.6379C31.5185 36.2527 29.9777 35.6749 28.8222 35.0971C27.474 34.5193 26.511 33.749 25.7407 32.786C24.9703 31.823 24.5852 30.4748 24.5852 28.9341C24.5852 27.586 24.9703 26.2378 25.7407 25.0823C26.511 23.9267 27.6666 23.1565 29.2074 22.5787C30.7481 22.0009 32.4814 21.6157 34.4074 21.6157C35.9481 21.6157 37.2962 21.8082 38.6444 22.1934C39.8 22.5786 40.7629 23.1564 41.5333 23.7342C42.3037 24.312 42.8814 25.0823 43.2666 25.8527C43.6518 26.623 43.8444 27.2008 43.8444 27.9711C43.8444 28.5489 43.6518 29.1267 43.2666 29.7045C42.8814 30.2823 42.3037 30.4749 41.5333 30.4749C40.9555 30.4749 40.3777 30.2822 40.1851 30.0896C39.9925 29.897 39.6074 29.3194 39.2222 28.549C38.837 27.586 38.2592 26.8155 37.4888 26.2378C36.7185 25.66 35.7555 25.4676 34.2148 25.4676C32.8666 25.4676 31.7111 25.8528 30.9407 26.4305C30.1703 27.0083 29.5925 27.7786 29.5925 28.549C29.5925 29.1268 29.7851 29.5119 29.9777 29.8971C30.1703 30.2823 30.7481 30.6674 31.1333 30.86C31.5185 31.0526 32.0962 31.4379 32.674 31.4379C33.2518 31.6304 34.0222 31.823 35.1777 32.2082C36.7185 32.5934 38.0666 32.9786 39.2222 33.3638C40.3777 33.749 41.3407 34.3267 42.3037 34.9045C43.074 35.4823 43.8444 36.2527 44.2296 37.2156C44.6148 38.1786 45 39.3341 45 40.6823Z" fill="black" />
          </svg>
        </span>
      )
    }
    if (p.p_smallblind) {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx player-position-icon-halo-transform-animation">
          <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0001 4.04166C32.3317 1.5408 37.6685 1.5408 42.0001 4.04166L58.311 13.4587C62.6426 15.9596 65.311 20.5814 65.311 25.5831V44.4173C65.311 49.419 62.6426 54.0408 58.311 56.5417L42.0001 65.9587C37.6685 68.4596 32.3317 68.4596 28.0001 65.9587L11.6892 56.5417C7.3576 54.0408 4.68921 49.419 4.68921 44.4173V25.5831C4.68921 20.5814 7.3576 15.9596 11.6892 13.4587L28.0001 4.04166Z" fill="white" />
            <path d="M24.3396 47C30.4481 47 34.0971 44.0422 34.0971 39.3804C34.0971 35.7314 31.8466 33.722 26.8955 32.7736L24.5164 32.3235C21.9926 31.8413 20.9478 31.1661 20.9478 29.9444C20.9478 28.578 22.2016 27.6135 24.3396 27.6135C26.0435 27.6135 27.3295 28.1762 28.0851 29.6229C28.7763 30.7482 29.58 31.2143 30.866 31.2143C32.3449 31.1983 33.3416 30.282 33.3416 28.9156C33.3416 28.4334 33.2612 28.0476 33.1005 27.6457C31.9752 24.704 28.7281 23 24.2914 23C18.9545 23 15.0804 25.8774 15.0804 30.3463C15.0804 33.8828 17.4916 36.1494 22.1052 37.0174L24.5003 37.4675C27.2492 37.998 28.2297 38.6571 28.2297 39.9431C28.2297 41.3577 26.7348 42.3865 24.436 42.3865C22.5713 42.3865 21.0121 41.7756 20.2244 40.3289C19.4689 39.1715 18.6973 38.7696 17.5559 38.7696C16.061 38.7696 15 39.7662 15 41.2451C15 41.7274 15.0965 42.2257 15.3054 42.708C16.2699 45.1031 19.3081 47 24.3396 47Z" fill="black" />
            <path d="M39.7877 46.5981H47.9056C52.8727 46.5981 56.0074 43.9779 56.0074 39.9109C56.0074 36.8245 53.5318 34.4936 50.3972 34.349V34.2204C52.9692 33.8667 54.9303 31.793 54.9303 29.1889C54.9303 25.6042 52.1815 23.4019 47.6162 23.4019H39.7877C37.923 23.4019 36.8299 24.5271 36.8299 26.4883V43.5117C36.8299 45.4729 37.923 46.5981 39.7877 46.5981ZM42.7294 32.854V27.5814H46.0569C48.0342 27.5814 49.1916 28.5459 49.1916 30.1695C49.1916 31.8413 47.9056 32.854 45.7676 32.854H42.7294ZM42.7294 42.4186V36.4387H46.2016C48.6289 36.4387 50.0114 37.4997 50.0114 39.3965C50.0114 41.3577 48.6611 42.4186 46.2338 42.4186H42.7294Z" fill="black" />
          </svg>
        </span>
      )
    }
    if (p.p_dealer) {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx player-position-icon-halo-transform-animation">
          <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0001 4.04166C32.3317 1.5408 37.6685 1.5408 42.0001 4.04166L58.311 13.4587C62.6426 15.9596 65.311 20.5814 65.311 25.5831V44.4173C65.311 49.419 62.6426 54.0408 58.311 56.5417L42.0001 65.9587C37.6685 68.4596 32.3317 68.4596 28.0001 65.9587L11.6892 56.5417C7.3576 54.0408 4.68921 49.419 4.68921 44.4173V25.5831C4.68921 20.5814 7.3576 15.9596 11.6892 13.4587L28.0001 4.04166Z" fill="white" />
            <path d="M28.0603 47H34.7464C41.9813 47 46.2557 42.526 46.2557 34.8586C46.2557 27.2079 41.9979 23 34.7464 23H28.0603C26.131 23 25 24.1642 25 26.1933V43.8067C25 45.8358 26.131 47 28.0603 47ZM31.1039 42.0769V27.9231H33.948C37.8067 27.9231 40.052 30.368 40.052 34.8753C40.052 39.6653 37.9231 42.0769 33.948 42.0769H31.1039Z" fill="black" />
          </svg>
        </span>
      )
    }
    if (p.p_bigblind) {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx player-position-icon-halo-transform-animation">
          <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0001 4.04166C32.3317 1.5408 37.6685 1.5408 42.0001 4.04166L58.311 13.4587C62.6426 15.9596 65.311 20.5814 65.311 25.5831V44.4173C65.311 49.419 62.6426 54.0408 58.311 56.5417L42.0001 65.9587C37.6685 68.4596 32.3317 68.4596 28.0001 65.9587L11.6892 56.5417C7.3576 54.0408 4.68921 49.419 4.68921 44.4173V25.5831C4.68921 20.5814 7.3576 15.9596 11.6892 13.4587L28.0001 4.04166Z" fill="white" />
            <path d="M18.0603 47H26.4595C31.5988 47 34.842 44.289 34.842 40.0811C34.842 36.8877 32.2807 34.4761 29.0374 34.3264V34.1933C31.6985 33.8274 33.7277 31.6819 33.7277 28.9875C33.7277 25.2786 30.8836 23 26.1601 23H18.0603C16.131 23 15 24.1642 15 26.1933V43.8067C15 45.8358 16.131 47 18.0603 47ZM21.104 32.7796V27.3243H24.5468C26.5925 27.3243 27.79 28.3222 27.79 30.0021C27.79 31.7318 26.4595 32.7796 24.2474 32.7796H21.104ZM21.104 42.6757V36.4886H24.6965C27.2079 36.4886 28.6383 37.5863 28.6383 39.5489C28.6383 41.578 27.2412 42.6757 24.7297 42.6757H21.104Z" fill="black" />
            <path d="M40.4803 47H48.8794C54.0187 47 57.262 44.289 57.262 40.0811C57.262 36.8877 54.7006 34.4761 51.4574 34.3264V34.1933C54.1185 33.8274 56.1476 31.6819 56.1476 28.9875C56.1476 25.2786 53.3035 23 48.58 23H40.4803C38.5509 23 37.42 24.1642 37.42 26.1933V43.8067C37.42 45.8358 38.5509 47 40.4803 47ZM43.5239 32.7796V27.3243H46.9667C49.0125 27.3243 50.21 28.3222 50.21 30.0021C50.21 31.7318 48.8794 32.7796 46.6674 32.7796H43.5239ZM43.5239 42.6757V36.4886H47.1164C49.6279 36.4886 51.0582 37.5863 51.0582 39.5489C51.0582 41.578 49.6611 42.6757 47.1497 42.6757H43.5239Z" fill="black" />
          </svg>
        </span>
      )
    }
    return (
      <span className="svg-icon svg-icon-muted svg-icon-2hx player-position-icon-halo-transform-animation">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" version="1.1">
          <circle fill="white" cx="12" cy="12" r="8" />
        </svg>
      </span>
    )
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Game Players Modal */}

        <Modal.Body style={{ margin: "0" }}>
          <h4 className="text-left mb-4 font-weight-bold">Game Players</h4>

          <div className="text-left text-left text-white opacity-50 small mb-3">
            Change your personal player preferences and customize your betting behaviour.
          </div>

          <hr className="border-light m-0 pt-2 pb-2" />

          <Row className="mb-3">
            <Col sm={12} md={12} lg={12} className="d-flex justify-content-between">
              <SplitButton variant="primary font-weight-bold" title="New Action" alignRight={false}>

                <Dropdown.Header>Game Analysis</Dropdown.Header>

                <Dropdown.Item
                  className="small font-weight-bold"
                  onClick={() => { this.sendMessage(MSG_TYPE_DEALER_REQUEST_UPDATE_PLAYERS) }}>
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
                <Dropdown.Item
                  className="small font-weight-bold"
                  onClick={() => {
                    this.sendMessage(MSG_TYPE_DEALER_PROCESS_START_NEW_GAME)
                  }}>
                  Start Game
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

                <Dropdown.Divider />
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

              </SplitButton>
            </Col>
          </Row>

          <Card className="mb-3 bg-light" style={{ borderRadius: "15px", }}>
            <Card.Header as="h6" className="with-elements pr-0">
              <div className="card-header-title">Active Players</div>
              <div className="card-header-elements ml-auto mr-3">
                <Button
                  variant="light rounded-pill"
                  size="sm"
                  className="font-weight-bold"
                  onClick={() => { this.sendMessage(MSG_TYPE_DEALER_REQUEST_UPDATE_PLAYERS) }}>
                  Refresh
                </Button>
              </div>
            </Card.Header>

            <Card.Body className="p-0">
              {this.props.game.players.game_players.length > 0
                ? <div className="flex-grow-1 position-relative">

                  {this.props.game.players.game_players
                    .sort((a, b) => a.p_seat - b.p_seat)
                    .map((item, index) =>
                      <OverlayTrigger
                        key={index}
                        placement="left"
                        overlay={<Popover>
                          <Popover.Title className="font-weight-bold">
                            Seat {item.p_seat} | {truncateUsername(item.p_username)}
                          </Popover.Title>
                          <Popover.Content style={{ width: "256px", }}>
                            <h6 className="font-weight-semibold small">
                              Player Details
                            </h6>
                            <Row>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Id</div>
                                <span className="font-weight-bold">{item.id}</span>
                              </Col>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Seat</div>
                                <span className="font-weight-bold">{item.p_seat}</span>
                              </Col>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Seat Request</div>
                                <span className="font-weight-bold">{item.p_seat_request}</span>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Dealer</div>
                                <span className="font-weight-bold">{item.p_dealer ? 'True' : 'False'}</span>
                              </Col>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Small Blind</div>
                                <span className="font-weight-bold">{item.p_smallblind ? 'True' : 'False'}</span>
                              </Col>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Big Blind</div>
                                <span className="font-weight-bold">{item.p_bigblind ? 'True' : 'False'}</span>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Playing</div>
                                <span className="font-weight-bold">{item.p_playing ? 'True' : 'False'}</span>
                              </Col>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Waiting</div>
                                <span className="font-weight-bold">{item.p_waiting ? 'True' : 'False'}</span>
                              </Col>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Exited</div>
                                <span className="font-weight-bold">{item.p_exited ? 'True' : 'False'}</span>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Current</div>
                                <span className="font-weight-bold">{item.p_is_current_player ? 'True' : 'False'}</span>
                              </Col>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Inactive</div>
                                <span className="font-weight-bold">{item.p_inactive ? 'True' : 'False'}</span>
                              </Col>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Low Balance</div>
                                <span className="font-weight-bold">{item.p_low_balance ? 'True' : 'False'}</span>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Raise</div>
                                <span className="font-weight-bold">{item.p_raised_in_current_street ? 'True' : 'False'}</span>
                              </Col>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">Fold</div>
                                <span className="font-weight-bold">{item.p_folded_in_current_game ? 'True' : 'False'}</span>
                              </Col>
                              <Col md={4} className="mb-2">
                                <div className="text-muted small">All In</div>
                                <span className="font-weight-bold">{item.p_all_in_in_current_game ? 'True' : 'False'}</span>
                              </Col>
                            </Row>
                            <h6 className="font-weight-semibold small mt-2">
                              Player Transactions
                            </h6>
                            <Row>
                              <Col md={6} className="mb-2">
                                <div className="text-muted small">Buy-In</div>
                                <span className="font-weight-bold">{formatPrice(item.p_balance_buy_in)}</span>
                              </Col>
                              <Col md={6} className="mb-2">
                                <div className="text-muted small">Re-Buy</div>
                                <span className="font-weight-bold">{formatPrice(item.p_balance_re_buy)}</span>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6} className="mb-2">
                                <div className="text-muted small">Small Blind</div>
                                <span className="font-weight-bold">{formatPrice(item.p_small_blind)}</span>
                              </Col>
                              <Col md={6} className="mb-2">
                                <div className="text-muted small">Big Blind</div>
                                <span className="font-weight-bold">{formatPrice(item.p_big_blind)}</span>
                              </Col>
                            </Row>
                          </Popover.Content>
                        </Popover>}>

                        <Media
                          className="align-items-center p-2 mb-0 cursor-pointer"
                          style={{
                            backgroundColor: `${index % 2 ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.12)"}`,
                          }}>

                          <div className="position-relative">
                            {this.getItemPlayerIcon(item)}
                          </div>

                          <Media.Body className="ml-3">
                            <span onClick={this.prevent} className="text-body font-weight-bold d-flex align-items-center">
                              {truncateUsername(item.p_username)}
                              <Button
                                variant="light rounded-pill"
                                size="xs"
                                className="font-weight-bold ml-1"
                                onClick={this.prevent}>
                                {item.id}
                              </Button>
                              <Button
                                variant="light rounded-pill"
                                size="xs"
                                className="font-weight-bold ml-1"
                                onClick={this.prevent}>
                                {item.p_seat}
                              </Button>
                              <Button
                                variant="light rounded-pill"
                                size="xs"
                                className="font-weight-bold ml-1"
                                onClick={this.prevent}>
                                {item.p_seat_request}
                              </Button>
                            </span>
                            <div className="text-muted d-flex align-items-center">

                              {item.p_playing && (
                                <Button
                                  variant="default rounded-pill"
                                  size="xs"
                                  className="font-weight-bold mr-1"
                                  onClick={this.prevent}>
                                  Playing
                                </Button>
                              )}

                              {item.p_waiting && (
                                <Button
                                  variant="default rounded-pill"
                                  size="xs"
                                  className="font-weight-bold mr-1"
                                  onClick={this.prevent}>
                                  Waiting
                                </Button>
                              )}

                              {item.p_inactive && (
                                <Button
                                  variant="default rounded-pill"
                                  size="xs"
                                  className="font-weight-bold mr-1"
                                  onClick={this.prevent}>
                                  Inactive
                                </Button>
                              )}

                              {item.p_exited && (
                                <Button
                                  variant="default rounded-pill"
                                  size="xs"
                                  className="font-weight-bold mr-1"
                                  onClick={this.prevent}>
                                  Exited
                                </Button>
                              )}

                            </div>
                          </Media.Body>

                          <Button variant="default md-btn-flat" size="sm" className="d-block font-weight-bold">
                            {formatPrice(item.p_balance_display)}
                          </Button>
                        </Media>

                      </OverlayTrigger>
                    )}

                </div>
                : <div className="flex-grow-1 position-relative">
                  <Row noGutters className="h-100 border-0 bg-transparent mt-4" style={{
                    justifyContent: "center",
                  }}>
                    <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none mb-3" style={{ justifyContent: "center", }}>
                      <ResourceLoaderB height="4rem" width="4rem" />
                    </Col>

                    <div className={`text-center text-white opacity-100 mb-4`}>There are currently no players online....</div>
                  </Row>
                </div>}
            </Card.Body>

            {this.props.game.players.game_players.length > 0
              ? <Card.Footer className="small text-muted">
                {this.props.game.players.game_players.length === 1
                  ? `There is currently one player online.`
                  : `There are currently ${this.props.game.players.game_players.length} players online.`}
              </Card.Footer>
              : <Card.Footer className="small text-muted">
                No players online.
              </Card.Footer>}
          </Card>

          {this.props.game.players.game_players.length > 0
            ? <div className="mb-0 list-group pt-0 pb-3">
              <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0 bg-dark`} style={{
                padding: "10px",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                alignItems: "center",
              }}>
                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16.0173 9H15.3945C14.2833 9 13.263 9.61425 12.7431 10.5963L12.154 11.7091C12.0645 11.8781 12.1072 12.0868 12.2559 12.2071L12.6402 12.5183C13.2631 13.0225 13.7556 13.6691 14.0764 14.4035L14.2321 14.7601C14.2957 14.9058 14.4396 15 14.5987 15H18.6747C19.7297 15 20.4057 13.8774 19.912 12.945L18.6686 10.5963C18.1487 9.61425 17.1285 9 16.0173 9Z" fill="white" />
                    <rect opacity="0.3" x="14" y="4" width="4" height="4" rx="2" fill="white" />
                    <path d="M4.65486 14.8559C5.40389 13.1224 7.11161 12 9 12C10.8884 12 12.5961 13.1224 13.3451 14.8559L14.793 18.2067C15.3636 19.5271 14.3955 21 12.9571 21H5.04292C3.60453 21 2.63644 19.5271 3.20698 18.2067L4.65486 14.8559Z" fill="white" />
                    <rect opacity="0.3" x="6" y="5" width="6" height="6" rx="3" fill="white" />
                  </svg>
                </span>

                <Media.Body className="ml-3">
                  <span className="text-medium font-weight-medium h6">Active Players</span>
                </Media.Body>
                <h5 className="mb-0 font-weight-bold">{this.props.game.players.game_players.length}</h5>
              </span>

              <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
                padding: "10px",
                alignItems: "center",
                backgroundColor: "rgba(37, 40, 46, 0.8)",
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
              }}>
                <span className="svg-icon svg-icon-muted svg-icon-2hx">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                    <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                  </svg>
                </span>

                <Media.Body className="ml-3">
                  <span className="text-medium font-weight-medium h6">Balance Volume</span>
                </Media.Body>
                <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.players.game_players.reduce((a, b) => a + b.p_balance_display, 0))}</h5>
              </span>
            </div>
            : null}

          <Card className="d-flex w-100 mb-3 bg-light" style={{ borderRadius: "15px", }}>
            <Row noGutters className="row-bordered h-100">

              <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
                <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                      <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                    </svg>
                  </span>

                  <span className="media-body d-block ml-3">
                    <span className="text-big font-weight-bolder">{formatPrice(this.props.game.data.current_game_values.total_pot)}</span><br />
                    <small className="text-muted">Potsize</small>
                  </span>
                </span>
              </Col>

              <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
                <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="white" />
                      <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="white" />
                    </svg>
                  </span>

                  <span className="media-body d-block ml-3">
                    <span className="text-big font-weight-bolder">{this.props.game.profile.table_id}</span><br />
                    <small className="text-muted">Table</small>
                  </span>
                </span>
              </Col>

              <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
                <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                      <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                    </svg>
                  </span>

                  <span className="media-body d-block ml-3">
                    <span className="text-big font-weight-bolder">{formatPrice(this.props.game.data.current_game_values.table_small_blind)}</span><br />
                    <small className="text-muted">Small Blind</small>
                  </span>
                </span>
              </Col>

              <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
                <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                      <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                    </svg>
                  </span>

                  <span className="media-body d-block ml-3">
                    <span className="text-big font-weight-bolder">{formatPrice(this.props.game.data.current_game_values.table_big_blind)}</span><br />
                    <small className="text-muted">Big Blind</small>
                  </span>
                </span>
              </Col>

            </Row>
          </Card>

          <div className="mb-0 list-group pt-0 pb-3">
            <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0 bg-dark`} style={{
              padding: "10px",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              alignItems: "center",
            }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                  <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h6">Potsize</span>
              </Media.Body>
              <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.total_pot)}</h5>
            </span>

            <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
              padding: "10px",
              alignItems: "center",
              backgroundColor: "rgba(37, 40, 46, 0.8)",
            }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                  <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h6">Small Blind</span>
              </Media.Body>
              <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.table_small_blind)}</h5>
            </span>

            <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online bg-dark border-0`} style={{
              padding: "10px",
              alignItems: "center",
            }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                  <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h6">Big Blind</span>
              </Media.Body>
              <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.table_big_blind)}</h5>
            </span>

            <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
              padding: "10px",
              alignItems: "center",
              backgroundColor: "rgba(37, 40, 46, 0.8)",
            }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 22H3C2.4 22 2 21.6 2 21C2 20.4 2.4 20 3 20H21C21.6 20 22 20.4 22 21C22 21.6 21.6 22 21 22ZM11 6.59998V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V6.59998H11Z" fill="white" />
                  <path opacity="0.3" d="M7 6.59999H17L12.7 2.3C12.3 1.9 11.7 1.9 11.3 2.3L7 6.59999Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h6">Raise Level</span>
              </Media.Body>
              <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.raise_level)}</h5>
            </span>

            <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online bg-dark border-0`} style={{
              padding: "10px",
              alignItems: "center",
            }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9.60001 11H21C21.6 11 22 11.4 22 12C22 12.6 21.6 13 21 13H9.60001V11Z" fill="white" />
                  <path d="M6.2238 13.2561C5.54282 12.5572 5.54281 11.4429 6.22379 10.7439L10.377 6.48107C10.8779 5.96697 11.75 6.32158 11.75 7.03934V16.9607C11.75 17.6785 10.8779 18.0331 10.377 17.519L6.2238 13.2561Z" fill="white" />
                  <rect opacity="0.3" x="2" y="4" width="2" height="16" rx="1" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h6">Buy-In Minimum</span>
              </Media.Body>
              <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.table_minimum_buy_in)}</h5>
            </span>

            <span onClick={this.prevent} className={`d-flex list-group-item list-group-item-action online border-0`} style={{
              padding: "10px",
              alignItems: "center",
              backgroundColor: "rgba(37, 40, 46, 0.8)",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
            }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.3" d="M11.8 5.2L17.7 8.6V15.4L11.8 18.8L5.90001 15.4V8.6L11.8 5.2ZM11.8 2C11.5 2 11.2 2.1 11 2.2L3.8 6.4C3.3 6.7 3 7.3 3 7.9V16.2C3 16.8 3.3 17.4 3.8 17.7L11 21.9C11.3 22 11.5 22.1 11.8 22.1C12.1 22.1 12.4 22 12.6 21.9L19.8 17.7C20.3 17.4 20.6 16.8 20.6 16.2V7.9C20.6 7.3 20.3 6.7 19.8 6.4L12.6 2.2C12.4 2.1 12.1 2 11.8 2Z" fill="white" />
                  <path d="M11.8 8.69995L8.90001 10.3V13.7L11.8 15.3L14.7 13.7V10.3L11.8 8.69995Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h6">Game Id</span>
              </Media.Body>
              <h5 className="mb-0 font-weight-bold small">{this.props.game.profile.game_id}</h5>
            </span>
          </div>

          <hr className="border-light m-0 py-2" />

          <Button variant="instagram" block onClick={this.props.close} className="font-weight-bold">Continue</Button>
        </Modal.Body>

        {/* Game Players Modal */}
      </>
    )
  }
}

export default GamePlayers