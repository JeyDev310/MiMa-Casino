import React, { Component } from 'react'
import { Badge, Col, Row } from 'react-bootstrap'

import * as numeral from 'numeral'

import '../../assets/css/views.css'
import '../../../../vendor/styles/pages/games.scss'

class WalletOverview extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: true,
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
      <>
        <Col md={12}>
          <Row className="mt-0 mb-0">
            <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-4">
              <a
                href="#d"
                onClick={() => {
                  this.props.history.push('/wallet/deposit')
                }}
                className="img-thumbnail img-thumbnail-zoom-in"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(180,180,180,1)",
                  backgroundSize: "80%",
                  backgroundPositionX: "right",
                  backgroundPositionY: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${process.env.PUBLIC_URL}/img/packages/deficons/png/isometric/10.png)`,
                }}>
                <span className="img-thumbnail-overlay bg-dark opacity-50"></span>
                <span className="img-thumbnail-content text-white text-xlarge">
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none">
                      <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z" fill="white" />
                      <path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z" fill="white" />
                      <path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z" fill="white" />
                    </svg>
                  </span>
                </span>

                <div className="card-body m-lg-2">
                  <span className="btn btn-default icon-btn md-btn-flat border-0 rounded-pill mb-5" style={{ transform: "scale(1.2)", }}>
                    <span className="svg-icon svg-icon-muted svg-icon-2hx">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="2" width="9" height="9" rx="2" fill="white" />
                        <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="white" />
                        <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="white" />
                        <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="white" />
                      </svg>
                    </span>
                  </span>

                  <h4 className="mt-5 mb-2">
                    <span className="text-white font-weight-bold h3">
                      <Badge
                        pill variant="info"
                        className="mb-0 font-weight-bold">
                        Deposits
                      </Badge>
                    </span>
                  </h4>

                  <div className="small">
                    <span className="text-white">
                      <Badge
                        pill variant="default"
                        className="mb-0 font-weight-bold">
                        View Available Payment Methods
                      </Badge>
                    </span>
                  </div>
                </div>
              </a>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-4">
              <a
                href="#d"
                onClick={() => {
                  this.props.history.push('/wallet/withdrawal')
                }}
                className="img-thumbnail img-thumbnail-zoom-in"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(24,24,24,1)",
                  backgroundSize: "75%",
                  backgroundPositionX: "right",
                  backgroundPositionY: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${process.env.PUBLIC_URL}/img/packages/deficons/png/isometric/01.png)`,
                }}>
                <span className="img-thumbnail-overlay bg-dark opacity-50"></span>
                <span className="img-thumbnail-content text-white text-xlarge">
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none">
                      <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z" fill="white" />
                      <path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z" fill="white" />
                      <path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z" fill="white" />
                    </svg>
                  </span>
                </span>

                <div className="card-body m-lg-2">
                  <span className="btn btn-default icon-btn md-btn-flat border-0 rounded-pill mb-5" style={{ transform: "scale(1.2)", }}>
                    <span className="svg-icon svg-icon-muted svg-icon-2hx">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M11.8 6.4L16.7 9.2V14.8L11.8 17.6L6.89999 14.8V9.2L11.8 6.4ZM11.8 2C11.5 2 11.2 2.1 11 2.2L3.79999 6.4C3.29999 6.7 3 7.3 3 7.9V16.2C3 16.8 3.29999 17.4 3.79999 17.7L11 21.9C11.3 22.1 11.5 22.1 11.8 22.1C12.1 22.1 12.4 22 12.6 21.9L19.8 17.7C20.3 17.4 20.6 16.8 20.6 16.2V7.9C20.6 7.3 20.3 6.7 19.8 6.4L12.6 2.2C12.4 2.1 12.1 2 11.8 2Z" fill="white" />
                      </svg>
                    </span>
                  </span>

                  <h4 className="mt-5 mb-2">
                    <span className="text-white font-weight-bold h3">
                      <Badge
                        pill variant="dark"
                        className="mb-0 font-weight-bold">
                        Withdrawals
                      </Badge>
                    </span>
                  </h4>

                  <div className="small">
                    <span className="text-white">
                      <Badge
                        pill variant="default"
                        className="mb-0 font-weight-bold">
                        View Withdrawal Methods
                      </Badge>
                    </span>
                  </div>
                </div>
              </a>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-4 mb-lg-0">
              <a
                href="#d"
                onClick={() => {
                  this.props.history.push('/wallet/transactions')
                }}
                className="img-thumbnail img-thumbnail-zoom-in"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(24,24,24,1)",
                  backgroundSize: "80%",
                  backgroundPositionX: "right",
                  backgroundPositionY: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${process.env.PUBLIC_URL}/img/packages/deficons/png/isometric/15.png)`,
                }}>
                <span className="img-thumbnail-overlay bg-dark opacity-50"></span>
                <span className="img-thumbnail-content text-white text-xlarge">
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5C12.3 5 12.7 4.99998 13 5.09998V5V3C13 2.4 12.6 2 12 2C11.4 2 11 2.4 11 3V5V5.09998C11.3 4.99998 11.7 5 12 5Z" fill="white" />
                      <path opacity="0.3" d="M12 22C8.7 22 6 19.3 6 16V11C6 7.7 8.7 5 12 5C15.3 5 18 7.7 18 11V16C18 19.3 15.3 22 12 22ZM13 12V9C13 8.4 12.6 8 12 8C11.4 8 11 8.4 11 9V12C11 12.6 11.4 13 12 13C12.6 13 13 12.6 13 12Z" fill="white" />
                    </svg>
                  </span>
                </span>

                <div className="card-body m-lg-2">
                  <span className="btn btn-default icon-btn md-btn-flat border-0 rounded-pill mb-5" style={{ transform: "scale(1.2)", }}>
                    <span className="svg-icon svg-icon-muted svg-icon-2hx">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M4.05424 15.1982C8.34524 7.76818 13.5782 3.26318 20.9282 2.01418C21.0729 1.98837 21.2216 1.99789 21.3618 2.04193C21.502 2.08597 21.6294 2.16323 21.7333 2.26712C21.8372 2.37101 21.9144 2.49846 21.9585 2.63863C22.0025 2.7788 22.012 2.92754 21.9862 3.07218C20.7372 10.4222 16.2322 15.6552 8.80224 19.9462L4.05424 15.1982ZM3.81924 17.3372L2.63324 20.4482C2.58427 20.5765 2.5735 20.7163 2.6022 20.8507C2.63091 20.9851 2.69788 21.1082 2.79503 21.2054C2.89218 21.3025 3.01536 21.3695 3.14972 21.3982C3.28408 21.4269 3.42387 21.4161 3.55224 21.3672L6.66524 20.1802L3.81924 17.3372ZM16.5002 5.99818C16.2036 5.99818 15.9136 6.08615 15.6669 6.25097C15.4202 6.41579 15.228 6.65006 15.1144 6.92415C15.0009 7.19824 14.9712 7.49984 15.0291 7.79081C15.0869 8.08178 15.2298 8.34906 15.4396 8.55884C15.6494 8.76862 15.9166 8.91148 16.2076 8.96935C16.4986 9.02723 16.8002 8.99753 17.0743 8.884C17.3484 8.77046 17.5826 8.5782 17.7474 8.33153C17.9123 8.08486 18.0002 7.79485 18.0002 7.49818C18.0002 7.10035 17.8422 6.71882 17.5609 6.43752C17.2796 6.15621 16.8981 5.99818 16.5002 5.99818Z" fill="white" />
                        <path d="M4.05423 15.1982L2.24723 13.3912C2.15505 13.299 2.08547 13.1867 2.04395 13.0632C2.00243 12.9396 1.9901 12.8081 2.00793 12.679C2.02575 12.5498 2.07325 12.4266 2.14669 12.3189C2.22013 12.2112 2.31752 12.1219 2.43123 12.0582L9.15323 8.28918C7.17353 10.3717 5.4607 12.6926 4.05423 15.1982ZM8.80023 19.9442L10.6072 21.7512C10.6994 21.8434 10.8117 21.9129 10.9352 21.9545C11.0588 21.996 11.1903 22.0083 11.3195 21.9905C11.4486 21.9727 11.5718 21.9252 11.6795 21.8517C11.7872 21.7783 11.8765 21.6809 11.9402 21.5672L15.7092 14.8442C13.6269 16.8245 11.3061 18.5377 8.80023 19.9442ZM7.04023 18.1832L12.5832 12.6402C12.7381 12.4759 12.8228 12.2577 12.8195 12.032C12.8161 11.8063 12.725 11.5907 12.5653 11.4311C12.4057 11.2714 12.1901 11.1803 11.9644 11.1769C11.7387 11.1736 11.5205 11.2583 11.3562 11.4132L5.81323 16.9562L7.04023 18.1832Z" fill="white" />
                      </svg>
                    </span>
                  </span>

                  <h4 className="mt-5 mb-2">
                    <span className="text-white font-weight-bold h3">
                      <Badge
                        pill variant="dark"
                        className="mb-0 font-weight-bold">
                        Payments
                      </Badge>
                    </span>
                  </h4>

                  <div className="small">
                    <span className="text-white">
                      <Badge
                        pill variant="default"
                        className="mb-0 font-weight-bold">
                        View Previous Payments
                      </Badge>
                    </span>
                  </div>
                </div>
              </a>
            </Col>

            <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-0 mb-lg-0">
              <a
                href="#d"
                onClick={() => {
                  this.props.history.push('/wallet/notifications')
                }}
                className="img-thumbnail img-thumbnail-zoom-in"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(180,180,180,1)",
                  backgroundSize: "80%",
                  backgroundPositionX: "right",
                  backgroundPositionY: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${process.env.PUBLIC_URL}/img/packages/deficons/png/isometric/06.png)`,
                }}>
                <span className="img-thumbnail-overlay bg-dark opacity-50"></span>
                <span className="img-thumbnail-content text-white text-xlarge">
                  <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5C12.3 5 12.7 4.99998 13 5.09998V5V3C13 2.4 12.6 2 12 2C11.4 2 11 2.4 11 3V5V5.09998C11.3 4.99998 11.7 5 12 5Z" fill="white" />
                      <path opacity="0.3" d="M12 22C8.7 22 6 19.3 6 16V11C6 7.7 8.7 5 12 5C15.3 5 18 7.7 18 11V16C18 19.3 15.3 22 12 22ZM13 12V9C13 8.4 12.6 8 12 8C11.4 8 11 8.4 11 9V12C11 12.6 11.4 13 12 13C12.6 13 13 12.6 13 12Z" fill="white" />
                    </svg>
                  </span>
                </span>

                <div className="card-body m-lg-2">
                  <span className="btn btn-default icon-btn md-btn-flat border-0 rounded-pill mb-5" style={{ transform: "scale(1.2)", }}>
                    <span className="svg-icon svg-icon-muted svg-icon-2hx">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="white" />
                        <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="white" />
                        <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="white" />
                      </svg>
                    </span>
                  </span>

                  <h4 className="mt-5 mb-2">
                    <span className="text-white font-weight-bold h3">
                      <Badge
                        pill variant="info"
                        className="mb-0 font-weight-bold">
                        Notifications
                      </Badge>
                    </span>
                  </h4>

                  <div className="small">
                    <span className="text-white">
                      <Badge
                        pill variant="default"
                        className="mb-0 font-weight-bold">
                        View Payment Notifications
                      </Badge>
                    </span>
                  </div>
                </div>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    )
  }
}

export default WalletOverview