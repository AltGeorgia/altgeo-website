import React from "react"
import { Link } from "gatsby-plugin-intl"
import "./drug-item.css"

export default (props) => {
  return (
    <Link to={props.link} className={"drug-item"}>
      <article className={"drug-item"}>
        <img
          className={"drug-image"}
          src={props.image}
          alt={props.imageAlt || props.title} />
        <h1>
          {props.title}
        </h1>
      </article>
    </Link>
  )
}
