import React, { Component } from 'react'
import { Card, Col, ProgressBar, Row } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

import numeral from 'numeral'
import WalletOverview from '../overview/WalletOverview'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../../store/actions'

import {
  REQ_PROFILE_AVATAR_GET,
  REQ_PROFILE_WALLET_GET,
  REQ_COMMERCE_TRANSACTION_QUERYSET_ALL,
} from '../../../../store/objects/actionTypes'

import '../../assets/css/views.css'
import '../../../../vendor/styles/pages/account.scss'
import '../../../../vendor/libs/react-toastify/react-toastify.scss'

const CloseButton = ({ closeToast }) => (
  <button className="Toastify__close-button" type="button" aria-label="close"
    onClick={closeToast}>&times;</button>
)

class WalletProvider extends Component {

  constructor(props) {
    super(props)

    this.evaluateActiveRoute = this.evaluateActiveRoute.bind(this)

    this.state = {
      init: false,
      avatar: null,
      username: '',
      email: '',
      data: [],
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
        REQ_PROFILE_WALLET_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
          })
        })
      this.props.objectsRequestHandler(REQ_COMMERCE_TRANSACTION_QUERYSET_ALL, {
        id: JSON.parse(localStorage.getItem('user')).id,
        page: 1,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
            data: this.props.transactions.results,
          })
        })
      if (
        !this.props.avatar &&
        localStorage.getItem('user')
      ) {
        this.props.objectsRequestHandler(REQ_PROFILE_AVATAR_GET, {
          id: JSON.parse(localStorage.getItem('user')).id,
        }, this.props.history)
          .then(() => {
            this.setState({
              avatar: this.props.avatar,
            })
          })
      } else {
        this.setState({
          avatar: this.props.avatar,
        })
      }
    } else {
      this.props.history.push('/')
    }
  }

  onHandleRefreshItems() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
        email: JSON.parse(localStorage.getItem('user')).user.email,
      })
      this.props.objectsRequestHandler(
        REQ_COMMERCE_TRANSACTION_QUERYSET_ALL, {
        id: JSON.parse(localStorage.getItem('user')).id,
        page: 1,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
            data: this.props.transactions.results,
          })
        })
      this.props.objectsRequestHandler(
        REQ_PROFILE_WALLET_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
          }, () => {
            this.showToastify(<>
              <div className="cursor-pointer p-0 m-0 small">
                <h6>
                  Live Poker Studio™ Wallet
                </h6>
                <p className="mb-0">
                  Wallet has been updated successfully.
                </p>
              </div>
            </>, 'info')
          })
        })
      if (
        !this.props.avatar &&
        localStorage.getItem('user')
      ) {
        this.props.objectsRequestHandler(
          REQ_PROFILE_AVATAR_GET, {
          id: JSON.parse(localStorage.getItem('user')).id,
        }, this.props.history)
          .then(() => {
            this.setState({
              avatar: this.props.avatar,
            })
          })
      } else {
        this.setState({
          avatar: this.props.avatar,
        })
      }
    } else {
      this.props.history.push('/')
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
      <div className="mb-2">

        {this.props.wallet && (
          <>
            <Row>
              <Col>
                <div className="mb-0" style={{
                  borderRadius: "15px 15px 0px 0px",
                  backgroundColor: "rgba(24,24,24,1.0)",
                }}>
                  <div className="row no-gutters">
                    <div className="d-flex col-lg-4 justify-content-start align-items-center p-4">
                      <div className="media align-items-center cursor-pointer">
                        {this.props.avatar
                          ? <img
                            src={`${this.props.avatar}`}
                            className="d-block ui-w-60 rounded-circle" alt="Avatar"
                            style={{
                              objectFit: "cover",
                              filter: "drop-shadow(0px 0px 5px rgba(0,0,0,1))",
                            }} />
                          : <img
                            src={`${process.env.PUBLIC_URL}/img/avatars/avatar-1.png`}
                            className="d-block ui-w-60 rounded-circle" alt="Avatar"
                            style={{
                              objectFit: "cover",
                              filter: "drop-shadow(0px 0px 5px rgba(0,0,0,1))",
                            }} />}
                        <div className="media-body text-big ml-4">
                          <span className="text-body font-weight-bold">
                            {this.state.username || 'N/A'}
                          </span>
                          <div className="text-muted small font-weight-semibold">
                            {this.state.email || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex col-lg-4 justify-content-lg-center align-items-center p-4">
                      <div className="ml-0 cursor-pointer">
                        <div className="text-muted small line-height-1 mb-1">
                          Total Balance
                        </div>
                        <div className="font-weight-bold h5 mb-0">
                          {this.formatPrice(this.props.wallet.live_deposit)}
                        </div>
                      </div>
                      <div className="ml-5 cursor-pointer">
                        <div className="text-muted small line-height-1 mb-1">
                          Play Money
                        </div>
                        <div className="font-weight-bold h5 mb-0">
                          {this.formatPrice(this.props.wallet.practice_deposit)}
                        </div>
                      </div>
                    </div>

                    {this.props.transactions && (
                      <div className="d-flex col-lg-4 justify-content-lg-end align-items-center p-4">
                        <div className="ml-0 cursor-pointer">
                          <div className="text-muted small line-height-1 mb-1">
                            Transactions
                          </div>
                          <div className="font-weight-bold h5 mb-0">
                            {this.props.transactions.count}
                          </div>
                        </div>
                        <div className="ml-5 mr-5 cursor-pointer">
                          <div className="text-muted small line-height-1 mb-1">
                            Notifications
                          </div>
                          <div className="font-weight-bold h5 mb-0">
                            0
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </Col>
            </Row>

            <ProgressBar
              variant="danger"
              now={100}
              animated={false}
              style={{
                height: "4px",
                borderRadius: "0px",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }} />
          </>
        )}

        {this.props.wallet && (
          <Card
            className="mb-2"
            style={{
              borderRadius: "0px 0px 15px 15px",
            }}>
            <Card.Body>
              <Row noGutters className="p-3">

                {/* Wallet Overview */}
                <WalletOverview
                  {...this.props} {...this.state} />
                {/* / Wallet Overview */}

              </Row>
            </Card.Body>
          </Card>
        )}

        <ToastContainer
          autoClose={false ? false : + '1500'}
          newestOnTop={false}
          closeButton={<CloseButton />}
          rtl={false} />

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  avatar: state.objects.avatar,
  settings: state.objects.profile.settings,
  transactions: state.objects.commerce.transactions.items,
  wallet: state.objects.profile.wallet,
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(WalletProvider))