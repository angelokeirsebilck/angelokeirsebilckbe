import React, { useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { connect } from 'react-redux';

import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from '../Nav';
import Sizes from '../../constants/breakpoints';

import CircleAnimation from '../home/CircleAnimation';
import Footer from './Footer';
import Colors from '../../constants/colors';

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
    pageBackground: Colors.darkPageBackground,
    footerTopBackgroundColor: '#666666',
    textColor: '#FFF',
    animationBackground: `linear-gradient(to bottom, rgba(${Colors.secondary}, 0.5),rgba(${Colors.primary},1))`,
    baxShadowAnimationBackground: '1px 1px 1px 1px rgba(247, 245, 242,.5)',
    dateSvgOpacity: '0.2',
};

const LightTheme = {
    pageBackground: Colors.lightPageBackground,
    footerTopBackgroundColor: '#666666',
    textColor: '#1E2030',
    animationBackground: `linear-gradient(to bottom, rgba(${Colors.secondary}, 0.5),rgba(${Colors.primary},1))`,
    baxShadowAnimationBackground: '1px 1px 1px 1px rgba(30,32,48,.5)',
    dateSvgOpacity: '0.5',
};

const themes = {
    dark: DarkTheme,
    light: LightTheme,
};

const Body = styled.div`
    min-height: 100vh;
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
// const PageAnimationLi = styled.li`
//     font-family: 'Space Mono', monospace;
//     transform: translateX(100%);
//     height: 25%;
//     width: 100%;
//     list-style-type: none;
//     position: absolute;
//     font-size: 50px;
//     color: #fff;
//     display: flex;
//     justify-content: center;
//     text-transform: lowercase;
//     align-items: center;
// `;

// const LiSpan = styled.span`
//     transform: skewX(5deg);
//     opacity: 0;
// `;

// const LiSpaReverse = styled.span`
//     transform: skewX(-5deg);
//     opacity: 0;
// `;

const Layout = ({ children, global, pathName }) => {
    useEffect(() => {}, []);

    return (
        <ThemeProvider theme={themes[global.colorMode]}>
            <Body
                className='Body'
                style={
                    global.colorMode === 'dark'
                        ? { background: '#121212' }
                        : { background: '#f7f5f2' }
                }>
                {pathName === '/' ? <CircleAnimation /> : null}
                <Wrapper className='Wrapper'>
                    <GlobalStyle />
                    {children}
                </Wrapper>
                <Footer />
            </Body>

            <Nav />
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps, null)(Layout);
