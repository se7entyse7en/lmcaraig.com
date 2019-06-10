import React from "react"
import { graphql } from "gatsby"

import Navbar from "../components/navbar"
import Header from "../components/header"
import Posts from "../components/posts"

import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import picture from "../../content/assets/picture.jpeg"

export default ({data}) => (
  <React.Fragment>
    <Navbar></Navbar>
    <Header picture={picture}
            name={data.site.siteMetadata.header.name}
            position={data.site.siteMetadata.header.position}
            company={data.site.siteMetadata.header.company}
            icons={[
              [fab.faTwitter, `https://twitter.com/lmcaraig`],
              [fab.faLinkedin, `https://linkedin.com/in/lmcaraig`],
              [fab.faGithub, `https://github.com/se7entyse7en`],
              [fab.faStackOverflow, `https://stackoverflow.com/users/3276106/se7entyse7en`],
              [faEnvelope, `mailto:loumarvincaraig@gmail.com`]
            ]}>
    </Header>
    <Posts></Posts>
  </React.Fragment>
)

export const query = graphql`
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
