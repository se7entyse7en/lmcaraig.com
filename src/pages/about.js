import React from "react"
import { graphql } from "gatsby"

import { LayoutWithDefaultProps } from "../components/layout"

export default ({data}) => {
  const node = data.allMarkdownRemark.edges[0].node
  return (
    <LayoutWithDefaultProps withNavbar={true} withHeader={false}>

      <div className="container">

        <div className="row mb-3">
          <div className="col"></div>
          <div className="col-10 col-sm-8 text-center">
            <h1>{node.frontmatter.title}</h1>
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col-10 col-sm-8">
            <div dangerouslySetInnerHTML={{ __html: node.html }}></div>
          </div>
          <div className="col"></div>
        </div>

      </div>

    </LayoutWithDefaultProps>
  )
}



export const query = graphql`
  query {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/about.md/"}}) {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`
