import React, { Fragment, useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Sizes from '../constants/breakpoints';
import { gsap } from 'gsap';
import { Grid, Box } from 'react-raster';
import Image from 'gatsby-image';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

import SectionContainer from './layout/SectionContainer';

import HeadingOne from '../components/HeadingOne';
import Colors from '../constants/colors';

const AnimationBackground = styled.div`
    background: ${(props) => props.theme.animationBackground};
    border-radius: 20px;
    transform: rotate(-3deg);
    position: absolute;
    left: 0;
    box-shadow: ${(props) => props.theme.baxShadowAnimationBackground};
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
    display: none;

    &:before {
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 2;
    }

    @media ${Sizes.sm} {
        display: grid;
    }
`;
const GatsbyImageContainer = styled.div``;

const MobileImage = styled.div`
    display: block;

    @media ${Sizes.sm} {
        display: none;
    }
`;

const ImageBoxOdd = styled(Box)`
    order: 1;

    @media ${Sizes.sm} {
        order: 2;
    }
`;

const TextBoxOdd = styled(Box)`
    order: 2;

    @media ${Sizes.sm} {
        order: 1;
    }
`;

const Project = styled.div`
    margin-bottom: 40px;

    @media ${Sizes.sm} {
        margin-bottom: 0;
    }
`;
const ProjectTitle = styled.h2`
    color: ${(props) => props.theme.textColor};
    font-size: 20px;
    margin-bottom: 20px;
    font-family: 'Space Mono', monospace;

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
    font-family: 'Space Mono', monospace;
    display: inline-block;
    background: rgba(${Colors.primaryDark}, 1);
    /* color: ${(props) => props.theme.textColor}; */
    color: white;
    padding: 3px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
`;

const ProjectText = styled.div`
    color: ${(props) => props.theme.textColor};
`;

const ProjectsContainer = styled.section`
    /* margin-top: 30px;
    margin-bottom: 30px; */
    position: relative;

    /* @media ${Sizes.md} {
        margin-top: 60px;
        margin-bottom: 60px;
    } */
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

const GhostContainer = styled.div`
    display: none;

    @media ${Sizes.sm} {
        display: block;
    }
`;

const IconContainer = styled.div``;

const Icon = styled.a`
    color: rgba(${Colors.secondary}, 1);
    border: 1px solid rgba(${Colors.secondary}, 1);
    display: inline-flex;
    padding: 6px;
    margin-right: 10px;
    transition: 0.4s all;

    &:hover {
        color: ${(props) => props.theme.textColor};
        border: 1px solid ${(props) => props.theme.textColor};
    }
`;

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
                url
                github
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

const ProjectsNew = () => {
    const {
        allStrapiProject: { projects },
    } = useStaticQuery(query);

    // const [stackTimelineArray, setStackTimelineArray] = useState([]);

    const projectsContainerRef = useRef();
    const animationBackgroundRef = useRef();
    const projectImagesRef = useRef([]);
    const ghostDOMRefs = useRef([]);
    const projectDOMRefs = useRef([]);
    const boxRefs = useRef([]);
    const fadeInRefs = useRef([]);
    const textRefs = useRef([]);
    const stackContainerRefs = useRef([]);
    const fadeInMobileImageRefs = useRef([]);
    const stackTimelineArray = [];

    const addboxRefs = (el) => {
        if (el && !boxRefs.current.includes(el)) {
            boxRefs.current.push(el);
        }
    };

    const addMobileImageFadeInRefs = (el) => {
        if (el && !fadeInMobileImageRefs.current.includes(el)) {
            fadeInMobileImageRefs.current.push(el);
        }
    };

    const addTextRefs = (el) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    const addStackContainerRefs = (el) => {
        if (el && !stackContainerRefs.current.includes(el)) {
            stackContainerRefs.current.push(el);
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

    const addFadeInRefs = (el) => {
        if (el && !fadeInRefs.current.includes(el)) {
            fadeInRefs.current.push(el);
        }
    };

    useEffect(() => {
        ghostDOMRefs.current.forEach((ghost) => {
            ghost.style.height = `${projectsContainerRef.current.offsetWidth / 2}px`;
        });

        projectImagesRef.current[0].style.opacity = 1;
        projectImagesRef.current[0].style.visibility = 'visible';
        projectImagesRef.current[0].style.display = 'block';
        timeline();

        const fadeInTimelineArray = [];
        const fadeInTimelineMobileImageArray = [];

        fadeInMobileImageRefs.current.forEach((image, index) => {
            fadeInTimelineMobileImageArray.push(
                gsap.timeline({
                    scrollTrigger: {
                        trigger: image,
                        start: 'top 80%',
                        end: 'bottom bottom',
                        toggleActions: 'play none none reverse',
                    },
                })
            );

            fadeInTimelineMobileImageArray[index].from(image, {
                opacity: 0,
                duration: 1,
            });
        });

        fadeInRefs.current.forEach((content, index) => {
            fadeInTimelineArray.push(
                gsap.timeline({
                    scrollTrigger: {
                        trigger: content,
                        start: 'top 80%',
                        end: 'bottom bottom',
                        toggleActions: 'play none none reverse',
                    },
                })
            );

            fadeInTimelineArray[index].from(
                content,
                {
                    opacity: 0,
                    duration: 1,
                },
                'title'
            );

            fadeInTimelineArray[index].from(
                textRefs.current[index],
                {
                    opacity: 0,
                    duration: 1,
                },
                'title+=0.2'
            );

            const stackItemArray = stackContainerRefs.current[index].querySelectorAll(
                '.Animation-StackItem'
            );

            stackTimelineArray.push(
                gsap.timeline({
                    scrollTrigger: {
                        trigger: content,
                        start: 'top 80%',
                        end: 'bottom bottom',
                        toggleActions: 'play none none reverse',
                    },
                })
            );

            stackItemArray.forEach((stack, index2) => {
                stackTimelineArray[index].from(stack, {
                    opacity: 0,
                    duration: 0.1,
                    stagger: 0.1,
                });
            });
        });
    }, []);

    const goRight = (index, xValue) => {
        projectImagesRef.current.forEach((projectImage, index2) => {
            if (index !== index2) {
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
            if (index !== index2) {
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
                y = ghostDOMRefs.current[index].offsetTop;
                break;
            case 'last':
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
                y = ghostDOMRefs.current[index].offsetTop;
                break;
            case 'odd':
                y = ghostDOMRefs.current[index].offsetTop;
                break;
            default:
                y =
                    projectsContainerRef.current.offsetHeight -
                    ghostDOMRefs.current[0].offsetHeight;
        }

        return y;
    };

    const timeline = () => {
        const newTimeline = gsap.timeline();
        projectDOMRefs.current.forEach((project, index, array) => {
            if (index === 0) {
                newTimeline.to(animationBackgroundRef.current, {
                    y: () => newY(index, 'first'),
                    scrollTrigger: {
                        trigger: project,
                        start: 'bottom center',
                        endTrigger: ghostDOMRefs.current[index],
                        end: `bottom center`,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                        onEnterBack: () => goLeft(index),
                    },
                    onComplete: goRight,
                    onCompleteParams: [index + 1, boxRefs.current[0].offsetLeft],
                });

                return;
            }

            if (index === array.length - 1) {
                newTimeline.to(animationBackgroundRef.current, {
                    y: () => newY(index, 'last'),
                    scrollTrigger: {
                        invalidateOnRefresh: true,
                        trigger: ghostDOMRefs.current[index - 1],
                        start: 'center center',
                        end: `bottom center`,
                        toggleActions: 'play none none reverse',
                    },
                });

                return;
            }

            if (index % 2 === 0) {
                newTimeline.to(animationBackgroundRef.current, {
                    y: () => newY(index, 'even'),
                    scrollTrigger: {
                        invalidateOnRefresh: true,
                        trigger: project,
                        start: 'top center',
                        endTrigger: ghostDOMRefs.current[index],
                        end: `${index !== array.length - 2 ? 'bottom' : 'center'} center`,
                        scrub: true,
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
                        end: `${index !== array.length - 2 ? 'bottom' : 'center'} center`,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                        onEnterBack: () => goRight(index, boxRefs.current[0].offsetLeft),
                    },
                    onComplete: goLeft,
                    onCompleteParams: [index + 1],
                });
            }
        });
    };
    console.log(projects);
    return (
        <SectionContainer>
            <HeadingOne title='Featured Projects' />
            <ProjectsContainer ref={projectsContainerRef} className='ProjectsContainer'>
                <CustomGrid colspan={2}>
                    <Box cols={1}>
                        <AnimationBackground
                            ref={animationBackgroundRef}
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
                                        index === 0
                                            ? 'Animation-project Animation-project--first'
                                            : 'Animation-project'
                                    }>
                                    <Grid
                                        breakpoints={[0, 768]}
                                        colspan={2}
                                        gutterX={'40px'}
                                        gutterY={['40px', 0]}
                                        css={{ width: '100%' }}>
                                        <Box className='HomeBanner-image' cols={[2, 1]}>
                                            <MobileImage ref={addMobileImageFadeInRefs}>
                                                <Image
                                                    fluid={
                                                        project.mobileImage.childImageSharp.fluid
                                                    }
                                                />
                                            </MobileImage>
                                        </Box>
                                        <Box
                                            ref={addboxRefs}
                                            cols={[2, 1]}
                                            css={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}>
                                            <ProjectTitle ref={addFadeInRefs}>
                                                {project.Title}
                                            </ProjectTitle>
                                            <ProjectText ref={addTextRefs}>
                                                {project.Text}
                                            </ProjectText>
                                            <StackContainer ref={addStackContainerRefs}>
                                                {project.StackList.map((stack) => {
                                                    return (
                                                        <StackItem
                                                            className='Animation-StackItem'
                                                            key={stack.id}>
                                                            {stack.Stack}
                                                        </StackItem>
                                                    );
                                                })}
                                            </StackContainer>
                                            <IconContainer>
                                                {project.url !== null ? (
                                                    <Icon href={project.url} target='_blank'>
                                                        <FaExternalLinkAlt />
                                                    </Icon>
                                                ) : null}
                                                {project.github !== null ? (
                                                    <Icon href={project.github} target='_blank'>
                                                        <FaGithub />
                                                    </Icon>
                                                ) : null}
                                            </IconContainer>
                                        </Box>
                                    </Grid>
                                </Project>
                                {array.length - 1 === index ? null : (
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
                                        <TextBoxOdd
                                            ref={addboxRefs}
                                            cols={[2, 1]}
                                            css={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}>
                                            <ProjectTitle ref={addFadeInRefs}>
                                                {project.Title}
                                            </ProjectTitle>
                                            <ProjectText ref={addTextRefs}>
                                                {project.Text}
                                            </ProjectText>
                                            <StackContainer ref={addStackContainerRefs}>
                                                {project.StackList.map((stack) => {
                                                    return (
                                                        <StackItem
                                                            className='Animation-StackItem'
                                                            key={stack.id}>
                                                            {stack.Stack}
                                                        </StackItem>
                                                    );
                                                })}
                                            </StackContainer>
                                            <IconContainer>
                                                {project.url !== null ? (
                                                    <Icon href={project.url} target='_blank'>
                                                        <FaExternalLinkAlt />
                                                    </Icon>
                                                ) : null}
                                                {project.github !== null ? (
                                                    <Icon href={project.github} target='_blank'>
                                                        <FaGithub />
                                                    </Icon>
                                                ) : null}
                                            </IconContainer>
                                        </TextBoxOdd>
                                        <ImageBoxOdd className='HomeBanner-image' cols={[2, 1]}>
                                            <MobileImage ref={addMobileImageFadeInRefs}>
                                                <Image
                                                    fluid={
                                                        project.mobileImage.childImageSharp.fluid
                                                    }
                                                />
                                            </MobileImage>
                                        </ImageBoxOdd>
                                    </Grid>
                                </Project>
                                {array.length - 1 === index ? null : (
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
        </SectionContainer>
    );
};

export default ProjectsNew;
