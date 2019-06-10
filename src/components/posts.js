import React from "react"

import { useStaticQuery, Link, graphql } from "gatsby"

export default props => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
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
    `
  )

  return (
    <div className="container mt-5">
      {
        data.allMarkdownRemark.edges.map(
          ({node}) => <PostItem key={node.id} timeToRead={node.timeToRead}
                                frontmatter={node.frontmatter}
                                excerpt={node.excerpt}
                                link={node.fields.slug}>
                    </PostItem>
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
      <div className="col-8 col-sm-8">
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
