import React, { Component } from 'react'
import LayoutSidenav from './LayoutSidenav'
import LayoutFooter from './LayoutFooter'
import layoutHelpers from './helpers'

class LayoutWithoutNavbarFlex extends Component {

  closeSidenav(e) {
    e.preventDefault()
    layoutHelpers.setCollapsed(true)
  }

  componentDidMount() {
    layoutHelpers.init()
    layoutHelpers.update()
    layoutHelpers.setAutoUpdate(true)
  }

  componentWillUnmount() {
    layoutHelpers.destroy()
  }

  render() {
    return (
      <div className="layout-wrapper layout-1">
        <div className="layout-inner">
          <div className="layout-container">
            <LayoutSidenav {...this.props} />

            <div className="layout-content">
              <div className="container-fluid d-flex align-items-stretch flex-grow-1 p-0">
                {this.props.children}
              </div>

              <LayoutFooter {...this.props} />
            </div>
          </div>
        </div>
        <div className="layout-overlay" onClick={this.closeSidenav}></div>
      </div>
    )
  }
}

export default LayoutWithoutNavbarFlex