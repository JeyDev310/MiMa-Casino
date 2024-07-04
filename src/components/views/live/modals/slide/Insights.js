import React, { Component } from 'react'
import { Button, Card, Col, Dropdown, Media, Modal, Row } from 'react-bootstrap'

import * as Chartjs from 'react-chartjs-2'
import PerfectScrollbar from 'react-perfect-scrollbar'

import {
  formatPrice,
  calcListAverage,
  calcListMaximum,
  calcListMinimum,
  formatCapitalized,
} from '../../utilities/TextPreprocessing'

import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/libs/react-perfect-scrollbar/react-perfect-scrollbar.scss'

class Insights extends Component {

  constructor(props) {
    super(props)

    this.renderChartPlayerBestHandsHistogram = this.renderChartPlayerBestHandsHistogram.bind(this)
    this.renderChartCommunityCardsHistogram = this.renderChartCommunityCardsHistogram.bind(this)
    this.renderChartHoleCardsHistogram = this.renderChartHoleCardsHistogram.bind(this)
    this.renderChartFinalRoundsHistogram = this.renderChartFinalRoundsHistogram.bind(this)
    this.renderChartTotalBetHistogram = this.renderChartTotalBetHistogram.bind(this)
    this.renderChartWinnerPotsizeHistogram = this.renderChartWinnerPotsizeHistogram.bind(this)
    this.renderChartWinnerPayoutHistogram = this.renderChartWinnerPayoutHistogram.bind(this)
    this.renderChartBalancePostGameHistogram = this.renderChartBalancePostGameHistogram.bind(this)
    this.renderChartTotalBetAndWinnerPayout = this.renderChartTotalBetAndWinnerPayout.bind(this)
    this.renderChartPlayerBestHandsRanking = this.renderChartPlayerBestHandsRanking.bind(this)
    this.renderChartFinalRoundsRanking = this.renderChartFinalRoundsRanking.bind(this)
    this.renderChartChancesOfWinningHistogram = this.renderChartChancesOfWinningHistogram.bind(this)

    this.onHandleChangeView = this.onHandleChangeView.bind(this)
    this.onHandleChangeScale = this.onHandleChangeScale.bind(this)
    this.onHandleTranslateHandName = this.onHandleTranslateHandName.bind(this)
    this.onHandleTranslateRoundName = this.onHandleTranslateRoundName.bind(this)
    this.onHandleRenderFinalRoundItem = this.onHandleRenderFinalRoundItem.bind(this)

    this.state = {
      init: false,
      board: false,
      hole: false,

      scale1: true,
      scale2: true,
      scale3: true,
      scale4: true,
      scale5: true,
      scale6: true,
      scale7: true,

      view1: true,
      view2: true,
    }
  }

  componentDidMount() {
    if (this.props.game.data) {
      this.setState({
        board: true,
      })
    } else {
      this.setState({
        board: false,
      })
    }
    if (this.props.game.data &&
      this.props.game.player &&
      this.props.game.profile
    ) {
      this.setState({
        hole: true,
      })
    } else {
      this.setState({
        hole: false,
      })
    }
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

  prevent(e) {
    e.preventDefault()
  }

  onHandleChangeScale(field) {
    const value = !this.state[field]
    this.setState({
      [field]: value,
    })
  }

  onHandleChangeView(field) {
    const value = !this.state[field]
    this.setState({
      [field]: value,
    })
  }

  onHandleTranslateHandName(name) {
    switch (name) {
      case 'FLUSH':
        return String('Flush')
      case 'FOURCARD':
        return String('Fourcard')
      case 'FULLHOUSE':
        return String('Full House')
      case 'ONEPAIR':
        return String('Onepair')
      case 'ROYALFLUSH':
        return String('Royal Flush')
      case 'STRAIGHT':
        return String('Straight')
      case 'STRAIGHTFLUSH':
        return String('Straight Flush')
      case 'THREECARD':
        return String('Threecard')
      case 'TWOPAIR':
        return String('Twopair')
      default:
        return String('Highcard')
    }
  }

  onHandleTranslateRoundName(name) {
    switch (name) {
      case 'INIT':
        return String('Preflop')
      case 'PREFLOP':
        return String('Preflop')
      case 'FLOP':
        return String('Flop')
      case 'TURN':
        return String('Turn')
      case 'RIVER':
        return String('River')
      case 'SHOWDOWN':
        return String('Showdown')
      default:
        return String('N/A')
    }
  }

  onHandleRenderFinalRoundItem(obj, key, mode) {
    try {
      if (mode) {
        var ratio = Number(obj[key] / (Object.values(obj).reduce((a, b) => a + b, 0))) * 100
        return (<React.Fragment>{parseFloat(ratio).toFixed(0)}%</React.Fragment>)
      } else {
        var count = obj[key]
        var total = Object.values(obj).reduce((a, b) => a + b, 0)
        return (<React.Fragment>{count}/{total}</React.Fragment>)
      }
    } catch {
      return (<React.Fragment>N/A (N/A)</React.Fragment>)
    }
  }

  renderChartCommunityCardsHistogram() {

    var communityCards = {}
    this.props.game.history.forEach(function (v) {
      v.game_community_cards.forEach(function (i) {
        communityCards[i] = (communityCards[i] || 0) + 1
      })
    })

    var n = []
    Object.keys(communityCards).forEach(function (v) {
      n.push({
        card: v,
        count: communityCards[v],
        ratio: Number(communityCards[v] / (Object.values(communityCards).reduce((a, b) => a + b, 0))) * 100,
      })
    })

    return (<React.Fragment>
      <Card className="mb-3 bg-light" style={{
        borderRadius: "15px",
      }}>
        <Card.Header as="h6" className="with-elements pr-0">
          <div className="card-header-title">Community Cards</div>
          <div className="card-header-elements ml-auto">
            <Dropdown alignRight={false} className="dropdown-toggle-hide-arrow">
              <Dropdown.Toggle variant="default" size="sm" className="icon-btn borderless rounded-pill md-btn-flat mr-3">
                <i className="ion ion-ios-more"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { this.onHandleChangeView('view1') }} className="small">
                  {this.state.view1 ? 'View All' : 'View Top 10'}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>

        {this.state.view1
          ? <Card.Body className="pb-2">
            <div className="flex-grow-1 position-relative">
              <Row>
                {n
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 10)
                  .map((item, index) =>
                    <Col sm={6} md={6} lg={6} key={index}>
                      <Media className={`align-items-center card-hover pb-1 ${index + 1 === n.length ? 'mb-0' : 'mb-2'}`}>
                        <div className="d-flex position-relative">
                          <img
                            src={`${process.env.PUBLIC_URL}/svg/cards/${item.card}.svg`}
                            className={`d-block ui-w-30 mr-2 card-item-drop-shadow-filter`}
                            alt={item.card} />
                        </div>
                        <Media.Body className="ml-2">
                          <span onClick={this.prevent} className="text-body font-weight-bold">
                            {item.card}
                          </span>
                          <div className="text-muted small">
                            Count: {item.count}
                          </div>
                        </Media.Body>
                        <Button variant="default md-btn-flat" size="sm" className="d-block font-weight-bold">
                          {parseFloat(item.ratio).toFixed(1)}%
                        </Button>
                      </Media>
                    </Col>
                  )}
              </Row>
            </div>
          </Card.Body>
          : <PerfectScrollbar style={{ height: '300px' }}>
            <Card.Body className="pb-2">
              <div className="flex-grow-1 position-relative">
                <Row>
                  {n
                    .sort((a, b) => b.count - a.count)
                    .map((item, index) =>
                      <Col sm={6} md={6} lg={6} key={index}>
                        <Media className={`align-items-center card-hover pb-1 ${index + 1 === n.length ? 'mb-0' : 'mb-2'}`}>
                          <div className="d-flex position-relative">
                            <img
                              src={`${process.env.PUBLIC_URL}/svg/cards/${item.card}.svg`}
                              className={`d-block ui-w-30 mr-2 card-item-drop-shadow-filter`}
                              alt={item.card} />
                          </div>
                          <Media.Body className="ml-2">
                            <span onClick={this.prevent} className="text-body font-weight-bold">
                              {item.card}
                            </span>
                            <div className="text-muted small">
                              Count: {item.count}
                            </div>
                          </Media.Body>
                          <Button variant="default md-btn-flat" size="sm" className="d-block font-weight-bold">
                            {parseFloat(item.ratio).toFixed(1)}%
                          </Button>
                        </Media>
                      </Col>
                    )}
                </Row>
              </div>
            </Card.Body>
          </PerfectScrollbar>}
        <Card.Footer className="small text-muted">
          {Object.values(communityCards).reduce((a, b) => a + b, 0)} community cards were dealt.
        </Card.Footer>
      </Card>
    </React.Fragment>)
  }

  renderChartHoleCardsHistogram() {

    var holeCards = {}
    this.props.game.history.forEach(function (v) {
      v.player_hole_cards.forEach(function (i) {
        holeCards[i] = (holeCards[i] || 0) + 1
      })
    })

    var n = []
    Object.keys(holeCards).forEach(function (v) {
      n.push({
        card: v,
        count: holeCards[v],
        ratio: Number(holeCards[v] / (Object.values(holeCards).reduce((a, b) => a + b, 0))) * 100,
      })
    })

    return (<React.Fragment>
      <Card className="w-100 mb-3 bg-light" style={{
        borderRadius: "15px",
      }}>
        <Card.Header as="h6" className="with-elements pr-0">
          <div className="card-header-title">Hole Cards</div>
          <div className="card-header-elements ml-auto">
            <Dropdown alignRight={false} className="dropdown-toggle-hide-arrow">
              <Dropdown.Toggle variant="default" size="sm" className="icon-btn borderless rounded-pill md-btn-flat mr-3">
                <i className="ion ion-ios-more"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { this.onHandleChangeView('view2') }} className="small">
                  {this.state.view2 ? 'View All' : 'View Top 10'}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>

        {this.state.view2
          ? <Card.Body className="pb-2">
            <div className="flex-grow-1 position-relative">
              <Row>
                {n
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 10)
                  .map((item, index) =>
                    <Col sm={6} md={6} lg={6} key={index}>
                      <Media className={`align-items-center card-hover pb-1 ${index + 1 === n.length ? 'mb-0' : 'mb-2'}`}>
                        <div className="d-flex position-relative">
                          <img
                            src={`${process.env.PUBLIC_URL}/svg/cards/${item.card}.svg`}
                            className={`d-block ui-w-30 mr-2 card-item-drop-shadow-filter`}
                            alt={item.card} />
                        </div>
                        <Media.Body className="ml-2">
                          <span onClick={this.prevent} className="text-body font-weight-bold">
                            {item.card}
                          </span>
                          <div className="text-muted small">
                            Count: {item.count}
                          </div>
                        </Media.Body>
                        <Button variant="default md-btn-flat" size="sm" className="d-block font-weight-bold">
                          {parseFloat(item.ratio).toFixed(1)}%
                        </Button>
                      </Media>
                    </Col>
                  )}
              </Row>
            </div>
          </Card.Body>
          : <PerfectScrollbar style={{ height: '300px' }}>
            <Card.Body className="pb-2">
              <div className="flex-grow-1 position-relative">
                <Row>
                  {n
                    .sort((a, b) => b.count - a.count)
                    .map((item, index) =>
                      <Col sm={6} md={6} lg={6} key={index}>
                        <Media className={`align-items-center card-hover pb-1 ${index + 1 === n.length ? 'mb-0' : 'mb-2'}`}>
                          <div className="d-flex position-relative">
                            <img
                              src={`${process.env.PUBLIC_URL}/svg/cards/${item.card}.svg`}
                              className={`d-block ui-w-30 mr-2 card-item-drop-shadow-filter`}
                              alt={item.card} />
                          </div>
                          <Media.Body className="ml-2">
                            <span onClick={this.prevent} className="text-body font-weight-bold">
                              {item.card}
                            </span>
                            <div className="text-muted small">
                              Count: {item.count}
                            </div>
                          </Media.Body>
                          <Button variant="default md-btn-flat" size="sm" className="d-block font-weight-bold">
                            {parseFloat(item.ratio).toFixed(1)}%
                          </Button>
                        </Media>
                      </Col>
                    )}
                </Row>
              </div>
            </Card.Body>
          </PerfectScrollbar>}
        <Card.Footer className="small text-muted">
          {Object.values(holeCards).reduce((a, b) => a + b, 0)} hole cards were dealt.
        </Card.Footer>
      </Card>
    </React.Fragment>)
  }

  renderChartPlayerBestHandsHistogram() {

    var hands = {}
    this.props.game.history.forEach(function (v) {
      hands[v.player_best_hand.display] = (hands[v.player_best_hand.display] || 0) + 1
    })

    var _hands = JSON.parse(JSON.stringify(hands))

    var handsData = Object.values(_hands)
    var handsLabels = Object.keys(_hands).map(name => formatCapitalized(name.toString().toLowerCase()))

    return (<React.Fragment>
      <Card className="mb-3 bg-light" style={{
        borderRadius: "15px",
      }}>
        <Card.Header as="h6" className="with-elements border-0 pr-0 pb-0">
          <div className="card-header-title">Best Hands</div>
          <div className="card-header-elements ml-auto">
            <Dropdown alignRight={false} className="dropdown-toggle-hide-arrow">
              <Dropdown.Toggle variant="default" size="sm" className="icon-btn borderless rounded-pill md-btn-flat mr-3">
                <i className="ion ion-ios-more"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { this.onHandleChangeScale('scale2') }} className="small">Linear/Log</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>
        <div className="px-2">
          <Chartjs.Bar className="w-100"
            height={117}
            data={{
              datasets: [{
                data: handsData,
                borderWidth: 0,
                backgroundColor: '#673AB7'
              }],
              labels: handsLabels,
            }}
            options={{
              tooltips: {
                callbacks: {
                  label: function (t, d) {
                    var value = t.yLabel
                    var yLabel = value.toString()
                    return formatCapitalized(yLabel)
                  }
                }
              },
              scales: {
                xAxes: [{
                  display: false,
                }],
                yAxes: [{
                  display: false,
                  type: this.state.scale2 ? "logarithmic" : "linear",
                }]
              },
              legend: {
                display: false,
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </Card>
    </React.Fragment>)
  }

  renderChartTotalBetHistogram() {

    var totalBets = []
    this.props.game.history.forEach(function (v) {
      totalBets.push(Number(v.player_total_bet))
    })

    return (<React.Fragment>
      <Card className="mb-3 bg-light" style={{
        borderRadius: "15px",
      }}>
        <Card.Header as="h6" className="with-elements border-0 pr-0 pb-0">
          <div className="card-header-title">Total Bet</div>
          <div className="card-header-elements ml-auto">
            <Dropdown alignRight={false} className="dropdown-toggle-hide-arrow">
              <Dropdown.Toggle variant="default" size="sm" className="icon-btn borderless rounded-pill md-btn-flat mr-3">
                <i className="ion ion-ios-more"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { this.onHandleChangeScale('scale4') }} className="small">Linear/Log</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>
        <div className="mt-3">
          {totalBets.length > 1
            ? <Chartjs.Line
              height={100}
              data={{
                datasets: [{
                  data: totalBets.slice(-256),
                  borderWidth: 1,
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderColor: '#009688',
                  pointBorderColor: 'rgba(0,0,0,0)',
                  pointRadius: 1,
                  lineTension: 0,
                }],
                labels: Array.from({ length: Object.keys(totalBets).length }, (_, index) => index + 1).slice(-256),
              }}
              options={{
                tooltips: {
                  callbacks: {
                    label: function (t, d) {
                      var value = parseFloat(t.yLabel).toFixed(2)
                      var yLabel = value >= 1000 ? ' $' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ' $' + value
                      return yLabel
                    }
                  }
                },
                scales: {
                  xAxes: [{
                    display: false,
                  }],
                  yAxes: [{
                    display: false,
                    type: this.state.scale4 ? "logarithmic" : "linear",
                  }]
                },
                legend: {
                  display: false,
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
            : <Row noGutters className="h-100 border-0 shadow-none mb-4">
              <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                <ResourceLoaderB height="2rem" width="2rem" />
              </Col>
            </Row>}
        </div>
        <Card.Footer className="text-center py-2">
          <Row>
            <Col>
              <div className="text-muted small">Average</div>
              <strong className="text-big">
                {formatPrice(calcListAverage(totalBets))}
              </strong>
            </Col>
            <Col>
              <div className="text-muted small">Min/Max</div>
              <strong className="text-big">
                {formatPrice(calcListMinimum(totalBets))}/{formatPrice(calcListMaximum(totalBets))}
              </strong>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </React.Fragment>)
  }

  renderChartWinnerPayoutHistogram() {

    var winnerPayout = []
    this.props.game.history.forEach(function (v) {
      winnerPayout.push(Number(v.player_winner_payout))
    })

    return (<React.Fragment>
      <Card className="mb-3 bg-light" style={{
        borderRadius: "15px",
      }}>
        <Card.Header as="h6" className="with-elements border-0 pr-0 pb-0">
          <div className="card-header-title">Payout</div>
          <div className="card-header-elements ml-auto">
            <Dropdown alignRight={false} className="dropdown-toggle-hide-arrow">
              <Dropdown.Toggle variant="default" size="sm" className="icon-btn borderless rounded-pill md-btn-flat mr-3">
                <i className="ion ion-ios-more"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { this.onHandleChangeScale('scale5') }} className="small">Linear/Log</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>
        <div className="mt-3">
          {winnerPayout.length > 1
            ? <Chartjs.Line
              height={100}
              data={{
                datasets: [{
                  data: winnerPayout.slice(-256),
                  borderWidth: 1,
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderColor: '#009688',
                  pointBorderColor: 'rgba(0,0,0,0)',
                  pointRadius: 1,
                  lineTension: 0,
                }],
                labels: Array.from({ length: Object.keys(winnerPayout).length }, (_, index) => index + 1).slice(-256),
              }}
              options={{
                tooltips: {
                  callbacks: {
                    label: function (t, d) {
                      var value = parseFloat(t.yLabel).toFixed(2)
                      var yLabel = value >= 1000 ? ' $' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ' $' + value
                      return yLabel
                    }
                  }
                },
                scales: {
                  xAxes: [{
                    display: false,
                  }],
                  yAxes: [{
                    display: false,
                    type: this.state.scale5 ? "logarithmic" : "linear",
                  }]
                },
                legend: {
                  display: false,
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
            : <Row noGutters className="h-100 border-0 shadow-none mb-4">
              <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                <ResourceLoaderB
                  height="2rem" width="2rem" />
              </Col>
            </Row>}
        </div>
        <Card.Footer className="text-center py-2">
          <Row>
            <Col>
              <div className="text-muted small">Average</div>
              <strong className="text-big">
                {formatPrice(calcListAverage(winnerPayout))}
              </strong>
            </Col>
            <Col>
              <div className="text-muted small">Min/Max</div>
              <strong className="text-big">
                {formatPrice(calcListMinimum(winnerPayout))}/{formatPrice(calcListMaximum(winnerPayout))}
              </strong>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </React.Fragment>)
  }

  renderChartWinnerPotsizeHistogram() {

    var winnerPotsize = []
    this.props.game.history.forEach(function (v) {
      winnerPotsize.push(Number(v.player_winner_pot_size))
    })

    return (<React.Fragment>
      <Card className="mb-3 bg-light" style={{
        borderRadius: "15px",
      }}>
        <Card.Body>
          <div className="float-right text-success text-tiny">
            <div className="card-header-elements ml-auto">
              <Button
                size="sm"
                variant="light rounded-pill md-btn-flat"
                className="font-weight-bold"
                onClick={() => { this.onHandleChangeScale('scale7') }}>
                {this.state.scale7
                  ? 'Logarithmic'
                  : 'Linear'}
              </Button>
            </div>
          </div>
          <div className="text-muted small">Potsize</div>
          <div className="text-xlarge">
            {formatPrice(calcListAverage(winnerPotsize))}
          </div>
        </Card.Body>
        <div className="w-100 my-0">
          {winnerPotsize.length > 1
            ? <Chartjs.Line
              className="w-100"
              height={86}
              data={{
                datasets: [{
                  data: winnerPotsize.slice(-256),
                  borderWidth: 1,
                  backgroundColor: 'rgba(206, 221, 54, 0.2)',
                  borderColor: '#cedd36',
                  pointBackgroundColor: 'rgba(0,0,0,0)',
                  pointBorderColor: 'rgba(0,0,0,0)',
                  pointRadius: 1,
                }],
                labels: Array.from({ length: Object.keys(winnerPotsize).length }, (_, index) => index + 1).slice(-256),
              }}
              options={{
                tooltips: {
                  callbacks: {
                    label: function (t, d) {
                      var value = parseFloat(t.yLabel).toFixed(2)
                      var yLabel = value >= 1000 ? ' $' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ' $' + value
                      return yLabel
                    }
                  }
                },
                scales: {
                  xAxes: [{
                    display: false,
                  }],
                  yAxes: [{
                    display: false,
                    type: this.state.scale7 ? "logarithmic" : "linear",
                  }]
                },
                legend: {
                  display: false,
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
            : <Row noGutters className="h-100 border-0 shadow-none mb-4">
              <Col sm={12} md={12} lg={12} className="d-flex align-items-center justify-content-center border-0 shadow-none">
                <ResourceLoaderB
                  height="2rem" width="2rem" />
              </Col>
            </Row>}
        </div>
        <Card.Footer className="text-center py-2">
          <Row>
            <Col>
              <div className="text-muted small">Minimum</div>
              <strong className="text-big">
                {formatPrice(calcListMinimum(winnerPotsize))}
              </strong>
            </Col>
            <Col>
              <div className="text-muted small">Maximum</div>
              <strong className="text-big">
                {formatPrice(calcListMaximum(winnerPotsize))}
              </strong>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </React.Fragment>)
  }

  renderChartBalancePostGameHistogram() {

    var balancePostGame = []
    this.props.game.history.forEach(function (v) {
      balancePostGame.push(Number(v.player_balance_post_game))
    })

    return (<React.Fragment>
      <Card className="mb-3 bg-light" style={{
        borderRadius: "15px",
      }}>
        <Card.Body>
          <div className="float-right text-success text-tiny">
            <div className="card-header-elements ml-auto">
              <Button
                size="sm"
                variant="light rounded-pill md-btn-flat"
                className="font-weight-bold"
                onClick={() => { this.onHandleChangeScale('scale6') }}>
                {this.state.scale6
                  ? 'Logarithmic'
                  : 'Linear'}
              </Button>
            </div>
          </div>
          <div className="text-muted small">
            Balance Post Game
          </div>
          <div className="text-xlarge">{formatPrice(calcListAverage(balancePostGame))}</div>
        </Card.Body>
        <div className="px-2">
          {balancePostGame.length > 1
            ? <Chartjs.Bar className="w-100"
              height={117}
              data={{
                datasets: [{
                  data: balancePostGame.slice(-128),
                  borderWidth: 0,
                  backgroundColor: '#673AB7',
                }],
                labels: Array.from({ length: Object.keys(balancePostGame).length }, (_, index) => index + 1).slice(-128),
              }}
              options={{
                tooltips: {
                  callbacks: {
                    label: function (t, d) {
                      var value = parseFloat(t.yLabel).toFixed(2)
                      var yLabel = value >= 1000 ? ' $' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ' $' + value
                      return yLabel
                    }
                  }
                },
                scales: {
                  xAxes: [{
                    display: false,
                  }],
                  yAxes: [{
                    display: false,
                    type: this.state.scale6 ? "logarithmic" : "linear",
                  }]
                },
                legend: {
                  display: false,
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
            : <Row noGutters className="h-100 border-0 shadow-none mb-4">
              <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                <ResourceLoaderB
                  height="2rem" width="2rem" />
              </Col>
            </Row>}
        </div>
        <Card.Footer className="text-center py-2">
          <Row>
            <Col>
              <div className="text-muted small">Average</div>
              <strong className="text-big">
                {formatPrice(calcListAverage(balancePostGame))}
              </strong>
            </Col>
            <Col>
              <div className="text-muted small">Min/Max</div>
              <strong className="text-big">
                {formatPrice(calcListMinimum(balancePostGame))}/{formatPrice(calcListMaximum(balancePostGame))}
              </strong>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </React.Fragment>)
  }

  renderChartTotalBetAndWinnerPayout() {

    var totalBets = []
    this.props.game.history.forEach(function (v) {
      totalBets.push(Number(v.player_total_bet))
    })

    var winnerPayout = []
    this.props.game.history.forEach(function (v) {
      winnerPayout.push(Number(v.player_winner_payout))
    })

    return (<React.Fragment>
      <Card className="mb-3 bg-light" style={{
        borderRadius: "15px",
      }}>
        <Card.Header as="h6" className="with-elements border-0 pr-0 pb-0">
          <div className="card-header-title">
            Total Bet/Payout
          </div>
          <div className="card-header-elements ml-auto">
            <Dropdown alignRight={false} className="dropdown-toggle-hide-arrow">
              <Dropdown.Toggle variant="default" size="sm" className="icon-btn borderless rounded-pill md-btn-flat mr-3">
                <i className="ion ion-ios-more"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  className="small font-weight-bold"
                  onClick={() => { this.onHandleChangeScale('scale3') }}>
                  {this.state.scale3
                    ? 'Logarithmic'
                    : 'Linear'}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>
        <div className="mt-3">
          {totalBets.length > 1
            ? <Chartjs.Line
              height={210}
              data={{
                labels: Array.from({ length: Object.keys(totalBets).length }, (_, index) => index + 1),
                datasets: [{
                  label: 'Total Bet',
                  data: totalBets,
                  borderWidth: 1,
                  backgroundColor: 'rgba(28,180,255,.05)',
                  borderColor: 'rgba(28,180,255,1)',
                }, {
                  label: 'Payout',
                  data: winnerPayout,
                  borderWidth: 1,
                  borderDash: [5, 5],
                  backgroundColor: 'rgba(136, 151, 170, 0.1)',
                  borderColor: '#8897aa',
                }]
              }}
              options={{
                tooltips: {
                  callbacks: {
                    label: function (t, d) {
                      var value = parseFloat(t.yLabel).toFixed(2)
                      var xLabel = d.datasets[t.datasetIndex].label
                      var yLabel = value >= 1000 ? '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$' + value
                      return xLabel + ': ' + yLabel
                    }
                  }
                },
                scales: {
                  xAxes: [{
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      fontColor: '#fff',
                    }
                  }],
                  yAxes: [{
                    display: false,
                    type: this.state.scale3 ? 'logarithmic' : 'linear',
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      fontColor: '#fff',
                      stepSize: 20,
                    }
                  }]
                },
                legend: {
                  labels: {
                    display: false,
                    fontColor: '#fff',
                  }
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
            : <Row noGutters className="h-100 border-0 shadow-none mb-4">
              <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                <ResourceLoaderB
                  height="2rem" width="2rem" />
              </Col>
            </Row>}
        </div>
        <Card.Footer className="text-center py-2">
          <Row>
            <Col>
              <div className="text-muted small">Average</div>
              <strong className="text-big">
                {formatPrice(calcListAverage(totalBets))}
              </strong>
            </Col>
            <Col>
              <div className="text-muted small">Min/Max</div>
              <strong className="text-big">
                {formatPrice(calcListMinimum(totalBets))}/{formatPrice(calcListMaximum(totalBets))}
              </strong>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </React.Fragment>)
  }

  renderChartFinalRoundsHistogram() {

    var endedRounds = {}
    this.props.game.history.forEach(function (v) {
      endedRounds[v.game_ended_in_round] = (endedRounds[v.game_ended_in_round] || 0) + 1
    })

    var endedRoundsData = Object.values(endedRounds)
    var endedRoundsLabels = Object.keys(endedRounds).map(name => formatCapitalized(name.toString().toLowerCase()))
    var endedRoundsTopKey = Object.keys(endedRounds).reduce((a, b) => endedRounds[a] > endedRounds[b] ? a : b)
    var endedRoundsTopValue = endedRounds[endedRoundsTopKey]

    return (<React.Fragment>
      <Card className="mb-3 bg-light" style={{
        borderRadius: "15px",
      }}>
        <Card.Body>
          <div className="float-right text-muted small font-weight-bold">
            {formatCapitalized(endedRoundsTopKey.toString().toLowerCase())} ({endedRoundsTopValue})
          </div>
          <div className="text-muted small">
            Game Analysis
          </div>
          <div className="text-big">
            Final Rounds
          </div>
        </Card.Body>
        <div className="px-2">
          <Chartjs.Bar className="w-100"
            height={117}
            data={{
              datasets: [{
                data: endedRoundsData,
                borderWidth: 0,
                backgroundColor: '#009688',
              }],
              labels: endedRoundsLabels,
            }}
            options={{
              tooltips: {
                callbacks: {
                  label: function (t, d) {
                    var value = t.yLabel
                    var yLabel = value.toString().toLowerCase()
                    return ` ${formatCapitalized(yLabel)}`
                  }
                }
              },
              scales: {
                xAxes: [{
                  display: false,
                }],
                yAxes: [{
                  display: false,
                  type: false ? "linear" : "logarithmic",
                }]
              },
              legend: {
                display: false,
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </Card>
    </React.Fragment>)
  }

  renderChartPlayerBestHandsRanking() {

    var _hands = {
      FLUSH: 0,
      FOURCARD: 0,
      FULLHOUSE: 0,
      ONEPAIR: 0,
      ROYALFLUSH: 0,
      STRAIGHT: 0,
      STRAIGHTFLUSH: 0,
      THREECARD: 0,
      TWOPAIR: 0,
    }

    this.props.game.history.forEach(function (v) {
      _hands[v.player_best_hand.display] = (_hands[v.player_best_hand.display] || 0) + 1
    })

    var hands = JSON.parse(JSON.stringify(_hands))

    var n = []
    Object.keys(hands).forEach(function (v) {
      n.push({
        hand: v,
        count: hands[v],
        ratio: Number(hands[v] / (Object.values(hands).reduce((a, b) => a + b, 0))) * 100,
      })
    })

    return (<>
      <div className="mb-0 list-group pb-3">
        {n
          .sort((a, b) => b.count - a.count)
          .map((item, index) =>
            <span key={index} className={`d-flex list-group-item list-group-item-action online border-0 py-1`} style={{
              alignItems: "center",
              backgroundColor: `${index % 2 ? "rgba(37, 40, 46, 0.1)" : "rgba(37, 40, 46, 0.4)"}`,
            }}>
              <Media.Body className="ml-0">
                <span className="text-medium font-weight-bold h5 small mb-0">
                  {this.onHandleTranslateHandName(item.hand)}
                </span>
              </Media.Body>
              <h5 className="mb-0 font-weight-bold small">
                {item.count}/{Object.values(hands).reduce((a, b) => a + b, 0)} ({parseFloat(item.ratio).toFixed(2)}%)
              </h5>
            </span>
          )}
      </div>
    </>)
  }

  renderChartFinalRoundsRanking() {

    var _endedRounds = {
      INIT: 0,
      PREFLOP: 0,
      FLOP: 0,
      TURN: 0,
      RIVER: 0,
      SHOWDOWN: 0,
    }

    this.props.game.history.forEach(function (v) {
      _endedRounds[v.game_ended_in_round] = (_endedRounds[v.game_ended_in_round] || 0) + 1
    })

    var endedRounds = JSON.parse(JSON.stringify(_endedRounds))

    return (<>
      <Card className="d-flex w-100 mb-3 bg-light" style={{
        borderRadius: "15px",
      }}>
        <Row noGutters className="row-bordered h-100">
          <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
            <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg width="28" height="35" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.03906 34.5156C7.75781 34.5156 9.32812 32.8984 9.32812 30.0391V24.0859H14.8594C22.3828 24.0859 27.5625 19.375 27.5625 12.1562C27.5625 4.89062 22.6406 0.179688 15.375 0.179688H5.03906C2.32031 0.179688 0.726562 1.82031 0.726562 4.67969V30.0391C0.726562 32.8984 2.32031 34.5156 5.03906 34.5156ZM9.32812 17.6172V6.76562H13.1016C16.7109 6.76562 18.8672 8.66406 18.8672 12.1797C18.8672 15.7188 16.7109 17.6172 13.0547 17.6172H9.32812Z" fill="white" />
                </svg>
              </span>

              <span className="media-body d-block ml-3">
                <span className="text-big font-weight-bolder">
                  {this.onHandleRenderFinalRoundItem(endedRounds, 'INIT', true)}
                </span><br />
                <small className="text-muted">
                  Preflop ({this.onHandleRenderFinalRoundItem(endedRounds, 'INIT', false)})
                </small>
              </span>
            </span>
          </Col>

          <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
            <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg width="25" height="35" viewBox="0 0 25 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.96094 34.5156C7.67969 34.5156 9.25 32.8984 9.25 30.0391V21.3906H19.1875C21.4141 21.3906 22.7734 20.1719 22.7734 18.1094C22.7734 16.0234 21.3672 14.8047 19.1875 14.8047H9.25V7.11719H20.2891C22.5625 7.11719 24.1094 5.85156 24.1094 3.64844C24.1094 1.44531 22.6094 0.179688 20.2891 0.179688H4.96094C2.24219 0.179688 0.648438 1.82031 0.648438 4.67969V30.0391C0.648438 32.8984 2.24219 34.5156 4.96094 34.5156Z" fill="white" />
                </svg>
              </span>

              <span className="media-body d-block ml-3">
                <span className="text-big font-weight-bolder">
                  {this.onHandleRenderFinalRoundItem(endedRounds, 'FLOP', true)}
                </span><br />
                <small className="text-muted">
                  Flop ({this.onHandleRenderFinalRoundItem(endedRounds, 'FLOP', false)})
                </small>
              </span>
            </span>
          </Col>

          <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
            <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 34.5156C17.7188 34.5156 19.2891 32.8984 19.2891 30.0391V7.11719H25.2422C27.5156 7.11719 29.0625 5.85156 29.0625 3.64844C29.0625 1.44531 27.5625 0.179688 25.2422 0.179688H4.78125C2.4375 0.179688 0.9375 1.44531 0.9375 3.64844C0.9375 5.85156 2.48438 7.11719 4.78125 7.11719H10.7109V30.0391C10.7109 32.8984 12.2812 34.5156 15 34.5156Z" fill="white" />
                </svg>
              </span>

              <span className="media-body d-block ml-3">
                <span className="text-big font-weight-bolder">
                  {this.onHandleRenderFinalRoundItem(endedRounds, 'TURN', true)}
                </span><br />
                <small className="text-muted">
                  Turn ({this.onHandleRenderFinalRoundItem(endedRounds, 'TURN', false)})
                </small>
              </span>
            </span>
          </Col>

          <Col sm={6} md={4} lg={6} className="d-flex align-items-center">
            <span onClick={this.prevent} className="card-body media align-items-center text-body p-4">
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg width="29" height="35" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.97656 34.5391C7.69531 34.5391 9.26562 32.8984 9.26562 30.0625V22.1641H14.1875L19.2031 31.1875C20.6562 33.8125 21.5469 34.5391 23.6328 34.5391C26.1406 34.5391 27.9219 32.8984 27.9219 30.625C27.9219 29.6172 27.7578 28.9141 27.0078 27.6719L22.8594 20.6172C26.3047 18.8828 28.1328 15.3203 28.1328 11.3359C28.1328 4.35156 23.5859 0.179688 15.1484 0.179688H4.97656C2.25781 0.179688 0.664062 1.82031 0.664062 4.67969V30.0625C0.664062 32.8984 2.25781 34.5391 4.97656 34.5391ZM9.26562 16.2812V6.67188H14.2812C17.3516 6.67188 19.3438 8.61719 19.3438 11.5C19.3438 14.4297 17.4688 16.2812 14.3047 16.2812H9.26562Z" fill="white" />
                </svg>
              </span>

              <span className="media-body d-block ml-3">
                <span className="text-big font-weight-bolder">
                  {this.onHandleRenderFinalRoundItem(endedRounds, 'RIVER', true)}
                </span><br />
                <small className="text-muted">
                  River ({this.onHandleRenderFinalRoundItem(endedRounds, 'RIVER', false)})
                </small>
              </span>
            </span>
          </Col>
        </Row>
      </Card>
    </>)
  }

  renderChartChancesOfWinningHistogram() {
    return (<>
      <Card className="w-100 mb-3 bg-light">
        <Card.Body>
          <div className="text-muted small">
            Chances of Winning
          </div>
          <div className="text-big">
            Player Histogram
          </div>
        </Card.Body>
        <div className="px-2 mt-4">
          <Chartjs.Bar
            height={120}
            data={{
              datasets: [{
                data: [2, 75, 20, 5, 91, 78, 28, 49, 23, 81],
                borderWidth: 0,
                backgroundColor: 'rgba(87, 181, 255, 1)'
              }],
              labels: ['Highcard', 'Onepair', 'Twopair', 'Threecard', 'Straight', 'Flush', 'Full House', 'Fourcard', 'Straight Flush', 'Royal Flush']
            }}
            options={{
              scales: {
                xAxes: [{
                  display: false,
                }],
                yAxes: [{
                  display: false,
                }]
              },
              legend: {
                display: false,
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </Card>
    </>)
  }

  render() {
    return (
      <>
        {/* Insights Modal */}
        <Modal.Body style={{ margin: "0" }}>
          <h4 className="text-left mb-4 font-weight-bold">
            Insights
          </h4>

          <div className="text-left text-left text-white opacity-50 small mb-3">
            These insights offer you a comprehensive overview of all essential session-specific statistics and parameters in relation to your personal player profile.
          </div>

          <hr className="border-light m-0 pt-2 pb-2" />

          {this.state.board && (
            <Card className="bg-light border-0 text-white mb-3" style={{ borderRadius: "15px", }}>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="small opacity-75">COMMUNITY</div>
                  <div className="small opacity-75">CARDS</div>
                </div>

                {this.props.game.data.game_started
                  ? <div className="d-flex position-relative">
                    {this.props.game.data.community_cards.map((card, index) =>
                      <img
                        key={index}
                        src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                        className={`d-block ui-w-40 cursor-pointer card-item-hover-translate card-item-drop-shadow-filter ${this.props.game.data.community_cards.length === index + 1 ? "mr-0" : "mr-1"}`}
                        alt={card} />
                    )}
                  </div>
                  : <div className="d-flex position-relative">
                    {["X", "X", "X", "X", "X"].map((card, index) =>
                      <img
                        key={index}
                        src={`${process.env.PUBLIC_URL}/svg/cards/${card}.svg`}
                        className={`d-block ui-w-40 cursor-pointer card-item-hover-translate card-item-drop-shadow-filter ${this.props.game.data.community_cards.length === index + 1 ? "mr-0" : "mr-1"}`}
                        alt={card} />
                    )}
                  </div>}
              </Card.Body>
            </Card>
          )}

          {this.state.init && this.props.slideModalEnter && (
            this.renderChartCommunityCardsHistogram()
          )}

          {this.state.init && this.props.slideModalEnter && (
            this.renderChartHoleCardsHistogram()
          )}

          {this.state.init && this.props.slideModalEnter && (
            this.renderChartTotalBetAndWinnerPayout()
          )}

          {this.state.init && this.props.slideModalEnter && (
            this.renderChartWinnerPotsizeHistogram()
          )}

          {this.state.init && this.props.slideModalEnter && (
            this.renderChartBalancePostGameHistogram()
          )}

          {this.state.init && this.props.slideModalEnter && (
            this.renderChartPlayerBestHandsRanking()
          )}

          {this.state.init && this.props.slideModalEnter && (
            this.renderChartFinalRoundsRanking()
          )}

          {!this.state.init && this.props.slideModalEnter && (
            <>
              <Card className="d-flex w-100 mb-3 bg-light border-0 shadow-none" style={{ borderRadius: "15px", }}>
                <Card.Header className="with-elements">
                  <span className="card-header-title mr-2 font-weight-bold">
                    Player Insights
                  </span>
                </Card.Header>

                <Card.Body>
                  <Row noGutters className="h-100 border-0 shadow-none">
                    <Col sm={12} md={12} lg={12} className="d-flex align-items-center justify-content-center border-0 shadow-none pt-2 pb-0">
                      <Row noGutters className="h-100 border-0 shadow-none">
                        <Col sm={12} md={12} lg={12} className="d-flex align-items-center justify-content-center border-0 shadow-none">
                          <ResourceLoaderB
                            height="4rem" width="4rem" />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div className={`text-center text-white opacity-100 my-2`}>
                    Player Insights currently not available...
                  </div>
                  <div className="text-center text-white opacity-50 text-tiny mb-2">
                    Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                  </div>
                </Card.Body>
              </Card>
            </>
          )}

          <hr className="border-light m-0 py-2" />

          <Button
            variant="instagram" block
            onClick={this.props.close}
            className="font-weight-bold">
            Continue
          </Button>

        </Modal.Body>
        {/* / Insights Modal */}
      </>
    )
  }
}

export default Insights