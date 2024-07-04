import React, { Component } from 'react'
import { Button, Card, Col, Form, Modal, Row, Tab, Tabs } from 'react-bootstrap'

import API from '../../../../../api'

import moment from 'moment'
import Select from 'react-select'
import FileSaver from 'file-saver'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/libs/react-select/react-select.scss'

class LiveScreenshot extends Component {

  constructor(props) {
    super(props)

    this.fetchTimeout = 0

    this.onHandleSubmitData = this.onHandleSubmitData.bind(this)
    this.downloadScreenshotAsPng = this.downloadScreenshotAsPng.bind(this)

    this.state = {
      init: false,
      isFetching: false,
      message: '',
    }

    this.selectOptions1 = [
      { id: 0, value: '0', label: 'Gameplay related problem or bug', isDisabled: false, },
      { id: 1, value: '1', label: 'UI related problem or bug', isDisabled: false, },
      { id: 2, value: '2', label: 'Gameplay related miscalculation of winnings', isDisabled: false, },
      { id: 3, value: '3', label: 'General problem or software error', isDisabled: false, },
      { id: 4, value: '4', label: 'Human error', isDisabled: false, },
      { id: 5, value: '5', label: 'Miscalculation: player balance is wrong', isDisabled: false, },
      { id: 6, value: '6', label: 'Video stream playback difficulties', isDisabled: false, },
      { id: 7, value: '7', label: 'Another type of error', isDisabled: false, },
      { id: 8, value: '8', label: 'Other comments or remarks', isDisabled: false, },
    ]
  }

  componentWillUnmount() {
    clearTimeout(this.fetchTimeout)
  }

  downloadScreenshotAsPng() {
    try {
      if (this.props.screenshot && this.props.game.data.id) {
        FileSaver.saveAs(
          this.props.screenshot,
          `livepokerstudio-screenshot-${this.props.game.data.id}-${moment().valueOf()}.png`,
        )
      }
    } catch { }
  }

  onHandleSubmitData() {
    this.setState({
      isFetching: true,
    }, () => {
      new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.append('message', String(this.state.message))
        fd.append('screenshot', String(this.props.screenshot))
        API.post(
          `session/screenshot/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
        }).then(res => {
          this.fetchTimeout = setTimeout(() => {
            this.props.close()
          }, 1000)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Live Poker Screenshot Modal */}

        <Modal.Body style={{
          borderRadius: "15px",
          backgroundColor: "rgba(37, 40, 46, 0.7)",
        }}>
          <h1 className="text-center display-4 font-weight-bold">Take A Screenshot</h1>

          <div className="text-center text-white opacity-75 mb-3 small">
            If you're getting an error message or seeing an issue while using our software, get in touch with us. Sending a screenshot to our Support Team may help us resolve the issue. You can forward the screenshot to us via our software, mobile app, or website.
          </div>

          {!this.state.isFetching
            ? <>
              <div className="nav-tabs-top p-0 mb-3">
                <Tabs defaultActiveKey="screenshot">
                  <Tab eventKey="screenshot" title="Screenshot">
                    <Card className="mb-0 bg-transparent border-0 p-3">
                      <div className="w-100">
                        <span className="text-body text-big font-weight-semibold img-thumbnail">
                          <span className="img-thumbnail-overlay bg-dark opacity-25" style={{ borderRadius: "10px", }}></span>
                          <span className="img-thumbnail-content text-white text-xlarge" style={{ borderRadius: "10px !important", }}>
                            <Button
                              variant="default rounded-pill"
                              size="md"
                              className="my-2 game-card-button-scale-transform-animation"
                              onClick={this.downloadScreenshotAsPng}>
                              <span className="ion ion-md-download mr-2"></span>
                              <span>
                                Download Screenshot
                              </span>
                            </Button>
                          </span>
                          <span className="card-img-top d-block ui-bg-cover" style={{
                            borderRadius: "10px",
                            backgroundImage: `url(${this.props.screenshot})`,
                            objectFit: "cover",
                            height: "360px",
                          }} />
                        </span>
                      </div>
                    </Card>
                  </Tab>
                  <Tab eventKey="annotations" title="Annotations">
                    <Card className="mb-0 bg-transparent border-0">
                      <Card.Body>
                        <Form>

                          {this.props.game.data && (
                            <Form.Group as={Row}>
                              <Form.Label column sm={2} className="text-sm-right">Reference ID</Form.Label>
                              <Col sm={10}>
                                <Form.Control type="text" placeholder={`${this.props.game.data.room_name}`} disabled={true} />
                              </Col>
                            </Form.Group>
                          )}

                          <Form.Group as={Row}>
                            <Form.Label column sm={2} className="text-sm-right">Message Type</Form.Label>
                            <Col sm={10}>
                              <Select className="react-select" classNamePrefix="react-select"
                                options={this.selectOptions1}
                                defaultValue={this.selectOptions1[0]}
                                isClearable={false}
                                isSearchable={true}
                                isDisabled={false} />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm={2} className="text-sm-right">Comments</Form.Label>
                            <Col sm={10}>
                              <Form.Control
                                as="textarea"
                                placeholder="Please include your comments and descriptions here ..."
                                type="text"
                                maxLength={256}
                                value={this.state.message}
                                disabled={false}
                                onChange={(e) => { this.setState({ message: e.target.value, }) }} />
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm={2} className="text-sm-right pt-0">Data Protection</Form.Label>
                            <Col sm={10}>
                              <Form.Check custom type="checkbox" name="form-data-protection-checkbox-1" id="form-data-protection-checkbox-id-1"
                                label="Inclusion of device and user-specific interaction data" />
                            </Col>
                          </Form.Group>

                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
            </>
            : <>
              <Card className="mb-0 bg-transparent border-0 shadow-none">
                <div className="w-100">
                  <form>
                    <div className="d-flex justify-content-center align-items-center my-2">
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 24 24" fill="none">
                          <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                          <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="white" />
                        </svg>
                      </span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <p className="text-white text-large text-center font-weight-bold mb-3 display-1">Thanks for sharing!</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-2">
                      <Button
                        block
                        className="font-weight-bold"
                        size="md"
                        variant="instagram rounded-pill"
                        onClick={this.props.close}>
                        Continue
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </>}

          {!this.state.isFetching && (
            <>
              <Button variant="instagram" block onClick={this.onHandleSubmitData} className="font-weight-bold h5 mb-0">Submit Screenshot</Button>
              <Button variant="default" block onClick={this.props.close} className="font-weight-bold h5 mb-0">Cancel</Button>
            </>
          )}

        </Modal.Body>

        {/* / Live Poker Screenshot Modal */}
      </>
    )
  }
}

export default LiveScreenshot