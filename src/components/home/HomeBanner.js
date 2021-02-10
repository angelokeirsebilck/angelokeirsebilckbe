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

const Line = styled.div`
    position: absolute;
    height: 1px;
    width: 100px;
    background: rgba(30, 174, 152, 1);
    transform: rotate(45deg);
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

    // Gsap Refs
    const headingRef = useRef();
    // const lineRef = useRef([]);

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
        // paragraphRef.current = paragraphRef.current.slice(0, Tekst.length);
        // lineRef.current = lineRef.current.slice(0, lineArray.length);

        const text = gsap.timeline();

        text.from(paragraphRef.current[0], { y: '100%', duration: 0.4 });
        text.from(paragraphRef.current[1], { y: '100%', duration: 0.4 });
        text.from(paragraphRef.current[3], { y: '100%', duration: 0.4 });
        text.from(paragraphRef.current[2], { y: '100%', duration: 0.5 });

        // lineArray.forEach((line, index) => {
        //     gsap.to(lineRef.current[index], {
        //         ease: 'Power4.easeOut',
        //         y: 500,
        //         x: 500,
        //         opacity: 0,
        //         duration: line.duration,
        //     }).repeat(-1);
        // });
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

    // if (containerParagaphRefs.length > 1) {
    //     Tekst.forEach((container, index) => {
    //         containerParagaphRefs.current[index].style.height =
    //             paragraphRef.current[index].offsetHeight;
    //     });
    // }

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
            <Grid
                breakpoints={[0, 767]}
                colspan={2}
                gutterX={'20px'}
                gutterY={['40px', 0]}
                css={{ width: '100%' }}>
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
                                <AnimateContainer
                                    className='HomeBanner-animateText'
                                    ref={addContainerParagrapgRefs}
                                    key={p.id}>
                                    <Heading1 ref={addParagrapgRefs}>{p.Tekst}</Heading1>
                                </AnimateContainer>
                            );
                        }

                        return (
                            <AnimateContainer
                                className='HomeBanner-animateText'
                                key={p.id}
                                ref={addContainerParagrapgRefs}>
                                {/* <ParagraphLine ref={(el) => (paragraphRef.current[index] = el)}>
                                    {p.Tekst}
                                </ParagraphLine> */}
                                <ParagraphLine ref={addParagrapgRefs}>{p.Tekst}</ParagraphLine>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(HomeBanner);
