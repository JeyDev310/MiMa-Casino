import React, { Component } from 'react'
import { Badge, Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { RSSelect, RSSelectOption } from 'reactsymbols-kit'

import axios from 'axios'
import QRCode from 'react-qr-code'
import MaskedInput from 'react-text-mask'
import ReCAPTCHA from 'react-google-recaptcha'

import * as numeral from 'numeral'
import * as textMaskAddons from 'text-mask-addons/dist/textMaskAddons'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../../../store/actions'

import LaddaButton, {
  SLIDE_DOWN,
} from 'react-ladda'

import '../../../assets/css/views.css'
import '../../../../../vendor/libs/react-ladda/react-ladda.scss'
import '../../../../../vendor/styles/pages/navigation.scss'
import 'reactsymbols-kit/ReactSymbolsKit.css'

class DepositFormAlphaPo extends Component {

  constructor(props) {
    super(props)

    this.fetchInterval = null
    this.recaptchaRef = React.createRef()
    this.onHandleValidateForm = this.onHandleValidateForm.bind(this)

    this.currencyOptions1 = [
      { key: 'BTC', value: 'BTC', label: 'BTC/USD', imagePath: 'r-select-bitcoin.png' },
      { key: 'ETH', value: 'ETH', label: 'ETH/USD', imagePath: 'r-select-etherium.png' },
      { key: 'LTC', value: 'LTC', label: 'LTC/USD', imagePath: 'r-select-etherium.png' },
      { key: 'BCH', value: 'BCH', label: 'BCH/USD', imagePath: 'r-select-etherium.png' },
      { key: 'USDTE', value: 'USDTE', label: 'USDTE/USD', imagePath: 'r-select-etherium.png' },
      { key: 'USDTT', value: 'USDTT', label: 'USDTT/USD', imagePath: 'r-select-etherium.png' },
      { key: 'DOGE', value: 'DOGE', label: 'DOGE/USD', imagePath: 'r-select-etherium.png' },
      { key: 'TRX', value: 'TRX', label: 'TRX/USD', imagePath: 'r-select-etherium.png' },
    ]

    this.state = {
      init: true,
      isFetchingBonus: false,
      isFetchingDeposit: false,
      recaptcha: '',
      validRequest: false,
      validResponse: false,
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
      exchangeRateBTCUSD: 0,
      exchangeRateETHUSD: 0,
      selectedCurrency: this.currencyOptions1[0].value,
      depositAddress: '',
      depositAddressShow: false,
      validatedDepositAmount: 0,
      validatedDepositCurrency: '',
      validatedDepositAddressURI: null,
    }
  }

  componentDidMount() {
    this.fetchBinanceAPIExchangeRates()
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval)
  }

  fetchBinanceAPIExchangeRates() {
    new Promise((resolve, reject) => {
      axios.get(
        'https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT'
      ).then((res) => {
        this.setState({
          exchangeRateBTCUSD: Number(parseFloat(res.data.price).toFixed(2)),
        })
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
      axios.get(
        'https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT'
      ).then((res) => {
        this.setState({
          exchangeRateETHUSD: Number(parseFloat(res.data.price).toFixed(2)),
        })
        resolve(res)
      }).catch((err) => {
        reject(err)
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

  onHandleChangeDepositBonus(value) {
    this.setState({
      depositBonus: value,
      depositBonusValid: value.length > 4 ? true : false,
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
                  this.props.showToast(<>
                    <div className="cursor-pointer p-0 m-0 small">
                      <h6>
                        Live Poker Studio™ Bonus Code
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

  onHandleChangeNotification(e) {
    this.setState({
      depositNotification: e.target.checked,
    }, () => {
      this.onHandleValidateForm()
    })
  }

  onHandleSubmitReCAPTCHAToken = async () => {
    this.recaptchaRef.current.reset()
    var token = await this.recaptchaRef.current.executeAsync()
    this.setState({
      recaptcha: token,
    })
  }

  handleChangeSelect(index, option) {
    this.setState({
      selectedCurrency: option.value,
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
                provider: this.props.selectedProvider,
                amount: Number(amount),
                currency: String(this.state.selectedCurrency),
                bonus_code: this.state.depositBonus === '' ? 'undefined' : String(this.state.depositBonus),
              }
              setTimeout(() => {
                this.props.objectsRequestHandler(
                  'REQ_COMMERCE_DEPOSIT_CREATE_ALPHAPO', {
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
                        this.setState({
                          depositAddress: res.data.payment_url,
                          depositAddressShow: true,
                          validatedDepositAmount: res.data.amount,
                          validatedDepositCurrency: res.data.currency,
                          validatedDepositAddressURI: this.getDepositAddressURI(res.data.currency, res.data.payment_url),
                        })
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
                      depositAddress: '',
                      depositAddressShow: false,
                      validatedDepositAmount: 0,
                      validatedDepositCurrency: '',
                      validatedDepositAddressURI: null,
                    }, () => {
                      this.props.showToast(<>
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

  formatPrice(p) {
    return numeral(p).format('$0,0.00')
  }

  formatUSDBTC(p) {
    var amount = Number(p / this.state.exchangeRateBTCUSD)
    return numeral(amount).format('0,0.00000000')
  }

  formatUSDETH(p) {
    var amount = Number(p / this.state.exchangeRateETHUSD)
    return numeral(amount).format('0,0.00000000')
  }

  getDepositAddressURI(currency, address) {
    if (currency === 'BTC') {
      return `bitcoin:${address}`
    } else if (currency === 'ETH') {
      return `ethereum:${address}`
    }
  }

  getDepositAmount(currency, amount) {
    if (currency === 'BTC') {
      return this.formatUSDBTC(amount)
    } else if (currency === 'ETH') {
      return this.formatUSDETH(amount)
    }
  }

  getDepositCurrency(currency) {
    if (currency === 'BTC') {
      return `Bitcoin`
    } else if (currency === 'ETH') {
      return `Ethereum`
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        <Form.Group as={Row}>
          <Form.Label column sm={2} className="text-sm-left pt-0">
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
          <Form.Label column sm={2} className="text-sm-left pt-0">
            Choose Currency
          </Form.Label>
          <Col sm={10} className="pr-lg-1" style={{ zIndex: "1", position: "inherit", }}>
            <RSSelect
              value={this.currencyOptions1.find(element => element.value === this.state.selectedCurrency) || ''}
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
          <Form.Label column sm={2} className="text-sm-left pt-0"></Form.Label>
          <Col sm={10}>
            <Row>
              <Col md={6} className="mb-1">
                <div className="text-muted small mb-1">
                  Average Price BTC/USD (Source: Binance API)
                </div>
                <span className="font-weight-bold h5">
                  {this.formatPrice(this.state.exchangeRateBTCUSD)}
                </span>
              </Col>
              <Col md={6} className="mb-1">
                <div className="text-muted small mb-1">
                  Average Price ETH/USD (Source: Binance API)
                </div>
                <span className="font-weight-bold h5">
                  {this.formatPrice(this.state.exchangeRateETHUSD)}
                </span>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2} className="text-sm-left pt-0">
            Deposit Amount
          </Form.Label>

          <Col sm={10}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-dollar-sign" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <MaskedInput
                className="form-control form-control-lg"
                placeholder="Please enter a valid deposit amount..."
                maxLength={10}
                mask={textMaskAddons.createNumberMask({
                  prefix: '$',
                })}
                value={this.state.depositAmountDisplay}
                disabled={!this.props.methodSelected}
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
          <Form.Label column sm={2} className="text-sm-left pt-0">
            Choose Amount
          </Form.Label>

          <Col sm={10}>
            <div className="row">
              {[25, 50, 100, 200]
                .map((amount, index) =>
                  <div
                    key={index}
                    className="col-md-3 mb-2 text-center">
                    <span
                      className={`${this.state.depositAmountCleared === amount ? 'border-light text-body bg-light' : 'text-body'} d-block rounded ui-bordered p-3 cursor-pointer`}
                      onClick={() => { this.onHandleChangeDepositAmount(String(amount)) }}>
                      <span className="mb-2 h4 font-weight-bold">${amount}</span>
                      <div className="small mb-0 text-body">
                        {this.state.depositAmountCleared === amount
                          ? <>
                            <span>Selected</span>
                            <i className="fas fa-check text-success ml-1" />
                          </>
                          : <span>Choose Deposit</span>}
                      </div>
                    </span>
                  </div>
                )}
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={2} className="text-sm-left pt-0">
            Bonus Code
          </Form.Label>

          <Col sm={10}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-ticket-alt" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                maxLength={24}
                className="form-control"
                placeholder="Bonus Code"
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
        </Form.Group>

        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={2} className="text-sm-left pt-0"></Form.Label>

          <Col sm={10}>
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

        <Form.Group as={Row} className="mb-2">
          <Form.Label column sm={2} className="text-sm-left pt-0"></Form.Label>

          <Col sm={10}>
            {this.state.depositBonusResponse && (
              <div
                className="card ui-bg-cover ui-bg-overlay-container border-0 text-white mb-2"
                style={{
                  borderRadius: "15px",
                  backgroundImage: `url(${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935534-0016.jpg)`,
                }}>
                <div className="ui-bg-overlay bg-dark opacity-25" style={{ borderRadius: "15px", }}></div>
                <div className="card-body m-lg-2">
                  <Badge
                    pill variant="success"
                    className="mb-2 font-weight-bold">
                    BONUS CODE
                  </Badge>
                  <h5 className="mb-2">
                    <span className="text-white">
                      {this.state.depositBonusResponse.title}
                    </span>
                  </h5>
                  <div className="small">
                    <span className="text-white">
                      Deposit Bonus
                    </span>
                    &nbsp; &nbsp;
                    <span className="opacity-75">
                      <span className="fas fa-piggy-bank mr-2"></span>
                      <span>{this.formatPrice(this.state.depositBonusResponse.amount)}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2} className="text-sm-left pt-0 mb-5">
            Notifications
          </Form.Label>

          <Col sm={10}>
            <Form.Check
              custom type="checkbox"
              className="mb-0"
              checked={this.state.depositNotification}
              onChange={(e) => { this.onHandleChangeNotification(e) }}
              disabled={!this.props.methodSelected}
              name="form-horizontal-radios-example"
              id="form-horizontal-checkbox-example-1"
              label=" Please notify me via email as soon as my request has been processed" />
          </Col>
        </Form.Group>

        {this.state.depositAddressShow && (
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-sm-left pt-0"></Form.Label>

            <Col sm={10}>
              <Card.Body className="media p-4 bg-light" style={{ borderRadius: "15px", }}>
                <>
                  <Row>
                    <Col>
                      <div className="media-body">
                        <div>
                          <Row className="mb-2">
                            <Col md={12} className="mb-1">
                              <span className="d-flex justify-content-between">
                                <span className="align-items-center">
                                  <div className="text-muted small mb-1">
                                    Grand Total
                                  </div>
                                  <span className="font-weight-bold h4 d-flex align-items-center">
                                    <Badge
                                      pill variant="warning"
                                      className="font-weight-bold mr-2">
                                      {this.state.validatedDepositCurrency}
                                    </Badge>
                                    <span>
                                      {this.getDepositAmount(this.state.validatedDepositCurrency, this.state.validatedDepositAmount)}
                                    </span>
                                  </span>
                                </span>
                                <span>
                                  <Button
                                    size="md"
                                    className="mr-0"
                                    variant="light icon-btn rounded-pill md-btn-flat hide-arrow"
                                    onClick={() => {
                                      window.open(this.state.validatedDepositAddressURI, '_blank').focus()
                                    }}>
                                    <i className="fas fa-wallet"></i>
                                  </Button>
                                </span>
                              </span>
                            </Col>
                          </Row>

                          <Row className="mb-2">
                            <Col md={12} className="mb-1">
                              <div className="text-muted small mb-1">
                                Deposit Address
                              </div>
                              <span className="font-weight-bold">
                                {`${this.state.depositAddress}`}
                              </span>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col md={12} className="mb-1">
                              <div className="text-left text-left text-white opacity-50 text-tiny mt-0 mb-2 w-100">
                                This is your Deposit address. {this.getDepositCurrency(this.state.validatedDepositCurrency)} sent to this address will be automatically converted to USD and deposited to your USD balance. Please be careful to send only {this.getDepositCurrency(this.state.validatedDepositCurrency)} to this address, sending any other currency may result in a deposit delay or funds being lost.
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>

                    <Col sm={12} md={12} lg={12} xl={4} className="d-flex justify-content-end">
                      <div className="wallet_qrcode__s1">
                        <QRCode
                          value={this.state.validatedDepositAddressURI}
                          size={170}
                          bgColor="rgba(255, 255, 255, 1)"
                          fgColor="rgba(0, 0, 0, 1)"
                          level="Q"
                          className="cursor-pointer m-2"
                          style={{
                            outline: "6px solid white",
                          }}
                          onClick={(e) => {
                            window.open(this.state.validatedDepositAddressURI, '_blank').focus()
                          }} />
                      </div>
                    </Col>
                  </Row>
                </>
              </Card.Body>
            </Col>
          </Form.Group>
        )}

        <Form.Group as={Row}>
          <Form.Label column sm={2} className="text-sm-left pt-0"></Form.Label>
          <Col sm={10}>
            <div className="text-left text-left text-white opacity-50 text-tiny mt-0 mb-2 w-100">
              Some <a href="#d" onClick={this.prevent}>account and system information</a> may be sent to Live Poker Studio™. We will use it to fix problems and improve our services, subject to our <a href="#d" target="_blank" onClick={this.prevent}>Privacy Policy</a> and <a href="#d" target="_blank" onClick={this.prevent}>Terms of Service</a>. We may email you for more information or updates. Go to <a href="#d" target="_blank" onClick={this.prevent}>Legal Help</a> to ask for content changes for legal reasons. Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
            </div>
          </Col>
        </Form.Group>

        {!this.state.depositAddressShow && (
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
                className="btn btn-instagram btn-lg font-weight-bold d-block w-100"
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
        )}

        <ReCAPTCHA
          ref={this.recaptchaRef}
          size={process.env.REACT_APP_RECAPTCHA_CLIENT_SIZE}
          sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY} />

      </>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(DepositFormAlphaPo))