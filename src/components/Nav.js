import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { connect } from 'react-redux';
import { Grid, Box } from 'react-raster';
// import { Link as GatsbyLink } from 'gatsby';
import NavLinks from '../constants/main-nav';
import Sizes from '../constants/breakpoints';
import { toggleMenu, changePage } from '../../actions/globalActions';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ListTLink, animatePageTransition, onEntryAnimation } from '../components/layout/Layout';

const NavContainer = styled.div`
    background: ${(props) => props.theme.pageBackground};
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    z-index: 19;
`;

const LineOne = styled.div`
    width: 0px;
    height: 1px;
    background: linear-gradient(to right, rgba(207, 181, 250, 1), rgba(30, 174, 152, 1));
    position: absolute;
    top: calc(100vh / 6);
`;

const LineTwo = styled.div`
    width: 0;
    height: 1px;
    background: linear-gradient(to right, rgba(30, 174, 152, 1), rgba(207, 181, 250, 1));
    position: absolute;
    top: calc(100vh / 2);
    right: -100%;
`;

const LineThree = styled.div`
    width: 0px;
    height: 1px;
    background: linear-gradient(to right, rgba(207, 181, 250, 1), rgba(30, 174, 152, 1));
    position: absolute;
    top: calc((100vh / 6) * 5);
`;

const LineFour = styled.div`
    width: 1px;
    height: 0;
    background: linear-gradient(to bottom, rgba(207, 181, 250, 1), rgba(30, 174, 152, 1));
    position: absolute;
    left: 50%;
`;

const GridContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

// const NavButton = styled(GatsbyLink)`
//     font-family: 'Space Mono', monospace;
//     font-size: 26px;
//     color: rgba(30, 174, 152, 1);
//     text-transform: lowercase;
//     position: relative;
//     text-decoration: none;

//     @media ${Sizes.sm} {
//         font-size: 36px;
//     }

//     &.is-active .Line {
//         background: linear-gradient(to left, rgba(207, 181, 250, 1), rgba(30, 174, 152, 1));
//     }
// `;

const NavButtonLine = styled.div`
    position: absolute;
    width: 100%;
    height: 2px;
    overflow: hidden;
    bottom: 10px;
`;

const NavButtonLineInner = styled.div`
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    opacity: 1;
    background-color: rgba(30, 174, 152, 1);
`;

const LinkWrapper = styled.div``;

let boxHeight = (window.innerHeight / 6) * 2;

const Nav = ({ global, toggleMenu, changePage }) => {
    const [navTimeline, setNavTimeLine] = useState(gsap.timeline());
    const [lineTimelines, setBtnTimelines] = useState([]);

    const navRef = useRef();

    const lineOneRef = useRef();
    const lineTwoRef = useRef();
    const lineThreeRef = useRef();
    const lineFourRef = useRef();

    const lineRefs = useRef([]);
    const btnRefs = useRef([]);

    const addToLineRefs = (el) => {
        if (el && !lineRefs.current.includes(el)) {
            lineRefs.current.push(el);
        }
    };

    const addToBtnRefs = (el) => {
        if (el && !btnRefs.current.includes(el)) {
            btnRefs.current.push(el);
        }
    };

    const resizeBoxHeight = () => {
        boxHeight = (window.innerHeight / 6) * 2;
    };

    window.addEventListener('resize', resizeBoxHeight);

    useEffect(() => {
        navTimeline.paused(true);

        navTimeline
            .to(navRef.current, { x: 0, duration: 1 }, 'background')
            .to(lineOneRef.current, { width: '100%' }, 'background -=.5')
            .fromTo(lineTwoRef.current, { right: 0 }, { x: 0, width: '100%' })
            .to(lineThreeRef.current, { width: '100%' })
            .to(lineFourRef.current, { height: '100vh' }, 'background +=.5')
            .from(
                btnRefs.current,
                {
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.2,
                },
                'background +=.5'
            );

        NavLinks.forEach((link, index) => {
            const timeline = gsap.timeline();
            lineTimelines.push(timeline);

            lineTimelines[index].paused(true);
            lineTimelines[index]
                .to(lineRefs.current[index], {
                    x: '115%',
                    width: '100%',
                    duration: 0.4,
                })
                .to(lineRefs.current[index], {
                    x: '100%',
                    width: '100%',
                    duration: 0.6,
                    onComplete: addPause,
                    onCompleteParams: [lineTimelines[index]],
                })
                .to(
                    lineRefs.current[index],
                    {
                        x: '200%',
                        duration: 0.2,
                        onComplete: reset,
                        onCompleteParams: [lineTimelines[index]],
                    },
                    'endPos'
                );
        });
    }, []);

    const addPause = (timeline) => {
        timeline.pause();
    };

    const reset = (timeline) => {
        timeline.pause(0);
    };

    if (navTimeline != undefined) {
        if (global.isMenuOpen) {
            navTimeline.timeScale(1).play();
        } else {
            navTimeline.timeScale(4).reverse();
        }
    }

    return (
        <NavContainer ref={navRef}>
            <LineOne ref={lineOneRef} />
            <LineTwo ref={lineTwoRef} />
            <LineThree ref={lineThreeRef} />
            <LineFour ref={lineFourRef} />
            <GridContainer>
                <Grid
                    colspan={2}
                    gutterX={'20px'}
                    css={{
                        maxWidth: '1140px',
                        margin: '0 auto',
                        width: '100%',
                    }}
                    control>
                    {NavLinks.map((link, index) => {
                        return (
                            <Box
                                key={index}
                                css={{
                                    height: boxHeight,
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                cols={1}>
                                <LinkWrapper
                                    onMouseEnter={() => {
                                        lineTimelines[index].play();
                                    }}
                                    onMouseLeave={() => {
                                        if (lineTimelines[index].progress() < 0.8334) {
                                            lineTimelines[index].play('endPos');
                                        } else {
                                            lineTimelines[index].play();
                                        }
                                    }}
                                    onClick={() => {
                                        toggleMenu();
                                    }}
                                    ref={addToBtnRefs}>
                                    <ListTLink
                                        exit={{
                                            length: 5.5,
                                            trigger: ({ exit, e, node }) => {
                                                const scrollTriggerArray = ScrollTrigger.getAll();
                                                scrollTriggerArray.forEach((scrollTrigger) => {
                                                    scrollTrigger.kill();
                                                });
                                                changePage(link.name);
                                                animatePageTransition(exit, node);
                                            },
                                        }}
                                        entry={{
                                            delay: 2,
                                            trigger: ({ entry, node }) => {
                                                const scrollTriggerArray = ScrollTrigger.getAll();
                                                scrollTriggerArray.forEach((scrollTrigger) => {
                                                    scrollTrigger.enable();
                                                });

                                                onEntryAnimation(link.name, node);
                                            },
                                        }}
                                        to={link.url}>
                                        {link.name}
                                        <NavButtonLine>
                                            <NavButtonLineInner ref={addToLineRefs} />
                                        </NavButtonLine>
                                    </ListTLink>
                                </LinkWrapper>
                            </Box>
                        );
                    })}
                </Grid>
            </GridContainer>
        </NavContainer>
    );
};
const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps, { toggleMenu, changePage })(Nav);
