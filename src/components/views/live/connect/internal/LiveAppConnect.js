import React, { Component } from 'react'

import AuthFailedState from './states/AuthFailedState'
import FetchingState from './states/FetchingState'
import LiveApp from '../../main/LiveApp'

import GAMEASSETS_SOURCE_MAP from '../../core/Cache'
// import RotateDeviceWarning from '../../utilities/RotateDeviceWarning'

import {
  PROVIDER_TYPE_INTERNAL,
} from '../../core/ProviderTypes'

class LiveAppEntrypointInternal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
      data: null,
      isCaching: true,
      isFetching: true,
    }
  }

  async componentDidMount() {
    this.cacheImages(GAMEASSETS_SOURCE_MAP)
    await this.timeout(2500)
    this.setState({
      init: true,
      data: null,
      isFetching: false,
    })
  }

  cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise(function (resolve, reject) {
        const img = new Image()
        img.src = src
        img.onload = resolve()
        img.onerror = reject()
      })
    })
    await Promise.all(promises)
    this.setState({ isCaching: false })
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* LiveApp Connect Internal */}
        {(this.state.isCaching || this.state.isFetching)
          ? <FetchingState {...this.props} {...this.state} />
          : this.state.init
            ? <LiveApp {...this.props}
              providerId={PROVIDER_TYPE_INTERNAL} accessCode={'null'} />
            : <AuthFailedState {...this.props} {...this.state} />}
        {/* <RotateDeviceWarning /> */}
        {/* / LiveApp Connect Internal */}
      </>
    )
  }
}

export default LiveAppEntrypointInternal