import React, { Component } from 'react'
import { Badge, Col, Dropdown, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

import SettingsIcon from '../../icons/Settings'
import Nouislider from 'nouislider-react'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/libs/nouislider-react/nouislider-react.scss'

class QuickSettingsButton extends Component {

  constructor(props) {
    super(props)

    this.onHandleToggle = this.onHandleToggle.bind(this)

    this.state = {
      init: false,
      show: false,
      fetching: false,
    }

    this.sliderOptions1 = {
      connect: true,
      behaviour: 'tap-drag',
      step: 10,
      tooltips: true,
      range: {
        min: 0,
        max: 100,
      },
      pips: {
        mode: 'range',
        stepped: true,
        density: 10,
      },
      direction: 'ltr',
    }
  }

  onHandleToggle() {
    this.setState({
      show: !this.state.show,
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Quick Settings Button */}
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip
              className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
              Quick Settings
            </Tooltip>
          }>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-menu-link-3"
              size="md"
              className="mr-1"
              variant="widget5 icon-btn rounded-pill md-btn-flat hide-arrow"
              onToggle={this.onHandleToggle}>
              <SettingsIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu
              show={this.state.show}
              className="border-0 shadow-none p-0 mt-1"
              style={{
                width: "320px",
                borderRadius: "15px",
              }}>

              <div className="m-0 p-0 bg-transparent">
                <div
                  className="bg-darker1 text-left text-white font-weight-bold p-4 mt-0 d-flex align-items-center"
                  style={{
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}>
                  <span className="mb-0 font-weight-bold ml-1">
                    <span className="d-flex align-items-center">
                      <div>
                        <i
                          className="fas fa-tools"
                          style={{
                            fontSize: "250%",
                          }}
                        />
                      </div>
                      <span className="ml-3 mb-0 font-weight-bold" style={{ fontSize: "90%", }}>
                        <div>
                          <div className="text-body font-weight-bold" style={{
                            lineHeight: "0px",
                          }}>
                            Quick Settings
                            <Badge
                              pill variant="default"
                              className="font-weight-bold align-text-bottom ml-1 cursor-pointer">
                              {this.props.game.data.auto_mode
                                ? `Auto Mode`
                                : `Live Play`}
                            </Badge>
                          </div>
                          <span
                            className="text-muted small mt-0 cursor-pointer font-weight-normal"
                            onClick={() => this.props.open(7)}>
                            Open Configuration
                          </span>
                        </div>
                      </span>
                    </span>
                  </span>
                </div>

                <Dropdown.Header className="px-4 mt-2">Player Volume</Dropdown.Header>

                <Form.Group className="px-4 mt-2 mb-0" style={{ width: "320px", }}>
                  <Row noGutters className="h-100 mb-2">
                    <Col sm={12} md={12} lg={12} className="d-flex align-items-center">
                      <Nouislider
                        start={this.props.settings.optionB1}
                        {...this.sliderOptions1}
                        onSet={val => { this.props.change('optionB1', Number(val[0])) }}
                        disabled={this.props.settings.optionB2}
                        style={{ width: '100%', margin: '0 auto 30px', }}
                        tooltips={[{
                          to: function (value) {
                            return Math.round(parseInt(value));
                          }
                        }]} />
                    </Col>
                  </Row>
                  <Form.Group className="py-0 mb-0" style={{ width: "320px", }}>
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionB2}
                          onChange={e => this.props.change('optionB2', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Mute</Form.Label>
                    </div>
                  </Form.Group>
                </Form.Group>

                <Dropdown.Header className="px-4 mt-2">SFX Volume</Dropdown.Header>

                <Form.Group className="px-4 mt-2 mb-0" style={{ width: "320px", }}>
                  <Row noGutters className="h-100 mb-2">
                    <Col sm={12} md={12} lg={12} className="d-flex align-items-center">
                      <Nouislider
                        start={this.props.settings.optionB3}
                        {...this.sliderOptions1}
                        onSet={val => { this.props.change('optionB3', Number(val[0])) }}
                        disabled={this.props.settings.optionB4}
                        style={{ width: '100%', margin: '0 auto 30px', }}
                        tooltips={[{
                          to: function (value) {
                            return Math.round(parseInt(value));
                          }
                        }]} />
                    </Col>
                  </Row>
                  <Form.Group className="py-0 mb-0" style={{ width: "320px", }}>
                    <span>
                      <div>
                        <label className="switcher switcher-sm">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            checked={this.props.settings.optionB4}
                            onChange={e => this.props.change('optionB4', e.target.checked)} />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                        </label>
                        <Form.Label className="mb-1">Mute</Form.Label>
                      </div>
                    </span>
                  </Form.Group>
                </Form.Group>

                <Dropdown.Header className="px-4 mt-2">Auto Options</Dropdown.Header>

                <Form.Group className="px-4 py-0 mb-0" style={{ width: "320px", }}>
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
                    <Form.Label className="mb-1">Disable Auto Actions</Form.Label>
                  </div>
                </Form.Group>

                <Form.Group className="px-4 py-0 mb-4" style={{ width: "320px", }}>
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
                    <Form.Label className="mb-1">
                      {this.props.settings.optionA6
                        ? 'Reset after each betting round'
                        : 'Continuous Mode'}
                    </Form.Label>
                  </div>
                </Form.Group>

              </div>
            </Dropdown.Menu>
          </Dropdown>
        </OverlayTrigger>
        {/* / Quick Settings Button  */}
      </>
    )
  }
}

export default QuickSettingsButton