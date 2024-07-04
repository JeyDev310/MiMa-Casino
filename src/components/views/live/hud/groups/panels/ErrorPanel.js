import React, { Component } from 'react'

import AuthError from '../../../partials/AuthError'
import AuthExit from '../../../partials/AuthExit'
import AuthReset from '../../../partials/AuthReset'

class ErrorPanel extends Component {

  render() {
    return (
      <>
        {/* Error Panel */}

        {this.props.isExited
          ? this.props.isError
            ? <AuthReset {...this.props} {...this.state} />
            : <AuthExit {...this.props} {...this.state} />
          : <AuthError {...this.props} {...this.state} />}

        {/* / Error Panel */}
      </>
    )
  }
}

export default ErrorPanel