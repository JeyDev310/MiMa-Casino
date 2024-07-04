import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../../vendor/libs/react-ladda/react-ladda.scss'
import '../../vendor/styles/pages/authentication.scss'

class ServerError extends Component {

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
      <React.Fragment>
        <div className="authentication-wrapper authentication-3">
          <div className="authentication-inner">

            {/* Form container */}
            <div className="d-flex col-lg-4 align-items-center theme-bg-white p-5">
              {/* Inner container */}
              {/* Have to add `.d-flex` to control width via `.col-*` classes */}
              <div className="d-flex col-sm-7 col-md-5 col-lg-12 px-0 px-xl-4 mx-auto">
                <div className="w-100">

                  {/* Form */}
                  <div className="my-4">
                    {/* Logo */}
                    <div className="d-flex justify-content-start align-items-center mb-3">
                      <div className="ui-w-80">
                        <div className="w-100 position-relative" style={{ paddingBottom: '10%', }}>
                          <Link to='/'>
                            <img src={`${process.env.PUBLIC_URL}/img/uikit/logo-light-img-1-1-0.png`} alt="Live Poker Studio™" className="d-block ui-w-80" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* / Logo */}

                    <h2 className="text-left mb-4 font-weight-bold display-3">
                      500 Server Error
                    </h2>

                    <p className="text-left small mb-4">
                      Internal Server Error. Click the button below to go back to Live Poker Studio™.
                    </p>

                    <Link to="#" onClick={() => { this.props.history.push('/') }}>
                      <Button variant="default" className="font-weight-bold d-flex align-items-center justify-content-center">
                        <i className="far fa-arrow-alt-circle-left text-danger mr-2"></i>
                        <span>Home</span>
                      </Button>
                    </Link>
                  </div>
                  {/* / Form */}

                  <div className="d-flex justify-content-between align-items-center m-0">
                    <Row>
                      <Col className="mt-1 mb-4">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="ui-w-30 mr-2">
                            <div className="w-30 position-relative">
                              <img src={`${process.env.PUBLIC_URL}/img/icons/18plus-3.png`} alt="18+" className="d-block ui-w-30" />
                            </div>
                          </div>
                          <div className="ui-w-30 mr-2">
                            <div className="w-30 position-relative">
                              <img src={`${process.env.PUBLIC_URL}/img/icons/facebook-4.png`} alt="Facebook" className="d-block ui-w-30" />
                            </div>
                          </div>
                          <div className="ui-w-30">
                            <div className="w-30 position-relative">
                              <img src={`${process.env.PUBLIC_URL}/img/icons/instagram-2.png`} alt="Instagram" className="d-block ui-w-30" />
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="mt-1 mb-4">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="ui-w-100">
                            <div className="w-100 position-relative">
                              <img
                                src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-@8.png`}
                                alt="Live Poker Studio™" className="d-block ui-w-100" />
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="text-left text-white opacity-25 text-tiny mb-3">
                    Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. By clicking "Sign Up", you agree to our&nbsp;<span className="text-body font-weight-bold cursor-pointer" onClick={this.prevent}>terms of service and privacy policy</span>.
                    When registering, you agree that we may use your provided data for the registration and to send you notifications on our products and services. You can unsubscribe from notifications at any time in your settings. For additional info please refer to our <span className="text-body font-weight-bold cursor-pointer" onClick={this.prevent}>Privacy Policy</span>.
                  </div>

                  <div className="text-left text-white opacity-25 text-tiny mb-3">
                    Copyright © {new Date().getFullYear()} Live Poker Studio™. All rights reserved. {process.env.REACT_APP_VERSION
                      ? `Client Build V${process.env.REACT_APP_VERSION}`
                      : 'Client Build Version Unknown'}
                  </div>
                </div>
              </div>
            </div>
            {/* / Form container */}

            {/* Side container */}
            <div
              className="d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5"
              style={{
                backgroundImage: `url('${process.env.PUBLIC_URL}/img/packages/bento-3d/dashboard-ui-1-011@0.5x.png')`,
                backgroundPositionY: '-30px',
              }}>
            </div>
            {/* / Side container */}

          </div>
        </div>
      </React.Fragment >
    )
  }
}

export default ServerError
