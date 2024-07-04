import React, { Component } from 'react'
import { Dropdown, SplitButton } from 'react-bootstrap'

import {
  MSG_TYPE_DEALER_REQUEST_UPDATE_PLAYERS,
  MSG_TYPE_DEALER_SHUFFLE_COUNTDOWN,
  MSG_TYPE_DEALER_RESUME_GAME,
  MSG_TYPE_DEALER_NEXT_PLAYER,
  MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA,
  MSG_TYPE_DEALER_HARD_RESET,
  MSG_TYPE_DEALER_DISCONNECT_ALL,
} from '../../core/DealerActionTypes'

import '../../../../../vendor/styles/pages/chat.scss'

class DealerActionsDropdownMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Dealer Game Actions Dropdown */}
        <div className="card-header-elements ml-auto mr-2">
          <SplitButton
            variant="light"
            title={
              <span className="font-weight-bold h6 mb-0 small">
                <span className="ion ion-md-add mr-2"></span>
                New Action
              </span>
            }
            alignRight={false}>
            <Dropdown.Header>
              Game Analysis
            </Dropdown.Header>

            <Dropdown.Item className="small font-weight-bold" onClick={() => {
              this.props.send(MSG_TYPE_DEALER_REQUEST_UPDATE_PLAYERS); this.props.refocus();
            }}>
              Get Player Data
            </Dropdown.Item>

            <Dropdown.Header>Pre Game Actions</Dropdown.Header>

            <Dropdown.Item className="small font-weight-bold" onClick={() => {
              this.props.send(MSG_TYPE_DEALER_SHUFFLE_COUNTDOWN); this.props.refocus();
            }}>
              Shuffle Countdown
            </Dropdown.Item>

            <Dropdown.Header>Mid Game Actions</Dropdown.Header>

            <Dropdown.Item className="small font-weight-bold" onClick={() => {
              this.props.send(MSG_TYPE_DEALER_RESUME_GAME); this.props.refocus();
            }}>
              Resume Game
            </Dropdown.Item>
            <Dropdown.Item className="small font-weight-bold" onClick={() => {
              this.props.send(MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA); this.props.refocus();
            }}>
              Start Showdown
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Header>Player Handling</Dropdown.Header>

            <Dropdown.Item className="small font-weight-bold" onClick={() => {
              this.props.send(MSG_TYPE_DEALER_NEXT_PLAYER); this.props.refocus();
            }}>
              Skip Player
            </Dropdown.Item>

            <Dropdown.Header>Error Handling</Dropdown.Header>

            <Dropdown.Item className="small font-weight-bold" onClick={() => {
              this.props.send(MSG_TYPE_DEALER_HARD_RESET); this.props.refocus();
            }}>
              Reset Game
            </Dropdown.Item>
            <Dropdown.Item className="small font-weight-bold" onClick={() => {
              this.props.send(MSG_TYPE_DEALER_DISCONNECT_ALL); this.props.refocus();
            }}>
              Disconnect All
            </Dropdown.Item>
          </SplitButton>
        </div>
        {/* / Dealer Game Actions Dropdown */}
      </>
    )
  }
}

export default DealerActionsDropdownMenu