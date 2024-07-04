import React, { Component } from 'react'
import { Badge, Button, Card, Col, Media, Modal, Row } from 'react-bootstrap'
import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'
import { formatPrice, truncateString, truncateUsername } from '../../utilities/TextPreprocessing'

import '../../../../../vendor/styles/pages/chat.scss'

class PotDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    if (this.props.game.data.game_started && this.props.game.details) {
      this.setState({ init: this.props.game.data.game_started })
    } else {
      this.setState({ init: false })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.data.game_started !== this.props.game.data.game_started) {
      if (this.props.game.details) {
        this.setState({ init: this.props.game.data.game_started })
      }
    }
  }

  getCorrectPotName(name) {
    switch (name) {
      case 'mainpot_1':
        return 'Main Pot'
      case 'sidepot_1':
        return 'Main Pot'
      case 'sidepot_2':
        return 'Side Pot'
      case 'sidepot_3':
        return 'Side Pot'
      case 'sidepot_4':
        return 'Side Pot'
      case 'sidepot_5':
        return 'Side Pot'
      case 'sidepot_6':
        return 'Side Pot'
      case 'sidepot_7':
        return 'Side Pot'
      case 'sidepot_8':
        return 'Side Pot'
      case 'sidepot_9':
        return 'Side Pot'
      case 'return':
        return 'Return'
      default:
        return 'N/A'
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.state.init
          ? <>
            {/* Pot Details Modal */}
            <Modal.Body style={{ margin: "0" }}>
              <h4 className="text-left mb-4 font-weight-bold">
                Pot Details
              </h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                These insights offer you a comprehensive overview of all essential pot-specific statistics and parameters.
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              <Card className="d-flex w-100 mb-3 bg-light" style={{ borderRadius: "15px", }}>
                <Row noGutters className="row-bordered h-100">
                  <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
                    <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                          <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                          <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                        </svg>
                      </span>
                      <span className="media-body d-block ml-3">
                        <span className="text-big font-weight-bolder">
                          {formatPrice(this.props.game.data.current_game_values.total_pot)}
                        </span>
                        <br />
                        <small className="text-muted">
                          Potsize
                        </small>
                      </span>
                    </span>
                  </Col>

                  <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
                    <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                          <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="white" />
                          <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="white" />
                        </svg>
                      </span>
                      <span className="media-body d-block ml-3">
                        <span className="text-big font-weight-bolder">
                          {this.props.game.profile.table_id}
                        </span>
                        <br />
                        <small className="text-muted">
                          Game/Table
                        </small>
                      </span>
                    </span>
                  </Col>

                  <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
                    <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                          <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                          <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                        </svg>
                      </span>
                      <span className="media-body d-block ml-3">
                        <span className="text-big font-weight-bolder">{formatPrice(this.props.game.data.current_game_values.table_small_blind)}</span><br />
                        <small className="text-muted">Small Blind</small>
                      </span>
                    </span>
                  </Col>

                  <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
                    <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                          <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                          <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                        </svg>
                      </span>
                      <span className="media-body d-block ml-3">
                        <span className="text-big font-weight-bolder">{formatPrice(this.props.game.data.current_game_values.table_big_blind)}</span><br />
                        <small className="text-muted">Big Blind</small>
                      </span>
                    </span>
                  </Col>
                </Row>
              </Card>

              {this.props.game.details.pot.map
                .filter(x => x.pot_size > 0)
                .sort((a, b) => b.pot_size - a.pot_size)
                .map((item, index) => (
                  <div className="mb-0 list-group pt-0 pb-3" key={index}>
                    <span
                      onClick={this.prevent}
                      className={`d-flex list-group-item list-group-item-action online border-0 bg-instagram`}
                      style={{
                        padding: "10px",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        alignItems: "center",
                      }}>
                      <span className="svg-icon svg-icon-muted svg-icon-2hx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                          <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                        </svg>
                      </span>

                      <Media.Body className="ml-3">
                        <span className="text-medium font-weight-medium h5">
                          <Badge
                            pill variant="default"
                            className="font-weight-bold">
                            {this.getCorrectPotName(item.pot_name)}
                          </Badge>
                        </span>
                      </Media.Body>

                      <h5 className="mb-0 font-weight-bold">
                        {formatPrice(item.pot_size)}
                      </h5>
                    </span>

                    {item.pot_contributions
                      .filter(x => x.contributor_amount > 0)
                      .sort((a, b) => b.contributor_amount - a.contributor_amount)
                      .map((contrib, index) => (
                        <span
                          key={index}
                          onClick={this.prevent}
                          className={`d-flex list-group-item list-group-item-action online bg-dark border-0`}
                          style={{
                            padding: "10px",
                            alignItems: "center",
                          }}>
                          <span className="svg-icon svg-icon-muted svg-icon-2hx">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path opacity="0.3" d="M11.8 5.2L17.7 8.6V15.4L11.8 18.8L5.90001 15.4V8.6L11.8 5.2ZM11.8 2C11.5 2 11.2 2.1 11 2.2L3.8 6.4C3.3 6.7 3 7.3 3 7.9V16.2C3 16.8 3.3 17.4 3.8 17.7L11 21.9C11.3 22 11.5 22.1 11.8 22.1C12.1 22.1 12.4 22 12.6 21.9L19.8 17.7C20.3 17.4 20.6 16.8 20.6 16.2V7.9C20.6 7.3 20.3 6.7 19.8 6.4L12.6 2.2C12.4 2.1 12.1 2 11.8 2Z" fill="white" />
                              <path d="M11.8 8.69995L8.90001 10.3V13.7L11.8 15.3L14.7 13.7V10.3L11.8 8.69995Z" fill="white" />
                            </svg>
                          </span>

                          <Media.Body className="ml-3">
                            <span className="text-medium font-weight-medium h5">
                              <Badge
                                pill variant="default"
                                className="font-weight-bold">
                                {truncateString(truncateUsername(contrib.contributor_player), 24)}
                              </Badge>
                            </span>
                          </Media.Body>

                          <h5 className="mb-0 font-weight-bold small">
                            {formatPrice(contrib.contributor_amount)}
                          </h5>
                        </span>
                      ))}
                  </div>
                ))}

              <hr className="border-light m-0 py-2" />

              <Button
                variant="instagram" block
                onClick={this.props.close}
                className="font-weight-bold">
                Continue
              </Button>
            </Modal.Body>
            {/* / Pot Details Modal */}
          </>
          : <>
            {/* Pot Details Modal */}
            <Modal.Body style={{ margin: "0" }}>
              <h4 className="text-left mb-4 font-weight-bold">
                Pot Details
              </h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                These insights offer you a comprehensive overview of all essential pot-specific statistics and parameters.
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              <Card className="d-flex w-100 my-2 bg-transparent border-0 shadow-none">
                <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                  <Col
                    sm={12} md={12} lg={12}
                    className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                    <ResourceLoaderB
                      height="4rem" width="4rem" />
                  </Col>
                </Row>
              </Card>

              <div className="text-center text-white opacity-100 mb-3 small font-weight-bold">
                Pot data currently not available...
              </div>

              <div className="text-left text-left text-white opacity-50 text-tiny mb-3">
                Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
              </div>

              <hr className="border-light m-0 py-2" />

              <Button
                variant="instagram" block
                onClick={this.props.close}
                className="font-weight-bold">
                Continue
              </Button>
            </Modal.Body>
            {/* / Pot Details Modal */}
          </>}
      </>
    )
  }
}

export default PotDetails