import React, { Component } from 'react'
import { Card, Row, Col, Tabs, Tab, Media, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../views/Views.css'

class ContentTermsService extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Terms of Service')
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <div className="container-m-nx container-m-ny theme-bg-white mb-4" style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/img/cards/1.jpg')`,
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          backgroundBlendMode: "luminosity",
        }}>
          <Media as={Col} md={10} lg={8} xl={7} className="py-5">
            <Media.Body className="ml-4">
              <h4 className="font-weight-bold mb-2 text-white h1">Terms of Service</h4>
              <div className="mb-4 text-white">Terms of Service – MiMa Poker</div>
            </Media.Body>
          </Media>
          <hr className="m-0" />
        </div>

        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Body className="py-2">

                <Tabs defaultActiveKey="home">
                  <Tab eventKey="home" title="Terms of Service">
                    <Card.Body className="py-2 m-0">
                      <Row className="my-4">
                        <div className="text-left py-2">
                          <div className="row">
                            <div className="col pb-2 px-0">

                              <div className="footer-text font-weight-bold mb-3 h3">Terms of Service</div>
                              <div className="">
                                The Terms of Service ("Terms") you are reading are a legally binding agreement that governs the relationship between Playtika, as defined below and yourself ("you") and your use of Playtika’s products and social games for the web, mobile or any other applicable platforms and/or devices (the “Service” or “Services”).
                              </div>
                              <br />
                              <div className="">
                                Please review the Terms carefully.  They include a provision waiving the right to pursue any class, group or representative claim and requiring you to pursue certain disputes through individual arbitration unless you opt-out within the specified time frame.
                              </div>
                              <br />
                              <div className="">
                                BY ACCESSING OR USING PLAYTIKA’S SERVICE AND ACCEPTING THESE TERMS, YOU AGREE THAT YOU HAVE READ, UNDERSTOOD AND AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE THE SERVICE.
                              </div>
                              <br />
                              <div className="">
                                THE SERVICE IS STRICTLY FOR AMUSEMENT PURPOSES ONLY.  THE SERVICE DOES NOT OFFER REAL MONEY GAMBLING OR AN OPPORTUNITY TO WIN REAL MONEY OR REAL-WORLD PRIZES.  NO ACTUAL MONEY OR ANYTHING OF VALUE CAN BE WON PLAYING THE GAMES OFFERED THROUGH THE SERVICE, AND NO ACTUAL MONEY IS REQUIRED TO PLAY.
                              </div>
                              <br />
                              <div className="">
                                In these Terms, “Playtika” refers to Playtika Ltd. and its affiliates, which shall mean subsidiaries, parent companies, joint ventures and other corporate entities under common ownership. We may also refer to Playtika as "we" or "us".
                              </div>
                              <br />
                              <div className="">
                                For the avoidance of doubt, Playtika Ltd owns and operates Slotomania, Caesars Slots, WSOP, Poker Heat and Vegas Downtown Slots. Playtika UK - House of Fun Limited owns and operates House of Fun. Jelly Button Games Ltd. owns and operates Pirate Kings, Board Kings, BRIX! Block Blast, Merge Stories and CAT FORCE. SuperTreat GmbH owns and operates Solitaire Grand Harvest. Playtika Santa Monica, LLC owns and operates Bingo Blitz and Bingo Drop. Hyper Mania Ltd. owns and operates Merge Tower Bots and Crush Soft Things. This information may be modified or amended at any time by Playtika without notice to You.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold mb-3 h3">CHANGES TO THE TERMS OR THE SERVICE</div>
                              <div className="">
                                Playtika reserves the right, in its sole discretion, to revise or modify these Terms, our Privacy Notice including any other rules related to specific services like platforms and APIs, applications for mobile devices, forums, contests, subscriptions or loyalty programs, such as the Playtika Rewards Rules, Promotion Official Rules and Infractions Terms, that we may publish which apply to your use of those specific services and state they are part of these Terms (“Additional Terms”) (the Terms, Privacy Notice and Additional Terms collectively shall be referred to herein as “Playtika's Terms”), at any time by posting the amended Playtika's Terms on or within the Service, and you agree to be bound by such revisions or modifications.
                              </div>
                              <br />
                              <div className="">
                                In addition, Playtika may terminate these Terms in its sole discretion at any time.  Users are responsible for viewing the Playtika's Terms periodically. Your continued use of the Service after a change or modification of the Playtika's Terms has been made will constitute your acceptance of the revised Playtika's Terms. If you do not agree to Playtika's Terms your only remedy is to discontinue your use of the Service and to cancel any accounts you have created using the Service. If you use our Service, you must follow all Playtika's Terms that may apply. If you access the Service from a social network or download the Service from another platform or applications stores, such as but not limited to Facebook, Amazon, Windows Phone, Samsung, Yahoo, Apple or Google, you must also comply with its terms of service/use as well as the Playtika's Terms.
                              </div>
                              <br />
                              <div className="">
                                You understand that the Service is evolving. You may be required to accept updates to the Service, and to Playtika's games which you have installed on your computer, mobile device or any other device. You acknowledge that Playtika may perform these updates remotely and agree that Playtika may update the Service with or without notifying you. You may need to update third party software from time to time in order to receive the Service and play Playtika's games.
                              </div>
                              <br />
                              <div className="">
                                We reserve the right, at any time and from time to time, temporarily or permanently, with or without notice, in whole or in part, to: stop offering and/or supporting the Service or any particular game or part of the Service; terminate or suspend your license to use the Service or any part of it; modify or discontinue the Services; modify or remove any of the information contained in the Services; limit the Services' availability to any person, geographic area, or jurisdiction we choose; charge fees in connection with the use of the Services; modify and/or waive any fees charged in connection with the Services; and/or offer opportunities to some and all users of the Services. If that happens, Playtika is not required to provide refunds, benefits or other compensation to players in connection with discontinued elements of the Service or for virtual goods previously awarded or purchased. You agree that we will not be liable to you or to any third party for any modification, suspension or discontinuance of the Services, in whole or in part. Your continued use of the Services after such changes will indicate your acceptance of such changes in the Services and in the Playtika's Terms.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold mb-3 h3">ACCOUNT INFORMATION</div>
                              <div className="">
                                To access or play our games you must create an account with Playtika (an “Account”). You may access the Service via the website, your account in a social network, like Facebook, or, if you are using our mobile Service, an account with the company that provides your mobile applications, such as an Apple account. You may need to update third party software from time to time to receive the Service and/or updates and play Playtika's games. During the process of creating an Account to access the Service, you may be required to select a password or to allow us to access your account information from a social network service (“Login Information”).
                              </div>
                              <br />
                              <div className="">
                                The following rules govern the security of your Account and Login Information. For the purposes of these Terms, references to Account and Login Information shall include any account information, including user names, passwords or security questions, whether or not created for the purpose of using the Service, that are used to access the Service (for example, account information for a social network service account from which the Service is accessed):
                              </div>
                              <br />

                            </div>

                          </div>
                        </div>
                      </Row>
                    </Card.Body>
                  </Tab>
                </Tabs>

              </Card.Body>
            </Card>
          </Col>

          <Col xl={4}>
            <Card className="mb-4">
              <Card.Body>
                <Button variant="primary" className="mr-2" onClick={() => { this.props.history.push("/games") }}>Live Games</Button>
                <Button variant="default" className="mr-2" onClick={() => { this.props.history.push("/content/howtoplay") }}>How to play</Button>
              </Card.Body>

              <hr className="border-light m-0" />

              <Card.Body className="my-0 py-0">

                <img src={`${process.env.PUBLIC_URL}/img/cards/2.jpg`} className="d-block img-fluid my-0 py-0" alt="" style={{
                  height: "120px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  width: "min-content",
                }} />

              </Card.Body>

              <Card.Body>
                <div className="footer-text font-weight-bold mb-3 h3">Responsible Gaming</div>
                <div className="">
                  We are committed to responsible gaming, and are dedicated to an enjoyable and positive gaming experience.
                </div>
                < br />
                <div className="">
                  <Link to="/content/deposits" className="text-dark">Get more information</Link>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header className="with-elements">
                <span className="card-header-title">Help Center &nbsp;
                </span>
                <div className="card-header-elements ml-md-auto">
                  <Link to="/content/help" className="btn btn-default md-btn-flat btn-xs">Show All</Link>
                </div>
              </Card.Header>

              <Row noGutters className="row-bordered row-border-light">
                <Link to="/content/deposits" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-briefcase text-big"></i></div>
                  <div className="text-center small">Deposits & Withdrawals</div>
                </Link>
                <Link to="/content/responsible" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-thumbs-up text-big"></i></div>
                  <div className="text-center small">Responsible Gaming</div>
                </Link>
                <Link to="/content/howtoplay" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-dice text-big"></i></div>
                  <div className="text-center small">How to play</div>
                </Link>
                <Link to="/content/terms" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-earth text-big"></i></div>
                  <div className="text-center small">Terms of Service</div>
                </Link>
                <Link to="/content/privacy" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-lock text-big"></i></div>
                  <div className="text-center small">Privacy Policy</div>
                </Link>
                <Link to="/content/support" className="d-flex col-4 col-sm-3 col-md-4 flex-column align-items-center text-body py-3 px-2">
                  <div className="display-4 text-primary my-4"><i className="lnr lnr-bubble text-big"></i></div>
                  <div className="text-center small">Support</div>
                </Link>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ContentTermsService