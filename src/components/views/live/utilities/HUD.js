import React, { Component } from 'react'

import Details from '../hud/partials/Details'
import GameStatus from '../hud/partials/GameStatus'
import PlayerOrbit from '../hud/partials/PlayerOrbit'

import '../../../../vendor/styles/pages/live.scss'
import '../../../../vendor/styles/pages/network.scss'

class HUD extends Component {
  render() {
    return (
      <>
        <Details
          {...this.props} {...this.state}
        />

        <GameStatus
          {...this.props} {...this.state}
        />

        <PlayerOrbit
          {...this.props} {...this.state}
        />

        {/* <PlayerQuickActions
          {...this.props} {...this.state}
          change={this.props.change}
          openSlide={this.props.openSlide}
        /> */}
      </>
    )
  }
}

export default HUD
