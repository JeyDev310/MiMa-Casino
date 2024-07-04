import React, { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import '../../vendor/libs/spinkit/spinkit.scss'

class Spinkit extends Component {
  constructor(props) {
    super(props)
    props.setTitle('SpinKit - Miscellaneous')
  }

  render() {
    return (
      <div>
        <h4 className="font-weight-bold py-3 mb-4">
          <span className="text-muted font-weight-light">Miscellaneous /</span> SpinKit
        </h4>

        <hr className="container-m-nx border-light mt-0 mb-4" />

        <Card>
          <Card.Body className="demo-vertical-spacing p-5">
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

          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Spinkit
