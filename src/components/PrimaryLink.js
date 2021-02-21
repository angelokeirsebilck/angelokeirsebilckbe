import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colors from '../constants/colors';

const Link = styled.a`
    color: rgba(${Colors.secondary}, 1);
    border: 2px solid rgba(${Colors.secondary}, 1);
    text-decoration: none;
    text-transform: lowercase;
    font-weight: 500;
    padding: 5px 20px;
    transition: 0.4s all;

    &:hover {
        color: ${(props) => props.theme.textColor};
        border: 2px solid ${(props) => props.theme.textColor};
    }
`;

const LinkContainer = styled.div`
    display: inline-flex;
    /* margin-bottom: 15px; */
`;

const PrimaryLink = ({ text, link }) => {
    return (
        <LinkContainer>
            <Link href={link}>{text}</Link>
        </LinkContainer>
    );
};

PrimaryLink.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default PrimaryLink;
