import React, { Component } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/navigation.scss'

class ExitGameButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  onHandleToggle() {
    this.props.open(2)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Exit Game Button */}
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip
              className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
              Exit Game
            </Tooltip>
          }>
          <Button
            size="md"
            className="mr-1"
            variant="opaque1 icon-btn rounded-pill md-btn-flat hide-arrow"
            onClick={() => { this.onHandleToggle() }}>
            <i className="ion ion-md-settings"></i>
          </Button>
        </OverlayTrigger>
        {/* / Exit Game Button  */}
      </>
    )
  }
}

export default ExitGameButton