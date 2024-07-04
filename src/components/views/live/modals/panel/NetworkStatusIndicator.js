import React, { Component } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

import {
  NetworkOnlineIcon,
  NetworkOfflineIcon,
} from '../../icons/Network'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/navigation.scss'

class NetworkStatusIndicator extends Component {

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
    })
  }

  onNetworkStatusMessageOffline() {
    this.setState({
      show: true,
      online: false,
    }, () => {
      this.forceUpdate()
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Network Status Indicator */}
        {this.state.show && !this.state.online && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip
                className={`${!this.props.settings.optionD13 && 'd-none'} tooltip-dark font-weight-bold`}>
                You are currently not online
              </Tooltip>
            }>
            <Button
              id="app-header-link-3"
              size="md"
              className="ml-1"
              variant="widget5 icon-btn rounded-pill md-btn-flat hide-arrow"
              onClick={(e) => { this.prevent(e) }}>
              {this.state.online ? <NetworkOnlineIcon /> : <NetworkOfflineIcon />}
            </Button>
          </OverlayTrigger>
        )}
        {/* / Network Status Indicator */}
      </>
    )
  }
}

export default NetworkStatusIndicator