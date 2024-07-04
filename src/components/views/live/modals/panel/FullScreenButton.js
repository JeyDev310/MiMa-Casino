import React, { Component } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

import {
  FullscreenContractIcon,
  FullscreenExpandIcon,
} from '../../icons/Fullscreen'

import '../../../../../vendor/styles/pages/chat.scss'

class FullScreenButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: true,
    }
  }

  onHandleToggle() {
    if (this.props.enabled) {
      this.props.exit()
    } else {
      this.props.enter()
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* FullScreen Button */}
        {this.state.init && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip
                className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                Toggle FullScreen
              </Tooltip>
            }>
            <Button
              id="top-navigation-link-9"
              size="md"
              className={`ml-0 ${this.props.topNav && 'live-d-lg-none'}`}
              variant="widget5 icon-btn rounded-pill md-btn-flat mr-1"
              onClick={() => { this.onHandleToggle() }}>

              {this.props.enabled
                ? <FullscreenContractIcon />
                : <FullscreenExpandIcon />}

            </Button>
          </OverlayTrigger>
        )}
        {/* / FullScreen Button  */}
      </>
    )
  }
}

export default FullScreenButton