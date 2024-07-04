import React, { Component } from 'react'
import { Card, Row, Col, Tabs, Tab, Media, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../views/Views.css'

class ContentSecurity extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Security')
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <div className="container-m-nx container-m-ny theme-bg-white mb-4" style={{
          // backgroundImage: `url('${process.env.PUBLIC_URL}/img/bg/img-26-01.jpg')`,
          backgroundImage: `url('${process.env.PUBLIC_URL}/img/cards/1.jpg')`,
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          //backgroundBlendMode: "luminosity",
        }}>
          <Media as={Col} md={10} lg={8} xl={7} className="py-5">
            <Media.Body className="ml-4">
              <h4 className="font-weight-bold mb-2 text-white h1">Security</h4>
              <div className="mb-4 text-white">Keeping the game fair</div>
            </Media.Body>
          </Media>
          <hr className="m-0" />
        </div>

        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Body className="py-2">
                <Tabs defaultActiveKey="1" className="font-weight-bold">
                  <Tab eventKey="1" title="Security">
                    <Card.Body className="py-2 m-0">
                      <Row className="my-4">
                        <div className="text-left py-2">
                          <div className="row">
                            <div className="col pb-2 px-0">

                              <div className="footer-text font-weight-bold mb-3 h3">Security - Keeping the game fair</div>
                              <div className="">
                                We operate online poker cash games and tournaments, taking a small amount from most cash game pots (in the form of ‘rake’) or tournament buy-ins (via entry fees) as financial recompense. Operating with this business model, the integrity of the game is paramount to our success. In fact, we maintain teams of game integrity experts to ensure no player could ever gain an advantage at the table through anything but their own skill and ability.
                              </div>
                              <br />
                              <div className="">
                                We rely on our hard-won, independently verified reputation for providing a fair and honest game. For this reason, allowing players any sort of unfair advantage, or ‘punishing’ any players with an unfair disadvantage, would be counter-productive and damaging to our reputation and our business. And as you can see below, would also be technically impossible.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold mb-3 h3">Keeping Player Funds Safe and Separate</div>
                              <div className="">
                                All player funds and account balances are held in segregated accounts, and are never used for operational expenses. These segregated accounts are managed by a leading European bank.
                              </div>
                              <br />
                              <div className="">
                                This arrangement ensures that we can at all times fulfil our monetary obligations toward our online players, and provides further reassurance that player funds are always secure with us.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold mb-3 h3">Responsible Gaming</div>
                              <div className="">
                                We have a commitment to ensure that online gaming remains fun and safe. That means preventing people from playing if they are underage, and helping those who do not have control over their playing.
                              </div>
                              <br />
                              <div className="">
                                Our software contains built-in measures to protect players, including the facility to limit deposits or play. Look for the ‘Responsible Gaming’ menu to learn more.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold mb-3 h3">Your Password</div>
                              <div className="">
                                We employ some of the toughest and most secure systems to protect the integrity of your account, but any account is only as secure as its weakest link, which for many people is their password.
                              </div>
                              <br />
                              <div className="">
                                Your password can be up to 20 characters long, and lengthier passwords are usually stronger. Account and password security tips can be found in our Help Center.
                              </div>
                              <br />
                              <div className="">
                                Password protection is your responsibility and leads to secure online management.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold mb-3 h3">RSA Security Token</div>
                              <div className="">
                                An RSA Security Token is a device that generates an extra password needed to log-in to your Stars Account. Each password only shows on the screen for a few seconds. After that, a new password is generated and the old one expires.
                              </div>
                              <br />
                              <div className="">
                                For details of how to order, activate, enable or disable an RSA Security Token, visit the Help Center.
                              </div>
                              <br />
                              <div className="">
                                If you have any questions about software, player or account security, please visit the Help Center or contact Support.
                              </div>
                              <br />

                            </div>

                          </div>
                        </div>
                      </Row>
                    </Card.Body>
                  </Tab>

                  <Tab eventKey="2" title="Malta Gaming Authority">
                    <Card.Body className="py-2 m-0">
                      <Row className="my-4">
                        <div className="text-left py-2">
                          <div className="row">
                            <div className="col pb-2 px-0">
                              <div className="footer-text font-weight-bold mb-3 h3">Malta Gaming Authority</div>
                              <div className="">
                                We hold our license with the Malta Gaming Authority (MGA).
                              </div>
                              <br />
                              <div className="">
                                The Gaming Authority is a single regulatory body that is responsible for the governance of all gaming activities in Malta including Amusement Machines, Broadcasting Media games, Casinos, Commercial Bingo Halls, Commercial Communication games, the National lottery, Non-Profit games and Remote Gaming.
                              </div>
                              <br />
                              <div className="">
                                Since the enactment of the Lotteries and Other Games Act, 2001 the MGA established the following mission statement:
                              </div>
                              <br />
                              <div className="">
                                "To regulate competently the various sectors of the lotteries and gaming industry that fall under the Authority by ensuring gaming is fair and transparent to the players, preventing crime, corruption and money laundering and by protecting minor and vulnerable players."
                              </div>
                              <br />
                              <div className="">
                                The enactment of the Lotteries and Other Games Act, 2001 aimed to bring all gaming activities, with the exception of land-based casinos, under one comprehensive legislative instrument. The Act vested the MGA with a wide array of powers, thereby providing the necessary tools to implement effective regulation.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">MGA aims:</div>
                              <div className="">
                                <ul>
                                  <li>Protecting minors and vulnerable persons</li>
                                  <li>Safeguarding players' rights</li>
                                  <li>Promoting responsible gaming in a safe environment</li>
                                  <li>Ensuring the integrity of games and gaming devices</li>
                                  <li>Keeping gaming free from criminal activities</li>
                                </ul>
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">MGA Objectives:</div>
                              <div className="">
                                <ul>
                                  <li>Consolidate all the regulatory functions relating to gaming activities</li>
                                  <li>Operate a successful and a fully integrated Authority</li>
                                  <li>Support the industry and technological innovation</li>
                                  <li>Provide authoritative and accessible information</li>
                                  <li>Provide a one-stop-shop for licensing</li>
                                </ul>
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">MGA Activities:</div>
                              <div className="">
                                <ul>
                                  <li>Conducting research on various aspects of gaming</li>
                                  <li>Granting licences relating to gaming and lotteries</li>
                                  <li>Monitoring licensed gaming</li>
                                  <li>Collecting gaming taxes on behalf of the Government</li>
                                  <li>Supporting good causes</li>
                                  <li>Ensuring that the sector contributes to the country's development</li>
                                </ul>
                              </div>
                              <br />
                              <div className="">
                                For more information, visit the MGA web site http://www.mga.org.mt/
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
                  <Link to="/content/responsible" className="text-white font-weight-bold">Get more information</Link>
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

export default ContentSecurity