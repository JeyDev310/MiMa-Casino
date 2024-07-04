import React, { Component } from 'react'
import { Badge } from 'react-bootstrap'
import AuthFooter from '../../../partials/AuthFooter'

import '../../../../../../vendor/styles/pages/authentication.scss'
import '../../../../../../vendor/styles/pages/chat.scss'
import '../../../../../../vendor/styles/pages/profile.scss'

class InternalErrorState extends Component {

  render() {
    return (
      <>
        {/* LiveApp Connect Internal Internal Error State */}
        <div className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" style={{ backgroundColor: "rgba(0,0,0,0.5)", }}>
          <div className="ava ava_online avatar-bet-timer-border-animation ava_online_orange auth-loader-layout-s2" style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) scale(2.5)",
            pointerEvents: "none",
            filter: "drop-shadow(0px 0px 10px rgb(0, 0, 0))",
          }}>
            <img
              src={`${process.env.PUBLIC_URL}/img/logos/connect/logo-live-8-256x256.jpg`}
              className="ava__pic avatar-bet-timer-scale-animation" alt="Connect"
            />
          </div>

          <nav className="footer bg-transparent" style={{
            position: "fixed",
            left: "50%",
            bottom: "0px",
            transform: "translate(-50%, -25%)",
            margin: "0 0 0 0px !important",
            padding: "0 0 0 0px !important",
          }}>
            <div className="text-light font-weight-semibold line-height-1 mt-5 mb-2 text-center">
              <Badge
                pill variant="default"
                className="font-weight-bold p-3 cursor-pointer"
                id="connect-panel-status-s1">
                <i className="fas fa-info-circle text-danger mr-2"></i>
                <span>INTERNAL ERROR</span>
              </Badge>
            </div>

            <AuthFooter />
          </nav>
        </div>
        {/* / LiveApp Connect Internal Internal Error State */}
      </>
    )
  }
}

export default InternalErrorState