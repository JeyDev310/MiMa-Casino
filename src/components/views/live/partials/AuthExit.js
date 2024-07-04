import React, { Component } from 'react'
import { Badge, Card, Media, ProgressBar } from 'react-bootstrap'

import AuthFooter from './AuthFooter'

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

class AuthExit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: null,
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
    const username = JSON.parse(localStorage.getItem('user')).user.username

    return (
      <>
        {/* Auth Exit */}
        <div className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" style={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}>
          <div className="ui-bg-overlay opacity-25"></div>
          <div className="authentication-inner py-2 auth-loader-layout-s1">
            <Card className="" style={{
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
                      {truncateUsername(username)}
                    </div>
                  </Media.Body>
                </Media>

                <hr className="my-4" />

                <div className="d-flex align-items-center justify-content-center pt-2 mb-5">
                  {this.props.isInactive
                    ? <img
                      src={`${process.env.PUBLIC_URL}/img/section/live/empty/cloud-lock-512-1.png`}
                      alt="Live Poker Studio™" className="d-block" style={{ width: "220px", }}
                    />
                    : <img
                      src={`${process.env.PUBLIC_URL}/img/section/live/empty/cloud-reload-512-1.png`}
                      alt="Live Poker Studio™" className="d-block" style={{ width: "220px", }}
                    />}
                </div>

                {this.props.isInactive
                  ? <form>
                    <div className="d-flex justify-content-center align-items-center">
                      <p className="text-white text-center font-weight-bold mb-2 h5">
                        Thanks for playing
                      </p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <p
                        className="text-white text-center font-weight-semibold mb-0 opacity-50 h6"
                        style={{ lineHeight: "0.8" }}>
                        Come back soon
                      </p>
                    </div>
                  </form>
                  : <form>
                    <div className="d-flex justify-content-center align-items-center">
                      <p className="text-white text-center font-weight-bold mb-2 h5">
                        Please try again later
                      </p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <p
                        className="text-white text-center font-weight-semibold mb-0 opacity-50 h6"
                        style={{ lineHeight: "0.8" }}>
                        Game not available
                      </p>
                    </div>
                  </form>}
              </Card.Body>
            </Card>

            <ProgressBar
              variant={"danger"}
              now={100}
              animated={false}
              style={{
                height: "10px",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                backgroundColor: "rgb(0,0,0,0.6)",
              }}
            />
          </div>
        </div>

        <nav
          className="footer bg-transparent"
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
              <i className="fas fa-info-circle text-danger mr-2"></i>
              <span>CONNECTION CLOSED</span>
            </Badge>
          </div>

          <AuthFooter />
        </nav>
        {/* / Auth Exit */}
      </>
    )
  }
}

export default AuthExit
