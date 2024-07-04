import React, { Component } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'

import '../../../../vendor/styles/pages/chat.scss'

class AutoActionsSettings extends Component {

  constructor(props) {
    super(props)

    this.handleSubmitSitOutState = this.handleSubmitSitOutState.bind(this)
    this.handleSubmitMuckCardsState = this.handleSubmitMuckCardsState.bind(this)

    this.state = {
      init: false,
    }
  }

  handleSubmitSitOutState(e) {
    if (this.props.game.player) {
      this.props.client.sendPlayerSitOut(
        0,
        this.props.game.data.current_round,
        e.target.checked ? 1 : 0,
      )
    }
  }

  handleSubmitMuckCardsState(e) {
    if (this.props.game.player) {
      this.props.client.sendPlayerMuckCards(
        0,
        this.props.game.data.current_round,
        e.target.checked ? 1 : 0,
      )
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Auto Actions Settings Panel Header */}
        <Card
          className="bg-opaque2 border-0 shadow-none p-2 mb-0 options-panel-opacity-animation cursor-pointer"
          style={{
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            backdropFilter: `${this.props.settings.optionD12 ? "blur(4px)" : null}`,
          }}
          onClick={e => this.props.change('optionD1', !this.props.settings.optionD1)}>
          <span className="d-flex align-items-center justify-content-between px-0 bg-transparent">
            <Form.Label className="mb-0 font-weight-bold cursor-pointer">
              Auto Options
            </Form.Label>
            <Form.Label
              className="mb-0 font-weight-bold text-tiny cursor-pointer close-btn-opacity-animation"
              onClick={e => this.props.change('optionD1', !this.props.settings.optionD1)}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                  <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                  <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                </svg>
              </span>
            </Form.Label>
          </span>
        </Card>
        {/* / Auto Actions Settings Panel Header */}

        {/* Auto Actions Settings Panel Main */}
        <Card className="bg-opaque1 border-0 shadow-none p-2 options-panel-opacity-animation" style={{
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          backdropFilter: `${this.props.settings.optionD12 ? "blur(4px)" : null}`,
        }}>
          <Form.Label className="mb-1 font-weight-bold text-tiny">Player Settings</Form.Label>

          <Row>
            <Col md={6}>
              <Form.Group className="py-0 mb-0">
                <div>
                  <label className="switcher switcher-sm">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.props.game.player ? this.props.game.player.p_sit_out_request : false}
                      disabled={!this.props.game.player}
                      onChange={e => this.handleSubmitSitOutState(e)} />
                    <span className="switcher-indicator">
                      <span className="switcher-yes"></span>
                      <span className="switcher-no"></span>
                    </span>
                  </label>
                  <Form.Label className="mb-0 font-weight-bold small">Sit Out</Form.Label>
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="py-0 mb-0">
                <div>
                  <label className="switcher switcher-sm">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.props.game.player ? this.props.game.player.p_muck_cards : false}
                      disabled={!this.props.game.player}
                      onChange={e => this.handleSubmitMuckCardsState(e)} />
                    <span className="switcher-indicator">
                      <span className="switcher-yes"></span>
                      <span className="switcher-no"></span>
                    </span>
                  </label>
                  <Form.Label className="mb-0 font-weight-bold small">Muck Cards</Form.Label>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Form.Label className="mt-2 mb-1 font-weight-bold text-tiny">Auto Options</Form.Label>

          <Row>
            <Col md={12}>
              <Form.Group className="py-0 mb-0">
                <div>
                  <label className="switcher switcher-sm">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.props.settings.optionA5}
                      onChange={e => this.props.change('optionA5', e.target.checked)} />
                    <span className="switcher-indicator">
                      <span className="switcher-yes"></span>
                      <span className="switcher-no"></span>
                    </span>
                  </label>
                  <Form.Label className="mb-0 font-weight-bold small">Disable Auto Actions</Form.Label>
                </div>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="py-0 mb-0">
                <div>
                  <label className="switcher switcher-sm">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.props.settings.optionA6}
                      onChange={e => this.props.change('optionA6', e.target.checked)} />
                    <span className="switcher-indicator">
                      <span className="switcher-yes"></span>
                      <span className="switcher-no"></span>
                    </span>
                  </label>
                  <Form.Label className="mb-1">{this.props.settings.optionA6 ? 'Single Mode' : 'Continuous Mode'}</Form.Label>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card>
        {/* / Auto Actions Settings Panel Main */}
      </>
    )
  }
}

export default AutoActionsSettings