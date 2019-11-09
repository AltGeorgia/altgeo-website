module.exports = {
  siteMetadata: {
    title: `Alternative Georgia`,
    description: `Official website of Alternative Georgia.`,
    siteUrl: `https://altgeorgia.ge/`,
    pages: [
      { paths: ["/", "/index", "/home"], name: "home" },
      { paths: ["/projects"], name: "projects" },
      { paths: ["/news"], name: "news" },
      { paths: ["/drug-situation-in-georgia"], name: "drug-situation-in-georgia" },
      { paths: ["/scientific-publications"], name: "scientific-publications" },
      { paths: ["/technical-reports"], name: "technical-reports" },
      { paths: ["/about"], name: "about" }
    ],
    intlImages: {
      altgeoLogo: [{
        language: "ka",
        publicURL: "/media/altgeo-logo-KA.png"
      }, {
        language: "en",
        publicURL: "/media/altgeo-logo-EN.png"
      }],
      languageFlag: [{
        language: "ka",
        publicURL: "/media/language-flag-KA.png"
      }, {
        language: "en",
        publicURL: "/media/language-flag-EN.png"
      }]
    }
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/media`,
        name: `media`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`ka`, `en`],
        defaultLanguage: `en`,
        redirect: false,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alternative Georgia`,
        short_name: `AltGeorgia`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#DC143C`,
        display: `minimal-ui`,
        icon: `static/media/altgeo-small-logo.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
