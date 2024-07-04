import React, { Component } from 'react'
import { Badge, Button, Card, Col, Form, InputGroup, Media, Modal, Row } from 'react-bootstrap'

// import { RSButton } from 'reactsymbols-kit'

import { formatPrice } from '../../utilities/TextPreprocessing'
import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'

import 'reactsymbols-kit/ReactSymbolsKit.css'
import '../../../../../vendor/styles/pages/chat.scss'

class DealerTip extends Component {

  constructor(props) {
    super(props)

    this.onChangeDealerTipAmount = this.onChangeDealerTipAmount.bind(this)
    this.onChangeDealerTipAmountByOption = this.onChangeDealerTipAmountByOption.bind(this)
    this.onSubmitDealerTip = this.onSubmitDealerTip.bind(this)
    this.onSubmitKeypress = this.onSubmitKeypress.bind(this)
    this.renderDealerTipButtonGroup = this.renderDealerTipButtonGroup.bind(this)

    this.state = {
      init: false,
      dealerTipInput: '',
      dealerTipAmount: 0,
      dealerTipAmountHint: 'Please enter a valid tip amount.',
      dealerTipAmountHintColor: 'text-white',
      projectedBalance: null,
      remainingDeposit: null,
    }
  }

  componentDidMount() {
    this.props.client.sendDealerTipRequest()
  }

  onChangeDealerTipAmount(e) {
    if (!this.props.game.data.demo_mode) {
      this.setState({
        dealerTipInput: e.target.value,
      })
      let amount = parseFloat(e.target.value)
      if (
        this.props.game.dealertip.player_minimum_dealer_tip <= amount &&
        amount <= this.props.game.dealertip.player_balance &&
        amount > 0
      ) {
        this.setState({
          dealerTipAmount: e.target.value,
          dealerTipAmountHint: `Tip the dealer with $${amount.toFixed(2)}.`,
          dealerTipAmountHintColor: 'text-white',
          projectedBalance: parseFloat(this.props.game.dealertip.player_balance - amount).toFixed(2),
          remainingDeposit: parseFloat(this.props.game.dealertip.player_balance - amount).toFixed(2),
        })
      } else {
        this.setState({
          dealerTipAmount: 0,
          dealerTipAmountHint: `Please enter a valid tip amount.`,
          dealerTipAmountHintColor: 'text-danger',
          projectedBalance: null,
          remainingDeposit: null,
        })
      }
    } else {
      this.setState({
        dealerTipInput: e.target.value,
      })
      let amount = parseFloat(e.target.value)
      if (
        this.props.game.dealertip.player_minimum_dealer_tip <= amount &&
        amount <= this.props.game.dealertip.player_balance &&
        amount > 0
      ) {
        this.setState({
          dealerTipAmount: e.target.value,
          dealerTipAmountHint: `Tip the dealer with $${amount.toFixed(2)}.`,
          dealerTipAmountHintColor: 'text-white',
          projectedBalance: parseFloat(this.props.game.dealertip.player_balance - amount).toFixed(2),
          remainingDeposit: parseFloat(this.props.game.dealertip.player_balance - amount).toFixed(2),
        })
      } else {
        this.setState({
          dealerTipAmount: 0,
          dealerTipAmountHint: `Please enter a valid tip amount.`,
          dealerTipAmountHintColor: 'text-danger',
          projectedBalance: null,
          remainingDeposit: null,
        })
      }
    }
  }

  onChangeDealerTipAmountByOption(value) {
    if (!this.props.game.data.demo_mode) {
      this.setState({
        dealerTipInput: value,
      })
      let amount = parseFloat(value)
      if (
        this.props.game.dealertip.player_minimum_dealer_tip <= amount &&
        amount <= this.props.game.dealertip.player_balance &&
        amount > 0
      ) {
        this.setState({
          dealerTipAmount: amount,
          dealerTipAmountHint: `Tip the dealer with $${amount.toFixed(2)}.`,
          dealerTipAmountHintColor: 'text-white',
          projectedBalance: parseFloat(this.props.game.dealertip.player_balance - amount).toFixed(2),
          remainingDeposit: parseFloat(this.props.game.dealertip.player_balance - amount).toFixed(2),
        })
      } else {
        this.setState({
          dealerTipAmount: 0,
          dealerTipAmountHint: `Please enter a valid tip amount.`,
          dealerTipAmountHintColor: 'text-danger',
          projectedBalance: null,
          remainingDeposit: null,
        })
      }
    } else {
      this.setState({
        dealerTipInput: value,
      })
      let amount = parseFloat(value)
      if (
        this.props.game.dealertip.player_minimum_dealer_tip <= amount &&
        amount <= this.props.game.dealertip.player_balance &&
        amount > 0
      ) {
        this.setState({
          dealerTipAmount: amount,
          dealerTipAmountHint: `Tip the dealer with $${amount.toFixed(2)}.`,
          dealerTipAmountHintColor: 'text-white',
          projectedBalance: parseFloat(this.props.game.dealertip.player_balance - amount).toFixed(2),
          remainingDeposit: parseFloat(this.props.game.dealertip.player_balance - amount).toFixed(2),
        })
      } else {
        this.setState({
          dealerTipAmount: 0,
          dealerTipAmountHint: `Please enter a valid tip amount.`,
          dealerTipAmountHintColor: 'text-danger',
          projectedBalance: null,
          remainingDeposit: null,
        })
      }
    }
  }

  onSubmitDealerTip() {
    if (!this.props.game.data.demo_mode) {
      if (
        this.props.game.dealertip.player_minimum_dealer_tip <= this.state.dealerTipAmount &&
        this.state.dealerTipAmount <= this.props.game.dealertip.player_balance &&
        this.state.dealerTipAmount > 0
      ) {
        this.props.client.sendDealerTipProcess(
          0,
          this.props.game.data.current_round,
          parseFloat(this.state.dealerTipAmount).toFixed(2),
        )
        this.props.close()
      }
    } else {
      if (
        this.props.game.dealertip.player_minimum_dealer_tip <= this.state.dealerTipAmount &&
        this.state.dealerTipAmount <= this.props.game.dealertip.player_balance &&
        this.state.dealerTipAmount > 0
      ) {
        this.props.client.sendDealerTipProcess(
          0,
          this.props.game.data.current_round,
          parseFloat(this.state.dealerTipAmount).toFixed(2),
        )
        this.props.close()
      }
    }
  }

  onSubmitKeypress(e) {
    if (e.key === 'Enter') {
      if (!this.props.game.data.demo_mode) {
        if (
          this.props.game.dealertip.player_minimum_dealer_tip <= this.state.dealerTipAmount &&
          this.state.dealerTipAmount <= this.props.game.dealertip.player_balance &&
          this.state.dealerTipAmount > 0
        ) {
          this.props.client.sendDealerTipProcess(
            0,
            this.props.game.data.current_round,
            parseFloat(this.state.dealerTipAmount).toFixed(2),
          )
          this.props.close()
        }
      } else {
        if (
          this.props.game.dealertip.player_minimum_dealer_tip <= this.state.dealerTipAmount &&
          this.state.dealerTipAmount <= this.props.game.dealertip.player_balance &&
          this.state.dealerTipAmount > 0
        ) {
          this.props.client.sendDealerTipProcess(
            0,
            this.props.game.data.current_round,
            parseFloat(this.state.dealerTipAmount).toFixed(2),
          )
          this.props.close()
        }
      }
    }
  }


  renderBuyInButtonGroup() {
    if (this.props.game.data) {
      var minBuyIn = Number(this.props.game.data.current_game_values.table_minimum_buy_in)
      var maxBuyIn = Number(this.props.game.data.current_game_values.table_maximum_buy_in)
      var x1BuyIn = Math.round(Number(((maxBuyIn - minBuyIn) / 4) + minBuyIn))
      var x2BuyIn = Math.round(Number(((maxBuyIn - minBuyIn) / 2) + minBuyIn))
      return (
        <Row className="mb-3">
          <Col>
            <Button variant="default" className="mr-2 mb-0 px-4" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.buyInInput === minBuyIn ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeBuyInAmountByOption(minBuyIn) }}>
              <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(minBuyIn)}</span>
              <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Buy-In</div>
            </Button>
          </Col>
          <Col>
            <Button variant="default" className="mr-2 mb-0 px-4" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.buyInInput === x1BuyIn ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeBuyInAmountByOption(x1BuyIn) }}>
              <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(x1BuyIn)}</span>
              <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Buy-In</div>
            </Button>
          </Col>
          <Col>
            <Button variant="default" className="mr-2 mb-0 px-4"style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.buyInInput ===x2BuyIn ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeBuyInAmountByOption(x2BuyIn) }}>
              <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(x2BuyIn)}</span>
              <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Buy-In</div>
            </Button>
          </Col>
          <Col>
            <Button variant="default" className="mb-0 px-4" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.buyInInput === maxBuyIn ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}} onClick={() => { this.onChangeBuyInAmountByOption(maxBuyIn) }}>
              <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(maxBuyIn)}</span>
              <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Buy-In</div>
            </Button>
          </Col>          
        </Row>
      )
    } else {
      return (null)
    }
  }

  renderDealerTipButtonGroup() {
    if (this.props.game.dealertip) {
      var maxDealerTip = Number(this.props.game.dealertip.player_balance)
      return (
        <Row className="mb-3 mt-3">
          <Col className="p-1">
          {maxDealerTip > 1 && (
            
            <Button variant="default" className="w-100 mb-2 px-5" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.dealerTipInput === 1 ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}}  onClick={() => { this.onChangeDealerTipAmountByOption(1) }}>
              <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(1)}</span>
              <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Tip</div>
            </Button>            
          )}
          </Col>
          <Col className="p-1">
          {maxDealerTip > 5 && (
            <Button variant="default" className="w-100 px-5" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.dealerTipInput === 5 ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}}  onClick={() => { this.onChangeDealerTipAmountByOption(5) }}>
            <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(5)}</span>
            <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Tip</div>
            </Button>            
          )}
          </Col>
          <Col className="p-1">
          {maxDealerTip > 10 && (
            <Button variant="default" className="w-100 px-5" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.dealerTipInput === 10 ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}}  onClick={() => { this.onChangeDealerTipAmountByOption(10) }}>
            <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(10)}</span>
            <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Tip</div>
          </Button>
          )}
          </Col>
          <Col className="p-1">
          {maxDealerTip > 25 && (
            <Button variant="default" className="w-100 px-5" style={{ border: "1px solid rgba(197, 189, 189, 0.62)", borderRadius: "38px", fontVariantNumeric: "lining-nums", background: `${this.state.dealerTipInput === 25 ? 'linear-gradient(25.43deg, #0986A9 -27.92%, rgba(79, 199, 236, 0.7) 90.03%)':'rgba(29, 35, 45, 0.62)'}`}}  onClick={() => { this.onChangeDealerTipAmountByOption(25) }}>
            <span style={{fontSize: "16px", fontWeight: "900"}}>{formatPrice(25)}</span>
            <div className="mb-0" style={{fontSize: "9px", fontWeight: "600", marginTop: "-4px"}}>Choose Tip</div>
          </Button>
          )}
          </Col>
        </Row>
      )
    } else {
      return (null)
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {this.props.game.profile && this.props.game.player && this.props.game.dealertip
          ? <>
            {this.props.game.dealertip.player_balance > Number(this.props.game.data.current_game_values.table_big_blind)
              ? <>
                {/* Dealer Tip Modal */}
                <Modal.Body style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "2px solid rgba(9, 134, 169, 0.7)",
                  padding: "0.7rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <div className="d-flex w-100 justify-content-end">
                  <Form.Label
                    className="ml-3 mb-0 font-weight-bold text-tiny cursor-pointer"
                    style={{marginTop: "2px"}}
                    onClick={this.props.close}>
                    <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="white"/>
                    </svg>
                    </span>
                  </Form.Label>
                  </div>
                  
                  <div>
                    <p className="text-white" style={{fontSize: "24px", fontWeight: "800"}}>
                      Tip the Dealer
                    </p>
                  </div>

                  <div className="fill-modal-hr"/>
                  <Row className="mx-5 my-4 fill-modal-mobile-hidden">
                    <Col
                      // sm={4} md={4}                                       
                      style={{ opacity: `${this.state.remainingDeposit
                        ? "1.0"
                        : "0.5"}`, backgroundImage: "linear-gradient(to right, #84DAFF, #FFFFFF)", borderRadius: "6px", padding: "1px"}}>
                      <Badge
                        // pill variant="default"
                        className={`d-flex align-items-center p-2 `} style={{background: "#000000", borderRadius: "6px"}}>
                        <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2 rounded-circle" style={{backgroundImage: "linear-gradient(to top, #84DAFF, #FFFFFF)", padding: "1px"}}>
                          <div className="rounded-circle p-1" style={{backgroundImage: "linear-gradient(to top, #000000, #005676)"}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.82 17.1H13.42V21.58H11.82V17.1ZM12.1 16.66V7.22L13.14 6.94V16.7L12.1 16.66ZM11.82 2.7H13.42V6.54L11.82 6.82V2.7ZM16.2 9.44C16.2 9.44 16.0867 9.37333 15.86 9.24C15.6333 9.10667 15.3333 8.96 14.96 8.8C14.5867 8.62667 14.18 8.47333 13.74 8.34C13.3 8.20667 12.8667 8.14 12.44 8.14C12.1067 8.14 11.8333 8.19333 11.62 8.3C11.4067 8.40667 11.3 8.58667 11.3 8.84C11.3 9.08 11.4067 9.27333 11.62 9.42C11.8333 9.56667 12.1333 9.7 12.52 9.82C12.92 9.94 13.3933 10.0867 13.94 10.26C14.82 10.5267 15.58 10.8333 16.22 11.18C16.86 11.5267 17.3533 11.9733 17.7 12.52C18.0467 13.0533 18.22 13.7667 18.22 14.66C18.22 15.5133 18.0667 16.2333 17.76 16.82C17.4533 17.3933 17.04 17.8533 16.52 18.2C16 18.5467 15.42 18.8 14.78 18.96C14.14 19.1067 13.4867 19.18 12.82 19.18C12.14 19.18 11.4267 19.1133 10.68 18.98C9.94667 18.8333 9.23333 18.64 8.54 18.4C7.84667 18.1467 7.21333 17.8533 6.64 17.52L8.32 14.1C8.32 14.1 8.45333 14.18 8.72 14.34C8.98667 14.5 9.34 14.68 9.78 14.88C10.22 15.08 10.7067 15.26 11.24 15.42C11.7867 15.58 12.3333 15.66 12.88 15.66C13.3067 15.66 13.6 15.6067 13.76 15.5C13.9333 15.38 14.02 15.2267 14.02 15.04C14.02 14.76 13.8733 14.5467 13.58 14.4C13.2867 14.24 12.9 14.0933 12.42 13.96C11.9533 13.8133 11.4333 13.6467 10.86 13.46C10.0333 13.18 9.35333 12.8667 8.82 12.52C8.28667 12.16 7.89333 11.74 7.64 11.26C7.38667 10.7667 7.26 10.1733 7.26 9.48C7.26 8.42667 7.50667 7.54667 8 6.84C8.49333 6.13333 9.14 5.6 9.94 5.24C10.7533 4.86667 11.6267 4.68 12.56 4.68C13.2533 4.68 13.92 4.76667 14.56 4.94C15.2133 5.1 15.82 5.3 16.38 5.54C16.9533 5.78 17.4533 6.00667 17.88 6.22L16.2 9.44Z" fill="white"/>
                            </svg>
                          </div>                            
                        </span>

                        <Media.Body className="ml-2 text-left">
                          <span className="text-medium font-weight-bold">
                            {formatPrice(this.state.projectedBalance)}/{formatPrice(this.props.game.dealertip.player_balance)}
                          </span>
                          <div className="chat-status small text-body font-weight-bold pt-1">
                            <span className="text-medium font-weight-bold text-body">
                              {this.state.projectedBalance
                                ? <span>Updated Balance</span>
                                : <span>Balance</span>
                              }
                            </span>
                          </div>
                        </Media.Body>                                
                      </Badge>
                    </Col>
                    <Col
                      className="ml-3"
                      // sm={4} md={4}                                       
                      style={{ opacity: `${this.state.remainingDeposit
                        ? "1.0"
                        : "0.5"}`, backgroundImage: "linear-gradient(to right, #84DAFF, #FFFFFF)", borderRadius: "6px", padding: "1px"}}>
                      <Badge
                        // pill variant="default"
                        className={`d-flex align-items-center p-2 `} style={{background: "#000000", borderRadius: "6px"}}>
                        <span className="svg-icon svg-icon-muted svg-icon-2hx ml-2 rounded-circle" style={{backgroundImage: "linear-gradient(to top, #84DAFF, #FFFFFF)", padding: "1px"}}>
                          <div className="rounded-circle p-1" style={{backgroundImage: "linear-gradient(to top, #000000, #005676)"}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.22222 5C2.99653 5 2 6.04635 2 7.33333V16.6667C2 17.9536 2.99653 19 4.22222 19H19.7778C21.0035 19 22 17.9536 22 16.6667V7.33333C22 6.04635 21.0035 5 19.7778 5H4.22222ZM11.4444 9.66667H19.2222C19.5278 9.66667 19.7778 9.92917 19.7778 10.25C19.7778 10.5708 19.5278 10.8333 19.2222 10.8333H11.4444C11.1389 10.8333 10.8889 10.5708 10.8889 10.25C10.8889 9.92917 11.1389 9.66667 11.4444 9.66667ZM10.8889 13.75C10.8889 13.4292 11.1389 13.1667 11.4444 13.1667H19.2222C19.5278 13.1667 19.7778 13.4292 19.7778 13.75C19.7778 14.0708 19.5278 14.3333 19.2222 14.3333H11.4444C11.1389 14.3333 10.8889 14.0708 10.8889 13.75ZM7.69444 8.20833V8.7151C7.95486 8.75885 8.20139 8.82083 8.42708 8.88646C8.79861 8.98854 9.01736 9.38958 8.92014 9.77969C8.82292 10.1698 8.44097 10.3995 8.06944 10.2974C7.6875 10.1917 7.31944 10.1151 6.98611 10.1078C6.71181 10.1042 6.43056 10.1734 6.23958 10.2901C6.07292 10.3922 6.02431 10.4943 6.02431 10.6292C6.02431 10.6948 6.02778 10.7568 6.20833 10.8734C6.42708 11.012 6.74653 11.1177 7.19097 11.2563L7.21528 11.2635C7.60417 11.3875 8.10417 11.5443 8.50347 11.8104C8.95139 12.1057 9.34722 12.587 9.35764 13.3271C9.36806 14.0891 8.99306 14.6432 8.49653 14.9677C8.24653 15.1318 7.96875 15.2339 7.69097 15.2958V15.7917C7.69097 16.1927 7.37847 16.5208 6.99653 16.5208C6.61458 16.5208 6.30208 16.1927 6.30208 15.7917V15.2594C5.94444 15.1792 5.60764 15.0589 5.32292 14.9531C5.25 14.9276 5.18056 14.9021 5.11111 14.8766C4.74653 14.749 4.55208 14.337 4.67361 13.9542C4.79514 13.5714 5.1875 13.3672 5.55208 13.4948C5.63889 13.524 5.72222 13.5568 5.80208 13.5823C6.27431 13.75 6.63542 13.8776 7.02083 13.8922C7.31944 13.9031 7.59375 13.8339 7.76389 13.7208C7.90625 13.6297 7.97222 13.5203 7.96875 13.338C7.96875 13.2323 7.94097 13.1557 7.76389 13.0391C7.54514 12.8932 7.22917 12.7875 6.79167 12.649L6.73264 12.6307C6.35417 12.5104 5.87847 12.3609 5.49653 12.1203C5.05556 11.8396 4.64236 11.3729 4.63889 10.6365C4.63542 9.86719 5.04861 9.3349 5.53472 9.03594C5.77431 8.88646 6.03819 8.78802 6.30556 8.72604V8.20833C6.30556 7.80729 6.61806 7.47917 7 7.47917C7.38194 7.47917 7.69444 7.80729 7.69444 8.20833Z" fill="#F1F1F1"/>
                              </svg>
                          </div>                            
                        </span>

                        <Media.Body className="ml-2 text-left">
                          <span className="text-medium font-weight-bold">
                            {formatPrice(this.props.game.dealertip.player_minimum_dealer_tip)}/{formatPrice(this.props.game.dealertip.player_maximum_dealer_tip)}
                          </span>
                          <div className="chat-status small text-body font-weight-bold pt-1">
                            <span className="text-medium font-weight-bold text-body">
                              Minimum/Maximum
                            </span>
                          </div>
                        </Media.Body>                                
                      </Badge>
                    </Col>
                  </Row>
                  <div className="fill-modal-button-group-width mt-2">{this.renderDealerTipButtonGroup()}</div>
                  <div className="fill-modal-input">
                      <InputGroup size="lg" className="mb-3" style={{background: "linear-gradient(226.24deg, #005676 -92.19%, #000000 95.07%)", border: "1 solid rgba(29, 35, 45, 0.3)", borderRadius: "6px"}}>
                        <InputGroup.Prepend style={{background: "rgba(241, 241, 241, 0.3)", borderRadius: "6px 0 0 6px"}}>
                          <InputGroup.Text>
                            <span className="svg-icon svg-icon-muted svg-icon-2hx">
                              <svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.987 9.48659C13.7755 9.32464 13.5556 9.17494 13.3277 9.03818C12.9045 8.77482 12.4638 8.54181 12.009 8.34099C11.4505 8.08126 10.8704 7.87324 10.2756 7.71942C9.66879 7.56369 9.04626 7.4809 8.42067 7.47262C7.75704 7.43215 7.09607 7.58924 6.51783 7.92494C6.30526 8.06821 6.1328 8.26571 6.01758 8.49795C5.90236 8.73019 5.84831 8.98907 5.86074 9.2492C5.85808 9.46391 5.90305 9.67648 5.99207 9.87093C6.08108 10.0654 6.21173 10.2367 6.37464 10.372C6.80257 10.7295 7.30339 10.9846 7.84005 11.1188C8.47479 11.3176 9.25601 11.5662 10.2813 11.8143C11.4719 12.1366 12.6256 12.5867 13.7236 13.1573C14.6201 13.6027 15.393 14.2712 15.9714 15.1015C16.5473 16.0505 16.8294 17.1552 16.781 18.2712C16.8121 19.3266 16.5871 20.3736 16.1263 21.3184C15.7115 22.1364 15.1098 22.8398 14.3722 23.3685C13.6289 23.8799 12.8034 24.253 11.9334 24.4709C10.9823 24.7036 10.0081 24.8223 9.03018 24.8247C7.98894 24.8284 6.95011 24.7214 5.93058 24.505C4.88131 24.2898 3.85214 23.9821 2.85458 23.5857C1.91345 23.2019 1.00657 22.7354 0.144021 22.1916L2.26111 17.8939C2.4927 18.105 2.74654 18.2888 3.01819 18.442C3.53248 18.7606 4.07161 19.0354 4.62996 19.2635C5.32068 19.5748 6.03016 19.8407 6.75406 20.0593C7.548 20.2873 8.37025 20.3954 9.19475 20.3802C9.87216 20.4366 10.551 20.288 11.1465 19.9528C11.3352 19.824 11.4894 19.6492 11.5956 19.4441C11.7018 19.2391 11.7567 19.0103 11.7549 18.7782C11.7611 18.5293 11.7033 18.2833 11.5874 18.0644C11.4715 17.8455 11.3014 17.6614 11.0943 17.5308C10.5436 17.1614 9.9431 16.8764 9.3118 16.6847L6.69947 15.8897C5.60649 15.5558 4.55099 15.1054 3.54991 14.546C2.79195 14.1166 2.15939 13.4885 1.71722 12.7262C1.28123 11.9088 1.06918 10.986 1.10348 10.0555C1.05639 8.70169 1.42103 7.36638 2.14737 6.23375C2.74767 5.21752 3.60701 4.38754 4.63316 3.83293C5.84942 3.2936 7.16204 3.01947 8.48754 3.02804C9.44929 3.02892 10.4078 3.14482 11.3432 3.37328C12.1768 3.61189 12.9927 3.911 13.7847 4.2684C14.5026 4.60561 15.2035 4.97958 15.8848 5.38881L13.987 9.48659Z" fill="#F1F1F1"/>
                                <path d="M9.02113 0.0117654L8.69189 2.38489L10.7696 2.6865L11.0989 0.313377L9.02113 0.0117654Z" fill="#F1F1F1"/>
                                <path d="M5.5093 25.3283L5.21436 27.4543L7.2921 27.7559L7.58704 25.6299L5.5093 25.3283Z" fill="#F1F1F1"/>
                              </svg>
                            </span>
                          </InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                          autoFocus
                          placeholder="Your buy-in amount"
                          className="bg-light"
                          style={{ color: "white", fontSize: "24px", fontWeight: "800", fontVariantNumeric: "lining-nums", borderColor: this.state.dealerTipInput === '' ? "#DE4A4A" : "#4FC7EC"}}
                          value={this.state.dealerTipAmount}
                          onChange={(e) => { this.onChangeDealerTipAmount(e) }}
                          onKeyPress={(e) => { this.onSubmitKeypress(e) }} />
                        
                      </InputGroup>
                    </div>
                  <div className="fill-modal-mobile-hidden" style={{fontSize: "14px", fontWeight: "700"}}>
                    Tip the dealer with {this.state.dealerTipInput}
                  </div>

                  <div className="text-center mb-3 fill-modal-mobile-hidden" style={{width: "80%", fontSize: "12px"}}>
                    In order to tip the dealer, you need a valid player account with a valid buy-in. The minimum tip is $1. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                  </div>

                  {/* <div className="fill-modal-hr"/> */}
                  <div                     
                    onClick={this.onSubmitDealerTip}
                    className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                    style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                    ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Submit</div></div>
                  </div>                  
                  {/* <Button
                    variant="instagram" block
                    onClick={this.props.close}
                    className="font-weight-bold">
                    Close
                  </Button> */}
                </Modal.Body>
                {/* / Dealer Tip Modal */}
              </>
              : <>
                {/* Dealer Tip Modal */}
                <Modal.Body style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "2px solid rgba(9, 134, 169, 0.7)",
                  padding: "0.7rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <div className="d-flex w-100 justify-content-end">
                  <Form.Label
                    className="ml-3 mb-0 font-weight-bold text-tiny cursor-pointer"
                    style={{marginTop: "2px"}}
                    onClick={this.props.close}>
                    <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="white"/>
                    </svg>
                    </span>
                  </Form.Label>
                  </div>
                  
                  <div>
                    <p className="text-white" style={{fontSize: "24px", fontWeight: "800"}}>
                      Tip the Dealer
                    </p>
                  </div>

                  <div className="fill-modal-hr"/>
                  <Card className="d-flex w-100 my-4 bg-transparent border-0 shadow-none">
                    <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                      <Col
                        sm={12} md={12} lg={12}
                        className="d-flex align-items-center border-0 shadow-none"
                        style={{ justifyContent: "center", }}>
                        <ResourceLoaderB
                          height="4rem" width="4rem" />
                      </Col>
                    </Row>
                  </Card>
                  <div className="mb-3" style={{fontSize: "14px", fontWeight: "700"}}>
                    Sorry, tipping is currently not possible...
                  </div>

                  <div className="text-center mb-4" style={{width: "80%", fontSize: "12px"}}>
                    In order to tip the dealer, you need a valid player account with a valid buy-in. The minimum tip is $1. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                  </div>
                  {/* <div className="fill-modal-hr"/> */}
                  <div                     
                    onClick={this.props.close}
                    className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button"
                    style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                    ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Accept</div></div>
                  </div>                                   
                </Modal.Body>                
                {/* / Dealer Tip Modal */}
              </>}
          </>
          : <>
            {/* Dealer Tip Modal */}
            <Modal.Body style={{
                  borderRadius: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "2px solid rgba(9, 134, 169, 0.7)",
                  padding: "0.7rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  <div className="d-flex w-100 justify-content-end">
                  <Form.Label
                    className="ml-3 mb-0 font-weight-bold text-tiny cursor-pointer"
                    style={{marginTop: "2px"}}
                    onClick={this.props.close}>
                    <span className="svg-icon svg-icon-muted svg-icon-2hx">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="white"/>
                    </svg>
                    </span>
                  </Form.Label>
                  </div>
                  
                  <div>
                    <p className="text-white" style={{fontSize: "24px", fontWeight: "800"}}>
                      Tip the Dealer
                    </p>
                  </div>

                  <div className="fill-modal-hr"/>
                  <Card className="d-flex w-100 my-4 bg-transparent border-0 shadow-none">
                    <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                      <Col
                        sm={12} md={12} lg={12}
                        className="d-flex align-items-center border-0 shadow-none"
                        style={{ justifyContent: "center", }}>
                        <ResourceLoaderB
                          height="4rem" width="4rem" />
                      </Col>
                    </Row>
                  </Card>
                  <div className="mb-3" style={{fontSize: "14px", fontWeight: "700"}}>
                    Sorry, tipping is currently not possible...
                  </div>

                  <div className="text-center mb-4" style={{width: "80%", fontSize: "12px"}}>
                    In order to tip the dealer, you need a valid player account with a valid buy-in. The minimum tip is $1. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
                  </div>
                  {/* <div className="fill-modal-hr"/> */}
                  <div                     
                    onClick={this.props.close}
                    className="d-flex justify-content-center align-items-center cursor-pointer fill-modal-button mt-4"
                    style={{borderRadius: "10px", padding: '1px 1px 2px 1px', background: "linear-gradient(to right, #4FC7EC, #AFE6F6)"}}
                    ><div  className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: "#1C8CB6" , borderRadius: "9px"}}><div style={{fontSize: "24px", fontWeight: "800"}}>Accept</div></div>
                  </div>   
                  
                </Modal.Body>
            {/* / Dealer Tip Modal */}
          </>}
      </>
    )
  }
}

export default DealerTip