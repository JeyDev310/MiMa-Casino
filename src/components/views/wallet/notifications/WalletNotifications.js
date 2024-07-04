import React, { Component } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import WalletFooter from '../content/WalletFooterContent'
import ResourceLoaderB from '../../utilities/loaders/ResourceLoaderB'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../../store/actions'

import '../../assets/css/views.css'

class WalletNotifications extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Payment Notifications')

    this.state = {
      init: true,
    }
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
        email: JSON.parse(localStorage.getItem('user')).user.email,
      })
    } else {
      this.props.history.push('/')
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
                        Notifications
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
                    className="nav-link py-3 font-weight-bold cursor-pointer"
                    onClick={() => {
                      this.props.history.push('/wallet/withdrawal')
                    }}>
                    Withdrawal
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link py-3 active font-weight-bold cursor-pointer"
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

          {/* Notifications */}
          <Card className="mb-4 shadow-none" style={{ borderRadius: "0px 0px 15px 15px", }}>
            <div className="container py-5">
              <Card className="d-flex bg-transparent w-100 mb-2 border-0 shadow-none">
                <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                  <Col
                    sm={12} md={12} lg={12}
                    className="d-flex align-items-center border-0 shadow-none p-4"
                    style={{ justifyContent: "center", }}>
                    <ResourceLoaderB
                      height="4rem" width="4rem" />
                  </Col>
                </Row>
              </Card>

              <div className={`text-center text-white opacity-100 mb-0`}>
                No previous notifications found...
              </div>

              <h6 className="text-center text-lighter text-muted text-tiny mt-4 mb-0">
                All user activities, such as played sessions, deposit and payout transactions, user logins, are logged and can be <br />
                viewed under "Activity Log". The user also has the option of downloading an entire report on his previous user activity.
              </h6>
            </div>
          </Card>
          {/* / Notifications */}

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
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(WalletNotifications))