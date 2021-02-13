import React from 'react';
import { connect } from 'react-redux';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Layout from '../components/layout/Layout';
import HomeBanner from '../components/home/HomeBanner';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

import HeadingOne from '../components/HeadingOne';
import Projects from '../components/ProjectsFour';

const index = ({ location }) => {
    ScrollTrigger.addEventListener('refreshInit', function () {
        let ghostDOMS = document.querySelectorAll('.Animation-ghosts');
        if (ghostDOMS) {
            let projectsContainer = document.querySelector('.ProjectsContainer');
            ghostDOMS.forEach((ghost) => {
                ghost.style.height = `${projectsContainer.offsetWidth / 2}px`;
            });
        }
    });

    return (
        <Layout pathName={location.pathname}>
            <NavBar />
            <HomeBanner />
            <HeadingOne title='Featured Projects' />
            <Projects />
            <Footer />
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps)(index);
