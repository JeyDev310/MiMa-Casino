import React, { Component } from 'react'
import { Button, Col, Form, InputGroup, Media, Row } from 'react-bootstrap'

import validator from 'validator'
import ReCAPTCHA from 'react-google-recaptcha'

import AuthFooter from './AuthFooter'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../store/actions'

import LaddaButton, {
  SLIDE_DOWN,
} from 'react-ladda'

import {
  REQ_AUTH_RESETPASSWORD_REQUEST,
} from '../../../store/objects/actionTypes'

import '../assets/css/views.css'
import '../../../vendor/styles/pages/authentication.scss'
import '../../../vendor/libs/react-ladda/react-ladda.scss'

class AuthenticationPasswordReset extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Reset Password')

    this.recaptchaRef = React.createRef()

    this.onHandleValidate = this.onHandleValidate.bind(this)
    this.onSubmitPasswortReset = this.onSubmitPasswortReset.bind(this)
    this.onHandleSubmitReCAPTCHAToken = this.onHandleSubmitReCAPTCHAToken.bind(this)

    this.state = {
      init: false,
      isRequested: false,
      isFetching: false,
      credentials: {
        email: '',
        recaptcha: '',
      },
      validRequest: false,
      validatorHint: 'Please enter a valid email address.',
      requestSuccess: false,
    }
  }

  onValueChange(field, e) {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [field]: e.target.value
      }
    }, () => {
      this.onHandleValidate()
    })
  }

  onHandleValidate() {
    var email = this.state.credentials.email
    if (validator.isEmail(email)) {
      this.setState({
        validRequest: true,
        validatorHint: 'Email address is valid.',
      })
    } else {
      this.setState({
        validRequest: false,
        validatorHint: 'Please enter a valid email address.',
      })
    }
  }

  onSubmitPasswortReset(e) {
    this.prevent(e)
    if (this.state.validRequest) {
      this.setState({
        isFetching: true,
      }, () => {
        new Promise((resolve, reject) => {
          this.onHandleSubmitReCAPTCHAToken().then(res => {
            if (this.state.credentials.recaptcha !== '') {
              this.props.objectsRequestHandler(
                REQ_AUTH_RESETPASSWORD_REQUEST, {
                email: String(this.state.credentials.email),
                recaptcha: String(this.state.credentials.recaptcha),
              }, this.props.history)
                .then((res) => {
                  if (res.status === 200) {
                    this.setState({
                      isFetching: false,
                      isRequested: true,
                      requestSuccess: true,
                    })
                  } else {
                    this.setState({
                      isFetching: false,
                      isRequested: true,
                      requestSuccess: false,
                    })
                  }
                })
                .catch((err) => {
                  this.setState({
                    isFetching: false,
                    isRequested: true,
                    requestSuccess: false,
                  })
                })
            }
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      })
    }
  }

  onHandleSubmitReCAPTCHAToken = async () => {
    this.recaptchaRef.current.reset()
    var token = await this.recaptchaRef.current.executeAsync()
    this.setState({
      credentials: {
        ...this.state.credentials,
        recaptcha: token,
      }
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <React.Fragment>
        <div className="authentication-wrapper authentication-3">
          <div className="authentication-inner">

            {/* Side Container */}
            <div
              className="d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5"
              style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935532-0005.jpg')` }}>
              <div className="ui-bg-overlay bg-dark opacity-25"></div>
            </div>
            {/* / Side Container */}

            {/* Form Container */}
            <div className="d-flex col-lg-4 align-items-center theme-bg-white p-5">
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
                  {!this.state.isRequested
                    ? <>
                      <form className="my-4">
                        <h5 className="text-left font-weight-normal mb-4 font-weight-bold">
                          Reset Your Password
                        </h5>
                        <hr className="border-light m-0 py-2" />
                        <div className="text-left text-white opacity-75 mb-3 small">
                          If you would like to reset your password, please enter your email address in the form below and we will shortly send you a reset link.
                        </div>
                        <hr className="border-light m-0 py-2" />
                        <Form.Group>
                          <InputGroup>
                            <Form.Control
                              placeholder="Email address"
                              isValid={this.state.validRequest}
                              isInvalid={!this.state.validRequest}
                              value={this.state.credentials.email}
                              onChange={e => this.onValueChange('email', e)} />
                            <InputGroup.Append>
                              <Button
                                variant="default">
                                {this.state.validRequest
                                  ? (<span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                      <path d="M9.89557 13.4982L7.79487 11.2651C7.26967 10.7068 6.38251 10.7068 5.85731 11.2651C5.37559 11.7772 5.37559 12.5757 5.85731 13.0878L9.74989 17.2257C10.1448 17.6455 10.8118 17.6455 11.2066 17.2257L18.1427 9.85252C18.6244 9.34044 18.6244 8.54191 18.1427 8.02984C17.6175 7.47154 16.7303 7.47154 16.2051 8.02984L11.061 13.4982C10.7451 13.834 10.2115 13.834 9.89557 13.4982Z" fill="#02BC77" />
                                    </svg>
                                  </span>)
                                  : (<span className="svg-icon svg-icon-muted svg-icon-2hx">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                      <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                      <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                                      <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                                    </svg>
                                  </span>)}
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                          <Form.Label className="d-flex justify-content-between align-items-end text-left text-white opacity-25 text-tiny mt-1">
                            {this.state.validatorHint}
                          </Form.Label>
                        </Form.Group>

                        <ReCAPTCHA
                          ref={this.recaptchaRef}
                          size={process.env.REACT_APP_RECAPTCHA_CLIENT_SIZE}
                          sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY} />

                        <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                          <LaddaButton
                            loading={this.state.isFetching}
                            onClick={(e) => { this.onSubmitPasswortReset(e) }}
                            data-style={SLIDE_DOWN}
                            data-spinner-color="#fff"
                            disabled={!this.state.validRequest}
                            className="btn btn-instagram d-block w-100 font-weight-bold">
                            Reset Password
                          </LaddaButton>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-0">
                          <Button
                            variant="default"
                            className="font-weight-bold"
                            size="md"
                            block
                            onClick={() => { this.props.history.push('/auth/login') }}>
                            Login
                          </Button>
                        </div>
                      </form>
                    </>
                    : <>
                      {this.state.requestSuccess
                        ? <>
                          <form className="my-4">
                            <h5 className="text-left font-weight-normal mb-4 font-weight-bold">
                              Reset Your Password
                            </h5>
                            <hr className="border-light m-0 py-2" />

                            {/* Header */}
                            <Media className="p-0 mb-3 d-flex align-items-center">
                              <span className="d-lg-none d-block align-self-center text-muted text-large pr-3 mr-3">
                                <i className="ion ion-md-more"></i>
                              </span>
                              <span className="svg-icon svg-icon-muted svg-icon-2hx d-flex align-self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                                  <path d="M9.89557 13.4982L7.79487 11.2651C7.26967 10.7068 6.38251 10.7068 5.85731 11.2651C5.37559 11.7772 5.37559 12.5757 5.85731 13.0878L9.74989 17.2257C10.1448 17.6455 10.8118 17.6455 11.2066 17.2257L18.1427 9.85252C18.6244 9.34044 18.6244 8.54191 18.1427 8.02984C17.6175 7.47154 16.7303 7.47154 16.2051 8.02984L11.061 13.4982C10.7451 13.834 10.2115 13.834 9.89557 13.4982Z" fill="#02BC77" />
                                </svg>
                              </span>
                              <Media.Body className="pl-3">
                                <h6 className="line-height-inherit m-0 font-weight-semibold small">
                                  Great! You will shortly receive an email with a link to reset your password.
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
                                onClick={() => { this.props.history.push('/auth/login') }}>
                                Login
                              </Button>
                            </div>
                          </form>
                        </>
                        : <>
                          <form className="my-4">
                            <h5 className="text-left font-weight-normal mb-4 font-weight-bold">
                              Reset Your Password
                            </h5>
                            <hr className="border-light m-0 py-2" />

                            {/* Header */}
                            <Media className="p-0 mb-3 d-flex align-items-center">
                              <span className="d-lg-none d-block align-self-center text-muted text-large pr-3 mr-3">
                                <i className="ion ion-md-more"></i>
                              </span>
                              <span className="svg-icon svg-icon-muted svg-icon-2hx d-flex align-self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                                  <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                  <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                                  <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                                </svg>
                              </span>
                              <Media.Body className="pl-3">
                                <h6 className="line-height-inherit m-0 font-weight-semibold small">
                                  Sorry, it seems you don't currently have permission to reset your password. Please try again or contact Live Poker Studio™ Customer Support.
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
                                onClick={() => { this.props.history.push('/auth/login') }}>
                                Login
                              </Button>
                            </div>
                          </form>
                        </>}
                    </>
                  }
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
                  <AuthFooter
                    {...this.props} {...this.state} />
                  {/* / Authentication Footer */}

                </div>
              </div>
            </div>
            {/* / Form Container */}

          </div>
        </div>
      </React.Fragment >
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(AuthenticationPasswordReset))