import React, { Component } from 'react'
import { Badge, Button, Card, Col, ListGroup, Media, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import numeral from 'numeral'
import moment from 'moment'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../store/actions'

import ResourceLoaderB from '../utilities/loaders/ResourceLoaderB'

import {
  REQ_PROFILE_NOTIFICATIONS_GET,
  REQ_PROFILE_NOTIFICATIONS_UPDATE,
} from '../../../store/objects/actionTypes'

import '../assets/css/views.css'
import '../../../vendor/styles/pages/messages.scss'
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

class NotificationsView extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Notifications')

    this.onUpdateNotifications = this.onUpdateNotifications.bind(this)
    this.onRefreshNotifications = this.onRefreshNotifications.bind(this)

    this.state = {
      selected: [],
      init: false,
      username: null,
    }
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
      })
      if (localStorage.getItem('user')) {
        this.props.objectsRequestHandler(
          REQ_PROFILE_NOTIFICATIONS_GET, {
          id: JSON.parse(localStorage.getItem('user')).id,
        }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
          })
        })
      }
    } else {
      this.props.history.push('/')
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      this.showToastify(this.parseErrorNotification(this.props.error.message), 'error')
    }
  }

  toggleSelect(e, message) {
    const selected = this.state.selected.slice(0)
    if (e.target.checked) {
      selected.push(message)
    } else {
      selected.splice(selected.indexOf(message), 1)
    }
    this.setState({ selected })
  }

  onRefreshNotifications() {
    this.props.objectsRequestHandler(
      REQ_PROFILE_NOTIFICATIONS_GET, {
      id: JSON.parse(localStorage.getItem('user')).id,
    }, this.props.history)
    .then(() => {
      this.setState({
        init: true,
      }, () => {
        this.showToastify(<>
          <div className="cursor-pointer p-0 m-0 small">
            <h6>
              Live Poker Studio™ Notifications
            </h6>
            <p className="mb-0">
              Notifications have been updated successfully.
            </p>
          </div>
        </>, 'info')
      })
    })
  }

  onUpdateNotifications(item) {
    this.props.objectsRequestHandler(
      REQ_PROFILE_NOTIFICATIONS_UPDATE, {
      id: JSON.parse(localStorage.getItem('user')).id,
      item: JSON.stringify(item)
    }, this.props.history)
    .then(() => {
      this.setState({
        init: true,
      })
    })
  }

  parseErrorNotification(message) {
    return (
      <>
        <h4 className="font-weight-bold">
          <span className="fas fa-sad-tear"></span>
          &nbsp;&nbsp;Network Failure
        </h4>
        <h6 className="mb-0">
          {message}
        </h6>
      </>)
  }

  uiStarClass(i, rating) {
    if (rating > (i - 1) && rating < i) return 'half-filled'
    if (rating >= i) return 'filled'
    return ''
  }

  formatPrice(p) {
    return numeral(p).format('$ 0,0.00')
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
    return (
      <Row>

        {this.props.notifications && (
          <>
            <Col>
              <Card style={{ borderRadius: "15px", }}>
                <Card.Header as="h4" className="media flex-wrap align-items-center py-4">
                  <Media.Body className="d-flex align-items-center">
                    <span className="svg-icon svg-icon-muted svg-icon-2hx mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M8 8C8 7.4 8.4 7 9 7H16V3C16 2.4 15.6 2 15 2H3C2.4 2 2 2.4 2 3V13C2 13.6 2.4 14 3 14H5V16.1C5 16.8 5.79999 17.1 6.29999 16.6L8 14.9V8Z" fill="white" />
                        <path d="M22 8V18C22 18.6 21.6 19 21 19H19V21.1C19 21.8 18.2 22.1 17.7 21.6L15 18.9H9C8.4 18.9 8 18.5 8 17.9V7.90002C8 7.30002 8.4 6.90002 9 6.90002H21C21.6 7.00002 22 7.4 22 8ZM19 11C19 10.4 18.6 10 18 10H12C11.4 10 11 10.4 11 11C11 11.6 11.4 12 12 12H18C18.6 12 19 11.6 19 11ZM17 15C17 14.4 16.6 14 16 14H12C11.4 14 11 14.4 11 15C11 15.6 11.4 16 12 16H16C16.6 16 17 15.6 17 15Z" fill="white" />
                      </svg>
                    </span>
                    Notifications
                  </Media.Body>

                  <Button
                    variant="default rounded-pill"
                    className="d-block"
                    onClick={this.onRefreshNotifications}>
                    <span className="ion ion-md-refresh"></span>
                    &nbsp; Refresh
                  </Button>
                </Card.Header>

                <hr className="border-light m-0" />

                <Card className="my-2">
                  <ListGroup variant="flush">

                    {!isEmpty(this.props.notifications.content)
                      ? <>

                        {this.props.notifications.content.map((item, index) => (
                          <ListGroup.Item key={index} className="py-4">
                            <Media className="flex-wrap">
                              <div className="d-none d-sm-block ui-w-200 p-5" style={{
                                backgroundColor: "black",
                                borderRadius: "15px",
                                justifyContent: "center",
                                boxShadow: "0px 0px 10px black",
                              }}>
                                <img
                                  src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-light-img-2-1-0-@2.png`}
                                  alt="Live Poker Studio™" className="d-block" style={{ width: "100px", }} />
                              </div>

                              <Media.Body className="ml-sm-5">
                                <div className="mb-2">
                                  <Link
                                    to="#"
                                    className="float-right font-weight-semibold ml-3"
                                    onClick={() => {
                                      this.onUpdateNotifications(item)
                                    }}>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={<Tooltip className="tooltip-default">
                                        Delete
                                      </Tooltip>}>
                                      <h5>
                                        <i className="fas fa-trash text-body"></i>
                                      </h5>
                                    </OverlayTrigger>
                                  </Link>
                                  <h4 className="text-body font-weight-bold mb-0">
                                    {item.title}
                                  </h4>
                                </div>

                                <div className="d-flex flex-wrap align-items-center mb-2">
                                  <div className="text-muted small font-weight-bold">
                                    <i className="fas fa-user text-body"></i>&nbsp;&nbsp;
                                    <span>
                                      {item.author}
                                    </span>
                                  </div>&nbsp;&nbsp;
                                  <div className="text-muted small font-weight-bold">
                                    <i className="ion ion-ios-time text-body"></i>&nbsp;&nbsp;
                                    <span>
                                      {moment(item.date).format("DD-MM-YYYY HH:mm")}
                                    </span>
                                  </div>
                                </div>

                                <h5 className="text-left text-body text-muted small mt-2 mb-4">
                                  {item.content}
                                </h5>

                                <div className="mt-2 h5 mb-0">
                                  {item.tags.map((tag, index) =>
                                    <Badge
                                      key={index}
                                      pill variant="default"
                                      className="text-body mr-1">
                                      {tag}
                                    </Badge>
                                  )}
                                </div>
                              </Media.Body>
                            </Media>
                          </ListGroup.Item>
                        ))}

                      </>
                      : <>
                        <ListGroup.Item className="py-5">
                          <Card className="d-flex w-100 mb-4 bg-transparent border-0 shadow-none">
                            <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                              <Col sm={12} md={12} lg={12}
                                className="d-flex align-items-center border-0 shadow-none"
                                style={{ justifyContent: "center", }}>
                                <ResourceLoaderB
                                  height="4rem" width="4rem" />
                              </Col>
                            </Row>
                          </Card>

                          <div className={`text-center text-white opacity-100 mb-3`}>
                            No previous notifications available...
                          </div>

                          <h6 className="text-center text-lighter text-muted text-tiny mt-4 mb-0">
                            All user activities, such as played sessions, deposit and payout transactions, user logins, are logged and can be <br />
                            viewed under "Activity Log". The user also has the option of downloading an entire report on his previous user activity.
                          </h6>
                        </ListGroup.Item>
                      </>}
                  </ListGroup>
                </Card>
              </Card>
            </Col>
          </>
        )}

        <ToastContainer
          autoClose={false ? false : + '1500'}
          newestOnTop={false}
          closeButton={<CloseButton />}
          rtl={false} />

      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  notifications: state.objects.notifications.selected,
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(NotificationsView))