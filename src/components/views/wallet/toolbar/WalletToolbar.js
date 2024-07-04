import React, { Component } from 'react'
import { Badge, Button } from 'react-bootstrap'

import '../../assets/css/views.css'
import '../../../../vendor/styles/pages/products.scss'

class WalletToolbar extends Component {

  constructor(props) {
    super(props)

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
        <span className="d-flex align-items-center justify-content-between">
          <span className="d-flex align-items-center">
            <span className="d-flex align-items-center mb-3 mr-3">
              <h5 className="font-weight-bold py-2 mb-0 d-flex justify-content-between align-items-center">
                <span>Wallet</span>
                <span className="my-0">
                  <Badge
                    pill variant="danger"
                    className="text-small font-weight-bold ml-2">
                    Beta
                  </Badge>
                </span>
              </h5>
            </span>

            <Button
              variant="light rounded-pill"
              className="mb-3 mr-2"
              onClick={() => {
                this.props.history.push('/wallet/overview')
              }}>
              <span className="fas fa-circle-notch text-danger mr-2"></span>
              <span>Overview</span>
            </Button>

            <Button
              variant="light rounded-pill"
              className="mb-3"
              onClick={() => {
                this.props.history.push('/wallet/transactions')
              }}>
              <span className="fas fa-eye text-danger mr-2"></span>
              <span>View Transactions</span>
            </Button>
          </span>

          <span>
            <Button
              variant="light rounded-pill"
              className="mb-3"
              onClick={this.prevent}>
              <span className="ion ion-md-refresh text-danger mr-2"></span>
              <span>Refresh</span>
            </Button>
          </span>
        </span>
      </div >
    )
  }
}

export default WalletToolbar