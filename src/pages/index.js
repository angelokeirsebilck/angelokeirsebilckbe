import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { connect } from 'react-redux';

// import { Grid, Box } from 'react-raster';

// Components
import Layout from '../components/layout/Layout';
import HomeBanner from '../components/home/HomeBanner';
import NavBar from '../components/layout/NavBar';
import Nav from '../components/Nav';

const PurpleCircelContainer = styled.div`
    position: absolute;
    top: 40vh;
    left: -250px;
    pointer-events: none;
    max-width: 100%;
    overflow: hidden;
`;

const index = ({ global }) => {
    return (
        <Layout>
            <PurpleCircelContainer>
                {global.colorMode == 'light' ? (
                    <svg
                        width='694'
                        height='644'
                        viewBox='0 0 694 644'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <circle
                            opacity='0.2'
                            cx='347'
                            cy='347'
                            r='347'
                            fill='url(#paint0_radial)'
                        />
                        <defs>
                            <radialGradient
                                id='paint0_radial'
                                cx='0'
                                cy='0'
                                r='1'
                                gradientUnits='userSpaceOnUse'
                                gradientTransform='translate(285.5 317) rotate(-40.7762) scale(355.225)'>
                                <stop stopColor='#D8B5FF' />
                                <stop offset='1' stopColor='white' stopOpacity='0.51' />
                            </radialGradient>
                        </defs>
                    </svg>
                ) : (
                    <svg
                        width='694'
                        height='640'
                        viewBox='0 0 694 640'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <circle
                            opacity='0.2'
                            cx='347'
                            cy='347'
                            r='347'
                            fill='url(#paint0_radial)'
                        />
                        <defs>
                            <radialGradient
                                id='paint0_radial'
                                cx='0'
                                cy='0'
                                r='1'
                                gradientUnits='userSpaceOnUse'
                                gradientTransform='translate(285.5 317) rotate(-41.6518) scale(260.306)'>
                                <stop stopColor='#CFB5FA' />
                                <stop offset='1' stopColor='#1E2030' stopOpacity='0.51' />
                            </radialGradient>
                        </defs>
                    </svg>
                )}
            </PurpleCircelContainer>
            <NavBar />
            <HomeBanner />
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps)(index);
