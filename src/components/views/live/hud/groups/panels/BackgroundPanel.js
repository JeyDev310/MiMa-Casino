import React, { Component } from 'react'

import WebRTCAudioPlayer from '../../../partials/WebRTCAudio'
import WebRTCPlayer from '../../../partials/WebRTCPlayer'
import WebRTCVideoCallListener from '../../../utilities/WebRTCVideoCallListener'

class BackgroundPanel extends Component {
  render() {
    return (
      <>
        {/* WebRTC Player Panel */}
        <WebRTCPlayer
          {...this.props}
          {...this.state}
          change={this.props.change}
          openSlide={this.props.openSlide} />
        {/* / WebRTC Player Panel */}

        {/* WebRTC Audio Player Panel */}
        <WebRTCAudioPlayer
          {...this.props}
          {...this.state}
          change={this.props.change}
          openSlide={this.props.openSlide} />
        {/* / WebRTC Audio Player Panel */}

        {/* WebRTC VideoCall Listener */}
        <WebRTCVideoCallListener
          {...this.props} {...this.state} />
        {/* / WebRTC VideoCall Listener */}
      </>
    )
  }
}

export default BackgroundPanel
