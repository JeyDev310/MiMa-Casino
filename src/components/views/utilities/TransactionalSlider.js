import React, { Component } from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import Swiper from 'react-id-swiper'

import '../../base/cui-components/CuiReactIdSwiper.css'
import '../../../vendor/libs/react-id-swiper/react-id-swiper.scss'

class TransactionalSlider extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
    }
  }

  componentDidMount() {
    const element = document.getElementsByClassName('swiper-container')[0]
    element.style['border-radius'] = "15px"
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    const swiperWithArrows = {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      renderPrevButton: () => <div className="swiper-button-prev custom-icon"><i className="lnr lnr-chevron-left text-body" style={{ fontSize: "1rem" }} /></div>,
      renderNextButton: () => <div className="swiper-button-next custom-icon"><i className="lnr lnr-chevron-right text-body" style={{ fontSize: "1rem" }} /></div>,
    }

    return (
      <>
        <Swiper {...swiperWithArrows}>
          <Card className="text-left mb-3 p-4 border-0" style={{
            borderRadius: "15px",
            objectFit: "cover",
            backgroundSize: "100%",
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935532-0006.jpg)`,
            height: "274px",
          }} >
          </Card>

          <Card className="text-left mb-3 p-4 border-0" style={{
            borderRadius: "15px",
            objectFit: "cover",
            backgroundSize: "70%",
            backgroundPositionX: "right",
            backgroundPositionY: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/packages/bento-3d/dashboard-ui-1-002@0.5x.png)`,
          }} >
            <Card.Header className="border-0">
              <img
                src={`${process.env.PUBLIC_URL}/img/uikit/logo-light-img-1-1-0.png`}
                className="d-block ui-w-60" alt="Live Poker Studio™" />
            </Card.Header>
            <Card.Body>
              <Card.Title as="h3">Safe & Secure</Card.Title>
              <Card.Text className="text-body h6">
                We hold players’ funds in segregated accounts, so that your money is always safe.
                <br />
                <span className="small">Manage your budget when playing online with our player-friendly tools.</span>
              </Card.Text>
              <Button
                variant="info rounded-pill font-weight-bold"
                onClick={() => { this.props.history.push('/settings') }}>
                Manage Settings
              </Button>
            </Card.Body>
          </Card>

          <Card className="text-left mb-3 p-4 border-0" style={{
            borderRadius: "15px",
            objectFit: "cover",
            backgroundSize: "100%",
            backgroundPositionX: "right",
            backgroundPositionY: "center",
            backgroundColor: "rgb(18, 19, 21)",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${process.env.PUBLIC_URL}/img/packages/ambient/ambient-1912935526-0012.jpg)`,
          }} >
            <Card.Header className="border-0">
              <img
                src={`${process.env.PUBLIC_URL}/img/uikit/logo-light-img-1-1-0.png`}
                className="d-block ui-w-60" alt="Live Poker Studio™" />
            </Card.Header>
            <Card.Body>
              <Card.Title as="h3">Welcome Offer</Card.Title>
              <Card.Text className="text-body h6">
                Get $20 free play when you deposit $100 or more with bonus code
                <Badge variant="default" pill className="font-weight-bold ml-1">WELCOME{new Date().getFullYear()}</Badge>
                <br />
                <span className="small">New players only. Terms & Conditions apply.</span>
              </Card.Text>
              <Button
                variant="info rounded-pill font-weight-bold"
                onClick={() => { this.props.history.push('/wallet/deposit') }}>
                New Deposit
              </Button>
            </Card.Body>
          </Card>
        </Swiper>
      </>
    )
  }
}

export default TransactionalSlider
