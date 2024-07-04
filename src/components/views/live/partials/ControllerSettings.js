import React, { Component } from 'react'
import PlayerQuickActionsDefault from './PlayerQuickActionsDefault'

import '../../../../vendor/styles/pages/chat.scss'

class ControllerSettings extends Component {

  getElementTargetAlignment() {
    switch (this.props.settings.optionK1) {
      case 0:
        return 2
      case 1:
        return 0
      case 2:
        return 1
      default:
        return this.props.settings.optionK1
    }
  }

  getElementTargetSplitMode() {
    switch (this.props.settings.optionK2) {
      case 0:
        return 1
      case 1:
        return 0
      default:
        return this.props.settings.optionK2
    }
  }

  getElementTargetSize() {
    switch (this.props.settings.optionK4) {
      case 0:
        return 5
      case 1:
        return 0
      case 2:
        return 1
      case 3:
        return 2
      case 4:
        return 3
      case 5:
        return 4
      default:
        return this.props.settings.optionK4
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Controller Settings */}
        <div style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
        }}>

          {/* Player Quick Actions */}
          <PlayerQuickActionsDefault
            {...this.props} {...this.state}
            change={this.props.change}
            openFill={this.props.openFill}
            openSlide={this.props.openSlide}
          />
          {/* / Player Quick Actions */}

        </div>
        {/* / Controller Settings */}
      </>
    )
  }
}

export default ControllerSettings