import React from 'react';

// Components
import Layout from '../components/layout/Layout';
import NavBar from '../components/layout/NavBar';
import HeadingOne from '../components/HeadingOne';

import Projects from '../components/ProjectsFour';
import SectionContainer from '../components/layout/SectionContainer';

const work = ({ data }) => {
    const {
        allStrapiProject: { projects },
    } = data;
    return (
        <Layout>
            <NavBar />
            {/* <HeadingOne title='All Projects' /> */}
            <Projects projects={projects} title='All Projects' />
        </Layout>
    );
};

export const query = graphql`
    query AllProjects {
        allStrapiProject {
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

export default work;
