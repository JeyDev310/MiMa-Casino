import React, { Component } from 'react'

class GameDetails extends Component {

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Game Details */}
        {this.props.game.data && this.props.settings.optionK5 && (
          <div className="position-absolute game-details-layout-s1 pl-3 pb-3 d-none live-d-lg-initial">
            <span className="game-details-text-s1">
              <div>
                <span className="footer-text text-body">
                  <span>
                    <strong>Round ID</strong> {this.props.game.data.session_id}
                  </span>
                </span>
              </div>
              <div>
                <span className="footer-text text-body">
                  <span>
                    Copyright © {new Date().getFullYear()} Live Poker Studio™. All rights reserved.
                  </span>
                </span>
              </div>
            </span>
          </div>
        )}
        {/* / Game Details */}
      </>
    )
  }
}

export default GameDetails
