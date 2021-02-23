import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changeColorMode, toggleMenu } from '../../../actions/globalActions';
import Switch from 'react-switch';
import { HiSun, HiMoon } from 'react-icons/hi';
import styled, { withTheme } from 'styled-components';
import { Divide as Hamburger } from 'hamburger-react';

import Sizes from '../../constants/breakpoints';
import Colors from '../../constants/colors';

const IconContainer = styled.div`
    padding-left: 5px;
    padding-top: 2px;
`;

const RadientDiv = styled.div`
    width: 25px;
    height: 25px;
    background-image: linear-gradient(
        to bottom,
        rgba(${Colors.primary}, 1),
        rgba(${(props) => props.theme.secondary}, 1)
    );
    border-radius: 100%;
`;

const NavFixedWrapper = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 30px;
    z-index: 20;
`;

const HamburgerContainer = styled.div`
    margin-left: 30px;
`;

const NavMain = styled.div`
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;

    @media ${Sizes.sm} {
        padding-left: 40px;
        padding-right: 40px;
    }
`;

const Nav = ({ global, changeColorMode, toggleMenu, theme }) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
        if (global.colorMode === 'dark') return changeColorMode('light');
        if (global.colorMode === 'light') return changeColorMode('dark');
    };

    return (
        <NavFixedWrapper>
            <NavMain>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    onColor='#87ceeb'
                    offColor='#d3d3d3'
                    onHandleColor='#1EAE98'
                    offHandleColor='#1EAE98'
                    handleDiameter={25}
                    checkedIcon={
                        <IconContainer>
                            <HiSun style={{ color: 'yellow' }} />
                        </IconContainer>
                    }
                    uncheckedIcon={
                        <IconContainer>
                            <HiMoon style={{ color: 'white' }} />
                        </IconContainer>
                    }
                    checkedHandleIcon={<RadientDiv />}
                    uncheckedHandleIcon={<RadientDiv />}
                    boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                    height={20}
                    width={48}
                    className='Nav-switcher'
                    id='material-switch'
                    aria-label='super secret label that is not visible'
                />
                <HamburgerContainer>
                    <Hamburger
                        label='Menu Button'
                        color={theme.secondaryHex}
                        toggled={global.isMenuOpen}
                        toggle={toggleMenu}
                    />
                </HamburgerContainer>
            </NavMain>
        </NavFixedWrapper>
    );
};

const mapStateToProps = (state) => ({
    global: state.global,
});

export default withTheme(connect(mapStateToProps, { changeColorMode, toggleMenu })(Nav));
