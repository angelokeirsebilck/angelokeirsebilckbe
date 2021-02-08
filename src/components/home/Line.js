import React from 'react';
import styled from 'styled-components';

const LineComponent = styled.div`
    position: absolute;
    height: 1px;
    background: rgba(30, 174, 152, 1);
    transform: rotate(45deg);
`;

const Line = ({ width, topStart, leftStart }) => {
    return <LineComponent style={{ width: width, left: leftStart, top: topStart }}></LineComponent>;
};

export default Line;
