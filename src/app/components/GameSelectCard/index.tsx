/**
 *
 * GameSelectCard
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { colors } from 'styles/colors';
import { GameImage } from '../GameImage/Loadable';
import { H5 } from '../styled/Headers';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { media } from 'styles/media';
import { iGameMode } from 'app/pages/Homepage/slice/types';
import { useHomepageSlice } from 'app/pages/Homepage/slice';
import Icon from '../Icon';

interface Props {
  mode: iGameMode;
  index: number;
}

export function GameSelectCard(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const { actions: homeActions } = useHomepageSlice();

  const getGameModeCardState = mode => {
    if (!mode.isAvailable) return 'disabled';
    return mode.isActive ? 'active' : '';
  };

  const handleGameModeClick = (mode, id) => {
    if (mode.isAvailable) dispatch(homeActions.toggleGameModeIsActive(id));
  };

  const variants = {
    active: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        delay: 0.1 + i * 0.06,
      },
    }),
    hidden: { opacity: 0, scale: 0.9 },
    hover: {
      scale: 1.04,
    },
  };

  return (
    <CardContainer
      key={'game_select_card_' + props.index}
      custom={props.index}
      initial="hidden"
      className={getGameModeCardState(props.mode)}
      animate={'active'}
      variants={variants}
      whileHover={props.mode.isAvailable ? 'hover' : ''}
      onClick={() => handleGameModeClick(props.mode, props.index)}
    >
      {props.mode.isAvailable && (
        <RightCornerIcon
          width="24"
          height="24"
          name={props.mode.isActive ? 'circle-checked' : 'circle-unchecked'}
          fill={colors.brand.purple}
        />
      )}
      {!props.mode.isAvailable && (
        <NotAvailableBanner>{t('room.indevelopment')}</NotAvailableBanner>
      )}
      <GameImage size="92px" name={props.mode.imageClass} />
      <H5 style={{ marginLeft: '16px' }}>
        {t(`gamemode.${props.mode.title}`)}
      </H5>
    </CardContainer>
  );
}

const RightCornerIcon = styled(Icon)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const CardContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px;
  height: auto;
  flex-direction: row;
  position: relative;

  ${media.medium`
    padding: 16px 32px;
    flex-direction: column;
    justify-content: center;
  `}

  background: #ffffff;
  border: 2px solid #f4f5f7;
  border-radius: 12px;
  transition: border-color 0.25s ease-out;
  cursor: pointer;

  &.disabled {
    cursor: default;
    opacity: 0.2;
  }

  //"80" after color hex => opacity = 0.5
  &.active {
    border-color: ${colors.brand.purple}80;
  }
`;

const NotAvailableBanner = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  bottom: 0;
  right: 0;

  transform: translateY(-50%);

  margin: 0 auto;
  padding: 16px 24px;
  width: 150px;
  height: 49px;

  background-color: ${colors.basic.lightpurple};
  border-radius: 12px;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: ${colors.brand.purple};
`;
