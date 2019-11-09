import React from "react"
import { Link } from "gatsby-plugin-intl"
import "./drug-item.css"

export default (props) => {
  return (
    <article className={"drug-item"}>
      <img
        className={"drug-image"}
        src={props.image}
        alt={props.imageAlt || props.title} />
      <h1>
        <Link to={props.link} className={""}>
          {props.title}
        </Link>
      </h1>
    </article>
  )
}
