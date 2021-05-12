/**
 *
 * GameModalCard
 *
 */
import * as React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { H5 } from '../styled/Headers';
import { GameImage } from '../GameImage/Loadable';
import { media } from 'styles/media';

interface Props {
  onClick: () => void;
  variants?: any;
  imageClass: string;
  title: string;
}

export function GameModalCard(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const theme = useTheme();

  return (
    <CardContainer
      initial="hidden"
      animate={'active'}
      variants={props.variants}
      onClick={props.onClick}
    >
      <GameImage
        color={theme.containerContrast}
        size="92px"
        name={props.imageClass}
      />
      <H5>{t(`gamemode.${props.title}`)}</H5>
    </CardContainer>
  );
}

const CardContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
  height: auto;
  position: relative;
  border: 2px solid ${props => props.theme.lightgrey};
  border-radius: 12px;

  ${media.medium`
    padding: 16px 32px;
  `}

  background: transparent;
  transition: 0.25s ease-out;
  transition-property: border-color box-shadow;
  cursor: pointer;

  &:hover {
    border-color: transparent;
    box-shadow: 0px 14px 26px 0px rgba(0, 0, 0, 0.07);
  }
`;
