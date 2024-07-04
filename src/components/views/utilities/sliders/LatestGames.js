import React, { Component } from 'react'
// import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../../../vendor/styles/pages/stories.scss'

class LatestGames extends Component {

    constructor(props) {
        super(props)

        this.state = {
            init: false,
        }
    }

    componentDidMount() {

    }

    prevent(e) {
        e.preventDefault()
    }

    render() {

        // var settings = {
        //     className: "center",
        //     centerMode: true,
        //     infinite: true,
        //     centerPadding: "60px",
        //     slidesToShow: 3,
        //     slidesToScroll: 1,
        //     dots: false,
        //     arrows: true,
        //     // prevArrow: <React.Fragment>
        //     //     <button type="button" className="slick-prev">
        //     //         <svg className="icon icon-arrow-left">
        //     //             <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-arrow-left`}></use>
        //     //         </svg>
        //     //     </button>
        //     // </React.Fragment>,
        //     // nextArrow: <React.Fragment>
        //     //     <button type="button" className="slick-next">
        //     //         <svg className="icon icon-arrow-right">
        //     //             <use xlinkHref={`${process.env.PUBLIC_URL}/svg/sprites/navigation.svg#icon-arrow-right`}></use>
        //     //         </svg>
        //     //     </button>
        //     // </React.Fragment>,
        //     centerMode: true,
        //     speed: 700,
        //     responsive: [{
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 1,
        //         },
        //     }]
        // }

        return (
            <>

                {/* <div className="stories">
                    <div className="stories__container">

                        <Slider
                            {...settings}
                            className="stories__slider js-slider-stories">

                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                                <div key={index}>
                                    <div className="stories__slide">
                                        <div
                                            className="stories__item"
                                            style={{
                                                backgroundImage: `url('${process.env.PUBLIC_URL}/img/section/games/stories/stories-pic.png')`,
                                            }}>
                                            <div className="stories__progress">
                                                <div className="stories__line active"></div>
                                                <div className="stories__line"></div>
                                            </div>
                                            <span className="stories__user">
                                                <div className="stories__ava">
                                                    <img className="stories__pic"
                                                        src="img/ava-1.png" alt="" />
                                                </div>
                                                <div className="stories__desc">
                                                    <div className="stories__man confirm">
                                                        Tran Mau Tri Tam
                                                    </div>
                                                    <div className="stories__game">
                                                        Call of Duty
                                                    </div>
                                                    <div className="status orange">
                                                        2.8K viewers
                                                    </div>
                                                </div>
                                            </span>
                                            <form className="stories__form">
                                                <input className="stories__input" type="text" placeholder="Send a message…" />
                                                <button className="stories__btn btn btn_purple">
                                                    Send
                                                </button>
                                                <button className="stories__smile">
                                                    <svg className="icon icon-editor-smile">
                                                        <use xlinkHref="img/sprite.svg#icon-editor-smile"></use>
                                                    </svg>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </Slider>

                    </div>
                </div> */}

            </>
        )
    }
}

export default LatestGames