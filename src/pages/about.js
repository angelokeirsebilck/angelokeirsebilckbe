import React from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { connect } from 'react-redux';
import { gsap } from 'gsap';

// Components
import Layout from '../components/layout/Layout';
import NavBar from '../components/layout/NavBar';
import Skills from '../components/about/Skills';
import Skills2 from '../components/about/Skills2';
import Education from '../components/about/Education';
import Experience from '../components/about/Experience';

import { changeXValueSkills } from '../../actions/globalActions';

const about = ({ transitionStatus, location, changeXValueSkills }) => {
    ScrollTrigger.addEventListener('refreshInit', function () {
        let ghostDOMS = document.querySelectorAll('.Animation-ghosts');
        if (ghostDOMS) {
            let projectsContainer = document.querySelector('.ProjectsContainer');
            ghostDOMS.forEach((ghost) => {
                ghost.style.height = `${projectsContainer.offsetWidth / 2}px`;
            });
        }
    });

    ScrollTrigger.addEventListener('refresh', function () {
        const backgroundSkills = document.querySelectorAll('.BackgroundSkills');
        if (backgroundSkills !== null) {
            ScrollTrigger.matchMedia({
                // desktop
                '(min-width: 767px)': function () {
                    let pinSectionHeight = 0;
                    if (backgroundSkills != null) {
                        backgroundSkills.forEach((bg) => {
                            if (bg.offsetHeight > pinSectionHeight)
                                pinSectionHeight = bg.offsetHeight;
                        });
                        gsap.set('.PinSectionSkills', { height: pinSectionHeight });
                    }
                },
                '(max-width: 766px)': function () {
                    gsap.set('.PinSectionSkills', { height: 'auto' });
                },
            });
        }
    });

    return (
        <Layout>
            <NavBar />
            <div className='PinWrapper'>
                <Skills />
                {/* <Education /> */}
                <Experience />
            </div>
        </Layout>
    );
};
const mapStateToProps = (state) => ({
    global: state.global,
});
export default connect(mapStateToProps, { changeXValueSkills })(about);
