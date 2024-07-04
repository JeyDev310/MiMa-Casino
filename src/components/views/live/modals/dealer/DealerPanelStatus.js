import React, { Component } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'

import '../../../../../vendor/styles/pages/chat.scss'

class DealerPanelStatus extends Component {

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
        {/* Dealer Status Panel */}

        <Card className="d-flex w-100 mt-2 mb-3 bg-light border-0 shadow-none" style={{
          borderRadius: "15px",
        }}>
          <Row noGutters className="row-bordered">
            <Col sm={6} className="d-flex align-items-center px-4 py-2">
              <div>
                <div className="text-muted text-tiny font-weight-bold">
                  STATUS
                </div>
                <strong className="font-weight-bold">
                  <div className="text-left text-white opacity-100 mb-0 h5 font-weight-bold">
                    {this.props.status(this.props.game)}
                  </div>
                </strong>
              </div>
              <div className="w-50 ml-auto">
                <div className="text-muted text-tiny font-weight-bold">
                  CURRENT ROUND
                </div>
                <strong className="font-weight-bold">
                  <div className="text-left text-white opacity-100 mb-0 h5 font-weight-bold">
                    <Badge
                      pill variant="light"
                      className="bg-player-panel-item-opacity-drop bg-dark font-weight-bold"
                      style={{ verticalAlign: "middle", }}>
                      {this.props.translate(this.props.game.data.current_round)}
                    </Badge>
                  </div>
                </strong>
              </div>
            </Col>

            <Col sm={6} className="d-flex align-items-center px-4 py-2">
              <div className="w-100">
                <div className="text-muted text-tiny font-weight-bold">
                  CURRENT ACTION
                </div>
                <strong className="font-weight-bold">
                  <div className="text-left text-white opacity-100 mb-0 h5 font-weight-bold">
                    {this.props.action(this.props.game)}
                  </div>
                </strong>
              </div>
            </Col>
          </Row>
        </Card>

        {/* / Dealer Status Panel */}
      </>
    )
  }
}

export default DealerPanelStatus