import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link, IntlContextConsumer, FormattedMessage } from "gatsby-plugin-intl"
import { useMediaQuery } from "react-responsive"
import Nav from "./nav"
import Hamburger from "./hamburger"
import "./layout.css"
import "./bpg-arial.css"

export default ({ location, children }) => {
  const [isHamburgerClosed, setHamburgerClosed] = useState(true)
  const isMobile = useMediaQuery({ query: "screen and (max-width: 825px)" })
  const { site } = useStaticQuery(
    graphql`{
      site {
        siteMetadata {
          title
          description
          intlImages {
            altgeoLogo {
              language
              publicURL
            }
          }
        }
      }
    }`
  )

  const logos = site.siteMetadata.intlImages.altgeoLogo

  // Analytics
  fetch("http://165.227.147.178:7337/" + encodeURI(document.URL))
    .then(function(){}).catch(function(){});

  return (
    <div className="site-container">
      <header className="site-header">
        <Link to={"/"}>
          <IntlContextConsumer>
            {(intl) => (
              <img
                className="site-logo"
                src={logos.find(logo => logo.language === intl.language).publicURL}
                alt={"AltGeorgia Logo"} />
            )}
          </IntlContextConsumer>
        </Link>
        <Hamburger visible={isMobile} closed={isHamburgerClosed} onClick={() => setHamburgerClosed(!isHamburgerClosed)}/>
        <Nav location={location} visible={isMobile && !isHamburgerClosed}/>
      </header>

      <main className={"main-content"}>{children}</main>

      <footer className={"site-footer"}>
        <span>
          © 2012 - {new Date().getFullYear()}
          &nbsp;&nbsp;
          <FormattedMessage id={"copyright"}/>
        </span>
      </footer>
    </div>
  )
}
