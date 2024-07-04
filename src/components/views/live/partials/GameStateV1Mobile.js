import React, { Component } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'

import {
  formatCapitalized,
  formatPrice,
} from '../utilities/TextPreprocessing'

import '../../../../vendor/styles/pages/chat.scss'

class GameStateMinimal extends Component {

  componentDidMount() {
    const container = document.getElementById('top-navigation-hcontainer-item')
    var elements = document.querySelectorAll('[id^="game-state-badge"]')
    for (let i = 0; i < elements.length; i++) {
      switch (elements[i].id.slice(-1)) {
        case '1':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Round')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '2':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Potsize')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '3':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Raise Level')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        default:
          break
      }
    }
  }

  renderCurrentBetRound(street) {
    if (street === 'INIT') return 'Preflop'
    return formatCapitalized(street)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Game State Minimal */}
        {this.props.game.data && (
          <div className="my-3">
            <Col className="my-2">
              <div className="flex-grow-1 position-relative game-state-v1-mobile-layout-s1">
                <span
                  onClick={this.prevent}
                  className="list-group-item online d-flex justify-content-center p-0 bg-darker2 border-0 shadow-none game-state-v1-mobile-layout-s2"
                  style={{
                    transform: "scale(1.1)",
                  }}>
                  <div className="badge badge-light d-flex w-100">
                    {/* Details */}
                    <Card.Body className="p-0">
                      <Row>
                        <Col
                          xs={6} sm={6} md={6}
                          className="mb-0 mb-md-0 mb-lg-0">
                          <div className="h5 mb-0">
                            <Badge
                              id="game-state-badge-1"
                              pill variant="transparent"
                              className="d-flex align-items-center justify-content-center cursor-pointer"
                              style={{ overflow: "visible", display: "inline-flex", }}>
                              <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                  <path d="M8 22C7.4 22 7 21.6 7 21V9C7 8.4 7.4 8 8 8C8.6 8 9 8.4 9 9V21C9 21.6 8.6 22 8 22Z" fill="white" />
                                  <path opacity="0.3" d="M4 15C3.4 15 3 14.6 3 14V6C3 5.4 3.4 5 4 5C4.6 5 5 5.4 5 6V14C5 14.6 4.6 15 4 15ZM13 19V3C13 2.4 12.6 2 12 2C11.4 2 11 2.4 11 3V19C11 19.6 11.4 20 12 20C12.6 20 13 19.6 13 19ZM17 16V5C17 4.4 16.6 4 16 4C15.4 4 15 4.4 15 5V16C15 16.6 15.4 17 16 17C16.6 17 17 16.6 17 16ZM21 18V10C21 9.4 20.6 9 20 9C19.4 9 19 9.4 19 10V18C19 18.6 19.4 19 20 19C20.6 19 21 18.6 21 18Z" fill="white" />
                                </svg>
                              </span>
                              <span className="font-weight-bold">
                                {this.props.game.data.current_round === "null"
                                  ? "Paused"
                                  : this.renderCurrentBetRound(this.props.game.data.current_round)}
                              </span>
                            </Badge>
                          </div>
                        </Col>

                        <Col
                          xs={6} sm={6} md={6}
                          className="mb-0 mb-md-0 mb-lg-0">
                          <div className="h5 mb-0">
                            <Badge
                              id="game-state-badge-2"
                              pill variant="transparent"
                              className="d-flex align-items-center justify-content-center cursor-pointer mr-2"
                              style={{ overflow: "visible", display: "inline-flex", }}>
                              <span className="svg-icon svg-icon-muted svg-icon-2hx mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                  <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                                  <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                                </svg>
                              </span>
                              <span className="font-weight-bold">
                                {formatPrice(this.props.game.data.current_game_values.total_pot)}
                              </span>
                            </Badge>
                          </div>
                        </Col>

                        {/* <Col
                          xs={4} sm={4} md={4}
                          className="mb-0 mb-sm-0 mb-md-0 mb-lg-0">
                          <div className="h5 mb-0">
                            <Badge
                              id="game-state-badge-3"
                              pill variant="transparent"
                              className="d-flex align-items-center justify-content-center cursor-pointer mr-2"
                              style={{ overflow: "visible", display: "inline-flex", }}>
                              <span className="svg-icon svg-icon-muted svg-icon-2hx mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                  <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="white" />
                                  <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="white" />
                                </svg>
                              </span>
                              <span className="font-weight-bold">
                                {formatPrice(this.props.game.data.current_game_values.raise_level)}
                              </span>
                            </Badge>
                          </div>
                        </Col> */}
                      </Row>
                    </Card.Body>
                    {/* / Details */}
                  </div>
                </span>
              </div>
            </Col>
          </div>
        )}
        {/* / Game State Minimal */}
      </>
    )
  }
}

export default GameStateMinimal
