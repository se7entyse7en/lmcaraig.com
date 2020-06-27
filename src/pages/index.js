import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { LayoutWithDefaultProps } from "../components/layout"
import SEO from "../components/seo"
import Posts from "../components/posts"

export default ({ data }) => {
  const { site } = useStaticQuery(query)
  return (
    <LayoutWithDefaultProps withNavbar={true} withHeader={true}>
    <SEO
      title={site.siteMetadata.title}
      description={site.siteMetadata.description}
    />
    <Posts></Posts>
  </LayoutWithDefaultProps>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        header {
          name
          position
          company
        }
      }
    }
  }
`
