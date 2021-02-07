import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
// import { Grid, Box } from 'react-raster';

// Components
import Layout from '../components/layout/Layout';
import Nav from '../components/layout/Nav';

const ImageWrapper = styled.div`
    max-width: 500px;
    margin: 0 auto;
`;

const Heading1 = styled.h1`
    text-align: center;
    color: ${(props) => props.theme.textColor};
    font-size: 50px;
`;

const index = ({ data }) => {
    const {
        strapiHomebanner: {
            tekst,
            image: {
                childImageSharp: { fluid },
            },
        },
    } = data;

    return (
        <Layout>
            <Nav />
            <ImageWrapper>
                <Image fluid={fluid} />
            </ImageWrapper>
        </Layout>
    );
};

export const query = graphql`
    {
        strapiHomebanner {
            Tekst {
                Kleur
                Tekst
                id
            }
            image {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
`;

export default index;
