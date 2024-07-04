import React, { Component } from 'react'
import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

import moment from 'moment'
import * as numeral from 'numeral'
import Clipboard from 'react-clipboard.js'

import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter'

import ResourceLoaderB from '../../utilities/loaders/ResourceLoaderB'

import {
  REQ_COMMERCE_TRANSACTION_QUERYSET_ALL,
} from '../../../../store/objects/actionTypes'

import '../../assets/css/views.css'
import '../../../../vendor/libs/react-toastify/react-toastify.scss'
import '../../../../vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss'

class WalletPayments extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: true,
      data: [],
    }
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
        email: JSON.parse(localStorage.getItem('user')).user.email,
      })
      this.props.objectsRequestHandler(
        REQ_COMMERCE_TRANSACTION_QUERYSET_ALL, {
        id: JSON.parse(localStorage.getItem('user')).id,
        page: 1,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
            data: this.props.transactions.results.slice(Math.max(this.props.transactions.results.length - 10, 0)),
          })
        })
    } else {
      this.props.history.push('/')
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

  formatPrice(p) {
    return numeral(p).format('$0,0.00')
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
      )
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
      )
    }, {
      text: 'Created',
      dataField: 'created_at',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 font-weight-bold small',
      formatter: (cell, row) => (
        moment(row.created_at).format("DD/MM/YYYY (HH:mm:ss)")
      )
    }, {
      text: 'Type',
      dataField: 'order_type',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 font-weight-bold',
      formatter: (cell, row) => (
        <Badge
          pill
          variant="default cursor-pointer"
          className="align-text-bottom font-weight-bold" >
          {row.order_type.charAt(0).toUpperCase() + row.order_type.slice(1)}
        </Badge>
      )
    }, {
      text: 'Status',
      dataField: 'status',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2',
      formatter: (cell, row) => (
        this.onRenderStatusBadge(row.status)
      )
    }, {
      text: 'Currency',
      dataField: 'currency',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 font-weight-bold small',
      formatter: (cell, row) => (
        row.currency.toUpperCase()
      )
    }, {
      text: 'Amount',
      dataField: 'amount',
      sort: false,
      headerClasses: 'text-nowrap',
      classes: 'align-middle py-2 font-weight-bold small',
      formatter: (cell, row) => (
        this.formatPrice(row.amount)
      )
    }]

    const defaultSorted = [{
      dataField: 'id',
      order: 'desc',
    }]

    return (
      <Col md={9}>
        <Card.Body className="pb-4">
          <h6 className="mb-4">Preview Latest Payments</h6>

          {this.state.data && this.state.data.length > 0
            ? <>
              {!isIE10Mode &&
                <>
                  <Card className="mb-0">
                    <ToolkitProvider
                      keyField="id"
                      data={this.state.data}
                      columns={columns}
                      defaultSorted={defaultSorted}
                      bootstrap4
                      search>
                      {props => (<React.Fragment>
                        <BootstrapTable
                          {...props.baseProps}
                          wrapperClasses="table-responsive react-bs-table-card"
                          classes="card-table table-striped border-top bg-light"
                          defaultSorted={defaultSorted}
                          striped={true} hover={true}
                          filter={filterFactory()}
                        />
                      </React.Fragment>)}
                    </ToolkitProvider>
                  </Card>
                </>
              }
            </>
            : <>
              <Card className="bg-light p-5 mb-0" style={{
                borderRadius: "0px 0px 15px 15px",
              }}>
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
            </>}

          <Button
            variant="outline-primary"
            className="mt-3"
            onClick={() => {
              this.props.history.push('/wallet/transactions')
            }}>
            <i className="fas fa-eye mr-2"></i>
            <span>View All Transactions</span>
          </Button>
        </Card.Body>
      </Col>
    )
  }
}

export default WalletPayments