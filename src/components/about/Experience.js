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
    border-radius: 20px;
    box-shadow: ${(props) => props.theme.baxShadowAnimationBackground};
    width: 100%;
    padding: 30px;
    /* margin-bottom: 40px; */
    color: white;

    @media ${Sizes.sm} {
        width: 50%;
    }
`;

const DateContainer = styled.div`
    font-size: 14px;
`;

const HR = styled.div`
    width: 100%;
    height: 1px;
    background: rgba(${Colors.purleDarkRGB}, 1);
    margin-bottom: 15px;
    margin-top: 15px;
`;

const JobName = styled.h2`
    color: white;
    font-size: 20px;
    /* margin-bottom: 20px; */
    font-family: 'Space Mono', monospace;

    @media ${Sizes.md} {
        font-size: 26px;
    }
`;

const CompanyName = styled.div`
    font-size: 14px;
`;
const JobDesc = styled.div``;
const RefName = styled.div``;
const RefEmail = styled.a`
    text-decoration: none;
    color: white;
    transition: 0.4s all;

    &:hover {
        color: rgba(${Colors.purleDarkRGB}, 1);
    }
`;

const query = graphql`
    {
        strapiExperience {
            experience {
                startDate
                refName
                refEmail
                jobName
                jobDesc
                id
                endDate
                companyName
            }
        }
    }
`;

const Experience = () => {
    const {
        strapiExperience: { experience },
    } = useStaticQuery(query);
    return (
        <SectionContainer>
            <HeadingOne title='Experience' />

            {experience.map((exp) => {
                return (
                    <Background key={exp.id}>
                        <DateContainer>
                            {exp.startDate} - {exp.endDate}
                        </DateContainer>
                        <JobName>{exp.jobName}</JobName>
                        <CompanyName>{exp.companyName}</CompanyName>
                        <HR />
                        <JobDesc>{exp.jobDesc}</JobDesc>
                        <HR />
                        <RefName>{exp.refName}</RefName>
                        <RefEmail href={`mailto:${exp.refEmail}`}>{exp.refEmail}</RefEmail>
                    </Background>
                );
            })}
        </SectionContainer>
    );
};

export default Experience;
