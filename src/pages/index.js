import React from "react"
import { graphql } from "gatsby"

import { LayoutWithDefaultProps } from "../components/layout"
import Posts from "../components/posts"

export default ({data}) => (
  <LayoutWithDefaultProps withNavbar={true} withHeader={true}>
    <Posts></Posts>
  </LayoutWithDefaultProps>
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
