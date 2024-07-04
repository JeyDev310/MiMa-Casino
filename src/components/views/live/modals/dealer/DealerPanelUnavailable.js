import React, { Component } from 'react'
import { Button, Card, Col, Modal, Row, Spinner } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

class DealerPanelUnavailable extends Component {

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
        {/* Live Cards Monitor Modal */}

        <Modal.Body style={{
          borderRadius: "15px",
          backgroundColor: "rgba(37, 40, 46, 0.7)",
        }}>
          <h5 className="text-center display-5 font-weight-bold">
            Live Cards Monitor
          </h5>
          <hr className="border-light m-0 py-2" />
          <Card className="d-flex w-100 mb-3 bg-transparent border-0 shadow-none" style={{
            borderRadius: "15px",
          }}>
            <Row noGutters className="h-100 border-0 bg-transparent" style={{
              justifyContent: "center",
            }}>
              <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none mb-3" style={{ justifyContent: "center", }}>
                <Spinner animation="border" variant="danger" className="d-block" style={{ height: "2rem", width: "2rem", }} />
              </Col>
              <div className={`text-center text-white opacity-100 mb-3`}>
                Live monitor currently not available...
              </div>
              <div className="text-center text-white opacity-50 text-tiny mb-0">
                Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
              </div>
            </Row>
          </Card>
          <hr className="border-light m-0 py-2" />
          <Button variant="primary" block onClick={this.props.close} className="font-weight-bold small">Accept</Button>
        </Modal.Body>

        {/* / Live Cards Monitor Modal */}
      </>
    )
  }
}

export default DealerPanelUnavailable