import React, { Component } from 'react'
import API from '../../../../api'

class DemoUsageTimer extends Component {

  constructor(props) {
    super(props)

    this.refetchTimer = null

    this.state = {
      dealer: false,
      demo: false,
      refetchInterval: 120000,
      demoUsage: 0,
      demoExpired: false,
      demoException: false,
    }

    this.refetchTimer = setInterval(() => this.refetch(), this.state.refetchInterval)
  }

  componentDidMount() {
    this.setState({ dealer: this.props.game.dealer })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.dealer !== this.props.game.dealer) {
      this.setState({ dealer: this.props.game.dealer })
    }
    if (prevProps.game.data !== this.props.game.data) {
      if (prevProps.game.data.demo_mode !== this.props.game.data.demo_mode) {
        this.setState({ demo: this.props.game.data.demo_mode }, () => {
          this.check()
        })
      }
    }
  }

  componentWillUnmount() {
    this.unmounted = true
    clearInterval(this.refetchTimer)
    this.refetchTimer = null
  }

  async check() {
    try {
      if (this.unmounted) return
      if (this.state.dealer) return
      if (this.state.demoException) return
      if (this.state.demo) {
        let fd = new FormData()
        fd.append('params', JSON.stringify({}))
        await API.post(
          `access/public/check/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
        }).then(res => {
          if (res.status === 200) {
            this.setState({
              demoUsage: res.data.demo_usage,
              demoExpired: res.data.demo_expired,
              demoException: res.data.demo_exception,
            }, () => {
              if (this.state.demoException) return
              if (this.state.demoExpired && !this.state.demoException) {
                setTimeout(() => {
                  if (!this.state.dealer && this.state.demo) {
                    this.props.timeout()
                    clearInterval(this.refetchTimer)
                    this.refetchTimer = null
                  }
                }, 2500)
              }
            })
          }
        }).catch((err) => { })
      }
    } catch { }
  }

  async refetch() {
    try {
      if (this.unmounted) return
      if (this.state.dealer) return
      if (this.state.demoException) return
      if (this.state.demo) {
        let fd = new FormData()
        fd.append('params', JSON.stringify({}))
        await API.post(
          `access/public/update/`, fd, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
            'content-type': 'multipart/form-data',
          },
        }).then(res => {
          if (res.status === 200) {
            this.setState({
              demoUsage: res.data.demo_usage,
              demoExpired: res.data.demo_expired,
              demoException: res.data.demo_exception,
            }, () => {
              if (this.state.demoException) return
              if (this.state.demoExpired && !this.state.demoException) {
                setTimeout(() => {
                  if (!this.state.dealer && this.state.demo) {
                    this.props.open(16)
                    clearInterval(this.refetchTimer)
                    this.refetchTimer = null
                  }
                }, 2500)
                setTimeout(() => {
                  if (!this.state.dealer && this.state.demo) {
                    this.props.timeout()
                    clearInterval(this.refetchTimer)
                    this.refetchTimer = null
                  }
                }, 2500)
              }
            })
          }
        }).catch((err) => { })
      }
    } catch { }
  }

  render() {
    return (
      <></>
    )
  }
}

export default DemoUsageTimer
