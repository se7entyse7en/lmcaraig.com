import React from "react"
import { graphql } from "gatsby"

import { LayoutWithDefaultProps } from "../components/layout"
import Toc from "../components/toc"
import SEO from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// this ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css"

import { fab } from "@fortawesome/free-brands-svg-icons"

const INTRO_BEGIN_MARKER = "<!--BEGIN INTRO-->"
const INTRO_END_MARKER = "<!--END INTRO-->"

export default ({ data }) => {
  const post = data.markdownRemark
  const readingTimeUnitString = post.timeToRead > 1 ? "mins" : "min"

  const introHtml = post.html.substring(
    post.html.lastIndexOf(INTRO_BEGIN_MARKER) + INTRO_BEGIN_MARKER.length,
    post.html.lastIndexOf(INTRO_END_MARKER)
  )

  const bodyHtml = post.html.substring(
    post.html.lastIndexOf(INTRO_END_MARKER) + INTRO_END_MARKER.length
  )

  return (
    <LayoutWithDefaultProps withNavbar={true} withHeader={true}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        article={true}
      />
      <div className="container">
        <div className="row mb-3">
          <div className="col"></div>
          <div className="col-10 col-sm-8 text-center">
            <p className="card-subtitle text-secondary">
              {post.frontmatter.formattedDate}
            </p>
            <h1>{post.frontmatter.title}</h1>
            <p className="text-secondary">
              ~ {post.timeToRead} {readingTimeUnitString} read
            </p>
          </div>
          <div className="col"></div>
        </div>

        <div className="row mb-3">
          <div className="col"></div>
          <div className="col-10 col-sm-8">
            <div dangerouslySetInnerHTML={{ __html: introHtml }}></div>
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
            <div dangerouslySetInnerHTML={{ __html: bodyHtml }}></div>
          </div>
          <div className="col"></div>
        </div>

        {post.frontmatter.hackerNewsId !== 0 &&
         <div className="row mb-3 mt-3 text-right">
           <div className="col"></div>
           <div className="col-10 col-sm-8">
             <a
               className="text-dark"
               href={
                 "https://news.ycombinator.com/item?id=" +
                   post.frontmatter.hackerNewsId
               }
             >
               <h6>
                 <FontAwesomeIcon
                   className="mx-1"
                   icon={fab.faHackerNewsSquare}
                   size="lg"
                 />
                 <i>See comments on HackerNews</i>
               </h6>
             </a>
           </div>
           <div className="col"></div>
         </div>}

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
        description
      }
      timeToRead
    }
  }
`
