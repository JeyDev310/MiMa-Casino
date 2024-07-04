import React, { Component } from 'react'
import { Card, Row, Col, Tabs, Tab, Media, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../views/Views.css'

class ContentDeposits extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Deposits & Withdrawals')
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
              <h4 className="font-weight-bold mb-2 text-white h1">Deposits & Withdrawals</h4>
              <div className="mb-4 text-white">Real Money Deposits & Withdrawals</div>
            </Media.Body>
          </Media>
          <hr className="m-0" />
        </div>

        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Body className="py-2">

                <Tabs defaultActiveKey="home" className="font-weight-bold">
                  <Tab eventKey="home" title="Withdrawal Policy">
                    <Card.Body className="py-2 m-0">
                      <Row className="my-4">
                        <div className="text-left py-2">
                          <div className="row">
                            <div className="col pb-2 px-0">

                              <div className="footer-text font-weight-bold mb-3 h3">Safe and Secure Withdrawals</div>
                              <div className="">
                                We have a total and unwavering commitment to the safety and security of player funds. Player balances are kept in segregated accounts and not used for operational expenses. This ensures that your funds are always available for you to withdrawal in accordance with our banking and security procedures.
                              </div>
                              <br />
                              <div className="">
                                Withdrawal methods offered are dependent on your country of residence. Please return to our Real Money information page to determine options available in your country. Please note, we reserve the right to use additional eligibility criteria to determine the withdrawal options players may be offered at any given time.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Withdrawal Policy Details</div>
                              <div className="">
                                Withdrawals are automatically credited back to any and all of the following methods that you have used to make deposits. Withdrawals are first processed back to the method(s) used to deposit. Within each deposit method, withdrawals are then applied back to your oldest deposit first and your most recent deposit last. When applying withdrawals back to previous deposits, they are converted to the currency your previous deposits were processed in. Withdrawals that exceed the total amount you’ve deposited are converted to the currency your last deposit with the given method was processed in.
                              </div>
                              <br />
                              <div className="">
                                We apologize if our withdrawal policy is an inconvenience, but this is a security feature designed to protect our customers against fraud. It ensures that no one can profit from misuse of another's account.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">CFT eligible Visa</div>
                              <div className="">
                                If you have made any CFT eligible Visa deposits in the last 12 months, your withdrawals will automatically be processed back to CFT eligible Visa cards up to the amount deposited, from the oldest deposit, made with this method, to the newest. Please note that additional eligibility criteria may apply to the automatic CFT eligible Visa withdrawal option.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">How to Make a Withdrawal Request</div>
                              <div className="">
                                To make a withdrawal request, login to your Stars Account and visit the Cashier. Select the ‘Withdrawal’ button and input the amount you'd like to withdraw, then choose 'Submit'.
                              </div>
                              <br />
                              <div className="">
                                Review the on-screen information carefully before you complete your withdrawal request. The following screen will display how your withdrawal will be processed. This is only an estimation of how your funds will be disbursed. We cannot guarantee that your withdrawal will be processed exactly as described, as this estimation does not take into account any temporary connectivity problems with outside processors or any issues pertaining to accounts outside of our control.
                              </div>
                              <br />
                              <div className="">
                                An email notification from us will be sent to you confirming each transaction made within your Stars Account. Always refer to your confirmation email after you've made a withdrawal to confirm how your funds were processed.
                              </div>
                              <br />
                              <div className="">
                                If you see that the card or account designated to receive your withdrawal is no longer valid, please cancel your withdrawal request and contact Support.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Withdrawal Processing Time</div>
                              <div className="">
                                Withdrawals processed back to previous deposits to CFT eligible Visa cards will be processed immediately. Please allow 3-10 business days after your withdrawal has been processed for the funds to appear on your statement.
                              </div>
                              <br />
                              <div className="">
                                Withdrawals processed to CFT eligible Visa cards that are above the total amount deposited will usually be processed within one hour. Please allow 3-10 business days after your withdrawal has been processed for the funds to appear on your statement.
                              </div>
                              <br />
                              <div className="">
                                Withdrawals processed back to previous deposits with MuchBetter, ecoPayz, NETELLER, Skrill and PayPal will be processed immediately and the funds will appear in your account within a few minutes.
                              </div>
                              <br />
                              <div className="">
                                Withdrawals processed to MuchBetter, ecoPayz, NETELLER, Skrill and PayPal that are above the total amount deposited will usually be processed within one hour. Once processed, the funds will appear in your account within a few minutes.
                              </div>
                              <br />
                              <div className="">
                                Withdrawals processed via Wire Transfer and Direct Bank Transfer will be sent for processing within 24 hours except on weekends. Please allow 3-5 business days after your withdrawal has been processed for the funds to appear in your bank account.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Help with Withdrawals</div>
                              <div className="">
                                Please contact Support with any questions about withdrawals or the withdrawal policy.
                              </div>
                            </div>

                          </div>
                        </div>
                      </Row>
                    </Card.Body>
                  </Tab>

                  <Tab eventKey="deposits" title="Deposits & Withdrawals">
                    <Card.Body className="py-2 m-0">
                      <Row className="my-4">
                        <div className="text-left py-2">
                          <div className="row">
                            <div className="col pb-2 px-0">
                              <div className="footer-text font-weight-bold mb-3 h3">Fast Deposits Available Now</div>
                              <div className="">
                                The Fast Deposit feature is an even quicker way to fund your Stars Account and supports many popular deposit methods, including Visa, MasterCard and NETELLER. Look for the Fast Deposit logo beside the deposit method in the Cashier. You will be given the option to enable this as your 'Fast Deposit Account' and submit transactions directly from the table. Learn more about Fast Deposits.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Set Deposit Limits</div>
                              <div className="">
                                We believe that you should be allowed to manage your own budget for playing online. We therefore allow you to restrict your own weekly real money deposit limits. Of course, those limits may be no higher than the ones we already have for your account.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Secure Account Segregation</div>
                              <div className="">
                                Players’ funds and account balances are held in segregated accounts by us, and are not used for any operational expenses. These segregated accounts are managed by a leading European bank. This arrangement ensures that we can at all times fulfil our monetary obligations toward our online players, and provides further reassurance that player funds are always secure with us.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Quick and Easy Withdrawals</div>
                              <div className="">
                                To withdraw, click ‘Cashier’ in the desktop Lobby and select ‘Withdraw’. You will then be prompted to enter a withdrawal amount. Enter and click ‘Submit’. See our Withdrawal Policy for available options and details on how withdrawals are processed.
                              </div>
                              <br />
                            </div>
                          </div>
                        </div>
                      </Row>
                    </Card.Body>
                  </Tab>

                  <Tab eventKey="terms" title="Terms and Conditions">
                    <Card.Body className="py-2 m-0">
                      <Row className="my-4">
                        <div className="text-left py-2">
                          <div className="row">
                            <div className="col pb-2 px-0">

                              <div className="footer-text font-weight-bold mb-3 h3">Real Money Transaction Processing and Currency Conversion</div>
                              <div className="">
                                The User agrees and acknowledges that:
                                <br />
                                <br />
                                <ul>
                                  <li>
                                    We will make reasonable efforts to ensure that transfers in and out of your account are processed in a timely manner. We give no warranties regarding the amount of time needed to complete processing. We cannot be held responsible for delays in the banking networks, failures on part of the processor or actions of other parties involved in the processing of funds that may result in processing delays, reprocessing or reversal of transactions or the seizure or freezing of funds, nor will we be liable for any actual or consequential damages arising from any claim of delay or seizure.
                                  </li>
                                  <br />
                                  <li>
                                    We will not be liable for any actual or consequential damages arising from any claim of delay or loss as a result of invalid, incomplete or erroneous financial or personal data provided by the User with their transfer request.
                                  </li>
                                  <br />
                                  <li>
                                    As part of our licensing agreement and in compliance with anti-money laundering legislation, Users need to be aware they may be required to produce personal documentation (such as Government issued ID, bank statements and utility bills) upon request in order for their transfer to be processed. This allows us to help protect the Users and prevents our platform from being used as a vehicle for money laundering or fraud.
                                  </li>
                                  <br />
                                  <li>
                                    Any cancelled or rejected transfers out of your account will be refunded to your account in the currency and amount debited from your Stars Account balance with your original request before currency conversion took place.
                                  </li>
                                  <br />
                                  <li>
                                    Any returned transfers in will be debited from your account in the currency and amount credited to your Stars Account balance with your original request after currency conversion took place.
                                  </li>
                                  <br />
                                  <li>
                                    We are not a bureau de change (currency exchange). We are not responsible for any loss due to changes in exchange rate.
                                  </li>
                                  <br />
                                  <li>
                                    Our exchange rates are updated throughout each day and it is the User's responsibility to check the applicable rates in our cashier before proceeding with transactions involving an exchange of currency. For deposits and withdrawals in most currencies, we will add a margin to the mid-market exchange rate provided by XE (Source XE).
                                  </li>
                                  <br />
                                  <li>
                                    If the transfer method is not an instant method, the exchange rate as described above in section 7 will be applied when we are provided a confirmation of the transfer by our payment processor.
                                  </li>
                                </ul>
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

export default ContentDeposits