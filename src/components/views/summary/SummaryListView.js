import React, { Component } from 'react'
import { Badge, Button, Card, Col, Dropdown, Form, Modal, Row, SplitButton, Table } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import moment from 'moment'
import FileSaver from 'file-saver'
import * as numeral from 'numeral'

import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator'
import filterFactory from 'react-bootstrap-table2-filter'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../store/actions'

import TransactionalSlider from '../utilities/TransactionalSlider'
import ResourceLoaderB from '../utilities/loaders/ResourceLoaderB'

import {
  REQ_SUMMARY_QS_ALL,
} from '../../../store/objects/actionTypes'

import {
  formatCapitalized,
  formatPrice,
  truncateUsername,
} from '../live/utilities/TextPreprocessing'

import '../assets/css/views.css'
import '../../../vendor/libs/react-toastify/react-toastify.scss'
import '../../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss'

const CloseButton = ({ closeToast }) => (
  <button className="Toastify__close-button" type="button" aria-label="close"
    onClick={closeToast}>&times;</button>
)

class SummaryListView extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Game History')

    this.onCreatedFilterValueChange = this.onCreatedFilterValueChange.bind(this)
    this.onRefreshSummary = this.onRefreshSummary.bind(this)
    this.onSearchSummary = this.onSearchSummary.bind(this)
    this.onDownloadSingleSummary = this.onDownloadSingleSummary.bind(this)
    this.onDownloadCompleteSummary = this.onDownloadCompleteSummary.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.onDefaultModalClose = this.onDefaultModalClose.bind(this)

    this.handlePrevPage = this.handlePrevPage.bind(this)
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)

    this.state = {
      init: false,
      username: null,
      search_params: '',
      filterPriority: 'Any',
      filterStatus: 'Any',
      filterCreatedDate: [null, null],
      defaultModalShow: false,
      select: null,
      data: [],
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
    }
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
      })
      this.props.objectsRequestHandler(
        REQ_SUMMARY_QS_ALL, {
        id: JSON.parse(localStorage.getItem('user')).id,
        page: 1,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
            data: this.props.summary.results,
            currentPage: 1,
            totalPages: this.props.summary.total_pages,
            totalItems: this.props.summary.count,
          })
        })
    } else {
      this.props.history.push('/')
    }
  }

  onRefreshSummary() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
      })
      this.props.objectsRequestHandler(REQ_SUMMARY_QS_ALL, {
        id: JSON.parse(localStorage.getItem('user')).id,
        page: this.state.currentPage,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
            data: this.props.summary.results,
            currentPage: this.state.currentPage,
            totalPages: this.props.summary.total_pages,
            totalItems: this.props.summary.count,
          }, () => {
            this.showToastify(<>
              <div className="cursor-pointer p-0 m-0 small">
                <h6>
                  Live Poker Studio™ Game History
                </h6>
                <p className="mb-0">
                  Game History has been updated successfully.
                </p>
              </div>
            </>, 'info')
          })
        })
    } else {
      this.props.history.push('/')
    }
  }

  onSearchSummary() {
    if (this.props.summary) {
      if (this.props.summary.results.length > 0) {
        var filter = "player_id"
        var keyword = this.state.search_params
        var filteredData = this.props.summary.results.filter(function (obj) {
          return obj[filter].toLowerCase().includes(keyword.toLowerCase())
        })
        this.setState({
          init: true,
          data: filteredData,
        })
      }
    }
  }

  onHandleSearchBarKeyPress(e) {
    if (e.key === 'Enter') {
      this.onSearchSummary()
    }
  }

  onDownloadSingleSummary() {
    if (this.state.select) {
      var blob = new Blob([JSON.stringify(this.state.select)], { type: "application/json" })
      FileSaver.saveAs(blob, `history-${this.state.select.id}-${this.state.username}-${moment().valueOf()}.json`)
    }
  }

  onDownloadCompleteSummary() {
    if (this.props.summary.results.length > 0) {
      var blob = new Blob([JSON.stringify(this.props.summary.results)], { type: "application/json", })
      FileSaver.saveAs(blob, `history-full-${this.state.username}-${moment().valueOf()}.json`)
    }
  }

  onDefaultModalClose() {
    this.setState({
      defaultModalShow: false,
    })
  }

  onCreatedFilterValueChange(dates) {
    const filterCreatedDate = []
    filterCreatedDate[0] = dates && dates[0] ? moment(dates[0]).format('MM/DD/YYYY') : null
    filterCreatedDate[1] = dates && dates[1] ? moment(dates[1]).format('MM/DD/YYYY') : null
    this.setState({ filterCreatedDate })
  }

  priorityDropdownVariant(priority) {
    let variant
    if (priority === 1) variant = 'danger'
    if (priority === 2) variant = 'success'
    if (priority === 3) variant = 'warning'
    return `${variant} btn-xs md-btn-flat`
  }

  onValueChange(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }

  handleNextPage = ({
    page,
    onPageChange
  }) => () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
    }, () => {
      onPageChange(this.state.currentPage)
    })
  }

  handlePrevPage = ({
    page,
    onPageChange
  }) => () => {
    this.setState({
      currentPage: this.state.currentPage - 1,
    }, () => {
      onPageChange(this.state.currentPage)
    })
  }

  handlePageChange(page) {
    this.props.objectsRequestHandler(
      REQ_SUMMARY_QS_ALL, {
      page: page,
    }, this.props.history)
      .then(() => {
        this.setState({
          init: true,
          data: this.props.summary.results,
          currentPage: page,
          totalPages: this.props.summary.total_pages,
          totalItems: this.props.summary.count,
        })
      })
  }

  formatPrice(p) {
    return numeral(p).format('$0,0.00')
  }

  truncateString(str, num) {
    try {
      if (str.length > num) {
        return str.slice(0, num) + "..."
      } else {
        return str
      }
    } catch {
      return "N/A"
    }
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
            <td className="small font-weight-bold">Big Blind</td>
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
            <td className="small font-weight-bold">Small Blind</td>
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
            <td className="small font-weight-bold">Dealer</td>
          </tr>
        </>
      )
    }
  }

  handleDownloadSelectedItem() {
    var item = this.state.select
    if (item) {
      var blob = new Blob([JSON.stringify(item)], { type: "application/json", })
      FileSaver.saveAs(blob, `livepokerstudio-hand-history-${item.id}-${item.player_username}-${moment().valueOf()}.json`)
    }
  }

  handleRenderSelectedItem() {

    var item = this.state.select

    if (item) {
      return (<>
        <Form.Label
          className="px-4 py-3 d-flex justify-content-between mb-0"
          style={{
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "5px 5px 0px 0px",
          }}>
          <span className="align-self-center font-weight-bold">
            Hand History Details
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
                <td className="small font-weight-bold opacity-50 border-0 px-4">Hole Cards</td>
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
                  <td className="small font-weight-bold opacity-50 px-4">Community Cards</td>
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
                <td className="small font-weight-bold opacity-50 px-4">Username</td>
                <td className="small font-weight-bold">{truncateUsername(item.player_username)}</td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">History ID</td>
                <td className="small font-weight-bold">{item.id}</td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Datetime</td>
                <td className="small font-weight-bold">{moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Event</td>
                <td className="font-weight-bold">
                  <Badge pill variant="default font-weight-bold">
                    {item.player_event || '...'}
                  </Badge>
                </td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Winner</td>
                <td className="font-weight-bold">
                  {item.player_winner
                    ? (<Badge pill variant="success font-weight-bold">Yes</Badge>)
                    : (<Badge pill variant="primary font-weight-bold">No</Badge>)}
                </td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Best Hand</td>
                <td className="small font-weight-bold">
                  {item.player_best_hand
                    ? formatCapitalized(item.player_best_hand.display)
                    : "N/A"}
                </td>
              </tr>

              {this.getCorrectPosition(item)}

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Pre-Game Balance</td>
                <td className="small font-weight-bold">
                  {formatPrice(item.player_balance_pre_game) || '...'}
                </td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Total Bet</td>
                <td className="small font-weight-bold">
                  {formatPrice(item.player_total_bet) || '...'}
                </td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Payout</td>
                <td className="small font-weight-bold">
                  {formatPrice(item.player_winner_payout) || '...'}
                </td>
              </tr>

              {item.player_winner && (
                <tr>
                  <td className="small font-weight-bold opacity-50 px-4">Rake</td>
                  <td className="small font-weight-bold">
                    {formatPrice(item.player_winner_rake) || '...'}
                  </td>
                </tr>
              )}

              {item.player_winner && (
                <tr>
                  <td className="small font-weight-bold opacity-50 px-4">Potname</td>
                  <td className="font-weight-bold">
                    <Badge pill variant="default font-weight-bold">
                      {this.getCorrectPotName(item.player_winner_pot_name) || '...'}
                    </Badge>
                  </td>
                </tr>
              )}

              {item.player_winner && (
                <tr>
                  <td className="small font-weight-bold opacity-50 px-4">Potsize</td>
                  <td className="small font-weight-bold">
                    {formatPrice(item.player_winner_pot_size) || '...'}
                  </td>
                </tr>
              )}

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Total Pot</td>
                <td className="small font-weight-bold">
                  {formatPrice(item.game_total_pot) || '...'}
                </td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Post-Game Balance</td>
                <td className="small font-weight-bold">
                  {formatPrice(item.player_balance_post_game) || '...'}
                </td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Game Started</td>
                <td className="small font-weight-bold">
                  {moment(item.game_started).format('DD/MM/YYYY HH:mm:ss')}
                </td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Game Ended</td>
                <td className="small font-weight-bold">
                  {moment(item.game_ended).format('DD/MM/YYYY HH:mm:ss')} ({formatCapitalized(this.getCorrectedRoundName(item.game_ended_in_round))})
                </td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Player Seat</td>
                <td className="small font-weight-bold">{item.player_seat || '...'}</td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Player ID</td>
                <td className="small font-weight-bold">{item.player_id || '...'}</td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Dealer ID</td>
                <td className="small font-weight-bold">{item.game_dealer || '...'}</td>
              </tr>

              <tr>
                <td className="small font-weight-bold opacity-50 px-4">Game Round ID</td>
                <td className="small font-weight-bold">{item.game_round_id || '...'}</td>
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
              this.handleDownloadSelectedItem(item)
            }}>
            <span className="d-flex align-items-center justify-content-center font-weight-bold py-2 small">
              Download Hand History
            </span>
          </div>
        </Form.Group>
      </>)
    } else {
      return null
    }
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

  prevent(e) {
    e.preventDefault()
  }

  render() {
    const isIE10Mode = document['documentMode'] === 10

    const columns = [{
      text: 'ID',
      dataField: 'id',
      sort: true,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 font-weight-bold',
      formatter: (cell, row, index) => (
        <span className="cursor-pointer" onClick={() => this.setState({
          defaultModalShow: true,
          select: row,
        })}>
          {row.id}
        </span>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }, {
      text: 'Hole Cards',
      dataField: 'player_hole_cards',
      sort: false,
      classes: 'align-middle font-weight-bold cursor-pointer',
      formatter: (cell, row) => <span
        className="text-body">
        <span className="d-flex align-items-start justify-content-start cursor-pointer" onClick={() => this.setState({
          defaultModalShow: true,
          select: row,
        })}>
          <img
            src={`${process.env.PUBLIC_URL}/svg/cards/${row.player_hole_cards[0]}.svg`}
            className="d-block ui-w-30 cursor-pointer mr-1"
            alt={row.player_hole_cards[0]} />
          <img
            src={`${process.env.PUBLIC_URL}/svg/cards/${row.player_hole_cards[1]}.svg`}
            className="d-block ui-w-30 cursor-pointer mr-0"
            alt={row.player_hole_cards[1]} />
        </span>
      </span>
    }, {
      text: 'Player Username',
      dataField: 'player_username',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 font-weight-bold h5 mb-0',
      formatter: (cell, row) => (
        <span className="cursor-pointer" onClick={() => this.setState({
          defaultModalShow: true,
          select: row,
        })}>
          <Badge pill variant="default font-weight-bold">
            {row.player_username}
          </Badge>
        </span>
      ),
    }, {
      text: 'Event',
      dataField: 'player_event',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 font-weight-bold h5 mb-0',
      formatter: (cell, row) => (
        <span className="cursor-pointer" onClick={() => this.setState({
          defaultModalShow: true,
          select: row,
        })}>
          <Badge pill variant="default font-weight-bold">
            {row.player_event}
          </Badge>
        </span>
      ),
    }, {
      text: 'Timestamp',
      dataField: 'updated_at',
      sort: true,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 small font-weight-bold h5 mb-0',
      formatter: (cell, row) => (
        <span className="cursor-pointer" onClick={() => this.setState({
          defaultModalShow: true,
          select: row,
        })}>
          {moment(row.updated_at).format("DD/MM/YYYY (HH:mm:ss)")}
        </span>
      ),
    }, {
      text: 'Total Bet',
      dataField: 'player_total_bet',
      sort: true,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 small font-weight-bold',
      formatter: (cell, row) => (
        <span className="cursor-pointer h5 mb-0" onClick={() => this.setState({
          defaultModalShow: true,
          select: row,
        })}>
          <Badge pill variant="default" className="font-weight-bold">
            {this.formatPrice(row.player_total_bet)}
          </Badge>
        </span>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }, {
      text: 'Payout',
      dataField: 'player_winner_payout',
      sort: true,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 small font-weight-bold',
      formatter: (cell, row) => (
        <span className="cursor-pointer h5 mb-0" onClick={() => this.setState({
          defaultModalShow: true,
          select: row,
        })}>
          <Badge pill variant="default" className="font-weight-bold">
            {this.formatPrice(row.player_winner_payout)}
          </Badge>
        </span>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }, {
      text: 'Rake',
      dataField: 'player_winner_rake',
      sort: true,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 small font-weight-bold',
      formatter: (cell, row) => (
        <span className="cursor-pointer" onClick={() => this.setState({
          defaultModalShow: true,
          select: row,
        })}>
          {this.formatPrice(row.player_winner_rake)}
        </span>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }, {
      text: 'Pot Size',
      dataField: 'player_winner_pot_size',
      sort: true,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 small font-weight-bold',
      formatter: (cell, row) => (
        <span className="cursor-pointer" onClick={() => this.setState({
          defaultModalShow: true,
          select: row,
        })}>
          {this.formatPrice(row.player_winner_pot_size)}
        </span>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }, {
      text: 'Dealer',
      dataField: 'game_dealer',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 font-weight-bold h5 mb-0',
      formatter: (cell, row) => (
        <span className="cursor-pointer" onClick={() => this.setState({
          defaultModalShow: true,
          select: row,
        })}>
          <Badge pill variant="default" className="font-weight-bold">
            {row.game_dealer}
          </Badge>
        </span>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }]

    const paginationOptions = {
      custom: true,
      totalSize: this.props.summary ? this.props.summary.count : 0,
      onPageChange: this.handlePageChange,
      sizePerPage: 15,
    }

    const defaultSorted = [{
      dataField: 'updated_at',
      order: 'desc',
    }]

    return (
      <div>
        <TransactionalSlider
          {...this.state} {...this.props} />

        <h5 className="font-weight-bold py-2 mb-2 d-flex justify-content-between align-items-center">
          <span>Game History</span>
          <Badge pill variant="danger" className="text-small font-weight-bold ml-2">Beta</Badge>
          <Button variant="default" size="md" className="ml-auto" onClick={this.onRefreshSummary}>
            <i className="ion ion-md-refresh text-danger mr-2"></i>
            Refresh
          </Button>
        </h5>

        <SplitButton
          variant="default"
          className="font-weight-bold mb-4"
          onClick={() => {
            this.onDownloadCompleteSummary()
          }}
          title={<>
            <span className="ion ion-md-cloud-download text-danger"></span>
            <span className="ml-2">Download Game History</span>
          </>}
          alignRight={false} >
          <Dropdown.Item
            onClick={() => {
              this.onDownloadCompleteSummary()
            }}>
            <i className="fab fa-js-square text-danger"></i>
            <span className="ml-2">Download as .json</span>
          </Dropdown.Item>
        </SplitButton>

        {this.props.summary
          ? <>
            {!isIE10Mode &&
              <Card className="mb-4">
                <PaginationProvider
                  pagination={paginationFactory(paginationOptions)}>
                  {
                    ({
                      paginationProps,
                      paginationTableProps,
                    }) => (
                      <div>
                        <ToolkitProvider
                          keyField="id"
                          data={this.state.data}
                          columns={columns}
                          defaultSorted={defaultSorted}
                          bootstrap4
                          search>
                          {props => (<>
                            <BootstrapTable
                              {...props.baseProps}
                              {...paginationTableProps}
                              wrapperClasses="table-responsive react-bs-table-card"
                              classes="card-table table-striped border-top"
                              defaultSorted={defaultSorted}
                              striped={true} hover={true}
                              filter={filterFactory()}
                              pagination={paginationFactory(paginationOptions)}
                            />
                          </>)}
                        </ToolkitProvider>

                        <div className="d-flex align-items-center justify-content-between p-4">
                          <div className="small font-weight-bold">
                            <p className="mb-0">
                              {this.props.summary.count} Items
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="small mr-4 font-weight-bold">
                              <p className="mb-0">
                                Page {this.state.currentPage} of {this.state.totalPages}
                              </p>
                            </div>
                            <div className="btn-group" role="group">
                              <button
                                disabled={this.state.currentPage === 1 ? true : false}
                                className="btn btn-light"
                                onClick={() => { this.handlePageChange(1) }}>
                                <i className="fas fa-fast-backward text-body"></i>
                              </button>
                              <button
                                disabled={this.state.currentPage === 1 ? true : false}
                                className="btn btn-light"
                                onClick={this.handlePrevPage(paginationProps)}>
                                Prev
                              </button>
                              <button
                                disabled={this.state.currentPage === this.state.totalPages ? true : false}
                                className="btn btn-light"
                                onClick={this.handleNextPage(paginationProps)}>
                                Next
                              </button>
                              <button
                                disabled={this.state.currentPage === this.state.totalPages ? true : false}
                                className="btn btn-light"
                                onClick={() => { this.handlePageChange(this.state.totalPages) }}>
                                <i className="fas fa-fast-forward text-body"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </PaginationProvider>
              </Card>
            }
          </>
          : <>
            <Card className="bg-light p-5 mb-4" style={{ borderRadius: "15px", }}>
              <Card className="d-flex bg-transparent w-100 mb-4 border-0 shadow-none">
                <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                  <Col sm={12} md={12} lg={12} className="d-flex align-items-center border-0 shadow-none" style={{ justifyContent: "center", }}>
                    <ResourceLoaderB
                      height="4rem" width="4rem" />
                  </Col>
                </Row>
              </Card>
              <div className={`text-center text-white opacity-100 mb-0`}>Game history data currently not available...</div>
              <h6 className="text-center text-lighter text-muted text-tiny mt-4 mb-0">
                All user activities, such as played sessions, deposit and payout transactions, user logins, are logged and can be <br />
                viewed under "Activity Log". The user also has the option of downloading an entire report on his previous user activity.
              </h6>
            </Card>
          </>}

        <h6 className="text-left text-lighter text-muted text-tiny mb-4">
          All user activities, such as played sessions, deposit and payout transactions, user logins, are logged and can be <br />
          viewed under "Activity Log". The user also has the option of downloading an entire report on his previous user activity.
        </h6>

        <ToastContainer
          autoClose={false ? false : + '1500'}
          newestOnTop={false}
          closeButton={<CloseButton />}
          rtl={false} />

        <Modal
          className="modal-slide"
          show={this.state.defaultModalShow}
          onHide={this.onDefaultModalClose}>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.onDefaultModalClose}>
            &times;
          </button>

          <Modal.Body>
            <span>
              {this.handleRenderSelectedItem()}
            </span>

            <hr className="border-light m-0 py-2" />

            <Button
              variant="linkedin" block
              onClick={this.onDefaultModalClose}>
              Continue
            </Button>
          </Modal.Body>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  summary: state.objects.summary.items,
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(SummaryListView))