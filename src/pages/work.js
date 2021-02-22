import React from 'react';

// Components
import Layout from '../components/layout/Layout';
import NavBar from '../components/layout/NavBar';
import SEO from '../components/SEO';
import Projects from '../components/ProjectsFour';

const work = ({ data }) => {
    const {
        allStrapiProject: { projects },
    } = data;
    return (
        <Layout>
            <SEO
                title='Work'
                description='This the projects page of Angelo Keirsebilck his portfolio.'
            />
            <NavBar />
            {/* <HeadingOne title='All Projects' /> */}
            <Projects projects={projects} title='All Projects' allprojects />
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
