import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

import {
  MSG_TYPE_DEALER_START_SHUFFLE_LIVE_TRUE,
  MSG_TYPE_DEALER_RESUME_GAME,
  MSG_TYPE_DEALER_NEXT_PLAYER,
  MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA,
  MSG_TYPE_DEALER_HARD_RESET,
  MSG_TYPE_DEALER_DISCONNECT_ALL,
} from '../../core/DealerActionTypes'

import '../../../../../vendor/styles/pages/chat.scss'

class DealerActionsButtonGroup extends Component {

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
        {/* Dealer Actions Button Group */}
        <ButtonGroup size="md" className="w-100">
          <Button
            style={{
              borderTopLeftRadius: "15px",
              borderBottomLeftRadius: "15px",
            }}
            variant="light"
            className="font-weight-bold h5 mb-0 small game-action-button-default-opacity-animation d-flex align-items-center justify-content-center"
            onClick={() => { this.props.send(MSG_TYPE_DEALER_START_SHUFFLE_LIVE_TRUE); this.props.refocus(); }}>
            <span className="fas fa-plus-circle mr-2"></span>
            <span className="small font-weight-bold">Start Shuffle</span>
          </Button>

          <Button
            variant="light"
            className="font-weight-bold h5 mb-0 small game-action-button-default-opacity-animation d-flex align-items-center justify-content-center"
            onClick={() => { this.props.send(MSG_TYPE_DEALER_RESUME_GAME); this.props.refocus(); }}>
            <span className="fas fa-forward mr-2"></span>
            <span className="small font-weight-bold">Resume</span>
          </Button>

          <Button
            variant="light"
            className="font-weight-bold h5 mb-0 small game-action-button-default-opacity-animation d-flex align-items-center justify-content-center"
            onClick={() => { this.props.send(MSG_TYPE_DEALER_NEXT_PLAYER); this.props.refocus(); }}>
            <span className="fas fa-times-circle mr-2"></span>
            <span className="small font-weight-bold">Skip Player</span>
          </Button>

          <Button
            variant="light"
            className="font-weight-bold h5 mb-0 small game-action-button-default-opacity-animation d-flex align-items-center justify-content-center"
            onClick={() => { this.props.send(MSG_TYPE_DEALER_PROCESS_SHOWDOWN_DATA); this.props.refocus(); }}>
            <span className="fas fa-dot-circle mr-2"></span>
            <span className="small font-weight-bold">Showdown</span>
          </Button>

          <Button
            variant="light"
            className="font-weight-bold h5 mb-0 small game-action-button-default-opacity-animation d-flex align-items-center justify-content-center"
            onClick={() => { this.props.send(MSG_TYPE_DEALER_HARD_RESET); this.props.refocus(); }}>
            <span className="fas fa-arrow-alt-circle-left mr-2"></span>
            <span className="small font-weight-bold">Reset</span>
          </Button>

          <Button
            variant="light"
            className="font-weight-bold h5 mb-0 small game-action-button-default-opacity-animation d-flex align-items-center justify-content-center"
            onClick={() => { this.props.send(MSG_TYPE_DEALER_DISCONNECT_ALL); this.props.refocus(); }}>
            <span className="fas fa-times-circle mr-2"></span>
            <span className="small font-weight-bold">Disconnect</span>
          </Button>

          <Button
            style={{
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
            variant="light"
            className="font-weight-bold h5 mb-0 small game-action-button-default-opacity-animation d-flex align-items-center justify-content-center"
            onClick={() => { this.props.random(); this.props.refocus(); }}
            disabled={!this.props.debug}>
            <span className="fas fa-exclamation-circle mr-2"></span>
            <span className="small font-weight-bold">Test Card</span>
          </Button>
        </ButtonGroup>
        {/* / Dealer Actions Button Group */}
      </>
    )
  }
}

export default DealerActionsButtonGroup
