import React, { Fragment, useEffect, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import HeadingOne from './HeadingOne';
import Sizes from '../constants/breakpoints';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Grid, Box } from 'react-raster';
import Image from 'gatsby-image';

const AnimationBackground = styled.div`
    background: linear-gradient(to bottom, rgba(30, 174, 152, 0.5), rgba(30, 174, 152, 0.01));
    border-radius: 50px;
    transform: rotate(-3deg);
    position: absolute;
    left: 0;
    box-shadow: 0px 1px 0px 1px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 90%;
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

const CustomGrid = styled(Grid)`
    width: 100%;
    position: absolute;

    &:before {
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 2;
    }
`;
const GatsbyImageContainer = styled.div``;

const Project = styled.div`
    /* margin-top: 30px;
    margin-bottom: 30px; */
    /* padding-bottom: 400px; */
    /* & > *:first-of-type {
        margin-top: 110px;
    } */

    @media ${Sizes.md} {
        /* margin-top: 60px;
        margin-bottom: 60px; */
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

const ProjectText = styled.div`
    color: ${(props) => props.theme.textColor};
`;

const ProjectsContainer = styled.section`
    margin-top: 30px;
    margin-bottom: 30px;
    position: relative;

    @media ${Sizes.md} {
        margin-top: 60px;
        margin-bottom: 60px;
    }
`;

const GhostContainer = styled.div``;

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

const ProjectsNew = () => {
    const {
        allStrapiProject: { projects },
    } = useStaticQuery(query);

    const [loading, setLoading] = useState(true);
    const [timelines, setTimelines] = useState([]);
    // const [ghostsDOMArray, setGhostsDOMArray] = useState([]);
    // const [projectsDOMArray, setProjectsDOMArray] = useState([]);

    // const ghostContainerRefs = useRef([]);

    const projectsContainerRef = useRef();
    const animationBackgroundRef = useRef();
    const projectImagesRef = useRef([]);
    const ghostDOMRefs = useRef([]);
    const projectDOMRefs = useRef([]);
    const boxRefs = useRef([]);

    const addboxRefs = (el) => {
        if (el && !boxRefs.current.includes(el)) {
            boxRefs.current.push(el);
        }
    };

    const addProjectImagesRefs = (el) => {
        if (el && !projectImagesRef.current.includes(el)) {
            projectImagesRef.current.push(el);
        }
    };
    const addGhostDOMRefs = (el) => {
        if (el && !ghostDOMRefs.current.includes(el)) {
            ghostDOMRefs.current.push(el);
        }
    };
    const addProjectDOMRefs = (el) => {
        if (el && !projectDOMRefs.current.includes(el)) {
            projectDOMRefs.current.push(el);
        }
    };

    useEffect(() => {
        if (loading) {
            // setGhostsDOMArray(document.querySelectorAll('.Animation-ghosts'));
            // setProjectsDOMArray(document.querySelectorAll('.Animation-project'));
        }

        // console.log(projectsContainerRef.current.offsetWidth);

        ghostDOMRefs.current.forEach((ghost) => {
            ghost.style.height = `${projectsContainerRef.current.offsetWidth / 2}px`;
        });
        projectImagesRef.current[0].style.opacity = 1;
        projectImagesRef.current[0].style.height = 'initial';
        console.log(boxRefs.current[0].offsetLeft);
        timeline();
    }, []);

    // const reCalculate = () => {
    //     if (timelines.length) {
    //         setTimelines((timelines.length = 0));
    //     }

    //     ghostDOMRefs.current.forEach((ghost) => {
    //         ghost.style.height = `${projectsContainerRef.current.offsetWidth / 2}px`;
    //     });

    //     timeline();
    // };

    // window.addEventListener('resize', reCalculate);

    ScrollTrigger.addEventListener('refreshInit', function () {
        ghostDOMRefs.current.forEach((ghost) => {
            ghost.style.height = `${projectsContainerRef.current.offsetWidth / 2}px`;
        });
    });

    const goRight = (index, xValue) => {
        projectImagesRef.current.forEach((projectImage, index2) => {
            if (index != index2) {
                projectImagesRef.current[index2].style.opacity = 0;
                projectImagesRef.current[index2].style.height = 0;
                // console.log(projectImagesRef.current[index]);
            } else {
                projectImagesRef.current[index].style.opacity = 1;
                projectImagesRef.current[index2].style.height = 'initial';
            }
        });

        gsap.to(animationBackgroundRef.current, {
            x: '120%',
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
        gsap.to(animationBackgroundRef.current, {
            x: 0,
            rotate: '-3deg',
            ease: 'elastic.out(1.1, 1.3)',
        });
    };

    const timeline = () => {
        console.log(timelines);
        if (timelines.length == 0) {
            projectDOMRefs.current.forEach((project, index, array) => {
                if (index == 0) {
                    timelines.push(
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: project,
                                start: 'bottom center',
                                endTrigger: ghostDOMRefs.current[index],
                                end: `bottom center`,
                                // end: `bottom+=400 center`,
                                scrub: true,
                                markers: true,
                                toggleActions: 'play none none reverse',
                                onEnterBack: () => goLeft(index),
                            },
                        })
                    );

                    timelines[index].to(animationBackgroundRef.current, {
                        y: ghostDOMRefs.current[index].offsetTop,
                        onComplete: goRight,
                        onCompleteParams: [index + 1, boxRefs.current[0].offsetLeft],
                    });

                    return;
                }

                if (index == array.length - 1) {
                    timelines.push(
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: project,
                                start: 'top center',
                                end: `bottom center`,
                                // end: `bottom+=400 center`,
                                scrub: true,
                                markers: true,
                                toggleActions: 'play none none reverse',
                            },
                        })
                    );

                    timelines[index].to(animationBackgroundRef.current, {
                        y: projectDOMRefs.current[index].offsetTop,
                    });

                    return;
                }

                if (index % 2 == 0) {
                    timelines.push(
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: project,
                                start: 'top center',
                                endTrigger: ghostDOMRefs.current[index],
                                end: `bottom center`,
                                // end: `bottom+=400 center`,
                                scrub: true,
                                markers: true,
                                toggleActions: 'play none none reverse',
                                onEnterBack: () => goRight(index, boxRefs.current[0].offsetLeft),
                            },
                        })
                    );

                    timelines[index].to(animationBackgroundRef.current, {
                        y: ghostDOMRefs.current[index].offsetTop,
                        onComplete: goLeft,
                        onCompleteParams: [index + 1],
                    });
                } else {
                    timelines.push(
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: project,
                                start: 'top center',
                                endTrigger: ghostDOMRefs.current[index],
                                end: `bottom center`,
                                // end: `bottom+=400 center`,
                                scrub: true,
                                markers: true,
                                toggleActions: 'play none none reverse',
                                onEnterBack: () => goRight(index, boxRefs.current[0].offsetLeft),
                            },
                        })
                    );

                    timelines[index].to(animationBackgroundRef.current, {
                        y: ghostDOMRefs.current[index].offsetTop,
                        onComplete: goLeft,
                        onCompleteParams: [index + 1],
                    });
                }
            });
        }
    };

    return (
        <ProjectsContainer ref={projectsContainerRef} className='ProjectsContainer'>
            <CustomGrid colspan={2}>
                <Box cols={1}>
                    <AnimationBackground
                        ref={animationBackgroundRef}
                        // css={{
                        //     width: `${animationBackgroundWidth}px`,
                        //     height: `${animationBackgroundWidth}px`,
                        // }}
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
                </Box>
            </CustomGrid>
            {projects.map((project, index) => {
                if (index % 2 === 0) {
                    return (
                        <Fragment key={index}>
                            <Project ref={addProjectDOMRefs} className='Animation-project'>
                                <Grid
                                    breakpoints={[0, 767]}
                                    colspan={2}
                                    gutterX={'40px'}
                                    gutterY={['40px', 0]}
                                    css={{ width: '100%' }}>
                                    <Box className='HomeBanner-image' cols={[2, 1]}></Box>
                                    <Box
                                        ref={addboxRefs}
                                        cols={[2, 1]}
                                        css={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}>
                                        <ProjectTitle>{project.Title}</ProjectTitle>
                                        <ProjectText>{project.Text}</ProjectText>
                                        <StackContainer>
                                            {project.StackList.map((stack) => {
                                                return (
                                                    <StackItem key={stack.id}>
                                                        {stack.Stack}
                                                    </StackItem>
                                                );
                                            })}
                                        </StackContainer>
                                    </Box>
                                </Grid>
                            </Project>
                            <GhostContainer ref={addGhostDOMRefs} className='Animation-ghosts' />
                        </Fragment>
                    );
                } else {
                    return (
                        <Fragment key={index}>
                            <Project ref={addProjectDOMRefs} className='Animation-project'>
                                <Grid
                                    breakpoints={[0, 767]}
                                    colspan={2}
                                    gutterX={'40px'}
                                    gutterY={['40px', 0]}
                                    css={{ width: '100%' }}>
                                    <Box
                                        ref={addboxRefs}
                                        cols={[2, 1]}
                                        css={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}>
                                        <ProjectTitle>{project.Title}</ProjectTitle>
                                        <ProjectText>{project.Text}</ProjectText>
                                        <StackContainer>
                                            {project.StackList.map((stack) => {
                                                return (
                                                    <StackItem key={stack.id}>
                                                        {' '}
                                                        {stack.Stack}
                                                    </StackItem>
                                                );
                                            })}
                                        </StackContainer>
                                    </Box>
                                    <Box className='HomeBanner-image' cols={[2, 1]}></Box>
                                </Grid>
                            </Project>
                            <GhostContainer ref={addGhostDOMRefs} className='Animation-ghosts' />
                        </Fragment>
                    );
                }
            })}
        </ProjectsContainer>
    );
};

export default ProjectsNew;
