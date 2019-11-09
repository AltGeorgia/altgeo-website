import React from "react"
import { graphql } from "gatsby"
import { IntlContextConsumer } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import formatDate from "../util/format-date"
import "./news-post.css"

export default class NewsPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    
    return (
      <Layout location={this.props.location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}
        />
        <IntlContextConsumer>
          {(intl) =>
            <article className={"news-post"}>
              <header>
                <h1>
                  {post.frontmatter.title}
                </h1>
                <small className={"news-post-date"}>
                  {formatDate(intl, post.frontmatter.date)}
                </small>
              </header>
              <section dangerouslySetInnerHTML={{ __html: post.html }} />
            </article> 
          }
        </IntlContextConsumer>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query NewsPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MM DD, YYYY")
        description
      }
    }
  }
`
