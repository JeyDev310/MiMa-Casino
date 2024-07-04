import React, { Component } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'

import API from '../../../../../api'
import moment from 'moment'

import ResourceLoaderB from '../../../utilities/loaders/ResourceLoaderB'

import '../../../../../vendor/styles/pages/chat.scss'

class Collectibles extends Component {

  constructor(props) {
    super(props)

    this.state = {
      init: false,
      data: null,
    }
  }

  async componentDidMount() {
    await API.get(
      `collectibles/queryset/`, {
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

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Awards & Collectibles Modal */}
        <Modal.Body style={{ margin: "0" }}>
          <h4 className="text-left mb-4 font-weight-bold">
            Awards & Collectibles
          </h4>

          <div className="text-left text-left text-white opacity-50 small mb-3">
            Get a comprehensive overview of all the awards & collectibles that you received during this game session.
          </div>

          <hr className="border-light m-0 pt-2 pb-2" />

          {this.state.data && this.state.data.results.length > 0 ? (
            this.state.data.results.map((item, index) =>
              <div className="bs4-toast toast show bg-warning cursor-pointer" key={index} style={{ maxWidth: "100%", }}>
                <div className="toast-header">
                  <i className="fas fa-trophy mr-2" style={{ fontSize: "1.6rem", }} />
                  <div className="d-block small mr-auto">
                    <div className="mb-0 font-weight-bold" style={{ textTransform: "uppercase", }}>{item.headline}</div>
                    <div className="small mb-0" >{item.subtitle}</div>
                  </div>
                  <div className="d-block small">
                    <div className="mb-0">{moment(item.created_at).format('DD/MM/YYYY (HH:mm)')}</div>
                    <div className="small font-weight-bold mb-0" style={{ textTransform: "uppercase", }}>{item.freq_order}</div>
                  </div>
                </div>
              </div>
            )
          ) : <>
            <Card className="d-flex w-100 my-2 bg-transparent border-0 shadow-none">
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
              No awards found...
            </div>

            <div className="text-left text-left text-white opacity-50 text-tiny mb-3">
              Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose. Gamble responsibly and in moderation. Do not consider gambling as a way of earning money and only play with money that you can afford to lose.
            </div>
          </>}

          <hr className="border-light m-0 py-2 mt-3" />

          <Button
            block variant="instagram"
            onClick={this.props.close}
            className="font-weight-bold">
            Continue
          </Button>
        </Modal.Body>
        {/* / Awards & Collectibles Modal */}
      </>
    )
  }
}

export default Collectibles