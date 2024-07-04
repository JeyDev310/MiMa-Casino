import React, { Component } from 'react'
import { Badge, Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { faUserAgent } from 'fontawesome-user-agent'

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

class Transactions extends Component {

  constructor(props) {
    super(props)

    this.scrollTargetTop1 = React.createRef()

    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePrevPage = this.handlePrevPage.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleSetDates = this.handleSetDates.bind(this)
    this.handleChangeStart = this.handleChangeStart.bind(this)
    this.handleChangeEnded = this.handleChangeEnded.bind(this)
    this.handleDownloadPageItems = this.handleDownloadPageItems.bind(this)
    this.handleDownloadSelectedItem = this.handleDownloadSelectedItem.bind(this)

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
      filterStart: new Date(),
      filterEnded: new Date(),
      selectedItem: null,
      selectedExpand: false,
      showAnnotation: true,
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

    await API.post(
      `public/games/tx/datetime/?page=${this.state.currentPage}`, fd, {
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

    await API.post(
      `public/games/tx/datetime/?page=${this.state.currentPage}`, fd, {
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

    await API.post(
      `public/games/tx/datetime/?page=${page}`, fd, {
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

  getCorrectEventName(name) {
    switch (name) {
      case 'buy-in':
        return 'Buy-In'
      case 're-buy':
        return 'Re-Buy'
      case 'payout':
        return 'Payout'
      default:
        return formatCapitalized(name)
    }
  }

  handleDownloadPageItems() {
    if (this.state.data > 0) {
      var blob = new Blob([JSON.stringify(this.state.data)], { type: "application/json", })
      FileSaver.saveAs(blob, `livepokerstudio-tx-p${this.state.currentPage}-${this.props.game.profile.username}-${moment().valueOf()}.json`)
    }
  }

  handleDownloadSelectedItem(item) {
    if (item) {
      var blob = new Blob([JSON.stringify(item)], { type: "application/json", })
      FileSaver.saveAs(blob, `livepokerstudio-tx-${item.id}-${this.props.game.profile.username}-${moment().valueOf()}.json`)
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

  prevent(e) {
    e.preventDefault()
  }

  render() {
    const isIE10Mode = document['documentMode'] === 10

    const columns = [{
      text: 'Event',
      dataField: 'event_name',
      sort: false,
      classes: 'pl-3 align-middle font-weight-bold cursor-pointer',
      formatter: (cell, row) => <span
        className="opacity-100 text-body"
        style={{ fontSize: "1rem", }}
        onClick={() => { this.setState({ selectedItem: row }) }}>
        <Badge
          pill variant="default"
          className="font-weight-bold cursor-pointer">
          {this.getCorrectEventName(row.event_name)}
        </Badge>
      </span>
    }, {
      text: 'Created',
      dataField: 'created_at',
      sort: false,
      classes: 'align-middle font-weight-bold small cursor-pointer',
      formatter: (cell, row) => <span
        className="opacity-100 text-body"
        onClick={() => { this.setState({ selectedItem: row }) }}>
        {moment(row.created_at).format('DD/MM/YYYY HH:mm:ss')}
      </span>
    }, {
      text: 'Amount',
      dataField: 'amount',
      sort: false,
      classes: 'align-middle font-weight-bold cursor-pointer',
      formatter: (cell, row) => <span
        className="opacity-100 text-body"
        onClick={() => { this.setState({ selectedItem: row }) }}>
        <Badge
          pill variant="default"
          className="font-weight-bold cursor-pointer">
          {formatPrice(row.amount)}
        </Badge>
      </span>
    }, {
      text: 'Status',
      dataField: 'status',
      sort: false,
      classes: 'pr-2 align-middle font-weight-bold cursor-pointer',
      formatter: (cell, row) => <span
        className="opacity-100 text-body d-flex align-items-center justify-content-center text-center"
        style={{ fontSize: "1.1rem", }}
        onClick={() => { this.setState({ selectedItem: row }) }}>
        {row.status === 'authorized'
          ? <i className="fas fa-check-circle" />
          : <i className="fas fa-times-circle text-danger" />}
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
            {/* Transactions Modal */}
            <Modal.Body style={{ margin: "0", }}>
              <h4 className="text-left mb-4 font-weight-bold">
                Transactions
              </h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                Get a comprehensive overview of all the in-game transactions you've made on Live Poker Studio™ so far. Please note that all transaction details are also available for download.
              </div>

              <hr className="border-light m-0 pt-2 pb-2" />

              {this.props.game.data.demo_mode && this.state.showAnnotation && (
                <>
                  <div className="bs4-toast toast show bg-default cursor-pointer mb-3" style={{ maxWidth: "100%", }}
                    onClick={() => {
                      this.setState({
                        showAnnotation: false,
                      })
                    }}>
                    <div className="toast-header">
                      <i className="fas fa-info-circle mr-3" style={{ fontSize: "1.6rem", }} />
                      <div className="d-block small mr-auto">
                        <div className="mb-0 font-weight-bold" style={{ textTransform: "uppercase", }}>
                          Notification
                        </div>
                        <div className="mb-0 font-weight-medium">
                          No transactions are processed in demo games.
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
                            No transactions found...
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
                          Transaction Details - {truncateString(formatCapitalized(this.state.selectedItem.event_name), 1024) || 'N/A'}
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
                              <td className="small font-weight-bold opacity-50 px-4">User ID</td>
                              <td className="small font-weight-bold">{this.state.selectedItem.user.id}</td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Username</td>
                              <td className="font-weight-bold">
                                <Badge pill variant="default font-weight-bold">{truncateUsername(this.state.selectedItem.user.username)}</Badge>
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">UUID</td>
                              <td className="small font-weight-bold">{this.state.selectedItem.uid.substr(-12)}</td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Created</td>
                              <td className="small font-weight-bold">{moment(this.state.selectedItem.created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Updated</td>
                              <td className="small font-weight-bold">{moment(this.state.selectedItem.updated_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Provider</td>
                              <td className="font-weight-bold">
                                <Badge pill variant="default font-weight-bold">
                                  {this.state.selectedItem.provider === 'everymatrix'
                                    ? 'EveryMatrix'
                                    : this.state.selectedItem.provider.toUpperCase() || '...'}
                                </Badge>
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Event UID</td>
                              <td className="small font-weight-bold">{truncateString(this.state.selectedItem.event_uuid.substr(-12), 1024) || '...'}</td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Event Name</td>
                              <td className="small font-weight-bold">{this.getCorrectEventName(this.state.selectedItem.event_name) || '...'}</td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Game UID</td>
                              <td className="small font-weight-bold">{truncateString(this.state.selectedItem.game_id.substr(-12), 1024) || '...'}</td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Status</td>
                              <td className="font-weight-bold">
                                {this.state.selectedItem.status === 'authorized'
                                  ? (
                                    <Badge pill variant="success font-weight-bold">
                                      {formatCapitalized(this.state.selectedItem.status)}
                                    </Badge>
                                  )
                                  : (
                                    <Badge pill variant="warning font-weight-bold">
                                      {formatCapitalized(this.state.selectedItem.status)}
                                    </Badge>
                                  )}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Currency</td>
                              <td className="font-weight-bold">
                                <Badge pill variant="default font-weight-bold">{this.state.selectedItem.currency.toUpperCase()}</Badge>
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Amount</td>
                              <td className="small font-weight-bold">
                                {formatPrice(this.state.selectedItem.amount)}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">IP Address</td>
                              <td className="font-weight-bold">
                                <Badge pill variant="default font-weight-bold">{this.state.selectedItem.ip_address}</Badge>
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">Geolocation</td>
                              <td className="small font-weight-bold">
                                {truncateString(this.state.selectedItem.geolocation, 64) || '...'}
                              </td>
                            </tr>

                            <tr>
                              <td className="small font-weight-bold opacity-50 px-4">User Agent</td>
                              <td className="small font-weight-bold">
                                <div className="d-flex align-items-center justify-content-start text-left text-white opacity-25 mb-0">
                                  <span className="d-flex align-items-center text-body font-weight-bold cursor-pointer" style={{ fontSize: "1.5em", }}>
                                    <div
                                      className="text-left opacity-75 mr-2"
                                      dangerouslySetInnerHTML={{
                                        __html: faUserAgent(this.state.selectedItem.user_agent).browser.html,
                                      }} />
                                  </span>

                                  <span className="d-flex align-items-center text-body font-weight-bold cursor-pointer" style={{ fontSize: "1.5em", }}>
                                    <div
                                      className="text-left opacity-75 mr-2"
                                      dangerouslySetInnerHTML={{
                                        __html: faUserAgent(this.state.selectedItem.user_agent).os.html,
                                      }} />
                                  </span>

                                  <span className="d-flex align-items-center text-body font-weight-bold cursor-pointer" style={{ fontSize: "1.5em", }}>
                                    <div
                                      className="text-left opacity-75"
                                      dangerouslySetInnerHTML={{
                                        __html: faUserAgent(this.state.selectedItem.user_agent).platform.html,
                                      }} />
                                  </span>
                                </div>
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
                            this.handleDownloadSelectedItem(this.state.selectedItem)
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

              <hr className="border-light m-0 py-2" />

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
            {/* / Transactions Modal */}
          </>
          : <>
            {/* Transactions Modal */}
            <Modal.Body style={{ margin: "0", }}>
              <h4 className="text-left mb-4 font-weight-bold">
                Transactions
              </h4>

              <div className="text-left text-left text-white opacity-50 small mb-3">
                Get a comprehensive overview of all the in-game transactions you've made on Live Poker Studio™ so far. Please note that all transaction details are also available for download.
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
                Transaction data currently not available...
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
            {/* / Transactions Modal */}
          </>}

      </>
    )
  }
}

export default Transactions