import React, { Component } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

import * as numeral from 'numeral'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../../../store/actions'

import '../../../assets/css/views.css'

class DepositFormPlaceholder extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: true,
    }
  }

  formatPrice(p) {
    return numeral(p).format('$0,0.00')
  }

  showToastify(message, type) {
    toast(message, {
      type: type,
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        <Form.Group as={Row}>
          <Form.Label column sm={2} className="text-sm-left pt-0">
            Live Deposit
          </Form.Label>

          <Col sm={10}>
            <Row>
              <Col md={6} className="mb-1">
                <div className="text-muted small mb-1">
                  Total Balance
                </div>
                <span className="font-weight-bold h5">
                  {this.formatPrice(this.props.wallet.live_deposit)}
                </span>
              </Col>

              <Col md={6} className="mb-1">
                <div className="text-muted small mb-1">
                  Updated Balance
                </div>
                <span className="font-weight-bold h5">
                  {this.state.projectedBalance
                    ? this.formatPrice(this.state.projectedBalance)
                    : this.formatPrice(this.props.wallet.live_deposit)}
                </span>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-2">
          <Form.Label column sm={2} className="text-sm-left pt-0">
            Deposit Amount
          </Form.Label>

          <Col sm={10}>
            <div className="text-muted small mb-1">
              Payment Method
            </div>

            <div className="text-left text-white opacity-100 font-weight-bold h5 mb-5">
              Please select a payment method to proceed with the deposit.
            </div>

            <div className="text-left text-left text-white opacity-50 text-tiny mt-0 mb-0 w-100">
              Some <a href="#d" onClick={this.prevent}>account and system information</a> may be sent to Live Poker Studio™. We will use it to fix problems and improve our services, subject to our <a href="#d" target="_blank" onClick={this.prevent}>Privacy Policy</a> and <a href="#d" target="_blank" onClick={this.prevent}>Terms of Service</a>. We may email you for more information or updates. Go to <a href="#d" target="_blank" onClick={this.prevent}>Legal Help</a> to ask for content changes for legal reasons. Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
            </div>
          </Col>
        </Form.Group>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(DepositFormPlaceholder))