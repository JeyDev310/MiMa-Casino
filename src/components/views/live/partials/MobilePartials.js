import React, { Component } from 'react'

import PlayerListMobile from './PlayerListMobile'
import ProfilePanelMobile from './ProfilePanelMobile'
import PlayerListMobilePortrait from './PlayerListMobilePortrait'
import LiveChatMobile from '../partials/LiveChatMobile'
import DropdownMenuMobile from '../partials/DropdownMenuMobile'
import ExitButton from '../partials/ExitButton'
import LiveChat from '../partials/LiveChat'

class MobilePartials extends Component {

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Mobile-only Partials */}
       
            {/* Profile Panel */}
            <ProfilePanelMobile
              {...this.props}
              {...this.state}
              open={this.props.open}
              openSlide={this.props.openSlide}
              change={this.props.change}
            />
            {/* / Profile Panel */}

            {/* Live Chat Panel */}
            <div className="live-chat-mobile">
              <LiveChatMobile
                {...this.props} {...this.state}
                open={this.props.open}
                change={this.props.change}
                select={this.props.select}
              />
            </div>
            {/* / Live Chat Panel */}
            <div className="drop-down-menu-mobile">
              <DropdownMenuMobile 
                {...this.props} {...this.state}
                openFill={this.props.openFill}
                openSlide={this.props.openSlide}
                change={this.props.change}
                capture={this.props.capture}
                setMute={this.props.setMute}
              />
            </div>
            <div className="exit-button-mobile">
              <ExitButton
              {...this.props} {...this.state}
              change={this.props.change} 
              />
            </div>
            <div className="live-chat-tablet">
              <LiveChat
                {...this.props} {...this.state}
                open={this.props.open}
                change={this.props.change}
                select={this.props.select}
              />
            </div>            
            {/* Player List Mobile */}
            <PlayerListMobile
              {...this.props}
              {...this.state}
              open={this.props.open}
              openSlide={this.props.openSlide}
              change={this.props.change}
              select={this.props.select}
            />
            {/* / Player List Mobile */}

            {/* Player List Mobile Portrait*/}
            <PlayerListMobilePortrait
              {...this.props}
              {...this.state}
              open={this.props.open}
              openSlide={this.props.openSlide}
              change={this.props.change}
              select={this.props.select}
            />
            {/* / Player List Mobile */}
         

        {/* / Mobile-only Partials */}
      </>
    )
  }
}

export default MobilePartials