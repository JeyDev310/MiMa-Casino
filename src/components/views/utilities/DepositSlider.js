import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

import Swiper from 'react-id-swiper'

import '../../base/cui-components/CuiReactIdSwiper.css'
import '../../../vendor/libs/react-id-swiper/react-id-swiper.scss'

class DepositSlider extends Component {

    constructor(props) {
        super(props)

        this.state = {
            init: false,
        }
    }

    componentDidMount() {
        const element = document.getElementsByClassName('swiper-container')[0]
        element.style['border-radius'] = "15px"
        element.style['height'] = "100%"
        element.style['filter'] = "drop-shadow(0px 0px 10px rgba(0, 0, 0, 1.0))"
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
                        backgroundImage: `url(${process.env.PUBLIC_URL}/img/section/wallet/wallet-item-4-1-1.jpg)`,
                    }} >
                        <Card.ImgOverlay
                            className="bg-light"
                            style={{ textAlign: "initial", borderRadius: "15px", }}>
                            <div>
                                <div
                                    className="flex-shrink-1 p-3"
                                    style={{
                                        borderRadius: '10px 10px 10px 10px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                    }}>
                                    <div className="font-weight-bold d-flex align-items-center mb-2 p-2">
                                        <div>
                                            <img
                                                src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-@8.png`}
                                                alt="Live Poker Studio™ Logo" className="d-block" style={{ width: "160px", }} />
                                        </div>
                                    </div>
                                    <hr className="m-2 py-0" />
                                    <span className="font-weight-bold p-2">
                                        <span>
                                            Welcome Offer
                                        </span>
                                    </span>
                                    <hr className="m-2 py-0" />
                                    <span className="font-weight-bold p-2">
                                        <span className="h6 mb-0">
                                            Coming soon
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </Card.ImgOverlay>
                    </Card>

                    <Card className="text-left mb-3 p-4 border-0" style={{
                        borderRadius: "15px",
                        objectFit: "cover",
                        backgroundSize: "100%",
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${process.env.PUBLIC_URL}/img/section/wallet/wallet-item-7-1-1.jpg)`,
                    }} >
                        <Card.ImgOverlay
                            className="bg-light"
                            style={{ textAlign: "initial", borderRadius: "15px", }}>
                            <div>
                                <div
                                    className="flex-shrink-1 p-3"
                                    style={{
                                        borderRadius: '10px 10px 10px 10px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                    }}>
                                    <div className="font-weight-bold d-flex align-items-center mb-2 p-2">
                                        <div>
                                            <img
                                                src={`${process.env.PUBLIC_URL}/img/uikit/livepokerstudio-logo-@8.png`}
                                                alt="Live Poker Studio™ Logo" className="d-block" style={{ width: "160px", }} />
                                        </div>
                                    </div>
                                    <hr className="m-2 py-0" />
                                    <span className="font-weight-bold p-2">
                                        <span>
                                            Promotion
                                        </span>
                                    </span>
                                    <hr className="m-2 py-0" />
                                    <span className="font-weight-bold p-2">
                                        <span className="h6 mb-0">
                                            Coming soon
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </Card.ImgOverlay>
                    </Card>
                </Swiper>
            </>
        )
    }
}

export default DepositSlider