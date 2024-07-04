import React, { Component } from 'react'
import { Badge, Button, Card, Col, Dropdown, Form, InputGroup, Row, SplitButton } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import * as moment from 'moment'

import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator'
import filterFactory, {
  textFilter,
  selectFilter,
} from 'react-bootstrap-table2-filter'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../store/actions'

import TransactionalSlider from '../utilities/TransactionalSlider'

import {
  REQ_PROFILE_ACTIVITYLOG_GET,
  REQ_PROFILE_ACTIVITYLOG_DOWNLOAD,
} from '../../../store/objects/actionTypes'

import '../assets/css/views.css'
import '../../../vendor/libs/react-toastify/react-toastify.scss'
import '../../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss'

const CloseButton = ({ closeToast }) => (
  <button className="Toastify__close-button" type="button" aria-label="close"
    onClick={closeToast}>&times;</button>
)

class ActivityLogView extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Activity Log')

    this.onCreatedFilterValueChange = this.onCreatedFilterValueChange.bind(this)
    this.onRefreshActivityLog = this.onRefreshActivityLog.bind(this)
    this.onSearchActivityLog = this.onSearchActivityLog.bind(this)
    this.onDownloadActivityLog = this.onDownloadActivityLog.bind(this)
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
        REQ_PROFILE_ACTIVITYLOG_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
        page: 1,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
            data: this.props.activitylog.results,
            currentPage: 1,
            totalPages: this.props.activitylog.total_pages,
            totalItems: this.props.activitylog.count,
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
        REQ_PROFILE_ACTIVITYLOG_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
        page: this.state.currentPage,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
            data: this.props.activitylog.results,
            currentPage: this.state.currentPage,
            totalPages: this.props.activitylog.total_pages,
            totalItems: this.props.activitylog.count,
          }, () => {
            this.showToastify(<>
              <div className="cursor-pointer p-0 m-0 small">
                <h6>
                  Live Poker Studio™ Activity Log
                </h6>
                <p className="mb-0">
                  Activity Log has been updated successfully.
                </p>
              </div>
            </>, 'info')
          })
        })
    }
  }

  onDownloadActivityLog(format) {
    this.props.objectsRequestHandler(
      REQ_PROFILE_ACTIVITYLOG_DOWNLOAD, {
      id: JSON.parse(localStorage.getItem('user')).id,
      params: JSON.stringify(format)
    }, this.props.history)
      .then(() => {
        this.setState({
          init: true,
        })
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

  onSearchActivityLog() {
    if (this.props.activitylog) {
      var filter = "subject"
      var keyword = this.state.search_params
      var filteredData = this.props.activitylog.results.filter(function (obj) {
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
      this.props.objectsRequestHandler(REQ_PROFILE_ACTIVITYLOG_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
        page: page,
      }, this.props.history).then(() => {
        this.setState({
          init: true,
          data: this.props.activitylog.results,
          currentPage: page,
          totalPages: this.props.activitylog.total_pages,
          totalItems: this.props.activitylog.count,
        })
      })
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
      text: 'Activity Code',
      dataField: 'id',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2',
      formatter: (cell, row, index) => (
        <span className="font-weight-bold">
          <Badge pill variant="default" className="font-weight-bold">
            {String(row.id).slice(0, 8)}
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
      text: 'Message',
      dataField: 'subject',
      sort: false,
      headerClasses: 'text-nowrap',
      headerStyle: { minWidth: '300px' },
      classes: 'align-middle py-2 small font-weight-semibold',
      filter: textFilter({
        caseSensitive: true,
        delay: 10,
      }),
    }, {
      text: 'Datetime',
      dataField: 'created_at',
      sort: true,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 font-weight-semibold small',
      formatter: (cell, row) => (
        moment(row.created_at).format("DD/MM/YYYY (HH:mm:ss)")
      ),
      filter: textFilter({
        caseSensitive: true,
        delay: 10,
      }),
    }, {
      text: 'Class',
      dataField: 'class',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2',
      formatter: (cell, row) => (
        row.class === 0
          ? <Badge pill variant="default">Profile</Badge>
          : <Badge pill variant="default">Undefined</Badge>
      ),
      filter: selectFilter({
        options: {
          '0': 'Profile',
          '1': 'Undefined',
        },
        className: 'custom-select',
        delay: 10,
      }),
    }, {
      text: 'Status',
      dataField: 'status',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2',
      formatter: (cell, row) => (
        <Badge pill variant="default">
          {row.status === 4 && ('Complete')}
          {row.status === 5 && ('Pending')}
        </Badge>
      ),
      filter: selectFilter({
        options: {
          '4': 'Complete',
          '5': 'Pending',
        },
        className: 'custom-select',
        delay: 10,
      }),
    }]

    const paginationOptions = {
      custom: true,
      totalSize: this.props.activitylog ? this.props.activitylog.count : 0,
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
          Activity Log&nbsp;&nbsp;
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
            title={<>
              <span className="ion ion-md-cloud-download text-danger"></span>
              <span className="ml-2">Download Activity Log</span>
            </>}
            alignRight={false} >
            <Dropdown.Item
              onClick={() => {
                this.onDownloadActivityLog("CSV")
              }}>
              <i className="fas fa-file-csv text-danger"></i>
              <span className="ml-2">Download as .csv</span>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.onDownloadActivityLog("JSON")
              }}>
              <i className="fab fa-js-square text-danger"></i>
              <span className="ml-2">Download as .json</span>
            </Dropdown.Item>
          </SplitButton>

          <Button
            disabled
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
                    placeholder="Search player activity..."
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

        {this.props.activitylog && (
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
                              {this.props.activitylog.count} Items Total
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
  activitylog: state.objects.profile.activitylog,
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(ActivityLogView))