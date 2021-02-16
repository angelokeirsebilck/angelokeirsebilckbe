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
    background: ${(props) => props.theme.animationBackground};
    border-radius: 50px;
    box-shadow: ${(props) => props.theme.baxShadowAnimationBackground};
    width: 100%;
    min-height: 300px;

    @media ${Sizes.md} {
        /* width: 50%; */
    }
    /* position: absolute;
    top: 0; */
`;

const SkillTitle = styled.h2`
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
    background: rgba(207, 181, 250, 1);
    color: ${(props) => props.theme.textColor};
    padding: 3px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
`;

const PinContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Pin = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const Rectangle = styled.div`
    width: 50%;
    min-height: 300px;
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
    const sectionRefs = useRef([]);

    const addBackgroundsRefs = (el) => {
        if (el && !backgroundRefs.current.includes(el)) {
            backgroundRefs.current.push(el);
        }
    };

    const addSectionsRefs = (el) => {
        if (el && !sectionRefs.current.includes(el)) {
            sectionRefs.current.push(el);
        }
    };

    const initPinBackgroundAnimation = () => {
        const pinBackgroundAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '.AboutSection',
                start: 'top top',
                endTrigger: '.AboutSection',
                end: `bottom botom`,
                markers: true,
                scrub: true,
                pin: '.AboutSection',
                pinSpacing: false,
                toggleActions: 'play none none reverse',
            },
        });

        backgroundRefs.current.forEach((pinBackground, index) => {
            pinBackgroundAnimation.from(pinBackground, {
                // x: '200%',
            });
        });
    };

    useEffect(() => {
        initPinBackgroundAnimation();
    }, []);

    return (
        <SectionContainer>
            <HeadingOne title='Skills' />
            <PinContainer>
                {skills.map((skills, index) => {
                    return (
                        <Pin>
                            <Rectangle>
                                <Background ref={addBackgroundsRefs}></Background>
                            </Rectangle>
                            <Rectangle> {skills.name}</Rectangle>
                        </Pin>
                    );
                })}
            </PinContainer>
        </SectionContainer>
    );
};

export default Skills;
