import React, { Component } from 'react'
import { Media } from 'react-bootstrap'

// import NavigationButton from '../modals/panel/NavigationButton'
// import QuickSettingsButton from '../modals/panel/QuickSettingsButton'
// import ReloadStreamButton from '../modals/panel/ReloadStreamButton'
import SFXAudioButton from '../modals/panel/SFXAudioButton'
import WebRTCAudioButton from '../modals/panel/WebRTCAudioButton'

import '../../../../vendor/styles/pages/chat.scss'
import '../../../../vendor/styles/pages/navigation.scss'

class DropdownMenuMobile extends Component {

  componentDidMount() {
    const container = document.getElementById('top-navigation-hcontainer-item')
    var elements = document.querySelectorAll('[id^="dropdown-menu-link"]')
    for (let i = 0; i < elements.length; i++) {
      switch (elements[i].id.slice(-1)) {
        case '1':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Player Volume')
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
            container.setAttribute('content-before', 'SFX Volume')
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
            container.setAttribute('content-before', 'Quick Settings')
          })
          elements[i].addEventListener('mouseleave', () => {
            container.style.opacity = 0
            container.style.transform = "translate(100px, 0px)"
          })
          break
        case '4':
          elements[i].addEventListener('mouseover', () => {
            container.style.opacity = 1
            container.style.transform = "translate(0px, 0px)"
            container.setAttribute('content-before', 'Navigation')
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
        {/* Dropdown Menu */}
        <div className="flex-grow-0">
          <div className="flex-grow-0 py-3">
            <Media
              className="align-items-right"
              style={{ justifyContent: "flex-end", }}>
              <div className="d-flex">

                {/* WebRTC Audio Button */}
                <WebRTCAudioButton
                  {...this.props} {...this.state}
                  change={this.props.change}
                />
                {/* / WebRTC Audio Button */}

                {/* SFX Audio Button */}
                <SFXAudioButton
                  {...this.props} {...this.state}
                  change={this.props.change}
                />
                {/* / SFX Audio Button */}
                

              </div>
            </Media>
          </div>
        </div>
        {/* / Dropdown Menu */}
      </>
    )
  }
}

export default DropdownMenuMobile
