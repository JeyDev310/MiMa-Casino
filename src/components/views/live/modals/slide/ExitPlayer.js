import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

class ExitPlayer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Exit Player Modal */}
        <Modal.Body>

          {/* Logo */}
          <div className="d-flex justify-content-start align-items-center">
            <div style={{ width: "100px", }}>
              <div className="w-100 position-relative" style={{ paddingBottom: '20%' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                  alt="Live Poker Studio™" className="d-block" style={{ width: "100px", }} />
              </div>
            </div>
          </div>
          {/* / Logo */}

          <hr className="border-light m-0 py-2" />

          <h4 className="text-left mb-1 font-weight-bold">Leave Game</h4>
          <p className="mb-3">Are you sure you want to exit the game?</p>

          <>
            <div className="text-left text-white opacity-25 text-tiny mb-0">
              Copyright © {new Date().getFullYear()} Live Poker Studio™. All rights reserved. {process.env.REACT_APP_VERSION
                ? `Client Build V${process.env.REACT_APP_VERSION}`
                : 'Client Build Version Unknown'}
            </div>

            <div className="text-left text-white opacity-25 text-tiny mb-3">
              Development Build ID {process.env.REACT_APP_BUILD_ID}
            </div>
          </>

          <hr className="border-light m-0 py-2" />

          <Button
            variant="instagram" block
            onClick={this.props.exit}
            className="font-weight-bold">
            Exit Game
          </Button>

          <Button
            variant="default" block
            onClick={this.props.close}
            className="font-weight-bold">
            Cancel
          </Button>
        </Modal.Body>
        {/* / Exit Player Modal */}
      </>
    )
  }
}

export default ExitPlayer
