import React, { Component } from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import { ContextMenu, MenuItem, ContextMenuTrigger, SubMenu } from 'react-contextmenu'
import { ToastContainer, toast } from 'react-toastify'

import * as numeral from 'numeral'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  objectsRequestHandler,
} from '../../../store/actions'

import {
  REQ_GAMES_PUBLIC_ALL,
  REQ_GAMES_GET,
  REQ_PROFILE_WALLET_GET,
} from '../../../store/objects/actionTypes'

import '../assets/css/views.css'
import '../../../vendor/styles/pages/games.scss'
import '../../../vendor/libs/react-toastify/react-toastify.scss'
import '../../../vendor/libs/react-contextmenu/react-contextmenu.scss'

const CloseButton = ({ closeToast }) => (
  <button className="Toastify__close-button" type="button" aria-label="close"
    onClick={closeToast}>&times;</button>
)

class FreePlayListView extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Free Play')

    this.setViewMode = this.setViewMode.bind(this)
    this.onRefreshClick = this.onRefreshClick.bind(this)
    this.evaluateActiveRoute = this.evaluateActiveRoute.bind(this)
    this.onGamePlayConnectClick = this.onGamePlayConnectClick.bind(this)
    this.onEvaluateGameIsJoinable = this.onEvaluateGameIsJoinable.bind(this)

    this.state = {
      init: false,
      username: null,
      viewMode: 'col',
    }
  }

  componentDidMount() {
    this.evaluateActiveRoute()
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
      })
    }
    this.props.objectsRequestHandler(
      REQ_GAMES_PUBLIC_ALL, null, this.props.history
    ).then(() => {
      if (localStorage.getItem('user')) {
        this.props.objectsRequestHandler(
          REQ_PROFILE_WALLET_GET, {
          id: JSON.parse(localStorage.getItem('user')).id,
        }, this.props.history)
          .then(() => {
            this.setState({
              init: true,
            })
          })
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      this.showToastify(<div className="font-weight-bold ml-2">{this.props.error.message}</div>, 'error')
    }
  }

  evaluateActiveRoute() {
    if (!localStorage.getItem('token')) {
      this.props.history.push("/auth/login")
    }
  }

  onGamePlayConnectClick(id) {
    this.props.objectsRequestHandler(
      REQ_GAMES_GET,
      { id },
      this.props.history)
      .then(() => {
        this.props.history.push(`/games/live/connect/internal/${id}/1`)
      })
  }

  onRefreshClick() {
    this.props.objectsRequestHandler(
      REQ_GAMES_PUBLIC_ALL, null, this.props.history)
      .then(() => {
        this.setState({
          init: true,
        }, () => {
          this.showToastify(<>
            <div className="cursor-pointer p-0 m-0 small">
              <h6>
                Live Poker Studio™ Free Games
              </h6>
              <p className="mb-0">
                Free Games have been updated successfully.
              </p>
            </div>
          </>, 'info')
        })
      })
  }

  onEvaluateGameIsJoinable(game) {
    if (game.table_dealer_id === this.state.username) {
      return true
    }
    if (game.table_live_players >= game.table_max_players) {
      return false
    } else {
      return true
    }
  }

  formatStats(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    var item = lookup.slice().reverse().find(function (item) {
      return num >= item.value
    })
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0"
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

  setViewMode(viewMode) {
    this.setState({ viewMode })
  }

  formatPrice = (p) => {
    return numeral(p).format('$0,0.00')
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>

        {/* Free Games */}
        {this.state.init && (
          <>
            <h5 className="font-weight-bold py-2 mb-2 d-flex justify-content-between align-items-center">
              <span>Free Games</span>
              <span className="my-0 ml-2">
                <Badge
                  pill
                  variant="danger"
                  className="text-small font-weight-bold">
                  Beta
                </Badge>
              </span>

              <span className="ml-auto">
                <Button
                  variant="light rounded-pill"
                  className="d-flex align-items-center justify-content-center ml-2"
                  size="md"
                  onClick={this.onRefreshClick}>
                  <div className="d-flex align-items-center justify-content-center">
                    <svg className="nav_content__s2 icon__star">
                      <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-replay`}></use>
                    </svg>
                  </div>
                  <span className="font-weight-semibold ml-2">
                    Refresh
                  </span>
                </Button>
              </span>
            </h5>

            {this.props.games.filter((item) => item.table_demo_mode).length > 0
              ? <>
                {/* Free Games Available */}
                <Row>
                  {this.props.games
                    .filter((item) => item.table_demo_mode)
                    .sort((a, b) => { return a.table_id - b.table_id })
                    .map((game, index) => (

                      <Col
                        key={index}
                        xs={12} sm={6} md={6} lg={6} xl={3}>
                        <ContextMenuTrigger
                          id={`item-context-index-${index}`}>
                          <Card className="mb-4 bg-transparent border-0">
                            <div className="w-100">
                              <Link
                                to="#"
                                className="text-body text-big font-weight-semibold img-thumbnail"
                                onClick={this.prevent}>

                                <span
                                  className="img-thumbnail-overlay bg-dark opacity-25"
                                  style={{
                                    borderRadius: "10px",
                                  }}></span>

                                <span
                                  className="img-thumbnail-content text-white text-xlarge"
                                  style={{ borderRadius: "10px !important", }}>
                                  {this.onEvaluateGameIsJoinable(game)
                                    ? (
                                      <Button
                                        variant="success rounded-pill"
                                        size="md"
                                        className="my-2 game-card-button-scale-transform-animation"
                                        onClick={() => { this.onGamePlayConnectClick(game.table_game_id) }}>
                                        <span className="ion ion-md-play mr-2"></span>
                                        <span>
                                          Free To Play
                                        </span>
                                      </Button>
                                    )
                                    : (
                                      <Button
                                        variant="dark rounded-pill"
                                        size="md"
                                        className="my-2"
                                        onClick={this.prevent}>
                                        <span className="fas fa-times-circle mr-2"></span>
                                        <span>
                                          No Free Seats
                                        </span>
                                      </Button>
                                    )}
                                </span>

                                <span
                                  className="card-img-top d-block ui-rect-60 ui-bg-cover"
                                  style={{
                                    borderRadius: "10px",
                                    backgroundImage: `url('${process.env.PUBLIC_URL}/img/cards/games/tables/0.jpg')`,
                                    objectFit: "cover",
                                    height: "300px",
                                  }}>

                                  <div className="d-flex justify-content-between align-items-start ui-rect-content p-3">
                                    <div className="flex-shrink-1">
                                      <Badge
                                        pill variant="default"
                                        className="mr-1 font-weight-bold">
                                        <i className="fas fa-wifi" />
                                        <span className="ml-2">
                                          {game.table_auto_mode
                                            ? `Auto`
                                            : `Table ${game.table_id}`}
                                        </span>
                                      </Badge>

                                      <Badge
                                        pill variant="default"
                                        className="mr-1 font-weight-bold">
                                        <i className="fas fa-star" />
                                        <span className="ml-2">
                                          Free
                                        </span>
                                      </Badge>
                                    </div>

                                    <div className="text-big">
                                      <Badge
                                        pill variant="dark"
                                        className="font-weight-bold">
                                        <i className="fas fa-user-circle text-danger mr-1"></i>
                                        {`${game.table_live_players}/${game.table_max_players} Players`}
                                      </Badge>
                                    </div>
                                  </div>

                                  <div className="d-flex justify-content-between align-items-end ui-rect-content p-3">
                                    <div className="flex-shrink-1">
                                      <Badge
                                        pill variant="default"
                                        className="mr-1 font-weight-bold">
                                        <i className="fas fa-eye" />
                                        <span className="ml-2">
                                          {this.formatStats(game.table_view_stats.hits || 0)}
                                        </span>
                                      </Badge>

                                      <Badge
                                        pill variant="default"
                                        className="mr-1 font-weight-bold">
                                        <i className="fas fa-thumbs-up" />
                                        <span className="ml-2">
                                          {this.formatStats(game.table_view_stats.likes || 0)}
                                        </span>
                                      </Badge>

                                      <Badge
                                        pill variant="default"
                                        className="mr-1 font-weight-bold">
                                        <i className="fas fa-heart" />
                                        <span className="ml-2">
                                          {this.formatStats(game.table_view_stats.hearts || 0)}
                                        </span>
                                      </Badge>
                                    </div>

                                    <div className="text-big">
                                      <Badge
                                        variant="dark"
                                        pill
                                        className="font-weight-bold">
                                        {this.formatPrice(game.table_small_blind)}/{this.formatPrice(game.table_big_blind)}
                                      </Badge>
                                    </div>
                                  </div>
                                </span>
                              </Link>
                            </div>
                          </Card>
                        </ContextMenuTrigger>

                        <ContextMenu
                          id={`item-context-index-${index}`}>
                          {this.onEvaluateGameIsJoinable(game)
                            ? (<MenuItem
                              data={{ itemNo: 'play_now', }}
                              onClick={() => {
                                this.onGamePlayConnectClick(game.table_game_id)
                              }}>
                              <span className="font-weight-semibold">
                                Play Now
                              </span>
                            </MenuItem>)
                            : (<MenuItem
                              data={{ itemNo: 'play_now', }}
                              onClick={this.prevent} disabled>
                              <span className="font-weight-semibold">
                                No Free Seats
                              </span>
                            </MenuItem>)}
                          <SubMenu
                            title={
                              <span className="font-weight-semibold">
                                Profile
                              </span>
                            }>
                            <MenuItem
                              data={{ itemNo: 'statistics', }}
                              onClick={() => {
                                this.props.history.push('/profile')
                              }}>
                              <span className="font-weight-semibold">
                                Statistics
                              </span>
                            </MenuItem>
                            <MenuItem
                              data={{ itemNo: 'payments', }}
                              onClick={() => {
                                this.props.history.push('/transactions')
                              }}>
                              <span className="font-weight-semibold">
                                Transactions
                              </span>
                            </MenuItem>
                            <MenuItem
                              data={{ itemNo: 'game_history', }}
                              onClick={() => {
                                this.props.history.push('/summary')
                              }}>
                              <span className="font-weight-semibold">
                                Game History
                              </span>
                            </MenuItem>
                            <MenuItem
                              data={{ itemNo: 'notifications', }}
                              onClick={() => {
                                this.props.history.push('/notifications')
                              }}>
                              <span className="font-weight-semibold">
                                Notifications
                              </span>
                            </MenuItem>
                          </SubMenu>
                          <MenuItem divider />
                          <MenuItem
                            data={{ itemNo: 'settings', }}
                            onClick={() => {
                              this.props.history.push('/settings')
                            }}>
                            <span className="font-weight-semibold">
                              Settings
                            </span>
                          </MenuItem>
                        </ContextMenu>
                      </Col>

                    ))}
                </Row>
                {/* / Free Games Available */}
              </>
              : <>
                {/* Placeholder Card */}
                <Row>
                  <Col xs={12} sm={6} md={6} lg={6} xl={3}>
                    <ContextMenuTrigger
                      id={`item-context-index-placeholder`}>
                      <Card className="mb-4 bg-transparent border-0">
                        <div className="w-100">
                          <Link
                            to="#"
                            className="text-body text-big font-weight-semibold img-thumbnail"
                            onClick={this.prevent}>

                            <span
                              className="img-thumbnail-overlay bg-dark opacity-25"
                              style={{
                                borderRadius: "10px",
                              }}></span>

                            <span
                              className="img-thumbnail-content text-white text-xlarge"
                              style={{ borderRadius: "10px !important", }}>
                              <Button
                                variant="instagram rounded-pill"
                                size="md"
                                className="my-2"
                                onClick={this.prevent}>
                                <span className="fas fa-times-circle mr-2"></span>
                                <span>
                                  No Free Games Available
                                </span>
                              </Button>
                            </span>

                            <span
                              className="card-img-top d-block ui-rect-60 ui-bg-cover"
                              style={{
                                borderRadius: "10px",
                                backgroundImage: `url('${process.env.PUBLIC_URL}/img/cards/games/tables/0.jpg')`,
                                objectFit: "cover",
                                height: "300px",
                                filter: "blur(2px) drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.9))",
                              }}>

                              <div className="d-flex justify-content-end align-items-start ui-rect-content p-3">
                                <div className="flex-shrink-1">
                                  <div className="text-big">
                                    <Badge
                                      variant="dark"
                                      pill
                                      className="font-weight-bold">
                                      <i className="fas fa-user-circle text-danger mr-1"></i>
                                      <span>
                                        0/0 Players
                                      </span>
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="d-flex justify-content-between align-items-end ui-rect-content p-3">
                                <div className="flex-shrink-1">
                                  {['Online', 'Live'].map(tag =>
                                    <Badge
                                      variant="primary"
                                      pill key={tag}
                                      className="mr-1 font-weight-bold">
                                      {tag}
                                    </Badge>
                                  )}
                                  <Badge
                                    variant="primary"
                                    pill
                                    className="mr-1 font-weight-bold">
                                    Free Play
                                  </Badge>
                                </div>
                                <div className="text-big">
                                  <Badge
                                    variant="dark"
                                    pill
                                    className="font-weight-bold">
                                    {this.formatPrice(0)}/{this.formatPrice(0)}
                                  </Badge>
                                </div>
                              </div>
                            </span>
                          </Link>
                        </div>
                      </Card>
                    </ContextMenuTrigger>

                    <ContextMenu
                      id={`item-context-index-placeholder`}>
                      <MenuItem
                        data={{ itemNo: 'play_now', }}
                        onClick={this.prevent} disabled>
                        <span className="font-weight-semibold">
                          No Free Games Available
                        </span>
                      </MenuItem>
                      <SubMenu title={
                        <span className="font-weight-semibold">
                          Profile
                        </span>
                      }>
                        <MenuItem
                          data={{ itemNo: 'statistics', }}
                          onClick={() => {
                            this.props.history.push('/profile')
                          }}>
                          <span className="font-weight-semibold">
                            Statistics
                          </span>
                        </MenuItem>
                        <MenuItem
                          data={{ itemNo: 'payments', }}
                          onClick={() => {
                            this.props.history.push('/transactions')
                          }}>
                          <span className="font-weight-semibold">
                            Transactions
                          </span>
                        </MenuItem>
                        <MenuItem
                          data={{ itemNo: 'game_history', }}
                          onClick={() => {
                            this.props.history.push('/summary')
                          }}>
                          <span className="font-weight-semibold">
                            Game History
                          </span>
                        </MenuItem>
                        <MenuItem
                          data={{ itemNo: 'notifications', }}
                          onClick={() => {
                            this.props.history.push('/notifications')
                          }}>
                          <span className="font-weight-semibold">
                            Notifications
                          </span>
                        </MenuItem>
                      </SubMenu>
                      <MenuItem divider />
                      <MenuItem
                        data={{ itemNo: 'settings', }}
                        onClick={() => {
                          this.props.history.push('/settings')
                        }}>
                        <span className="font-weight-semibold">
                          Settings
                        </span>
                      </MenuItem>
                    </ContextMenu>
                  </Col>
                </Row>
                {/* / Placeholder Card */}
              </>}
          </>
        )}
        {/* / Free Games */}

        {/* Toast Container */}
        <ToastContainer
          autoClose={false ? false : + '1500'}
          newestOnTop={false}
          closeButton={<CloseButton />}
          rtl={false} />
        {/* / Toast Container */}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  avatar: state.objects.avatar,
  games: state.objects.games.items,
  notifications: state.objects.notifications.items,
  wallet: state.objects.profile.wallet,
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(FreePlayListView))