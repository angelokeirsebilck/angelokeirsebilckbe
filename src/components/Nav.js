import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { connect } from 'react-redux';
import { Grid, Box } from 'react-raster';
import { Link as GatsbyLink } from 'gatsby';

const NavContainer = styled.div`
    background: ${(props) => props.theme.pageBackground};
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
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
    width: 0px;
    height: 1px;
    background: linear-gradient(to right, rgba(30, 174, 152, 1), rgba(207, 181, 250, 1));
    position: absolute;
    top: calc(100vh / 2);
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

const NavButton = styled(GatsbyLink)`
    font-family: 'Space Mono', monospace;
    font-size: 36px;
    color: rgba(30, 174, 152, 1);
    text-transform: lowercase;
    position: relative;
    text-decoration: none;

    &:hover {
    }
`;

const NavButtonLine = styled.div`
    position: absolute;
    width: 100%;
    height: 2px;
    overflow: hidden;
    bottom: -5px;
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

const boxHeight = (window.innerHeight / 6) * 2;

const Nav = ({ global }) => {
    const [navTimeline, setNavTimeLine] = useState(gsap.timeline());

    const [btnHomeTimeline, setbtnTimeline] = useState(gsap.timeline());
    const [btnAboutTimeline, setbtnAboutTimeline] = useState(gsap.timeline());
    const [btnProjectsTimeline, setbtnProjectsTimeline] = useState(gsap.timeline());
    const [btnContactTimeline, setbtnContactTimeline] = useState(gsap.timeline());

    const navRef = useRef();

    const lineOneRef = useRef();
    const lineTwoRef = useRef();
    const lineThreeRef = useRef();
    const lineFourRef = useRef();

    const lineHomeRef = useRef();
    const lineAboutRef = useRef();
    const lineProjectsRef = useRef();
    const lineContactRef = useRef();

    useEffect(() => {
        navTimeline.paused(true);

        navTimeline
            .fromTo(
                navRef.current,
                { x: '-100%' },
                {
                    x: 0,
                    duration: 1,
                },
                'background'
            )
            .to(lineOneRef.current, { width: '100%' }, 'background -=.5')
            .to(lineTwoRef.current, { width: '100%' })
            .to(lineThreeRef.current, { width: '100%' })
            .to(lineFourRef.current, { height: '100vh' }, 'background +=.5');

        btnHomeTimeline.paused(true);
        btnHomeTimeline
            .to(lineHomeRef.current, {
                x: '115%',
                width: '100%',
                duration: 0.4,
            })
            .to(lineHomeRef.current, {
                x: '100%',
                width: '100%',
                duration: 0.6,
                onComplete: addPause,
                onCompleteParams: [btnHomeTimeline],
            })
            .to(
                lineHomeRef.current,
                {
                    x: '200%',
                    duration: 0.2,
                    onComplete: reset,
                    onCompleteParams: [btnHomeTimeline],
                },
                'endPos'
            );

        btnAboutTimeline.paused(true);
        btnAboutTimeline
            .to(lineAboutRef.current, {
                x: '115%',
                width: '100%',
                duration: 0.4,
            })
            .to(lineAboutRef.current, {
                x: '100%',
                width: '100%',
                duration: 0.6,
                onComplete: addPause,
                onCompleteParams: [btnAboutTimeline],
            })
            .to(
                lineAboutRef.current,
                {
                    x: '200%',
                    duration: 0.2,
                    onComplete: reset,
                    onCompleteParams: [btnAboutTimeline],
                },
                'endPos'
            );
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
                    <Box
                        css={{
                            height: boxHeight,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        cols={1}>
                        <NavButton
                            onMouseEnter={() => {
                                btnHomeTimeline.play();
                            }}
                            onMouseLeave={() => {
                                if (btnHomeTimeline.progress() < 0.8334) {
                                    btnHomeTimeline.play('endPos');
                                } else {
                                    btnHomeTimeline.play();
                                }
                            }}
                            to='/projects'>
                            Home
                            <NavButtonLine>
                                <NavButtonLineInner ref={lineHomeRef} />
                            </NavButtonLine>
                        </NavButton>
                    </Box>
                    <Box
                        css={{
                            height: boxHeight,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        cols={1}>
                        <NavButton
                            onMouseEnter={() => {
                                btnAboutTimeline.play();
                            }}
                            onMouseLeave={() => {
                                if (btnAboutTimeline.progress() < 0.8334) {
                                    btnAboutTimeline.play('endPos');
                                } else {
                                    btnAboutTimeline.play();
                                }
                            }}
                            to='/projects'>
                            Home
                            <NavButtonLine>
                                <NavButtonLineInner ref={lineAboutRef} />
                            </NavButtonLine>
                        </NavButton>
                    </Box>
                    <Box
                        css={{
                            height: boxHeight,
                        }}
                        cols={1}>
                        {/* <NavButton
                            onMouseEnter={() => {
                                btnTimeline.play();
                            }}
                            onMouseLeave={() => {
                                if (btnTimeline.progress() < 0.8334) {
                                    btnTimeline.play('endPos');
                                } else {
                                    btnTimeline.play();
                                }
                            }}
                            ref={homeButtonRef}
                            to='/projects'>
                            Home
                            <NavButtonLine>
                                <NavButtonLineInner ref={lineHomeRef} />
                            </NavButtonLine>
                        </NavButton> */}
                    </Box>
                    <Box
                        css={{
                            height: boxHeight,
                        }}
                        cols={1}>
                        {/* <NavButton
                            onMouseEnter={() => {
                                btnTimeline.play();
                            }}
                            onMouseLeave={() => {
                                if (btnTimeline.progress() < 0.8334) {
                                    btnTimeline.play('endPos');
                                } else {
                                    btnTimeline.play();
                                }
                            }}
                            ref={homeButtonRef}
                            to='/projects'>
                            Home
                            <NavButtonLine>
                                <NavButtonLineInner ref={lineHomeRef} />
                            </NavButtonLine>
                        </NavButton> */}
                    </Box>
                </Grid>
            </GridContainer>
        </NavContainer>
    );
};
const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps, null)(Nav);
