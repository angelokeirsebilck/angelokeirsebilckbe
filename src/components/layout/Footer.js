import React from 'react';
import styled from 'styled-components';
import PrimaryLink from '../PrimaryLink';
import Sizes from '../../constants/breakpoints';
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
import Colors from '../../constants/colors';
import moment from 'moment';

const ContainerTop = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 50px 0;
    flex-direction: column;

    @media ${Sizes.sm} {
        flex-direction: row;
    }
`;

const ContainerBottom = styled.div`
    height: 50px;
    display: flex;
    font-size: 12px;
    align-items: center;
    color: ${(props) => props.theme.textColor};
`;

const FooterContainerTop = styled.div`
    background: ${(props) => props.theme.footerTopBackgroundColor};
    margin-top: 40px;

    @media ${Sizes.sm} {
        margin-top: 80px;
    }
`;
const FooterContainerBottom = styled.div`
    background: ${(props) => props.theme.pageBackground};
`;

const Container = styled.div`
    max-width: 1140px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;

    @media ${Sizes.sm} {
        padding-left: 40px;
        padding-right: 40px;
    }
`;
const LeftContent = styled.div`
    flex: 1;
    display: flex;

    & > *:last-child {
        margin-left: 15px;
    }
`;
const Left = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;

    @media ${Sizes.sm} {
        width: 50%;
    }
`;

const RightContent = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-end;
`;

const Right = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 20px;

    @media ${Sizes.sm} {
        width: 50%;
        margin-top: 0;
        padding-left: 20px;
    }
`;

const Icon = styled.a`
    color: rgba(${(props) => props.theme.footerLinksColor}, 1);
    transition: 0.4s all;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        color: ${(props) => props.theme.textColor};
    }
`;

const SubTitle = styled.h2`
    font-size: 24px;
    line-height: 1.1;
    position: relative;
    display: inline-block;
    margin-bottom: 20px;
    font-weight: 500;
    color: ${(props) => props.theme.textColor};
    /* background: linear-gradient(to right, rgba(${Colors.primary}, 1), rgba(${Colors.secondary}, 1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
`;

const Footer = () => {
    const yearDate = moment().year();

    return (
        <>
            <FooterContainerTop>
                <Container>
                    <ContainerTop>
                        <Left>
                            <SubTitle>Contact</SubTitle>
                            <LeftContent>
                                <PrimaryLink text='Call' link='tel:+32472494296' />
                                <PrimaryLink
                                    text='Mail'
                                    link='mailto:angelo.keirsebilck1@telenet.be'
                                />
                            </LeftContent>
                        </Left>

                        <Right>
                            <SubTitle>Socials</SubTitle>
                            <RightContent>
                                <Icon
                                    aria-label='Github Link'
                                    href='https://github.com/angelokeirsebilck'
                                    rel='nofollow noopener'
                                    target='_blank'>
                                    <FaGithub />
                                </Icon>
                                <Icon
                                    aria-label='LinkedIn Link'
                                    href='https://www.linkedin.com/in/angelo-keirsebilck-a35977196/'
                                    target='_blank'
                                    rel='nofollow noopener'>
                                    <FaLinkedinIn />
                                </Icon>
                                <Icon
                                    aria-label='Twitter Link'
                                    href='https://twitter.com/AngeloKbilck'
                                    target='_blank rel="nofollow noopener"'>
                                    <FaTwitter />
                                </Icon>
                            </RightContent>
                        </Right>
                    </ContainerTop>
                </Container>
            </FooterContainerTop>
            <FooterContainerBottom>
                <Container>
                    <ContainerBottom> &copy; Angelo Keirsebilck {yearDate} </ContainerBottom>
                </Container>
            </FooterContainerBottom>
        </>
    );
};

export default Footer;
