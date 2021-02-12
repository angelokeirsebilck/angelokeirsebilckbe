import React, { useRef, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Grid, Box } from 'react-raster';
import { gsap } from 'gsap';
import { connect } from 'react-redux';

import Sizes from '../../constants/breakpoints';

// Components
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
    overflow: hidden;
`;

const Heading1 = styled.h1`
    font-size: 30px;
    margin-bottom: 10px;
    font-weight: bold;
    line-height: 1.1;

    background: linear-gradient(to right, rgba(207, 181, 250, 1), rgba(30, 174, 152, 1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media ${Sizes.md} {
        font-size: 36px;
    }
`;

const ParagraphLine = styled.p`
    font-size: 30px;
    margin-bottom: 10px;
    position: absolute;
    line-height: 1.1;
    &:last-of-type {
        margin-bottom: 0;
    }

    @media ${Sizes.md} {
        font-size: 36px;
    }
`;

const AnimateContainer = styled.div`
    position: relative;
    overflow: hidden;
    height: 30px;
    margin-bottom: 10px;

    @media ${Sizes.md} {
        height: 31px;
    }
`;

const ChevronContainer = styled.div`
    position: absolute;
    bottom: 60px;
    left: 50%;
`;

const HomeBanner = ({ addParagraphLine }) => {
    const data = useStaticQuery(query);
    const {
        strapiHomebanner: {
            Tekst,
            image: {
                childImageSharp: { fluid },
            },
        },
    } = data;

    const containerParagaphRefs = useRef([]);
    const paragraphRef = useRef([]);

    const addContainerParagrapgRefs = (el) => {
        if (el && !containerParagaphRefs.current.includes(el)) {
            containerParagaphRefs.current.push(el);
        }
    };

    const addParagrapgRefs = (el) => {
        if (el && !paragraphRef.current.includes(el)) {
            paragraphRef.current.push(el);
        }
    };

    useEffect(() => {
        const text = gsap.timeline();

        text.from(paragraphRef.current[0], { y: '100%', duration: 0.4 });
        text.from(paragraphRef.current[1], { y: '100%', duration: 0.4 });
        text.from(paragraphRef.current[3], { y: '100%', duration: 0.4 });
        text.from(paragraphRef.current[2], { y: '100%', duration: 0.5 });
        gsap.from('.HomeBanner-image', {
            opacity: 0,
            delay: 1.5,
            duration: 1,
        });

        Tekst.forEach((container, index) => {
            containerParagaphRefs.current[
                index
            ].style.height = `${paragraphRef.current[index].offsetHeight}px`;
        });
    }, []);

    const checkContainerParagrapghsHeight = () => {
        Tekst.forEach((container, index) => {
            containerParagaphRefs.current[
                index
            ].style.height = `${paragraphRef.current[index].offsetHeight}px`;
        });
    };
    window.addEventListener('resize', checkContainerParagrapghsHeight);

    return (
        <Container>
            <Grid breakpoints={[0, 767]} colspan={2} gutterY={['40px', 0]} css={{ width: '100%' }}>
                <Box
                    cols={[2, 1]}
                    css={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                    }}>
                    {Tekst.map((p, index) => {
                        if (p.Kleur) {
                            return (
                                <AnimateContainer ref={addContainerParagrapgRefs} key={p.id}>
                                    <Heading1 ref={addParagrapgRefs}>{p.Tekst}</Heading1>
                                </AnimateContainer>
                            );
                        }

                        return (
                            <AnimateContainer key={p.id} ref={addContainerParagrapgRefs}>
                                <ParagraphLine ref={addParagrapgRefs}>{p.Tekst}</ParagraphLine>
                            </AnimateContainer>
                        );
                    })}
                </Box>
                <Box className='HomeBanner-image' cols={[2, 1]}>
                    <Image fluid={fluid} />
                </Box>
            </Grid>
            <ChevronContainer>
                <Chevron />
            </ChevronContainer>
        </Container>
    );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(HomeBanner);
