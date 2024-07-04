import React, { Component } from 'react'
import { Badge, Card, Col, Form, Row } from 'react-bootstrap'

import ResourceLoaderC from '../../../utilities/loaders/ResourceLoaderC'

import '../../../../../vendor/styles/pages/chat.scss'

class DealerPanelStartup extends Component {

  constructor(props) {
    super(props)

    this.handleRenderDisplay = this.handleRenderDisplay.bind(this)

    this.state = {
      init: false,
    }
  }

  handleRenderDisplay() {
    if (this.props.game.data.game_started) {
      return (
        <Card className="d-flex w-100 mt-0 mb-2 bg-transparent border-0 shadow-none pt-0 pb-2">
          <Row className="mx-0 d-flex justify-content-center p-0">
            <div className={`text-center text-white opacity-100 mb-0 h3 font-weight-bold`}>Game in progress...</div>
          </Row>

          <Row noGutters className="h-100 border-0 shadow-none mx-0 d-flex justify-content-center pt-4 pb-2">
            <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none py-0" style={{ justifyContent: "center", }}>
              <span className="h2 mt-0 mb-0 font-weight-bold">
                <ResourceLoaderC
                  height={`6rem`} width={`6rem`} />
              </span>
            </Col>
          </Row>

          <Row className="mx-0 d-flex justify-content-center p-2">
            <div className={`text-center text-white opacity-100 mb-0 h4 font-weight-bold`}>
              <Badge
                pill variant="light"
                className="bg-player-panel-item-opacity-drop bg-dark font-weight-bold"
                style={{ verticalAlign: "middle", }}>
                Please scan the first card
              </Badge>
            </div>
          </Row>

          <Row className="mx-0 d-flex justify-content-center p-2 mb-0">
            <div className="text-center text-white opacity-50 text-tiny mb-0">
              Please ensure that all required devices (barcode scanners or keyboards) are correctly connected and ready for use.<br />
              In the event of a malfunction, please contact IT support immediately.
            </div>
          </Row>
        </Card>
      )
    } else {
      return (
        <Card className="d-flex w-100 mt-3 mb-3 bg-transparent border-0 shadow-none p-4">
          <Row className="mx-0 d-flex justify-content-start p-2 mb-4">
            <img
              src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
              alt="Live Poker Studio™" className="d-block" style={{ width: "100px", }} />
          </Row>

          <Row className="mx-0 d-flex justify-content-start p-2">
            <div className={`text-left text-white opacity-100 mb-0 h4 font-weight-bold`}>
              1. Scan the first card to trigger the shuffle countdown.
              <br className="mb-1" />
              2. Scan the second card to start registering the hole cards.
            </div>
          </Row>

          <Row className="mx-0 d-flex justify-content-start p-2 mb-4">
            <div className="text-left text-white opacity-50 text-tiny mb-0">
              Please ensure that all required devices (barcode scanners or keyboards) are correctly connected and ready for use.<br />
              In the event of a malfunction, please contact IT support immediately.
            </div>
          </Row>

          <Row className="mx-0 d-flex justify-content-start">
            <Form.Group className="mb-0">
              <span className="switcher-label font-weight-bold small mr-2">Test Mode</span>
              <label className="switcher">
                <input
                  type="checkbox"
                  className="switcher-input"
                  checked={this.props.debug}
                  onChange={e => this.props.change('debug', e.target.checked)} />
                <span className="switcher-indicator">
                  <span className="switcher-yes"></span>
                  <span className="switcher-no"></span>
                </span>
              </label>
            </Form.Group>
          </Row>
        </Card>
      )
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Dealer Startup Display */}
        {this.handleRenderDisplay()}
        {/* / Dealer Startup Display */}
      </>
    )
  }
}

export default DealerPanelStartup
