import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'

import '../../../../vendor/libs/react-toastify/react-toastify.scss'
import '../../../../vendor/styles/pages/chat.scss'

const CloseButton = ({ closeToast }) => (
  <button className="Toastify__close-button" type="button" aria-label="close"
    onClick={closeToast}>&times;</button>
)

class ToastAdapter extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: 'Some notification',
      type: 'default',
      position: 'bottom-right',
      delay: '2500',
      disableAutoClose: false,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      pauseOnHover: true,
      allowDragAndClose: true,
    }
  }

  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <>
        {/* Toast Adapter */}
        <ToastContainer
          autoClose={this.state.disableAutoClose
            ? false
            : +this.state.delay}
          newestOnTop={this.state.newestOnTop}
          closeButton={<CloseButton />}
          rtl={false} />
        {/* / Toast Adapter */}
      </>
    )
  }
}

export default ToastAdapter