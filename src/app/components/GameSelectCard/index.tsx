/**
 *
 * GameSelectCard
 *
 */
import * as React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { GameImage } from '../GameImage/Loadable';
import { H5 } from '../styled/Headers';
import { motion } from 'framer-motion';
import { media } from 'styles/media';
import Icon from '../Icon';
import { useSelector } from 'react-redux';
import { selectTheme } from 'app/pages/Homepage/slice/selectors';

// interface Props {
//   mode: iGameMode;
//   index: number;
//   onClick: fun;
// }

export const GameSelectCard = ({ mode, index, onClick }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const theme = useTheme();

  const currentTheme = useSelector(selectTheme);

  const getGameModeCardState = mode => {
    if (!mode.isAvailable) return 'disabled';
    return mode.isActive ? 'active' : '';
  };

  const getImageColor = () => {
    if (mode.isAvailable) {
      return currentTheme === 'light' ? '1.0' : '0.8';
    }
    return '0.2';
  };

  const variants = {
    active: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        delay: 0.1 + i * 0.06,
      },
      transitionEnd: {
        opacity: 'unset',
      },
    }),
    hidden: { opacity: 0, scale: 0.9 },
  };

  return (
    <CardContainer
      key={'game_select_card_' + index}
      custom={index}
      initial="hidden"
      className={getGameModeCardState(mode)}
      animate={'active'}
      variants={variants}
      whileHover={mode.isAvailable ? 'hover' : ''}
      onClick={onClick}
    >
      {mode.isAvailable && (
        <RightCornerIcon
          width="24"
          height="24"
          name={mode.isActive ? 'circle-checked' : 'circle-unchecked'}
          fill={theme.primary}
        />
      )}
      {!mode.isAvailable && (
        <NotAvailableBanner>{t('room.indevelopment')}</NotAvailableBanner>
      )}
      <GameImage
        color={mode.isActive ? theme.primary : theme.mainContrastText}
        size="92"
        name={mode.imageClass}
        opacity={getImageColor()}
      />
      <H5
        className={getGameModeCardState(mode)}
        style={{
          opacity: mode.isAvailable ? '1' : '0.2',
        }}
      >
        {t(`gamemode.${mode.title}`)}
      </H5>
    </CardContainer>
  );
};

const RightCornerIcon = styled(Icon)`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
`;

const CardContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  height: auto;
  position: relative;

  ${media.medium`
    padding: 16px 32px;
  `}

  background: transparent;
  border: none;
  transition: border-color 0.25s ease-out;
  cursor: pointer;

  &.disabled {
    cursor: default;
    opacity: 0.2;
  }

  &:before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    margin: 0 auto;

    width: 100%;
    height: 100%;

    background: ${props => props.theme.mainBg};
    border-radius: 16px;
    border: 2px solid ${props => props.theme.container};

    transition: 0.24s ease-in-out;
    transition-property: transform background-color;
  }
  //"80" after color hex => opacity = 0.5

  &:hover:not(.disabled) {
    border-color: transparent;
    &:before {
      transform: scale(0.98);
      transform-origin: center;
    }
  }
  &.active {
    & > svg {
      color: ${props => props.theme.primary};
    }

    &:before {
      z-index: 1;
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      background: ${props => props.theme.container};
    }
  }
`;

const NotAvailableBanner = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 15;

  transform: translateY(-50%);

  margin: 0 auto;
  padding: 16px 24px;
  width: 150px;
  height: 49px;

  background-color: ${props => props.theme.primaryFaded};
  border-radius: 12px;

  font-family: 'Basier';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: ${props => props.theme.primary};
`;
