import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import '../vendor/libs/spinkit/spinkit.scss'

class CuiSpinkit extends Component {
  render() {
    return (
      <div className="ui-block">
        <h3 className="ui-block-heading">SpinKit</h3>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/tobiasahlin/SpinKit" className="ui-block-description">https://github.com/tobiasahlin/SpinKit</a>

        <h4 className="ui-block-heading">Examples</h4>

        <div className="cui-example cui-example-vertical-spacing">
          <Row>
            <Col className="py-4">
              <div className="sk-plane sk-primary"></div>
            </Col>
            <Col className="py-4">
              <div className="sk-chase sk-primary">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
              </div>
            </Col>
            <Col className="py-4">
              <div className="sk-bounce sk-primary">
                <div className="sk-bounce-dot"></div>
                <div className="sk-bounce-dot"></div>
              </div>
            </Col>
            <Col className="py-4">
              <div className="sk-wave sk-primary">
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="py-4">
              <div className="sk-pulse sk-primary"></div>
            </Col>
            <Col className="py-4">
              <div className="sk-swing sk-primary">
                <div className="sk-swing-dot"></div>
                <div className="sk-swing-dot"></div>
              </div>
            </Col>
            <Col className="py-4">
              <div className="sk-circle sk-primary">
                <div className="sk-circle-dot"></div>
                <div className="sk-circle-dot"></div>
                <div className="sk-circle-dot"></div>
                <div className="sk-circle-dot"></div>
                <div className="sk-circle-dot"></div>
                <div className="sk-circle-dot"></div>
                <div className="sk-circle-dot"></div>
                <div className="sk-circle-dot"></div>
                <div className="sk-circle-dot"></div>
                <div className="sk-circle-dot"></div>
                <div className="sk-circle-dot"></div>
                <div className="sk-circle-dot"></div>
              </div>
            </Col>
            <Col className="py-4">
              <div className="sk-circle-fade sk-primary">
                <div className="sk-circle-fade-dot"></div>
                <div className="sk-circle-fade-dot"></div>
                <div className="sk-circle-fade-dot"></div>
                <div className="sk-circle-fade-dot"></div>
                <div className="sk-circle-fade-dot"></div>
                <div className="sk-circle-fade-dot"></div>
                <div className="sk-circle-fade-dot"></div>
                <div className="sk-circle-fade-dot"></div>
                <div className="sk-circle-fade-dot"></div>
                <div className="sk-circle-fade-dot"></div>
                <div className="sk-circle-fade-dot"></div>
                <div className="sk-circle-fade-dot"></div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="py-4">
              <div className="sk-grid sk-primary">
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
              </div>
            </Col>
            <Col className="py-4">
              <div className="sk-fold sk-primary">
                <div className="sk-fold-cube"></div>
                <div className="sk-fold-cube"></div>
                <div className="sk-fold-cube"></div>
                <div className="sk-fold-cube"></div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default CuiSpinkit
