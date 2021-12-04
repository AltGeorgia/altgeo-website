import React from "react"
import { graphql } from "gatsby"
import { IntlContextConsumer, FormattedMessage } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PublicationItem from "../components/publication-item"
import formatDate from "../util/format-date"
import Training from "../components/training"

export default ({ location, data }) => {
  const trainings = data.allMarkdownRemark.edges.map(i => i.node.frontmatter)

  return (
    <Layout location={location}>
      <IntlContextConsumer>
        { (intl) =><SEO title={intl.messages["trainings.title"]}/> }
      </IntlContextConsumer>
      <h1 className={"page-title"}>
        <FormattedMessage id={"trainings.title"}/>
      </h1>
      <hr className={"page-title-hr"} />
      <IntlContextConsumer>
        {(intl) => trainings
          /* .filter(t => t.language === intl.language) */
          .map((t,i) =>
            <Training
              key={i}
              title={t.title}
              description={t.description}
              documents={t.documents} />
          )
        }
      </IntlContextConsumer>
    </Layout>
  )
}

export const pageQuery = graphql`
{
  allMarkdownRemark(
    sort: {order: ASC, fields: frontmatter___priority },
    filter: {
      frontmatter: {
        templateKey: { eq: "training" }
      }
    }
  ) {
    edges {
      node {
        frontmatter {
          language
          title
          description
          documents {
            title
            document
          }
        }
      }
    }
  }

  site {
    siteMetadata {
      title
    }
  }
}
`
