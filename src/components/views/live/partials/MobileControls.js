import React, { Component } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import GameActions from './GameActions'

import '../../../../vendor/libs/react-perfect-scrollbar/react-perfect-scrollbar.scss'
import '../../../../vendor/styles/pages/chat.scss'

class MobileControls extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Mobile Game Controller */}

        <Card className="border-0 shadow-none">
          <Row>
            <Col className="bg-darker1 p-0">

              {/* Game Actions Panel */}
              <GameActions
                {...this.props} {...this.state}
                change={this.props.change}
                resetAuto={this.props.resetAuto} />
              {/* / Game Actions Panel */}

            </Col>

            <Col className="bg-darker1 p-0">

              {/* Game Actions Panel */}
              <GameActions
                {...this.props} {...this.state}
                change={this.props.change}
                resetAuto={this.props.resetAuto} />
              {/* / Game Actions Panel */}

            </Col>
          </Row>
        </Card>

        {/* / Mobile Game Controller */}
      </>
    )
  }
}

export default MobileControls