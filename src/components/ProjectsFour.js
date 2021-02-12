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
        visibility: hidden;
        display: none;
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
    .Animation-project--first {
        @media ${Sizes.sm} {
            padding-top: 20px;
        }

        @media ${Sizes.md} {
            padding-top: 50px;
        }

        @media ${Sizes.lg} {
            padding-top: 100px;
        }
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
    // let yValues = [];
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
        projectImagesRef.current[0].style.visibility = 'visible';
        projectImagesRef.current[0].style.display = 'block';
        timeline();
    }, []);

    const goRight = (index, xValue) => {
        projectImagesRef.current.forEach((projectImage, index2) => {
            if (index != index2) {
                projectImagesRef.current[index2].style.opacity = 0;
                projectImagesRef.current[index2].style.visibility = 'hidden';
                projectImagesRef.current[index2].style.display = 'none';
            } else {
                projectImagesRef.current[index].style.opacity = 1;
                projectImagesRef.current[index].style.visibility = 'visible';
                projectImagesRef.current[index].style.display = 'block';
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
                projectImagesRef.current[index2].style.visibility = 'hidden';
                projectImagesRef.current[index2].style.display = 'none';
            } else {
                projectImagesRef.current[index].style.opacity = 1;
                projectImagesRef.current[index].style.visibility = 'visible';
                projectImagesRef.current[index].style.display = 'block';
            }
        });
        gsap.to(animationBackgroundRef.current, {
            x: 0,
            rotate: '-3deg',
            ease: 'elastic.out(1.1, 1.3)',
        });
    };

    const newY = (index, position) => {
        let y;
        switch (position) {
            case 'first':
                console.log('index :' + index + '  ' + ghostDOMRefs.current[index].offsetTop);
                y = ghostDOMRefs.current[index].offsetTop;
                break;
            case 'last':
                console.log('index :' + index + '  ' + projectDOMRefs.current[index].offsetTop);
                // y =
                //     projectDOMRefs.current[index].offsetTop - projectDOMRefs.current[index].offsetHeight;
                if (window.innerWidth > 1140) {
                    y =
                        projectsContainerRef.current.offsetHeight -
                        ghostDOMRefs.current[0].offsetHeight +
                        projectDOMRefs.current[index].offsetHeight / 2;
                } else if (window.innerWidth > 1024) {
                    y =
                        projectsContainerRef.current.offsetHeight -
                        ghostDOMRefs.current[0].offsetHeight +
                        projectDOMRefs.current[index].offsetHeight / 2;
                } else if (window.innerWidth > 950) {
                    y =
                        projectsContainerRef.current.offsetHeight -
                        ghostDOMRefs.current[0].offsetHeight +
                        100;
                } else if (window.innerWidth > 850) {
                    y =
                        projectsContainerRef.current.offsetHeight -
                        ghostDOMRefs.current[0].offsetHeight +
                        50;
                } else {
                    y =
                        projectsContainerRef.current.offsetHeight -
                        ghostDOMRefs.current[0].offsetHeight;
                }

                break;
            case 'even':
                console.log('index :' + index + '  ' + ghostDOMRefs.current[index].offsetTop);
                y = ghostDOMRefs.current[index].offsetTop;
                break;
            case 'odd':
                console.log('index :' + index + '  ' + ghostDOMRefs.current[index].offsetTop);
                y = ghostDOMRefs.current[index].offsetTop;
                break;
        }

        return y;
    };

    const timeline = () => {
        const newTimeline = gsap.timeline();
        projectDOMRefs.current.forEach((project, index, array) => {
            if (index == 0) {
                newTimeline.to(animationBackgroundRef.current, {
                    y: () => newY(index, 'first'),
                    scrollTrigger: {
                        // invalidateOnRefresh: true,
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
                    onComplete: goRight,
                    onCompleteParams: [index + 1, boxRefs.current[0].offsetLeft],
                });

                return;
            }

            if (index == array.length - 1) {
                newTimeline.to(animationBackgroundRef.current, {
                    y: () => newY(index, 'last'),
                    scrollTrigger: {
                        invalidateOnRefresh: true,
                        trigger: ghostDOMRefs.current[index - 1],
                        start: 'center center',
                        end: `bottom center`,
                        // end: `bottom+=400 center`,
                        markers: true,
                        toggleActions: 'play none none reverse',
                    },
                });

                return;
            }

            if (index % 2 == 0) {
                newTimeline.to(animationBackgroundRef.current, {
                    y: () => newY(index, 'even'),
                    scrollTrigger: {
                        invalidateOnRefresh: true,
                        trigger: project,
                        start: 'top center',
                        endTrigger: ghostDOMRefs.current[index],
                        end: `${index != array.length - 2 ? 'bottom' : 'center'} center`,
                        // end: `bottom+=400 center`,
                        scrub: true,
                        markers: true,
                        toggleActions: 'play none none reverse',
                        onEnterBack: () => goLeft(index, boxRefs.current[0].offsetLeft),
                    },
                    onComplete: goRight,
                    onCompleteParams: [index + 1],
                });
            } else {
                newTimeline.to(animationBackgroundRef.current, {
                    y: () => newY(index, 'odd'),
                    scrollTrigger: {
                        invalidateOnRefresh: true,
                        trigger: project,
                        start: 'top center',
                        endTrigger: ghostDOMRefs.current[index],
                        end: `${index != array.length - 2 ? 'bottom' : 'center'} center`,
                        // end: `bottom+=400 center`,
                        scrub: true,
                        markers: true,
                        toggleActions: 'play none none reverse',
                        onEnterBack: () => goRight(index, boxRefs.current[0].offsetLeft),
                    },
                    onComplete: goLeft,
                    onCompleteParams: [index + 1],
                });
            }
        });
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
                        <ImageContainer className='Animation-projectImage'>
                            {projects.map((project, index) => {
                                return (
                                    <GatsbyImageContainer
                                        className='Animation-projectImage'
                                        key={index}
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
            {projects.map((project, index, array) => {
                if (index % 2 === 0) {
                    return (
                        <Fragment key={index}>
                            <Project
                                ref={addProjectDOMRefs}
                                className={
                                    index == 0
                                        ? 'Animation-project Animation-project--first'
                                        : 'Animation-project'
                                }>
                                <Grid
                                    breakpoints={[0, 768]}
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
                            {array.length - 1 == index ? null : (
                                <GhostContainer
                                    ref={addGhostDOMRefs}
                                    className='Animation-ghosts'
                                />
                            )}
                        </Fragment>
                    );
                } else {
                    return (
                        <Fragment key={index}>
                            <Project ref={addProjectDOMRefs} className='Animation-project'>
                                <Grid
                                    breakpoints={[0, 768]}
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
                            {array.length - 1 == index ? null : (
                                <GhostContainer
                                    ref={addGhostDOMRefs}
                                    className='Animation-ghosts'
                                />
                            )}
                        </Fragment>
                    );
                }
            })}
        </ProjectsContainer>
    );
};

export default ProjectsNew;
