import React, { Component } from 'react'
import API from '../../../../../api'

import AuthFailedState from './states/AuthFailedState'
import FetchingState from './states/FetchingState'
import LiveApp from '../../main/LiveApp'

import GAMEASSETS_SOURCE_MAP from '../../core/Cache'
// import RotateDeviceWarning from '../../utilities/RotateDeviceWarning'

import {
  PROVIDER_TYPE_EVERYMATRIX,
} from '../../core/ProviderTypes'

class LiveAppEntrypointEveryMatrix extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
      data: null,
      isCaching: true,
      isFetching: true,
      provider: null,
      token: null,
    }
  }

  async componentDidMount() {

    this.cacheImages(GAMEASSETS_SOURCE_MAP)

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    })

    await API.post(
      `auth/2/everymatrix/login/`, {
      provider: 'everymatrix',
      token: params.token
        ? params.token
        : this.props.match.params.token,
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
        provider: null,
        token: null,
      })
    })
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
        provider: response.status === 200
          ? response.data.params.provider
          : null,
        token: response.status === 200
          ? response.data.params.token
          : null,
      }, () => {
        resolve()
      })
    }, ms))
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

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* LiveApp Connect EveryMatrix */}
        {(this.state.isCaching || this.state.isFetching)
          ? <FetchingState {...this.props} {...this.state} />
          : this.state.init
            ? <LiveApp {...this.props}
              providerId={PROVIDER_TYPE_EVERYMATRIX} accessCode={this.state.token} />
            : <AuthFailedState {...this.props} {...this.state} />}
        {/* <RotateDeviceWarning /> */}
        {/* / LiveApp Connect EveryMatrix */}
      </>
    )
  }
}

export default LiveAppEntrypointEveryMatrix