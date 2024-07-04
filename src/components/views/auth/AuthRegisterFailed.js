import React, { Component } from 'react'
import { Button, Col, Media, Row } from 'react-bootstrap'

import AuthFooter from './AuthFooter'

import {
  Link,
  withRouter,
} from 'react-router-dom'

import { connect } from 'react-redux'

import {
  clearErrorLogin,
} from '../../../store/actions'

import '../assets/css/views.css'
import "../../../vendor/styles/pages/authentication.scss"

class AuthenticationRegisterFailedV1 extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Sign Up Failed')

    this.state = {
      init: false
    }
  }

  componentDidMount() {
    if (
      JSON.parse(localStorage.getItem('user')) &&
      JSON.parse(localStorage.getItem('user')).hasOwnProperty('user')
    ) {
      this.props.history.push('/games')
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
                  <h5 className="text-left font-weight-normal mb-4 font-weight-bold">
                    Sign Up Failed
                  </h5>
                  <hr className="border-light m-0 py-2" />

                  {/* Header */}
                  <Media className="p-0 mb-3 d-flex align-items-center">
                    <span className="svg-icon svg-icon-muted svg-icon-2hx d-flex align-self-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                        <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                        <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                      </svg>
                    </span>
                    <Media.Body className="pl-3">
                      <h6 className="line-height-inherit m-0 font-weight-semibold small">
                        <strong>
                          {this.props.loginError && (this.props.loginError.response.data.message || 'Unfortunately the sign up failed.')}
                        </strong>
                      </h6>
                      <span className="d-inline-block small">
                        Please wait a few minutes and try again.
                      </span>
                    </Media.Body>
                  </Media>
                  {/* / Header */}

                  <hr className="border-light m-0 py-2" />

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Button
                      variant="instagram"
                      className="font-weight-bold"
                      size="md"
                      block
                      onClick={() => { this.props.history.push('/auth/register') }}>
                      Try again
                    </Button>
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
    loginError,
  } = state.login
  return {
    loginError,
  }
}

export default withRouter(connect(mapStatetoProps, {
  clearErrorLogin,
})(AuthenticationRegisterFailedV1))