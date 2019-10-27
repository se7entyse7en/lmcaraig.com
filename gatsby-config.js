module.exports = {
  siteMetadata: {
    title: `Lou Marvin Caraig - Blog`,
    siteUrl: `https://lmcaraig.com`,
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
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              trackingId: "UA-49122702-2",
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true,
            }
          },
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
