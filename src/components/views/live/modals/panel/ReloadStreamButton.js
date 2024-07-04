import React, { Component } from 'react'
import { Button, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import RefreshIcon from '../../icons/Refresh'

import '../../../../../vendor/styles/pages/chat.scss'

class ReloadStreamButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
      show: false,
      fetching: false,
      emergency: false,
    }
  }

  componentDidMount() {
    if (this.props.settings.optionE1) {
      this.setState({
        init: this.props.settings.optionE1,
      }, () => {
        const container = document.getElementById('top-navigation-hcontainer-item')
        var elements = document.querySelectorAll('[id^="app-header-link"]')
        for (let i = 0; i < elements.length; i++) {
          switch (elements[i].id.slice(-1)) {
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
            default:
              break
          }
        }
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.optionE1 !== this.props.settings.optionE1) {
      this.setState({ init: this.props.settings.optionE1 })
    }
    if (prevProps.game.status !== this.props.game.status) {
      try {
        if (this.props.game.status.code === "ER1") {
          this.setState({ emergency: true })
        } else {
          this.setState({ emergency: false })
        }
      } catch { }
    }
  }

  onHandleToggle() {
    this.setState({ show: !this.state.show })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.state.init && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip
                className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                Reload Stream
              </Tooltip>
            }>
            <Dropdown
              style={{ display: 'initial', }}>
              <Dropdown.Toggle
                id="app-header-link-2"
                size="md"
                className="ml-0 mr-1"
                variant="widget5 icon-btn rounded-pill md-btn-flat hide-arrow"
                onToggle={this.onHandleToggle}>
                <RefreshIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu
                show={this.state.show}
                className="py-2 border-0 shadow-none mt-1"
                style={{
                  backgroundColor: "rgba(28, 28, 28, 0.9)",
                  textShadow: "0 0 2px rgba(0,0,0,0.5)",
                  borderRadius: "10px",
                  minWidth: "14rem",
                }}>
                <Dropdown.Header className="px-4 mt-2">
                  Stream Controls
                </Dropdown.Header>

                <Dropdown.Item
                  as={Button}
                  variant="default"
                  className="px-4 mt-0"
                  disabled={this.state.emergency}
                  onClick={() => this.props.change('optionE4', String(Math.random().toString(6).substr(2, 12)))}>
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <i className="fas fa-redo" />
                      <span className="font-weight-bold ml-3" style={{ fontSize: "14px", }}>
                        Reload Stream
                      </span>
                    </span>
                  </span>
                </Dropdown.Item>

                <Dropdown.Item
                  as={Button}
                  variant="default"
                  className="px-4 mt-0"
                  disabled={this.state.emergency}
                  onClick={() => this.props.change('optionE5', 0)}>
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <i className="fas fa-table" />
                      <span className="font-weight-bold ml-3" style={{ fontSize: "14px", }}>
                        Auto Quality
                      </span>
                    </span>
                    <span className="small">
                      {this.props.settings.optionE5 === 0 && (
                        <i className="fas fa-check"></i>
                      )}
                    </span>
                  </span>
                </Dropdown.Item>

                <Dropdown.Item
                  as={Button}
                  variant="default"
                  className="px-4 mt-0"
                  disabled={true}
                  onClick={() => this.props.change('optionE5', 1)}>
                  <span className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center">
                      <i className="fas fa-compress" />
                      <span className="font-weight-bold ml-3" style={{ fontSize: "14px", }}>
                        1080p
                        <sup className="text-primary">HD</sup>
                      </span>
                    </span>
                    <span className="small">
                      {this.props.settings.optionE5 === 0 && (
                        <i className="fas fa-check"></i>
                      )}
                    </span>
                  </span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </OverlayTrigger>
        )}
      </>
    )
  }
}

export default ReloadStreamButton
