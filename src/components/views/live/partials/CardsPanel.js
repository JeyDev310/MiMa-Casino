import React, { Component } from 'react'

import LiveCardsHolder from './LiveCardsHolder'

import '../../../../vendor/styles/pages/chat.scss'

class CardsPanel extends Component {
  render() {
    return (
      <>
        {/* Cards Panel */}

        {/* Live Cards Holder */}
        <LiveCardsHolder
          {...this.props} exit={this.props.exit} />
        {/* / Live Cards Holder */}

        {/* / Cards Panel */}
      </>
    )
  }
}

export default CardsPanel