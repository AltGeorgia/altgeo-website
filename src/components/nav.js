import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link, FormattedMessage, changeLocale } from "gatsby-plugin-intl"
import "./nav.css"

export default ({ location, visible }) => {
    const { site } = useStaticQuery(
    graphql`{
      site {
        siteMetadata {
          title
          description
          intlImages {
            languageFlag {
              language
              publicURL
            }
          }
        }
      }
    }`
  )
  const engFlag = site.siteMetadata.intlImages.languageFlag.find(i => i.language === "en").publicURL
  const kaFlag = site.siteMetadata.intlImages.languageFlag.find(i => i.language === "ka").publicURL

  return (
    <nav style={ visible ? { display: "flex" } : {} }>
      <Link to={"/"} activeClassName={"active"}>
        <FormattedMessage id={"home.title"}/>
      </Link>

      <Link to={"/projects"} activeClassName={"active"}>
        <FormattedMessage id={"projects.title"}/>
      </Link>

      <Link to={"/drug-info"} activeClassName={"active"}>
        <FormattedMessage id={"drug_info.title"}/>
      </Link>

      <div className={"dropdown"}>
        {/* eslint-disable-next-line */}
        <a>
          <FormattedMessage id={"publications.title"}/>
        </a>
        <div className={"dropdown-content"}>
          <Link to={"/scientific-publications"} activeClassName={"active"}>
            <FormattedMessage id={"scientific_publications.title"}/>
          </Link>
          <Link to={"/technical-reports"} activeClassName={"active"}>
            <FormattedMessage id={"technical_reports.title"}/>
          </Link>
          <Link to={"/drug-situation-in-georgia"} activeClassName={"active"}>
            <FormattedMessage id={"drug_situation_in_georgia.title"}/>
          </Link>
          <Link to={"/trainings"} activeClassName={"active"}>
            <FormattedMessage id={"trainings.title"}/>
          </Link>
        </div>
      </div>

      <Link to={"/about"} activeClassName={"active"}>
        <FormattedMessage id={"about.title"}/>
      </Link>

      <div className={"flags-outer-container"}>
        <div className={"flags-inner-container"}>
          <img className={"flag"} onClick={() => changeLocale("ka")} alt="ქართული" src={kaFlag} />
          <img className={"flag"} onClick={() => changeLocale("en")} alt="English" src={engFlag} />
        </div>
      </div>
    </nav>
  )
}
