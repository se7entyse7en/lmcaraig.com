import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Navbar from "../components/navbar"
import Header from "../components/header"

import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import picture from "../../content/assets/picture.jpeg"


const Layout = (props) => (
  <React.Fragment>
    {props.withNavbar ? <Navbar></Navbar> : null}
    {props.withHeader ? (
      <Header picture={props.header.picture}
              name={props.header.name}
              position={props.header.position}
              company={props.header.company}
              icons={props.header.icons}>
      </Header>
    ) : null}
    {props.children}
  </React.Fragment>
)

const LayoutWithDefaultProps = (props) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            header {
              name
              position
              company
            }
          }
        }
      }
    `
  )

  return (
    <Layout withNavbar={props.withNavbar} withHeader={props.withHeader}
            header={
              {
                "picture": picture,
                "name": data.site.siteMetadata.header.name,
                "position": data.site.siteMetadata.header.position,
                "company": data.site.siteMetadata.header.company,
                "icons": [
                  [fab.faTwitter, `https://twitter.com/lmcaraig`],
                  [fab.faLinkedin, `https://linkedin.com/in/lmcaraig`],
                  [fab.faGithub, `https://github.com/se7entyse7en`],
                  [fab.faStackOverflow, `https://stackoverflow.com/users/3276106/se7entyse7en`],
                  [faEnvelope, `mailto:loumarvincaraig@gmail.com`]
                ],
              }
            }>
      {props.children}
    </Layout>
  )

}

export default Layout
export { LayoutWithDefaultProps }
