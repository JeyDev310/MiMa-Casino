import React, { Component } from 'react'
import { Card, Row, Col, Badge, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import MinHeightSlider from '../utilities/MinHeightSlider'
import PromotionSlider from '../utilities/PromotionSlider'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../store/actions'

import * as Chartjs from 'react-chartjs-2'
import * as numeral from 'numeral'

import moment from 'moment'
import themeSettings from '../../../vendor/libs/theme-settings'

import '../assets/css/views.css'
import '../../../vendor/libs/react-toastify/react-toastify.scss'

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

const CloseButton = ({ closeToast }) => (
  <button className="Toastify__close-button" type="button" aria-label="close"
    onClick={closeToast}>&times;</button>
)

class ProfileView extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Profile')

    this.onRefreshStatistics = this.onRefreshStatistics.bind(this)
    this.onValueToggleChange = this.onValueToggleChange.bind(this)

    this.state = {
      init: false,
      username: "N/A",
      email: "N/A",
      options: {
        option_0: true,
        option_1: true,
      }
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  formatPrice(p) {
    return numeral(p).format('$0,0.00')
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  calcListAverage(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length
  }

  calcListSum(arr) {
    return arr.reduce((a, b) => a + b, 0)
  }

  calcListMaximum(arr) {
    return Math.max(...arr)
  }

  calcListMinimum(arr) {
    return Math.min(...arr)
  }

  calcPlaytimeDisplay(time) {
    var minutes = Math.floor(time / 60)
    return `${minutes} min`
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
        email: JSON.parse(localStorage.getItem('user')).user.email,
      })
      this.props.objectsRequestHandler(
        'REQ_PROFILE_STATISTICS_GET', {
        id: JSON.parse(localStorage.getItem('user')).id,
      }, this.props.history
      ).then(() => {
        this.setState({
          init: true,
        })
      })
      this.props.objectsRequestHandler(
        'REQ_PROFILE_WALLET_GET', {
        id: JSON.parse(localStorage.getItem('user')).id,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
          })
        })
    } else {
      this.props.history.push('/')
    }
  }

  onRefreshStatistics() {
    if (localStorage.getItem('user')) {
      this.setState({ username: JSON.parse(localStorage.getItem('user')).user.username })
      this.props.objectsRequestHandler(
        'REQ_PROFILE_STATISTICS_GET',
        { id: JSON.parse(localStorage.getItem('user')).id },
        this.props.history)
        .then(() => {
          this.setState({ init: true })
        })
      this.props.objectsRequestHandler(
        'REQ_PROFILE_WALLET_GET',
        { id: JSON.parse(localStorage.getItem('user')).id },
        this.props.history)
        .then(() => {
          this.setState({ init: true })
        })
    }
  }

  onValueToggleChange(field, e) {
    this.setState({
      options: {
        ...this.state.options,
        [field]: e.target.checked
      }
    })
  }

  showToastify(message, type) {
    toast(message, {
      type: type,
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  render() {
    const isDarkStyle = themeSettings.isDarkStyle()

    return (
      <div>

        {/* Promotion Slider */}
        <PromotionSlider {...this.state} {...this.props} />
        {/* / Promotion Slider */}

        {this.props.statistics
          ? <React.Fragment>
            <h5 className="font-weight-bold py-2 mb-2 d-flex justify-content-between align-items-center">
              Total Live Game Statistics
              <span className="my-0"><Badge pill variant="danger" className="text-small font-weight-bold ml-2">Beta</Badge></span>
              <Button variant="default" size="md" className="ml-auto" onClick={this.onRefreshStatistics}>
                <i className="ion ion-md-refresh text-danger mr-2"></i>
                Refresh
              </Button>
            </h5>

            {this.props.statistics.live_statistics_total
              ? <React.Fragment>
                {!isEmpty(this.props.statistics.live_statistics_session)
                  ? <React.Fragment>
                    <Row>
                      <Col sm={6} xl={3}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body className="d-flex align-items-center">
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="white" />
                                <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="white" />
                              </svg>
                            </span>
                            <div className="ml-3">
                              <div className="text-muted small">Games Played</div>
                              <div className="text-large font-weight-bold">
                                {this.props.statistics.live_statistics_total.session_games_played}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col sm={6} xl={3}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body className="d-flex align-items-center">
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                                <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                              </svg>
                            </span>
                            <div className="ml-3">
                              <div className="text-muted small">Games Won</div>
                              <div className="text-large font-weight-bold">
                                {this.props.statistics.live_statistics_total.session_games_won}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col sm={6} xl={3}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body className="d-flex align-items-center">
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                                <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                              </svg>
                            </span>
                            <div className="ml-3">
                              <div className="text-muted small">Games Lost</div>
                              <div className="text-large font-weight-bold">
                                {this.props.statistics.live_statistics_total.session_games_lost}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col sm={6} xl={3}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body className="d-flex align-items-center">
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M20.9 12.9C20.3 12.9 19.9 12.5 19.9 11.9C19.9 11.3 20.3 10.9 20.9 10.9H21.8C21.3 6.2 17.6 2.4 12.9 2V2.9C12.9 3.5 12.5 3.9 11.9 3.9C11.3 3.9 10.9 3.5 10.9 2.9V2C6.19999 2.5 2.4 6.2 2 10.9H2.89999C3.49999 10.9 3.89999 11.3 3.89999 11.9C3.89999 12.5 3.49999 12.9 2.89999 12.9H2C2.5 17.6 6.19999 21.4 10.9 21.8V20.9C10.9 20.3 11.3 19.9 11.9 19.9C12.5 19.9 12.9 20.3 12.9 20.9V21.8C17.6 21.3 21.4 17.6 21.8 12.9H20.9Z" fill="white" />
                                <path d="M16.9 10.9H13.6C13.4 10.6 13.2 10.4 12.9 10.2V5.90002C12.9 5.30002 12.5 4.90002 11.9 4.90002C11.3 4.90002 10.9 5.30002 10.9 5.90002V10.2C10.6 10.4 10.4 10.6 10.2 10.9H9.89999C9.29999 10.9 8.89999 11.3 8.89999 11.9C8.89999 12.5 9.29999 12.9 9.89999 12.9H10.2C10.4 13.2 10.6 13.4 10.9 13.6V13.9C10.9 14.5 11.3 14.9 11.9 14.9C12.5 14.9 12.9 14.5 12.9 13.9V13.6C13.2 13.4 13.4 13.2 13.6 12.9H16.9C17.5 12.9 17.9 12.5 17.9 11.9C17.9 11.3 17.5 10.9 16.9 10.9Z" fill="white" />
                              </svg>
                            </span>
                            <div className="ml-3">
                              <div className="text-muted small">Total Playtime</div>
                              <div className="text-large font-weight-bold">
                                {this.calcPlaytimeDisplay(this.props.statistics.live_statistics_total.session_playtime)}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Card className="mb-4" style={{ borderRadius: "15px", }}>
                      <Card.Header as="h6" className="with-elements">
                        <div className="card-header-title">Total Live Game Statistics</div>
                        <div className="card-header-elements ml-auto">
                          <label className="text m-0">
                            <span className="text-light text-tiny font-weight-semibold align-middle">LOG SCALE</span>
                            <span className="switcher switcher-sm d-inline-block align-middle mr-0 ml-2">
                              <input
                                type="checkbox"
                                className="switcher-input"
                                checked={this.state.options.option_1}
                                onChange={e => this.onValueToggleChange('option_1', e)} />
                              <span className="switcher-indicator">
                                <span className="switcher-yes"></span>
                                <span className="switcher-no"></span>
                              </span>
                            </span>
                          </label>
                        </div>
                      </Card.Header>

                      <Row noGutters className="row-bordered">
                        <Col md={8} lg={12} xl={8}>
                          <Card.Body>
                            <div className="w-100">
                              <Chartjs.Line
                                height={256}
                                data={{
                                  labels: Array.from({ length: Object.keys(this.props.statistics.live_statistics_total.player_balance_profits.slice(-32)).length }, (_, index) => index + 1),
                                  datasets: [{
                                    label: 'Profit per game',
                                    data: this.props.statistics.live_statistics_total.player_balance_profits.slice(-32),
                                    borderWidth: 1,
                                    backgroundColor: 'rgba(28,180,255,.05)',
                                    borderColor: 'rgba(28,180,255,1)',
                                  }, {
                                    label: 'Loss per game',
                                    data: this.props.statistics.live_statistics_total.player_balance_losses.slice(-32),
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
                                        var yLabel = value >= 1000 ? '$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$ ' + value
                                        return xLabel + ': ' + yLabel
                                      }
                                    }
                                  },
                                  scales: {
                                    xAxes: [{
                                      gridLines: {
                                        display: false
                                      },
                                      ticks: {
                                        fontColor: isDarkStyle ? '#fff' : '#aaa'
                                      }
                                    }],
                                    yAxes: [{
                                      display: false,
                                      type: this.state.options.option_1 ? 'logarithmic' : 'linear',
                                      gridLines: {
                                        display: false
                                      },
                                      ticks: {
                                        fontColor: isDarkStyle ? '#fff' : '#aaa',
                                        stepSize: 20
                                      }
                                    }]
                                  },
                                  legend: isDarkStyle ? {
                                    labels: {
                                      fontColor: '#fff'
                                    }
                                  } : {},

                                  responsive: true,
                                  maintainAspectRatio: false
                                }}
                              />
                            </div>
                          </Card.Body>
                        </Col>

                        <Col md={4} lg={12} xl={4}>
                          <Card.Body>
                            <Row>
                              <Col xs={6} xl={5} className="text-muted mb-1 small">First Session Played</Col>
                              <Col xs={6} xl={7} className="mb-1">
                                <span className="font-weight-bold small">
                                  {moment(this.props.statistics.live_statistics_total.session_init).format('DD. MMMM YYYY (HH:mm)')}
                                </span>
                              </Col>
                              <Col xs={6} xl={5} className="text-muted mb-1 small">Last Session Played</Col>
                              <Col xs={6} xl={7} className="mb-1">
                                <span className="font-weight-bold small">
                                  {moment(this.props.statistics.live_statistics_total.session_update).format('DD. MMMM YYYY (HH:mm)')}
                                </span>
                              </Col>
                              <Col xs={6} xl={5} className="text-muted mb-1 small">Session Profits (Average)</Col>
                              <Col xs={6} xl={7} className="mb-1">
                                <span className="font-weight-bold small">
                                  {this.formatPrice(this.calcListAverage(this.props.statistics.live_statistics_total.player_balance_profits))}
                                </span>
                              </Col>
                              <Col xs={6} xl={5} className="text-muted mb-1 small">Session Losses (Average)</Col>
                              <Col xs={6} xl={7} className="mb-1">
                                <span className="font-weight-bold small">
                                  {this.formatPrice(this.calcListAverage(this.props.statistics.live_statistics_total.player_balance_losses))}
                                </span>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>

                    <Row>
                      <Col sm={6} xl={4}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body>
                            <div className="float-right text-success">
                              <small className="ion ion-md-arrow-round-up text-tiny"></small> 0 %
                            </div>
                            <div className="text-muted small">Average profit per game</div>
                            <div className="text-xlarge">{this.formatPrice(this.calcListAverage(this.props.statistics.live_statistics_total.player_balance_profits))}</div>
                          </Card.Body>

                          <div className="px-2">

                            <Chartjs.Bar className="w-100"
                              height={117}
                              data={{
                                datasets: [{
                                  data: this.props.statistics.live_statistics_total.player_balance_profits.slice(-32),
                                  borderWidth: 0,
                                  backgroundColor: '#009688',
                                }],
                                labels: Array.from({ length: Object.keys(this.props.statistics.live_statistics_total.player_balance_profits.slice(-32)).length }, (_, index) => index + 1),
                              }}
                              options={{
                                tooltips: {
                                  callbacks: {
                                    label: function (t, d) {
                                      var value = parseFloat(t.yLabel).toFixed(2)
                                      var yLabel = value >= 1000 ? '$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$ ' + value
                                      return yLabel
                                    }
                                  }
                                },
                                scales: {
                                  xAxes: [{
                                    display: false
                                  }],
                                  yAxes: [{
                                    display: false,
                                    type: this.state.options.option_1 ? 'logarithmic' : 'linear',
                                  }]
                                },
                                legend: {
                                  display: false
                                },
                                responsive: true,
                                maintainAspectRatio: false
                              }}
                            />
                          </div>
                        </Card>
                      </Col>

                      <Col sm={6} xl={4}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body>
                            <div className="float-right text-success">
                              <small className="ion ion-md-arrow-round-up text-tiny"></small> 0 %
                            </div>
                            <div className="text-muted small">Average loss per game</div>
                            <div className="text-xlarge">{this.formatPrice(this.calcListAverage(this.props.statistics.live_statistics_total.player_balance_losses))}</div>
                          </Card.Body>

                          <div className="px-2">

                            <Chartjs.Bar className="w-100"
                              height={117}
                              data={{
                                datasets: [{
                                  data: this.props.statistics.live_statistics_total.player_balance_losses.slice(-32),
                                  borderWidth: 0,
                                  backgroundColor: '#C13232',
                                }],
                                labels: Array.from({ length: Object.keys(this.props.statistics.live_statistics_total.player_balance_losses.slice(-32)).length }, (_, index) => index + 1),
                              }}
                              options={{
                                tooltips: {
                                  callbacks: {
                                    label: function (t, d) {
                                      var value = parseFloat(t.yLabel).toFixed(2)
                                      var yLabel = value >= 1000 ? '$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$ ' + value
                                      return yLabel
                                    }
                                  }
                                },
                                scales: {
                                  xAxes: [{
                                    display: false
                                  }],
                                  yAxes: [{
                                    display: false,
                                    type: this.state.options.option_1 ? 'logarithmic' : 'linear',
                                  }]
                                },
                                legend: {
                                  display: false
                                },
                                responsive: true,
                                maintainAspectRatio: false
                              }}
                            />
                          </div>
                        </Card>
                      </Col>

                      <Col sm={6} xl={4}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body>
                            <div className="float-right text-success">
                              <small className="ion ion-md-arrow-round-up text-tiny"></small> 0 %
                            </div>
                            <div className="text-muted small">Total bet per game</div>
                            <div className="text-xlarge">{this.formatPrice(this.calcListAverage(this.props.statistics.live_statistics_total.player_total_bets))}</div>
                          </Card.Body>

                          <div className="px-2">

                            <Chartjs.Bar className="w-100"
                              height={117}
                              data={{
                                datasets: [{
                                  data: this.props.statistics.live_statistics_total.player_total_bets.slice(-32),
                                  borderWidth: 0,
                                  backgroundColor: '#673AB7',
                                }],
                                labels: Array.from({ length: Object.keys(this.props.statistics.live_statistics_total.player_total_bets.slice(-32)).length }, (_, index) => index + 1),
                              }}
                              options={{
                                tooltips: {
                                  callbacks: {
                                    label: function (t, d) {
                                      var value = parseFloat(t.yLabel).toFixed(2)
                                      var yLabel = value >= 1000 ? '$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$ ' + value
                                      return yLabel
                                    }
                                  }
                                },
                                scales: {
                                  xAxes: [{
                                    display: false
                                  }],
                                  yAxes: [{
                                    display: false,
                                    type: this.state.options.option_1 ? 'logarithmic' : 'linear',
                                  }]
                                },
                                legend: {
                                  display: false
                                },
                                responsive: true,
                                maintainAspectRatio: false
                              }}
                            />
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </React.Fragment>
                  : <React.Fragment>
                    <Row>
                      <Col sm={6} xl={3}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body className="d-flex align-items-center">
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="white" />
                                <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="white" />
                              </svg>
                            </span>
                            <div className="ml-3">
                              <div className="text-muted small">Games Played</div>
                              <div className="text-large font-weight-bold">0</div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col sm={6} xl={3}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body className="d-flex align-items-center">
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                                <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                              </svg>
                            </span>
                            <div className="ml-3">
                              <div className="text-muted small">Games Won</div>
                              <div className="text-large font-weight-bold">0</div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col sm={6} xl={3}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body className="d-flex align-items-center">
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                                <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                                <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                              </svg>
                            </span>
                            <div className="ml-3">
                              <div className="text-muted small">Games Lost</div>
                              <div className="text-large font-weight-bold">0</div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col sm={6} xl={3}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body className="d-flex align-items-center">
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M20.9 12.9C20.3 12.9 19.9 12.5 19.9 11.9C19.9 11.3 20.3 10.9 20.9 10.9H21.8C21.3 6.2 17.6 2.4 12.9 2V2.9C12.9 3.5 12.5 3.9 11.9 3.9C11.3 3.9 10.9 3.5 10.9 2.9V2C6.19999 2.5 2.4 6.2 2 10.9H2.89999C3.49999 10.9 3.89999 11.3 3.89999 11.9C3.89999 12.5 3.49999 12.9 2.89999 12.9H2C2.5 17.6 6.19999 21.4 10.9 21.8V20.9C10.9 20.3 11.3 19.9 11.9 19.9C12.5 19.9 12.9 20.3 12.9 20.9V21.8C17.6 21.3 21.4 17.6 21.8 12.9H20.9Z" fill="white" />
                                <path d="M16.9 10.9H13.6C13.4 10.6 13.2 10.4 12.9 10.2V5.90002C12.9 5.30002 12.5 4.90002 11.9 4.90002C11.3 4.90002 10.9 5.30002 10.9 5.90002V10.2C10.6 10.4 10.4 10.6 10.2 10.9H9.89999C9.29999 10.9 8.89999 11.3 8.89999 11.9C8.89999 12.5 9.29999 12.9 9.89999 12.9H10.2C10.4 13.2 10.6 13.4 10.9 13.6V13.9C10.9 14.5 11.3 14.9 11.9 14.9C12.5 14.9 12.9 14.5 12.9 13.9V13.6C13.2 13.4 13.4 13.2 13.6 12.9H16.9C17.5 12.9 17.9 12.5 17.9 11.9C17.9 11.3 17.5 10.9 16.9 10.9Z" fill="white" />
                              </svg>
                            </span>
                            <div className="ml-3">
                              <div className="text-muted small">Total Playtime</div>
                              <div className="text-large font-weight-bold">
                                {this.calcPlaytimeDisplay(0)}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Card className="mb-4" style={{ borderRadius: "15px", }}>
                      <Card.Header as="h6" className="with-elements">
                        <div className="card-header-title">Total Live Game Statistics</div>
                      </Card.Header>
                      <Row noGutters className="row-bordered">
                        <Col md={8} lg={12} xl={8}>
                          <Card.Body>
                            <div className="w-100 text-muted">
                              Not enough session data available...
                            </div>
                          </Card.Body>
                        </Col>

                        <Col md={4} lg={12} xl={4}>
                          <Card.Body>
                            <Row>
                              <Col xs={6} xl={5} className="text-muted small mb-1">First Session Played</Col>
                              <Col xs={6} xl={7} className="mb-1">
                                <span className="font-weight-bold small">N/A</span>
                              </Col>
                              <Col xs={6} xl={5} className="text-muted small mb-1">Last Session Played</Col>
                              <Col xs={6} xl={7} className="mb-1">
                                <span className="font-weight-bold small">N/A</span>
                              </Col>
                              <Col xs={6} xl={5} className="text-muted small mb-1">Session Profits (Average)</Col>
                              <Col xs={6} xl={7} className="mb-1">
                                <span className="font-weight-bold small">{this.formatPrice(0)}</span>
                              </Col>
                              <Col xs={6} xl={5} className="text-muted small mb-1">Session Losses (Average)</Col>
                              <Col xs={6} xl={7} className="mb-1">
                                <span className="font-weight-bold small">{this.formatPrice(0)}</span>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>

                    <Row>
                      <Col sm={6} xl={4}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body>
                            <div className="float-right text-success">
                              <small className="ion ion-md-arrow-round-up text-tiny"></small> 0 %
                            </div>
                            <div className="text-muted small">Profit per game</div>
                            <div className="text-xlarge">{this.formatPrice(0)}</div>
                          </Card.Body>
                          <div className="px-2"></div>
                        </Card>
                      </Col>

                      <Col sm={6} xl={4}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body>
                            <div className="float-right text-success">
                              <small className="ion ion-md-arrow-round-up text-tiny"></small> 0 %
                            </div>
                            <div className="text-muted small">Loss per game</div>
                            <div className="text-xlarge">{this.formatPrice(0)}</div>
                          </Card.Body>
                          <div className="px-2"></div>
                        </Card>
                      </Col>

                      <Col sm={6} xl={4}>
                        <Card className="mb-4" style={{ borderRadius: "15px", }}>
                          <Card.Body>
                            <div className="float-right text-success">
                              <small className="ion ion-md-arrow-round-up text-tiny"></small> 0 %
                            </div>
                            <div className="text-muted small">Total bet per game</div>
                            <div className="text-xlarge">{this.formatPrice(0)}</div>
                          </Card.Body>
                          <div className="px-2"></div>
                        </Card>
                      </Col>
                    </Row>
                  </React.Fragment>}
              </React.Fragment>
              : null}

            <h6 className="text-left text-lighter text-muted text-tiny mb-4">
              All player statistics are updated after each session played. After each completed session, additional personalized <br />
              statistics are generated for each player, which serve to optimize profit and increase efficiency.
            </h6>

            <h5 className="font-weight-bold py-2 mb-2 d-flex justify-content-between align-items-center">
              Last Live Game Session
              <span className="my-0"><Badge pill variant="danger" className="text-small font-weight-bold ml-2">Beta</Badge></span>
              <Button variant="default" size="md" className="ml-auto" onClick={this.onRefreshStatistics}>
                <i className="ion ion-md-refresh text-danger mr-2"></i>
                Refresh
              </Button>
            </h5>

            {!isEmpty(this.props.statistics.live_statistics_session)
              ? <React.Fragment>
                <Row>
                  <Col sm={6} xl={3}>
                    <Card className="mb-4" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex align-items-center">
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="white" />
                            <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="white" />
                          </svg>
                        </span>
                        <div className="ml-3">
                          <div className="text-muted small">Games Played</div>
                          <div className="text-large font-weight-bold">
                            {this.props.statistics.live_statistics_session.session_games_played}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={6} xl={3}>
                    <Card className="mb-4" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex align-items-center">
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                            <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                          </svg>
                        </span>
                        <div className="ml-3">
                          <div className="text-muted small">Games Won</div>
                          <div className="text-large font-weight-bold">
                            {this.props.statistics.live_statistics_session.session_games_won}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={6} xl={3}>
                    <Card className="mb-4" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex align-items-center">
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                            <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                            <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                          </svg>
                        </span>
                        <div className="ml-3">
                          <div className="text-muted small">Games Lost</div>
                          <div className="text-large font-weight-bold">
                            {this.props.statistics.live_statistics_session.session_games_lost}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={6} xl={3}>
                    <Card className="mb-4" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex align-items-center">
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" d="M20.9 12.9C20.3 12.9 19.9 12.5 19.9 11.9C19.9 11.3 20.3 10.9 20.9 10.9H21.8C21.3 6.2 17.6 2.4 12.9 2V2.9C12.9 3.5 12.5 3.9 11.9 3.9C11.3 3.9 10.9 3.5 10.9 2.9V2C6.19999 2.5 2.4 6.2 2 10.9H2.89999C3.49999 10.9 3.89999 11.3 3.89999 11.9C3.89999 12.5 3.49999 12.9 2.89999 12.9H2C2.5 17.6 6.19999 21.4 10.9 21.8V20.9C10.9 20.3 11.3 19.9 11.9 19.9C12.5 19.9 12.9 20.3 12.9 20.9V21.8C17.6 21.3 21.4 17.6 21.8 12.9H20.9Z" fill="white" />
                            <path d="M16.9 10.9H13.6C13.4 10.6 13.2 10.4 12.9 10.2V5.90002C12.9 5.30002 12.5 4.90002 11.9 4.90002C11.3 4.90002 10.9 5.30002 10.9 5.90002V10.2C10.6 10.4 10.4 10.6 10.2 10.9H9.89999C9.29999 10.9 8.89999 11.3 8.89999 11.9C8.89999 12.5 9.29999 12.9 9.89999 12.9H10.2C10.4 13.2 10.6 13.4 10.9 13.6V13.9C10.9 14.5 11.3 14.9 11.9 14.9C12.5 14.9 12.9 14.5 12.9 13.9V13.6C13.2 13.4 13.4 13.2 13.6 12.9H16.9C17.5 12.9 17.9 12.5 17.9 11.9C17.9 11.3 17.5 10.9 16.9 10.9Z" fill="white" />
                          </svg>
                        </span>
                        <div className="ml-3">
                          <div className="text-muted small">Session Playtime</div>
                          <div className="text-large font-weight-bold">
                            {this.props.statistics.live_statistics_session.session_playtime_display}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Card className="mb-4" style={{ borderRadius: "15px", }}>
                  <Card.Header as="h6" className="with-elements">
                    <div className="card-header-title">Session Statistics</div>
                    <div className="card-header-elements ml-auto">
                      <label className="text m-0">
                        <span className="text-light text-tiny font-weight-semibold align-middle">LOG SCALE</span>
                        <span className="switcher switcher-sm d-inline-block align-middle mr-0 ml-2">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            checked={this.state.options.option_0}
                            onChange={e => this.onValueToggleChange('option_0', e)} />
                          <span className="switcher-indicator">
                            <span className="switcher-yes"></span>
                            <span className="switcher-no"></span>
                          </span>
                        </span>
                      </label>
                    </div>
                  </Card.Header>

                  <Row noGutters className="row-bordered">
                    <Col md={4} lg={12} xl={4}>
                      <Card.Body>
                        <Row>
                          <Col xs={6} xl={5} className="text-muted mb-1 small">Session Profit</Col>
                          <Col xs={6} xl={7} className="mb-1">
                            <span className="font-weight-bold small">
                              {this.formatPrice(this.props.statistics.live_statistics_session.player_balance_profit)}
                            </span>
                          </Col>
                          <Col xs={6} xl={5} className="text-muted mb-1 small">Session Loss</Col>
                          <Col xs={6} xl={7} className="mb-1">
                            <span className="font-weight-bold small">
                              {this.formatPrice(this.props.statistics.live_statistics_session.player_balance_loss)}
                            </span>
                          </Col>
                          <Col xs={6} xl={5} className="text-muted mb-1 small">Total Bet (Average)</Col>
                          <Col xs={6} xl={7} className="mb-1">
                            <span className="font-weight-bold small">
                              {this.formatPrice(this.calcListAverage(this.props.statistics.live_statistics_session.player_total_bets))}
                            </span>
                          </Col>
                          <Col xs={6} xl={5} className="text-muted mb-1 small">Total Bet (Maximum)</Col>
                          <Col xs={6} xl={7} className="mb-1">
                            <span className="font-weight-bold small">
                              {this.formatPrice(this.props.statistics.live_statistics_session.player_total_bets_max)}
                            </span>
                          </Col>
                          <Col xs={6} xl={5} className="text-muted mb-1 small">Session Ended</Col>
                          <Col xs={6} xl={7} className="mb-1">
                            <span className="font-weight-bold small">
                              {moment(this.props.statistics.live_statistics_session.session_update).format('DD. MMMM YYYY (HH:mm)')}
                            </span>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Col>

                    <Col md={8} lg={12} xl={8}>
                      <Card.Body>
                        <div className="w-100">
                          {Object.keys(this.props.statistics.live_statistics_session.player_balance_profits).length <= 1
                            ? <React.Fragment>
                              <Row>
                                <Col sm={6} xl={3}>
                                  <div className="w-100 text-muted font-weight-bold">
                                    Not enough session data available...
                                  </div>
                                </Col>
                              </Row>
                            </React.Fragment>
                            : <React.Fragment>
                              <Chartjs.Line
                                height={256}
                                data={{
                                  labels: Array.from({ length: Object.keys(this.props.statistics.live_statistics_session.player_balance_profits).length }, (_, index) => index + 1),
                                  datasets: [{
                                    label: 'Profit per game',
                                    data: this.props.statistics.live_statistics_session.player_balance_profits,
                                    borderWidth: 1,
                                    backgroundColor: 'rgba(28,180,255,.05)',
                                    borderColor: 'rgba(28,180,255,1)'
                                  }, {
                                    label: 'Loss per game',
                                    data: this.props.statistics.live_statistics_session.player_balance_losses,
                                    borderWidth: 1,
                                    borderDash: [5, 5],
                                    backgroundColor: 'rgba(136, 151, 170, 0.1)',
                                    borderColor: '#8897aa'
                                  }]
                                }}
                                options={{
                                  tooltips: {
                                    callbacks: {
                                      label: function (t, d) {

                                        var value = parseFloat(t.yLabel).toFixed(2)
                                        var xLabel = d.datasets[t.datasetIndex].label
                                        var yLabel = value >= 1000 ? '$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$ ' + value

                                        return xLabel + ': ' + yLabel
                                      }
                                    }
                                  },
                                  scales: {
                                    xAxes: [{
                                      gridLines: {
                                        display: false
                                      },
                                      ticks: {
                                        fontColor: isDarkStyle ? '#fff' : '#aaa'
                                      }
                                    }],
                                    yAxes: [{
                                      display: false,
                                      type: this.state.options.option_0 ? 'logarithmic' : 'linear',
                                      gridLines: {
                                        display: false
                                      },
                                      ticks: {
                                        fontColor: isDarkStyle ? '#fff' : '#aaa',
                                        stepSize: 20
                                      }
                                    }]
                                  },
                                  legend: isDarkStyle ? {
                                    labels: {
                                      fontColor: '#fff'
                                    }
                                  } : {},

                                  responsive: true,
                                  maintainAspectRatio: false
                                }}
                              />
                            </React.Fragment>
                          }
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </React.Fragment>
              : <React.Fragment>
                <Row>
                  <Col sm={6} xl={3}>
                    <Card className="mb-4" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex align-items-center">
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="white" />
                            <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="white" />
                          </svg>
                        </span>
                        <div className="ml-3">
                          <div className="text-muted small">Games Played</div>
                          <div className="text-large font-weight-bold">0</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={6} xl={3}>
                    <Card className="mb-4" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex align-items-center">
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path d="M14 18V16H10V18L9 20H15L14 18Z" fill="white" />
                            <path opacity="0.3" d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z" fill="white" />
                          </svg>
                        </span>
                        <div className="ml-3">
                          <div className="text-muted small">Games Won</div>
                          <div className="text-large font-weight-bold">0</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={6} xl={3}>
                    <Card className="mb-4" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex align-items-center">
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="white" />
                            <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="white" />
                            <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="white" />
                          </svg>
                        </span>
                        <div className="ml-3">
                          <div className="text-muted small">Games Lost</div>
                          <div className="text-large font-weight-bold">0</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={6} xl={3}>
                    <Card className="mb-4" style={{ borderRadius: "15px", }}>
                      <Card.Body className="d-flex align-items-center">
                        <span className="svg-icon svg-icon-muted svg-icon-2hx">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <path opacity="0.3" d="M20.9 12.9C20.3 12.9 19.9 12.5 19.9 11.9C19.9 11.3 20.3 10.9 20.9 10.9H21.8C21.3 6.2 17.6 2.4 12.9 2V2.9C12.9 3.5 12.5 3.9 11.9 3.9C11.3 3.9 10.9 3.5 10.9 2.9V2C6.19999 2.5 2.4 6.2 2 10.9H2.89999C3.49999 10.9 3.89999 11.3 3.89999 11.9C3.89999 12.5 3.49999 12.9 2.89999 12.9H2C2.5 17.6 6.19999 21.4 10.9 21.8V20.9C10.9 20.3 11.3 19.9 11.9 19.9C12.5 19.9 12.9 20.3 12.9 20.9V21.8C17.6 21.3 21.4 17.6 21.8 12.9H20.9Z" fill="white" />
                            <path d="M16.9 10.9H13.6C13.4 10.6 13.2 10.4 12.9 10.2V5.90002C12.9 5.30002 12.5 4.90002 11.9 4.90002C11.3 4.90002 10.9 5.30002 10.9 5.90002V10.2C10.6 10.4 10.4 10.6 10.2 10.9H9.89999C9.29999 10.9 8.89999 11.3 8.89999 11.9C8.89999 12.5 9.29999 12.9 9.89999 12.9H10.2C10.4 13.2 10.6 13.4 10.9 13.6V13.9C10.9 14.5 11.3 14.9 11.9 14.9C12.5 14.9 12.9 14.5 12.9 13.9V13.6C13.2 13.4 13.4 13.2 13.6 12.9H16.9C17.5 12.9 17.9 12.5 17.9 11.9C17.9 11.3 17.5 10.9 16.9 10.9Z" fill="white" />
                          </svg>
                        </span>
                        <div className="ml-3">
                          <div className="text-muted small">Session Playtime</div>
                          <div className="text-large font-weight-bold">0 sec</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Card className="mb-4" style={{ borderRadius: "15px", }}>
                  <Card.Header as="h6" className="with-elements">
                    <div className="card-header-title">Session Statistics</div>
                  </Card.Header>

                  <Row noGutters className="row-bordered">
                    <Col md={4} lg={12} xl={4}>
                      <Card.Body>
                        <Row>
                          <Col xs={6} xl={5} className="text-muted mb-1 small">Session Profit</Col>
                          <Col xs={6} xl={7} className="mb-1">
                            <span className="font-weight-bold small">{this.formatPrice(0)}</span>
                          </Col>
                          <Col xs={6} xl={5} className="text-muted mb-1 small">Session Loss</Col>
                          <Col xs={6} xl={7} className="mb-1">
                            <span className="font-weight-bold small">{this.formatPrice(0)}</span>
                          </Col>
                          <Col xs={6} xl={5} className="text-muted mb-1 small">Total Bet (Average)</Col>
                          <Col xs={6} xl={7} className="mb-1">
                            <span className="font-weight-bold small">{this.formatPrice(0)}</span>
                          </Col>
                          <Col xs={6} xl={5} className="text-muted mb-1 small">Total Bet (Maximum)</Col>
                          <Col xs={6} xl={7} className="mb-1">
                            <span className="font-weight-bold small">{this.formatPrice(0)}</span>
                          </Col>
                          <Col xs={6} xl={5} className="text-muted mb-1 small">Session Ended</Col>
                          <Col xs={6} xl={7} className="mb-1">
                            <span className="font-weight-bold small">N/A</span>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Col>

                    <Col md={8} lg={12} xl={8}>
                      <Card.Body>
                        <div className="w-100 text-muted">
                          Not enough session data available...
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </React.Fragment>}

            {/* MinHeight Slider */}
            <MinHeightSlider {...this.state} {...this.props} />
            {/* / MinHeight Slider */}

            <h6 className="text-left text-lighter text-muted text-tiny mb-4">
              All player statistics are updated after each session played. After each completed session, additional personalized <br />
              statistics are generated for each player, which serve to optimize profit and increase efficiency.
            </h6>

          </React.Fragment>
          : null}

        <ToastContainer
          autoClose={false ? false : + '5000'}
          newestOnTop={false}
          closeButton={<CloseButton />}
          rtl={false} />

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  avatar: state.objects.avatar,
  statistics: state.objects.profile.statistics,
  wallet: state.objects.profile.wallet,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(ProfileView))