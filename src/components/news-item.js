import React from "react"
import { Link } from "gatsby-plugin-intl"
import "./news-item.css"

export default (props) => {
  return (
    <article className={"news-item"}>
      <header>
        <h1>
          <Link to={props.link}>
            {props.title}
          </Link>
        </h1>
        <small className={"news-item-date"}>{props.date}</small>
      </header>

      <main>{props.excerpt}</main>

    </article>
  )
}
