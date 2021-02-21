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

const about = ({}) => {
    return (
        <Layout>
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
