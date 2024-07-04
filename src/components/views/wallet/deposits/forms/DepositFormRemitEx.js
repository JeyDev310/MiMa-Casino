import React, { Component } from 'react'
import { Badge, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap'

import MaskedInput from 'react-text-mask'
import ReCAPTCHA from 'react-google-recaptcha'

import ResourceLoaderN from '../../../utilities/loaders/ResourceLoaderN'

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
import 'reactsymbols-kit/ReactSymbolsKit.css'

class DepositFormRemitEx extends Component {

  constructor(props) {
    super(props)

    this.redirectTimer = null
    this.recaptchaRef = React.createRef()
    this.onHandleValidateForm = this.onHandleValidateForm.bind(this)
    this.onRedirectModalClose = this.onRedirectModalClose.bind(this)

    this.state = {
      init: true,
      isFetchingBonus: false,
      isFetchingDeposit: false,
      recaptcha: '',
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
      redirectModalShow: false,
    }
  }

  componentWillUnmount() {
    clearTimeout(this.redirectTimer)
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
                currency: 'USD',
                bonus_code: this.state.depositBonus === '' ? 'undefined' : String(this.state.depositBonus),
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
                        this.setState({
                          redirectModalShow: true,
                        }, () => {
                          setTimeout(() => {
                            window.location.href = res.data.payment_url
                          }, 500)
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

  onRedirectModalClose() {
    this.setState({
      redirectModalShow: false,
    })
  }

  formatPrice(p) {
    return numeral(p).format('$0,0.00')
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

        <Form.Group as={Row} className="mb-5">
          <Form.Label column sm={2} className="text-sm-left pt-0">
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

        <Form.Group as={Row}>
          <Form.Label column sm={2} className="text-sm-left pt-0"></Form.Label>

          <Col sm={10}>
            <div className="text-left text-left text-white opacity-50 text-tiny mt-0 mb-2 w-100">
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

        <Modal
          className="modal-fill-in"
          show={this.state.redirectModalShow}
          size="sm"
          onHide={this.onRedirectModalClose}>
          <Modal.Body style={{
            borderRadius: "10px",
            backgroundColor: "rgba(24, 24, 24, 1)",
          }}>
            <p className="text-white text-center font-weight-bold mb-3">
              Complete Payment
            </p>
            <form>
              <div className="d-flex justify-content-center align-items-center mt-4 mb-2 py-5 mb-0">
                <ResourceLoaderN
                  height={`8rem`} width={`8rem`} />
              </div>
            </form>
            <div className="text-center text-right text-white opacity-75 small">
              You will be redirected to complete the payment.
            </div>
          </Modal.Body>
        </Modal>

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

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(DepositFormRemitEx))