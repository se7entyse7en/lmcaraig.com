import React from "react"

import { useStaticQuery, Link, graphql } from "gatsby"

export default props => {
  const data = useStaticQuery(
    graphql`
      query {
        allFile(filter: {sourceInstanceName: {eq: "posts"}, ext: {eq: ".md"}}) {
          edges {
            node {
              childMarkdownRemark {
                id
                frontmatter {
                  title
                  formattedDate: date(formatString: "D MMMM YYYY")
                  diffDays: date(difference: "days")
                }
                fields {
                  slug
                }
                excerpt
                timeToRead
              }
            }
          }
        }
      }
    `
  )

  return (
    <div className="container">
      {
        data.allFile.edges.map(
          ({node}) => {
            const data = node.childMarkdownRemark
            const slug = data.fields.slug
            return (
              <PostItem key={data.id} timeToRead={data.timeToRead}
                        frontmatter={data.frontmatter}
                        excerpt={data.excerpt}
                        link={slug.slice(0, slug.slice(1, slug.length).indexOf('/') + 1)}>
              </PostItem>
            )
          }
        )
      }
    </div>
  )
}

const PostItem = (props) => {
  const readingTimeUnitString = props.timeToRead > 1? "mins" : "min"
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col-12 col-sm-8">
        <div className="card border-0">
          <div className="card-body">
            <p className="card-subtitle text-secondary">{props.frontmatter.formattedDate} - {props.frontmatter.diffDays} days ago</p>
            <Link to={props.link}><h5 className="card-title text-dark">{props.frontmatter.title}</h5></Link>
            <p className="card-subtitle text-secondary">~ {props.timeToRead} {readingTimeUnitString} read</p>
            <p className="card-text">{props.excerpt}</p>
          </div>
        </div>
      </div>
      <div className="col"></div>
    </div>
  )
}
