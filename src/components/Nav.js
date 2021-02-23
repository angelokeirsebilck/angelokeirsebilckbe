import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { connect } from 'react-redux';
import { Grid, Box } from 'react-raster';
import NavLinks from '../constants/main-nav';
import { toggleMenu, changePage } from '../../actions/globalActions';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link as GatsbyLink } from 'gatsby';
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';

import Sizes from '../constants/breakpoints';
import Colors from '../constants/colors';

const Icon = styled.a`
    color: rgba(${(props) => props.theme.secondary}, 1);
    transition: 0.4s all;
    cursor: pointer;
    margin-right: 15px;
    font-size: 20px;

    @media ${Sizes.sm} {
        font-size: 30px;
    }

    &:hover {
        color: ${(props) => props.theme.textColor};
    }
`;

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
    background: linear-gradient(
        to right,
        rgba(${Colors.primary}, 1),
        rgba(${(props) => props.theme.secondary}, 1)
    );
    position: absolute;
    top: calc(100vh / 6);
`;

const LineTwo = styled.div`
    width: 0;
    height: 1px;
    background: linear-gradient(
        to right,
        rgba(${(props) => props.theme.secondary}, 1),
        rgba(${Colors.primary}, 1)
    );
    position: absolute;
    top: calc(100vh / 2);
    right: -100%;
`;

const LineThree = styled.div`
    width: 0px;
    height: 1px;
    background: linear-gradient(
        to right,
        rgba(${Colors.primary}, 1),
        rgba(${(props) => props.theme.secondary}, 1)
    );
    position: absolute;
    top: calc((100vh / 6) * 5);
`;

const LineFour = styled.div`
    width: 1px;
    height: 0;
    background: linear-gradient(
        to bottom,
        rgba(${(props) => props.theme.secondary}, 1),
        rgba(${Colors.primary}, 1)
    );
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

const NavButtonLine = styled.div`
    position: absolute;
    width: 100%;
    height: 2px;
    overflow: hidden;
    bottom: -8px;
`;

const NavButtonLineInner = styled.div`
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    opacity: 1;
    background-color: rgba(${(props) => props.theme.secondary}, 1);
`;

const NavButton = styled(GatsbyLink)`
    font-family: 'Space Mono', monospace;
    font-size: 26px;
    color: rgba(${(props) => props.theme.secondary}, 1);
    text-transform: lowercase;
    position: relative;
    text-decoration: none;

    @media ${Sizes.sm} {
        font-size: 36px;
    }

    &.is-active .Line {
        background: linear-gradient(
            to left,
            rgba(${Colors.primary}, 1),
            rgba${(props) => props.theme.secondary}, 1)
        );
        left: 0;
    }
`;

let boxHeight;
const Nav = ({ global, toggleMenu, changePage }) => {
    const [navTimeline] = useState(gsap.timeline());
    const [lineTimelines] = useState([]);

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

    useEffect(() => {
        navTimeline.paused(true);
        boxHeight = (window.innerHeight / 6) * 2;
        window.addEventListener('resize', resizeBoxHeight);
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

    if (navTimeline !== undefined) {
        if (global.isMenuOpen) {
            navTimeline.timeScale(1).play();
        } else {
            navTimeline.timeScale(4).reverse();
        }
    }

    const killScrollTriggers = () => {
        const scrollTriggerArray = ScrollTrigger.getAll();
        scrollTriggerArray.forEach((scrollTrigger) => {
            scrollTrigger.kill();
        });
        console.log('done');
    };

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
                                <NavButton
                                    to={link.url}
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
                                        killScrollTriggers();
                                        toggleMenu();
                                    }}
                                    ref={addToBtnRefs}
                                    activeClassName='is-active'
                                    activeStyle={{
                                        background: `linear-gradient(to right,rgba(${Colors.primary}, 1), rgba(${Colors.secondary}, 1))`,
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        color: 'transparent',
                                        pointerEvents: 'none',
                                    }}>
                                    {link.name}
                                    <NavButtonLine>
                                        <NavButtonLineInner className='Line' ref={addToLineRefs} />
                                    </NavButtonLine>
                                </NavButton>
                            </Box>
                        );
                    })}
                    <Box
                        css={{
                            height: boxHeight,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        cols={1}
                        ref={addToBtnRefs}>
                        <Icon
                            aria-label='Github Link'
                            href='https://github.com/angelokeirsebilck'
                            target='_blank'
                            rel='nofollow noopener'>
                            <FaGithub />
                        </Icon>
                        <Icon
                            aria-label='LinkedIn Link'
                            href='https://www.linkedin.com/in/angelo-keirsebilck-a35977196/'
                            target='_blank'
                            rel='nofollow noopener'>
                            <FaLinkedinIn />
                        </Icon>
                        <Icon
                            aria-label='Twitter Link'
                            href='https://twitter.com/AngeloKbilck'
                            target='_blank'
                            rel='nofollow noopener'>
                            <FaTwitter />
                        </Icon>
                    </Box>
                </Grid>
            </GridContainer>
        </NavContainer>
    );
};
const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps, { toggleMenu, changePage })(Nav);
