import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Alert, Button, Col, Form, InputGroup, Media, OverlayTrigger, Popover, ProgressBar, Row } from 'react-bootstrap'

import zxcvbn from 'zxcvbn'
import validator from 'validator'
import ReCAPTCHA from 'react-google-recaptcha'
import ResourceLoaderD from '../utilities/loaders/ResourceLoaderD'

import AuthFooter from './AuthFooter'

import {
  initCookieConsent,
} from '../utilities/CookieConsent'

import LaddaButton, {
  SLIDE_DOWN,
} from 'react-ladda'

import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { checkSignup, clearErrorLogin } from '../../../store/actions'

import '../assets/css/views.css'
import "../../../vendor/styles/pages/authentication.scss"
import '../../../vendor/libs/react-ladda/react-ladda.scss'
import "../../../vendor/libs/react-toastify/react-toastify.scss"

const mapRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2

class AuthenticationRegisterV1 extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Register')

    this.recaptchaRef = React.createRef()

    this.onHandleSubmit = this.onHandleSubmit.bind(this)
    this.onHandleSubmitKeypress = this.onHandleSubmitKeypress.bind(this)
    this.onHandleSetInputFocus = this.onHandleSetInputFocus.bind(this)
    this.onTogglePasswordVisibility = this.onTogglePasswordVisibility.bind(this)
    this.onHandlePasswordStrengthMeter = this.onHandlePasswordStrengthMeter.bind(this)
    this.onHandleSubmitReCAPTCHAToken = this.onHandleSubmitReCAPTCHAToken.bind(this)

    this.state = {
      showAlert: false,
      showPassword: false,
      passwordStrength: 0,
      isFetching: false,
      credentials: {
        username: '',
        email: '',
        password: '',
        promotion: '',
        recaptcha: '',
      },
      validRequest: false,
      validUsername: false,
      validEmail: false,
      validPassword: false,
      validPromotion: false,
      validatorHintUsername: 'Please enter a valid username.',
      validatorHintEmail: 'Please enter a valid email address.',
      validatorHintPassword: 'Please enter a valid password.',
    }

    initCookieConsent()
  }

  componentDidMount() {
    this.props.clearErrorLogin()
    if (
      JSON.parse(localStorage.getItem('user')) &&
      JSON.parse(localStorage.getItem('user')).hasOwnProperty('user')
    ) {
      this.props.history.push('/games')
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.loginError !== prevProps.loginError) {
      this.setState({
        showAlert: true,
        isFetching: false,
      })
    }
  }

  onValueChange(field, e) {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [field]: e.target.value,
      },
    }, () => {
      this.onHandleValidateCredentials()
    })
  }

  onHandleSubmit(e) {
    this.prevent(e)
    if (
      this.state.credentials.username &&
      this.state.credentials.email &&
      this.state.credentials.password &&
      this.state.validUsername &&
      this.state.validEmail &&
      this.state.validPassword
    ) {
      this.setState({
        showAlert: false,
        isFetching: true,
      }, () => {
        new Promise((resolve, reject) => {
          this.onHandleSubmitReCAPTCHAToken().then(res => {
            if (this.state.credentials.recaptcha !== '') {
              var form = {
                username: this.state.credentials.username,
                email: this.state.credentials.email,
                password: this.state.credentials.password,
                first_name: "",
                last_name: "",
                date_of_birth: "",
                country: "",
                city: "",
                zip_code: "",
                address: "",
                currency: "",
                deposit_limit: "",
                deposit_amount: 0,
                option_1: true,
                option_2: true,
              }
              setTimeout(() => {
                this.props.checkSignup(
                  this.state.credentials.username,
                  this.state.credentials.email,
                  this.state.credentials.password,
                  this.state.credentials.promotion,
                  this.state.credentials.recaptcha,
                  form.firstName,
                  form.lastName,
                  form,
                  this.props.history,
                )
              }, 100)
            }
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      })
    }
  }

  onHandleSubmitKeypress(e) {
    if (e.key === 'Enter') {
      if (
        this.state.credentials.username &&
        this.state.credentials.email &&
        this.state.credentials.password &&
        this.state.validUsername &&
        this.state.validEmail &&
        this.state.validPassword
      ) {
        this.setState({
          showAlert: false,
          isFetching: true,
        }, () => {
          new Promise((resolve, reject) => {
            this.onHandleSubmitReCAPTCHAToken().then(res => {
              if (this.state.credentials.recaptcha !== '') {
                var form = {
                  username: this.state.credentials.username,
                  email: this.state.credentials.email,
                  password: this.state.credentials.password,
                  first_name: "",
                  last_name: "",
                  date_of_birth: "",
                  country: "",
                  city: "",
                  zip_code: "",
                  address: "",
                  currency: "",
                  deposit_limit: "",
                  deposit_amount: 0,
                  option_1: true,
                  option_2: true,
                }
                setTimeout(() => {
                  this.props.checkSignup(
                    this.state.credentials.username,
                    this.state.credentials.email,
                    this.state.credentials.password,
                    this.state.credentials.promotion,
                    this.state.credentials.recaptcha,
                    form.firstName,
                    form.lastName,
                    form,
                    this.props.history,
                  )
                }, 100)
              }
              resolve(res)
            }).catch(err => {
              reject(err)
            })
          })
        })
      }
    }
  }

  onHandleSetInputFocus(e, pos) {
    if (pos === 'email') {
      if (e.key === 'Enter') {
        e.stopPropagation()
        e.preventDefault()
        ReactDOM.findDOMNode(this.emailRef).focus()
      }
      if (e.key === 'Tab') {
        e.stopPropagation()
        e.preventDefault()
        ReactDOM.findDOMNode(this.emailRef).focus()
      }
    }
    if (pos === 'password') {
      if (e.key === 'Enter') {
        ReactDOM.findDOMNode(this.passwordRef).focus()
      }
      if (e.key === 'Tab') {
        e.stopPropagation()
        e.preventDefault()
        ReactDOM.findDOMNode(this.passwordRef).focus()
      }
    }
    if (pos === 'promotion') {
      if (e.key === 'Enter') {
        ReactDOM.findDOMNode(this.promotionRef).focus()
      }
      if (e.key === 'Tab') {
        e.stopPropagation()
        e.preventDefault()
        ReactDOM.findDOMNode(this.promotionRef).focus()
      }
    }
  }

  onTogglePasswordVisibility() {
    this.setState({
      showPassword: !this.state.showPassword,
    })
  }

  onHandlePasswordValueChange(e) {
    var password = e.target.value
    this.setState({
      credentials: {
        ...this.state.credentials,
        password: password,
      },
      passwordStrength: Number(mapRange(zxcvbn(password).score, 0, 5, 0, 100)),
    }, () => {
      this.onHandleValidateCredentials()
    })
  }

  onHandlePasswordStrengthMeter() {
    if (this.state.passwordStrength <= 25) {
      return 'danger'
    } else if (this.state.passwordStrength < 50) {
      return 'warning'
    } else if (this.state.passwordStrength < 100) {
      return 'success'
    }
  }

  onHandleSubmitReCAPTCHAToken = async () => {
    await this.recaptchaRef.current.reset()
    var token = await this.recaptchaRef.current.executeAsync()
    this.setState({
      credentials: {
        ...this.state.credentials,
        recaptcha: token,
      }
    })
  }

  onHandleValidateCredentials() {
    this.setState({
      validUsername: this.state.credentials.username.length >= 4 ? true : false,
      validEmail: validator.isEmail(this.state.credentials.email) ? true : false,
      validPassword: this.state.passwordStrength >= 40 ? true : false,
      validPromotion: this.state.credentials.promotion.length >= 4 ? true : false,
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div className="authentication-wrapper authentication-3">
        <div className="authentication-inner">

          {/* Side container */}
          <div
            className="d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5"
            style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935532-0005.jpg')` }}>
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
                <form className="my-4">
                  <Form.Group>
                    <Form.Label className="d-flex justify-content-between align-items-end">
                      <div>Username</div>
                      <span className="d-block small font-weight-normal text-body opacity-50">
                        {this.state.credentials.username !== '' && (
                          !this.state.validUsername && (
                            this.state.validatorHintUsername
                          )
                        )}
                      </span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        ref={c => (this.usernameRef = c)}
                        value={this.state.credentials.username}
                        isValid={this.state.validUsername}
                        onChange={e => this.onValueChange('username', e)}
                        onKeyDown={(e) => { this.onHandleSetInputFocus(e, 'email') }}
                        className="font-weight-normal"
                        placeholder="Username"
                        maxLength="20" />
                      <InputGroup.Append>
                        <Button
                          variant="default">
                          {this.state.validUsername
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
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="d-flex justify-content-between align-items-end">
                      <div>Email</div>
                      <span className="d-block small font-weight-normal text-body opacity-50">
                        {this.state.credentials.email !== '' && (
                          !this.state.validEmail && (
                            this.state.validatorHintEmail
                          )
                        )}
                      </span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        ref={c => (this.emailRef = c)}
                        value={this.state.credentials.email}
                        isValid={this.state.validEmail}
                        onChange={e => this.onValueChange('email', e)}
                        onKeyDown={(e) => { this.onHandleSetInputFocus(e, 'password') }}
                        className="font-weight-normal"
                        placeholder="Email address"
                        maxLength="20" />
                      <InputGroup.Append>
                        <Button
                          variant="default">
                          {this.state.validEmail
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
                  </Form.Group>

                  <Form.Group className="mb-0">
                    <Form.Label className="d-flex justify-content-between align-items-end">
                      <div>
                        <OverlayTrigger
                          placement="left"
                          overlay={<Popover className="popover-info">
                            <Popover.Title className="font-weight-bold">
                              Password Strength
                            </Popover.Title>
                            <Popover.Content>
                              Passwords must be at least 8 characters long and must contain at least three character categories among the following: uppercase characters, lowercase characters, digits, special characters.
                            </Popover.Content>
                          </Popover>}>
                          <div>Password</div>
                        </OverlayTrigger>
                      </div>
                      {this.state.credentials.password !== '' && (
                        !this.state.validPassword
                          ? <span className="d-block small font-weight-normal text-body opacity-50">
                            {this.state.validatorHintPassword}
                          </span>
                          : <Link
                            to="#"
                            className="d-block small font-weight-bold text-body"
                            onClick={() => { this.props.history.push('/auth/password_reset') }}>
                            Reset or change your password?
                          </Link>
                      )}
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        ref={c => (this.passwordRef = c)}
                        type={this.state.showPassword ? "text" : "password"}
                        value={this.state.credentials.password}
                        isValid={this.state.validPassword}
                        onChange={e => this.onHandlePasswordValueChange(e)}
                        onKeyDown={(e) => { this.onHandleSetInputFocus(e, 'promotion') }}
                        onKeyPress={(e) => { this.onHandleSubmitKeypress(e) }}
                        className="font-weight-normal"
                        placeholder="Password"
                        style={{ borderBottomLeftRadius: "0px", }}
                        maxLength="40" />
                      <InputGroup.Append>
                        <Button
                          variant="default"
                          style={{ borderBottomRightRadius: "0px", }}
                          onClick={this.onTogglePasswordVisibility}>
                          {this.state.showPassword
                            ? (<span className="ion ion-md-eye-off"></span>)
                            : (<span className="ion ion-md-eye"></span>)}
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group>
                    <ProgressBar
                      animated={true}
                      variant={this.onHandlePasswordStrengthMeter()}
                      now={this.state.passwordStrength}
                      style={{
                        height: "0.25rem",
                        backgroundColor: "#46484d",
                        borderRadius: "0px 0px 5px 5px",
                      }} />
                  </Form.Group>

                  {this.state.showAlert && (
                    <Alert variant="text-center" className="bg-light">
                      {/* Sign Up Warning */}
                      <Media className="p-0 mb-0 d-flex align-items-center">
                        <span className="svg-icon svg-icon-muted svg-icon-2hx d-flex align-self-center">
                          <ResourceLoaderD
                            height={`2rem`} width={`2rem`} />
                        </span>
                        <Media.Body className="pl-4">
                          <h6 className="line-height-inherit m-0 font-weight-semibold small">
                            <strong>
                              Registration failed
                            </strong>
                          </h6>
                          <span className="d-inline-block small">
                            {this.props.loginError && (this.props.loginError.response.data.message || 'Please wait a few minutes and try again.')}
                          </span>
                        </Media.Body>
                      </Media>
                      {/* / Sign Up Warning */}
                    </Alert>
                  )}

                  <ReCAPTCHA
                    ref={this.recaptchaRef}
                    size={process.env.REACT_APP_RECAPTCHA_CLIENT_SIZE}
                    sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY} />

                  <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                    <LaddaButton
                      loading={this.state.isFetching}
                      onClick={(e) => { this.onHandleSubmit(e) }}
                      data-style={SLIDE_DOWN}
                      data-spinner-color="#fff"
                      className="btn btn-instagram d-block w-100 font-weight-bold">
                      Sign Up
                    </LaddaButton>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Button
                      variant="default"
                      className="font-weight-bold"
                      size="md"
                      block
                      onClick={() => { this.props.history.push('/login') }}>
                      Login
                    </Button>
                  </div>
                </form>
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
          {/* / Form container */}

        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => {
  const {
    user,
    loginError,
    loading,
  } = state.login
  return { user, loginError, loading }
}

export default withRouter(connect(mapStatetoProps, { checkSignup, clearErrorLogin })(AuthenticationRegisterV1))