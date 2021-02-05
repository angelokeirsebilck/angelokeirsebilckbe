import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

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

const Wrapper = styled.div`
    max-width: 1400px;
    margin: 0 auto;
`;

const Layout = ({ children }) => {
    return (
        <Wrapper>
            <GlobalStyle />
            {children}
        </Wrapper>
    );
};

export default Layout;
