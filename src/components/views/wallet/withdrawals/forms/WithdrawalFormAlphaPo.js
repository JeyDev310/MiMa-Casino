import React, { Component } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap'
import { RSSelect, RSSelectOption } from 'reactsymbols-kit'
import { toast } from 'react-toastify'

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
import 'reactsymbols-kit/ReactSymbolsKit.css'

class WithdrawalFormAlphaPo extends Component {

  constructor(props) {
    super(props)

    this.recaptchaRef = React.createRef()
    this.onHandleValidateForm = this.onHandleValidateForm.bind(this)

    this.currencyOptions1 = [
      { value: 'BTC', label: 'BTC', imagePath: 'r-select-bitcoin.png' },
      { value: 'ETH', label: 'ETH', imagePath: 'r-select-etherium.png' },
    ]

    this.state = {
      init: true,
      isFetching: false,
      recaptcha: '',
      validRequest: false,
      validResponse: false,
      witAmount: false,
      witAmountDisplay: "",
      witAmountCleared: 0,
      witAmountValid: false,
      witWalletAddress: '',
      witWalletAddressValid: false,
      witNotification: false,
      witComment: '',
      projectedBalance: 0,
      selectedCurrency: this.currencyOptions1[0].value,
    }
  }

  onHandleChangeWithdrawalAmount(value) {
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

  onHandleChangeWalletAddress(e) {
    this.setState({
      witWalletAddress: e,
    }, () => {
      this.setState({
        witWalletAddressValid: this.state.witWalletAddress.length >= 4 ? true : false,
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
      this.state.witWalletAddressValid
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
                provider: this.props.selectedProvider,
                meta: {
                  withdrawalsWalletAddress: this.state.witWalletAddress,
                  withdrawalsNotification: this.state.witNotification,
                  withdrawalsComment: this.state.witComment,
                },
                amount: Number(amount),
                currency: String(this.state.selectedCurrency),
              }
              setTimeout(() => {
                this.props.objectsRequestHandler(
                  'REQ_COMMERCE_WITHDRAWAL_CREATE_INSTANCE', {
                  params: JSON.stringify(form),
                }, this.props.history).then((res) => {
                  if (res.status === 200) {
                    this.setState({
                      init: true,
                      isFetching: false,
                      validRequest: false,
                      validResponse: true,
                      witAmount: false,
                      witAmountDisplay: "",
                      witAmountCleared: 0,
                      witAmountValid: false,
                      witWalletAddress: '',
                      witWalletAddressValid: false,
                      witNotification: false,
                      witComment: '',
                      projectedBalance: 0,
                    }, () => {
                      this.props.setValidResponse(200)
                    })
                  }
                }).catch(() => {
                  this.setState({
                    init: true,
                    isFetching: false,
                    validRequest: false,
                    validResponse: false,
                    witAmount: false,
                    witAmountDisplay: "",
                    witAmountCleared: 0,
                    witAmountValid: false,
                    witWalletAddress: '',
                    witWalletAddressValid: false,
                    witNotification: false,
                    witComment: '',
                    projectedBalance: 0,
                  }, () => {
                    this.props.setValidResponse(500)
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
      this.state.witWalletAddressValid
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

  onHandleSubmitReCAPTCHAToken = async () => {
    await this.recaptchaRef.current.reset()
    var token = await this.recaptchaRef.current.executeAsync()
    this.setState({
      recaptcha: token,
    })
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
                  {this.state.projectedBalance !== null
                    ? this.formatPrice(this.state.projectedBalance)
                    : this.formatPrice(this.props.wallet.live_deposit)}
                </span>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2} className="text-sm-left pt-0">
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
                className="form-control form-control-lg"
                placeholder="Please enter a valid withdrawal amount..."
                maxLength={10}
                mask={textMaskAddons.createNumberMask({
                  prefix: '$',
                })}
                value={this.state.witAmountDisplay}
                disabled={!this.props.methodSelected}
                onChange={(e) => {
                  this.onHandleChangeWithdrawalAmount(e.target.value)
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
          <Form.Label column sm={2} className="text-sm-left pt-0">
            Choose Amount
          </Form.Label>

          <Col sm={10}>
            <div className="row">
              {[100, 150, 200, 500]
                .map((amount, index) =>
                  <div
                    key={index}
                    className="col-md-3 mb-2 text-center">
                    <span
                      className={`${this.state.witAmountCleared === amount ? 'border-light text-body bg-light' : 'text-body'} d-block rounded ui-bordered p-3 cursor-pointer`}
                      onClick={() => { this.onHandleChangeWithdrawalAmount(String(amount)) }}>
                      <span className="mb-2 h4 font-weight-bold">${amount}</span>
                      <div className="small mb-0 text-body">
                        {this.state.witAmountCleared === amount
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

        <Form.Group as={Row}>
          <Form.Label column sm={2} className="text-sm-left pt-0">
            Recipient Address
          </Form.Label>
          <Col sm={5}>
            <InputGroup>
              <Form.Control
                type="text"
                maxLength={256}
                value={this.state.witWalletAddress}
                disabled={!this.props.methodSelected}
                onChange={(e) => {
                  this.onHandleChangeWalletAddress(e.target.value)
                }}
                placeholder="Recipient Address" />
              <InputGroup.Append>
                <InputGroup.Text>
                  {this.state.witWalletAddressValid
                    ? <i className="fas fa-check text-success" />
                    : <i className="fas fa-times text-danger" />}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col sm={5}>
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
          <Form.Label column sm={2} className="text-sm-left pt-0">
            Comment
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              maxLength={256}
              value={this.state.witComment}
              disabled={!this.props.methodSelected}
              placeholder="Please enter your comments here..."
              onChange={(e) => {
                this.onHandleChangeComment(e.target.value)
              }} />
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
              checked={this.state.witNotification}
              onChange={(e) => { this.onHandleChangeNotification(e) }}
              disabled={!this.props.methodSelected}
              name="form-horizontal-radios-example"
              id="form-horizontal-checkbox-example-1"
              label="Please notify me via email as soon as my request has been processed" />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2} className="text-sm-left pt-0"></Form.Label>
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
              loading={this.state.isFetching}
              data-style={SLIDE_DOWN}
              data-spinner-color="#fff"
              disabled={!this.state.validRequest}
              className="btn btn-instagram btn-lg font-weight-bold d-block w-100"
              onClick={(e) => {
                this.onHandleSubmitWithdrawalRequest(e)
              }}>
              <span>
                <i className="fas fa-credit-card mr-2"></i>
                <span>
                  Submit Withdrawal
                </span>
              </span>
            </LaddaButton>
          </Col>
        </Form.Group>

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

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(WithdrawalFormAlphaPo))