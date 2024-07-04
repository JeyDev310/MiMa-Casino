import React, { Component } from 'react'
import { Card, Collapse, Media, Row, Col } from 'react-bootstrap'

import {
  dataProtection,
  terms,
} from '../../content/TermsAndConditions'

class Terms extends Component {

  constructor(props) {
    super(props)
    props.setTitle('Help Center')

    this.evaluateActiveRoute = this.evaluateActiveRoute.bind(this)

    this.state = {
      expanded: [],
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

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>

        <h3 className="row align-items-center font-weight-bold py-4 mb-4">
          <Col>
            Terms And Conditions
          </Col>
        </h3>
        <hr className="container-m-nx border-light my-0" />

        <Card className="mt-5">
          <Card.Header as="h5" className="py-4 px-5">
            <div className="media align-items-center text-body">
              <div className="ion ion-md-help-circle-outline ui-w-30 text-center text-xlarge"></div>
              <Media.Body className="ml-3">
                Documents
                <div className="text-muted small">
                  Donec sagittis urna eu leo</div>
              </Media.Body>
            </div>
          </Card.Header>
          <Row noGutters className="row-bordered">
            <Col md={12} className="p-5">
              <div className="theme-bg-white ui-bordered mb-2">
                <a href="#toggle" onClick={e => this.toggle(e, 'faq-3')} aria-expanded={String(this.isExpanded('faq-1'))} className="d-flex justify-content-between text-body py-3 px-4">
                  Terms And Conditions
                  <span className="collapse-icon"></span>
                </a>
                <Collapse in={this.isExpanded('faq-3')} className="text-muted"><div>
                  <div className="px-4 pb-3 text-box">
                    <p dangerouslySetInnerHTML={{ __html: terms }} />
                  </div>
                </div></Collapse>
              </div>
              <div className="theme-bg-white ui-bordered mb-2">
                <a href="#toggle" onClick={e => this.toggle(e, 'faq-4')} aria-expanded={String(this.isExpanded('faq-2'))} className="d-flex justify-content-between text-body py-3 px-4">
                  Data Protection Declaration
                  <span className="collapse-icon"></span>
                </a>
                <Collapse in={this.isExpanded('faq-4')} className="text-muted"><div>
                  <div className="px-4 pb-3 text-box" >
                    <p dangerouslySetInnerHTML={{ __html: dataProtection }} />
                  </div>
                </div></Collapse>
              </div>
            </Col>

          </Row>
        </Card>

      </div>
    )
  }
}

export default Terms