import React, { useEffect } from "react"
import { useNetworkStatus } from "react-adaptive-hooks/network"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

const NetworkStatus = () => {

  const { effectiveConnectionType } = useNetworkStatus()

  const showToastify2 = (message, type) => {
    toast(message, {
      type: type,
      position: "top-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      autoClose: 4500,
    })
  }

  useEffect(() => {
    if (effectiveConnectionType === "slow-2g")
      showToastify2("Internet connection is slow (slow-2G)", "error")
    if (effectiveConnectionType === "2g")
      showToastify2("Internet connection is slow (2G)", "error")
    if (effectiveConnectionType === "3g")
      showToastify2("Internet connection is not stable (3G)", "error")
  }, [effectiveConnectionType])

  return <ToastContainer enableMultiContainer containerId='networkStatus' />
}

export default NetworkStatus