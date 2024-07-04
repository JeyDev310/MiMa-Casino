import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Alert, Button, Col, Form, InputGroup, Media, Row } from 'react-bootstrap'

import ResourceLoaderD from '../utilities/loaders/ResourceLoaderD'
import ReCAPTCHA from 'react-google-recaptcha'
import GoogleLogin from 'react-google-login'

import AuthFooter from './AuthFooter'

import {
  initCookieConsent,
} from '../utilities/CookieConsent'

import LaddaButton, {
  SLIDE_DOWN,
} from 'react-ladda'

import {
  Link,
  withRouter,
} from 'react-router-dom'

import { connect } from 'react-redux'

import {
  checkLogin,
  checkLoginOAuth2,
  clearErrorLogin,
} from '../../../store/actions'

import '../assets/css/views.css'
import '../../../vendor/styles/pages/authentication.scss'
import '../../../vendor/libs/react-ladda/react-ladda.scss'

class AuthenticationLoginV1 extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Login')

    this.recaptchaRef = React.createRef()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitKeypress = this.handleSubmitKeypress.bind(this)
    this.onHandleSetInputFocus = this.onHandleSetInputFocus.bind(this)
    this.onTogglePasswordVisibility = this.onTogglePasswordVisibility.bind(this)
    this.onHandleResponseGoogle = this.onHandleResponseGoogle.bind(this)
    this.onHandleSubmitReCAPTCHAToken = this.onHandleSubmitReCAPTCHAToken.bind(this)

    this.state = {
      showAlert: false,
      showPassword: false,
      isFetching: false,
      credentials: {
        username: '',
        password: '',
        recaptcha: '',
        rememberMe: false,
      },
    }

    document.body.classList.toggle('c_darkmode', true)
  }

  componentDidMount() {
    this.props.clearErrorLogin()
    if (
      JSON.parse(localStorage.getItem('user')) &&
      JSON.parse(localStorage.getItem('user')).hasOwnProperty('user')
    ) {
      this.props.history.push('/games')
    }
    initCookieConsent()
  }

  componentDidUpdate(prevProps) {
    if (this.props.loginError !== prevProps.loginError) {
      if (this.props.loginError === null) {
        this.setState({
          showAlert: false,
          isFetching: false,
        })
      } else {
        this.setState({
          showAlert: true,
          isFetching: false,
        })
      }
    }
  }

  onValueChange(field, e) {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [field]: field === 'rememberMe'
          ? e.target.checked
          : e.target.value
      }
    })
  }

  handleSubmit(e) {
    this.prevent(e)
    if (
      this.state.credentials.username &&
      this.state.credentials.password
    ) {
      this.setState({
        showAlert: false,
        isFetching: true,
      }, () => {
        new Promise((resolve, reject) => {
          this.onHandleSubmitReCAPTCHAToken().then(res => {
            if (this.state.credentials.recaptcha !== '') {
              this.setState({
                showAlert: false,
              }, () => {
                setTimeout(() => {
                  this.props.checkLogin(
                    this.state.credentials.username,
                    this.state.credentials.password,
                    this.state.credentials.recaptcha,
                    this.props.history,
                  )
                }, 100)
              })
            }
            resolve(res)
          }).catch(err => {
            this.setState({
              isFetching: false,
            }, () => {
              reject(err)
            })
          })
        })
      })
    }
  }

  handleSubmitKeypress(e) {
    if (e.key === 'Enter') {
      if (
        this.state.credentials.username &&
        this.state.credentials.password
      ) {
        this.setState({
          showAlert: false,
          isFetching: true,
        }, () => {
          new Promise((resolve, reject) => {
            this.onHandleSubmitReCAPTCHAToken().then(res => {
              if (this.state.credentials.recaptcha !== '') {
                this.setState({
                  showAlert: false,
                }, () => {
                  setTimeout(() => {
                    this.props.checkLogin(
                      this.state.credentials.username,
                      this.state.credentials.password,
                      this.state.credentials.recaptcha,
                      this.props.history,
                    )
                  }, 100)
                })
              }
              resolve(res)
            }).catch(err => {
              this.setState({
                isFetching: false,
              }, () => {
                reject(err)
              })
            })
          })
        })
      }
    }
  }

  onHandleSetInputFocus(e) {
    if (e.key === 'Enter') {
      ReactDOM.findDOMNode(this.passwordRef).focus()
    }
    if (e.key === 'Tab') {
      e.stopPropagation()
      e.preventDefault()
      ReactDOM.findDOMNode(this.passwordRef).focus()
    }
  }

  onTogglePasswordVisibility() {
    this.setState({
      showPassword: !this.state.showPassword,
    })
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

  onHandleResponseGoogle(response) {
    if (response.tokenObj) {
      this.props.checkLoginOAuth2(
        process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID,
        process.env.REACT_APP_GOOGLE_OAUTH2_PROVIDER,
        response.tokenObj.access_token,
        window.location.origin + '/',
        this.props.history,
      )
    }
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
                <form className="my-4">
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={this.state.credentials.username}
                      onChange={e => this.onValueChange('username', e)}
                      onKeyDown={(e) => { this.onHandleSetInputFocus(e) }}
                      className="font-weight-bold"
                      maxLength="20" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="d-flex justify-content-between align-items-end">
                      <div>Password</div>
                      <Link
                        to="#"
                        className="d-block small font-weight-bold text-body"
                        onClick={() => { this.props.history.push('/auth/password_reset') }}>
                        Forgot password?
                      </Link>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={this.state.showPassword ? "text" : "password"}
                        ref={c => (this.passwordRef = c)}
                        value={this.state.credentials.password}
                        onChange={e => this.onValueChange('password', e)}
                        onKeyPress={(e) => { this.handleSubmitKeypress(e) }}
                        className="font-weight-bold"
                        maxLength="40" />
                      <InputGroup.Prepend>
                        <Button
                          variant="default"
                          onClick={this.onTogglePasswordVisibility}>
                          {this.state.showPassword
                            ? (<span className="ion ion-md-eye-off"></span>)
                            : (<span className="ion ion-md-eye"></span>)}
                        </Button>
                      </InputGroup.Prepend>
                    </InputGroup>
                  </Form.Group>

                  {this.state.showAlert && (
                    <Alert variant="text-center" className="bg-light">
                      {/* Authentication Warning */}
                      <Media className="p-0 mb-0 d-flex align-items-center">
                        <span className="svg-icon svg-icon-muted svg-icon-2hx d-flex align-self-center">
                          <ResourceLoaderD
                            height={`2rem`} width={`2rem`} />
                        </span>
                        <Media.Body className="pl-4">
                          <h6 className="line-height-inherit m-0 font-weight-semibold small">
                            <strong>
                              Authentication failed
                            </strong>
                          </h6>
                          <span className="d-inline-block small">
                            {this.props.loginError && (this.props.loginError.response.data.message || 'Incorrect username or password.')}
                          </span>
                        </Media.Body>
                      </Media>
                      {/* / Authentication Warning */}
                    </Alert>
                  )}

                  <ReCAPTCHA
                    ref={this.recaptchaRef}
                    size={process.env.REACT_APP_RECAPTCHA_CLIENT_SIZE}
                    sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY} />

                  <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                    <LaddaButton
                      loading={this.state.isFetching}
                      onClick={(e) => { this.handleSubmit(e) }}
                      data-style={SLIDE_DOWN}
                      data-spinner-color="#fff"
                      className="btn btn-instagram d-block w-100 font-weight-bold">
                      Login
                    </LaddaButton>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Button
                      variant="default"
                      className="font-weight-bold"
                      size="md"
                      block
                      onClick={() => { this.props.history.push('/auth/register') }}>
                      Sign Up
                    </Button>
                  </div>
                </form>
                {/* / Form */}

                <hr className="m-0 mb-4" />

                <GoogleLogin
                  className="d-flex align-items-center justify-content-center w-100 mb-3"
                  clientId={process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID}
                  buttonText="Sign In with Google"
                  onSuccess={this.onHandleResponseGoogle}
                  onFailure={this.onHandleResponseGoogle} />

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
  return {
    user,
    loginError,
    loading,
  }
}

export default withRouter(connect(mapStatetoProps, {
  checkLogin,
  checkLoginOAuth2,
  clearErrorLogin,
})(AuthenticationLoginV1))