import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

import wrapWithProvider from './state/ReduxWrapper';
export const wrapRootElement = wrapWithProvider;

export const onRouteUpdate = ({ location, prevLocation }) => {
    const scrollTriggerArray = ScrollTrigger.getAll();
    scrollTriggerArray.forEach((scrollTrigger) => {
        scrollTrigger.enable();
    });
    const pathName = location.pathname;
    ScrollTrigger.clearMatchMedia();
    ScrollTrigger.removeEventListener('refresh', aboutWindowRefreshed);
    ScrollTrigger.removeEventListener('refreshInit', homeWindowInitRefresh);

    if (pathName === '/') {
        ScrollTrigger.addEventListener('refreshInit', homeWindowInitRefresh);
    }

    if (pathName === '/about') {
        setScrollTriggerMediaQueries();
        ScrollTrigger.addEventListener('refresh', aboutWindowRefreshed);
        const pinSpacerOverlapper = document.querySelector('.PinSpacerOverlapper');

        gsap.set(pinSpacerOverlapper, {
            height: 6000,
        });
    }
};

const aboutPageRefrishInit = () => {
    ScrollTrigger.matchMedia({
        '(max-width: 768px)': function () {
            gsap.set('.EducationGrid', {
                position: 'relative',
                y: 0,
                opacity: 0,
            });
        },
    });
};

const homeWindowInitRefresh = () => {
    ScrollTrigger.matchMedia({
        '(min-width: 768px)': function () {
            let ghostDOMS = document.querySelectorAll('.Animation-ghosts');
            if (ghostDOMS.length !== null) {
                let projectsContainer = document.querySelector('.ProjectsContainer');
                ghostDOMS.forEach((ghost) => {
                    ghost.style.height = `${projectsContainer.offsetWidth / 2}px`;
                });
            }
        },
    });
};

const aboutWindowRefreshed = () => {
    ScrollTrigger.matchMedia({
        // desktop
        '(min-width: 768px)': function () {
            const backgroundSkills = document.querySelectorAll('.BackgroundSkills');
            const educationGridItems = document.querySelectorAll('.EducationGrid');
            const pinSpacerOverlapper = document.querySelector('.PinSpacerOverlapper');
            const experiences = document.querySelectorAll('.Experience');

            gsap.set(pinSpacerOverlapper, {
                height: 6000,
            });

            if (backgroundSkills.length > 0) {
                let pinSectionHeight = 0;
                if (backgroundSkills.length > 0) {
                    backgroundSkills.forEach((bg) => {
                        if (bg.offsetHeight > pinSectionHeight) pinSectionHeight = bg.offsetHeight;
                    });
                    // console.log('browser api');
                    gsap.set('.PinSectionSkills', {
                        height: pinSectionHeight,
                    });
                }
            }

            if (educationGridItems.length > 0) {
                let pinSectionEducationHeight = 0;
                educationGridItems.forEach((grid) => {
                    if (grid.offsetHeight > pinSectionEducationHeight) {
                        pinSectionEducationHeight = grid.offsetHeight + 3;
                    }

                    gsap.set(grid, {
                        position: 'absolute',
                    });
                });
                gsap.set('.PinSectionEducation', {
                    height: pinSectionEducationHeight,
                });
            }

            if (experiences.length > 0) {
                experiences.forEach((exp) => {
                    gsap.set(exp, {
                        opacity: 1,
                    });
                });
            }
        },
        '(max-width: 768px)': function () {
            const backgroundSkills = document.querySelectorAll('.BackgroundSkills');
            const educationGridItems = document.querySelectorAll('.EducationGrid');
            const experiences = document.querySelectorAll('.Experience');
            if (backgroundSkills.length > 0) {
                backgroundSkills.forEach((bg) => {
                    gsap.set(bg, {
                        x: 0,
                    });
                });
                gsap.set('.PinSectionSkills', { height: 'auto' });
            }

            if (educationGridItems.length !== 0) {
                console.log('browser api');
                educationGridItems.forEach((grid) => {
                    gsap.set(grid, {
                        position: 'relative',
                        y: 0,
                        opacity: 0,
                    });
                });
                gsap.set('.PinSectionEducation', { height: 'auto' });
            }

            if (experiences.length > 0) {
                experiences.forEach((exp) => {
                    gsap.set(exp, {
                        opacity: 0,
                    });
                });
            }
        },
    });
};

const setScrollTriggerMediaQueries = () => {
    // const educationGridItems = document.querySelectorAll('.EducationGrid');
    // educationGridItems.forEach((grid) => {
    //     ScrollTrigger.saveStyles(grid);
    // });

    // const experiences = document.querySelectorAll('.Experience');
    // experiences.forEach((exp) => {
    //     ScrollTrigger.saveStyles(exp);
    // });

    // const backgroundSkills = document.querySelectorAll('.BackgroundSkills');
    // backgroundSkills.forEach((bg) => {
    //     ScrollTrigger.saveStyles(bg);
    // });

    // ScrollTrigger.saveStyles('.PinSectionEducation');

    ScrollTrigger.matchMedia({
        // desktop
        '(min-width: 768px)': function () {
            const backgroundSkills = document.querySelectorAll('.BackgroundSkills');
            const educationGridItems = document.querySelectorAll('.EducationGrid');
            const sectionSkills = document.querySelector('.SectionSkills');

            // Animation for skills section
            let pinSectionHeightInit2 = 0;
            backgroundSkills.forEach((bg) => {
                if (bg.offsetHeight > pinSectionHeightInit2)
                    pinSectionHeightInit2 = bg.offsetHeight + 10;
            });
            gsap.set('.PinSectionSkills', { height: pinSectionHeightInit2 });

            const pinBackgroundAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionSkills,
                    invalidateOnRefresh: true,
                    start: 'top top',
                    // end: () => getEndPosition(),
                    end: '+=2000',
                    scrub: true,
                    pin: '.PinWrapper',
                    pinSpacing: false,
                    snap: {
                        // snapTo: [0, 0.5, 1],
                        snapTo: 'labels',
                        duration: 0.7,
                    },
                    // markers: true,
                },
            });

            backgroundSkills.forEach((pinBackground, index) => {
                gsap.set(pinBackground, { opacity: 1 });
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
                } else {
                    pinBackgroundAnimation.fromTo(
                        pinBackground,
                        {
                            x: 0,
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
                        },
                        `visible${index}`
                    );
                } else {
                    pinBackgroundAnimation.fromTo(
                        pinBackground,
                        {
                            opacity: 1,
                        },
                        {
                            opacity: 1,
                        },
                        `visible${index}`
                    );
                }
            });

            // Animation for education section
            educationGridItems.forEach((grid) => {
                gsap.set(grid, { position: 'absolute' });
            });
            let pinSectionHeightInit = 0;
            educationGridItems.forEach((bg) => {
                if (bg.offsetHeight > pinSectionHeightInit) {
                    pinSectionHeightInit = bg.offsetHeight + 3;
                }
            });

            gsap.set('.PinSectionEducation', { height: pinSectionHeightInit });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.SectionEducation',
                    // start: () => getStartPositionEducation(),
                    start: '+=2000 top',
                    // end: () => getEndPositionEducation(),
                    end: '+=4000',
                    scrub: true,
                    // markers: {
                    //     startColor: 'white',
                    //     endColor: 'white',
                    //     fontSize: '18px',
                    //     indent: 20,
                    // },
                    pin: '.PinWrapper',
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                    snap: {
                        // snapTo: [0, 0.5, 1],
                        snapTo: 'labels',
                        duration: 0.5,
                    },
                },
            });

            educationGridItems.forEach((grid, index) => {
                if (index !== 0) {
                    timeline.fromTo(
                        grid,
                        {
                            y: () => getYEducation(),
                        },
                        {
                            y: 0,
                        }
                    );
                } else {
                    timeline.fromTo(
                        grid,
                        {
                            y: 0,
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
                        },
                        `visible${index}`
                    );
                } else {
                    timeline.fromTo(
                        grid,
                        {
                            opacity: 1,
                        },
                        {
                            opacity: 1,
                        },
                        `visible${index}`
                    );
                }
            });
        },
        '(max-width: 768px)': function () {
            const educationGridItems = document.querySelectorAll('.EducationGrid');
            const backgroundSkills = document.querySelectorAll('.BackgroundSkills');
            const experiences = document.querySelectorAll('.Experience');

            backgroundSkills.forEach((bg) => {
                gsap.fromTo(
                    bg,
                    {
                        opacity: 0,
                        duration: 0,
                    },
                    {
                        opacity: 1,
                        scrollTrigger: {
                            trigger: bg,
                            start: 'top 80%',
                            end: 'bottom bottom',
                            toggleActions: 'play none none reverse',
                        },
                        duration: 1,
                    }
                );
            });

            educationGridItems.forEach((edu) => {
                gsap.fromTo(
                    edu,
                    {
                        opacity: 0,
                        y: 0,
                    },
                    {
                        scrollTrigger: {
                            trigger: edu,
                            start: 'top 80%',
                            end: 'bottom bottom',
                            toggleActions: 'play none none reverse',
                            // markers: true,
                        },
                        opacity: 1,
                        y: 0,
                        duration: 1,
                    }
                );
            });

            educationGridItems.forEach((grid) => {
                gsap.set(grid, { position: 'relative' });
            });

            gsap.set('.PinSectionEducation', { height: 'auto' });

            gsap.set('.PinSectionSkills', { height: 'auto' });

            experiences.forEach((exp) => {
                gsap.from(exp, {
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: exp,
                        start: 'top 80%',
                        end: 'bottom bottom',
                        toggleActions: 'play none none reverse',
                        // markers: {
                        //     startColor: 'white',
                        //     endColor: 'white',
                        //     fontSize: '18px',
                        //     indent: 20,
                        // },
                    },
                });
            });
        },
    });
};

const getEndPositionEducation = () => {
    const pinSectionEducation = document.querySelector('.PinSectionEducation');

    if (pinSectionEducation !== null) {
        return '+=' + pinSectionEducation.offsetWidth;
    }
};

const getStartPositionEducation = () => {
    const pinSectionSkills = document.querySelector('.PinSectionSkills');

    if (pinSectionSkills !== null) {
        const value = pinSectionSkills.offsetWidth - 240;
        return `top+=${value} top`;
    }
};

const getYEducation = () => {
    const educationGridItems = document.querySelectorAll('.EducationGrid');
    let pinSectionHeightInit = 0;
    educationGridItems.forEach((bg) => {
        if (bg.offsetHeight > pinSectionHeightInit) {
            pinSectionHeightInit = bg.offsetHeight + 3;
        }
    });
    return pinSectionHeightInit;
};

const calcX = () => {
    const sectionSkills = document.querySelector('.SectionSkills');

    if (sectionSkills !== null) {
        const sectionWidth = sectionSkills.offsetWidth;
        const windowWidth = window.innerWidth;
        const extraWidth = (windowWidth - sectionWidth) / 2;
        const result = sectionWidth + extraWidth;
        return result;
    }
};

const getEndPosition = () => {
    const pinSectionSkills = document.querySelector('.PinSectionSkills');
    if (pinSectionSkills !== null) {
        return '+=' + pinSectionSkills.offsetWidth;
    }
};
