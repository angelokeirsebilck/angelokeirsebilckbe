import React from 'react';
import { connect } from 'react-redux';

// Components
import Layout from '../components/layout/Layout';
import HomeBanner from '../components/home/HomeBanner';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

import Projects from '../components/ProjectsFour';
import SectionContainer from '../components/layout/SectionContainer';

const index = ({ location }) => {
    return (
        <Layout pathName={location.pathname}>
            <NavBar />
            <HomeBanner />
            <SectionContainer>
                <Projects />
            </SectionContainer>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps)(index);
