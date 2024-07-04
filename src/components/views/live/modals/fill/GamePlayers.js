import React, { Component } from 'react'
import { Button, Card, Col, Media, Modal, Row, Spinner } from 'react-bootstrap'

import moment from 'moment'

import {
  formatCapitalized,
  formatPrice,
  truncateUsername,
} from '../../utilities/TextPreprocessing'

import '../../../../../vendor/styles/pages/chat.scss'

class GamePlayers extends Component {

  constructor(props) {
    super(props)

    this.getItemOpacity = this.getItemOpacity.bind(this)
    this.getEvaluationTotalPot = this.getEvaluationTotalPot.bind(this)
    this.getEvaluationDatetime = this.getEvaluationDatetime.bind(this)
    this.getEvaluationRoundName = this.getEvaluationRoundName.bind(this)
    this.getEvaluationCommunityCards = this.getEvaluationCommunityCards.bind(this)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    if (this.props.game.players) {
      this.setState({
        init: true,
      })
    } else {
      this.setState({
        init: false,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.game.players !== this.props.game.players) {
      if (this.props.game.players) {
        this.setState({
          init: true,
        })
      } else {
        this.setState({
          init: false,
        })
      }
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  getItemOpacity(item) {
    if (item.p_waiting) return 1.0
    return 1.0
  }

  getEvaluationCommunityCards() {
    try {
      if (this.props.game.evaluation.winner_map.length > 0) {
        return (<>
          {this.props.game.evaluation.winner_map[0].game_community_cards.map((card, index) =>
            <img
              key={index}
              src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
              className={`d-block ui-w-40 ${this.props.game.evaluation.winner_map[0].game_community_cards.length === index + 1 ? "mr-0" : "mr-1"}`}
              alt={card} />
          )}
        </>)
      }
    } catch {
      return []
    }
  }

  getEvaluationRoundName(round) {
    if (round === 'INIT') return 'Preflop'
    return round
  }

  getEvaluationDatetime() {
    try {
      if (this.props.game.evaluation.winner_map.length > 0) {
        let started = moment(this.props.game.evaluation.winner_map[0].game_started).format('DD.MM.YYYY HH:mm:ss')
        let ended = moment(this.props.game.evaluation.winner_map[0].game_ended).format('DD.MM.YYYY HH:mm:ss')
        let round = formatCapitalized(this.getEvaluationRoundName(this.props.game.evaluation.winner_map[0].game_ended_in_round))
        return `Game started ${started} / Game ended ${ended} (in ${round})`
      }
    } catch {
      return null
    }
  }

  getEvaluationTotalPot() {
    try {
      if (this.props.game.evaluation.winner_map.length > 0) {
        let amount = this.props.game.evaluation.winner_map[0].game_total_pot
        return (<React.Fragment>{formatPrice(amount)}</React.Fragment>)
      }
    } catch {
      return (<React.Fragment>{formatPrice(0)}</React.Fragment>)
    }
  }

  render() {
    return (
      <>
        {this.state.init
          ? <React.Fragment>

            {/* Game Players Modal */}
            <Modal.Body style={{
              borderRadius: "15px",
              backgroundColor: "rgba(37, 40, 46, 0.7)",
            }}>
              <h1 className="text-center display-4 font-weight-bold">New Game</h1>

              <hr className="border-light m-0 py-2" />

              <Card className="bg-light border-0 text-white mb-3" style={{ borderRadius: "15px", }}>
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-xlarge font-weight-bold">No Limit Hold'em</div>
                    <div className="small opacity-75">
                      {this.props.game.players.game_id}
                    </div>
                  </div>
                  <div className="d-flex position-relative">
                    {moment().format('DD.MM.YYYY HH:mm:ss')}
                  </div>
                </Card.Body>
              </Card>

              <Card className="d-flex w-100 mb-3 bg-transparent border-0 shadow-none" style={{ borderRadius: "15px", }}>
                <Row noGutters className="h-100 border-0 bg-transparent" style={{ justifyContent: "center", }}>

                  {this.props.game.players.game_players.length > 0
                    ? <div className="flex-grow-1 position-relative">
                      {this.props.game.players.game_players
                        .sort((a, b) => a.p_seat - b.p_seat)
                        .map((item, index) =>
                          <span
                            key={index}
                            onClick={this.prevent}
                            className={`d-flex list-group-item list-group-item-action online border-0 bg-transparent py-2`}
                            style={{
                              border: "0px",
                              opacity: `${this.getItemOpacity(item)}`,
                            }}>

                            <div className="d-flex position-relative">
                              {["X", "X"].map((card, index) =>
                                <img
                                  key={index}
                                  src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                                  className={`d-block ui-w-40 ${["X", "X"].length === index + 1 ? "mr-0" : "mr-1"}`}
                                  alt={card} />
                              )}
                            </div>

                            <Media.Body className="ml-3" style={{ display: "grid", alignContent: "center", }}>
                              <span className="text-medium font-weight-bolder h4 mb-1">
                                {item.p_seat} | {truncateUsername(item.p_username)} | {formatPrice(item.p_balance_display)}
                              </span>

                              <div className="chat-status small text-body font-weight-bold">
                                <i className="far fa-id-card text-body ml-0"></i>
                                <span className="text-medium font-weight-bold ml-1 text-body">
                                  {item.id}
                                </span>

                                <i className="fas fa-user-check text-body ml-2"></i>
                                <span className="text-medium font-weight-bold ml-1 text-body">
                                  {item.p_waiting && 'Waiting'}
                                  {item.p_inactive && 'Inactive'}
                                  {item.p_exited && 'Exited'}
                                </span>
                              </div>
                            </Media.Body>

                            <div className="badge badge-light text-right" style={{ display: "grid", alignContent: "center", }}>
                              <h5 className="mb-1">
                                <span className="text-medium font-weight-bold ml-2 h4" style={{ verticalAlign: "middle", }}>
                                  {formatPrice(item.p_balance_display)}
                                </span>
                              </h5>

                              <span className="text-medium font-weight-bold ml-1" style={{ verticalAlign: "middle", }}>
                                {formatPrice(0)}
                              </span>
                            </div>
                          </span>
                        )}
                    </div>
                    : <div className="flex-grow-1 position-relative">
                      <Row noGutters className="h-100 border-0 bg-transparent mt-2" style={{
                        justifyContent: "center",
                      }}>
                        <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none mb-3" style={{ justifyContent: "center", }}>
                          <Spinner animation="border" variant="danger" className="d-block" style={{ height: "4rem", width: "4rem", }} />
                        </Col>

                        <div className={`text-center text-white opacity-100 mb-3`}>There are currently no players online....</div>

                        <div className="text-left text-left text-white opacity-50 text-tiny mb-0">
                          Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                        </div>
                      </Row>
                    </div>}

                </Row>
              </Card>

              <div className="text-center text-white opacity-50 text-tiny mb-3">
                {this.getEvaluationDatetime()}
              </div>

              <hr className="border-light m-0 py-2" />

              <Button variant="instagram" block onClick={this.props.close}>Accept</Button>

            </Modal.Body>
            {/* / Game Players Modal */}

          </React.Fragment>
          : <React.Fragment>

            {/* Game Players Modal */}
            <Modal.Body style={{
              borderRadius: "15px",
              backgroundColor: "rgba(37, 40, 46, 0.7)",
            }}>
              <h1 className="text-center display-4 font-weight-bold">Game Players</h1>
              <hr className="border-light m-0 py-2" />

              <Card className="d-flex w-100 mb-3 bg-transparent border-0 shadow-none" style={{
                borderRadius: "15px",
              }}>
                <Row noGutters className="h-100 border-0 bg-transparent" style={{
                  justifyContent: "center",
                }}>
                  <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none mb-3" style={{ justifyContent: "center", }}>
                    <Spinner animation="border" variant="danger" className="d-block" style={{ height: "4rem", width: "4rem", }} />
                  </Col>

                  <div className={`text-center text-white opacity-100 mb-3`}>Player data currently not available...</div>

                  <div className="text-left text-left text-white opacity-50 text-tiny mb-0">
                    Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                  </div>
                </Row>
              </Card>

              <hr className="border-light m-0 py-2" />

              <Button variant="instagram" block onClick={this.props.close}>Accept</Button>
            </Modal.Body>
            {/* / Game Players Modal */}

          </React.Fragment>}
      </>
    )
  }
}

export default GamePlayers