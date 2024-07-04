import React, { Component } from 'react'

class EmergencyResetListener extends Component {

  constructor(props) {
    super(props)

    this.disconnectTimeout = null

    this.state = {
      dealer: false,
      emergency: false,
    }
  }

  componentDidMount() {
    this.setState({ dealer: this.props.game.dealer })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.dealer !== this.props.game.dealer) {
      this.setState({ dealer: this.props.game.dealer })
    }
    if (prevProps.game.status !== this.props.game.status) {
      try {
        if (this.props.game.status.code === "ER1") {
          if (this.state.dealer) return
          this.setState({ emergency: true }, () => {
            clearTimeout(this.disconnectTimeout)
            this.disconnectTimeout = setTimeout(() => {
              this.props.exit()
            }, 15000)
          })
        } else {
          this.setState({ emergency: false })
        }
      } catch { }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.disconnectTimeout)
  }

  render() {
    return (<></>)
  }
}

export default EmergencyResetListener
