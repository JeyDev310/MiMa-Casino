import React, { Component } from 'react'
import { Card, Row, Col, Tabs, Tab, Media, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import '../views/Views.css'

class ContentResponsibleGaming extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Responsible Gaming')
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <div className="container-m-nx container-m-ny theme-bg-white mb-4" style={{
          // backgroundImage: `url('${process.env.PUBLIC_URL}/img/bg/img-26-01.jpg')`,
          backgroundImage: `url('${process.env.PUBLIC_URL}/img/cards/2.jpg')`,
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          // backgroundBlendMode: "luminosity",
        }}>
          <Media as={Col} md={10} lg={8} xl={7} className="py-5">
            <Media.Body className="ml-4">
              <h4 className="font-weight-bold mb-2 text-white h1">Responsible Gaming</h4>
              <div className="mb-4 text-white">Overview</div>
            </Media.Body>
          </Media>
          <hr className="m-0" />
        </div>

        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Body className="py-2">
                <Tabs defaultActiveKey="1" className="font-weight-bold">
                  <Tab eventKey="1" title="Responsible Gaming">
                    <Card.Body className="py-2 m-0">
                      <Row className="my-4">
                        <div className="text-left py-2">
                          <div className="row">
                            <div className="col pb-2 px-0">

                              <div className="footer-text font-weight-bold mb-3 h3">Mission statement</div>
                              <div className="">
                                We strive to assist and protect players who are at risk of the potential negative effects of gambling through a number of means, including self-exclusion tools, guidance on responsible gaming, risk identification and player verification.
                              </div>
                              <br />
                              <div className="">
                                We believe in educating our players to empower them through knowledge. Click here for an interactive presentation on Responsible Gaming and Problem Gambling.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Age verification</div>
                              <div className="">
                                Any underage player who has provided dishonest or inaccurate information regarding their true age may have all winnings forfeited and could face criminal prosecution.
                              </div>
                              <br />
                              <div className="">
                                Every person signing up for a new account must check a box that indicates that they are at least 18 years of age. This notifies everybody that we don’t accept players under 18.
                                When a player creates an account with us, we collect their name, address, and birth date to confirm that the player is at least 18 years old.
                                We do not target underage players with our marketing and advertising. It is neither good business nor consistent with our personal and corporate values to attract underage players.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Self-exclusion</div>
                              <div className="">
                                If you believe that playing games might be a hindrance to your life rather than a form of entertainment, we want to help you. First, please review the following questions:<br />
                                <br />
                                <ol>
                                  <li>Did you ever lose time from work or school due to playing?</li>
                                  <li>Has playing caused you to neglect your own welfare or that of your family?</li>
                                  <li>Have you ever sold anything or borrowed money to finance your playing?</li>
                                  <li>Have you often played until your last cash was gone?</li>
                                  <li>Have you ever played longer than you had planned?</li>
                                  <li>Have you ever considered self-destruction or suicide as a result of your playing?</li>
                                </ol>
                              </div>
                              <div className="">
                                If you answered “Yes” to several of these questions, we encourage you to visit Gamblers Anonymous.
                              </div>
                              <br />
                              <div className="">
                                You can take the test in its entirety at one of the following websites:
                              </div>
                              <br />
                              <div className="">
                                <a href="https://www.gamcare.org.uk/get-advice/self-assessment-tool" target="blank">www.gamcare.org.uk/get-advice/self-assessment-tool</a><br />
                                <a href="https://www.ncpgambling.org/help-treatment/screening-tools" target="blank">www.ncpgambling.org/help-treatment/screening-tools</a>
                              </div>
                              <br />
                              <div className="">
                                Please note that all self-exclusions and time outs are irreversible for the duration of the specified time. In addition, all self-exclusion periods are inclusive of all games. Your self-exclusion will apply to your Stars Account, and to any product that requires your username to play, and covers both real money and play money activity.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Identify and reduce the risks</div>
                              <div className="">
                                If you choose to play online, there are some general guidelines that can help make your playing experience safer, and reduce the risk of problems occurring:
                                <br />
                                <br />
                                <ol>
                                  <li>Play for entertainment, and not as a way of making money.</li>
                                  <li>Play with money that you can afford to lose. Never use money that you need for important things such as food, rent, bills, or tuition.</li>
                                  <li>Set deposit limits and ensure you never deposit more than you can afford to lose.</li>
                                  <li>Never chase losses. If you lose money, don't play higher stakes to try and recoup your losses.</li>
                                  <li>Don't play when you are upset, tired, or depressed. It is difficult to make good decisions when you are feeling down.</li>
                                  <li>Balance your playing with other activities. Find other forms of entertainment so playing does not become too big a part of your life.</li>
                                </ol>
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Be aware of common myths about compulsive gambling</div>
                              <div className="">
                                We believe players should play for fun and entertainment. But some players who engage in recreational gambling do not believe they could become addicted, and sometimes hold onto false beliefs or myths about problem gambling that can lead to denial and other problems. Some of the more common myths are listed below. Click ‘More’ to read on.
                              </div>
                              <br />

                            </div>

                          </div>
                        </div>
                      </Row>
                    </Card.Body>
                  </Tab>

                  <Tab eventKey="2" title="Gambling Therapy">
                    <Card.Body className="py-2 m-0">
                      <Row className="my-4">
                        <div className="text-left py-2">
                          <div className="row">
                            <div className="col pb-2 px-0">
                              <div className="footer-text font-weight-bold mb-3 h3">About Gambling Therapy</div>
                              <div className="">
                                Gambling Therapy is an online service that provides emotional and practical advice and support to people outside the UK affected by problem gambling. The service, launched in 2004, uses a variety of online methods to deliver support and has a team of online advisors skilled in working within the field of problem gambling.
                              </div>
                              <br />
                              <div className="">
                                Gambling Therapy provides support, information and advice services in 30 languages, and is accessible across the world (GamCare delivers a service for problem gamblers in the UK).
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Gambling Therapy’s Services</div>
                              <div className="">
                                The Gambling Therapy online services available for individuals affected by a gambling problem or the gambling problem of a loved one are as follows:
                                <br />
                                <br />
                                <ul>
                                  <li>Forums (Available 24 hours a day, 365 days a year)</li>
                                  <li>Moderated peer support groups (Currently 37 each week)</li>
                                  <li>Un-moderated peer support groups (Available at weekends and during bank holidays)</li>
                                  <li>One to one helpline sessions (9.00am to 5.00pm GMT plus additional evening hours)</li>
                                  <li>Email support (Emails can be sent to 24 hours a day, 365 days a year)</li>
                                  <li>Worldwide resources database for problem gamblers</li>
                                </ul>
                              </div>
                              <br />
                              <div className="">
                                Gambling Therapy provides support, information and advice services in 30 languages, and is accessible across the world (GamCare delivers a service for problem gamblers in the UK).
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Gambling Therapy’s Members</div>
                              <div className="">
                                All services are confidential and the team of online advisors use their knowledge and compassion to support people and signpost them to other sources of help where needed. One member of a Gambling Therapy forum emailed this comment:
                              </div>
                              <br />
                              <div className="">
                                “I think this site is a godsend. No way, could I have gotten this far, without it. My deepest thanks to this organization of individuals who make it possible.”
                              </div>
                              <br />
                              <div className="">
                                As of June 2012; Gambling Therapy has over 11,000 people who are using the services and actively engaging in groups and forums, together creating an active and accepting online therapeutic community.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold my-3 h3">Additional Information</div>
                              <div className="">
                                Gambling Therapy support the right of any individual to choose to engage in legal gambling activities for the purpose of recreation.
                              </div>
                              <br />
                              <div className="">
                                Gambling Therapy is part of the Gordon Moody Association, a charity registered in the UK. The Gordon Moody Association offers a unique and intensive residential treatment programme in the UK for those gamblers most severely addicted. <a href="http://www.gordonmoody.org.uk/" target="blank">Further information on the Gordon Moody Association.</a>
                              </div>
                              <br />
                              <div className="">
                                For additional information on Gambling Therapy please <a href="http://www.gamblingtherapy.org/" target="blank">visit the Gambling Therapy website</a>. Registered charity number: 1124751.
                              </div>
                              <br />

                            </div>
                          </div>
                        </div>
                      </Row>
                    </Card.Body>
                  </Tab>

                  <Tab eventKey="3" title="GamCare">
                    <Card.Body className="py-2 m-0">
                      <Row className="my-4">
                        <div className="text-left py-2">
                          <div className="row">
                            <div className="col pb-2 px-0">

                              <div className="footer-text font-weight-bold mb-3 h3">GamCare</div>
                              <div className="">
                                GamCare, a registered charity, is the leading authority on the provision of information, advice and practical help in addressing the social impact of gambling in the UK.
                              </div>
                              <br />
                              <div className="">
                                GamCare takes a non-judgmental approach on gambling. GamCare does not wish to restrict the choices or opportunities for anyone to operate or engage in gambling opportunities that are available legally and operated responsibly.
                              </div>
                              <br />
                              <div className="">
                                They strive to develop strategies that will:
                                <br />
                                <br />
                                <ul>
                                  <li>Improve the understanding of the social impact of gambling</li>
                                  <li>Promote a responsible approach to gambling</li>
                                  <li>Address the needs of those adversely affected by a gambling dependency</li>
                                </ul>
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold mb-3 h3">Counseling and Advice</div>
                              <div className="">
                                GamCare offers a variety of counseling services and communication channels for those who are affected by problem gambling. Individuals can receive information, advice, support or counseling through their National Helpline, counseling service, or email service.
                              </div>
                              <br />
                              <div className="">
                                <strong>National Telephone Helpline - 0808 802 0133 (UK only - Available 24/7)</strong>
                              </div>
                              <br />
                              <div className="">
                                This is a confidential service, open to individuals experiencing gambling problems, and any relative, friend, employer, etc., who wants information, support or counseling over the phone. Professionals working with a gambler can also call for information and advice.
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold mb-3 h3">Counseling</div>
                              <div className="">
                                GamCare is pleased to be able to offer counseling sessions from their office at 7-11 St. John’s Hill London SW11 1TR or through partners across GB. For further information please contact the GamCare Helpline on <strong>0808 802 0133 (UK only - Available 24/7).</strong>
                              </div>
                              <br />

                              <div className="footer-text font-weight-bold mb-3 h3">Forum (International)</div>
                              <div className="">
                                You can also obtain support and advice by visiting the GamCare forum, for peer to peer advice and support, the forum is moderated by GamCare advisors.
                              </div>
                              <br />
                              <div className="">
                                For more information on GamCare, visit the <a href="http://www.gamcare.org.uk/" target="blank">GamCare</a> home page.
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

export default ContentResponsibleGaming