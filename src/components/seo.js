import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"


const SEO = ({ title, description, article }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  const { siteUrl } = site.siteMetadata

  const url = `${siteUrl}${pathname}`

  return (
    <Helmet title={title}>
      <meta property="og:url" content={url} />
      {description && <meta name="description" content={description} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
