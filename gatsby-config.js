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
    'gatsby-plugin-sharp',
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `extra`,
        path: `${__dirname}/content/extra/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 970,
              wrapperStyle: `height: 100%;`
            },
          },
        ],
      },
    },
  ],
}
