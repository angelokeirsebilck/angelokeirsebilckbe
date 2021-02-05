import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Grid, Box } from 'react-raster';

// Components
import Layout from '../components/layout/Layout';

const ImageWrapper = styled.div`
    max-width: 500px;
    margin: 0 auto;
`;

const Heading1 = styled.h1`
    text-align: center;
    color: lightblue;
    font-size: 50px;
`;

const index = ({ data }) => {
    const {
        strapiHomebanner: {
            titel,
            image: {
                childImageSharp: { fluid },
            },
        },
    } = data;

    return (
        <Layout>
            <Heading1>{titel}</Heading1>
            <ImageWrapper>
                <Image fluid={fluid} />
            </ImageWrapper>
        </Layout>
    );
};

export const query = graphql`
    {
        strapiHomebanner {
            image {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            titel
        }
    }
`;

export default index;
