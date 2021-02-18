import React from 'react';
import styled from 'styled-components';
import Sizes from '../../constants/breakpoints';

const Container = styled.div`
    display: none;

    @media ${Sizes.sm} {
        display: block;
    }
`;

const PinSpacerOverlapper = () => {
    return <Container className='PinSpacerOverlapper'></Container>;
};

export default PinSpacerOverlapper;
