import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import layoutHelpers from './helpers'

class LayoutSinglePage extends Component {

  closeSidenav(e) {
    e.preventDefault()
    layoutHelpers.setCollapsed(true)
  }

  componentDidMount() {
    layoutHelpers._removeClass('layout-expanded')
    layoutHelpers.init()
    layoutHelpers.update()
    layoutHelpers.setAutoUpdate(true)
  }

  componentWillUnmount() {
    layoutHelpers.destroy()
  }

  render() {
    return (
      <div className="layout-wrapper layout-1 layout-without-sidenav">
        <div className="layout-inner">
          {/* Navbar */}
          <Navbar
            bg="widget5"
            expand="lg"
            className="layout-navbar align-items-lg-center container-p-x p-4 border-0 shadow-none">
            <Navbar.Brand
              as={NavLink}
              to="/"
              className="app-brand demo d-lg-none py-0 mr-4">
              <div className="app-brand">
                <img
                  src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                  alt="Live Poker Studio™" className="d-block ui-w-100"
                />
              </div>
            </Navbar.Brand>
            <Navbar.Collapse>
              <Nav className="align-items-lg-center ml-auto">
                <div className="nav-item d-none d-lg-block small font-weight-bold line-height-1 text-body">
                  Round Details
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {/* / Navbar */}

          <div className="layout-container">
            <div className="layout-content">
              <div className="container-fluid flex-grow-1 container-p-y d-flex justify-content-center align-items-center">
                {this.props.children}
              </div>

              {/* Footer */}
              <nav className="footer bg-widget5 pt-4 mb-0">
                <div className="container-fluid text-left py-0">
                  <div className="row">
                    <div className="col-md-8 pb-4">
                      <div className="footer-text small font-weight-bold mb-1">
                        Live Poker Studio™
                      </div>
                      <h6 className="text-left text-muted small mb-0 font-weight-normal">
                        Copyright © {new Date().getFullYear()}, Live Poker Studio™. All rights reserved.
                      </h6>
                      <br />
                      <div className="small font-weight-bold">
                      </div>
                    </div>
                    <div className="col-md-4 pb-4">
                      <div className="d-flex justify-content-center align-items-center float-right">
                        <div>
                          <div className="w-100 position-relative">
                            <img
                              src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                              alt="Live Poker Studio™" className="d-block ui-w-140"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container-fluid text-left py-0">
                  <div className="row">
                    <div className="col-sm pb-2">
                      <div className="footer-text small font-weight-bold mb-3 text-muted"></div>
                    </div>
                  </div>
                </div>
              </nav>
              {/* / Footer */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LayoutSinglePage