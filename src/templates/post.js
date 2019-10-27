import React from "react"
import { graphql } from "gatsby"

import { LayoutWithDefaultProps } from "../components/layout"
import Toc  from "../components/toc"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// this ensures that the icon CSS is loaded immediately before attempting to render icons
import '@fortawesome/fontawesome-svg-core/styles.css'

import { fab } from '@fortawesome/free-brands-svg-icons'


export default ({data}) => {
  const post = data.markdownRemark
  const readingTimeUnitString = post.timeToRead > 1? "mins" : "min"
  return (
    <LayoutWithDefaultProps withNavbar={true} withHeader={true}>

      <div className="container">

        <div className="row mb-3">
          <div className="col"></div>
          <div className="col-10 col-sm-8 text-center">
            <p className="card-subtitle text-secondary">{post.frontmatter.formattedDate}</p>
            <h1>{post.frontmatter.title}</h1>
            <p className="text-secondary">~ {post.timeToRead} {readingTimeUnitString} read</p>
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col-10 col-sm-8">
            <Toc htmlAst={post.htmlAst} enableAnchors={false}></Toc>
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col-10 col-sm-8">
            <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
          </div>
          <div className="col"></div>
        </div>

        <div className="row mb-3 mt-3 text-right">
          <div className="col"></div>
          <div className="col-10 col-sm-8">
            <a className="text-dark" href={"https://news.ycombinator.com/item?id=" + post.frontmatter.hackerNewsId}>
              <h6><FontAwesomeIcon className="mx-1" icon={fab.faHackerNewsSquare} size="lg" /><i>See comments on HackerNews</i></h6>
            </a>
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
      htmlAst
      frontmatter {
        title
        hackerNewsId
        formattedDate: date(formatString: "D MMMM YYYY")
      }
      timeToRead
    }
  }
`
