import React, { Component } from 'react'
import { Badge, Card, Col, Table, Row } from 'react-bootstrap'

import moment from 'moment'
import * as numeral from 'numeral'

import API from '../../../api'
import ResourceLoaderB from '../../views/utilities/loaders/ResourceLoaderB'

import {
  formatCapitalized,
} from '../live/utilities/TextPreprocessing'

class RoundDetails extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Round Details')

    this.state = {
      init: false,
      isFetching: true,
      data: {},
      mutationError: null,
    }
  }

  async componentDidMount() {
    await API.post(
      `everymatrix/games/details/${this.props.match.params.roundId}/${this.props.match.params.gameId}/${this.props.match.params.userId}/`, {
      roundId: this.props.match.params.roundId,
      gameId: this.props.match.params.gameId,
      userId: this.props.match.params.userId,
    }).then(res => {
      if (res.status === 200) {
        this.initialize(res, 750)
      }
    }).catch(error => {
      this.setState({
        init: false,
        isFetching: false,
        data: {},
        mutationError: error.response.data.message,
      })
    })
  }

  initialize(response, ms) {
    return new Promise(resolve => setTimeout(() => {
      this.setState({
        init: true,
        isFetching: false,
        data: response.data,
        mutationError: null,
      }, () => resolve())
    }, ms))
  }

  formatInt(v) {
    return numeral(v).format('0,0')
  }

  formatPrice(p) {
    return numeral(p).format('$ 0,0.00')
  }

  getCorrectedRoundName(input) {
    if (input === 'INIT') return 'Preflop'
    return formatCapitalized(input)
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
        return 'Unknown'
    }
  }

  getCorrectPosition() {
    if (this.state.data.summary.player_bb) {
      return "Big Blind"
    }
    if (this.state.data.summary.player_sb) {
      return "Small Blind"
    }
    if (this.state.data.summary.player_dl) {
      return "Dealer"
    }
    return "No Position"
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        {this.state.init
          ? <>
            <h4 className="font-weight-bold py-2 mt-4 mb-4 d-flex justify-content-between align-items-center">
              <div>
                <span>
                  Game Round Details
                </span>
                <div
                  className="text-muted text-tiny mt-1">
                  <small className="font-weight-normal">
                    Requested by <span className="font-weight-bold">{this.state.data.user.em_username} ({this.state.data.user.em_user_id})
                    </span>
                  </small>
                </div>
              </div>
            </h4>

            {this.state.data && (
              <>
                <div className="container-m-nx container-m-ny theme-bg-white container-p-x py-5 mb-0">
                  <Row>
                    <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                      <Card className="bg-light border-0 text-white" style={{ borderRadius: "15px", }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="text-xlarge">{this.formatPrice(this.state.data.round.total_potsize)}</div>
                            <div className="small opacity-75">Total Potsize</div>
                          </div>
                          <i className="fas fa-comment-dollar text-xlarge opacity-25"></i>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                      <Card className="bg-light border-0 text-white" style={{ borderRadius: "15px", }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="text-xlarge">{this.formatPrice(this.state.data.round.total_rake)}</div>
                            <div className="small opacity-75">Total Rake</div>
                          </div>
                          <i className="fas fa-comment-dollar text-xlarge opacity-25"></i>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                      <Card className="bg-light border-0 text-white" style={{ borderRadius: "15px", }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="text-xlarge">{this.formatInt(this.state.data.round.player_count)}</div>
                            <div className="small opacity-75">Player Count</div>
                          </div>
                          <i className="fas fa-user-friends text-xlarge opacity-25"></i>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                      <Card className="bg-light border-0 text-white" style={{ borderRadius: "15px", }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="text-xlarge">{this.formatInt(this.state.data.round.table_id)}</div>
                            <div className="small opacity-75">Table ID</div>
                          </div>
                          <i className="fas fa-circle-notch text-xlarge opacity-25"></i>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                      <Card className="bg-light border-0 text-white" style={{ borderRadius: "15px", }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="text-xlarge">{this.state.data.round.auto_mode ? "Automatic" : "Live Game"}</div>
                            <div className="small opacity-75">Game Mode</div>
                          </div>
                          <i className="fas fa-gamepad text-xlarge opacity-25"></i>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                      <Card className="bg-light border-0 text-white" style={{ borderRadius: "15px", }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="text-xlarge">{this.state.data.round.dealer_name}</div>
                            <div className="small opacity-75">Dealer Name</div>
                          </div>
                          <i className="fas fa-hand-holding-usd text-xlarge opacity-25"></i>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <Card className="bg-light border-0 text-white mb-3" style={{ borderRadius: "15px", }}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="opacity-75 small">COMMUNITY</div>
                        <div className="opacity-75 small">CARDS</div>
                      </div>
                      <div className="d-flex position-relative">
                        {this.state.data.round.game_cards.map((card, index) =>
                          <img
                            key={index}
                            src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                            className={`d-block ui-w-50 cursor-pointer card-item-drop-shadow-filter ${5 === index + 1 ? "mr-0" : "mr-1"}`}
                            alt={card} />
                        )}
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="bg-light border-0 text-white mb-3" style={{ borderRadius: "15px", }}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="opacity-75 small">PLAYER</div>
                        <div className="opacity-75 small">HOLE CARDS</div>
                      </div>
                      <div className="d-flex position-relative">
                        {this.state.data.summary.player_hole_cards.map((card, index) =>
                          <img
                            key={index}
                            src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                            className={`d-block ui-w-50 cursor-pointer card-item-drop-shadow-filter ${2 === index + 1 ? "mr-0" : "mr-1"}`}
                            alt={card} />
                        )}
                      </div>
                    </Card.Body>
                  </Card>

                  <Row>
                    <Col>
                      <Card className="bg-light border-0 text-white mb-3" style={{ borderRadius: "15px", }}>
                        <Card.Header as="h6">
                          Details
                        </Card.Header>

                        <Table responsive className="card-table bg-lighter" style={{ borderRadius: "0px 0px 15px 15px", }}>
                          <thead className="d-none">
                            <tr>
                              <th>Key</th>
                              <th>Value</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td className="align-middle font-weight-bold">
                                <span className="text-body"><Badge pill variant="default" className="cursor-pointer font-weight-bold">Round UUID</Badge></span>
                              </td>
                              <td className="align-middle small font-weight-bold">{this.state.data.round.uid}</td>
                            </tr>

                            <tr>
                              <td className="align-middle font-weight-bold">
                                <span className="text-body"><Badge pill variant="default" className="cursor-pointer font-weight-bold">Game UUID</Badge></span>
                              </td>
                              <td className="align-middle small font-weight-bold">{this.state.data.round.game_uid}</td>
                            </tr>

                            <tr>
                              <td className="align-middle font-weight-bold">
                                <span className="text-body"><Badge pill variant="default" className="cursor-pointer font-weight-bold">Game Started</Badge></span>
                              </td>
                              <td className="align-middle small font-weight-bold">{moment(this.state.data.round.dt_start).format("MMMM Do YYYY, HH:mm:ss")}</td>
                            </tr>

                            <tr>
                              <td className="align-middle font-weight-bold">
                                <span className="text-body"><Badge pill variant="default" className="cursor-pointer font-weight-bold">Game Ended</Badge></span>
                              </td>
                              <td className="align-middle small font-weight-bold">{moment(this.state.data.round.dt_ended).format("MMMM Do YYYY, HH:mm:ss")}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </>
            )}

            {this.state.data && (
              <>
                <h4 className="font-weight-bold py-2 mb-4 d-flex justify-content-between align-items-center">
                  <div>
                    <span>
                      Details
                    </span>
                    <div
                      className="text-muted text-tiny mt-1">
                      <small className="font-weight-normal">
                        Player <span className="font-weight-bold">{this.state.data.user.em_username} ({this.state.data.user.em_user_id})
                        </span>
                      </small>
                    </div>
                  </div>
                </h4>

                <Row>
                  <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                    <Card className="border-light ui-bordered bg-transparent text-white" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="text-xlarge">{this.state.data.summary.player_id}</div>
                          <div className="small opacity-75">Player ID</div>
                        </div>
                        <i className="fas fa-user-edit text-xlarge opacity-100 text-danger"></i>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                    <Card className="border-light ui-bordered bg-transparent text-white" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="text-xlarge">{this.state.data.summary.player_seat}</div>
                          <div className="small opacity-75">Seat</div>
                        </div>
                        <i className="fas fa-gamepad text-xlarge opacity-100 text-danger"></i>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                    <Card className="border-light ui-bordered bg-transparent text-white" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="text-xlarge">{this.formatPrice(this.state.data.summary.player_total_bet)}</div>
                          <div className="small opacity-75">Total Bet</div>
                        </div>
                        <i className="fas fa-search-dollar text-xlarge opacity-100 text-danger"></i>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                    <Card className="border-light ui-bordered bg-transparent text-white" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="text-xlarge">{this.formatPrice(this.state.data.summary.game_table_small_blind)}</div>
                          <div className="small opacity-75">Small Blind</div>
                        </div>
                        <i className="fas fa-comment-dollar text-xlarge opacity-100 text-danger"></i>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                    <Card className="border-light ui-bordered bg-transparent text-white" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="text-xlarge">{this.formatPrice(this.state.data.summary.game_table_big_blind)}</div>
                          <div className="small opacity-75">Big Blind</div>
                        </div>
                        <i className="fas fa-comment-dollar text-xlarge opacity-100 text-danger"></i>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={6} md={4} lg={6} xl={4} className="mb-3">
                    <Card className="border-light ui-bordered bg-transparent text-white" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="text-xlarge">{this.getCorrectedRoundName(this.state.data.summary.game_ended_in_round)}</div>
                          <div className="small opacity-75">Last Round</div>
                        </div>
                        <i className="fas fa-circle-notch text-xlarge opacity-100 text-danger"></i>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {this.state.data.items
                  .filter((item) => { return item.player_winner && item.player_winner_pot_size > 0 ? true : false })
                  .map((item, index) => (
                    <Card className="pb-4 mb-3" key={index} style={{ borderRadius: "15px", }}>
                      <Row noGutters className="align-items-center">
                        <Col xs={4} md={3} className="px-4 pt-4 d-flex">
                          <i className="fas fa-trophy opacity-100 text-danger d-flex align-items-center mr-3" style={{ fontSize: "32px", }}></i>
                          <div>
                            <span onClick={this.prevent} className="text-body font-weight-semibold">
                              {this.getCorrectPotName(item.player_winner_pot_name)}
                            </span>
                            <br />
                            <small className="text-muted">
                              Player: {this.state.data.user.em_username} ({this.state.data.user.em_user_id})
                            </small>
                          </div>
                        </Col>

                        <Col xs={4} md={3} className="px-4 pt-4 d-flex" style={{ "textAlign": "end", }}>
                          <div className="w-100">
                            <div className="text-xlarge">{this.formatPrice(item.player_winner_pot_size)}</div>
                            <div className="small opacity-75">Potsize</div>
                          </div>
                        </Col>

                        <Col xs={4} md={3} className="px-4 pt-4 d-flex" style={{ "textAlign": "end", }}>
                          <div className="w-100">
                            <div className="text-xlarge">{this.formatPrice(item.player_winner_payout)}</div>
                            <div className="small opacity-75">Payout</div>
                          </div>
                        </Col>

                        <Col xs={4} md={3} className="px-4 pt-4 d-flex" style={{ "textAlign": "end", }}>
                          <div className="w-100">
                            <div className="text-xlarge">{this.formatPrice(item.player_winner_rake)}</div>
                            <div className="small opacity-75">Rake</div>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  ))}

                <Row className="mb-5">
                  <Col>
                    <Card className="bg-light border-0 text-white mb-3" style={{ borderRadius: "15px", }}>
                      <Card.Header as="h6">
                        Details
                      </Card.Header>

                      <Table responsive className="card-table bg-lighter" style={{ borderRadius: "0px 0px 15px 15px", }}>
                        <thead className="d-none">
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td className="align-middle font-weight-bold">
                              <span className="text-body"><Badge pill variant="default" className="cursor-pointer font-weight-bold">Details UUID</Badge></span>
                            </td>
                            <td className="align-middle small font-weight-bold">{this.state.data.summary.summary_id}</td>
                          </tr>

                          <tr>
                            <td className="align-middle font-weight-bold">
                              <span className="text-body"><Badge pill variant="default" className="cursor-pointer font-weight-bold">Game UUID</Badge></span>
                            </td>
                            <td className="align-middle small font-weight-bold">{this.state.data.summary.game_id}</td>
                          </tr>

                          <tr>
                            <td className="align-middle font-weight-bold">
                              <span className="text-body"><Badge pill variant="default" className="cursor-pointer font-weight-bold">Creation Date</Badge></span>
                            </td>
                            <td className="align-middle small font-weight-bold">{moment(this.state.data.summary.created_at).format("MMMM Do YYYY, HH:mm:ss")}</td>
                          </tr>

                          <tr>
                            <td className="align-middle font-weight-bold">
                              <span className="text-body"><Badge pill variant="default" className="cursor-pointer font-weight-bold">Last Update</Badge></span>
                            </td>
                            <td className="align-middle small font-weight-bold">{moment(this.state.data.summary.updated_at).format("MMMM Do YYYY, HH:mm:ss")}</td>
                          </tr>

                          <tr>
                            <td className="align-middle font-weight-bold">
                              <span className="text-body"><Badge pill variant="default" className="cursor-pointer font-weight-bold">Player Position</Badge></span>
                            </td>
                            <td className="align-middle small font-weight-bold">{this.getCorrectPosition()}</td>
                          </tr>

                          <tr>
                            <td className="align-middle font-weight-bold">
                              <span className="text-body"><Badge pill variant="default" className="cursor-pointer font-weight-bold">Event</Badge></span>
                            </td>
                            <td className="align-middle small font-weight-bold">{this.state.data.summary.player_event}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Row>
              </>
            )}
          </>
          : <>
            <Card className="d-flex w-100 my-2 bg-transparent border-0 shadow-none">
              <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                <Col
                  sm={12} md={12} lg={12}
                  className="d-flex align-items-center border-0 shadow-none"
                  style={{ justifyContent: "center", }}>
                  <ResourceLoaderB
                    height="4rem" width="4rem" />
                </Col>
              </Row>
              <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                <Col
                  sm={12} md={12} lg={12}
                  className="d-flex align-items-center border-0 shadow-none"
                  style={{ justifyContent: "center", }}>
                  {this.state.mutationError && (
                    <div className="small font-weight-bold mt-4">
                      {this.state.mutationError}
                    </div>
                  )}
                </Col>
              </Row>
            </Card>
          </>
        }
      </div>
    )
  }
}

export default RoundDetails
