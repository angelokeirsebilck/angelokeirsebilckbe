import React, { useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import HeadingOne from './HeadingOne';
import Sizes from '../constants/breakpoints';
import { gsap } from 'gsap';
import { Grid, Box } from 'react-raster';
import Image from 'gatsby-image';

const ProjectsContainer = styled.section`
    margin-top: 30px;
    margin-bottom: 30px;
    position: relative;

    @media ${Sizes.md} {
        margin-top: 60px;
        margin-bottom: 60px;
    }
`;

const AnimationBackground = styled.div`
    /* width: 45%; */
    /* height: 450px; */
    background: linear-gradient(to bottom, rgba(30, 174, 152, 0.5), rgba(30, 174, 152, 0.01));
    border-radius: 50px;
    transform: rotate(-3deg);
    position: absolute;
    top: 100px;
    left: 0;
    box-shadow: 0px 1px 0px 1px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Project = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;

    /* & > *:first-of-type {
        margin-top: 110px;
    } */

    @media ${Sizes.md} {
        margin-top: 60px;
        margin-bottom: 60px;
    }
`;
const ProjectTitle = styled.h2`
    color: ${(props) => props.theme.textColor};
    font-size: 20px;
    margin-bottom: 20px;

    @media ${Sizes.md} {
        font-size: 26px;
    }
`;

const ProjectText = styled.div`
    color: ${(props) => props.theme.textColor};
`;

const StackContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 15px;
`;

const StackItem = styled.div`
    display: inline-block;
    background: rgba(207, 181, 250, 1);
    color: ${(props) => props.theme.textColor};
    padding: 3px 10px;
    margin-right: 10px;
`;

const GhostContainer = styled.div`
    height: 400px;
`;

const ImageContainer = styled.div`
    width: 80%;
    height: 80%;

    & .Animation-projectImage {
        transition: 0.4s all;
        opacity: 0;
        height: 0;
    }
`;

const GatsbyImageContainer = styled.div``;
const query = graphql`
    {
        allStrapiProject {
            projects: nodes {
                Text
                Title
                StackList {
                    Stack
                    id
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

const Projects = () => {
    const {
        allStrapiProject: { projects },
    } = useStaticQuery(query);

    console.log(projects);
    const projectImagesRef = useRef([]);
    const addProjectImagesRefs = (el) => {
        if (el && !projectImagesRef.current.includes(el)) {
            projectImagesRef.current.push(el);
        }
    };

    let animationProjectsContainer = document.querySelector('.Animation-projectsContainer');

    let animationBackgroundWidth;
    let animationBackgroundX;
    if (animationProjectsContainer != null) {
        animationBackgroundWidth = animationProjectsContainer.offsetWidth / 2 - 50;
        animationBackgroundX = animationProjectsContainer.offsetWidth / 2;
    }

    useEffect(() => {
        const projectList = gsap.utils.toArray('.Animation-project');
        let projectTimeline = [];
        let animationBackground = document.querySelector('.Animation-project');
        projectImagesRef.current[0].style.opacity = 1;
        projectImagesRef.current[0].style.opacity = 'initial';
        const goRight = (index) => {
            projectImagesRef.current.forEach((projectImage, index2) => {
                if (index != index2) {
                    projectImagesRef.current[index2].style.opacity = 0;
                    projectImagesRef.current[index2].style.height = 0;
                    // console.log(projectImagesRef.current[index]);
                } else {
                    projectImagesRef.current[index].style.opacity = 1;
                    projectImagesRef.current[index2].style.opacity = 'initial';
                }
            });

            gsap.to('.Animation-background', {
                x: animationBackgroundX + 50,
                rotate: '3deg',
                ease: 'elastic.out(1.1, 1.3)',
            });
        };

        const goLeft = (index) => {
            projectImagesRef.current.forEach((projectImage, index2) => {
                if (index != index2) {
                    projectImagesRef.current[index2].style.opacity = 0;
                    projectImagesRef.current[index2].style.height = 0;
                    // console.log(projectImagesRef.current[index]);
                } else {
                    projectImagesRef.current[index].style.opacity = 1;
                    projectImagesRef.current[index2].style.opacity = 'initial';
                }
            });
            gsap.to('.Animation-background', {
                x: 0,
                rotate: '-3deg',
                ease: 'elastic.out(1.1, 1.3)',
            });
        };
        let yValue = 300;
        projectList.forEach((project, index) => {
            let projectHeight = project.offsetHeight;
            let bottom = projectHeight + 400;

            if (index % 2 === 0) {
                projectTimeline.push(
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: project,
                            start: 'bottom center',
                            end: `${bottom} center`,
                            scrub: true,
                            markers: true,
                            toggleActions: 'play none none reverse',
                            onEnterBack: () => goLeft(index),
                        },
                    })
                );

                projectTimeline[index].to('.Animation-background', {
                    y: yValue,

                    onComplete: goRight,
                    onCompleteParams: [index + 1],
                });
            } else {
                let newY = animationBackground.style.top;
                projectTimeline.push(
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: project,
                            start: 'top center',
                            end: `${bottom} center`,
                            scrub: true,
                            markers: true,
                            toggleActions: 'play none none reverse',
                            onEnterBack: () => goLeft(),
                        },
                    })
                );

                projectTimeline[index].to('.Animation-background', {
                    y: yValue,
                    onComplete: goRight,
                    onCompleteParams: [index],
                });
            }

            yValue = yValue + bottom;
        });
    }, [animationBackgroundX]);

    return (
        <ProjectsContainer className='Animation-projectsContainer'>
            <AnimationBackground
                css={{
                    width: `${animationBackgroundWidth}px`,
                    height: `${animationBackgroundWidth}px`,
                }}
                className='Animation-background'>
                <ImageContainer>
                    {projects.map((project, index) => {
                        return (
                            <GatsbyImageContainer
                                key={index}
                                className='Animation-projectImage'
                                ref={addProjectImagesRefs}>
                                <Image fluid={project.Image.childImageSharp.fluid} />
                            </GatsbyImageContainer>
                        );
                    })}
                </ImageContainer>
                {/* <ImageContainer>
                    <Image
                        ref={projectImageRef}
                        className='Animation-projectImage'
                        fluid={projects[0].Image.childImageSharp.fluid}
                    />
                </ImageContainer> */}
            </AnimationBackground>
            <HeadingOne title='Projects' />
            <Project className='Animation-project'>
                <Grid
                    breakpoints={[0, 767]}
                    colspan={2}
                    gutterX={'40px'}
                    gutterY={['40px', 0]}
                    css={{ width: '100%' }}>
                    <Box className='HomeBanner-image' cols={[2, 1]}></Box>
                    <Box
                        cols={[2, 1]}
                        css={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <ProjectTitle>{projects[0].Title}</ProjectTitle>
                        <ProjectText>{projects[0].Text}</ProjectText>
                        <StackContainer>
                            {projects[0].StackList.map((stack) => {
                                return <StackItem key={stack.id}> {stack.Stack}</StackItem>;
                            })}
                        </StackContainer>
                    </Box>
                </Grid>
            </Project>
            <GhostContainer className='Animation-ghostContainer' />
            <Project className='Animation-project'>
                <Grid
                    breakpoints={[0, 767]}
                    colspan={2}
                    gutterX={'40px'}
                    gutterY={['40px', 0]}
                    css={{ width: '100%' }}>
                    <Box
                        cols={[2, 1]}
                        css={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <ProjectTitle>{projects[1].Title}</ProjectTitle>
                        <ProjectText>{projects[1].Text}</ProjectText>
                        <StackContainer>
                            {projects[1].StackList.map((stack) => {
                                return <StackItem key={stack.id}> {stack.Stack}</StackItem>;
                            })}
                        </StackContainer>
                    </Box>
                    <Box className='HomeBanner-image' cols={[2, 1]}></Box>
                </Grid>
            </Project>
            <GhostContainer className='Animation-ghostContainer' />
        </ProjectsContainer>
    );
};

export default Projects;
