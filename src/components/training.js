import React from "react"
import "./training.css"

export default (props) => {
  const { title, description, documents } = props
  const extractExtension = (str) => {
    const match = str.match(/^.*\.(.*)$/);
    return match ? match[1].toUpperCase() : "FILE"
  }

  return (
    <article className={"training"}>
      <main className={"training-body"}>
        <h1>{title}</h1>
        <p>{description}</p>
        {
          documents.length === 0 ? <></> :
            <div className={"training-documents-list"}>
              {
                documents.map((d, i) =>
                  <div className={"training-document"}
                    key={i}>
                    <b className={"training-document-filetype"}>
                      {extractExtension(d.document)}
                    </b>
                    <a className={"training-document-link"}
                      href={d.document}>
                      {d.title}
                    </a>
                  </div>)
              }
            </div>
        }
      </main>
    </article>
  )
}
