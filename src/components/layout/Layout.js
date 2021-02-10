import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { connect } from 'react-redux';

import { gsap } from 'gsap';
import { TransitionPortal } from 'gatsby-plugin-transition-link';
import TransitionLink from 'gatsby-plugin-transition-link';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from '../Nav';
import Sizes from '../../constants/breakpoints';

gsap.registerPlugin(ScrollTrigger);

const GlobalStyle = createGlobalStyle`
    ${reset}
    *,
    ::after,
    ::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }
`;

const DarkTheme = {
    pageBackground: '#1E2030',
    textColor: '#FFF',
};

const LightTheme = {
    pageBackground: '#f7f5f2',
    textColor: '#1E2030',
};

const themes = {
    dark: DarkTheme,
    light: LightTheme,
};

const Body = styled.div`
    min-height: 200vh;
    position: relative;
    overflow-x: hidden;
`;

const Wrapper = styled.div`
    max-width: 1140px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;

    @media ${Sizes.sm} {
        padding-left: 40px;
        padding-right: 40px;
    }
`;

const Line = styled.div`
    position: absolute;
    opacity: 0;
    height: 1px;
    background: rgba(30, 174, 152, 1);
    transform: rotate(45deg);
`;

const LineAnimations = styled.div`
    min-height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
`;

const PageAnimationLi = styled.li`
    font-family: 'Space Mono', monospace;
    transform: translateX(100%);
    height: 25%;
    width: 100%;
    list-style-type: none;
    position: absolute;
    font-size: 50px;
    color: #fff;
    display: flex;
    justify-content: center;
    text-transform: lowercase;
    align-items: center;
`;

const LiSpan = styled.span`
    transform: skewX(5deg);
    opacity: 0;
`;

const LiSpaReverse = styled.span`
    transform: skewX(-5deg);
    opacity: 0;
`;

const Layout = ({ children, global, pathName }) => {
    const lineRef = useRef([]);
    const lineAnimationsRef = useRef();

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const R = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const lineArray = [];

    for (let index = 0; index < 8; index++) {
        lineArray.push({
            width: R(20, 150),
            topStart: R(0, windowHeight / 4),
            leftStart: R(0, windowWidth / 4),
            duration: R(4, 10),
            delay: R(0, 10),
        });
    }
    for (let index = 0; index < 8; index++) {
        lineArray.push({
            width: R(20, 150),
            topStart: R(0, windowHeight / 4),
            leftStart: R(windowWidth / 2, (windowWidth / 4) * 3),
            duration: R(4, 10),
            delay: R(0, 10),
        });
    }
    for (let index = 0; index < 8; index++) {
        lineArray.push({
            width: R(20, 150),
            topStart: R(windowHeight / 2, (windowHeight / 4) * 3),
            leftStart: R(windowWidth / 2, (windowWidth / 4) * 3),
            duration: R(4, 10),
            delay: R(0, 10),
        });
    }
    for (let index = 0; index < 8; index++) {
        lineArray.push({
            width: R(20, 150),
            topStart: R(windowHeight / 2, (windowHeight / 4) * 3),
            leftStart: R(0, windowWidth / 4),
            duration: R(4, 10),
            delay: R(0, 10),
        });
    }

    useEffect(() => {
        if (pathName == '/') {
            lineRef.current = lineRef.current.slice(0, lineArray.length);
            const lines = [];
            // const lines2 = [];
            const linesContainerTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: lineAnimationsRef.current,
                    start: 'top top',
                    end: 'bottom center',
                    scrub: true,
                    markers: true,
                },
            });

            linesContainerTimeline.fromTo(
                lineAnimationsRef.current,
                {
                    rotate: 0,
                },
                {
                    duration: 10,
                    rotate: 90,
                    y: -150,
                }
            );

            const linesTimeline = gsap.timeline();
            linesTimeline.addLabel('start', 0);

            lineArray.forEach((line, index) => {
                linesTimeline
                    .fromTo(
                        lineRef.current[index],
                        {
                            ease: 'power4',
                            opacity: 0,
                        },
                        {
                            y: 250,
                            x: 250,
                            opacity: 1,
                            delay: line.delay,
                            duration: line.duration,
                            repeat: -1,
                        },
                        `start`
                    )
                    .to(
                        lineRef.current[index],
                        {
                            opacity: 0,
                            duration: line.duration / 2,
                            repeat: -1,
                        },
                        `-=${line.delay + line.duration / 2}`
                    );
            });
        }
    }, []);

    return (
        <ThemeProvider theme={themes[global.colorMode]}>
            <Body
                style={
                    global.colorMode == 'dark'
                        ? { background: '#1E2030' }
                        : { background: '#f7f5f2' }
                }>
                {pathName && (
                    <LineAnimations ref={lineAnimationsRef}>
                        {lineArray.map((line, index) => {
                            return (
                                <Line
                                    key={index}
                                    ref={(el) => (lineRef.current[index] = el)}
                                    style={{
                                        width: `${line.width}px`,
                                        left: `${line.leftStart}px`,
                                        top: `${line.topStart}px`,
                                    }}
                                />
                            );
                        })}
                    </LineAnimations>
                )}

                <Wrapper>
                    <GlobalStyle />
                    {children}
                    <TransitionPortal>
                        <ul
                            className='Transition-ul'
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'fixed',
                                height: '101vh',
                                width: '100%',
                                top: 0,
                                left: 0,
                                margin: 0,
                                pointerEvents: 'none',
                                background: 'transparent',
                            }}>
                            <PageAnimationLi
                                className='Transition-li'
                                css={{ top: 0, background: '#C0D6DF' }}>
                                <LiSpan className='spanTimeline'>Eat</LiSpan>
                            </PageAnimationLi>
                            <PageAnimationLi
                                className='Transition-li'
                                css={{ top: '25vh', background: 'rgba(47,50,75,1)' }}>
                                <LiSpaReverse className='spanTimeline'>Sleep</LiSpaReverse>
                            </PageAnimationLi>
                            <PageAnimationLi
                                className='Transition-li'
                                css={{ top: '50vh', background: '#C0D6DF' }}>
                                <LiSpan className='spanTimeline'>Javascript</LiSpan>
                            </PageAnimationLi>
                            <PageAnimationLi
                                className='Transition-li'
                                css={{ top: '75vh', background: 'rgba(47,50,75,1)' }}>
                                <LiSpaReverse className='spanTimeline'>Repeat</LiSpaReverse>
                            </PageAnimationLi>
                        </ul>
                    </TransitionPortal>
                </Wrapper>
            </Body>
            <Nav />
        </ThemeProvider>
    );
};

export const ListTLink = (props) => {
    return (
        <TransitionLink
            style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '26px',
                color: 'rgba(30, 174, 152, 1)',
                textTransform: 'lowercase',
                position: 'relative',
                textDecoration: 'none',
                paddingBottom: '10px',
            }}
            activeClassName='is-active'
            activeStyle={{
                background:
                    'linear-gradient(to right, rgba(207, 181, 250, 1), rgba(30, 174, 152, 1))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
            }}
            to={props.to}
            entry={props.entry}
            exit={props.exit}
            trigger={props.trigger}>
            {props.children}
        </TransitionLink>
    );
};

export const onEntryAnimation = (name, node) => {
    console.log(name);
    // if (name == 'home') {
    //     return gsap.from(node.querySelectorAll('.HomeBanner-image'), {
    //         opacity: 0,
    //         delay: 1.5,
    //         duration: 1,
    //     });
    // }
};

// hidden object animation
export function animatePageTransition() {
    var tl = gsap.timeline();
    var spanTimeline = gsap.timeline();

    spanTimeline
        .to('.spanTimeline', {
            duration: 0.5,
            opacity: 1,
            delay: 0.5,
        })
        .to('.spanTimeline', {
            duration: 0.5,
            opacity: 0,
            delay: 0.9,
        });

    tl.to('.Transition-li', {
        duration: 1,
        x: 0,
        stagger: 0.2,
    }).to('.Transition-li', {
        x: '100%',
        duration: 1,
        stagger: 0.1,
        delay: 0.5,
    });
}

const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps, null)(Layout);
