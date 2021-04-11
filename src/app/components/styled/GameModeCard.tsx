/**
 *
 * GameModeCard
 *
 */
import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { motion } from 'framer-motion';
import { colors } from 'styles/colors';

export const GameModeCard = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px;
  height: auto;
  flex-direction: row;

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
    cursor: auto;
    transform: scale(0.7);
    opacity: 0.4;
  }

  &:hover {
    box-shadow: 0px 14px 26px rgba(0, 0, 0, 0.07);
    border-color: ${colors.basic.white};
  }
`;
