import React, { Component } from 'react'

import '../../../../vendor/styles/layouts/1/layout.scss'

class RotateDeviceWarning extends Component {

  render() {
    return (
      <>
        <div className="rotate-device-modal">
          <img
            src={`${process.env.PUBLIC_URL}/img/section/live/game/rotate-device-img-1.png`}
            className="cursor-pointer rotate-device-icon" alt="Rotate Device" />
        </div>
      </>
    )
  }
}

export default RotateDeviceWarning