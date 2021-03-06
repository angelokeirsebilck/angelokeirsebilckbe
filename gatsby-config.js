require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        title: 'Angelo Keirsebilck',
        description: 'This is the portfolio website of Angelo Keirsebilck',
        author: '@AngeloKeirsebilck',
        twitterUsername: '@AngeloKbilck',
        siteUrl: 'https://angelokeirsebilck.be',
        image: '/card_home.png',
    },
    plugins: [
        'gatsby-plugin-styled-components',
        'gatsby-plugin-sharp',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/images/logo.svg',
            },
        },
        'gatsby-plugin-offline',
        'gatsby-transformer-remark',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: './src/images/',
            },
            __key: 'images',
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: './src/pages/',
            },
            __key: 'pages',
        },
        {
            resolve: `gatsby-source-strapi`,
            options: {
                apiURL: process.env.STRAPI_URL,
                queryLimit: 1000, // Default to 100
                contentTypes: ['project'],
                //If using single types place them in this array.
                singleTypes: ['homebanner', 'skills', 'education', 'experience'],
            },
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `space mono\:400,700`,
                    `montserrat \:300,300i,400i,500i,400,500,600,700`, // you can also specify font weights and styles
                ],
                display: 'swap',
            },
        },
    ],
};
