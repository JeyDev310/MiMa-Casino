import React, { Component } from 'react'
import { Badge, Button, Card, Col, Media, Modal, Row } from 'react-bootstrap'

import * as Chartjs from 'react-chartjs-2'

import AvatarBetTimer from '../../partials/AvatarBetTimer'
import ResourceLoaderN from '../../../utilities/loaders/ResourceLoaderN'

import {
  formatPrice,
  calcDisplaySeconds,
  formatCapitalized,
  calcListAverage,
  calcListMinimum,
  calcListMaximum,
} from '../../utilities/TextPreprocessing'

import '../../../../../vendor/styles/pages/chat.scss'

class Table extends Component {

  constructor(props) {
    super(props)

    this.onToggleScale1Change = this.onToggleScale1Change.bind(this)
    this.onToggleScale2Change = this.onToggleScale2Change.bind(this)

    this.state = {
      scale1: false,
      scale2: false,
    }
  }

  onToggleScale1Change() {
    this.setState({
      scale1: !this.state.scale1,
    })
  }

  onToggleScale2Change() {
    this.setState({
      scale2: !this.state.scale2,
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Table Modal */}
        <Modal.Body style={{ margin: "0" }}>
          <h4 className="text-left mb-4 font-weight-bold">
            Table Insights
          </h4>

          <div className="text-left text-left text-white opacity-50 small mb-3">
            These insights offer you a comprehensive overview of all essential table-specific statistics and parameters.
          </div>

          <hr className="border-light m-0 pt-2 pb-2" />

          {!this.props.game.data.demo_mode && (
            <Card className="mb-3 bg-transparent border-0">
              <div className="w-100">
                <span
                  className="text-body text-big font-weight-semibold img-thumbnail"
                  onClick={this.prevent}>

                  <span
                    className="img-thumbnail-overlay bg-dark opacity-25"
                    style={{
                      borderRadius: "10px",
                    }}></span>

                  <span className="img-thumbnail-content text-white text-xlarge" style={{ borderRadius: "10px !important", }}>
                    <Button
                      variant="instagram rounded-pill"
                      size="md"
                      className="my-2 game-card-button-scale-transform-animation"
                      onClick={this.props.close}>
                      <span className="ion ion-md-play mr-2"></span>
                      <span>
                        Play Now
                      </span>
                    </Button>
                  </span>

                  <span
                    className="card-img-top d-block ui-rect-60 ui-bg-cover"
                    style={{
                      borderRadius: "10px",
                      backgroundImage: `url('${process.env.PUBLIC_URL}/img/cardroom/preview.jpg')`,
                      objectFit: "cover",
                      height: "256px",
                    }}>

                    <div className="d-flex justify-content-end align-items-start ui-rect-content p-3">
                      <div className="flex-shrink-1">
                        <div className="text-big d-flex align-items-center">
                          <Badge
                            variant="dark"
                            pill
                            className="font-weight-bold">
                            <i className="fas fa-user-circle text-danger mr-1"></i>
                            Now Playing
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-end ui-rect-content p-3">
                      <div className="flex-shrink-1">
                        <Badge
                          pill variant="default"
                          className="mr-1 font-weight-bold">
                          <i className="fas fa-wifi" />
                          <span className="ml-2">
                            Live
                          </span>
                        </Badge>

                        <Badge
                          pill variant="default"
                          className="mr-1 font-weight-bold">
                          <i className="fas fa-star" />
                          <span className="ml-2">
                            Table {this.props.game.profile.table_id}
                          </span>
                        </Badge>
                      </div>

                      <div className="text-big">
                        <Badge
                          variant="dark"
                          pill
                          className="font-weight-bold">
                          {formatPrice(this.props.game.data.current_game_values.table_small_blind)}/{formatPrice(this.props.game.data.current_game_values.table_big_blind)}
                        </Badge>
                      </div>
                    </div>

                  </span>
                </span>
              </div>
            </Card>
          )}

          {this.props.game.data.demo_mode && (
            <Card className="mb-3 bg-transparent border-0">
              <div className="w-100">
                <span
                  className="text-body text-big font-weight-semibold img-thumbnail"
                  onClick={this.prevent}>

                  <span
                    className="img-thumbnail-overlay bg-dark opacity-25"
                    style={{
                      borderRadius: "10px",
                    }}></span>

                  <span className="img-thumbnail-content text-white text-xlarge" style={{ borderRadius: "10px !important", }}>
                    <Button
                      variant="instagram rounded-pill"
                      size="md"
                      className="my-2 game-card-button-scale-transform-animation"
                      onClick={this.props.close}>
                      <span className="ion ion-md-play mr-2"></span>
                      <span>
                        Play Now
                      </span>
                    </Button>
                  </span>

                  <span
                    className="card-img-top d-block ui-rect-60 ui-bg-cover"
                    style={{
                      borderRadius: "10px",
                      backgroundImage: `url('${process.env.PUBLIC_URL}/img/cardroom/preview.jpg')`,
                      backgroundPositionX: "-50px",
                      objectFit: "cover",
                      height: "256px",
                    }}>

                    <div className="d-flex justify-content-end align-items-start ui-rect-content p-3">
                      <div className="flex-shrink-1">
                        <div className="text-big d-flex align-items-center">
                          <Badge
                            variant="dark"
                            pill
                            className="font-weight-bold">
                            <i className="fas fa-user-circle text-danger mr-1"></i>
                            Now Playing
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-end ui-rect-content p-3">
                      <div className="flex-shrink-1">
                        <Badge
                          pill variant="default"
                          className="mr-1 font-weight-bold">
                          <i className="fas fa-wifi" />
                          <span className="ml-2">
                            Live
                          </span>
                        </Badge>

                        <Badge
                          pill variant="default"
                          className="mr-1 font-weight-bold">
                          <i className="fas fa-star" />
                          <span className="ml-2">
                            Table {this.props.game.profile.table_id}
                          </span>
                        </Badge>
                      </div>
                    </div>

                  </span>
                </span>
              </div>
            </Card>
          )}

          <Button
            style={{ borderRadius: "15px", }}
            variant="linkedin mb-3" block
            onClick={() => { this.props.openFill(15) }}
            className="font-weight-bold text-left">
            <span>
              <i className="fas fa-info mr-3" />
              <span>View Game Rules</span>
            </span>
          </Button>

          <Media
            as={Col}
            md={12} lg={12} xl={12}
            className="p-3 bg-light mb-3"
            style={{
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
            }}>

            <span style={{ transform: "scale(0.8)", }}>
              <AvatarBetTimer
                {...this.props} {...this.state}
                translate={false} change={() => void 0} />
            </span>

            <Media.Body className="ml-3">
              {this.props.game.data.demo_mode
                ? <h4 className="font-weight-bold mb-1">
                  Free Play
                </h4>
                : <h4 className="font-weight-bold mb-1">
                  Table {this.props.game.profile.table_id}
                </h4>}

              <Badge
                pill variant={`${this.props.game.data.game_status
                  ? 'success'
                  : 'darker1'} rounded-pill`} className="font-weight-bold">
                {this.props.game.data.game_status
                  ? 'Ready'
                  : 'Paused'}
              </Badge>

              {this.props.game.data.auto_mode
                ? <Badge
                  pill variant="darker1 rounded-pill ml-1"
                  className="font-weight-bold">
                  Automatic
                </Badge>
                : <Badge
                  pill variant="darker1 rounded-pill ml-1"
                  className="font-weight-bold">
                  {String(this.props.game.data.dealer_name).replace('_', '')}
                </Badge>}
            </Media.Body>
          </Media>

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

          {this.props.slideModalEnter
            ? <Card className="mb-3 bg-light" style={{
              borderRadius: "15px",
            }}>
              <Card.Body>
                <div className="float-right text-success text-tiny">
                  <div className="card-header-elements ml-auto">
                    <Button
                      size="sm"
                      variant="light rounded-pill md-btn-flat font-weight-bold"
                      onClick={this.onToggleScale1Change}>
                      {this.state.scale1
                        ? 'Linear'
                        : 'Logarithmic'}
                    </Button>
                  </div>
                </div>
                <div className="text-muted small">
                  Average Potsize
                </div>
                <div className="text-xlarge">
                  {formatPrice(this.props.game.data.avg_potsize.average)}
                </div>
              </Card.Body>
              <div className="px-2">
                {this.props.game.data.avg_potsize.total_pots.length > 1
                  ? <Chartjs.Bar className="w-100"
                    height={117}
                    data={{
                      datasets: [{
                        data: this.props.game.data.avg_potsize.total_pots.slice(-128),
                        borderWidth: 0,
                        backgroundColor: '#673AB7',
                      }],
                      labels: Array.from({ length: Object.keys(this.props.game.data.avg_potsize.total_pots).length }, (_, index) => index + 1).slice(-128),
                    }}
                    options={{
                      tooltips: {
                        callbacks: {
                          label: function (t, d) {
                            var value = parseFloat(t.yLabel).toFixed(2)
                            var yLabel = value >= 1000 ? ' $' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ' $' + value
                            return yLabel
                          },
                          title: function (t, d) {
                            return 'Potsize'
                          },
                        }
                      },
                      scales: {
                        xAxes: [{
                          display: false,
                        }],
                        yAxes: [{
                          display: false,
                          type: this.state.scale1 ? "linear" : "logarithmic",
                        }]
                      },
                      legend: {
                        display: false,
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                  : <Row noGutters className="h-100 border-0 shadow-none mb-3">
                    <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                      <ResourceLoaderN
                        height={`5rem`} width={`5rem`} />
                    </Col>
                  </Row>}
              </div>
              <Card.Footer className="text-center py-2">
                <Row>
                  <Col>
                    <div className="text-muted small">
                      Average
                    </div>
                    <strong className="text-big">
                      {formatPrice(calcListAverage(this.props.game.data.avg_potsize.total_pots))}
                    </strong>
                  </Col>
                  <Col>
                    <div className="text-muted small">
                      Min/Max
                    </div>
                    <strong className="text-big">
                      {formatPrice(calcListMinimum(this.props.game.data.avg_potsize.total_pots))}/{formatPrice(calcListMaximum(this.props.game.data.avg_potsize.total_pots))}
                    </strong>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
            : null}

          {this.props.slideModalEnter
            ? <Card className="mb-3 bg-light" style={{
              borderRadius: "15px",
            }}>
              <Card.Body>
                <div className="float-right text-success text-tiny">
                  <div className="card-header-elements ml-auto">
                    <Button
                      size="sm"
                      variant="light rounded-pill md-btn-flat font-weight-bold"
                      onClick={this.onToggleScale2Change}>
                      {this.state.scale2
                        ? 'Linear'
                        : 'Logarithmic'}
                    </Button>
                  </div>
                </div>
                <div className="text-muted small">
                  Average Duration
                </div>
                <div className="text-xlarge">
                  {calcDisplaySeconds(this.props.game.data.avg_duration.average)}
                </div>
              </Card.Body>
              <div className="mt-3">
                {this.props.game.data.avg_duration.total_durations.length > 1
                  ? <Chartjs.Line
                    height={100}
                    data={{
                      datasets: [{
                        data: this.props.game.data.avg_duration.total_durations.slice(-128),
                        borderWidth: 1,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: '#009688',
                        pointBorderColor: 'rgba(0,0,0,0)',
                        pointRadius: 1,
                        lineTension: 0,
                      }],
                      labels: Array.from({ length: Object.keys(this.props.game.data.avg_duration.total_durations).length }, (_, index) => index + 1).slice(-128),
                    }}
                    options={{
                      tooltips: {
                        callbacks: {
                          label: function (t, d) {
                            var value = parseFloat(t.yLabel)
                            var yLabel = ' ' + value + ' s'
                            return yLabel
                          },
                          title: function (t, d) {
                            return 'Duration'
                          },
                        }
                      },
                      scales: {
                        xAxes: [{
                          display: false,
                        }],
                        yAxes: [{
                          display: false,
                          type: this.state.scale2 ? "linear" : "logarithmic",
                        }]
                      },
                      legend: {
                        display: false,
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                  : <Row noGutters className="h-100 border-0 shadow-none mb-3">
                    <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                      <ResourceLoaderN height={`5rem`} width={`5rem`} />
                    </Col>
                  </Row>}
              </div>
              <Card.Footer className="text-center py-2">
                <Row>
                  <Col>
                    <div className="text-muted small">
                      Minimum
                    </div>
                    <strong className="text-big">
                      {calcDisplaySeconds(calcListMinimum(this.props.game.data.avg_duration.total_durations))}
                    </strong>
                  </Col>
                  <Col>
                    <div className="text-muted small">
                      Maximum
                    </div>
                    <strong className="text-big">
                      {calcDisplaySeconds(calcListMaximum(this.props.game.data.avg_duration.total_durations))}
                    </strong>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
            : null}

          <div className="mb-0 list-group pt-0 pb-3">
            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online border-0 ${1001 > 1000
                ? 'backgroundAnimatedInsightsItem'
                : 'bg-dark'}`}
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
                    Potsize
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {formatPrice(this.props.game.data.current_game_values.total_pot)}
              </h5>
            </span>

            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online border-0`}
              style={{
                padding: "10px",
                alignItems: "center",
                backgroundColor: "rgba(37, 40, 46, 0.8)",
              }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                  <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h5">
                  <Badge
                    pill variant="default"
                    className="font-weight-bold">
                    Small Blind
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {formatPrice(this.props.game.data.current_game_values.table_small_blind)}
              </h5>
            </span>

            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online bg-dark border-0`}
              style={{
                padding: "10px",
                alignItems: "center",
              }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.3" d="M12.5 22C11.9 22 11.5 21.6 11.5 21V3C11.5 2.4 11.9 2 12.5 2C13.1 2 13.5 2.4 13.5 3V21C13.5 21.6 13.1 22 12.5 22Z" fill="white" />
                  <path d="M17.8 14.7C17.8 15.5 17.6 16.3 17.2 16.9C16.8 17.6 16.2 18.1 15.3 18.4C14.5 18.8 13.5 19 12.4 19C11.1 19 10 18.7 9.10001 18.2C8.50001 17.8 8.00001 17.4 7.60001 16.7C7.20001 16.1 7 15.5 7 14.9C7 14.6 7.09999 14.3 7.29999 14C7.49999 13.8 7.80001 13.6 8.20001 13.6C8.50001 13.6 8.69999 13.7 8.89999 13.9C9.09999 14.1 9.29999 14.4 9.39999 14.7C9.59999 15.1 9.8 15.5 10 15.8C10.2 16.1 10.5 16.3 10.8 16.5C11.2 16.7 11.6 16.8 12.2 16.8C13 16.8 13.7 16.6 14.2 16.2C14.7 15.8 15 15.3 15 14.8C15 14.4 14.9 14 14.6 13.7C14.3 13.4 14 13.2 13.5 13.1C13.1 13 12.5 12.8 11.8 12.6C10.8 12.4 9.99999 12.1 9.39999 11.8C8.69999 11.5 8.19999 11.1 7.79999 10.6C7.39999 10.1 7.20001 9.39998 7.20001 8.59998C7.20001 7.89998 7.39999 7.19998 7.79999 6.59998C8.19999 5.99998 8.80001 5.60005 9.60001 5.30005C10.4 5.00005 11.3 4.80005 12.3 4.80005C13.1 4.80005 13.8 4.89998 14.5 5.09998C15.1 5.29998 15.6 5.60002 16 5.90002C16.4 6.20002 16.7 6.6 16.9 7C17.1 7.4 17.2 7.69998 17.2 8.09998C17.2 8.39998 17.1 8.7 16.9 9C16.7 9.3 16.4 9.40002 16 9.40002C15.7 9.40002 15.4 9.29995 15.3 9.19995C15.2 9.09995 15 8.80002 14.8 8.40002C14.6 7.90002 14.3 7.49995 13.9 7.19995C13.5 6.89995 13 6.80005 12.2 6.80005C11.5 6.80005 10.9 7.00005 10.5 7.30005C10.1 7.60005 9.79999 8.00002 9.79999 8.40002C9.79999 8.70002 9.9 8.89998 10 9.09998C10.1 9.29998 10.4 9.49998 10.6 9.59998C10.8 9.69998 11.1 9.90002 11.4 9.90002C11.7 10 12.1 10.1 12.7 10.3C13.5 10.5 14.2 10.7 14.8 10.9C15.4 11.1 15.9 11.4 16.4 11.7C16.8 12 17.2 12.4 17.4 12.9C17.6 13.4 17.8 14 17.8 14.7Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h5">
                  <Badge
                    pill variant="default"
                    className="font-weight-bold">
                    Big Blind
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {formatPrice(this.props.game.data.current_game_values.table_big_blind)}
              </h5>
            </span>

            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online border-0`}
              style={{
                padding: "10px",
                alignItems: "center",
                backgroundColor: "rgba(37, 40, 46, 0.8)",
              }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 22H3C2.4 22 2 21.6 2 21C2 20.4 2.4 20 3 20H21C21.6 20 22 20.4 22 21C22 21.6 21.6 22 21 22ZM11 6.59998V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V6.59998H11Z" fill="white" />
                  <path opacity="0.3" d="M7 6.59999H17L12.7 2.3C12.3 1.9 11.7 1.9 11.3 2.3L7 6.59999Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h5">
                  <Badge
                    pill variant="default"
                    className="font-weight-bold">
                    Raise Level
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {formatPrice(this.props.game.data.current_game_values.raise_level)}
              </h5>
            </span>

            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online bg-dark border-0`}
              style={{
                padding: "10px",
                alignItems: "center",
              }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9.60001 11H21C21.6 11 22 11.4 22 12C22 12.6 21.6 13 21 13H9.60001V11Z" fill="white" />
                  <path d="M6.2238 13.2561C5.54282 12.5572 5.54281 11.4429 6.22379 10.7439L10.377 6.48107C10.8779 5.96697 11.75 6.32158 11.75 7.03934V16.9607C11.75 17.6785 10.8779 18.0331 10.377 17.519L6.2238 13.2561Z" fill="white" />
                  <rect opacity="0.3" x="2" y="4" width="2" height="16" rx="1" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h5">
                  <Badge
                    pill variant="default"
                    className="font-weight-bold">
                    Buy-In Minimum
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {formatPrice(this.props.game.data.current_game_values.table_minimum_buy_in)}
              </h5>
            </span>

            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online border-0`}
              style={{
                padding: "10px",
                alignItems: "center",
                backgroundColor: "rgba(37, 40, 46, 0.8)",
              }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14.4 11H2.99999C2.39999 11 1.99999 11.4 1.99999 12C1.99999 12.6 2.39999 13 2.99999 13H14.4V11Z" fill="white" />
                  <path d="M17.7762 13.2561C18.4572 12.5572 18.4572 11.4429 17.7762 10.7439L13.623 6.48107C13.1221 5.96697 12.25 6.32158 12.25 7.03934V16.9607C12.25 17.6785 13.1221 18.0331 13.623 17.519L17.7762 13.2561Z" fill="white" />
                  <rect opacity="0.5" width="2" height="16" rx="1" transform="matrix(-1 0 0 1 22 4)" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h5">
                  <Badge
                    pill variant="default"
                    className="font-weight-bold">
                    Buy-In Maximum
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {formatPrice(this.props.game.data.current_game_values.table_maximum_buy_in)}
              </h5>
            </span>

            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online bg-dark border-0`}
              style={{
                padding: "10px",
                alignItems: "center",
              }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.3" d="M11.85 21.9766L10.05 21.1766C9.55 20.9766 9.35 20.3766 9.55 19.8766L9.95002 18.9766C10.85 16.8766 10.85 14.8766 9.95002 12.7766C8.55002 9.67664 8.55002 6.57664 9.95002 3.47664L10.35 2.57664C10.55 2.07664 11.15 1.87664 11.65 2.07664L13.45 2.87664C13.95 3.07664 14.15 3.67664 13.95 4.17664L13.55 5.07664C12.65 7.17664 12.65 9.17664 13.55 11.2766C14.95 14.3766 14.95 17.4766 13.55 20.5766L13.15 21.4766C12.95 21.9766 12.35 22.1766 11.85 21.9766ZM20.05 21.4766L20.45 20.5766C21.85 17.4766 21.85 14.3766 20.45 11.2766C19.55 9.17664 19.55 7.17664 20.45 5.07664L20.85 4.17664C21.05 3.67664 20.85 3.07664 20.35 2.87664L18.55 2.07664C18.05 1.87664 17.45 2.07664 17.25 2.57664L16.85 3.47664C15.45 6.57664 15.45 9.67664 16.85 12.7766C17.75 14.8766 17.75 16.8766 16.85 18.9766L16.45 19.8766C16.25 20.3766 16.45 20.9766 16.95 21.1766L18.75 21.9766C19.25 22.1766 19.85 21.9766 20.05 21.4766Z" fill="white" />
                  <path d="M4.95002 21.9766L3.15001 21.1766C2.65001 20.9766 2.45001 20.3766 2.65001 19.8766L3.05 18.9766C3.95 16.8766 3.95 14.8766 3.05 12.7766C1.65 9.67664 1.65 6.57664 3.05 3.47664L3.45002 2.57664C3.65002 2.07664 4.25001 1.87664 4.75001 2.07664L6.55 2.87664C7.05 3.07664 7.25 3.67664 7.05 4.17664L6.65001 5.07664C5.75001 7.17664 5.75001 9.17664 6.65001 11.2766C8.05001 14.3766 8.05001 17.4766 6.65001 20.5766L6.25001 21.4766C6.05001 21.9766 5.45002 22.1766 4.95002 21.9766Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h5">
                  <Badge
                    pill variant="default"
                    className="font-weight-bold">
                    Round
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {this.props.game.data.current_round === "null"
                  ? "Paused"
                  : formatCapitalized(this.props.game.data.current_round)}
              </h5>
            </span>

            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online border-0`}
              style={{
                padding: "10px",
                alignItems: "center",
                backgroundColor: "rgba(37, 40, 46, 0.8)",
              }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16.9 10.7L7 5V19L16.9 13.3C17.9 12.7 17.9 11.3 16.9 10.7Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h5">
                  <Badge
                    pill variant="default"
                    className="font-weight-bold">
                    Game Started
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {this.props.game.data.game_started ? "Yes" : "No"}
              </h5>
            </span>

            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online bg-dark border-0`}
              style={{
                padding: "10px",
                alignItems: "center",
              }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.3" d="M11 13H7C6.4 13 6 12.6 6 12C6 11.4 6.4 11 7 11H11V13ZM17 11H13V13H17C17.6 13 18 12.6 18 12C18 11.4 17.6 11 17 11Z" fill="white" />
                  <path d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM17 11H13V7C13 6.4 12.6 6 12 6C11.4 6 11 6.4 11 7V11H7C6.4 11 6 11.4 6 12C6 12.6 6.4 13 7 13H11V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V13H17C17.6 13 18 12.6 18 12C18 11.4 17.6 11 17 11Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h5">
                  <Badge
                    pill variant="default"
                    className="font-weight-bold">
                    Joinable
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {this.props.game.data.is_joinable ? "Yes" : "No"}
              </h5>
            </span>

            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online border-0`}
              style={{
                padding: "10px",
                alignItems: "center",
                backgroundColor: "rgba(37, 40, 46, 0.8)",
              }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13.0021 10.9128V3.01281C13.0021 2.41281 13.5021 1.91281 14.1021 2.01281C16.1021 2.21281 17.9021 3.11284 19.3021 4.61284C20.7021 6.01284 21.6021 7.91285 21.9021 9.81285C22.0021 10.4129 21.5021 10.9128 20.9021 10.9128H13.0021Z" fill="white" />
                  <path opacity="0.3" d="M11.0021 13.7128V4.91283C11.0021 4.31283 10.5021 3.81283 9.90208 3.91283C5.40208 4.51283 1.90209 8.41284 2.00209 13.1128C2.10209 18.0128 6.40208 22.0128 11.3021 21.9128C13.1021 21.8128 14.7021 21.3128 16.0021 20.4128C16.5021 20.1128 16.6021 19.3128 16.1021 18.9128L11.0021 13.7128Z" fill="white" />
                  <path opacity="0.3" d="M21.9021 14.0128C21.7021 15.6128 21.1021 17.1128 20.1021 18.4128C19.7021 18.9128 19.0021 18.9128 18.6021 18.5128L13.0021 12.9128H20.9021C21.5021 12.9128 22.0021 13.4128 21.9021 14.0128Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h5">
                  <Badge
                    pill variant="default"
                    className="font-weight-bold">
                    Average Potsize
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {formatPrice(this.props.game.data.avg_potsize.average)}
              </h5>
            </span>

            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online bg-dark border-0`}
              style={{
                padding: "10px",
                alignItems: "center",
              }}>
              <span className="svg-icon svg-icon-muted svg-icon-2hx">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.3" d="M11 11H13C13.6 11 14 11.4 14 12V21H10V12C10 11.4 10.4 11 11 11ZM16 3V21H20V3C20 2.4 19.6 2 19 2H17C16.4 2 16 2.4 16 3Z" fill="white" />
                  <path d="M21 20H8V16C8 15.4 7.6 15 7 15H5C4.4 15 4 15.4 4 16V20H3C2.4 20 2 20.4 2 21C2 21.6 2.4 22 3 22H21C21.6 22 22 21.6 22 21C22 20.4 21.6 20 21 20Z" fill="white" />
                </svg>
              </span>

              <Media.Body className="ml-3">
                <span className="text-medium font-weight-medium h5">
                  <Badge
                    pill variant="default"
                    className="font-weight-bold">
                    Average Duration
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {calcDisplaySeconds(this.props.game.data.avg_duration.average)}
              </h5>
            </span>

            <span
              onClick={this.prevent}
              className={`d-flex list-group-item list-group-item-action online border-0`}
              style={{
                padding: "10px",
                alignItems: "center",
                backgroundColor: "rgba(37, 40, 46, 0.8)",
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
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
                    Game ID
                  </Badge>
                </span>
              </Media.Body>

              <h5 className="mb-0 font-weight-bold small">
                {this.props.game.profile.game_id}
              </h5>
            </span>
          </div>

          <hr className="border-light m-0 py-2" />

          <Button
            variant="instagram" block
            onClick={this.props.close}
            className="font-weight-bold">
            Continue
          </Button>
        </Modal.Body>
        {/* / Table Modal */}
      </>
    )
  }
}

export default Table