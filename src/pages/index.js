import React from 'react';
import { connect } from 'react-redux';

// Components
import Layout from '../components/layout/Layout';
import HomeBanner from '../components/home/HomeBanner';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

import Projects from '../components/ProjectsFour';

const index = ({ location }) => {
    return (
        <Layout pathName={location.pathname}>
            <NavBar />
            <HomeBanner />
            <Projects />
            <Footer />
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps)(index);
