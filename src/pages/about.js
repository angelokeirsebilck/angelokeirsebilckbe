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
    const backgroundSkills = document.querySelectorAll('.BackgroundSkills');
    const educationGridItems = document.querySelectorAll('.EducationGrid');
    let ghostDOMS = document.querySelectorAll('.Animation-ghosts');

    ScrollTrigger.addEventListener('refreshInit', function () {
        if (ghostDOMS) {
            let projectsContainer = document.querySelector('.ProjectsContainer');
            ghostDOMS.forEach((ghost) => {
                ghost.style.height = `${projectsContainer.offsetWidth / 2}px`;
            });
        }

        if (educationGridItems !== null) {
            let pinSectionEducationHeight = 0;
            educationGridItems.forEach((grid) => {
                if (grid.offsetHeight > pinSectionEducationHeight) {
                    pinSectionEducationHeight = grid.offsetHeight + 3;
                }
            });
            gsap.set('.PinSectionEducation', { height: pinSectionEducationHeight });
        }
    });

    ScrollTrigger.addEventListener('refresh', function () {
        if (backgroundSkills !== null) {
            ScrollTrigger.matchMedia({
                // desktop
                '(min-width: 767px)': function () {
                    if (backgroundSkills !== null) {
                        let pinSectionHeight = 0;
                        if (backgroundSkills != null) {
                            backgroundSkills.forEach((bg) => {
                                if (bg.offsetHeight > pinSectionHeight)
                                    pinSectionHeight = bg.offsetHeight;
                            });
                            gsap.set('.PinSectionSkills', { height: pinSectionHeight });
                        }
                    }

                    if (educationGridItems !== null) {
                        let pinSectionEducationHeight = 0;
                        educationGridItems.forEach((grid) => {
                            if (grid.offsetHeight > pinSectionEducationHeight) {
                                pinSectionEducationHeight = grid.offsetHeight + 3;
                            }

                            gsap.set(grid, { position: 'absolute' });
                        });
                        gsap.set('.PinSectionEducation', { height: pinSectionEducationHeight });
                    }
                },
                '(max-width: 766px)': function () {
                    if (backgroundSkills !== null) {
                        gsap.set('.PinSectionSkills', { height: 'auto' });
                    }

                    if (educationGridItems !== null) {
                        educationGridItems.forEach((grid) => {
                            gsap.set(grid, { position: 'relative' });
                        });
                        gsap.set('.PinSectionEducation', { height: 'auto' });
                    }
                },
            });
        }
    });

    return (
        <Layout>
            <NavBar />
            <div className='PinWrapper'>
                <Skills />
                <Education />
                <Experience />
            </div>
        </Layout>
    );
};
const mapStateToProps = (state) => ({
    global: state.global,
});
export default connect(mapStateToProps, { changeXValueSkills })(about);
