import React from "react"
import { IntlContextConsumer } from "gatsby-plugin-intl"
import "./project-item.css"

export default (props) => {
  return (
    <article className={"project-item"}>
      <header>
        <img className={"project-image"}
             src={props.image}
             alt={props.imageAlt || props.title} />
        <h1>
          {props.title}
        </h1>
        <IntlContextConsumer>
          {(intl) =>
            <small className={"project-item-date"}>
              {props.startDate} - {props.current ? intl.messages.current : props.endDate}
            </small>}
        </IntlContextConsumer>
      </header>

      <main>{props.description}</main>

    </article>
  )
}
