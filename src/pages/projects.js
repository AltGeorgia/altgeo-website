import React from "react"
import { graphql } from "gatsby"
import { FormattedMessage, IntlContextConsumer } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectItem from "../components/project-item"
import formatDate from "../util/format-date"
import "./projects.css"

export default ({ location, data }) => {
  const projects = data.projects.edges.map(e => e.node.frontmatter)

  return (
    <Layout location={location}>
      <IntlContextConsumer>
        { (intl) =><SEO title={intl.messages["projects.title"]}/> }
      </IntlContextConsumer>
      <h1 className={"page-title"}>
        <FormattedMessage id={"projects.title"}/>
      </h1>
      <hr className={"page-title-hr"} />
      <div className={"project-list float-right"}>
        <IntlContextConsumer>
          {(intl) =>
            projects
              .filter(p => p.language === intl.language)
              .filter((p, i) => !(i % 2))
              .map((p, i) =>
                <ProjectItem
                  key={i}
                  title={p.title}
                  startDate={formatDate(intl, p.startDate)}
                  current={p.current}
                  endDate={formatDate(intl, p.endDate)}
                  description={p.description}
                  image={p.image}
                  imageAlt={p.imageAlt || p.title} />
              )
          }
        </IntlContextConsumer>
      </div>
      <div className={"project-list"}>
        <IntlContextConsumer>
          {(intl) =>
            projects
              .filter(p => p.language === intl.language)
              .filter((p, i) => i % 2)
              .map((p, i) =>
                <ProjectItem
                  key={i}
                  title={p.title}
                  startDate={formatDate(intl, p.startDate)}
                  current={p.current}
                  endDate={formatDate(intl, p.endDate)}
                  description={p.description}
                  image={p.image}
                  imageAlt={p.imageAlt || p.title} />
              )
          }
        </IntlContextConsumer>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
{
  projects: allMarkdownRemark(
    filter: { frontmatter: { templateKey: { eq: "project_item" } } },
    sort: { fields: frontmatter___startDate, order: DESC }
  ) {
    edges {
      node {
        frontmatter {
          title
          language
          startDate (formatString: "MM DD, YYYY")
          endDate (formatString: "MM DD, YYYY")
          description
          image
          imageAlt
          current
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
