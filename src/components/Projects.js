import React, { Fragment, useEffect, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import HeadingOne from './HeadingOne';
import Sizes from '../constants/breakpoints';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    width: 90%;
    height: 90%;
`;

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

    let projectTimeline = [];

    const [animationBackgroundX, setAnimationBackgroundX] = useState();
    const [loading, setLoading] = useState(true);

    const projectImagesRef = useRef([]);
    const ghostContainerRefs = useRef([]);
    const projectsContainer = useRef();
    const headingOneRef = useRef();

    const addProjectImagesRefs = (el) => {
        if (el && !projectImagesRef.current.includes(el)) {
            projectImagesRef.current.push(el);
        }
    };

    const addGhostContainerRefsRefs = (el) => {
        if (el && !ghostContainerRefs.current.includes(el)) {
            ghostContainerRefs.current.push(el);
        }
    };

    let animationProjectsContainer = document.querySelector('.Animation-projectsContainer');
    // if (animationProjectsContainer != null) {
    //     animationBackgroundX = animationProjectsContainer.offsetWidth / 2;
    // }

    const calculateAnimationBackgroundX = () => {
        headingOneRef.current.style.paddingBottom = `${
            projectsContainer.current.offsetWidth / 8
        }px`;
        // projectTimeline.length = 0;
        if (animationProjectsContainer != null) {
            setAnimationBackgroundX(projectsContainer.current.offsetWidth / 2);
        }

        // loadAnimations();
    };

    window.addEventListener('resize', calculateAnimationBackgroundX);

    // if (loading) {
    //     console.log('loading true');
    //     setLoading(false);
    //     setAnimationBackgroundX(projectsContainer.current.offsetWidth / 2);
    // }
    const goRight = (index) => {
        console.log(animationBackgroundX);
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
            x: animationBackgroundX,
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

    const calculateEndPont = (project, index) => {
        let projectHeight = project.offsetHeight;
        let bottom = projectHeight + 400;
        console.log(`${project} ${index} bottom= ${bottom}`);
        return `${bottom}px`;
    };

    const loadAnimations = () => {
        // const projectList = gsap.utils.toArray('.Animation-project');
        // let projectTimeline = [];
        // let animationBackground = document.querySelector('.Animation-project');
        projectImagesRef.current[0].style.opacity = 1;
        projectImagesRef.current[0].style.opacity = 'initial';
        if (!loading) {
            setScrollTriggers();
            setLoading(true);
        }
    };

    const setScrollTriggers = () => {
        // console.log('loadAnimation: ', animationBackgroundX);
        let yValue = ghostContainerRefs.current[0].offsetHeight / 2 + 100;
        console.log(yValue);
        const projectList = gsap.utils.toArray('.Animation-project');
        projectTimeline = [];
        // console.log(projectTimeline);

        projectList.forEach((project, index, array) => {
            let projectHeight = project.offsetHeight;
            let bottom = projectHeight + ghostContainerRefs.current[index].offsetHeight;

            if (index == 0) {
                console.log('first ', index);
                // console.log('ghost first: ', ghostContainerRefs.current[index]);
                projectTimeline.push(
                    gsap.timeline({
                        scrollTrigger: {
                            invalidateOnRefresh: true,
                            trigger: project,
                            start: 'bottom center',
                            endTrigger: ghostContainerRefs.current[index],
                            end: `bottom center`,
                            // end: `bottom+=400 center`,
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

                if (index == array.length - 2) {
                    yValue = yValue + bottom / 2;
                } else {
                    yValue = yValue + bottom;
                }

                return;
            }
            if (index == array.length - 1) {
                console.log('last');
                projectTimeline.push(
                    gsap.timeline({
                        scrollTrigger: {
                            invalidateOnRefresh: true,
                            trigger: project,
                            start: 'top center',
                            // end: `${project.offsetHeight + 400} center`,
                            // endTrigger: ghostContainerRefs.current[index],
                            end: `bottom center`,
                            scrub: true,
                            markers: true,
                            toggleActions: 'play none none reverse',
                            // onEnterBack: () => goRight(index),
                        },
                    })
                );

                projectTimeline[index].to('.Animation-background', {
                    y: yValue,
                    // onComplete: goLeft,
                    // onCompleteParams: [index + 1],
                });

                return;
            }

            if (index % 2 === 0) {
                console.log('even niet first ', index);
                // console.log('ghost even: ', ghostContainerRefs.current[index]);
                projectTimeline.push(
                    gsap.timeline({
                        scrollTrigger: {
                            invalidateOnRefresh: true,
                            trigger: project,
                            start: 'top center',
                            endTrigger: ghostContainerRefs.current[index],
                            end: `bottom center`,
                            // end: `bottom+=400 center`,
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
                if (index == array.length - 2) {
                    yValue = yValue + bottom / 2;
                } else {
                    yValue = yValue + bottom;
                }
            } else {
                console.log('oneven ', index);
                // console.log('ghost number oneven: ', ghostContainerRefs.current[index]);

                projectTimeline.push(
                    gsap.timeline({
                        scrollTrigger: {
                            invalidateOnRefresh: true,
                            trigger: project,
                            start: 'top center',
                            // end: `${project.offsetHeight + 400} center`,
                            endTrigger: ghostContainerRefs.current[index],
                            end: `bottom center`,
                            scrub: true,
                            markers: true,
                            toggleActions: 'play none none reverse',
                            onEnterBack: () => goRight(index),
                        },
                    })
                );

                projectTimeline[index].to('.Animation-background', {
                    y: yValue,
                    onComplete: goLeft,
                    onCompleteParams: [index + 1],
                });
                if (index == array.length - 2) {
                    yValue = yValue + bottom / 2;
                } else {
                    yValue = yValue + bottom;
                }
            }

            // if (index == 0) {
            //     // console.log('first ', index);
            //     // console.log('ghost first: ', ghostContainerRefs.current[index]);
            //     projectTimeline.push(
            //         gsap.timeline({
            //             scrollTrigger: {
            //                 // invalidateOnRefresh: true,
            //                 trigger: project,
            //                 start: 'bottom center',
            //                 endTrigger: ghostContainerRefs.current[index],
            //                 end: `bottom center`,
            //                 // end: `bottom+=400 center`,
            //                 scrub: true,
            //                 markers: true,
            //                 toggleActions: 'play none none reverse',
            //                 onEnterBack: () => goLeft(index),
            //             },
            //         })
            //     );

            //     projectTimeline[index].to('.Animation-background', {
            //         y: yValue,

            //         onComplete: goRight,
            //         onCompleteParams: [index + 1],
            //     });

            // } else if (index % 2 === 0) {
            //     // console.log('even niet first ', index);
            //     // console.log('ghost even: ', ghostContainerRefs.current[index]);
            //     projectTimeline.push(
            //         gsap.timeline({
            //             scrollTrigger: {
            //                 invalidateOnRefresh: true,
            //                 trigger: project,
            //                 start: 'top center',
            //                 endTrigger: ghostContainerRefs.current[index],
            //                 end: `bottom center`,
            //                 // end: `bottom+=400 center`,
            //                 scrub: true,
            //                 markers: true,
            //                 toggleActions: 'play none none reverse',
            //                 onEnterBack: () => goLeft(index),
            //             },
            //         })
            //     );

            //     projectTimeline[index].to('.Animation-background', {
            //         y: yValue,

            //         onComplete: goRight,
            //         onCompleteParams: [index + 1],
            //     });
            // } else if (index == array.length - 1) {

            //     projectTimeline.push(
            //         gsap.timeline({
            //             scrollTrigger: {
            //                 invalidateOnRefresh: true,
            //                 trigger: project,
            //                 start: 'top center',
            //                 // end: `${project.offsetHeight + 400} center`,
            //                 endTrigger: ghostContainerRefs.current[index],
            //                 end: `bottom center`,
            //                 scrub: true,
            //                 markers: true,
            //                 toggleActions: 'play none none reverse',
            //                 onEnterBack: () => goRight(index),
            //             },
            //         })
            //     );

            //     projectTimeline[index].to('.Animation-background', {
            //         y: yValue,
            //         onComplete: goLeft,
            //         onCompleteParams: [index + 1],
            //     });
            // } else {
            //     console.log('oneven ', index);
            //     // console.log('ghost number oneven: ', ghostContainerRefs.current[index]);

            //     projectTimeline.push(
            //         gsap.timeline({
            //             scrollTrigger: {
            //                 invalidateOnRefresh: true,
            //                 trigger: project,
            //                 start: 'top center',
            //                 // end: `${project.offsetHeight + 400} center`,
            //                 endTrigger: ghostContainerRefs.current[index],
            //                 end: `bottom center`,
            //                 scrub: true,
            //                 markers: true,
            //                 toggleActions: 'play none none reverse',
            //                 onEnterBack: () => goRight(index),
            //             },
            //         })
            //     );

            //     projectTimeline[index].to('.Animation-background', {
            //         y: yValue,
            //         onComplete: goLeft,
            //         onCompleteParams: [index + 1],
            //     });
            // }
            // console.log(yValue);
        });
    };

    useEffect(() => {
        // setAnimationBackgroundX(projectsContainer.current.offsetWidth / 2);
        // console.log(projectsContainer.current.offsetWidth / 2);
        // setAnimationBackgroundX(projectsContainer.current.offsetWidth / 2);
        if (loading) {
            console.log('loading true');
            setLoading(false);
            setAnimationBackgroundX(projectsContainer.current.offsetWidth / 2);
            ghostContainerRefs.current.forEach((ref) => {
                ref.style.height = `${projectsContainer.current.offsetWidth / 2}px`;
            });
            // console.log(headingOneRef);
            headingOneRef.current.style.paddingBottom = `${
                projectsContainer.current.offsetWidth / 8
            }px`;
        }
        loadAnimations();
    }, [animationBackgroundX]);

    return (
        <ProjectsContainer ref={projectsContainer} className='Animation-projectsContainer'>
            <CustomGrid colspan={2}>
                <Box cols={1}>
                    <AnimationBackground
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

            <HeadingOne forwardRef={headingOneRef} title='Projects' />
            {projects.map((project, index) => {
                if (index % 2 === 0) {
                    return (
                        <Fragment key={index}>
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
                                </Grid>
                            </Project>
                            <GhostContainer
                                ref={addGhostContainerRefsRefs}
                                className='Animation-ghostContainer'
                            />
                        </Fragment>
                    );
                } else {
                    return (
                        <Fragment key={index}>
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
                            <GhostContainer
                                ref={addGhostContainerRefsRefs}
                                className='Animation-ghostContainer'
                            />
                        </Fragment>
                    );
                }
            })}
        </ProjectsContainer>
    );
};

export default Projects;
