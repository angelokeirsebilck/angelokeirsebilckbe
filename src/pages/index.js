import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
// import { Grid, Box } from 'react-raster';

// Components
import Layout from '../components/layout/Layout';
import Nav from '../components/layout/Nav';
import HomeBanner from '../components/home/HomeBanner';

const PurpleCircelContainer = styled.div`
    position: absolute;
    bottom: -300px;
    left: 0;
    pointer-events: none;
    max-width: 100%;
    overflow: hidden;
`;

const index = () => {
    return (
        <Layout>
            <PurpleCircelContainer>
                <svg
                    width='400'
                    height='990'
                    viewBox='0 0 679 990'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <circle opacity='0.2' cx='184' cy='495' r='495' fill='url(#paint0_radial)' />
                    <defs>
                        <radialGradient
                            id='paint0_radial'
                            cx='0'
                            cy='0'
                            r='1'
                            gradientUnits='userSpaceOnUse'
                            gradientTransform='translate(8.49999 435) rotate(-23.7114) scale(440.157)'>
                            <stop stopColor='#D8B5FF' />
                            <stop offset='1' stopColor='#1E2030' stopOpacity='0.35' />
                            <stop offset='1' stopColor='#2A2C42' stopOpacity='0' />
                            <stop offset='1' stopColor='white' stopOpacity='0' />
                        </radialGradient>
                    </defs>
                </svg>
            </PurpleCircelContainer>
            <Nav />
            <HomeBanner />
        </Layout>
    );
};

export default index;
