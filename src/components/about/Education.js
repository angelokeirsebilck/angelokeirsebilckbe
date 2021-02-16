import React, { Fragment, useEffect, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Sizes from '../../constants/breakpoints';
import { gsap } from 'gsap';
import { Grid, Box } from 'react-raster';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionContainer from '../layout/SectionContainer';
import HeadingOne from '../HeadingOne';

const Background = styled.div`
    /* background: ${(props) => props.theme.animationBackground}; */
    color: white;
    border-radius: 50px;
    box-shadow: ${(props) => props.theme.baxShadowAnimationBackground};
    width: 100%;
    /* min-height: 300px; */
    padding: 25px;

    @media ${Sizes.md} {
        /* width: 50%; */
    }
    /* position: absolute;
    top: 0; */
`;

const EducationContainer = styled.div`
    position: relative;
    overflow-y: hidden;
    height: 250px;
`;

const EducationGrid = styled(Grid)`
    position: absolute;
    /* width: 100%;
    height: 100%; */
`;

const query = graphql`
    {
        strapiEducation {
            education {
                desc
                endDate
                id
                name
                place
            }
        }
    }
`;

const Education = () => {
    const {
        strapiEducation: { education },
    } = useStaticQuery(query);
    const [educationGridHeight, setEducationGridHeight] = useState(0);

    const educationContainerRef = useRef();
    const educationGridRefs = useRef([]);

    const addToEducationGridRefs = (el) => {
        if (el && !educationGridRefs.current.includes(el)) {
            educationGridRefs.current.push(el);
        }
    };

    useEffect(() => {
        // educationGridRefs.current.forEach((grid) => {
        //     let height = grid.offsetHeight;

        //     if (educationGridHeight < height) {
        //         setEducationGridHeight(height);
        //     }
        // });

        educationAnimation();
        // addToEducationGridRefs.current.forEach((grid, index) => {});
    }, [educationGridHeight]);

    const getY = () => {
        return `${educationGridHeight}px`;
    };

    const getCalcY = (offsetHeight) => {
        return `${offsetHeight}px`;
    };

    const educationAnimation = () => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.EducationSection',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                markers: true,
                pin: '.Wrapper',
                pinSpacing: false,
                invalidateOnRefresh: true,
            },
        });

        educationGridRefs.current.forEach((grid, index) => {
            timeline.fromTo(
                grid,
                {
                    y: 250,
                },
                {
                    y: 0,
                }
            );
        });
    };

    return (
        <SectionContainer>
            <HeadingOne title='Education' />
            <EducationContainer
                // css={{
                //     height: educationGridHeight,
                // }}
                ref={educationContainerRef}>
                {education.map((education, index) => {
                    return (
                        <EducationGrid
                            key={index}
                            ref={addToEducationGridRefs}
                            className='Animation-educationGrid'
                            colspan={2}>
                            <Box cols={1}>{education.endDate}</Box>
                            <Box cols={1}>
                                <Background
                                    css={{
                                        background: 'red',
                                    }}>
                                    <h2>{education.name}</h2>
                                    <h3>{education.place}</h3>
                                    {education.desc}
                                </Background>
                            </Box>
                        </EducationGrid>
                    );
                })}
            </EducationContainer>
        </SectionContainer>
    );
};

export default Education;
