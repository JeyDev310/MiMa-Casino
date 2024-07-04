import React, { Component } from 'react'
import { faUserAgent } from 'fontawesome-user-agent'

class AuthFooter extends Component {
  render() {
    return (
      <>
        {/* Auth Footer */}
        <>
          <div className="container text-center">
            <div className="pt-1">
              <span className="footer-text text-body text-tiny font-weight-bold opacity-25">
                <span className="mb-2 d-none">
                  <div className="d-flex align-items-center justify-content-center text-center text-white mb-0">
                    <span className="d-flex align-items-center text-body font-weight-bold cursor-pointer" style={{ fontSize: "2.4em", }}>
                      <div
                        className="text-left opacity-75 mr-2"
                        dangerouslySetInnerHTML={{
                          __html: faUserAgent(navigator.userAgent).browser.html,
                        }} />
                    </span>
                    <span className="d-flex align-items-center text-body font-weight-bold cursor-pointer" style={{ fontSize: "2.4em", }}>
                      <div
                        className="text-left opacity-75 mr-2"
                        dangerouslySetInnerHTML={{
                          __html: faUserAgent(navigator.userAgent).os.html,
                        }} />
                    </span>
                  </div>
                </span>

                <span className="text-center text-white opacity-50 mb-0">
                  <span>
                    Copyright © {new Date().getFullYear()} Live Poker Studio™. All rights reserved.
                  </span>
                </span>
                <div className="text-center text-white opacity-25 mb-0 live-d-lg-visible" style={{ lineHeight: "1" }}>
                  <span className="d-flex text-center align-items-center justify-content-center">
                    {process.env.REACT_APP_VERSION
                      ? `Live Poker Studio™ Build Version ${process.env.REACT_APP_VERSION}`
                      : 'Live Poker Studio™ Build Version Unknown'}
                  </span>
                </div>
              </span>
            </div>
          </div>
        </>
        {/* / Auth Footer */}
      </>
    )
  }
}

export default AuthFooter
