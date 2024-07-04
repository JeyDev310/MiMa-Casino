import React, { Component } from 'react'
import { Badge, Button, Card, Col, Dropdown, Form, InputGroup, Row, SplitButton } from 'react-bootstrap'
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

import {
  REQ_PROFILE_REQUESTS_GET,
} from '../../../store/objects/actionTypes'

import '../assets/css/views.css'
import '../../../vendor/libs/react-toastify/react-toastify.scss'
import '../../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss'

const CloseButton = ({ closeToast }) => (
  <button className="Toastify__close-button" type="button" aria-label="close"
    onClick={closeToast}>&times;</button>
)

class APIRequestLogView extends Component {

  constructor(props) {
    super(props)
    props.setTitle('API Request Log')

    this.onCreatedFilterValueChange = this.onCreatedFilterValueChange.bind(this)
    this.onRefreshActivityLog = this.onRefreshActivityLog.bind(this)
    this.onSearchActivityLog = this.onSearchActivityLog.bind(this)
    this.onHandleDownloadItems = this.onHandleDownloadItems.bind(this)
    this.onValueChange = this.onValueChange.bind(this)

    this.handlePrevPage = this.handlePrevPage.bind(this)
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)

    this.state = {
      init: false,
      data: [],
      username: null,
      search_params: '',
      filterPriority: 'Any',
      filterStatus: 'Any',
      filterCreatedDate: [null, null],
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
        REQ_PROFILE_REQUESTS_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
        page: 1,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
            data: this.props.requests.results,
            currentPage: 1,
            totalPages: this.props.requests.total_pages,
            totalItems: this.props.requests.count,
          })
        })
    } else {
      this.props.history.push('/')
    }
  }

  onRefreshActivityLog() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
      })
      this.props.objectsRequestHandler(
        REQ_PROFILE_REQUESTS_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
        page: this.state.currentPage,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
            data: this.props.requests.results,
            currentPage: this.state.currentPage,
            totalPages: this.props.requests.total_pages,
            totalItems: this.props.requests.count,
          }, () => {
            this.showToastify(<>
              <div className="cursor-pointer p-0 m-0 small">
                <h6>
                  Live Poker Studio™ Request Log
                </h6>
                <p className="mb-0">
                  Request Log has been updated successfully.
                </p>
              </div>
            </>, 'info')
          })
        })
    }
  }

  onHandleDownloadItems() {
    if (this.props.requests.results.length > 0) {
      var blob = new Blob([JSON.stringify(this.props.requests.results)], { type: "application/json", })
      FileSaver.saveAs(blob, `requests-page-${this.state.currentPage}-core-${moment().valueOf()}.json`)
    }
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

  onSearchActivityLog() {
    if (this.props.requests) {
      var filter = "remote_addr"
      var keyword = this.state.search_params
      var filteredData = this.props.requests.results.filter(function (obj) {
        return obj[filter].toLowerCase().includes(keyword.toLowerCase())
      })
      this.setState({
        init: true,
        data: filteredData,
      })
    }
  }

  onHandleSearchBarKeyPress(e) {
    if (e.key === 'Enter') {
      this.onSearchActivityLog()
    }
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
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
      })
      this.props.objectsRequestHandler(
        REQ_PROFILE_REQUESTS_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
        page: page,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
            data: this.props.requests.results,
            currentPage: page,
            totalPages: this.props.requests.total_pages,
            totalItems: this.props.requests.count,
          })
        })
    }
  }

  onRenderStatusCode(status_code) {
    if (status_code === 200) {
      return (
        <Badge
          pill
          variant="default cursor-pointer"
          className="align-text-bottom font-weight-bold">
          {status_code}
        </Badge>
      )
    } else {
      return (
        <Badge
          pill
          variant="warning cursor-pointer"
          className="align-text-bottom font-weight-bold">
          {status_code}
        </Badge>
      )
    }
  }

  formatPrice(p) {
    return numeral(p).format('$ 0,0.00')
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
      text: 'IP address',
      dataField: 'remote_addr',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-0 font-weight-bold',
      formatter: (cell, row) => (
        <Badge
          pill
          variant="default cursor-pointer"
          className="align-text-bottom font-weight-semibold" >
          {row.remote_addr}
        </Badge>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }, {
      text: 'Username',
      dataField: 'username_persistent',
      sort: false,
      classes: 'align-middle font-weight-bold',
      formatter: (cell, row) => <span className="text-body h5 mb-0">
        <Badge
          pill variant="default cursor-pointer"
          className="align-text-bottom font-weight-semibold" >
          {row.username_persistent}
        </Badge>
      </span>,
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }, {
      text: 'Requested',
      dataField: 'requested_at',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-0 font-weight-semibold small',
      formatter: (cell, row) => (
        <span>
          {moment(row.requested_at).format("DD/MM/YYYY (HH:mm:ss)")}
        </span>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }, {
      text: 'Response (ms)',
      dataField: 'requested_at',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-0 font-weight-semibold small',
      formatter: (cell, row) => (
        <span>
          {row.response_ms} ms
        </span>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }, {
      text: 'Status Code',
      dataField: 'status_code',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-0 font-weight-semibold',
      formatter: (cell, row) => (
        this.onRenderStatusCode(row.status_code)
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }, {
      text: 'Method',
      dataField: 'view_method',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-0 font-weight-semibold',
      formatter: (cell, row) => (
        <Badge
          pill
          variant="default cursor-pointer"
          className="align-text-bottom font-weight-bold" >
          {row.view_method.toUpperCase()}
        </Badge>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    }, {
      text: 'Errors',
      dataField: 'errors',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-0 font-weight-semibold',
      formatter: (cell, row) => (
        <Badge
          pill
          variant={`${row.errors ? 'danger' : 'default'} cursor-pointer`}
          className="align-text-bottom font-weight-bold" >
          {row.errors ? 'Yes' : 'No Errors'}
        </Badge>
      ),
      headerStyle: (colum, colIndex) => {
        return {
          verticalAlign: 'baseline',
          textAlign: 'left',
        };
      },
    },]

    const paginationOptions = {
      custom: true,
      totalSize: this.props.requests ? this.props.requests.count : 0,
      onPageChange: this.handlePageChange,
      sizePerPage: 15,
    }

    const defaultSorted = [{
      dataField: 'created_at',
      order: 'desc',
    }]

    return (
      <div>

        {/* Transactional Slider */}
        <TransactionalSlider
          {...this.state} {...this.props} />
        {/* / Transactional Slider */}

        <h5 className="font-weight-bold py-2 mb-2 d-flex justify-content-between align-items-center">
          Request Log&nbsp;&nbsp;
          <Badge
            pill variant="danger"
            className="text-small font-weight-bold">
            Beta
          </Badge>
          <Button
            variant="default"
            size="md"
            className="ml-auto"
            onClick={this.onRefreshActivityLog}>
            <i className="ion ion-md-refresh text-danger"></i>&nbsp;&nbsp; Refresh
          </Button>
        </h5>

        <div className="d-flex">
          <SplitButton
            variant="default"
            className="font-weight-bold mb-4"
            title={<React.Fragment><span className="ion ion-md-cloud-download text-danger"></span>&nbsp;&nbsp; Download Request Log</React.Fragment>}
            alignRight={false} >
            <Dropdown.Item
              onClick={() => {
                this.onHandleDownloadItems()
              }}>
              <i className="fab fa-js-square text-danger"></i>&nbsp;&nbsp; Download as .json
            </Dropdown.Item>
          </SplitButton>

          <Button
            variant="default"
            className="mb-4 ml-2 d-flex align-items-center justify-content-center"
            onClick={() => {
              this.props.history.push('/activity/events')
            }}>
            <i className="fas fa-eye text-danger"></i>
            <span className="ml-2">Activity Log</span>
          </Button>

          <Button
            variant="default"
            className="mb-4 ml-2 d-flex align-items-center justify-content-center"
            onClick={() => {
              this.props.history.push('/activity/deposits')
            }}>
            <i className="fas fa-eye text-danger"></i>
            <span className="ml-2">Deposit Records</span>
          </Button>

          <Button
            disabled
            variant="default"
            className="mb-4 ml-2 d-flex align-items-center justify-content-center"
            onClick={() => {
              this.props.history.push('/activity/requests')
            }}>
            <i className="fas fa-eye text-danger"></i>
            <span className="ml-2">Requests</span>
          </Button>
        </div>

        <div className="ui-bordered px-4 py-4 mb-4">
          <Row className="align-items-center">
            <Col md>
              <Form.Group className="mb-0">
                <InputGroup>
                  <Form.Control
                    placeholder="Search IP address..."
                    value={this.state.search_params}
                    onChange={e => this.onValueChange('search_params', e)}
                    onKeyPress={(e) => { this.onHandleSearchBarKeyPress(e) }}
                    maxLength="60" />
                  <InputGroup.Prepend>
                    <Button
                      variant="default"
                      onClick={this.onSearchActivityLog}>
                      Go!
                    </Button>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </div>

        {this.props.requests && (
          <>
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
                              {this.props.requests.count} Items Total
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="small mr-4 font-weight-bold">
                              <p className="mb-0">
                                {this.state.currentPage}/{this.state.totalPages}
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
        )}

        <h6 className="text-left text-lighter text-muted text-tiny mb-4">
          All user activities, such as played sessions, deposit and payout transactions, user logins, are logged and can be <br />
          viewed under "Activity Log". The user also has the option of downloading an entire report on his previous user activity.
        </h6>

        <ToastContainer
          autoClose={false ? false : + '1500'}
          newestOnTop={false}
          closeButton={<CloseButton />}
          rtl={false} />

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  requests: state.objects.profile.requests,
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(APIRequestLogView))