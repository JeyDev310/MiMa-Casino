import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Badge, Button, Card, Col, Form, InputGroup, ListGroup, Nav, Row } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

import zxcvbn from 'zxcvbn'
import ReCAPTCHA from 'react-google-recaptcha'

import WalletSlider from '../utilities/WalletSlider'
import ResourceLoaderQ from '../utilities/loaders/ResourceLoaderQ'

import axios from 'axios'
import moment from 'moment'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'

import {
  REQ_PROFILE_SETTINGS_GET,
  REQ_PROFILE_AVATAR_GET,
  REQ_PROFILE_ACTIVITYLOG_DOWNLOAD,
  REQ_PROFILE_SETTINGS_UPDATE,
  REQ_PROFILE_AVATAR_UPDATE,
  REQ_PROFILE_KYC_1_UPDATE,
  REQ_DEACTIVATE_ACCOUNT,
} from "../../../store/objects/actionTypes"

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../store/actions'

import '../assets/css/views.css'
import '../../../vendor/styles/pages/account.scss'
import '../../../vendor/libs/react-select/react-select.scss'
import '../../../vendor/libs/react-toastify/react-toastify.scss'
import '../../../vendor/libs/react-flatpickr/react-flatpickr.scss'

const CloseButton = ({ closeToast }) => (
  <button className="Toastify__close-button" type="button" aria-label="close"
    onClick={closeToast}>&times;</button>
)

const mapRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2

class AccountSettings extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Account Settings')

    this.fetchTimer = null
    this.recaptchaRef = React.createRef()

    this.onHandleRefreshItems = this.onHandleRefreshItems.bind(this)
    this.evaluateActiveRoute = this.evaluateActiveRoute.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onSubmitChanges = this.onSubmitChanges.bind(this)
    this.onHandleDeleteAccount = this.onHandleDeleteAccount.bind(this)
    this.onDownloadActivityLog = this.onDownloadActivityLog.bind(this)
    this.onHandleParseBirthdateData = this.onHandleParseBirthdateData.bind(this)
    this.onHandleChangeProfileAvatar = this.onHandleChangeProfileAvatar.bind(this)
    this.onHandleUpdateProfileAvatar = this.onHandleUpdateProfileAvatar.bind(this)

    this.onChangeAmount = this.onChangeAmount.bind(this)
    this.onSelectChangeValue = this.onSelectChangeValue.bind(this)
    this.onHandleChangeProfileKYCDocument1 = this.onHandleChangeProfileKYCDocument1.bind(this)
    this.onHandleUpdateProfileKYCDocument1 = this.onHandleUpdateProfileKYCDocument1.bind(this)

    this.onHandleChangePassword = this.onHandleChangePassword.bind(this)
    this.onHandleSubmitReCAPTCHAToken = this.onHandleSubmitReCAPTCHAToken.bind(this)

    this.state = {
      init: false,
      username: null,
      isFetching: true,
      curTab: 'general',
      countryOptions: [],
      avatar: null,
      selectedFileRaw: null,
      selectedFilePreview: null,
      kyc_document_1: null,
      selectedKYC1FileRaw: null,
      selectedKYC1FilePreview: null,
      meta: {
        avatar: 'avatar-2.png',
        verified: false,
      },
      data: {
        profile: {},
        settings: {},
      },
      credentials: {
        old_password: '',
        new_password1: '',
        new_password2: '',
        recaptcha: '',
      },
      showOldPassword: false,
      showNewPassword1: false,
      showNewPassword2: false,
      validOldPassword: false,
      validNewPassword1: false,
      validNewPassword2: false,
      validOldPasswordHint: 'Please enter a valid password.',
      validNewPassword1Hint: 'Please enter a valid password.',
      validNewPassword2Hint: 'Passwords do not match.',
      passwordStrength: 0,
      validChangePasswordRequest: false,
      showProfileWarning: true,
    }

    this.depositOptions1 = [
      { id: 0, value: 'none', label: 'No Limit', isDisabled: false, },
      { id: 1, value: 'daily', label: 'Daily', isDisabled: false, },
      { id: 2, value: 'weekly', label: 'Weekly', isDisabled: false, },
      { id: 3, value: 'monthly', label: 'Monthly', isDisabled: false, },
      { id: 4, value: 'yearly', label: 'Yearly', isDisabled: false, },
    ]

    this.depositOptions2 = [
      { id: 0, value: 0, label: '$0', isDisabled: false, },
      { id: 1, value: 100, label: '$100', isDisabled: false, },
      { id: 2, value: 250, label: '$250', isDisabled: false, },
      { id: 3, value: 500, label: '$500', isDisabled: false, },
      { id: 4, value: 1000, label: '$1000', isDisabled: false, },
    ]

    this.loadData('/json/countries.json').then(data => {
      this.setState({
        countryOptions: data,
      })
    })
  }

  async loadData(url) {
    const response = await axios.get(process.env.PUBLIC_URL + url)
    return response.data
  }

  evaluateActiveRoute() {
    if (!localStorage.getItem('token')) {
      this.props.history.push("/login")
    }
  }

  componentDidMount() {
    this.evaluateActiveRoute()
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
      })
      this.fetchTimer = setTimeout(() => {
        this.props.objectsRequestHandler(
          REQ_PROFILE_SETTINGS_GET, {
          id: JSON.parse(localStorage.getItem('user')).id,
        }, this.props.history)
          .then(() => {
            this.setState({
              init: true,
              isFetching: false,
              data: {
                ...this.state.data,
                profile: this.props.settings.profile,
                settings: this.props.settings.settings,
              }
            })
          })
      }, 500)
    } else {
      this.props.history.push('/')
    }
    if (!this.props.avatar && localStorage.getItem('user')) {
      this.props.objectsRequestHandler(
        REQ_PROFILE_AVATAR_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
      }, this.props.history)
        .then(() => {
          this.setState({
            avatar: this.props.avatar,
          })
        })
    } else {
      this.setState({
        avatar: this.props.avatar,
      })
    }
  }

  componentWillUnmount() {
    if (this.fetchTimer) {
      clearTimeout(this.fetchTimer)
    }
    this.setState = (state, callback) => {
      return
    }
  }

  onHandleRefreshItems() {
    this.evaluateActiveRoute()
    if (localStorage.getItem('user')) {
      this.setState({
        username: JSON.parse(localStorage.getItem('user')).user.username,
      })
      this.props.objectsRequestHandler(
        REQ_PROFILE_SETTINGS_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
      }, this.props.history)
        .then(() => {
          this.setState({
            init: true,
            data: {
              ...this.state.data,
              profile: this.props.settings.profile,
              settings: this.props.settings.settings,
            }
          })
        })
    } else {
      this.props.history.push('/')
    }
    if (!this.props.avatar && localStorage.getItem('user')) {
      this.props.objectsRequestHandler(
        REQ_PROFILE_AVATAR_GET, {
        id: JSON.parse(localStorage.getItem('user')).id,
      }, this.props.history)
        .then(() => {
          this.setState({
            avatar: this.props.avatar,
          })
        })
    } else {
      this.setState({
        avatar: this.props.avatar,
      })
    }
  }

  onDownloadActivityLog() {
    this.props.objectsRequestHandler(
      REQ_PROFILE_ACTIVITYLOG_DOWNLOAD, {
      id: JSON.parse(localStorage.getItem('user')).id,
      params: JSON.stringify("CSV"),
    }, this.props.history)
      .then(() => {
        this.setState({
          init: true,
        })
      })
  }

  onHandleDeleteAccount() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.props.history.push('/login')
  }

  onSubmitChanges() {
    this.props.objectsRequestHandler(
      REQ_PROFILE_SETTINGS_UPDATE, {
      id: JSON.parse(localStorage.getItem('user')).id,
      params: JSON.stringify(this.state.data),
    }, this.props.history)
      .then(() => {
        this.setState({
          init: true,
        }, () => {
          this.showToastify(<>
            <div className="cursor-pointer p-0 m-0 small">
              <h6>
                Live Poker Studio™ Settings
              </h6>
              <p className="mb-0">
                Settings have been updated successfully.
              </p>
            </div>
          </>, 'info')
        })
      })
  }

  onHandleChangeProfileAvatar(e) {
    if (e.target.files.length) {
      if (e.target.files[0].size < 800000) {
        this.setState({
          selectedFilePreview: URL.createObjectURL(e.target.files[0]),
          selectedFileRaw: e.target.files[0],
        })
        var file = e.target.files[0]
        var reader = new FileReader()
        reader.onloadend = function () {
          this.setState({ avatar: reader.result })
        }.bind(this)
        reader.readAsDataURL(file)
      }
    }
  }

  onHandleUpdateProfileAvatar() {
    this.props.objectsRequestHandler(
      REQ_PROFILE_AVATAR_UPDATE, {
      id: JSON.parse(localStorage.getItem('user')).id,
      params: this.state.selectedFileRaw,
    }, this.props.history)
      .then(() => {
        this.setState({
          init: true,
        }, () => {
          this.showToastify(<>
            <div className="cursor-pointer p-0 m-0 small">
              <h6>
                Live Poker Studio™ Settings
              </h6>
              <p className="mb-0">
                Settings have been updated successfully.
              </p>
            </div>
          </>, 'info')
        })
      })
  }

  onHandleChangeProfileKYCDocument1(e) {
    if (e.target.files.length) {
      if (e.target.files[0].size < 800000) {
        this.setState({
          selectedKYC1FilePreview: URL.createObjectURL(e.target.files[0]),
          selectedKYC1FileRaw: e.target.files[0],
        })
        var file = e.target.files[0]
        var reader = new FileReader()
        reader.onloadend = function () {
          this.setState({
            kyc_document_1: reader.result,
          })
        }.bind(this)
        reader.readAsDataURL(file)
      }
    }
  }

  onHandleUpdateProfileKYCDocument1() {
    this.props.objectsRequestHandler(
      REQ_PROFILE_KYC_1_UPDATE, {
      id: JSON.parse(localStorage.getItem('user')).id,
      params: this.state.selectedKYC1FileRaw,
    }, this.props.history)
      .then((res) => {
        this.setState({
          init: true,
        }, () => {
          this.showToastify(<>
            <div className="cursor-pointer p-0 m-0 small">
              <h6>
                Live Poker Studio™ Settings
              </h6>
              <p className="mb-0">
                Settings have been updated successfully.
              </p>
            </div>
          </>, 'info')
        })
      })
  }

  onValueChange(field, e) {
    this.setState({
      data: {
        ...this.state.data,
        profile: {
          ...this.state.data.profile,
          [field]: e.target.value,
        }
      }
    })
  }

  onDateChange(field, a, b) {
    this.setState({
      data: {
        ...this.state.data,
        profile: {
          ...this.state.data.profile,
          [field]: String(b),
        }
      }
    })
  }

  onNotificationsChange(field, e) {
    this.setState({
      data: {
        ...this.state.data,
        settings: {
          ...this.state.data.settings,
          [field]: e.target.checked,
        }
      }
    })
  }

  onSelectChange(field, e) {
    this.setState({
      data: {
        ...this.state.data,
        profile: {
          ...this.state.data.profile,
          [field]: e.label,
        }
      }
    })
  }

  onSelectChangeValue(field, e) {
    this.setState({
      data: {
        ...this.state.data,
        profile: {
          ...this.state.data.profile,
          [field]: e.value,
        }
      }
    })
  }

  onChangeAmount(field, value) {
    let amount = Number(value.replace(/[^0-9.-]+/g, ""))
    this.setState({
      data: {
        ...this.state.data,
        profile: {
          ...this.state.data.profile,
          [field]: amount,
        }
      }
    })
  }

  onHandleParseBirthdateData(data) {
    try {
      return JSON.parse(data)
    } catch {
      return data
    }
  }

  onHandleChangeCredentials(field, e) {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [field]: e.target.value,
      },
      passwordStrength: Number(mapRange(zxcvbn(this.state.credentials.new_password1).score, 0, 5, 0, 100)),
    }, () => {
      this.onHandleValidateCredentials()
    })
  }

  onHandleValidateCredentials() {
    this.setState({
      validOldPassword: this.state.credentials.old_password.length >= 4 ? true : false,
      validNewPassword1: this.state.passwordStrength >= 40 ? true : false,
      validNewPassword2: this.state.passwordStrength >= 40 && this.state.credentials.new_password1 === this.state.credentials.new_password2 ? true : false,
    }, () => {
      if (
        this.state.validOldPassword &&
        this.state.validNewPassword1 &&
        this.state.validNewPassword2
      ) {
        this.setState({
          validChangePasswordRequest: true,
        })
      } else {
        this.setState({
          validChangePasswordRequest: false,
        })
      }
    })
  }

  onHandleChangePassword() {
    new Promise((resolve, reject) => {
      this.onHandleSubmitReCAPTCHAToken().then(res => {
        if (this.state.credentials.recaptcha !== '') {
          var form = {
            old_password: this.state.credentials.old_password,
            new_password1: this.state.credentials.new_password1,
            new_password2: this.state.credentials.new_password2,
          }
          this.props.objectsRequestHandler(
            'REQ_AUTHDRF_CHANGE_PASSWORD', {
            params: JSON.stringify(form),
          }, this.props.history)
            .then(() => {
              this.setState({
                init: true,
              }, () => {
                this.showToastify(<>
                  <div className="cursor-pointer p-0 m-0 small">
                    <h6>
                      Live Poker Studio™ Notification
                    </h6>
                    <p className="mb-0">
                      Password has been successfully changed.
                    </p>
                  </div>
                </>, 'info')
              })
            }).catch(() => {
              this.setState({
                init: true,
              }, () => {
                this.showToastify(<>
                  <div className="cursor-pointer p-0 m-0 small">
                    <h6>
                      Live Poker Studio™ Notification
                    </h6>
                    <p className="mb-0">
                      Failed to change password.
                    </p>
                  </div>
                </>, 'danger')
              })
            })
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  onHandleSubmitReCAPTCHAToken = async () => {
    var token = await this.recaptchaRef.current.executeAsync()
    this.setState({
      credentials: {
        ...this.state.credentials,
        recaptcha: token,
      }
    })
  }

  onTogglePasswordVisibility(field) {
    this.setState({
      [field]: !this.state[field],
    })
  }

  onHandleSetInputFocus(e, pos) {
    if (pos === 'old_password') {
      if (e.key === 'Enter') {
        e.stopPropagation()
        e.preventDefault()
        ReactDOM.findDOMNode(this.newPassword1Ref).focus()
      }
      if (e.key === 'Tab') {
        e.stopPropagation()
        e.preventDefault()
        ReactDOM.findDOMNode(this.newPassword1Ref).focus()
      }
    }
    if (pos === 'new_password1') {
      if (e.key === 'Enter') {
        ReactDOM.findDOMNode(this.newPassword2Ref).focus()
      }
      if (e.key === 'Tab') {
        e.stopPropagation()
        e.preventDefault()
        ReactDOM.findDOMNode(this.newPassword2Ref).focus()
      }
    }
    if (pos === 'new_password2') {
      if (e.key === 'Enter') {
        ReactDOM.findDOMNode(this.oldPasswordRef).focus()
      }
      if (e.key === 'Tab') {
        e.stopPropagation()
        e.preventDefault()
        ReactDOM.findDOMNode(this.oldPasswordRef).focus()
      }
    }
  }

  onRenderKYC1Filename() {
    if (this.state.data.profile.kyc_document_1) {
      return this.state.data.profile.kyc_document_1.split('\\').pop().split('/').pop()
    } else {
      return ''
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
    return (
      <div>

        {/* Wallet Slider */}
        <WalletSlider
          {...this.state} {...this.props} />
        {/* / Wallet Slider */}

        <h5 className="font-weight-bold py-2 mb-2 d-flex justify-content-between align-items-center">
          <div>
            <span>
              Account Settings
            </span>
            <span className="my-0">
              <Badge
                pill variant="danger"
                className="text-small font-weight-bold ml-2">
                Beta
              </Badge>
            </span>
          </div>

          <div>
            <Button
              size="md"
              variant="light"
              className="ml-auto"
              onClick={this.onSubmitChanges}>
              <i className="ion ion-ios-save text-body mr-2"></i>
              <span>Save Settings</span>
            </Button>
            <Button
              size="md"
              variant="light"
              className="ml-2"
              onClick={this.onHandleRefreshItems}>
              <i className="fas fa-sync-alt text-body mr-2"></i>
              <span>Reset</span>
            </Button>
          </div>
        </h5>

        {this.state.data.profile && this.state.data.settings && (
          <>
            <Card className="mb-2" style={{
              borderTopRightRadius: "15px",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
            }}>
              <Row noGutters className="row-bordered row-border-light">
                <Col md={3} className="pt-0">
                  <Nav
                    className="account-settings-links list-group list-group-flush"
                    onSelect={curTab => this.setState({ curTab })}
                    activeKey={this.state.curTab}>
                    <Nav.Link
                      as={ListGroup.Item}
                      eventKey="general"
                      className="list-group-item-action cursor-pointer font-weight-bold">
                      General
                    </Nav.Link>

                    <Nav.Link
                      as={ListGroup.Item}
                      eventKey="password"
                      className="list-group-item-action cursor-pointer font-weight-bold">
                      Change Password
                    </Nav.Link>

                    <Nav.Link
                      as={ListGroup.Item}
                      eventKey="payment"
                      className="list-group-item-action cursor-pointer font-weight-bold">
                      Payments & Notifications
                    </Nav.Link>

                    <Nav.Link
                      as={ListGroup.Item}
                      eventKey="preferences"
                      className="list-group-item-action cursor-pointer font-weight-bold">
                      Preferences
                    </Nav.Link>

                    <Nav.Link
                      as={ListGroup.Item}
                      eventKey="account"
                      className="list-group-item-action cursor-pointer font-weight-bold">
                      Account Security
                    </Nav.Link>
                  </Nav>
                </Col>

                {this.state.curTab === 'general' && (
                  <>
                    <Col md={9}>
                      <Card.Body className="media align-items-center">
                        <>
                          {this.state.avatar
                            ? <img
                              src={`${this.state.avatar}`}
                              className="d-block ui-w-80 rounded-circle"
                              alt="Avatar" style={{
                                objectFit: "cover",
                                width: 80,
                                height: 80,
                                filter: "drop-shadow(0px 0px 5px rgba(0,0,0,1))",
                              }} />
                            : <img
                              src={`${process.env.PUBLIC_URL}/img/avatars/avatar-1.png`}
                              className="d-block ui-w-80 rounded-circle"
                              alt="Avatar" style={{
                                objectFit: "cover",
                                width: 80,
                                height: 80,
                                filter: "drop-shadow(0px 0px 5px rgba(0,0,0,1))",
                              }} />}
                          <div className="media-body ml-4">
                            <input
                              id='selectNewPhoto' type="file"
                              accept=".jpg,.png" hidden
                              onChange={(e) => { this.onHandleChangeProfileAvatar(e) }} />
                            <Button
                              variant="outline-primary"
                              onClick={() => { document.getElementById("selectNewPhoto").click() }}>
                              Select new photo
                            </Button> &nbsp;
                            <Button
                              variant="outline-success md-btn-flat"
                              onClick={this.onHandleUpdateProfileAvatar}>
                              <i className="fas fa-upload mr-2"></i>
                              <span>Upload</span>
                            </Button>
                            <div className="text-light small mt-1">
                              Allowed JPG. Max size of 800K
                            </div>
                          </div>
                        </>
                      </Card.Body>

                      <hr className="border-light m-0" />

                      {!this.state.isFetching
                        ? <>
                          <Card.Body>
                            <Row>
                              <Col>
                                <Form.Group>
                                  <Form.Label>First Name</Form.Label>
                                  <Form.Control
                                    placeholder="Please enter your first name"
                                    isValid={this.state.data.profile.first_name !== ''}
                                    value={this.state.data.profile.first_name || ''}
                                    onChange={e => this.onValueChange('first_name', e)}
                                    maxLength="64" />
                                </Form.Group>
                              </Col>

                              <Col>
                                <Form.Group>
                                  <Form.Label>Last Name</Form.Label>
                                  <Form.Control
                                    placeholder="Please enter your last name"
                                    isValid={this.state.data.profile.last_name !== ''}
                                    value={this.state.data.profile.last_name || ''}
                                    onChange={e => this.onValueChange('last_name', e)}
                                    maxLength="64" />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Form.Group>
                              <Form.Label>Date of Birth</Form.Label>
                              <Flatpickr
                                placeholder={'Click to select'}
                                value={this.state.data.profile.date_of_birth || ''}
                                onChange={(a, b) => { this.onDateChange('date_of_birth', a, b) }}
                                options={{
                                  altInput: true,
                                  mode: 'single',
                                  animate: true,
                                  dateFormat: 'd/m/Y',
                                  altFormat: 'd/m/Y',
                                  minDate: new Date(moment().subtract(500, "years")),
                                  maxDate: new Date(moment().subtract(18, "years")),
                                }}
                              />
                            </Form.Group>

                            <Row>
                              <Col md={4}>
                                <Form.Group>
                                  <Form.Label>Country</Form.Label>
                                  <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    options={this.state.countryOptions}
                                    value={this.state.countryOptions.find(element => element.label === this.state.data.profile.country) || ''}
                                    onChange={(e) => { this.onSelectChange('country', e) }}
                                    isClearable={false}
                                    isSearchable={true}
                                    isDisabled={false}
                                    theme={theme => ({
                                      ...theme,
                                      borderRadius: 0,
                                      colors: {
                                        ...theme.colors,
                                        primary25: 'darkgrey',
                                        primary: 'black',
                                      },
                                    })} />
                                </Form.Group>
                              </Col>

                              <Col md={8}>
                                <Form.Group>
                                  <Form.Label>City</Form.Label>
                                  <Form.Control
                                    placeholder="Please enter your city"
                                    value={this.state.data.profile.city || ''}
                                    onChange={e => this.onValueChange('city', e)}
                                    maxLength="64" />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row>
                              <Col md={4}>
                                <Form.Group>
                                  <Form.Label>ZIP Code</Form.Label>
                                  <Form.Control
                                    placeholder="Please enter your zip code"
                                    value={this.state.data.profile.zip_code || ''}
                                    onChange={e => this.onValueChange('zip_code', e)}
                                    maxLength="64" />
                                </Form.Group>
                              </Col>

                              <Col md={8}>
                                <Form.Group>
                                  <Form.Label>Address</Form.Label>
                                  <Form.Control
                                    placeholder="Please enter your address"
                                    value={this.state.data.profile.address || ''}
                                    onChange={e => this.onValueChange('address', e)}
                                    maxLength="128" />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Form.Group className="mb-4">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                disabled
                                placeholder="Please enter a valid mail address"
                                value={this.state.data.profile.email || ''}
                                onChange={e => this.onValueChange('email', e)}
                                maxLength="128" />
                            </Form.Group>

                            <hr className="border-light m-0" />

                            <Row className="py-4">
                              <Col md={4}>
                                <Form.Group className="mb-2">
                                  <Form.Label>Deposit Limit</Form.Label>
                                  <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    options={this.depositOptions1}
                                    value={this.depositOptions1.find(element => element.label === this.state.data.profile.deposit_limit) || ''}
                                    onChange={(e) => { this.onSelectChange('deposit_limit', e) }}
                                    isClearable={false}
                                    isSearchable={true}
                                    isDisabled={false}
                                    theme={theme => ({
                                      ...theme,
                                      borderRadius: 0,
                                      colors: {
                                        ...theme.colors,
                                        primary25: 'darkgrey',
                                        primary: 'black',
                                      },
                                    })} />
                                </Form.Group>
                              </Col>

                              <Col md={8}>
                                <Form.Group className="mb-2">
                                  <Form.Label>Deposit Amount</Form.Label>
                                  <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    options={this.depositOptions2}
                                    value={this.depositOptions2.find(element => element.value === this.state.data.profile.deposit_amount) || ''}
                                    onChange={(e) => { this.onSelectChangeValue('deposit_amount', e) }}
                                    isClearable={false}
                                    isSearchable={true}
                                    isDisabled={this.state.data.profile.deposit_limit === 'No Limit'}
                                    theme={theme => ({
                                      ...theme,
                                      borderRadius: 0,
                                      colors: {
                                        ...theme.colors,
                                        primary25: 'darkgrey',
                                        primary: 'black',
                                      },
                                    })} />
                                </Form.Group>
                              </Col>
                            </Row>

                            <hr className="border-light m-0" />

                            <Form.Label className="pt-4 mb-2">ID Verification</Form.Label>
                            <Card.Body className="media align-items-center px-0 pb-4 pt-0">
                              <>
                                {this.state.kyc_document_1
                                  ? <img
                                    src={`${this.state.kyc_document_1}`}
                                    className="d-block ui-w-80"
                                    alt="ID Document" style={{
                                      objectFit: "cover",
                                      width: 80,
                                      height: 80,
                                      filter: "drop-shadow(0px 0px 5px rgba(0,0,0,1))",
                                    }} />
                                  : <img
                                    src={`${process.env.PUBLIC_URL}/img/avatars/avatar-1.png`}
                                    className="d-block ui-w-80"
                                    alt="ID Document" style={{
                                      objectFit: "cover",
                                      width: 80,
                                      height: 80,
                                      filter: "drop-shadow(0px 0px 5px rgba(0,0,0,1))",
                                    }} />}

                                <div className="media-body ml-4">
                                  <div className="mb-2">
                                    <input
                                      id='selectNewKYCDocument1' type="file"
                                      accept=".jpg,.png" hidden
                                      onChange={(e) => { this.onHandleChangeProfileKYCDocument1(e) }} />
                                    <Button
                                      variant="outline-primary"
                                      onClick={() => { document.getElementById("selectNewKYCDocument1").click() }}>
                                      Select new document
                                    </Button> &nbsp;
                                    <Button
                                      variant="outline-success md-btn-flat"
                                      onClick={this.onHandleUpdateProfileKYCDocument1}>
                                      <i className="fas fa-upload mr-2"></i>
                                      <span>Upload</span>
                                    </Button>
                                    <div className="text-light small mt-1">
                                      Allowed JPG. Max size of 800K
                                    </div>
                                  </div>
                                  {this.state.data.profile.kyc_document_1 && (
                                    <div>
                                      <Form.Control
                                        disabled
                                        size="sm"
                                        placeholder="No document found"
                                        value={this.onRenderKYC1Filename()}
                                        onChange={e => this.onValueChange('kyc_document_1', e)}
                                        maxLength="256" />
                                    </div>
                                  )}
                                </div>
                              </>
                            </Card.Body>

                            {this.state.showProfileWarning && (
                              <>
                                <hr className="border-light m-0" />

                                <div
                                  className="callout callout-primary callout-sm my-4 cursor-pointer"
                                  onClick={() => { this.setState({ showProfileWarning: false, }) }}>
                                  <h6>Notification</h6>
                                  <p>
                                    In order to process withdrawal requests successfully and without interruption, we need your <strong>complete</strong> contact information. Please ensure the above information is correct.
                                  </p>
                                  <hr />
                                  <p>If you have any questions or suggestions, please contact our <strong>Customer Support Team</strong>.</p>
                                </div>
                              </>
                            )}

                            <hr className="border-light m-0" />

                            <h6 className="text-left text-lightest text-muted text-tiny mt-4 mb-4">
                              Update your personal information and manage your notification and payment information settings. New players can track their authorization status here.<br />
                              All transactions on our web site are encrypted using Secure Sockets Layer (SSL) and 256-bit AES-based encryption to ensure your personal information <br />
                              is safe from the moment you sign up as a member and through out any transaction that involves the transfer of information.
                            </h6>
                          </Card.Body>
                        </>
                        : <>
                          <Card.Body>
                            <Row>
                              <Col className="d-flex">
                                <Card.Body className="media align-items-center justify-content-center">
                                  <div>
                                    <ResourceLoaderQ
                                      height="5rem" width="5rem" />
                                  </div>
                                </Card.Body>
                              </Col>
                            </Row>
                          </Card.Body>
                        </>}
                    </Col>
                  </>
                )}

                {this.state.curTab === 'password' && (
                  <>
                    <Col md={9}>
                      <Card.Body className="pb-2">
                        <Form.Group>
                          <Form.Label className="d-flex justify-content-between align-items-end">
                            <div>Current Password</div>
                            <span className="d-block small font-weight-bold text-body">
                              {!this.state.validOldPassword && (
                                <>
                                  {this.state.validOldPasswordHint}
                                </>
                              )}
                            </span>
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              ref={c => (this.oldPasswordRef = c)}
                              type={this.state.showOldPassword ? "text" : "password"}
                              placeholder="Current Password"
                              value={this.state.credentials.old_password}
                              isValid={this.state.validOldPassword}
                              onChange={e => this.onHandleChangeCredentials('old_password', e)}
                              onKeyDown={(e) => { this.onHandleSetInputFocus(e, 'old_password') }} />
                            <InputGroup.Append>
                              <Button
                                variant="default"
                                onClick={() => { this.onTogglePasswordVisibility('showOldPassword') }}>
                                {this.state.showOldPassword
                                  ? (<span className="ion ion-md-eye-off"></span>)
                                  : (<span className="ion ion-md-eye"></span>)}
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className="d-flex justify-content-between align-items-end">
                            <div>New Password</div>
                            <span className="d-block small font-weight-bold text-body">
                              {!this.state.validNewPassword1 && (
                                <>
                                  {this.state.validNewPassword1Hint}
                                </>
                              )}
                            </span>
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              ref={c => (this.newPassword1Ref = c)}
                              type={this.state.showNewPassword1 ? "text" : "password"}
                              placeholder="New Password"
                              value={this.state.credentials.new_password1}
                              isValid={this.state.validNewPassword1}
                              onChange={e => this.onHandleChangeCredentials('new_password1', e)}
                              onKeyDown={(e) => { this.onHandleSetInputFocus(e, 'new_password1') }} />
                            <InputGroup.Append>
                              <Button
                                variant="default"
                                onClick={() => { this.onTogglePasswordVisibility('showNewPassword1') }}>
                                {this.state.showNewPassword1
                                  ? (<span className="ion ion-md-eye-off"></span>)
                                  : (<span className="ion ion-md-eye"></span>)}
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                          <Form.Text
                            className="text-muted">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                          </Form.Text>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className="d-flex justify-content-between align-items-end">
                            <div>Repeat New Password</div>
                            <span className="d-block small font-weight-bold text-body">
                              {!this.state.validNewPassword2 && (
                                <>
                                  {this.state.validNewPassword2Hint}
                                </>
                              )}
                            </span>
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              ref={c => (this.newPassword2Ref = c)}
                              type={this.state.showNewPassword2 ? "text" : "password"}
                              placeholder="New Password (again)"
                              value={this.state.credentials.new_password2}
                              isValid={this.state.validNewPassword2}
                              onChange={e => this.onHandleChangeCredentials('new_password2', e)}
                              onKeyDown={(e) => { this.onHandleSetInputFocus(e, 'new_password2') }} />
                            <InputGroup.Append>
                              <Button
                                variant="default"
                                onClick={() => { this.onTogglePasswordVisibility('showNewPassword2') }}>
                                {this.state.showNewPassword2
                                  ? (<span className="ion ion-md-eye-off"></span>)
                                  : (<span className="ion ion-md-eye"></span>)}
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                        </Form.Group>

                        <div className="my-4">
                          <Button
                            variant="instagram"
                            disabled={!this.state.validChangePasswordRequest}
                            onClick={this.onHandleChangePassword}
                            className="font-weight-bold">
                            Reset Password
                          </Button>
                        </div>

                        <hr className="border-light m-0" />

                        <h6 className="text-left text-lightest text-muted text-tiny mt-3 mb-3">
                          Update your personal information and manage your notification and payment information settings. New players can track their authorization status here.<br />
                          All transactions on our web site are encrypted using Secure Sockets Layer (SSL) and 256-bit AES-based encryption to ensure your personal information <br />
                          is safe from the moment you sign up as a member and through out any transaction that involves the transfer of information.
                        </h6>
                      </Card.Body>
                    </Col>
                  </>
                )}

                {this.state.curTab === 'payment' && (
                  <>
                    <Col md={9}>
                      <Card.Body className="pb-2">

                        <Form.Group as={Row}>
                          <Form.Label column sm={2} className="text-sm-right">
                            Deposit Limit
                          </Form.Label>
                          <Col sm={6} className="form-label col-form-label col-sm-6">
                            <label className="switcher switcher-sm">
                              <input
                                disabled={true}
                                type="checkbox"
                                className="switcher-input"
                                checked={this.state.data.settings.payment_option_1}
                                onChange={e => this.onNotificationsChange('payment_option_1', e)} />
                              <span className="switcher-indicator">
                                <span className="switcher-yes"></span>
                                <span className="switcher-no"></span>
                              </span>
                            </label>
                            <Form.Text className="text-muted">
                              Limit your deposits for one day, seven days or thirty days... you decide. This simple tool will limit the amount you are able to deposit into your account. You can decide the amount you wish to set from a range of options. Deposit limits can help you manage your spending if you ensure you set responsible limits which indicate funds which you can afford to lose.
                            </Form.Text>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={2} className="text-sm-right">
                            Payment Notifications
                          </Form.Label>
                          <Col sm={6} className="form-label col-form-label col-sm-6">
                            <label className="switcher switcher-sm">
                              <input
                                type="checkbox"
                                className="switcher-input"
                                checked={this.state.data.settings.payment_option_2}
                                onChange={e => this.onNotificationsChange('payment_option_2', e)} />
                              <span className="switcher-indicator">
                                <span className="switcher-yes"></span>
                                <span className="switcher-no"></span>
                              </span>
                            </label>
                            <Form.Text className="text-muted">
                              Allow Payment Notifications to receive notifications for events related to Live Poker Studio™ transactions. Use Payment Notifications to update your order states and process transactions.
                            </Form.Text>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={2} className="text-sm-right">
                            Request Tracking
                          </Form.Label>
                          <Col sm={6} className="form-label col-form-label col-sm-6">
                            <label className="switcher switcher-sm">
                              <input
                                type="checkbox"
                                className="switcher-input"
                                checked={this.state.data.settings.payment_option_3}
                                onChange={e => this.onNotificationsChange('payment_option_3', e)} />
                              <span className="switcher-indicator">
                                <span className="switcher-yes"></span>
                                <span className="switcher-no"></span>
                              </span>
                            </label>
                            <Form.Text className="text-muted">
                              When you enable request tracking, Live Poker Studio™ logs all sign in attempts, successful and unsuccessful. You can specify the maximum number of unsuccessful sign in attempts. If a user exceeds the maximum number of unsuccessful attempts, the status of the user record is changed to Blocked.
                            </Form.Text>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={2} className="text-sm-right">
                            Unrecognized Logins
                          </Form.Label>
                          <Col sm={6} className="form-label col-form-label col-sm-6">
                            <label className="switcher switcher-sm">
                              <input
                                disabled={true}
                                type="checkbox"
                                className="switcher-input"
                                checked={this.state.data.settings.payment_option_4}
                                onChange={e => this.onNotificationsChange('payment_option_4', e)} />
                              <span className="switcher-indicator">
                                <span className="switcher-yes"></span>
                                <span className="switcher-no"></span>
                              </span>
                            </label>
                            <Form.Text className="text-muted">
                              Improve the security of your account by getting alerts when someone tries logging in to your account from an unknown device or browser.
                            </Form.Text>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={2} className="text-sm-right">
                            Promotional Emails
                          </Form.Label>
                          <Col sm={6} className="form-label col-form-label col-sm-6">
                            <label className="switcher switcher-sm">
                              <input
                                type="checkbox"
                                className="switcher-input"
                                checked={this.state.data.settings.payment_option_5}
                                onChange={e => this.onNotificationsChange('payment_option_5', e)} />
                              <span className="switcher-indicator">
                                <span className="switcher-yes"></span>
                                <span className="switcher-no"></span>
                              </span>
                            </label>
                            <Form.Text className="text-muted">
                              You are currently subscribed to receive newsletters for deals and personalized product recommendations.
                            </Form.Text>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={2} className="text-sm-right">
                            Store and/or access information on a device
                          </Form.Label>
                          <Col sm={6} className="form-label col-form-label col-sm-6">
                            <label className="switcher switcher-sm">
                              <input
                                type="checkbox"
                                className="switcher-input"
                                checked={this.state.data.settings.payment_option_6}
                                onChange={e => this.onNotificationsChange('payment_option_6', e)} />
                              <span className="switcher-indicator">
                                <span className="switcher-yes"></span>
                                <span className="switcher-no"></span>
                              </span>
                            </label>
                            <Form.Text className="text-muted">
                              Vendors can: store and access information on the device such as cookies and device identifiers presented to a user.
                            </Form.Text>
                          </Col>
                        </Form.Group>

                        <hr className="border-light m-0" />

                        <h6 className="text-left text-lightest text-muted text-tiny mt-3 mb-3">
                          Update your personal information and manage your notification and payment information settings. New players can track their authorization status here.<br />
                          All transactions on our web site are encrypted using Secure Sockets Layer (SSL) and 256-bit AES-based encryption.
                        </h6>

                      </Card.Body>
                    </Col>
                  </>
                )}

                {this.state.curTab === 'preferences' && (
                  <>
                    <Col md={9}>
                      <Card.Body className="pb-2">
                        <Form>
                          <Form.Group as={Row}>
                            <Form.Label column sm={2} className="text-sm-right">
                              Allow Live Poker Studio™ to use first party cookies
                            </Form.Label>
                            <Col sm={6} className="form-label col-form-label col-sm-6">
                              <label className="switcher switcher-sm">
                                <input
                                  type="checkbox"
                                  className="switcher-input"
                                  checked={this.state.data.settings.app_option_1}
                                  onChange={e => this.onNotificationsChange('app_option_1', e)} />
                                <span className="switcher-indicator">
                                  <span className="switcher-yes"></span>
                                  <span className="switcher-no"></span>
                                </span>
                              </label>
                              <Form.Text className="text-muted">
                                This toggle enables the use of cookies for making advertising more relevant. It will support the sourcing of high-quality content on this site. If you don't allow this use, then ads shown to you may be less relevant.
                              </Form.Text>
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm={2} className="text-sm-right">
                              Personalised ads and content
                            </Form.Label>
                            <Col sm={6} className="form-label col-form-label col-sm-6">
                              <label className="switcher switcher-sm">
                                <input
                                  type="checkbox"
                                  className="switcher-input"
                                  checked={this.state.data.settings.app_option_2}
                                  onChange={e => this.onNotificationsChange('app_option_2', e)} />
                                <span className="switcher-indicator">
                                  <span className="switcher-yes"></span>
                                  <span className="switcher-no"></span>
                                </span>
                              </label>
                              <Form.Text className="text-muted">
                                Ads and content can be personalised based on a profile. More data can be added to better personalise ads and content. Ad and content performance can be measured. Insights about the audiences who saw the ads and content can be derived.
                              </Form.Text>
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm={2} className="text-sm-right">
                              Develop and improve products
                            </Form.Label>
                            <Col sm={6} className="form-label col-form-label col-sm-6">
                              <label className="switcher switcher-sm">
                                <input
                                  type="checkbox"
                                  className="switcher-input"
                                  checked={this.state.data.settings.app_option_3}
                                  onChange={e => this.onNotificationsChange('app_option_3', e)} />
                                <span className="switcher-indicator">
                                  <span className="switcher-yes"></span>
                                  <span className="switcher-no"></span>
                                </span>
                              </label>
                              <Form.Text className="text-muted">
                                To do basic ad selection vendors can: use real-time information about the context in which the ad will be shown, to show the ad, including information about the content and the device, such as: device type and capabilities, user agent, URL, IP address and use the user's non-precise geolocation data.
                                Vendors cannot: create a personalised ads profile using this information for the selection of future ads.
                              </Form.Text>
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm={2} className="text-sm-right">
                              Precise geolocation data, and identification through device scanning
                            </Form.Label>
                            <Col sm={6} className="form-label col-form-label col-sm-6">
                              <label className="switcher switcher-sm">
                                <input
                                  type="checkbox"
                                  className="switcher-input"
                                  checked={this.state.data.settings.user_option_1}
                                  onChange={e => this.onNotificationsChange('user_option_1', e)} />
                                <span className="switcher-indicator">
                                  <span className="switcher-yes"></span>
                                  <span className="switcher-no"></span>
                                </span>
                              </label>
                              <Form.Text className="text-muted">
                                Precise geolocation and information about device characteristics can be used.
                              </Form.Text>
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm={2} className="text-sm-right">
                              Legitimate interest purposes
                            </Form.Label>
                            <Col sm={6} className="form-label col-form-label col-sm-6">
                              <label className="switcher switcher-sm">
                                <input
                                  type="checkbox"
                                  className="switcher-input"
                                  checked={this.state.data.settings.user_option_2}
                                  onChange={e => this.onNotificationsChange('user_option_2', e)} />
                                <span className="switcher-indicator">
                                  <span className="switcher-yes"></span>
                                  <span className="switcher-no"></span>
                                </span>
                              </label>
                              <Form.Text className="text-muted">
                                Advertising partners may declare that they have a legitimate interest in using data from certain purposes, special purposes, features and special features. This information will be shared with these advertising partners by default.
                              </Form.Text>
                            </Col>
                          </Form.Group>

                          <Form.Group as={Row}>
                            <Form.Label column sm={2} className="text-sm-right">
                              Store and/or access information on a device
                            </Form.Label>
                            <Col sm={6} className="form-label col-form-label col-sm-6">
                              <label className="switcher switcher-sm">
                                <input
                                  type="checkbox"
                                  className="switcher-input"
                                  checked={this.state.data.settings.user_option_3}
                                  onChange={e => this.onNotificationsChange('user_option_3', e)} />
                                <span className="switcher-indicator">
                                  <span className="switcher-yes"></span>
                                  <span className="switcher-no"></span>
                                </span>
                              </label>
                              <Form.Text className="text-muted">
                                Vendors can: store and access information on the device such as cookies and device identifiers presented to a user.
                              </Form.Text>
                            </Col>
                          </Form.Group>
                        </Form>

                        <hr className="border-light m-0" />

                        <h6 className="text-left text-lightest text-muted text-tiny mt-3 mb-3">
                          Update your personal information and manage your notification and payment information settings. New players can track their authorization status here.<br />
                          All transactions on our web site are encrypted using Secure Sockets Layer (SSL) and 256-bit AES-based encryption.
                        </h6>
                      </Card.Body>
                    </Col>
                  </>
                )}

                {this.state.curTab === 'account' && (
                  <>
                    <Col md={9}>
                      <Card.Body className="pb-0">
                        <h6 className="mb-4">Download Your Data</h6>
                        <div className="mb-4">
                          <h6 className="text-left text-lighter text-body small mb-2">
                            Download your activity log or your entire payment history.
                          </h6>

                          <div className="d-flex">
                            <Button
                              block size="lg"
                              variant="light"
                              className="d-flex align-items-center justify-content-center mt-2"
                              onClick={this.onDownloadActivityLog}>
                              <span className="ion ion-md-download mr-2"></span>
                              <span className="font-weight-bold">Download Activity Log</span>
                            </Button>
                            <Button
                              block size="lg"
                              variant="light"
                              className="d-flex align-items-center justify-content-center ml-2 mt-2"
                              onClick={this.onDownloadActivityLog}>
                              <span className="ion ion-md-download mr-2"></span>
                              <span className="font-weight-bold">Download Payments History</span>
                            </Button>
                          </div>
                        </div>
                      </Card.Body>

                      <hr className="border-light m-0" />

                      <Card.Body className="pb-0">
                        <h6 className="mb-4">Account Security</h6>
                        <div className="mb-4">
                          <h6 className="text-left text-lighter text-body small mb-2">
                            Temporarily deactivate your account or delete your account
                          </h6>

                          <div className="d-flex">
                            <Button
                              block size="lg"
                              variant="darker2"
                              className="d-flex align-items-center justify-content-center mt-2"
                              onClick={() => this.props.objectsRequestHandler(REQ_DEACTIVATE_ACCOUNT, null, this.props.history)}>
                              <span className="ion ion-ios-switch text-danger mr-2"></span>
                              <span className="font-weight-bold">Deactivate Account</span>
                            </Button>
                            <Button
                              block size="lg"
                              variant="darker2"
                              className="d-flex align-items-center justify-content-center ml-2 mt-2"
                              onClick={this.onHandleDeleteAccount}>
                              <span className="fas fa-times-circle text-danger mr-2"></span>
                              <span className="font-weight-bold">Request Account Deletion</span>
                            </Button>
                          </div>
                        </div>

                        <hr className="border-light m-0" />

                        <h6 className="text-left text-lightest text-muted text-tiny mt-3 mb-3">
                          Update your personal information and manage your notification and payment information settings. New players can track their authorization status here.
                          All transactions on our web site are encrypted using Secure Sockets Layer (SSL) and 256-bit AES-based encryption to ensure your personal information
                          is safe from the moment you sign up as a member and through out any transaction that involves the transfer of information.
                        </h6>

                      </Card.Body>
                    </Col>
                  </>
                )}

              </Row>
            </Card>
          </>
        )}

        <ReCAPTCHA
          ref={this.recaptchaRef}
          size={process.env.REACT_APP_RECAPTCHA_CLIENT_SIZE}
          sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY} />

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
  avatar: state.objects.avatar,
  settings: state.objects.profile.settings,
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(AccountSettings))