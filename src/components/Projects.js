import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import HeadingOne from './HeadingOne';
import Sizes from '../constants/breakpoints';

const ProjectsContainer = styled.section`
    margin-top: 30px;
    margin-bottom: 30px;

    @media ${Sizes.md} {
        margin-top: 60px;
        margin-bottom: 60px;
    }
`;

const Projects = () => {
    return (
        <ProjectsContainer>
            <HeadingOne title='Projects' />
        </ProjectsContainer>
    );
};

export default Projects;
