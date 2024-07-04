import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

import axios from 'axios'
import ReactGiphySearchbox from 'react-giphy-searchbox'

import '../../../../../vendor/styles/pages/chat.scss'

class GiphySearchbox extends Component {

  constructor(props) {
    super(props)

    this.setInput = this.setInput.bind(this)

    this.state = {
      trending: [],
    }
  }

  async componentDidMount() {
    setTimeout(() => {
      try {
        var elems = document.getElementsByClassName('reactGiphySearchbox-searchForm-input')
        elems[0].id = 'reactGiphySearchbox-searchForm-input'
        elems[0].focus()
        elems[0].classList.add('font-weight-normal')
        elems[0].classList.add('bg-light')
        elems[0].classList.add('form-control')
        elems[0].classList.remove('reactGiphySearchbox-searchForm-input')
      } catch { }
    }, 1)
    await axios.get(
      `https://api.giphy.com/v1/trending/searches?api_key=${process.env.REACT_APP_GIPHY_DEV_API_KEY}`
    ).then(res => {
      if (res.status === 200) {
        this.setState({
          trending: res.data.data,
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set
    const prototype = Object.getPrototypeOf(element)
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value)
    } else {
      valueSetter.call(element, value)
    }
  }

  setInput(value) {
    try {
      var element = document.getElementById('reactGiphySearchbox-searchForm-input')
      element.focus()
      this.setNativeValue(element, value)
      element.dispatchEvent(new Event('input', { bubbles: true, }))
    } catch { }
  }

  renderTokens() {
    try {
      if (this.props.limiter) {
        return `${this.props.limiter.tokensThisInterval}/${this.props.limiter.tokenBucket.bucketSize} Tokens`
      }
    } catch {
      return null
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Giphy Searchbox Modal */}
        <Modal.Body style={{
          borderRadius: "15px",
          backgroundColor: "rgba(37, 40, 46, 0.7)",
        }}>

          <ReactGiphySearchbox
            autoFocus={true}
            poweredByGiphy={false}
            apiKey={process.env.REACT_APP_GIPHY_DEV_API_KEY}
            onSelect={item => {
              this.props.submit(item)
              this.props.close()
            }}
            wrapperClassName="p-0 w-100 pb-2"
            listWrapperClassName="giphy__list_container"
            searchFormClassName="giphy__search_form font-weight-bold"
            listItemClassName="giphy__list_item"
            masonryConfig={[
              { columns: 5, imageWidth: 210, gutter: 10, },
              { mq: "1090px", columns: 5, imageWidth: 210, gutter: 10, }
            ]} />

          <div className="text-white opacity-50 small font-weight-bold mt-1 mb-2 d-flex justify-content-start">
            <span>
              <div className="d-flex align-items-center showdown-text-layout-s1">
                <Form.Label className="mb-0">
                  <span>
                    {this.state.trending
                      .map((item, index) =>
                        <span key={index}>
                          <Button
                            size="sm"
                            variant="darker1 rounded-pill md-btn-flat font-weight-bold mr-1 mb-1"
                            onClick={() => {
                              this.setInput(item)
                            }}>
                            {item}
                          </Button>
                        </span>
                      )}
                  </span>
                </Form.Label>
              </div>
            </span>
          </div>

          <hr className="border-light m-0 py-2" />

          <Button
            variant="instagram" block
            onClick={this.props.close}
            className="font-weight-bold h5 mb-0">
            Continue
          </Button>
        </Modal.Body>
        {/* / Giphy Searchbox Modal */}
      </>
    )
  }
}

export default GiphySearchbox