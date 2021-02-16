import React from 'react';
import styled, { keyframes } from 'styled-components';

import Colors from '../constants/colors';

const ScrollAnimation = keyframes`
    0% {
        opacity: 1
    }
    100% {
        opacity: 0;
        transform: translateY(15px)
    }
`;
const ScrollMouseContainer = styled.div`
    width: 30px;
    height: 50px;
    border: 2px solid rgba(${Colors.purleDarkRGB}, 1);
    border-radius: 25px;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        background: rgba(${Colors.purleDarkRGB}, 1);
        top: 5px;
        left: 9px;
        border-radius: 4px;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        animation-name: ${ScrollAnimation};
    }
`;

const ScrollMouse = () => {
    return <ScrollMouseContainer></ScrollMouseContainer>;
};

export default ScrollMouse;
