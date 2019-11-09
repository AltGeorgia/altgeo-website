import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"
import "./publication-item.css"

export default (props) => {
  return (
    <article className={"publication-item"}>
      <img className={"publication-image"}
        src={props.image}
        alt={props.imageAlt || props.title}
      />
      <main className={"publication-body"}>
        <h1>{props.title}</h1>
          <small>
            <span className={"publication-item-date"}>{props.date}</span>
          </small>
        <p>{props.description}</p>
        <div className={"publication-item-links-container"}>
          {props.kaLink ? 
            <a href={props.kaLink} className={"publication-item-link"}>
              <b><FormattedMessage id={"publications.kaLink"} /></b>
            </a>
            : <div />}
          {props.enLink ? 
            <a href={props.enLink} className={"publication-item-link"}>
              <b><FormattedMessage id={"publications.enLink"} /></b>
            </a>
            : <div />}
        </div>
      </main>
    </article>
  )
}
