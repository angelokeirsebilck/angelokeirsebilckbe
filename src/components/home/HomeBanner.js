import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Grid, Box } from 'react-raster';
import Chevron from './Chevron';

const query = graphql`
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

const Container = styled.div`
    min-height: 100vh;
    color: ${(props) => props.theme.textColor};
    font-family: 'Space Mono', monospace;
    display: flex;
    align-items: center;
    position: relative;
`;

const Heading1 = styled.h1`
    font-size: 36px;
    margin-bottom: 10px;
    font-weight: bold;
`;

const ParagraphLine = styled.p`
    font-size: 36px;
    margin-bottom: 10px;

    &:last-of-type {
        margin-bottom: 0;
    }
`;

const ChevronContainer = styled.div`
    position: absolute;
    bottom: 60px;
    left: 50%;
`;

const HomeBanner = () => {
    const data = useStaticQuery(query);

    const {
        strapiHomebanner: {
            Tekst,
            image: {
                childImageSharp: { fluid },
            },
        },
    } = data;

    return (
        <Container>
            <Grid
                breakpoints={[0, 767]}
                colspan={2}
                gutterX={'20px'}
                css={{ width: '100%' }}
                control>
                <Box
                    cols={[2, 1]}
                    css={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                    }}>
                    {Tekst.map((p) => {
                        if (p.Kleur) {
                            return <Heading1 key={p.id}>{p.Tekst}</Heading1>;
                        }

                        return <ParagraphLine key={p.id}>{p.Tekst}</ParagraphLine>;
                    })}
                </Box>
                <Box cols={[2, 1]}>
                    <Image fluid={fluid} />
                </Box>
            </Grid>
            <ChevronContainer>
                <Chevron />
            </ChevronContainer>
        </Container>
    );
};

export default HomeBanner;
