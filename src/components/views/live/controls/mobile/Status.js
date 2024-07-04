import React, { Component } from 'react'
import { Badge, Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

import {
  formatPrice,
  formatCapitalized,
} from '../utilities/TextPreprocessing'

import '../../../../vendor/styles/pages/chat.scss'

class GameStateMinimal extends Component {

  constructor(props) {
    super(props)

    this.renderCurrentBetRound = this.renderCurrentBetRound.bind(this)

    this.state = {
      data: null,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  renderCurrentBetRound(street) {
    if (street === 'INIT') return 'Preflop'
    return formatCapitalized(street)
  }

  render() {
    return (
      <>
        {/* Game State Minimal */}

        {this.props.game.data && (
          <Row className="mb-2">
            <Col>
              <div className="flex-grow-1 position-relative">
                <span
                  onClick={this.prevent}
                  className={`list-group-item online d-flex justify-content-center py-1`}
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    borderWidth: "0px",
                    borderRadius: "0px 0px 15px 15px",
                  }}>
                  <div className="badge badge-light d-flex w-100">

                    {/* Details */}

                    <Card.Body className="p-0">
                      <Row>
                        <Col xs={3} sm={3} md={3} className="mb-0 mb-md-0 mb-lg-0">
                          <div className="h5 mb-0">
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip className="tooltip-default h6 mb-0 font-weight-bold">
                                  Round
                                </Tooltip>
                              }>
                              <Badge pill variant="opaque1" className="align-items-center cursor-pointer" style={{ overflow: "clip", display: "inline-flex", }}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx mr-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 22C7.4 22 7 21.6 7 21V9C7 8.4 7.4 8 8 8C8.6 8 9 8.4 9 9V21C9 21.6 8.6 22 8 22Z" fill="white" />
                                    <path opacity="0.3" d="M4 15C3.4 15 3 14.6 3 14V6C3 5.4 3.4 5 4 5C4.6 5 5 5.4 5 6V14C5 14.6 4.6 15 4 15ZM13 19V3C13 2.4 12.6 2 12 2C11.4 2 11 2.4 11 3V19C11 19.6 11.4 20 12 20C12.6 20 13 19.6 13 19ZM17 16V5C17 4.4 16.6 4 16 4C15.4 4 15 4.4 15 5V16C15 16.6 15.4 17 16 17C16.6 17 17 16.6 17 16ZM21 18V10C21 9.4 20.6 9 20 9C19.4 9 19 9.4 19 10V18C19 18.6 19.4 19 20 19C20.6 19 21 18.6 21 18Z" fill="white" />
                                  </svg>
                                </span>
                                <span className="font-weight-bold">
                                  {this.props.game.data.current_round === "null" ? "Paused" : this.renderCurrentBetRound(this.props.game.data.current_round)}
                                </span>
                              </Badge>
                            </OverlayTrigger>
                          </div>
                        </Col>

                        <Col xs={3} sm={3} md={3} className="mb-0 mb-md-0 mb-lg-0">
                          <div className="h5 mb-0">
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip className="tooltip-default h6 mb-0 font-weight-bold">
                                  Potsize
                                </Tooltip>
                              }>
                              <Badge pill variant="opaque1" className="align-items-center cursor-pointer" style={{ overflow: "clip", display: "inline-flex", }}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx mr-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                                    <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                                  </svg>
                                </span>
                                <span className="font-weight-bold">
                                  {formatPrice(this.props.game.data.current_game_values.total_pot)}
                                </span>
                              </Badge>
                            </OverlayTrigger>
                          </div>
                        </Col>

                        <Col xs={3} sm={3} md={3} className="mb-0 mb-sm-0 mb-md-0 mb-lg-0">
                          <div className="h5 mb-0">
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip className="tooltip-default h6 mb-0 font-weight-bold">
                                  Raise Level
                                </Tooltip>
                              }>
                              <Badge pill variant="opaque1" className="align-items-center cursor-pointer" style={{ overflow: "clip", display: "inline-flex", }}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx mr-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="white" />
                                    <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="white" />
                                  </svg>
                                </span>
                                <span className="font-weight-bold">
                                  {formatPrice(this.props.game.data.current_game_values.raise_level)}
                                </span>
                              </Badge>
                            </OverlayTrigger>
                          </div>
                        </Col>

                        <Col xs={3} sm={3} md={3} className="mb-0 mb-sm-0 mb-md-0 mb-lg-0">
                          <div className="h5 mb-0">
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip className="tooltip-default h6 mb-0 font-weight-bold">
                                  Joined Players
                                </Tooltip>
                              }>
                              <Badge pill variant="opaque1" className="align-items-center cursor-pointer" style={{ overflow: "clip", display: "inline-flex", }}>
                                <span className="svg-icon svg-icon-muted svg-icon-2hx mr-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M16.0173 9H15.3945C14.2833 9 13.263 9.61425 12.7431 10.5963L12.154 11.7091C12.0645 11.8781 12.1072 12.0868 12.2559 12.2071L12.6402 12.5183C13.2631 13.0225 13.7556 13.6691 14.0764 14.4035L14.2321 14.7601C14.2957 14.9058 14.4396 15 14.5987 15H18.6747C19.7297 15 20.4057 13.8774 19.912 12.945L18.6686 10.5963C18.1487 9.61425 17.1285 9 16.0173 9Z" fill="white" />
                                    <rect opacity="0.3" x="14" y="4" width="4" height="4" rx="2" fill="white" />
                                    <path d="M4.65486 14.8559C5.40389 13.1224 7.11161 12 9 12C10.8884 12 12.5961 13.1224 13.3451 14.8559L14.793 18.2067C15.3636 19.5271 14.3955 21 12.9571 21H5.04292C3.60453 21 2.63644 19.5271 3.20698 18.2067L4.65486 14.8559Z" fill="white" />
                                    <rect opacity="0.3" x="6" y="5" width="6" height="6" rx="3" fill="white" />
                                  </svg>
                                </span>
                                <span className="font-weight-bold">
                                  {this.props.game.presence
                                    ? <span>{this.props.game.presence.joined_players}/{this.props.game.presence.max_players}</span>
                                    : <span>N/A</span>}
                                </span>
                              </Badge>
                            </OverlayTrigger>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>

                    {/* / Details */}

                  </div>
                </span>
              </div>
            </Col>
          </Row>
        )}

        {/* / Game State Minimal */}
      </>
    )
  }
}

export default GameStateMinimal