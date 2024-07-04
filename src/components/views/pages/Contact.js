import React, { Component } from 'react'
import { Media, Button, Card, Modal, Row, Col } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../store/actions'

import '../../../vendor/libs/react-toastify/react-toastify.scss'

const CloseButton = ({ closeToast }) => (
  <button className="Toastify__close-button" type="button" aria-label="close"
    onClick={closeToast}>&times;</button>
)

class Contact extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Contact Us')

    this.evaluateActiveRoute = this.evaluateActiveRoute.bind(this)

    this.state = {
      expanded: [],
      userEmail: null,
      message: null,
      disabled: true,
      messageSentLoading: false,
    }
  }

  evaluateActiveRoute() {
    if (!localStorage.getItem('token')) {
      this.props.history.push("/login")
    }
  }

  handleClose = () => this.setState({ show: false, })

  componentDidMount() {
    this.evaluateActiveRoute()
    if (localStorage.getItem('user')) this.props.objectsRequestHandler('REQ_PROFILE_SETTINGS_GET', { id: JSON.parse(localStorage.getItem('user')).id }).then((res) => {
      this.setState({ userEmail: res.objects.profile.settings.profile.email });
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ messageSentLoading: true })
    this.props.objectsRequestHandler('REQ_SEND_ISSUE', {
      id: JSON.parse(localStorage.getItem('user')).id,
      params: JSON.stringify({
        email: this.state.userEmail,
        message: this.state.message
      })
    }).then((res) => {
      // if(res.objects.profile.send_issue === 200) 
      this.setState({ disabled: true });
      this.setState({ show: true });
      this.setState({ messageSentLoading: false });
    }).catch(() => {
      this.setState({ init: true }, () => {
        this.showToastify(<div className="font-weight-bold">Email was not sent !</div>, 'error')
      })
    })
  }

  toggle(e, id) {
    e.preventDefault()
    const expanded = [...this.state.expanded]

    if (expanded.indexOf(id) === -1) {
      expanded.push(id)
    } else {
      expanded.splice(expanded.indexOf(id), 1)
    }

    this.setState({ expanded })
  }

  isExpanded(id) {
    return this.state.expanded.indexOf(id) !== -1
  }

  prevent(e) {
    e.preventDefault()
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

  render() {
    return (
      <div>

        <h3 className="row align-items-center font-weight-bold py-4 mb-4">
          <Col>
            Contact
          </Col>
        </h3>
        <hr className="container-m-nx border-light my-0" />

        <Card className="mt-5">
          <Card.Header as="h5" className="py-4 px-5">
            <div className="media align-items-center text-body">
              <div className="ion ion-md-help-circle-outline ui-w-30 text-center text-xlarge"></div>
              <Media.Body className="ml-3">
                Contact Us
                <div className="text-muted small">Let us know your thoughts or issues</div>
              </Media.Body>
            </div>
          </Card.Header>
          <Row noGutters className="row-bordered">
            <Col md={12} className="p-5">
              <form onSubmit={this.onSubmit}>

                <div className="form-group">
                  <label className="form-label mb-2">Your Email:</label>
                  <input disabled type="text" className="form-control text-muted" defaultValue={this.state.userEmail} placeholder={this.state.userEmail} />
                </div>

                <div className="form-group">
                  <label className="form-label mb-2">Your Message:</label>
                  <textarea onChange={(e) => { this.setState({ message: e.target.value }); this.setState({ disabled: false }); this.setState({ messageSent: false }) }} type="textarea" className="form-control text-muted" style={{ minHeight: '150px' }} />
                </div>

                <div className="form-group">
                  <Button variant="success" disabled={this.state.disabled} type="submit">{this.state.messageSentLoading ? "Loading..." : "Submit"}</Button>
                </div>

              </form>
            </Col>

          </Row>
        </Card>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Message was sent</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your message was sent successfully !</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer
          autoClose={false ? false : + '5000'}
          newestOnTop={false}
          closeButton={<CloseButton />}
          rtl={false} />

      </div>
    )
  }
}

export default connect(null, { objectsRequestHandler })(Contact)