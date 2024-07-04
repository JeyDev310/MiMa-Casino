import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ReactStars from 'react-stars'

import API from '../../../../../api'

import '../../../../../vendor/styles/pages/chat.scss'
import '../../../../../vendor/styles/pages/navigation.scss'

class Feedback extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
      data: null,
    }
  }

  async componentDidMount() {
    await API.get(
      `stats/${this.props.channelId}/get/`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          data: res.data,
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  async submitFeedback(payload) {
    let fd = new FormData()
    fd.append('params', JSON.stringify({
      like: payload.like,
      dislike: payload.dislike,
      heart: payload.heart,
      share: payload.share,
      rating: payload.rating,
    }))
    await API.post(
      `stats/${this.props.channelId}/update/`, fd, {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data',
      },
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          data: res.data,
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {

    const starsOptions = {
      size: 32,
      count: 5,
      value: this.state.data && (this.state.data.rating || 5),
      color1: 'rgba(255, 255, 255, 0.2)',
      color2: 'rgba(255, 153, 0, 0.85)',
      onChange: newValue => {
        this.submitFeedback({
          like: false,
          dislike: false,
          heart: false,
          share: false,
          rating: parseFloat(newValue),
        })
      }
    }

    return (
      <>
        {/* Feedback Modal */}
        {this.state.data
          ? <>
            <Modal.Body style={{
              borderRadius: "15px",
              backgroundColor: "rgba(37, 40, 46, 0.7)",
            }}>
              <h3 className="text-center font-weight-bold">
                Feedback
              </h3>

              <hr className="border-light m-0 py-2" />

              <div className="game__actions p-5 mb-2">
                <span
                  id="feedback-item-1"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${true && "nav_link__item__active"}`}
                  onClick={(e) => { this.prevent(e) }}>
                  <div>
                    <span>
                      <i className={`far fa-eye icon__item px-2 icon__success`} />
                    </span>
                    <div className="icon__text d-flex align-items-center justify-content-center mt-2 font-weight-bold text-body">
                      {this.state.data && (this.state.data.hits || '0')}
                    </div>
                  </div>
                </span>

                <span
                  id="feedback-item-1"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.state.data && (this.state.data.liked_by && "nav_link__item__active")}`}
                  onClick={(e) => {
                    this.submitFeedback({
                      like: true,
                      dislike: false,
                      heart: false,
                      share: false,
                      rating: false,
                    })
                  }}>
                  <div>
                    <span>
                      <i className={`far fa-thumbs-up icon__item px-2 ${true ? "icon__success" : "icon__default"}`} />
                    </span>
                    <div className="icon__text d-flex align-items-center justify-content-center mt-2 font-weight-bold text-body">
                      {this.state.data && (this.state.data.likes || '0')}
                    </div>
                  </div>
                </span>

                <span
                  id="feedback-item-2"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.state.data && (this.state.data.disliked_by && "nav_link__item__active")}`}
                  onClick={(e) => {
                    this.submitFeedback({
                      like: false,
                      dislike: true,
                      heart: false,
                      share: false,
                      rating: false,
                    })
                  }}>
                  <div>
                    <span>
                      <i className={`far fa-thumbs-down icon__item px-2 ${true ? "icon__success" : "icon__default"}`} />
                    </span>
                    <div className="icon__text d-flex align-items-center justify-content-center mt-2 font-weight-bold text-body">
                      {this.state.data && (this.state.data.dislikes || '0')}
                    </div>
                  </div>
                </span>

                <span
                  id="feedback-item-3"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.state.data && (this.state.data.loved_by && "nav_link__item__active")}`}
                  onClick={(e) => {
                    this.submitFeedback({
                      like: false,
                      dislike: false,
                      heart: true,
                      share: false,
                      rating: false,
                    })
                  }}>
                  <div>
                    <span>
                      <i className={`far fa-heart icon__item px-2 ${true ? "icon__success" : "icon__default"}`} />
                    </span>
                    <div className="icon__text d-flex align-items-center justify-content-center mt-2 font-weight-bold text-body">
                      {this.state.data && (this.state.data.hearts || '0')}
                    </div>
                  </div>
                </span>
              </div>

              <hr className="border-light m-0 py-2" />

              <div>
                <span className="d-flex align-items-center justify-content-center mb-0">
                  <ReactStars {...starsOptions} />
                </span>

                <span className="d-flex align-items-center justify-content-center mb-3">
                  {this.state.data && (this.state.data.rating || '5.0')} ({this.state.data && (this.state.data.rate_count || '1')})
                </span>
              </div>

              <Button
                variant="instagram" block
                onClick={this.props.close}
                className="font-weight-bold h5 mb-0">
                Continue
              </Button>
            </Modal.Body>
          </>
          : <>
            <Modal.Body style={{
              borderRadius: "15px",
              backgroundColor: "rgba(37, 40, 46, 0.7)",
            }}>
              <h3 className="text-center font-weight-bold">
                Feedback
              </h3>

              <hr className="border-light m-0 py-2" />

              <div className="game__actions p-5 mb-2">
                <span
                  id="feedback-item-1"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${true && "nav_link__item__active"}`}
                  onClick={(e) => { this.prevent(e) }}>
                  <div>
                    <span>
                      <i className={`far fa-eye icon__item px-2 icon__success`} />
                    </span>
                    <div className="icon__text d-flex align-items-center justify-content-center mt-2 font-weight-bold text-body">
                      0
                    </div>
                  </div>
                </span>

                <span
                  id="feedback-item-1"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.state.data && (this.state.data.liked_by && "nav_link__item__active")}`}
                  onClick={(e) => { this.prevent(e) }}>
                  <div>
                    <span>
                      <i className={`far fa-thumbs-up icon__item px-2 ${true
                        ? "icon__success"
                        : "icon__default"}`} />
                    </span>
                    <div className="icon__text d-flex align-items-center justify-content-center mt-2 font-weight-bold text-body">
                      0
                    </div>
                  </div>
                </span>

                <span
                  id="feedback-item-2"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.state.data && (this.state.data.disliked_by && "nav_link__item__active")}`}
                  onClick={(e) => { this.prevent(e) }}>
                  <div>
                    <span>
                      <i className={`far fa-thumbs-down icon__item px-2 ${true
                        ? "icon__success"
                        : "icon__default"}`} />
                    </span>
                    <div className="icon__text d-flex align-items-center justify-content-center mt-2 font-weight-bold text-body">
                      0
                    </div>
                  </div>
                </span>

                <span
                  id="feedback-item-3"
                  className={`game__action cursor-pointer nav_link__container nav_link__item ${this.state.data && (this.state.data.loved_by && "nav_link__item__active")}`}
                  onClick={(e) => { this.prevent(e) }}>
                  <div>
                    <span>
                      <i className={`far fa-heart icon__item px-2 ${true
                        ? "icon__success"
                        : "icon__default"}`} />
                    </span>
                    <div className="icon__text d-flex align-items-center justify-content-center mt-2 font-weight-bold text-body">
                      0
                    </div>
                  </div>
                </span>
              </div>

              <hr className="border-light m-0 py-2" />

              <div>
                <span className="d-flex align-items-center justify-content-center mb-0">
                  <ReactStars {...starsOptions} />
                </span>
                <span className="d-flex align-items-center justify-content-center mb-3">
                  No Ratings
                </span>
              </div>

              <Button
                variant="instagram" block
                onClick={this.props.close}
                className="font-weight-bold h5 mb-0">
                Continue
              </Button>
            </Modal.Body>
          </>}
        {/* / Feedback Modal */}
      </>
    )
  }
}

export default Feedback