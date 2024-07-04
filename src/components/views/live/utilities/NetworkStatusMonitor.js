import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'

import {
  MSG_STATUS_CLIENT_ONLINE,
  MSG_STATUS_CLIENT_OFFLINE,
} from '../msg/Status'

import '../../../../vendor/styles/pages/live.scss'
import '../../../../vendor/styles/pages/network.scss'

class NetworkStatusMonitor extends Component {

  constructor(props) {
    super(props)

    this.onNetworkStatusMessageOnline = this.onNetworkStatusMessageOnline.bind(this)
    this.onNetworkStatusMessageOffline = this.onNetworkStatusMessageOffline.bind(this)

    this.state = {
      show: false,
      dealer: false,
      online: navigator.onLine,
    }

    window.addEventListener('online', this.onNetworkStatusMessageOnline, true)
    window.addEventListener('offline', this.onNetworkStatusMessageOffline, true)
  }

  componentDidMount() {
    this.setState({ dealer: this.props.game.dealer })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.dealer !== this.props.game.dealer) {
      this.setState({ dealer: this.props.game.dealer })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.onNetworkStatusMessageOnline, true)
    window.removeEventListener('offline', this.onNetworkStatusMessageOffline, true)
  }

  onNetworkStatusMessageOnline() {
    this.setState({
      show: true,
      online: true,
    }, () => {
      this.forceUpdate()
      this.onNotifyStatusMessage(MSG_STATUS_CLIENT_ONLINE, "success")
    })
  }

  onNetworkStatusMessageOffline() {
    this.setState({
      show: true,
      online: false,
    }, () => {
      this.forceUpdate()
      this.onNotifyStatusMessage(MSG_STATUS_CLIENT_OFFLINE, "error")
    })
  }

  onNotifyStatusMessage(message, type) {
    switch (type) {
      case "success":
        toast.success(message, {
          className: 'font-weight-bold cursor-pointer',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            zIndex: '99999',
          },
        })
        break
      case "error":
        toast.error(message, {
          className: 'font-weight-bold cursor-pointer',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            zIndex: '99999',
          },
        })
        break
      default:
        toast(message, {
          className: 'font-weight-bold cursor-pointer',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            zIndex: '99999',
          },
        })
        break
    }
  }

  render() {
    return (
      <>
        {this.state.show && this.state.online && (
          <Card.Body
            style={{
              display: "grid",
              alignContent: "center",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              position: "absolute",
              filter: `brightness(1)`,
            }}
            className="network-monitor-online-animation">
            <Card className="d-flex w-100 mb-0 bg-transparent border-0 shadow-none">
              <div className="d-flex align-items-center justify-content-center mb-5">
                <span className="game__action cursor-pointer nav_link__container nav_link__item nav_link__item__active network-monitor-icon-wifi-animation pl-1">
                  <svg className="icon network-monitor-icon-wifi icon__success">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-wifi`}></use>
                  </svg>
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-center network-monitor-subtitle-text mt-2">
                Reconnected
              </div>
            </Card>
          </Card.Body>
        )}

        {this.state.show && !this.state.online && (
          <Card.Body
            style={{
              display: "grid",
              alignContent: "center",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              position: "absolute",
              filter: `brightness(1)`,
            }}
            className="network-monitor-offline-animation">
            <Card className="d-flex w-100 mb-0 bg-transparent border-0 shadow-none">
              <div className="d-flex align-items-center justify-content-center mb-5">
                <span className="game__action cursor-pointer nav_link__container nav_link__item nav_link__item__active network-monitor-icon-wifi-animation pl-1">
                  <svg className="icon network-monitor-icon-wifi icon__success">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-wifi`}></use>
                  </svg>
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-center network-monitor-subtitle-text mt-2">
                Lost Connection
              </div>
            </Card>
          </Card.Body>
        )}

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            success: {
              duration: 5000,
            },
          }}
        />
      </>
    )
  }
}

export default NetworkStatusMonitor