import React, { Component } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'

import axios from 'axios'
import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'

import {
  API_CONTENT_GET_RULES_OF_PLAY
} from '../../core/APIConfig'

class RulesOfPlay extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
      isFetching: true,
      data: null,
    }
  }

  async componentDidMount() {
    await axios.get(
      API_CONTENT_GET_RULES_OF_PLAY)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: res.data[0],
            isFetching: false,
          })
        }
      }).catch(err => {
        this.setState({
          data: null,
          isFetching: false,
        })
      })
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Rules Of Play Modal */}
        <Modal.Body style={{
          borderRadius: "15px",
          backgroundColor: "rgba(37, 40, 46, 0.7)",
        }}>

          {!this.state.isFetching
            ? <>
              <h1 className="text-center display-4 font-weight-bold">
                Rules Of Play
              </h1>

              <hr className="border-light m-0 py-2" />

              <div className="text-center text-white opacity-100 font-weight-semibold mb-3">
                {this.state.data
                  ? (<div className="text-left opacity-75" dangerouslySetInnerHTML={{ __html: this.state.data.content.rendered, }} />)
                  : <div className="text-center text-white opacity-100 mb-3">
                    Rules Of Play are currently unavailable...
                  </div>}
              </div>

              <hr className="border-light m-0 py-2" />

              <div className="text-left text-white opacity-50 text-tiny mb-3">
                Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
              </div>

              <hr className="border-light m-0 py-2" />

              <Button
                variant="instagram" block
                onClick={this.props.close}
                className="font-weight-bold h5 mb-0">
                Continue
              </Button>
            </>
            : <>
              <div>
                <p className="text-white text-large text-center font-weight-bold mb-3 display-1">
                  Rules Of Play
                </p>
              </div>

              <hr className="border-light m-0 py-2" />

              <Card className="d-flex w-100 my-4 bg-transparent border-0 shadow-none">
                <Row noGutters className="row-bordered h-100 border-0 shadow-none">
                  <Col
                    sm={12} md={12} lg={12}
                    className="d-flex align-items-center justify-content-center border-0 shadow-none">
                    <ResourceLoaderB
                      height="4rem" width="4rem" />
                  </Col>
                </Row>
              </Card>

              <div className="text-center text-white opacity-100 mb-3">
                Loading...
              </div>

              <div className="text-center text-white opacity-50 text-tiny mb-3">
                Gambling can be addictive and harmful. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Remain in control of your gameplay, set yourself gaming limits, take a break or self-exclude yourself.
              </div>

              <hr className="border-light m-0 py-2" />

              <Button
                variant="instagram" block
                onClick={this.props.close}
                className="font-weight-bold h5 mb-0">
                Continue
              </Button>
            </>}

        </Modal.Body>
        {/* / Rules Of Play Modal */}
      </>
    )
  }
}

export default RulesOfPlay