import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'gatsby';

// Components
import Layout from '../components/layout/Layout';
import HomeBanner from '../components/home/HomeBanner';
import NavBar from '../components/layout/NavBar';

import Projects from '../components/ProjectsFour';
import SectionContainer from '../components/layout/SectionContainer';

const index = ({ location, data }) => {
    const {
        allStrapiProject: { projects },
    } = data;

    return (
        <Layout pathName={location.pathname}>
            <NavBar />
            <HomeBanner />

            <Projects projects={projects} title='Featured Projects' />
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    global: state.global,
});

export const query = graphql`
    query FeaturedProjects {
        allStrapiProject(filter: { featured: { eq: true } }) {
            projects: nodes {
                Text
                Title
                github
                url
                StackList {
                    Stack
                    id
                }
                mobileImage {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                Image {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;

export default connect(mapStateToProps)(index);
