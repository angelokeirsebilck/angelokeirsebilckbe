import React from 'react';

// Components
import Layout from '../components/layout/Layout';
import NavBar from '../components/layout/NavBar';
import HeadingOne from '../components/HeadingOne';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

const work = () => {
    return (
        <Layout>
            <NavBar />
            <HeadingOne title='Scroller Test' />
        </Layout>
    );
};

export default work;
