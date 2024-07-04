import React, { Component } from 'react'
import { Button, Card, Media, ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ResourceLoaderN from '../utilities/loaders/ResourceLoaderN'

import '../../../vendor/styles/pages/chat.scss'
import '../../../vendor/styles/pages/authentication.scss'

class TooManyRequests extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Too Many Requests')

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
        {/* Too Many Requests */}
        <>
          <div className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" style={{
            backgroundImage: `url('${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935526-0006.jpg')`,
          }}>
            <div className="ui-bg-overlay opacity-25"></div>
            <div className="authentication-inner py-2">
              <Card style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                backgroundColor: "rgb(0,0,0,0.6)",
                border: "0px",
              }}>
                <Card.Body className="px-5 pt-5 pb-4 mb-2">
                  <div className="d-flex justify-content-start align-items-center mb-4">
                    <div className="ui-w-100">
                      <div className="w-100 position-relative" style={{ paddingBottom: '10%', }}>
                        <img
                          src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                          alt="Live Poker Studio™" className="d-block ui-w-100" />
                      </div>
                    </div>
                  </div>

                  <Media className="align-items-center text-left">
                    <Media.Body>
                      <div className="text-light text-tiny font-weight-semibold line-height-1 mb-1">
                        ERROR
                      </div>
                      <div className="text-large font-weight-bolder line-height-1">
                        Too Many Requests
                      </div>
                    </Media.Body>
                  </Media>

                  <hr className="my-4" />

                  <form>
                    <div className="d-flex justify-content-center align-items-center mt-5 mb-0">
                      <ResourceLoaderN
                        height={`8rem`} width={`8rem`} />
                    </div>
                  </form>
                </Card.Body>

                <Card.Footer className="px-sm-5 text-center text-muted small mb-1 py-4">
                  <Link to="#" onClick={this.onHandleReturnToLogin}>
                    <Button
                      block
                      variant="light"
                      className="font-weight-bold d-flex align-items-center justify-content-center">
                      <i className="fas fa-home text-danger mr-2"></i>
                      <span>Return</span>
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>

              <ProgressBar
                variant={"warning"}
                now={100}
                animated={true}
                style={{
                  height: "16px",
                  borderTopLeftRadius: "0px",
                  borderTopRightRadius: "0px",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  backgroundColor: "rgb(0,0,0,0.6)",
                }} />

            </div>
          </div>

          <nav className="footer bg-transparent" style={{
            position: "fixed",
            left: "50%",
            bottom: "0px",
            transform: "translate(-50%, -50%)",
            margin: "0 0 0 0px !important",
            padding: "0 0 0 0px !important",
          }}>
            <div className="container text-center">
              <div className="pt-3">
                <span className="footer-text text-body text-tiny font-weight-bold">
                  © {new Date().getFullYear()} Live Poker Studio™. All Rights Reserved.
                </span>
              </div>
            </div>
          </nav>
        </>
        {/* / Too Many Requests */}
      </>
    )
  }
}

export default TooManyRequests
