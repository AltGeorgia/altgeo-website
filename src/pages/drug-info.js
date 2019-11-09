import React from "react"
import { graphql } from "gatsby"
import { FormattedMessage, IntlContextConsumer } from "gatsby-plugin-intl"
import DrugItem from "../components/drug-item"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./drug-info.css"

export default ({ data, location }) => {
  const items = data.drugItems.edges
  const pageDescriptions = data.descriptions.edges.map(d => d.node)

  return (
    <Layout location={location}>
      <IntlContextConsumer>
        { (intl) =><SEO title={intl.messages["drug_info.title"]}/> }
      </IntlContextConsumer>
      <h1 className={"page-title"}>
        <FormattedMessage id={"drug_info.title"}/>
      </h1>
      <hr className={"page-title-hr"} />
      <IntlContextConsumer>
        {(intl) =>
          <section
            dangerouslySetInnerHTML={{ __html: pageDescriptions.find(t => t.frontmatter.language === intl.language).html }}
          />
        }
      </IntlContextConsumer>
      <div className={"drug-item-list"}>
        <IntlContextConsumer>
          {(intl) => items
              /*.filter(a => a.node.frontmatter.language === intl.language)*/
              .map((a, i) => (
                <DrugItem
                  key={i}
                  title={a.node.frontmatter.title}
                  link={a.node.fields.slug}
                  image={a.node.frontmatter.image}
                  imageAlt={a.node.frontmatter.imageAlt || a.node.frontmatter.title}/>
              ))}
        </IntlContextConsumer>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
{
  descriptions: allMarkdownRemark(
    filter: { frontmatter: {templateKey: {eq: "drug_info_description"} }}
  ){
    edges {
      node {
        html
        frontmatter {
          language
        }
      }
    }
  }

  drugItems: allMarkdownRemark(sort: {
    fields: [frontmatter___date], order: DESC
  }, filter: { frontmatter: {templateKey: {eq: "drug_info_item"} }}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          language
          title
          image
          imageAlt
        }
      }
    }
  }
}
`
