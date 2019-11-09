const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const newsData = await graphql(`
  {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
      filter: {frontmatter: {templateKey: {eq: "news_post"}}
    }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            description
            language
            title
          }
        }
      }
    }
  }`)

  if (newsData.errors)
    throw newsData.errors

  const newsPosts = newsData.data.allMarkdownRemark.edges

  newsPosts.forEach((post, index) => {
    createPage({
      path: post.node.fields.slug,
      component: path.resolve("./src/templates/news-post.js"),
      context: {
        slug: post.node.fields.slug
      },
    })
  })

  // Drug info posts
  const drugData = await graphql(`
  {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
      filter: {frontmatter: {templateKey: {eq: "drug_info_item"}}
    }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            language
            title
          }
        }
      }
    }
  }`)

  if (drugData.errors)
    throw drugData.errors

  const drugPosts = drugData.data.allMarkdownRemark.edges

  drugPosts.forEach((post, index) => {
    createPage({
      path: post.node.fields.slug,
      component: path.resolve("./src/templates/drug-info-post.js"),
      context: {
        slug: post.node.fields.slug
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
