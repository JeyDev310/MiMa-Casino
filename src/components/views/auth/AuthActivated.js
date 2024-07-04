import React, { useEffect } from 'react'
import { Button, Col, Media, Row } from 'react-bootstrap'

import AuthFooter from './AuthFooter'

import { objectsRequestHandler } from "../../../store/objects/actions"
import { ACTIVATE_ACCOUNT } from "../../../store/objects/actionTypes"

import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import '../assets/css/views.css'
import '../../../vendor/styles/pages/authentication.scss'

const AuthenticationAccountActivationV1 = ({ history, objectsRequestHandler, isActivated }) => {

  const { uuid } = useParams()
  const { token } = useParams()

  useEffect(() => {
    document.title = 'Account Activation - Live Poker Studio™'
    objectsRequestHandler(
      ACTIVATE_ACCOUNT, {
      uuid64: uuid,
      token: token,
    }, history)
  }, []) // eslint-disable-line

  const renderSuccessOrError = () => {
    if (isActivated) {
      return (
        <>
          {/* Form */}
          <form className="my-4">
            <h5 className="text-left font-weight-normal mb-4 font-weight-bold">
              Account Activated
            </h5>

            <hr className="border-light m-0 py-2" />

            {/* Header */}
            <Media className="p-0 mb-3 d-flex align-items-center justify-content-center">
              <span className="svg-icon svg-icon-muted svg-icon-2hx d-flex align-self-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                  <path d="M9.89557 13.4982L7.79487 11.2651C7.26967 10.7068 6.38251 10.7068 5.85731 11.2651C5.37559 11.7772 5.37559 12.5757 5.85731 13.0878L9.74989 17.2257C10.1448 17.6455 10.8118 17.6455 11.2066 17.2257L18.1427 9.85252C18.6244 9.34044 18.6244 8.54191 18.1427 8.02984C17.6175 7.47154 16.7303 7.47154 16.2051 8.02984L11.061 13.4982C10.7451 13.834 10.2115 13.834 9.89557 13.4982Z" fill="#02BC77" />
                </svg>
              </span>
              <Media.Body className="pl-3">
                <h6 className="line-height-inherit m-0 font-weight-semibold small">
                  Congratulations! You have successfully signed up for Live Poker Studio™.
                </h6>
              </Media.Body>
            </Media>
            {/* / Header */}

            <hr className="border-light m-0 py-2" />

            <div className="d-flex justify-content-between align-items-center mb-0">
              <Button
                variant="instagram"
                className="font-weight-bold"
                size="md"
                block
                onClick={() => {
                  history.push('/auth/login')
                }}>
                Login
              </Button>
            </div>
          </form>
          {/* / Form */}
        </>
      )
    } else {
      return (
        <>
          {/* Form */}
          <form className="my-4">
            <h5 className="text-left font-weight-normal mb-4 font-weight-bold">
              Invalid Activation Token
            </h5>

            <hr className="border-light m-0 py-2" />

            {/* Header */}
            <Media className="p-0 mb-3 d-flex align-items-center justify-content-center">
              <span className="svg-icon svg-icon-muted svg-icon-2hx d-flex align-self-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                  <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                  <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                  <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                </svg>
              </span>
              <Media.Body className="pl-3">
                <h6 className="line-height-inherit m-0 font-weight-semibold small">
                  The account activation link was invalid, possibly because it has already been used. Please request a new account activation link.
                </h6>
              </Media.Body>
            </Media>
            {/* / Header */}

            <hr className="border-light m-0 py-2" />

            <div className="d-flex justify-content-between align-items-center mb-0">
              <Button
                variant="instagram"
                className="font-weight-bold"
                size="md"
                block
                onClick={() => {
                  history.push('/auth/login')
                }}>
                Login
              </Button>
            </div>
          </form>
          {/* / Form */}
        </>
      )
    }
  }

  return (
    <React.Fragment>
      <div className="authentication-wrapper authentication-3">
        <div className="authentication-inner">

          {/* Side container */}
          <div
            className="d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5"
            style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/img/bg/bg-version-4-1.jpg')` }}>
            <div className="ui-bg-overlay bg-dark opacity-25"></div>
          </div>
          {/* / Side container */}

          {/* Form container */}
          <div className="d-flex col-lg-4 align-items-center theme-bg-white p-5">
            {/* Inner container */}
            {/* Have to add `.d-flex` to control width via `.col-*` classes */}
            <div className="d-flex col-sm-7 col-md-5 col-lg-12 px-0 px-xl-4 mx-auto">
              <div className="w-100">

                {/* Logo */}
                <div className="d-flex justify-content-start align-items-center">
                  <div style={{ width: "160px", }}>
                    <div className="w-100 position-relative" style={{ paddingBottom: '10%' }}>
                      <Link to='/'>
                        <img
                          src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                          alt="Live Poker Studio™" className="d-block" style={{ width: "160px", }} />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* / Logo */}

                {/* Form */}
                {renderSuccessOrError()}
                {/* / Form */}

                <div className="d-flex justify-content-between align-items-center m-0">
                  <Row>
                    <Col className="mt-1 mb-4">
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="ui-w-30 mr-2">
                          <div className="w-30 position-relative">
                            <img
                              src={`${process.env.PUBLIC_URL}/img/icons/18plus-3.png`}
                              alt="18+" className="d-block ui-w-30" />
                          </div>
                        </div>
                        <div className="ui-w-30 mr-2">
                          <div className="w-30 position-relative">
                            <img
                              src={`${process.env.PUBLIC_URL}/img/icons/facebook-4.png`}
                              alt="Facebook" className="d-block ui-w-30" />
                          </div>
                        </div>
                        <div className="ui-w-30">
                          <div className="w-30 position-relative">
                            <img
                              src={`${process.env.PUBLIC_URL}/img/icons/instagram-2.png`}
                              alt="Instagram" className="d-block ui-w-30" />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Authentication Footer */}
                <AuthFooter />
                {/* / Authentication Footer */}

              </div>
            </div>
          </div>
          {/* / Form container */}

        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    isActivated: state.objects.isAccountActivated,
  }
}

export default connect(mapStateToProps, { objectsRequestHandler })(AuthenticationAccountActivationV1)