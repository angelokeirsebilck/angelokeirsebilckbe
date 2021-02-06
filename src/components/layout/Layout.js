import React, { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { connect } from 'react-redux';

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
    pageBackground: '#FFF',
    textColor: '#1E2030',
};

const themes = {
    dark: DarkTheme,
    light: LightTheme,
};

const Body = styled.div``;

const Wrapper = styled.div`
    max-width: 1400px;
    margin: 0 auto;
`;

const Layout = ({ children, global }) => {
    return (
        <ThemeProvider theme={themes[global.colorMode]}>
            <Body
                style={
                    global.colorMode == 'dark' ? { background: '#1E2030' } : { background: '#FFF' }
                }>
                <Wrapper>
                    <GlobalStyle />
                    {children}
                </Wrapper>
            </Body>
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps, null)(Layout);
