import React, { Component } from 'react'
import { Badge, Button, Card, Col, Dropdown, Form, InputGroup, Row, SplitButton } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import moment from 'moment'
import FileSaver from 'file-saver'
import * as numeral from 'numeral'
import Clipboard from 'react-clipboard.js'

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

import ResourceLoaderB from '../utilities/loaders/ResourceLoaderB'

import {
    REQ_COMMERCE_TRANSACTION_QUERYSET_ALL,
} from '../../../store/objects/actionTypes'

import '../assets/css/views.css'
import '../../../vendor/libs/react-toastify/react-toastify.scss'
import '../../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss'

const CloseButton = ({ closeToast }) => (
    <button className="Toastify__close-button" type="button" aria-label="close"
        onClick={closeToast}>&times;</button>
)

class PaymentsTransactionsListView extends Component {

    constructor(props) {
        super(props)
        props.setTitle('Payments')

        this.onValueChange = this.onValueChange.bind(this)
        this.onRefreshTransactions = this.onRefreshTransactions.bind(this)
        this.onSearchTransactions = this.onSearchTransactions.bind(this)
        this.onHandleDownloadItems = this.onHandleDownloadItems.bind(this)
        this.onHandleSearchBarKeyPress = this.onHandleSearchBarKeyPress.bind(this)
        this.onCreatedFilterValueChange = this.onCreatedFilterValueChange.bind(this)

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
                REQ_COMMERCE_TRANSACTION_QUERYSET_ALL, {
                id: JSON.parse(localStorage.getItem('user')).id,
                page: 1,
            }, this.props.history)
                .then(() => {
                    this.setState({
                        init: true,
                        data: this.props.transactions.results,
                        currentPage: 1,
                        totalPages: this.props.transactions.total_pages,
                        totalItems: this.props.transactions.count,
                    })
                })
        } else {
            this.props.history.push('/')
        }
    }

    onRefreshTransactions() {
        if (localStorage.getItem('user')) {
            this.setState({
                username: JSON.parse(localStorage.getItem('user')).user.username,
            })
            this.props.objectsRequestHandler(
                REQ_COMMERCE_TRANSACTION_QUERYSET_ALL, {
                id: JSON.parse(localStorage.getItem('user')).id,
                page: this.state.currentPage,
            }, this.props.history)
                .then(() => {
                    this.setState({
                        init: true,
                        data: this.props.transactions.results,
                        currentPage: this.state.currentPage,
                        totalPages: this.props.transactions.total_pages,
                        totalItems: this.props.transactions.count,
                    }, () => {
                        this.showToastify(<>
                            <div className="cursor-pointer p-0 m-0 small">
                                <h6>
                                    Live Poker Studio™ Payments
                                </h6>
                                <p className="mb-0">
                                    Payments have been updated successfully.
                                </p>
                            </div>
                        </>, 'info')
                    })
                })
        } else {
            this.props.history.push('/')
        }
    }

    onSearchTransactions() {
        if (this.props.transactions) {
            if (this.props.transactions.results.length > 0) {
                var filter = "payment_id"
                var keyword = this.state.search_params
                var filteredData = this.props.transactions.results.filter(function (obj) {
                    return obj[filter].toLowerCase().includes(keyword.toLowerCase())
                })
                this.setState({
                    init: true,
                    data: filteredData,
                })
            }
        }
    }

    onHandleDownloadItems() {
        if (this.props.transactions.results.length > 0) {
            var blob = new Blob([JSON.stringify(this.props.transactions.results)], { type: "application/json", })
            FileSaver.saveAs(blob, `transactions-commerce-${moment().valueOf()}.json`)
        }
    }

    onHandleSearchBarKeyPress(e) {
        if (e.key === 'Enter') {
            this.onSearchTransactions()
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
            [field]: e.target.value,
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
            REQ_COMMERCE_TRANSACTION_QUERYSET_ALL, {
            page: page,
        }, this.props.history)
            .then(() => {
                this.setState({
                    init: true,
                    data: this.props.transactions.results,
                    currentPage: page,
                    totalPages: this.props.transactions.total_pages,
                    totalItems: this.props.transactions.count,
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

    onRenderStatusBadge(status) {
        if (status === 'in_progress') {
            return (
                <Badge
                    pill variant="warning"
                    className="align-text-bottom font-weight-bold cursor-pointer" >
                    In Progress
                </Badge>
            )
        } else if (status === 'success') {
            return (
                <Badge
                    pill variant="success"
                    className="align-text-bottom font-weight-bold cursor-pointer" >
                    Success
                </Badge>
            )
        } else if (status === 'failed') {
            return (
                <Badge
                    pill variant="danger"
                    className="align-text-bottom font-weight-bold cursor-pointer" >
                    Failed
                </Badge>
            )
        } else if (status === 'canceled') {
            return (
                <Badge
                    pill variant="warning"
                    className="align-text-bottom font-weight-bold cursor-pointer" >
                    Canceled
                </Badge>
            )
        } else {
            return (
                <Badge
                    pill variant="default"
                    className="align-text-bottom font-weight-bold cursor-pointer" >
                    {status}
                </Badge>
            )
        }
    }

    onHandleClipboardCallback() {
        this.showToastify(<>
            <div className="cursor-pointer p-0 m-0 small">
                <h6>
                    Live Poker Studio™ Notification
                </h6>
                <p className="mb-0">
                    Copied successfully
                </p>
            </div>
        </>, 'info')
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
            text: 'No°',
            dataField: 'id',
            sort: true,
            headerClasses: 'text-nowrap',
            classes: 'align-middle py-2 font-weight-bold small',
            formatter: (cell, row, index) => (
                row.id
            ),
            headerStyle: (colum, colIndex) => {
                return {
                    verticalAlign: 'baseline',
                    textAlign: 'left',
                };
            },
        }, {
            text: 'Payment ID',
            dataField: 'payment_id',
            sort: false,
            headerClasses: 'text-nowrap',
            headerStyle: { minWidth: '300px' },
            classes: 'align-middle py-2 font-weight-bold small',
            formatter: (cell, row) => (
                <Clipboard
                    data-clipboard-text={row.payment_id}
                    className="btn btn-light btn-sm"
                    onClick={() => { this.onHandleClipboardCallback() }}>
                    <span className="mr-2">{row.payment_id}</span>
                    <i className="fas fa-copy" />
                </Clipboard>
            ),
            filter: textFilter({
                caseSensitive: true,
                delay: 10,
            }),
        }, {
            text: 'Created',
            dataField: 'created_at',
            sort: false,
            headerClasses: 'text-nowrap',
            classes: 'align-middle py-2 font-weight-bold small',
            formatter: (cell, row) => (
                moment(row.created_at).format("DD/MM/YYYY (HH:mm:ss)")
            ),
            filter: textFilter({
                caseSensitive: true,
                delay: 10,
            }),
        }, {
            text: 'Type',
            dataField: 'order_type',
            sort: false,
            headerClasses: 'text-nowrap',
            classes: 'align-middle py-2 font-weight-bold',
            formatter: (cell, row) => (
                <Badge
                    pill variant="default cursor-pointer"
                    className="align-text-bottom font-weight-bold" >
                    {row.order_type.charAt(0).toUpperCase() + row.order_type.slice(1)}
                </Badge>
            ),
            filter: selectFilter({
                options: {
                    'deposit': 'Deposit',
                    'withdrawal': 'Withdrawal',
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
                this.onRenderStatusBadge(row.status)
            ),
            filter: selectFilter({
                options: {
                    'in_progress': 'In Progress',
                    'success': 'Success',
                    'failed': 'Failed',
                    'canceled': 'Canceled',
                },
                className: 'custom-select',
                delay: 10,
            }),
        }, {
            text: 'Currency',
            dataField: 'currency',
            sort: false,
            headerClasses: 'text-nowrap',
            classes: 'align-middle py-2 font-weight-bold',
            formatter: (cell, row) => (
                <Badge
                    pill variant="default cursor-pointer"
                    className="align-text-bottom font-weight-bold" >
                    {row.currency.toUpperCase()}
                </Badge>
            ),
            headerStyle: (colum, colIndex) => {
                return {
                    verticalAlign: 'baseline',
                    textAlign: 'left',
                };
            },
        }, {
            text: 'Order Total',
            dataField: 'amount',
            sort: false,
            headerClasses: 'text-nowrap',
            classes: 'align-middle py-2 font-weight-bold small',
            formatter: (cell, row) => (
                this.formatPrice(row.amount)
            ),
            headerStyle: (colum, colIndex) => {
                return {
                    verticalAlign: 'baseline',
                    textAlign: 'left',
                };
            },
        }, {
            text: 'Pre Balance',
            dataField: 'pre_balance',
            sort: false,
            headerClasses: 'text-nowrap',
            classes: 'align-middle py-2 font-weight-bold small',
            formatter: (cell, row) => (
                this.formatPrice(row.pre_balance)
            ),
            headerStyle: (colum, colIndex) => {
                return {
                    verticalAlign: 'baseline',
                    textAlign: 'left',
                };
            },
        }, {
            text: 'IP address',
            dataField: 'customer_ip_address',
            sort: false,
            headerClasses: 'text-nowrap',
            classes: 'align-middle py-2 font-weight-bold',
            formatter: (cell, row) => (
                <Badge
                    pill variant="default cursor-pointer"
                    className="align-text-bottom font-weight-bold" >
                    {row.customer_ip_address}
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
            totalSize: this.props.transactions ? this.props.transactions.count : 0,
            onPageChange: this.handlePageChange,
            sizePerPage: 15,
        }

        const defaultSorted = [{
            dataField: 'id',
            order: 'desc',
        }]

        return (
            <div>
                <h4 className="font-weight-bold py-2 mb-4 d-flex justify-content-between align-items-center">
                    <span>Payments & Transactions</span>
                    <Badge
                        pill variant="danger"
                        className="text-small font-weight-bold ml-2">
                        Beta
                    </Badge>
                    <Button
                        variant="default"
                        size="md"
                        className="ml-auto"
                        onClick={this.onRefreshTransactions}>
                        <i className="ion ion-md-refresh text-danger mr-2"></i>
                        <span>Refresh</span>
                    </Button>
                </h4>

                <SplitButton
                    variant="default"
                    className="font-weight-bold mb-4"
                    title={<React.Fragment>
                        <span className="ion ion-md-cloud-download text-danger"></span>
                        <span className="ml-2">
                            Download Payments & Transactions
                        </span>
                    </React.Fragment>}
                    alignRight={false}>
                    <Dropdown.Item
                        onClick={() => {
                            this.onHandleDownloadItems()
                        }}>
                        <i className="fab fa-js-square text-danger"></i>
                        &nbsp;&nbsp; Download as .json
                    </Dropdown.Item>
                </SplitButton>

                <div className="ui-bordered px-4 py-4 mb-4">
                    <Row className="align-items-center">
                        <Col md>
                            <Form.Group className="mb-0">
                                <InputGroup>
                                    <Form.Control
                                        ref={c => (this.searchBarRef = c)}
                                        placeholder="Search payments..."
                                        value={this.state.search_params}
                                        onChange={e => this.onValueChange('search_params', e)}
                                        onKeyPress={(e) => { this.onHandleSearchBarKeyPress(e) }}
                                        maxLength="60" />
                                    <InputGroup.Prepend>
                                        <Button
                                            variant="default"
                                            onClick={this.onSearchTransactions}>
                                            Go!
                                        </Button>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>

                {this.props.transactions && (
                    this.props.transactions.results.length > 0
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
                                                                {this.props.transactions.count} Items Total
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
                                <div className={`text-center text-white opacity-100 mb-0`}>No previous transactions found...</div>
                                <h6 className="text-center text-lighter text-muted text-tiny mt-4 mb-0">
                                    All user activities, such as played sessions, deposit and payout transactions, user logins, are logged and can be <br />
                                    viewed under "Activity Log". The user also has the option of downloading an entire report on his previous user activity.
                                </h6>
                            </Card>
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
                    rtl={false}
                />

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    transactions: state.objects.commerce.transactions.items,
    error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(PaymentsTransactionsListView))