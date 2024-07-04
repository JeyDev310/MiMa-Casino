import React, { Component } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'

import moment from 'moment'

import {
  ERROR_GAME_RESET,
  ERROR_SHOWDOWN_FAILURE,
} from '../../core/ErrorTypes'

import '../../../../../vendor/styles/pages/chat.scss'

class ErrorHandler extends Component {

  constructor(props) {
    super(props)

    this.errorTimeout = 0

    this.onHandleErrorDatetime = this.onHandleErrorDatetime.bind(this)
    this.onHandleChangeKeepOpen = this.onHandleChangeKeepOpen.bind(this)

    this.onHandleRenderErrorContent = this.onHandleRenderErrorContent.bind(this)
    this.onHandleRenderDefaultError = this.onHandleRenderDefaultError.bind(this)
    this.onHandleRenderGameReset = this.onHandleRenderGameReset.bind(this)
    this.onHandleRenderShowdownFailure = this.onHandleRenderShowdownFailure.bind(this)

    this.state = {
      init: false,
      keep: false,
    }
  }

  componentDidMount() {
    if (this.props.game.error) {
      this.setState({
        init: true,
      }, () => {
        if (this.props.settings.optionF3) {
          this.errorTimeout = setTimeout(() => {
            this.props.close()
          }, 5000)
        }
      })
    } else {
      this.setState({
        init: false,
      })
    }

    const element = document.getElementsByClassName('modal-content')[0]
    element.style['border-radius'] = "15px"
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.error !== this.props.game.error) {
      if (this.props.game.error) {
        this.setState({
          init: true,
        }, () => {
          if (this.props.settings.optionF3) {
            this.errorTimeout = setTimeout(() => {
              this.props.close()
            }, 5000)
          }
        })
      } else {
        this.setState({
          init: false,
        })
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.errorTimeout)
  }

  onHandleChangeKeepOpen(e) {
    this.setState({
      keep: e.target.checked,
    }, () => {
      if (this.state.keep) {
        clearTimeout(this.errorTimeout)
      } else {
        if (this.props.settings.optionF3) {
          this.errorTimeout = setTimeout(() => {
            this.props.close()
          }, 5000)
        }
      }
    })
  }

  onHandleErrorDatetime() {
    return String(`${moment().format('DD.MM.YYYY HH:mm:ss')}`)
  }

  onHandleRenderErrorContent() {
    if (this.props.game.error) {
      switch (this.props.game.error.message) {
        case ERROR_GAME_RESET:
          return this.onHandleRenderGameReset()
        case ERROR_SHOWDOWN_FAILURE:
          return this.onHandleRenderShowdownFailure()
        default:
          return this.onHandleRenderDefaultError()
      }
    }
  }

  onHandleRenderDefaultError() {
    return (
      <>
        <h3 className="text-center font-weight-bold">
          System Failure
        </h3>

        <hr className="border-light m-0 py-2" />

        <Card className="mb-0 bg-transparent border-0 shadow-none">
          <div className="w-100">
            <form>
              <div className="d-flex justify-content-center align-items-center my-2">
                <span className="svg-icon svg-icon-muted svg-icon-2hx bg-player-panel-item-opacity-drop card-item-drop-shadow-filter cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10rem" height="10rem" viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                    <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                    <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                  </svg>
                </span>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                  Something went wrong...
                </p>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <p className="text-white text-center mb-3 h6 font-weight-normal small opacity-50 w-75">
                  An error occurred during gameplay. The game and player scores have been reset. We sincerely apologize. If you have any questions or need help, please contact Customer Support.
                </p>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-2">
                <Button
                  block
                  size="md"
                  variant="instagram rounded-pill"
                  className="font-weight-bold"
                  onClick={this.props.close}>
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </>
    )
  }

  onHandleRenderGameReset() {
    return (
      <>
        <h3 className="text-center font-weight-bold">
          Game Reset
        </h3>

        <hr className="border-light m-0 py-2" />

        <Card className="mb-0 bg-transparent border-0 shadow-none">
          <div className="w-100">
            <form>
              <div className="d-flex justify-content-center align-items-center my-2">
                <span className="svg-icon svg-icon-muted svg-icon-2hx bg-player-panel-item-opacity-drop card-item-drop-shadow-filter cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10rem" height="10rem" viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                    <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                    <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                  </svg>
                </span>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                  Game has been reset
                </p>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <p className="text-white text-center mb-3 h6 font-weight-normal small opacity-50 w-75">
                  The game and player scores have been reset. We sincerely apologize. If you have any questions or need help, please contact Customer Support.
                </p>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-2">
                <Button
                  block
                  size="md"
                  variant="instagram rounded-pill"
                  className="font-weight-bold"
                  onClick={this.props.close}>
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </>
    )
  }

  onHandleRenderShowdownFailure() {
    return (
      <>
        <h3 className="text-center font-weight-bold">
          Showdown Failure
        </h3>

        <hr className="border-light m-0 py-2" />

        <Card className="mb-0 bg-transparent border-0 shadow-none">
          <div className="w-100">
            <form>
              <div className="d-flex justify-content-center align-items-center my-2">
                <span className="svg-icon svg-icon-muted svg-icon-2hx bg-player-panel-item-opacity-drop card-item-drop-shadow-filter cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10rem" height="10rem" viewBox="0 0 24 24" fill="none">
                    <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                    <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                    <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                  </svg>
                </span>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                  Game Evaluation Error
                </p>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <p className="text-white text-center mb-3 h6 font-weight-normal small opacity-50 w-75">
                  An error occurred during game evaluation. The game and player scores have been reset. We sincerely apologize. If you have any questions or need help, please contact Customer Support.
                </p>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-2">
                <Button
                  block
                  size="md"
                  variant="instagram rounded-pill"
                  className="font-weight-bold"
                  onClick={this.props.close}>
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </>
    )
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Live Poker Error Modal */}

        {this.state.init
          ? <Modal.Body style={{
            borderRadius: "15px",
            backgroundColor: "rgba(37, 40, 46, 0.7)",
          }}>

            {this.onHandleRenderErrorContent()}

            <div className="text-white opacity-50 small font-weight-bold mt-3 mb-0 d-flex justify-content-between">
              <span className="d-flex align-items-center">
                {this.onHandleErrorDatetime()}
              </span>
              <span>
                <div className="d-flex align-items-center">
                  <Form.Label className="mb-0">
                    <span>Keep Open</span>
                  </Form.Label>
                  <label className="switcher switcher-sm ml-2 mr-0">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.state.keep}
                      disabled={false}
                      onChange={(e) => { this.onHandleChangeKeepOpen(e) }} />
                    <span className="switcher-indicator">
                      <span className="switcher-yes"></span>
                      <span className="switcher-no"></span>
                    </span>
                  </label>
                </div>
              </span>
            </div>

          </Modal.Body>
          : <Modal.Body style={{
            borderRadius: "15px",
            backgroundColor: "rgba(37, 40, 46, 0.7)",
          }}>

            {this.onHandleRenderDefaultError()}

            <div className="text-white opacity-50 small font-weight-bold mt-3 mb-0 d-flex justify-content-between">
              <span className="d-flex align-items-center">
                {this.onHandleErrorDatetime()}
              </span>
              <span>
                <div className="d-flex align-items-center">
                  <Form.Label className="mb-0">
                    <span>Keep Open</span>
                  </Form.Label>
                  <label className="switcher switcher-sm ml-2 mr-0">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.state.keep}
                      disabled={false}
                      onChange={(e) => { this.onHandleChangeKeepOpen(e) }} />
                    <span className="switcher-indicator">
                      <span className="switcher-yes"></span>
                      <span className="switcher-no"></span>
                    </span>
                  </label>
                </div>
              </span>
            </div>

          </Modal.Body>}

        {/* / Live Poker Error Modal */}
      </>
    )
  }
}

export default ErrorHandler