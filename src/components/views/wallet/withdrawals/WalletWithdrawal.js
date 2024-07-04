import React, { Component } from 'react'
import { Button, Card, Col, Form, Media, Row } from 'react-bootstrap'

import WalletFooter from '../content/WalletFooterContent'
import WithdrawalFormAlphaPo from './forms/WithdrawalFormAlphaPo'
import WithdrawalFormPlaceholder from './forms/WithdrawalFormPlaceholder'
import WithdrawalFormRemitEx from './forms/WithdrawalFormRemitEx'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../../store/actions'

import {
  REQ_PROFILE_WALLET_GET,
} from '../../../../store/objects/actionTypes'

import '../../assets/css/views.css'

class WalletWithdrawals extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Withdrawals')

    this.handleChangeValidResponse = this.handleChangeValidResponse.bind(this)

    this.state = {
      init: true,
      methodSelected: false,
      selectedProvider: '',
      selectedIndex: null,
      providerType: null,
      validResponse: null,
    }

    this.methodOptions = [
      { index: 0, value: 'option1', label: 'VISA', provider: 'remitex', imagePath: 'r-select-visa.png', type: 'fiat', },
      { index: 1, value: 'option2', label: 'MasterCard', provider: 'remitex', imagePath: 'r-select-mastercard.png', type: 'fiat', },
      { index: 2, value: 'option3', label: 'Bitcoin', provider: 'alphapo', imagePath: 'r-select-bitcoin.png', type: 'crypto', },
    ]
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
        email: JSON.parse(localStorage.getItem('user')).user.email,
      })
      this.props.objectsRequestHandler(
        REQ_PROFILE_WALLET_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
          })
        })
    } else {
      this.props.history.push('/')
    }
  }

  handleChangeSelectProvider(option) {
    this.setState({
      methodSelected: true,
      selectedProvider: option.provider,
      selectedIndex: option.index,
      providerType: option.type,
    })
  }

  handleChangeValidResponse(status) {
    this.setState({
      validResponse: status,
    })
  }

  renderProviderForm() {
    if (this.state.selectedProvider === 'remitex') {
      return <WithdrawalFormRemitEx
        {...this.props} {...this.state} setValidResponse={this.handleChangeValidResponse} />
    } else if (this.state.selectedProvider === 'alphapo') {
      return <WithdrawalFormAlphaPo
        {...this.props} {...this.state} setValidResponse={this.handleChangeValidResponse} />
    } else {
      return <WithdrawalFormPlaceholder
        {...this.props} {...this.state} setValidResponse={this.handleChangeValidResponse} />
    }
  }

  renderWithdrawalStatus() {
    if (this.state.validResponse) {
      if (this.state.validResponse === 200) {
        return (
          <>
            <Card className="mb-4 shadow-none" style={{ borderRadius: "0px 0px 15px 15px", }}>
              <div className="container py-5">
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2} className="text-sm-left pt-0">
                      Transaction Status
                    </Form.Label>

                    <Col sm={10}>
                      <div className="row">
                        <div className="col-md-12 mb-2">
                          <span
                            className="d-block rounded ui-bordered p-4 cursor-pointer text-body">
                            <Media as={Col} md={12} lg={12} xl={12} className="py-0 mx-auto">
                              <span className="svg-icon svg-icon-muted svg-icon-2hx align-self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none">
                                  <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                  <path d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z" fill="white" />
                                </svg>
                              </span>

                              <Media.Body className="ml-5">
                                <h4 className="font-weight-bold mb-4">
                                  Withdrawal request sent successfully
                                </h4>
                                <div className="text-body mb-4">
                                  Your withdrawal request has just been successfully forwarded to our team. You can expect your request to be processed within the next 24 hours. As soon as your request has been processed, we will send you a confirmation email with a message about the status of your request. Thank you for playing with us!
                                </div>
                                <Button
                                  variant="outline-primary"
                                  onClick={() => {
                                    this.props.history.push('/wallet/transactions')
                                  }}>
                                  <i className="fas fa-credit-card mr-2"></i>
                                  <span>View Payments</span>
                                </Button>
                              </Media.Body>
                            </Media>
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </Card>
          </>
        )
      } else {
        return (
          <>
            <Card className="mb-4 shadow-none" style={{ borderRadius: "0px 0px 15px 15px", }}>
              <div className="container py-5">
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2} className="text-sm-left pt-0">
                      Transaction Status
                    </Form.Label>

                    <Col sm={10}>
                      <div className="row">
                        <div className="col-md-12 mb-2">
                          <span
                            className="d-block rounded ui-bordered p-4 cursor-pointer text-body">
                            <Media as={Col} md={12} lg={12} xl={12} className="py-0 mx-auto">
                              <span className="svg-icon svg-icon-muted svg-icon-2hx align-self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none">
                                  <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                  <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                                  <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                                </svg>
                              </span>

                              <Media.Body className="ml-5">
                                <h4 className="font-weight-bold mb-4">
                                  Withdrawal request unsuccessful
                                </h4>
                                <div className="text-body mb-4">
                                  Unfortunately, your withdrawal request could not be processed. If you think this is an error, please try again. Otherwise please contact our Customer Support Team. Our Customer Support Team can assist you in creating a withdrawal request.
                                </div>

                                <div>
                                  <Button
                                    variant="outline-success"
                                    onClick={() => {
                                      this.setState({
                                        validResponse: null,
                                      })
                                    }}>
                                    <i className="fas fa-sync-alt mr-2"></i>
                                    <span>Try Again</span>
                                  </Button>
                                  <Button
                                    variant="outline-primary ml-2"
                                    onClick={() => {
                                      this.props.history.push('/wallet/transactions')
                                    }}>
                                    <i className="fas fa-credit-card mr-2"></i>
                                    <span>View Payments</span>
                                  </Button>
                                </div>
                              </Media.Body>
                            </Media>
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </Card>
          </>
        )
      }
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={12} md={12} lg={12} xl={8}>

          {/* Header */}
          <div style={{
            borderRadius: "15px 15px 0px 0px",
            backgroundColor: "rgba(24,24,24,1)",
          }}>
            <div className="container"
              style={{
                backgroundColor: "rgba(24,24,24,1)",
                backgroundSize: "80%",
                backgroundPositionX: "right",
                backgroundPositionY: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${process.env.PUBLIC_URL}/img/packages/deficons/png/isometric/01.png)`,
              }}>
              <div className="d-flex justify-content-between align-items-center py-4">
                <div className="media align-items-center flex-grow-1">

                  {this.props.avatar
                    ? <img
                      src={`${this.props.avatar}`}
                      className="d-block ui-w-80 rounded-circle" alt="Avatar" />
                    : <img
                      src={`${process.env.PUBLIC_URL}/img/avatars/avatar-1.png`}
                      className="d-block ui-w-80 rounded-circle" alt="Avatar" />}

                  <div className="media-body ml-4">
                    <h4 className="font-weight-bold mb-1">
                      <span className="text-big">
                        Withdrawal
                      </span>
                    </h4>
                    <div className="text-muted small">
                      {this.state.email || 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-1">
                  <span className="btn btn-success rounded-pill">
                    <i className="fas fa-credit-card mr-2"></i>
                    <span
                      className="font-weight-bold cursor-pointer"
                      onClick={() => {
                        this.props.history.push('/wallet')
                      }}>
                      Wallet
                    </span>
                  </span>

                  <span className="btn btn-light rounded-pill ml-2">
                    <i className="fas fa-credit-card mr-2"></i>
                    <span
                      className="font-weight-bold cursor-pointer"
                      onClick={() => {
                        this.props.history.push('/wallet/transactions')
                      }}>
                      Payments
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <hr className="m-0" />

            <div className="container">
              <ul className="nav nav-tabs tabs-alt border-0">
                <li className="nav-item">
                  <span
                    className="nav-link py-3 font-weight-bold cursor-pointer"
                    onClick={() => {
                      this.props.history.push('/wallet/deposit')
                    }}>
                    Deposit
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link py-3 active font-weight-bold cursor-pointer"
                    onClick={() => {
                      this.props.history.push('/wallet/withdrawal')
                    }}>
                    Withdrawal
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link py-3 font-weight-bold cursor-pointer"
                    onClick={() => {
                      this.props.history.push('/wallet/notifications')
                    }}>
                    Notifications
                  </span>
                </li>
              </ul>
            </div>

            <hr className="m-0" />

          </div>
          {/* / Header */}

          {this.props.wallet && (
            <>
              {!this.state.validResponse
                ? <>
                  <Card className="mb-4 shadow-none" style={{ borderRadius: "0px 0px 15px 15px", }}>
                    <div className="container py-5">
                      <Form>
                        <Form.Group as={Row}>
                          <Form.Label column sm={2} className="text-sm-left pt-0">
                            Withdrawal Method
                          </Form.Label>

                          <Col sm={10}>
                            <div className="row">
                              <div className="col-md-6 mb-2">
                                <span
                                  className={`${this.state.selectedIndex === 0 ? 'border-secondary text-body bg-secondary' : 'text-body'} d-block rounded ui-bordered p-4 cursor-pointer`}
                                  onClick={() => { this.handleChangeSelectProvider(this.methodOptions[0]) }}>
                                  <div className="mb-2">
                                    <img
                                      src={`${process.env.PUBLIC_URL}/img/payment/r-select-1.png`}
                                      alt="Live Poker Studio™" className="mb-3" width="180" />
                                  </div>
                                  <span><strong>VISA/MasterCard</strong></span><br />
                                  <small className="text-body">No Transaction Fees</small>
                                </span>
                              </div>

                              <div className="col-md-6 mb-2">
                                <span
                                  className={`${this.state.selectedIndex === 2 ? 'border-secondary text-body bg-secondary' : 'text-body'} d-block rounded ui-bordered p-4 cursor-pointer`}
                                  onClick={() => { this.handleChangeSelectProvider(this.methodOptions[2]) }}>
                                  <div className="mb-2">
                                    <img
                                      src={`${process.env.PUBLIC_URL}/img/payment/r-select-2.png`}
                                      alt="Live Poker Studio™" className="mb-3" width="180" />
                                  </div>
                                  <span><strong>BTC/ETH</strong></span><br />
                                  <small className="text-body">Immediate Withdrawal</small>
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Form.Group>

                        {/* PSP Form */}
                        {this.renderProviderForm()}
                        {/* / PSP Form */}

                      </Form>
                    </div>
                  </Card>
                </>
                : <>

                  {/* Withdrawal Status */}
                  {this.renderWithdrawalStatus()}
                  {/* / Withdrawal Status */}

                </>}
            </>
          )}

          <hr className="border-light m-0" />

          {/* Wallet Footer */}
          <WalletFooter />
          {/* / Wallet Footer */}

        </Col>
      </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  avatar: state.objects.avatar,
  wallet: state.objects.profile.wallet,
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(WalletWithdrawals))