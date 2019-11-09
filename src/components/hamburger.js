import React from "react"

export default ({ visible, closed, onClick }) => !visible ?
  <div/>
  : <img
      style={{
        paddingTop: "11px",
        paddingRight: "12px",
        paddingBottom: closed ? "11px" : "40px",
        paddingLeft: "12px"
      }}
      className="hamburger"
      src="/media/hamburger.png"
      alt="hamburger menu"
      onClick={onClick}
    />
