import React, { useEffect } from "react"

const CloserApp = () => {
  const script = document.createElement("script")
  const scriptText = document.createTextNode(
    `(function (c, l, o, s, e, r) { c.closer = c.closer || { q: [] }; ["init", "identify", "openWidget"].forEach(function (m) { c.closer[m] = function () { this.q.push({ method: m, args: arguments }); } }); c.closer["scriptUrl"] = s; e = l.createElement(o); e.async = 1; e.src = s; r = l.getElementsByTagName(o)[0]; r.parentNode.insertBefore(e, r); })(window, document, "script", "https://widget.closer.app/widget.js"); closer.init({ orgId: "c6747cce-43b4-4f65-9799-fd4a33dc3dc1", })`
  )
  useEffect(() => {
    script.appendChild(scriptText)
    document.head.appendChild(script)
    return () => document.head.removeChild(script)
  }, []) //eslint-disable-line
  return (<div></div>)
}

export default CloserApp