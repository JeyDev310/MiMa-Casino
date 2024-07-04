import React, { Component } from 'react'
import { faUserAgent } from 'fontawesome-user-agent'
import preval from 'preval.macro'

class AuthenticationFooter extends Component {

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        <div className="text-left text-white opacity-25 text-tiny mb-3">
          Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. By clicking "Sign Up", you agree to our&nbsp;<span className="text-body font-weight-bold cursor-pointer" onClick={this.prevent}>terms of service and privacy policy</span>.
          When registering, you agree that we may use your provided data for the registration and to send you notifications on our products and services. You can unsubscribe from notifications at any time in your settings. For additional info please refer to our <span className="text-body font-weight-bold cursor-pointer" onClick={this.prevent}>Privacy Policy</span>.
        </div>

        <div className="text-left text-white opacity-25 text-tiny mb-3">
          Copyright © {new Date().getFullYear()} Live Poker Studio™. All rights reserved.
        </div>

        <div className="text-left text-white opacity-25 text-tiny mb-0">
          <span className="text-body font-weight-bold cursor-pointer">
            Build Version
          </span> {process.env.REACT_APP_VERSION}
        </div>

        <div className="text-left text-white opacity-25 text-tiny mb-0">
          <span className="text-body font-weight-bold cursor-pointer">
            Build Datetime
          </span> {preval`module.exports = new Date().toLocaleString();`}
        </div>

        <div className="text-left text-white opacity-25 text-tiny mb-0">
          <span className="text-body font-weight-bold cursor-pointer">
            Build Timestamp
          </span> {preval`module.exports = new Date().getTime();`}
        </div>

        <div className="text-left text-white opacity-25 text-tiny mb-3">
          <span className="text-body font-weight-bold cursor-pointer">
            Build ID
          </span> {process.env.REACT_APP_BUILD_ID}
        </div>

        <div className="d-flex align-items-center justify-content-start text-left text-white opacity-25 mb-0">
          <span className="d-flex align-items-center text-body font-weight-bold cursor-pointer" style={{ fontSize: "1.4em", }}>
            <div
              className="text-left opacity-75 mr-2"
              dangerouslySetInnerHTML={{
                __html: faUserAgent(navigator.userAgent).browser.html,
              }} />
          </span>

          <span className="d-flex align-items-center text-body font-weight-bold cursor-pointer" style={{ fontSize: "1.4em", }}>
            <div
              className="text-left opacity-75 mr-2"
              dangerouslySetInnerHTML={{
                __html: faUserAgent(navigator.userAgent).os.html,
              }} />
          </span>
        </div>
      </>
    )
  }
}

export default AuthenticationFooter
