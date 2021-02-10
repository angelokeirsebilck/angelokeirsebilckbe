import React from 'react';

// Components
import Layout from '../components/layout/Layout';
import NavBar from '../components/layout/NavBar';

const about = () => {
    return (
        <Layout>
            <NavBar />
            <h1
                style={{
                    fontSize: '50px',
                    marginTop: '100px',
                    color: '#FFF',
                }}>
                ABOUT PAGE
            </h1>
        </Layout>
    );
};

export default about;
