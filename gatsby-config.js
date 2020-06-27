module.exports = {
  siteMetadata: {
    title: `Lou Marvin Caraig - Blog`,
    siteUrl: `https://lmcaraig.com`,
    header: {
      name: `Lou Marvin Caraig`,
      position: `Engineering Team Lead`,
      company: `Athenian`,
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lou Marvin Caraig - Blog`,
        short_name: `Lou Marvin Caraig - Blog`,
        start_url: `/`,
        display: `standalone`,
        icon: `static/favicon.jpeg`,
        crossOrigin: `use-credentials`,
      },
    },
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
          `gatsby-remark-emoji`,
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
