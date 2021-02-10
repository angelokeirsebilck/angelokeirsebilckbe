import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

const CircleAnimationsContainer = styled.div`
    position: fixed;
    height: 100vh;
    width: 100%;
    left: 0;
    top: 0;
`;

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const R = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let amount;
if (window.innerWidth < 768) {
    amount = 1;
} else if (window.innerWidth < 1024) {
    amount = 3;
} else {
    amount = 5;
}

const circleArray = [];
let delayStart = 1;

for (let index = 0; index < amount; index++) {
    let delay;
    do {
        delay = gsap.utils.random(0, 5);
    } while (delay == delayStart);

    delayStart = delay;
    circleArray.push({
        width: R(20, 150),
        topStart: R(0, windowHeight / 4),
        leftStart: R(0, windowWidth / 4),
        delay: delay,
        color: gsap.utils.random(['30,174,152,', '216,181,255,']),
        opacity: gsap.utils.random([0.2, 0.3, 0.1]),
        radius: gsap.utils.random(20, 200),
    });
}
for (let index = 0; index < amount; index++) {
    let delay;
    do {
        delay = gsap.utils.random(0, 10);
    } while (delay == delayStart);

    delayStart = delay;
    circleArray.push({
        width: R(20, 150),
        topStart: R(0, windowHeight / 2),
        leftStart: R(windowWidth / 2, windowWidth),
        delay: delay,
        color: gsap.utils.random(['30,174,152,', '216,181,255,']),
        opacity: gsap.utils.random([0.2, 0.3, 0.1]),
        radius: gsap.utils.random(20, 250),
    });
}
for (let index = 0; index < amount; index++) {
    let delay;
    do {
        delay = gsap.utils.random(0, 10);
    } while (delay == delayStart);

    delayStart = delay;
    circleArray.push({
        width: R(20, 150),
        topStart: R(windowHeight / 2, windowHeight),
        leftStart: R(0, windowWidth / 2),
        delay: delay,
        color: gsap.utils.random(['30,174,152,', '216,181,255,']),
        opacity: gsap.utils.random([0.2, 0.3, 0.1]),
        radius: gsap.utils.random(20, 200),
    });
}
for (let index = 0; index < amount; index++) {
    let delay;
    do {
        delay = gsap.utils.random(0, 10);
    } while (delay == delayStart);

    delayStart = delay;
    circleArray.push({
        width: R(20, 150),
        topStart: R(windowHeight / 2, windowHeight),
        leftStart: R(windowWidth / 2, windowWidth),
        delay: delay,
        color: gsap.utils.random(['30,174,152,', '216,181,255,']),
        opacity: gsap.utils.random([0.2, 0.3, 0.1]),
        radius: gsap.utils.random(20, 250),
    });
}

const CircleAnimation = () => {
    useEffect(() => {
        let circles = document.querySelectorAll('.circle');
        let circleTimelineArray = [];
        const circleAnimationContainer = gsap.timeline({
            scrollTrigger: {
                trigger: '.Animation-circleContainer',
                start: 'top top',
                end: 'bottom 80%',
                scrub: true,
            },
        });
        circleAnimationContainer.fromTo(
            '.Animation-circleContainer',
            {
                opacity: 1,
            },
            {
                opacity: 0,
            }
        );

        circles.forEach((circle, index) => {
            circleTimelineArray.push(gsap.timeline());
            circleTimelineArray[index].addLabel('start', 0);
            circleTimelineArray[index]
                .fromTo(
                    circle,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 2,
                        delay: circle.dataset.delay,
                    },
                    'start'
                )
                .to(circle, {
                    opacity: 0,
                    duration: 2,
                })
                .repeat(-1);
        });
    }, []);

    return (
        <div>
            <CircleAnimationsContainer className='Animation-circleContainer'>
                {circleArray.map((circle, index) => {
                    return (
                        <div
                            key={index}
                            className='circle'
                            data-delay={circle.delay}
                            style={{
                                position: 'absolute',
                                top: circle.topStart,
                                left: circle.leftStart,
                                background: `rgba(${circle.color}${circle.opacity})`,
                                width: `${circle.radius}px`,
                                height: `${circle.radius}px`,
                                borderRadius: '100%',
                            }}></div>
                    );
                })}
            </CircleAnimationsContainer>
        </div>
    );
};

export default CircleAnimation;
