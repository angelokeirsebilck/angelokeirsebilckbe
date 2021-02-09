import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { connect } from 'react-redux';

import { gsap } from 'gsap';

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

const Layout = ({ children, global }) => {
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
        lineRef.current = lineRef.current.slice(0, lineArray.length);
        const lines = [];
        // const lines2 = [];

        lineArray.forEach((line, index) => {
            lines.push(gsap.timeline());
            // lines2.push(
            //     gsap.timeline({
            //         scrollTrigger: {
            //             trigger: lineAnimationsRef.current,
            //             start: 'top top',
            //             end: 'bottom center',
            //             scrub: true,
            //             markers: true,
            //         },
            //     })
            // );

            lines[index]
                .fromTo(
                    lineRef.current[index],
                    {
                        ease: 'Power4.easeOut',
                        opacity: 0,
                        delay: line.delay,
                    },
                    {
                        y: 250,
                        x: 250,
                        opacity: 1,
                        duration: line.duration / 2,
                    }
                )
                .to(
                    lineRef.current[index],
                    {
                        ease: 'Power4.easeOut',
                        opacity: 0,
                        y: 500,
                        x: 500,
                        duration: line.duration / 2,
                    },
                    '-=2'
                )
                .repeat(-1);

            // lines2[index].fromTo(
            //     lineRef.current[index],
            //     {
            //         rotate: 45,
            //         x: 0,
            //     },
            //     {
            //         duration: 10,
            //         y: -250,
            //         rotate: 135,
            //     }
            // );
        });
    }, []);

    return (
        <ThemeProvider theme={themes[global.colorMode]}>
            <Body
                style={
                    global.colorMode == 'dark'
                        ? { background: '#1E2030' }
                        : { background: '#f7f5f2' }
                }>
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
                <Wrapper>
                    <GlobalStyle />
                    {children}
                </Wrapper>
            </Body>
            <Nav />
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps, null)(Layout);
