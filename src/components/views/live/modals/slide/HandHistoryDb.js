import React, { Component } from 'react'
import { Badge, Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap'

import API from '../../../../../api'

import DatePicker from 'react-datepicker'
import moment from 'moment'
import FileSaver from 'file-saver'
import Select from 'react-select'

import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'

import {
  formatCapitalized,
  formatPrice,
  truncateString,
  truncateUsername,
} from '../../utilities/TextPreprocessing'

import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/libs/react-datepicker/react-datepicker.scss'
import '../../../../../vendor/libs/react-select/react-select.scss'

class HandHistory extends Component {

  constructor(props) {
    super(props)

    this.scrollTargetTop1 = React.createRef()

    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePrevPage = this.handlePrevPage.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleSetDates = this.handleSetDates.bind(this)
    this.handleChangeStart = this.handleChangeStart.bind(this)
    this.handleChangeEnded = this.handleChangeEnded.bind(this)
    this.downloadHandHistoryJSON = this.downloadHandHistoryJSON.bind(this)
    this.downloadHandHistoryItemJSON = this.downloadHandHistoryItemJSON.bind(this)

    this.state = {
      init: false,
      data: [],
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      isFetching: true,
      showParamsModal: false,
      filterRange: "all",
      filterDatetime: false,
      filterStart: new Date(new Date().setDate(new Date().getDate() - 14)),
      filterEnded: new Date(),
      selectedItem: null,
      selectedExpand: false,
      showWonGames: false,
      showLostGames: false,
      showAnnotation1: true,
    }

    this.selectOptions1 = [
      { id: 0, value: 'all', label: 'All', isDisabled: false, },
      { id: 1, value: 'today', label: 'Today', isDisabled: false, },
      { id: 2, value: 'yesterday', label: 'Yesterday', isDisabled: false, },
      { id: 3, value: 'last_week', label: 'Last 7 Days', isDisabled: false, },
      { id: 4, value: 'last_month', label: 'Last Month', isDisabled: false, },
    ]
  }

  async componentDidMount() {
    let fd = new FormData()
    fd.append('params', JSON.stringify({
      dt_range: this.state.filterRange,
      dt_start: this.state.filterStart,
      dt_ended: this.state.filterEnded,
    }))

    let fetchUrl = ""
    if (this.props.game.data.demo_mode) {
      fetchUrl = `public/games/summary-demo/datetime/?page=${this.state.currentPage}`
    } else {
      fetchUrl = `public/games/summary/datetime/?page=${this.state.currentPage}`
    }

    await API.post(
      fetchUrl, fd, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data',
      },
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          init: true,
          data: res.data.results,
          currentPage: this.state.currentPage,
          totalPages: res.data.total_pages,
          totalItems: res.data.count,
          isFetching: false,
        })
      }
    }).catch(err => {
      this.setState({
        data: [],
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        isFetching: false,
      })
    })
  }

  async submit() {
    let fd = new FormData()
    fd.append('params', JSON.stringify({
      dt_range: this.state.filterDatetime ? "range" : this.state.filterRange,
      dt_start: this.state.filterStart,
      dt_ended: this.state.filterEnded,
    }))

    let fetchUrl = ""
    if (this.props.game.data.demo_mode) {
      fetchUrl = `public/games/summary-demo/datetime/?page=${this.state.currentPage}`
    } else {
      fetchUrl = `public/games/summary/datetime/?page=${this.state.currentPage}`
    }

    await API.post(
      fetchUrl, fd, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data',
      },
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          init: true,
          data: res.data.results,
          currentPage: this.state.currentPage,
          totalPages: res.data.total_pages,
          totalItems: res.data.count,
          isFetching: false,
          selectedItem: null,
          selectedExpand: false,
        })
      }
    }).catch(err => {
      this.setState({
        data: [],
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        isFetching: false,
        selectedItem: null,
        selectedExpand: false,
      })
    })
  }

  handleNextPage() {
    if (this.state.currentPage + 1 <= this.state.totalPages) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      }, () => {
        this.handlePageChange(this.state.currentPage)
      })
    }
  }

  handlePrevPage() {
    if (this.state.currentPage - 1 > 0) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      }, () => {
        this.handlePageChange(this.state.currentPage)
      })
    }
  }

  async handlePageChange(page) {
    let fd = new FormData()
    fd.append('params', JSON.stringify({
      dt_range: this.state.filterRange,
      dt_start: this.state.filterStart,
      dt_ended: this.state.filterEnded,
    }))

    let fetchUrl = ""
    if (this.props.game.data.demo_mode) {
      fetchUrl = `public/games/summary-demo/datetime/?page=${page}`
    } else {
      fetchUrl = `public/games/summary/datetime/?page=${page}`
    }

    await API.post(
      fetchUrl, fd, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data',
      },
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          init: true,
          data: res.data.results,
          currentPage: page,
          totalPages: res.data.total_pages,
          totalItems: res.data.count,
          isFetching: false,
          selectedItem: null,
          selectedExpand: false,
        })
      }
    }).catch(err => {
      this.setState({
        data: [],
        currentPage: page,
        totalPages: 0,
        totalItems: 0,
        isFetching: false,
        selectedItem: null,
        selectedExpand: false,
      })
    })
  }

  getCorrectedRoundName(round) {
    if (round === 'INIT') return 'Preflop'
    return round
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

  getCorrectPosition(item) {
    if (item.player_bb) {
      return (
        <>
          <tr>
            <td className="small font-weight-bold opacity-50 px-4">Position</td>
            <td className="font-weight-bold">
              <Badge pill variant="default font-weight-bold">
                Big Blind
              </Badge>
            </td>
          </tr>

          <tr>
            <td className="small font-weight-bold opacity-50 px-4">Blinds</td>
            <td className="small font-weight-bold">{formatPrice(item.game_table_big_blind)}</td>
          </tr>
        </>
      )
    }
    if (item.player_sb) {
      return (
        <>
          <tr>
            <td className="small font-weight-bold opacity-50 px-4">Position</td>
            <td className="font-weight-bold">
              <Badge pill variant="default font-weight-bold">
                Small Blind
              </Badge>
            </td>
          </tr>

          <tr>
            <td className="small font-weight-bold opacity-50 px-4">Blinds</td>
            <td className="small font-weight-bold">{formatPrice(item.game_table_small_blind)}</td>
          </tr>
        </>
      )
    }
    if (item.player_dl) {
      return (
        <>
          <tr>
            <td className="small font-weight-bold opacity-50 px-4">Position</td>
            <td className="font-weight-bold">
              <Badge pill variant="default font-weight-bold">
                Dealer
              </Badge>
            </td>
          </tr>
        </>
      )
    }
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
      var blob = new Blob([JSON.stringify(this.props.game.history)], { type: "application/json", })
      FileSaver.saveAs(blob, `handhistory-${this.props.game.profile.username}-${moment().valueOf()}.json`)
    }
  }

  downloadHandHistoryItemJSON(item) {
    if (item) {
      var blob = new Blob([JSON.stringify(item)], { type: "application/json", })
      FileSaver.saveAs(blob, `livepokerstudio-hand-history-${item.id}-${this.props.game.profile.username}-${moment().valueOf()}.json`)
    }
  }

  handleChangeStart(startDate) {
    this.setState({
      currentPage: 1,
      selectedItem: null,
      selectedExpand: false,
    }, () => {
      this.handleSetDates({ startDate })
    })
  }

  handleChangeEnded(endDate) {
    this.setState({
      currentPage: 1,
      selectedItem: null,
      selectedExpand: false,
    }, () => {
      this.handleSetDates({ endDate })
    })
  }

  handleSetDates({ startDate = this.state.filterStart, endDate = this.state.filterEnded, }) {
    if (moment(startDate).isAfter(endDate)) {
      endDate = startDate
    }
    this.setState({
      currentPage: 1,
      filterStart: startDate,
      filterEnded: endDate,
    })
  }

  handleRenderSelectedItem() {

    var item = this.state.selectedItem

    return (<>
      <Form.Label
        className="px-2 py-3 d-flex justify-content-between mb-0"
        style={{
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "5px 5px 0px 0px",
        }}>
        <span className="align-self-center font-weight-bold">
          Hand History Details
        </span>
        <span className="align-self-center font-weight-bold cursor-pointer small"
          onClick={() => {
            this.setState({
              selectedItem: null,
            })
          }}>
          Dismiss
        </span>
      </Form.Label>

      <Form.Group className="mb-3">
        <Table
          style={{
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "0px",
            borderTop: "none",
          }}
          className="border-0 mb-0">
          <tbody>
            <tr>
              <td className="small font-weight-bold opacity-50 border-0">Hole Cards</td>
              <td className="border-0">
                {Number(item.player_winner_payout) > 0
                  ? (<>
                    <span className="d-flex align-items-start bg-player-panel-item-opacity-drop">
                      <img
                        src={`${process.env.PUBLIC_URL}/svg/cards/${item.player_hole_cards[0]}.svg`}
                        className="d-block ui-w-30 cursor-pointer mr-1"
                        alt={item.player_hole_cards[0]} />
                      <img
                        src={`${process.env.PUBLIC_URL}/svg/cards/${item.player_hole_cards[1]}.svg`}
                        className="d-block ui-w-30 cursor-pointer mr-0"
                        alt={item.player_hole_cards[1]} />
                    </span>
                  </>)
                  : (<>
                    <span className="d-flex align-items-start">
                      <img
                        src={`${process.env.PUBLIC_URL}/svg/cards/${item.player_hole_cards[0]}.svg`}
                        className="d-block ui-w-30 cursor-pointer mr-1"
                        alt={item.player_hole_cards[0]} />
                      <img
                        src={`${process.env.PUBLIC_URL}/svg/cards/${item.player_hole_cards[1]}.svg`}
                        className="d-block ui-w-30 cursor-pointer mr-0"
                        alt={item.player_hole_cards[1]} />
                    </span>
                  </>)}
              </td>
            </tr>

            {!item.game_community_cards.includes('X') && (
              <tr>
                <td className="small font-weight-bold opacity-50">Community Cards</td>
                <td>
                  <span className="d-flex align-items-start">
                    <img
                      src={`${process.env.PUBLIC_URL}/svg/cards/${item.game_community_cards[0]}.svg`}
                      className="d-block ui-w-30 cursor-pointer mr-1"
                      alt={item.game_community_cards[0]} />
                    <img
                      src={`${process.env.PUBLIC_URL}/svg/cards/${item.game_community_cards[1]}.svg`}
                      className="d-block ui-w-30 cursor-pointer mr-1"
                      alt={item.game_community_cards[1]} />
                    <img
                      src={`${process.env.PUBLIC_URL}/svg/cards/${item.game_community_cards[2]}.svg`}
                      className="d-block ui-w-30 cursor-pointer mr-1"
                      alt={item.game_community_cards[2]} />
                    <img
                      src={`${process.env.PUBLIC_URL}/svg/cards/${item.game_community_cards[3]}.svg`}
                      className="d-block ui-w-30 cursor-pointer mr-1"
                      alt={item.game_community_cards[3]} />
                    <img
                      src={`${process.env.PUBLIC_URL}/svg/cards/${item.game_community_cards[4]}.svg`}
                      className="d-block ui-w-30 cursor-pointer mr-0"
                      alt={item.game_community_cards[4]} />
                  </span>
                </td>
              </tr>
            )}

            <tr>
              <td className="small font-weight-bold opacity-50">History ID</td>
              <td className="small font-weight-bold">
                {item.id}
              </td>
            </tr>

            <tr>
              <td className="small font-weight-bold opacity-50">Datetime</td>
              <td className="small font-weight-bold">
                {moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
              </td>
            </tr>

            <tr>
              <td className="small font-weight-bold opacity-50">Event</td>
              <td className="font-weight-bold">
                <Badge pill variant="default font-weight-bold">
                  {item.player_event || '...'}
                </Badge>
              </td>
            </tr>

            <tr>
              <td className="small font-weight-bold opacity-50">Winner</td>
              <td className="small font-weight-bold">
                {item.player_winner ? "Yes" : "No"}
              </td>
            </tr>

            <tr>
              <td className="small font-weight-bold opacity-50">Best Hand</td>
              <td className="small font-weight-bold">
                {item.player_best_hand
                  ? formatCapitalized(item.player_best_hand.display)
                  : "N/A"}
              </td>
            </tr>

            {this.state.selectedExpand && (
              <>
                {this.getCorrectPosition(item)}

                <tr>
                  <td className="small font-weight-bold opacity-50">Pre-Game Balance</td>
                  <td className="small font-weight-bold">
                    {formatPrice(item.player_balance_pre_game) || '...'}
                  </td>
                </tr>

                <tr>
                  <td className="small font-weight-bold opacity-50">Total Bet</td>
                  <td className="small font-weight-bold">
                    {formatPrice(item.player_total_bet)}
                  </td>
                </tr>

                <tr>
                  <td className="small font-weight-bold opacity-50">Payout</td>
                  <td className="small font-weight-bold">
                    {formatPrice(item.player_winner_payout)}
                  </td>
                </tr>

                {item.player_winner && (
                  <tr>
                    <td className="small font-weight-bold opacity-50">Rake</td>
                    <td className="small font-weight-bold">
                      {formatPrice(item.player_winner_rake)}
                    </td>
                  </tr>
                )}

                {item.player_winner && (
                  <tr>
                    <td className="small font-weight-bold opacity-50">Potname</td>
                    <td className="small font-weight-bold">
                      {this.getCorrectPotName(item.player_winner_pot_name)}
                    </td>
                  </tr>
                )}

                {item.player_winner && (
                  <tr>
                    <td className="small font-weight-bold opacity-50">Potsize</td>
                    <td className="small font-weight-bold">
                      {formatPrice(item.player_winner_pot_size)}
                    </td>
                  </tr>
                )}

                <tr>
                  <td className="small font-weight-bold opacity-50">Total Pot</td>
                  <td className="small font-weight-bold">
                    {formatPrice(item.game_total_pot)}
                  </td>
                </tr>

                <tr>
                  <td className="small font-weight-bold opacity-50">Post-Game Balance</td>
                  <td className="small font-weight-bold">
                    {formatPrice(item.player_balance_post_game) || '...'}
                  </td>
                </tr>

                <tr>
                  <td className="small font-weight-bold opacity-50">Game Started</td>
                  <td className="small font-weight-bold">
                    {moment(item.game_started).format('DD/MM/YYYY HH:mm:ss')}
                  </td>
                </tr>

                <tr>
                  <td className="small font-weight-bold opacity-50">Game Ended</td>
                  <td className="small font-weight-bold">
                    {moment(item.game_ended).format('DD/MM/YYYY HH:mm:ss')} ({formatCapitalized(this.getCorrectedRoundName(item.game_ended_in_round))})
                  </td>
                </tr>

                <tr>
                  <td className="small font-weight-bold opacity-50">Player Seat</td>
                  <td className="small font-weight-bold">{item.player_seat}</td>
                </tr>

                <tr>
                  <td className="small font-weight-bold opacity-50">Player ID</td>
                  <td className="small font-weight-bold">{item.player_id}</td>
                </tr>

                <tr>
                  <td className="small font-weight-bold opacity-50">Dealer ID</td>
                  <td className="small font-weight-bold">{item.game_dealer}</td>
                </tr>

                <tr>
                  <td className="small font-weight-bold opacity-50">Game ID</td>
                  <td className="small font-weight-bold">{item.game_id.substr(-12)}</td>
                </tr>

                <tr>
                  <td className="small font-weight-bold opacity-50">Game Round ID</td>
                  <td className="small font-weight-bold">{item.game_round_id || '...'}</td>
                </tr>
              </>
            )}

          </tbody>
        </Table>

        <div
          className="cursor-pointer"
          style={{
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "0px 0px 5px 5px",
          }}
          onClick={() => {
            this.setState({
              selectedExpand: !this.state.selectedExpand,
            })
          }}>
          <span className="d-flex align-items-center justify-content-center font-weight-bold py-2 small">
            {this.state.selectedExpand
              ? "View Less"
              : "View More"}
          </span>
        </div>

        <Button
          size="sm"
          block variant="widget5"
          className="mt-2 font-weight-bold d-flex align-items-center justify-content-center small"
          style={{ borderRadius: "5px", }}
          onClick={() => { this.downloadHandHistoryItemJSON(item) }}>
          Download Hand History
        </Button>
      </Form.Group>
    </>)
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    const isIE10Mode = document['documentMode'] === 10

    const columns = [{
      text: 'Hole Cards',
      dataField: 'player_hole_cards',
      sort: true,
      classes: 'align-middle font-weight-bold small cursor-pointer',
      formatter: (cell, row) => <span
        className={`${row.player_winner ? "opacity-100" : "opacity-75"} text-body`}
        onClick={() => {
          this.setState({ selectedItem: row })
        }}>
        {Number(row.player_winner_payout) > 0
          ? (<>
            <span className="d-flex align-items-start">
              <img
                src={`${process.env.PUBLIC_URL}/svg/cards/${row.player_hole_cards[0]}.svg`}
                className="d-block ui-w-30 cursor-pointer mr-1"
                alt={row.player_hole_cards[0]} />
              <img
                src={`${process.env.PUBLIC_URL}/svg/cards/${row.player_hole_cards[1]}.svg`}
                className="d-block ui-w-30 cursor-pointer mr-0"
                alt={row.player_hole_cards[1]} />
            </span>
          </>)
          : (<>
            <span className="d-flex align-items-start">
              <img
                src={`${process.env.PUBLIC_URL}/svg/cards/${row.player_hole_cards[0]}.svg`}
                className="d-block ui-w-30 cursor-pointer mr-1"
                alt={row.player_hole_cards[0]} />
              <img
                src={`${process.env.PUBLIC_URL}/svg/cards/${row.player_hole_cards[1]}.svg`}
                className="d-block ui-w-30 cursor-pointer mr-0"
                alt={row.player_hole_cards[1]} />
            </span>
          </>)}
      </span>
    }, {
      text: 'Created',
      dataField: 'created_at',
      sort: false,
      classes: 'align-middle font-weight-bold small cursor-pointer',
      formatter: (cell, row) => <span
        className={`${row.player_winner ? "opacity-100" : "opacity-75"} text-body`}
        onClick={() => {
          this.setState({ selectedItem: row })
        }}>
        <span>
          <div>{moment(row.created_at).format('DD/MM/YYYY')}</div>
          <div>{moment(row.created_at).format('HH:mm:ss')}</div>
        </span>
      </span>
    }, {
      text: 'Total Bet',
      dataField: 'player_total_bet',
      sort: false,
      classes: 'align-middle font-weight-bold cursor-pointer',
      formatter: (cell, row) => <span
        className={`${row.player_winner ? "opacity-100" : "opacity-75"} text-body`}
        onClick={() => {
          this.setState({ selectedItem: row })
        }}>
        <Badge
          pill variant="default"
          className="font-weight-bold cursor-pointer">
          {formatPrice(row.player_total_bet)}
        </Badge>
      </span>
    }, {
      text: 'Payout',
      dataField: 'player_winner_payout',
      sort: false,
      classes: 'align-middle font-weight-bold cursor-pointer',
      formatter: (cell, row) => <span
        className={`${row.player_winner ? "opacity-100" : "opacity-75"} text-body`}
        onClick={() => {
          this.setState({ selectedItem: row })
        }}>
        {Number(row.player_winner_payout) > 0
          ? (<>
            <Badge
              pill variant="success"
              className="font-weight-bold cursor-pointer">
              {formatPrice(row.player_winner_payout)}
            </Badge>
          </>)
          : (<>
            <Badge
              pill variant="default"
              className="font-weight-bold cursor-pointer">
              {formatPrice(row.player_winner_payout)}
            </Badge>
          </>)}
      </span>
    },]

    const defaultSorted = [{
      dataField: 'id',
      order: 'desc',
    }]

    return (
      <>

        {this.state.init
          ? <>
            {/* Hand History Modal */}
            <Modal.Body style={{ margin: "0", }}>
              <h4 className="text-left mb-4 font-weight-bold">
                Hand History
              </h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                Get a comprehensive overview of all the games you have played in this session so far. Please note that all hand reviews are also available for download.
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              {this.props.game.data.demo_mode && this.state.showAnnotation1 && (
                <>
                  <div className="bs4-toast toast show bg-default cursor-pointer mb-3" style={{ maxWidth: "100%", }}
                    onClick={() => {
                      this.setState({
                        showAnnotation1: false,
                      })
                    }}>
                    <div className="toast-header">
                      <i className="fas fa-info-circle mr-3" style={{ fontSize: "1.6rem", }} />
                      <div className="d-block small mr-auto">
                        <div className="mb-0 font-weight-bold" style={{ textTransform: "uppercase", }}>
                          Notification
                        </div>
                        <div className="mb-0 font-weight-medium">
                          Hand histories are now available for demo games.
                        </div>
                      </div>
                      <div className="d-block small">
                        <div className="mb-0 font-weight-bold">Dismiss</div>
                        <div className="small font-weight-bold mb-0"></div>
                      </div>
                    </div>
                  </div>
                  <hr className="border-light m-0 pt-2 pb-2" />
                </>
              )}

              <Form.Label className="mt-0 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                <span style={{ alignSelf: "center", }}>Datetime Filter</span>
              </Form.Label>

              <Form.Group className="mb-3">
                <div>
                  <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    options={this.selectOptions1}
                    defaultValue={this.selectOptions1[0]}
                    onChange={(e) => {
                      this.setState({
                        currentPage: 1,
                        filterRange: e.value,
                      }, () => {
                        this.submit()
                      })
                    }}
                    isClearable={false}
                    isSearchable={true}
                    isDisabled={this.state.filterDatetime} />
                </div>
              </Form.Group>

              <Form.Label className="mt-0 mb-2 d-flex justify-content-between opacity-50 text-tiny">
                <span style={{ alignSelf: "center", }}>Filter Option</span>
              </Form.Label>

              <Form.Group className="mb-3">
                <div>
                  <label className="switcher switcher-sm">
                    <input
                      type="checkbox"
                      className="switcher-input"
                      checked={this.state.filterDatetime}
                      disabled={false}
                      onChange={e => this.setState({
                        currentPage: 1,
                        filterDatetime: e.target.checked,
                        selectedItem: null,
                        selectedExpand: false,
                      })} />
                    <span className="switcher-indicator">
                      <span className="switcher-yes"></span>
                      <span className="switcher-no"></span>
                    </span>
                  </label>
                  <Form.Label className="mb-1">
                    <span>Filter by Datetime Range</span>
                    <Badge pill variant="default" className="ml-1 font-weight-bold bg-player-panel-item-opacity-drop">
                      Option
                    </Badge>
                  </Form.Label>
                </div>
              </Form.Group>

              <hr className="border-light m-0 py-2" />

              {this.state.filterDatetime && (
                <>
                  <Form.Group className="mb-3">
                    <div className="w-100 mb-2">
                      <Row>
                        <Col sm={2} md={2} lg={2} xl={2}>
                          <Form.Label className="mt-0 mb-2 opacity-50 text-tiny mr-3">
                            <span style={{ alignSelf: "center", }}>Start</span>
                          </Form.Label>
                        </Col>
                        <Col sm={10} md={10} lg={10} xl={10}>
                          <div className="w-100">
                            <DatePicker
                              className="form-control"
                              selected={this.state.filterStart}
                              selectsStart
                              startDate={this.state.filterStart}
                              endDate={this.state.filterEnded}
                              onChange={this.handleChangeStart}
                              popperPlacement={this.placement} />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="w-100 mb-2">
                      <Row>
                        <Col sm={2} md={2} lg={2} xl={2}>
                          <Form.Label className="mt-0 mb-2 opacity-50 text-tiny mr-3">
                            <span style={{ alignSelf: "center", }}>End</span>
                          </Form.Label>
                        </Col>
                        <Col sm={10} md={10} lg={10} xl={10}>
                          <div className="w-100">
                            <DatePicker
                              className="form-control"
                              selected={this.state.filterEnded}
                              selectsEnd
                              startDate={this.state.filterStart}
                              endDate={this.state.filterEnded}
                              onChange={this.handleChangeEnded}
                              popperPlacement={this.placement} />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Form.Group>

                  <Button
                    variant="linkedin" block
                    onClick={(e) => {
                      this.setState({
                        currentPage: 1,
                      }, () => {
                        this.submit()
                      })
                    }}
                    className="font-weight-bold mb-3">
                    Filter
                  </Button>

                  <hr className="border-light m-0 py-2" />
                </>
              )}

              <span ref={this.scrollTargetTop1}>
                {!this.state.selectedItem
                  ? <>
                    <span className="d-block tx-panel-opacity-animation-up">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="small font-weight-bold">
                          <p className="mb-0">
                            Page {this.state.currentPage} of {this.state.totalPages}
                          </p>
                        </div>

                        <div className="d-flex align-items-center">
                          <div className="btn-group" role="group">
                            <button
                              disabled={this.state.currentPage === 1 ? true : false}
                              className="btn btn-light btn-sm"
                              onClick={() => { this.handlePageChange(1) }}>
                              <i className="fas fa-fast-backward text-body"></i>
                            </button>
                            <button
                              disabled={this.state.currentPage === 1 ? true : false}
                              className="btn btn-light btn-sm"
                              onClick={() => { this.handlePrevPage() }}>
                              Prev
                            </button>
                            <button
                              disabled={this.state.currentPage === this.state.totalPages ? true : false}
                              className="btn btn-light btn-sm"
                              onClick={() => { this.handleNextPage() }}>
                              Next
                            </button>
                            <button
                              disabled={this.state.currentPage === this.state.totalPages ? true : false}
                              className="btn btn-light btn-sm"
                              onClick={() => { this.handlePageChange(this.state.totalPages) }}>
                              <i className="fas fa-fast-forward text-body"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <hr className="border-light m-0 py-2" />

                      {/* Table Data View */}
                      {this.state.data.length > 0
                        ? (<>
                          {!isIE10Mode &&
                            <Card className="mb-3">
                              <ToolkitProvider
                                keyField="id"
                                data={this.state.data.filter((item) => {
                                  return true
                                })}
                                columns={columns}
                                defaultSorted={defaultSorted}
                                bootstrap4
                                search>
                                {props => (<>
                                  <BootstrapTable
                                    {...props.baseProps}
                                    wrapperClasses="table-responsive react-bs-table-card"
                                    classes="card-table table-striped border-top"
                                    defaultSorted={defaultSorted}
                                    striped={true} hover={true} />
                                </>)}
                              </ToolkitProvider>
                            </Card>
                          }
                        </>)
                        : (<>
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
                          </Card>

                          <div className="text-center text-white opacity-100 mb-3 small font-weight-bold">
                            No history data found...
                          </div>
                        </>)}
                      {/* / Table Data View */}
                    </span>
                  </>
                  : <>
                    {/* Selected Data View */}
                    <span className="d-block tx-panel-opacity-animation-down">
                      <Form.Label
                        className="pl-4 pr-3 py-3 d-flex justify-content-between mb-0 cursor-pointer"
                        style={{
                          color: "#fff",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          borderRadius: "5px 5px 0px 0px",
                        }}
                        onClick={() => {
                          this.setState({
                            selectedItem: null,
                          })
                        }}>
                        <span className="align-self-center font-weight-bold">
                          Hand History Details – ID {truncateString(this.state.selectedItem.id, 1024) || 'Unavailable'}
                        </span>
                        <span
                          className="align-self-end font-weight-bold">
                          <i className="fas fa-times-circle opacity-25" style={{ fontSize: "1.2rem" }} />
                        </span>
                      </Form.Label>

                      <Form.Group className="mb-3">
                        <Table
                          style={{
                            color: "#fff",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            borderRadius: "0px",
                            borderTop: "none",
                          }}
                          className="border-0 mb-0">
                          <tbody>
                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4 border-0">Hole Cards</td>
                              <td className="border-0">
                                {Number(this.state.selectedItem.player_winner_payout) > 0
                                  ? (<>
                                    <span className="d-flex align-items-start bg-player-panel-item-opacity-drop">
                                      <img
                                        src={`${process.env.PUBLIC_URL}/svg/cards/${this.state.selectedItem.player_hole_cards[0]}.svg`}
                                        className="d-block ui-w-40 cursor-pointer mr-1"
                                        alt={this.state.selectedItem.player_hole_cards[0]} />
                                      <img
                                        src={`${process.env.PUBLIC_URL}/svg/cards/${this.state.selectedItem.player_hole_cards[1]}.svg`}
                                        className="d-block ui-w-40 cursor-pointer mr-0"
                                        alt={this.state.selectedItem.player_hole_cards[1]} />
                                    </span>
                                  </>)
                                  : (<>
                                    <span className="d-flex align-items-start">
                                      <img
                                        src={`${process.env.PUBLIC_URL}/svg/cards/${this.state.selectedItem.player_hole_cards[0]}.svg`}
                                        className="d-block ui-w-40 cursor-pointer mr-1"
                                        alt={this.state.selectedItem.player_hole_cards[0]} />
                                      <img
                                        src={`${process.env.PUBLIC_URL}/svg/cards/${this.state.selectedItem.player_hole_cards[1]}.svg`}
                                        className="d-block ui-w-40 cursor-pointer mr-0"
                                        alt={this.state.selectedItem.player_hole_cards[1]} />
                                    </span>
                                  </>)}
                              </td>
                            </tr>

                            {!this.state.selectedItem.game_community_cards.includes('X') && (
                              <tr>
                                <td className="small font-weight-bold opacity-50 px-4">Community Cards</td>
                                <td>
                                  <span className="d-flex align-items-start">
                                    <img
                                      src={`${process.env.PUBLIC_URL}/svg/cards/${this.state.selectedItem.game_community_cards[0]}.svg`}
                                      className="d-block ui-w-30 cursor-pointer mr-1"
                                      alt={this.state.selectedItem.game_community_cards[0]} />
                                    <img
                                      src={`${process.env.PUBLIC_URL}/svg/cards/${this.state.selectedItem.game_community_cards[1]}.svg`}
                                      className="d-block ui-w-30 cursor-pointer mr-1"
                                      alt={this.state.selectedItem.game_community_cards[1]} />
                                    <img
                                      src={`${process.env.PUBLIC_URL}/svg/cards/${this.state.selectedItem.game_community_cards[2]}.svg`}
                                      className="d-block ui-w-30 cursor-pointer mr-1"
                                      alt={this.state.selectedItem.game_community_cards[2]} />
                                    <img
                                      src={`${process.env.PUBLIC_URL}/svg/cards/${this.state.selectedItem.game_community_cards[3]}.svg`}
                                      className="d-block ui-w-30 cursor-pointer mr-1"
                                      alt={this.state.selectedItem.game_community_cards[3]} />
                                    <img
                                      src={`${process.env.PUBLIC_URL}/svg/cards/${this.state.selectedItem.game_community_cards[4]}.svg`}
                                      className="d-block ui-w-30 cursor-pointer mr-0"
                                      alt={this.state.selectedItem.game_community_cards[4]} />
                                  </span>
                                </td>
                              </tr>
                            )}

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Datetime</td>
                              <td className="small font-weight-bold">
                                {moment(this.state.selectedItem.created_at).format('DD/MM/YYYY (HH:mm:ss)')}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Event</td>
                              <td className="font-weight-bold">
                                <Badge pill variant="default font-weight-bold">
                                  {this.state.selectedItem.player_event || '...'}
                                </Badge>
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Assignment</td>
                              <td className="font-weight-bold">
                                <span>
                                  <Badge pill variant="default font-weight-bold">
                                    {truncateUsername(this.state.selectedItem.player_username) || '...'}
                                  </Badge>
                                </span>
                                <span>
                                  <Badge pill variant="default font-weight-bold ml-1">
                                    Seat {this.state.selectedItem.player_seat || '...'}
                                  </Badge>
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Winner</td>
                              <td className="font-weight-bold">
                                {this.state.selectedItem.player_winner
                                  ? <Badge pill variant="success font-weight-bold">Yes</Badge>
                                  : <Badge pill variant="default font-weight-bold">No</Badge>}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Best Hand</td>
                              <td className="small font-weight-bold">
                                {this.state.selectedItem.player_best_hand
                                  ? formatCapitalized(this.state.selectedItem.player_best_hand.display)
                                  : "Unavailable"}
                              </td>
                            </tr>

                            {this.getCorrectPosition(this.state.selectedItem)}

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Pre Balance</td>
                              <td className="small font-weight-bold">
                                {formatPrice(this.state.selectedItem.player_balance_pre_game) || '...'}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Total Bet</td>
                              <td className="small font-weight-bold">
                                {formatPrice(this.state.selectedItem.player_total_bet) || '...'}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Payout</td>
                              <td className="small font-weight-bold">
                                {formatPrice(this.state.selectedItem.player_winner_payout) || '...'}
                              </td>
                            </tr>

                            {this.state.selectedItem.player_winner && (
                              <tr>
                                <td className="small font-weight-bold opacity-50 px-4">Rake</td>
                                <td className="small font-weight-bold">
                                  {formatPrice(this.state.selectedItem.player_winner_rake) || '...'}
                                </td>
                              </tr>
                            )}

                            {this.state.selectedItem.player_winner && (
                              <tr>
                                <td className="small font-weight-bold opacity-50 px-4">Potname</td>
                                <td className="font-weight-bold">
                                  <Badge pill variant="default font-weight-bold">
                                    {this.getCorrectPotName(this.state.selectedItem.player_winner_pot_name) || '...'}
                                  </Badge>
                                </td>
                              </tr>
                            )}

                            {this.state.selectedItem.player_winner && (
                              <tr>
                                <td className="small font-weight-bold opacity-50 px-4">Potsize</td>
                                <td className="small font-weight-bold">
                                  {formatPrice(this.state.selectedItem.player_winner_pot_size) || '...'}
                                </td>
                              </tr>
                            )}

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Total Pot</td>
                              <td className="small font-weight-bold">
                                {formatPrice(this.state.selectedItem.game_total_pot) || '...'}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Post Balance</td>
                              <td className="small font-weight-bold">
                                {formatPrice(this.state.selectedItem.player_balance_post_game) || '...'}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Game Started</td>
                              <td className="small font-weight-bold">
                                {moment(this.state.selectedItem.game_started).format('DD/MM/YYYY (HH:mm:ss)')}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Game Ended</td>
                              <td className="small font-weight-bold">
                                {moment(this.state.selectedItem.game_ended).format('DD/MM/YYYY (HH:mm:ss)')}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Ended in Round</td>
                              <td className="small font-weight-bold">
                                {formatCapitalized(this.getCorrectedRoundName(this.state.selectedItem.game_ended_in_round)) || '...'}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Player ID</td>
                              <td className="small font-weight-bold">
                                {this.state.selectedItem.player_id.substr(-12) || '...'}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Dealer ID</td>
                              <td className="small font-weight-bold">
                                {this.state.selectedItem.game_dealer || '...'}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Game ID</td>
                              <td className="small font-weight-bold">
                                {this.state.selectedItem.game_id.substr(-12) || '...'}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Round ID</td>
                              <td className="small font-weight-bold">
                                {this.state.selectedItem.game_round_id.substr(-12) || '...'}
                              </td>
                            </tr>
                          </tbody>
                        </Table>

                        <div
                          className="cursor-pointer"
                          style={{
                            color: "#fff",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            borderRadius: "0px 0px 5px 5px",
                          }}
                          onClick={() => {
                            this.downloadHandHistoryItemJSON(this.state.selectedItem)
                          }}>
                          <span className="d-flex align-items-center justify-content-center font-weight-bold py-2 small">
                            Download Details
                          </span>
                        </div>
                      </Form.Group>
                    </span>
                    {/* / Selected Data View */}
                  </>}
              </span>

              <hr className="border-light m-0 py-2 mt-4" />

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
          </>
          : <>
            {/* Hand History Modal */}
            <Modal.Body style={{ margin: "0", }}>
              <h4 className="text-left mb-4 font-weight-bold">
                Hand History
              </h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                Get a comprehensive overview of all the games you have played in this session so far. Please note that all hand reviews are also available for download.
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

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
              </Card>

              <div className={`text-center text-white opacity-100 mb-3 small font-weight-bold`}>
                History data currently not available...
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
            {/* / Hand History Modal */}
          </>}

      </>
    )
  }
}

export default HandHistory
