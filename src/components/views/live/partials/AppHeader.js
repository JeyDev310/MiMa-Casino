import React, { Component } from 'react'
import { Media } from 'react-bootstrap'

import NetworkStatusIndicator from '../modals/panel/NetworkStatusIndicator'
import ReloadStreamButton from '../modals/panel/ReloadStreamButton'
import TopNavigationHover from '../modals/panel/TopNavigationHover'

import '../../../../vendor/styles/pages/chat.scss'

class AppHeader extends Component {

  componentDidMount() {
    const container = document.getElementById('top-navigation-hcontainer-item')
    var elements = document.querySelectorAll('[id^="app-header-link"]')
    for (let i = 0; i < elements.length; i++) {
      switch (elements[i].id.slice(-1)) {
        case '1':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Exit Game')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '2':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Reload Stream')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '3':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'You are offline')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        default:
          break
      }
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* App Header */}
        <div className="py-3 d-none">
          <Media className="align-items-center">
            <div className="d-flex">

              <div style={{ height: "38.05px", }}></div>

              {/* Brand Logo */}
              {/* {false && (
                <>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                    className="ui-w-100 cursor-pointer"
                    alt="Live Poker Studio™"
                    onClick={() => this.props.open(2)}
                  />
                </>
              )} */}
              {/* / Brand Logo */}

              {/* Home Button */}
              {/* {false && (
                <>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip
                        className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                        Exit Game
                      </Tooltip>
                    }>
                    <Button
                      id="app-header-link-1"
                      size="md"
                      variant="widget5 rounded-pill icon-btn ml-3 mr-1"
                      onClick={() => this.props.open(2)}>
                      <ExitIcon />
                    </Button>
                  </OverlayTrigger>
                </>
              )} */}
              {/* / Home Button */}

              {/* FullScreen Button */}
              {/* {false && (
                <>
                  <FullScreenButton
                    {...this.props}
                    topNav={false}
                    enabled={this.props.fsEnabled}
                    enter={this.props.fsEnter}
                    exit={this.props.fsExit}
                  />
                </>
              )} */}
              {/* / FullScreen Button */}

              {/* Reload Stream Button */}
              <ReloadStreamButton
                {...this.props} change={this.props.change}
              />
              {/* / Reload Stream Button */}

              {/* Network Status Indicator */}
              <NetworkStatusIndicator
                {...this.props} change={this.props.change}
              />
              {/* / Network Status Indicator */}

              {/* Top Navigation Hover */}
              <TopNavigationHover />
              {/* / Top Navigation Hover */}

            </div>
          </Media>
        </div>
        {/* / App Header */}
      </>
    )
  }
}

export default AppHeader
