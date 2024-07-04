import React, { Component } from 'react'

class AuthenticationProvider extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
      isAuthenticated: false,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (<>
      {this.props.children}
    </>)
  }
}

export default AuthenticationProvider