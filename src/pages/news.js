import React from "react"
import { graphql } from "gatsby"
import { FormattedMessage, IntlContextConsumer } from "gatsby-plugin-intl"
import NewsItem from "../components/news-item"
import Layout from "../components/layout"
import SEO from "../components/seo"
import formatDate from "../util/format-date"
import "./news.css"

export default ({ data, location }) => {
  const articles = data.newsArticles.edges

  return (
    <Layout location={location}>
      <IntlContextConsumer>
        { (intl) =><SEO title={intl.messages["news.title"]}/> }
      </IntlContextConsumer>
      <h1 className={"page-title"}>
        <FormattedMessage id={"news.title"}/>
      </h1>
      <hr className={"page-title-hr"} />
      <div className={"news-item-list"}>
        <IntlContextConsumer>
          {(intl) => articles
              .filter(a => a.node.frontmatter.language === intl.language)
              .map((a, i) => (
                <NewsItem
                  key={i}
                  title={a.node.frontmatter.title}
                  link={a.node.fields.slug}
                  date={formatDate(intl, a.node.frontmatter.date)}
                  excerpt={a.node.frontmatter.description}/>
              ))}
        </IntlContextConsumer>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
{
  newsArticles: allMarkdownRemark(sort: {
    fields: [frontmatter___date], order: DESC
  }, filter: { frontmatter: {templateKey: {eq: "news_post"} }}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MM DD, YYYY")
          description
          language
          title
        }
      }
    }
  }
}
`
