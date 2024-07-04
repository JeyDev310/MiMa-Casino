import React, { Component } from 'react'

import AuthLoader from '../../../partials/AuthLoader'

class LoadingPanel extends Component {

  render() {
    return (
      <>
        {/* Loading Panel */}

        <AuthLoader {...this.props} {...this.state} />

        {/* / Loading Panel */}
      </>
    )
  }
}

export default LoadingPanel