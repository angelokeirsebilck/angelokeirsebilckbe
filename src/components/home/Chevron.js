import React from 'react';
import styled, { keyframes } from 'styled-components';

import Colors from '../../constants/colors';

const move = keyframes`
    25% {
        opacity: 1;
    }
    33% {
        opacity: 1;
        transform: translateY(30px);
    }
    67% {
        opacity: 1;
        transform: translateY(40px);
    }
    100% {
        opacity: 0;
        transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
    }
`;

const ChevronArrow = styled.div`
    position: absolute;
    width: 18px;
    height: 5px;
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5);
    animation: ${move} 3s ease-out infinite;

    &:first-child {
        animation: ${move} 3s ease-out 1s infinite;
    }

    &:nth-child(2) {
        animation: ${move} 3s ease-out 2s infinite;
    }
    &:before,
    &:after {
        content: ' ';
        position: absolute;
        top: 0;
        height: 100%;
        width: 51%;
        background: rgba(${Colors.secondary}, 1);
    }

    &:before {
        left: 0;
        transform: skew(0deg, 30deg);
    }

    &:after {
        right: 0;
        width: 50%;
        transform: skew(0deg, -30deg);
    }
`;

const ChenvronContainer = styled.div`
    position: relative;
    width: 24px;
    height: 24px;
`;

const Chevron = () => {
    return (
        <ChenvronContainer>
            <ChevronArrow></ChevronArrow>
            <ChevronArrow></ChevronArrow>
            <ChevronArrow></ChevronArrow>
        </ChenvronContainer>
    );
};

export default Chevron;
