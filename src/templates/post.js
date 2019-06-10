import React from "react"
import { graphql } from "gatsby"

import { LayoutWithDefaultProps } from "../components/layout"


export default ({data}) => {
  const post = data.markdownRemark
  const readingTimeUnitString = post.timeToRead > 1? "mins" : "min"
  return (
    <LayoutWithDefaultProps withNavbar={true} withHeader={true}>

      <div className="container">

        <div className="row mb-3">
          <div className="col"></div>
          <div className="col-8 col-sm-8 text-center">
            <p className="card-subtitle text-secondary">{post.frontmatter.formattedDate} - {post.frontmatter.diffDays} days ago</p>
            <h1>{post.frontmatter.title}</h1>
            <p className="text-secondary">~ {post.timeToRead} {readingTimeUnitString} read</p>
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col-8 col-sm-8">
            <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
          </div>
          <div className="col"></div>
        </div>

      </div>

    </LayoutWithDefaultProps>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        formattedDate: date(formatString: "D MMMM YYYY")
        diffDays: date(difference: "days")
      }
      timeToRead
    }
  }
`
