import React, { useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { connect } from 'react-redux';

import { gsap } from 'gsap';
import { TransitionPortal } from 'gatsby-plugin-transition-link';
import TransitionLink from 'gatsby-plugin-transition-link';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from '../Nav';
import Sizes from '../../constants/breakpoints';

import CircleAnimation from '../home/CircleAnimation';

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
    animationBackground:
        'linear-gradient(to bottom, rgba(30, 174, 152, 0.5), rgba(30, 174, 152, 0.01))',
    baxShadowAnimationBackground: '0px 1px 0px 1px rgba(0, 0, 0, 0.2)',
    dateSvgOpacity: '0.2',
};

const LightTheme = {
    pageBackground: '#f7f5f2',
    textColor: '#1E2030',
    animationBackground: 'linear-gradient(to bottom, rgba(30, 174, 152, 0.5), rgba(30, 32, 45, 1))',
    baxShadowAnimationBackground: '1px 1px 2px 0px rgba(30, 32, 45, 0.2)',
    dateSvgOpacity: '0.5',
};

const themes = {
    dark: DarkTheme,
    light: LightTheme,
};

const Body = styled.div`
    min-height: 400vh;
    position: relative;
    overflow-x: hidden;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5 !important;
    letter-spacing: 2px;
    font-weight: 300;
`;

const Wrapper = styled.div`
    max-width: 1140px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;

    @media ${Sizes.sm} {
        padding-left: 40px;
        padding-right: 40px;
    }
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
    useEffect(() => {}, []);

    return (
        <ThemeProvider theme={themes[global.colorMode]}>
            <Body
                className='Body'
                style={
                    global.colorMode === 'dark'
                        ? { background: '#1E2030' }
                        : { background: '#f7f5f2' }
                }>
                {pathName == '/' ? <CircleAnimation /> : null}
                <Wrapper className='Wrapper'>
                    <GlobalStyle />
                    {children}
                    <TransitionPortal>
                        <ul
                            className='Transition-ul'
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'fixed',
                                height: '100vh',
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

export const onEntryAnimation = (name, node) => {};

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
