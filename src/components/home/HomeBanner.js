import React, { useRef, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { Grid, Box } from 'react-raster';
import { gsap } from 'gsap';

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
    font-size: 36px;
    margin-bottom: 10px;
    font-weight: bold;

    background: linear-gradient(to right, rgba(207, 181, 250, 1), rgba(30, 174, 152, 1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const ParagraphLine = styled.p`
    font-size: 36px;
    margin-bottom: 10px;
    position: absolute;
    &:last-of-type {
        margin-bottom: 0;
    }
`;

const AnimateContainer = styled.div`
    position: relative;
    overflow: hidden;
    height: 36px;
    margin-bottom: 10px;
`;

const ChevronContainer = styled.div`
    position: absolute;
    bottom: 60px;
    left: 50%;
`;

const Line = styled.div`
    position: absolute;
    height: 1px;
    width: 100px;
    background: rgba(30, 174, 152, 1);
    transform: rotate(45deg);
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

    // Gsap Refs
    const headingRef = useRef();
    // const lineRef = useRef([]);
    const paragraphRef = useRef([]);

    // let randomYNumber = Math.floor(Math.random() * 200) + 100;
    // let randomXNumber = Math.floor(Math.random() * 200) + 100;

    // const windowHeight = window.innerHeight;
    // const windowWidth = window.innerWidth;

    // console.log(windowHeight, windowWidth);

    // const R = (min, max) => {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // };

    // const lineArray = [];

    // for (let index = 0; index < 5; index++) {
    //     lineArray.push({
    //         width: R(20, 150),
    //         topStart: R(0, windowHeight / 2),
    //         leftStart: R(0, windowWidth / 2),
    //         duration: R(4, 10),
    //     });
    // }
    // for (let index = 0; index < 5; index++) {
    //     lineArray.push({
    //         width: R(20, 150),
    //         topStart: R(0, windowHeight / 2),
    //         leftStart: R(windowWidth / 2, windowWidth),
    //         duration: R(4, 10),
    //     });
    // }
    // for (let index = 0; index < 5; index++) {
    //     lineArray.push({
    //         width: R(20, 150),
    //         topStart: R(windowHeight / 2, windowHeight),
    //         leftStart: R(0, windowWidth / 2),
    //         duration: R(4, 10),
    //     });
    // }
    // for (let index = 0; index < 5; index++) {
    //     lineArray.push({
    //         width: R(20, 150),
    //         topStart: R(windowHeight / 2, windowHeight),
    //         leftStart: R(windowWidth / 2, windowWidth),
    //         duration: R(4, 10),
    //     });
    // }

    useEffect(() => {
        paragraphRef.current = paragraphRef.current.slice(0, Tekst.length);
        // lineRef.current = lineRef.current.slice(0, lineArray.length);

        const text = gsap.timeline();

        text.from(paragraphRef.current[0], { y: '100%', duration: 0.4 });
        text.from(paragraphRef.current[1], { y: '100%', duration: 0.4 });
        text.from(paragraphRef.current[3], { y: '100%', duration: 0.4 });
        text.from(headingRef.current, { y: '100%', duration: 0.5 });

        // lineArray.forEach((line, index) => {
        //     gsap.to(lineRef.current[index], {
        //         ease: 'Power4.easeOut',
        //         y: 500,
        //         x: 500,
        //         opacity: 0,
        //         duration: line.duration,
        //     }).repeat(-1);
        // });
    }, []);

    return (
        <Container>
            {/* {lineArray.map((line, index) => {
                return (
                    <Line
                        key={line.index}
                        ref={(el) => (lineRef.current[index] = el)}
                        style={{
                            width: `${line.width}px`,
                            left: `${line.leftStart}px`,
                            top: `${line.topStart}px`,
                        }}
                    />
                );
            })} */}
            {/* <Line ref={lineRef} width='100px' leftStart='30px' topStart='50px' /> */}
            <Grid breakpoints={[0, 767]} colspan={2} gutterX={'20px'} css={{ width: '100%' }}>
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
                                <AnimateContainer key={p.id}>
                                    <Heading1 ref={headingRef}>{p.Tekst}</Heading1>
                                </AnimateContainer>
                            );
                        }

                        return (
                            <AnimateContainer key={p.id}>
                                <ParagraphLine ref={(el) => (paragraphRef.current[index] = el)}>
                                    {p.Tekst}
                                </ParagraphLine>
                            </AnimateContainer>
                        );
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
