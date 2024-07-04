import React, { Component } from 'react'

import WalletToolbar from '../toolbar/WalletToolbar'
import WalletProvider from '../provider/WalletProvider'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../../store/actions'

import '../../assets/css/views.css'

class WalletView extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Wallet Management')

    this.state = {
      init: true,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>

        {/* Wallet Toolbar */}
        <WalletToolbar
          {...this.props} {...this.state} />
        {/* / Wallet Toolbar */}

        {/* Wallet Overview */}
        <WalletProvider
          {...this.props} {...this.state} />
        {/* / Wallet Overview */}

      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(WalletView))