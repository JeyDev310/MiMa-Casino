import React, { Component } from 'react'
import { Button, ButtonGroup, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

import MaskedInput from 'react-text-mask'
import ReCAPTCHA from 'react-google-recaptcha'

import * as numeral from 'numeral'
import * as textMaskAddons from 'text-mask-addons/dist/textMaskAddons'

import ResourceLoaderB from '../../utilities/loaders/ResourceLoaderB'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../../store/actions'

import '../../assets/css/views.css'

class WalletWithdrawals extends Component {

  constructor(props) {
    super(props)

    this.recaptchaRef = React.createRef()

    this.onHandleValidateForm = this.onHandleValidateForm.bind(this)

    this.state = {
      init: true,
      recaptcha: '',
      values: [null, 'option1', null,],
      methodSelected: false,
      selectedProvider: '',
      providerType: null,
      validRequest: false,
      witAmount: false,
      witAmountDisplay: "",
      witAmountCleared: 0,
      witAmountValid: false,
      witCardName: '',
      witCardNameValid: false,
      witCardNumber: '',
      witCardNumberValid: false,
      witExpiryDate: '',
      witExpiryDateValid: false,
      witCardCVC: '',
      witCardCVCValid: false,
      witNotification: false,
      witComment: '',
      projectedBalance: 0,
      isFetching: false,
    }

    this.methodOptions = [
      { index: 0, value: 'option1', label: 'VISA', provider: 'remitex', imagePath: 'r-select-visa.png', type: 'fiat', },
      { index: 1, value: 'option2', label: 'MasterCard', provider: 'remitex', imagePath: 'r-select-mastercard.png', type: 'fiat', },
      { index: 2, value: 'option3', label: 'Bitcoin', provider: 'alphapo', imagePath: 'r-select-bitcoin.png', type: 'crypto', },
    ]
  }

  handleChangeSelectProvider(option) {
    this.setState({
      methodSelected: true,
      selectedProvider: option.provider,
      selectedIndex: option.index,
      providerType: option.type,
    }, () => {
      this.setState({
        validRequest: false,
        witAmount: false,
        witAmountDisplay: "",
        witAmountCleared: 0,
        witAmountValid: false,
        witCardName: '',
        witCardNameValid: false,
        witCardNumber: '',
        witCardNumberValid: false,
        witExpiryDate: '',
        witExpiryDateValid: false,
        witCardCVC: '',
        witCardCVCValid: false,
        witNotification: false,
        witComment: '',
        projectedBalance: 0,
        isFetching: false,
      })
    })
  }

  onHandleChangeDepositAmount(value) {
    let amount = Number(value.replace(/[^0-9.-]+/g, ""))
    this.setState({
      witAmountDisplay: value,
      witAmountCleared: amount,
    }, () => {
      try {
        if (
          Number(amount) >= 100 &&
          Number(amount) <= Number(100000) &&
          Number(amount) <= Number(this.props.wallet.live_deposit)
        ) {
          this.setState({
            witAmountValid: true,
            projectedBalance: Number(this.props.wallet.live_deposit - amount),
          }, () => {
            this.onHandleValidateForm()
          })
        } else {
          this.setState({
            witAmountValid: false,
            projectedBalance: null,
          }, () => {
            this.onHandleValidateForm()
          })
        }
      } catch {
        this.setState({
          witAmountValid: false,
          projectedBalance: null,
        }, () => {
          this.onHandleValidateForm()
        })
      }
    })
  }

  onHandleChangeCardholderName(e) {
    this.setState({
      witCardName: e,
    }, () => {
      this.setState({
        witCardNameValid: this.state.witCardName.length >= 4 ? true : false,
      }, () => {
        this.onHandleValidateForm()
      })
    })
  }

  onHandleChangeCreditCardNumber(e) {
    this.setState({
      witCardNumber: e,
    }, () => {
      this.setState({
        witCardNumberValid: this.state.witCardNumber.length >= 10 ? true : false,
      }, () => {
        this.onHandleValidateForm()
      })
    })
  }

  onHandleChangeExpiryDate(e) {
    this.setState({
      witExpiryDate: e,
    }, () => {
      this.setState({
        witExpiryDateValid: this.state.witExpiryDate.length >= 4 ? true : false,
      }, () => {
        this.onHandleValidateForm()
      })
    })
  }

  onHandleChangeCVC(e) {
    this.setState({
      witCardCVC: e,
    }, () => {
      this.setState({
        witCardCVCValid: this.state.witCardCVC.length >= 3 ? true : false,
      }, () => {
        this.onHandleValidateForm()
      })
    })
  }

  onHandleChangeNotification(e) {
    this.setState({
      witNotification: e.target.checked,
    }, () => {
      this.onHandleValidateForm()
    })
  }

  onHandleChangeComment(e) {
    this.setState({
      witComment: e,
    })
  }

  onHandleSubmitWithdrawalRequest(e) {
    this.prevent(e)
    if (
      this.state.validRequest &&
      this.state.witAmountValid &&
      this.state.witCardNameValid &&
      this.state.witCardNumberValid &&
      this.state.witExpiryDateValid &&
      this.state.witCardCVCValid
    ) {
      this.setState({
        isFetching: true,
      }, () => {
        new Promise((resolve, reject) => {
          this.onHandleSubmitReCAPTCHAToken().then(res => {
            if (this.state.recaptcha !== '') {
              var amount = this.state.witAmountCleared
              var form = {
                id: JSON.parse(localStorage.getItem('user')).id,
                recaptcha: this.state.recaptcha,
                provider: this.state.selectedProvider,
                amount: Number(amount),
                currency: 'USD',
                card_holder: this.state.witCardName,
                card_number: this.state.witCardNumber,
                card_month: this.state.witCardNumber,
                card_year: this.state.witCardNumber,
              }
              setTimeout(() => {
                this.props.objectsRequestHandler(
                  'REQ_COMMERCE_WITHDRAWAL_CREATE_INSTANCE', {
                  params: JSON.stringify(form),
                }, this.props.history)
                ÏÏÏ.then((res) => {
                  if (res.status === 200) {
                    this.setState({
                      init: true,
                      values: [null, 'option1', null,],
                      methodSelected: false,
                      validRequest: false,
                      witAmount: false,
                      witAmountDisplay: "",
                      witAmountCleared: 0,
                      witAmountValid: false,
                      witCardName: '',
                      witCardNameValid: false,
                      witCardNumber: '',
                      witCardNumberValid: false,
                      witExpiryDate: '',
                      witExpiryDateValid: false,
                      witCardCVC: '',
                      witCardCVCValid: false,
                      witNotification: false,
                      witComment: '',
                      projectedBalance: 0,
                      isFetching: false,
                    }, () => {
                      this.showToastify(<>
                        <div className="font-weight-bold">
                          <span>
                            <i className="fas fa-check-circle mr-2"></i>
                            <span>
                              Withdrawal Successfully Received
                            </span>
                          </span>
                        </div>
                      </>, 'success')
                    })
                  }
                }).catch(() => {
                  this.setState({
                    init: true,
                    values: [null, 'option1', null,],
                    methodSelected: false,
                    validRequest: false,
                    witAmount: false,
                    witAmountDisplay: "",
                    witAmountCleared: 0,
                    witAmountValid: false,
                    witCardName: '',
                    witCardNameValid: false,
                    witCardNumber: '',
                    witCardNumberValid: false,
                    witExpiryDate: '',
                    witExpiryDateValid: false,
                    witCardCVC: '',
                    witCardCVCValid: false,
                    witNotification: false,
                    witComment: '',
                    projectedBalance: 0,
                    isFetching: false,
                  }, () => {
                    this.showToastify(<>
                      <div className="font-weight-bold">
                        <span>
                          <i className="fas fa-times-circle mr-2"></i>
                          <span>
                            Withdrawal Request Failed
                          </span>
                        </span>
                      </div>
                    </>, 'error')
                  })
                })
              }, 100)
            }
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      })
    }
  }

  onHandleValidateForm() {
    if (
      this.state.witAmountValid &&
      this.state.witCardNameValid &&
      this.state.witCardNumberValid &&
      this.state.witExpiryDateValid &&
      this.state.witCardCVCValid
    ) {
      this.setState({
        validRequest: true,
      })
    } else {
      this.setState({
        validRequest: false,
      })
    }
  }

  onHandleSubmitReCAPTCHAToken = async () => {
    var token = await this.recaptchaRef.current.executeAsync()
    this.setState({
      recaptcha: token,
    })
  }

  formatPrice(p) {
    return numeral(p).format('$0,0.00')
  }

  renderProviderForm() {
    if (this.state.providerType === 'fiat') {
      return (
        <>
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-right">
              Live Deposit
            </Form.Label>
            <Col sm={10}>
              <Row>
                <Col md={6} className="mb-1">
                  <div className="text-muted small mb-1">
                    Total Balance
                  </div>
                  <span className="font-weight-bold h5">
                    {this.formatPrice(this.props.wallet.live_deposit)}
                  </span>
                </Col>
                <Col md={6} className="mb-1">
                  <div className="text-muted small mb-1">
                    Updated Balance
                  </div>
                  <span className="font-weight-bold h5">
                    {this.state.projectedBalance
                      ? this.formatPrice(this.state.projectedBalance)
                      : this.formatPrice(this.props.wallet.live_deposit)}
                  </span>
                </Col>
              </Row>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-right">
              Amount
            </Form.Label>
            <Col sm={10}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="fas fa-credit-card" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <MaskedInput
                  className="form-control"
                  placeholder="Please enter a valid withdrawal amount..."
                  maxLength={10}
                  mask={textMaskAddons.createNumberMask({
                    prefix: '$',
                  })}
                  value={this.state.witAmountDisplay}
                  disabled={!this.state.methodSelected}
                  onChange={(e) => {
                    this.onHandleChangeDepositAmount(e.target.value)
                  }} />
                <InputGroup.Append>
                  <InputGroup.Text>
                    {this.state.witAmountValid
                      ? <i className="fas fa-check text-success" />
                      : <i className="fas fa-times text-danger" />}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-right">
              Choose Amount
            </Form.Label>
            <Col sm={10}>
              <ButtonGroup className="mb-0 w-100">
                <Button
                  variant="opaque1"
                  className="font-weight-bold mr-2 h5 mb-0 border-0"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('100') }}>
                  <span className="mb-2">
                    $100
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Amount</div>
                </Button>

                <Button
                  variant="opaque1"
                  className="font-weight-bold mr-2 h5 mb-0 border-0"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('150') }}>
                  <span className="mb-2">
                    $150
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Amount</div>
                </Button>

                <Button
                  variant="opaque1"
                  className="font-weight-bold mr-2 h5 mb-0 border-0"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('200') }}>
                  <span className="mb-2">
                    $200
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Amount</div>
                </Button>

                <Button
                  variant="opaque1"
                  className="font-weight-bold h5 mb-0 border-0"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('500') }}>
                  <span className="mb-2">
                    $500
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Amount</div>
                </Button>
              </ButtonGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-right">
              Card Holder/Number
            </Form.Label>
            <Col sm={5}>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={this.state.witCardName}
                  disabled={!this.state.methodSelected}
                  onChange={(e) => {
                    this.onHandleChangeCardholderName(e.target.value)
                  }}
                  placeholder="Name On Card" />
                <InputGroup.Append>
                  <InputGroup.Text>
                    {this.state.witCardNameValid
                      ? <i className="fas fa-check text-success" />
                      : <i className="fas fa-times text-danger" />}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <Col sm={5}>
              <InputGroup>
                <MaskedInput
                  type="text"
                  className="form-control"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={this.state.witCardNumber}
                  disabled={!this.state.methodSelected}
                  onChange={(e) => {
                    this.onHandleChangeCreditCardNumber(e.target.value)
                  }}
                  mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
                <InputGroup.Append>
                  <InputGroup.Text>
                    {this.state.witCardNumberValid
                      ? <i className="fas fa-check text-success" />
                      : <i className="fas fa-times text-danger" />}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-right">
              Exp. Date/CVC
            </Form.Label>
            <Col sm={5}>
              <InputGroup>
                <MaskedInput
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  value={this.state.witExpiryDate}
                  disabled={!this.state.methodSelected}
                  onChange={(e) => {
                    this.onHandleChangeExpiryDate(e.target.value)
                  }}
                  mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                  pipe={textMaskAddons.createAutoCorrectedDatePipe('mm/yy')} />
                <InputGroup.Append>
                  <InputGroup.Text>
                    {this.state.witExpiryDateValid
                      ? <i className="fas fa-check text-success" />
                      : <i className="fas fa-times text-danger" />}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <Col sm={5}>
              <InputGroup>
                <MaskedInput
                  type="text"
                  className="form-control"
                  placeholder="XXX"
                  value={this.state.witCardCVC}
                  disabled={!this.state.methodSelected}
                  onChange={(e) => {
                    this.onHandleChangeCVC(e.target.value)
                  }}
                  mask={[/[1-9]/, /\d/, /\d/,]} />
                <InputGroup.Append>
                  <InputGroup.Text>
                    {this.state.witCardCVCValid
                      ? <i className="fas fa-check text-success" />
                      : <i className="fas fa-times text-danger" />}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-right">
              Comment
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                value={this.state.witComment}
                disabled={!this.state.methodSelected}
                placeholder="Please enter your comments here..."
                onChange={(e) => {
                  this.onHandleChangeComment(e.target.value)
                }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-right pt-0">
              Notifications
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                custom type="checkbox"
                className="mb-0"
                checked={this.state.witNotification}
                onChange={(e) => { this.onHandleChangeNotification(e) }}
                disabled={!this.state.methodSelected}
                name="form-horizontal-radios-example"
                id="form-horizontal-checkbox-example-1"
                label="Please notify me via email as soon as my request has been processed" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-right pt-0"></Form.Label>
            <Col sm={10}>
              <div className="text-left text-left text-white opacity-50 text-tiny mt-0 mb-3 w-100">
                Some <a href="#d" onClick={this.prevent}>account and system information</a> may be sent to Live Poker Studio™. We will use it to fix problems and improve our services, subject to our <a href="#d" target="_blank" onClick={this.prevent}>Privacy Policy</a> and <a href="#d" target="_blank" onClick={this.prevent}>Terms of Service</a>. We may email you for more information or updates. Go to <a href="#d" target="_blank" onClick={this.prevent}>Legal Help</a> to ask for content changes for legal reasons. Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{
              span: 10,
              offset: 2,
            }}>
              <Button
                size="lg"
                type="submit"
                className="font-weight-bold"
                variant="instagram"
                disabled={!this.state.validRequest}
                onClick={(e) => {
                  this.onHandleSubmitWithdrawalRequest(e)
                }}>
                <span>
                  <i className="fas fa-piggy-bank mr-2"></i>
                  <span>
                    Submit Withdrawal Request
                  </span>
                </span>
              </Button>
            </Col>
          </Form.Group>
        </>
      )
    } else if (this.state.providerType === 'crypto') {
      return (
        <>
          <Form.Group as={Row} className="mt-2">
            <Form.Label column sm={2} className="text-sm-right pt-0">
              Coming Soon
            </Form.Label>
            <Col sm={10}>
              <Card className="bg-light py-4 mt-0" style={{
                borderRadius: "15px",
              }}>
                <Card className="d-flex bg-transparent w-100 mb-2 border-0 shadow-none">
                  <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                    <Col
                      sm={12} md={12} lg={12}
                      className="d-flex align-items-center border-0 shadow-none p-4"
                      style={{ justifyContent: "center", }}>
                      <ResourceLoaderB
                        height="4rem" width="4rem" />
                    </Col>
                  </Row>
                </Card>
                <div className={`text-center text-white opacity-100 mb-0`}>
                  Crypto Payments Coming Soon
                </div>
                <div className="text-center text-white opacity-50 text-tiny mt-4 mb-0 w-75 align-self-center">
                  Some <a href="#d" onClick={this.prevent}>account and system information</a> may be sent to Live Poker Studio™. We will use it to fix problems and improve our services, subject to our <a href="#d" target="_blank" onClick={this.prevent}>Privacy Policy</a> and <a href="#d" target="_blank" onClick={this.prevent}>Terms of Service</a>. We may email you for more information or updates. Go to <a href="#d" target="_blank" onClick={this.prevent}>Legal Help</a> to ask for content changes for legal reasons. Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                </div>
              </Card>
            </Col>
          </Form.Group>
        </>
      )
    } else {
      return (
        <>
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-right">
              Live Deposit
            </Form.Label>
            <Col sm={10}>
              <Row>
                <Col md={6} className="mb-1">
                  <div className="text-muted small mb-1">
                    Total Balance
                  </div>
                  <span className="font-weight-bold h5">
                    {this.formatPrice(this.props.wallet.live_deposit)}
                  </span>
                </Col>
                <Col md={6} className="mb-1">
                  <div className="text-muted small mb-1">
                    Updated Balance
                  </div>
                  <span className="font-weight-bold h5">
                    {this.state.projectedBalance
                      ? this.formatPrice(this.state.projectedBalance)
                      : this.formatPrice(this.props.wallet.live_deposit)}
                  </span>
                </Col>
              </Row>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-2">
            <Form.Label column sm={2} className="text-sm-right pt-0">
              Withdrawal Amount
            </Form.Label>
            <Col sm={10}>
              <div className="text-muted small mb-1">
                Payment Method
              </div>
              <div className="text-left text-white opacity-100 font-weight-bold h5 mb-2">
                Please choose a valid withdrawal method
              </div>
              <div className="text-left text-white opacity-50 text-tiny mt-0 mb-0 w-100">
                Some <a href="#d" onClick={this.prevent}>account and system information</a> may be sent to Live Poker Studio™. We will use it to fix problems and improve our services, subject to our <a href="#d" target="_blank" onClick={this.prevent}>Privacy Policy</a> and <a href="#d" target="_blank" onClick={this.prevent}>Terms of Service</a>. We may email you for more information or updates. Go to <a href="#d" target="_blank" onClick={this.prevent}>Legal Help</a> to ask for content changes for legal reasons. Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
              </div>
            </Col>
          </Form.Group>
        </>
      )
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
      <Col md={9}>
        <Card className="mb-0 shadow-none">
          <Card.Header as="h6">
            Withdrawal
          </Card.Header>

          <Card.Body>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={2} className="text-sm-right">
                  Payment Method
                </Form.Label>
                <Col sm={10}>
                  <ButtonGroup className="mb-0 w-100">
                    <Button
                      variant={this.state.selectedIndex === 0 ? 'opaque1' : 'light'}
                      className="font-weight-bold mr-2 h5 mb-0 border-0"
                      style={{ borderRadius: "5px", }}
                      onClick={() => { this.handleChangeSelectProvider(this.methodOptions[0]) }}>
                      <span className="mb-2">
                        <img
                          src={`${process.env.PUBLIC_URL}/img/payment/col-select-visa-dark.png`}
                          alt="Live Poker Studio™" className="ui-w-120" />
                      </span>
                      <div className="text-tiny text-body mb-0">Choose Method</div>
                    </Button>

                    <Button
                      variant={this.state.selectedIndex === 1 ? 'opaque1' : 'light'}
                      className="font-weight-bold mr-2 h5 mb-0 border-0"
                      style={{ borderRadius: "5px", }}
                      onClick={() => { this.handleChangeSelectProvider(this.methodOptions[1]) }}>
                      <span className="mb-2">
                        <img
                          src={`${process.env.PUBLIC_URL}/img/payment/col-select-mastercard-dark.png`}
                          alt="Live Poker Studio™" className="ui-w-120" />
                      </span>
                      <div className="text-tiny text-body mb-0">Choose Method</div>
                    </Button>

                    <Button
                      variant={this.state.selectedIndex === 2 ? 'opaque1' : 'light'}
                      className="font-weight-bold h5 mb-0 border-0"
                      style={{ borderRadius: "5px", }}
                      onClick={() => { this.handleChangeSelectProvider(this.methodOptions[2]) }}>
                      <span className="mb-2">
                        <img
                          src={`${process.env.PUBLIC_URL}/img/payment/col-select-crypto-dark.png`}
                          alt="Live Poker Studio™" className="ui-w-120" />
                      </span>
                      <div className="text-tiny text-body mb-0">Choose Method</div>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Form.Group>

              {this.renderProviderForm()}

            </Form>
          </Card.Body>
        </Card>

        <Card.Body>
          <hr className="border-light m-0" />
          <h6 className="text-left text-lightest text-muted text-tiny mt-3 mb-3">
            Update your personal information and manage your notification and payment information settings. New players can track their authorization status here.<br />
            All transactions on our web site are encrypted using Secure Sockets Layer (SSL) and 256-bit AES-based encryption to ensure your personal information <br />
            is safe from the moment you sign up as a member and through out any transaction that involves the transfer of information.
          </h6>
        </Card.Body>

        <ReCAPTCHA
          ref={this.recaptchaRef}
          size={process.env.REACT_APP_RECAPTCHA_CLIENT_SIZE}
          sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY} />

      </Col>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(WalletWithdrawals))