import React, { Component } from 'react'

import AppHeader from './AppHeader'
import LiveChat from '../partials/LiveChat'
import ProfilePanel from './ProfilePanel'

import '../../../../vendor/styles/pages/chat.scss'

class PlayerPanel extends Component {
  render() {
    return (
      <>
        {this.props.game.profile && (
          <div className="d-flex flex-column justify-content-between h-100">
            {/* App Header */}
            <AppHeader
              {...this.props} {...this.state}
              open={this.props.open}
              openSlide={this.props.openSlide}
              change={this.props.change}
            />
            {/* / App Header */}

            {/* Profile Panel */}
            <ProfilePanel
              {...this.props} {...this.state}
              open={this.props.open}
              change={this.props.change}
              openSlide={this.props.openSlide}
            />
            {/* / Profile Panel */}

            {/* Live Chat Panel */}
            <LiveChat
              {...this.props} {...this.state}
              open={this.props.open}
              change={this.props.change}
              select={this.props.select}
            />
            {/* / Live Chat Panel */}
          </div>
        )}
      </>
    )
  }
}

export default PlayerPanel