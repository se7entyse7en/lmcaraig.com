const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      allFile(filter: {sourceInstanceName: {eq: "posts"}, ext: {eq: ".md"}}) {
        edges {
          node {
            childMarkdownRemark {
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allFile.edges.forEach(({ node }) => {
      const slug = node.childMarkdownRemark.fields.slug
      createPage({
        path: slug.slice(0, slug.slice(1, slug.length).indexOf('/') + 1),
        component: path.resolve(`./src/templates/post.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.childMarkdownRemark.fields.slug,
        },
      })
    })
  })
}
