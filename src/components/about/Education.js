import React, { Fragment, useEffect, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Sizes from '../../constants/breakpoints';
import { gsap } from 'gsap';
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

    const getCalcY = (offsetHeight) => {
        return `${offsetHeight}px`;
    };

    const getEndPosition = () => {
        console.log(
            'End pos Secion Skills: ',
            document.querySelector('.PinSectionEducation').offsetWidth
        );
        return '+=' + document.querySelector('.PinSectionEducation').offsetWidth;
    };

    const getY = () => {
        let pinSectionHeightInit = 0;
        educationGridRefs.current.forEach((bg) => {
            if (bg.offsetHeight > pinSectionHeightInit) {
                pinSectionHeightInit = bg.offsetHeight + 3;
            }
        });
        return pinSectionHeightInit;
    };

    const educationAnimation = () => {
        educationGridRefs.current.forEach((grid) => {
            ScrollTrigger.saveStyles(grid);
        });
        ScrollTrigger.saveStyles('.PinSectionEducation');
        ScrollTrigger.matchMedia({
            '(min-width: 767px)': function () {
                educationGridRefs.current.forEach((grid) => {
                    gsap.set(grid, { position: 'absolute' });
                });
                let pinSectionHeightInit = 0;
                educationGridRefs.current.forEach((bg) => {
                    if (bg.offsetHeight > pinSectionHeightInit) {
                        pinSectionHeightInit = bg.offsetHeight + 3;
                    }
                });
                gsap.set('.PinSectionEducation', { height: pinSectionHeightInit });

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.SectionEducation',
                        start:
                            'top+=' +
                            (document.querySelector('.PinSectionSkills').offsetWidth - 240) +
                            'top',
                        end: () => getEndPosition(),
                        onEnter: () => console.log('enter'),
                        scrub: true,
                        markers: {
                            startColor: 'white',
                            endColor: 'white',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            indent: 20,
                        },
                        pin: '.PinWrapper',
                        pinSpacing: false,
                        invalidateOnRefresh: true,
                        snap: 0.5,
                    },
                });

                educationGridRefs.current.forEach((grid, index) => {
                    if (index !== 0) {
                        timeline.fromTo(
                            grid,
                            {
                                y: () => getY(),
                            },
                            {
                                y: 0,
                            }
                        );
                    }
                    if (index !== 2) {
                        timeline.fromTo(
                            grid,
                            {
                                opacity: 1,
                            },
                            {
                                opacity: 0,
                            }
                        );
                    }
                });
            },
            '(max-width: 766px)': function () {
                educationGridRefs.current.forEach((grid) => {
                    gsap.set(grid, { position: 'relative' });
                });
                gsap.set('.PinSectionEducation', { height: 'auto' });
            },
        });
    };

    return (
        <SectionContainer styleClass='SectionEducation'>
            <HeadingOne title='Education' />
            <PinSection
                className='PinSectionEducation'
                // css={{
                //     height: educationGridHeight,
                // }}
                ref={educationContainerRef}>
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
