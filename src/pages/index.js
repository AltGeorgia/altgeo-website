import React from "react"
import { graphql } from "gatsby"
import { IntlContextConsumer } from "gatsby-plugin-intl"
import NewsItem from "../components/news-item"
import Layout from "../components/layout"
import SEO from "../components/seo"
import formatDate from "../util/format-date"
import "./index.css"

export default ({ location, data }) => {
  const headers = data.headers.edges.map(e => e.node.frontmatter)
  const headerImage = "/media/header.jpg"
  const articles = data.newsArticles.edges

  return (
    <Layout location={location}>
      <IntlContextConsumer>
        { (intl) =><SEO title={intl.messages["home.title"]}/> }
      </IntlContextConsumer>
      <IntlContextConsumer>
        {(intl) => {
          const header = headers.find(t => t.language === intl.language)
          return (
            <div className={"home-header"}>
              <div className={"home-header-cover"}
                   style={{backgroundImage: `url(${headerImage})`}}/>
              <div className={"home-header-text-container"}>
                <h1>
                  {header.title}
                </h1>
                <h3>
                  {header.subtitle}
                </h3>
              </div>
            </div>
          )
        }}
      </IntlContextConsumer>
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
  headers: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "home_text" } } })
  {
    edges {
      node {
        frontmatter {
          language
          title
          subtitle
        }
      }
    }
  }

  newsArticles: allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC },
    filter: { frontmatter: {templateKey: {eq: "news_post"} } },
    limit: 100
  ) {
    edges {
      node {
        fields { slug }
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
