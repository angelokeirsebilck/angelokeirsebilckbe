import React from 'react';

// Components
import Layout from '../components/layout/Layout';
import NavBar from '../components/layout/NavBar';
import HeadingOne from '../components/HeadingOne';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

const work = () => {
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
            <HeadingOne title='Scroller Test' />
        </Layout>
    );
};

export default work;
