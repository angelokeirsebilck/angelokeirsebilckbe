import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

const Main = styled.main`
    max-width: 1380px;
    margin: 0 auto;
`;

const ImageWrapper = styled.div`
    max-width: 500px;
    margin: 0 auto;
`;

const Heading1 = styled.h1`
    text-align: center;
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
        <Main>
            <Heading1>{titel}</Heading1>
            <ImageWrapper>
                <Image fluid={fluid} />
            </ImageWrapper>
        </Main>
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
