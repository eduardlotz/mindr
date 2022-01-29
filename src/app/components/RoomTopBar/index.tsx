/**
 *
 * RoomTopBar
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { motion } from 'framer-motion';
import { LeaveRoomBtn } from '../LeaveRoomBtn';
import { selectGroupCode } from 'app/pages/Lobby/slice/selectors';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { ChatButton } from '../ChatButton';
import { media } from 'styles/media';
import { SecondaryButton } from '../Button';
import Icon from '../Icon';
import { variants } from 'styles/variants';
import getApiPath from 'helpers/getApiPath';

export function RoomTopBar() {
  const { t } = useTranslation();
  const room = useSelector(selectGroupCode);

  const copyRoomJoinLink = () => {
    let ENDPOINT;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // dev code
      ENDPOINT = 'localhost:3000';
    } else {
      // production code
      ENDPOINT = 'https://mindr.vercel.app';
    }

    navigator.clipboard.writeText(`${ENDPOINT}/join/${room}`);
  };

  return (
    <Wrapper>
      <ReactTooltip />

      <FlexGrowWrapper>
        <LeaveRoomBtn />
      </FlexGrowWrapper>
      <AccessCodeWrapper>
        <AccessCodeText>{t('room.accessCode')}</AccessCodeText>
        <CodeButton
          onClick={copyRoomJoinLink}
          variants={variants.iconButtonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
          data-tip={t('room.copyLink')}
          data-effect="solid"
          data-arrow-color="transparent"
        >
          {room}
          <Icon name="copy" width="24" />
        </CodeButton>
      </AccessCodeWrapper>
      <FlexGrowEndWrapper>
        <ThemeSwitcher />
        <ChatButton />
      </FlexGrowEndWrapper>
    </Wrapper>
  );
}

const FlexGrowEndWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 16px;
  justify-content: flex-end;
  flex: 1 1 50%;

  ${media.medium`
    flex: 1 1 100%;
  `};
`;

const FlexGrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1 1 50%;

  ${media.medium`
    flex: 1 1 100%;
  `};
`;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 0;
  margin-bottom: 24px;
`;

const AccessCodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  flex: 1 1 100%;
`;

const AccessCodeText = styled.span`
  font-family: 'Basier';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  align-items: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  color: ${props => props.theme.mainContrastText};
  margin-right: 8px;
`;

const CodeButton = styled(SecondaryButton)`
  width: fit-content;
  height: auto;

  padding: 4px 8px;
  margin: 0;

  font-weight: 600;
  font-size: 14px;

  background-color: ${props => props.theme.primaryFaded};
  color: ${props => props.theme.primary};
  font-weight: bold;
  font-size: 14px;
  align-items: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;

  transition: 0.25s ease-out;
  transition-property: color background-color;

  ${media.small`
    width: auto;
    padding: 8px 12px;
  `}

  & > svg {
    color: ${props => props.theme.primary};
    margin-left: 8px;

    transition: 0.25s ease-out;
    transition-property: color;
  }

  &:hover {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.primaryContrast};
    & > svg {
      color: ${props => props.theme.primaryContrast};
    }
  }
`;
