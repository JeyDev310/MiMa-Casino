import React, { Component } from 'react'
import { Button, Card, Col, Form, Media, Modal, Row } from 'react-bootstrap'

import API from '../../../../../api'

import QRCode from 'react-qr-code'
import moment from 'moment'
import Select from 'react-select'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/libs/react-select/react-select.scss'

class Feedback extends Component {

  constructor(props) {
    super(props)

    this.fetchTimeout = 0

    this.onHandleSubmitData = this.onHandleSubmitData.bind(this)
    this.onHandleGetUserData = this.onHandleGetUserData.bind(this)

    this.onHandleChangeMessageType = this.onHandleChangeMessageType.bind(this)
    this.onHandleChangeMessageData = this.onHandleChangeMessageData.bind(this)

    this.state = {
      init: false,
      isFetching: false,
      message: {
        type: 0,
        data: '',
      },
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

  onHandleGetUserData() {
    try {
      var user_id = JSON.parse(localStorage.getItem('user')).user.id
      var username = JSON.parse(localStorage.getItem('user')).user.username
      var email = JSON.parse(localStorage.getItem('user')).user.email
      return (String(`${user_id} / ${username} / ${email}`))
    } catch {
      return String('N/A')
    }
  }

  onHandleChangeMessageType(e) {
    this.setState({
      message: {
        ...this.state.message,
        type: e.id,
      },
    })
  }

  onHandleChangeMessageData(e) {
    this.setState({
      message: {
        ...this.state.message,
        data: e.target.value,
      },
    })
  }

  onHandleSubmitData() {
    if (this.state.message.data !== '') {
      this.setState({
        isFetching: true,
      }, () => {
        new Promise((resolve, reject) => {
          let fd = new FormData()
          fd.append('reference_id', String(this.props.game.data.room_name))
          fd.append('message_type', String(this.selectOptions1[this.state.message.type].label))
          fd.append('message_data', String(this.state.message.data))
          API.post(
            `session/feedback/`, fd, {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`,
              'content-type': 'multipart/form-data',
            },
          }).then(res => {
            this.fetchTimeout = setTimeout(() => {
              this.props.close()
            }, 2000)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      })
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Send Feedback Modal */}

        <Modal.Body style={{ margin: "0" }}>
          <h4 className="text-left mb-4 font-weight-bold">Send Feedback</h4>

          <div className="text-left text-left text-white opacity-50 small mb-3">
            Have feedback? We’d love to hear it, but please don’t share sensitive information. Have questions? Try help or support.
          </div>

          <hr className="border-light m-0 pt-2 pb-2" />

          {!this.state.isFetching
            ? <Card className="d-flex w-100 mt-2 bg-transparent border-0 shadow-none">
              <Row className="h-100 border-0 shadow-none border-0" style={{ overflow: "visible", }}>
                <Col sm={12} md={12} lg={12} className="h-100 border-0 shadow-none border-0">
                  <Form>
                    {this.props.game.data && (
                      <Form.Group>
                        <Form.Label className="text-sm-right">Reference ID</Form.Label>
                        <Form.Control type="text" placeholder={`${this.props.game.data.room_name}`} disabled={true} />
                      </Form.Group>
                    )}

                    <Form.Group>
                      <Form.Label className="text-sm-right">Message Type</Form.Label>
                      <Select className="react-select" classNamePrefix="react-select"
                        options={this.selectOptions1}
                        defaultValue={this.selectOptions1[this.state.message.type]}
                        isClearable={false}
                        isSearchable={true}
                        isDisabled={false}
                        value={this.selectOptions1[this.state.message.type]}
                        onChange={(e) => { this.onHandleChangeMessageType(e) }} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="text-sm-right">Comments</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Please include your comments and descriptions here ..."
                        type="text"
                        maxLength={256}
                        value={this.state.message.data}
                        disabled={false}
                        onChange={(e) => { this.onHandleChangeMessageData(e) }} />
                    </Form.Group>
                  </Form>
                </Col>

                <Col sm={12} md={12} lg={12} className="h-100 border-0 shadow-none border-0 mt-1 mb-3">
                  <Card className="bg-light p-4" style={{ borderRadius: "10px", }}>
                    <Media className="align-items-center w-100">
                      <div className="position-relative" style={{
                        border: "6px solid white",
                      }}>
                        <QRCode
                          value={this.props.game.data.room_name}
                          size={64}
                          bgColor="rgba(255, 255, 255, 1)"
                          fgColor="rgba(0, 0, 0, 1)"
                          level="Q"
                          className="cursor-pointer" />
                      </div>

                      <Media.Body className="pl-4">
                        <span className="d-flex align-items-start cursor-pointer mb-2">
                          <h4 className="mb-0 font-weight-bold small">
                            Feedback
                          </h4>
                        </span>
                        <span className="d-flex align-items-center cursor-pointer mb-1">
                          <h5 className="mb-0 small">
                            {moment().toLocaleString('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: false,
                              timeZone: 'UTC',
                              timeZoneName: 'short',
                            })}
                          </h5>
                        </span>
                        <span className="d-flex align-items-center cursor-pointer mb-0">
                          <h5 className="mb-0 small">
                            {this.onHandleGetUserData()}
                          </h5>
                        </span>
                      </Media.Body>
                    </Media>
                  </Card>
                </Col>
              </Row>
            </Card>
            : <Card className="d-flex w-100 my-2 bg-transparent border-0 shadow-none">
              <Row className="h-100 border-0 shadow-none border-0" style={{ overflow: "visible", }}>
                <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                  <div className="cursor-pointer ml-0 m-2" style={{
                    border: "6px solid white",
                  }}>
                    <QRCode
                      value={this.props.game.data.room_name}
                      size={64}
                      bgColor="rgba(255, 255, 255, 1)"
                      fgColor="rgba(0, 0, 0, 1)"
                      level="Q" />
                  </div>
                </Col>

                <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none mt-4" style={{ justifyContent: "center", }}>
                  <div className="d-flex justify-content-center align-items-center">
                    <p className="text-white text-large text-center font-weight-bold mb-3 display-1">Thanks for sharing!</p>
                  </div>
                </Col>
              </Row>
            </Card>}

          <div className="text-left text-left text-white opacity-50 text-tiny mt-0 mb-3">
            Some <a href="#d" onClick={this.prevent}>account and system information</a> may be sent to Live Poker Studio™. We will use it to fix problems and improve our services, subject to our <a href="#d" target="_blank" onClick={this.prevent}>Privacy Policy</a> and <a href="#d" target="_blank" onClick={this.prevent}>Terms of Service</a>. We may email you for more information or updates. Go to <a href="#d" target="_blank" onClick={this.prevent}>Legal Help</a> to ask for content changes for legal reasons.
          </div>

          <hr className="border-light m-0 py-2" />

          {!this.state.isFetching && <Button variant="instagram" block onClick={this.onHandleSubmitData} className="font-weight-bold">Submit Report</Button>}
          <Button variant="default" block onClick={this.props.close} className="font-weight-bold">Continue</Button>
        </Modal.Body>

        {/* / Send Feedback Modal */}
      </>
    )
  }
}

export default Feedback