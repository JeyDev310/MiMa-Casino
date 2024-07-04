import React, { Component } from 'react'
import { Card, Col, Collapse, Button, Media, Modal, Row } from 'react-bootstrap'

import moment from 'moment'
import FileSaver from 'file-saver'

import {
  formatPrice,
  formatCapitalized,
} from '../../utilities/TextPreprocessing'

import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'

import '../../../../../vendor/styles/pages/chat.scss'

class HandHistory extends Component {

  constructor(props) {
    super(props)

    this.getCorrectedRoundName = this.getCorrectedRoundName.bind(this)
    this.calcPlayerBalancePreGame = this.calcPlayerBalancePreGame.bind(this)

    this.downloadHandHistoryJSON = this.downloadHandHistoryJSON.bind(this)
    this.downloadHandHistoryItemJSON = this.downloadHandHistoryItemJSON.bind(this)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    if (
      this.props.game.data &&
      this.props.game.profile &&
      this.props.game.history.length > 0
    ) {
      this.setState({
        init: true,
      })
    } else {
      this.setState({
        init: false,
      })
    }
  }

  getCorrectedRoundName(round) {
    if (round === 'INIT') return 'Preflop'
    return round
  }

  calcPlayerBalancePreGame(item) {
    try {
      if (item) {
        var amount = Number((item.player_balance_post_game - item.player_winner_payout) + item.player_total_bet)
        return formatPrice(amount)
      } else {
        return 'N/A'
      }
    } catch {
      return 'N/A'
    }
  }

  downloadHandHistoryJSON() {
    if (this.props.game.history.length > 0) {
      var blob = new Blob([JSON.stringify(this.props.game.history)], { type: "application/json" })
      FileSaver.saveAs(blob, `handhistory-${this.props.game.profile.username}-${moment().valueOf()}.json`)
    }
  }

  downloadHandHistoryItemJSON(item) {
    if (item) {
      var blob = new Blob([JSON.stringify(item)], { type: "application/json" })
      FileSaver.saveAs(blob, `handhistory-review-${this.props.game.profile.username}-${moment().valueOf()}.json`)
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
            {/* Hand History Modal */}
            <Modal.Body style={{ margin: "0" }}>
              <h4 className="text-left mb-4 font-weight-bold">Hand History</h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                Get a comprehensive overview of all the games you have played in this session so far. Please note that all hand reviews are also available for download.
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              <div className="mb-3">
                {this.props.game.history
                  .slice(-10)
                  .sort((a, b) => a.game_started - b.game_started)
                  .map((item, index) =>

                    <Card key={index} className="mb-2 bg-light">
                      <Card.Header className="p-4">
                        <span
                          className="text-body font-weight-bold small cursor-pointer d-flex align-items-center"
                          onClick={e => this.props.change(e, 'handHistoryTab', index)}
                          aria-expanded={this.props.handHistoryTab === index}>

                          <span className="d-flex align-items-center mr-3">
                            {item.player_hole_cards.map((card, index) =>
                              <img
                                key={index}
                                src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                                className={`d-block ui-w-30 cursor-pointer card-item-hover-translate card-item-drop-shadow-filter ${item.player_hole_cards.length === index + 1
                                  ? "mr-0"
                                  : "mr-1"}`}
                                alt={card} />
                            )}
                          </span>

                          <span className="w-100 align-self-baseline">
                            <div className="h6 mb-0 d-flex justify-content-between">
                              <span className="font-weight-bold custom-drop-shadow-1">
                                Hand Review
                              </span>
                              <span className="small font-weight-semibold">
                                {moment(item.game_ended).format('DD.MM.YYYY (HH:mm)')}
                              </span>
                            </div>
                            <div className="opacity-75 d-flex justify-content-between">
                              <span>
                                <i className="fas fa-info-circle text-body mr-1"></i>
                                <span>
                                  Seat: {item.player_seat}
                                </span>
                              </span>
                              <span>
                                <i className="fas fa-check-circle text-body mr-1"></i>
                                <span>
                                  Total Bet: {formatPrice(item.player_total_bet)}
                                </span>
                              </span>
                            </div>
                          </span>

                        </span>
                      </Card.Header>

                      <Collapse in={this.props.handHistoryTab === index}>
                        <div>
                          <Card.Body className="d-flex justify-content-between align-items-center px-3 py-3" style={{
                            alignItems: "center",
                            backgroundColor: "rgba(37, 40, 46, 0.4)",
                          }}>
                            <div className="px-2">
                              <div className="text-tiny opacity-50 font-weight-bold">HOLE</div>
                              <div className="text-tiny opacity-50 font-weight-bold">CARDS</div>
                            </div>

                            <div className="d-flex position-relative px-2">
                              {item.player_hole_cards.map((card, index) =>
                                <img
                                  key={index}
                                  src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                                  className={`d-block ui-w-40 cursor-pointer ${item.player_hole_cards.length === index + 1 ? "mr-0" : "mr-1"}`}
                                  alt={card} />
                              )}
                            </div>
                          </Card.Body>

                          <Card.Body className="d-flex justify-content-between align-items-center px-3 py-3" style={{
                            alignItems: "center",
                            backgroundColor: "rgba(37, 40, 46, 0.1)",
                          }}>
                            <div className="px-2">
                              <div className="text-tiny opacity-50 font-weight-bold">COMMUNITY</div>
                              <div className="text-tiny opacity-50 font-weight-bold">CARDS</div>
                            </div>

                            <div className="d-flex position-relative px-2">
                              {item.game_community_cards.map((card, index) =>
                                <img
                                  key={index}
                                  src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                                  className={`d-block ui-w-30 cursor-pointer ${item.game_community_cards.length === index + 1 ? "mr-0" : "mr-1"}`}
                                  alt={card} />
                              )}
                            </div>
                          </Card.Body>

                          <Card.Body className="d-flex justify-content-between align-items-center p-0">
                            <div className="mb-0 list-group p-0 w-100">
                              <span className={`d-flex list-group-item list-group-item-action online border-0 py-1 px-4`} style={{
                                alignItems: "center",
                                backgroundColor: "rgba(37, 40, 46, 0.4)",
                              }}>
                                <Media.Body className="ml-0">
                                  <span className="text-medium font-weight-bold h5 small mb-0">Winner</span>
                                </Media.Body>
                                <h5 className="mb-0 font-weight-bold small">{item.player_winner ? "Yes" : "No"}</h5>
                              </span>

                              <span className={`d-flex list-group-item list-group-item-action online border-0 py-1 px-4`} style={{
                                alignItems: "center",
                                backgroundColor: "rgba(37, 40, 46, 0.1)",
                              }}>
                                <Media.Body className="ml-0">
                                  <span className="text-medium font-weight-bold h5 small mb-0">Total Bet</span>
                                </Media.Body>
                                <h5 className="mb-0 font-weight-bold small">{formatPrice(item.player_total_bet)}</h5>
                              </span>

                              <span className={`d-flex list-group-item list-group-item-action online border-0 py-1 px-4`} style={{
                                alignItems: "center",
                                backgroundColor: "rgba(37, 40, 46, 0.4)",
                              }}>
                                <Media.Body className="ml-0">
                                  <span className="text-medium font-weight-bold h5 small mb-0">Potsize</span>
                                </Media.Body>
                                <h5 className="mb-0 font-weight-bold small">{formatPrice(item.player_winner_pot_size)}</h5>
                              </span>

                              <span className={`d-flex list-group-item list-group-item-action online border-0 py-1 px-4`} style={{
                                alignItems: "center",
                                backgroundColor: "rgba(37, 40, 46, 0.1)",
                              }}>
                                <Media.Body className="ml-0">
                                  <span className="text-medium font-weight-bold h5 small mb-0">Payout/Rake</span>
                                </Media.Body>
                                <h5 className="mb-0 font-weight-bold small">{formatPrice(item.player_winner_payout)}/{formatPrice(item.player_winner_rake)}</h5>
                              </span>

                              <span className={`d-flex list-group-item list-group-item-action online border-0 py-1 px-4`} style={{
                                alignItems: "center",
                                backgroundColor: "rgba(37, 40, 46, 0.4)",
                              }}>
                                <Media.Body className="ml-0">
                                  <span className="text-medium font-weight-bold h5 small mb-0">Pre/Post Balance</span>
                                </Media.Body>
                                <h5 className="mb-0 font-weight-bold small">{this.calcPlayerBalancePreGame(item)}/{formatPrice(item.player_balance_post_game)}</h5>
                              </span>

                              <span className={`d-flex list-group-item list-group-item-action online border-0 py-1 px-4`} style={{
                                alignItems: "center",
                                backgroundColor: "rgba(37, 40, 46, 0.1)",
                              }}>
                                <Media.Body className="ml-0">
                                  <span className="text-medium font-weight-bold h5 small mb-0">Winning Hand</span>
                                </Media.Body>
                                <h5 className="mb-0 font-weight-bold small">
                                  {formatCapitalized(item.player_best_hand.display) !== ''
                                    ? formatCapitalized(item.player_best_hand.display)
                                    : 'N/A'}
                                </h5>
                              </span>

                              <span className={`d-flex list-group-item list-group-item-action online border-0 py-1 px-4`} style={{
                                alignItems: "center",
                                backgroundColor: "rgba(37, 40, 46, 0.4)",
                              }}>
                                <Media.Body className="ml-0">
                                  <span className="text-medium font-weight-bold h5 small mb-0">Player Seat/Player Id</span>
                                </Media.Body>
                                <h5 className="mb-0 font-weight-bold small">{item.player_seat}/{item.player_id}</h5>
                              </span>

                              <span className={`d-flex list-group-item list-group-item-action online border-0 py-1 px-4`} style={{
                                alignItems: "center",
                                backgroundColor: "rgba(37, 40, 46, 0.1)",
                              }}>
                                <Media.Body className="ml-0">
                                  <span className="text-medium font-weight-bold h5 small mb-0">Game Start/End</span>
                                </Media.Body>
                                <h5 className="mb-0 font-weight-bold text-tiny">
                                  {moment(item.game_started).format('DD.MM.YYYY HH:mm:ss')}/{moment(item.game_ended).format('DD.MM.YYYY HH:mm:ss')}
                                </h5>
                              </span>

                              <span className={`d-flex list-group-item list-group-item-action online border-0 py-1 px-4`} style={{
                                alignItems: "center",
                                backgroundColor: "rgba(37, 40, 46, 0.4)",
                              }}>
                                <Media.Body className="ml-0">
                                  <span className="text-medium font-weight-bold h5 small mb-0">Ended in</span>
                                </Media.Body>
                                <h5 className="mb-0 font-weight-bold small">{formatCapitalized(this.getCorrectedRoundName(item.game_ended_in_round))}</h5>
                              </span>

                              <span className={`d-flex list-group-item list-group-item-action online border-0 py-1 px-4`} style={{
                                alignItems: "center",
                                backgroundColor: "rgba(37, 40, 46, 0.1)",
                              }}>
                                <Media.Body className="ml-0">
                                  <span className="text-medium font-weight-bold h5 small mb-0">Game Id/Dealer</span>
                                </Media.Body>
                                <h5 className="mb-0 font-weight-bold text-tiny">{item.game_id}/{item.game_dealer}</h5>
                              </span>
                            </div>
                          </Card.Body>

                          <Card.Footer className="text-left py-2 d-flex justify-content-between">
                            <div className="text-muted text-tiny font-weight-bold d-flex align-items-center">
                              {moment(item.game_ended).format('DD.MM.YYYY (HH:mm:ss)')}
                            </div>
                            <div className="text-muted small">
                              <Button
                                size="sm"
                                variant="light rounded-pill"
                                className="font-weight-bold"
                                onClick={() => { this.downloadHandHistoryItemJSON(item) }}>
                                Download Hand Review
                              </Button>
                            </div>
                          </Card.Footer>
                        </div>
                      </Collapse>
                    </Card>

                  ).reverse()
                }
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              <Button
                variant="instagram" block
                onClick={this.props.close}
                className="font-weight-bold">
                Continue
              </Button>

              {this.state.init && (
                <Button
                  variant="default" block
                  onClick={this.downloadHandHistoryJSON}
                  className="font-weight-bold">
                  Download Hand History
                </Button>
              )}
            </Modal.Body>
            {/* / Hand History Modal */}
          </>
          : <>
            {/* Hand History Modal */}
            <Modal.Body style={{ margin: "0" }}>
              <h4 className="text-left mb-4 font-weight-bold">Hand History</h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                Get a comprehensive overview of all the games you have played in this session so far. Please note that all hand reviews are also available for download.
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              <Card className="d-flex w-100 my-2 bg-transparent border-0 shadow-none">
                <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                  <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                    <ResourceLoaderB
                      height="4rem" width="4rem" />
                  </Col>
                </Row>
              </Card>

              <div className={`text-center text-white opacity-100 mb-3`}>History data currently not available...</div>

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
            {/* / Hand History Modal */}
          </>}
      </>
    )
  }
}

export default HandHistory