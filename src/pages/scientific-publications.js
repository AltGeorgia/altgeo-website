import React from "react"
import { graphql } from "gatsby"
import { IntlContextConsumer, FormattedMessage } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PublicationItem from "../components/publication-item"
import formatDate from "../util/format-date"

export default ({ location, data }) => {
  const publications = data.allMarkdownRemark.edges.map(i => i.node.frontmatter)

  return (
    <Layout location={location}>
      <IntlContextConsumer>
        { (intl) =><SEO title={intl.messages["scientific_publications.title"]}/> }
      </IntlContextConsumer>
      <h1 className={"page-title"}>
        <FormattedMessage id={"scientific_publications.title"}/>
      </h1>
      <hr className={"page-title-hr"} />
      <IntlContextConsumer>
        {(intl) => publications
          .filter(p => p.language === intl.language)
          .map((p,i) =>
            <PublicationItem
              key={i}
              title={p.title}
              description={p.description}
              image={p.image}
              date={formatDate(intl, p.publishDate)}
              kaLink={p.upload ? p.kaFile : p.kaLink}
              enLink={p.upload ? p.enFile : p.enLink}
            />
          )
        }
      </IntlContextConsumer>
    </Layout>
  )
}

export const pageQuery = graphql`
{
  allMarkdownRemark(
    sort: {
      fields: [frontmatter___publishDate], order: DESC
    },
    filter: {
      frontmatter: {
        templateKey: { eq: "publication" }
        publicationType: { eq: "scientific_publication" }
      }
    }
  ) {
    edges {
      node {
        frontmatter {
          language
          title
          image
          imageAlt
          description
          publishDate (formatString: "MM DD, YYYY")
          enLink
          kaLink
          upload
          kaFile
          enFile
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
