import React from 'react';
import styled from 'styled-components';
import Sizes from '../../constants/breakpoints';

const Section = styled.section`
    padding-top: 40px;
    padding-bottom: 40px;

    @media ${Sizes.sm} {
        padding-top: 80px;
        padding-bottom: 80px;
    }

    &.ExtraPaddingTop {
        padding-top: 140px;

        @media ${Sizes.sm} {
            padding-top: 80px;
        }
    }
`;

const SectionContainer = ({ children, styleClass }) => {
    return <Section className={styleClass}> {children}</Section>;
};

export default SectionContainer;
