import React, { Component } from 'react'
import { Button, ButtonGroup, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { RSSelect, RSSelectOption } from 'reactsymbols-kit'
import { toast } from 'react-toastify'

// import axios from 'axios'
import QRCode from 'react-qr-code'
import MaskedInput from 'react-text-mask'
import ReCAPTCHA from 'react-google-recaptcha'

import * as numeral from 'numeral'
import * as textMaskAddons from 'text-mask-addons/dist/textMaskAddons'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../../store/actions'

import LaddaButton, {
  SLIDE_DOWN,
} from 'react-ladda'

import '../../assets/css/views.css'
import '../../../../vendor/libs/react-ladda/react-ladda.scss'
import 'reactsymbols-kit/ReactSymbolsKit.css'

class WalletDeposits extends Component {

  constructor(props) {
    super(props)

    this.recaptchaRef = React.createRef()

    this.onHandleValidateForm = this.onHandleValidateForm.bind(this)

    this.state = {
      init: true,
      isFetchingBonus: false,
      isFetchingDeposit: false,
      recaptcha: '',
      methodSelected: false,
      selectedProvider: '',
      selectedIndex: null,
      providerType: null,
      validRequest: false,
      depositAmount: false,
      depositAmountDisplay: "",
      depositAmountCleared: 0,
      depositAmountValid: false,
      depositBonus: '',
      depositBonusValid: false,
      depositBonusResponse: null,
      depositBonusResponseValid: false,
      depositNotification: false,
      projectedBalance: 0,

      values: [null, 'option2', null],
    }

    this.methodOptions = [
      { index: 0, value: 'option1', label: 'VISA', provider: 'remitex', imagePath: 'r-select-visa.png', type: 'fiat', },
      { index: 1, value: 'option2', label: 'MasterCard', provider: 'remitex', imagePath: 'r-select-mastercard.png', type: 'fiat', },
      { index: 2, value: 'option3', label: 'Bitcoin', provider: 'alphapo', imagePath: 'r-select-bitcoin.png', type: 'crypto', },
    ]

    this.currencyOptions1 = [
      { value: 'btc', label: 'BTC', imagePath: 'r-select-bitcoin.png' },
      { value: 'eth', label: 'ETH', imagePath: 'r-select-bitcoin.png' },
    ]
  }

  // componentDidMount() {
  //   new Promise((resolve, reject) => {
  //     axios.get(
  //       'https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT'
  //     ).then((res) => {
  //       console.log(parseFloat(res.data.price).toFixed(2))
  //       resolve(res)
  //     }).catch((err) => {
  //       reject(err)
  //     })
  //   })
  // }

  handleChangeSelectProvider(option) {
    this.setState({
      methodSelected: true,
      selectedProvider: option.provider,
      selectedIndex: option.index,
      providerType: option.type,
    }, () => {
      this.setState({
        isFetchingBonus: false,
        isFetchingDeposit: false,
        validRequest: false,
        depositAmount: false,
        depositAmountDisplay: "",
        depositAmountCleared: 0,
        depositAmountValid: false,
        depositBonus: '',
        depositBonusValid: false,
        depositBonusResponse: null,
        depositBonusResponseValid: false,
        depositNotification: false,
        projectedBalance: 0,
      })
    })
  }

  onHandleChangeDepositAmount(value) {
    let amount = Number(value.replace(/[^0-9.-]+/g, ""))
    this.setState({
      depositAmountDisplay: value,
      depositAmountCleared: amount,
    }, () => {
      try {
        if (
          Number(amount) >= 10 &&
          Number(amount) <= Number(100000)
        ) {
          this.setState({
            depositAmountValid: true,
            projectedBalance: Number(this.props.wallet.live_deposit + amount),
          }, () => {
            this.onHandleValidateForm()
          })
        } else {
          this.setState({
            depositAmountValid: false,
            projectedBalance: null,
          }, () => {
            this.onHandleValidateForm()
          })
        }
      } catch {
        this.setState({
          depositAmountValid: false,
          projectedBalance: null,
        }, () => {
          this.onHandleValidateForm()
        })
      }
    })
  }

  onHandleChangeNotification(e) {
    this.setState({
      depositNotification: e.target.checked,
    }, () => {
      this.onHandleValidateForm()
    })
  }

  onHandleSubmitDepositRequest(e) {
    this.prevent(e)
    if (
      this.state.validRequest &&
      this.state.depositAmountValid
    ) {
      this.setState({
        isFetchingBonus: false,
        isFetchingDeposit: true,
      }, () => {
        new Promise((resolve, reject) => {
          this.onHandleSubmitReCAPTCHAToken().then(res => {
            if (this.state.recaptcha !== '') {
              var amount = this.state.depositAmountCleared
              var form = {
                id: JSON.parse(localStorage.getItem('user')).id,
                recaptcha: this.state.recaptcha,
                provider: this.state.selectedProvider,
                amount: Number(amount),
                currency: 'USD',
                bonus_code: String(this.state.depositBonus),
              }
              setTimeout(() => {
                this.props.objectsRequestHandler(
                  'REQ_COMMERCE_DEPOSIT_CREATE_REMITEX', {
                  params: JSON.stringify(form),
                }, this.props.history)
                  .then((res) => {
                    if (res.status === 200) {
                      this.setState({
                        init: true,
                        isFetchingBonus: false,
                        isFetchingDeposit: false,
                        methodSelected: false,
                        validRequest: false,
                        depositAmount: false,
                        depositAmountDisplay: "",
                        depositAmountCleared: 0,
                        depositAmountValid: false,
                        depositBonus: '',
                        depositBonusValid: false,
                        depositBonusResponse: null,
                        depositBonusResponseValid: false,
                        depositNotification: false,
                        projectedBalance: 0,
                      }, () => {
                        this.showToastify(<>
                          <div className="cursor-pointer p-0 m-0 small">
                            <h6>
                              Live Poker Studio™ Deposit
                            </h6>
                            <p className="mb-0">
                              Deposit Successfully Received.
                            </p>
                          </div>
                        </>, 'info')
                      })
                    }
                  }).catch(() => {
                    this.setState({
                      init: true,
                      isFetchingBonus: false,
                      isFetchingDeposit: false,
                      methodSelected: false,
                      validRequest: false,
                      depositAmount: false,
                      depositAmountDisplay: "",
                      depositAmountCleared: 0,
                      depositAmountValid: false,
                      depositBonus: '',
                      depositBonusValid: false,
                      depositBonusResponse: null,
                      depositBonusResponseValid: false,
                      depositNotification: false,
                      projectedBalance: 0,
                    }, () => {
                      this.showToastify(<>
                        <div className="cursor-pointer p-0 m-0 small">
                          <h6>
                            Live Poker Studio™ Deposit
                          </h6>
                          <p className="mb-0">
                            Deposit Request Failed.
                          </p>
                        </div>
                      </>, 'danger')
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

  onHandleChangeDepositBonus(value) {
    this.setState({
      depositBonus: value,
      depositBonusValid: value.replace(/[^0-9]/g, "").length === 16 ? true : false,
    })
  }

  onHandleApplyBonusCode(e) {
    this.prevent(e)
    this.setState({
      isFetchingBonus: true,
    }, () => {
      if (localStorage.getItem('user')) {
        var form = {
          id: JSON.parse(localStorage.getItem('user')).id,
          code: this.state.depositBonus,
        }
        this.props.objectsRequestHandler(
          'REQ_COMMERCE_COUPON_READ_INSTANCE', {
          params: JSON.stringify(form),
        }, this.props.history)
          .then((res) => {
            if (res.data.hasOwnProperty('code')) {
              this.fetchTimeout = setTimeout(() => {
                this.setState({
                  isFetchingBonus: false,
                  depositBonusResponse: res.data,
                  depositBonusResponseValid: true,
                }, () => {
                  this.showToastify(<>
                    <div className="cursor-pointer p-0 m-0 small">
                      <h6>
                        Live Poker Studio™ Notification
                      </h6>
                      <p className="mb-0">
                        Bonus Code applied successfully.
                      </p>
                    </div>
                  </>, 'info')
                })
              }, 1000)
            } else {
              this.fetchTimeout = setTimeout(() => {
                this.setState({
                  isFetchingBonus: false,
                  depositBonusResponse: null,
                  depositBonusResponseValid: false,
                })
              }, 1000)
            }
          }).catch(() => {
            this.fetchTimeout = setTimeout(() => {
              this.setState({
                isFetchingBonus: false,
                depositBonusResponse: null,
                depositBonusResponseValid: false,
              })
            }, 1000)
          })
      }
    })
  }

  onHandleValidateForm() {
    if (
      this.state.depositAmountValid
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
              Deposit Amount
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
                  placeholder="Please enter a valid deposit amount..."
                  maxLength={10}
                  mask={textMaskAddons.createNumberMask({
                    prefix: '$',
                  })}
                  value={this.state.depositAmountDisplay}
                  disabled={!this.state.methodSelected}
                  onChange={(e) => {
                    this.onHandleChangeDepositAmount(e.target.value)
                  }} />
                <InputGroup.Append>
                  <InputGroup.Text>
                    {this.state.depositAmountValid
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
                  variant="instagram"
                  className="font-weight-bold mr-2 h5 mb-0 border-0 p-3"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('25') }}>
                  <span className="mb-2 h4 font-weight-bold">
                    $25
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Deposit</div>
                </Button>

                <Button
                  variant="instagram"
                  className="font-weight-bold mr-2 h5 mb-0 border-0 p-3"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('50') }}>
                  <span className="mb-2 h4 font-weight-bold">
                    $50
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Deposit</div>
                </Button>

                <Button
                  variant="instagram"
                  className="font-weight-bold mr-2 h5 mb-0 border-0 p-3"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('100') }}>
                  <span className="mb-2 h4 font-weight-bold">
                    $100
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Deposit</div>
                </Button>

                <Button
                  variant="instagram"
                  className="font-weight-bold h5 mb-0 border-0 p-3"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('200') }}>
                  <span className="mb-2 h4 font-weight-bold">
                    $200
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Deposit</div>
                </Button>
              </ButtonGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-1">
            <Form.Label column sm={2} className="text-sm-right pt-0">
              Bonus Code
            </Form.Label>
            <Col sm={5}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="fas fa-trophy" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <MaskedInput
                  className="form-control"
                  placeholder="Bonus Code"
                  maxLength={64}
                  mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  value={this.state.depositBonus}
                  onChange={(e) => {
                    this.onHandleChangeDepositBonus(e.target.value)
                  }} />
                <InputGroup.Append>
                  <InputGroup.Text>
                    {this.state.depositBonusResponseValid
                      ? <i className="fas fa-check text-success" />
                      : <i className="fas fa-times text-danger" />}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>

            <Col sm={5}>
              {this.state.depositBonusResponse
                ? <Row>
                  <Col md={6} className="mb-1">
                    <div className="text-muted small mb-1">
                      Bonus Code
                    </div>
                    <span className="font-weight-bold h5">
                      {this.state.depositBonusResponse.title}
                    </span>
                  </Col>
                  <Col md={6} className="mb-1">
                    <div className="text-muted small mb-1">
                      Deposit Bonus
                    </div>
                    <span className="font-weight-bold h5">
                      {this.formatPrice(this.state.depositBonusResponse.amount)}
                    </span>
                  </Col>
                </Row>
                : <Row>
                  <Col md={6} className="mb-1">
                    <div className="text-muted small mb-1">
                      Bonus Code
                    </div>
                    <span className="font-weight-bold h5">
                      -
                    </span>
                  </Col>
                  <Col md={6} className="mb-1">
                    <div className="text-muted small mb-1">
                      Deposit Bonus
                    </div>
                    <span className="font-weight-bold h5">
                      {this.formatPrice(0)}
                    </span>
                  </Col>
                </Row>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm={2} className="text-sm-right pt-0"></Form.Label>
            <Col sm={5}>
              <div className="d-flex justify-content-between align-items-center mt-0 mb-2">
                <LaddaButton
                  style={{ zIndex: "0", }}
                  loading={this.state.isFetchingBonus}
                  onClick={(e) => { this.onHandleApplyBonusCode(e) }}
                  data-style={SLIDE_DOWN}
                  data-spinner-color="#fff"
                  disabled={!this.state.depositBonusValid}
                  className="btn btn-instagram d-block w-100 font-weight-bold">
                  <span className="fas fa-cart-plus text-body mr-2"></span>
                  <span className="font-weight-bold">Apply Bonus Code</span>
                </LaddaButton>
              </div>
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
                checked={this.state.depositNotification}
                onChange={(e) => { this.onHandleChangeNotification(e) }}
                disabled={!this.state.methodSelected}
                name="form-horizontal-radios-example"
                id="form-horizontal-checkbox-example-1"
                label=" Please notify me via email as soon as my request has been processed" />
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
              <LaddaButton
                style={{ zIndex: "0", }}
                loading={this.state.isFetchingDeposit}
                data-style={SLIDE_DOWN}
                data-spinner-color="#fff"
                disabled={!this.state.validRequest}
                className="btn btn-instagram btn-lg font-weight-bold"
                onClick={(e) => {
                  this.onHandleSubmitDepositRequest(e)
                }}>
                <span>
                  <i className="fas fa-credit-card mr-2"></i>
                  <span>
                    Deposit Now
                  </span>
                </span>
              </LaddaButton>
            </Col>
          </Form.Group>
        </>
      )
    } else if (this.state.providerType === 'crypto') {
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
            <Form.Label column sm={2} className="text-sm-right pt-0">
              Choose Currency
            </Form.Label>
            <Col sm={5} className="pr-lg-1">
              <RSSelect
                value={this.currencyOptions1[0]}
                searchable={false}
                clearable={false}
                options={this.currencyOptions1}
                onChange={this.handleChangeSelect.bind(this, 2)}
                className='demo-select'
                valueRenderer={this.roundedImageOption}
                optionRenderer={this.roundedImageOption} />
            </Col>

            <Col sm={5} className="pl-lg-1">
              <RSSelect
                value={this.currencyOptions1[0]}
                searchable={false}
                clearable={false}
                options={this.currencyOptions1}
                onChange={this.handleChangeSelect.bind(this, 2)}
                className='demo-select'
                valueRenderer={this.roundedImageOption}
                optionRenderer={this.roundedImageOption} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-right">
              Deposit Amount
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
                  placeholder="Please enter a valid deposit amount..."
                  maxLength={10}
                  mask={textMaskAddons.createNumberMask({
                    prefix: '$',
                  })}
                  value={this.state.depositAmountDisplay}
                  disabled={!this.state.methodSelected}
                  onChange={(e) => {
                    this.onHandleChangeDepositAmount(e.target.value)
                  }} />
                <InputGroup.Append>
                  <InputGroup.Text>
                    {this.state.depositAmountValid
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
                  variant="instagram"
                  className="font-weight-bold mr-2 h5 mb-0 border-0 p-3"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('25') }}>
                  <span className="mb-2 h4 font-weight-bold">
                    $25
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Deposit</div>
                </Button>

                <Button
                  variant="instagram"
                  className="font-weight-bold mr-2 h5 mb-0 border-0 p-3"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('50') }}>
                  <span className="mb-2 h4 font-weight-bold">
                    $50
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Deposit</div>
                </Button>

                <Button
                  variant="instagram"
                  className="font-weight-bold mr-2 h5 mb-0 border-0 p-3"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('100') }}>
                  <span className="mb-2 h4 font-weight-bold">
                    $100
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Deposit</div>
                </Button>

                <Button
                  variant="instagram"
                  className="font-weight-bold h5 mb-0 border-0 p-3"
                  style={{ borderRadius: "5px", }}
                  onClick={() => { this.onHandleChangeDepositAmount('200') }}>
                  <span className="mb-2 h4 font-weight-bold">
                    $200
                  </span>
                  <div className="text-tiny text-body mb-0">Choose Deposit</div>
                </Button>
              </ButtonGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-1">
            <Form.Label column sm={2} className="text-sm-right pt-0">
              Bonus Code
            </Form.Label>
            <Col sm={5}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="fas fa-trophy" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <MaskedInput
                  className="form-control"
                  placeholder="Bonus Code"
                  maxLength={64}
                  mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  value={this.state.depositBonus}
                  onChange={(e) => {
                    this.onHandleChangeDepositBonus(e.target.value)
                  }} />
                <InputGroup.Append>
                  <InputGroup.Text>
                    {this.state.depositBonusResponseValid
                      ? <i className="fas fa-check text-success" />
                      : <i className="fas fa-times text-danger" />}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>

            <Col sm={5}>
              {this.state.depositBonusResponse
                ? <Row>
                  <Col md={6} className="mb-1">
                    <div className="text-muted small mb-1">
                      Bonus Code
                    </div>
                    <span className="font-weight-bold h5">
                      {this.state.depositBonusResponse.title}
                    </span>
                  </Col>
                  <Col md={6} className="mb-1">
                    <div className="text-muted small mb-1">
                      Deposit Bonus
                    </div>
                    <span className="font-weight-bold h5">
                      {this.formatPrice(this.state.depositBonusResponse.amount)}
                    </span>
                  </Col>
                </Row>
                : <Row>
                  <Col md={6} className="mb-1">
                    <div className="text-muted small mb-1">
                      Bonus Code
                    </div>
                    <span className="font-weight-bold h5">
                      -
                    </span>
                  </Col>
                  <Col md={6} className="mb-1">
                    <div className="text-muted small mb-1">
                      Deposit Bonus
                    </div>
                    <span className="font-weight-bold h5">
                      {this.formatPrice(0)}
                    </span>
                  </Col>
                </Row>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2">
            <Form.Label column sm={2} className="text-sm-right pt-0"></Form.Label>
            <Col sm={5}>
              <div className="d-flex justify-content-between align-items-center mt-0 mb-2">
                <LaddaButton
                  style={{ zIndex: "0", }}
                  loading={this.state.isFetchingBonus}
                  onClick={(e) => { this.onHandleApplyBonusCode(e) }}
                  data-style={SLIDE_DOWN}
                  data-spinner-color="#fff"
                  disabled={!this.state.depositBonusValid}
                  className="btn btn-instagram d-block w-100 font-weight-bold">
                  <span className="fas fa-cart-plus text-body mr-2"></span>
                  <span className="font-weight-bold">Apply Bonus Code</span>
                </LaddaButton>
              </div>
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
                checked={this.state.depositNotification}
                onChange={(e) => { this.onHandleChangeNotification(e) }}
                disabled={!this.state.methodSelected}
                name="form-horizontal-radios-example"
                id="form-horizontal-checkbox-example-1"
                label=" Please notify me via email as soon as my request has been processed" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-right pt-0"></Form.Label>
            <Col sm={10}>
              <Card.Body className="media px-0 pb-4 pt-0">
                <>
                  <div className="position-relative" style={{
                    border: "6px solid white",
                  }}>
                    <QRCode
                      value={"Live Poker Studio™ Wallet"}
                      size={128}
                      bgColor="rgba(255, 255, 255, 1)"
                      fgColor="rgba(0, 0, 0, 1)"
                      level="Q"
                      className="cursor-pointer" />
                  </div>

                  <div className="media-body ml-4">
                    <div>
                      <Button
                        variant="outline-primary"
                        className="mb-2"
                        onClick={(e) => { this.prevent(e) }}>
                        <i className="fas fa-upload mr-2"></i>
                        <span>Open Wallet</span>
                      </Button>
                      <Button
                        variant="outline-success md-btn-flat"
                        className="mb-2 ml-2"
                        onClick={(e) => { this.prevent(e) }}>
                        <i className="fas fa-upload mr-2"></i>
                        <span>Open Wallet</span>
                      </Button>
                      <div className="text-light small mt-1">
                        Some <a href="#d" onClick={this.prevent}>account and system information</a> may be sent to Live Poker Studio™. We will use it to fix problems and improve our services, subject to our <a href="#d" target="_blank" onClick={this.prevent}>Privacy Policy</a> and <a href="#d" target="_blank" onClick={this.prevent}>Terms of Service</a>. We may email you for more information or updates. Go to <a href="#d" target="_blank" onClick={this.prevent}>Legal Help</a> to ask for content changes for legal reasons. Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
                      </div>
                    </div>
                  </div>
                </>
              </Card.Body>
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
              Deposit Amount
            </Form.Label>
            <Col sm={10}>
              <div className="text-muted small mb-1">
                Payment Method
              </div>
              <div className="text-left text-white opacity-100 font-weight-bold h5 mb-2">
                Please choose a payment method
              </div>
              <div className="text-left text-left text-white opacity-50 text-tiny mt-0 mb-0 w-100">
                Some <a href="#d" onClick={this.prevent}>account and system information</a> may be sent to Live Poker Studio™. We will use it to fix problems and improve our services, subject to our <a href="#d" target="_blank" onClick={this.prevent}>Privacy Policy</a> and <a href="#d" target="_blank" onClick={this.prevent}>Terms of Service</a>. We may email you for more information or updates. Go to <a href="#d" target="_blank" onClick={this.prevent}>Legal Help</a> to ask for content changes for legal reasons. Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
              </div>
            </Col>
          </Form.Group>
        </>
      )
    }
  }

  handleChangeSelect(index, option) {
    const { values } = this.state
    values[index] = option.value
    this.setState({
      values,
    })
  }

  roundedImageOption(option) {
    return (
      <RSSelectOption
        label={option.label}
        image={`${process.env.PUBLIC_URL}/img/payment/${option.imagePath}`}
        rounded={12}
      />
    )
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
            Deposit
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

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(WalletDeposits))