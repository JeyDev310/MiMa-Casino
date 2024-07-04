import React, { Component } from 'react'
import { Button, Card, Col, Collapse, Media, Modal, Row } from 'react-bootstrap'

import moment from 'moment'
import FileSaver from 'file-saver'
import PerfectScrollbar from 'react-perfect-scrollbar'
import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/libs/react-perfect-scrollbar/react-perfect-scrollbar.scss'

class BetHistory extends Component {

  constructor(props) {
    super(props)

    this.downloadBetHistoryJSON = this.downloadBetHistoryJSON.bind(this)
    this.downloadBetHistoryItemJSON = this.downloadBetHistoryItemJSON.bind(this)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    if (
      this.props.game.data &&
      this.props.game.profile &&
      this.props.game.report.length > 0
    ) {
      this.setState({
        init: true,
      })
    } else {
      this.setState({
        init: false,
      })
    }
  }

  downloadBetHistoryJSON() {
    if (this.props.game.report.length > 0) {
      var blob = new Blob([JSON.stringify(this.props.game.report)], { type: "application/json", })
      FileSaver.saveAs(blob, `bethistory-${this.props.game.profile.username}-${moment().valueOf()}.json`)
    }
  }

  downloadBetHistoryItemJSON(item) {
    if (item) {
      var blob = new Blob([JSON.stringify(item)], { type: "application/json", })
      FileSaver.saveAs(blob, `bethistory-${item.id}-${this.props.game.profile.username}-${moment().valueOf()}.json`)
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>

        {this.state.init
          ? <>
            {/* Bet History Modal */}
            <Modal.Body style={{ margin: "0" }}>
              <h4 className="text-left mb-4 font-weight-bold">
                Bet History
              </h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                Get a comprehensive overview of all the games you have played in this session so far. Please note that all reports are also available for download.
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              <div className="pb-2">
                {this.props.game.report
                  .slice(-10)
                  .map((item, index) =>

                    <Card key={index} className="mb-2 bg-light">
                      <Card.Header>
                        <span className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                          onClick={e => this.props.change(e, 'betHistoryTab', index)}
                          aria-expanded={this.props.betHistoryTab === index}>
                          <img
                            src={`${process.env.PUBLIC_URL}/img/section/live/game/history-panel-logo-2.png`}
                            className="mr-3" alt="Logo" width="24" />

                          <span className="w-100 align-items-center">
                            <div className="d-flex justify-content-between mb-0">
                              <div className="h5 font-weight-bold mb-0 custom-drop-shadow-1">Bet History</div>
                              <div className="font-weight-bold small mb-0">{item.created_at}</div>
                            </div>
                          </span>
                        </span>
                      </Card.Header>

                      <Collapse in={this.props.betHistoryTab === index}>
                        <div>
                          <Card.Body className="d-flex justify-content-between align-items-center px-3 py-4" style={{
                            alignItems: "center",
                            backgroundColor: "rgba(37, 40, 46, 0.4)",
                          }}>
                            <div className="px-2">
                              <div className="opacity-75 font-weight-bold">GAME REVIEW</div>
                            </div>
                          </Card.Body>

                          <PerfectScrollbar
                            options={{
                              suppressScrollX: true,
                              wheelPropagation: true,
                            }}
                            className="chat-messages"
                            style={{
                              height: "200px",
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                            }}>
                            {item.content
                              .map((line, idx) =>
                                <span
                                  key={idx}
                                  className={`d-flex list-group-item list-group-item-action online border-0 py-1 px-4`}
                                  style={{
                                    alignItems: "center",
                                    backgroundColor: `${idx % 2 ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.2)"}`,
                                  }}>
                                  <Media.Body className="ml-0">
                                    <span className="text-medium font-weight-bold h5 small mb-0">
                                      {line}&nbsp;&nbsp;
                                    </span>
                                  </Media.Body>
                                </span>
                              )
                            }
                          </PerfectScrollbar>

                          <Card.Footer className="text-left py-2 d-flex justify-content-between">
                            <div className="text-muted text-tiny font-weight-bold d-flex align-items-center">{item.created_at}</div>
                            <div className="text-muted small">
                              <Button
                                size="sm"
                                variant="light rounded-pill"
                                className="font-weight-bold"
                                onClick={() => { this.downloadBetHistoryItemJSON(item) }}>
                                Download Report
                              </Button>
                            </div>
                          </Card.Footer>
                        </div>
                      </Collapse>
                    </Card>

                  ).reverse()
                }
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              <Button
                variant="instagram" block
                onClick={this.props.close}
                className="font-weight-bold">
                Continue
              </Button>

              {this.state.init && (
                <Button
                  variant="default" block
                  onClick={this.downloadBetHistoryJSON}
                  className="font-weight-bold">
                  Download Complete History
                </Button>
              )}

            </Modal.Body>
            {/* / Bet History Modal */}
          </>
          : <>
            {/* Bet History Modal */}
            <Modal.Body style={{ margin: "0" }}>
              <h4 className="text-left mb-4 font-weight-bold">
                Bet History
              </h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                Get a comprehensive overview of all the games you have played in this session so far. Please note that all reports are also available for download.
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              <Card className="d-flex w-100 my-2 bg-transparent border-0 shadow-none">
                <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                  <Col
                    sm={12} md={12} lg={12}
                    className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                    <ResourceLoaderB
                      height="4rem" width="4rem" />
                  </Col>
                </Row>
              </Card>

              <div className="text-center text-white opacity-100 mb-3 small font-weight-bold">
                History data currently not available...
              </div>

              <div className="text-left text-left text-white opacity-50 text-tiny mb-3">
                Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
              </div>

              <hr className="border-light m-0 py-2" />

              <Button
                variant="instagram" block
                onClick={this.props.close}
                className="font-weight-bold">
                Continue
              </Button>
            </Modal.Body>
            {/* / Bet History Modal */}
          </>
        }
      </>
    )
  }
}

export default BetHistory