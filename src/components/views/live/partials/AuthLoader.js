import React, { Component } from 'react'
import { Badge, Card, Media, ProgressBar } from 'react-bootstrap'

import AuthFooter from './AuthFooter'
import ResourceLoaderN from '../../utilities/loaders/ResourceLoaderN'

import {
  truncateUsername,
} from '../utilities/TextPreprocessing'

import {
  PROVIDER_TYPE_INTERNAL,
  PROVIDER_TYPE_EXTERNAL,
  PROVIDER_TYPE_EVERYMATRIX,
} from '../core/ProviderTypes'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/styles/pages/authentication.scss'

class AuthLoader extends Component {

  constructor(props) {
    super(props)

    this.timer = 0

    this.onHandleStartTimer = this.onHandleStartTimer.bind(this)
    this.onHandleStartCountdown = this.onHandleStartCountdown.bind(this)
    this.onHandleReturnToLogin = this.onHandleReturnToLogin.bind(this)

    this.state = {
      init: false,
      username: null,
      email: null,
      bank: 1750,
      milliseconds: 1750,
      percentage: 0,
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

    this.setState({
      percentage: 0,
    }, () => {
      this.onHandleStartTimer()
    })

  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onHandleStartTimer() {
    if (this.timer === 0 && this.state.milliseconds > 0) {
      this.timer = setInterval(this.onHandleStartCountdown, 500)
    }
  }

  onHandleStartCountdown() {
    let milliseconds = this.state.milliseconds - 500
    this.setState({
      milliseconds: milliseconds,
      percentage: 100 - (milliseconds / (this.state.bank) * 100),
    })
    if (milliseconds === 0) {
      clearInterval(this.timer)
    }
  }

  onHandleReturnToLogin() {
    this.props.history.push('/')
  }

  onRenderProviderId(id) {
    switch (id) {
      case PROVIDER_TYPE_INTERNAL:
        return `Core System`
      case PROVIDER_TYPE_EXTERNAL:
        return `External`
      case PROVIDER_TYPE_EVERYMATRIX:
        return `EveryMatrix`
      default:
        return `Core System`
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Auth Loader */}
        <>
          <div
            className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4"
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }}>
            <div className="ui-bg-overlay opacity-100"></div>
            <div className="authentication-inner py-2 auth-loader-layout-s1">
              <Card
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                  backgroundColor: "rgb(0,0,0,0.6)",
                  border: "0px",
                  filter: "drop-shadow(0px 0px 10px rgb(0, 0, 0))",
                }}>
                <Card.Body className="px-5 pt-5 pb-4 mb-2">
                  <div className="d-flex justify-content-start align-items-center mb-4">
                    <div className="ui-w-100">
                      <div className="w-100 position-relative" style={{ paddingBottom: '10%', }}>
                        <img
                          src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                          alt="Live Poker Studio™" className="d-block ui-w-140" />
                      </div>
                    </div>
                  </div>

                  <Media className="align-items-center text-left">
                    <Media.Body>
                      <div className="text-light text-tiny font-weight-semibold line-height-1 mb-1">
                        LOGGED IN AS
                      </div>
                      <div className="text-large font-weight-bolder line-height-1">
                        {truncateUsername(this.state.username)}
                      </div>
                      {/* <div className="font-weight-bold h5 mt-1 mb-0">
                        <Badge
                          pill variant="default"
                          className="font-weight-bold cursor-pointer">
                          <span>
                            <i className="fas fa-sign-in-alt mr-2" />
                          </span>
                          <span>
                            {this.state.email || this.onRenderProviderId(this.props.providerId)}
                          </span>
                        </Badge>
                      </div> */}
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

                <Card.Footer className="px-sm-5 text-left text-muted small mb-1">
                  <span>
                    Not you?
                  </span>
                  <span
                    className="ml-1 font-weight-bold text-body cursor-pointer">
                    Login as a different user
                  </span>
                </Card.Footer>
              </Card>

              <ProgressBar
                variant={"success"}
                now={this.state.percentage}
                animated={true}
                style={{
                  height: "6px",
                  borderTopLeftRadius: "0px",
                  borderTopRightRadius: "0px",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  backgroundColor: "rgb(0,0,0,0.6)",
                }} />
            </div>
          </div>

          <nav
            className="footer bg-transparent live-d-lg-visible"
            style={{
              position: "fixed",
              left: "50%",
              bottom: "0px",
              transform: "translate(-50%, -25%)",
              margin: "0 0 0 0px !important",
              padding: "0 0 0 0px !important",
            }}>
            <div className="text-light font-weight-semibold line-height-1 mt-5 mb-2 text-center">
              <Badge
                pill variant="default"
                className="font-weight-bold p-3 cursor-pointer"
                id="connect-panel-status-s1">
                <i className="fas fa-key text-danger mr-2"></i>
                <span>REQUESTING ACCESS</span>
              </Badge>
            </div>
            <AuthFooter />
          </nav>
        </>
        {/* / Auth Loader */}
      </>
    )
  }
}

export default AuthLoader