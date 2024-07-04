import React, { Component } from 'react'
import { Card, Col, Form, Button, Row } from 'react-bootstrap'

import * as numeral from 'numeral'
import ResourceLoaderQ from '../../utilities/loaders/ResourceLoaderQ'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../../store/actions'

import '../../assets/css/views.css'
import '../../../../vendor/styles/pages/authentication.scss'

class WalletPaymentStatus extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Payment Status')

    this.evaluateActiveRoute = this.evaluateActiveRoute.bind(this)

    this.state = {
      init: false,
      isFetching: true,
      data: [],
      response: null,
      status: null,
      statusCode: null,
    }
  }

  evaluateActiveRoute() {
    if (!localStorage.getItem('token')) {
      this.props.history.push("/login")
    }
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
        email: JSON.parse(localStorage.getItem('user')).user.email,
      })
      this.props.objectsRequestHandler(
        'REQ_COMMERCE_TRANSACTION_READ_INSTANCE', {
        id: String(this.props.match.params.uuid),
      }, this.props.history)
        .then((res) => {
          this.setState({
            init: true,
            isFetching: false,
            data: this.props.transaction,
            response: res.data,
            status: res.data.status,
            statusCode: res.status,
          })
        }).catch(() => {
          this.setState({
            init: true,
            isFetching: false,
            data: [],
            response: null,
            status: null,
            statusCode: null,
          })
        })
    } else {
      this.props.history.push('/')
    }
  }

  onRenderPaymentStatusText() {
    if (this.state.status === 'success') {
      return ('Your transaction was successful!')
    } else if (this.state.status === 'in_progress') {
      return ('Your transaction is being processed...')
    } else if (this.state.status === 'failed') {
      return ('Sorry, your transaction failed!')
    } else {
      return ('Transaction status unknown.')
    }
  }

  onRenderPaymentStatusIcon() {
    if (this.state.status === 'success') {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none">
            <path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="white" />
            <path d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z" fill="white" />
          </svg>
        </span>
      )
    } else if (this.state.status === 'in_progress') {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none">
            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="4" fill="white" />
            <rect x="11" y="11" width="2.6" height="2.6" rx="1.3" fill="white" />
            <rect x="15" y="11" width="2.6" height="2.6" rx="1.3" fill="white" />
            <rect x="7" y="11" width="2.6" height="2.6" rx="1.3" fill="white" />
          </svg>
        </span>
      )
    } else if (this.state.status === 'failed') {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none">
            <path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="white" />
            <rect x="9" y="13.0283" width="7.3536" height="1.2256" rx="0.6128" transform="rotate(-45 9 13.0283)" fill="white" />
            <rect x="9.86664" y="7.93359" width="7.3536" height="1.2256" rx="0.6128" transform="rotate(45 9.86664 7.93359)" fill="white" />
          </svg>
        </span>
      )
    } else {
      return (
        <span className="svg-icon svg-icon-muted svg-icon-2hx">
          <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none">
            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
            <path d="M11.276 13.654C11.276 13.2713 11.3367 12.9447 11.458 12.674C11.5887 12.394 11.738 12.1653 11.906 11.988C12.0833 11.8107 12.3167 11.61 12.606 11.386C12.942 11.1247 13.1893 10.896 13.348 10.7C13.5067 10.4947 13.586 10.2427 13.586 9.944C13.586 9.636 13.4833 9.356 13.278 9.104C13.082 8.84267 12.69 8.712 12.102 8.712C11.486 8.712 11.066 8.866 10.842 9.174C10.6273 9.482 10.52 9.82267 10.52 10.196L10.534 10.574H8.826C8.78867 10.3967 8.77 10.2333 8.77 10.084C8.77 9.552 8.90067 9.07133 9.162 8.642C9.42333 8.20333 9.81067 7.858 10.324 7.606C10.8467 7.354 11.4813 7.228 12.228 7.228C13.1987 7.228 13.9687 7.44733 14.538 7.886C15.1073 8.31533 15.392 8.92667 15.392 9.72C15.392 10.168 15.322 10.5507 15.182 10.868C15.042 11.1853 14.874 11.442 14.678 11.638C14.482 11.834 14.2253 12.0533 13.908 12.296C13.544 12.576 13.2733 12.8233 13.096 13.038C12.928 13.2527 12.844 13.528 12.844 13.864V14.326H11.276V13.654ZM11.192 15.222H12.928V17H11.192V15.222Z" fill="white" />
          </svg>
        </span>
      )
    }
  }

  onRenderPaymentTransactionID() {
    if (this.state.status !== null) {
      return String(this.props.match.params.uuid)
    } else {
      return ('N/A')
    }
  }

  formatPrice(p) {
    return numeral(p).format('$0,0.00')
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div
        className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4"
        style={{
          backgroundImage:
            `url('${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935526-0006.jpg')`,
        }}>
        <div className="ui-bg-overlay bg-dark opacity-25"></div>
        <div className="authentication-inner py-5">
          <Card>
            <div className="p-4 p-sm-5">

              {/* Logo */}
              <div className="d-flex justify-content-start align-items-center">
                <div style={{ width: "160px", }}>
                  <div className="w-100 position-relative" style={{ paddingBottom: '10%' }}>
                    <Link to='/'>
                      <img
                        src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                        alt="Live Poker Studio™" className="d-block" style={{ width: "160px", }} />
                    </Link>
                  </div>
                </div>
              </div>
              {/* / Logo */}

              {!this.state.isFetching
                ? <>
                  <h6 className="text-left text-muted font-weight-normal mt-2 mb-4">
                    {this.onRenderPaymentStatusText()}
                  </h6>

                  {/* Form */}
                  <form>

                    {this.state.response && (
                      <Form.Group>
                        <Row className="w-100">
                          <Col md={6} className="d-flex align-items-center justify-content-start mb-1">
                            <div className="ml-0">
                              <div className="text-muted small line-height-1 mb-0">
                                Amount
                              </div>
                              <div className="font-weight-bold">
                                {this.formatPrice(this.state.response.amount)}
                              </div>
                            </div>
                          </Col>
                          <Col md={6} className="d-flex align-items-center justify-content-start mb-1">
                            <div className="ml-0">
                              <div className="text-muted small line-height-1 mb-0">
                                IP address
                              </div>
                              <div className="font-weight-bold">
                                {this.state.response.customer_ip_address}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Form.Group>
                    )}

                    <Form.Group className="d-flex align-items-center justify-content-center">
                      <div className="py-4">
                        {this.onRenderPaymentStatusIcon()}
                      </div>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center m-0 mb-2">
                      <Button
                        block
                        variant="instagram"
                        className="font-weight-bold"
                        onClick={() => {
                          this.props.history.push('/wallet/transactions')
                        }}>
                        <span className="fas fa-credit-card text-body mr-2"></span>
                        <span className="font-weight-bold">
                          View Payments
                        </span>
                      </Button>
                    </div>

                    {this.state.status === 'success'
                      ? <div className="d-flex justify-content-between align-items-center mb-0">
                        <Button
                          block
                          variant="light"
                          className="font-weight-bold"
                          onClick={() => {
                            this.props.history.push('/games')
                          }}>
                          <span className="fas fa-play-circle text-body mr-2"></span>
                          <span className="font-weight-bold">
                            Live Games
                          </span>
                        </Button>
                      </div>
                      : <div className="d-flex justify-content-between align-items-center mb-0">
                        <Button
                          block
                          variant="light"
                          className="font-weight-bold"
                          onClick={() => {
                            this.props.history.push('/wallet')
                          }}>
                          <span className="fas fa-piggy-bank text-body mr-2"></span>
                          <span className="font-weight-bold">
                            Wallet
                          </span>
                        </Button>
                      </div>}

                  </form>
                  {/* / Form */}
                </>
                : <>
                  <Card className="d-flex bg-transparent w-100 mb-2 border-0 shadow-none mt-4">
                    <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                      <Col
                        sm={12} md={12} lg={12}
                        className="d-flex align-items-center border-0 shadow-none p-4"
                        style={{ justifyContent: "center", }}>
                        <ResourceLoaderQ
                          height="6rem" width="6rem" />
                      </Col>
                    </Row>
                  </Card>

                  <div className="text-center text-white opacity-100 mb-0">
                    Processing...
                  </div>

                  <div className="text-center text-white opacity-50 text-tiny mt-4 mb-0">
                    Some <a href="#d" onClick={this.prevent}>account and system information</a> may be sent to Live Poker Studio™. We will use it to fix problems and improve our services, subject to our <a href="#d" target="_blank" onClick={this.prevent}>Privacy Policy</a> and <a href="#d" target="_blank" onClick={this.prevent}>Terms of Service</a>.
                  </div>
                </>}

            </div>
            <Card.Footer className="py-3 px-0 px-sm-0">
              <div className="text-center text-muted small">
                Transaction ID <a href="#d" onClick={this.prevent}>
                  {this.onRenderPaymentTransactionID()}
                </a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.objects.error,
  transaction: state.objects.commerce.transactions.selected,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(WalletPaymentStatus))