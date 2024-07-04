import React, { Component } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import CardsPanel from './CardsPanel'
import ControllerSettings from './ControllerSettings'
import GameActions from './GameActions'

class StatusBar extends Component {

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Status Bar Content */}

        {false && (
          <Card className="bg-transparent border-0 shadow-none live-d-lg-none status-bar-opacity-animation-up">
            <Row
              className=""
              style={{
                backgroundColor: "rgba(0,0,0,0.25)",
                borderRadius: "24px 24px 0px 0px",
              }}>
              <Col className="py-0 text-left pl-4 d-flex align-items-center justify-content-start">
                <span className="status-bar-layout-s1">

                  {/* Cards Panel */}
                  <CardsPanel
                    {...this.props}
                    {...this.state}
                    exit={this.props.exit} />
                  {/* / Cards Panel */}

                </span>
              </Col>

              <Col className="py-0 text-right pr-4 d-flex align-items-center justify-content-end">
                <span className="status-bar-layout-s2">

                  {/* Game Actions Panel */}
                  <GameActions
                    {...this.props}
                    {...this.state}
                    size="sm"
                    color="light"
                    rounded={true}
                    change={this.props.change}
                    resetAuto={this.props.resetAuto} />
                  {/* / Game Actions Panel */}

                </span>
              </Col>
            </Row>
          </Card>
        )}

        {/* Layout K1/0 K2/0 */}
        {true && this.props.settings.optionK1 === 0 && this.props.settings.optionK2 === 0 && (
          <Card className="bg-transparent border-0 shadow-none live-d-lg-none status-bar-opacity-animation-up">
            <Row
              className={`status-bar-opacity-animation-up ${this.props.settings.optionK3
                ? 'action-panel-parent-s1'
                : 'action-panel-parent-s2'}`}
              style={{
                backgroundColor: "rgba(0,0,0,0.0)",
                borderRadius: "24px 24px 0px 0px",
              }}>
              <Col className="py-0 text-left pl-4 d-flex align-items-center justify-content-start">
                <span
                  className={`status-bar-layout-s3-${this.props.settings.optionK4}`}>

                  {/* Cards Panel */}
                  <CardsPanel
                    {...this.props}
                    {...this.state}
                    exit={this.props.exit} />
                  {/* / Cards Panel */}

                  {/* Game Actions Panel */}
                  <GameActions
                    {...this.props}
                    {...this.state}
                    size="sm"
                    color="light"
                    rounded={true}
                    change={this.props.change}
                    resetAuto={this.props.resetAuto} />
                  {/* / Game Actions Panel */}

                </span>
              </Col>
            </Row>

            <div
              className="p-0 pb-2 pr-2"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}>

              {/* Game Pad Controller Settings */}
              <ControllerSettings
                {...this.props} {...this.state}
                change={this.props.change} />
              {/* / Game Pad Controller Settings */}

            </div>
          </Card>
        )}
        {/* / Layout K1/0 K2/0 */}

        {/* Layout K1/1 K2/0|1 */}
        {true && this.props.settings.optionK1 === 1 && (
          <Card className="bg-transparent border-0 shadow-none live-d-lg-none status-bar-opacity-animation-up">
            <Row
              className={`status-bar-opacity-animation-up ${this.props.settings.optionK3
                ? 'action-panel-parent-s1'
                : 'action-panel-parent-s2'}`}
              style={{
                backgroundColor: "rgba(0,0,0,0.0)",
                borderRadius: "24px 24px 0px 0px",
              }}>
              <Col className="py-0 text-center pr-4 d-flex align-items-center justify-content-center">
                <span
                  className={`status-bar-layout-s3-${this.props.settings.optionK4}`}
                  style={{ transformOrigin: "center bottom", }}>

                  {/* Cards Panel */}
                  <CardsPanel
                    {...this.props}
                    {...this.state}
                    exit={this.props.exit} />
                  {/* / Cards Panel */}

                  {/* Game Actions Panel */}
                  <GameActions
                    {...this.props}
                    {...this.state}
                    size="sm"
                    color="light"
                    rounded={true}
                    change={this.props.change}
                    resetAuto={this.props.resetAuto} />
                  {/* / Game Actions Panel */}

                </span>
              </Col>
            </Row>

            <div
              className="p-0 pb-2 pl-2"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
              }}>

              {/* Game Pad Controller Settings */}
              <ControllerSettings
                {...this.props} {...this.state}
                change={this.props.change} />
              {/* / Game Pad Controller Settings */}

            </div>
          </Card>
        )}
        {/* / Layout K1/1 K2/0|1 */}

        {/* Layout K1/2 K2/0 */}
        {true && this.props.settings.optionK1 === 2 && this.props.settings.optionK2 === 0 && (
          <Card className="bg-transparent border-0 shadow-none live-d-lg-none status-bar-opacity-animation-up">
            <Row
              className={`status-bar-opacity-animation-up ${this.props.settings.optionK3
                ? 'action-panel-parent-s1'
                : 'action-panel-parent-s2'}`}
              style={{
                backgroundColor: "rgba(0,0,0,0.0)",
                borderRadius: "24px 24px 0px 0px",
              }}>
              <Col className="py-0 text-right pr-4 d-flex align-items-center justify-content-end">
                <span
                  className={`status-bar-layout-s3-${this.props.settings.optionK4}`}
                  style={{ transformOrigin: "right bottom", }}>

                  {/* Cards Panel */}
                  <CardsPanel
                    {...this.props}
                    {...this.state}
                    exit={this.props.exit} />
                  {/* / Cards Panel */}

                  {/* Game Actions Panel */}
                  <GameActions
                    {...this.props}
                    {...this.state}
                    size="sm"
                    color="light"
                    rounded={true}
                    change={this.props.change}
                    resetAuto={this.props.resetAuto} />
                  {/* / Game Actions Panel */}

                </span>
              </Col>
            </Row>

            <div
              className="p-0 pb-2 pl-2"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
              }}>

              {/* Game Pad Controller Settings */}
              <ControllerSettings
                {...this.props} {...this.state}
                change={this.props.change} />
              {/* / Game Pad Controller Settings */}

            </div>
          </Card>
        )}
        {/* / Layout K1/2 K2/0 */}

        {/* Layout K1/0 K2/1 */}
        {true && this.props.settings.optionK1 === 0 && this.props.settings.optionK2 === 1 && (
          <Card className="bg-transparent border-0 shadow-none live-d-lg-none status-bar-opacity-animation-up">
            <Row
              className={`status-bar-opacity-animation-up ${this.props.settings.optionK3
                ? 'action-panel-parent-s1'
                : 'action-panel-parent-s2'}`}
              style={{
                backgroundColor: "rgba(0,0,0,0.0)",
                borderRadius: "24px 24px 0px 0px",
              }}>
              <Col className="py-0 text-left pl-4 d-flex align-items-center justify-content-start">
                <span
                  className={`status-bar-layout-s3-${this.props.settings.optionK4}`}
                  style={{ transformOrigin: "left bottom", width: "initial", }}>

                  {/* Cards Panel */}
                  <CardsPanel
                    {...this.props}
                    {...this.state}
                    exit={this.props.exit} />
                  {/* / Cards Panel */}

                </span>
              </Col>

              <Col className="py-0 text-right pr-4 d-flex align-items-center justify-content-end">
                <span
                  className={`status-bar-layout-s3-${this.props.settings.optionK4}`}
                  style={{ transformOrigin: "right bottom", width: "initial", }}>

                  {/* Game Actions Panel */}
                  <GameActions
                    {...this.props}
                    {...this.state}
                    size="sm"
                    color="light"
                    rounded={true}
                    change={this.props.change}
                    resetAuto={this.props.resetAuto} />
                  {/* / Game Actions Panel */}

                </span>
              </Col>
            </Row>

            <div
              className="p-0 pb-2 pr-2"
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
              }}>

              {/* Game Pad Controller Settings */}
              <ControllerSettings
                {...this.props} {...this.state}
                change={this.props.change} />
              {/* / Game Pad Controller Settings */}

            </div>
          </Card>
        )}
        {/* / Layout K1/0 K2/1 */}

        {/* Layout K1/2 K2/1 */}
        {true && this.props.settings.optionK1 === 2 && this.props.settings.optionK2 === 1 && (
          <Card className="bg-transparent border-0 shadow-none live-d-lg-none status-bar-opacity-animation-up">
            <Row
              className={`status-bar-opacity-animation-up ${this.props.settings.optionK3
                ? 'action-panel-parent-s1'
                : 'action-panel-parent-s2'}`}
              style={{
                backgroundColor: "rgba(0,0,0,0.0)",
                borderRadius: "24px 24px 0px 0px",
              }}>
              <Col className="py-0 text-left pl-4 d-flex align-items-center justify-content-start">
                <span
                  className={`status-bar-layout-s3-${this.props.settings.optionK4}`}
                  style={{ transformOrigin: "left bottom", width: "initial", }}>

                  {/* Game Actions Panel */}
                  <GameActions
                    {...this.props}
                    {...this.state}
                    size="sm"
                    color="light"
                    rounded={true}
                    change={this.props.change}
                    resetAuto={this.props.resetAuto} />
                  {/* / Game Actions Panel */}

                </span>
              </Col>

              <Col className="py-0 text-right pr-4 d-flex align-items-center justify-content-end">
                <span
                  className={`status-bar-layout-s3-${this.props.settings.optionK4}`}
                  style={{ transformOrigin: "right bottom", width: "initial", }}>

                  {/* Cards Panel */}
                  <CardsPanel
                    {...this.props}
                    {...this.state}
                    exit={this.props.exit} />
                  {/* / Cards Panel */}

                </span>
              </Col>
            </Row>

            <div
              className="p-0 pb-2 pr-2"
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
              }}>

              {/* Game Pad Controller Settings */}
              <ControllerSettings
                {...this.props} {...this.state}
                change={this.props.change} />
              {/* / Game Pad Controller Settings */}

            </div>
          </Card>
        )}
        {/* / Layout K1/2 K2/1 */}

        {/* / Status Bar Content */}
      </>
    )
  }
}

export default StatusBar