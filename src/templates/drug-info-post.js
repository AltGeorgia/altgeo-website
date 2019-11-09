import React from "react"
import { graphql } from "gatsby"
import { IntlContextConsumer } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./drug-info-post.css"

export default (props) => {
  const post = props.data.markdownRemark
  
  return (
    <Layout location={props.location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <IntlContextConsumer>
        {(intl) =>
          <article className={"drug-info-post"}>
            <header>
              <h1>
                {post.frontmatter.title}
              </h1>
            </header>
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
          </article> 
        }
      </IntlContextConsumer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query DrugPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        image
        imageAlt
      }
    }
  }
`
