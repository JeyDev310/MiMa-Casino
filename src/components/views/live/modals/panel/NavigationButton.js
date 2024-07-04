import React, { Component } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

import NavigationIcon from '../../icons/Menu'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/navigation.scss'

class NavigationButton extends Component {

  render() {
    return (
      <>
        {/* Navigation Button */}
        <span className={`${this.props.position === 'top' && ('live-d-lg-none')}`}>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip
                className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                Open Navigation
              </Tooltip>
            }>

            <Button
              id="dropdown-menu-link-4"
              size="md"
              className="mr-0"
              variant="widget5 icon-btn rounded-pill md-btn-flat hide-arrow"
              onClick={() => { this.props.open(19) }}>
              <NavigationIcon />
            </Button>

          </OverlayTrigger>
        </span>
        {/* / Navigation Button */}
      </>
    )
  }
}

export default NavigationButton