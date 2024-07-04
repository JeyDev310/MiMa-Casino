import React, { Component } from 'react'
import { Media } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

class DealerPanelHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Dealer Panel Header */}

        <div className="card-header-title d-flex align-items-center">
          <div className="d-flex align-items-ceter justify-content-center">
            <Media className="align-items-center text-left">
              <Media.Body>
                <div className="text-light text-tiny font-weight-semibold line-height-1 mb-1">LOGGED IN AS</div>
                <div className="text-large font-weight-bolder line-height-1">
                  {this.props.game.profile
                    ? this.props.game.profile.username
                    : `Undefined`}
                </div>
                <div className="font-weight-bold small">
                  {this.props.game.profile
                    ? this.props.game.profile.email
                    : `Undefined`}
                </div>
              </Media.Body>
            </Media>
          </div>
        </div>

        {/* / Dealer Panel Header */}
      </>
    )
  }
}

export default DealerPanelHeader