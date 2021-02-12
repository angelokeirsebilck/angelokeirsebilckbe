import React from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { connect } from 'react-redux';

// Components
import Layout from '../components/layout/Layout';
import NavBar from '../components/layout/NavBar';
import ProjectsNew from '../components/ProjectsNew';
import ProjectsThree from '../components/ProjectsThree';

const about = ({ transitionStatus, location }) => {
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
        <Layout>
            <NavBar />
            <h1
                style={{
                    fontSize: '50px',
                    marginTop: '100px',
                    color: '#FFF',
                }}>
                ABOUT PAGEEEE
            </h1>

            <ProjectsThree />
        </Layout>
    );
};
const mapStateToProps = (state) => ({
    global: state.global,
});
export default connect(mapStateToProps)(about);
