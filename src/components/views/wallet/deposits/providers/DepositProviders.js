import React, { Component } from 'react'
import { Button, ButtonGroup, Card, Col, Form, Image, Row } from 'react-bootstrap'

import DepositFormAlphaPo from './forms/DepositFormAlphaPo'
import DepositFormRemitEx from './forms/DepositFormRemitEx'
import DepositFormPlaceholder from './forms/DepositFormPlaceholder'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { objectsRequestHandler } from '../../../../store/actions'

import {
  REQ_PROFILE_WALLET_GET,
} from '../../../../store/objects/actionTypes'

import '../../assets/css/views.css'

class DepositProviders extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: true,
      methodSelected: false,
      selectedProvider: '',
      selectedIndex: null,
      providerType: null,
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
    })
  }

  renderProviderForm() {
    if (this.state.selectedProvider === 'remitex') {
      return <DepositFormRemitEx {...this.props} {...this.state} />
    } else if (this.state.selectedProvider === 'alphapo') {
      return <DepositFormAlphaPo {...this.props} {...this.state} />
    } else {
      return <DepositFormPlaceholder {...this.props} {...this.state} />
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <ButtonGroup className="mb-0 w-100">
        <Button
          variant={this.state.selectedIndex === 0 ? 'opaque1' : 'light'}
          className="font-weight-bold mr-2 h5 mb-0 border-0 py-2"
          style={{ borderRadius: "5px", }}
          onClick={() => { this.handleChangeSelectProvider(this.methodOptions[0]) }}>
          <span className="mb-2">
            <img
              src={`${process.env.PUBLIC_URL}/img/payment/col-select-visa-dark.png`}
              alt="Live Poker Studio™" className="ui-w-140" />
          </span>
          <div className="text-tiny text-body mb-0">Choose</div>
        </Button>

        <Button
          variant={this.state.selectedIndex === 1 ? 'opaque1' : 'light'}
          className="font-weight-bold mr-2 h5 mb-0 border-0 py-2"
          style={{ borderRadius: "5px", }}
          onClick={() => { this.handleChangeSelectProvider(this.methodOptions[1]) }}>
          <span className="mb-2">
            <img
              src={`${process.env.PUBLIC_URL}/img/payment/col-select-mastercard-dark.png`}
              alt="Live Poker Studio™" className="ui-w-140" />
          </span>
          <div className="text-tiny text-body mb-0">Choose</div>
        </Button>

        <Button
          variant={this.state.selectedIndex === 2 ? 'opaque1' : 'light'}
          className="font-weight-bold h5 mb-0 border-0 py-2"
          style={{ borderRadius: "5px", }}
          onClick={() => { this.handleChangeSelectProvider(this.methodOptions[2]) }}>
          <span className="mb-2">
            <img
              src={`${process.env.PUBLIC_URL}/img/payment/col-select-crypto-dark.png`}
              alt="Live Poker Studio™" className="ui-w-140" />
          </span>
          <div className="text-tiny text-body mb-0">Choose</div>
        </Button>
      </ButtonGroup>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.objects.error,
})

export default withRouter(connect(mapStateToProps, { objectsRequestHandler })(DepositProviders))