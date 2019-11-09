import React from "react"
import { IntlContextConsumer, FormattedMessage } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ location }) => {

  return (
    <Layout location={location}>
      <IntlContextConsumer>
        { (intl) =><SEO title={intl.messages["page404.title"]}/> }
      </IntlContextConsumer>
      <h1 className={"page-title"}>
        <FormattedMessage id={"page404.title"}/>
      </h1>
      <hr className={"page-title-hr"} />
      <p>
        <FormattedMessage id={"page404.text"} />
      </p>
    </Layout>
  )
}
