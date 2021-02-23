import React from 'react';
// import { gsap } from 'gsap';
import PropTypes from 'prop-types';

import Sizes from '../constants/breakpoints';
import Colors from '../constants/colors';
import styled from 'styled-components';

const Heading = styled.h1`
    font-size: 24px;

    font-weight: bold;
    line-height: 1.1;
    position: relative;
    display: inline-block;
    font-weight: 700;

    background: linear-gradient(to left, rgba(${Colors.primary}, 1), rgba(${Colors.secondary}, 1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media ${Sizes.md} {
        font-size: 30px;
    }
`;

const HeadingContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
    font-family: 'Space Mono', monospace;
    text-align: center;

    @media ${Sizes.md} {
        padding-bottom: 80px;
    }

    &.HeadingContact {
        padding-top: 50px;
        padding-bottom: 0;
    }
`;

const TopLine = styled.div`
    position: absolute;
    top: -10px;
    width: 30%;
    height: 1px;
    background: rgba(${Colors.primary}, 1);
`;

const BottomLine = styled.div`
    position: absolute;
    bottom: -10px;
    right: 0;
    width: 30%;
    height: 1px;
    background: rgba(${Colors.secondary}, 1);
`;

const HeadingOne = ({ title, forwardRef, contact }) => {
    // useEffect(() => {
    //     const headingTimeline = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: '.Animation-headingContainer',
    //             start: '-10% 80%',
    //             end: 'bottom 70%',
    //             toggleActions: 'play none none reverse',
    //             markers: true,
    //         },
    //     });
    //     headingTimeline.addLabel('start', 0);

    //     headingTimeline
    //         .to(
    //             '.Animation-topLine',
    //             {
    //                 width: '30%',
    //                 duration: 0.4,
    //             },
    //             'start'
    //         )
    //         .to(
    //             '.Animation-bottomLine',
    //             {
    //                 width: '30%',
    //                 duration: 0.4,
    //             },
    //             'start'
    //         );
    // }, []);

    return (
        <HeadingContainer ref={forwardRef} className={contact ? 'HeadingContact' : ''}>
            <Heading>
                <TopLine className='Animation-topLine' />
                {title}
                <BottomLine className='Animation-bottomLine' />
            </Heading>
        </HeadingContainer>
    );
};

HeadingOne.propTypes = {
    title: PropTypes.string.isRequired,
};

export default HeadingOne;
