import React from "react"
import "./team-member.css"

export default (props) => {
  return (
    <article className={"team-member"}>
      <img className={"team-member-image"}
           src={props.image}
           alt={props.fullName} />
      <main>
        <h1>
          {props.fullName}
        </h1>
        <small className={"team-member-role"}>
          {props.role}
        </small>
        <p>
          {props.bio}
        </p>
      </main>

    </article>
  )
}
