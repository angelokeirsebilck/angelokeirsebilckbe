import React, { Fragment, useEffect, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Sizes from '../../constants/breakpoints';
import { Grid, Box } from 'react-raster';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionContainer from '../layout/SectionContainer';
import HeadingOne from '../HeadingOne';

import Colors from '../../constants/colors';

const Background = styled.div`
    background: ${(props) => props.theme.animationBackground};
    color: white;
    border-radius: 50px;
    box-shadow: ${(props) => props.theme.baxShadowAnimationBackground};
    width: 100%;
    padding: 25px;
`;

const PinSection = styled.div`
    position: relative;
    overflow-y: hidden;
    height: 250px;
`;

const EducationGrid = styled(Grid)`
    margin-bottom: 40px;
    position: relative;

    @media ${Sizes.sm} {
        margin-bottom: 0;
    }
`;

const EducationTitle = styled.h2`
    color: white;
    font-size: 20px;
    /* margin-bottom: 20px; */
    font-family: 'Space Mono', monospace;

    @media ${Sizes.md} {
        font-size: 26px;
    }
`;

const EducationPlace = styled.div`
    color: white;
    font-size: 14px;
    margin-bottom: 15px;
    color: white;
    font-family: 'Space Mono', monospace;

    @media ${Sizes.md} {
        font-size: 14px;
    }
`;

const DateBox = styled(Box)`
    display: none;
    position: relative;

    @media ${Sizes.sm} {
        display: block;
    }
`;

const HR = styled.div`
    width: 100%;
    height: 1px;
    background: rgba(${Colors.purleDarkRGB}, 1);
    margin-bottom: 15px;
`;

const Date = styled.div`
    font-size: 90px;
    color: rgba(216, 118, 255, 0.1);
    opacity: ${(props) => props.theme.dateSvgOpacity};
    /* transform: translateX(0) rotate(-90deg); */
    position: absolute;
    /* top: 40px; */
    left: 0;
    top: 0;
    line-height: 90px;
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
                dateSvg {
                    publicURL
                }
            }
        }
    }
`;

const Education = () => {
    const {
        strapiEducation: { education },
    } = useStaticQuery(query);
    const [educationGridHeight] = useState(0);

    const educationContainerRef = useRef();
    const educationGridRefs = useRef([]);

    const addToEducationGridRefs = (el) => {
        if (el && !educationGridRefs.current.includes(el)) {
            educationGridRefs.current.push(el);
        }
    };

    useEffect(() => {
        educationAnimation();
    }, [educationGridHeight]);

    const educationAnimation = () => {
        educationGridRefs.current.forEach((grid) => {
            ScrollTrigger.saveStyles(grid);
        });
        ScrollTrigger.saveStyles('.PinSectionEducation');
    };

    return (
        <SectionContainer styleClass='SectionEducation'>
            <HeadingOne title='Education' />
            <PinSection className='PinSectionEducation' ref={educationContainerRef}>
                {education.map((education, index) => {
                    return (
                        <EducationGrid
                            breakpoints={[0, 768]}
                            key={index}
                            ref={addToEducationGridRefs}
                            className='EducationGrid'
                            colspan={2}>
                            <DateBox cols={[2, 1]}>
                                <Date>
                                    <img src={education.dateSvg.publicURL}></img>
                                </Date>
                            </DateBox>
                            <Box cols={[2, 1]}>
                                <Background>
                                    <EducationTitle>{education.name}</EducationTitle>
                                    <EducationPlace>{education.place}</EducationPlace>
                                    <HR />
                                    <p>{education.desc}</p>
                                </Background>
                            </Box>
                        </EducationGrid>
                    );
                })}
            </PinSection>
        </SectionContainer>
    );
};

export default Education;
