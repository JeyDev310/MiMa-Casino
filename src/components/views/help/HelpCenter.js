import React, { Component } from 'react'
import { Card, Collapse, Media, Row, Col } from 'react-bootstrap'

class HelpCenter extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Help Center')

    this.evaluateActiveRoute = this.evaluateActiveRoute.bind(this)

    this.state = {
      expanded: []
    }
  }

  evaluateActiveRoute() {
    if (!localStorage.getItem('token')) {
      this.props.history.push("/login")
    }
  }

  componentDidMount() {
    this.evaluateActiveRoute()
  }

  prevent(e) {
    e.preventDefault()
  }

  toggle(e, id) {
    e.preventDefault()
    const expanded = [...this.state.expanded]

    if (expanded.indexOf(id) === -1) {
      expanded.push(id)
    } else {
      expanded.splice(expanded.indexOf(id), 1)
    }

    this.setState({ expanded })
  }

  isExpanded(id) {
    return this.state.expanded.indexOf(id) !== -1
  }

  render() {
    return (
      <div>

        <h3 className="row align-items-center font-weight-bold py-4 mb-4">
          <Col>
            Help center
          </Col>
        </h3>
        <hr className="container-m-nx border-light my-0" />

        <Card className="mt-5">
          <Card.Header as="h5" className="py-4 px-5">
          <div className="media align-items-center text-body">
                <div className="ion ion-md-help-circle-outline ui-w-30 text-center text-xlarge"></div>
                <Media.Body className="ml-3">
                  FAQ
                  <div className="text-muted small">Donec sagittis urna eu leo</div>
                </Media.Body>
              </div>
          </Card.Header>
          <Row noGutters className="row-bordered">
            <Col md={12} className="p-5">
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-1')} aria-expanded={String(this.isExpanded('faq-1'))} className="d-flex justify-content-between text-body py-3 px-4">
                Ne ornatus albucius ius?
                <span className="collapse-icon"></span>
              </a>
              <Collapse in={this.isExpanded('faq-1')} className="text-muted"><div>
                <div className="px-4 pb-3">Lorem ipsum dolor sit amet, mea in pertinax hendrerit gloriatur.</div>
              </div></Collapse>
            </div>
            <div className="theme-bg-white ui-bordered mb-2">
              <a href="#toggle" onClick={e => this.toggle(e, 'faq-2')} aria-expanded={String(this.isExpanded('faq-2'))} className="d-flex justify-content-between text-body py-3 px-4">
                Quo insolens intellegam dissentiet at?
                <span className="collapse-icon"></span>
              </a>
              <Collapse in={this.isExpanded('faq-2')} className="text-muted"><div>
                <div className="px-4 pb-3">Ex fugit legimus fuisset per. Ex quidam option diceret ius.</div>
              </div></Collapse>
            </div>
            </Col>

          </Row>
        </Card>

      </div>
    )
  }
}

export default HelpCenter
