import React, { Component } from 'react'
import { Badge, Button, ButtonGroup, Card, Col, Collapse, Form, Modal, Row } from 'react-bootstrap'

import Select from 'react-select'
import Nouislider from 'nouislider-react'

import LaddaButton, {
  SLIDE_UP,
} from 'react-ladda'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/libs/react-ladda/react-ladda.scss'
import '../../../../../vendor/libs/react-select/react-select.scss'
import '../../../../../vendor/libs/nouislider-react/nouislider-react.scss'

class Settings extends Component {

  constructor(props) {
    super(props)

    this.reloadTimeout = 0

    this.onHandleResetAudioSettings = this.onHandleResetAudioSettings.bind(this)

    this.state = {
      init: false,
      loading: Array.from({ length: 3 }, (_) => false),
      progress: Array.from({ length: 3 }, (_) => false),
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
        mode: 'steps',
        stepped: true,
        density: 4,
      },
      direction: 'ltr',
    }

    this.sliderOptions2 = {
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
        density: 4,
      },
      direction: 'ltr',
    }

    this.sliderOptions3 = {
      connect: true,
      behaviour: 'tap-drag',
      step: 10,
      tooltips: true,
      range: {
        min: 0,
        max: 360,
      },
      pips: {
        mode: 'range',
        stepped: true,
        density: 4,
      },
      direction: 'ltr',
    }

    this.sliderOptions4 = {
      animate: true,
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
        density: 4,
      },
      direction: 'ltr',
    }

    this.selectOptions1 = [
      { id: 0, value: 'preset1', label: 'Default', isDisabled: false, },
      { id: 1, value: 'preset2', label: 'Guitar Chords #1', isDisabled: true, },
      { id: 2, value: 'preset3', label: 'Guitar Chords #2', isDisabled: true, },
      { id: 3, value: 'preset4', label: 'Synth Chords #1', isDisabled: true, },
      { id: 4, value: 'preset5', label: 'Synth Chords #2', isDisabled: true, },
    ]

    this.selectOptions2 = [
      { id: 0, value: 'preset1', label: 'Standard Design', isDisabled: false, },
    ]

    this.selectOptions3 = [
      { id: 0, value: 'preset1', label: 'Large Buttons', isDisabled: false, },
      { id: 1, value: 'preset2', label: 'Medium Buttons', isDisabled: false, },
      { id: 2, value: 'preset3', label: 'Small Buttons', isDisabled: false, },
    ]

    this.selectOptions4 = [
      { id: 0, value: 'size1', label: 'Tiny', isDisabled: false, },
      { id: 1, value: 'size2', label: 'Small', isDisabled: false, },
      { id: 2, value: 'size3', label: 'Standard', isDisabled: false, },
      { id: 3, value: 'size4', label: 'Large', isDisabled: false, },
    ]
  }

  componentWillUnmount() {
    clearTimeout(this.reloadTimeout)
  }

  onHandleResetAudioSettings() {
    this.props.change('optionB1', Number(75))
  }

  startLoading(i) {
    if (this.state.loading[i]) return
    if (i === 0) {
      this.props.change('optionE2', String(Math.random().toString(6).substr(2, 12)))
    } else if (i === 1) {
      this.props.change('optionE3', String(Math.random().toString(6).substr(2, 12)))
    } else if (i === 2) {
      this.props.change('optionE4', String(Math.random().toString(6).substr(2, 12)))
    }
    this.updateLoadingValue(i, true)
    this.reloadTimeout = setTimeout(() => {
      this.updateLoadingValue(i, false)
    }, 500)
  }

  updateLoadingValue(index, value) {
    this.setState(({ loading }) => {
      loading[index] = value
      return { loading }
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Settings Modal */}
        <Modal.Body style={{ margin: "0" }}>
          <h4 className="text-left mb-4 font-weight-bold">Settings</h4>

          <div className="text-left text-left text-white opacity-50 small mb-3">
            Here you can make your personal game adjustments. Adjust your game behavior or change audiovisual parameters.
          </div>

          <hr className="border-light m-0 pt-2 pb-2" />

          <Card className="mb-2 bg-light">
            <Card.Header>
              <a className="text-body font-weight-bold"
                href="#accordion"
                onClick={e => this.props.tab(e, 'settingsTab', 1)}
                aria-expanded={this.props.settingsTab === 1}>
                Game Settings
              </a>
            </Card.Header>

            <Collapse in={this.props.settingsTab === 1}>
              <div>
                <Card.Body className="pb-2">

                  <Form.Label className="mt-0 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>Auto Actions</span>
                  </Form.Label>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionA7}
                          disabled={this.props.settings.optionA5}
                          onChange={e => this.props.change('optionA7', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">
                        <span>Auto Bet</span>
                        <Badge pill variant="default" className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop">
                          Minimum
                        </Badge>
                      </Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionA8}
                          disabled={this.props.settings.optionA5}
                          onChange={e => this.props.change('optionA8', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Auto Check</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionA1}
                          disabled={this.props.settings.optionA5}
                          onChange={e => this.props.change('optionA1', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Auto Check/Fold</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionA9}
                          disabled={this.props.settings.optionA5}
                          onChange={e => this.props.change('optionA9', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">
                        <span>Auto Raise</span>
                        <Badge pill variant="default" className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop">
                          Minimum
                        </Badge>
                      </Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionA4}
                          disabled={this.props.settings.optionA5}
                          onChange={e => this.props.change('optionA4', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Auto Call</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionA10}
                          disabled={this.props.settings.optionA5}
                          onChange={e => this.props.change('optionA10', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Auto Call Any</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionA2}
                          disabled={this.props.settings.optionA5}
                          onChange={e => this.props.change('optionA2', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Auto All-In</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionA3}
                          disabled={this.props.settings.optionA5}
                          onChange={e => this.props.change('optionA3', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Auto Fold</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Label className="mt-3 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>Auto Options</span>
                  </Form.Label>

                  <Form.Group className="mb-1">
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
                      <Form.Label className="mb-1">Disable All Auto Actions</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
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

                </Card.Body>
              </div>
            </Collapse>
          </Card>

          <Card className="mb-2 bg-light">
            <Card.Header>
              <a className="text-body font-weight-bold"
                href="#accordion"
                onClick={e => this.props.tab(e, 'settingsTab', 5)}
                aria-expanded={this.props.settingsTab === 5}>
                System Settings
              </a>
            </Card.Header>

            <Collapse in={this.props.settingsTab === 5}>
              <div>
                <Card.Body className="pb-2">

                  <Form.Label className="mt-0 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>Dashboard Options</span>
                  </Form.Label>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionD2}
                          onChange={e => this.props.change('optionD2', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Bet/Raise Minimum Value</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionD3}
                          onChange={e => this.props.change('optionD3', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Live Poker Studio™ Solver Hints</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionD4}
                          onChange={e => this.props.change('optionD4', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Live Poker Studio™ Live Chat</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionD11}
                          onChange={e => this.props.change('optionD11', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Live Poker Studio™ Player List</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionD14}
                          onChange={e => this.props.change('optionD14', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Live Poker Studio™ Player Notifications</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionF7}
                          onChange={e => this.props.change('optionF7', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Live Poker Studio™ Messages</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionK3}
                          onChange={e => this.props.change('optionK3', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Live Poker Studio™ Game Pad</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Label className="mt-3 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>Live Chat Settings</span>
                  </Form.Label>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionD8}
                          onChange={e => this.props.change('optionD8', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Font Size {this.props.settings.optionD8 ? 'Small' : 'Normal'}</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionD9}
                          onChange={e => this.props.change('optionD9', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Background Opacity {this.props.settings.optionD9 ? 'Enabled' : 'Disabled'}</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionD10}
                          onChange={e => this.props.change('optionD10', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Animations {this.props.settings.optionD10 ? 'On' : 'Off'}</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Label className="mt-3 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>UI Settings</span>
                  </Form.Label>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionF1}
                          disabled={false}
                          onChange={e => this.props.change('optionF1', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">
                        <span>Auto-Close Showdown Modal</span>
                        <Badge pill variant="default" className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop">
                          Panel
                        </Badge>
                      </Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionF3}
                          disabled={false}
                          onChange={e => this.props.change('optionF3', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">
                        <span>Auto-Close Error Notification Modal</span>
                        <Badge pill variant="default" className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop">
                          Panel
                        </Badge>
                      </Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Label className="mt-3 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>Advanced Settings</span>
                  </Form.Label>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionM1}
                          disabled={false}
                          onChange={e => this.props.change('optionM1', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">
                        <span>Spectator Mode</span>
                      </Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Label className="mt-3 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>Game Actions</span>
                  </Form.Label>

                  <Form.Group className="mb-3">
                    <div>
                      <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        options={this.selectOptions3}
                        defaultValue={this.selectOptions3[this.props.settings.optionF4]}
                        onChange={e => this.props.change('optionF4', e.id)}
                        isClearable={false}
                        isSearchable={true}
                        isDisabled={false} />
                    </div>
                  </Form.Group>

                  <Form.Label className="mt-3 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>Game Controller Settings</span>
                  </Form.Label>

                  <Form.Group className="mb-3">
                    <div>
                      <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        options={this.selectOptions4}
                        defaultValue={this.selectOptions4[this.props.settings.optionF5]}
                        onChange={e => this.props.change('optionF5', e.id)}
                        isClearable={false}
                        isSearchable={true}
                        isDisabled={false} />
                    </div>
                  </Form.Group>

                </Card.Body>
              </div>
            </Collapse>
          </Card>

          <Card className="mb-2 bg-light">
            <Card.Header>
              <a className="text-body font-weight-bold"
                href="#accordion"
                onClick={e => this.props.tab(e, 'settingsTab', 2)}
                aria-expanded={this.props.settingsTab === 2}>
                Audio Settings
              </a>
            </Card.Header>

            <Collapse in={this.props.settingsTab === 2}>
              <div>
                <Card.Body className="p-0">

                  <Form.Group className="px-4 py-4 mb-0" style={{ backgroundColor: "rgba(37, 40, 46, 0.1)", }}>
                    <Form.Label className="mb-4 d-flex justify-content-between">
                      <span style={{ alignSelf: "center", }}>Player Volume</span>
                      <span>
                        <div>
                          <span className="small font-weight-bold">Mute</span>
                          <label className="switcher switcher-sm ml-2 mr-0">
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
                        </div>
                      </span>
                    </Form.Label>

                    <Row noGutters className="h-100 mb-2">
                      <Col sm={12} md={12} lg={12} className="d-flex align-items-center">
                        <Nouislider
                          start={this.props.settings.optionB1}
                          {...this.sliderOptions2}
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
                    <Form.Text className="text-muted">Change the audio volume of the video player.</Form.Text>
                  </Form.Group>

                  <Form.Group className="bg-light px-4 py-4 mb-0">
                    <Form.Label className="mb-4 d-flex justify-content-between">
                      <span style={{ alignSelf: "center", }}>SFX Volume</span>
                      <span>
                        <div>
                          <span className="small font-weight-bold">Mute</span>
                          <label className="switcher switcher-sm ml-2 mr-0">
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
                        </div>
                      </span>
                    </Form.Label>

                    <Row noGutters className="h-100 mb-2">
                      <Col sm={12} md={12} lg={12} className="d-flex align-items-center">
                        <Nouislider
                          start={this.props.settings.optionB3}
                          {...this.sliderOptions2}
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
                    <Form.Text className="text-muted">Change the audio volume of the sound effects.</Form.Text>
                  </Form.Group>

                </Card.Body>
              </div>
            </Collapse>
          </Card>

          <Card className="mb-2 bg-light">
            <Card.Header>
              <a className="text-body font-weight-bold"
                href="#accordion"
                onClick={e => this.props.tab(e, 'settingsTab', 8)}
                aria-expanded={this.props.settingsTab === 8}>
                Sound FX Settings
              </a>
            </Card.Header>

            <Collapse in={this.props.settingsTab === 8}>
              <div>
                <Card.Body className="pb-2">

                  <Form.Label className="mt-0 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>Sound FX Presets</span>
                  </Form.Label>

                  <Form.Group className="mb-3">
                    <div>
                      <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        options={this.selectOptions1}
                        defaultValue={this.selectOptions1[0]}
                        isClearable={false}
                        isSearchable={true}
                        isDisabled={false} />
                    </div>
                  </Form.Group>

                </Card.Body>
              </div>
            </Collapse>
          </Card>

          {!this.props.game.data.auto_mode && (
            <Card className="mb-2 bg-light">
              <Card.Header>
                <a className="text-body font-weight-bold"
                  href="#accordion"
                  onClick={e => this.props.tab(e, 'settingsTab', 3)}
                  aria-expanded={this.props.settingsTab === 3}>
                  Video Settings
                </a>
              </Card.Header>

              <Collapse in={this.props.settingsTab === 3}>
                <div>
                  <Card.Body className="p-0">

                    <Form.Group className="px-4 py-4 mb-0" style={{ backgroundColor: "rgba(37, 40, 46, 0.1)", }}>
                      <Form.Label className="mb-2 d-flex justify-content-between">
                        <span style={{ alignSelf: "center", }}>Horizontal Image Flip</span>
                        <span>
                          <Button
                            size="sm"
                            className="ml-2"
                            variant="default rounded-pill"
                            onClick={() => this.props.change('optionC9', false)}>
                            Reset
                          </Button>
                        </span>
                      </Form.Label>
                      <Row noGutters className="h-100 mb-0">
                        <Col sm={12} md={12} lg={12} className="d-flex align-items-center">
                          <label className="switcher switcher-sm">
                            <input
                              type="checkbox"
                              className="switcher-input"
                              checked={this.props.settings.optionC9}
                              onChange={e => this.props.change('optionC9', e.target.checked)} />
                            <span className="switcher-indicator">
                              <span className="switcher-yes"></span>
                              <span className="switcher-no"></span>
                            </span>
                          </label>
                        </Col>
                      </Row>
                      <Form.Text className="text-muted text-tiny">Horizontal Video Mirroring flips the videostream horizontally.</Form.Text>
                    </Form.Group>

                    <Form.Group className="bg-light px-4 py-4 mb-0">
                      <Form.Label className="mb-4 d-flex justify-content-between">
                        Gradient Alpha
                      </Form.Label>
                      <Nouislider
                        start={this.props.settings.optionC6}
                        disabled={false}
                        {...this.sliderOptions4}
                        onSet={val => { this.props.change('optionC6', Number(val[0])) }}
                        style={{ width: '100%', margin: '0 auto 30px', }}
                        tooltips={[{
                          to: function (value) {
                            return Math.round(parseInt(value));
                          }
                        }]} />
                    </Form.Group>

                    <Form.Group className="px-4 py-4 mb-0" style={{ backgroundColor: "rgba(37, 40, 46, 0.1)", }}>
                      <Form.Label className="mb-4 d-flex justify-content-between">
                        Gradient Blur Radius
                      </Form.Label>
                      <Nouislider
                        start={this.props.settings.optionC7}
                        disabled={false}
                        {...this.sliderOptions4}
                        onSet={val => { this.props.change('optionC7', Number(val[0])) }}
                        style={{ width: '100%', margin: '0 auto 30px', }}
                        tooltips={[{
                          to: function (value) {
                            return Math.round(parseInt(value));
                          }
                        }]} />
                    </Form.Group>

                    <Form.Group className="bg-light px-4 py-4 mb-0">
                      <Form.Label className="mb-4 d-flex justify-content-between">
                        Gradient Spread Radius
                      </Form.Label>
                      <Nouislider
                        start={this.props.settings.optionC8}
                        disabled={false}
                        {...this.sliderOptions4}
                        onSet={val => { this.props.change('optionC8', Number(val[0])) }}
                        style={{ width: '100%', margin: '0 auto 30px', }}
                        tooltips={[{
                          to: function (value) {
                            return Math.round(parseInt(value));
                          }
                        }]} />
                    </Form.Group>

                    <Form.Group className="px-4 py-4 mb-0" style={{ backgroundColor: "rgba(37, 40, 46, 0.1)", }}>
                      <Form.Label className="mb-4 d-flex justify-content-between">
                        Image Brightness
                      </Form.Label>
                      <Nouislider
                        start={this.props.settings.optionC1}
                        {...this.sliderOptions2}
                        onSet={val => { this.props.change('optionC1', Number(val[0])) }}
                        style={{ width: '100%', margin: '0 auto 30px', }}
                        tooltips={[{
                          to: function (value) {
                            return Math.round(parseInt(value));
                          }
                        }]} />
                      <Form.Text className="text-muted">The brightness of the video player can be reduced or increased.</Form.Text>
                    </Form.Group>

                    <Form.Group className="bg-light px-4 py-4 mb-0">
                      <Form.Label className="mb-4 d-flex justify-content-between">
                        Image Contrast
                      </Form.Label>
                      <Nouislider
                        start={this.props.settings.optionC2}
                        {...this.sliderOptions2}
                        onSet={val => { this.props.change('optionC2', Number(val[0])) }}
                        style={{ width: '100%', margin: '0 auto 30px', }}
                        tooltips={[{
                          to: function (value) {
                            return Math.round(parseInt(value));
                          }
                        }]} />
                      <Form.Text className="text-muted">Adjust the contrast to help the image look sharper and more vivid.</Form.Text>
                    </Form.Group>

                    <Form.Group className="px-4 py-4 mb-0" style={{ backgroundColor: "rgba(37, 40, 46, 0.1)", }}>
                      <Form.Label className="mb-4 d-flex justify-content-between">
                        Image Grayscale
                      </Form.Label>
                      <Nouislider
                        start={this.props.settings.optionC3}
                        {...this.sliderOptions2}
                        onSet={val => { this.props.change('optionC3', Number(val[0])) }}
                        style={{ width: '100%', margin: '0 auto 30px', }}
                        tooltips={[{
                          to: function (value) {
                            return Math.round(parseInt(value));
                          }
                        }]} />
                      <Form.Text className="text-muted">The video player can be displayed in grayscale.</Form.Text>
                    </Form.Group>

                    <Form.Group className="bg-light px-4 py-4 mb-0">
                      <Form.Label className="mb-4 d-flex justify-content-between">
                        Hue Rotation
                      </Form.Label>
                      <Nouislider
                        start={this.props.settings.optionC4}
                        {...this.sliderOptions3}
                        onSet={val => { this.props.change('optionC4', Number(val[0])) }}
                        style={{ width: '100%', margin: '0 auto 30px', }}
                        tooltips={[{
                          to: function (value) {
                            return `${Math.round(parseInt(value))}`
                          }
                        }]} />
                      <Form.Text className="text-muted">Adjust the hue rotation to give the image a distinctive flavor.</Form.Text>
                    </Form.Group>

                    <Form.Group className="px-4 py-4 mb-0" style={{ backgroundColor: "rgba(37, 40, 46, 0.1)", }}>
                      <Form.Label className="mb-4 d-flex justify-content-between">
                        Sepia Amount
                      </Form.Label>
                      <Nouislider
                        start={this.props.settings.optionC5}
                        {...this.sliderOptions2}
                        onSet={val => { this.props.change('optionC5', Number(val[0])) }}
                        style={{ width: '100%', margin: '0 auto 30px', }}
                        tooltips={[{
                          to: function (value) {
                            return Math.round(parseInt(value));
                          }
                        }]} />
                      <Form.Text className="text-muted">Adjust the sepia amount to your preferred level.</Form.Text>
                    </Form.Group>

                  </Card.Body>
                </div>
              </Collapse>
            </Card>
          )}

          {!this.props.game.data.auto_mode && (
            <Card className="mb-2 bg-light">
              <Card.Header>
                <a className="text-body font-weight-bold"
                  href="#accordion"
                  onClick={e => this.props.tab(e, 'settingsTab', 4)}
                  aria-expanded={this.props.settingsTab === 4}>
                  Stream Settings
                </a>
              </Card.Header>

              <Collapse in={this.props.settingsTab === 4}>
                <div>
                  <Card.Body className="pb-2">

                    <Form.Label className="mt-0 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                      <span style={{ alignSelf: "center", }}>Stream Options</span>
                    </Form.Label>

                    <Form.Group>
                      <div>
                        <label className="switcher switcher-sm">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            checked={this.props.settings.optionE1}
                            onChange={e => this.props.change('optionE1', e.target.checked)} />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                        </label>
                        <Form.Label className="mb-1">
                          Stream Visibility
                        </Form.Label>
                      </div>
                    </Form.Group>

                    <Form.Label className="mt-0 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                      <span style={{ alignSelf: "center", }}>Stream Controls</span>
                    </Form.Label>

                    <Form.Group>
                      <div>
                        <ButtonGroup
                          size="sm"
                          className="w-100 d-flex align-items-center mb-3">

                          <LaddaButton
                            loading={this.state.loading[0]}
                            onClick={() => this.startLoading(0)}
                            data-style={SLIDE_UP}
                            size="sm"
                            className={`btn ${this.state.loading[0]
                              ? 'btn-opaque1'
                              : 'btn-opaque2'} font-weight-bold d-flex align-items-center justify-content-center`}>
                            <i className="fas fa-play text-body mr-2"></i>
                            <span>Start</span>
                          </LaddaButton>
                          <LaddaButton
                            loading={this.state.loading[1]}
                            onClick={() => this.startLoading(1)}
                            data-style={SLIDE_UP}
                            size="sm"
                            className={`btn ${this.state.loading[1]
                              ? 'btn-opaque1'
                              : 'btn-opaque2'} font-weight-bold d-flex align-items-center justify-content-center`}>
                            <i className="fas fa-stop text-body mr-2"></i>
                            <span>Stop</span>
                          </LaddaButton>
                          <LaddaButton
                            loading={this.state.loading[2]}
                            onClick={() => this.startLoading(2)}
                            data-style={SLIDE_UP}
                            size="sm"
                            className={`btn ${this.state.loading[2]
                              ? 'btn-opaque1'
                              : 'btn-opaque2'} font-weight-bold d-flex align-items-center justify-content-center`}>
                            <i className="fas fa-redo-alt text-body mr-2"></i>
                            <span>Reload</span>
                          </LaddaButton>

                        </ButtonGroup>
                      </div>
                    </Form.Group>

                  </Card.Body>
                </div>
              </Collapse>
            </Card>
          )}

          <Card className="mb-2 bg-light">
            <Card.Header>
              <a className="text-body font-weight-bold"
                href="#accordion"
                onClick={e => this.props.tab(e, 'settingsTab', 9)}
                aria-expanded={this.props.settingsTab === 9}>
                UI Card Settings
              </a>
            </Card.Header>

            <Collapse in={this.props.settingsTab === 9}>
              <div>
                <Card.Body className="pb-2">

                  <Form.Label className="mt-0 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>UI Card Design</span>
                  </Form.Label>

                  <Form.Group className="mb-3">
                    <div>
                      <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        options={this.selectOptions2}
                        defaultValue={this.selectOptions2[0]}
                        isClearable={false}
                        isSearchable={true}
                        isDisabled={false} />
                    </div>
                  </Form.Group>

                </Card.Body>
              </div>
            </Collapse>
          </Card>

          <Card className="mb-3 bg-light">
            <Card.Header>
              <a className="text-body font-weight-bold"
                href="#accordion"
                onClick={e => this.props.tab(e, 'settingsTab', 7)}
                aria-expanded={this.props.settingsTab === 7}>
                Analytics & Data Privacy
              </a>
            </Card.Header>

            <Collapse in={this.props.settingsTab === 7}>
              <div>
                <Card.Body className="pb-2">

                  <Form.Label className="mt-0 mb-2 opacity-50">
                    <div className="font-weight-bold text-tiny">
                      Live Poker Studio™ uses cookies and data to<br />
                    </div>
                    <div className="text-tiny">
                      <strong className="font-weight-bold">1</strong> Deliver and maintain services, like tracking outages and protecting against spam, fraud, and abuse. <strong className="font-weight-bold">2</strong> Measure audience engagement and site statistics to understand how our services are used.<br /><br />
                    </div>
                    <div className="font-weight-bold text-tiny">
                      We’ll also use cookies and data to<br />
                    </div>
                    <div className="text-tiny">
                      <strong className="font-weight-bold">1</strong> Improve the quality of our services and develop new ones. <strong className="font-weight-bold">2</strong> Deliver and measure the effectiveness of ads. <strong className="font-weight-bold">3</strong> Show personalized content, depending on your settings. <strong className="font-weight-bold">4</strong> Show personalized or generic ads, depending on your settings.<br /><br />
                    </div>
                    <div className="text-tiny mb-2">
                      Feel free to customize and review options, including controls to reject the use of cookies for personalization and information about browser-level controls to reject some or all cookies for other uses.
                    </div>
                  </Form.Label>

                  <hr className="border-light m-0 pt-2 pb-2" />

                  <Form.Label className="mt-0 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>User Data</span>
                  </Form.Label>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionH1}
                          disabled={false}
                          onChange={e => this.props.change('optionH1', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Device Fingerprinting</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionH2}
                          disabled={false}
                          onChange={e => this.props.change('optionH2', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Collect data about your activity</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionH3}
                          disabled={false}
                          onChange={e => this.props.change('optionH3', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Collect geolocation data</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionH4}
                          disabled={false}
                          onChange={e => this.props.change('optionH4', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Audience-based advertising</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Label className="mt-3 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                    <span style={{ alignSelf: "center", }}>Submit Your Screenshot</span>
                  </Form.Label>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionH5}
                          onChange={e => this.props.change('optionH5', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Device Information</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-1">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionH6}
                          onChange={e => this.props.change('optionH6', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Device Fingerprint</Form.Label>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div>
                      <label className="switcher switcher-sm">
                        <input
                          type="checkbox"
                          className="switcher-input"
                          checked={this.props.settings.optionH7}
                          onChange={e => this.props.change('optionH7', e.target.checked)} />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                      </label>
                      <Form.Label className="mb-1">Geolocation Data</Form.Label>
                    </div>
                  </Form.Group>

                  <hr className="border-light m-0 pt-2 pb-2" />

                  <div className="text-left text-left text-white opacity-50 text-tiny mt-0 mb-3">
                    Some <a href="#d" onClick={this.prevent}>account and system information</a> may be sent to Live Poker Studio™. We will use it to fix problems and improve our services, subject to our <a href="#d" target="_blank" onClick={this.prevent}>Privacy Policy</a> and <a href="#d" target="_blank" onClick={this.prevent}>Terms of Service</a>. We may email you for more information or updates. Go to <a href="#d" target="_blank" onClick={this.prevent}>Legal Help</a> to ask for content changes for legal reasons.
                  </div>

                </Card.Body>
              </div>
            </Collapse>
          </Card>

          <hr className="border-light m-0 pt-2 pb-2" />

          <Button
            variant="instagram"
            block
            onClick={this.props.close}
            className="font-weight-bold small">
            Continue
          </Button>
        </Modal.Body>
        {/* / Settings Modal */}
      </>
    )
  }
}

export default Settings
