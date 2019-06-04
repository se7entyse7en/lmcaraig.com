module.exports = {
  siteMetadata: {
    title: `Lou Marvin Caraig - Blog`,
    siteUrl: `http://lmcaraig.com`,
    header: {
      name: `Lou Marvin Caraig`,
      position: `Software Development Engineer`,
      company: `source{d}`,
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts/`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
