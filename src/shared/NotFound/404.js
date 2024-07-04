import React, { Component } from 'react'
import { Card, Media, ProgressBar } from 'react-bootstrap'

import '../../vendor/styles/pages/chat.scss'
import '../../vendor/styles/pages/authentication.scss'

class NotFound extends Component {

  constructor(props) {
    super(props)

    this.onHandleReturnToLogin = this.onHandleReturnToLogin.bind(this)

    this.state = {
      init: false,
      username: null,
      email: null,
    }
  }

  componentDidMount() {
    try {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
        email: JSON.parse(localStorage.getItem('user')).user.email,
      })
    } catch {
      this.props.history.push("/")
    }
  }

  onHandleReturnToLogin() {
    this.props.history.push('/')
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Not Found */}
        <>
          <div
            className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }}>
            <div className="ui-bg-overlay opacity-100"></div>
            <div className="authentication-inner py-2 auth-loader-layout-s1">
              <Card style={{
                backgroundColor: "rgb(0,0,0,0.6)",
                border: "0px",
                borderRadius: "10px 10px 0px 0px",
                filter: "drop-shadow(0px 0px 10px rgb(0, 0, 0))",
              }}>
                <Card.Body className="px-5 pt-5 pb-4 mb-2">
                  <div className="d-flex justify-content-start align-items-center mb-4">
                    <div className="ui-w-100">
                      <div className="w-100 position-relative" style={{ paddingBottom: '10%', }}>
                        <img
                          src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                          alt="Live Poker Studio™" className="d-block ui-w-100"
                        />
                      </div>
                    </div>
                  </div>

                  <Media className="align-items-center text-left">
                    <Media.Body>
                      <div className="text-light text-tiny font-weight-semibold line-height-1 mb-1">
                        ERROR 404
                      </div>
                      <div className="text-large font-weight-bolder line-height-1">
                        Page Not Found
                      </div>
                    </Media.Body>
                  </Media>

                  <hr className="my-4" />

                  <div className="d-flex align-items-center justify-content-center pt-2 mb-5">
                    <img
                      src={`${process.env.PUBLIC_URL}/img/section/live/empty/server-error-512-1.png`}
                      alt="Live Poker Studio™" className="d-block" style={{ width: "220px", }}
                    />
                  </div>

                  <form>
                    <div className="d-flex justify-content-center align-items-center">
                      <p className="text-white text-center font-weight-bold mb-2">
                        Page Not Found
                      </p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <p className="text-white text-center font-weight-semibold small mb-0 opacity-50">
                        ERROR 404
                      </p>
                    </div>
                  </form>
                </Card.Body>
              </Card>

              <ProgressBar
                variant={"error"}
                now={100}
                animated={false}
                style={{
                  height: "10px",
                  borderTopLeftRadius: "0px",
                  borderTopRightRadius: "0px",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  backgroundColor: "rgb(0,0,0,0.6)",
                }} />
            </div>
          </div>

          <nav
            className="footer bg-transparent"
            style={{
              position: "fixed",
              left: "50%",
              bottom: "0px",
              transform: "translate(-50%, -50%)",
              margin: "0 0 0 0px !important",
              padding: "0 0 0 0px !important",
            }}>
            <div className="container text-center">
              <div className="pt-3">
                <span className="footer-text text-body text-tiny font-weight-bold opacity-25">
                  © {new Date().getFullYear()} Live Poker Studio™. All Rights Reserved.
                </span>
              </div>
            </div>
          </nav>
        </>
        {/* / Not Found */}
      </>
    )
  }
}

export default NotFound