import React, { Component } from 'react'
import API from '../../../../../api'

import AuthFailedState from './states/AuthFailedState'
import FetchingState from './states/FetchingState'
import LiveApp from '../../main/LiveApp'

import GAMEASSETS_SOURCE_MAP from '../../core/Cache'
// import RotateDeviceWarning from '../../utilities/RotateDeviceWarning'

import {
  PROVIDER_TYPE_EXTERNAL,
} from '../../core/ProviderTypes'

class LiveAppEntrypointExternal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
      data: null,
      isCaching: true,
      isFetching: true,
      token: null,
    }
  }

  async componentDidMount() {
    this.cacheImages(GAMEASSETS_SOURCE_MAP)
    await API.post(
      `auth/2/external/login/`, {
      token: this.props.match.params.token,
    }).then(res => {
      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('token', res.data.token)
      }
      this.initialize(res, 2500)
    }).catch(err => {
      this.setState({
        init: false,
        data: null,
        isFetching: false,
      })
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

  initialize(response, ms) {
    return new Promise(resolve => setTimeout(() => {
      this.setState({
        init: response.status === 200
          ? true
          : false,
        data: response.status === 200
          ? response.data
          : null,
        isFetching: false,
        token: response.status === 200
          ? response.data.token
          : null,
      }, () => {
        resolve()
      })
    }, ms))
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* LiveApp Connect External */}
        {(this.state.isCaching || this.state.isFetching)
          ? <FetchingState {...this.props} {...this.state} />
          : this.state.init
            ? <LiveApp {...this.props}
              providerId={PROVIDER_TYPE_EXTERNAL} accessCode={this.state.token} />
            : <AuthFailedState {...this.props} {...this.state} />}
        {/* <RotateDeviceWarning /> */}
        {/* / LiveApp Connect External */}
      </>
    )
  }
}

export default LiveAppEntrypointExternal