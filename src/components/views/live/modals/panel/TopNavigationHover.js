import React, { Component } from 'react'

class TopNavigationHover extends Component {

  render() {
    return (
      <>
        {/* Top Navigation Hover */}
        <div className="d-flex ml-2">
          <div id="top-navigation-hcontainer" className="d-flex">
            <span
              id="top-navigation-hcontainer-item"
              className="top-nav-hover top-nav-hover-field d-flex align-items-center justify-content-center" />
          </div>
        </div>
        {/* / Top Navigation Hover */}
      </>
    )
  }
}

export default TopNavigationHover