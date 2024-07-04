import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class LayoutFooter extends Component {

  prevent(e) {
    e.preventDefault()
  }

  formatDate() {
    var d = new Date()
    return <span>{d.toLocaleString()}</span>
  }

  render() {
    return (
      <React.Fragment>
        <nav className="footer bg-light pt-4 mb-0">
          <div className="container-fluid text-left py-0">
            <div className="row">
              <div className="col-sm pb-2">
                <div className="footer-text small font-weight-bold mb-3">HOW TO</div>
                <Link to="/games" className="footer-link d-block pb-1 text-muted small">Deposits & Withdrawals</Link>
                <Link to="/games" className="footer-link d-block pb-1 text-muted small">How to play</Link>
                <Link to="/games" className="footer-link d-block pb-1 text-muted small">Help</Link>
              </div>
              <div className="col-sm pb-2">
                <div className="footer-text small font-weight-bold mb-3">POPULAR GAMES</div>
                <Link to="/games" className="footer-link d-block pb-1 text-muted small">Texas Hold'em Live</Link>
                <Link to="/games" className="footer-link d-block pb-1 text-muted small">Free games</Link>
              </div>
              <div className="col-sm pb-2">
                <div className="footer-text small font-weight-bold mb-3">LEGAL</div>
                <Link to="/games" className="footer-link d-block pb-1 text-muted small">Terms of Service</Link>
                <Link to="/games" className="footer-link d-block pb-1 text-muted small">Privacy Policy</Link>
                <Link to="/games" className="footer-link d-block pb-1 text-muted small">Security of account balances</Link>
                <Link to="/games" className="footer-link d-block pb-1 text-muted small">Responsible Gaming</Link>
              </div>
              <div className="col-sm pb-2">
                <div className="d-flex justify-content-center align-items-center float-right">
                  <div>
                    <div className="w-100 position-relative">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                        alt="Live Poker Studio™" className="d-block ui-w-140" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid text-left py-0">
            <hr className="mb-4" />
            <div className="row">
              <div className="col-md-8 pb-4">
                <div className="footer-text small font-weight-bold mb-3">Live Poker Studio™</div>
                <h6 className="text-left text-muted small mb-0 font-weight-bold opacity-50">
                  Copyright © {new Date().getFullYear()}, Live Poker Studio™. All rights reserved.
                </h6>
                <br />
                <div className="small font-weight-bold">
                  <Link to="/games" className="mr-2 text-white">Terms of Service</Link>|
                  <Link to="/games" className="ml-2 mr-2 text-white">Privacy Policy</Link>|
                  <Link to="/games" className="ml-2 text-white">Responsible Gaming</Link>
                </div>
              </div>

              <div className="col-md-4 pb-4">
                <div className="d-flex justify-content-center align-items-center py-2 float-right">
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
              </div>
            </div>
          </div>

          <div className="container-fluid text-left py-0">
            <div className="row">
              <div className="col-sm pb-2">
                <div className="footer-text small font-weight-bold mb-3 text-muted">{this.formatDate()}</div>
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  }
}

export default connect(store => ({
  footerBg: store.theme.footerBg,
}))(LayoutFooter)