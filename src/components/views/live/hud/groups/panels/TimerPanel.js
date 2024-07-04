import React, { Component } from 'react'

import EmergencyResetListener from '../../../utilities/EmergencyResetListener'
import ParticipantIdleTimer from '../../../utilities/ParticipantIdleTimer'
import SessionIdleTimer from '../../../utilities/SessionIdleTimer'

class TimerPanel extends Component {
  render() {
    return (
      <>
        <SessionIdleTimer
          {...this.props} {...this.state}
          open={this.props.open}
          close={this.props.close}
        />

        <ParticipantIdleTimer
          {...this.props} {...this.state}
          timeout={this.props.timeout}
        />

        {true && (
          <EmergencyResetListener
            {...this.props} {...this.state}
            exit={this.props.exit}
          />
        )}
      </>
    )
  }
}

export default TimerPanel
