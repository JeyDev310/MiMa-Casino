import React, { Component } from 'react'
import { Media } from 'react-bootstrap'

import themeSettings from '../../../../vendor/libs/theme-settings'
import PerfectScrollbar from 'react-perfect-scrollbar'

import {
  formatPrice,
  formatCapitalized,
} from '../utilities/TextPreprocessing'

import '../../../../vendor/libs/react-perfect-scrollbar/react-perfect-scrollbar.scss'
import '../../../../vendor/styles/pages/chat.scss'

class GameState extends Component {

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
    const toggleColor = themeSettings.isDarkStyle() ? 'white' : 'black'

    return (
      <>
        {/* Game State */}

        {this.props.game.data
          ? <React.Fragment>

            <div className="flex-grow-1 position-relative">
              <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: true }} className="chat-contacts list-group chat-scroll py-3">
                <span onClick={this.prevent} className={`list-group-item list-group-item-action online`} style={{
                  padding: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}>
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M14 18V16H10V18L9 20H15L14 18Z" fill={toggleColor} />
                      <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill={toggleColor} />
                    </svg>
                  </span>

                  <Media.Body className="ml-3">
                    <span className="text-medium font-weight-bold h5">Potsize</span>
                  </Media.Body>

                  <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.total_pot)}</h5>
                </span>

                <span onClick={this.prevent} className={`list-group-item list-group-item-action online`} style={{
                  padding: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                }}>
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill={toggleColor} />
                      <rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill={toggleColor} />
                    </svg>
                  </span>

                  <Media.Body className="ml-3">
                    <span className="text-medium font-weight-bold h5">Dealer</span>
                  </Media.Body>

                  <h6 className="mb-0 font-weight-bold text-small">{this.props.game.data.dealer_id}</h6>
                </span>

                <span onClick={this.prevent} className={`list-group-item list-group-item-action online`} style={{
                  padding: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                }}>
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M8 22C7.4 22 7 21.6 7 21V9C7 8.4 7.4 8 8 8C8.6 8 9 8.4 9 9V21C9 21.6 8.6 22 8 22Z" fill={toggleColor} />
                      <path opacity="0.3" d="M4 15C3.4 15 3 14.6 3 14V6C3 5.4 3.4 5 4 5C4.6 5 5 5.4 5 6V14C5 14.6 4.6 15 4 15ZM13 19V3C13 2.4 12.6 2 12 2C11.4 2 11 2.4 11 3V19C11 19.6 11.4 20 12 20C12.6 20 13 19.6 13 19ZM17 16V5C17 4.4 16.6 4 16 4C15.4 4 15 4.4 15 5V16C15 16.6 15.4 17 16 17C16.6 17 17 16.6 17 16ZM21 18V10C21 9.4 20.6 9 20 9C19.4 9 19 9.4 19 10V18C19 18.6 19.4 19 20 19C20.6 19 21 18.6 21 18Z" fill={toggleColor} />
                    </svg>
                  </span>

                  <Media.Body className="ml-3">
                    <span className="text-medium font-weight-bold h5">Round</span>
                  </Media.Body>

                  <h5 className="mb-0">
                    <div className="badge badge-success">
                      {this.props.game.data.current_round === "null" ? "Waiting" : this.renderCurrentBetRound(this.props.game.data.current_round)}
                    </div>
                  </h5>
                </span>

                <span onClick={this.prevent} className={`list-group-item list-group-item-action online`} style={{
                  padding: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                }}>
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill={toggleColor} />
                      <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill={toggleColor} />
                    </svg>
                  </span>

                  <Media.Body className="ml-3">
                    <span className="text-medium font-weight-bold h5">SB/BB</span>
                  </Media.Body>

                  <h5 className="mb-0 font-weight-bold">
                    {formatPrice(this.props.game.data.current_game_values.table_small_blind)}/{formatPrice(this.props.game.data.current_game_values.table_big_blind)}
                  </h5>
                </span>

                <span onClick={this.prevent} className={`list-group-item list-group-item-action online`} style={{
                  padding: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                }}>
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path opacity="0.3" d="M9.4 8.79999L16.6 14H20V12L16 11L9 4L5 6V9.90002L9.4 8.79999Z" fill={toggleColor} />
                      <path d="M21 18H20V16H16L9 11L6 11.8V3C6 2.4 5.6 2 5 2C4.4 2 4 2.4 4 3V18H3C2.4 18 2 18.4 2 19C2 19.6 2.4 20 3 20H4V21C4 21.6 4.4 22 5 22C5.6 22 6 21.6 6 21V20H21C21.6 20 22 19.6 22 19C22 18.4 21.6 18 21 18Z" fill={toggleColor} />
                    </svg>
                  </span>

                  <Media.Body className="ml-3">
                    <span className="text-medium font-weight-bold h5">Raise Level</span>
                  </Media.Body>

                  <h5 className="mb-0 font-weight-bold">{formatPrice(this.props.game.data.current_game_values.raise_level)}</h5>
                </span>

                <span onClick={this.prevent} className={`list-group-item list-group-item-action online`} style={{
                  padding: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderBottomLeftRadius: "15px",
                  borderBottomRightRadius: "15px",
                }}>
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M16.0173 9H15.3945C14.2833 9 13.263 9.61425 12.7431 10.5963L12.154 11.7091C12.0645 11.8781 12.1072 12.0868 12.2559 12.2071L12.6402 12.5183C13.2631 13.0225 13.7556 13.6691 14.0764 14.4035L14.2321 14.7601C14.2957 14.9058 14.4396 15 14.5987 15H18.6747C19.7297 15 20.4057 13.8774 19.912 12.945L18.6686 10.5963C18.1487 9.61425 17.1285 9 16.0173 9Z" fill={toggleColor} />
                      <rect opacity="0.3" x="14" y="4" width="4" height="4" rx="2" fill={toggleColor} />
                      <path d="M4.65486 14.8559C5.40389 13.1224 7.11161 12 9 12C10.8884 12 12.5961 13.1224 13.3451 14.8559L14.793 18.2067C15.3636 19.5271 14.3955 21 12.9571 21H5.04292C3.60453 21 2.63644 19.5271 3.20698 18.2067L4.65486 14.8559Z" fill={toggleColor} />
                      <rect opacity="0.3" x="6" y="5" width="6" height="6" rx="3" fill={toggleColor} />
                    </svg>
                  </span>

                  <Media.Body className="ml-3">
                    <span className="text-medium font-weight-bold h5">Joined Players</span>
                  </Media.Body>

                  {this.props.game.presence
                    ? <h5 className="mb-0 font-weight-bold">{this.props.game.presence.joined_players}/{this.props.game.presence.max_players}</h5>
                    : <h5 className="mb-0 font-weight-bold">N/A</h5>}
                </span>
              </PerfectScrollbar>
            </div>

          </React.Fragment>
          : null}

        {/* / Game State */}
      </>
    )
  }
}

export default GameState