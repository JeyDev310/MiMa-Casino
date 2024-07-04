import React, { Component } from 'react'

class CiuCallouts extends Component {
  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div className="ui-block">
        <h3 className="ui-block-heading">Callouts</h3>

        <h4 className="ui-block-heading">Examples</h4>

        <div className="cui-example cui-example-vertical-spacing-sm">
          <div className="callout callout-primary">
            <h5>Lorem ipsum dolor sit amet</h5>
            <p>This is a secondary callout with a <a href="#d" className="callout-link" onClick={this.prevent}>link</a>.</p>
            <hr />
            <p>Vivamus eleifend sit amet orci eget ullamcorper.</p>
          </div>

          <div className="callout callout-secondary">
            <h5>Lorem ipsum dolor sit amet</h5>
            <p>This is a secondary callout with a <a href="#d" className="callout-link" onClick={this.prevent}>link</a>.</p>
            <hr />
            <p>Vivamus eleifend sit amet orci eget ullamcorper.</p>
          </div>

          <div className="callout callout-success">
            <h5>Lorem ipsum dolor sit amet</h5>
            <p>This is a success callout with a <a href="#d" className="callout-link" onClick={this.prevent}>link</a>.</p>
            <hr />
            <p>Vivamus eleifend sit amet orci eget ullamcorper.</p>
          </div>

          <div className="callout callout-danger">
            <h5>Lorem ipsum dolor sit amet</h5>
            <p>This is a danger callout with a <a href="#d" className="callout-link" onClick={this.prevent}>link</a>.</p>
            <hr />
            <p>Vivamus eleifend sit amet orci eget ullamcorper.</p>
          </div>

          <div className="callout callout-warning">
            <h5>Lorem ipsum dolor sit amet</h5>
            <p>This is a warning callout with a <a href="#d" className="callout-link" onClick={this.prevent}>link</a>.</p>
            <hr />
            <p>Vivamus eleifend sit amet orci eget ullamcorper.</p>
          </div>

          <div className="callout callout-info">
            <h5>Lorem ipsum dolor sit amet</h5>
            <p>This is an info callout with a <a href="#d" className="callout-link" onClick={this.prevent}>link</a>.</p>
            <hr />
            <p>Vivamus eleifend sit amet orci eget ullamcorper.</p>
          </div>

          <div className="callout callout-dark">
            <h5>Lorem ipsum dolor sit amet</h5>
            <p>This is a dark callout with a <a href="#d" className="callout-link" onClick={this.prevent}>link</a>.</p>
            <hr />
            <p>Vivamus eleifend sit amet orci eget ullamcorper.</p>
          </div>
        </div>

        <h4 className="ui-block-heading">Sizes</h4>

        <div className="cui-example cui-example-vertical-spacing-sm">
          <div className="callout callout-primary callout-sm">
            <h6>Lorem ipsum dolor sit amet</h6>
            <p>This is a secondary callout with a <a href="#d" className="callout-link" onClick={this.prevent}>link</a>.</p>
            <hr />
            <p>Vivamus eleifend sit amet orci eget ullamcorper.</p>
          </div>

          <div className="callout callout-secondary callout-lg">
            <h4>Lorem ipsum dolor sit amet</h4>
            <p>This is a secondary callout with a <a href="#d" className="callout-link" onClick={this.prevent}>link</a>.</p>
            <hr />
            <p>Vivamus eleifend sit amet orci eget ullamcorper.</p>
          </div>
        </div>

      </div>
    )
  }
}

export default CiuCallouts
