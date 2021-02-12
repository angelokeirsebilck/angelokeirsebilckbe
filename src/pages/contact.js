import React from 'react';
import Footer from '../components/layout/Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Layout from '../components/layout/Layout';
import NavBar from '../components/layout/NavBar';

import Projects from '../components/ProjectsFour';

const contact = () => {
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
            <div className='test' style={{ marginTop: '500px' }}>
                <Projects />
            </div>
            <Footer />
        </Layout>
    );
};

export default contact;
