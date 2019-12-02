import React from "react"
import { graphql } from "gatsby"
import { IntlContextConsumer, FormattedMessage } from "gatsby-plugin-intl"
import Map from "../components/map"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TeamMember from "../components/team-member"
import "./about.css"

export default ({ location, data }) => {
  const aboutTexts = data.aboutText.edges.map(e => e.node)
  const teamMembers = data.teamMembers.edges.map(e => e.node)
  const contactInfo = data.contactInfo.edges
    .map(e => e.node.frontmatter)

  const getInfoDiv = (intl) => {
    const i = contactInfo.find(info => info.language === intl.language)
    return (
      <div className={"contact-info"}>
        {i.address ? (
          <p>
            <b>{intl.messages.address}:</b>
            <br />
            {i.address}
            <br />
            {i.addressExtra ? i.addressExtra : (<div />)}
          </p>
          ) : (<div />)}

        {i.telephone ? (
          <p>
            <b>{intl.messages.telephone}:</b>
            <br />
            {i.telephone}
            <br />
            {i.telephoneExtra ? i.telephoneExtra : (<div />)}
          </p>
        ) : (<div />)}

        {i.fax ? (
          <p>
            <b>{intl.messages.fax}:</b>
            <br />
            {i.fax}
            <br />
          </p>
        ) : (<div />)}
      </div>
    )
  }

  return (
    <Layout location={location}>
      <IntlContextConsumer>
        { (intl) =><SEO title={intl.messages["about.title"]}/> }
      </IntlContextConsumer>
      <h1 className={"page-title"}>
        <FormattedMessage id={"about.title"}/>
      </h1>
      <hr className={"page-title-hr"} />
      <IntlContextConsumer>
        {(intl) => (
          <div>

            <section
              dangerouslySetInnerHTML={{ __html: aboutTexts.find(t => t.frontmatter.language === intl.language).html }}
            />

            <h2>
              <FormattedMessage id={"about.team"} />
            </h2>
            <section className={"team-members-list"}>
              {teamMembers
                .filter(m => m.frontmatter.language === intl.language)
                .map((m, i) =>
                <TeamMember
                  fullName={m.frontmatter.fullName}
                  role={m.frontmatter.role}
                  bio={m.frontmatter.bio}
                  image={m.frontmatter.image}
                />
              )}
            </section>

            <h2>
              <FormattedMessage id={"contact.title"} />
            </h2>
            <section className={"about-us-lower"}>            
              <Map className={"google-maps-container"} />
              {getInfoDiv(intl)}
            </section>
          </div>
        )}
      </IntlContextConsumer>
    </Layout>
  )
}

export const pageQuery = graphql`
{
  aboutText: allMarkdownRemark(filter: {
    frontmatter: { templateKey: { eq: "about_us_text" } }
  }) {
    edges {
      node {
        frontmatter { language }
        html
      }
    }
  }

  contactInfo: allMarkdownRemark(
    filter: { frontmatter: { templateKey: { eq: "contact_info" } } }
  ) {
    edges {
      node {
        frontmatter {
          language
          address
          addressExtra
          telephone
          telephoneExtra
          fax
        }
      }
    }
  }

  teamMembers: allMarkdownRemark(
    sort: {order: DESC, fields: id},
    filter: { frontmatter: { templateKey: { eq: "team_member" } } }
  ) {
    edges {
      node {
        frontmatter {
          language
          fullName
          bio
          role
          image
        }
      }
    }
  }
}
`
