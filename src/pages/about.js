import React from 'react';
import { connect } from 'react-redux';

// Components
import Layout from '../components/layout/Layout';
import NavBar from '../components/layout/NavBar';
import Skills from '../components/about/Skills';
import Education from '../components/about/Education';
import Experience from '../components/about/Experience';

import { changeXValueSkills } from '../../actions/globalActions';
import PinSpacerOverlapper from '../components/about/PinSpacerOverlapper';
import SEO from '../components/SEO';

const about = ({}) => {
    return (
        <Layout>
            <SEO
                title='About'
                description='This the about page of Angelo Keirsebilck his portfolio.'
            />
            <NavBar />
            <div className='PinWrapper'>
                <Skills />
                <Education />
                <Experience />
            </div>
            <PinSpacerOverlapper />
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps, { changeXValueSkills })(about);
