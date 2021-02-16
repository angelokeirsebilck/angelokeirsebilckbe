import React, { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Sizes from '../../constants/breakpoints';
import { gsap } from 'gsap';
import { Grid, Box } from 'react-raster';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionContainer from '../layout/SectionContainer';
import HeadingOne from '../HeadingOne';

import Colors from '../../constants/colors';
import ScrollMouse from '../ScrollMouse';

const Background = styled.div`
    background: ${(props) => props.theme.animationBackground};
    border-radius: 50px;
    box-shadow: ${(props) => props.theme.baxShadowAnimationBackground};
    width: 100%;
    padding: 30px;
    margin-bottom: 40px;

    @media ${Sizes.sm} {
        width: 50%;
        position: absolute;
        /* top: 10px; */
        margin-bottom: 0;
    }
`;

const SkillTitle = styled.h2`
    color: white;
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
    /* background: rgba(207, 181, 250, 1); */
    background: rgba(${Colors.purleDarkRGB}, 1);
    color: white;
    padding: 3px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
`;

const PinSection = styled.div`
    position: relative;
`;

const ScrollMouseContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    display: none;

    @media ${Sizes.sm} {
        display: block;
    }
`;

const query = graphql`
    {
        strapiSkills {
            skills {
                item {
                    item
                }
                name
            }
        }
    }
`;

const Skills = () => {
    const {
        strapiSkills: { skills },
    } = useStaticQuery(query);

    const backgroundRefs = useRef([]);
    const sectionRef = useRef();

    const addBackgroundsRefs = (el) => {
        if (el && !backgroundRefs.current.includes(el)) {
            backgroundRefs.current.push(el);
        }
    };

    // const addSectionsRefs = (el) => {
    //     if (el && !sectionRefs.current.includes(el)) {
    //         sectionRefs.current.push(el);
    //     }
    // };

    const calcX = () => {
        const sectionWidth = document.querySelector('.SectionSkills').offsetWidth;
        const windowWidth = window.innerWidth;
        const extraWidth = (windowWidth - sectionWidth) / 2;
        const result = sectionWidth + extraWidth;
        return result;
    };

    const getEndPosition = () => {
        console.log(
            'End pos Secion Skills: ',
            document.querySelector('.PinSectionSkills').offsetWidth
        );
        return '+=' + document.querySelector('.PinSectionSkills').offsetWidth;
    };
    const initPinBackgroundAnimation = () => {
        const sectionHeight = document.querySelector('.SectionSkills');

        backgroundRefs.current.forEach((bg) => {
            ScrollTrigger.saveStyles(bg, '.PinSectionSkills');
        });

        ScrollTrigger.matchMedia({
            // desktop
            '(min-width: 767px)': function () {
                let pinSectionHeightInit = 0;
                backgroundRefs.current.forEach((bg) => {
                    if (bg.offsetHeight > pinSectionHeightInit)
                        pinSectionHeightInit = bg.offsetHeight + 10;
                });
                gsap.set('.PinSectionSkills', { height: pinSectionHeightInit });

                const pinBackgroundAnimation = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionHeight,
                        invalidateOnRefresh: true,
                        start: 'top top',
                        end: () => getEndPosition(),
                        markers: true,
                        scrub: true,
                        pin: '.PinWrapper',
                        pinSpacing: false,
                        snap: 0.5,
                    },
                });

                backgroundRefs.current.forEach((pinBackground, index) => {
                    // gsap.set(pinBackground, { position: 'absolute' });
                    if (index !== 0) {
                        pinBackgroundAnimation.fromTo(
                            pinBackground,
                            {
                                x: () => calcX(),
                            },
                            {
                                x: 0,
                            }
                        );
                    }
                    if (index !== 2) {
                        pinBackgroundAnimation.fromTo(
                            pinBackground,
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
                gsap.set('.PinSectionSkills', { height: 'auto' });
            },
        });
    };

    useEffect(() => {
        initPinBackgroundAnimation();
    }, []);

    return (
        <SectionContainer styleClass='SectionSkills'>
            <HeadingOne title='Skills' />
            <PinSection className='PinSectionSkills'>
                <ScrollMouseContainer>
                    <ScrollMouse />
                </ScrollMouseContainer>
                {skills.map((skills, index) => {
                    return (
                        <Background
                            key={index}
                            className='BackgroundSkills'
                            ref={addBackgroundsRefs}>
                            <SkillTitle>{skills.name}</SkillTitle>
                            <StackContainer>
                                {skills.item.map((stack, index) => {
                                    return (
                                        <StackItem className='Animation-StackItem' key={index}>
                                            {stack.item}
                                        </StackItem>
                                    );
                                })}
                            </StackContainer>
                        </Background>
                    );
                })}
            </PinSection>
        </SectionContainer>
    );
};

const mapStateToProps = (state) => ({
    global: state.global,
});

export default connect(mapStateToProps, {})(Skills);
