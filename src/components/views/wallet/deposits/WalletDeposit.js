import React, { Component } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import WalletFooter from '../content/WalletFooterContent'
import DepositFormAlphaPo from './forms/DepositFormAlphaPo'
import DepositFormRemitEx from './forms/DepositFormRemitEx'
import DepositFormPlaceholder from './forms/DepositFormPlaceholder'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../../store/actions'

import {
  REQ_PROFILE_WALLET_GET,
} from '../../../../store/objects/actionTypes'

import '../../assets/css/views.css'
import '../../../../vendor/libs/react-toastify/react-toastify.scss'

const CloseButton = ({ closeToast }) => (
  <button className="Toastify__close-button" type="button" aria-label="close"
    onClick={closeToast}>&times;</button>
)

class WalletDeposits extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Deposit')

    this.state = {
      init: true,
      methodSelected: false,
      selectedProvider: '',
      selectedIndex: null,
      providerType: null,
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

  renderProviderForm() {
    if (this.state.selectedProvider === 'remitex') {
      return <DepositFormRemitEx {...this.props} {...this.state} showToast={this.showToastify} />
    } else if (this.state.selectedProvider === 'alphapo') {
      return <DepositFormAlphaPo {...this.props} {...this.state} showToast={this.showToastify} />
    } else {
      return <DepositFormPlaceholder {...this.props} {...this.state} showToast={this.showToastify} />
    }
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
                        Deposit
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
                    className="nav-link py-3 active font-weight-bold cursor-pointer"
                    onClick={() => {
                      this.props.history.push('/wallet/deposit')
                    }}>
                    Deposit
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link py-3 font-weight-bold cursor-pointer"
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
            <Card className="mb-4 shadow-none" style={{ borderRadius: "0px 0px 15px 15px", }}>
              <div className="container py-5">
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2} className="text-sm-left pt-0">
                      Payment Method
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
                            <small className="text-body">Immediate Deposit & No Transaction Fees</small>
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
                            <small className="text-body">Immediate Deposit</small>
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Form.Group>

                  {this.renderProviderForm()}

                </Form>
              </div>
            </Card>
          )}

          <hr className="border-light m-0" />

          {/* Wallet Footer */}
          <WalletFooter />
          {/* / Wallet Footer */}

          <ToastContainer
            autoClose={false ? false : + '1500'}
            newestOnTop={false}
            closeButton={<CloseButton />}
            rtl={false} />

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

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(WalletDeposits))